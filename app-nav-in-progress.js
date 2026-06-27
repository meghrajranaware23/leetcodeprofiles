import { getContinueNavContext } from './progress-facade.js';
import { getRankPillLabel } from './rank-display.js';
import { ROUTES } from './routes.js';
import { closeAllProfileMenus } from './auth/auth-ui.js';
import { closeNavDropdown } from './nav-dropdown.js';

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function getLessonLabel(summary) {
  if (summary.lastVisited?.title) {
    const icon = summary.lastVisited.icon || '📄';
    return `${icon} ${summary.lastVisited.title}`;
  }
  if (summary.recommendedNext?.title) {
    const icon = summary.recommendedNext.icon || '📄';
    return `${icon} ${summary.recommendedNext.title}`;
  }
  return 'Continue where you left off';
}

function renderProgressCard({ summary, continueUrl, dayLabel, featured = false }) {
  const rankLabel = getRankPillLabel(summary.currentRank);
  const progressPct = summary.completionPercent ?? 0;
  const progressMeta = summary.totalLessons != null
    ? `${summary.completedCount}/${summary.totalLessons} lessons`
    : `${summary.completedCount} lessons`;

  const dayRow = dayLabel
    ? `<div class="app-nav-progress-row"><span class="app-nav-progress-label">Current</span><span class="app-nav-progress-value">${escapeHtml(dayLabel)}</span></div>`
    : '';

  const featuredClass = featured ? ' app-nav-progress-card--featured' : '';

  return `
    <article class="app-nav-progress-card${featuredClass}">
      <div class="app-nav-progress-pack">${escapeHtml(summary.packTitle)}</div>
      <div class="app-nav-progress-row">
        <span class="app-nav-progress-label">Rank</span>
        <span class="app-nav-progress-value">${escapeHtml(rankLabel)}</span>
      </div>
      ${dayRow}
      <div class="app-nav-progress-row">
        <span class="app-nav-progress-label">Lesson</span>
        <span class="app-nav-progress-value app-nav-progress-value--lesson">${escapeHtml(getLessonLabel(summary))}</span>
      </div>
      <div class="app-nav-progress-bar-wrap">
        <div class="app-nav-progress-bar">
          <div class="app-nav-progress-fill" style="width: ${progressPct}%"></div>
        </div>
        <span class="app-nav-progress-meta">${escapeHtml(progressMeta)} · ${progressPct}%</span>
      </div>
      <a href="${escapeHtml(continueUrl)}" class="app-nav-progress-continue">Continue Learning →</a>
    </article>
  `;
}

function renderEmptyState({ mobile = false } = {}) {
  const linkClass = mobile ? 'in-progress-sheet-empty-link' : 'app-nav-progress-empty-link';
  return `
    <div class="${mobile ? 'in-progress-sheet-empty' : 'app-nav-progress-empty'}">
      <p class="${mobile ? 'in-progress-sheet-empty-title' : 'app-nav-progress-empty-title'}">No packs in progress yet</p>
      <p class="${mobile ? 'in-progress-sheet-empty-text' : 'app-nav-progress-empty-text'}">Start a pack below and pick up right where you left off from here.</p>
      <a href="${ROUTES.courses}" class="${linkClass}">Browse packs →</a>
    </div>
  `;
}

function renderMobileSheetContent(ctx) {
  if (!ctx.primary) {
    return renderEmptyState({ mobile: true });
  }

  const dayRow = ctx.dayLabel
    ? `<div class="in-progress-sheet-row">
        <span class="in-progress-sheet-label">Current Day</span>
        <span class="in-progress-sheet-value">${escapeHtml(ctx.dayLabel)}</span>
      </div>`
    : '';

  return `
    <div class="in-progress-sheet-body">
      <div class="in-progress-sheet-pack">${escapeHtml(ctx.primary.packTitle)}</div>
      ${dayRow}
      <div class="in-progress-sheet-row">
        <span class="in-progress-sheet-label">Current Lesson</span>
        <span class="in-progress-sheet-value in-progress-sheet-value--lesson">${escapeHtml(getLessonLabel(ctx.primary))}</span>
      </div>
      <a href="${escapeHtml(ctx.continueUrl)}" class="in-progress-sheet-continue">Continue Learning →</a>
    </div>
  `;
}

async function buildProgressHtml() {
  const ctx = await getContinueNavContext();
  if (!ctx.primary) {
    return renderEmptyState();
  }

  let html = renderProgressCard({
    summary: ctx.primary,
    continueUrl: ctx.continueUrl,
    dayLabel: ctx.dayLabel,
    featured: true,
  });

  if (ctx.recent.length > 0) {
    html += `<div class="app-nav-progress-recent"><p class="app-nav-progress-recent-label">Recent</p>`;
    html += ctx.recent.map((item) => `
      <a href="${escapeHtml(item.continueUrl)}" class="app-nav-progress-recent-item">
        <span class="app-nav-progress-recent-title">${escapeHtml(item.summary.packTitle)}</span>
        <span class="app-nav-progress-recent-meta">${escapeHtml(getRankPillLabel(item.summary.currentRank))}${item.dayLabel ? ` · ${escapeHtml(item.dayLabel)}` : ''}</span>
      </a>
    `).join('');
    html += '</div>';
  }

  return html;
}

