/* ══════════════════════════════════════════════════════════
   COURSE PROGRESS — Pack-scoped progress API
   Arrays & Strings (default pack) · uses progress-store.js
   ══════════════════════════════════════════════════════════ */

import { COURSE_LESSONS } from './course-content.js';
import {
  DEFAULT_PACK_ID,
  PACK_IDS,
  PACK_REGISTRY,
  ROOT_SCHEMA_VERSION,
  STORAGE_KEY,
  readRootStore,
  writeRootStore,
  getPackProgress,
  setPackProgress,
  resolveLessonIndex,
  createEmptyPackProgress,
} from './progress-store.js';

/** Active pack for this reader instance */
export const PACK_ID = DEFAULT_PACK_ID;
export const PROGRESS_VERSION = ROOT_SCHEMA_VERSION;

export { STORAGE_KEY, PACK_IDS, PACK_REGISTRY, DEFAULT_PACK_ID };

const RANK_ORDER = ['intro', 'e', 'd', 'c', 'b', 'a', 's'];

export function getLessonsForRank(rank) {
  return COURSE_LESSONS.filter(l => l.content && l.rank === rank);
}

export const ERANK_LESSONS = COURSE_LESSONS.filter(
  l => l.content && (l.rank === 'intro' || l.rank === 'e')
);
export const ERANK_LESSON_IDS = new Set(ERANK_LESSONS.map(l => l.id));

export const DRANK_LESSONS = COURSE_LESSONS.filter(
  l => l.content && l.rank === 'd'
);
export const DRANK_LESSON_IDS = new Set(DRANK_LESSONS.map(l => l.id));

/** Lessons with live content on the learning path (intro + E + D) */
export const AVAILABLE_LESSONS = COURSE_LESSONS.filter(
  l => l.content && (l.rank === 'intro' || l.rank === 'e' || l.rank === 'd')
);
export const AVAILABLE_LESSON_IDS = new Set(AVAILABLE_LESSONS.map(l => l.id));

export const LESSON_STEPS = {
  intro: [
    { id: 'read_briefing', label: 'Read the welcome briefing', kind: 'auto-scroll' },
  ],
  concept: [
    { id: 'read_lesson', label: 'Read the concept lesson', kind: 'auto-scroll' },
    { id: 'understand', label: 'I understand this pattern', kind: 'confirm' },
  ],
  quest: [
    { id: 'read_mission', label: 'Read the problem on LeetCode', kind: 'confirm' },
    { id: 'attempt', label: 'Attempt the problem (5 min)', kind: 'attempt', hint: 'Solve on LeetCode or in your editor before revealing hints.' },
    { id: 'review_solution', label: 'Review the solution walkthrough', kind: 'reveal', requires: ['attempt'] },
  ],
  checkpoint: [
    { id: 'review_signals', label: 'Review pattern signals & mistakes', kind: 'confirm' },
    { id: 'mini_challenge', label: 'Attempt the mini challenge', kind: 'attempt', hint: 'Apply the day\'s pattern on LeetCode before moving on.' },
    { id: 'practice_queue', label: 'Review the practice queue', kind: 'confirm' },
  ],
  test: [
    { id: 'read_problem', label: 'Open & read the problem on LeetCode', kind: 'confirm' },
    { id: 'attempt', label: 'Attempt for 15 minutes', kind: 'attempt', hint: 'This is a rank test — give it a real try on LeetCode before revealing.' },
    { id: 'review_solution', label: 'Reveal solution walkthrough', kind: 'reveal', requires: ['attempt'] },
  ],
  complete: [
    { id: 'view_journey', label: 'Review your rank journey', kind: 'auto-scroll' },
  ],
};

const ACHIEVEMENT_DEFS = {
  'briefing-complete': { title: 'Mission Briefing Complete', icon: '⚔️' },
  'first-concept': { title: 'First Pattern Learned', icon: '📝' },
  'first-quest': { title: 'First Quest Cleared', icon: '⚔' },
  'first-checkpoint': { title: 'First Checkpoint Passed', icon: '✅' },
  'first-test': { title: 'First Rank Test Cleared', icon: '🎯' },
  'e-rank-complete': { title: 'E-Rank Awakening', icon: '🏆' },
  'first-d-rank-concept': { title: 'First D-Rank Pattern', icon: '🔵' },
  'pointer-master': { title: 'Pointer Master', icon: '🎯' },
  'window-opener': { title: 'Window Opener', icon: '🪟' },
  'pattern-combo': { title: 'First Pattern Combo', icon: '🔗' },
  'd-rank-complete': { title: 'D-Rank Builder', icon: '🏗️' },
};

