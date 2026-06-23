# Deploy the subscription API to Render

This guide deploys the Node API in `server/` to Render. Your frontend stays on Firebase Hosting.

## Architecture

```
leetcodeprofiles.com (Firebase Hosting)  →  frontend
https://YOUR-SERVICE.onrender.com        →  subscription API + PayPal webhooks
```

**Live PayPal webhook URL:**
```
https://YOUR-SERVICE.onrender.com/api/paypal/webhook
```

---

## Step 1 — Push code to GitHub

Render deploys from Git. Commit and push your repo if you haven't already.

---

## Step 2 — Create Render Web Service

1. Go to [render.com](https://render.com) → **New** → **Blueprint** (or **Web Service**).
2. Connect your GitHub repo.
3. If using **Blueprint**, Render reads [`render.yaml`](../render.yaml) automatically.
4. If creating manually:
   - **Root Directory:** `server`
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Health Check Path:** `/health`

---

## Step 3 — Set environment variables on Render

In **Environment** for your web service, add:

| Variable | Value |
|----------|--------|
| `NODE_ENV` | `production` |
| `PAYPAL_MODE` | `live` (or `sandbox` for testing) |
| `FRONTEND_BASE_URL` | `https://leetcodeprofiles.com` |
| `PAYPAL_CLIENT_ID_LIVE` | your live client ID |
| `PAYPAL_CLIENT_SECRET_LIVE` | your live secret |
| `PAYPAL_CLIENT_ID_SANDBOX` | your sandbox client ID |
| `PAYPAL_CLIENT_SECRET_SANDBOX` | your sandbox secret |
| `PAYPAL_WEBHOOK_ID_LIVE` | from PayPal after creating live webhook |
| `PAYPAL_PLAN_MONTHLY_LIVE` | from `npm run setup:paypal-plans` |
| `PAYPAL_PLAN_YEARLY_LIVE` | from `npm run setup:paypal-plans` |
| `FIREBASE_SERVICE_ACCOUNT_JSON` | see Step 4 |
| `RECONCILE_JOB_SECRET` | random secret string (optional) |
| `CORS_ORIGINS` | `https://leetcodeprofiles.com,https://www.leetcodeprofiles.com,https://leetcodeprofiles-ee772.web.app,https://leetcodeprofiles-ee772.firebaseapp.com,http://localhost:5173` |

Render auto-sets `PORT` and `RENDER_EXTERNAL_URL` — do not set these manually.

---

## Step 4 — Firebase Admin JSON for Render

Locally run:

```bash
node scripts/print-firebase-json-for-render.js
```

Copy the **single-line JSON** output into Render env var **`FIREBASE_SERVICE_ACCOUNT_JSON`**.

Do **not** upload the JSON file to Render — use the env var only.

---

## Step 5 — Create PayPal plans (if not done)

On your machine with `.env` configured:

```bash
PAYPAL_MODE=live npm run setup:paypal-plans
```

Add the printed plan IDs to Render env vars (`PAYPAL_PLAN_MONTHLY_LIVE`, etc.).

---

## Step 6 — Deploy and verify

After Render deploys, note your URL (e.g. `https://lp-subscription-api.onrender.com`).

Test:

```bash
curl https://YOUR-SERVICE.onrender.com/health
```

Expected: `{"ok":true,"mode":"live","apiUrl":"https://..."}`

---

## Step 7 — PayPal Live webhook

1. [PayPal Developer Dashboard](https://developer.paypal.com/dashboard/) → **Live**
2. Your app → **Webhooks** → **Add Webhook**
3. **URL:** `https://YOUR-SERVICE.onrender.com/api/paypal/webhook`
4. Select subscription events (ACTIVATED, RENEWED, PAYMENT.SUCCEEDED, etc.)
5. Copy **Webhook ID** → Render env `PAYPAL_WEBHOOK_ID_LIVE`
6. **Redeploy** Render service after adding the webhook ID

---

## Step 8 — Point frontend to Render API

In your local `.env`:

```bash
VITE_API_URL=https://YOUR-SERVICE.onrender.com
VITE_PAYPAL_CLIENT_ID=<your live client ID>
VITE_PAYPAL_MODE=live
```

Rebuild and deploy frontend:

```bash
npm run build
firebase deploy --only hosting
```

Also deploy Firestore rules if not done:

```bash
npm run deploy:firestore
```

---

## Step 9 — Test end-to-end

1. Sign in on leetcodeprofiles.com
2. Go to `/pricing` → Subscribe
3. Complete PayPal checkout
4. Confirm premium packs unlock
5. Check profile page for subscription status

---

## Optional — Daily reconciliation cron

In Render, add a **Cron Job** (or use an external cron):

```
POST https://YOUR-SERVICE.onrender.com/api/jobs/reconcile
Header: x-job-secret: YOUR_RECONCILE_JOB_SECRET
```

Schedule: daily at 6:00 UTC.

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| CORS error on checkout | Add your site origin to `CORS_ORIGINS` on Render |
| `Startup error: Firebase` | Check `FIREBASE_SERVICE_ACCOUNT_JSON` is valid one-line JSON |
| Webhook 401 | Set `PAYPAL_WEBHOOK_ID_LIVE` and redeploy |
| Checkout can't reach API | Set `VITE_API_URL` and rebuild frontend |
| Render free tier sleeps | First request after idle may take ~30s; upgrade for production |

---

## Local dev (unchanged)

```bash
# Terminal 1
cd server && npm run dev

# Terminal 2
npm run dev
```

Leave `VITE_API_URL` empty locally — Vite proxies `/api` to port 3001.
