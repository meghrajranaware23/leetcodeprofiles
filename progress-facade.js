/* ══════════════════════════════════════════════════════════
   PROGRESS FACADE — Cross-pack summary API for Hunter HQ
   Routes each packId to its owning *-progress.js module.
   ══════════════════════════════════════════════════════════ */

import { PACK_IDS, readRootStore } from './progress-store.js';
import { getAllPacksSorted } from './pack-catalog.js';

const MODULE_LOADERS = Object.freeze({
  [PACK_IDS.ARRAYS_STRINGS]: () => import('./course-progress.js'),
  [PACK_IDS.STARTER]: () => import('./starter-progress.js'),
  [PACK_IDS.GRAPHS]: () => import('./graphs-progress.js'),
  [PACK_IDS.TREES]: () => import('./trees-progress.js'),
  [PACK_IDS.DP]: () => import('./dp-progress.js'),
  [PACK_IDS.RECURSION]: () => import('./recursion-progress.js'),
});

const ALL_PACK_IDS = Object.values(PACK_IDS);
const moduleCache = new Map();
let summariesCache = null;

async function getProgressModule(packId) {
  const loader = MODULE_LOADERS[packId];
  if (!loader) {
    throw new Error(`Unknown pack id: ${packId}`);
  }
  if (!moduleCache.has(packId)) {
    moduleCache.set(packId, loader());
  }
  return moduleCache.get(packId);
}

function sortSummaries(summaries) {
  return [...summaries].sort((a, b) => {
    if (a.hasProgress !== b.hasProgress) return a.hasProgress ? -1 : 1;
    const aTime = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
    const bTime = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
    return bTime - aTime;
  });
}

export function invalidateProgressCache() {
  summariesCache = null;
}

export async function getPackSummary(packId) {
  const mod = await getProgressModule(packId);
  return mod.getProgressSummary(packId);
}

export async function getPackContinueUrl(packId) {
  const mod = await getProgressModule(packId);
  return mod.getContinueUrl(packId);
}

export async function loadAllSummaries() {
  if (summariesCache) return summariesCache;

  const summaries = await Promise.all(
    ALL_PACK_IDS.map(async (packId) => getPackSummary(packId))
  );
  summariesCache = sortSummaries(summaries);
  return summariesCache;
}

export async function getAllPackSummaries() {
  return loadAllSummaries();
}

export async function getActivePackSummary() {
  const summaries = await loadAllSummaries();
  const withProgress = summaries.filter(s => s.hasProgress);
  if (withProgress.length === 0) return null;

  const root = readRootStore();
  const activeId = root.activePackId;
  const activeMatch = withProgress.find(s => s.packId === activeId);
  if (activeMatch) return activeMatch;

  return withProgress[0];
}

export async function getTotalXpAcrossPacks() {
  const summaries = await loadAllSummaries();
  return summaries.reduce((sum, s) => sum + (s.totalXp || 0), 0);
}

export async function getActivePacksCount() {
  const summaries = await loadAllSummaries();
  return summaries.filter(s => hasMeaningfulProgress(s)).length;
}

/** True when the user has actually started grinding — not just opened a reader page. */
export function hasMeaningfulProgress(summary) {
  if (!summary?.hasProgress) return false;
  if (summary.completedCount > 0) return true;
  return (summary.totalXp ?? 0) > 0;
}

export async function getContinuePackSummary() {
  const summaries = await loadAllSummaries();
  const meaningful = summaries.filter(s => hasMeaningfulProgress(s));
  if (meaningful.length === 0) return null;

  const root = readRootStore();
  const activeId = root.activePackId;
  const activeMatch = meaningful.find(s => s.packId === activeId);
  return activeMatch || meaningful[0];
}

async function resolveDayLabel(summary) {
  if (!summary) return null;

  if (summary.packId === PACK_IDS.STARTER) {
    const phase = summary.currentRank?.match(/Phase\s*(\d)/i);
    if (phase) return `Phase ${phase[1]}`;
    if (summary.currentRank && !/not started/i.test(summary.currentRank)) {
      return summary.currentRank;
    }
    return null;
  }

  try {
    const mod = await getProgressModule(summary.packId);
    const lessons = mod.AVAILABLE_LESSONS;
    if (!lessons?.length) return null;

    const idx = summary.lastVisited?.index;
    const id = summary.lastVisited?.id;
    let lesson = null;
    if (Number.isInteger(idx) && lessons[idx]?.id === id) {
      lesson = lessons[idx];
    } else if (id) {
      lesson = lessons.find((l) => l.id === id);
    } else if (Number.isInteger(idx)) {
      lesson = lessons[idx];
    }
    if (lesson?.day > 0) return `Day ${lesson.day}`;
  } catch {
    // ignore lookup failures
  }
  return null;
}

/** Nav popover: primary continue target + recent in-progress packs. */
export async function getContinueNavContext() {
  const primary = await getContinuePackSummary();
  if (!primary) {
    return { primary: null, continueUrl: null, dayLabel: null, recent: [] };
  }

  const continueUrl = await getPackContinueUrl(primary.packId);
  const dayLabel = await resolveDayLabel(primary);
  const summaries = await loadAllSummaries();
  const others = summaries.filter(
    (s) => hasMeaningfulProgress(s) && s.packId !== primary.packId
  );

  const recent = await Promise.all(
    others.slice(0, 3).map(async (summary) => ({
      summary,
      continueUrl: await getPackContinueUrl(summary.packId),
      dayLabel: await resolveDayLabel(summary),
    }))
  );

  return { primary, continueUrl, dayLabel, recent };
}

/** Catalog order with in-progress packs first within each group. */
export async function getTopicPacksSortedForDisplay() {
  const summaries = await loadAllSummaries();
  const byId = new Map(summaries.map(s => [s.packId, s]));
  const topics = getAllPacksSorted().filter(p => p.kind === 'ascension');

  return [...topics].sort((a, b) => {
    const aProg = byId.get(a.id)?.hasProgress ? 1 : 0;
    const bProg = byId.get(b.id)?.hasProgress ? 1 : 0;
    if (aProg !== bProg) return bProg - aProg;
    const aTime = byId.get(a.id)?.updatedAt ? new Date(byId.get(a.id).updatedAt).getTime() : 0;
    const bTime = byId.get(b.id)?.updatedAt ? new Date(byId.get(b.id).updatedAt).getTime() : 0;
    if (aTime !== bTime) return bTime - aTime;
    return a.order - b.order;
  });
}
