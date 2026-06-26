/* ══════════════════════════════════════════════════════════
   STARTER READER — JavaScript Module
   LeetCode Starter Path · Mentor-Guided Onboarding
   ══════════════════════════════════════════════════════════ */

import { COURSE_LESSONS } from './starter-content.js';
import { createDiagramEnhancer, compactCompleteLabel } from './reader-diagrams.js';
import { initReaderNav } from './reader-nav.js';
import { guardPage, hideAuthLoader } from './auth/auth-guard.js';
import {
  activateMilestoneDialog,
  deactivateMilestoneDialog,
  initMilestoneDialog,
  isMilestoneOpen,
} from './reader-ui.js';
import {
  P1_LESSONS,
  P2_LESSONS,
  P3_LESSONS,
  AVAILABLE_LESSON_IDS,
  isP2Unlocked,
  isP3Unlocked,
  getCurrentRankLabel,
  completedSet,
  loadProgress,
  saveProgress,
  migrateLegacyProgress,
  setLastVisited,
  getLastVisited,
  getLastVisitedIndex,
  getLessonSteps,
  isStepDone,
  setStepDone,
  areAllStepsDone,
  getStepProgressCount,
  getRecommendedNext,
  getRecommendedNextIndex,
  getDayLessons,
  getDayProgress,
  getTotalXP,
  getCompletedCount,
  getQuestStats,
  recordLessonAchievements,
  markMilestoneShown,
} from './starter-progress.js';

/* ─── Constants ─── */
const LANG_TAB_PREF_KEY = 'ascension-lang-pref';
const SIDEBAR_STATE_KEY = 'ascension-sidebar-state';
const SIDEBAR_STATE_VERSION = 2;

const MILESTONE_COPY = {
  quest: { icon: '⚔️', label: 'QUEST CLEARED', title: 'Quest Complete!', msg: 'You solved it the mentor\'s way — attempt first, then learn.' },
  checkpoint: { icon: '✅', label: 'DAY COMPLETE', title: 'Checkpoint Passed!', msg: 'Day mastered. Pattern signals locked in. Onward to the next mission.' },
  test: { icon: '🎯', label: 'TEST CLEARED', title: 'Test Problem Conquered!', msg: 'Your foundation holds. One step closer to rank-up.' },
  complete: { icon: '🏆', label: 'RANK UP', title: 'Rank Ascension Confirmed!', msg: 'You\'ve proven mastery. The next rank awaits.' },
  concept: { icon: '📝', label: 'LESSON COMPLETE', title: 'Pattern Learned!', msg: 'Mental model acquired. Time to put it to the test.' },
  intro: { icon: '⚔️', label: 'BRIEFING COMPLETE', title: 'Ready to Ascend!', msg: 'Your journey begins. Complete each quest in order.' },
};

const RANK_META = {
  intro:  { label: '🏠 WELCOME',              color: '#888888', order: 0 },
  p1:     { label: '🔵 PHASE 1 — APPRENTICE', color: '#4A9EFF', order: 1 },
  p2:     { label: '🟢 PHASE 2 — PRACTITIONER', color: '#4AFF9E', order: 2 },
  p3:     { label: '🟡 PHASE 3 — INDEPENDENT', color: '#FFD700', order: 3 },
};

/* ─── DOM Refs ─── */
const $ = (id) => document.getElementById(id);
const sidebarNav     = $('sidebarNav');
const contentEl      = $('content');
const prevBtn        = $('prevBtn');
const nextBtn        = $('nextBtn');
const markCompleteBtn = $('markCompleteBtn');
const progressText   = $('progressText');
const progressFill   = $('progressFill');
const xpBadge        = $('xpBadge');
const xpValue        = $('xpValue');
const sidebar        = $('sidebar');
const sidebarToggle  = $('sidebarToggle');
const sidebarOverlay = $('sidebarOverlay');
const loadingIndicator = $('loadingIndicator');
const milestoneOverlay = $('milestoneOverlay');
const milestoneIcon = $('milestoneIcon');
const milestoneLabel = $('milestoneLabel');
const milestoneTitle = $('milestoneTitle');
const milestoneMsg = $('milestoneMsg');
const milestoneXp = $('milestoneXp');
const milestoneBtn = $('milestoneBtn');

/* ─── State ─── */
let currentLessonIndex = 0;
let expandedRanks = new Set();
let expandedDays = new Set();
let preferredLang = localStorage.getItem(LANG_TAB_PREF_KEY) || 'cpp';
let scrollObserver = null;
let attemptTimerInterval = null;
let attemptStartTime = null;

const diagramEnhancer = createDiagramEnhancer('starter');
diagramEnhancer.bindContent(contentEl);

/* ─── Init ─── */
function init() {
  document.body.dataset.pack = 'starter';
  initReaderNav('leetcode-starter');
  loadProgress();
  migrateLegacyProgress();
  const hadSavedSidebar = initSidebarState();
  configureMarked();

  const hash = window.location.hash.replace('#', '');
  const restoredFromSave = !hash && !!getLastVisited();
  if (hash) {
    const idx = COURSE_LESSONS.findIndex(l => l.id === hash);
    if (idx !== -1 && isLessonAccessible(COURSE_LESSONS[idx])) {
      currentLessonIndex = idx;
    }
  } else {
    currentLessonIndex = getLastVisitedIndex(0);
  }

  if (!hadSavedSidebar) {
    primeInitialDayExpansion(currentLessonIndex);
  }

  buildSidebar();
  bindEvents();
  loadLesson(currentLessonIndex);

  if (restoredFromSave) {
    requestAnimationFrame(() => {
      const lesson = COURSE_LESSONS[currentLessonIndex];
      if (lesson) showToast(`Welcome back — resuming "${lesson.title}"`);
    });
  }
}

function isLessonAccessible(lesson) {
  if (!lesson.content) return false;
  if (AVAILABLE_LESSON_IDS.has(lesson.id)) return true;
  return getUnlockedRanks().has(lesson.rank);
}


/* ═══════════════════════════════════════
   MARKED.JS CONFIGURATION
   ═══════════════════════════════════════ */
function configureMarked() {
  marked.setOptions({
    gfm: true,
    breaks: false,
    highlight: function(code, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(code, { language: lang }).value;
        } catch {}
      }
      try {
        return hljs.highlightAuto(code).value;
      } catch {}
      return code;
    },
  });
}


/* ═══════════════════════════════════════
   SIDEBAR EXPAND / COLLAPSE STATE
   ═══════════════════════════════════════ */
function getDayGroupId(rank, dayKey) {
  return `day-${rank}-${dayKey}`;
}

function formatDaySidebarLabel(dayKey, dayTitle) {
  if (!dayTitle) return '';
  if (dayKey > 0) return `Day ${dayKey} — ${dayTitle}`;
  return dayTitle;
}

function dayGroupContainsLessonIndex(dayId, lessonIndex) {
  const group = sidebarNav.querySelector(`.cr-day-group[data-day-id="${dayId}"]`);
  if (!group) return false;
  return !!group.querySelector(`.cr-lesson-item[data-index="${lessonIndex}"]`);
}

function loadSidebarState() {
  try {
    const raw = sessionStorage.getItem(SIDEBAR_STATE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || parsed.version < SIDEBAR_STATE_VERSION) return null;
    return {
      expandedRanks: Array.isArray(parsed.expandedRanks) ? parsed.expandedRanks : [],
      expandedDays: Array.isArray(parsed.expandedDays) ? parsed.expandedDays : [],
    };
  } catch {
    return null;
  }
}

function saveSidebarState() {
  try {
    sessionStorage.setItem(SIDEBAR_STATE_KEY, JSON.stringify({
      version: SIDEBAR_STATE_VERSION,
      expandedRanks: [...expandedRanks],
      expandedDays: [...expandedDays],
    }));
  } catch {}
}

function initSidebarState() {
  const saved = loadSidebarState();
  if (saved) {
    expandedRanks = new Set(saved.expandedRanks);
    expandedDays = new Set(saved.expandedDays);
    return true;
  }

  expandedRanks = new Set(['intro', 'e', 'd', 'c', 'b', 'a', 's']);
  expandedDays = new Set();
  return false;
}

function primeInitialDayExpansion(lessonIndex) {
  const lesson = COURSE_LESSONS[lessonIndex];
  if (!lesson?.dayTitle) return;
  expandedDays.add(getDayGroupId(lesson.rank, lesson.day));
  saveSidebarState();
}

function isDayExpanded(dayId) {
  return expandedDays.has(dayId);
}

