/* ══════════════════════════════════════════════════════════
   COURSE READER — JavaScript Module
   Arrays & Strings Ascension · Solo Leveling Theme
   ══════════════════════════════════════════════════════════ */

import { COURSE_LESSONS } from './course-content.js';

/* ─── Constants ─── */
const STORAGE_KEY = 'ascension-progress';
const LANG_TAB_PREF_KEY = 'ascension-lang-pref';

const RANK_META = {
  intro:  { label: '🏠 INTRODUCTION',        color: '#888888', order: 0 },
  e:      { label: '⬛ E-RANK — FOUNDATION',  color: '#666666', order: 1 },
  d:      { label: '🔵 D-RANK — BUILDER',     color: '#4A9EFF', order: 2 },
  c:      { label: '🟢 C-RANK — WARRIOR',     color: '#4AFF9E', order: 3 },
  b:      { label: '🟡 B-RANK — COMMANDER',   color: '#FFD700', order: 4 },
  a:      { label: '🟠 A-RANK — ELITE',       color: '#FF6B35', order: 5 },
  s:      { label: '🔴 S-RANK — LEGEND',      color: '#E50000', order: 6 },
  appendix: { label: '📎 APPENDIX',           color: '#888888', order: 7 },
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

/* ─── State ─── */
let currentLessonIndex = 0;
let completedSet = new Set();
let expandedRanks = new Set();
let preferredLang = localStorage.getItem(LANG_TAB_PREF_KEY) || 'cpp';

/* ─── Init ─── */
function init() {
  loadProgress();
  configureMarked();
  buildSidebar();
  bindEvents();

  // Deep-link via hash
  const hash = window.location.hash.replace('#', '');
  if (hash) {
    const idx = COURSE_LESSONS.findIndex(l => l.id === hash);
    if (idx !== -1) {
      currentLessonIndex = idx;
    }
  }

  loadLesson(currentLessonIndex);
}

/* ═══════════════════════════════════════
   PROGRESS PERSISTENCE
   ═══════════════════════════════════════ */
function loadProgress() {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (data && Array.isArray(data.completed)) {
      completedSet = new Set(data.completed);
    }
  } catch {
    completedSet = new Set();
  }
}

function saveProgress() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    completed: [...completedSet],
  }));
}

function getTotalXP() {
  let xp = 0;
  COURSE_LESSONS.forEach(lesson => {
    if (completedSet.has(lesson.id)) {
      xp += (lesson.xp || 0);
    }
  });
  return xp;
}

