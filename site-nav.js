/* ══════════════════════════════════════════════════════════
   SITE NAV — Marketing nav + minimal app nav (logged-in)
   ══════════════════════════════════════════════════════════ */

import './firebase.js';
import { initAuthAwareLinks } from './auth/auth-guard.js';
import { mountProfileMenu } from './auth/auth-ui.js';
import { getCurrentUser, waitForAuth } from './auth/auth-service.js';
import { ROUTES } from './routes.js';
import { buildLogoHtml } from './brand-logo.js';

const NAVBAR_OFFSET = 64;

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
  const methodActive = activePage === 'method' ? 'nav-active' : '';

  return `
    <nav class="navbar navbar--app" id="navbar">
      ${buildLogoHtml({ href: ROUTES.packs, ariaLabel: 'LeetCode Profiles packs' })}
      <div class="nav-actions nav-actions--app">
        <a href="${ROUTES.method}" class="app-nav-link ${methodActive}">How It Works</a>
        <div id="nav-auth" class="nav-auth"></div>
      </div>
    </nav>
  `;
}

export async function initSiteNav(options = {}) {
  const { activePage = 'home', variant = 'marketing' } = options;
  const mount = document.getElementById('site-nav');
  if (!mount) return;

  await waitForAuth();
  const isLoggedIn = Boolean(getCurrentUser());
  const useAppNav = variant === 'app' || (variant === 'auto' && isLoggedIn && activePage === 'packs');

  mount.innerHTML = useAppNav
    ? buildAppNavHtml({ activePage })
    : buildMarketingNavHtml({ activePage, isLoggedIn });

  if (!useAppNav) {
    initNavbarScroll();
    initMobileMenu();
    initAuthAwareLinks(mount);
    mountProfileMenu('mobile-nav-auth', { compact: true });
  } else {
    initNavbarScroll();
  }

  mountProfileMenu('nav-auth');
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
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const onScroll = () => {
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
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', () => {
    const open = !mobileMenu.classList.contains('active');
    setMobileMenuOpen(open);
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      setMobileMenuOpen(false);
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
      setMobileMenuOpen(false);
      hamburger.focus();
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