function syncDayDom(dayId) {
  const dayGroup = sidebarNav.querySelector(`.cr-day-group[data-day-id="${dayId}"]`);
  if (!dayGroup) return;

  const expanded = expandedDays.has(dayId);
  const hasActive = dayGroupContainsLessonIndex(dayId, currentLessonIndex);

  dayGroup.classList.toggle('expanded', expanded);
  dayGroup.classList.toggle('has-active-lesson', hasActive);

  const dayHeader = dayGroup.querySelector('.cr-day-header');
  const dayLessons = dayGroup.querySelector('.cr-day-lessons');
  if (dayHeader) {
    dayHeader.classList.toggle('expanded', expanded);
    dayHeader.classList.toggle('has-active-lesson', hasActive);
    dayHeader.setAttribute('aria-expanded', expanded ? 'true' : 'false');
  }
  if (dayLessons) {
    dayLessons.classList.toggle('expanded', expanded);
  }
}

function syncRankDom(rank) {
  const expanded = expandedRanks.has(rank);
  const header = sidebarNav.querySelector(`.cr-rank-header[data-rank="${rank}"]`);
  const list = sidebarNav.querySelector(`.cr-lesson-list[data-rank="${rank}"]`);
  if (header) {
    header.classList.toggle('expanded', expanded);
    header.setAttribute('aria-expanded', expanded ? 'true' : 'false');
  }
  if (list) list.classList.toggle('expanded', expanded);
}

function applySidebarExpandState() {
  sidebarNav.querySelectorAll('.cr-rank-header').forEach(header => {
    syncRankDom(header.dataset.rank);
  });
  sidebarNav.querySelectorAll('.cr-day-group').forEach(group => {
    syncDayDom(group.dataset.dayId);
  });
}

function expandDay(dayId, { persist = true } = {}) {
  expandedDays.add(dayId);
  const rank = dayId.match(/^day-([^-]+)-/)?.[1];
  if (rank) expandRank(rank, { persist: false });
  syncDayDom(dayId);
  if (persist) saveSidebarState();
}

function collapseDay(dayId, { persist = true } = {}) {
  expandedDays.delete(dayId);
  syncDayDom(dayId);
  if (persist) saveSidebarState();
}

function toggleDay(dayId) {
  if (expandedDays.has(dayId)) collapseDay(dayId);
  else expandDay(dayId);
}

function syncAllDayActiveMarkers() {
  sidebarNav.querySelectorAll('.cr-day-group').forEach(group => {
    syncDayDom(group.dataset.dayId);
  });
}


/* ═══════════════════════════════════════
   SIDEBAR CONSTRUCTION
   ═══════════════════════════════════════ */
function buildSidebar() {
  const groups = new Map();
  COURSE_LESSONS.forEach((lesson, idx) => {
    const rank = lesson.rank || 'intro';
    if (!groups.has(rank)) groups.set(rank, []);
    groups.get(rank).push({ lesson, idx });
  });

  const sortedRanks = [...groups.keys()].sort(
    (a, b) => (RANK_META[a]?.order ?? 99) - (RANK_META[b]?.order ?? 99)
  );

  const unlockedRanks = getUnlockedRanks();

  let html = buildSidebarRecommendedCard();
  sortedRanks.forEach(rank => {
    const meta = RANK_META[rank] || { label: rank.toUpperCase(), color: '#888', order: 99 };
    const items = groups.get(rank);
    const isExpanded = expandedRanks.has(rank);
    const isLocked = !unlockedRanks.has(rank);
    const rankProgress = (rank === 'p1' || rank === 'intro' || rank === 'p2' || rank === 'p3')
      ? (() => {
          const rankLessons = items.map(i => i.lesson).filter(l => l.content);
          const done = rankLessons.filter(l => completedSet.has(l.id)).length;
          return rankLessons.length ? { done, total: rankLessons.length } : null;
        })()
      : null;
    const rankProgressHtml = rankProgress
      ? `<span class="cr-rank-progress">${rankProgress.done}/${rankProgress.total}</span>`
      : '';

    html += `
      <div class="cr-rank-group" data-rank="${rank}">
        <div class="cr-rank-header ${isExpanded ? 'expanded' : ''}"
             data-rank="${rank}"
             role="button"
             tabindex="0"
             aria-expanded="${isExpanded ? 'true' : 'false'}"
             style="border-left-color: ${meta.color}">
          <div class="cr-rank-header-left">
            <span class="cr-rank-dot" style="background: ${meta.color}"></span>
            <span class="cr-rank-title" style="color: ${meta.color}">${meta.label}</span>
            ${rankProgressHtml}
            ${isLocked ? '<span class="cr-rank-badge locked">🔒</span>' : ''}
          </div>
          <svg class="cr-rank-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </div>
        <div class="cr-lesson-list ${isExpanded ? 'expanded' : ''}" data-rank="${rank}">
    `;

    const dayGroups = new Map();
    items.forEach(item => {
      const dayKey = item.lesson.day;
      if (!dayGroups.has(dayKey)) dayGroups.set(dayKey, []);
      dayGroups.get(dayKey).push(item);
    });

    dayGroups.forEach((dayItems, dayKey) => {
      const firstLesson = dayItems[0].lesson;
      const dayTitle = firstLesson.dayTitle;
      const hasMultiple = dayItems.length > 1;

      if (hasMultiple && dayTitle) {
        const dayId = getDayGroupId(rank, dayKey);
        const dayExpanded = isDayExpanded(dayId);
        const dayLabel = formatDaySidebarLabel(dayKey, dayTitle);
        const dayCompleted = dayItems.every(({ lesson }) => completedSet.has(lesson.id));
        const dayProgress = dayItems.filter(({ lesson }) => completedSet.has(lesson.id)).length;
        const hasActiveLesson = dayItems.some(({ idx }) => idx === currentLessonIndex);
        const indicatorLabel = dayCompleted ? '✓' : dayProgress > 0 ? `${dayProgress}/${dayItems.length}` : '○';

        html += `
          <div class="cr-day-group ${dayExpanded ? 'expanded' : ''} ${hasActiveLesson ? 'has-active-lesson' : ''}" data-day-id="${dayId}">
            <button type="button" class="cr-day-header ${dayExpanded ? 'expanded' : ''} ${hasActiveLesson ? 'has-active-lesson' : ''}" data-day-id="${dayId}" aria-expanded="${dayExpanded ? 'true' : 'false'}" aria-controls="${dayId}-lessons">
              <span class="cr-day-indicator ${dayCompleted ? 'completed' : (dayProgress > 0 ? 'in-progress' : '')}" aria-hidden="true">${indicatorLabel}</span>
              <span class="cr-day-title">${dayLabel}</span>
              <svg class="cr-day-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>
            <div class="cr-day-lessons ${dayExpanded ? 'expanded' : ''}" id="${dayId}-lessons">
        `;

        dayItems.forEach(({ lesson, idx }) => {
          const isCompleted = completedSet.has(lesson.id);
          const isActive = idx === currentLessonIndex;
          const lessonLocked = isLocked || !lesson.content;
          const isRecommended = getRecommendedNext()?.id === lesson.id;
          const stepCount = getStepProgressCount(lesson);
          const stepBadge = !isCompleted && stepCount.done > 0
            ? `<span class="cr-lesson-steps">${stepCount.done}/${stepCount.total}</span>`
            : '';

          let classes = 'cr-lesson-item cr-lesson-sub';
          if (isActive) classes += ' active';
          if (isCompleted) classes += ' completed';
          if (isRecommended) classes += ' recommended';
          if (lessonLocked) classes += ' locked';

          html += `
            <div class="${classes}" data-index="${idx}" data-id="${lesson.id}" title="${lessonLocked ? 'Coming soon' : ''}">
              <span class="cr-lesson-icon">${lessonLocked ? '🔒' : (lesson.icon || '📄')}</span>
              <span class="cr-lesson-title">${lesson.title}</span>
              ${isRecommended ? '<span class="cr-lesson-rec-badge">NEXT</span>' : ''}
              ${stepBadge}
              <span class="cr-lesson-check">✓</span>
            </div>
          `;
        });

        html += '</div></div>';
      } else {
        dayItems.forEach(({ lesson, idx }) => {
          const isCompleted = completedSet.has(lesson.id);
          const isActive = idx === currentLessonIndex;
          const lessonLocked = isLocked || !lesson.content;
          const isRecommended = getRecommendedNext()?.id === lesson.id;
          const stepCount = getStepProgressCount(lesson);
          const stepBadge = !isCompleted && stepCount.done > 0
            ? `<span class="cr-lesson-steps">${stepCount.done}/${stepCount.total}</span>`
            : '';

          let classes = 'cr-lesson-item';
          if (isActive) classes += ' active';
          if (isCompleted) classes += ' completed';
          if (isRecommended) classes += ' recommended';
          if (lessonLocked) classes += ' locked';

          html += `
            <div class="${classes}" data-index="${idx}" data-id="${lesson.id}" title="${lessonLocked ? 'Coming soon' : ''}">
              <span class="cr-lesson-icon">${lessonLocked ? '🔒' : (lesson.icon || '📄')}</span>
              <span class="cr-lesson-title">${lesson.title}</span>
              ${isRecommended ? '<span class="cr-lesson-rec-badge">NEXT</span>' : ''}
              ${stepBadge}
              <span class="cr-lesson-check">✓</span>
            </div>
          `;
        });
      }
    });

    html += '</div></div>';
  });

  sidebarNav.innerHTML = html;
  applySidebarExpandState();
}

