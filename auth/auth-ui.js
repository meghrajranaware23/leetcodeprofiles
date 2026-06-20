import { getCurrentUser, signOutUser, signInWithGoogle, waitForAuth } from './auth-service.js';
import { getAuthErrorMessage, isPopupCancelledError } from './auth-errors.js';

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

function closeAllProfileMenus() {
  document.querySelectorAll('.auth-profile-menu.open').forEach((menu) => {
    menu.classList.remove('open');
    menu.hidden = true;
    const btn = menu.closest('.auth-profile')?.querySelector('.auth-profile-btn');
    btn?.setAttribute('aria-expanded', 'false');
  });
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

  menu.querySelector('.auth-sign-out-btn')?.addEventListener('click', async () => {
    closeAllProfileMenus();
    await signOutUser();
    window.location.href = './index.html';
  });
}

function renderProfileHtml(user, { compact = false } = {}) {
  const displayName = escapeHtml(user.displayName || 'Grinder');
  const email = escapeHtml(user.email || '');
  const initials = escapeHtml(getInitials(user.displayName, user.email));
  const photoURL = user.photoURL ? escapeHtml(user.photoURL) : '';
  const avatar = photoURL
    ? `<img class="auth-profile-avatar" src="${photoURL}" alt="" width="32" height="32" referrerpolicy="no-referrer">`
    : `<span class="auth-profile-initials" aria-hidden="true">${initials}</span>`;

  const compactClass = compact ? ' auth-profile--compact' : '';

  return `
    <div class="auth-profile${compactClass}">
      <button class="auth-profile-btn" type="button" aria-label="Account menu" aria-haspopup="true" aria-expanded="false">
        ${avatar}
      </button>
      <div class="auth-profile-menu" hidden>
        <div class="auth-profile-info">
          <span class="auth-profile-name">${displayName}</span>
          ${email ? `<span class="auth-profile-email">${email}</span>` : ''}
        </div>
        <button class="auth-sign-out-btn" type="button">Sign out</button>
      </div>
    </div>
  `;
}

export function mountProfileMenu(mountId, options = {}) {
  const mount = document.getElementById(mountId);
  if (!mount) return;

  waitForAuth().then(() => {
    const user = getCurrentUser();
    if (!user) {
      mount.innerHTML = '';
      return;
    }

    mount.innerHTML = renderProfileHtml(user, options);
    bindProfileMenu(mount);

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
