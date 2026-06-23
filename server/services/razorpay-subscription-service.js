import {
  createUserSubscription,
  activateUserSubscription,
  getUserSubscriptionStatus,
  cancelUserSubscription,
} from './subscription-service.js';
import { razorpayConfig, getRazorpayPlanId } from '../config/razorpay-config.js';
import { VALID_PLAN_SLUGS, PAYMENT_PROVIDERS } from '../constants.js';
import {
  createRazorpaySubscription,
  getRazorpaySubscription,
  cancelRazorpaySubscription,
  verifyPaymentSignature,
  getPlanSlugFromRazorpayPlanId,
  extractUidFromRazorpaySubscription,
} from './razorpay-client.js';
import {
  syncSubscriptionFromRazorpay,
  getActiveSubscriptionForUser,
} from './entitlements-writer.js';

export async function createUserRazorpaySubscription(uid, planSlug) {
  if (!VALID_PLAN_SLUGS.has(planSlug)) {
    throw Object.assign(new Error(`Invalid plan slug: ${planSlug}`), { status: 400 });
  }

  const existing = await getActiveSubscriptionForUser(uid);
  if (existing && isActiveSubscriptionRecord(existing)) {
    throw Object.assign(
      new Error('You already have an active subscription'),
      { status: 409, code: 'ACTIVE_SUBSCRIPTION_EXISTS' }
    );
  }

  const planId = getRazorpayPlanId(planSlug);
  const subscription = await createRazorpaySubscription({ planId, uid, planSlug });

  return {
    subscriptionId: subscription.id,
    keyId: razorpayConfig.keyId,
    status: subscription.status,
    planSlug,
    provider: PAYMENT_PROVIDERS.RAZORPAY,
    environment: razorpayConfig.mode,
  };
}

export async function verifyAndActivateRazorpayPayment(uid, {
  razorpayPaymentId,
  razorpaySubscriptionId,
  razorpaySignature,
}) {
  if (!razorpayPaymentId || !razorpaySubscriptionId || !razorpaySignature) {
    throw Object.assign(new Error('Missing payment verification fields'), { status: 400 });
  }

  const valid = verifyPaymentSignature({
    paymentId: razorpayPaymentId,
    subscriptionId: razorpaySubscriptionId,
    signature: razorpaySignature,
  });

  if (!valid) {
    throw Object.assign(new Error('Invalid payment signature'), { status: 400 });
  }

  const subscription = await getRazorpaySubscription(razorpaySubscriptionId);
  const subscriptionUid = extractUidFromRazorpaySubscription(subscription);

  if (subscriptionUid !== uid) {
    throw Object.assign(new Error('Subscription does not belong to this user'), { status: 403 });
  }

  const planSlug = getPlanSlugFromRazorpayPlanId(subscription.plan_id);
  const result = await syncSubscriptionFromRazorpay(subscription, uid, { planSlug });

  return {
    subscriptionId: subscription.id,
    paymentId: razorpayPaymentId,
    status: subscription.status,
    grantAccess: result.grantAccess,
    entitlements: result.entitlements,
    subscription: result.subscriptionRecord,
    provider: PAYMENT_PROVIDERS.RAZORPAY,
  };
}

export async function cancelUserRazorpaySubscription(uid, subscriptionId) {
  const subscription = await getRazorpaySubscription(subscriptionId);
  const subscriptionUid = extractUidFromRazorpaySubscription(subscription);

  if (subscriptionUid !== uid) {
    throw Object.assign(new Error('Subscription does not belong to this user'), { status: 403 });
  }

  await cancelRazorpaySubscription(subscriptionId, true);
  const updated = await getRazorpaySubscription(subscriptionId);
  const result = await syncSubscriptionFromRazorpay(updated, uid);

  return {
    subscriptionId,
    status: updated.status,
    grantAccess: result.grantAccess,
    subscription: result.subscriptionRecord,
    provider: PAYMENT_PROVIDERS.RAZORPAY,
  };
}

function isActiveSubscriptionRecord(record) {
  if (!record?.status) return false;
  const provider = record.provider || PAYMENT_PROVIDERS.PAYPAL;

  if (provider === PAYMENT_PROVIDERS.RAZORPAY) {
    if (['active', 'authenticated'].includes(record.status)) return true;
    if (record.status === 'cancelled' && record.currentPeriodEnd) {
      return Date.parse(record.currentPeriodEnd) > Date.now();
    }
    return false;
  }

  if (['ACTIVE', 'APPROVED'].includes(record.status)) return true;
  if (record.status === 'CANCELLED' && record.currentPeriodEnd) {
    return Date.parse(record.currentPeriodEnd) > Date.now();
  }
  return false;
}

export {
  createUserSubscription,
  activateUserSubscription,
  getUserSubscriptionStatus,
  cancelUserSubscription,
};
