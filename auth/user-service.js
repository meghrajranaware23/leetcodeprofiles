import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebase.js';
import {
  AUTH_PROVIDER,
  USER_FIELDS,
  USERS_COLLECTION,
} from './constants.js';

const LAST_LOGIN_SESSION_PREFIX = 'lp_last_login_synced_';

function shouldUpdateLastLogin(uid) {
  if (!uid) return true;
  try {
    const key = `${LAST_LOGIN_SESSION_PREFIX}${uid}`;
    if (sessionStorage.getItem(key) === '1') return false;
    sessionStorage.setItem(key, '1');
    return true;
  } catch {
    return true;
  }
}

function buildProfileFields(user) {
  return {
    [USER_FIELDS.uid]: user.uid,
    [USER_FIELDS.email]: user.email ?? '',
    [USER_FIELDS.displayName]: user.displayName ?? '',
    [USER_FIELDS.photoURL]: user.photoURL ?? '',
    [USER_FIELDS.provider]: AUTH_PROVIDER,
  };
}

/**
 * Create user doc on first sign-in; update lastLoginAt (and profile) on return visits.
 * Document ID = uid prevents duplicates.
 */
export async function syncUserProfile(user) {
  if (!user?.uid) {
    throw new Error('Cannot sync profile without a signed-in user.');
  }

  const userRef = doc(db, USERS_COLLECTION, user.uid);
  const snapshot = await getDoc(userRef);
  const profile = buildProfileFields(user);
  const now = serverTimestamp();

  if (!snapshot.exists()) {
    await setDoc(userRef, {
      ...profile,
      [USER_FIELDS.createdAt]: now,
      [USER_FIELDS.lastLoginAt]: now,
    });
    return { created: true };
  }

  const updates = {};
  const existing = snapshot.data();

  if (shouldUpdateLastLogin(user.uid)) {
    updates[USER_FIELDS.lastLoginAt] = now;
  }

  if (existing[USER_FIELDS.displayName] !== profile[USER_FIELDS.displayName]) {
    updates[USER_FIELDS.displayName] = profile[USER_FIELDS.displayName];
  }
  if (existing[USER_FIELDS.photoURL] !== profile[USER_FIELDS.photoURL]) {
    updates[USER_FIELDS.photoURL] = profile[USER_FIELDS.photoURL];
  }
  if (existing[USER_FIELDS.email] !== profile[USER_FIELDS.email]) {
    updates[USER_FIELDS.email] = profile[USER_FIELDS.email];
  }

  if (Object.keys(updates).length === 0) {
    return { created: false };
  }

  await updateDoc(userRef, updates);
  return { created: false };
}
