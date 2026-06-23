import { getDb } from '../config/firebase-admin.js';
import { initFirebaseAdmin } from '../config/firebase-admin.js';
import { COLLECTIONS } from '../constants.js';
import { getSubscription } from '../services/paypal-client.js';
import { syncSubscriptionFromPayPal } from '../services/entitlements-writer.js';

const STALE_MS = 24 * 60 * 60 * 1000;

async function reconcileSubscriptions() {
  await initFirebaseAdmin();
  const db = getDb();
  const cutoff = new Date(Date.now() - STALE_MS).toISOString();

  const snapshot = await db.collection(COLLECTIONS.SUBSCRIPTIONS)
    .where('status', '==', 'ACTIVE')
    .where('nextBillingDate', '<', cutoff)
    .limit(50)
    .get();

  const results = [];

  for (const doc of snapshot.docs) {
    const data = doc.data();
    try {
      const subscription = await getSubscription(doc.id);
      await syncSubscriptionFromPayPal(subscription, data.uid, {
        webhookEventType: 'RECONCILIATION',
      });
      results.push({ subscriptionId: doc.id, status: 'synced' });
    } catch (err) {
      console.error(`Reconciliation failed for ${doc.id}:`, err.message);
      results.push({ subscriptionId: doc.id, status: 'failed', error: err.message });
    }
  }

  console.log(`Reconciliation complete: ${results.length} subscriptions checked`);
  return results;
}

if (process.argv[1]?.includes('reconcile-subscriptions')) {
  reconcileSubscriptions()
    .then((results) => {
      console.log(JSON.stringify(results, null, 2));
      process.exit(0);
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}

export { reconcileSubscriptions };
