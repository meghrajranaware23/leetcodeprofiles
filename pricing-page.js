import './firebase.js';
import { redirectLegacyPaths } from './routes.js';
import { initSiteNav, initScrollAnimations } from './site-nav.js';
import { initAuthAwareLinks } from './auth/auth-guard.js';
import { getCurrentUser } from './auth/auth-service.js';
import { initEntitlements, hasActiveSubscription } from './auth/entitlements-service.js';
import {
  initSubscriptionButtons,
  initCheckoutPage,
} from './checkout/subscription-checkout.js';
import { resolveApiBaseUrl } from './checkout/subscription-status.js';

function showAlert(message, type = 'success') {
  const el = document.getElementById('subscribeAlert');
  if (!el) return;
  el.textContent = message;
  el.hidden = false;
  el.className = `subscribe-alert subscribe-alert--${type}`;
}

async function boot() {
  if (redirectLegacyPaths()) return;

  try {
    await resolveApiBaseUrl();
  } catch (err) {
    console.error(err.message);
  }

  await initSiteNav({ activePage: 'pricing', variant: 'marketing' });
  initAuthAwareLinks(document);
  initScrollAnimations();

  await initEntitlements();

  const returnResult = await initCheckoutPage();
  if (returnResult?.type === 'activated') {
    showAlert('Subscription active! All premium packs are unlocked.', 'success');
  } else if (returnResult?.type === 'cancelled') {
    showAlert('Checkout cancelled. You can subscribe anytime.', 'error');
  } else if (returnResult?.type === 'error') {
    showAlert(returnResult.message || 'Activation failed. Please try again.', 'error');
  }

  if (hasActiveSubscription()) {
    showAlert('You have an active subscription. Manage it on your profile.', 'success');
  }

  const params = new URLSearchParams(window.location.search);
  const preselectedPlan = params.get('plan');

  document.querySelectorAll('[data-subscribe-card]').forEach((card) => {
    const planSlug = card.dataset.planSlug;
    initSubscriptionButtons(card, { planSlug });

    if (preselectedPlan === planSlug && getCurrentUser()) {
      const btn = card.querySelector('[data-subscribe-btn]');
      btn?.click();
    }
  });

  if (window.location.hash === '#subscribe') {
    document.getElementById('subscribe')?.scrollIntoView({ behavior: 'smooth' });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
