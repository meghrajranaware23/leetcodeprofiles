import {
  getActivePackSummary,
  getPackContinueUrl,
} from './progress-facade.js';
import {
  loadProgress as loadArraysProgress,
  getProgressSummary as getArraysSummary,
  getContinueUrl as getArraysContinueUrl,
} from './course-progress.js';
import {
  loadProgress as loadStarterProgress,
  getProgressSummary as getStarterSummary,
  getContinueUrl as getStarterContinueUrl,
} from './starter-progress.js';
import { PACK_IDS } from './progress-store.js';
import { getPackById, getPackCtaLabel } from './pack-catalog.js';
import { renderContinueBanner as renderHQContinueBanner } from './hunter-hq.js';

export async function initLandingProgress() {
  loadArraysProgress();
  loadStarterProgress(PACK_IDS.STARTER);

  let summary = await getActivePackSummary();
  let continueUrl = summary ? await getPackContinueUrl(summary.packId) : null;

  if (!summary?.hasProgress) {
    const arraysSummary = getArraysSummary();
    if (arraysSummary.hasProgress) {
      summary = arraysSummary;
      continueUrl = getArraysContinueUrl();
    }
  }

  if (summary?.hasProgress && continueUrl) {
    renderHQContinueBanner(summary, continueUrl);
    showSyncHint();
  }

  const arraysSummary = getArraysSummary();
  const arraysContinueUrl = getArraysContinueUrl();
  const arraysPack = getPackById(PACK_IDS.ARRAYS_STRINGS);
  renderPackProgress(
    'arrays-pack-progress',
    'arrays-strings-start',
    arraysSummary,
    arraysContinueUrl,
    './course-reader.html',
    arraysPack ? getPackCtaLabel(arraysPack) : 'Start Arrays & Strings →',
    arraysPack
  );

  const starterSummary = getStarterSummary(PACK_IDS.STARTER);
  const starterContinueUrl = getStarterContinueUrl(PACK_IDS.STARTER);
  const starterPack = getPackById(PACK_IDS.STARTER);
  renderPackProgress(
    'starter-pack-progress',
    'starter-start',
    starterSummary,
    starterContinueUrl,
    '/starter',
    starterPack ? getPackCtaLabel(starterPack) : 'Start Path →',
    starterPack
  );
}

function showSyncHint() {
  const hint = document.getElementById('continueSyncHint');
  if (hint) hint.hidden = false;
}

function renderPackProgress(progressId, startBtnId, summary, continueUrl, defaultUrl, defaultLabel, pack) {
  const progressEl = document.getElementById(progressId);
  const startBtn = document.getElementById(startBtnId);
  if (!startBtn) return;

  if (!summary.hasProgress) {
    startBtn.href = defaultUrl;
    startBtn.textContent = defaultLabel;
    return;
  }

  startBtn.href = continueUrl;
  startBtn.textContent = pack ? getPackCtaLabel(pack, { continued: true }) : 'Continue →';

  if (!progressEl) return;
  progressEl.hidden = false;

  const fill = progressEl.querySelector('.pack-progress-fill');
  const label = progressEl.querySelector('.pack-progress-label');
  const xp = progressEl.querySelector('.pack-progress-xp');

  if (fill) fill.style.width = `${summary.completionPercent}%`;
  if (label) label.textContent = `${summary.completedCount}/${summary.totalLessons} lessons`;
  if (xp) xp.textContent = `${summary.totalXp.toLocaleString()} XP`;
}