function getLatestCompleteLesson() {
  const allP3Done = P3_LESSONS.length > 0 && P3_LESSONS.every(l => completedSet.has(l.id));
  const allP2Done = P2_LESSONS.length > 0 && P2_LESSONS.every(l => completedSet.has(l.id));
  if (allP3Done) return P3_LESSONS.find(l => l.type === 'complete');
  if (allP2Done) return P2_LESSONS.find(l => l.type === 'complete');
  return P1_LESSONS.find(l => l.type === 'complete');
}

function getRankLabelForLesson(lesson) {
  if (lesson?.rank === 'p3') return 'Phase 3';
  if (lesson?.rank === 'p2') return 'Phase 2';
  if (lesson?.rank === 'p1') return 'Phase 1';
  return 'Welcome';
}

function buildSidebarRecommendedCard() {
  const recommended = getRecommendedNext();
  if (!recommended) {
    const completeLesson = getLatestCompleteLesson();
    if (!completeLesson) return '';
    const idx = COURSE_LESSONS.findIndex(l => l.id === completeLesson.id);
    const onComplete = COURSE_LESSONS[currentLessonIndex]?.id === completeLesson.id;
    const rankLabel = getRankLabelForLesson(completeLesson);
    if (onComplete) {
      return `
        <div class="cr-sidebar-rec cr-sidebar-rec-done">
          <span class="cr-sidebar-rec-label">${rankLabel}</span>
          <span class="cr-sidebar-rec-title">🏆 ${rankLabel} Complete</span>
        </div>
      `;
    }
    return `
      <button class="cr-sidebar-rec cr-sidebar-rec-done" data-index="${idx}" type="button">
        <span class="cr-sidebar-rec-label">${rankLabel} Complete</span>
        <span class="cr-sidebar-rec-title">🏆 Review Your Journey</span>
      </button>
    `;
  }

  const idx = COURSE_LESSONS.findIndex(l => l.id === recommended.id);
  const onPath = COURSE_LESSONS[currentLessonIndex]?.id === recommended.id;
  const { done, total } = getStepProgressCount(recommended);

  if (onPath) {
    return `
      <div class="cr-sidebar-rec on-path">
        <span class="cr-sidebar-rec-label">Recommended Path</span>
        <span class="cr-sidebar-rec-title">${recommended.icon} ${recommended.title}</span>
        <span class="cr-sidebar-rec-sub">${done}/${total} objectives · keep going</span>
      </div>
    `;
  }

  return `
    <button class="cr-sidebar-rec" data-index="${idx}" type="button">
      <span class="cr-sidebar-rec-label">Recommended Next</span>
      <span class="cr-sidebar-rec-title">${recommended.icon} ${recommended.title}</span>
      <span class="cr-sidebar-rec-sub">Continue the intended path →</span>
    </button>
  `;
}

function updateSidebarRecommended() {
  const existing = sidebarNav.querySelector('.cr-sidebar-rec');
  const card = document.createElement('div');
  card.innerHTML = buildSidebarRecommendedCard();
  const newCard = card.firstElementChild;
  if (!newCard) {
    existing?.remove();
    return;
  }
  if (existing) {
    existing.replaceWith(newCard);
  } else {
    sidebarNav.prepend(newCard);
  }

  sidebarNav.querySelectorAll('.cr-lesson-item').forEach(el => {
    const id = el.dataset.id;
    const isRecommended = getRecommendedNext()?.id === id;
    el.classList.toggle('recommended', isRecommended);
    let badge = el.querySelector('.cr-lesson-rec-badge');
    if (isRecommended) {
      if (!badge) {
        badge = document.createElement('span');
        badge.className = 'cr-lesson-rec-badge';
        badge.textContent = 'NEXT';
        el.querySelector('.cr-lesson-check')?.before(badge);
      }
    } else if (badge) {
      badge.remove();
    }
  });
}

function getUnlockedRanks() {
  const unlocked = new Set(['intro', 'p1']);
  if (isP2Unlocked()) unlocked.add('p2');
  if (isP3Unlocked()) unlocked.add('p3');
  return unlocked;
}

