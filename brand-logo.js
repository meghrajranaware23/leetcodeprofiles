import logoIconUrl from './src/assets/icon.png';

export const LOGO_ICON_URL = logoIconUrl;

export function buildLogoHtml({
  href,
  ariaLabel = 'LeetCode Profiles',
  className = 'nav-logo',
} = {}) {
  return `<a href="${href}" class="${className}" aria-label="${ariaLabel}">
    <img class="logo-icon" src="${logoIconUrl}" alt="" width="28" height="28" decoding="async" aria-hidden="true">
    <span class="logo-leet">LEETCODE</span>
    <span class="logo-profiles">PROFILES</span>
  </a>`;
}

/** Replace legacy ■ marks in static HTML logos (footers, sign-in). */
export function initBrandLogos() {
  document.querySelectorAll('.nav-logo, .sign-in-logo').forEach((el) => {
    if (el.querySelector('.logo-icon')) return;

    const mark = el.querySelector('.logo-mark');
    if (!mark) return;

    const img = document.createElement('img');
    img.className = 'logo-icon';
    img.src = logoIconUrl;
    img.alt = '';
    img.width = 28;
    img.height = 28;
    img.decoding = 'async';
    img.setAttribute('aria-hidden', 'true');
    mark.replaceWith(img);
  });
}

export function injectFavicon() {
  if (document.querySelector('link[rel="icon"][data-brand-icon]')) return;

  const link = document.createElement('link');
  link.rel = 'icon';
  link.type = 'image/png';
  link.href = logoIconUrl;
  link.dataset.brandIcon = 'true';
  document.head.appendChild(link);
}
