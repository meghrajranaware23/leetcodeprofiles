import { getCurrentUser } from './auth/auth-service.js';
import { guardPage, showAuthLoader, hideAuthLoader } from './auth/auth-guard.js';
import { waitForProgressSync } from './auth/progress-sync-service.js';
import { initSiteNav, initScrollAnimations } from './site-nav.js';
import { getAllPackSummaries, invalidateProgressCache } from './progress-facade.js';
import { bindHunterCardActions, renderHunterCard } from './hunter-card.js';
import { redirectLegacyPaths, ROUTES } from './routes.js';
import {
  initEntitlements,
  getSubscription,
  hasActiveSubscription,
  onEntitlementsChanged,
} from './auth/entitlements-service.js';
import {
  formatPlanLabel,
  formatBillingInterval,
  formatDate,
  getSubscriptionStatusLabel,
} from './checkout/subscription-status.js';
import { cancelSubscription } from './checkout/subscription-checkout.js';
import { resolveApiBaseUrl } from './checkout/subscription-status.js';

function renderSubscriptionPanel(subscription) {
  const container = document.getElementById('subscriptionPanel');
  if (!container) return;

  if (!subscription?.paypalSubscriptionId) {
    container.innerHTML = `
      <div class="profile-subscription">
        <div class="profile-subscription-title">SUBSCRIPTION</div>
        <div class="profile-subscription-status">No active subscription</div>
        <p class="profile-subscription-meta">
          Subscribe to Full Arsenal to unlock all premium ascension packs.
        </p>
        <div class="profile-subscription-actions">
          <a href="${ROUTES.pricing}#subscribe" class="profile-subscription-btn">View plans</a>
        </div>
      </div>
    `;
    return;
  }

  const statusLabel = getSubscriptionStatusLabel(subscription);
  const planLabel = formatPlanLabel(subscription.planSlug);
  const interval = formatBillingInterval(subscription.billingInterval);
  const renewal = formatDate(subscription.nextBillingDate || subscription.currentPeriodEnd);
  const canCancel = ['ACTIVE', 'APPROVED'].includes(subscription.status);

  container.innerHTML = `
    <div class="profile-subscription">
      <div class="profile-subscription-title">SUBSCRIPTION</div>
      <div class="profile-subscription-status">${statusLabel}</div>
      <p class="profile-subscription-meta">
        <strong>${planLabel}</strong><br>
        Billed per ${interval}<br>
        ${canCancel ? `Next billing: ${renewal}` : `Access until: ${renewal}`}
      </p>
      <div class="profile-subscription-actions">
        ${canCancel ? `<button type="button" class="profile-subscription-btn profile-subscription-btn--danger" id="cancelSubscriptionBtn">Cancel subscription</button>` : ''}
        <a href="${ROUTES.pricing}" class="profile-subscription-btn">Pricing</a>
      </div>
      <p class="subscribe-status" id="cancelStatus" hidden></p>
    </div>
  `;

  const cancelBtn = document.getElementById('cancelSubscriptionBtn');
  const cancelStatus = document.getElementById('cancelStatus');

  cancelBtn?.addEventListener('click', async () => {
    if (!confirm('Cancel your subscription? You will keep access until the end of the current billing period.')) {
      return;
    }

    cancelBtn.disabled = true;
    if (cancelStatus) {
      cancelStatus.hidden = false;
      cancelStatus.textContent = 'Cancelling…';
    }

    try {
      await cancelSubscription(subscription.paypalSubscriptionId);
      if (cancelStatus) {
        cancelStatus.textContent = 'Subscription cancelled. Access continues until period end.';
      }
    } catch (err) {
      if (cancelStatus) {
        cancelStatus.textContent = err.message || 'Cancellation failed.';
        cancelStatus.classList.add('subscribe-status--error');
      }
      cancelBtn.disabled = false;
    }
  });
}

async function initProfilePage() {
  if (redirectLegacyPaths()) return;
  if (!(await guardPage())) return;

  showAuthLoader();
  try {
    await waitForProgressSync();
    await initEntitlements();
    await resolveApiBaseUrl();
  } finally {
    hideAuthLoader();
  }

  initSiteNav({ variant: 'app', activePage: 'profile' });
  invalidateProgressCache();

  const user = getCurrentUser();
  const summaries = await getAllPackSummaries();
  renderHunterCard(user, summaries);
  bindHunterCardActions();
  initScrollAnimations();

  renderSubscriptionPanel(getSubscription());
  onEntitlementsChanged(() => {
    renderSubscriptionPanel(getSubscription());
  });
}

if (document.body.dataset.page === 'profile') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProfilePage);
  } else {
    initProfilePage();
  }
}

export { hasActiveSubscription };
