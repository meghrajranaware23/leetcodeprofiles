import { getFeaturedPack, getPackCtaLabel } from './pack-catalog.js';
import {
  getActivePacksCount,
  getAllPackSummaries,
  getPackContinueUrl,
  getTopicPacksSortedForDisplay,
  getTotalXpAcrossPacks,
  hasMeaningfulProgress,
  invalidateProgressCache,
} from './progress-facade.js';
import {
  formatPackMeta,
  getPeakRankLabel,
  getRankColor,
  getRankCssClass,
  getRankPillLabel,
} from './rank-display.js';

const METHOD_BANNER_DISMISSED_KEY = 'lp.method-banner-dismissed';

export function initMethodBanner(hasAnyProgress) {
  const banner = document.getElementById('packsMethodBanner');
  const dismissBtn = document.getElementById('packsMethodBannerDismiss');
  if (!banner) return;

  const dismissed = localStorage.getItem(METHOD_BANNER_DISMISSED_KEY) === '1';
  const show = !hasAnyProgress && !dismissed;

  banner.hidden = !show;

  if (!dismissBtn || dismissBtn.dataset.bound) return;
  dismissBtn.dataset.bound = '1';
  dismissBtn.addEventListener('click', () => {
    localStorage.setItem(METHOD_BANNER_DISMISSED_KEY, '1');
    banner.hidden = true;
  });
}

export function hydratePackProgress(pack, summary) {
  const card = document.getElementById(`pack-${pack.id}`);
  const progressEl = document.getElementById(pack.progressId);
  const startBtn = document.getElementById(pack.startBtnId);
  const topRankPill = card?.querySelector('.pack-top-rank');
  if (!startBtn) return;

  if (!summary?.hasProgress) {
    startBtn.href = pack.readerUrl;
    startBtn.textContent = getPackCtaLabel(pack, { continued: false });
    card?.classList.remove('pack-card--active');
    if (topRankPill) topRankPill.hidden = true;
    if (progressEl) progressEl.hidden = true;
    return;
  }

  startBtn.textContent = getPackCtaLabel(pack, { continued: true });
  getPackContinueUrl(pack.id).then((url) => {
    startBtn.href = url;
  });

  const rankLabel = getRankPillLabel(summary.currentRank);
  const rankClass = getRankCssClass(summary.currentRank);
  const rankColor = getRankColor(summary.currentRank);

  if (card) {
    card.classList.add('pack-card--active');
    card.style.setProperty('--pack-rank-color', rankColor);
  }

  if (topRankPill) {
    topRankPill.hidden = false;
    topRankPill.textContent = rankLabel;
    topRankPill.className = `pack-top-rank pack-rank-pill ${rankClass}`;
  }

  if (!progressEl) return;
  progressEl.hidden = false;

  const rankPill = progressEl.querySelector('.pack-rank-pill');
  const fill = progressEl.querySelector('.pack-progress-fill');
  const label = progressEl.querySelector('.pack-progress-label');
  const xp = progressEl.querySelector('.pack-progress-xp');

  if (rankPill) {
    rankPill.textContent = rankLabel;
    rankPill.className = `pack-rank-pill ${rankClass}`;
  }
  if (fill) fill.style.width = `${summary.completionPercent ?? 0}%`;
  if (label) {
    label.textContent = summary.totalLessons != null
      ? `${summary.completedCount}/${summary.totalLessons} lessons`
      : `${summary.completedCount} lessons`;
  }
  if (xp && summary.totalXp != null) {
    xp.textContent = `${summary.totalXp.toLocaleString()} XP`;
  }
}

