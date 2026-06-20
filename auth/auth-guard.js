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
  if (url.startsWith('//') || url.includes('://')) return false;
  if (url.startsWith('/') && !url.startsWith('./')) return false;
  return url.startsWith('./') || url.startsWith('/');
}

export async function guardPage() {
  showAuthLoader();
  await waitForAuth();
  hideAuthLoader();

  if (!getCurrentUser()) {
    const file = window.location.pathname.split('/').pop() || 'packs.html';
    const nextUrl = `./${file}${window.location.search}${window.location.hash}`;
    window.location.replace(getSignInUrl(nextUrl));
    return false;
  }

  return true;
}

export async function navigateToAppRoute(target = DEFAULT_POST_AUTH_URL) {
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
      e.preventDefault();
      const target = el.getAttribute('data-auth-target') || DEFAULT_POST_AUTH_URL;
      navigateToAppRoute(target);
    });
  });
}