function updateSidebarActive() {
  sidebarNav.querySelectorAll('.cr-lesson-item.active').forEach(el => {
    el.classList.remove('active');
  });

  const activeItem = sidebarNav.querySelector(`.cr-lesson-item[data-index="${currentLessonIndex}"]`);
  if (activeItem) {
    activeItem.classList.add('active');

    const rankGroup = activeItem.closest('.cr-rank-group');
    if (rankGroup) expandRank(rankGroup.dataset.rank, { persist: false });

    syncAllDayActiveMarkers();

    const dayLessons = activeItem.closest('.cr-day-lessons');
    if (dayLessons && !dayLessons.classList.contains('expanded')) {
      dayLessons.previousElementSibling?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    } else {
      activeItem.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }
}

function updateSidebarCompletion() {
  sidebarNav.querySelectorAll('.cr-lesson-item').forEach(el => {
    const id = el.dataset.id;
    if (completedSet.has(id)) {
      el.classList.add('completed');
    } else {
      el.classList.remove('completed');
    }
  });
}

function expandRank(rank, { persist = true } = {}) {
  expandedRanks.add(rank);
  syncRankDom(rank);
  if (persist) saveSidebarState();
}

function collapseRank(rank, { persist = true } = {}) {
  expandedRanks.delete(rank);
  syncRankDom(rank);
  if (persist) saveSidebarState();
}

function toggleRank(rank) {
  if (expandedRanks.has(rank)) collapseRank(rank);
  else expandRank(rank);
}


/* ═══════════════════════════════════════
   LESSON LOADING & RENDERING
   ═══════════════════════════════════════ */
function loadLesson(index) {
  if (index < 0 || index >= COURSE_LESSONS.length) return;

  const lesson = COURSE_LESSONS[index];
  if (!isLessonAccessible(lesson)) {
    showLockedToast(lesson);
    return;
  }

  currentLessonIndex = index;
  setLastVisited(lesson.id, index);
  clearAttemptTimer();

  history.replaceState(null, '', `#${lesson.id}`);

  contentEl.innerHTML = `
    <div class="cr-loading">
      <div class="cr-spinner"></div>
      <span>Loading lesson…</span>
    </div>
  `;

  const mainEl = $('main');
  if (mainEl) mainEl.scrollTop = 0;
  window.scrollTo({ top: 0, behavior: 'instant' });

  requestAnimationFrame(() => {
    renderLesson(lesson);
    updateSidebarActive();
    updateNavButtons();
    updateProgress();
    updateCompleteButton();
    setupScrollObserver(lesson);
    updateSidebarRecommended();
    updateRecommendedBanner(lesson);
  });
}

function showLockedToast(lesson) {
  const rankMeta = RANK_META[lesson.rank];
  const label = rankMeta ? rankMeta.label.replace(/^[^\s]+\s/, '') : lesson.rank.toUpperCase();
  showToast(`${label} content is coming soon. Explore Phase 1 freely in the meantime.`);
}

function buildRecommendedNextBanner(lesson) {
  const recommended = getRecommendedNext();

  if (!recommended) {
    const completeLesson = getLatestCompleteLesson();
    if (!completeLesson || lesson.id === completeLesson.id) return '';
    const idx = COURSE_LESSONS.findIndex(l => l.id === completeLesson.id);
    const rankLabel = getRankLabelForLesson(completeLesson);
    return `
      <div class="cr-recommended-next all-complete">
        <div class="cr-recommended-next-text">
          <span class="cr-rec-label">${rankLabel} Complete</span>
          <span class="cr-rec-title">🏆 Review your journey and stats</span>
        </div>
        <button class="cr-rec-go-btn" data-index="${idx}" type="button">Review Journey →</button>
      </div>
    `;
  }

  if (recommended.id === lesson.id) {
    if (completedSet.has(lesson.id)) return '';
    const { done, total } = getStepProgressCount(lesson);
    return `
      <div class="cr-recommended-next on-path">
        <span class="cr-rec-path-dot"></span>
        <div class="cr-recommended-next-text">
          <span class="cr-rec-label">Recommended Path</span>
          <span class="cr-rec-title">You're on track — ${done}/${total} objectives complete</span>
        </div>
      </div>
    `;
  }

  const idx = COURSE_LESSONS.findIndex(l => l.id === recommended.id);
  return `
    <div class="cr-recommended-next">
      <div class="cr-recommended-next-text">
        <span class="cr-rec-label">Recommended Next</span>
        <span class="cr-rec-title">${recommended.icon} ${recommended.title}</span>
        <span class="cr-rec-sub">Browsing freely — jump back to the path when ready</span>
      </div>
      <button class="cr-rec-go-btn" data-index="${idx}" type="button">Continue Path →</button>
    </div>
  `;
}

function updateRecommendedBanner(lesson) {
  const existing = contentEl.querySelector('.cr-recommended-next');
  const wrapper = document.createElement('div');
  wrapper.innerHTML = buildRecommendedNextBanner(lesson);
  const banner = wrapper.firstElementChild;

  if (!banner) {
    existing?.remove();
    return;
  }

  if (existing) {
    existing.replaceWith(banner);
  } else {
    const meta = contentEl.querySelector('.cr-lesson-meta');
    const mission = contentEl.querySelector('#missionPanel');
    const insertAfter = mission || meta;
    if (insertAfter) {
      insertAfter.insertAdjacentElement('afterend', banner);
    } else {
      contentEl.prepend(banner);
    }
  }

  banner.querySelector('.cr-rec-go-btn')?.addEventListener('click', (e) => {
    const idx = parseInt(e.currentTarget.dataset.index, 10);
    if (!isNaN(idx)) loadLesson(idx);
  });
}

function showToast(message) {
  let toast = document.querySelector('.cr-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'cr-toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('visible');
  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(() => toast.classList.remove('visible'), 3200);
}

function getMissionHeader(lesson) {
  const headers = {
    quest: { icon: '⚔', title: 'Quest Objectives', subtitle: 'Work through each step, then claim your XP when ready.' },
    checkpoint: { icon: '✅', title: 'Checkpoint Milestone', subtitle: 'Recap today\'s patterns and practice — at your own pace.' },
    test: { icon: '🎯', title: 'Rank Test — Prove Yourself', subtitle: 'Attempt each problem before revealing the solution.' },
    concept: { icon: '📝', title: 'Lesson Objectives', subtitle: 'Learn the pattern, then tackle the quests.' },
    intro: { icon: '⚔️', title: 'Mission Briefing', subtitle: 'Understand the Starter Path system before Day 1.' },
    complete: { icon: '🏆', title: 'Phase Complete', subtitle: 'Your Starter Path journey — earned through practice.' },
  };
  return headers[lesson.type] || headers.concept;
}

function buildMissionPanel(lesson) {
  const header = getMissionHeader(lesson);
  const steps = getLessonSteps(lesson);
  const { done, total } = getStepProgressCount(lesson);
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;
  const isComplete = completedSet.has(lesson.id);
  const dayProgress = lesson.day > 0 ? getDayProgress(lesson.rank, lesson.day) : null;

  let dayBarHtml = '';
  if (dayProgress && dayProgress.total > 1) {
    const dayPct = Math.round((dayProgress.completed / dayProgress.total) * 100);
    dayBarHtml = `
      <div class="cr-day-progress">
        <div class="cr-day-progress-label">
          <span>Day ${lesson.day} Progress</span>
          <span>${dayProgress.completed} / ${dayProgress.total} lessons</span>
        </div>
        <div class="cr-day-progress-bar">
          <div class="cr-day-progress-fill" style="width: ${dayPct}%"></div>
        </div>
      </div>
    `;
  }

  const stepsHtml = steps.map(step => {
    const done = isStepDone(lesson.id, step.id);
    const reqsMet = !step.requires || step.requires.every(r => isStepDone(lesson.id, r));
    const locked = !reqsMet;
    let actionHtml = '';

    if (step.kind === 'attempt' && !done) {
      actionHtml = `
        <button class="cr-step-action" data-lesson="${lesson.id}" data-step="${step.id}" data-kind="attempt" ${locked ? 'disabled' : ''}>
          I've Attempted This
        </button>
        <span class="cr-attempt-timer" data-lesson="${lesson.id}"></span>
      `;
    } else if (step.kind === 'reveal' && !done) {
      actionHtml = `
        <button class="cr-step-action reveal" data-lesson="${lesson.id}" data-step="${step.id}" data-kind="reveal" ${locked ? 'disabled' : ''}>
          Reveal Solution
        </button>
      `;
    } else if (step.kind === 'confirm' && !done && reqsMet) {
      actionHtml = `
        <button class="cr-step-action confirm" data-lesson="${lesson.id}" data-step="${step.id}" data-kind="confirm">
          Mark Done
        </button>
      `;
    }

    return `
      <li class="cr-mission-step ${done ? 'done' : ''} ${locked ? 'locked' : ''}" data-step="${step.id}">
        <span class="cr-step-check">${done ? '✓' : ''}</span>
        <div class="cr-step-body">
          <span class="cr-step-label">${step.label}</span>
          ${step.hint ? `<span class="cr-step-hint">${step.hint}</span>` : ''}
          ${actionHtml}
        </div>
      </li>
    `;
  }).join('');

  const statusClass = isComplete ? 'mission-complete' : (done === total ? 'mission-ready' : '');
  const statusText = isComplete
    ? '✓ MISSION COMPLETE'
    : done === total
      ? 'Ready to complete — claim your XP below'
      : `${done} of ${total} objectives complete`;

  return `
    <div class="cr-mission-panel ${lesson.type} ${statusClass}" id="missionPanel">
      ${dayBarHtml}
      <div class="cr-mission-header">
        <span class="cr-mission-icon">${header.icon}</span>
        <div>
          <h2 class="cr-mission-title">${header.title}</h2>
          <p class="cr-mission-subtitle">${header.subtitle}</p>
        </div>
        <div class="cr-mission-status">
          <span class="cr-mission-status-text">${statusText}</span>
          <div class="cr-mission-progress-ring" style="--progress: ${pct}%">
            <span>${done}/${total}</span>
          </div>
        </div>
      </div>
      <ul class="cr-mission-checklist">${stepsHtml}</ul>
    </div>
  `;
}

function renderLesson(lesson) {
  const rawMarkdown = lesson.content || '';
  let html = '';

  const rank = lesson.rank || 'intro';
  const meta = RANK_META[rank];
  html += '<div class="cr-lesson-meta">';
  if (rank && meta) {
    html += `<span class="cr-meta-pill rank" style="--pill-rank-color: ${meta.color}">${meta.label.replace(/^[^\s]+\s/, '')}</span>`;
  }
  if (lesson.type) {
    const typeLabels = { quest: '⚔ Quest', checkpoint: '✅ Checkpoint', test: '🎯 Test', concept: '📝 Mentor Guide', complete: '🏆 Complete' };
    if (typeLabels[lesson.type]) {
      html += `<span class="cr-meta-pill type">${typeLabels[lesson.type]}</span>`;
    }
  }
  if (lesson.difficulty) {
    html += `<span class="cr-meta-pill">${lesson.difficulty}</span>`;
  }
  if (lesson.xp) {
    html += `<span class="cr-meta-pill xp">⭐ ${lesson.xp} XP</span>`;
  }
  if (lesson.time) {
    html += `<span class="cr-meta-pill">⏱ ${lesson.time}</span>`;
  }
  html += '</div>';

  if (AVAILABLE_LESSON_IDS.has(lesson.id)) {
    html += buildMissionPanel(lesson);
  }

  html += marked.parse(rawMarkdown);

  contentEl.innerHTML = html;
  contentEl.classList.remove('fade-in');
  void contentEl.offsetWidth;
  contentEl.classList.add('fade-in');

  diagramEnhancer.enhanceVisualBlocks();
  postProcessCodeBlocks();
  addCopyButtons();
  createTabbedCodeBlocks();
  enhanceProblemLayout(lesson);
  enhanceStarterLayout(lesson);
  applySolutionGating(lesson);
  injectCheckpointStats(lesson);
  injectLiveStats(lesson);
  bindMissionPanelEvents(lesson);
  startAttemptTimer(lesson);
}

function enhanceProblemLayout(lesson) {
  if (!['quest', 'test', 'checkpoint'].includes(lesson.type)) return;

  const h2s = Array.from(contentEl.querySelectorAll('h2'));
  h2s.forEach((h2, i) => {
    const text = h2.textContent.toLowerCase();
    const nextH2 = h2s[i + 1] || null;

    if (/try the problem/i.test(text)) {
      wrapSectionUntil(h2, nextH2, 'cr-try-first-zone');
    } else if (/the problem|the mission/i.test(text)) {
      wrapSectionUntil(h2, nextH2, 'cr-problem-zone');
    } else if (/hints/i.test(text)) {
      wrapSectionUntil(h2, nextH2, 'cr-hints-zone');
    } else if (/walkthrough|approach/i.test(text)) {
      wrapSectionUntil(h2, nextH2, 'cr-walkthrough-zone');
    } else if (/mini challenge/i.test(text)) {
      wrapSectionUntil(h2, nextH2, 'cr-mini-challenge-zone');
    }
  });

  styleLeetCodeCTAs();
}

function enhanceStarterLayout(lesson) {
  if (!['checkpoint', 'intro', 'complete'].includes(lesson.type)) return;

  const patternsByType = {
    checkpoint: [
      { pattern: /skill check/i, className: 'cr-skill-check-zone' },
      { pattern: /reflection/i, className: 'cr-reflection-zone' },
      { pattern: /habit/i, className: 'cr-habit-zone' },
      { pattern: /mistake mirror/i, className: 'cr-mistake-zone' },
      { pattern: /practice queue/i, className: 'cr-practice-queue-zone' },
    ],
    intro: [
      { pattern: /how it works|phase system|course goals/i, className: 'cr-onboarding-section' },
    ],
    complete: [
      { pattern: /skills unlocked|what'?s next|recommendation matrix|phase \d — unlocked|phase \d - unlocked/i, className: 'cr-completion-section' },
    ],
  };

  const patterns = patternsByType[lesson.type] || [];
  const h2s = Array.from(contentEl.querySelectorAll('h2'));
  h2s.forEach((h2, i) => {
    const text = h2.textContent;
    const nextH2 = h2s[i + 1] || null;
    for (const { pattern, className } of patterns) {
      if (pattern.test(text)) {
        wrapSectionUntil(h2, nextH2, className);
        break;
      }
    }
  });
}

function wrapSectionUntil(startH2, stopBefore, className) {
  if (!startH2 || startH2.closest(`.${className}`)) return;
  const wrapper = document.createElement('div');
  wrapper.className = className;
  startH2.parentNode.insertBefore(wrapper, startH2);

  let node = startH2;
  while (node && node !== stopBefore) {
    const next = node.nextElementSibling;
    wrapper.appendChild(node);
    node = next;
  }
}

function styleLeetCodeCTAs() {
  contentEl.querySelectorAll('a[href*="leetcode.com"]').forEach(link => {
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
    if (/→\s*(open|try)/i.test(link.textContent)) {
      link.classList.add('cr-lc-btn');
    } else if (!link.classList.contains('cr-lc-link')) {
      link.classList.add('cr-lc-link');
    }
  });
}

function applySolutionGating(lesson) {
  if (lesson.type === 'quest') {
    gateQuestExplanations(lesson);
  } else if (lesson.type === 'test') {
    gateTestExplanations(lesson);
  } else if (lesson.type === 'checkpoint') {
    gateCheckpointHints(lesson);
  }
}

function createGatePanel(type, title, message) {
  const gate = document.createElement('div');
  gate.className = `cr-section-gate cr-section-gate-${type}`;
  gate.innerHTML = `
    <div class="cr-section-gate-inner">
      <span class="cr-gate-icon">${type === 'hints' ? '💡' : '🔒'}</span>
      <h3>${title}</h3>
      <p>${message}</p>
    </div>
  `;
  return gate;
}

function gateSection(section, type, title, message, revealed) {
  if (!section || section.dataset.gated === 'true') return;
  section.dataset.gated = 'true';
  section.classList.toggle('revealed', revealed);

  if (revealed) return;

  section.classList.add('cr-gated-section');
  const gate = createGatePanel(type, title, message);
  section.insertBefore(gate, section.firstChild);
}

function gateQuestExplanations(lesson) {
  const attemptDone = isStepDone(lesson.id, 'attempt');
  const solutionRevealed = isStepDone(lesson.id, 'review_solution');

  contentEl.querySelectorAll('.cr-hints-zone, .cr-walkthrough-zone').forEach(section => {
    gateSection(
      section,
      'hints',
      'Hints & Walkthrough Locked',
      'Mark <strong>"I\'ve Attempted This"</strong> in the checklist above to unlock hints and the guided walkthrough.',
      attemptDone
    );
  });

  const solutionSection = contentEl.querySelector('.cr-solution-zone-content')
    || wrapSolutionSection(lesson);
  if (solutionSection) {
    gateSection(
      solutionSection,
      'solution',
      'Solution Locked',
      'After your attempt, use <strong>"Reveal Solution"</strong> in the checklist to see the full code walkthrough.',
      solutionRevealed
    );
  }
}

function wrapSolutionSection(lesson) {
  const h2s = contentEl.querySelectorAll('h2');
  let solutionH2 = null;
  h2s.forEach(h2 => {
    if (/^solution$/i.test(h2.textContent.trim()) || /solution/i.test(h2.textContent)) {
      solutionH2 = h2;
    }
  });
  if (!solutionH2 || solutionH2.closest('.cr-solution-zone-content')) return null;

  const wrapper = document.createElement('div');
  wrapper.className = 'cr-solution-zone-content';
  solutionH2.parentNode.insertBefore(wrapper, solutionH2);
  let node = solutionH2;
  while (node) {
    const next = node.nextElementSibling;
    wrapper.appendChild(node);
    node = next;
  }
  return wrapper;
}

function gateTestExplanations(lesson) {
  const attemptDone = isStepDone(lesson.id, 'attempt');
  const solutionRevealed = isStepDone(lesson.id, 'review_solution');

  contentEl.querySelectorAll('.cr-hints-zone').forEach(section => {
    gateSection(
      section,
      'hints',
      'Hints Locked',
      'Mark <strong>"I\'ve Attempted This"</strong> in the checklist to unlock hints.',
      attemptDone
    );
  });

  gateTestSolution(lesson, solutionRevealed);
}

function gateTestSolution(lesson, solutionRevealed) {
  const details = contentEl.querySelector('details');
  if (!details) return;

  details.classList.add('cr-test-solution');

  if (!solutionRevealed) {
    details.removeAttribute('open');
    details.classList.add('cr-solution-locked');
    const summary = details.querySelector('summary');
    if (summary) {
      summary.innerHTML = '<strong>🔒 Solution & Walkthrough Locked</strong>';
      summary.addEventListener('click', (e) => {
        e.preventDefault();
        showToast('Attempt the problem first, then use Reveal Solution in the checklist.');
      });
    }
  } else {
    details.classList.remove('cr-solution-locked');
    const summary = details.querySelector('summary');
    if (summary) {
      summary.innerHTML = '<strong>📖 Solution & Walkthrough</strong>';
    }
  }
}

function gateCheckpointHints(lesson) {
  if (isStepDone(lesson.id, 'reflection')) return;

  contentEl.querySelectorAll('.cr-mini-challenge-zone blockquote, .cr-mini-challenge-zone h4').forEach(el => {
    if (el.closest('.cr-hint-gated')) return;
    const wrap = document.createElement('div');
    wrap.className = 'cr-hint-gated cr-gated-section';
    el.parentNode.insertBefore(wrap, el);
    wrap.appendChild(el);
    const gate = createGatePanel(
      'hints',
      'Hint Locked',
      'Complete the reflection prompts in the checklist above, then return for optional mini-challenge hints.'
    );
    wrap.insertBefore(gate, wrap.firstChild);
  });
}

function unlockHintsAndWalkthrough(lesson) {
  contentEl.querySelectorAll('.cr-hints-zone, .cr-walkthrough-zone, .cr-hint-gated').forEach(section => {
    section.classList.add('revealed');
    section.classList.remove('cr-gated-section');
    section.querySelector('.cr-section-gate')?.remove();
  });
}

function revealSolution(lesson) {
  if (!isStepDone(lesson.id, 'attempt')) {
    showToast('Mark "I\'ve Attempted This" before revealing the solution.');
    return;
  }

  setStepDone(lesson.id, 'review_solution', true);
  unlockHintsAndWalkthrough(lesson);

  if (lesson.type === 'quest') {
    contentEl.querySelectorAll('.cr-solution-zone-content').forEach(section => {
      section.classList.add('revealed');
      section.classList.remove('cr-gated-section');
      section.querySelector('.cr-section-gate')?.remove();
    });
    diagramEnhancer.enhanceVisualBlocks();
    postProcessCodeBlocks();
    addCopyButtons();
    createTabbedCodeBlocks();
  } else if (lesson.type === 'test') {
    gateTestSolution(lesson, true);
  }

  refreshMissionPanel(lesson);
  updateCompleteButton();
  updateNavButtons();
}

function injectCheckpointStats(lesson) {
  if (lesson.type !== 'checkpoint') return;
  const dayLessons = getDayLessons(lesson.rank, lesson.day);
  const quests = dayLessons.filter(l => l.type === 'quest');
  const questsDone = quests.filter(l => completedSet.has(l.id)).length;
  const xpEarned = dayLessons
    .filter(l => completedSet.has(l.id))
    .reduce((sum, l) => sum + (l.xp || 0), 0);
  const blockquote = contentEl.querySelector('blockquote');
  if (blockquote) {
    blockquote.innerHTML = `<p><strong>${lesson.dayTitle}</strong> · ${questsDone}/${quests.length} quests cleared · ⭐ ${xpEarned} XP earned</p>`;
  }
}

function injectLiveStats(lesson) {
  if (lesson.type !== 'complete') return;

  const rank = lesson.rank === 'p3' ? 'p3' : lesson.rank === 'p2' ? 'p2' : 'p1';
  const rankLessons = rank === 'p3'
    ? P3_LESSONS
    : rank === 'p2'
      ? P2_LESSONS
      : P1_LESSONS;
  const stats = getQuestStats(rank);
  const xp = getTotalXP();
  const completed = rankLessons.filter(l => completedSet.has(l.id)).length;
  const total = rankLessons.length;
  const questTotal = rankLessons.filter(l => l.type === 'quest').length;
  const testTotal = rankLessons.filter(l => l.type === 'test').length;

  let statsBlock = null;
  contentEl.querySelectorAll('h2').forEach(h2 => {
    if (/stats/i.test(h2.textContent)) {
      statsBlock = h2.nextElementSibling;
    }
  });

  if (statsBlock && statsBlock.tagName === 'UL') {
    const phaseLabel = rank === 'p3' ? 'Phase 3' : rank === 'p2' ? 'Phase 2' : 'Phase 1';
    const nextLabel = rank === 'p3'
      ? 'Ready to Ascend'
      : rank === 'p2'
        ? (isP3Unlocked() ? 'Phase 3 Unlocked' : 'In Progress')
        : (isP2Unlocked() ? 'Phase 2 Unlocked' : 'In Progress');
    statsBlock.innerHTML = `
      <li><strong>Quests completed:</strong> ${stats.quests} / ${questTotal}</li>
      <li><strong>Phase proofs solved:</strong> ${stats.tests} / ${testTotal}</li>
      <li><strong>Total XP earned:</strong> ${xp.toLocaleString()}</li>
      <li><strong>${phaseLabel} lessons:</strong> ${completed} / ${total}</li>
      <li><strong>Status:</strong> ${nextLabel}</li>
    `;
  }

  if (completed >= total - 1) {
    const panel = document.createElement('div');
    panel.className = 'cr-rank-awakening';
    const awakening = rank === 'p3'
      ? {
          icon: '🚀→🎓',
          title: 'Starter Path Complete!',
          detail: `You've earned <strong>${xp.toLocaleString()} XP</strong> total. You built the habit. You're ready to pick an Ascension pack.`,
        }
      : rank === 'p2'
        ? {
            icon: '🟢→🟡',
            title: 'Phase 2 Practitioner Confirmed',
            detail: `You've earned <strong>${xp.toLocaleString()} XP</strong> total. Phase 2: ${stats.quests} quests and ${stats.tests} proofs cleared — independent solving unlocked.`,
          }
        : {
            icon: '🔵→🟢',
            title: 'Phase 1 Apprentice Confirmed',
            detail: `You've earned <strong>${xp.toLocaleString()} XP</strong> across ${stats.quests} quests and ${stats.tests} phase proof.`,
          };
    panel.innerHTML = `
      <div class="cr-rank-awakening-inner">
        <span class="cr-awakening-icon">${awakening.icon}</span>
        <h3>${awakening.title}</h3>
        <p>${awakening.detail}</p>
      </div>
    `;
    const firstH1 = contentEl.querySelector('h1');
    if (firstH1 && firstH1.nextElementSibling) {
      firstH1.parentNode.insertBefore(panel, firstH1.nextElementSibling);
    }
  }
}

function bindMissionPanelEvents(lesson) {
  const panel = contentEl.querySelector('#missionPanel');
  if (!panel) return;

  panel.querySelectorAll('.cr-step-action').forEach(btn => {
    btn.addEventListener('click', () => {
      const stepId = btn.dataset.step;
      const kind = btn.dataset.kind;
      if (btn.disabled) return;

      if (kind === 'attempt') {
        setStepDone(lesson.id, stepId, true);
        unlockHintsAndWalkthrough(lesson);
        refreshMissionPanel(lesson);
        updateCompleteButton();
        updateNavButtons();
        showToast('Nice work — hints unlocked. Reveal the solution when you\'re ready to compare.');
      } else if (kind === 'reveal') {
        revealSolution(lesson);
        showToast('Solution revealed. Study the approach, then complete the quest.');
      } else if (kind === 'confirm') {
        setStepDone(lesson.id, stepId, true);
        refreshMissionPanel(lesson);
        updateCompleteButton();
        updateNavButtons();
      }
    });
  });
}

function refreshMissionPanel(lesson) {
  const existing = contentEl.querySelector('#missionPanel');
  if (!existing) return;
  const newPanel = document.createElement('div');
  newPanel.innerHTML = buildMissionPanel(lesson);
  existing.replaceWith(newPanel.firstElementChild);
  bindMissionPanelEvents(lesson);
  updateSidebarStepBadges();
  updateRecommendedBanner(lesson);
  updateSidebarRecommended();
}

function updateSidebarStepBadges() {
  sidebarNav.querySelectorAll('.cr-lesson-item').forEach(el => {
    const id = el.dataset.id;
    const lesson = COURSE_LESSONS.find(l => l.id === id);
    if (!lesson) return;
    const isCompleted = completedSet.has(id);
    const stepCount = getStepProgressCount(lesson);
    let badge = el.querySelector('.cr-lesson-steps');
    if (!isCompleted && stepCount.done > 0) {
      if (!badge) {
        badge = document.createElement('span');
        badge.className = 'cr-lesson-steps';
        el.querySelector('.cr-lesson-check')?.before(badge);
      }
      badge.textContent = `${stepCount.done}/${stepCount.total}`;
    } else if (badge) {
      badge.remove();
    }
  });
}

function setupScrollObserver(lesson) {
  if (scrollObserver) scrollObserver.disconnect();
  const steps = getLessonSteps(lesson);
  const autoStep = steps.find(s => s.kind === 'auto-scroll');
  if (!autoStep || isStepDone(lesson.id, autoStep.id)) return;

  scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.85) {
        setStepDone(lesson.id, autoStep.id, true);
        refreshMissionPanel(lesson);
        updateCompleteButton();
        updateNavButtons();
        scrollObserver.disconnect();
      }
    });
  }, { threshold: [0.85] });

  const sentinel = document.createElement('div');
  sentinel.className = 'cr-scroll-sentinel';
  sentinel.style.height = '1px';
  contentEl.appendChild(sentinel);
  scrollObserver.observe(sentinel);
}

