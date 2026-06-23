import { getCurrentUser } from '../auth/auth-service.js';
import { ROUTES } from '../routes.js';
import {
  apiPost,
  fetchRuntimeConfig,
  resolveApiBaseUrl,
} from './subscription-status.js';

const PENDING_SUBSCRIPTION_KEY = 'lp_pending_subscription';

function savePendingSubscription(subscriptionId, planSlug) {
  sessionStorage.setItem(PENDING_SUBSCRIPTION_KEY, JSON.stringify({ subscriptionId, planSlug }));
}

export function getPendingSubscription() {
  try {
    const raw = sessionStorage.getItem(PENDING_SUBSCRIPTION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function clearPendingSubscription() {
  sessionStorage.removeItem(PENDING_SUBSCRIPTION_KEY);
}

function getReturnSubscriptionId() {
  const params = new URLSearchParams(window.location.search);
  return params.get('subscription_id') || params.get('ba_token') || null;
}

function buildSignInUrl(planSlug) {
  const continueUrl = `${ROUTES.pricing}?plan=${encodeURIComponent(planSlug)}`;
  return `${ROUTES.signIn}?continue=${encodeURIComponent(continueUrl)}`;
}

export async function createSubscription(planSlug) {
  const user = getCurrentUser();
  if (!user) {
    window.location.href = buildSignInUrl(planSlug);
    return null;
  }

  const result = await apiPost('/api/subscriptions/create', { planSlug });
  if (result.subscriptionId) {
    savePendingSubscription(result.subscriptionId, planSlug);
  }
  return result;
}

export async function activateSubscription(subscriptionId) {
  const result = await apiPost('/api/subscriptions/activate', { subscriptionId });
  clearPendingSubscription();
  return result;
}

export async function cancelSubscription(subscriptionId) {
  return apiPost('/api/subscriptions/cancel', { subscriptionId });
}

export async function handleSubscriptionReturn() {
  const params = new URLSearchParams(window.location.search);
  const cancelled = params.get('subscription_cancelled') === 'true';
  const success = params.get('subscription_success') === 'true';

  if (cancelled) {
    clearPendingSubscription();
    return { type: 'cancelled' };
  }

  const subscriptionId = getReturnSubscriptionId()
    || getPendingSubscription()?.subscriptionId;

  if (!success && !subscriptionId) {
    return null;
  }

  if (!subscriptionId) {
    return { type: 'pending', message: 'Waiting for subscription confirmation…' };
  }

  if (!getCurrentUser()) {
    return { type: 'auth_required' };
  }

  try {
    const result = await activateSubscription(subscriptionId);
    const { refreshEntitlements } = await import('../auth/entitlements-service.js');
    await refreshEntitlements();

    if (window.history.replaceState) {
      window.history.replaceState({}, '', ROUTES.pricing);
    }

    return { type: 'activated', result };
  } catch (err) {
    return { type: 'error', message: err.message };
  }
}

export async function loadPayPalSdk(clientId) {
  if (window.paypal) return window.paypal;

  return new Promise((resolve, reject) => {
    const script = document.createElement('script');

    resolveApiBaseUrl()
      .then(() => fetchRuntimeConfig())
      .then((cfg) => {
        const id = clientId || cfg.paypalClientId || import.meta.env.VITE_PAYPAL_CLIENT_ID;
        if (!id) throw new Error('PayPal client ID not configured');
        script.src = `https://www.paypal.com/sdk/js?client-id=${encodeURIComponent(id)}&vault=true&intent=subscription`;
        script.async = true;
        script.onload = () => resolve(window.paypal);
        script.onerror = () => reject(new Error('Failed to load PayPal SDK'));
        document.head.appendChild(script);
      })
      .catch(reject);
  });
}

export async function initSubscriptionButtons(container, { planSlug, onStatus }) {
  if (!container) return;

  const statusEl = container.querySelector('[data-subscribe-status]');
  const setStatus = (msg, isError = false) => {
    if (statusEl) {
      statusEl.textContent = msg;
      statusEl.hidden = !msg;
      statusEl.classList.toggle('subscribe-status--error', isError);
    }
    onStatus?.(msg, isError);
  };

  const btn = container.querySelector('[data-subscribe-btn]');
  if (!btn) return;

  btn.addEventListener('click', async () => {
    btn.disabled = true;
    setStatus('Starting checkout…');

    try {
      const result = await createSubscription(planSlug);
      if (!result) return;

      if (result.approvalUrl) {
        window.location.href = result.approvalUrl;
        return;
      }

      setStatus('Could not start PayPal checkout.', true);
    } catch (err) {
      if (err.status === 409) {
        setStatus('You already have an active subscription. Manage it on your profile.', true);
      } else if (err.message === 'Sign in required') {
        window.location.href = buildSignInUrl(planSlug);
      } else {
        setStatus(err.message || 'Checkout failed.', true);
      }
    } finally {
      btn.disabled = false;
    }
  });
}

export async function initCheckoutPage() {
  const returnResult = await handleSubscriptionReturn();
  return returnResult;
}

export { fetchRuntimeConfig };
