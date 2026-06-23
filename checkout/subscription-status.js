/** Resolve API base URL — Vite env (production) or Vite proxy (local dev). */
let cachedApiBase = null;

export function getApiBaseUrl() {
  if (cachedApiBase) return cachedApiBase;
  const fromEnv = import.meta.env.VITE_API_URL;
  if (fromEnv) {
    cachedApiBase = String(fromEnv).replace(/\/$/, '');
  }
  return cachedApiBase || '';
}

/** Call once on app boot — required in production (Firebase Hosting + Render API). */
export async function resolveApiBaseUrl() {
  if (cachedApiBase) return cachedApiBase;

  const fromEnv = import.meta.env.VITE_API_URL;
  if (fromEnv) {
    cachedApiBase = String(fromEnv).replace(/\/$/, '');
    return cachedApiBase;
  }

  // Local dev: empty string → Vite proxies /api to localhost:3001
  if (import.meta.env.DEV) {
    return '';
  }

  throw new Error(
    'VITE_API_URL is not set. Add your Render API URL to .env and rebuild (npm run build).'
  );
}

export async function fetchRuntimeConfig() {
  await resolveApiBaseUrl();
  const base = getApiBaseUrl();
  const url = base ? `${base}/api/config` : '/api/config';
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to load payment config');
  }
  return response.json();
}

export async function getAuthHeaders() {
  const { auth } = await import('../firebase.js');
  const user = auth.currentUser;
  if (!user) {
    throw new Error('Sign in required');
  }
  const token = await user.getIdToken();
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
}

async function buildApiUrl(path) {
  await resolveApiBaseUrl();
  const base = getApiBaseUrl();
  return base ? `${base}${path}` : path;
}

export async function apiPost(path, body) {
  const url = await buildApiUrl(path);
  const headers = await getAuthHeaders();
  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const err = new Error(data.error || `Request failed (${response.status})`);
    err.status = response.status;
    err.code = data.code;
    throw err;
  }
  return data;
}

export async function apiGet(path) {
  const url = await buildApiUrl(path);
  const headers = await getAuthHeaders();
  const response = await fetch(url, { headers });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || `Request failed (${response.status})`);
  }
  return data;
}

export function formatPlanLabel(planSlug) {
  if (planSlug === 'full_arsenal_yearly') return 'Full Arsenal — Yearly';
  if (planSlug === 'full_arsenal_monthly') return 'Full Arsenal — Monthly';
  return planSlug || 'Full Arsenal';
}

export function formatBillingInterval(interval) {
  if (interval === 'year') return 'year';
  if (interval === 'month') return 'month';
  return interval || 'period';
}

export function formatDate(iso) {
  if (!iso) return '—';
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '—';
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function getSubscriptionStatusLabel(subscription) {
  if (!subscription) return 'No subscription';

  const provider = subscription.provider || 'paypal';

  if (provider === 'razorpay') {
    if (subscription.status === 'active' || subscription.status === 'authenticated') {
      return 'Active';
    }
    if (subscription.status === 'cancelled') {
      return subscription.currentPeriodEnd && Date.parse(subscription.currentPeriodEnd) > Date.now()
        ? 'Cancelled — access until period end'
        : 'Cancelled';
    }
    if (subscription.status === 'expired' || subscription.status === 'completed') return 'Expired';
    if (subscription.status === 'halted') return 'Suspended';
    if (subscription.renewalStatus === 'past_due') return 'Payment past due';
    return subscription.status || 'Unknown';
  }

  if (subscription.status === 'ACTIVE' || subscription.status === 'APPROVED') {
    return 'Active';
  }
  if (subscription.status === 'CANCELLED') {
    return subscription.currentPeriodEnd && Date.parse(subscription.currentPeriodEnd) > Date.now()
      ? 'Cancelled — access until period end'
      : 'Cancelled';
  }
  if (subscription.status === 'EXPIRED') return 'Expired';
  if (subscription.status === 'SUSPENDED') return 'Suspended';
  if (subscription.renewalStatus === 'past_due') return 'Payment past due';
  return subscription.status || 'Unknown';
}