/* ─── In-memory state: root store + active pack slice ─── */
let rootStore = null;
let activePackId = PACK_ID;
let progressData = null;
export let completedSet = new Set();
export let stepProgress = {};

function isERankComplete(completed) {
  const eLessons = COURSE_LESSONS.filter(l => l.rank === 'e' && l.content);
  return eLessons.length > 0 && eLessons.every(l => completed.has(l.id));
}

export function isDRankUnlocked() {
  return DRANK_LESSONS.length > 0;
}

function buildRankSnapshot(completedIds) {
  const completed = new Set(completedIds);
  const ranks = {};
  RANK_ORDER.forEach(rank => {
    const lessons = COURSE_LESSONS.filter(l => l.rank === rank && l.content);
    const total = lessons.length;
    const done = lessons.filter(l => completed.has(l.id)).length;
    ranks[rank] = {
      completed: done,
      total,
      complete: total > 0 && done >= total,
      unlocked: rank === 'intro' || rank === 'e' || rank === 'd' || done > 0,
    };
  });
  ranks.e.unlocked = true;
  ranks.intro.unlocked = true;
  if (DRANK_LESSONS.length > 0) ranks.d.unlocked = true;
  return ranks;
}

function syncFromPack(pack) {
  progressData = pack;
  completedSet = new Set(pack.completed);
  stepProgress = pack.steps;
}

function syncToPack() {
  progressData.completed = [...completedSet];
  progressData.steps = stepProgress;
  progressData.updatedAt = new Date().toISOString();
}

function persistActivePack() {
  syncToPack();
  setPackProgress(rootStore, activePackId, progressData);
  rootStore.activePackId = activePackId;
  writeRootStore(rootStore);
}

function getLearningPathLessons() {
  const path = [...ERANK_LESSONS];
  if (isDRankUnlocked()) path.push(...DRANK_LESSONS);
  return path;
}

function inferLastVisitedIfMissing() {
  if (progressData.lastVisited || completedSet.size === 0) return false;
  const path = getLearningPathLessons();
  const lastIncomplete = path.find(l => !completedSet.has(l.id));
  const target = lastIncomplete || path[path.length - 1];
  const idx = COURSE_LESSONS.findIndex(l => l.id === target.id);
  if (idx === -1) return false;
  progressData.lastVisited = {
    lessonId: target.id,
    lessonIndex: idx,
    updatedAt: new Date().toISOString(),
  };
  return true;
}

function wasLegacyStorageFormat() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const parsed = JSON.parse(raw);
    return !parsed.packs || parsed.version < ROOT_SCHEMA_VERSION;
  } catch {
    return false;
  }
}

export function loadProgress(packId = PACK_ID) {
  try {
    activePackId = packId;
    const needsMigrationPersist = wasLegacyStorageFormat();
    rootStore = readRootStore();
    const pack = getPackProgress(rootStore, packId);
    syncFromPack(pack);

    const inferred = inferLastVisitedIfMissing();
    if (needsMigrationPersist || inferred) persistActivePack();
  } catch {
    rootStore = readRootStore();
    syncFromPack(getPackProgress(rootStore, packId));
  }
}

export function saveProgress() {
  if (!rootStore) rootStore = readRootStore();
  persistActivePack();
}

export function getRootStore() {
  if (!rootStore) loadProgress();
  return rootStore;
}

export function getProgressData() {
  if (!progressData) loadProgress();
  return progressData;
}

export function getActivePackId() {
  return activePackId;
}

export function setLastVisited(lessonId, lessonIndex) {
  if (!lessonId || lessonIndex < 0) return;
  progressData.lastVisited = {
    lessonId,
    lessonIndex,
    updatedAt: new Date().toISOString(),
  };
  saveProgress();
}

export function getLastVisited() {
  return progressData?.lastVisited ?? null;
}

export function getLastVisitedIndex(fallbackIndex = 0) {
  const last = getLastVisited();
  if (!last) return fallbackIndex;
  const idx = resolveLessonIndex(COURSE_LESSONS, last);
  return idx !== -1 ? idx : fallbackIndex;
}

