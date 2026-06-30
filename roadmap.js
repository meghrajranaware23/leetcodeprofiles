import { getPackById, getPackCtaLabel } from './pack-catalog.js';

const RANK_ORDER = ['e', 'd', 'c', 'b', 'a', 's'];
const PHASE_ORDER = ['p1', 'p2', 'p3'];

const DAILY_STEPS = [
  { icon: '📝', title: 'Learn the Pattern', desc: 'One focused concept with recognition signals and worked examples.' },
  { icon: '⚔', title: 'Solve 2 Curated Problems', desc: 'Hand-picked LeetCode quests with full walkthroughs in 3 languages.' },
  { icon: '✅', title: 'Checkpoint', desc: 'Pattern drill, transfer problems, and optional practice queue.' },
];

const STARTER_DAILY_STEPS = [
  { icon: '📝', title: 'Read the Guide', desc: 'One focused skill lesson with examples and a clear takeaway.' },
  { icon: '⚔', title: 'Solve LeetCode Problems', desc: 'Hand-picked Easy problems that reinforce the day\'s skill.' },
  { icon: '✅', title: 'Reflect and Build Habits', desc: 'Checkpoint, reflection prompt, and one habit to lock in.' },
];

const STARTER_OUTCOMES = [
  'Read any LeetCode problem with a 4-part framework',
  'Solve Easy problems independently with a repeatable workflow',
  'Debug systematically instead of guessing',
  'Build a consistent daily practice habit',
  'Choose your first Ascension pack with confidence',
];

