import { FieldValue } from 'firebase-admin/firestore';
import { getDb } from '../config/firebase-admin.js';
import { paypalConfig } from '../config/paypal-config.js';
import { razorpayConfig } from '../config/razorpay-config.js';
import {
  COLLECTIONS,
  PREMIUM_PACK_IDS,
  USER_FIELDS,
  ACTIVE_PAYPAL_STATUSES,
  ACTIVE_RAZORPAY_STATUSES,
  REVOKED_PAYPAL_STATUSES,
  REVOKED_RAZORPAY_STATUSES,
  PAYMENT_GRACE_MS,
  PAYMENT_PROVIDERS,
} from '../constants.js';
import {
  parseSubscriptionDates,
  getPlanSlugFromPayPalPlanId,
  getBillingIntervalFromPlanSlug as getPayPalBillingInterval,
} from './paypal-client.js';
import {
  parseRazorpaySubscriptionDates,
  getPlanSlugFromRazorpayPlanId,
  getBillingIntervalFromPlanSlug as getRazorpayBillingInterval,
  extractUidFromRazorpaySubscription,
} from './razorpay-client.js';

function nowIso() {
  return new Date().toISOString();
}

function buildPayPalSubscriptionRecord(subscription, uid, planSlug) {
  const dates = parseSubscriptionDates(subscription);
  const status = subscription.status || 'UNKNOWN';
  const paypalPlanId = subscription.plan_id || null;
  const resolvedPlanSlug = planSlug || getPlanSlugFromPayPalPlanId(paypalPlanId);

  let renewalStatus = 'active';
  if (status === 'CANCELLED') renewalStatus = 'cancelled';
  else if (status === 'EXPIRED') renewalStatus = 'expired';
  else if (status === 'SUSPENDED') renewalStatus = 'expired';
  else if (subscription.billing_info?.last_failed_payment) renewalStatus = 'past_due';

  return {
    provider: PAYMENT_PROVIDERS.PAYPAL,
    subscriptionId: subscription.id,
    paypalSubscriptionId: subscription.id,
    razorpaySubscriptionId: null,
    planSlug: resolvedPlanSlug,
    paypalPlanId,
    razorpayPlanId: null,
    status,
    billingInterval: resolvedPlanSlug
      ? getPayPalBillingInterval(resolvedPlanSlug)
      : 'month',
    startDate: dates.startDate,
    currentPeriodEnd: dates.currentPeriodEnd,
    nextBillingDate: dates.nextBillingDate,
    cancelAtPeriodEnd: dates.cancelAtPeriodEnd,
    cancelledAt: status === 'CANCELLED' ? nowIso() : null,
    renewalStatus,
    lastPaymentAt: dates.lastPaymentAt,
    lastPaymentStatus: dates.lastPaymentStatus,
    payerEmail: subscription.subscriber?.email_address || null,
    updatedAt: nowIso(),
  };
}

function buildRazorpaySubscriptionRecord(subscription, uid, planSlug) {
  const dates = parseRazorpaySubscriptionDates(subscription);
  const status = subscription.status || 'unknown';
  const razorpayPlanId = subscription.plan_id || null;
  const resolvedPlanSlug = planSlug || getPlanSlugFromRazorpayPlanId(razorpayPlanId);

  let renewalStatus = 'active';
  if (status === 'cancelled') renewalStatus = 'cancelled';
  else if (status === 'expired' || status === 'completed' || status === 'halted') {
    renewalStatus = 'expired';
  } else if (status === 'paused') renewalStatus = 'past_due';

  return {
    provider: PAYMENT_PROVIDERS.RAZORPAY,
    subscriptionId: subscription.id,
    paypalSubscriptionId: null,
    razorpaySubscriptionId: subscription.id,
    planSlug: resolvedPlanSlug,
    paypalPlanId: null,
    razorpayPlanId,
    status,
    billingInterval: resolvedPlanSlug
      ? getRazorpayBillingInterval(resolvedPlanSlug)
      : 'month',
    startDate: dates.startDate,
    currentPeriodEnd: dates.currentPeriodEnd,
    nextBillingDate: dates.nextBillingDate,
    cancelAtPeriodEnd: dates.cancelAtPeriodEnd,
    cancelledAt: status === 'cancelled' ? nowIso() : null,
    renewalStatus,
    lastPaymentAt: dates.lastPaymentAt,
    lastPaymentStatus: dates.lastPaymentStatus,
    payerEmail: subscription.customer_email || null,
    updatedAt: nowIso(),
  };
}

