/* ══════════════════════════════════════════════════════════
   ENTITLEMENTS SERVICE — Pack access / subscription checks
   ══════════════════════════════════════════════════════════ */

import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase.js';
import { getCurrentUser, waitForAuth } from './auth-service.js';
import { USERS_COLLECTION, USER_FIELDS } from './constants.js';
import { PACK_IDS } from '../progress-store.js';

/** Firestore field on users/{uid} */
export const ENTITLEMENTS_FIELD = USER_FIELDS.entitlements;
export const SUBSCRIPTION_FIELD = USER_FIELDS.subscription;

/** HTML data-pack shorthand → canonical pack ID */
const PACK_ID_ALIASES = Object.freeze({
  dp: PACK_IDS.DP,
  starter: PACK_IDS.STARTER,
});

/** Ascension packs that require purchase for full access */
export const PREMIUM_PACK_IDS = Object.freeze([
  PACK_IDS.ARRAYS_STRINGS,
  PACK_IDS.RECURSION,
  PACK_IDS.TREES,
  PACK_IDS.GRAPHS,
  PACK_IDS.DP,
]);

/**
 * Firestore schema (users/{uid}.entitlements):
 * {
 *   status: 'active' | 'inactive',
 *   plan: 'pack' | 'bundle',
 *   ownedPacks: string[],
 *   expiresAt: string | null,
 *   source?: 'paypal',
 *   subscriptionId?: string,
 *   updatedAt?: string,
 * }
 */

/** @type {object | null} */
let cachedEntitlements = null;
/** @type {object | null} */
let cachedSubscription = null;
let entitlementsReady = false;
/** @type {(() => void) | null} */
let unsubscribeSnapshot = null;
/** @type {Set<(entitlements: object | null) => void>} */
const listeners = new Set();

export function normalizePackId(packIdOrAlias) {
  if (!packIdOrAlias) return '';
  const key = String(packIdOrAlias).trim();
  return PACK_ID_ALIASES[key] ?? key;
}

export function isPremiumPack(packId) {
  return PREMIUM_PACK_IDS.includes(normalizePackId(packId));
}

function parseEntitlements(raw) {
  if (!raw || typeof raw !== 'object') return null;
  const ownedPacks = Array.isArray(raw.ownedPacks)
    ? raw.ownedPacks.map(normalizePackId).filter(Boolean)
    : [];
  return {
    status: raw.status === 'active' ? 'active' : 'inactive',
    plan: raw.plan === 'bundle' ? 'bundle' : 'pack',
    ownedPacks,
    expiresAt: raw.expiresAt ?? null,
    source: raw.source ?? null,
    subscriptionId: raw.subscriptionId ?? null,
    updatedAt: raw.updatedAt ?? null,
  };
}

function parseSubscription(raw) {
  if (!raw || typeof raw !== 'object') return null;
  return {
    paypalSubscriptionId: raw.paypalSubscriptionId ?? null,
    planSlug: raw.planSlug ?? null,
    status: raw.status ?? null,
    billingInterval: raw.billingInterval ?? null,
    startDate: raw.startDate ?? null,
    currentPeriodEnd: raw.currentPeriodEnd ?? null,
    nextBillingDate: raw.nextBillingDate ?? null,
    cancelAtPeriodEnd: Boolean(raw.cancelAtPeriodEnd),
    cancelledAt: raw.cancelledAt ?? null,
    renewalStatus: raw.renewalStatus ?? null,
    lastPaymentAt: raw.lastPaymentAt ?? null,
    updatedAt: raw.updatedAt ?? null,
  };
}

function isEntitlementActive(entitlements) {
  if (!entitlements || entitlements.status !== 'active') return false;
  if (entitlements.expiresAt) {
    const expires = Date.parse(entitlements.expiresAt);
    if (!Number.isNaN(expires) && expires <= Date.now()) return false;
  }
  return true;
}

function notifyListeners() {
  for (const listener of listeners) {
    try {
      listener(cachedEntitlements);
    } catch (err) {
      console.error('Entitlements listener failed:', err);
    }
  }
}

function stopEntitlementsListener() {
  if (unsubscribeSnapshot) {
    unsubscribeSnapshot();
    unsubscribeSnapshot = null;
  }
}

function startEntitlementsListener(user) {
  stopEntitlementsListener();

  if (!user?.uid) {
    cachedEntitlements = null;
    cachedSubscription = null;
    entitlementsReady = true;
    notifyListeners();
    return;
  }

  const userRef = doc(db, USERS_COLLECTION, user.uid);
  unsubscribeSnapshot = onSnapshot(
    userRef,
    (snapshot) => {
      const data = snapshot.exists() ? snapshot.data() : null;
      cachedEntitlements = parseEntitlements(data?.[ENTITLEMENTS_FIELD]);
      cachedSubscription = parseSubscription(data?.[SUBSCRIPTION_FIELD]);
      entitlementsReady = true;
      notifyListeners();
    },
    (err) => {
      console.error('Entitlements snapshot failed:', err);
      cachedEntitlements = null;
      cachedSubscription = null;
      entitlementsReady = true;
      notifyListeners();
    }
  );
}

export function onEntitlementsChanged(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getEntitlements() {
  return cachedEntitlements;
}

export function getSubscription() {
  return cachedSubscription;
}

export function hasActiveSubscription() {
  if (!cachedSubscription) return false;
  const activeStatuses = new Set(['ACTIVE', 'APPROVED']);
  if (activeStatuses.has(cachedSubscription.status)) return true;
  if (cachedSubscription.status === 'CANCELLED' && cachedSubscription.currentPeriodEnd) {
    return Date.parse(cachedSubscription.currentPeriodEnd) > Date.now();
  }
  return isEntitlementActive(cachedEntitlements);
}

export async function initEntitlements() {
  await waitForAuth();
  startEntitlementsListener(getCurrentUser());
}

export async function refreshEntitlements() {
  startEntitlementsListener(getCurrentUser());
}

export function teardownEntitlements() {
  stopEntitlementsListener();
  cachedEntitlements = null;
  cachedSubscription = null;
  entitlementsReady = false;
}

export function areEntitlementsReady() {
  return entitlementsReady;
}

export function hasFullArsenalAccess() {
  if (!isEntitlementActive(cachedEntitlements)) return false;
  return cachedEntitlements.plan === 'bundle';
}

export function hasPackAccess(packId) {
  const id = normalizePackId(packId);
  if (id === PACK_IDS.STARTER) return true;
  if (!isPremiumPack(id)) return true;
  if (!isEntitlementActive(cachedEntitlements)) return false;
  if (cachedEntitlements.plan === 'bundle') return true;
  return cachedEntitlements.ownedPacks.includes(id);
}
