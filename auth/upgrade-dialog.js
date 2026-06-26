import {
  formatPlanLabel,
  formatBillingInterval,
  formatDate,
  getSubscriptionStatusLabel,
  fetchRuntimeConfig,
} from '../checkout/subscription-status.js';
import { navigateToSubscriptionSection } from '../checkout/pricing-navigation.js';

const PAYPAL_MANAGE_URLS = {
  live: 'https://www.paypal.com/myaccount/autopay/',
  sandbox: 'https://www.sandbox.paypal.com/myaccount/autopay/',
};

let dialogEl = null;

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildDetailRow(label, value) {
  return `
    <div class="upgrade-dialog__row">
      <span class="upgrade-dialog__label">${escapeHtml(label)}</span>
      <span class="upgrade-dialog__value">${escapeHtml(value)}</span>
    </div>
  `;
}

function buildProviderLabel(provider) {
  return provider === 'razorpay' ? 'Razorpay' : 'PayPal';
}

function buildPlanIntervalLabel(subscription) {
  const interval = formatBillingInterval(subscription?.billingInterval);
  if (interval === 'month') return 'Monthly';
  if (interval === 'year') return 'Yearly';
  return interval || '—';
}

function renderDialogBody(subscription, { error = null, loading = false } = {}) {
  if (loading) {
    return `
      <div class="upgrade-dialog__loading" role="status">
        <span class="upgrade-dialog__spinner" aria-hidden="true"></span>
        Loading subscription details…
      </div>
    `;
  }

  if (error) {
    return `
      <p class="upgrade-dialog__error">${escapeHtml(error)}</p>
      <div class="upgrade-dialog__actions">
        <button type="button" class="upgrade-dialog__btn upgrade-dialog__btn--primary" data-upgrade-action="view-pricing">
          View Pricing
        </button>
        <button type="button" class="upgrade-dialog__btn upgrade-dialog__btn--text" data-upgrade-action="close">
          Close
        </button>
      </div>
    `;
  }

  const statusLabel = getSubscriptionStatusLabel(subscription);
  const planLabel = formatPlanLabel(subscription.planSlug);
  const intervalLabel = buildPlanIntervalLabel(subscription);
  const providerLabel = buildProviderLabel(subscription.provider || 'paypal');
  const renewal = formatDate(subscription.nextBillingDate || subscription.currentPeriodEnd);

  return `
    <div class="upgrade-dialog__details">
      ${buildDetailRow('Current Plan', `${planLabel} · ${intervalLabel}`)}
      ${buildDetailRow('Provider', providerLabel)}
      ${buildDetailRow('Subscription Status', statusLabel)}
      ${buildDetailRow('Renewal Date', renewal)}
    </div>
    <div class="upgrade-dialog__future-actions" hidden aria-hidden="true"></div>
    <p class="upgrade-dialog__notice" id="upgradeDialogNotice" hidden></p>
    <div class="upgrade-dialog__actions">
      <button type="button" class="upgrade-dialog__btn upgrade-dialog__btn--primary" data-upgrade-action="manage">
        Manage Subscription
      </button>
      <button type="button" class="upgrade-dialog__btn upgrade-dialog__btn--secondary" data-upgrade-action="view-pricing">
        View Pricing
      </button>
      <button type="button" class="upgrade-dialog__btn upgrade-dialog__btn--text" data-upgrade-action="close">
        Close
      </button>
    </div>
  `;
}

function ensureDialog() {
  if (dialogEl) return dialogEl;

  dialogEl = document.createElement('div');
  dialogEl.className = 'upgrade-dialog';
  dialogEl.hidden = true;
  dialogEl.innerHTML = `
    <div class="upgrade-dialog__backdrop" data-upgrade-close></div>
    <div class="upgrade-dialog__panel" role="dialog" aria-labelledby="upgradeDialogTitle" aria-modal="true">
      <button type="button" class="upgrade-dialog__close-x" data-upgrade-close aria-label="Close">&times;</button>
      <h2 id="upgradeDialogTitle" class="upgrade-dialog__title">You're already a Pro member 🎉</h2>
      <p class="upgrade-dialog__subtitle">You already have an active LeetCode Profiles subscription.</p>
      <div class="upgrade-dialog__body" data-upgrade-body></div>
    </div>
  `;
  document.body.appendChild(dialogEl);

  dialogEl.querySelectorAll('[data-upgrade-close]').forEach((el) => {
    el.addEventListener('click', () => closeUpgradeDialog());
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && dialogEl && !dialogEl.hidden) {
      closeUpgradeDialog();
    }
  });

  return dialogEl;
}

export function closeUpgradeDialog() {
  if (!dialogEl) return;
  dialogEl.hidden = true;
  document.body.classList.remove('upgrade-dialog-open');
}

async function handleManageSubscription(subscription) {
  const provider = subscription?.provider || 'paypal';
  const notice = dialogEl?.querySelector('#upgradeDialogNotice');

  if (provider === 'razorpay') {
    if (notice) {
      notice.hidden = false;
      notice.textContent = 'To cancel or modify your Razorpay subscription, please contact support.';
    }
    return;
  }

  try {
    const cfg = await fetchRuntimeConfig();
    const mode = cfg.mode === 'sandbox' ? 'sandbox' : 'live';
    window.open(PAYPAL_MANAGE_URLS[mode], '_blank', 'noopener,noreferrer');
  } catch {
    window.open(PAYPAL_MANAGE_URLS.live, '_blank', 'noopener,noreferrer');
  }
}

function bindDialogActions(subscription) {
  const body = dialogEl?.querySelector('[data-upgrade-body]');
  if (!body) return;

  body.querySelectorAll('[data-upgrade-action]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const action = btn.dataset.upgradeAction;

      if (action === 'close') {
        closeUpgradeDialog();
        return;
      }

      if (action === 'view-pricing') {
        closeUpgradeDialog();
        navigateToSubscriptionSection({ highlight: true });
        return;
      }

      if (action === 'manage') {
        await handleManageSubscription(subscription);
      }
    });
  });
}

export function showUpgradeDialog(subscription, { loading = false, error = null } = {}) {
  const dialog = ensureDialog();
  const body = dialog.querySelector('[data-upgrade-body]');
  body.innerHTML = renderDialogBody(subscription, { loading, error });
  bindDialogActions(subscription);
  dialog.hidden = false;
  document.body.classList.add('upgrade-dialog-open');
  dialog.querySelector('[data-upgrade-action]')?.focus();
}

export function openProMemberDialog(subscription) {
  if (!subscription) {
    showUpgradeDialog(null, {
      error: 'Could not load subscription details. Please try again.',
    });
    return;
  }

  showUpgradeDialog(subscription);
}
