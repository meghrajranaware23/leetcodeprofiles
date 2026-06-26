import { getCurrentUser, signOutUser, signInWithGoogle, waitForAuth } from './auth-service.js';
import { getAuthErrorMessage, isPopupCancelledError } from './auth-errors.js';
import { getAllPackSummaries } from '../progress-facade.js';
import { formatProfileProgressLine } from '../rank-display.js';
import { ROUTES } from '../routes.js';
import {
  initEntitlements,
  hasActiveSubscription,
  getSubscription,
  areEntitlementsReady,
  onEntitlementsChanged,
} from './entitlements-service.js';
import { navigateToSubscriptionSection } from '../checkout/pricing-navigation.js';
import { openProMemberDialog, showUpgradeDialog } from './upgrade-dialog.js';

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
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return source.slice(0, 2).toUpperCase();
}

const CROWN_ICON = `
  <svg class="auth-profile-upgrade-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M3 18h18l-2-9-5 4-4-6-4 6-5-4-2 9z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
    <path d="M5 20h14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
  </svg>
`;

const activeMounts = new Map();
let entitlementsPromise = null;
let entitlementsListenerBound = false;
let cachedProgressLine = null;
let progressLinePromise = null;

function closeAllProfileMenus() {
  document.querySelectorAll('.auth-profile-menu.open').forEach((menu) => {
    menu.classList.remove('open');
    menu.hidden = true;
    const btn = menu.closest('.auth-profile')?.querySelector('.auth-profile-btn');
    btn?.setAttribute('aria-expanded', 'false');
  });
}

function closeMobileNav() {
  const mobileMenu = document.getElementById('mobile-menu');
  const hamburger = document.getElementById('hamburger');
  if (!mobileMenu?.classList.contains('active')) return;

  mobileMenu.classList.remove('active');
  hamburger?.classList.remove('active');
  hamburger?.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

function ensureEntitlements() {
  if (!entitlementsPromise) {
    entitlementsPromise = initEntitlements();
  }
  return entitlementsPromise;
}

function bindEntitlementsRefresh() {
  if (entitlementsListenerBound) return;
  entitlementsListenerBound = true;

  onEntitlementsChanged(() => {
    rerenderAllProfileMenus();
  });
}

async function getProgressLine() {
  if (cachedProgressLine !== null) return cachedProgressLine;
  if (!progressLinePromise) {
    progressLinePromise = loadProgressLine().then((line) => {
      cachedProgressLine = line;
      return line;
    });
  }
  return progressLinePromise;
}

async function handleUpgradeClick() {
  closeAllProfileMenus();
  closeMobileNav();

  if (!areEntitlementsReady()) {
    showUpgradeDialog(null, { loading: true });
    try {
      await ensureEntitlements();
    } catch {
      showUpgradeDialog(null, {
        error: 'Could not load subscription status. Please try again.',
      });
      return;
    }
  }

  if (hasActiveSubscription()) {
    openProMemberDialog(getSubscription());
    return;
  }

  navigateToSubscriptionSection({ highlight: true });
}

function bindProfileMenu(container) {
  const btn = container.querySelector('.auth-profile-btn');
  const menu = container.querySelector('.auth-profile-menu');
  if (!btn || !menu) return;

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const willOpen = menu.hidden;
    closeAllProfileMenus();
    menu.hidden = !willOpen;
    menu.classList.toggle('open', willOpen);
    btn.setAttribute('aria-expanded', String(willOpen));
  });

  menu.querySelectorAll('.auth-profile-link').forEach((link) => {
    link.addEventListener('click', () => {
      closeAllProfileMenus();
      closeMobileNav();
    });
  });

  menu.querySelector('[data-auth-upgrade-btn]')?.addEventListener('click', () => {
    handleUpgradeClick();
  });

  menu.querySelector('.auth-sign-out-btn')?.addEventListener('click', async () => {
    closeAllProfileMenus();
    closeMobileNav();
    await signOutUser();
    window.location.href = ROUTES.marketing;
  });
}