function getCompletedCount() {
  return [...completedSet].filter(id =>
    COURSE_LESSONS.some(l => l.id === id)
  ).length;
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
   SIDEBAR CONSTRUCTION
   ═══════════════════════════════════════ */
function buildSidebar() {
  // Group lessons by rank
  const groups = new Map();
  COURSE_LESSONS.forEach((lesson, idx) => {
    const rank = lesson.rank || 'intro';
    if (!groups.has(rank)) groups.set(rank, []);
    groups.get(rank).push({ lesson, idx });
  });

  // Sort groups by rank order
  const sortedRanks = [...groups.keys()].sort(
    (a, b) => (RANK_META[a]?.order ?? 99) - (RANK_META[b]?.order ?? 99)
  );

  // Determine which ranks are unlocked
  const unlockedRanks = getUnlockedRanks();

  // Expand the rank containing the current lesson, plus E-Rank by default
  const currentRank = COURSE_LESSONS[currentLessonIndex]?.rank || 'intro';
  expandedRanks.add('intro');
  expandedRanks.add('e');
  expandedRanks.add(currentRank);

  let html = '';
  sortedRanks.forEach(rank => {
    const meta = RANK_META[rank] || { label: rank.toUpperCase(), color: '#888', order: 99 };
    const items = groups.get(rank);
    const isExpanded = expandedRanks.has(rank);
    const isLocked = !unlockedRanks.has(rank);

    html += `
      <div class="cr-rank-group" data-rank="${rank}">
        <div class="cr-rank-header ${isExpanded ? 'expanded' : ''}"
             data-rank="${rank}"
             style="border-left-color: ${meta.color}">
          <div class="cr-rank-header-left">
            <span class="cr-rank-dot" style="background: ${meta.color}"></span>
            <span class="cr-rank-title" style="color: ${meta.color}">${meta.label}</span>
            ${isLocked ? '<span class="cr-rank-badge locked">🔒</span>' : ''}
          </div>
          <svg class="cr-rank-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </div>
        <div class="cr-lesson-list ${isExpanded ? 'expanded' : ''}" data-rank="${rank}">
    `;

    // Sub-group lessons by day within this rank
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
        // Create a collapsible day group
        const dayId = `day-${rank}-${dayKey}`;
        const currentLessonDay = COURSE_LESSONS[currentLessonIndex]?.day;
        const currentLessonRank = COURSE_LESSONS[currentLessonIndex]?.rank;
        const isDayActive = currentLessonDay === dayKey && currentLessonRank === rank;
        const dayCompleted = dayItems.every(({ lesson }) => completedSet.has(lesson.id));
        const dayProgress = dayItems.filter(({ lesson }) => completedSet.has(lesson.id)).length;

        html += `
          <div class="cr-day-group ${isDayActive ? 'expanded' : ''}" data-day-id="${dayId}">
            <div class="cr-day-header ${isDayActive ? 'expanded' : ''}" data-day-id="${dayId}">
              <div class="cr-day-header-left">
                <span class="cr-day-indicator ${dayCompleted ? 'completed' : (dayProgress > 0 ? 'in-progress' : '')}">
                  ${dayCompleted ? '✓' : dayProgress > 0 ? `${dayProgress}/${dayItems.length}` : dayKey}
                </span>
                <span class="cr-day-title">${dayTitle}</span>
              </div>
              <svg class="cr-day-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </div>
            <div class="cr-day-lessons ${isDayActive ? 'expanded' : ''}">
        `;

        dayItems.forEach(({ lesson, idx }) => {
          const isCompleted = completedSet.has(lesson.id);
          const isActive = idx === currentLessonIndex;
          const lessonLocked = isLocked;

          let classes = 'cr-lesson-item cr-lesson-sub';
          if (isActive) classes += ' active';
          if (isCompleted) classes += ' completed';
          if (lessonLocked) classes += ' locked';

          html += `
            <div class="${classes}" data-index="${idx}" data-id="${lesson.id}">
              <span class="cr-lesson-icon">${lesson.icon || '📄'}</span>
              <span class="cr-lesson-title">${lesson.title}</span>
              <span class="cr-lesson-check">✓</span>
            </div>
          `;
        });

        html += '</div></div>';
      } else {
        // Single item — render directly (intro, locked ranks)
        dayItems.forEach(({ lesson, idx }) => {
          const isCompleted = completedSet.has(lesson.id);
          const isActive = idx === currentLessonIndex;
          const lessonLocked = isLocked;

          let classes = 'cr-lesson-item';
          if (isActive) classes += ' active';
          if (isCompleted) classes += ' completed';
          if (lessonLocked) classes += ' locked';

          html += `
            <div class="${classes}" data-index="${idx}" data-id="${lesson.id}">
              <span class="cr-lesson-icon">${lesson.icon || '📄'}</span>
              <span class="cr-lesson-title">${lesson.title}</span>
              <span class="cr-lesson-check">✓</span>
            </div>
          `;
        });
      }
    });

    html += '</div></div>';
  });

  sidebarNav.innerHTML = html;
}

function getUnlockedRanks() {
  // Only intro and E-Rank are unlocked for now (Phase 1 content)
  // Future ranks (D, C, B, A, S) remain locked until their content is created
  const unlocked = new Set(['intro', 'e']);
  return unlocked;
}

