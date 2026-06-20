/* ══════════════════════════════════════════════════════════
   SITE NAV — Shared header for index.html and packs.html
   ══════════════════════════════════════════════════════════ */

import './firebase.js';

const NAVBAR_OFFSET = 64;

export function initSiteNav(options = {}) {
  const { activePage = 'home' } = options;
  const mount = document.getElementById('site-nav');
  if (!mount) return;

  const isHome = activePage === 'home';
  const isPacks = activePage === 'packs';

  mount.innerHTML = `
    <nav class="navbar" id="navbar">
      <a href="./index.html" class="nav-logo" aria-label="LeetCode Profiles home">
        <span class="logo-mark">■</span>
        <span class="logo-leet">LEETCODE</span>
        <span class="logo-profiles">PROFILES</span>
      </a>
      <div class="nav-links">
        <a href="./packs.html" class="${isPacks ? 'nav-active' : ''}">Packs</a>
        <a href="${isHome ? '#ranks' : './index.html#ranks'}">Ranks</a>
        <a href="${isHome ? '#how-it-works' : './index.html#how-it-works'}">How It Works</a>
        <a href="${isHome ? '#pricing' : './index.html#pricing'}">Pricing</a>
        <a href="./starter-reader.html">Starter Path</a>
      </div>
      <a href="./packs.html" class="nav-cta">START GRINDING →</a>
      <button class="hamburger" id="hamburger" type="button" aria-label="Menu" aria-expanded="false" aria-controls="mobile-menu">
        <span></span><span></span><span></span>
      </button>
    </nav>
    <div class="mobile-menu" id="mobile-menu">
      <a href="./packs.html">Packs</a>
      <a href="${isHome ? '#ranks' : './index.html#ranks'}">Ranks</a>
      <a href="${isHome ? '#how-it-works' : './index.html#how-it-works'}">How It Works</a>
      <a href="${isHome ? '#pricing' : './index.html#pricing'}">Pricing</a>
      <a href="./starter-reader.html">Starter Path</a>
      <a href="./packs.html" class="nav-cta">START GRINDING →</a>
    </div>
  `;

  initNavbarScroll();
  initMobileMenu();
}

export function scrollToSection(selector) {
  const el = document.querySelector(selector);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - NAVBAR_OFFSET;
  window.scrollTo({ top, behavior: 'smooth' });
}

export function initCtaLinks() {
  document.querySelectorAll('[data-scroll]').forEach(el => {
    el.addEventListener('click', (e) => {
      const target = el.getAttribute('data-scroll');
      if (!target || !target.startsWith('#')) return;
      e.preventDefault();
      scrollToSection(target);
    });
  });
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
