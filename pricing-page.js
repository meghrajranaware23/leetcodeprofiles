import './firebase.js';
import { ROUTES, redirectLegacyPaths } from './routes.js';
import { initSiteNav, initScrollAnimations } from './site-nav.js';
import { initAuthAwareLinks } from './auth/auth-guard.js';
import { getCurrentUser, waitForAuth } from './auth/auth-service.js';
import { initEntitlements, hasActiveSubscription } from './auth/entitlements-service.js';
import {
  initSubscriptionButtons,
  initCheckoutPage,
  fetchRuntimeConfig,
} from './checkout/subscription-checkout.js';
import { resolveApiBaseUrl } from './checkout/subscription-status.js';
import { detectUserCountry, isIndia } from './checkout/payment-selector.js';
import { initSubscribeSectionFromHash } from './checkout/pricing-navigation.js';
import { initBrandLogos, injectFavicon } from './brand-logo.js';
import { initSiteFooter } from './site-footer.js';

function formatDisplayPrice(price) {
  if (!price?.amount) return null;
  if (price.currency === 'INR') return `₹${price.amount}`;
  if (price.currency === 'USD') return `$${price.amount}`;
  return `${price.amount} ${price.currency}`;
}

function parsePriceAmount(price) {
  if (!price?.amount) return null;
  const num = Number.parseFloat(String(price.amount).replace(/,/g, ''));
  return Number.isFinite(num) ? num : null;
}

function applySavingsBadge(cfg, india) {
  const monthlyPlan = cfg.plans?.find((p) => p.slug === 'full_arsenal_monthly');
  const yearlyPlan = cfg.plans?.find((p) => p.slug === 'full_arsenal_yearly');
  const yearlyCard = document.querySelector('[data-plan-slug="full_arsenal_yearly"]');
  const savingsEl = yearlyCard?.querySelector('.subscribe-savings');
  if (!monthlyPlan || !yearlyPlan || !savingsEl) return;

  const monthlyPrice = india && monthlyPlan.razorpayPrice ? monthlyPlan.razorpayPrice : monthlyPlan.price;
  const yearlyPrice = india && yearlyPlan.razorpayPrice ? yearlyPlan.razorpayPrice : yearlyPlan.price;
  const monthlyAmount = parsePriceAmount(monthlyPrice);
  const yearlyAmount = parsePriceAmount(yearlyPrice);
  if (!monthlyAmount || !yearlyAmount) return;

  const annualMonthly = monthlyAmount * 12;
  if (annualMonthly <= yearlyAmount) return;

  const pct = Math.round(((annualMonthly - yearlyAmount) / annualMonthly) * 100);
  if (pct > 0) {
    savingsEl.textContent = `Save ${pct}% vs paying monthly`;
  }
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

    applySavingsBadge(cfg, india);
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

  await waitForAuth();
  if (getCurrentUser()) {
    window.location.replace(`${ROUTES.coursesPricing}${window.location.search}${window.location.hash}`);
    return;
  }

  await initSiteNav({ activePage: 'pricing', variant: 'marketing' });
  initAuthAwareLinks(document);
  initScrollAnimations();
  injectFavicon();
  initBrandLogos();
  initSiteFooter({ variant: 'marketing' });
  initAuthAwareLinks(document);

  applyPricingFromConfig().catch((err) => {
    console.warn('Could not load dynamic pricing:', err.message);
  });

  await initEntitlements();

  try {
    await resolveApiBaseUrl();
  } catch (err) {
    console.error(err.message);
  }

  const returnResult = await initCheckoutPage();
  if (returnResult?.type === 'activated') {
    showAlert('Subscription active! All premium packs are unlocked.', 'success');
  } else if (returnResult?.type === 'cancelled') {
    showAlert('Checkout cancelled. You can subscribe anytime.', 'error');
  } else if (returnResult?.type === 'error') {
    showAlert(returnResult.message || 'Activation failed. Please try again.', 'error');
  }

  if (hasActiveSubscription()) {
    showAlert('You have an active subscription. Manage it from the Upgrade menu in your account.', 'success');
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

  initSubscribeSectionFromHash();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
