import { mountProfileMenu, closeAllProfileMenus } from './auth/auth-ui.js';
import { buildLogoHtml } from './brand-logo.js';
import { routeForTab } from './routes.js';
import { initInProgressNav, refreshInProgressNav } from './app-nav-in-progress.js';
import { createNavDropdownController } from './nav-dropdown.js';

const TAB_LABELS = {
  packs: 'Packs',
  guide: 'Free Guide',
  progress: 'In Progress',
  pricing: 'Pricing',
  profile: 'Profile',
};

const TAB_ORDER = ['packs', 'guide', 'progress', 'pricing', 'profile'];

const MOBILE_NAV_MQ = '(max-width: 1024px)';

let coursesDropdownController = null;

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
      return `<button type="button" class="nav-dropdown__item courses-nav-dropdown__item" data-mobile-in-progress-trigger role="menuitem">${TAB_LABELS[tab]}</button>`;
    }
    const activeClass = tab === activeTab ? ' nav-dropdown__item--active courses-nav-dropdown__item--active' : '';
    return `<a href="${routeForTab(tab)}" class="nav-dropdown__item courses-nav-dropdown__item${activeClass}" data-courses-tab="${tab}" role="menuitem">${TAB_LABELS[tab]}</a>`;
  }).join('');
}

export function buildCoursesNavHtml({ activeTab = 'packs' } = {}) {
  return `
    <nav class="navbar navbar--courses" id="navbar">
      <div class="courses-nav-start">
        <div class="courses-nav-menu">
          <button class="courses-nav-hamburger" id="coursesNavHamburger" type="button" aria-label="Menu" aria-expanded="false" aria-haspopup="true" aria-controls="coursesNavDropdown">
            <span></span><span></span><span></span>
          </button>
          <div class="nav-dropdown courses-nav-dropdown" id="coursesNavDropdown" role="menu" hidden>
            ${buildDropdownItems(activeTab)}
          </div>
        </div>
        ${buildLogoHtml({ href: routeForTab('packs'), ariaLabel: 'LeetCode Profiles courses' })}
      </div>
      <div class="courses-nav-center">
        <div class="courses-nav-links">
          ${buildDesktopTabs(activeTab)}
        </div>
      </div>
      <div class="nav-actions nav-actions--courses">
        <div id="nav-auth" class="nav-auth"></div>
      </div>
    </nav>
  `;
}

function ensureCoursesDropdownController() {
  if (!coursesDropdownController) {
    coursesDropdownController = createNavDropdownController({
      triggerId: 'coursesNavHamburger',
      dropdownId: 'coursesNavDropdown',
      align: 'start',
      bindKey: 'coursesNavDropdownBound',
      onOpen: () => closeAllProfileMenus(),
    });
    coursesDropdownController.bind();
  }
  return coursesDropdownController;
}

export function closeCoursesDropdown() {
  ensureCoursesDropdownController().close();
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
    el.classList.toggle('nav-dropdown__item--active', el.classList.contains('nav-dropdown__item') && isActive);
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
  const controller = ensureCoursesDropdownController();
  controller.close();
  controller.removeOrphan();

  mount._onTabSelect = onTabSelect;
  mount.innerHTML = buildCoursesNavHtml({ activeTab });
  initNavbarScroll();
  bindCoursesNavInteractions(mount, { onTabSelect });
  initInProgressNav();

  mountProfileMenu('nav-auth', {
    summaries,
    deferProgressLine: !summaries,
    menu: 'courses',
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
