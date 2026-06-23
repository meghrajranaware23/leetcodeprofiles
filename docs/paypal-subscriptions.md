# PayPal Subscriptions Runbook

## Prerequisites

1. Firebase Admin service account for project `leetcodeprofiles-ee772` at `server/secrets/firebase-admin.json`
2. PayPal Developer account with Sandbox and Live apps
3. Fill in credentials in `.env` (local only — never commit)

## Create PayPal plans

```bash
# Sandbox (default)
PAYPAL_MODE=sandbox node scripts/setup-paypal-plans.js

# Live
PAYPAL_MODE=live node scripts/setup-paypal-plans.js
```

Copy the printed plan IDs into your `.env`.

## Start local development

```bash
# Terminal 1 — API server
cd server && npm install && npm run dev

# Terminal 2 — Frontend
npm run dev
```

Vite proxies `/api/*` to `http://localhost:3001`.

## Configure PayPal webhooks

1. In PayPal Developer Dashboard → your app → Webhooks
2. URL: `https://<your-api-host>/api/paypal/webhook`
3. Subscribe to:
   - `BILLING.SUBSCRIPTION.ACTIVATED`
   - `BILLING.SUBSCRIPTION.UPDATED`
   - `BILLING.SUBSCRIPTION.RENEWED`
   - `BILLING.SUBSCRIPTION.PAYMENT.SUCCEEDED`
   - `BILLING.SUBSCRIPTION.PAYMENT.FAILED`
   - `BILLING.SUBSCRIPTION.CANCELLED`
   - `BILLING.SUBSCRIPTION.EXPIRED`
   - `BILLING.SUBSCRIPTION.SUSPENDED`
   - `PAYMENT.SALE.COMPLETED`
4. Copy Webhook ID to `PAYPAL_WEBHOOK_ID_SANDBOX` or `PAYPAL_WEBHOOK_ID_LIVE`

For local testing, use ngrok: `ngrok http 3001`

## Deploy API (Cloud Run example)

```bash
cd server
gcloud run deploy lp-subscription-api \
  --source . \
  --region asia-south1 \
  --allow-unauthenticated \
  --set-env-vars PAYPAL_MODE=sandbox
```

Set secrets via Cloud Run secret manager for credentials and Firebase service account.

## Deploy Firestore rules

```bash
firebase deploy --only firestore:rules,firestore:indexes
```

## Switch sandbox → live

1. Create Live product/plans (`PAYPAL_MODE=live node scripts/setup-paypal-plans.js`)
2. Register Live webhook URL
3. Set `PAYPAL_MODE=live` on the API server
4. Set `VITE_PAYPAL_MODE=live` and rebuild frontend (or use runtime `/api/config`)
5. Deploy API with Live credentials

No code changes required.

## Reconciliation job

Run daily to catch missed webhooks:

```bash
cd server && npm run reconcile
```

Or trigger remotely:

```bash
curl -X POST https://<api>/api/jobs/reconcile -H "x-job-secret: $RECONCILE_JOB_SECRET"
```

## E2E test checklist (Sandbox)

- [ ] Sign in with Google
- [ ] Subscribe to monthly plan on `/pricing`
- [ ] Approve on PayPal Sandbox
- [ ] Return URL activates subscription — all packs unlock
- [ ] Lock icons disappear in readers
- [ ] Profile shows active subscription + renewal date
- [ ] Cancel subscription — access until period end
- [ ] Webhook `EXPIRED` revokes access
- [ ] Sign out / sign in on another device — premium persists

## Support operations

- **User paid but locked:** Check `subscriptions/{id}` in Firestore; replay webhook or call activate endpoint
- **Refund/dispute:** Handle manually via PayPal dashboard; revoke entitlements via Admin SDK
- **Duplicate subscription blocked:** Expected — user must cancel existing sub first
