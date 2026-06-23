import { paypalConfig, getPayPalPlanId } from '../config/paypal-config.js';
import { getFrontendBaseUrl } from '../config/app-config.js';
import { VALID_PLAN_SLUGS } from '../constants.js';
import {
  createSubscription,
  extractApprovalUrl,
  getSubscription,
  getPlanSlugFromPayPalPlanId,
} from './paypal-client.js';
import {
  syncSubscriptionFromPayPal,
  getActiveSubscriptionForUser,
} from './entitlements-writer.js';

function getFrontendBase() {
  return getFrontendBaseUrl();
}

export async function createUserSubscription(uid, planSlug) {
  if (!VALID_PLAN_SLUGS.has(planSlug)) {
    throw Object.assign(new Error(`Invalid plan slug: ${planSlug}`), { status: 400 });
  }

  const existing = await getActiveSubscriptionForUser(uid);
  if (existing && ['ACTIVE', 'APPROVED'].includes(existing.status)) {
    throw Object.assign(
      new Error('You already have an active subscription'),
      { status: 409, code: 'ACTIVE_SUBSCRIPTION_EXISTS' }
    );
  }

  const planId = getPayPalPlanId(planSlug);
  const baseUrl = getFrontendBase();

  const subscription = await createSubscription({
    planId,
    uid,
    returnUrl: `${baseUrl}/pricing?subscription_success=true`,
    cancelUrl: `${baseUrl}/pricing?subscription_cancelled=true`,
  });

  return {
    subscriptionId: subscription.id,
    approvalUrl: extractApprovalUrl(subscription),
    status: subscription.status,
    planSlug,
    environment: paypalConfig.mode,
  };
}

export async function activateUserSubscription(uid, subscriptionId) {
  const subscription = await getSubscription(subscriptionId);

  if (subscription.custom_id !== uid) {
    throw Object.assign(new Error('Subscription does not belong to this user'), { status: 403 });
  }

  const planSlug = getPlanSlugFromPayPalPlanId(subscription.plan_id);

  const result = await syncSubscriptionFromPayPal(subscription, uid, { planSlug });

  return {
    subscriptionId: subscription.id,
    status: subscription.status,
    grantAccess: result.grantAccess,
    entitlements: result.entitlements,
    subscription: result.subscriptionRecord,
    pending: !result.grantAccess,
  };
}

export async function getUserSubscriptionStatus(uid) {
  const userSub = await getActiveSubscriptionForUser(uid);
  if (!userSub) {
    return { active: false, subscription: null };
  }

  return {
    active: ['ACTIVE', 'APPROVED'].includes(userSub.status)
      || (userSub.status === 'CANCELLED'
        && userSub.currentPeriodEnd
        && Date.parse(userSub.currentPeriodEnd) > Date.now()),
    subscription: userSub,
  };
}

export async function cancelUserSubscription(uid, subscriptionId) {
  const subscription = await getSubscription(subscriptionId);

  if (subscription.custom_id !== uid) {
    throw Object.assign(new Error('Subscription does not belong to this user'), { status: 403 });
  }

  const { cancelPayPalSubscription } = await import('./paypal-client.js');
  await cancelPayPalSubscription(subscriptionId);

  const updated = await getSubscription(subscriptionId);
  const result = await syncSubscriptionFromPayPal(updated, uid);

  return {
    subscriptionId,
    status: updated.status,
    grantAccess: result.grantAccess,
    subscription: result.subscriptionRecord,
  };
}
