import { fetchRuntimeConfig } from './subscription-status.js';
import { getPlanDetails, resolvePlanPricing } from './plan-details.js';

const COUNTRY_CACHE_KEY = 'lp_detected_country';

const PAYPAL_LOGO = `<span class="payment-btn__brand-paypal" aria-hidden="true"><span class="payment-btn__brand-pay">Pay</span><span class="payment-btn__brand-pal">Pal</span></span>`;

const RAZORPAY_LOGO = `<svg class="payment-btn__logo payment-btn__logo--razorpay" width="88" height="20" viewBox="0 0 88 20" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><text x="0" y="16" fill="#072654" font-family="Rajdhani, sans-serif" font-size="18" font-weight="700">razorpay</text></svg>`;

let cachedCountry = null;

export async function detectUserCountry() {
  if (cachedCountry) return cachedCountry;

  try {
    const stored = sessionStorage.getItem(COUNTRY_CACHE_KEY);
    if (stored) {
      cachedCountry = stored;
      return cachedCountry;
    }
  } catch {
    // sessionStorage unavailable
  }

  try {
    const response = await fetch('https://ipapi.co/json/', {
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) throw new Error('Country detection failed');
    const data = await response.json();
    cachedCountry = data.country_code || null;
  } catch {
    cachedCountry = null;
  }

  try {
    if (cachedCountry) {
      sessionStorage.setItem(COUNTRY_CACHE_KEY, cachedCountry);
    }
  } catch {
    // ignore
  }

  return cachedCountry;
}

export function isIndia(countryCode) {
  return countryCode === 'IN';
}

let modalEl = null;
let resolveSelection = null;
let previouslyFocused = null;
let focusTrapHandler = null;

function getFocusableElements(container) {
  return [...container.querySelectorAll(
    'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  )];
}

function trapFocus(container) {
  focusTrapHandler = (e) => {
    if (e.key !== 'Tab' || !modalEl || modalEl.hidden) return;
    const focusable = getFocusableElements(container);
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };
  document.addEventListener('keydown', focusTrapHandler);
}

function releaseFocusTrap() {
  if (focusTrapHandler) {
    document.removeEventListener('keydown', focusTrapHandler);
    focusTrapHandler = null;
  }
  if (previouslyFocused?.focus) {
    previouslyFocused.focus();
    previouslyFocused = null;
  }
}

function setBackgroundHidden(hidden) {
  const targets = [
    document.getElementById('site-nav'),
    document.getElementById('site-footer'),
    ...document.querySelectorAll('body > main, body > section'),
  ].filter(Boolean);

  targets.forEach((el) => {
    if (hidden) {
      el.setAttribute('aria-hidden', 'true');
    } else {
      el.removeAttribute('aria-hidden');
    }
  });
}

function ensureModal() {
  if (modalEl) return modalEl;

  modalEl = document.createElement('div');
  modalEl.className = 'payment-modal';
  modalEl.hidden = true;
  modalEl.innerHTML = `
    <div class="payment-modal__backdrop" data-payment-modal-close></div>
    <div class="payment-modal__dialog" role="dialog" aria-labelledby="paymentModalTitle" aria-modal="true">
      <button type="button" class="payment-modal__close" data-payment-modal-close aria-label="Close">&times;</button>
      <div class="payment-modal__summary" data-payment-summary>
        <p class="payment-modal__eyebrow" data-plan-eyebrow>Full Arsenal</p>
        <h2 id="paymentModalTitle" class="payment-modal__plan-title" data-plan-title>Monthly Plan</h2>
        <div class="payment-modal__price-row">
          <span class="payment-modal__price" data-plan-price>$4.99</span>
          <span class="payment-modal__frequency" data-plan-frequency>USD · billed automatically</span>
        </div>
        <p class="payment-modal__description" data-plan-description></p>
      </div>
      <div class="payment-modal__divider" aria-hidden="true"></div>
      <p class="payment-modal__pay-label">Choose payment method</p>
      <div class="payment-modal__options" data-payment-options>
        <div class="payment-modal__loading" data-payment-loading hidden>
          <span class="payment-modal__spinner" aria-hidden="true"></span>
          <span>Loading payment options…</span>
        </div>
      </div>
      <p class="payment-modal__secure">Encrypted checkout · Cancel anytime from your account</p>
    </div>
  `;
  document.body.appendChild(modalEl);

  modalEl.querySelectorAll('[data-payment-modal-close]').forEach((el) => {
    el.addEventListener('click', () => closePaymentModal(null));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalEl && !modalEl.hidden) {
      closePaymentModal(null);
    }
  });

  return modalEl;
}

function closePaymentModal(result) {
  if (!modalEl) return;
  modalEl.hidden = true;
  document.body.classList.remove('payment-modal-open');
  setBackgroundHidden(false);
  releaseFocusTrap();
  if (resolveSelection) {
    resolveSelection(result);
    resolveSelection = null;
  }
}

function buildPaymentButton(provider, { recommended, logoHtml, variantClass }) {
  return `
    <button type="button" class="payment-btn payment-btn--${variantClass}${recommended ? ' payment-btn--recommended' : ''}" data-payment-provider="${provider}">
      ${recommended ? '<span class="payment-btn__badge">Recommended</span>' : ''}
      <span class="payment-btn__content">
        <span class="payment-btn__phrase">Pay with</span>
        ${logoHtml}
      </span>
    </button>
  `;
}

function renderPlanSummary(modal, planSlug, config, india) {
  const details = getPlanDetails(planSlug);
  const pricing = resolvePlanPricing(planSlug, config, india);

  modal.querySelector('[data-plan-eyebrow]').textContent = details.eyebrow;
  modal.querySelector('[data-plan-title]').textContent = details.title;
  modal.querySelector('[data-plan-price]').textContent = pricing.display;
  modal.querySelector('[data-plan-frequency]').textContent = details.frequencyLabel;
  modal.querySelector('[data-plan-description]').textContent = details.description;
}

function renderPaymentOptions(optionsEl, india) {
  const razorpayBtn = buildPaymentButton('razorpay', {
    recommended: india,
    logoHtml: RAZORPAY_LOGO,
    variantClass: 'razorpay',
  });

  const paypalBtn = buildPaymentButton('paypal', {
    recommended: !india,
    logoHtml: PAYPAL_LOGO,
    variantClass: 'paypal',
  });

  optionsEl.innerHTML = india ? razorpayBtn + paypalBtn : paypalBtn + razorpayBtn;
}

/**
 * Show payment method selection modal.
 * @param {{ planSlug: string, trigger?: HTMLElement }} options
 * @returns {Promise<'paypal'|'razorpay'|null>}
 */
export async function showPaymentSelector({ planSlug, trigger } = {}) {
  const modal = ensureModal();
  const optionsEl = modal.querySelector('[data-payment-options]');

  optionsEl.innerHTML = `
    <div class="payment-modal__loading" data-payment-loading>
      <span class="payment-modal__spinner" aria-hidden="true"></span>
      <span>Loading payment options…</span>
    </div>
  `;

  previouslyFocused = trigger || document.activeElement;
  modal.hidden = false;
  document.body.classList.add('payment-modal-open');
  setBackgroundHidden(true);

  const dialog = modal.querySelector('.payment-modal__dialog');
  trapFocus(dialog);
  modal.querySelector('.payment-modal__close')?.focus();

  const [country, config] = await Promise.all([
    detectUserCountry(),
    fetchRuntimeConfig().catch(() => null),
  ]);
  const india = isIndia(country);

  renderPlanSummary(modal, planSlug, config, india);
  renderPaymentOptions(optionsEl, india);

  return new Promise((resolve) => {
    resolveSelection = resolve;

    optionsEl.querySelectorAll('[data-payment-provider]').forEach((btn) => {
      btn.addEventListener('click', () => {
        closePaymentModal(btn.dataset.paymentProvider);
      }, { once: true });
    });
  });
}
