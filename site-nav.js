/* ══════════════════════════════════════════════════════════
   SITE NAV — Marketing nav + app nav (logged-in)
   ══════════════════════════════════════════════════════════ */

import './firebase.js';
import { initAuthAwareLinks } from './auth/auth-guard.js';
import { mountProfileMenu } from './auth/auth-ui.js';
import { getCurrentUser, waitForAuth } from './auth/auth-service.js';
import { ROUTES } from './routes.js';
import { buildLogoHtml } from './brand-logo.js';
import { initInProgressNav, refreshInProgressNav } from './app-nav-in-progress.js';

const NAVBAR_OFFSET = 64;

function appNavLinkClass(page, activePage) {
  return page === activePage ? 'app-nav-link app-nav-link--active' : 'app-nav-link';
}

function buildMarketingNavHtml({ activePage, isLoggedIn }) {
  const packsActive = activePage === 'packs' ? 'nav-active' : '';
  const featuresActive = activePage === 'features' ? 'nav-active' : '';
  const ranksActive = activePage === 'ranks' ? 'nav-active' : '';
  const howActive = activePage === 'how-it-works' ? 'nav-active' : '';
  const homeActive = activePage === 'home' ? 'nav-active' : '';

  const logoHref = isLoggedIn ? ROUTES.packs : ROUTES.marketing;
  const packsHref = ROUTES.packs;
  const packsLabel = 'Packs';
  const navCtaHtml = isLoggedIn
    ? ''
    : `<a href="${ROUTES.packs}" class="nav-cta" data-auth-target="${ROUTES.packs}">START GRINDING →</a>`;

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
      <button class="hamburger" id="hamburger" type="button" aria-label="Menu" aria-expanded="false" aria-controls="mobile-menu">
        <span></span><span></span><span></span>
      </button>
    </nav>
    <div class="mobile-menu" id="mobile-menu">
      <a href="${ROUTES.marketing}">Home</a>
      <a href="${packsHref}" data-auth-target="${packsHref}">${packsLabel}</a>
      <a href="${ROUTES.ranks}">Ranks</a>
      <a href="${ROUTES.howItWorks}">How It Works</a>
      <a href="${ROUTES.features}">Features</a>
      <div id="mobile-nav-auth" class="mobile-nav-auth"></div>
      ${navCtaHtml}
    </div>
  `;
}

function buildAppNavHtml({ activePage = 'packs' } = {}) {
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
      <button class="hamburger" id="hamburger" type="button" aria-label="Menu" aria-expanded="false" aria-controls="mobile-menu">
        <span></span><span></span><span></span>
      </button>
    </nav>
    <div class="mobile-menu mobile-menu--app" id="mobile-menu">
      <a href="${ROUTES.method}">Free Guide</a>
      <button type="button" class="mobile-menu__in-progress" data-mobile-in-progress-trigger>In Progress</button>
      <a href="${ROUTES.pricing}">Pricing</a>
    </div>
  `;
}

function shouldUseAppNav(variant, isLoggedIn, activePage) {
  return variant === 'app' || (variant === 'auto' && isLoggedIn && activePage === 'packs');
}

function mountNavContent(mount, { activePage, variant, isLoggedIn, summaries }) {
  const useAppNav = shouldUseAppNav(variant, isLoggedIn, activePage);
  const profileOptions = {
    summaries,
    deferProgressLine: !summaries,
  };

  mount.innerHTML = useAppNav
    ? buildAppNavHtml({ activePage })
    : buildMarketingNavHtml({ activePage, isLoggedIn });

  initNavbarScroll();
  initMobileMenu();
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

function setMobileMenuOpen(open) {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  if (!hamburger || !mobileMenu) return;

  hamburger.classList.toggle('active', open);
  mobileMenu.classList.toggle('active', open);
  hamburger.setAttribute('aria-expanded', String(open));
  document.body.style.overflow = open ? 'hidden' : '';
}

function initMobileMenu() {
  if (document.body.dataset.navMobileBound) return;
  document.body.dataset.navMobileBound = 'true';

  document.addEventListener('click', (e) => {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    if (!hamburger || !mobileMenu) return;

    if (e.target.closest('#hamburger')) {
      const open = !mobileMenu.classList.contains('active');
      setMobileMenuOpen(open);
      return;
    }

    if (e.target.closest('#mobile-menu a')) {
      setMobileMenuOpen(false);
    }
  });

  document.addEventListener('keydown', (e) => {
    const mobileMenu = document.getElementById('mobile-menu');
    const hamburger = document.getElementById('hamburger');
    if (e.key === 'Escape' && mobileMenu?.classList.contains('active')) {
      setMobileMenuOpen(false);
      hamburger?.focus();
    }
  });
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
