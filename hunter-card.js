import { toPng } from 'html-to-image';
import { getAllPacksSorted } from './pack-catalog.js';
import {
  getHunterTitle,
  getPeakRankLabel,
  getRankCssClass,
  getRankPillLabel,
} from './rank-display.js';

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function getInitials(displayName, email) {
  const source = displayName || email || '?';
  const parts = source.trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return source.slice(0, 2).toUpperCase();
}

function buildPackRowsHtml(summaries) {
  const byId = new Map(summaries.map(s => [s.packId, s]));
  const packs = getAllPacksSorted();

  return packs.map((pack) => {
    const summary = byId.get(pack.id);
    const hasProgress = summary?.hasProgress;
    const rankLabel = hasProgress ? getRankPillLabel(summary.currentRank) : 'Not Started';
    const rankClass = hasProgress ? getRankCssClass(summary.currentRank) : 'rank-none';
    const percent = summary?.completionPercent ?? 0;
    const xp = summary?.totalXp != null ? `${summary.totalXp.toLocaleString()} XP` : '0 XP';

    return `
      <div class="hunter-card-row${hasProgress ? ' hunter-card-row--active' : ''}">
        <span class="hunter-card-row-icon">${pack.icon}</span>
        <div class="hunter-card-row-body">
          <div class="hunter-card-row-top">
            <span class="hunter-card-row-title">${escapeHtml(pack.shortTitle)}</span>
            <span class="pack-rank-pill ${rankClass}">${escapeHtml(rankLabel)}</span>
          </div>
          <div class="hunter-card-row-bar">
            <div class="hunter-card-row-fill" style="width: ${percent}%"></div>
          </div>
          <span class="hunter-card-row-meta">${percent}% · ${xp}</span>
        </div>
      </div>
    `;
  }).join('');
}

export function renderHunterCard(user, summaries) {
  const mount = document.getElementById('hunterCard');
  if (!mount || !user) return;

  const displayName = escapeHtml(user.displayName || 'Hunter');
  const photoURL = user.photoURL ? escapeHtml(user.photoURL) : '';
  const initials = escapeHtml(getInitials(user.displayName, user.email));
  const totalXp = summaries.reduce((sum, s) => sum + (s.totalXp || 0), 0);
  const hunterTitle = getHunterTitle(summaries);
  const peakRank = getPeakRankLabel(summaries);
  const activeCount = summaries.filter(s => s.hasProgress).length;

  const avatarHtml = photoURL
    ? `<img class="hunter-card-avatar" src="${photoURL}" alt="" width="88" height="88" referrerpolicy="no-referrer">`
    : `<span class="hunter-card-initials">${initials}</span>`;

  mount.innerHTML = `
    <div class="hunter-card-export" id="hunterCardExport">
      <div class="hunter-card-header">
        <span class="hunter-card-brand">HUNTER PROFILE</span>
        <span class="hunter-card-site">leetcodeprofiles.com</span>
      </div>
      <div class="hunter-card-identity">
        ${avatarHtml}
        <h1 class="hunter-card-name">${displayName}</h1>
        <p class="hunter-card-title">${escapeHtml(hunterTitle)}</p>
      </div>
      <div class="hunter-card-stats">
        <div class="hunter-card-stat">
          <span class="hunter-card-stat-label">Total XP</span>
          <span class="hunter-card-stat-value">${totalXp.toLocaleString()}</span>
        </div>
        <div class="hunter-card-stat">
          <span class="hunter-card-stat-label">Peak Rank</span>
          <span class="hunter-card-stat-value">${escapeHtml(peakRank)}</span>
        </div>
        <div class="hunter-card-stat">
          <span class="hunter-card-stat-label">Active Packs</span>
          <span class="hunter-card-stat-value">${activeCount}</span>
        </div>
      </div>
      <div class="hunter-card-ranks">
        <div class="hunter-card-ranks-label">RANK GRID</div>
        ${buildPackRowsHtml(summaries)}
      </div>
      <div class="hunter-card-footer">
        <span>Grind daily. Rank up. Prove it.</span>
      </div>
    </div>
  `;
}

async function captureCardBlob() {
  const node = document.getElementById('hunterCardExport');
  if (!node) throw new Error('Hunter card not ready');

  const dataUrl = await toPng(node, {
    cacheBust: true,
    pixelRatio: 2,
    backgroundColor: '#0a0a0a',
  });

  const res = await fetch(dataUrl);
  return res.blob();
}

export async function downloadHunterCard() {
  const blob = await captureCardBlob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.download = 'leetcode-profiles-hunter-card.png';
  link.href = url;
  link.click();
  URL.revokeObjectURL(url);
}

export async function shareHunterCard() {
  const blob = await captureCardBlob();
  const file = new File([blob], 'leetcode-profiles-hunter-card.png', { type: 'image/png' });

  if (navigator.share && navigator.canShare?.({ files: [file] })) {
    await navigator.share({
      title: 'My LeetCode Profiles Hunter Card',
      text: 'Check out my rank progress on LeetCode Profiles.',
      files: [file],
    });
    return;
  }

  await downloadHunterCard();
}

export function bindHunterCardActions() {
  document.getElementById('hunterCardDownload')?.addEventListener('click', () => {
    downloadHunterCard().catch((err) => console.error('Download failed:', err));
  });

  document.getElementById('hunterCardShare')?.addEventListener('click', () => {
    shareHunterCard().catch((err) => console.error('Share failed:', err));
  });
}
