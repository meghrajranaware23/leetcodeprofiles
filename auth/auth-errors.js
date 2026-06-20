const AUTH_ERROR_MESSAGES = {
  'auth/popup-closed-by-user': 'Sign-in was cancelled. Try again when you\'re ready.',
  'auth/cancelled-popup-request': 'Sign-in was cancelled. Try again when you\'re ready.',
  'auth/popup-blocked': 'Pop-up was blocked. Redirecting to Google sign-in…',
  'auth/network-request-failed': 'Network error. Check your connection and try again.',
  'auth/too-many-requests': 'Too many attempts. Please wait a moment and try again.',
  'auth/user-disabled': 'This account has been disabled. Contact support if you need help.',
  'auth/operation-not-allowed': 'Google sign-in is not enabled. Please contact support.',
  'auth/account-exists-with-different-credential': 'This email is linked to another sign-in method.',
  'auth/internal-error': 'Something went wrong. Please try again.',
};

export function getAuthErrorMessage(error) {
  if (!error) return 'Something went wrong. Please try again.';

  const code = error.code || '';
  if (AUTH_ERROR_MESSAGES[code]) {
    return AUTH_ERROR_MESSAGES[code];
  }

  if (code.startsWith('auth/')) {
    return 'Authentication failed. Please try again.';
  }

  return error.message || 'Something went wrong. Please try again.';
}

export function isPopupCancelledError(error) {
  const code = error?.code || '';
  return code === 'auth/popup-closed-by-user' || code === 'auth/cancelled-popup-request';
}

export function isPopupBlockedError(error) {
  return error?.code === 'auth/popup-blocked';
}
