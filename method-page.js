import { guardPage, hideAuthLoader } from './auth/auth-guard.js';
import { initSiteNav } from './site-nav.js';
import { redirectLegacyPaths } from './routes.js';
import { initBrandLogos, injectFavicon } from './brand-logo.js';
import { initPageBack } from './page-back.js';

async function initMethodPage() {
  if (redirectLegacyPaths()) return;
  if (!(await guardPage())) return;

  await initSiteNav({ variant: 'app', activePage: 'method' });
  hideAuthLoader();
  injectFavicon();
  initBrandLogos();
  await initPageBack();
}

if (document.body.dataset.page === 'method') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMethodPage);
  } else {
    initMethodPage();
  }
}
