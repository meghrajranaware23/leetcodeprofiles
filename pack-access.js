/* ══════════════════════════════════════════════════════════
   PACK ACCESS — Preview rules & lesson access state
   ══════════════════════════════════════════════════════════ */

import { PACK_IDS } from './progress-store.js';
import { hasPackAccess, normalizePackId } from './auth/entitlements-service.js';

/** @typedef {'unlocked' | 'premium-locked' | 'coming-soon'} LessonAccessState */

export const PREVIEW_UNLOCK_RULES = Object.freeze([
  { rank: 'intro', days: 'all' },
  { rank: 'e', days: [1, 2] },
  { rank: 'c', days: [1, 2] },
]);

/**
 * Build rank → (globalDay → relativeDay) index from lesson list.
 * Relative day is 1-based within each rank.
 * @param {Array<{ rank?: string, day?: number }>} lessons
 * @returns {Map<string, Map<number, number>>}
 */
export function buildRankDayIndex(lessons) {
  const byRank = new Map();

  for (const lesson of lessons) {
    const rank = lesson.rank || 'intro';
    const day = lesson.day ?? 0;
    if (day <= 0) continue;
    if (!byRank.has(rank)) byRank.set(rank, new Set());
    byRank.get(rank).add(day);
  }

  const index = new Map();
  for (const [rank, days] of byRank) {
    const sorted = [...days].sort((a, b) => a - b);
    const dayMap = new Map();
    sorted.forEach((globalDay, i) => dayMap.set(globalDay, i + 1));
    index.set(rank, dayMap);
  }
  return index;
}

function getRelativeDay(lesson, rankDayIndex) {
  const rank = lesson.rank || 'intro';
  const globalDay = lesson.day ?? 0;
  if (globalDay <= 0) return 0;
  return rankDayIndex.get(rank)?.get(globalDay) ?? 0;
}

function isPreviewLesson(lesson, rankDayIndex) {
  const rank = lesson.rank || 'intro';
  const rule = PREVIEW_UNLOCK_RULES.find(r => r.rank === rank);
  if (!rule) return false;
  if (rule.days === 'all') return true;

  const relativeDay = getRelativeDay(lesson, rankDayIndex);
  if (relativeDay <= 0) return rank === 'intro';
  return Array.isArray(rule.days) && rule.days.includes(relativeDay);
}

/**
 * @param {object} lesson
 * @param {{
 *   packId: string,
 *   isRankShipped: (rank: string) => boolean,
 *   hasPackAccess?: boolean,
 *   rankDayIndex: Map<string, Map<number, number>>,
 * }} ctx
 * @returns {LessonAccessState}
 */
export function getLessonAccessState(lesson, ctx) {
  const packId = normalizePackId(ctx.packId);

  if (packId === PACK_IDS.STARTER) return 'unlocked';

  const rank = lesson.rank || 'intro';
  const entitled = ctx.hasPackAccess ?? hasPackAccess(packId);

  if (!lesson.content) return 'coming-soon';
  if (!ctx.isRankShipped(rank)) return 'coming-soon';

  if (entitled) return 'unlocked';
  if (isPreviewLesson(lesson, ctx.rankDayIndex)) return 'unlocked';
  return 'premium-locked';
}

/** @returns {boolean} User can view full lesson content */
export function isLessonViewable(lesson, ctx) {
  return getLessonAccessState(lesson, ctx) === 'unlocked';
}

/** @returns {boolean} User can navigate to lesson (content or premium gate) */
export function isLessonNavigable(lesson, ctx) {
  const state = getLessonAccessState(lesson, ctx);
  return state === 'unlocked' || state === 'premium-locked';
}

/**
 * Sidebar lock visuals for a lesson item.
 * @param {object} lesson
 * @param {object} ctx
 * @param {boolean} isRankLocked — rank not yet shipped
 */
export function getLessonSidebarMeta(lesson, ctx, isRankLocked) {
  const state = getLessonAccessState(lesson, ctx);
  const comingSoon = isRankLocked || !lesson.content;
  const premiumLocked = !comingSoon && state === 'premium-locked';

  let title = '';
  if (comingSoon) title = 'Coming soon';
  else if (premiumLocked) title = 'Premium — unlock to access';

  const icon = comingSoon || premiumLocked ? '🔒' : (lesson.icon || '📄');

  let lockClass = '';
  if (comingSoon) lockClass = 'coming-soon';
  else if (premiumLocked) lockClass = 'premium-locked';

  return { comingSoon, premiumLocked, title, icon, lockClass, state };
}

/**
 * Sidebar lock visuals for a day group header.
 * Shows lock when any lesson in the day is locked.
 * @param {Array<{ lesson: object }>} dayItems
 * @param {object} ctx
 * @param {boolean} isRankLocked
 */
export function getDaySidebarMeta(dayItems, ctx, isRankLocked) {
  let hasPremiumLocked = false;
  let hasComingSoon = false;

  for (const { lesson } of dayItems) {
    const { lockClass } = getLessonSidebarMeta(lesson, ctx, isRankLocked);
    if (lockClass === 'premium-locked') hasPremiumLocked = true;
    if (lockClass === 'coming-soon') hasComingSoon = true;
  }

  const showLock = hasPremiumLocked || hasComingSoon;
  const lockClass = hasPremiumLocked ? 'premium-locked' : hasComingSoon ? 'coming-soon' : '';

  return { showLock, lockClass };
}
