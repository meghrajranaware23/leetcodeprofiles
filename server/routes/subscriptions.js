import { Router } from 'express';
import { verifyFirebaseToken } from '../middleware/verify-firebase-token.js';
import { paypalConfig } from '../config/paypal-config.js';
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
        slug: 'full_arsenal_monthly',
        displayName: 'Full Arsenal — Monthly',
        billingInterval: 'month',
        price: { amount: '9.99', currency: 'USD' },
      },
      {
        slug: 'full_arsenal_yearly',
        displayName: 'Full Arsenal — Yearly',
        billingInterval: 'year',
        price: { amount: '79.99', currency: 'USD' },
      },
    ],
  });
});

export default router;
