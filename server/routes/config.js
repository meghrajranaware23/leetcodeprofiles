import { Router } from 'express';
import { paypalConfig } from '../config/paypal-config.js';
import { razorpayConfig } from '../config/razorpay-config.js';
import { getPublicApiUrl, getFrontendBaseUrl, isRender } from '../config/app-config.js';
import { PLAN_SLUGS, SUBSCRIPTION_PRICES } from '../constants.js';
import { fetchRazorpayPlanPrices } from '../services/razorpay-client.js';

const router = Router();

router.get('/', async (_req, res) => {
  let razorpayPrices = null;
  try {
    razorpayPrices = await fetchRazorpayPlanPrices();
  } catch (err) {
    console.warn('Razorpay price fetch failed:', err.message);
  }

  res.json({
    paypalClientId: paypalConfig.clientId,
    razorpayKeyId: razorpayConfig.keyId || null,
    mode: paypalConfig.mode,
    razorpayMode: razorpayConfig.mode,
    apiUrl: getPublicApiUrl(),
    frontendUrl: getFrontendBaseUrl(),
    hostedOn: isRender() ? 'render' : 'local',
    plans: [
      {
        slug: PLAN_SLUGS.MONTHLY,
        billingInterval: 'month',
        price: SUBSCRIPTION_PRICES.full_arsenal_monthly,
        razorpayPrice: razorpayPrices?.full_arsenal_monthly || null,
      },
      {
        slug: PLAN_SLUGS.YEARLY,
        billingInterval: 'year',
        price: SUBSCRIPTION_PRICES.full_arsenal_yearly,
        razorpayPrice: razorpayPrices?.full_arsenal_yearly || null,
      },
    ],
  });
});

export default router;
