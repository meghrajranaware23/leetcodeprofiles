import { config } from 'dotenv';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { paypalConfig, assertPayPalConfig } from '../server/config/paypal-config.js';
import { paypalRequest } from '../server/services/paypal-client.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: resolve(__dirname, '../.env') });

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

async function createPlan(productId, name, intervalUnit, price) {
  return paypalRequest('/v1/billing/plans', {
    method: 'POST',
    body: {
      product_id: productId,
      name,
      description: name,
      billing_cycles: [
        {
          frequency: {
            interval_unit: intervalUnit,
            interval_count: 1,
          },
          tenure_type: 'REGULAR',
          sequence: 1,
          total_cycles: 0,
          pricing_scheme: {
            fixed_price: {
              value: price,
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

  const monthly = await createPlan(
    product.id,
    'Full Arsenal — Monthly',
    'MONTH',
    '9.99'
  );
  console.log('Monthly Plan ID:', monthly.id);

  const yearly = await createPlan(
    product.id,
    'Full Arsenal — Yearly',
    'YEAR',
    '79.99'
  );
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
