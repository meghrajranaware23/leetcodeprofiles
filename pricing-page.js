import './firebase.js';
import { redirectLegacyPaths } from './routes.js';
import { initSiteNav, initScrollAnimations } from './site-nav.js';
import { initAuthAwareLinks } from './auth/auth-guard.js';
import { getCurrentUser } from './auth/auth-service.js';
import { initEntitlements, hasActiveSubscription } from './auth/entitlements-service.js';
import {
  initSubscriptionButtons,
  initCheckoutPage,
  fetchRuntimeConfig,
} from './checkout/subscription-checkout.js';
import { resolveApiBaseUrl } from './checkout/subscription-status.js';
import { detectUserCountry, isIndia } from './checkout/payment-selector.js';

function formatDisplayPrice(price) {
  if (!price?.amount) return null;
  if (price.currency === 'INR') return `₹${price.amount}`;
  if (price.currency === 'USD') return `$${price.amount}`;
  return `${price.amount} ${price.currency}`;
}

async function applyPricingFromConfig() {
  try {
    const cfg = await fetchRuntimeConfig();
    const country = await detectUserCountry();
    const india = isIndia(country);

    document.querySelectorAll('[data-subscribe-card]').forEach((card) => {
      const slug = card.dataset.planSlug;
      const plan = cfg.plans?.find((p) => p.slug === slug);
      if (!plan) return;

      const priceObj = india && plan.razorpayPrice ? plan.razorpayPrice : plan.price;
      const formatted = formatDisplayPrice(priceObj);
      if (!formatted) return;

      const amountEl = card.querySelector('.subscribe-amount');
      const perEl = card.querySelector('.subscribe-per');
      if (amountEl) amountEl.textContent = formatted;
      if (perEl) {
        const interval = plan.billingInterval === 'year' ? 'year' : 'month';
        perEl.textContent = `per ${interval} · billed automatically`;
      }
    });
  } catch (err) {
    console.warn('Could not load dynamic pricing:', err.message);
  }
}

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
    await applyPricingFromConfig();
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
    initSubscriptionButtons(card, {
      planSlug,
      onActivated: () => {
        showAlert('Subscription active! All premium packs are unlocked.', 'success');
      },
    });

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
