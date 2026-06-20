import './firebase.js';
import { completeRedirectSignIn, getCurrentUser, waitForAuth } from './auth/auth-service.js';
import { getRedirectTarget } from './auth/auth-guard.js';
import { initSignInPage } from './auth/auth-ui.js';

async function boot() {
  await waitForAuth();

  const redirectUser = await completeRedirectSignIn();
  if (redirectUser || getCurrentUser()) {
    window.location.replace(getRedirectTarget());
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
      window.location.replace(getRedirectTarget());
    },
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