function startAttemptTimer(lesson) {
  clearAttemptTimer();
  const hasAttempt = getLessonSteps(lesson).some(s => s.kind === 'attempt');
  if (!hasAttempt || isStepDone(lesson.id, 'attempt')) return;

  attemptStartTime = Date.now();
  const timerEl = contentEl.querySelector('.cr-attempt-timer');
  if (!timerEl) return;

  const update = () => {
    const elapsed = Math.floor((Date.now() - attemptStartTime) / 1000);
    const mins = Math.floor(elapsed / 60);
    const secs = elapsed % 60;
    const recommended = lesson.type === 'test' ? 15 : 5;
    timerEl.textContent = `⏱ ${mins}:${secs.toString().padStart(2, '0')} — aim for ${recommended} min`;
  };
  update();
  attemptTimerInterval = setInterval(update, 1000);
}

function clearAttemptTimer() {
  if (attemptTimerInterval) {
    clearInterval(attemptTimerInterval);
    attemptTimerInterval = null;
  }
  attemptStartTime = null;
}


/* ═══════════════════════════════════════
   CODE BLOCK POST-PROCESSING
   ═══════════════════════════════════════ */
function postProcessCodeBlocks() {
  contentEl.querySelectorAll('pre code').forEach(block => {
    if (block.closest('.cr-diagram-block')) return;
    if (!block.classList.contains('hljs')) {
      hljs.highlightElement(block);
    }
  });
}

