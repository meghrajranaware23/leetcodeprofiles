import { Router } from 'express';
import { verifyFirebaseToken } from '../middleware/verify-firebase-token.js';
import { verifyRazorpayWebhook } from '../middleware/verify-razorpay-webhook.js';
import {
  createUserRazorpaySubscription,
  verifyAndActivateRazorpayPayment,
  cancelUserRazorpaySubscription,
} from '../services/razorpay-subscription-service.js';
import { processRazorpayWebhookEvent } from '../services/razorpay-webhook-processor.js';

const router = Router();

router.post('/create-subscription', verifyFirebaseToken, async (req, res) => {
  try {
    const { planSlug } = req.body || {};
    if (!planSlug) {
      return res.status(400).json({ error: 'planSlug is required' });
    }

    const result = await createUserRazorpaySubscription(req.uid, planSlug);
    return res.json(result);
  } catch (err) {
    console.error('POST /razorpay/create-subscription failed:', err);
    const status = err.status || 500;
    return res.status(status).json({
      error: err.message,
      code: err.code || undefined,
    });
  }
});

router.post('/verify-payment', verifyFirebaseToken, async (req, res) => {
  try {
    const {
      razorpayPaymentId,
      razorpaySubscriptionId,
      razorpaySignature,
    } = req.body || {};

    const result = await verifyAndActivateRazorpayPayment(req.uid, {
      razorpayPaymentId,
      razorpaySubscriptionId,
      razorpaySignature,
    });
    return res.json(result);
  } catch (err) {
    console.error('POST /razorpay/verify-payment failed:', err);
    const status = err.status || 500;
    return res.status(status).json({ error: err.message });
  }
});

router.post('/cancel', verifyFirebaseToken, async (req, res) => {
  try {
    const { subscriptionId } = req.body || {};
    if (!subscriptionId) {
      return res.status(400).json({ error: 'subscriptionId is required' });
    }

    const result = await cancelUserRazorpaySubscription(req.uid, subscriptionId);
    return res.json(result);
  } catch (err) {
    console.error('POST /razorpay/cancel failed:', err);
    const status = err.status || 500;
    return res.status(status).json({ error: err.message });
  }
});

export const razorpayWebhookRouter = Router();

razorpayWebhookRouter.post('/', verifyRazorpayWebhook, async (req, res) => {
  try {
    const result = await processRazorpayWebhookEvent(req.webhookEvent);
    return res.json({ ok: true, ...result });
  } catch (err) {
    console.error('Razorpay webhook handler error:', err);
    return res.status(500).json({ error: err.message });
  }
});

export default router;
