import { config } from 'dotenv';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import cors from 'cors';
import { paypalConfig, assertPayPalConfig } from './config/paypal-config.js';
import { razorpayConfig, assertRazorpayConfig } from './config/razorpay-config.js';
import { initFirebaseAdmin } from './config/firebase-admin.js';
import { getPublicApiUrl, isRender } from './config/app-config.js';
import subscriptionsRouter from './routes/subscriptions.js';
import webhooksRouter from './routes/webhooks.js';
import razorpayRouter, { razorpayWebhookRouter } from './routes/razorpay.js';
import configRouter from './routes/config.js';
import { reconcileSubscriptions } from './jobs/reconcile-subscriptions.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load .env locally; on Render, env vars come from the dashboard (dotenv won't override them)
if (!process.env.RENDER) {
  config({ path: resolve(__dirname, '../.env') });
}

const PORT = Number(process.env.PORT) || 3001;
const HOST = process.env.HOST || '0.0.0.0';

const defaultOrigins = [
  'http://localhost:5173',
  'https://leetcodeprofiles.com',
  'https://www.leetcodeprofiles.com',
  'https://leetcodeprofiles-ee772.web.app',
  'https://leetcodeprofiles-ee772.firebaseapp.com',
];

const allowedOrigins = (process.env.CORS_ORIGINS || defaultOrigins.join(','))
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

async function bootstrap() {
  try {
    assertPayPalConfig();
    try {
      assertRazorpayConfig();
      console.log(`Razorpay mode: ${razorpayConfig.mode}`);
    } catch (rzpErr) {
      console.warn(`Razorpay not configured: ${rzpErr.message}`);
    }
    await initFirebaseAdmin();
    console.log(`PayPal mode: ${paypalConfig.mode}`);
    console.log(`Public API URL: ${getPublicApiUrl()}`);
    if (isRender()) {
      console.log('Running on Render');
    }
  } catch (err) {
    console.error('Startup error:', err.message);
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
    console.warn('Continuing in dev mode — payment endpoints may fail until configured.');
  }
}

await bootstrap();

const app = express();
app.set('trust proxy', 1);

app.use(cors({
  origin(origin, callback) {
    // Allow server-to-server (webhooks, curl) and whitelisted browser origins
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }
    console.warn(`CORS blocked origin: ${origin}`);
    callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true,
}));

app.get('/', (_req, res) => {
  res.json({
    service: 'LeetCode Profiles Subscription API',
    health: '/health',
    config: '/api/config',
    webhook: '/api/paypal/webhook',
    razorpayWebhook: '/api/razorpay/webhook',
  });
});

app.get('/health', (_req, res) => {
  res.json({
    ok: true,
    mode: paypalConfig.mode,
    apiUrl: getPublicApiUrl(),
    timestamp: new Date().toISOString(),
  });
});

app.use('/api/paypal/webhook', express.raw({ type: 'application/json' }), webhooksRouter);
app.use('/api/razorpay/webhook', express.raw({ type: 'application/json' }), razorpayWebhookRouter);
app.use(express.json());

app.use('/api/config', configRouter);
app.use('/api/subscriptions', subscriptionsRouter);
app.use('/api/razorpay', razorpayRouter);

app.post('/api/jobs/reconcile', async (req, res) => {
  const secret = process.env.RECONCILE_JOB_SECRET;
  if (secret && req.headers['x-job-secret'] !== secret) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const results = await reconcileSubscriptions();
    return res.json({ ok: true, results });
  } catch (err) {
    console.error('Reconcile job failed:', err);
    return res.status(500).json({ error: err.message });
  }
});

app.use((err, _req, res, _next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: err.message || 'Internal server error' });
});

app.listen(PORT, HOST, () => {
  console.log(`Subscription API listening on ${HOST}:${PORT}`);
});
