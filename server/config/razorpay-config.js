import { config } from 'dotenv';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

if (!process.env.RENDER) {
  config({ path: resolve(__dirname, '../../.env') });
}

const mode = process.env.RAZORPAY_MODE === 'live' ? 'live' : 'test';
const suffix = mode === 'live' ? 'LIVE' : 'TEST';

function env(primary, fallback) {
  return process.env[primary] || (fallback ? process.env[fallback] : undefined);
}

export const razorpayConfig = {
  mode,
  keyId: env(`RAZORPAY_${suffix}_KEY_ID`, mode === 'live' ? 'RAZORPAY_KEY_ID' : undefined),
  keySecret: env(`RAZORPAY_${suffix}_KEY_SECRET`, mode === 'live' ? 'RAZORPAY_KEY_SECRET' : undefined),
  webhookSecret: env(
    `RAZORPAY_${suffix}_WEBHOOK_SECRET`,
    mode === 'live' ? 'RAZORPAY_WEBHOOK_SECRET' : undefined
  ),
  plans: {
    full_arsenal_monthly: env(
      `RAZORPAY_${suffix}_PLAN_MONTHLY`,
      mode === 'live' ? 'RAZORPAY_PLAN_MONTHLY' : undefined
    ),
    full_arsenal_yearly: env(
      `RAZORPAY_${suffix}_PLAN_YEARLY`,
      mode === 'live' ? 'RAZORPAY_PLAN_YEARLY' : undefined
    ),
  },
};

export function getRazorpayPlanId(planSlug) {
  const planId = razorpayConfig.plans[planSlug];
  if (!planId) {
    throw new Error(`Razorpay plan ID not configured for ${planSlug} (${razorpayConfig.mode})`);
  }
  return planId;
}

export function assertRazorpayConfig() {
  const missing = [];
  if (!razorpayConfig.keyId) missing.push(`RAZORPAY_${suffix}_KEY_ID`);
  if (!razorpayConfig.keySecret) missing.push(`RAZORPAY_${suffix}_KEY_SECRET`);
  if (missing.length) {
    throw new Error(`Missing Razorpay config for mode=${razorpayConfig.mode}: ${missing.join(', ')}`);
  }
}
