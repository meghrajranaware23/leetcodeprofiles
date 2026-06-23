import { Router } from 'express';
import { verifyPayPalWebhook } from '../middleware/verify-paypal-webhook.js';
import { processWebhookEvent } from '../services/webhook-processor.js';

const router = Router();

router.post('/', verifyPayPalWebhook, async (req, res) => {
  try {
    const event = req.webhookEvent || req.body;
    const result = await processWebhookEvent(event);
    return res.status(200).json(result);
  } catch (err) {
    console.error('Webhook handler error:', err);
    return res.status(500).json({ error: err.message });
  }
});

export default router;
