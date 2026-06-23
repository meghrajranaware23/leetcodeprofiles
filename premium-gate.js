/* ══════════════════════════════════════════════════════════
   PREMIUM GATE — Upgrade screen for locked pack content
   ══════════════════════════════════════════════════════════ */

import { PRICING_URL } from './routes.js';
import { PACK_REGISTRY } from './progress-store.js';
import { normalizePackId } from './auth/entitlements-service.js';

const DEFAULT_BENEFITS = Object.freeze([
  'All premium ascension packs unlocked',
  '30-day structured curriculum per pack',
  'All 6 ranks (E → S)',
  'C++, Python & Java solutions',
  'Cancel anytime — billed via PayPal',
]);

/**
 * @param {HTMLElement} contentEl
 * @param {{ packId: string, packTitle?: string, lesson?: { title?: string } }} options
 */
export function renderPremiumGate(contentEl, { packId, packTitle, lesson }) {
  if (!contentEl) return;

  const id = normalizePackId(packId);
  const registry = PACK_REGISTRY[id];
  const title = packTitle || registry?.shortTitle || registry?.title || 'this pack';
  const lessonName = lesson?.title ? `"${lesson.title}"` : 'This lesson';

  const benefitsHtml = DEFAULT_BENEFITS.map(
    b => `<li><span class="cr-premium-gate-check" aria-hidden="true">✓</span>${b}</li>`
  ).join('');

  contentEl.innerHTML = `
    <div class="cr-premium-gate" role="region" aria-labelledby="premium-gate-heading">
      <div class="cr-premium-gate-inner">
        <div class="cr-premium-gate-icon-wrap" aria-hidden="true">
          <div class="cr-premium-gate-icon-ring"></div>
          <svg class="cr-premium-gate-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
        </div>
        <p class="cr-premium-gate-overline">PREMIUM CONTENT</p>
        <h1 class="cr-premium-gate-heading" id="premium-gate-heading">Unlock ${escapeHtml(title)}</h1>
        <p class="cr-premium-gate-lead">
          ${escapeHtml(lessonName)} is part of the full pack. Subscribe to Full Arsenal to continue your ascension.
        </p>
        <ul class="cr-premium-gate-benefits">${benefitsHtml}</ul>
        <a href="${PRICING_URL}" class="cr-premium-gate-cta">
          Subscribe &amp; Unlock →
        </a>
      </div>
    </div>
  `;

  contentEl.classList.remove('fade-in');
  void contentEl.offsetWidth;
  contentEl.classList.add('fade-in');
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
