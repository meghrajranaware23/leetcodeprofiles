import { ROUTES } from './routes.js';
import { buildLogoHtml } from './brand-logo.js';

const HELP_EMAIL = 'leetcodeprofiles@gmail.com';
const COPYRIGHT = '© 2026 LeetCode Profiles. All rights reserved.';

function exploreLinksHtml() {
  return `
    <a href="${ROUTES.marketing}">Home</a>
    <a href="${ROUTES.packs}" data-auth-target="${ROUTES.packs}">Packs</a>
    <a href="${ROUTES.features}">Features</a>
    <a href="${ROUTES.pricing}">Pricing</a>
    <a href="${ROUTES.ranks}">Ranks</a>
    <a href="${ROUTES.howItWorks}">How It Works</a>
    <a href="https://www.instagram.com/leetcodeprofiles" target="_blank" rel="noopener noreferrer">Instagram</a>
    <a href="https://www.youtube.com/@leetcodeprofiless" target="_blank" rel="noopener noreferrer">YouTube</a>
  `;
}

function legalLinksHtml() {
  return `
    <a href="${ROUTES.privacy}">Privacy Policy</a>
    <a href="${ROUTES.terms}">Terms &amp; Conditions</a>
    <a href="mailto:${HELP_EMAIL}" class="footer-help-email">Help — ${HELP_EMAIL}</a>
  `;
}

function buildMarketingFooterHtml() {
  return `
    <div class="footer-content footer-grid">
      <div class="footer-col footer-col-brand">
        ${buildLogoHtml({ href: ROUTES.marketing, ariaLabel: 'LeetCode Profiles home' })}
        <p class="footer-tagline">Made for coders who refuse to stay E-Rank.</p>
      </div>
      <div class="footer-col">
        <h3 class="footer-col-title">Explore</h3>
        <nav class="footer-links footer-links-col" aria-label="Site links">
          ${exploreLinksHtml()}
        </nav>
      </div>
      <div class="footer-col">
        <h3 class="footer-col-title">Legal &amp; Help</h3>
        <nav class="footer-links footer-links-col" aria-label="Legal and help">
          ${legalLinksHtml()}
        </nav>
      </div>
      <div class="footer-copy footer-copy-full">${COPYRIGHT}</div>
    </div>
  `;
}

function buildAppFooterHtml() {
  return `
    <div class="footer-content footer-content--app footer-grid footer-grid--app">
      <div class="footer-col footer-col-brand">
        ${buildLogoHtml({ href: ROUTES.packs, ariaLabel: 'LeetCode Profiles packs' })}
      </div>
      <nav class="footer-links footer-links-app" aria-label="Legal and help">
        ${legalLinksHtml()}
      </nav>
      <div class="footer-copy">${COPYRIGHT}</div>
    </div>
  `;
}

export function initSiteFooter(options = {}) {
  const mount = document.getElementById('site-footer');
  if (!mount) return;

  const variant = options.variant || 'marketing';
  mount.className = variant === 'app' ? 'footer footer--app' : 'footer';
  mount.innerHTML = variant === 'app' ? buildAppFooterHtml() : buildMarketingFooterHtml();
}
