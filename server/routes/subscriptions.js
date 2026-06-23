import { Router } from 'express';
import { verifyFirebaseToken } from '../middleware/verify-firebase-token.js';
import { paypalConfig } from '../config/paypal-config.js';
import { PLAN_SLUGS, SUBSCRIPTION_PRICES } from '../constants.js';
import {
  createUserSubscription,
  activateUserSubscription,
  getUserSubscriptionStatus,
  cancelUserSubscription,
} from '../services/subscription-service.js';

const router = Router();

router.post('/create', verifyFirebaseToken, async (req, res) => {
  try {
    const { planSlug } = req.body || {};
    if (!planSlug) {
      return res.status(400).json({ error: 'planSlug is required' });
    }

    const result = await createUserSubscription(req.uid, planSlug);
    return res.json(result);
  } catch (err) {
    console.error('POST /create failed:', err);
    const status = err.status || 500;
    return res.status(status).json({
      error: err.message,
      code: err.code || undefined,
    });
  }
});

router.post('/activate', verifyFirebaseToken, async (req, res) => {
  try {
    const { subscriptionId } = req.body || {};
    if (!subscriptionId) {
      return res.status(400).json({ error: 'subscriptionId is required' });
    }

    const result = await activateUserSubscription(req.uid, subscriptionId);
    return res.json(result);
  } catch (err) {
    console.error('POST /activate failed:', err);
    const status = err.status || 500;
    return res.status(status).json({ error: err.message });
  }
});

router.get('/status', verifyFirebaseToken, async (req, res) => {
  try {
    const result = await getUserSubscriptionStatus(req.uid);
    return res.json(result);
  } catch (err) {
    console.error('GET /status failed:', err);
    return res.status(500).json({ error: err.message });
  }
});

router.post('/cancel', verifyFirebaseToken, async (req, res) => {
  try {
    const { subscriptionId } = req.body || {};
    if (!subscriptionId) {
      return res.status(400).json({ error: 'subscriptionId is required' });
    }

    const result = await cancelUserSubscription(req.uid, subscriptionId);
    return res.json(result);
  } catch (err) {
    console.error('POST /cancel failed:', err);
    const status = err.status || 500;
    return res.status(status).json({ error: err.message });
  }
});

router.get('/plans', (_req, res) => {
  res.json({
    environment: paypalConfig.mode,
    plans: [
      {
        slug: PLAN_SLUGS.MONTHLY,
        displayName: 'Full Arsenal — Monthly',
        billingInterval: 'month',
        price: SUBSCRIPTION_PRICES.full_arsenal_monthly,
      },
      {
        slug: PLAN_SLUGS.YEARLY,
        displayName: 'Full Arsenal — Yearly',
        billingInterval: 'year',
        price: SUBSCRIPTION_PRICES.full_arsenal_yearly,
      },
    ],
  });
});

export default router;
