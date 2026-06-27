/* ══════════════════════════════════════════════════════════
   SITE NAV — Marketing nav + app nav (logged-in)
   ══════════════════════════════════════════════════════════ */

import './firebase.js';
import { initAuthAwareLinks } from './auth/auth-guard.js';
import { mountProfileMenu, closeAllProfileMenus } from './auth/auth-ui.js';
import { getCurrentUser, waitForAuth } from './auth/auth-service.js';
import { ROUTES } from './routes.js';
import { buildLogoHtml } from './brand-logo.js';
import { initInProgressNav, refreshInProgressNav } from './app-nav-in-progress.js';
import { createNavDropdownController, closeNavDropdown } from './nav-dropdown.js';

const NAVBAR_OFFSET = 64;

let siteNavDropdownController = null;

function appNavLinkClass(page, activePage) {
  return page === activePage ? 'app-nav-link app-nav-link--active' : 'app-nav-link';
}

function siteDropdownItemClass(isActive) {
  return isActive
    ? 'nav-dropdown__item site-nav-dropdown__item nav-dropdown__item--active site-nav-dropdown__item--active'
    : 'nav-dropdown__item site-nav-dropdown__item';
}

function buildSiteNavMenuHtml({ itemsHtml, footerHtml = '' }) {
  return `
    <div class="site-nav-menu">
      <button class="hamburger" id="hamburger" type="button" aria-label="Menu" aria-expanded="false" aria-haspopup="true" aria-controls="siteNavDropdown">
        <span></span><span></span><span></span>
      </button>
      <div class="nav-dropdown site-nav-dropdown" id="siteNavDropdown" role="menu" hidden>
        ${itemsHtml}
        ${footerHtml}
      </div>
    </div>
  `;
}

function buildMarketingNavHtml({ activePage, isLoggedIn }) {
  const packsActive = activePage === 'packs' ? 'nav-active' : '';
  const featuresActive = activePage === 'features' ? 'nav-active' : '';
  const ranksActive = activePage === 'ranks' ? 'nav-active' : '';
  const howActive = activePage === 'how-it-works' ? 'nav-active' : '';
  const homeActive = activePage === 'home' ? 'nav-active' : '';

  const logoHref = isLoggedIn ? ROUTES.courses : ROUTES.marketing;
  const packsHref = isLoggedIn ? ROUTES.courses : ROUTES.packs;
  const packsLabel = 'Packs';
  const navCtaHtml = isLoggedIn
    ? ''
    : `<a href="${ROUTES.courses}" class="nav-cta" data-auth-target="${ROUTES.courses}" data-nav-close>START GRINDING →</a>`;

  const dropdownItems = `
    <a href="${ROUTES.marketing}" class="${siteDropdownItemClass(activePage === 'home')}" data-nav-close role="menuitem">Home</a>
    <a href="${packsHref}" class="${siteDropdownItemClass(activePage === 'packs')}" data-auth-target="${packsHref}" data-nav-close role="menuitem">${packsLabel}</a>
    <a href="${ROUTES.ranks}" class="${siteDropdownItemClass(activePage === 'ranks')}" data-nav-close role="menuitem">Ranks</a>
    <a href="${ROUTES.howItWorks}" class="${siteDropdownItemClass(activePage === 'how-it-works')}" data-nav-close role="menuitem">How It Works</a>
    <a href="${ROUTES.features}" class="${siteDropdownItemClass(activePage === 'features')}" data-nav-close role="menuitem">Features</a>
  `;

  const dropdownFooter = `
    <div class="nav-dropdown__footer">
      <div id="mobile-nav-auth" class="mobile-nav-auth"></div>
      ${navCtaHtml}
    </div>
  `;

  return `
    <nav class="navbar" id="navbar">
      ${buildLogoHtml({ href: logoHref, ariaLabel: 'LeetCode Profiles home' })}
      <div class="nav-links">
        <a href="${ROUTES.marketing}" class="${homeActive}">Home</a>
        <a href="${packsHref}" class="${packsActive}" data-auth-target="${packsHref}">${packsLabel}</a>
        <a href="${ROUTES.ranks}" class="${ranksActive}">Ranks</a>
        <a href="${ROUTES.howItWorks}" class="${howActive}">How It Works</a>
        <a href="${ROUTES.features}" class="${featuresActive}">Features</a>
      </div>
      <div class="nav-actions">
        <div id="nav-auth" class="nav-auth"></div>
        ${navCtaHtml}
      </div>
      ${buildSiteNavMenuHtml({ itemsHtml: dropdownItems, footerHtml: dropdownFooter })}
    </nav>
  `;
}

