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

export function initLandingProgress() {
  loadArraysProgress();
  const arraysSummary = getArraysSummary();
  const arraysContinueUrl = getArraysContinueUrl();

  renderContinueBanner(arraysSummary, arraysContinueUrl);
  renderPackProgress('arrays-pack-progress', 'arrays-strings-start', arraysSummary, arraysContinueUrl, './course-reader.html', 'START PACK →');

  loadStarterProgress(PACK_IDS.STARTER);
  const starterSummary = getStarterSummary(PACK_IDS.STARTER);
  const starterContinueUrl = getStarterContinueUrl(PACK_IDS.STARTER);

  renderPackProgress('starter-pack-progress', 'starter-start', starterSummary, starterContinueUrl, './starter-reader.html', 'START PATH →');
}

function renderContinueBanner(summary, continueUrl) {
  const section = document.getElementById('continueSection');
  if (!section || !summary.hasProgress) return;

  section.hidden = false;

  const title = document.getElementById('continueTitle');
  const meta = document.getElementById('continueMeta');
  const fill = document.getElementById('continueProgressFill');
  const last = document.getElementById('continueLast');
  const btn = document.getElementById('continueBtn');
  const recommended = document.getElementById('continueRecommended');

  if (title) {
    title.textContent = summary.currentRank?.includes('Complete')
      ? `${summary.currentRank} — Review Your Journey`
      : 'Continue Arrays & Strings Ascension';
  }

  if (meta) {
    meta.textContent = `${summary.completedCount} / ${summary.totalLessons} lessons · ${summary.totalXp.toLocaleString()} XP · ${summary.currentRank}`;
  }

  if (fill) fill.style.width = `${summary.completionPercent}%`;

  if (last && summary.lastVisited) {
    last.textContent = `Last visited: ${summary.lastVisited.icon} ${summary.lastVisited.title}`;
  } else if (last) {
    last.textContent = '';
  }

  if (recommended) {
    if (summary.recommendedNext && summary.lastVisited?.id !== summary.recommendedNext.id) {
      recommended.textContent = `Recommended next: ${summary.recommendedNext.icon} ${summary.recommendedNext.title}`;
      recommended.hidden = false;
    } else {
      recommended.hidden = true;
    }
  }

  if (btn) {
    btn.href = continueUrl;
    btn.textContent = summary.completedCount > 0 ? 'CONTINUE LEARNING →' : 'START LEARNING →';
  }
}

function renderPackProgress(progressId, startBtnId, summary, continueUrl, defaultUrl, defaultLabel) {
  const progressEl = document.getElementById(progressId);
  const startBtn = document.getElementById(startBtnId);
  if (!startBtn) return;

  if (!summary.hasProgress) {
    startBtn.href = defaultUrl;
    startBtn.textContent = defaultLabel;
    return;
  }

  startBtn.href = continueUrl;
  startBtn.textContent = 'CONTINUE →';

  if (!progressEl) return;
  progressEl.hidden = false;

  const fill = progressEl.querySelector('.pack-progress-fill');
  const label = progressEl.querySelector('.pack-progress-label');
  const xp = progressEl.querySelector('.pack-progress-xp');

  if (fill) fill.style.width = `${summary.completionPercent}%`;
  if (label) label.textContent = `${summary.completedCount}/${summary.totalLessons} lessons`;
  if (xp) xp.textContent = `${summary.totalXp.toLocaleString()} XP`;
}
