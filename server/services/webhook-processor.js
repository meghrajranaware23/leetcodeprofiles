import { FieldValue } from 'firebase-admin/firestore';
import { getDb } from '../config/firebase-admin.js';
import { COLLECTIONS } from '../constants.js';
import { getSubscription } from './paypal-client.js';
import { syncSubscriptionFromPayPal } from './entitlements-writer.js';

const SUBSCRIPTION_EVENT_TYPES = new Set([
  'BILLING.SUBSCRIPTION.ACTIVATED',
  'BILLING.SUBSCRIPTION.UPDATED',
  'BILLING.SUBSCRIPTION.RENEWED',
  'BILLING.SUBSCRIPTION.PAYMENT.SUCCEEDED',
  'BILLING.SUBSCRIPTION.PAYMENT.FAILED',
  'BILLING.SUBSCRIPTION.CANCELLED',
  'BILLING.SUBSCRIPTION.EXPIRED',
  'BILLING.SUBSCRIPTION.SUSPENDED',
  'PAYMENT.SALE.COMPLETED',
]);

function extractSubscriptionId(event) {
  const resource = event.resource;
  if (!resource) return null;

  if (resource.id && String(resource.id).startsWith('I-')) {
    return resource.id;
  }

  if (resource.billing_agreement_id) {
    return resource.billing_agreement_id;
  }

  const supplementary = event.resource?.supplementary_data?.related_ids;
  if (supplementary?.subscription_id) {
    return supplementary.subscription_id;
  }

  return null;
}

async function isEventProcessed(eventId) {
  const db = getDb();
  const doc = await db.collection(COLLECTIONS.SUBSCRIPTION_EVENTS).doc(eventId).get();
  return doc.exists;
}

async function markEventProcessed(eventId, data) {
  const db = getDb();
  await db.collection(COLLECTIONS.SUBSCRIPTION_EVENTS).doc(eventId).set({
    ...data,
    processedAt: FieldValue.serverTimestamp(),
  });
}

export async function processWebhookEvent(event) {
  const eventId = event.id;
  const eventType = event.event_type;

  if (!eventId || !eventType) {
    throw new Error('Invalid webhook event payload');
  }

  if (await isEventProcessed(eventId)) {
    return { status: 'skipped_duplicate', eventId, eventType };
  }

  if (!SUBSCRIPTION_EVENT_TYPES.has(eventType)) {
    await markEventProcessed(eventId, {
      eventType,
      status: 'skipped_unhandled',
      subscriptionId: extractSubscriptionId(event),
      uid: null,
      error: null,
    });
    return { status: 'skipped_unhandled', eventId, eventType };
  }

  const subscriptionId = extractSubscriptionId(event);
  if (!subscriptionId) {
    await markEventProcessed(eventId, {
      eventType,
      status: 'failed',
      subscriptionId: null,
      uid: null,
      error: 'Could not extract subscription ID',
    });
    return { status: 'failed', eventId, eventType, error: 'No subscription ID' };
  }

  try {
    const subscription = await getSubscription(subscriptionId);
    const uid = subscription.custom_id;

    if (!uid) {
      throw new Error('PayPal subscription missing custom_id (uid)');
    }

    const result = await syncSubscriptionFromPayPal(subscription, uid, {
      webhookEventId: eventId,
      webhookEventType: eventType,
    });

    await markEventProcessed(eventId, {
      eventType,
      status: 'processed',
      subscriptionId,
      uid,
      error: null,
    });

    return {
      status: 'processed',
      eventId,
      eventType,
      subscriptionId,
      uid,
      grantAccess: result.grantAccess,
    };
  } catch (err) {
    console.error(`Webhook processing failed for ${eventId}:`, err);
    await markEventProcessed(eventId, {
      eventType,
      status: 'failed',
      subscriptionId,
      uid: null,
      error: err.message,
    });
    throw err;
  }
}
