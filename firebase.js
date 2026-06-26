import { initializeApp } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';
import {
  browserLocalPersistence,
  getAuth,
  indexedDBLocalPersistence,
  initializeAuth,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBahGrzuNpKtefeO36ED2Z4OD1B0TOdDXM',
  authDomain: 'leetcodeprofiles-ee772.firebaseapp.com',
  projectId: 'leetcodeprofiles-ee772',
  storageBucket: 'leetcodeprofiles-ee772.firebasestorage.app',
  messagingSenderId: '802824002922',
  appId: '1:802824002922:web:d2f42e4db65a3570fc9913',
  measurementId: 'G-QHV2PZ8SSP',
};

export const app = initializeApp(firebaseConfig);

function createAuth() {
  try {
    return initializeAuth(app, {
      persistence: [indexedDBLocalPersistence, browserLocalPersistence],
    });
  } catch (err) {
    if (err.code === 'auth/already-initialized') {
      return getAuth(app);
    }
    throw err;
  }
}

export const auth = createAuth();
export const db = getFirestore(app);

export let analytics = null;

isSupported().then((supported) => {
  if (supported) {
    analytics = getAnalytics(app);
  }
});
