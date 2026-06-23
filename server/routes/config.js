import { Router } from 'express';
import { paypalConfig } from '../config/paypal-config.js';
import { getPublicApiUrl, getFrontendBaseUrl, isRender } from '../config/app-config.js';

const router = Router();

router.get('/', (_req, res) => {
  res.json({
    paypalClientId: paypalConfig.clientId,
    mode: paypalConfig.mode,
    apiUrl: getPublicApiUrl(),
    frontendUrl: getFrontendBaseUrl(),
    hostedOn: isRender() ? 'render' : 'local',
    plans: [
      { slug: 'full_arsenal_monthly', billingInterval: 'month', price: { amount: '9.99', currency: 'USD' } },
      { slug: 'full_arsenal_yearly', billingInterval: 'year', price: { amount: '79.99', currency: 'USD' } },
    ],
  });
});

export default router;