const PACK_ROADMAP_CONFIG = {
  'leetcode-starter': {
    kind: 'starter',
    contentImport: () => import('./starter-content.js').then(m => m.COURSE_LESSONS),
    subtitle: 'Your 15-Day Beginner Roadmap',
    phaseMeta: {
      p1: {
        label: 'Phase 1',
        name: 'Setup & Mindset',
        title: 'Apprentice',
        color: '#4A9EFF',
        css: 'rank-d',
        days: '1–5',
        theme: 'Account setup, reading problems, and the daily hunter workflow',
        proof: 'Valid Palindrome',
      },
      p2: {
        label: 'Phase 2',
        name: 'First Wins',
        title: 'Practitioner',
        color: '#4AFF9E',
        css: 'rank-c',
        days: '6–10',
        theme: 'Guided Easy problems, debugging, and your first independent solves',
        proof: 'Best Time to Buy and Sell Stock',
      },
      p3: {
        label: 'Phase 3',
        name: 'Build Momentum',
        title: 'Independent Solver',
        color: '#FFD700',
        css: 'rank-b',
        days: '11–15',
        theme: 'Independent practice, consistency habits, and choosing your next Ascension pack',
        proof: 'Maximum Subarray',
      },
    },
    leadText:
      'Most beginners bounce between random Easy problems and never build a system. The Starter Path gives you a daily workflow, curated first wins, and the confidence to pick your first Ascension pack.',
    skills: {
      p1: [
        'LeetCode platform navigation',
        '4-part problem reading framework',
        'Example tracing on paper',
        'Constraint & edge case analysis',
        'Think-before-code workflow',
      ],
      p2: [
        '5-minute attempt rule',
        'Systematic debugging',
        'Productive editorial learning',
        'Mistake identification',
        'Independent solving',
      ],
      p3: [
        'Basic pattern family recognition',
        'Mistake journal review',
        'Effective practice planning',
        'Contest & interview mindset',
        'Long-term roadmap design',
      ],
    },
    daySummaries: {
      1: 'Navigate LeetCode, configure your environment, and earn your first Accepted submission',
      2: 'Apply the 4-part reading framework before opening your editor',
      3: 'Use given examples and create your own test cases on paper',
      4: 'Read constraints for edge cases, time limits, and valid input ranges',
      5: 'Use brute force thinking and the 5-minute attempt rule before coding',
      6: 'Commit to genuine attempts before hints; normalize getting stuck',
      7: 'Debug systematically with small inputs, print statements, and diff-checking',
      8: 'Extract understanding from solutions without copy-pasting',
      9: 'Recognize and fix the top beginner failure patterns',
      10: 'Solve with minimal guidance; trust your workflow',
      11: 'Notice problem families without deep pattern mastery',
      12: 'Run a structured mistake review session; spaced repetition of weak spots',
      13: 'Quality over quantity; spaced repetition; when to move on',
      14: 'Understand LeetCode contests, time pressure, and interview context',
      15: 'Choose your next Ascension pack; commit to a 90-day plan',
    },
  },
  'arrays-strings': {
    contentImport: () => import('./course-content.js').then(m => m.COURSE_LESSONS),
    rankMeta: {
      e: { label: 'E-Rank', name: 'Foundation', color: '#666666', css: 'rank-e', days: '1–5', theme: 'Core traversal, hashing, prefix sums' },
      d: { label: 'D-Rank', name: 'Builder', color: '#4A9EFF', css: 'rank-d', days: '6–10', theme: 'Two pointers, sliding window' },
      c: { label: 'C-Rank', name: 'Warrior', color: '#4AFF9E', css: 'rank-c', days: '11–16', theme: "Kadane's, intervals, greedy" },
      b: { label: 'B-Rank', name: 'Commander', color: '#FFD700', css: 'rank-b', days: '17–22', theme: 'Monotonic stack, matrix, 2D prefix' },
      a: { label: 'A-Rank', name: 'Elite', color: '#FF6B35', css: 'rank-a', days: '23–27', theme: 'String algorithms, bitmask' },
      s: { label: 'S-Rank', name: 'Legend', color: '#E50000', css: 'rank-s', days: '28–30', theme: 'Multi-pattern synthesis, contest problems' },
    },
    leadText: 'From basic traversal to contest-level synthesis — a structured daily system that builds real pattern recognition.',
    outcomeDescription: 'core patterns across arrays and strings',
  },
  recursion: {
    contentImport: () => import('./recursion-content.js').then(m => m.COURSE_LESSONS),
    rankMeta: {
      e: { label: 'E-Rank', name: 'Novice', color: '#666666', css: 'rank-e', days: '1–5', theme: 'Recursive mental model, base cases, linear recursion' },
      d: { label: 'D-Rank', name: 'Apprentice', color: '#4A9EFF', css: 'rank-d', days: '6–10', theme: 'Multiple calls, divide and conquer, string recursion' },
      c: { label: 'C-Rank', name: 'Pathfinder', color: '#4AFF9E', css: 'rank-c', days: '11–15', theme: 'Backtracking template, permutations, combinations' },
      b: { label: 'B-Rank', name: 'Strategist', color: '#FFD700', css: 'rank-b', days: '16–22', theme: 'Pruning, board/grid problems, partition, memoization bridge' },
      a: { label: 'A-Rank', name: 'Master', color: '#FF6B35', css: 'rank-a', days: '23–27', theme: 'Recursion + memoization, advanced backtracking, synthesis' },
      s: { label: 'S-Rank', name: 'Legend', color: '#E50000', css: 'rank-s', days: '28–30', theme: 'Multi-pattern recursive synthesis, contest problems' },
    },
    leadText: 'From the recursive mental model to advanced backtracking synthesis — a structured daily system that builds real pattern recognition for recursive problems.',
    outcomeDescription: 'core recursion and backtracking patterns',
    daySummaries: {
      1: 'Build the mental model for how recursion breaks problems into subproblems',
      2: 'Define base cases and form recursive hypotheses for correct solutions',
      3: 'Apply recursion to arrays and linked lists for traversal and transformation',
      4: 'Use return values to propagate computed results back up the call stack',
      5: 'Pass accumulating state through parameters to guide recursive decisions',
      6: 'Handle problems requiring two or more recursive branches per call',
      7: 'Split problems in half and merge results for efficient solutions',
      8: 'Generate and transform strings character by character with recursion',
      9: 'Apply recursive patterns to tree structures for traversal and computation',
      10: 'Design helper functions to simplify complex recursive interfaces',
      11: 'Learn the choose-explore-unchoose backtracking template',
      12: 'Generate all permutations with swap-based and visited-set approaches',
      13: 'Generate combinations and subsets with index-based pruning',
      14: 'Apply backtracking to string partitioning and palindrome problems',
      15: 'Solve combination sum variants with duplicate handling and constraints',
      16: 'Manage complex state objects during backtracking exploration',
      17: 'Prune search spaces early to avoid unnecessary recursive branches',
      18: 'Solve N-Queens, Sudoku, and grid-based constraint satisfaction',
      19: 'Partition arrays and strings into valid groups using backtracking',
      20: 'Build strings incrementally with backtracking for valid constructions',
      21: 'Bridge backtracking with memoization for overlapping subproblems',
      22: 'Handle advanced multi-constraint backtracking with complex validation',
      23: 'Add memoization to recursive solutions for top-down dynamic programming',
      24: 'Apply advanced backtracking to word search, expression parsing, and graphs',
      25: 'Use recursion for mathematical computations and combinatorial counting',
      26: 'Combine multiple backtracking patterns in single complex problems',
      27: 'Solve timed problems using rapid recursive pattern recognition',
      28: 'Synthesize multi-pattern recursion on hard problems',
      29: 'Handle complex state recursion combining tries and advanced patterns',
      30: 'Synthesize all recursion and backtracking patterns on contest-level problems',
    },
  },
  trees: {
    contentImport: () => import('./trees-content.js').then(m => m.COURSE_LESSONS),
    rankMeta: {
      e: { label: 'E-Rank', name: 'Foundation', color: '#666666', css: 'rank-e', days: '1–5', theme: 'DFS/BFS traversals, tree properties, comparison' },
      d: { label: 'D-Rank', name: 'Builder', color: '#4A9EFF', css: 'rank-d', days: '6–10', theme: 'Top-down DFS, bottom-up DFS, tree construction' },
      c: { label: 'C-Rank', name: 'Warrior', color: '#4AFF9E', css: 'rank-c', days: '11–16', theme: 'BST, LCA, path problems, serialization' },
      b: { label: 'B-Rank', name: 'Commander', color: '#FFD700', css: 'rank-b', days: '17–22', theme: 'Tree views, manipulation, tries, tree DP' },
      a: { label: 'A-Rank', name: 'Elite', color: '#FF6B35', css: 'rank-a', days: '23–27', theme: 'Advanced BST, trie applications, Morris traversal' },
      s: { label: 'S-Rank', name: 'Legend', color: '#E50000', css: 'rank-s', days: '28–30', theme: 'Multi-pattern tree synthesis, contest problems' },
    },
    leadText: 'From basic traversals to advanced tree algorithms — a structured daily system that builds real pattern recognition for tree problems.',
    outcomeDescription: 'core tree algorithms and recursive traversal patterns',
    daySummaries: {
      1: 'Understand nodes, edges, parent-child relationships, and tree representations',
      2: 'Master inorder, preorder, and postorder depth-first traversals',
      3: 'Traverse trees level by level using queues for breadth-first exploration',
      4: 'Compute height, depth, and node counts through recursive properties',
      5: 'Compare tree structures and detect subtree relationships',
      6: 'Pass accumulated state downward through recursive DFS calls',
      7: 'Gather and combine results from children upward to parents',
      8: 'Reconstruct trees from traversal sequences using divide and conquer',
      9: 'Solve level-order problems with custom processing per level',
      10: 'Convert between recursive and iterative approaches using explicit stacks',
      11: 'Search, validate, and reason about binary search tree invariants',
      12: 'Insert, delete, and find kth elements in BSTs',
      13: 'Find the lowest common ancestor using split-point detection',
      14: 'Compute path sums from root-to-leaf and between arbitrary nodes',
      15: 'Calculate tree width, vertical order, and coordinate-based queries',
      16: 'Serialize trees to strings and reconstruct them from encoded formats',
      17: 'Extract left/right/top/bottom views and boundary projections',
      18: 'Merge, flatten, and transform tree structures in place',
      19: 'Build and traverse N-ary trees and trie data structures',
      20: 'Apply dynamic programming on trees for optimal substructure problems',
      21: 'Count, sum, and compare subtree values for pattern detection',
      22: 'Treat trees as graphs for BFS-based distance and neighbor problems',
      23: 'Augment BSTs with extra data and implement iterator patterns',
      24: 'Apply tries to autocomplete, word search, and prefix matching',
      25: 'Compute distances between nodes and find tree diameters',
      26: 'Traverse trees in O(1) space using Morris threading technique',
      27: 'Solve hybrid problems combining tree structure with graph algorithms',
      28: 'Combine recursion with hash maps and data structures on trees',
      29: 'Synthesize design patterns with multi-type traversals',
      30: 'Synthesize all tree patterns on contest-level problems',
    },
  },
  graphs: {
    contentImport: () => import('./graphs-content.js').then(m => m.COURSE_LESSONS),
    rankMeta: {
      e: { label: 'E-Rank', name: 'Foundation', color: '#666666', css: 'rank-e', days: '1–5', theme: 'BFS, DFS, grids as graphs, connected components' },
      d: { label: 'D-Rank', name: 'Builder', color: '#4A9EFF', css: 'rank-d', days: '6–10', theme: 'Multi-source BFS, shortest path, state-space search' },
      c: { label: 'C-Rank', name: 'Warrior', color: '#4AFF9E', css: 'rank-c', days: '11–16', theme: 'Topological sort, cycle detection, bipartite graphs' },
      b: { label: 'B-Rank', name: 'Commander', color: '#FFD700', css: 'rank-b', days: '17–22', theme: 'Union-Find, Dijkstra, minimum spanning tree' },
      a: { label: 'A-Rank', name: 'Elite', color: '#FF6B35', css: 'rank-a', days: '23–27', theme: 'Advanced state BFS, graph modeling, multi-pattern' },
      s: { label: 'S-Rank', name: 'Legend', color: '#E50000', css: 'rank-s', days: '28–30', theme: "Euler paths, Tarjan's bridges, contest synthesis" },
    },
    leadText: 'From basic traversal to advanced graph algorithms — a structured daily system that builds real pattern recognition for graph problems.',
    outcomeDescription: 'core graph algorithms and traversal patterns',
    daySummaries: {
      1: 'Understand nodes, edges, adjacency lists, and how to represent any graph',
      2: 'Learn level-order traversal and shortest path in unweighted graphs',
      3: 'Master recursive and iterative depth exploration of connected nodes',
      4: 'Convert 2D matrices into implicit graphs using directional neighbors',
      5: 'Find, count, and measure disconnected graph components',
      6: 'Propagate from multiple starting points simultaneously',
      7: 'Solve problems by starting DFS/BFS from edges inward',
      8: 'Find minimum-step paths using BFS in grids and adjacency graphs',
      9: 'Handle directed edges, path enumeration, and route reordering',
      10: 'Model abstract states as graph nodes to find shortest transformations',
      11: "Detect cycles and linearize DAGs with DFS and Kahn's algorithm",
      12: 'Schedule tasks, validate orderings, and find dependency chains',
      13: 'Two-color graphs to check partition validity and detect odd cycles',
      14: 'Count paths, find longest paths, and reason on acyclic structures',
      15: 'Determine connectivity and transitive closure efficiently',
      16: 'Simplify graphs by removing redundant nodes and edges',
      17: 'Learn path compression, union by rank, and component tracking',
      18: 'Solve connectivity, redundant edges, and dynamic merging problems',
      19: 'Find shortest weighted paths with a priority queue',
      20: 'Handle negative weights, k-stops, and multi-criteria paths',
      21: 'Connect all nodes with minimum total edge weight using Kruskal/Prim',
      22: 'Mix BFS, Union-Find, and sorting to solve multi-step problems',
      23: 'Encode complex states (bitmask, multi-variable) for BFS exploration',
      24: 'Transform real-world problems into graph structures for solving',
      25: 'Handle time-varying, conditional, and multi-layer shortest paths',
      26: 'Combine depth-first search with caching for optimal substructure',
      27: 'Combine 2-3 graph techniques in a single problem',
      28: 'Threshold BFS, binary search on paths, multi-state optimization',
      29: 'Euler paths, bridges, articulation points, and advanced connectivity',
      30: 'Synthesize all graph patterns on contest-level problems',
    },
  },
  'dynamic-programming': {
    contentImport: () => import('./dp-content.js').then(m => m.COURSE_LESSONS),
    rankMeta: {
      e: { label: 'E-Rank', name: 'Novice', color: '#666666', css: 'rank-e', days: '1–5', theme: 'DP mental model, memoization, tabulation' },
      d: { label: 'D-Rank', name: 'Apprentice', color: '#4A9EFF', css: 'rank-d', days: '6–10', theme: 'Take or skip, counting, cost optimization' },
      c: { label: 'C-Rank', name: 'Pathfinder', color: '#4AFF9E', css: 'rank-c', days: '11–16', theme: 'Grid DP, LIS, LCS, palindrome DP' },
      b: { label: 'B-Rank', name: 'Strategist', color: '#FFD700', css: 'rank-b', days: '17–22', theme: 'Knapsack variants, state machine DP' },
      a: { label: 'A-Rank', name: 'Master', color: '#FF6B35', css: 'rank-a', days: '23–27', theme: 'Advanced string DP, multi-dimensional state' },
      s: { label: 'S-Rank', name: 'Legend', color: '#E50000', css: 'rank-s', days: '28–30', theme: 'DP synthesis, interval DP, contest problems' },
    },
    leadText: 'From the DP mental model to multi-pattern synthesis — a structured daily system that builds real pattern recognition for dynamic programming problems.',
    outcomeDescription: 'core dynamic programming patterns and state transition design',
    daySummaries: {
      1: 'Recognize overlapping subproblems and define optimal substructure',
      2: 'Cache recursive results to eliminate repeated computation',
      3: 'Build solutions iteratively from base cases upward',
      4: 'Apply the state-transition-base case framework to any DP problem',
      5: 'Model choices at each step and pick the optimal decision',
      6: 'Classic include/exclude patterns for subset selection problems',
      7: 'Count distinct ways to partition, climb, or compose targets',
      8: 'Minimize or maximize cost over sequential decisions',
      9: 'Handle wrap-around arrays and extended decision spaces',
      10: 'Choose among 3+ options at each state transition',
      11: 'Navigate grids with path counting and min-cost traversal',
      12: 'Find longest increasing subsequences with patience sorting',
      13: 'Align two sequences to find their longest common subsequence',
      14: 'Detect, count, and partition palindromic substrings and subsequences',
      15: 'Match, decode, and interleave strings with DP state design',
      16: 'Solve edit distance, distinct subsequences, and sequence alignment',
      17: 'Select items with weight constraints to maximize value',
      18: 'Handle unlimited item supply for coin change and rod cutting',
      19: 'Partition subsets, target sums, and multi-constraint knapsacks',
      20: 'Model problems with explicit states and allowed transitions',
      21: 'Transform one string into another with minimum operations',
      22: 'Count valid structures like BSTs, parenthesizations, and decodings',
      23: 'Handle wildcards, regex matching, and complex string decisions',
      24: 'Combine counting with state constraints for hard problems',
      25: 'Design states with 2-3 dimensions for complex constraints',
      26: 'Recognize which DP pattern applies and combine techniques',
      27: 'Solve timed problems using rapid pattern recognition',
      28: 'Combine grid DP, knapsack, and subsequence techniques',
      29: 'Stack interval DP, string DP, and state machines together',
      30: 'Synthesize all DP patterns on contest-level problems',
    },
  },
};

