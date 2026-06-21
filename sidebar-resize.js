/* ══════════════════════════════════════════════════════════
   SIDEBAR RESIZE — Floating edge grip (desktop only)
   ══════════════════════════════════════════════════════════ */

const STORAGE_KEY = 'ascension-sidebar-width';
const ROOT_ID = 'sidebarResize';
const DEFAULT_WIDTH = 320;
const MIN_WIDTH = 240;
const MAX_WIDTH = 560;
const DESKTOP_MQ = '(min-width: 769px)';
const EDGE_PROXIMITY = 14;

function isDesktop() {
  return window.matchMedia(DESKTOP_MQ).matches;
}

function clampWidth(px) {
  return Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, px));
}

function readStoredWidth() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw == null) return DEFAULT_WIDTH;
    const n = Number.parseInt(raw, 10);
    return Number.isFinite(n) ? clampWidth(n) : DEFAULT_WIDTH;
  } catch {
    return DEFAULT_WIDTH;
  }
}

function saveWidth(px) {
  try {
    localStorage.setItem(STORAGE_KEY, String(clampWidth(px)));
  } catch {
    /* ignore quota / private mode */
  }
}

function applyWidth(px) {
  document.documentElement.style.setProperty('--sidebar-w', `${clampWidth(px)}px`);
}

function clearInlineWidth() {
  document.documentElement.style.removeProperty('--sidebar-w');
}

function getSidebarEdge(sidebar) {
  return sidebar.getBoundingClientRect();
}

function isPointerNearEdge(sidebar, clientX, clientY) {
  const rect = getSidebarEdge(sidebar);
  return (
    Math.abs(clientX - rect.right) <= EDGE_PROXIMITY
    && clientY >= rect.top
    && clientY <= rect.bottom
  );
}

function createResizeRoot() {
  const root = document.createElement('div');
  root.id = ROOT_ID;
  root.className = 'cr-sidebar-resize';
  root.setAttribute('role', 'presentation');
  root.innerHTML = `
    <button class="cr-sidebar-resize-grip" type="button" aria-label="Resize sidebar" tabindex="-1">
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <polyline points="9 6 5 12 9 18"/>
        <polyline points="15 6 19 12 15 18"/>
      </svg>
    </button>
  `;
  document.body.appendChild(root);
  return root;
}

export function initSidebarResize() {
  const sidebar = document.getElementById('sidebar');
  if (!sidebar) return;

  sidebar.querySelector('.cr-sidebar-resize')?.remove();

  let root = document.getElementById(ROOT_ID);
  if (!root) root = createResizeRoot();

  const grip = root.querySelector('.cr-sidebar-resize-grip');
  const desktopMq = window.matchMedia(DESKTOP_MQ);
  let dragging = false;
  let startX = 0;
  let startWidth = DEFAULT_WIDTH;

  function setNearEdge(active) {
    root.classList.toggle('is-near-edge', active);
    if (grip) grip.tabIndex = active || dragging ? 0 : -1;
  }

  function syncWidthFromStorage() {
    if (!isDesktop()) {
      clearInlineWidth();
      root.hidden = true;
      setNearEdge(false);
      return;
    }
    root.hidden = false;
    applyWidth(readStoredWidth());
  }

  function updateNearEdgeFromPointer(e) {
    if (!isDesktop() || dragging) return;
    setNearEdge(isPointerNearEdge(sidebar, e.clientX, e.clientY));
  }

  function onPointerMove(e) {
    if (!dragging) return;
    applyWidth(startWidth + (e.clientX - startX));
  }

  function stopDrag(save = true) {
    if (!dragging) return;
    dragging = false;
    root.classList.remove('is-dragging');
    document.body.classList.remove('cr-sidebar-resizing');
    document.removeEventListener('pointermove', onPointerMove);
    document.removeEventListener('pointerup', endDrag);
    document.removeEventListener('pointercancel', endDrag);
    if (save && isDesktop()) {
      saveWidth(sidebar.getBoundingClientRect().width);
    }
    setNearEdge(false);
  }

  function endDrag(e) {
    try {
      grip.releasePointerCapture(e.pointerId);
    } catch {
      /* pointer may already be released */
    }
    stopDrag(true);
  }

  function startDrag(e) {
    if (!isDesktop() || e.button !== 0) return;
    e.preventDefault();
    dragging = true;
    startX = e.clientX;
    startWidth = sidebar.getBoundingClientRect().width;
    root.classList.add('is-dragging');
    setNearEdge(true);
    document.body.classList.add('cr-sidebar-resizing');
    grip.setPointerCapture(e.pointerId);
    document.addEventListener('pointermove', onPointerMove);
    document.addEventListener('pointerup', endDrag);
    document.addEventListener('pointercancel', endDrag);
  }

  function onDesktopChange(e) {
    if (e.matches) {
      syncWidthFromStorage();
    } else {
      stopDrag(false);
      clearInlineWidth();
      root.hidden = true;
      setNearEdge(false);
    }
  }

  function onPointerLeaveWindow() {
    if (!dragging) setNearEdge(false);
  }

  grip.addEventListener('pointerdown', startDrag);
  root.addEventListener('pointerdown', (e) => {
    if (e.target === root) startDrag(e);
  });
  grip.addEventListener('focus', () => setNearEdge(true));
  grip.addEventListener('blur', () => {
    if (!dragging) setNearEdge(false);
  });

  document.addEventListener('pointermove', updateNearEdgeFromPointer, { passive: true });
  document.addEventListener('pointerleave', onPointerLeaveWindow);
  desktopMq.addEventListener('change', onDesktopChange);

  syncWidthFromStorage();
}
