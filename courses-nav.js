import { mountProfileMenu } from './auth/auth-ui.js';
import { buildLogoHtml } from './brand-logo.js';
import { routeForTab } from './routes.js';
import { initInProgressNav, refreshInProgressNav } from './app-nav-in-progress.js';

const TAB_LABELS = {
  packs: 'Packs',
  guide: 'Free Guide',
  progress: 'In Progress',
  pricing: 'Pricing',
  profile: 'Profile',
};

const TAB_ORDER = ['packs', 'guide', 'progress', 'pricing', 'profile'];

const MOBILE_NAV_MQ = '(max-width: 1024px)';

function tabLinkClass(tab, activeTab) {
  return tab === activeTab
    ? 'courses-nav-link courses-nav-link--active'
    : 'courses-nav-link';
}

function buildDesktopTabs(activeTab) {
  return TAB_ORDER.map((tab) => {
    if (tab === 'progress') {
      return `
        <div class="app-nav-item app-nav-item--popover">
          <button type="button" class="courses-nav-link courses-nav-link--trigger" data-in-progress-trigger aria-expanded="false" aria-haspopup="true">
            ${TAB_LABELS[tab]}
          </button>
          <div class="app-nav-popover" data-in-progress-popover hidden></div>
        </div>
      `;
    }
    return `<a href="${routeForTab(tab)}" class="${tabLinkClass(tab, activeTab)}" data-courses-tab="${tab}">${TAB_LABELS[tab]}</a>`;
  }).join('');
}

function buildDropdownItems(activeTab) {
  return TAB_ORDER.map((tab) => {
    if (tab === 'progress') {
      return `<button type="button" class="courses-nav-dropdown__item" data-mobile-in-progress-trigger role="menuitem">${TAB_LABELS[tab]}</button>`;
    }
    const activeClass = tab === activeTab ? ' courses-nav-dropdown__item--active' : '';
    return `<a href="${routeForTab(tab)}" class="courses-nav-dropdown__item${activeClass}" data-courses-tab="${tab}" role="menuitem">${TAB_LABELS[tab]}</a>`;
  }).join('');
}

export function buildCoursesNavHtml({ activeTab = 'packs' } = {}) {
  return `
    <nav class="navbar navbar--courses" id="navbar">
      <button class="courses-nav-hamburger" id="coursesNavHamburger" type="button" aria-label="Menu" aria-expanded="false" aria-haspopup="true" aria-controls="coursesNavDropdown">
        <span></span><span></span><span></span>
      </button>
      ${buildLogoHtml({ href: routeForTab('packs'), ariaLabel: 'LeetCode Profiles courses' })}
      <div class="courses-nav-center">
        <div class="courses-nav-links">
          ${buildDesktopTabs(activeTab)}
        </div>
      </div>
      <div class="nav-actions nav-actions--courses">
        <div id="nav-auth" class="nav-auth"></div>
      </div>
      <div class="courses-nav-dropdown" id="coursesNavDropdown" role="menu" hidden>
        ${buildDropdownItems(activeTab)}
      </div>
    </nav>
  `;
}

export function closeCoursesDropdown() {
  const dropdown = document.getElementById('coursesNavDropdown');
  const hamburger = document.getElementById('coursesNavHamburger');
  if (!dropdown || dropdown.hidden) return;
  dropdown.hidden = true;
  hamburger?.classList.remove('active');
  hamburger?.setAttribute('aria-expanded', 'false');
}

export function isCoursesMobileNav() {
  return window.matchMedia(MOBILE_NAV_MQ).matches;
}

export async function openCoursesInProgress() {
  closeCoursesDropdown();
  if (isCoursesMobileNav()) {
    const { openInProgressSheet } = await import('./app-nav-in-progress.js');
    await openInProgressSheet();
    return;
  }
  const trigger = document.querySelector('[data-in-progress-trigger]');
  trigger?.click();
}

export function setCoursesNavActiveTab(activeTab) {
  document.querySelectorAll('[data-courses-tab]').forEach((el) => {
    const tab = el.dataset.coursesTab;
    const isActive = tab === activeTab;
    el.classList.toggle('courses-nav-link--active', el.classList.contains('courses-nav-link') && isActive);
    el.classList.toggle('courses-nav-dropdown__item--active', el.classList.contains('courses-nav-dropdown__item') && isActive);
  });
}

function bindCoursesDropdown() {
  if (document.body.dataset.coursesNavDropdownBound) return;
  document.body.dataset.coursesNavDropdownBound = 'true';

  document.addEventListener('click', (e) => {
    const hamburger = document.getElementById('coursesNavHamburger');
    const dropdown = document.getElementById('coursesNavDropdown');
    if (!hamburger || !dropdown) return;

    if (e.target.closest('#coursesNavHamburger')) {
      const open = dropdown.hidden;
      closeCoursesDropdown();
      if (open) {
        dropdown.hidden = false;
        hamburger.classList.add('active');
        hamburger.setAttribute('aria-expanded', 'true');
      }
      return;
    }

    if (e.target.closest('.courses-nav-dropdown__item[data-courses-tab]')) {
      closeCoursesDropdown();
    }

    if (!e.target.closest('#coursesNavDropdown') && !e.target.closest('#coursesNavHamburger')) {
      closeCoursesDropdown();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeCoursesDropdown();
  });
}

function initNavbarScroll() {
  if (document.body.dataset.coursesNavScrollBound) return;
  document.body.dataset.coursesNavScrollBound = 'true';

  const onScroll = () => {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  };
  onScroll();
  window.addEventListener('scroll', onScroll);
}

function bindCoursesNavInteractions(mount, { onTabSelect } = {}) {
  mount.querySelectorAll('[data-courses-tab]').forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const tab = el.dataset.coursesTab;
      if (tab) onTabSelect?.(tab);
      closeCoursesDropdown();
    });
  });

  const mobileInProgress = mount.querySelector('[data-mobile-in-progress-trigger]');
  if (mobileInProgress && !mobileInProgress.dataset.coursesDropdownBound) {
    mobileInProgress.dataset.coursesDropdownBound = '1';
    mobileInProgress.addEventListener('click', () => closeCoursesDropdown());
  }
}

export function initCoursesNav(mount, { activeTab = 'packs', summaries = null, onTabSelect } = {}) {
  mount._onTabSelect = onTabSelect;
  mount.innerHTML = buildCoursesNavHtml({ activeTab });
  initNavbarScroll();
  bindCoursesDropdown();
  bindCoursesNavInteractions(mount, { onTabSelect });
  initInProgressNav();

  mountProfileMenu('nav-auth', {
    summaries,
    deferProgressLine: !summaries,
  });
}

export function refreshCoursesNavProfile(mount, { activeTab, summaries }) {
  initCoursesNav(mount, {
    activeTab,
    summaries,
    onTabSelect: mount._onTabSelect,
  });
  refreshInProgressNav();
}

export { refreshInProgressNav };
