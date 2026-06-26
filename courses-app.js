import './firebase.js';
import { guardPage, hideAuthLoader } from './auth/auth-guard.js';
import { waitForSessionBootstrap } from './auth/auth-service.js';
import { onProgressSyncUpdated } from './auth/progress-sync-service.js';
import { redirectLegacyPaths } from './routes.js';
import { initBrandLogos, injectFavicon } from './brand-logo.js';
import { initSiteFooter } from './site-footer.js';
import { initAuthAwareLinks } from './auth/auth-guard.js';
import { getTabFromLocation, navigateToTab, bindPopState, syncUrlWithTab } from './courses-router.js';
import { initCoursesNav, setCoursesNavActiveTab, openCoursesInProgress, refreshInProgressNav } from './courses-nav.js';
import { initPacksPanel, refreshPacksPanel } from './courses/packs-panel.js';
import { initGuidePanel } from './courses/guide-panel.js';
import { initPricingPanel } from './courses/pricing-panel.js';
import { initProfilePanel, refreshProfilePanel } from './courses/profile-panel.js';

const PANEL_INIT = {
  packs: initPacksPanel,
  guide: initGuidePanel,
  pricing: (root) => initPricingPanel(root),
  profile: initProfilePanel,
};

const state = {
  activeTab: 'packs',
  initialized: new Set(),
  summaries: null,
};

function getPanelRoot(tab) {
  return document.getElementById(`panel-${tab}`);
}

function bindTabJumpLinks() {
  document.querySelectorAll('[data-courses-tab-jump]').forEach((el) => {
    if (el.dataset.bound) return;
    el.dataset.bound = '1';
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const tab = el.dataset.coursesTabJump;
      if (tab) showTab(tab);
    });
  });
}

async function showTab(tab, { skipHistory = false, replaceHistory = false } = {}) {
  if (tab === 'progress') {
    await openCoursesInProgress();
    syncUrlWithTab(state.activeTab || 'packs', { replace: true });
    return;
  }

  if (!PANEL_INIT[tab]) tab = 'packs';

  const prevPanel = getPanelRoot(state.activeTab);
  const nextPanel = getPanelRoot(tab);
  if (!nextPanel) return;

  if (prevPanel && state.activeTab !== tab) {
    prevPanel.hidden = true;
  }

  nextPanel.hidden = false;
  setCoursesNavActiveTab(tab);

  if (!state.initialized.has(tab)) {
    const initFn = PANEL_INIT[tab];
    if (tab === 'packs') {
      state.summaries = await initFn();
    } else if (tab === 'profile') {
      state.summaries = await initFn();
    } else if (tab === 'pricing') {
      await initFn(nextPanel);
    } else {
      await initFn();
    }
    state.initialized.add(tab);
  }

  if (!skipHistory) {
    if (replaceHistory) {
      syncUrlWithTab(tab, { replace: true });
    } else if (tab !== state.activeTab) {
      navigateToTab(tab);
    }
  }

  state.activeTab = tab;
  document.title = `${tabLabel(tab)} — LeetCode Profiles`;
  window.scrollTo(0, 0);
  bindTabJumpLinks();
}

function tabLabel(tab) {
  const labels = {
    packs: 'Packs',
    guide: 'Free Guide',
    progress: 'In Progress',
    pricing: 'Pricing',
    profile: 'Profile',
  };
  return labels[tab] || 'Courses';
}

async function refreshActiveTab() {
  if (state.activeTab === 'packs') {
    state.summaries = await refreshPacksPanel();
  } else if (state.activeTab === 'profile') {
    state.summaries = await refreshProfilePanel();
  }

  const navMount = document.getElementById('site-nav');
  if (navMount && state.summaries) {
    initCoursesNav(navMount, {
      activeTab: state.activeTab,
      summaries: state.summaries,
      onTabSelect: (t) => showTab(t),
    });
    refreshInProgressNav();
  }
}

function bindCoursesNav(mount, activeTab) {
  initCoursesNav(mount, {
    activeTab,
    summaries: state.summaries,
    onTabSelect: (tab) => showTab(tab),
  });
}

async function boot() {
  if (redirectLegacyPaths()) return;
  if (!(await guardPage())) return;

  const initialTab = getTabFromLocation();
  const panelTab = initialTab === 'progress' ? 'packs' : initialTab;
  state.activeTab = panelTab;

  const navMount = document.getElementById('site-nav');
  bindCoursesNav(navMount, panelTab);

  hideAuthLoader();
  injectFavicon();
  initSiteFooter({ variant: 'marketing' });
  initBrandLogos();
  initAuthAwareLinks(document);

  document.querySelectorAll('.courses-panel').forEach((panel) => {
    panel.hidden = panel.dataset.coursesPanel !== panelTab;
  });

  await showTab(panelTab, { skipHistory: true, replaceHistory: true });

  if (initialTab === 'progress') {
    await openCoursesInProgress();
  }

  bindPopState((tab) => {
    showTab(tab, { skipHistory: true });
  });

  window.addEventListener('courses:navigate-tab', (e) => {
    showTab(e.detail?.tab || 'packs');
  });

  onProgressSyncUpdated(({ changed }) => {
    if (changed) refreshActiveTab();
  });

  waitForSessionBootstrap().then(() => refreshActiveTab());
}

if (document.body.dataset.page === 'courses') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
}

export { showTab };