function renderProfileHtml(user, {
  compact = false,
  progressLine = '',
  isSubscribed = false,
  entitlementsLoading = false,
} = {}) {
  const displayName = escapeHtml(user.displayName || 'Grinder');
  const email = escapeHtml(user.email || '');
  const initials = escapeHtml(getInitials(user.displayName, user.email));
  const photoURL = user.photoURL ? escapeHtml(user.photoURL) : '';
  const avatar = photoURL
    ? `<img class="auth-profile-avatar" src="${photoURL}" alt="" width="32" height="32" referrerpolicy="no-referrer">`
    : `<span class="auth-profile-initials" aria-hidden="true">${initials}</span>`;

  const compactClass = compact ? ' auth-profile--compact' : '';
  const progressHtml = progressLine
    ? `<span class="auth-profile-progress">${escapeHtml(progressLine)}</span>`
    : '';
  const proBadgeHtml = isSubscribed
    ? '<span class="auth-profile-pro-badge">PRO</span>'
    : '';
  const upgradeBusy = entitlementsLoading ? ' aria-busy="true" disabled' : '';
  const upgradeLabel = entitlementsLoading ? 'Checking…' : 'Upgrade';

  return `
    <div class="auth-profile${compactClass}">
      <button class="auth-profile-btn" type="button" aria-label="Account menu" aria-haspopup="true" aria-expanded="false">
        ${avatar}
      </button>
      <div class="auth-profile-menu" hidden>
        <div class="auth-profile-info">
          <div class="auth-profile-name-row">
            <span class="auth-profile-name">${displayName}</span>
            ${proBadgeHtml}
          </div>
          ${email ? `<span class="auth-profile-email">${email}</span>` : ''}
          ${progressHtml}
        </div>
        <a href="${ROUTES.profile}" class="auth-profile-link">Profile</a>
        <button type="button" class="auth-profile-upgrade" data-auth-upgrade-btn${upgradeBusy}>
          ${CROWN_ICON}
          <span>${upgradeLabel}</span>
        </button>
        <button class="auth-sign-out-btn" type="button">Sign Out</button>
      </div>
    </div>
  `;
}

async function loadProgressLine() {
  try {
    const summaries = await getAllPackSummaries();
    return formatProfileProgressLine(summaries);
  } catch {
    return '';
  }
}

async function renderAndBindMount(mount, options = {}) {
  const user = getCurrentUser();
  if (!user) {
    mount.innerHTML = '';
    return;
  }

  const { summaries, deferProgressLine, ...renderOptions } = options;
  let progressLine = summaries
    ? formatProfileProgressLine(summaries)
    : '';

  if (!progressLine && !deferProgressLine) {
    progressLine = await getProgressLine();
  }

  mount.innerHTML = renderProfileHtml(user, {
    ...renderOptions,
    progressLine,
    isSubscribed: hasActiveSubscription(),
    entitlementsLoading: !areEntitlementsReady(),
  });
  bindProfileMenu(mount);

  if (deferProgressLine && !summaries && !progressLine) {
    getProgressLine().then((line) => {
      if (!line || !getCurrentUser()) return;
      const info = mount.querySelector('.auth-profile-info');
      if (!info || info.querySelector('.auth-profile-progress')) return;
      const el = document.createElement('span');
      el.className = 'auth-profile-progress';
      el.textContent = line;
      info.appendChild(el);
    });
  }
}

function rerenderAllProfileMenus() {
  for (const { mount, options } of activeMounts.values()) {
    renderAndBindMount(mount, options);
  }
}

export function mountProfileMenu(mountId, options = {}) {
  const mount = document.getElementById(mountId);
  if (!mount) return;

  activeMounts.set(mountId, { mount, options });

  waitForAuth().then(async () => {
    const user = getCurrentUser();
    if (!user) {
      mount.innerHTML = '';
      activeMounts.delete(mountId);
      return;
    }

    bindEntitlementsRefresh();
    ensureEntitlements();
    await renderAndBindMount(mount, options);

    if (!document.body.dataset.authProfileBound) {
      document.body.dataset.authProfileBound = 'true';
      document.addEventListener('click', closeAllProfileMenus);
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeAllProfileMenus();
      });
    }
  });
}

export function initSignInPage({
  formEl,
  buttonEl,
  errorEl,
  onSuccess,
}) {
  if (!formEl || !buttonEl) return;

  let busy = false;

  const setBusy = (loading) => {
    busy = loading;
    buttonEl.disabled = loading;
    buttonEl.classList.toggle('is-loading', loading);
    buttonEl.setAttribute('aria-busy', String(loading));
  };

  const showError = (message) => {
    if (!errorEl) return;
    if (!message) {
      errorEl.hidden = true;
      errorEl.textContent = '';
      return;
    }
    errorEl.hidden = false;
    errorEl.textContent = message;
  };

  formEl.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (busy) return;

    showError('');
    setBusy(true);

    try {
      const user = await signInWithGoogle();
      if (user) {
        onSuccess?.(user);
      }
    } catch (err) {
      if (!isPopupCancelledError(err)) {
        showError(getAuthErrorMessage(err));
      }
      setBusy(false);
    }
  });
}
