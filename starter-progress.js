/* ══════════════════════════════════════════════════════════
   STARTER PROGRESS — Pack-scoped progress API
   LeetCode Starter Path · uses progress-store.js
   ══════════════════════════════════════════════════════════ */

import { COURSE_LESSONS } from './starter-content.js';
import {
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
export const PACK_ID = PACK_IDS.STARTER;
export const PROGRESS_VERSION = ROOT_SCHEMA_VERSION;

export { STORAGE_KEY, PACK_IDS, PACK_REGISTRY };

const RANK_ORDER = ['intro', 'p1', 'p2', 'p3'];

export function getLessonsForRank(rank) {
  return COURSE_LESSONS.filter(l => l.content && l.rank === rank);
}

export const P1_LESSONS = COURSE_LESSONS.filter(
  l => l.content && (l.rank === 'intro' || l.rank === 'p1')
);
export const P1_LESSON_IDS = new Set(P1_LESSONS.map(l => l.id));

export const P2_LESSONS = COURSE_LESSONS.filter(
  l => l.content && l.rank === 'p2'
);
export const P2_LESSON_IDS = new Set(P2_LESSONS.map(l => l.id));

export const P3_LESSONS = COURSE_LESSONS.filter(
  l => l.content && l.rank === 'p3'
);
export const P3_LESSON_IDS = new Set(P3_LESSONS.map(l => l.id));

/** Lessons with live content on the learning path */
export const AVAILABLE_LESSONS = COURSE_LESSONS.filter(
  l => l.content && (l.rank === 'intro' || l.rank === 'p1' || l.rank === 'p2' || l.rank === 'p3')
);
export const AVAILABLE_LESSON_IDS = new Set(AVAILABLE_LESSONS.map(l => l.id));

export const LESSON_STEPS = {
  intro: [
    { id: 'read_briefing', label: 'Read the welcome briefing', kind: 'confirm' },
  ],
  concept: [
    { id: 'read_lesson', label: 'Read the mentor guide', kind: 'confirm' },
    { id: 'understand', label: "I've got this workflow", kind: 'confirm', requires: ['read_lesson'] },
  ],
  quest: [
    { id: 'read_mission', label: 'Read the problem on LeetCode', kind: 'confirm' },
    { id: 'attempt', label: 'Attempt the problem (5 min)', kind: 'attempt', hint: 'Solve on LeetCode or in your editor before revealing hints.' },
    { id: 'review_solution', label: 'Review the solution walkthrough', kind: 'reveal', requires: ['attempt'] },
  ],
  checkpoint: [
    { id: 'reflection', label: 'Complete reflection prompts', kind: 'confirm' },
    { id: 'habit', label: 'Log habit action', kind: 'confirm' },
    { id: 'mistakes', label: 'Review mistake mirror', kind: 'confirm' },
  ],
  test: [
    { id: 'read_problem', label: 'Open & read the problem on LeetCode', kind: 'confirm' },
    { id: 'attempt', label: 'Attempt for 10 minutes', kind: 'attempt', hint: 'This is a phase proof — give it a real try on LeetCode before revealing.' },
    { id: 'review_solution', label: 'Reveal solution walkthrough', kind: 'reveal', requires: ['attempt'] },
  ],
  complete: [
    { id: 'view_journey', label: 'Review your phase journey', kind: 'confirm' },
  ],
};

const ACHIEVEMENT_DEFS = {
  'briefing-complete': { title: 'First Step Taken', icon: '🚀' },
  'first-guide': { title: 'Playbook Opened', icon: '📖' },
  'first-quest': { title: 'First Blood', icon: '⚔' },
  'first-checkpoint': { title: 'Day One Done', icon: '✅' },
  'first-test': { title: 'Phase Proof Cleared', icon: '🎯' },
  'paper-first': { title: 'Paper Before Code', icon: '📝' },
  'phase-1-complete': { title: 'Phase 1: Apprentice', icon: '🏅' },
  'debug-detective': { title: 'Debug Detective', icon: '🔍' },
  'editorial-learner': { title: 'Editorial Scholar', icon: '📚' },
  'phase-2-complete': { title: 'Phase 2: Practitioner', icon: '🏆' },
  'streak-starter': { title: 'Streak Starter', icon: '🔥' },
  'phase-3-complete': { title: 'Phase 3: Independent', icon: '⭐' },
  'starter-graduate': { title: 'Starter Graduate', icon: '🎓' },
};

/* ─── In-memory state: root store + active pack slice ─── */
let rootStore = null;
let activePackId = PACK_ID;
let progressData = null;
export let completedSet = new Set();
export let stepProgress = {};

function isP1Complete(completed) {
  const p1Lessons = COURSE_LESSONS.filter(l => l.rank === 'p1' && l.content);
  return p1Lessons.length > 0 && p1Lessons.every(l => completed.has(l.id));
}

export function isP2Unlocked() {
  return P2_LESSONS.length > 0;
}

export function isP3Unlocked() {
  return P3_LESSONS.length > 0;
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
      unlocked: rank === 'intro' || rank === 'p1' || rank === 'p2' || rank === 'p3' || done > 0,
    };
  });
  ranks.p1.unlocked = true;
  ranks.intro.unlocked = true;
  if (P2_LESSONS.length > 0) ranks.p2.unlocked = true;
  if (P3_LESSONS.length > 0) ranks.p3.unlocked = true;
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
  const path = [...P1_LESSONS];
  if (isP2Unlocked()) path.push(...P2_LESSONS);
  if (isP3Unlocked()) path.push(...P3_LESSONS);
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
  const p1Incomplete = P1_LESSONS.some(l => !completedSet.has(l.id));
  if (p1Incomplete) return P1_LESSONS;
  const p2Incomplete = P2_LESSONS.some(l => !completedSet.has(l.id));
  if (p2Incomplete) return P2_LESSONS;
  if (isP3Unlocked()) return P3_LESSONS;
  return P2_LESSONS.length > 0 ? P2_LESSONS : P1_LESSONS;
}