export function migrateLegacyProgress() {
  let changed = false;
  completedSet.forEach(id => {
    const lesson = COURSE_LESSONS.find(l => l.id === id);
    if (!lesson || !AVAILABLE_LESSON_IDS.has(id)) return;
    getLessonSteps(lesson).forEach(step => {
      if (!isStepDone(id, step.id)) {
        getStepState(id)[step.id] = true;
        changed = true;
      }
    });
  });
  if (changed) saveProgress();
}

export function getLessonSteps(lesson) {
  return LESSON_STEPS[lesson.type] || LESSON_STEPS.concept;
}

export function getStepState(lessonId) {
  if (!stepProgress[lessonId]) stepProgress[lessonId] = {};
  return stepProgress[lessonId];
}

export function isStepDone(lessonId, stepId) {
  return !!getStepState(lessonId)[stepId];
}

export function setStepDone(lessonId, stepId, done = true) {
  const state = getStepState(lessonId);
  if (done) state[stepId] = true;
  else delete state[stepId];
  saveProgress();
}

export function areAllStepsDone(lesson) {
  const steps = getLessonSteps(lesson);
  return steps.every(step => {
    if (step.requires && !step.requires.every(req => isStepDone(lesson.id, req))) return false;
    return isStepDone(lesson.id, step.id);
  });
}

export function getStepProgressCount(lesson) {
  const steps = getLessonSteps(lesson);
  const done = steps.filter(s => isStepDone(lesson.id, s.id)).length;
  return { done, total: steps.length };
}

export function getRecommendedNext() {
  for (const lesson of getLearningPathLessons()) {
    if (!completedSet.has(lesson.id)) return lesson;
  }
  return null;
}

export function getCurrentRankLessons() {
  const eIncomplete = ERANK_LESSONS.some(l => !completedSet.has(l.id));
  if (eIncomplete) return ERANK_LESSONS;
  if (isDRankUnlocked()) return DRANK_LESSONS;
  return ERANK_LESSONS;
}

export function getCurrentRankLabel() {
  const lessons = getCurrentRankLessons();
  if (lessons === DRANK_LESSONS || (lessons.length && lessons[0]?.rank === 'd')) {
    return 'D-Rank';
  }
  return 'E-Rank';
}

export function getRecommendedNextIndex() {
  const lesson = getRecommendedNext();
  if (!lesson) return -1;
  return COURSE_LESSONS.findIndex(l => l.id === lesson.id);
}

export function getDayLessons(rank, day) {
  return COURSE_LESSONS.filter(l => l.rank === rank && l.day === day && l.content);
}

export function getDayProgress(rank, day) {
  const lessons = getDayLessons(rank, day);
  const completed = lessons.filter(l => completedSet.has(l.id)).length;
  return { completed, total: lessons.length, lessons, complete: completed >= lessons.length };
}

export function getCompletedDays(rank = 'e') {
  const days = new Set();
  COURSE_LESSONS.filter(l => l.rank === rank && l.content && l.day > 0)
    .forEach(l => days.add(l.day));
  return [...days].filter(day => getDayProgress(rank, day).complete);
}

function sumXpForLessons(lessons, completed) {
  let xp = 0;
  lessons.forEach(lesson => {
    if (completed.has(lesson.id)) xp += lesson.xp || 0;
  });
  return xp;
}

export function getTotalXP() {
  return sumXpForLessons(AVAILABLE_LESSONS, completedSet);
}

export function getCompletedCount() {
  return getCurrentRankLessons().filter(l => completedSet.has(l.id)).length;
}

export function getCompletionPercent() {
  const lessons = getCurrentRankLessons();
  const total = lessons.length;
  if (!total) return 0;
  const done = lessons.filter(l => completedSet.has(l.id)).length;
  return Math.round((done / total) * 100);
}

export function getQuestStats(rank = null) {
  const lessons = rank
    ? COURSE_LESSONS.filter(l => l.content && l.rank === rank)
    : getCurrentRankLessons();
  return {
    quests: lessons.filter(l => l.type === 'quest' && completedSet.has(l.id)).length,
    checkpoints: lessons.filter(l => l.type === 'checkpoint' && completedSet.has(l.id)).length,
    tests: lessons.filter(l => l.type === 'test' && completedSet.has(l.id)).length,
    concepts: lessons.filter(l => l.type === 'concept' && completedSet.has(l.id)).length,
  };
}

export function getCompletedByType(type, rank = null) {
  const lessons = rank
    ? COURSE_LESSONS.filter(l => l.content && l.rank === rank && l.type === type)
    : AVAILABLE_LESSONS.filter(l => l.type === type);
  return lessons.filter(l => completedSet.has(l.id));
}