function buildEntitlements(subscriptionRecord, grantAccess, source) {
  const subscriptionId = subscriptionRecord.subscriptionId
    || subscriptionRecord.paypalSubscriptionId
    || subscriptionRecord.razorpaySubscriptionId;

  if (!grantAccess) {
    return {
      status: 'inactive',
      plan: 'bundle',
      ownedPacks: [],
      expiresAt: subscriptionRecord.currentPeriodEnd || null,
      source,
      subscriptionId,
      updatedAt: nowIso(),
    };
  }

  return {
    status: 'active',
    plan: 'bundle',
    ownedPacks: [...PREMIUM_PACK_IDS],
    expiresAt: subscriptionRecord.currentPeriodEnd || null,
    source,
    subscriptionId,
    updatedAt: nowIso(),
  };
}

function shouldGrantPayPalAccess(subscription, subscriptionRecord) {
  const status = subscription.status;

  if (ACTIVE_PAYPAL_STATUSES.has(status)) {
    return true;
  }

  if (status === 'CANCELLED') {
    if (subscriptionRecord.currentPeriodEnd) {
      return Date.parse(subscriptionRecord.currentPeriodEnd) > Date.now();
    }
    return false;
  }

  if (REVOKED_PAYPAL_STATUSES.has(status)) {
    return false;
  }

  if (subscriptionRecord.renewalStatus === 'past_due') {
    const failedAt = subscription.billing_info?.last_failed_payment?.time;
    if (failedAt) {
      return Date.now() - Date.parse(failedAt) < PAYMENT_GRACE_MS;
    }
    return false;
  }

  return false;
}

function shouldGrantRazorpayAccess(subscription, subscriptionRecord) {
  const status = subscription.status;

  if (ACTIVE_RAZORPAY_STATUSES.has(status)) {
    return true;
  }

  if (status === 'cancelled') {
    if (subscriptionRecord.currentPeriodEnd) {
      return Date.parse(subscriptionRecord.currentPeriodEnd) > Date.now();
    }
    return false;
  }

  if (REVOKED_RAZORPAY_STATUSES.has(status)) {
    return false;
  }

  if (status === 'paused') {
    return false;
  }

  return false;
}

async function syncSubscriptionToFirestore(subscriptionRecord, entitlements, uid, {
  webhookEventId,
  webhookEventType,
  environment,
  provider,
  payerId,
  subscriptionId,
}) {
  const db = getDb();
  const subRef = db.collection(COLLECTIONS.SUBSCRIPTIONS).doc(subscriptionId);
  const userRef = db.collection(COLLECTIONS.USERS).doc(uid);

  const existingSub = await subRef.get();
  const subPayload = {
    uid,
    ...subscriptionRecord,
    environment,
    provider,
    lastWebhookEventId: webhookEventId || null,
    lastWebhookEventType: webhookEventType || null,
    updatedAt: FieldValue.serverTimestamp(),
  };

  if (provider === PAYMENT_PROVIDERS.PAYPAL) {
    subPayload.paypalPayerId = payerId || null;
  }

  if (!existingSub.exists) {
    subPayload.createdAt = FieldValue.serverTimestamp();
  }

  const batch = db.batch();
  batch.set(subRef, subPayload, { merge: true });
  batch.set(userRef, {
    [USER_FIELDS.SUBSCRIPTION]: subscriptionRecord,
    [USER_FIELDS.ENTITLEMENTS]: entitlements,
  }, { merge: true });

  await batch.commit();

  return { subscriptionRecord, entitlements };
}

/**
 * Sync subscription + entitlements to Firestore from PayPal subscription object.
 */
