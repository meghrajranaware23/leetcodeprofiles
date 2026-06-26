import { DEFAULT_POST_AUTH_URL, SIGN_IN_URL } from './constants.js';
import { getCurrentUser, waitForAuth } from './auth-service.js';

const LOADER_ID = 'auth-guard-loader';

function showAuthLoader() {
  if (document.getElementById(LOADER_ID)) return;

  const loader = document.createElement('div');
  loader.id = LOADER_ID;
  loader.className = 'auth-guard-loader';
  loader.setAttribute('role', 'status');
  loader.setAttribute('aria-live', 'polite');
  loader.innerHTML = '<div class="auth-guard-spinner"></div>';
  document.body.appendChild(loader);
}

function hideAuthLoader() {
  document.getElementById(LOADER_ID)?.remove();
}

export { showAuthLoader, hideAuthLoader };

export function getSignInUrl(next = DEFAULT_POST_AUTH_URL) {
  const params = new URLSearchParams();
  params.set('next', next);
  return `${SIGN_IN_URL}?${params.toString()}`;
}

export function getRedirectTarget() {
  const params = new URLSearchParams(window.location.search);
  const next = params.get('next');
  if (next && isSafeRedirect(next)) {
    return next;
  }
  return DEFAULT_POST_AUTH_URL;
}

function isSafeRedirect(url) {
  if (!url || typeof url !== 'string') return false;
  if (url.startsWith('//') || /^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(url)) return false;
  return url.startsWith('/') || url.startsWith('./');
}

function getAuthNextPath() {
  const path = window.location.pathname;
  if (path === '/packs' || path === '/home' || path.endsWith('/packs.html')) {
    return `/packs${window.location.search}${window.location.hash}`;
  }
  if (path === '/profile' || path.endsWith('/profile.html')) {
    return `/profile${window.location.search}${window.location.hash}`;
  }
  return `${path}${window.location.search}${window.location.hash}`;
}

export async function getPostAuthDestination() {
  const params = new URLSearchParams(window.location.search);
  const next = params.get('next');
  if (next && isSafeRedirect(next)) {
    return next;
  }

  try {
    const { getContinuePackSummary, getPackContinueUrl } = await import('../progress-facade.js');
    const active = await getContinuePackSummary();
    if (active?.hasProgress) {
      return await getPackContinueUrl(active.packId);
    }
  } catch (err) {
    console.warn('Could not resolve post-auth continue URL:', err);
  }

  return DEFAULT_POST_AUTH_URL;
}

export async function guardPage() {
  showAuthLoader();
  await waitForAuth();

  if (!getCurrentUser()) {
    hideAuthLoader();
    window.location.replace(getSignInUrl(getAuthNextPath()));
    return false;
  }

  return true;
}

export async function navigateToAppRoute(target = DEFAULT_POST_AUTH_URL) {
  if (getCurrentUser()) {
    window.location.href = target;
    return;
  }

  await waitForAuth();
  if (getCurrentUser()) {
    window.location.href = target;
  } else {
    window.location.href = getSignInUrl(target);
  }
}

export function initAuthAwareLinks(root = document) {
  root.querySelectorAll('[data-auth-target]').forEach((el) => {
    el.addEventListener('click', (e) => {
      if (getCurrentUser()) return;

      e.preventDefault();
      const target = el.getAttribute('data-auth-target') || DEFAULT_POST_AUTH_URL;
      navigateToAppRoute(target);
    });
  });
}
