/* ══════════════════════════════════════════════════════════
   READER NAV — Cross-pack switcher for course readers
   ══════════════════════════════════════════════════════════ */

import './firebase.js';
import { PACK_CATALOG, getAllPacksSorted } from './pack-catalog.js';

export function initReaderNav(currentPackId) {
  const backBtn = document.getElementById('backBtn');
  if (backBtn) {
    backBtn.href = './packs.html';
    backBtn.setAttribute('aria-label', 'Back to all packs');
    const label = backBtn.querySelector('span');
    if (label) label.textContent = 'All Packs';
  }

  const mount = document.getElementById('packSwitcher');
  if (!mount) return;

  const packs = getAllPacksSorted();
  const current = PACK_CATALOG.find(p => p.id === currentPackId);

  mount.innerHTML = `
    <div class="cr-pack-switcher-inner">
      <button class="cr-pack-switcher-btn" id="packSwitcherBtn" type="button" aria-haspopup="true" aria-expanded="false">
        <span class="cr-pack-switcher-icon">${current?.icon || '📦'}</span>
        <span class="cr-pack-switcher-label">${current?.shortTitle || 'Pack'}</span>
        <svg class="cr-pack-switcher-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
      </button>
      <div class="cr-pack-switcher-menu" id="packSwitcherMenu" hidden>
        <div class="cr-pack-switcher-menu-header">Switch Pack</div>
        ${packs.map(pack => `
          <a href="${pack.readerUrl}"
             class="cr-pack-switcher-item${pack.id === currentPackId ? ' is-current' : ''}"
             ${pack.id === currentPackId ? 'aria-current="page"' : ''}>
            <span class="cr-pack-switcher-item-icon">${pack.icon}</span>
            <span class="cr-pack-switcher-item-text">
              <span class="cr-pack-switcher-item-title">${pack.title}</span>
              <span class="cr-pack-switcher-item-meta">${pack.duration}${pack.kind === 'onboarding' ? ' · Beginner' : ' · 6 Ranks'}</span>
            </span>
            ${pack.id === currentPackId ? '<span class="cr-pack-switcher-current">Current</span>' : ''}
          </a>
        `).join('')}
        <a href="./packs.html" class="cr-pack-switcher-catalog">View All Packs →</a>
      </div>
    </div>
  `;

  const btn = document.getElementById('packSwitcherBtn');
  const menu = document.getElementById('packSwitcherMenu');
  if (!btn || !menu) return;

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const open = !menu.hidden;
    menu.hidden = open;
    btn.setAttribute('aria-expanded', String(!open));
    btn.classList.toggle('open', !open);
  });

  document.addEventListener('click', () => {
    menu.hidden = true;
    btn.setAttribute('aria-expanded', 'false');
    btn.classList.remove('open');
  });

  menu.addEventListener('click', (e) => e.stopPropagation());
}
