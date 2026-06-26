/** Client-side plan copy for checkout modal — keyed by plan slug. */

export const PLAN_DETAILS = Object.freeze({
  full_arsenal_monthly: {
    title: 'Monthly Plan',
    eyebrow: 'Full Arsenal',
    frequencyLabel: 'per month · billed automatically',
    description: 'Unlock all premium ascension packs — Arrays & Strings, Recursion, Trees, Graphs, Dynamic Programming, and every future release.',
  },
  full_arsenal_yearly: {
    title: 'Yearly Plan',
    eyebrow: 'Full Arsenal',
    frequencyLabel: 'per year · billed automatically',
    description: 'Best long-term value. Everything in Monthly with uninterrupted access all year — save ~50% vs monthly billing.',
  },
});

const FALLBACK_USD = Object.freeze({
  full_arsenal_monthly: { amount: '4.99', currency: 'USD' },
  full_arsenal_yearly: { amount: '29.99', currency: 'USD' },
});

export function getPlanDetails(planSlug) {
  return PLAN_DETAILS[planSlug] || PLAN_DETAILS.full_arsenal_monthly;
}

function formatPrice(amount, currency) {
  if (currency === 'INR') {
    const num = Number.parseFloat(amount);
    if (Number.isFinite(num)) {
      return `₹${num % 1 === 0 ? num.toFixed(0) : num.toFixed(2)}`;
    }
    return `₹${amount}`;
  }
  if (currency === 'USD') {
    return `$${amount}`;
  }
  return `${amount} ${currency}`;
}

/**
 * Resolve display price for modal from runtime config.
 * @param {string} planSlug
 * @param {object|null} config — from GET /api/config
 * @param {boolean} india
 */
export function resolvePlanPricing(planSlug, config, india) {
  const plan = config?.plans?.find((p) => p.slug === planSlug);
  const fallback = FALLBACK_USD[planSlug] || FALLBACK_USD.full_arsenal_monthly;

  if (india && plan?.razorpayPrice?.amount) {
    return {
      display: formatPrice(plan.razorpayPrice.amount, plan.razorpayPrice.currency || 'INR'),
      currencyLabel: plan.razorpayPrice.currency || 'INR',
      billingNote: `${plan.razorpayPrice.currency || 'INR'} · billed automatically`,
    };
  }

  const usd = plan?.price || fallback;
  return {
    display: formatPrice(usd.amount, usd.currency || 'USD'),
    currencyLabel: usd.currency || 'USD',
    billingNote: `${usd.currency || 'USD'} · billed automatically`,
  };
}
