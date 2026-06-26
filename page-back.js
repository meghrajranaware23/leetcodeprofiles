import { getCurrentUser, waitForAuth } from './auth/auth-service.js';
import { ROUTES } from './routes.js';

const BACK_ICON = `<svg class="page-back-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>`;

export function buildPageBackHtml() {
  return `<button type="button" class="page-back-btn" id="pageBackBtn">
    ${BACK_ICON}
    <span>Back</span>
  </button>`;
}

function resolveFallback(mode) {
  if (mode === 'app') return ROUTES.packs;
  return getCurrentUser() ? ROUTES.packs : ROUTES.marketing;
}

function canUseHistoryBack() {
  if (window.history.length <= 1) return false;

  const ref = document.referrer;
  if (!ref) return false;

  try {
    return new URL(ref).origin === window.location.origin;
  } catch {
    return false;
  }
}

export function navigateBack(fallbackUrl) {
  if (canUseHistoryBack()) {
    history.back();
    return;
  }
  window.location.href = fallbackUrl;
}

export async function initPageBack(options = {}) {
  const mount = document.getElementById('page-back');
  if (!mount) return;

  const mode = options.mode || document.body.dataset.pageBack || 'auto';
  mount.className = 'page-back-bar';
  mount.innerHTML = buildPageBackHtml();
  document.body.classList.add('has-page-back');

  const btn = mount.querySelector('#pageBackBtn');
  if (!btn || btn.dataset.bound) return;
  btn.dataset.bound = '1';

  btn.addEventListener('click', async () => {
    await waitForAuth();
    const fallback = options.fallback ?? resolveFallback(mode);
    navigateBack(fallback);
  });
}
