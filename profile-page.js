import { getCurrentUser, waitForSessionBootstrap } from './auth/auth-service.js';
import { guardPage, hideAuthLoader } from './auth/auth-guard.js';
import { redirectLegacyPaths, ROUTES } from './routes.js';

async function initProfilePage() {
  if (redirectLegacyPaths()) return;
  if (!(await guardPage())) return;

  window.location.replace(`${ROUTES.coursesProfile}${window.location.search}${window.location.hash}`);
}

if (document.body.dataset.page === 'profile') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProfilePage);
  } else {
    initProfilePage();
  }
}
