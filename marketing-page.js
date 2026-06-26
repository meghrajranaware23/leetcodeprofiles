import './firebase.js';
import { redirectLegacyPaths } from './routes.js';
import { initSiteNav, initScrollAnimations } from './site-nav.js';
import { initAuthAwareLinks } from './auth/auth-guard.js';
import { initBrandLogos, injectFavicon } from './brand-logo.js';
import { initPageBack } from './page-back.js';

async function boot() {
  if (redirectLegacyPaths()) return;

  injectFavicon();
  initBrandLogos();

  const activePage = document.body.dataset.page || 'home';
  await initSiteNav({ activePage, variant: 'marketing' });
  initAuthAwareLinks(document);
  initScrollAnimations();

  if (document.body.dataset.pageBack) {
    await initPageBack();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