let sheetEl = null;
let sheetOpen = false;

function ensureInProgressSheet() {
  if (sheetEl) return sheetEl;

  sheetEl = document.createElement('div');
  sheetEl.id = 'in-progress-sheet';
  sheetEl.className = 'in-progress-sheet';
  sheetEl.hidden = true;
  sheetEl.innerHTML = `
    <div class="in-progress-sheet__backdrop" data-in-progress-sheet-close></div>
    <div class="in-progress-sheet__panel" role="dialog" aria-labelledby="inProgressSheetTitle" aria-modal="true">
      <div class="in-progress-sheet__handle" aria-hidden="true"></div>
      <div class="in-progress-sheet__header">
        <h2 id="inProgressSheetTitle" class="in-progress-sheet__title">In Progress</h2>
        <button type="button" class="in-progress-sheet__close" data-in-progress-sheet-close aria-label="Close">&times;</button>
      </div>
      <div class="in-progress-sheet__content" data-in-progress-sheet-content></div>
    </div>
  `;
  document.body.appendChild(sheetEl);

  sheetEl.querySelectorAll('[data-in-progress-sheet-close]').forEach((el) => {
    el.addEventListener('click', () => closeInProgressSheet());
  });

  sheetEl.querySelector('.in-progress-sheet__content')?.addEventListener('click', (e) => {
    if (e.target.closest('.in-progress-sheet-continue, .in-progress-sheet-empty-link')) {
      closeInProgressSheet();
    }
  });

  return sheetEl;
}

export function closeInProgressSheet() {
  if (!sheetEl || sheetEl.hidden) return;
  sheetEl.hidden = true;
  sheetEl.classList.remove('open');
  sheetOpen = false;
  document.body.classList.remove('in-progress-sheet-open');
}

async function renderMobileSheet() {
  const sheet = ensureInProgressSheet();
  const content = sheet.querySelector('[data-in-progress-sheet-content]');
  if (!content) return;
  const ctx = await getContinueNavContext();
  content.innerHTML = renderMobileSheetContent(ctx);
}

export async function openInProgressSheet() {
  closeInProgressPopover();
  closeAllProfileMenus();
  closeMobileNav();

  const sheet = ensureInProgressSheet();
  await renderMobileSheet();
  sheet.hidden = false;
  requestAnimationFrame(() => sheet.classList.add('open'));
  sheetOpen = true;
  document.body.classList.add('in-progress-sheet-open');
  sheet.querySelector('.in-progress-sheet__close')?.focus();
}

export function closeInProgressPopover() {
  const popover = document.querySelector('[data-in-progress-popover]');
  const trigger = document.querySelector('[data-in-progress-trigger]');
  if (!popover || popover.hidden) return;

  popover.hidden = true;
  popover.classList.remove('open');
  trigger?.setAttribute('aria-expanded', 'false');
}

async function renderDesktopPopover() {
  const popover = document.querySelector('[data-in-progress-popover]');
  if (!popover) return;
  popover.innerHTML = await buildProgressHtml();
}

async function refreshInProgressNav() {
  await renderDesktopPopover();
  if (sheetOpen && sheetEl) {
    await renderMobileSheet();
  }
}

function bindDesktopTrigger() {
  const trigger = document.querySelector('[data-in-progress-trigger]');
  const popover = document.querySelector('[data-in-progress-popover]');
  if (!trigger || !popover || trigger.dataset.bound) return;
  trigger.dataset.bound = '1';

  trigger.addEventListener('click', async (e) => {
    e.stopPropagation();
    const willOpen = popover.hidden;
    closeInProgressPopover();
    closeInProgressSheet();
    closeAllProfileMenus();

    if (willOpen) {
      await renderDesktopPopover();
      popover.hidden = false;
      popover.classList.add('open');
      trigger.setAttribute('aria-expanded', 'true');
    }
  });

  popover.addEventListener('click', (e) => {
    if (e.target.closest('.app-nav-progress-continue, .app-nav-progress-recent-item, .app-nav-progress-empty-link')) {
      closeInProgressPopover();
    }
  });
}

function bindMobileTrigger() {
  const trigger = document.querySelector('[data-mobile-in-progress-trigger]');
  if (!trigger || trigger.dataset.bound) return;
  trigger.dataset.bound = '1';

  trigger.addEventListener('click', async (e) => {
    e.stopPropagation();
    closeMobileNav();
    await openInProgressSheet();
  });
}

function closeMobileNav() {
  closeNavDropdown('siteNavDropdown');
}

function bindGlobalClose() {
  if (document.body.dataset.inProgressNavBound) return;
  document.body.dataset.inProgressNavBound = 'true';

  document.addEventListener('click', (e) => {
    if (e.target.closest('[data-in-progress-trigger]') || e.target.closest('[data-in-progress-popover]')) {
      return;
    }
    closeInProgressPopover();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeInProgressPopover();
      closeInProgressSheet();
    }
  });
}

export function initInProgressNav() {
  bindDesktopTrigger();
  bindMobileTrigger();
  bindGlobalClose();
  refreshInProgressNav();
  return { refresh: refreshInProgressNav };
}

export { refreshInProgressNav };
