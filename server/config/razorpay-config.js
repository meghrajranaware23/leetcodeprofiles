import { config } from 'dotenv';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

if (!process.env.RENDER) {
  config({ path: resolve(__dirname, '../../.env') });
}

const mode = process.env.RAZORPAY_MODE === 'live' ? 'live' : 'test';
const suffix = mode === 'live' ? 'LIVE' : 'TEST';

export const razorpayConfig = {
  mode,
  keyId: process.env[`RAZORPAY_${suffix}_KEY_ID`],
  keySecret: process.env[`RAZORPAY_${suffix}_KEY_SECRET`],
  webhookSecret: process.env[`RAZORPAY_${suffix}_WEBHOOK_SECRET`],
  plans: {
    full_arsenal_monthly: process.env[`RAZORPAY_${suffix}_PLAN_MONTHLY`],
    full_arsenal_yearly: process.env[`RAZORPAY_${suffix}_PLAN_YEARLY`],
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