export async function syncSubscriptionFromPayPal(subscription, uid, {
  planSlug,
  webhookEventId,
  webhookEventType,
} = {}) {
  if (!subscription?.id) {
    throw new Error('Invalid PayPal subscription payload');
  }

  if (subscription.custom_id && subscription.custom_id !== uid) {
    throw new Error('PayPal subscription custom_id does not match uid');
  }

  const subscriptionRecord = buildPayPalSubscriptionRecord(subscription, uid, planSlug);
  const grantAccess = shouldGrantPayPalAccess(subscription, subscriptionRecord);
  const entitlements = buildEntitlements(
    subscriptionRecord,
    grantAccess,
    PAYMENT_PROVIDERS.PAYPAL
  );

  await syncSubscriptionToFirestore(subscriptionRecord, entitlements, uid, {
    webhookEventId,
    webhookEventType,
    environment: paypalConfig.mode,
    provider: PAYMENT_PROVIDERS.PAYPAL,
    payerId: subscription.subscriber?.payer_id || null,
    subscriptionId: subscription.id,
  });

  return { subscriptionRecord, entitlements, grantAccess };
}

/**
 * Sync subscription + entitlements to Firestore from Razorpay subscription object.
 */
export async function syncSubscriptionFromRazorpay(subscription, uid, {
  planSlug,
  webhookEventId,
  webhookEventType,
} = {}) {
  if (!subscription?.id) {
    throw new Error('Invalid Razorpay subscription payload');
  }

  const subscriptionUid = extractUidFromRazorpaySubscription(subscription);
  if (subscriptionUid && subscriptionUid !== uid) {
    throw new Error('Razorpay subscription notes.uid does not match uid');
  }

  const subscriptionRecord = buildRazorpaySubscriptionRecord(subscription, uid, planSlug);
  const grantAccess = shouldGrantRazorpayAccess(subscription, subscriptionRecord);
  const entitlements = buildEntitlements(
    subscriptionRecord,
    grantAccess,
    PAYMENT_PROVIDERS.RAZORPAY
  );

  await syncSubscriptionToFirestore(subscriptionRecord, entitlements, uid, {
    webhookEventId,
    webhookEventType,
    environment: razorpayConfig.mode,
    provider: PAYMENT_PROVIDERS.RAZORPAY,
    subscriptionId: subscription.id,
  });

  return { subscriptionRecord, entitlements, grantAccess };
}

export async function revokeEntitlements(uid, subscriptionId, source = PAYMENT_PROVIDERS.PAYPAL) {
  const db = getDb();
  const userRef = db.collection(COLLECTIONS.USERS).doc(uid);
  const now = nowIso();
  const userSnap = await userRef.get();
  const existingSub = userSnap.exists ? userSnap.data()?.[USER_FIELDS.SUBSCRIPTION] : null;

  await userRef.set({
    [USER_FIELDS.ENTITLEMENTS]: {
      status: 'inactive',
      plan: 'bundle',
      ownedPacks: [],
      expiresAt: now,
      source,
      subscriptionId: subscriptionId || existingSub?.subscriptionId || null,
      updatedAt: now,
    },
    [USER_FIELDS.SUBSCRIPTION]: {
      ...(existingSub || {}),
      renewalStatus: 'expired',
      status: source === PAYMENT_PROVIDERS.RAZORPAY ? 'expired' : 'EXPIRED',
      updatedAt: now,
    },
  }, { merge: true });
}

function isActiveSubscription(data) {
  const provider = data.provider || PAYMENT_PROVIDERS.PAYPAL;

  if (provider === PAYMENT_PROVIDERS.RAZORPAY) {
    const isActive = ACTIVE_RAZORPAY_STATUSES.has(data.status);
    const isCancelledWithAccess = data.status === 'cancelled'
      && data.currentPeriodEnd
      && Date.parse(data.currentPeriodEnd) > Date.now();
    return isActive || isCancelledWithAccess;
  }

  const isActive = ACTIVE_PAYPAL_STATUSES.has(data.status);
  const isCancelledWithAccess = data.status === 'CANCELLED'
    && data.currentPeriodEnd
    && Date.parse(data.currentPeriodEnd) > Date.now();
  return isActive || isCancelledWithAccess;
}

export async function getActiveSubscriptionForUser(uid) {
  const db = getDb();
  const snapshot = await db.collection(COLLECTIONS.SUBSCRIPTIONS)
    .where('uid', '==', uid)
    .get();

  let best = null;

  for (const doc of snapshot.docs) {
    const data = doc.data();

    if (isActiveSubscription(data)) {
      const updatedAt = data.updatedAt?.toDate?.()
        ? data.updatedAt.toDate().toISOString()
        : data.updatedAt;
      if (!best || (updatedAt && updatedAt > (best.updatedAt || ''))) {
        best = { id: doc.id, ...data, updatedAt };
      }
    }
  }

  return best;
}