const overlayMap = new Map();
const roadmapDataMap = new Map();
const lessonsPromiseMap = new Map();

let activePackId = null;
let triggerEl = null;
let bound = false;
let keydownBound = false;

function getPackConfig(packId) {
  return PACK_ROADMAP_CONFIG[packId] || null;
}

function getCourseLessons(packId) {
  const config = getPackConfig(packId);
  if (!config) return Promise.resolve([]);

  if (!lessonsPromiseMap.has(packId)) {
    lessonsPromiseMap.set(packId, config.contentImport());
  }
  return lessonsPromiseMap.get(packId);
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function cleanQuestTitle(title) {
  return title.replace(/^Quest:\s*/i, '');
}

function buildRoadmapData(packId, lessons) {
  if (roadmapDataMap.has(packId)) return roadmapDataMap.get(packId);

  const teachingLessons = lessons.filter(l => l.rank !== 'intro' && l.day > 0);
  const concepts = teachingLessons.filter(l => l.type === 'concept');
  const quests = teachingLessons.filter(l => l.type === 'quest');
  const tests = teachingLessons.filter(l => l.type === 'test');
  const teachingDays = new Set(concepts.map(c => c.day));

  const ranks = {};
  for (const rank of RANK_ORDER) {
    ranks[rank] = { days: {}, tests: [] };
  }

  for (const lesson of teachingLessons) {
    const rank = lesson.rank;
    if (!ranks[rank]) continue;

    if (lesson.type === 'test') {
      ranks[rank].tests.push(lesson);
      continue;
    }

    if (lesson.type === 'complete') continue;

    if (!ranks[rank].days[lesson.day]) {
      ranks[rank].days[lesson.day] = {
        day: lesson.day,
        dayTitle: lesson.dayTitle,
        concept: null,
        quests: [],
        checkpoint: null,
      };
    }

    const dayEntry = ranks[rank].days[lesson.day];
    if (lesson.type === 'concept') dayEntry.concept = lesson;
    else if (lesson.type === 'quest') dayEntry.quests.push(lesson);
    else if (lesson.type === 'checkpoint') dayEntry.checkpoint = lesson;
  }

  const patternNames = concepts.map(c => c.title);

  const data = {
    stats: {
      days: teachingDays.size,
      ranks: RANK_ORDER.length,
      problems: quests.length + tests.length,
      patterns: concepts.length,
      languages: ['C++', 'Python', 'Java'],
    },
    ranks,
    patternNames,
    concepts,
  };

  roadmapDataMap.set(packId, data);
  return data;
}

function buildStarterRoadmapData(packId, lessons) {
  if (roadmapDataMap.has(packId)) return roadmapDataMap.get(packId);

  const teachingLessons = lessons.filter(l => l.rank !== 'intro' && l.day > 0);
  const concepts = teachingLessons.filter(l => l.type === 'concept' && !/^Setup Mission:/i.test(l.title));
  const quests = teachingLessons.filter(l => l.type === 'quest');
  const tests = teachingLessons.filter(l => l.type === 'test');
  const teachingDays = new Set(concepts.map(c => c.day));

  const phases = {};
  for (const phase of PHASE_ORDER) {
    phases[phase] = { days: {}, tests: [] };
  }

  for (const lesson of teachingLessons) {
    const phase = lesson.rank;
    if (!phases[phase]) continue;

    if (lesson.type === 'test') {
      phases[phase].tests.push(lesson);
      continue;
    }

    if (lesson.type === 'complete') continue;

    if (!phases[phase].days[lesson.day]) {
      phases[phase].days[lesson.day] = {
        day: lesson.day,
        dayTitle: lesson.dayTitle,
        concept: null,
        quests: [],
        checkpoint: null,
      };
    }

    const dayEntry = phases[phase].days[lesson.day];
    if (lesson.type === 'concept') {
      if (!dayEntry.concept || /^Guide:/i.test(lesson.title)) {
        dayEntry.concept = lesson;
      }
    } else if (lesson.type === 'quest') {
      dayEntry.quests.push(lesson);
    } else if (lesson.type === 'checkpoint') {
      dayEntry.checkpoint = lesson;
    }
  }

  const data = {
    stats: {
      days: teachingDays.size,
      phases: PHASE_ORDER.length,
      problems: quests.length + tests.length,
      proofs: tests.length,
    },
    phases,
  };

  roadmapDataMap.set(packId, data);
  return data;
}

function renderStarterStats(stats) {
  const items = [
    { icon: '📅', value: stats.days, label: 'Days' },
    { icon: '🎯', value: stats.phases, label: 'Phases' },
    { icon: '💻', value: stats.problems, label: 'LeetCode Problems' },
    { icon: '🏆', value: stats.proofs, label: 'Phase Proofs' },
  ];

  return `
    <div class="roadmap-stats roadmap-stats--starter">
      ${items.map(item => `
        <div class="roadmap-stat">
          <span class="roadmap-stat-icon" aria-hidden="true">${item.icon}</span>
          <span class="roadmap-stat-value">${escapeHtml(String(item.value))}</span>
          <span class="roadmap-stat-label">${escapeHtml(item.label)}</span>
        </div>
      `).join('')}
    </div>
  `;
}

function renderStarterDailySteps() {
  return `
    <section class="roadmap-section">
      <h3 class="roadmap-section-title">How Each Day Works</h3>
      <p class="roadmap-section-desc">About 20–30 minutes per day — one skill, real progress.</p>
      <div class="roadmap-steps">
        ${STARTER_DAILY_STEPS.map((step, i) => `
          <div class="roadmap-step">
            <div class="roadmap-step-num">${String(i + 1).padStart(2, '0')}</div>
            <div class="roadmap-step-body">
              <div class="roadmap-step-title">${step.icon} ${escapeHtml(step.title)}</div>
              <p class="roadmap-step-desc">${escapeHtml(step.desc)}</p>
            </div>
          </div>
        `).join('')}
      </div>
    </section>
  `;
}

function renderPhaseProgression(phaseMeta) {
  return `
    <section class="roadmap-section">
      <h3 class="roadmap-section-title">The Phase Progression</h3>
      <p class="roadmap-section-desc">Three phases. Fifteen days. From setup to independent solver.</p>
      <div class="roadmap-phase-timeline">
        ${PHASE_ORDER.map((phase, index) => {
          const meta = phaseMeta[phase];
          const proof = index < PHASE_ORDER.length
            ? `<div class="roadmap-rank-assessment">Phase proof: ${escapeHtml(meta.proof)}</div>`
            : '';
          return `
            <div class="roadmap-rank-node" style="--rank-color: ${meta.color}">
              <div class="roadmap-rank-dot"></div>
              <div class="roadmap-rank-card">
                <div class="roadmap-rank-header">
                  <span class="roadmap-rank-label ${meta.css}">${escapeHtml(meta.label)}</span>
                  <span class="roadmap-rank-days">Days ${escapeHtml(meta.days)}</span>
                </div>
                <div class="roadmap-rank-name">${escapeHtml(meta.name)} · ${escapeHtml(meta.title)}</div>
                <p class="roadmap-rank-theme">${escapeHtml(meta.theme)}</p>
              </div>
              ${proof}
            </div>
          `;
        }).join('')}
      </div>
    </section>
  `;
}

function renderStarterDayRow(day, daySummaries) {
  const questList = day.quests.map(q => cleanQuestTitle(q.title.replace(/^Warmup Quest:\s*/i, ''))).join(', ');
  const summary = daySummaries?.[day.day] || '';
  return `
    <div class="roadmap-day-row">
      <div class="roadmap-day-num">Day ${day.day}</div>
      <div class="roadmap-day-content">
        <div class="roadmap-day-topic">${escapeHtml(day.dayTitle)}</div>
        ${summary ? `<div class="roadmap-day-pattern">${escapeHtml(summary)}</div>` : ''}
        <div class="roadmap-day-meta">
          <span class="roadmap-day-icons" aria-hidden="true">📝 ⚔ ✅</span>
          ${questList ? `<span class="roadmap-day-quests">${escapeHtml(questList)}</span>` : ''}
        </div>
      </div>
    </div>
  `;
}

function renderPhaseSection(phase, phaseData, phaseMeta, expanded, daySummaries) {
  const meta = phaseMeta[phase];
  const dayList = Object.values(phaseData.days)
    .filter(d => d.concept && !/^Phase \d Proof$/i.test(d.dayTitle))
    .sort((a, b) => a.day - b.day);
  const testTitles = phaseData.tests.map(t => cleanQuestTitle(t.title.replace(/^Phase \d Proof —\s*/i, '').replace(/^Final Challenge —\s*/i, '')));

  return `
    <details class="roadmap-rank-group" ${expanded ? 'open' : ''} style="--rank-color: ${meta.color}">
      <summary class="roadmap-rank-group-summary">
        <span class="roadmap-rank-group-label ${meta.css}">${escapeHtml(meta.label)}</span>
        <span class="roadmap-rank-group-info">${escapeHtml(meta.name)} · Days ${escapeHtml(meta.days)}</span>
        <span class="roadmap-rank-group-chevron" aria-hidden="true"></span>
      </summary>
      <div class="roadmap-rank-group-body">
        <p class="roadmap-rank-group-theme">${escapeHtml(meta.theme)}</p>
        <div class="roadmap-day-list">
          ${dayList.map(day => renderStarterDayRow(day, daySummaries)).join('')}
        </div>
        ${testTitles.length ? `
          <div class="roadmap-rank-tests">
            <span class="roadmap-rank-tests-label">Phase Proof</span>
            <span class="roadmap-rank-tests-list">${escapeHtml(testTitles.join(' · '))}</span>
          </div>
        ` : ''}
      </div>
    </details>
  `;
}

function renderStarterDayByDay(phases, phaseMeta, daySummaries) {
  return `
    <section class="roadmap-section">
      <h3 class="roadmap-section-title">Day-by-Day Roadmap</h3>
      <p class="roadmap-section-desc">Every day has a clear focus — expand each phase to see the full plan.</p>
      <div class="roadmap-rank-groups">
        ${PHASE_ORDER.map((phase, i) => renderPhaseSection(phase, phases[phase], phaseMeta, i === 0, daySummaries)).join('')}
      </div>
    </section>
  `;
}

function renderSkillsGained(skills, phaseMeta) {
  return `
    <section class="roadmap-section roadmap-skills-section">
      <h3 class="roadmap-section-title">Skills You'll Build</h3>
      <p class="roadmap-section-desc">Concrete habits and workflows — not abstract theory.</p>
      <div class="roadmap-skills-grid">
        ${PHASE_ORDER.map(phase => {
          const meta = phaseMeta[phase];
          const phaseSkills = skills[phase] || [];
          return `
            <div class="roadmap-skills-phase" style="--rank-color: ${meta.color}">
              <div class="roadmap-skills-phase-header">
                <span class="roadmap-skills-phase-label ${meta.css}">${escapeHtml(meta.label)}</span>
                <span class="roadmap-skills-phase-name">${escapeHtml(meta.name)}</span>
              </div>
              <ul class="roadmap-skills-list">
                ${phaseSkills.map(skill => `<li>${escapeHtml(skill)}</li>`).join('')}
              </ul>
            </div>
          `;
        }).join('')}
      </div>
    </section>
  `;
}

function renderStarterOutcome() {
  return `
    <section class="roadmap-section roadmap-outcome roadmap-starter-outcome">
      <h3 class="roadmap-section-title">After 15 Days, You'll Be Able To…</h3>
      <ul class="roadmap-outcome-list">
        ${STARTER_OUTCOMES.map(item => `<li>${escapeHtml(item)}</li>`).join('')}
      </ul>
      <p class="roadmap-starter-bridge">Ready for your first topic Ascension? Pick Arrays, Trees, Graphs, Recursion, or DP.</p>
    </section>
  `;
}

function buildStarterOverlayContent(packId, lessons, config) {
  const pack = getPackById(packId);
  const data = buildStarterRoadmapData(packId, lessons);
  const startLabel = getPackCtaLabel(pack);
  const startHref = pack.readerUrl;
  const titleId = `roadmapTitle-${packId}`;
  const startBtnId = `roadmapStartBtn-${packId}`;

  return `
    <div class="roadmap-overlay__backdrop" data-roadmap-close></div>
    <div class="roadmap-overlay__panel" role="dialog" aria-modal="true" aria-labelledby="${titleId}">
      <header class="roadmap-header">
        <div class="roadmap-header-main">
          <span class="roadmap-header-icon" aria-hidden="true">${pack.icon}</span>
          <div>
            <h2 id="${titleId}" class="roadmap-title">${escapeHtml(pack.title)}</h2>
            <p class="roadmap-subtitle">${escapeHtml(config.subtitle)}</p>
          </div>
        </div>
        <button type="button" class="roadmap-close" data-roadmap-close aria-label="Close roadmap">&times;</button>
      </header>

      <div class="roadmap-body">
        <p class="roadmap-lead">${escapeHtml(config.leadText)}</p>

        ${renderStarterStats(data.stats)}
        ${renderStarterDailySteps()}
        ${renderPhaseProgression(config.phaseMeta)}
        ${renderStarterDayByDay(data.phases, config.phaseMeta, config.daySummaries)}
        ${renderSkillsGained(config.skills, config.phaseMeta)}
        ${renderStarterOutcome()}

        <div class="roadmap-cta">
          <a href="${startHref}" class="roadmap-cta-btn" id="${startBtnId}">${escapeHtml(startLabel)}</a>
        </div>
      </div>
    </div>
  `;
}

function renderStats(stats) {
  const items = [
    { icon: '📅', value: stats.days, label: 'Days' },
    { icon: '⚔', value: stats.ranks, label: 'Ranks (E → S)' },
    { icon: '💻', value: stats.problems, label: 'LeetCode Problems' },
    { icon: '🧩', value: stats.patterns, label: 'Patterns' },
    { icon: '⌨', value: stats.languages.join(' · '), label: 'Languages', wide: true },
  ];

  return `
    <div class="roadmap-stats">
      ${items.map(item => `
        <div class="roadmap-stat${item.wide ? ' roadmap-stat--wide' : ''}">
          <span class="roadmap-stat-icon" aria-hidden="true">${item.icon}</span>
          <span class="roadmap-stat-value">${escapeHtml(String(item.value))}</span>
          <span class="roadmap-stat-label">${escapeHtml(item.label)}</span>
        </div>
      `).join('')}
    </div>
  `;
}

function renderDailySteps() {
  return `
    <section class="roadmap-section">
      <h3 class="roadmap-section-title">How Each Day Works</h3>
      <p class="roadmap-section-desc">About 45 minutes per day — one topic, real understanding.</p>
      <div class="roadmap-steps">
        ${DAILY_STEPS.map((step, i) => `
          <div class="roadmap-step">
            <div class="roadmap-step-num">${String(i + 1).padStart(2, '0')}</div>
            <div class="roadmap-step-body">
              <div class="roadmap-step-title">${step.icon} ${escapeHtml(step.title)}</div>
              <p class="roadmap-step-desc">${escapeHtml(step.desc)}</p>
            </div>
          </div>
        `).join('')}
      </div>
    </section>
  `;
}

function renderRankTimeline(rankMeta) {
  return `
    <section class="roadmap-section">
      <h3 class="roadmap-section-title">The Rank Progression</h3>
      <p class="roadmap-section-desc">Six ranks. One topic mastered. From foundation to legend in 30 days.</p>
      <div class="roadmap-rank-timeline">
        ${RANK_ORDER.map((rank, index) => {
          const meta = rankMeta[rank];
          const assessment = index < RANK_ORDER.length - 1
            ? `<div class="roadmap-rank-assessment">3-problem rank assessment</div>`
            : '';
          return `
            <div class="roadmap-rank-node" style="--rank-color: ${meta.color}">
              <div class="roadmap-rank-dot"></div>
              <div class="roadmap-rank-card">
                <div class="roadmap-rank-header">
                  <span class="roadmap-rank-label ${meta.css}">${escapeHtml(meta.label)}</span>
                  <span class="roadmap-rank-days">Days ${escapeHtml(meta.days)}</span>
                </div>
                <div class="roadmap-rank-name">${escapeHtml(meta.name)}</div>
                <p class="roadmap-rank-theme">${escapeHtml(meta.theme)}</p>
              </div>
              ${assessment}
            </div>
          `;
        }).join('')}
      </div>
    </section>
  `;
}

function renderDayRow(day, daySummaries) {
  const questList = day.quests.map(q => cleanQuestTitle(q.title)).join(', ');
  const summary = daySummaries?.[day.day];
  const patternText = summary
    || (day.concept && day.concept.title !== day.dayTitle ? day.concept.title : '');
  return `
    <div class="roadmap-day-row">
      <div class="roadmap-day-num">Day ${day.day}</div>
      <div class="roadmap-day-content">
        <div class="roadmap-day-topic">${escapeHtml(day.dayTitle)}</div>
        ${patternText ? `<div class="roadmap-day-pattern">${escapeHtml(patternText)}</div>` : ''}
        <div class="roadmap-day-meta">
          <span class="roadmap-day-icons" aria-hidden="true">📝 ⚔ ⚔ ✅</span>
          ${questList ? `<span class="roadmap-day-quests">${escapeHtml(questList)}</span>` : ''}
        </div>
      </div>
    </div>
  `;
}

function renderRankSection(rank, rankData, rankMeta, expanded, daySummaries) {
  const meta = rankMeta[rank];
  const dayList = Object.values(rankData.days)
    .filter(d => d.concept)
    .sort((a, b) => a.day - b.day);
  const testTitles = rankData.tests.map(t => cleanQuestTitle(t.title.replace(/^Test:\s*/i, '')));

  return `
    <details class="roadmap-rank-group" ${expanded ? 'open' : ''} style="--rank-color: ${meta.color}">
      <summary class="roadmap-rank-group-summary">
        <span class="roadmap-rank-group-label ${meta.css}">${escapeHtml(meta.label)}</span>
        <span class="roadmap-rank-group-info">${escapeHtml(meta.name)} · Days ${escapeHtml(meta.days)}</span>
        <span class="roadmap-rank-group-chevron" aria-hidden="true"></span>
      </summary>
      <div class="roadmap-rank-group-body">
        <p class="roadmap-rank-group-theme">${escapeHtml(meta.theme)}</p>
        <div class="roadmap-day-list">
          ${dayList.map(day => renderDayRow(day, daySummaries)).join('')}
        </div>
        ${testTitles.length ? `
          <div class="roadmap-rank-tests">
            <span class="roadmap-rank-tests-label">Rank Assessment</span>
            <span class="roadmap-rank-tests-list">${escapeHtml(testTitles.join(' · '))}</span>
          </div>
        ` : ''}
      </div>
    </details>
  `;
}

function renderDayByDay(ranks, rankMeta, daySummaries) {
  return `
    <section class="roadmap-section">
      <h3 class="roadmap-section-title">Day-by-Day Roadmap</h3>
      <p class="roadmap-section-desc">Every day has a clear focus — expand each rank to see the full plan.</p>
      <div class="roadmap-rank-groups">
        ${RANK_ORDER.map((rank, i) => renderRankSection(rank, ranks[rank], rankMeta, i === 0, daySummaries)).join('')}
      </div>
    </section>
  `;
}

function renderOutcome(stats, patternNames, outcomeDescription) {
  const highlights = [
    `Solved ${stats.problems} curated LeetCode problems with full explanations`,
    `Mastered ${stats.patterns} ${outcomeDescription}`,
    'Progressed from E-Rank to S-Rank through structured daily quests',
    'Built pattern recognition for real coding interviews',
  ];

  return `
    <section class="roadmap-section roadmap-outcome">
      <h3 class="roadmap-section-title">After 30 Days, You Will Have…</h3>
      <ul class="roadmap-outcome-list">
        ${highlights.map(item => `<li>${escapeHtml(item)}</li>`).join('')}
      </ul>
      <div class="roadmap-patterns">
        <div class="roadmap-patterns-label">Patterns you'll master</div>
        <div class="roadmap-patterns-cloud">
          ${patternNames.map(name => `<span class="roadmap-pattern-tag">${escapeHtml(name)}</span>`).join('')}
        </div>
      </div>
    </section>
  `;
}

function buildOverlayContent(packId, lessons, config) {
  const pack = getPackById(packId);
  const data = buildRoadmapData(packId, lessons);
  const startLabel = getPackCtaLabel(pack);
  const startHref = pack.readerUrl;
  const titleId = `roadmapTitle-${packId}`;
  const startBtnId = `roadmapStartBtn-${packId}`;

  return `
    <div class="roadmap-overlay__backdrop" data-roadmap-close></div>
    <div class="roadmap-overlay__panel" role="dialog" aria-modal="true" aria-labelledby="${titleId}">
      <header class="roadmap-header">
        <div class="roadmap-header-main">
          <span class="roadmap-header-icon" aria-hidden="true">${pack.icon}</span>
          <div>
            <h2 id="${titleId}" class="roadmap-title">${escapeHtml(pack.title)}</h2>
            <p class="roadmap-subtitle">Your 30-Day Path to Mastery</p>
          </div>
        </div>
        <button type="button" class="roadmap-close" data-roadmap-close aria-label="Close roadmap">&times;</button>
      </header>

      <div class="roadmap-body">
        <p class="roadmap-lead">${escapeHtml(config.leadText)}</p>

        ${renderStats(data.stats)}
        ${renderDailySteps()}
        ${renderRankTimeline(config.rankMeta)}
        ${renderDayByDay(data.ranks, config.rankMeta, config.daySummaries)}
        ${renderOutcome(data.stats, data.patternNames, config.outcomeDescription)}

        <div class="roadmap-cta">
          <a href="${startHref}" class="roadmap-cta-btn" id="${startBtnId}">${escapeHtml(startLabel)}</a>
        </div>
      </div>
    </div>
  `;
}

async function ensureOverlay(packId) {
  if (overlayMap.has(packId)) return overlayMap.get(packId);

  const config = getPackConfig(packId);
  if (!config) return null;

  const lessons = await getCourseLessons(packId);
  const overlayEl = document.createElement('div');
  overlayEl.className = 'roadmap-overlay';
  overlayEl.dataset.roadmapOverlay = packId;
  overlayEl.hidden = true;
  overlayEl.innerHTML = config.kind === 'starter'
    ? buildStarterOverlayContent(packId, lessons, config)
    : buildOverlayContent(packId, lessons, config);
  document.body.appendChild(overlayEl);

  overlayEl.querySelectorAll('[data-roadmap-close]').forEach((el) => {
    el.addEventListener('click', closeRoadmap);
  });

  overlayEl.addEventListener('click', (e) => {
    if (e.target === overlayEl) closeRoadmap();
  });

  if (!keydownBound) {
    document.addEventListener('keydown', onKeyDown);
    keydownBound = true;
  }

  overlayMap.set(packId, overlayEl);
  return overlayEl;
}

function getActiveOverlay() {
  if (!activePackId) return null;
  return overlayMap.get(activePackId) || null;
}

function onKeyDown(e) {
  if (e.key === 'Escape') {
    const overlay = getActiveOverlay();
    if (overlay && !overlay.hidden) {
      closeRoadmap();
    }
  }
}

function getFocusableElements(container) {
  return Array.from(container.querySelectorAll(
    'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
  )).filter(el => el.offsetParent !== null);
}

function trapFocus(e) {
  const overlay = getActiveOverlay();
  if (!overlay || overlay.hidden) return;
  const panel = overlay.querySelector('.roadmap-overlay__panel');
  if (!panel) return;

  const focusable = getFocusableElements(panel);
  if (!focusable.length) return;

  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (e.key === 'Tab') {
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
}

export async function openRoadmap(packId, sourceEl) {
  const config = getPackConfig(packId);
  if (!config) return;

  const pack = getPackById(packId);
  triggerEl = sourceEl || document.getElementById(pack?.roadmapBtnId);
  const overlay = await ensureOverlay(packId);
  if (!overlay) return;

  activePackId = packId;

  const packStartBtn = document.getElementById(pack.startBtnId);
  const roadmapStartBtn = overlay.querySelector(`#roadmapStartBtn-${packId}`);
  if (packStartBtn && roadmapStartBtn) {
    roadmapStartBtn.href = packStartBtn.href;
    roadmapStartBtn.textContent = packStartBtn.textContent;
  }

  overlay.hidden = false;
  document.body.classList.add('roadmap-open');
  document.addEventListener('keydown', trapFocus);

  const closeBtn = overlay.querySelector('.roadmap-close');
  requestAnimationFrame(() => {
    overlay.classList.add('roadmap-overlay--open');
    closeBtn?.focus();
  });
}

export function closeRoadmap() {
  const overlay = getActiveOverlay();
  if (!overlay || overlay.hidden) return;

  overlay.classList.remove('roadmap-overlay--open');
  document.body.classList.remove('roadmap-open');
  document.removeEventListener('keydown', trapFocus);

  const onEnd = () => {
    overlay.hidden = true;
    overlay.removeEventListener('transitionend', onEnd);
  };

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) {
    overlay.hidden = true;
  } else {
    overlay.addEventListener('transitionend', onEnd, { once: true });
    setTimeout(onEnd, 350);
  }

  triggerEl?.focus();
  triggerEl = null;
  activePackId = null;
}

/** @deprecated Use openRoadmap('arrays-strings', sourceEl) */
export async function openArraysRoadmap(sourceEl) {
  return openRoadmap('arrays-strings', sourceEl);
}

/** @deprecated Use closeRoadmap() */
export function closeArraysRoadmap() {
  return closeRoadmap();
}

export function initPackRoadmaps() {
  if (bound) return;
  bound = true;

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-roadmap-pack]');
    if (!btn) return;
    e.preventDefault();
    const packId = btn.dataset.roadmapPack;
    if (packId && getPackConfig(packId)) {
      openRoadmap(packId, btn);
    }
  });
}
