import { tabFromPath, pathForTab } from './routes.js';

export function getTabFromLocation(loc = window.location) {
  return tabFromPath(loc.pathname) ?? 'packs';
}

export function navigateToTab(tab, { replace = false } = {}) {
  const path = pathForTab(tab);
  const state = { coursesTab: tab };

  if (replace) {
    window.history.replaceState(state, '', path + window.location.search);
  } else {
    window.history.pushState(state, '', path + window.location.search);
  }
}

export function syncUrlWithTab(tab, { replace = true } = {}) {
  const path = pathForTab(tab);
  const current = window.location.pathname.replace(/\/+$/, '') || '/';
  const target = path.replace(/\/+$/, '') || '/';
  if (current === target) return;
  const state = { coursesTab: tab };
  if (replace) {
    window.history.replaceState(state, '', path + window.location.search);
  } else {
    window.history.pushState(state, '', path + window.location.search);
  }
}

export function bindPopState(onTab) {
  window.addEventListener('popstate', () => {
    onTab(getTabFromLocation());
  });
}
