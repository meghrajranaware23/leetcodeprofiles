import { Router } from 'express';
import { paypalConfig } from '../config/paypal-config.js';
import { razorpayConfig } from '../config/razorpay-config.js';
import { getPublicApiUrl, getFrontendBaseUrl, isRender } from '../config/app-config.js';
import { PLAN_SLUGS, SUBSCRIPTION_PRICES, RAZORPAY_SUBSCRIPTION_PRICES } from '../constants.js';

const router = Router();

router.get('/', (_req, res) => {
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
        razorpayPrice: RAZORPAY_SUBSCRIPTION_PRICES.full_arsenal_monthly,
      },
      {
        slug: PLAN_SLUGS.YEARLY,
        billingInterval: 'year',
        price: SUBSCRIPTION_PRICES.full_arsenal_yearly,
        razorpayPrice: RAZORPAY_SUBSCRIPTION_PRICES.full_arsenal_yearly,
      },
    ],
  });
});

export default router;
