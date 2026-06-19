import { initSiteNav, initCtaLinks, initScrollAnimations } from './site-nav.js';
import { initHomeTeaser } from './packs-page.js';
import { initLandingProgress } from './landing-progress.js';

document.addEventListener('DOMContentLoaded', () => {
  initSiteNav({ activePage: 'home' });
  initHomeTeaser();
  initLandingProgress();
  initCtaLinks();
  initScrollAnimations();
});