export function renderContinueBanner(summary, continueUrl) {
  const section = document.getElementById('continueSection');
  if (!section || !hasMeaningfulProgress(summary)) {
    if (section) section.hidden = true;
    return;
  }

  section.hidden = false;

  const title = document.getElementById('continueTitle');
  const meta = document.getElementById('continueMeta');
  const fill = document.getElementById('continueProgressFill');
  const last = document.getElementById('continueLast');
  const btn = document.getElementById('continueBtn');
  const rankBadge = document.getElementById('continueRankBadge');
  const card = section.querySelector('.continue-card');

  const packTitle = summary.packTitle || 'your pack';
  const rankClass = getRankCssClass(summary.currentRank);
  const rankColor = getRankColor(summary.currentRank);

  if (card) {
    card.className = `continue-card ${rankClass}`;
    card.style.setProperty('--continue-rank-color', rankColor);
  }

  if (rankBadge) {
    rankBadge.textContent = getRankPillLabel(summary.currentRank);
    rankBadge.className = `continue-rank-badge pack-rank-pill ${rankClass}`;
    rankBadge.hidden = false;
  }

  if (title) {
    title.textContent = summary.currentRank?.includes('Complete')
      ? `${packTitle} — ${summary.currentRank}`
      : `Continue ${packTitle}`;
  }

  if (meta) {
    meta.textContent = formatPackMeta(summary);
  }

  if (fill) fill.style.width = `${summary.completionPercent ?? 0}%`;

  if (last && summary.lastVisited?.title) {
    last.textContent = `Last visited: ${summary.lastVisited.icon || '📄'} ${summary.lastVisited.title}`;
  } else if (last) {
    last.textContent = '';
  }

  if (btn) {
    btn.href = continueUrl;
    btn.textContent = summary.completedCount > 0 ? 'CONTINUE LEARNING →' : 'START LEARNING →';
  }
}

export async function renderHunterHero(hasProgress, totalXp, activeCount, summaries) {
  const defaultHero = document.getElementById('packsDefaultHero');
  const returnHero = document.getElementById('packsReturnHero');
  if (!defaultHero || !returnHero) return;

  if (!hasProgress) {
    defaultHero.hidden = false;
    returnHero.hidden = true;
    return;
  }

  defaultHero.hidden = true;
  returnHero.hidden = false;

  const xpEl = document.getElementById('packsReturnXp');
  const countEl = document.getElementById('packsReturnCount');
  const peakEl = document.getElementById('packsReturnPeak');

  if (xpEl) xpEl.textContent = `${totalXp.toLocaleString()} XP earned`;
  if (countEl) {
    countEl.textContent = activeCount === 1
      ? '1 pack in progress'
      : `${activeCount} packs in progress`;
  }
  if (peakEl) {
    peakEl.textContent = `Peak: ${getPeakRankLabel(summaries)}`;
  }
}

function updateAscensionHeader(activeCount) {
  const desc = document.getElementById('packsAscensionDesc');
  if (!desc) return;
  if (activeCount > 0) {
    desc.textContent = activeCount === 1
      ? '1 pack in progress · 30 days · 6 ranks each'
      : `${activeCount} packs in progress · 30 days · 6 ranks each`;
  }
}

export async function initHunterHQ({ renderPackCard, renderCatalogFeatured }) {
  invalidateProgressCache();

  const summaries = await getAllPackSummaries();
  const summaryById = new Map(summaries.map(s => [s.packId, s]));
  const hasAnyProgress = summaries.some(s => hasMeaningfulProgress(s));

  const totalXp = await getTotalXpAcrossPacks();
  const activeCount = await getActivePacksCount();
  await renderHunterHero(hasAnyProgress, totalXp, activeCount, summaries);
  updateAscensionHeader(activeCount);
  initMethodBanner(hasAnyProgress);

  renderCatalogFeatured(summaryById);

  const sortedTopics = await getTopicPacksSortedForDisplay();
  const gridEl = document.getElementById('packsGrid');
  if (gridEl) {
    gridEl.innerHTML = sortedTopics.map(pack => renderPackCard(pack)).join('');
    sortedTopics.forEach((pack) => {
      hydratePackProgress(pack, summaryById.get(pack.id));
    });
  }
}

export function hydrateFeaturedPack(summaryById) {
  const featured = getFeaturedPack();
  hydratePackProgress(featured, summaryById.get(featured.id));
}
