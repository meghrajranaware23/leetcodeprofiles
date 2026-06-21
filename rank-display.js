/** Shared rank label / CSS class helpers for pack cards and continue banners. */

export const RANK_COLORS = Object.freeze({
  e: '#666666',
  d: '#4A9EFF',
  c: '#4AFF9E',
  b: '#FFD700',
  a: '#FF6B35',
  s: '#E50000',
  p1: '#4A9EFF',
  p2: '#4AFF9E',
  p3: '#FFD700',
  none: '#888888',
});

const RANK_LETTER_RE = /\b([EDCBAS])-Rank\b/i;
const PHASE_RE = /Phase\s*(\d)/i;

/**
 * Derive a short rank key from a progress summary's currentRank string.
 * @returns {'e'|'d'|'c'|'b'|'a'|'s'|'p1'|'p2'|'p3'|'none'}
 */
export function getRankKeyFromStatus(currentRank) {
  if (!currentRank || currentRank === 'Not Started') return 'none';
  if (currentRank === 'In Progress') return 'none';

  const letter = currentRank.match(RANK_LETTER_RE);
  if (letter) return letter[1].toLowerCase();

  const phase = currentRank.match(PHASE_RE);
  if (phase) return `p${phase[1]}`;

  if (/introduction/i.test(currentRank)) return 'p1';
  return 'none';
}

/**
 * Short pill label for pack cards, e.g. "D Rank", "Phase 2", "Not Started".
 */
export function getRankPillLabel(currentRank) {
  if (!currentRank || currentRank === 'Not Started') return 'Not Started';
  if (currentRank === 'In Progress') return 'In Progress';

  const key = getRankKeyFromStatus(currentRank);
  if (key === 'none') {
    if (/complete/i.test(currentRank)) {
      const letter = currentRank.match(RANK_LETTER_RE);
      if (letter) return `${letter[1].toUpperCase()} Rank`;
      const phase = currentRank.match(PHASE_RE);
      if (phase) return `Phase ${phase[1]}`;
    }
    return currentRank.split('—')[0].trim().split(' ')[0] || 'In Progress';
  }

  if (key.startsWith('p')) return `Phase ${key.slice(1)}`;
  return `${key.toUpperCase()} Rank`;
}

export function getRankCssClass(currentRank) {
  const key = getRankKeyFromStatus(currentRank);
  return key === 'none' ? 'rank-none' : `rank-${key}`;
}

/** Meta line: "D Rank · 12/30 lessons · 1,240 XP" */
export function formatPackMeta(summary) {
  const parts = [];
  const rankLabel = getRankPillLabel(summary.currentRank);
  if (rankLabel && rankLabel !== 'Not Started') {
    parts.push(rankLabel);
  }
  if (summary.totalLessons != null) {
    parts.push(`${summary.completedCount}/${summary.totalLessons} lessons`);
  } else if (summary.completedCount > 0) {
    parts.push(`${summary.completedCount} lessons`);
  }
  if (summary.totalXp != null) {
    parts.push(`${summary.totalXp.toLocaleString()} XP`);
  }
  return parts.join(' · ') || 'Not started';
}

/** One-liner for profile menu, e.g. "3 packs in progress". */
export function formatProfileProgressLine(summaries) {
  const active = summaries.filter(s => s.hasProgress);
  if (active.length === 0) return 'No packs started yet';
  if (active.length === 1) {
    return `${active[0].packTitle} · ${getRankPillLabel(active[0].currentRank)}`;
  }
  return `${active.length} packs in progress`;
}

const RANK_TIER_ORDER = ['e', 'd', 'c', 'b', 'a', 's', 'p1', 'p2', 'p3'];

const HUNTER_TITLES = Object.freeze({
  s: 'S-Rank Slayer',
  a: 'A-Rank Elite',
  b: 'B-Rank Commander',
  c: 'C-Rank Warrior',
  d: 'D-Rank Ascendant',
  e: 'E-Rank Awakening',
  p3: 'Path Completer',
  p2: 'Momentum Hunter',
  p1: 'Foundation Hunter',
  none: 'Unranked Grinder',
});

export function getPeakRankKey(summaries) {
  let peak = 'none';
  let peakIndex = -1;
  summaries.forEach((summary) => {
    if (!summary.hasProgress) return;
    const key = getRankKeyFromStatus(summary.currentRank);
    const idx = RANK_TIER_ORDER.indexOf(key);
    if (idx > peakIndex) {
      peakIndex = idx;
      peak = key;
    }
  });
  return peak;
}

export function getPeakRankLabel(summaries) {
  const peak = getPeakRankKey(summaries);
  if (peak === 'none') return 'Not ranked yet';
  return getRankPillLabel(
    peak.startsWith('p') ? `Phase ${peak.slice(1)} — In Progress` : `${peak.toUpperCase()}-Rank — In Progress`
  );
}

export function getHunterTitle(summaries) {
  const peak = getPeakRankKey(summaries);
  return HUNTER_TITLES[peak] || HUNTER_TITLES.none;
}

export function getRankColor(currentRank) {
  const key = getRankKeyFromStatus(currentRank);
  return RANK_COLORS[key] || RANK_COLORS.none;
}