export function recordAchievement(achievementId) {
  if (!ACHIEVEMENT_DEFS[achievementId] && !achievementId.startsWith('day-') && !achievementId.startsWith('lesson-')) {
    return false;
  }
  if (progressData.achievements[achievementId]) return false;
  progressData.achievements[achievementId] = new Date().toISOString();
  saveProgress();
  return true;
}

export function recordLessonAchievements(lesson) {
  if (!lesson) return;
  recordAchievement(`lesson-${lesson.id}`);

  if (lesson.type === 'intro') recordAchievement('briefing-complete');
  if (lesson.type === 'concept' && getCompletedByType('concept').length === 1) {
    recordAchievement('first-concept');
  }
  if (lesson.type === 'quest' && getCompletedByType('quest').length === 1) {
    recordAchievement('first-quest');
  }
  if (lesson.type === 'checkpoint') {
    if (getCompletedByType('checkpoint').length === 1) recordAchievement('first-checkpoint');
    if (lesson.day > 0) recordAchievement(`day-${lesson.day}-complete`);
  }
  if (lesson.type === 'test' && getCompletedByType('test').length === 1) {
    recordAchievement('first-test');
  }
  if (lesson.type === 'complete' && lesson.id === 'rank-e-complete') {
    recordAchievement('e-rank-complete');
  }
  if (lesson.type === 'complete' && lesson.id === 'rank-d-complete') {
    recordAchievement('d-rank-complete');
  }
  if (lesson.type === 'concept' && lesson.rank === 'd' && getCompletedByType('concept', 'd').length === 1) {
    recordAchievement('first-d-rank-concept');
  }
  if (lesson.id === '8-4') recordAchievement('pointer-master');
  if (lesson.id === '9-2') recordAchievement('window-opener');
  if (lesson.id === '10-3') recordAchievement('pattern-combo');
}

export function hasMilestoneShown(key) {
  return progressData.milestonesShown.includes(key);
}

export function markMilestoneShown(key) {
  if (!progressData.milestonesShown.includes(key)) {
    progressData.milestonesShown.push(key);
    saveProgress();
  }
}

export function getAchievements() {
  return Object.entries(progressData.achievements).map(([id, earnedAt]) => ({
    id,
    earnedAt,
    ...(ACHIEVEMENT_DEFS[id] || { title: id, icon: '🏅' }),
  }));
}

/** Summary for a single pack (defaults to active Arrays & Strings pack) */
export function getProgressSummary(packId = PACK_ID) {
  if (packId === activePackId && progressData) {
    return buildProgressSummary(packId, progressData, completedSet, stepProgress);
  }

  const root = getRootStore();
  const pack = getPackProgress(root, packId);
  return buildProgressSummary(
    packId,
    pack,
    new Set(pack.completed),
    pack.steps
  );
}

