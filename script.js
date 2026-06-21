import './firebase.js';
import { getCurrentUser, waitForAuth } from './auth/auth-service.js';
import { ROUTES, redirectLegacyPaths } from './routes.js';
import { initSiteNav, initCtaLinks, initScrollAnimations } from './site-nav.js';
import { initHomeTeaser } from './packs-page.js';
import { initLandingProgress } from './landing-progress.js';

async function boot() {
  if (redirectLegacyPaths()) return;

  await waitForAuth();

  if (getCurrentUser()) {
    window.location.replace(ROUTES.packs);
    return;
  }

  initSiteNav({ activePage: 'home' });
  initHomeTeaser();
  await initLandingProgress();
  initCtaLinks();
  initScrollAnimations();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