function addCopyButtons() {
  contentEl.querySelectorAll('pre').forEach(pre => {
    if (pre.classList.contains('cr-diagram-block')) return;
    if (pre.querySelector('.cr-copy-btn')) return;

    const btn = document.createElement('button');
    btn.className = 'cr-copy-btn';
    btn.innerHTML = '📋 Copy';
    btn.addEventListener('click', () => {
      const code = pre.querySelector('code');
      if (code) {
        navigator.clipboard.writeText(code.textContent).then(() => {
          btn.innerHTML = '✓ Copied!';
          btn.classList.add('copied');
          setTimeout(() => {
            btn.innerHTML = '📋 Copy';
            btn.classList.remove('copied');
          }, 2000);
        });
      }
    });
    pre.style.position = 'relative';
    pre.appendChild(btn);
  });
}


/* ═══════════════════════════════════════
   TABBED CODE BLOCKS
   Detects consecutive h3 + code patterns
   for C++, Python, Java and groups them
   ═══════════════════════════════════════ */
function createTabbedCodeBlocks() {
  const LANG_MAP = {
    'c++':    { lang: 'cpp',    label: 'C++' },
    'cpp':    { lang: 'cpp',    label: 'C++' },
    'python': { lang: 'python', label: 'Python' },
    'java':   { lang: 'java',  label: 'Java' },
  };

  const children = Array.from(contentEl.children);
  let i = 0;

  while (i < children.length) {
    const el = children[i];

    if (el.tagName === 'H3') {
      const headerText = el.textContent.trim().toLowerCase();
      const langInfo = LANG_MAP[headerText];

      if (langInfo) {
        const group = [];
        let j = i;

        while (j < children.length) {
          const hEl = children[j];
          if (hEl.tagName !== 'H3') break;

          const hText = hEl.textContent.trim().toLowerCase();
          const hLang = LANG_MAP[hText];
          if (!hLang) break;

          const preEl = children[j + 1];
          if (!preEl || preEl.tagName !== 'PRE') break;

          group.push({
            lang: hLang.lang,
            label: hLang.label,
            headerEl: hEl,
            preEl: preEl,
          });
          j += 2;
        }

        if (group.length >= 2) {
          const tabContainer = document.createElement('div');
          tabContainer.className = 'code-tabs';

          const btnRow = document.createElement('div');
          btnRow.className = 'code-tab-buttons';

          group.forEach((item, idx) => {
            const btn = document.createElement('button');
            btn.className = 'code-tab-btn' + (item.lang === preferredLang ? ' active' : (idx === 0 && !group.some(g => g.lang === preferredLang) ? ' active' : ''));
            btn.dataset.lang = item.lang;
            btn.textContent = item.label;
            btn.addEventListener('click', () => switchTab(tabContainer, item.lang));
            btnRow.appendChild(btn);
          });

          if (!btnRow.querySelector('.active')) {
            btnRow.firstChild.classList.add('active');
          }

          tabContainer.appendChild(btnRow);

          const activeLang = btnRow.querySelector('.active')?.dataset.lang;
          group.forEach((item) => {
            const panel = document.createElement('div');
            panel.className = 'code-tab-content' + (item.lang === activeLang ? ' active' : '');
            panel.dataset.lang = item.lang;

            const clonedPre = item.preEl.cloneNode(true);
            panel.appendChild(clonedPre);

            const copyBtn = document.createElement('button');
            copyBtn.className = 'cr-copy-btn';
            copyBtn.innerHTML = '📋 Copy';
            copyBtn.addEventListener('click', () => {
              const code = clonedPre.querySelector('code');
              if (code) {
                navigator.clipboard.writeText(code.textContent).then(() => {
                  copyBtn.innerHTML = '✓ Copied!';
                  copyBtn.classList.add('copied');
                  setTimeout(() => {
                    copyBtn.innerHTML = '📋 Copy';
                    copyBtn.classList.remove('copied');
                  }, 2000);
                });
              }
            });
            clonedPre.style.position = 'relative';
            clonedPre.appendChild(copyBtn);

            tabContainer.appendChild(panel);
          });

          group[0].headerEl.parentNode.insertBefore(tabContainer, group[0].headerEl);
          group.forEach(item => {
            item.headerEl.remove();
            item.preEl.remove();
          });

          i = Array.from(contentEl.children).indexOf(tabContainer) + 1;
          children.length = 0;
          children.push(...Array.from(contentEl.children));
          continue;
        }
      }
    }
    i++;
  }
}