function buildProgressSummary(packId, pack, completed, steps) {
  if (packId !== PACK_ID) {
    return {
      hasProgress: pack.completed.length > 0 || pack.lastVisited != null || Object.keys(pack.steps).length > 0,
      packId,
      packTitle: PACK_REGISTRY[packId]?.shortTitle || packId,
      completedCount: pack.completed.length,
      totalLessons: null,
      completionPercent: null,
      totalXp: null,
      currentRank: pack.completed.length > 0 ? 'In Progress' : 'Not Started',
      rankProgress: null,
      questsCompleted: null,
      checkpointsCompleted: null,
      testsCompleted: null,
      daysCompleted: [],
      recommendedNext: null,
      lastVisited: pack.lastVisited
        ? { id: pack.lastVisited.lessonId, index: pack.lastVisited.lessonIndex, updatedAt: pack.lastVisited.updatedAt }
        : null,
      achievements: Object.entries(pack.achievements || {}).map(([id, earnedAt]) => ({ id, earnedAt })),
      updatedAt: pack.updatedAt,
      schemaVersion: ROOT_SCHEMA_VERSION,
    };
  }

  const rankProgress = buildRankSnapshot([...completed]);
  const pathLessons = ERANK_LESSONS.concat(DRANK_LESSONS);
  const currentRank = (() => {
    if (ERANK_LESSONS.some(l => !completed.has(l.id))) return 'e';
    if (DRANK_LESSONS.some(l => l.content && !completed.has(l.id))) return 'd';
    if (rankProgress.d?.complete) return 'd';
    return 'e';
  })();
  const activeLessons = currentRank === 'd' ? DRANK_LESSONS : ERANK_LESSONS;
  const stats = {
    quests: activeLessons.filter(l => l.type === 'quest' && completed.has(l.id)).length,
    checkpoints: activeLessons.filter(l => l.type === 'checkpoint' && completed.has(l.id)).length,
    tests: activeLessons.filter(l => l.type === 'test' && completed.has(l.id)).length,
  };
  const recommended = pathLessons.find(l => !completed.has(l.id)) || null;
  const last = pack.lastVisited;
  const completedCount = activeLessons.filter(l => completed.has(l.id)).length;
  const total = activeLessons.length;

  const xp = sumXpForLessons(AVAILABLE_LESSONS, completed);

  const daysCompleted = ['e', 'd'].flatMap(rank => {
    const days = new Set(
      COURSE_LESSONS.filter(l => l.rank === rank && l.content && l.day > 0).map(l => l.day)
    );
    return [...days]
      .filter(day => {
        const lessons = getDayLessons(rank, day);
        return lessons.length > 0 && lessons.every(l => completed.has(l.id));
      })
      .map(day => ({ rank, day }));
  });

  const rankLabel = currentRank === 'd' ? 'D-Rank' : 'E-Rank';
  let currentRankStatus = 'Not Started';
  if (rankProgress[currentRank]?.complete) currentRankStatus = `${rankLabel} Complete`;
  else if (completedCount > 0) currentRankStatus = `${rankLabel} — In Progress`;

  return {
    hasProgress: completedCount > 0 || last !== null || Object.keys(steps).length > 0,
    packId,
    packTitle: PACK_REGISTRY[packId]?.shortTitle || packId,
    completedCount,
    totalLessons: total,
    completionPercent: total ? Math.round((completedCount / total) * 100) : 0,
    totalXp: xp,
    currentRank: currentRankStatus,
    rankProgress,
    questsCompleted: stats.quests,
    checkpointsCompleted: stats.checkpoints,
    testsCompleted: stats.tests,
    daysCompleted,
    recommendedNext: recommended
      ? { id: recommended.id, title: recommended.title, icon: recommended.icon, type: recommended.type }
      : null,
    lastVisited: last
      ? {
          id: last.lessonId,
          index: last.lessonIndex,
          title: COURSE_LESSONS[last.lessonIndex]?.title || last.lessonId,
          icon: COURSE_LESSONS[last.lessonIndex]?.icon || '📄',
          updatedAt: last.updatedAt,
        }
      : null,
    achievements: Object.entries(pack.achievements).map(([id, earnedAt]) => ({
      id,
      earnedAt,
      ...(ACHIEVEMENT_DEFS[id] || { title: id, icon: '🏅' }),
    })),
    updatedAt: pack.updatedAt,
    schemaVersion: ROOT_SCHEMA_VERSION,
  };
}

/** Cross-pack overview for landing / dashboard (future multi-pack UI) */
export function getAllPacksOverview() {
  const root = getRootStore();
  return Object.values(PACK_REGISTRY).map(meta => {
    const pack = root.packs[meta.id];
    const hasData = pack && (pack.completed?.length > 0 || pack.lastVisited);
    return {
      ...meta,
      hasProgress: !!hasData,
      completedCount: pack?.completed?.length ?? 0,
      updatedAt: pack?.updatedAt ?? null,
      lastVisitedLessonId: pack?.lastVisited?.lessonId ?? null,
    };
  });
}

export function getContinueUrl(packId = PACK_ID) {
  const summary = getProgressSummary(packId);
  const readerBase = PACK_REGISTRY[packId]?.readerUrl || './course-reader.html';
  if (summary.lastVisited?.id) {
    return `${readerBase}#${summary.lastVisited.id}`;
  }
  if (summary.recommendedNext?.id) {
    return `${readerBase}#${summary.recommendedNext.id}`;
  }
  return readerBase;
}

export function clearPackProgress(packId = PACK_ID) {
  if (!rootStore) loadProgress();
  rootStore.packs[packId] = createEmptyPackProgress(packId);
  if (packId === activePackId) {
    syncFromPack(rootStore.packs[packId]);
  }
  writeRootStore(rootStore);
}

export function clearAllProgress() {
  rootStore = readRootStore();
  Object.keys(rootStore.packs).forEach(id => {
    rootStore.packs[id] = createEmptyPackProgress(id);
  });
  syncFromPack(getPackProgress(rootStore, activePackId));
  writeRootStore(rootStore);
}
