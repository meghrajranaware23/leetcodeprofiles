/** Public API base URL — used for PayPal return URLs and frontend config. */
export function getPublicApiUrl() {
  return (
    process.env.API_BASE_URL
    || process.env.RENDER_EXTERNAL_URL
    || `http://localhost:${process.env.PORT || 3001}`
  ).replace(/\/$/, '');
}

/** Frontend URL for PayPal subscription return/cancel redirects. */
export function getFrontendBaseUrl() {
  return (
    process.env.FRONTEND_BASE_URL
    || 'http://localhost:5173'
  ).replace(/\/$/, '');
}

export function isRender() {
  return Boolean(process.env.RENDER);
}
