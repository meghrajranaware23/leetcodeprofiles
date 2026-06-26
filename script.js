import './firebase.js';
import { getCurrentUser, waitForAuth } from './auth/auth-service.js';
import { showAuthLoader, hideAuthLoader } from './auth/auth-guard.js';
import { clearBootPending } from './auth/boot-shell.js';
import { ROUTES, redirectLegacyPaths } from './routes.js';
import { initSiteNav, initCtaLinks, initScrollAnimations } from './site-nav.js';
import { initHomeTeaser } from './packs-page.js';
import { initLandingProgress } from './landing-progress.js';
import { initBrandLogos, injectFavicon } from './brand-logo.js';

async function boot() {
  if (redirectLegacyPaths()) return;

  showAuthLoader();
  const user = await waitForAuth();

  if (user) {
    window.location.replace(ROUTES.packs);
    return;
  }

  clearBootPending();
  hideAuthLoader();

  initSiteNav({ activePage: 'home' });
  initHomeTeaser();
  await initLandingProgress();
  initCtaLinks();
  initScrollAnimations();
  injectFavicon();
  initBrandLogos();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
