import {
  GoogleAuthProvider,
  browserLocalPersistence,
  getRedirectResult,
  onAuthStateChanged,
  setPersistence,
  signInWithPopup,
  signInWithRedirect,
  signOut,
} from 'firebase/auth';
import { auth } from '../firebase.js';
import { isPopupBlockedError } from './auth-errors.js';
import { syncUserProfile } from './user-service.js';
import { initProgressSync } from './progress-sync-service.js';

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

let currentUser = null;
let authReady = false;
let authReadyResolve;

const authReadyPromise = new Promise((resolve) => {
  authReadyResolve = resolve;
});

let bootstrapPromise = Promise.resolve();
let bootstrapGeneration = 0;

setPersistence(auth, browserLocalPersistence).catch(() => {
  /* Non-fatal — Firebase falls back to default persistence. */
});

async function bootstrapSession(user) {
  const generation = ++bootstrapGeneration;
  try {
    if (user) {
      try {
        await syncUserProfile(user);
      } catch (err) {
        console.error('Failed to sync user profile:', err);
      }
      try {
        await initProgressSync(user);
      } catch (err) {
        console.error('Failed to init progress sync:', err);
      }
      try {
        const { refreshEntitlements } = await import('./entitlements-service.js');
        await refreshEntitlements();
      } catch (err) {
        console.error('Failed to refresh entitlements:', err);
      }
    } else {
      try {
        await initProgressSync(null);
      } catch (err) {
        console.error('Failed to reset progress sync:', err);
      }
      try {
        const { refreshEntitlements } = await import('./entitlements-service.js');
        await refreshEntitlements();
      } catch (err) {
        console.error('Failed to clear entitlements:', err);
      }
    }
  } finally {
    if (generation === bootstrapGeneration) {
      // Bootstrap complete for the current auth generation.
    }
  }
}

onAuthStateChanged(auth, (user) => {
  currentUser = user;

  if (!authReady) {
    authReady = true;
    authReadyResolve(user);
  }

  bootstrapPromise = bootstrapSession(user);
});

export function waitForAuth() {
  return authReadyPromise;
}

export function waitForSessionBootstrap() {
  return bootstrapPromise;
}

export function getCurrentUser() {
  return currentUser;
}

export async function completeRedirectSignIn() {
  const result = await getRedirectResult(auth);
  if (!result?.user) return null;
  return result.user;
}

export async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    if (isPopupBlockedError(error)) {
      await signInWithRedirect(auth, googleProvider);
      return null;
    }
    throw error;
  }
}

export async function signOutUser() {
  await signOut(auth);
}

export { auth, googleProvider };
