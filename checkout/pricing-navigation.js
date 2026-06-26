import { ROUTES, isCoursesPath } from '../routes.js';

const HIGHLIGHT_CLASS = 'subscribe-section--highlight';
const NAVBAR_OFFSET = 64;

export function highlightSubscribeSection() {
  const el = document.getElementById('subscribe');
  if (!el) return;

  el.classList.remove(HIGHLIGHT_CLASS);
  void el.offsetWidth;
  el.classList.add(HIGHLIGHT_CLASS);
  window.setTimeout(() => el.classList.remove(HIGHLIGHT_CLASS), 2400);
}

export function scrollToSubscribeSection({ highlight = true } = {}) {
  const el = document.getElementById('subscribe');
  if (!el) return;

  const top = el.getBoundingClientRect().top + window.scrollY - NAVBAR_OFFSET;
  window.scrollTo({ top, behavior: 'smooth' });

  if (highlight) {
    window.setTimeout(() => highlightSubscribeSection(), 400);
  }
}

export function navigateToSubscriptionSection({ highlight = true } = {}) {
  const path = window.location.pathname.replace(/\/+$/, '') || '/';
  const onPricing = path === ROUTES.pricing
    || path === '/pricing.html'
    || path === ROUTES.coursesPricing;

  if (onPricing) {
    scrollToSubscribeSection({ highlight });
    if (window.location.hash !== '#subscribe') {
      history.replaceState(null, '', `${path}#subscribe`);
    }
    return;
  }

  if (isCoursesPath(path)) {
    window.dispatchEvent(new CustomEvent('courses:navigate-tab', { detail: { tab: 'pricing' } }));
    window.setTimeout(() => scrollToSubscribeSection({ highlight }), 150);
    return;
  }

  window.location.href = `${ROUTES.coursesPricing}#subscribe`;
}

export function initSubscribeSectionFromHash() {
  if (window.location.hash !== '#subscribe') return;
  scrollToSubscribeSection({ highlight: true });
}
