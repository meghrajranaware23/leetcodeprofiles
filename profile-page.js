import { getCurrentUser } from './auth/auth-service.js';
import { guardPage, showAuthLoader, hideAuthLoader } from './auth/auth-guard.js';
import { waitForProgressSync } from './auth/progress-sync-service.js';
import { initSiteNav, initScrollAnimations } from './site-nav.js';
import { getAllPackSummaries, invalidateProgressCache } from './progress-facade.js';
import { bindHunterCardActions, renderHunterCard } from './hunter-card.js';
import { redirectLegacyPaths } from './routes.js';

async function initProfilePage() {
  if (redirectLegacyPaths()) return;
  if (!(await guardPage())) return;

  showAuthLoader();
  try {
    await waitForProgressSync();
  } finally {
    hideAuthLoader();
  }

  initSiteNav({ variant: 'app', activePage: 'profile' });
  invalidateProgressCache();

  const user = getCurrentUser();
  const summaries = await getAllPackSummaries();
  renderHunterCard(user, summaries);
  bindHunterCardActions();
  initScrollAnimations();
}

if (document.body.dataset.page === 'profile') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProfilePage);
  } else {
    initProfilePage();
  }
}
