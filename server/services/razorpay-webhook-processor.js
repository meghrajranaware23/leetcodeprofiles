import { FieldValue } from 'firebase-admin/firestore';
import { getDb } from '../config/firebase-admin.js';
import { COLLECTIONS } from '../constants.js';
import { getRazorpaySubscription } from './razorpay-client.js';
import { syncSubscriptionFromRazorpay } from './entitlements-writer.js';

const RAZORPAY_EVENT_TYPES = new Set([
  'subscription.activated',
  'subscription.charged',
  'subscription.completed',
  'subscription.cancelled',
  'subscription.paused',
  'subscription.resumed',
  'subscription.pending',
  'subscription.halted',
  'payment.failed',
]);

function extractSubscriptionId(event) {
  const payload = event.payload;
  if (!payload) return null;

  if (payload.subscription?.entity?.id) {
    return payload.subscription.entity.id;
  }

  if (payload.payment?.entity?.subscription_id) {
    return payload.payment.entity.subscription_id;
  }

  return null;
}

async function isEventProcessed(eventId) {
  const db = getDb();
  const doc = await db.collection(COLLECTIONS.SUBSCRIPTION_EVENTS).doc(`rzp_${eventId}`).get();
  return doc.exists;
}

async function markEventProcessed(eventId, data) {
  const db = getDb();
  await db.collection(COLLECTIONS.SUBSCRIPTION_EVENTS).doc(`rzp_${eventId}`).set({
    ...data,
    provider: 'razorpay',
    processedAt: FieldValue.serverTimestamp(),
  });
}

export async function processRazorpayWebhookEvent(event) {
  const eventId = event.event_id || event.id;
  const eventType = event.event;

  if (!eventId || !eventType) {
    throw new Error('Invalid Razorpay webhook event payload');
  }

  if (await isEventProcessed(eventId)) {
    return { status: 'skipped_duplicate', eventId, eventType };
  }

  if (!RAZORPAY_EVENT_TYPES.has(eventType)) {
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
    const subscription = await getRazorpaySubscription(subscriptionId);
    const uid = subscription.notes?.uid;

    if (!uid) {
      throw new Error('Razorpay subscription missing notes.uid');
    }

    const result = await syncSubscriptionFromRazorpay(subscription, uid, {
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
    console.error(`Razorpay webhook processing failed for ${eventId}:`, err);
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
