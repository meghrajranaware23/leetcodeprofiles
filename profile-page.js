import { getCurrentUser, waitForSessionBootstrap } from './auth/auth-service.js';
import { guardPage, hideAuthLoader } from './auth/auth-guard.js';
import { onProgressSyncUpdated } from './auth/progress-sync-service.js';
import { initSiteNav, initScrollAnimations } from './site-nav.js';
import { getAllPackSummaries } from './progress-facade.js';
import { bindHunterCardActions, renderHunterCard } from './hunter-card.js';
import { redirectLegacyPaths } from './routes.js';
import { initBrandLogos, injectFavicon } from './brand-logo.js';
import { initPageBack } from './page-back.js';

async function renderProfileContent() {
  const user = getCurrentUser();
  const summaries = await getAllPackSummaries();
  renderHunterCard(user, summaries);
  bindHunterCardActions();
  return summaries;
}

async function initProfilePage() {
  if (redirectLegacyPaths()) return;
  if (!(await guardPage())) return;

  const summariesPromise = renderProfileContent();
  const navPromise = initSiteNav({ variant: 'app', activePage: 'profile' });

  const summaries = await summariesPromise;
  await navPromise;

  hideAuthLoader();
  injectFavicon();
  initBrandLogos();
  await initPageBack();
  initScrollAnimations();

  await initSiteNav({ variant: 'app', activePage: 'profile', summaries });

  const refreshProfile = async () => {
    const nextSummaries = await renderProfileContent();
    await initSiteNav({ variant: 'app', activePage: 'profile', summaries: nextSummaries });
  };

  onProgressSyncUpdated(({ changed }) => {
    if (changed) refreshProfile();
  });

  waitForSessionBootstrap().then(refreshProfile);
}

if (document.body.dataset.page === 'profile') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProfilePage);
  } else {
    initProfilePage();
  }
}
