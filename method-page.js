import { guardPage } from './auth/auth-guard.js';
import { redirectLegacyPaths, ROUTES } from './routes.js';

async function initMethodPage() {
  if (redirectLegacyPaths()) return;
  if (!(await guardPage())) return;

  window.location.replace(`${ROUTES.coursesGuide}${window.location.search}${window.location.hash}`);
}

if (document.body.dataset.page === 'method') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMethodPage);
  } else {
    initMethodPage();
  }
}
