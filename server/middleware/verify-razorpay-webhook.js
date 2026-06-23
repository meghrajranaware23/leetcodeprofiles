import { razorpayConfig } from '../config/razorpay-config.js';
import { verifyWebhookSignature } from '../services/razorpay-client.js';

/**
 * Verify Razorpay webhook signature via HMAC-SHA256.
 * Must run after express.raw() body parser on the webhook route.
 */
export async function verifyRazorpayWebhook(req, res, next) {
  const body = req.body instanceof Buffer
    ? req.body.toString('utf8')
    : JSON.stringify(req.body);

  if (!razorpayConfig.webhookSecret) {
    console.warn('RAZORPAY_WEBHOOK_SECRET not set — skipping signature verification (dev only)');
    req.webhookVerified = false;
    req.webhookEvent = JSON.parse(body);
    return next();
  }

  const signature = req.headers['x-razorpay-signature'];

  if (!signature) {
    return res.status(401).json({ error: 'Missing Razorpay webhook signature' });
  }

  const verified = verifyWebhookSignature(body, signature);

  if (!verified) {
    console.error('Razorpay webhook verification failed');
    return res.status(401).json({ error: 'Invalid webhook signature' });
  }

  req.webhookVerified = true;
  req.webhookEvent = JSON.parse(body);
  next();
}
