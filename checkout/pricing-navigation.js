import { ROUTES } from '../routes.js';

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
  const onPricing = window.location.pathname === ROUTES.pricing
    || window.location.pathname === '/pricing.html';

  if (onPricing) {
    scrollToSubscribeSection({ highlight });
    if (window.location.hash !== '#subscribe') {
      history.replaceState(null, '', `${ROUTES.pricing}#subscribe`);
    }
    return;
  }

  window.location.href = `${ROUTES.pricing}#subscribe`;
}

export function initSubscribeSectionFromHash() {
  if (window.location.hash !== '#subscribe') return;
  scrollToSubscribeSection({ highlight: true });
}