function buildAppNavHtml({ activePage = 'packs' } = {}) {
  const dropdownItems = `
    <a href="${ROUTES.method}" class="${siteDropdownItemClass(activePage === 'method')}" data-nav-close role="menuitem">Free Guide</a>
    <button type="button" class="nav-dropdown__item site-nav-dropdown__item" data-mobile-in-progress-trigger role="menuitem">In Progress</button>
    <a href="${ROUTES.pricing}" class="${siteDropdownItemClass(activePage === 'pricing')}" data-nav-close role="menuitem">Pricing</a>
  `;

  return `
    <nav class="navbar navbar--app" id="navbar">
      ${buildLogoHtml({ href: ROUTES.packs, ariaLabel: 'LeetCode Profiles packs' })}
      <div class="app-nav-center">
        <div class="app-nav-links">
          <a href="${ROUTES.method}" class="${appNavLinkClass('method', activePage)}">Free Guide</a>
          <div class="app-nav-item app-nav-item--popover">
            <button type="button" class="app-nav-link app-nav-link--trigger" data-in-progress-trigger aria-expanded="false" aria-haspopup="true">
              In Progress
            </button>
            <div class="app-nav-popover" data-in-progress-popover hidden></div>
          </div>
          <a href="${ROUTES.pricing}" class="${appNavLinkClass('pricing', activePage)}">Pricing</a>
          <a href="${ROUTES.profile}" class="${appNavLinkClass('profile', activePage)}">Profile</a>
        </div>
      </div>
      <div class="nav-actions nav-actions--app">
        <div id="nav-auth" class="nav-auth"></div>
      </div>
      ${buildSiteNavMenuHtml({ itemsHtml: dropdownItems })}
    </nav>
  `;
}

function shouldUseAppNav(variant, isLoggedIn, activePage) {
  return variant === 'app' || (variant === 'auto' && isLoggedIn && activePage === 'packs');
}

function ensureSiteNavDropdownController() {
  if (!siteNavDropdownController) {
    siteNavDropdownController = createNavDropdownController({
      triggerId: 'hamburger',
      dropdownId: 'siteNavDropdown',
      align: 'end',
      bindKey: 'siteNavDropdownBound',
      onOpen: () => closeAllProfileMenus(),
    });
    siteNavDropdownController.bind();
  }
  return siteNavDropdownController;
}

export function closeSiteNavDropdown() {
  closeNavDropdown('siteNavDropdown');
}

function mountNavContent(mount, { activePage, variant, isLoggedIn, summaries }) {
  const useAppNav = shouldUseAppNav(variant, isLoggedIn, activePage);
  const profileOptions = {
    summaries,
    deferProgressLine: !summaries,
  };

  const controller = ensureSiteNavDropdownController();
  controller.close();
  controller.removeOrphan();

  mount.innerHTML = useAppNav
    ? buildAppNavHtml({ activePage })
    : buildMarketingNavHtml({ activePage, isLoggedIn });

  initNavbarScroll();
  initAuthAwareLinks(mount);

  if (useAppNav) {
    initInProgressNav();
    mountProfileMenu('nav-auth', { menu: 'account', ...profileOptions });
  } else {
    mountProfileMenu('mobile-nav-auth', { compact: true, ...profileOptions });
    mountProfileMenu('nav-auth', profileOptions);
  }

  return useAppNav;
}

export async function initSiteNav(options = {}) {
  const { activePage = 'home', variant = 'marketing', summaries = null } = options;
  const mount = document.getElementById('site-nav');
  if (!mount) return;

  ensureSiteNavDropdownController();

  const optimisticLoggedIn = variant === 'app';
  let lastAppNav = mountNavContent(mount, {
    activePage,
    variant,
    isLoggedIn: optimisticLoggedIn,
    summaries,
  });

  await waitForAuth();
  const isLoggedIn = Boolean(getCurrentUser());
  const useAppNav = shouldUseAppNav(variant, isLoggedIn, activePage);

  if (isLoggedIn !== optimisticLoggedIn || useAppNav !== lastAppNav) {
    mountNavContent(mount, {
      activePage,
      variant,
      isLoggedIn,
      summaries,
    });
  } else if (useAppNav && summaries) {
    refreshInProgressNav();
  }
}

export function scrollToSection(selector) {
  const el = document.querySelector(selector);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - NAVBAR_OFFSET;
  window.scrollTo({ top, behavior: 'smooth' });
}

export function initCtaLinks() {
  initAuthAwareLinks(document);
}

function initNavbarScroll() {
  if (document.body.dataset.navScrollBound) return;
  document.body.dataset.navScrollBound = 'true';

  const onScroll = () => {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  onScroll();
  window.addEventListener('scroll', onScroll);
}

export function initScrollAnimations() {
  const animateElements = document.querySelectorAll('.animate-on-scroll');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  animateElements.forEach(el => observer.observe(el));
}
