/** Central route paths — single source of truth for user-facing URLs. */

/** In-app pricing / subscription checkout (marketing) */
export const PRICING_URL = '/pricing#subscribe';

/** Logged-in courses app tabs */
export const COURSE_TABS = Object.freeze(['packs', 'guide', 'progress', 'pricing', 'profile']);

export const ROUTES = Object.freeze({
  marketing: '/',
  courses: '/courses',
  coursesPacks: '/courses/packs',
  coursesGuide: '/courses/guide',
  coursesProgress: '/courses/progress',
  coursesPricing: '/courses/pricing',
  coursesProfile: '/courses/profile',
  /** @deprecated Logged-in users — use ROUTES.courses */
  packs: '/packs',
  /** @deprecated Use ROUTES.packs — kept for redirects */
  home: '/packs',
  pricing: '/pricing',
  features: '/features',
  ranks: '/ranks',
  howItWorks: '/how-it-works',
  starter: '/starter',
  /** @deprecated Logged-in users — use ROUTES.coursesProfile */
  profile: '/profile',
  /** @deprecated Logged-in users — use ROUTES.coursesGuide */
  method: '/method',
  help: '/help',
  signIn: '/sign-in',
  privacy: '/privacy',
  terms: '/terms',
});

/** Map legacy logged-in app paths → courses tab path. */
export const LOGGED_IN_APP_REDIRECTS = Object.freeze({
  '/packs': ROUTES.courses,
  '/home': ROUTES.courses,
  '/profile': ROUTES.coursesProfile,
  '/method': ROUTES.coursesGuide,
});

/** Legacy .html and alias paths — redirect to clean URLs. */
export const LEGACY_REDIRECTS = Object.freeze({
  '/packs.html': ROUTES.packs,
  '/sign-in.html': ROUTES.signIn,
  '/profile.html': ROUTES.profile,
  '/index.html': ROUTES.marketing,
  '/features.html': ROUTES.features,
  '/method.html': ROUTES.method,
  '/home': ROUTES.packs,
  '/starter-reader.html': ROUTES.starter,
});

/** Parse courses tab from pathname, or null if not a courses route. */
export function tabFromPath(pathname) {
  const normalized = pathname.replace(/\/+$/, '') || '/';
  if (normalized === '/courses') return 'packs';
  const match = normalized.match(/^\/courses\/([a-z]+)$/);
  if (!match) return null;
  const tab = match[1];
  return COURSE_TABS.includes(tab) ? tab : 'packs';
}

/** Path for a courses tab (packs → /courses). */
export function pathForTab(tab) {
  if (!COURSE_TABS.includes(tab)) return ROUTES.courses;
  if (tab === 'packs') return ROUTES.courses;
  return `/courses/${tab}`;
}

/** Tab → ROUTES constant for nav hrefs. */
export function routeForTab(tab) {
  const map = {
    packs: ROUTES.courses,
    guide: ROUTES.coursesGuide,
    progress: ROUTES.coursesProgress,
    pricing: ROUTES.coursesPricing,
    profile: ROUTES.coursesProfile,
  };
  return map[tab] || ROUTES.courses;
}

export function isCoursesPath(pathname) {
  return tabFromPath(pathname) !== null;
}

/** Redirect legacy .html app routes to clean URLs (client-side). */
export function redirectLegacyPaths() {
  const path = window.location.pathname;
  const target = LEGACY_REDIRECTS[path];
  if (!target) return false;
  const next = `${target}${window.location.search}${window.location.hash}`;
  window.location.replace(next);
  return true;
}

/** Redirect logged-in users from legacy app URLs to /courses/*. */
export function redirectLoggedInLegacyApp(isLoggedIn) {
  if (!isLoggedIn) return false;
  const path = window.location.pathname.replace(/\.html$/, '');
  const target = LOGGED_IN_APP_REDIRECTS[path];
  if (!target) return false;
  const next = `${target}${window.location.search}${window.location.hash}`;
  window.location.replace(next);
  return true;
}
