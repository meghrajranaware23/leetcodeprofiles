/** Canonical premium pack IDs — must match progress-store.js PACK_IDS. */
export const PREMIUM_PACK_IDS = Object.freeze([
  'arrays-strings',
  'recursion',
  'trees',
  'graphs',
  'dynamic-programming',
]);

export const PLAN_SLUGS = Object.freeze({
  MONTHLY: 'full_arsenal_monthly',
  YEARLY: 'full_arsenal_yearly',
});

export const VALID_PLAN_SLUGS = new Set(Object.values(PLAN_SLUGS));

/** Display-only subscription prices (actual billing uses PayPal plan IDs). */
export const SUBSCRIPTION_PRICES = Object.freeze({
  full_arsenal_monthly: { amount: '4.99', currency: 'USD' },
  full_arsenal_yearly: { amount: '29.99', currency: 'USD' },
});

export const PAYMENT_PROVIDERS = Object.freeze({
  PAYPAL: 'paypal',
  RAZORPAY: 'razorpay',
});

export const COLLECTIONS = Object.freeze({
  USERS: 'users',
  SUBSCRIPTIONS: 'subscriptions',
  SUBSCRIPTION_EVENTS: 'subscription_events',
  PLANS: 'plans',
});

export const USER_FIELDS = Object.freeze({
  ENTITLEMENTS: 'entitlements',
  SUBSCRIPTION: 'subscription',
});

/** PayPal subscription statuses that grant premium access. */
export const ACTIVE_PAYPAL_STATUSES = new Set(['ACTIVE', 'APPROVED']);

/** Razorpay subscription statuses that grant premium access. */
export const ACTIVE_RAZORPAY_STATUSES = new Set(['active', 'authenticated']);

/** Statuses that revoke access immediately. */
export const REVOKED_PAYPAL_STATUSES = new Set(['EXPIRED', 'SUSPENDED']);

/** Razorpay statuses that revoke access immediately. */
export const REVOKED_RAZORPAY_STATUSES = new Set(['expired', 'completed', 'halted']);

/** Razorpay billing cycle counts (required by Razorpay API). */
export const RAZORPAY_TOTAL_COUNT = Object.freeze({
  full_arsenal_monthly: 120,
  full_arsenal_yearly: 10,
});

/** Grace period after failed payment (ms). */
export const PAYMENT_GRACE_MS = 3 * 24 * 60 * 60 * 1000;
