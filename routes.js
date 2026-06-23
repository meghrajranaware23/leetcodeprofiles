/** Central route paths — single source of truth for user-facing URLs. */

/** External pricing / subscription page */
export const PRICING_URL = 'https://leetcodeprofiles.com/pricing';

export const ROUTES = Object.freeze({
  marketing: '/',
  packs: '/packs',
  /** @deprecated Use ROUTES.packs — kept for redirects */
  home: '/packs',
  pricing: '/pricing',
  ranks: '/ranks',
  howItWorks: '/how-it-works',
  starter: '/starter',
  profile: '/profile',
  signIn: '/sign-in',
});

/** Legacy .html and alias paths — redirect to clean URLs. */
export const LEGACY_REDIRECTS = Object.freeze({
  '/packs.html': ROUTES.packs,
  '/sign-in.html': ROUTES.signIn,
  '/profile.html': ROUTES.profile,
  '/index.html': ROUTES.marketing,
  '/home': ROUTES.packs,
  '/starter-reader.html': ROUTES.starter,
});

/** Redirect legacy .html app routes to clean URLs (client-side). */
export function redirectLegacyPaths() {
  const path = window.location.pathname;
  const target = LEGACY_REDIRECTS[path];
  if (!target) return false;
  const next = `${target}${window.location.search}${window.location.hash}`;
  window.location.replace(next);
  return true;
}
