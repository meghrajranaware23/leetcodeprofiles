import { config } from 'dotenv';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load .env before reading process.env (ESM imports run before script-level dotenv.config)
if (!process.env.RENDER) {
  config({ path: resolve(__dirname, '../../.env') });
}

const mode = process.env.PAYPAL_MODE === 'live' ? 'live' : 'sandbox';
const suffix = mode.toUpperCase();

function env(primary, fallback) {
  return process.env[primary] || (fallback ? process.env[fallback] : undefined);
}

export const paypalConfig = {
  mode,
  clientId: env(`PAYPAL_CLIENT_ID_${suffix}`, 'PAYPAL_CLIENT_ID'),
  clientSecret: env(`PAYPAL_CLIENT_SECRET_${suffix}`, 'PAYPAL_CLIENT_SECRET'),
  webhookId: env(`PAYPAL_WEBHOOK_ID_${suffix}`, 'PAYPAL_WEBHOOK_ID'),
  plans: {
    full_arsenal_monthly: env(`PAYPAL_PLAN_MONTHLY_${suffix}`, 'PAYPAL_PLAN_MONTHLY'),
    full_arsenal_yearly: env(`PAYPAL_PLAN_YEARLY_${suffix}`, 'PAYPAL_PLAN_YEARLY'),
  },
  apiBase: mode === 'live'
    ? 'https://api-m.paypal.com'
    : 'https://api-m.sandbox.paypal.com',
};

export function getPayPalPlanId(planSlug) {
  const planId = paypalConfig.plans[planSlug];
  if (!planId) {
    throw new Error(`PayPal plan ID not configured for ${planSlug} (${paypalConfig.mode})`);
  }
  return planId;
}

export function assertPayPalConfig() {
  const missing = [];
  if (!paypalConfig.clientId) missing.push(`PAYPAL_CLIENT_ID_${suffix}`);
  if (!paypalConfig.clientSecret) missing.push(`PAYPAL_CLIENT_SECRET_${suffix}`);
  if (missing.length) {
    throw new Error(`Missing PayPal config for mode=${paypalConfig.mode}: ${missing.join(', ')}`);
  }
}
