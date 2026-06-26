const COUNTRY_CACHE_KEY = 'lp_detected_country';

const PAYPAL_ICON = `<svg class="payment-option__icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/><path d="M6 15h4"/></svg>`;

const RAZORPAY_ICON = `<svg class="payment-option__icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><rect x="3" y="6" width="18" height="12" rx="2"/><path d="M7 10h.01"/><path d="M11 10h6"/><path d="M7 14h10"/></svg>`;

const CHEVRON_ICON = `<svg class="payment-option__chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M9 18l6-6-6-6"/></svg>`;

let cachedCountry = null;

/**
 * Detect user country via IP (no GPS / permissions).
 * Falls back to null → international (PayPal primary).
 */
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

function ensureModal() {
  if (modalEl) return modalEl;

  modalEl = document.createElement('div');
  modalEl.className = 'payment-modal';
  modalEl.hidden = true;
  modalEl.innerHTML = `
    <div class="payment-modal__backdrop" data-payment-modal-close></div>
    <div class="payment-modal__dialog" role="dialog" aria-labelledby="paymentModalTitle" aria-modal="true">
      <button type="button" class="payment-modal__close" data-payment-modal-close aria-label="Close">&times;</button>
      <div class="payment-modal__header">
        <p class="payment-modal__eyebrow">Secure checkout</p>
        <h2 id="paymentModalTitle" class="payment-modal__title">Complete your subscription</h2>
        <p class="payment-modal__subtitle">Choose how you'd like to pay. Billing continues automatically each cycle until you cancel.</p>
      </div>
      <div class="payment-modal__options" data-payment-options></div>
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
  if (resolveSelection) {
    resolveSelection(result);
    resolveSelection = null;
  }
}

function buildOption(provider, { recommended, label, description, hints, icon }) {
  const hintHtml = hints.map((hint) => `<span class="payment-option__hint">${hint}</span>`).join('');
  return `
    <button type="button" class="payment-option${recommended ? ' payment-option--recommended' : ''}" data-payment-provider="${provider}">
      <span class="payment-option__icon-wrap">${icon}</span>
      <span class="payment-option__body">
        ${recommended ? '<span class="payment-option__badge">Recommended</span>' : ''}
        <span class="payment-option__label">${label}</span>
        <span class="payment-option__desc">${description}</span>
        <span class="payment-option__hints">${hintHtml}</span>
      </span>
      ${CHEVRON_ICON}
    </button>
  `;
}

/**
 * Show payment method selection modal.
 * @returns {Promise<'paypal'|'razorpay'|null>}
 */
export async function showPaymentSelector() {
  const country = await detectUserCountry();
  const india = isIndia(country);

  const modal = ensureModal();
  const optionsEl = modal.querySelector('[data-payment-options]');

  const razorpayOption = buildOption('razorpay', {
    recommended: india,
    label: 'Razorpay',
    description: india ? 'Best for India — pay in INR' : 'Cards, UPI & net banking',
    hints: india ? ['UPI', 'Debit & credit cards', 'Net banking'] : ['INR billing', 'UPI supported'],
    icon: RAZORPAY_ICON,
  });

  const paypalOption = buildOption('paypal', {
    recommended: !india,
    label: 'PayPal',
    description: !india ? 'Best for international cards — pay in USD' : 'International cards & PayPal balance',
    hints: !india ? ['Credit & debit cards', 'PayPal balance', 'USD billing'] : ['USD billing', 'Global cards'],
    icon: PAYPAL_ICON,
  });

  optionsEl.innerHTML = india
    ? razorpayOption + paypalOption
    : paypalOption + razorpayOption;

  return new Promise((resolve) => {
    resolveSelection = resolve;
    modal.hidden = false;
    document.body.classList.add('payment-modal-open');

    optionsEl.querySelectorAll('[data-payment-provider]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const provider = btn.dataset.paymentProvider;
        closePaymentModal(provider);
      }, { once: true });
    });
  });
}
