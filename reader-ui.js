/* ══════════════════════════════════════════════════════════
   READER UI — Shared accessibility helpers for course readers
   ══════════════════════════════════════════════════════════ */

let milestoneOpen = false;
let previousFocus = null;

export function isMilestoneOpen() {
  return milestoneOpen;
}

export function activateMilestoneDialog(focusTarget) {
  milestoneOpen = true;
  previousFocus = document.activeElement;
  requestAnimationFrame(() => {
    focusTarget?.focus();
  });
}

export function deactivateMilestoneDialog() {
  milestoneOpen = false;
  if (previousFocus && typeof previousFocus.focus === 'function') {
    previousFocus.focus();
  }
  previousFocus = null;
}

export function initMilestoneDialog({ overlay, milestoneBtn, hideMilestone }) {
  if (!overlay) return;

  overlay.addEventListener('keydown', (e) => {
    if (overlay.hidden || e.key !== 'Tab') return;

    const focusable = overlay.querySelectorAll(
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && milestoneOpen) {
      e.preventDefault();
      hideMilestone();
    }
  });
}
