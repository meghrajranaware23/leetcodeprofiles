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

function initSignInForm() {
  const form = document.getElementById('signInForm');
  const button = document.getElementById('googleSignInBtn');
  const errorEl = document.getElementById('signInError');

  if (button) {
    button.disabled = false;
    button.classList.remove('is-loading');
    button.setAttribute('aria-busy', 'false');
  }

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

async function boot() {
  if (redirectLegacyPaths()) return;

  const button = document.getElementById('googleSignInBtn');
  if (button) {
    button.disabled = true;
    button.setAttribute('aria-busy', 'true');
  }

  try {
    const user = await waitForAuth();

    let redirectUser = null;
    try {
      redirectUser = await completeRedirectSignIn();
    } catch (err) {
      console.warn('Redirect sign-in check failed (non-fatal):', err);
    }

    if (redirectUser || user) {
      await redirectAfterAuth();
      return;
    }
  } catch (err) {
    console.error('Sign-in boot failed (recovering):', err);
  }

  initSignInForm();
}

function startBoot() {
  boot().catch((err) => {
    console.error('Unhandled sign-in boot error (recovering):', err);
    initSignInForm();
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startBoot);
} else {
  startBoot();
}
