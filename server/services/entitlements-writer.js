import { FieldValue } from 'firebase-admin/firestore';
import { getDb } from '../config/firebase-admin.js';
import { paypalConfig } from '../config/paypal-config.js';
import {
  COLLECTIONS,
  PREMIUM_PACK_IDS,
  USER_FIELDS,
  ACTIVE_PAYPAL_STATUSES,
  REVOKED_PAYPAL_STATUSES,
  PAYMENT_GRACE_MS,
} from '../constants.js';
import {
  parseSubscriptionDates,
  getPlanSlugFromPayPalPlanId,
  getBillingIntervalFromPlanSlug,
} from './paypal-client.js';

function nowIso() {
  return new Date().toISOString();
}

function buildSubscriptionRecord(subscription, uid, planSlug) {
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
    paypalSubscriptionId: subscription.id,
    planSlug: resolvedPlanSlug,
    paypalPlanId,
    status,
    billingInterval: resolvedPlanSlug
      ? getBillingIntervalFromPlanSlug(resolvedPlanSlug)
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

function buildEntitlements(subscriptionRecord, grantAccess) {
  if (!grantAccess) {
    return {
      status: 'inactive',
      plan: 'bundle',
      ownedPacks: [],
      expiresAt: subscriptionRecord.currentPeriodEnd || null,
      source: 'paypal',
      subscriptionId: subscriptionRecord.paypalSubscriptionId,
      updatedAt: nowIso(),
    };
  }

  return {
    status: 'active',
    plan: 'bundle',
    ownedPacks: [...PREMIUM_PACK_IDS],
    expiresAt: subscriptionRecord.currentPeriodEnd || null,
    source: 'paypal',
    subscriptionId: subscriptionRecord.paypalSubscriptionId,
    updatedAt: nowIso(),
  };
}

function shouldGrantAccess(subscription, subscriptionRecord) {
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

  const db = getDb();
  const subscriptionRecord = buildSubscriptionRecord(subscription, uid, planSlug);
  const grantAccess = shouldGrantAccess(subscription, subscriptionRecord);
  const entitlements = buildEntitlements(subscriptionRecord, grantAccess);

  const subRef = db.collection(COLLECTIONS.SUBSCRIPTIONS).doc(subscription.id);
  const userRef = db.collection(COLLECTIONS.USERS).doc(uid);

  const existingSub = await subRef.get();
  const subPayload = {
    uid,
    ...subscriptionRecord,
    environment: paypalConfig.mode,
    paypalPayerId: subscription.subscriber?.payer_id || null,
    lastWebhookEventId: webhookEventId || null,
    lastWebhookEventType: webhookEventType || null,
    updatedAt: FieldValue.serverTimestamp(),
  };
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

  return { subscriptionRecord, entitlements, grantAccess };
}

export async function revokeEntitlements(uid, subscriptionId) {
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
      source: 'paypal',
      subscriptionId: subscriptionId || existingSub?.paypalSubscriptionId || null,
      updatedAt: now,
    },
    [USER_FIELDS.SUBSCRIPTION]: {
      ...(existingSub || {}),
      renewalStatus: 'expired',
      status: 'EXPIRED',
      updatedAt: now,
    },
  }, { merge: true });
}

export async function getActiveSubscriptionForUser(uid) {
  const db = getDb();
  const snapshot = await db.collection(COLLECTIONS.SUBSCRIPTIONS)
    .where('uid', '==', uid)
    .get();

  let best = null;

  for (const doc of snapshot.docs) {
    const data = doc.data();
    const isActive = ACTIVE_PAYPAL_STATUSES.has(data.status);
    const isCancelledWithAccess = data.status === 'CANCELLED'
      && data.currentPeriodEnd
      && Date.parse(data.currentPeriodEnd) > Date.now();

    if (isActive || isCancelledWithAccess) {
      if (!best || (data.updatedAt && data.updatedAt > (best.updatedAt || ''))) {
        best = { id: doc.id, ...data };
      }
    }
  }

  return best;
}
