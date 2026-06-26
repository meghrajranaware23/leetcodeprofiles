import './firebase.js';
import { completeRedirectSignIn, waitForAuth } from './auth/auth-service.js';
import { getPostAuthDestination } from './auth/auth-guard.js';
import { initSignInPage } from './auth/auth-ui.js';
import { waitForProgressSync } from './auth/progress-sync-service.js';
import { redirectLegacyPaths } from './routes.js';
import { initBrandLogos, injectFavicon } from './brand-logo.js';

async function redirectAfterAuth() {
  await waitForProgressSync();
  const destination = await getPostAuthDestination();
  window.location.replace(destination);
}

async function boot() {
  if (redirectLegacyPaths()) return;

  const user = await waitForAuth();

  const redirectUser = await completeRedirectSignIn();
  if (redirectUser || user) {
    await redirectAfterAuth();
    return;
  }

  const form = document.getElementById('signInForm');
  const button = document.getElementById('googleSignInBtn');
  const errorEl = document.getElementById('signInError');

  initSignInPage({
    formEl: form,
    buttonEl: button,
    errorEl,
    onSuccess: () => {
      redirectAfterAuth();
    },
  });

  injectFavicon();
  initBrandLogos();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
