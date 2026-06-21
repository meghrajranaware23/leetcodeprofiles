/* ══════════════════════════════════════════════════════════
   PACK CATALOG — Shared display metadata (no progress logic)
   URLs aligned with progress-store.js PACK_REGISTRY
   ══════════════════════════════════════════════════════════ */

export const PACK_CATALOG = Object.freeze([
  {
    id: 'leetcode-starter',
    kind: 'onboarding',
    icon: '🚀',
    title: 'LeetCode Starter Path',
    shortTitle: 'Starter Path',
    description: 'Beginner onboarding — set up your workflow, build daily habits, and earn your first accepted submissions in 15 days.',
    readerUrl: '/starter',
    duration: '15 Days',
    stats: ['📋 15 Days', '🎯 3 Phases', '🌱 Beginner'],
    pills: ['Setup', 'First Wins', 'Momentum'],
    badge: 'BEGINNER',
    badgeStyle: '',
    startLabel: 'START PATH →',
    featured: true,
    order: 0,
    price: '$12',
    progressId: 'starter-pack-progress',
    startBtnId: 'starter-start',
  },
  {
    id: 'recursion',
    kind: 'ascension',
    icon: '🔄',
    title: 'Recursion & Backtracking',
    shortTitle: 'Recursion',
    description: 'Visual-first recursive thinking — call stacks, backtracking, and pattern recognition',
    readerUrl: './recursion-reader.html',
    duration: '30 Days',
    stats: ['📋 30 Days', '⚔ 6 Ranks', '💻 3 Languages'],
    pills: ['C++', 'Python', 'Java'],
    badge: 'AVAILABLE NOW',
    badgeStyle: 'live',
    startLabel: 'START PACK →',
    featured: false,
    order: 1,
    price: '$12',
    progressId: 'recursion-pack-progress',
    startBtnId: 'recursion-start',
  },
  {
    id: 'trees',
    kind: 'ascension',
    icon: '🌲',
    title: 'Trees Ascension',
    shortTitle: 'Trees',
    description: 'Visual-first tree learning — DFS, BFS, BST, LCA, tries, and tree DP',
    readerUrl: './trees-reader.html',
    duration: '30 Days',
    stats: ['📋 30 Days', '⚔ 6 Ranks', '💻 3 Languages'],
    pills: ['C++', 'Python', 'Java'],
    badge: 'AVAILABLE NOW',
    badgeStyle: 'live',
    startLabel: 'START PACK →',
    featured: false,
    order: 2,
    price: '$12',
    progressId: 'trees-pack-progress',
    startBtnId: 'trees-start',
  },
  {
    id: 'graphs',
    kind: 'ascension',
    icon: '🕸️',
    title: 'Graphs Ascension',
    shortTitle: 'Graphs',
    description: 'Visual-first graph learning — BFS, DFS, Union-Find, Dijkstra, and more',
    readerUrl: './graphs-reader.html',
    duration: '30 Days',
    stats: ['📋 30 Days', '⚔ 6 Ranks', '💻 3 Languages'],
    pills: ['C++', 'Python', 'Java'],
    badge: 'AVAILABLE NOW',
    badgeStyle: 'live',
    startLabel: 'START PACK →',
    featured: false,
    order: 3,
    price: '$12',
    progressId: 'graphs-pack-progress',
    startBtnId: 'graphs-start',
  },
  {
    id: 'dynamic-programming',
    kind: 'ascension',
    icon: '⚡',
    title: 'Dynamic Programming',
    shortTitle: 'Dynamic Programming',
    description: 'Visual-first DP learning — state transitions, the DP pipeline, and pattern recognition',
    readerUrl: './dp-reader.html',
    duration: '30 Days',
    stats: ['📋 30 Days', '⚔ 6 Ranks', '💻 3 Languages'],
    pills: ['C++', 'Python', 'Java'],
    badge: 'AVAILABLE NOW',
    badgeStyle: 'live',
    startLabel: 'START PACK →',
    featured: false,
    order: 4,
    price: '$12',
    progressId: 'dynamic-programming-pack-progress',
    startBtnId: 'dp-start',
  },
  {
    id: 'arrays-strings',
    kind: 'ascension',
    icon: '📐',
    title: 'Arrays & Strings',
    shortTitle: 'Arrays & Strings',
    description: 'Two pointers, sliding window, prefix sums — interview essentials',
    readerUrl: './course-reader.html',
    duration: '30 Days',
    stats: ['📋 30 Days', '⚔ 6 Ranks', '💻 3 Languages'],
    pills: ['C++', 'Python', 'Java'],
    badge: 'AVAILABLE NOW',
    badgeStyle: 'live',
    startLabel: 'START PACK →',
    featured: false,
    order: 5,
    price: '$12',
    progressId: 'arrays-pack-progress',
    startBtnId: 'arrays-strings-start',
  },
]);

export function getFeaturedPack() {
  return PACK_CATALOG.find(p => p.featured) || PACK_CATALOG[0];
}

export function getTopicPacks() {
  return PACK_CATALOG.filter(p => p.kind === 'ascension').sort((a, b) => a.order - b.order);
}

export function getAllPacksSorted() {
  return [...PACK_CATALOG].sort((a, b) => a.order - b.order);
}

export function getPackById(id) {
  return PACK_CATALOG.find(p => p.id === id) || null;
}

/** Packs shown on homepage teaser (Starter + Arrays + 2 topic packs) */
export function getTeaserPacks() {
  const featured = getFeaturedPack();
  const arrays = getPackById('arrays-strings');
  const others = getTopicPacks()
    .filter(p => p.id !== 'arrays-strings')
    .slice(0, 2);
  return [featured, arrays, ...others].filter(Boolean);
}
