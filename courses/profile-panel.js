import { getCurrentUser } from '../auth/auth-service.js';
import { getAllPackSummaries } from '../progress-facade.js';
import { bindHunterCardActions, renderHunterCard } from '../hunter-card.js';
import { initScrollAnimations } from '../site-nav.js';

export async function initProfilePanel() {
  initScrollAnimations();
  return renderProfilePanel();
}

export async function renderProfilePanel() {
  const user = getCurrentUser();
  const summaries = await getAllPackSummaries();
  renderHunterCard(user, summaries);
  bindHunterCardActions();
  return summaries;
}

export async function refreshProfilePanel() {
  return renderProfilePanel();
}
