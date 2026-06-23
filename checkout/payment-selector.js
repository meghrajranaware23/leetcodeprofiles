const COUNTRY_CACHE_KEY = 'lp_detected_country';

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
      <h2 id="paymentModalTitle" class="payment-modal__title">Choose payment method</h2>
      <p class="payment-modal__subtitle">Select how you'd like to pay for your subscription.</p>
      <div class="payment-modal__options" data-payment-options></div>
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

function buildOption(provider, { recommended, label, description }) {
  return `
    <button type="button" class="payment-option${recommended ? ' payment-option--recommended' : ''}" data-payment-provider="${provider}">
      ${recommended ? '<span class="payment-option__badge">Recommended</span>' : ''}
      <span class="payment-option__label">${label}</span>
      <span class="payment-option__desc">${description}</span>
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
    description: india ? 'UPI, cards & net banking (INR)' : 'Cards & UPI',
  });

  const paypalOption = buildOption('paypal', {
    recommended: !india,
    label: 'PayPal',
    description: !india ? 'Credit/debit cards & PayPal balance (USD)' : 'International cards (USD)',
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
