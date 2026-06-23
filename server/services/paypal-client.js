import { paypalConfig } from '../config/paypal-config.js';

let cachedToken = null;
let tokenExpiresAt = 0;

async function fetchAccessToken() {
  const now = Date.now();
  if (cachedToken && tokenExpiresAt > now + 60_000) {
    return cachedToken;
  }

  const credentials = Buffer.from(
    `${paypalConfig.clientId}:${paypalConfig.clientSecret}`
  ).toString('base64');

  const response = await fetch(`${paypalConfig.apiBase}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`PayPal OAuth failed (${response.status}): ${text}`);
  }

  const data = await response.json();
  cachedToken = data.access_token;
  tokenExpiresAt = now + (data.expires_in * 1000);
  return cachedToken;
}

/**
 * @param {string} path - e.g. '/v1/billing/subscriptions'
 * @param {{ method?: string, body?: object }} options
 */
export async function paypalRequest(path, { method = 'GET', body } = {}) {
  const token = await fetchAccessToken();
  const response = await fetch(`${paypalConfig.apiBase}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Prefer: 'return=representation',
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const text = await response.text();
  let data = null;
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = { raw: text };
    }
  }

  if (!response.ok) {
    const message = data?.message || data?.details?.[0]?.description || text;
    const err = new Error(`PayPal API ${method} ${path} failed (${response.status}): ${message}`);
    err.status = response.status;
    err.paypal = data;
    throw err;
  }

  return data;
}

export async function getSubscription(subscriptionId) {
  return paypalRequest(`/v1/billing/subscriptions/${subscriptionId}`);
}

export async function createSubscription({ planId, uid, returnUrl, cancelUrl }) {
  return paypalRequest('/v1/billing/subscriptions', {
    method: 'POST',
    body: {
      plan_id: planId,
      custom_id: uid,
      application_context: {
        brand_name: 'LeetCode Profiles',
        locale: 'en-US',
        shipping_preference: 'NO_SHIPPING',
        user_action: 'SUBSCRIBE_NOW',
        return_url: returnUrl,
        cancel_url: cancelUrl,
      },
    },
  });
}

export async function cancelPayPalSubscription(subscriptionId, reason = 'User requested cancellation') {
  return paypalRequest(`/v1/billing/subscriptions/${subscriptionId}/cancel`, {
    method: 'POST',
    body: { reason },
  });
}

export function extractApprovalUrl(subscription) {
  const link = subscription?.links?.find((l) => l.rel === 'approve');
  return link?.href || null;
}

export function parseSubscriptionDates(subscription) {
  const billingInfo = subscription?.billing_info || {};
  const lastPayment = billingInfo.last_payment;
  const cycleExecutions = billingInfo.cycle_executions || [];
  const currentCycle = cycleExecutions.find((c) => c.tenure_type === 'REGULAR')
    || cycleExecutions[cycleExecutions.length - 1];

  const startDate = subscription.start_time || subscription.create_time || null;
  const nextBillingDate = billingInfo.next_billing_time || null;
  const currentPeriodEnd = nextBillingDate
    || billingInfo.final_payment_time
    || null;

  return {
    startDate,
    nextBillingDate,
    currentPeriodEnd,
    lastPaymentAt: lastPayment?.time || null,
    lastPaymentStatus: lastPayment?.status || null,
    cancelAtPeriodEnd: Boolean(billingInfo.cycle_executions?.some(
      (c) => c.cycles_remaining === 0 && c.total_cycles === 0
    )),
  };
}

export function getBillingIntervalFromPlanSlug(planSlug) {
  return planSlug === 'full_arsenal_yearly' ? 'year' : 'month';
}

export function getPlanSlugFromPayPalPlanId(paypalPlanId) {
  const entries = Object.entries(paypalConfig.plans);
  const match = entries.find(([, id]) => id === paypalPlanId);
  return match?.[0] || null;
}
