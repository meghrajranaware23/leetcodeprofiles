import { getCurrentUser } from '../auth/auth-service.js';
import { ROUTES } from '../routes.js';
import {
  apiPost,
  fetchRuntimeConfig,
  resolveApiBaseUrl,
} from './subscription-status.js';
import { showPaymentSelector } from './payment-selector.js';
import {
  createRazorpaySubscription,
  openRazorpayCheckout,
} from './razorpay-checkout.js';

const PENDING_SUBSCRIPTION_KEY = 'lp_pending_subscription';

function savePendingSubscription(subscriptionId, planSlug, provider = 'paypal') {
  sessionStorage.setItem(
    PENDING_SUBSCRIPTION_KEY,
    JSON.stringify({ subscriptionId, planSlug, provider })
  );
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
  return `${ROUTES.signIn}?next=${encodeURIComponent(continueUrl)}`;
}

export async function createSubscription(planSlug) {
  const user = getCurrentUser();
  if (!user) {
    window.location.href = buildSignInUrl(planSlug);
    return null;
  }

  const result = await apiPost('/api/subscriptions/create', { planSlug });
  if (result.subscriptionId) {
    savePendingSubscription(result.subscriptionId, planSlug, 'paypal');
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

async function startPayPalCheckout(planSlug, setStatus) {
  setStatus('Starting PayPal checkout…');
  const result = await createSubscription(planSlug);
  if (!result) return null;

  if (result.approvalUrl) {
    window.location.href = result.approvalUrl;
    return result;
  }

  throw new Error('Could not start PayPal checkout.');
}

async function startRazorpayCheckout(planSlug, setStatus) {
  setStatus('Starting Razorpay checkout…');
  const result = await createRazorpaySubscription(planSlug);
  if (!result?.subscriptionId) {
    throw new Error('Could not start Razorpay checkout.');
  }

  savePendingSubscription(result.subscriptionId, planSlug, 'razorpay');

  const verifyResult = await openRazorpayCheckout({
    subscriptionId: result.subscriptionId,
    planSlug,
    onStatus: setStatus,
  });

  clearPendingSubscription();
  const { refreshEntitlements } = await import('../auth/entitlements-service.js');
  await refreshEntitlements();

  return verifyResult;
}

export async function initSubscriptionButtons(container, { planSlug, onStatus, onActivated }) {
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
    const user = getCurrentUser();
    if (!user) {
      window.location.href = buildSignInUrl(planSlug);
      return;
    }

    btn.disabled = true;
    setStatus('Loading payment options…');

    try {
      const provider = await showPaymentSelector();
      if (!provider) {
        setStatus('');
        return;
      }

      if (provider === 'paypal') {
        await startPayPalCheckout(planSlug, setStatus);
        return;
      }

      if (provider === 'razorpay') {
        await startRazorpayCheckout(planSlug, setStatus);
        setStatus('');
        onActivated?.({ provider: 'razorpay' });
        return;
      }
    } catch (err) {
      if (err.status === 409 || err.code === 'ACTIVE_SUBSCRIPTION_EXISTS') {
        setStatus('You already have an active subscription. Manage it on your profile.', true);
      } else if (err.code === 'CHECKOUT_CANCELLED') {
        setStatus('Checkout cancelled. You can subscribe anytime.');
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
