import {
  GoogleAuthProvider,
  getRedirectResult,
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
  signOut,
} from 'firebase/auth';
import { auth } from '../firebase.js';
import { isPopupCancelledError } from './auth-errors.js';
import { syncUserProfile } from './user-service.js';
import { initProgressSync } from './progress-sync-service.js';

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

let currentUser = null;
let authReady = false;
let persistenceReady = false;

let bootstrapPromise = Promise.resolve();
let bootstrapGeneration = 0;

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

async function initAuthState() {
  await auth.authStateReady();
  persistenceReady = true;
  currentUser = auth.currentUser;
  authReady = true;
  bootstrapPromise = bootstrapSession(currentUser);
  return currentUser;
}

const authReadyPromise = initAuthState();

onAuthStateChanged(auth, (user) => {
  if (!persistenceReady) return;

  const prevUid = currentUser?.uid ?? null;
  const nextUid = user?.uid ?? null;
  if (prevUid === nextUid) return;

  currentUser = user;
  bootstrapPromise = bootstrapSession(user);
});

export function waitForAuth() {
  return authReadyPromise;
}

export function waitForSessionBootstrap() {
  return bootstrapPromise;
}

export function getCurrentUser() {
  return currentUser ?? auth.currentUser;
}

export async function completeRedirectSignIn() {
  try {
    const result = await getRedirectResult(auth);
    if (!result?.user) return null;
    return result.user;
  } catch (err) {
    console.warn('getRedirectResult failed (treating as no redirect):', err);
    return null;
  }
}

export async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    if (isPopupCancelledError(error)) {
      throw error;
    }
    // Popup failed (blocked, third-party cookies, cross-origin, etc.) —
    // fall back to full-page redirect which avoids all popup restrictions.
    console.warn('signInWithPopup failed, falling back to redirect:', error.code || error.message);
    try {
      await signInWithRedirect(auth, googleProvider);
      return null;
    } catch (redirectError) {
      console.error('signInWithRedirect also failed:', redirectError);
      throw error;
    }
  }
}

export async function signOutUser() {
  await signOut(auth);
}

export { auth, googleProvider };
