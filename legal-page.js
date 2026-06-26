import './firebase.js';
import { redirectLegacyPaths } from './routes.js';
import { initSiteNav, initScrollAnimations } from './site-nav.js';
import { initAuthAwareLinks } from './auth/auth-guard.js';
import { initBrandLogos, injectFavicon } from './brand-logo.js';
import { initSiteFooter } from './site-footer.js';

async function boot() {
  if (redirectLegacyPaths()) return;

  const activePage = document.body.dataset.page || 'home';
  await initSiteNav({ activePage, variant: 'marketing' });
  initAuthAwareLinks(document);
  initScrollAnimations();
  injectFavicon();
  initBrandLogos();
  initSiteFooter({ variant: 'marketing' });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
