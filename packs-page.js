import { getFeaturedPack, getTeaserPacks, getTopicPacks, getPackCtaLabel } from './pack-catalog.js';
import { guardPage, hideAuthLoader } from './auth/auth-guard.js';
import { waitForSessionBootstrap } from './auth/auth-service.js';
import { onProgressSyncUpdated } from './auth/progress-sync-service.js';
import { initSiteNav, initScrollAnimations } from './site-nav.js';
import { initHunterHQ, refreshHunterHQ, hydrateFeaturedPack } from './hunter-hq.js';
import { redirectLegacyPaths } from './routes.js';
import { initBrandLogos, injectFavicon } from './brand-logo.js';
import { initSiteFooter } from './site-footer.js';
import { initAuthAwareLinks } from './auth/auth-guard.js';

export function renderPackCard(pack, { featured = false } = {}) {
  const badgeClass = pack.badgeStyle === 'live'
    ? 'pack-badge pack-badge-live'
    : 'pack-badge';
  const borderStyle = pack.badgeStyle === 'live'
    ? 'border-color: var(--red-border);'
    : '';
  const featuredClass = featured ? ' pack-card-featured pack-card--featured-layout' : '';

  const progressHtml = pack.progressId
    ? `<div class="pack-progress" id="${pack.progressId}" hidden>
        <div class="pack-progress-header">
          <span class="pack-rank-pill rank-none">Not Started</span>
          <span class="pack-progress-label">0/0 lessons</span>
          <span class="pack-progress-xp">0 XP</span>
        </div>
        <div class="pack-progress-bar">
          <div class="pack-progress-fill"></div>
        </div>
      </div>`
    : '';

  const statsHtml = pack.stats.map(s => `<span class="pack-stat">${s}</span>`).join('');
  const langsHtml = pack.pills.map(p => `<span class="lang-pill">${p}</span>`).join('');
  const ctaHtml = `<a href="${pack.readerUrl}" class="pack-btn pack-btn--full" id="${pack.startBtnId}">${getPackCtaLabel(pack)}</a>`;

  if (featured) {
    return `
      <div class="pack-card${featuredClass}" id="pack-${pack.id}" style="${borderStyle}">
        <div class="pack-featured-body">
          <div class="pack-featured-main">
            <div class="pack-top">
              <span class="pack-icon">${pack.icon}</span>
              <div class="pack-top-badges">
                <span class="pack-top-rank pack-rank-pill rank-none" hidden>Not Started</span>
                <span class="${badgeClass}">${pack.badge}</span>
              </div>
            </div>
            <div class="pack-name">${pack.title}</div>
            <p class="pack-desc">${pack.description}</p>
            <div class="pack-stats pack-stats--featured">
              ${statsHtml}
            </div>
            <div class="pack-langs">
              ${langsHtml}
            </div>
            ${progressHtml}
          </div>
          <div class="pack-featured-action">
            ${ctaHtml}
          </div>
        </div>
      </div>
    `;
  }

  return `
    <div class="pack-card${featuredClass}" id="pack-${pack.id}" style="${borderStyle}">
      <div class="pack-top">
        <span class="pack-icon">${pack.icon}</span>
        <div class="pack-top-badges">
          <span class="pack-top-rank pack-rank-pill rank-none" hidden>Not Started</span>
          <span class="${badgeClass}">${pack.badge}</span>
        </div>
      </div>
      <div class="pack-name">${pack.title}</div>
      <p class="pack-desc">${pack.description}</p>
      <hr class="pack-divider">
      <div class="pack-stats">
        ${statsHtml}
      </div>
      <div class="pack-langs">
        ${langsHtml}
      </div>
      ${progressHtml}
      <div class="pack-bottom pack-bottom--cta-only">
        ${ctaHtml}
      </div>
    </div>
  `;
}

function renderCatalogFeatured(summaryById) {
  const featured = getFeaturedPack();
  const featuredEl = document.getElementById('packsFeatured');
  if (featuredEl) {
    featuredEl.innerHTML = renderPackCard(featured, { featured: true });
    if (summaryById) {
      hydrateFeaturedPack(summaryById);
    }
  }
}

function renderCatalog() {
  const topics = getTopicPacks();
  renderCatalogFeatured(null);

  const gridEl = document.getElementById('packsGrid');
  if (gridEl) {
    gridEl.innerHTML = topics.map(pack => renderPackCard(pack)).join('');
  }
}

function renderTeaser() {
  const gridEl = document.getElementById('packsTeaserGrid');
  if (!gridEl) return;

  const teaserPacks = getTeaserPacks();
  gridEl.innerHTML = teaserPacks.map(pack => renderPackCard(pack)).join('');
}

const hunterHQOptions = {
  renderPackCard,
  renderCatalogFeatured,
};

async function refreshAfterSync() {
  const summaries = await refreshHunterHQ(hunterHQOptions);
  await initSiteNav({ variant: 'app', summaries });
}

export async function initPacksPage() {
  if (redirectLegacyPaths()) return;
  if (!(await guardPage())) return;

  const summariesPromise = initHunterHQ(hunterHQOptions);
  const navPromise = initSiteNav({ variant: 'app' });

  const summaries = await summariesPromise;
  await navPromise;

  hideAuthLoader();
  injectFavicon();
  initSiteFooter({ variant: 'marketing' });
  initAuthAwareLinks(document);
  initBrandLogos();
  initScrollAnimations();

  await initSiteNav({ variant: 'app', summaries });

  onProgressSyncUpdated(({ changed }) => {
    if (changed) refreshAfterSync();
  });

  waitForSessionBootstrap().then(() => refreshAfterSync());
}

export function initHomeTeaser() {
  renderTeaser();
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.body.dataset.page === 'packs') {
    initPacksPage();
  }
});
