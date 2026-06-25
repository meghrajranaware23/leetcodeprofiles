import { getCurrentUser } from '../auth/auth-service.js';
import { apiPost, fetchRuntimeConfig } from './subscription-status.js';

let sdkLoadPromise = null;

export function loadRazorpaySdk() {
  if (window.Razorpay) return Promise.resolve(window.Razorpay);

  if (sdkLoadPromise) return sdkLoadPromise;

  sdkLoadPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve(window.Razorpay);
    script.onerror = () => reject(new Error('Failed to load Razorpay SDK'));
    document.head.appendChild(script);
  });

  return sdkLoadPromise;
}

export async function createRazorpaySubscription(planSlug) {
  return apiPost('/api/razorpay/create-subscription', { planSlug });
}

export async function verifyRazorpayPayment(payload) {
  return apiPost('/api/razorpay/verify-payment', payload);
}

export async function cancelRazorpaySubscription(subscriptionId) {
  return apiPost('/api/razorpay/cancel', { subscriptionId });
}

async function resolveRazorpayKeyId() {
  const cfg = await fetchRuntimeConfig();
  if (cfg.razorpayKeyId) return cfg.razorpayKeyId;

  const mode = import.meta.env.VITE_RAZORPAY_MODE === 'live' ? 'live' : 'test';
  if (mode === 'live') {
    return import.meta.env.VITE_RAZORPAY_LIVE_KEY_ID || null;
  }
  return import.meta.env.VITE_RAZORPAY_TEST_KEY_ID || null;
}

/**
 * Open Razorpay checkout modal for a subscription.
 * @returns {Promise<object>} verify-payment API result
 */
export async function openRazorpayCheckout({ subscriptionId, planSlug, onStatus }) {
  const user = getCurrentUser();
  if (!user) throw new Error('Sign in required');

  onStatus?.('Loading Razorpay…');

  const [Razorpay, keyId] = await Promise.all([
    loadRazorpaySdk(),
    resolveRazorpayKeyId(),
  ]);

  if (!keyId) {
    throw new Error('Razorpay is not configured');
  }

  onStatus?.('Opening checkout…');

  return new Promise((resolve, reject) => {
    const options = {
      key: keyId,
      subscription_id: subscriptionId,
      name: 'LeetCode Profiles',
      description: planSlug === 'full_arsenal_yearly'
        ? 'Full Arsenal — Yearly'
        : 'Full Arsenal — Monthly',
      prefill: {
        email: user.email || '',
        name: user.displayName || '',
      },
      theme: {
        color: '#dc2626',
      },
      handler: async (response) => {
        try {
          onStatus?.('Verifying payment…');
          const result = await verifyRazorpayPayment({
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySubscriptionId: response.razorpay_subscription_id,
            razorpaySignature: response.razorpay_signature,
          });
          resolve(result);
        } catch (err) {
          reject(err);
        }
      },
      modal: {
        ondismiss: () => {
          reject(Object.assign(new Error('Checkout cancelled'), { code: 'CHECKOUT_CANCELLED' }));
        },
      },
    };

    const rzp = new Razorpay(options);
    rzp.on('payment.failed', (response) => {
      const desc = response.error?.description || 'Payment failed';
      let message = desc;
      if (/recurring/i.test(desc)) {
        message += ' Try UPI in test mode (e.g. success@razorpay) or use subscription test card 5267 3181 8797 5449.';
      }
      reject(new Error(message));
    });
    rzp.open();
  });
}