export function getCurrentRankLabel() {
  const lessons = getCurrentRankLessons();
  const rank = lessons[0]?.rank;
  if (rank === 'p3') return 'Phase 3';
  if (rank === 'p2') return 'Phase 2';
  if (rank === 'p1') return 'Phase 1';
  return 'Introduction';
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

export function getCompletedDays(rank = 'p1') {
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
    recordAchievement('first-guide');
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
  if (lesson.type === 'complete' && lesson.id === 'phase-1-complete') {
    recordAchievement('phase-1-complete');
  }
  if (lesson.type === 'complete' && lesson.id === 'phase-2-complete') {
    recordAchievement('phase-2-complete');
  }
  if (lesson.type === 'complete' && lesson.id === 'course-complete') {
    recordAchievement('phase-3-complete');
    recordAchievement('starter-graduate');
  }
  if (lesson.id === '5-1') recordAchievement('paper-first');
  if (lesson.id === '7-4') recordAchievement('debug-detective');
  if (lesson.id === '8-3') recordAchievement('editorial-learner');
  if (lesson.id === '13-4') recordAchievement('streak-starter');
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

/** Summary for a single pack (defaults to active DP pack) */
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
  const pathLessons = P1_LESSONS.concat(P2_LESSONS, P3_LESSONS);
  const currentRank = (() => {
    if (P1_LESSONS.some(l => !completed.has(l.id))) return 'p1';
    if (P2_LESSONS.some(l => l.content && !completed.has(l.id))) return 'p2';
    if (P3_LESSONS.some(l => l.content && !completed.has(l.id))) return 'p3';
    if (rankProgress.p3?.complete) return 'p3';
    if (rankProgress.p2?.complete) return 'p2';
    if (rankProgress.p1?.complete) return 'p1';
    return 'p1';
  })();
  const activeLessons = currentRank === 'p3'
    ? P3_LESSONS
    : currentRank === 'p2'
      ? P2_LESSONS
      : P1_LESSONS;
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

  const daysCompleted = ['p1', 'p2', 'p3'].flatMap(rank => {
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

  const rankLabel = currentRank === 'p3'
    ? 'Phase 3'
    : currentRank === 'p2'
      ? 'Phase 2'
      : currentRank === 'p1'
        ? 'Phase 1'
        : 'Introduction';
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
