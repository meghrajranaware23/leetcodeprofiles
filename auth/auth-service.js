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

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

let currentUser = null;
let authReady = false;
let authReadyResolve;

const authReadyPromise = new Promise((resolve) => {
  authReadyResolve = resolve;
});

setPersistence(auth, browserLocalPersistence).catch(() => {
  /* Non-fatal — Firebase falls back to default persistence. */
});

onAuthStateChanged(auth, (user) => {
  currentUser = user;
  if (!authReady) {
    authReady = true;
    authReadyResolve(user);
  }
});

export function waitForAuth() {
  return authReadyPromise;
}

export function getCurrentUser() {
  return currentUser;
}

export async function completeRedirectSignIn() {
  const result = await getRedirectResult(auth);
  if (!result?.user) return null;

  try {
    await syncUserProfile(result.user);
  } catch (err) {
    console.error('Failed to sync user profile after redirect sign-in:', err);
  }

  return result.user;
}

export async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    try {
      await syncUserProfile(result.user);
    } catch (err) {
      console.error('Failed to sync user profile after popup sign-in:', err);
    }
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
