import { getContinueNavContext } from '../progress-facade.js';
import { getRankPillLabel } from '../rank-display.js';

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

function renderEmptyState() {
  return `
    <div class="courses-progress-empty">
      <p class="courses-progress-empty-title">No packs in progress yet</p>
      <p class="courses-progress-empty-text">Start a pack from the Packs tab and pick up right where you left off from here.</p>
      <button type="button" class="courses-progress-empty-link" data-courses-tab-jump="packs">Browse packs →</button>
    </div>
  `;
}

function renderProgressContent(ctx) {
  if (!ctx.primary) return renderEmptyState();

  const rankLabel = getRankPillLabel(ctx.primary.currentRank);
  const progressPct = ctx.primary.completionPercent ?? 0;
  const progressMeta = ctx.primary.totalLessons != null
    ? `${ctx.primary.completedCount}/${ctx.primary.totalLessons} lessons`
    : `${ctx.primary.completedCount} lessons`;

  const dayRow = ctx.dayLabel
    ? `<div class="courses-progress-row"><span class="courses-progress-label">Current Day</span><span class="courses-progress-value">${escapeHtml(ctx.dayLabel)}</span></div>`
    : '';

  let recentHtml = '';
  if (ctx.recent.length > 0) {
    recentHtml = `<div class="courses-progress-recent"><p class="courses-progress-recent-label">Recent</p>`;
    recentHtml += ctx.recent.map((item) => `
      <a href="${escapeHtml(item.continueUrl)}" class="courses-progress-recent-item">
        <span class="courses-progress-recent-title">${escapeHtml(item.summary.packTitle)}</span>
        <span class="courses-progress-recent-meta">${escapeHtml(getRankPillLabel(item.summary.currentRank))}${item.dayLabel ? ` · ${escapeHtml(item.dayLabel)}` : ''}</span>
      </a>
    `).join('');
    recentHtml += '</div>';
  }

  return `
    <div class="courses-progress-inner">
      <header class="courses-progress-header">
        <div class="section-overline">CONTINUE GRINDING</div>
        <h1 class="courses-progress-title">IN PROGRESS</h1>
      </header>
      <article class="courses-progress-card">
        <div class="courses-progress-pack">${escapeHtml(ctx.primary.packTitle)}</div>
        <div class="courses-progress-row">
          <span class="courses-progress-label">Rank</span>
          <span class="courses-progress-value">${escapeHtml(rankLabel)}</span>
        </div>
        ${dayRow}
        <div class="courses-progress-row">
          <span class="courses-progress-label">Current Lesson</span>
          <span class="courses-progress-value courses-progress-value--lesson">${escapeHtml(getLessonLabel(ctx.primary))}</span>
        </div>
        <div class="courses-progress-bar-wrap">
          <div class="courses-progress-bar">
            <div class="courses-progress-fill" style="width: ${progressPct}%"></div>
          </div>
          <span class="courses-progress-meta">${escapeHtml(progressMeta)} · ${progressPct}%</span>
        </div>
        <a href="${escapeHtml(ctx.continueUrl)}" class="courses-progress-continue">Continue Learning →</a>
      </article>
      ${recentHtml}
    </div>
  `;
}

export async function initProgressPanel(root) {
  const mount = root.querySelector('[data-progress-mount]') || root;
  mount.innerHTML = '<div class="courses-progress-loading">Loading progress…</div>';
  await renderProgressPanel(root);
}

export async function renderProgressPanel(root) {
  const mount = root.querySelector('[data-progress-mount]') || root;
  const ctx = await getContinueNavContext();
  mount.innerHTML = renderProgressContent(ctx);

  mount.querySelector('[data-courses-tab-jump="packs"]')?.addEventListener('click', () => {
    window.dispatchEvent(new CustomEvent('courses:navigate-tab', { detail: { tab: 'packs' } }));
  });
}

export async function refreshProgressPanel(root) {
  await renderProgressPanel(root);
}
