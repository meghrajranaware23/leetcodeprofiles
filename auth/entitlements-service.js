/* ══════════════════════════════════════════════════════════
   ENTITLEMENTS SERVICE — Pack access / subscription checks
   ══════════════════════════════════════════════════════════ */

import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase.js';
import { getCurrentUser, waitForAuth } from './auth-service.js';
import { USERS_COLLECTION, USER_FIELDS } from './constants.js';
import { PACK_IDS } from '../progress-store.js';

/** Firestore field on users/{uid} */
export const ENTITLEMENTS_FIELD = 'entitlements';

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
 *   ownedPacks: string[],  // canonical PACK_IDS values
 *   expiresAt: string | null,  // null = lifetime (one-time purchase)
 * }
 */

/** @type {object | null} */
let cachedEntitlements = null;
let entitlementsReady = false;
/** @type {Set<(entitlements: object | null) => void>} */
const listeners = new Set();

/** Resolve data-pack attribute or alias to canonical pack ID. */
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

async function loadEntitlementsForUser(user) {
  if (!user?.uid) {
    cachedEntitlements = null;
    return;
  }

  try {
    const userRef = doc(db, USERS_COLLECTION, user.uid);
    const snapshot = await getDoc(userRef);
    const raw = snapshot.exists() ? snapshot.data()?.[ENTITLEMENTS_FIELD] : null;
    cachedEntitlements = parseEntitlements(raw);
  } catch (err) {
    console.error('Failed to load entitlements:', err);
    cachedEntitlements = null;
  }
}

/** Subscribe to entitlement changes (e.g. refresh sidebar after purchase). */
export function onEntitlementsChanged(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getEntitlements() {
  return cachedEntitlements;
}

/** Load entitlements from Firestore for the signed-in user. */
export async function initEntitlements() {
  await waitForAuth();
  await loadEntitlementsForUser(getCurrentUser());
  entitlementsReady = true;
  notifyListeners();
}

/** Re-fetch entitlements (call after sign-in or purchase webhook). */
export async function refreshEntitlements() {
  await loadEntitlementsForUser(getCurrentUser());
  entitlementsReady = true;
  notifyListeners();
}

export function areEntitlementsReady() {
  return entitlementsReady;
}

/** Full bundle / Full Arsenal access. */
export function hasFullArsenalAccess() {
  if (!isEntitlementActive(cachedEntitlements)) return false;
  return cachedEntitlements.plan === 'bundle';
}

/**
 * Whether the signed-in user owns full access to a pack.
 * Reads Firestore entitlements when present; otherwise preview-only.
 */
export function hasPackAccess(packId) {
  const id = normalizePackId(packId);
  if (id === PACK_IDS.STARTER) return true;
  if (!isPremiumPack(id)) return true;
  if (!isEntitlementActive(cachedEntitlements)) return false;
  if (cachedEntitlements.plan === 'bundle') return true;
  return cachedEntitlements.ownedPacks.includes(id);
}