function switchTab(container, lang) {
  container.querySelectorAll('.code-tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
  container.querySelectorAll('.code-tab-content').forEach(panel => {
    panel.classList.toggle('active', panel.dataset.lang === lang);
  });
  preferredLang = lang;
  localStorage.setItem(LANG_TAB_PREF_KEY, lang);
}


/* ═══════════════════════════════════════
   NAVIGATION
   ═══════════════════════════════════════ */
function updateNavButtons() {
  prevBtn.disabled = currentLessonIndex === 0;
  nextBtn.disabled = currentLessonIndex === COURSE_LESSONS.length - 1;
  nextBtn.title = '';

  const recommended = getRecommendedNext();
  const nextInCourse = currentLessonIndex < COURSE_LESSONS.length - 1
    ? COURSE_LESSONS[currentLessonIndex + 1]
    : null;
  const nextLabel = nextBtn.querySelector('span');
  if (nextLabel && nextInCourse && recommended && nextInCourse.id === recommended.id) {
    nextLabel.textContent = 'Recommended Next';
    nextBtn.classList.add('is-recommended');
  } else if (nextLabel) {
    nextLabel.textContent = 'Next';
    nextBtn.classList.remove('is-recommended');
  }
}

function navigatePrev() {
  if (currentLessonIndex > 0) {
    loadLesson(currentLessonIndex - 1);
  }
}

function navigateNext() {
  if (currentLessonIndex < COURSE_LESSONS.length - 1) {
    loadLesson(currentLessonIndex + 1);
  }
}


/* ═══════════════════════════════════════
   COMPLETION & PROGRESS
   ═══════════════════════════════════════ */
function toggleComplete() {
  const lesson = COURSE_LESSONS[currentLessonIndex];
  if (!lesson) return;

  if (completedSet.has(lesson.id)) {
    completedSet.delete(lesson.id);
    saveProgress();
    updateProgress();
    updateCompleteButton();
    updateSidebarCompletion();
    rebuildSidebarDayIndicators();
    refreshMissionPanel(lesson);
    updateNavButtons();
    updateSidebarRecommended();
    updateRecommendedBanner(lesson);
    return;
  }

  if (AVAILABLE_LESSON_IDS.has(lesson.id) && !areAllStepsDone(lesson)) {
    showToast('Complete all objectives in the checklist first.');
    return;
  }

  completedSet.add(lesson.id);
  recordLessonAchievements(lesson);
  saveProgress();
  updateProgress();
  updateCompleteButton();
  updateSidebarCompletion();
  rebuildSidebarDayIndicators();
  refreshMissionPanel(lesson);
  updateNavButtons();
  updateSidebarRecommended();
  updateRecommendedBanner(lesson);

  xpBadge.classList.remove('xp-pulse');
  void xpBadge.offsetWidth;
  xpBadge.classList.add('xp-pulse');

  if (AVAILABLE_LESSON_IDS.has(lesson.id)) {
    showMilestone(lesson);
  }
}

function updateCompleteButton() {
  const lesson = COURSE_LESSONS[currentLessonIndex];
  if (!lesson) return;

  const isCompleted = completedSet.has(lesson.id);
  const allStepsDone = areAllStepsDone(lesson);
  const span = markCompleteBtn.querySelector('span');

  markCompleteBtn.classList.toggle('completed', isCompleted);
  markCompleteBtn.classList.toggle('ready', !isCompleted && allStepsDone);
  markCompleteBtn.disabled = !isCompleted && AVAILABLE_LESSON_IDS.has(lesson.id) && !allStepsDone;

  let label;
  if (isCompleted) {
    const labels = {
      quest: 'Quest Complete',
      checkpoint: 'Checkpoint Complete',
      test: 'Test Complete',
      complete: 'Journey Complete',
      concept: 'Lesson Complete',
      intro: 'Briefing Complete',
    };
    label = labels[lesson.type] || 'Completed';
  } else if (allStepsDone) {
    const claimLabels = {
      quest: 'Claim Quest XP',
      checkpoint: 'Complete Checkpoint',
      test: 'Pass Test Problem',
      concept: 'Complete Lesson',
      intro: 'Start Day 1 →',
    };
    label = claimLabels[lesson.type] || 'Claim XP';
  } else {
    label = 'Complete Objectives First';
  }

  label = compactCompleteLabel(label);
  span.textContent = label;
  markCompleteBtn.setAttribute('aria-label', label);
}

function updateProgress() {
  const rankLabel = getCurrentRankLabel();
  const lessons = rankLabel === 'Phase 3'
    ? P3_LESSONS
    : rankLabel === 'Phase 2'
      ? P2_LESSONS
      : P1_LESSONS;
  const total = lessons.length;
  const completed = getCompletedCount();
  const xp = getTotalXP();
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

  const isCompactProgress = window.matchMedia('(max-width: 768px)').matches;

  progressText.textContent = isCompactProgress
    ? `${completed}/${total}`
    : `${completed} / ${total} ${rankLabel}`;
  progressFill.style.width = `${pct}%`;
  xpValue.textContent = xp.toLocaleString();
}

function rebuildSidebarDayIndicators() {
  sidebarNav.querySelectorAll('.cr-day-group').forEach(dayGroup => {
    const items = dayGroup.querySelectorAll('.cr-lesson-item');
    if (!items.length) return;
    const ids = [...items].map(el => el.dataset.id);
    const lessons = ids.map(id => COURSE_LESSONS.find(l => l.id === id)).filter(Boolean);
    if (!lessons.length) return;
    const dayCompleted = lessons.every(l => completedSet.has(l.id));
    const dayProgress = lessons.filter(l => completedSet.has(l.id)).length;
    const indicator = dayGroup.querySelector('.cr-day-indicator');
    if (indicator) {
      indicator.classList.toggle('completed', dayCompleted);
      indicator.classList.toggle('in-progress', !dayCompleted && dayProgress > 0);
      indicator.textContent = dayCompleted ? '✓' : dayProgress > 0 ? `${dayProgress}/${lessons.length}` : '○';
    }
  });
}

function showMilestone(lesson) {
  const copy = MILESTONE_COPY[lesson.type] || MILESTONE_COPY.quest;
  milestoneIcon.textContent = copy.icon;
  milestoneLabel.textContent = copy.label;
  milestoneTitle.textContent = copy.title;
  milestoneMsg.textContent = copy.msg;

  if (lesson.xp > 0) {
    milestoneXp.textContent = `+${lesson.xp} XP`;
    milestoneXp.hidden = false;
  } else {
    milestoneXp.hidden = true;
  }

  if (lesson.type === 'checkpoint') {
    milestoneTitle.textContent = `Day ${lesson.day} Complete!`;
  }
  if (lesson.id === 'phase-1-complete') {
    milestoneTitle.textContent = 'Phase 1 Apprentice Confirmed!';
    milestoneMsg.textContent = 'You built the reading habit. Phase 2 is unlocked — time for first wins.';
  }
  if (lesson.id === 'phase-2-complete') {
    milestoneTitle.textContent = 'Phase 2 Practitioner Confirmed!';
    milestoneMsg.textContent = 'Independent solving unlocked. Phase 3 is unlocked — build momentum.';
  }
  if (lesson.id === 'course-complete') {
    milestoneTitle.textContent = "YOU'RE READY TO ASCEND!";
    milestoneMsg.textContent = 'Starter Path complete. Pick an Ascension pack and start ranking up.';
  }

  markMilestoneShown(lesson.id);
  saveProgress();

  milestoneOverlay.hidden = false;
  milestoneOverlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  activateMilestoneDialog(milestoneBtn);
}

function hideMilestone() {
  milestoneOverlay.hidden = true;
  milestoneOverlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  deactivateMilestoneDialog();

  const recIdx = getRecommendedNextIndex();
  if (recIdx !== -1 && recIdx !== currentLessonIndex) {
    loadLesson(recIdx);
  }
}


/* ═══════════════════════════════════════
   MOBILE SIDEBAR
   ═══════════════════════════════════════ */
function toggleSidebar() {
  const isOpen = sidebar.classList.contains('open');
  if (isOpen) {
    closeSidebar();
  } else {
    openSidebar();
  }
}

function openSidebar() {
  sidebar.classList.add('open');
  sidebarOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeSidebar() {
  sidebar.classList.remove('open');
  sidebarOverlay.classList.remove('active');
  document.body.style.overflow = '';
}


/* ═══════════════════════════════════════
   EVENT BINDING
   ═══════════════════════════════════════ */
function bindEvents() {
  sidebarToggle.addEventListener('click', toggleSidebar);
  sidebarOverlay.addEventListener('click', closeSidebar);

  sidebarNav.addEventListener('click', (e) => {
    const recCard = e.target.closest('.cr-sidebar-rec[data-index]');
    if (recCard) {
      const idx = parseInt(recCard.dataset.index, 10);
      if (!isNaN(idx)) {
        loadLesson(idx);
        if (window.innerWidth <= 768) closeSidebar();
      }
      return;
    }

    const dayHeader = e.target.closest('.cr-day-header');
    if (dayHeader) {
      e.preventDefault();
      e.stopPropagation();
      const dayId = dayHeader.dataset.dayId;
      if (dayId) toggleDay(dayId);
      return;
    }

    const rankHeader = e.target.closest('.cr-rank-header');
    if (rankHeader) {
      toggleRank(rankHeader.dataset.rank);
      return;
    }

    const lessonItem = e.target.closest('.cr-lesson-item');
    if (lessonItem) {
      if (lessonItem.classList.contains('locked')) {
        const lesson = COURSE_LESSONS[parseInt(lessonItem.dataset.index, 10)];
        if (lesson) showLockedToast(lesson);
        return;
      }
      const idx = parseInt(lessonItem.dataset.index, 10);
      loadLesson(idx);
      if (window.innerWidth <= 768) {
        closeSidebar();
      }
    }
  });

  prevBtn.addEventListener('click', navigatePrev);
  nextBtn.addEventListener('click', navigateNext);
  markCompleteBtn.addEventListener('click', toggleComplete);
  milestoneBtn.addEventListener('click', hideMilestone);
  milestoneOverlay.addEventListener('click', (e) => {
    if (e.target === milestoneOverlay) hideMilestone();
  });
  initMilestoneDialog({ overlay: milestoneOverlay, milestoneBtn, hideMilestone });

  document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    if (isMilestoneOpen()) return;

    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      navigatePrev();
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      navigateNext();
    }
  });

  window.addEventListener('hashchange', () => {
    const hash = window.location.hash.replace('#', '');
    const idx = COURSE_LESSONS.findIndex(l => l.id === hash);
    if (idx !== -1 && idx !== currentLessonIndex) {
      loadLesson(idx);
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      closeSidebar();
    }
    updateProgress();
    updateCompleteButton();
    diagramEnhancer.handleResize();
  });

  window.addEventListener('beforeunload', () => {
    const lesson = COURSE_LESSONS[currentLessonIndex];
    if (lesson) setLastVisited(lesson.id, currentLessonIndex);
    else saveProgress();
  });

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      const lesson = COURSE_LESSONS[currentLessonIndex];
      if (lesson) setLastVisited(lesson.id, currentLessonIndex);
      else saveProgress();
    }
  });
}


/* ═══════════════════════════════════════
   BOOT — run exactly once (module scripts may fire after DOMContentLoaded)
   ═══════════════════════════════════════ */
let booted = false;

async function boot() {
  if (booted) return;
  booted = true;
  if (!(await guardPage())) return;
  hideAuthLoader();
  init();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
