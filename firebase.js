import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { initAnalytics, trackPageView } from './analytics.js';

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
export const auth = getAuth(app);
export const db = getFirestore(app);

initAnalytics();
trackPageView();
