const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-QHV2PZ8SSP';

const ENABLED =
  import.meta.env.VITE_GA_ENABLED === 'true' ||
  !import.meta.env.DEV;

let initialized = false;

export function isAnalyticsEnabled() {
  return ENABLED && Boolean(MEASUREMENT_ID);
}

export function initAnalytics() {
  if (!isAnalyticsEnabled() || initialized) return;
  initialized = true;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', MEASUREMENT_ID, { send_page_view: false });

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  document.head.appendChild(script);
}

export function trackPageView(pagePath, pageTitle) {
  if (!isAnalyticsEnabled() || typeof window.gtag !== 'function') return;

  const path =
    pagePath ||
    `${window.location.pathname}${window.location.search}${window.location.hash}`;

  window.gtag('config', MEASUREMENT_ID, {
    page_path: path,
    page_title: pageTitle || document.title,
  });
}