function updateSidebarActive() {
  // Remove old active
  sidebarNav.querySelectorAll('.cr-lesson-item.active').forEach(el => {
    el.classList.remove('active');
  });
  // Set new active
  const activeItem = sidebarNav.querySelector(`.cr-lesson-item[data-index="${currentLessonIndex}"]`);
  if (activeItem) {
    activeItem.classList.add('active');
    // Ensure parent rank is expanded
    const rankGroup = activeItem.closest('.cr-rank-group');
    if (rankGroup) {
      const rank = rankGroup.dataset.rank;
      expandRank(rank);
    }
    // Ensure parent day group is expanded
    const dayGroup = activeItem.closest('.cr-day-group');
    if (dayGroup) {
      dayGroup.classList.add('expanded');
      const dayHeader = dayGroup.querySelector('.cr-day-header');
      const dayLessons = dayGroup.querySelector('.cr-day-lessons');
      if (dayHeader) dayHeader.classList.add('expanded');
      if (dayLessons) dayLessons.classList.add('expanded');
    }
    // Scroll active item into view in sidebar
    activeItem.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
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

function expandRank(rank) {
  expandedRanks.add(rank);
  const header = sidebarNav.querySelector(`.cr-rank-header[data-rank="${rank}"]`);
  const list = sidebarNav.querySelector(`.cr-lesson-list[data-rank="${rank}"]`);
  if (header && list) {
    header.classList.add('expanded');
    list.classList.add('expanded');
  }
}

function collapseRank(rank) {
  expandedRanks.delete(rank);
  const header = sidebarNav.querySelector(`.cr-rank-header[data-rank="${rank}"]`);
  const list = sidebarNav.querySelector(`.cr-lesson-list[data-rank="${rank}"]`);
  if (header && list) {
    header.classList.remove('expanded');
    list.classList.remove('expanded');
  }
}

function toggleRank(rank) {
  if (expandedRanks.has(rank)) {
    collapseRank(rank);
  } else {
    expandRank(rank);
  }
}


/* ═══════════════════════════════════════
   LESSON LOADING & RENDERING
   ═══════════════════════════════════════ */
function loadLesson(index) {
  if (index < 0 || index >= COURSE_LESSONS.length) return;

  currentLessonIndex = index;
  const lesson = COURSE_LESSONS[index];

  // Update URL hash
  history.replaceState(null, '', `#${lesson.id}`);

  // Show loading
  contentEl.innerHTML = `
    <div class="cr-loading">
      <div class="cr-spinner"></div>
      <span>Loading lesson…</span>
    </div>
  `;

  // Scroll to top of main
  const mainEl = $('main');
  if (mainEl) mainEl.scrollTop = 0;
  window.scrollTo({ top: 0, behavior: 'instant' });

  // Render markdown content
  requestAnimationFrame(() => {
    renderLesson(lesson);
    updateSidebarActive();
    updateNavButtons();
    updateProgress();
    updateCompleteButton();
  });
}

function renderLesson(lesson) {
  const rawMarkdown = lesson.content || '';
  let html = '';

  // Lesson meta pills
  const rank = lesson.rank || 'intro';
  const meta = RANK_META[rank];
  if (lesson.xp || lesson.difficulty) {
    html += '<div class="cr-lesson-meta">';
    if (rank && meta) {
      html += `<span class="cr-meta-pill rank" style="--pill-rank-color: ${meta.color}">${meta.label.replace(/^[^\s]+\s/, '')}</span>`;
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
  }

  // Parse markdown
  html += marked.parse(rawMarkdown);

  contentEl.innerHTML = html;
  contentEl.classList.remove('fade-in');
  void contentEl.offsetWidth; // Force reflow
  contentEl.classList.add('fade-in');

  // Post-processing
  postProcessCodeBlocks();
  addCopyButtons();
  createTabbedCodeBlocks();
}


/* ═══════════════════════════════════════
   CODE BLOCK POST-PROCESSING
   ═══════════════════════════════════════ */
function postProcessCodeBlocks() {
  // Re-run highlight.js on any un-highlighted blocks
  contentEl.querySelectorAll('pre code').forEach(block => {
    if (!block.classList.contains('hljs')) {
      hljs.highlightElement(block);
    }
  });
}

function addCopyButtons() {
  contentEl.querySelectorAll('pre').forEach(pre => {
    // Don't add if already has one
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

  // Walk through all children of content looking for h3 + pre groups
  const children = Array.from(contentEl.children);
  let i = 0;

  while (i < children.length) {
    const el = children[i];

    // Check if this is an h3 matching a language name
    if (el.tagName === 'H3') {
      const headerText = el.textContent.trim().toLowerCase();
      const langInfo = LANG_MAP[headerText];

      if (langInfo) {
        // Look for consecutive h3/pre pairs for different languages
        const group = [];
        let j = i;

        while (j < children.length) {
          const hEl = children[j];
          if (hEl.tagName !== 'H3') break;

          const hText = hEl.textContent.trim().toLowerCase();
          const hLang = LANG_MAP[hText];
          if (!hLang) break;

          // Next element should be a pre
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

        // Only create tabs if we have 2+ languages
        if (group.length >= 2) {
          const tabContainer = document.createElement('div');
          tabContainer.className = 'code-tabs';

          // Tab buttons
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

          // If no preferred lang matched, activate first
          if (!btnRow.querySelector('.active')) {
            btnRow.firstChild.classList.add('active');
          }

          tabContainer.appendChild(btnRow);

          // Tab content panels
          const activeLang = btnRow.querySelector('.active')?.dataset.lang;
          group.forEach((item) => {
            const panel = document.createElement('div');
            panel.className = 'code-tab-content' + (item.lang === activeLang ? ' active' : '');
            panel.dataset.lang = item.lang;

            // Move the pre into the panel
            const clonedPre = item.preEl.cloneNode(true);
            panel.appendChild(clonedPre);

            // Add copy button to this panel's pre
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

          // Insert the tab container before the first element, then remove originals
          group[0].headerEl.parentNode.insertBefore(tabContainer, group[0].headerEl);
          group.forEach(item => {
            item.headerEl.remove();
            item.preEl.remove();
          });

          // Remove copy buttons from the original (now removed) pres that were standalone
          // Adjust index: we replaced multiple elements with one
          // Rebuild children array
          i = Array.from(contentEl.children).indexOf(tabContainer) + 1;
          // Rebuild for next iteration
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
  // Update buttons
  container.querySelectorAll('.code-tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
  // Update panels
  container.querySelectorAll('.code-tab-content').forEach(panel => {
    panel.classList.toggle('active', panel.dataset.lang === lang);
  });
  // Save preference
  preferredLang = lang;
  localStorage.setItem(LANG_TAB_PREF_KEY, lang);
}


/* ═══════════════════════════════════════
   NAVIGATION
   ═══════════════════════════════════════ */
function updateNavButtons() {
  prevBtn.disabled = currentLessonIndex === 0;
  nextBtn.disabled = currentLessonIndex === COURSE_LESSONS.length - 1;
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
  } else {
    completedSet.add(lesson.id);
  }

  saveProgress();
  updateProgress();
  updateCompleteButton();
  updateSidebarCompletion();

  // XP pulse animation
  xpBadge.classList.remove('xp-pulse');
  void xpBadge.offsetWidth;
  xpBadge.classList.add('xp-pulse');
}

function updateCompleteButton() {
  const lesson = COURSE_LESSONS[currentLessonIndex];
  if (!lesson) return;

  const isCompleted = completedSet.has(lesson.id);
  if (isCompleted) {
    markCompleteBtn.classList.add('completed');
    markCompleteBtn.querySelector('span').textContent = 'Completed';
  } else {
    markCompleteBtn.classList.remove('completed');
    markCompleteBtn.querySelector('span').textContent = 'Mark as Complete';
  }
}

function updateProgress() {
  const total = COURSE_LESSONS.length;
  const completed = getCompletedCount();
  const xp = getTotalXP();
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

  progressText.textContent = `${completed} / ${total} completed`;
  progressFill.style.width = `${pct}%`;
  xpValue.textContent = xp.toLocaleString();
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
  // Sidebar toggle
  sidebarToggle.addEventListener('click', toggleSidebar);
  sidebarOverlay.addEventListener('click', closeSidebar);

  // Sidebar navigation clicks (event delegation)
  sidebarNav.addEventListener('click', (e) => {
    // Rank header click → toggle collapse
    const rankHeader = e.target.closest('.cr-rank-header');
    if (rankHeader) {
      toggleRank(rankHeader.dataset.rank);
      return;
    }

    // Day header click → toggle day group
    const dayHeader = e.target.closest('.cr-day-header');
    if (dayHeader) {
      const dayGroup = dayHeader.closest('.cr-day-group');
      if (dayGroup) {
        dayGroup.classList.toggle('expanded');
        dayHeader.classList.toggle('expanded');
        const dayLessons = dayGroup.querySelector('.cr-day-lessons');
        if (dayLessons) dayLessons.classList.toggle('expanded');
      }
      return;
    }

    // Lesson item click → navigate
    const lessonItem = e.target.closest('.cr-lesson-item');
    if (lessonItem && !lessonItem.classList.contains('locked')) {
      const idx = parseInt(lessonItem.dataset.index, 10);
      loadLesson(idx);
      // Close mobile sidebar
      if (window.innerWidth <= 768) {
        closeSidebar();
      }
    }
  });

  // Bottom nav buttons
  prevBtn.addEventListener('click', navigatePrev);
  nextBtn.addEventListener('click', navigateNext);
  markCompleteBtn.addEventListener('click', toggleComplete);

  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    // Don't trigger if user is typing in an input
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      navigatePrev();
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      navigateNext();
    }
  });

  // Hash change
  window.addEventListener('hashchange', () => {
    const hash = window.location.hash.replace('#', '');
    const idx = COURSE_LESSONS.findIndex(l => l.id === hash);
    if (idx !== -1 && idx !== currentLessonIndex) {
      loadLesson(idx);
    }
  });

  // Responsive: close sidebar on resize to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      closeSidebar();
    }
  });
}


/* ═══════════════════════════════════════
   BOOT
   ═══════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', init);

// If the DOM is already loaded (module defer)
if (document.readyState !== 'loading') {
  init();
}
