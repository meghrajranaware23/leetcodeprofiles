import { initHunterHQ, refreshHunterHQ } from '../hunter-hq.js';
import { renderPackCard, renderCatalogFeatured } from '../packs-page.js';
import { initAuthAwareLinks } from '../auth/auth-guard.js';
import { initScrollAnimations } from '../site-nav.js';

const hunterHQOptions = {
  renderPackCard,
  renderCatalogFeatured,
};

export async function initPacksPanel() {
  initAuthAwareLinks(document.getElementById('panel-packs') || document);
  const summaries = await initHunterHQ(hunterHQOptions);
  initScrollAnimations();
  return summaries;
}

export async function refreshPacksPanel() {
  return refreshHunterHQ(hunterHQOptions);
}
