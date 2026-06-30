import { getFeaturedPack, getTeaserPacks, getPackCtaLabel } from './pack-catalog.js';
import { guardPage } from './auth/auth-guard.js';
import { redirectLegacyPaths, ROUTES } from './routes.js';
import { hydrateFeaturedPack } from './hunter-hq.js';

function getRoadmapButtonLabel(pack) {
  const match = pack.duration?.match(/^(\d+)/);
  return match ? `View ${match[1]}-Day Plan` : 'View 30-Day Plan';
}

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
  const roadmapHtml = pack.hasRoadmap
    ? `<button type="button" class="pack-btn pack-btn--outline pack-btn--full" id="${pack.roadmapBtnId}" data-roadmap-pack="${pack.id}">${getRoadmapButtonLabel(pack)}</button>`
    : '';
  const bottomClass = pack.hasRoadmap
    ? 'pack-bottom pack-bottom--cta-only pack-bottom--stacked'
    : 'pack-bottom pack-bottom--cta-only';

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
          <div class="pack-featured-action${pack.hasRoadmap ? ' pack-featured-action--stacked' : ''}">
            ${ctaHtml}
            ${roadmapHtml}
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
      <div class="${bottomClass}">
        ${ctaHtml}
        ${roadmapHtml}
      </div>
    </div>
  `;
}

export function renderCatalogFeatured(summaryById) {
  const featured = getFeaturedPack();
  const featuredEl = document.getElementById('packsFeatured');
  if (featuredEl) {
    featuredEl.innerHTML = renderPackCard(featured, { featured: true });
    if (summaryById) {
      hydrateFeaturedPack(summaryById);
    }
  }
}

function renderTeaser() {
  const gridEl = document.getElementById('packsTeaserGrid');
  if (!gridEl) return;

  const teaserPacks = getTeaserPacks();
  gridEl.innerHTML = teaserPacks.map(pack => renderPackCard(pack)).join('');
}

export async function initPacksPage() {
  if (redirectLegacyPaths()) return;
  if (!(await guardPage())) return;

  window.location.replace(`${ROUTES.courses}${window.location.search}${window.location.hash}`);
}

export function initHomeTeaser() {
  renderTeaser();
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.body.dataset.page === 'packs') {
    initPacksPage();
  }
});
