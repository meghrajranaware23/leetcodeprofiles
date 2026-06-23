import { paypalConfig } from '../config/paypal-config.js';
import { paypalRequest } from '../services/paypal-client.js';

/**
 * Verify PayPal webhook signature via REST API.
 * Must run after express.raw() body parser on the webhook route.
 */
export async function verifyPayPalWebhook(req, res, next) {
  if (!paypalConfig.webhookId) {
    console.warn('PAYPAL_WEBHOOK_ID not set — skipping signature verification (dev only)');
    const body = req.body instanceof Buffer
      ? req.body.toString('utf8')
      : JSON.stringify(req.body);
    req.webhookVerified = false;
    req.webhookEvent = JSON.parse(body);
    return next();
  }

  const transmissionId = req.headers['paypal-transmission-id'];
  const transmissionTime = req.headers['paypal-transmission-time'];
  const certUrl = req.headers['paypal-cert-url'];
  const authAlgo = req.headers['paypal-auth-algo'];
  const transmissionSig = req.headers['paypal-transmission-sig'];

  if (!transmissionId || !transmissionSig) {
    return res.status(401).json({ error: 'Missing PayPal webhook headers' });
  }

  try {
    const body = req.body instanceof Buffer
      ? req.body.toString('utf8')
      : JSON.stringify(req.body);

    const result = await paypalRequest('/v1/notifications/verify-webhook-signature', {
      method: 'POST',
      body: {
        auth_algo: authAlgo,
        cert_url: certUrl,
        transmission_id: transmissionId,
        transmission_sig: transmissionSig,
        transmission_time: transmissionTime,
        webhook_id: paypalConfig.webhookId,
        webhook_event: JSON.parse(body),
      },
    });

    if (result.verification_status !== 'SUCCESS') {
      console.error('PayPal webhook verification failed:', result.verification_status);
      return res.status(401).json({ error: 'Invalid webhook signature' });
    }

    req.webhookVerified = true;
    req.webhookEvent = JSON.parse(body);
    next();
  } catch (err) {
    console.error('PayPal webhook verification error:', err);
    return res.status(401).json({ error: 'Webhook verification failed' });
  }
}
