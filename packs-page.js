import { getFeaturedPack, getTopicPacks, getTeaserPacks } from './pack-catalog.js';
import { initSiteNav, initScrollAnimations } from './site-nav.js';

function renderPackCard(pack, { featured = false } = {}) {
  const badgeClass = pack.badgeStyle === 'live'
    ? 'pack-badge pack-badge-live'
    : 'pack-badge';
  const borderStyle = pack.badgeStyle === 'live'
    ? 'border-color: var(--red-border);'
    : '';
  const featuredClass = featured ? ' pack-card-featured' : '';

  const progressHtml = pack.progressId
    ? `<div class="pack-progress" id="${pack.progressId}" hidden>
        <div class="pack-progress-header">
          <span class="pack-progress-label">0/0 lessons</span>
          <span class="pack-progress-xp">0 XP</span>
        </div>
        <div class="pack-progress-bar">
          <div class="pack-progress-fill"></div>
        </div>
      </div>`
    : '';

  return `
    <div class="pack-card${featuredClass}" id="pack-${pack.id}" style="${borderStyle}">
      <div class="pack-top">
        <span class="pack-icon">${pack.icon}</span>
        <span class="${badgeClass}">${pack.badge}</span>
      </div>
      <div class="pack-name">${pack.title}</div>
      <p class="pack-desc">${pack.description}</p>
      <hr class="pack-divider">
      <div class="pack-stats">
        ${pack.stats.map(s => `<span class="pack-stat">${s}</span>`).join('')}
      </div>
      <div class="pack-langs">
        ${pack.pills.map(p => `<span class="lang-pill">${p}</span>`).join('')}
      </div>
      ${progressHtml}
      <div class="pack-bottom">
        <div class="pack-price">${pack.price} <span class="currency">USD</span></div>
        <a href="${pack.readerUrl}" class="pack-btn" id="${pack.startBtnId}">${pack.startLabel}</a>
      </div>
    </div>
  `;
}

function renderCatalog() {
  const featured = getFeaturedPack();
  const topics = getTopicPacks();

  const featuredEl = document.getElementById('packsFeatured');
  const gridEl = document.getElementById('packsGrid');

  if (featuredEl) {
    featuredEl.innerHTML = renderPackCard(featured, { featured: true });
  }

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

export function initPacksPage() {
  initSiteNav({ activePage: 'packs' });
  renderCatalog();
  initScrollAnimations();
}

export function initHomeTeaser() {
  renderTeaser();
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.body.dataset.page === 'packs') {
    initPacksPage();
  }
});
