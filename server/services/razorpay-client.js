import crypto from 'crypto';
import Razorpay from 'razorpay';
import { razorpayConfig } from '../config/razorpay-config.js';
import { PLAN_SLUGS, RAZORPAY_TOTAL_COUNT } from '../constants.js';

let clientInstance = null;

function getClient() {
  if (!clientInstance) {
    clientInstance = new Razorpay({
      key_id: razorpayConfig.keyId,
      key_secret: razorpayConfig.keySecret,
    });
  }
  return clientInstance;
}

export function getBillingIntervalFromPlanSlug(planSlug) {
  return planSlug === PLAN_SLUGS.YEARLY ? 'year' : 'month';
}

export function getPlanSlugFromRazorpayPlanId(planId) {
  if (!planId) return null;
  for (const [slug, id] of Object.entries(razorpayConfig.plans)) {
    if (id === planId) return slug;
  }
  return null;
}

export async function createRazorpaySubscription({ planId, uid, planSlug }) {
  const client = getClient();
  const totalCount = RAZORPAY_TOTAL_COUNT[planSlug] || 120;

  return client.subscriptions.create({
    plan_id: planId,
    total_count: totalCount,
    quantity: 1,
    customer_notify: 1,
    notes: { uid },
  });
}

export async function getRazorpaySubscription(subscriptionId) {
  const client = getClient();
  return client.subscriptions.fetch(subscriptionId);
}

export async function cancelRazorpaySubscription(subscriptionId, cancelAtCycleEnd = true) {
  const client = getClient();
  return client.subscriptions.cancel(subscriptionId, cancelAtCycleEnd);
}

export function verifyPaymentSignature({ paymentId, subscriptionId, signature }) {
  const body = `${paymentId}|${subscriptionId}`;
  const expected = crypto
    .createHmac('sha256', razorpayConfig.keySecret)
    .update(body)
    .digest('hex');
  return expected === signature;
}

export function verifyWebhookSignature(rawBody, signature) {
  if (!razorpayConfig.webhookSecret) {
    console.warn('RAZORPAY_WEBHOOK_SECRET not set — skipping webhook verification (dev only)');
    return false;
  }
  const expected = crypto
    .createHmac('sha256', razorpayConfig.webhookSecret)
    .update(rawBody)
    .digest('hex');
  return expected === signature;
}

export function parseRazorpaySubscriptionDates(subscription) {
  const startDate = subscription.start_at
    ? new Date(subscription.start_at * 1000).toISOString()
    : subscription.created_at
      ? new Date(subscription.created_at * 1000).toISOString()
      : null;

  const currentPeriodEnd = subscription.current_end
    ? new Date(subscription.current_end * 1000).toISOString()
    : null;

  const nextBillingDate = subscription.charge_at
    ? new Date(subscription.charge_at * 1000).toISOString()
    : currentPeriodEnd;

  const lastPaymentAt = subscription.paid_count > 0 && subscription.current_start
    ? new Date(subscription.current_start * 1000).toISOString()
    : null;

  return {
    startDate,
    currentPeriodEnd,
    nextBillingDate,
    cancelAtPeriodEnd: subscription.end_at != null,
    lastPaymentAt,
    lastPaymentStatus: subscription.paid_count > 0 ? 'succeeded' : null,
  };
}

export function extractUidFromRazorpaySubscription(subscription) {
  return subscription?.notes?.uid || null;
}

function formatRazorpayPlanPrice(plan) {
  const rawAmount = plan?.item?.amount;
  const currency = (plan?.item?.currency || 'INR').toUpperCase();
  if (rawAmount == null) return null;

  const major = rawAmount / 100;
  const amount = currency === 'INR'
    ? String(Math.round(major))
    : major.toFixed(2).replace(/\.00$/, '');

  return { amount, currency };
}

/**
 * Fetch display prices from configured Razorpay plan IDs.
 * Billing at checkout always uses the plan linked to the subscription.
 */
export async function fetchRazorpayPlanPrices() {
  if (!razorpayConfig.keyId || !razorpayConfig.keySecret) {
    return null;
  }

  const client = getClient();
  const prices = {};

  await Promise.all(
    Object.entries(razorpayConfig.plans).map(async ([slug, planId]) => {
      if (!planId) return;
      try {
        const plan = await client.plans.fetch(planId);
        prices[slug] = formatRazorpayPlanPrice(plan);
      } catch (err) {
        console.warn(`Failed to fetch Razorpay plan ${planId}:`, err.message);
      }
    })
  );

  return Object.keys(prices).length ? prices : null;
}
