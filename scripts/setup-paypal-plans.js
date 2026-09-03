import { config } from 'dotenv';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: resolve(__dirname, '../.env') });

const { paypalConfig, assertPayPalConfig } = await import('../server/config/paypal-config.js');
const { paypalRequest } = await import('../server/services/paypal-client.js');

async function createProduct() {
  return paypalRequest('/v1/catalogs/products', {
    method: 'POST',
    body: {
      name: 'LeetCode Profiles — Full Arsenal',
      description: 'All premium DSA ascension packs — monthly or yearly subscription',
      type: 'SERVICE',
      category: 'EDUCATIONAL_AND_TEXTBOOKS',
    },
  });
}

async function createMonthlyPlan(productId) {
  return paypalRequest('/v1/billing/plans', {
    method: 'POST',
    body: {
      product_id: productId,
      name: 'Full Arsenal — Monthly',
      description: 'Full Arsenal — Monthly',
      billing_cycles: [
        {
          frequency: {
            interval_unit: 'MONTH',
            interval_count: 1,
          },
          tenure_type: 'REGULAR',
          sequence: 1,
          total_cycles: 0,
          pricing_scheme: {
            fixed_price: {
              value: '4.99',
              currency_code: 'USD',
            },
          },
        },
      ],
      payment_preferences: {
        auto_bill_outstanding: true,
        setup_fee_failure_action: 'CONTINUE',
        payment_failure_threshold: 3,
      },
    },
  });
}

async function createYearlyPlanWithTrial(productId) {
  return paypalRequest('/v1/billing/plans', {
    method: 'POST',
    body: {
      product_id: productId,
      name: 'Full Arsenal — Yearly',
      description: 'Full Arsenal — Yearly with 3-day free trial',
      billing_cycles: [
        {
          frequency: {
            interval_unit: 'DAY',
            interval_count: 3,
          },
          tenure_type: 'TRIAL',
          sequence: 1,
          total_cycles: 1,
          pricing_scheme: {
            fixed_price: {
              value: '0',
              currency_code: 'USD',
            },
          },
        },
        {
          frequency: {
            interval_unit: 'YEAR',
            interval_count: 1,
          },
          tenure_type: 'REGULAR',
          sequence: 2,
          total_cycles: 0,
          pricing_scheme: {
            fixed_price: {
              value: '29.99',
              currency_code: 'USD',
            },
          },
        },
      ],
      payment_preferences: {
        auto_bill_outstanding: true,
        setup_fee_failure_action: 'CONTINUE',
        payment_failure_threshold: 3,
      },
    },
  });
}

async function main() {
  assertPayPalConfig();
  console.log(`Creating PayPal product/plans in ${paypalConfig.mode} mode...`);

  const product = await createProduct();
  console.log('Product ID:', product.id);

  const monthly = await createMonthlyPlan(product.id);
  console.log('Monthly Plan ID:', monthly.id);

  const yearly = await createYearlyPlanWithTrial(product.id);
  console.log('Yearly Plan ID:', yearly.id);

  const suffix = paypalConfig.mode.toUpperCase();
  console.log('\nAdd these to your .env:');
  console.log(`PAYPAL_PLAN_MONTHLY_${suffix}=${monthly.id}`);
  console.log(`PAYPAL_PLAN_YEARLY_${suffix}=${yearly.id}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
