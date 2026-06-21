/** Firestore collection and field names — single source of truth for auth layer. */

export const USERS_COLLECTION = 'users';

export const USER_FIELDS = {
  uid: 'uid',
  email: 'email',
  displayName: 'displayName',
  photoURL: 'photoURL',
  provider: 'provider',
  createdAt: 'createdAt',
  lastLoginAt: 'lastLoginAt',
};

export const AUTH_PROVIDER = 'google';

/** Reserved for future subscription / progress sync — not written yet. */
export const FUTURE_USER_FIELDS = {
  subscription: 'subscription',
  progressSync: 'progressSync',
};

export const DEFAULT_POST_AUTH_URL = '/packs';
export const SIGN_IN_URL = '/sign-in';
