/* ══════════════════════════════════════════════════════════
   READER DIAGRAMS — Shared ASCII diagram detection & scaling
   Used by all Ascension pack readers
   ══════════════════════════════════════════════════════════ */

const CODE_LANG_CLASS = /^language-(cpp|c\+\+|python|java|javascript|js|bash|sql)$/;
const CODE_SIGNATURE_PATTERN = /(?:^|\n)\s*(?:#include|#pragma|using namespace|public class|private:|protected:|int main\s*\(|def \w+\s*\(|class \w+\s*[:(]|function \w+\s*\(|import \w+|from \w+ import|package \s+\w+|std::)/m;
const BOX_DRAWING_PATTERN = /[┌┐└┘├┤│─═╔╗╚╝╠╣╦╩]/;
const TREE_ARROW_PATTERN = /[→←↓↑]/;
const TREE_BRANCH_PATTERN = /^\s*[\\/|]/m;

const BASE_VISUAL_HEADING = 'visual|diagram|call stack|decision tree|tree|trace|walkthrough|stack frame|grid|board|memo tree|branch';

export const PACK_DIAGRAM_CONFIGS = {
  recursion: {
    extraHeadingPatterns: '',
    matchesContent: null,
    getDiagramType: null,
  },
  trees: {
    extraHeadingPatterns: 'trie|inorder|preorder|postorder|morris|level-order|lca|serialize|bst|mirror|parallel|bfs|queue|capstone|flowchart|forest',
    matchesContent(text) {
      if (/\+[-+]+\+/.test(text) && /['"]/.test(text)) return true;
      if (/queue:\s*\[/i.test(text) || /level\s+\d+:/i.test(text)) return true;
      return false;
    },
    getDiagramType(text, contextHeading) {
      if (/trie|char-edge/i.test(contextHeading) || (/\+[-+]+\+/.test(text) && /['"]/.test(text))) return 'trie';
      if (BOX_DRAWING_PATTERN.test(text) && /flowchart|decision|capstone|master/i.test(contextHeading)) return 'flowchart';
      return null;
    },
  },
  graphs: {
    extraHeadingPatterns: 'adjacency|wavefront|topo|topological|in-degree|out-degree|union|find|dijkstra|heap|mst|kruskal|euler|bridge|component|bipartite|reachability|state|implicit|graph|grid|bfs|dfs',
    matchesContent(text, _contextHeading, { lines }) {
      if (lines.filter(line => /adj\[\d+\]\s*=/.test(line)).length >= 2) return true;
      if (/parent\[\d+\]\s*=/.test(text) && lines.length >= 3) return true;
      if (/indeg\[|outdeg\[|dist\[\d+\]|disc\[|low\[/.test(text) && lines.length >= 3) return true;
      if (/Pop\s*\(|relax|heap:/i.test(text) && TREE_ARROW_PATTERN.test(text) && lines.length >= 3) return true;
      if (lines.filter(line => /\(\d+,\s*\d+\)/.test(line) || /[#.\sSGEO]{6,}/.test(line)).length >= 2) return true;
      return false;
    },
    getDiagramType(text, contextHeading) {
      const ctx = contextHeading + text;
      if (/grid|wavefront|cell|board|implicit/i.test(ctx) && /\(\d+,\s*\d+\)/.test(text)) return 'grid';
      if (/adjacency|topo|union|dijkstra|heap|mst|kruskal|euler|bridge|component|bipartite|reachability|graph/i.test(ctx)) return 'graph';
      return null;
    },
  },
  'arrays-strings': {
    extraHeadingPatterns: 'pointer|sliding|window|prefix|frequency|hash|matrix|string|anagram|palindrome|visual|trace|walkthrough|recognition|complement|spiral|rotate|synthesis|capstone|flowchart|signal|enter|exit|two pointer|comparison|read-write|kadane|monotonic|deque|sweep|greedy|kmp|bitmask',
    matchesContent(text, contextHeading, { lines }) {
      const ctx = contextHeading + text;
      if (lines.filter(line => /\b[LR]\b/.test(line) && TREE_ARROW_PATTERN.test(line)).length >= 2) return true;
      if (/freq\[|map\s*=\s*\{|map\[|hash set|complement/i.test(text) && lines.length >= 3) return true;
      if (/enter|exit/i.test(ctx) && /\[[^\]]+\]/.test(text) && lines.length >= 3) return true;
      if (lines.filter(line => /^\s*\[\s*[\d\s,"']+\]/.test(line)).length >= 2 && /matrix|spiral|grid|2d/i.test(ctx)) return true;
      if (BOX_DRAWING_PATTERN.test(text) && /mutable|language|comparison|chart/i.test(ctx)) return true;
      return false;
    },
    getDiagramType(text, contextHeading) {
      const ctx = contextHeading + text;
      if (BOX_DRAWING_PATTERN.test(text) && /comparison|chart|mutable|language/i.test(ctx)) return 'table';
      if (/matrix|spiral|grid|2d|rotate|boundary/i.test(ctx)) return 'grid';
      if (/window|enter|exit|slide/i.test(ctx)) return 'window';
      if (/pointer|two pointer|left.*right|\bL\b.*\bR\b/i.test(ctx)) return 'pointer';
      if (/freq|frequency|hash|map|complement|anagram/i.test(ctx)) return 'trace';
      if (BOX_DRAWING_PATTERN.test(text) && /flowchart|decision|capstone|synthesis/i.test(ctx)) return 'flowchart';
      return null;
    },
  },
  dp: {
    extraHeadingPatterns: 'memo|tabulation|knapsack|state machine|recurrence|transition|fill order|lcs|lis|grid|decision|flowchart|bottom-up|top-down|cache|space|compress|cooldown|fee|burst|optimal|substructure|ways\\(|fib\\(|dp\\[|take or skip|coin change|edit distance|palindrome',
    matchesContent(text, contextHeading, { lines }) {
      const ctx = contextHeading + text;
      if (/dp\[\d+\]\[\d+\]|dp\[i\]\[j\]|dp\[i\]\[w\]/i.test(text) && lines.length >= 4) return true;
      if (/w=\d+/i.test(text) && lines.filter(line => /^\s*i=\d+|^\s*\d+\s+\d+/.test(line)).length >= 2) return true;
      if (/CACHE HIT|memo\[/i.test(text)) return true;
      if (/HOLD|SOLD|REST|\bcash\b|\bhold\b/i.test(text) && (BOX_DRAWING_PATTERN.test(text) || TREE_ARROW_PATTERN.test(text))) return true;
      if (lines.filter(line => /ways\(\d+\)|fib\(\d+\)/i.test(line)).length >= 3) return true;
      if (/NEW DP PROBLEM|Overlapping subproblems/i.test(text) && BOX_DRAWING_PATTERN.test(text)) return true;
      return false;
    },
    getDiagramType(text, contextHeading) {
      const ctx = contextHeading + text;
      if (BOX_DRAWING_PATTERN.test(text) && /flowchart|decision|capstone|master|NEW DP/i.test(ctx)) return 'flowchart';
      if (/state machine|hold|sold|rest|cooldown|fee|cash/i.test(ctx) && BOX_DRAWING_PATTERN.test(text)) return 'flowchart';
      if (/knapsack|dp\[i\]\[w\]|w=0/i.test(text) && linesLikeTable(text)) return 'grid';
      if (/grid|matrix|path|unique paths|minimum path|falling path/i.test(ctx)) return 'grid';
      if (/memo|cache hit|ways\(|fib\(/i.test(ctx)) return 'stack';
      return 'trace';
    },
  },
  starter: {
    extraHeadingPatterns: 'workflow|platform|trace|timer|paper|habit|reflection|mentor|stuck|attempt|preview|map|loop|checklist|daily|template|hand-trace',
    matchesContent(text, contextHeading, { lines }) {
      const ctx = contextHeading + text;
      if (BOX_DRAWING_PATTERN.test(text)) return true;
      if (/├──|Problem Set|LeetCode Home/i.test(text)) return true;
      if (lines.filter(line => /│/.test(line)).length >= 2) return true;
      if (/l→|←r|START TIMER/i.test(text)) return true;
      if (/READ → TRY|same time tomorrow/i.test(text)) return true;
      return false;
    },
    getDiagramType(text, contextHeading) {
      const ctx = contextHeading + text;
      if (/workflow|loop|timer|START TIMER/i.test(ctx)) return 'flowchart';
      if (/platform|map|LeetCode Home|Problem Set/i.test(ctx)) return 'trace';
      if (/trace|table|index i|hand-trace/i.test(ctx) && /│/.test(text)) return 'table';
      if (/pointer|l→|←r|two-pointer|preview/i.test(ctx)) return 'pointer';
      if (BOX_DRAWING_PATTERN.test(text)) return 'flowchart';
      return 'trace';
    },
  },
};

function linesLikeTable(text) {
  const lines = text.split('\n').filter(line => line.trim());
  return lines.filter(line => /^\s*(i=\d+|w=\d+|\d+\s+\d+)/.test(line)).length >= 2;
}

function buildVisualHeadingPattern(config) {
  const extra = config.extraHeadingPatterns;
  const pattern = extra ? `${BASE_VISUAL_HEADING}|${extra}` : BASE_VISUAL_HEADING;
  return new RegExp(pattern, 'i');
}

function getVisualContextHeading(pre) {
  let node = pre.previousElementSibling;
  while (node) {
    if (/^H[1-6]$/.test(node.tagName)) {
      return node.textContent;
    }
    if (node.tagName === 'PRE' || node.tagName === 'HR') break;
    node = node.previousElementSibling;
  }
  return '';
}

function isCodeLanguageBlock(codeEl) {
  return [...codeEl.classList].some(className => CODE_LANG_CLASS.test(className));
}

function looksLikeSourceCode(text) {
  if (CODE_SIGNATURE_PATTERN.test(text)) return true;
  const lines = text.split('\n');
  const codeLines = lines.filter(line => /;\s*$/.test(line) || /^\s*(if|for|while|return|else|switch|case)\b/.test(line));
  return codeLines.length >= 2;
}

function defaultGetDiagramType(text, contextHeading) {
  if (BOX_DRAWING_PATTERN.test(text) || /call stack|stack frame/i.test(contextHeading)) return 'stack';
  if (/grid|board|cell|word search/i.test(contextHeading + text)) return 'grid';
  if (TREE_BRANCH_PATTERN.test(text) || /tree|branch|subset|permutation|memo/i.test(contextHeading)) return 'tree';
  return 'trace';
}

export function createDiagramEnhancer(packId = 'recursion') {
  const config = PACK_DIAGRAM_CONFIGS[packId] || PACK_DIAGRAM_CONFIGS.recursion;
  const visualHeadingPattern = buildVisualHeadingPattern(config);

  let contentEl = null;
  let diagramResizeObserver = null;
  let diagramScaleTimer = null;

  function looksLikeDiagram(text, contextHeading) {
    if (looksLikeSourceCode(text)) return false;

    const lines = text.split('\n').filter(line => line.trim());
    if (lines.length === 0) return false;

    const maxLen = Math.max(...lines.map(line => line.length));
    const visualContext = visualHeadingPattern.test(contextHeading);
    const hasBox = BOX_DRAWING_PATTERN.test(text);
    const hasTreeBranch = lines.filter(line => TREE_BRANCH_PATTERN.test(line)).length >= 2;
    const hasTreeSlash = lines.filter(line => /[/\\]/.test(line) && /^\s+/.test(line)).length >= 2;
    const hasArrows = TREE_ARROW_PATTERN.test(text);
    const hasBacktrackTemplate = /CHOOSE|EXPLORE|UNCHOOSE|path\.push|path\.pop/.test(text);

    if (config.matchesContent?.(text, contextHeading, { lines, maxLen, visualContext })) return true;
    if (hasBox) return true;
    if (hasBacktrackTemplate && !looksLikeSourceCode(text)) return true;
    if (hasTreeBranch && (visualContext || maxLen > 30)) return true;
    if (hasTreeSlash && visualContext) return true;
    if (hasArrows && visualContext) return true;
    if (hasArrows && /Pop\s*\(|relax|heap:|visit|push|pop/i.test(text) && lines.length >= 3) return true;
    if (visualContext && lines.length >= 3 && maxLen > 20) return true;

    return false;
  }

  function getDiagramType(text, contextHeading) {
    const custom = config.getDiagramType?.(text, contextHeading);
    if (custom) return custom;
    return defaultGetDiagramType(text, contextHeading);
  }

  function stripHighlightFromDiagram(codeEl) {
    const plain = codeEl.textContent;
    codeEl.removeAttribute('data-highlighted');
    codeEl.className = 'cr-diagram-code';
    codeEl.textContent = plain;
  }

  function cleanupDiagramObservers() {
    if (diagramResizeObserver) {
      diagramResizeObserver.disconnect();
      diagramResizeObserver = null;
    }
  }

  function scaleDiagramBlock(pre) {
    const wrap = pre.closest('.cr-diagram-wrap');
    const code = pre.querySelector('code');
    if (!wrap || !code) return;

    pre.style.setProperty('--diagram-scale', '1');
    wrap.style.height = '';

    const containerWidth = wrap.clientWidth;
    const contentWidth = code.scrollWidth;
    if (!containerWidth || contentWidth <= containerWidth) return;

    const scale = containerWidth / contentWidth;
    pre.style.setProperty('--diagram-scale', scale.toFixed(4));
    wrap.style.height = `${code.getBoundingClientRect().height * scale}px`;
  }

  function scaleAllDiagrams() {
    if (!contentEl) return;
    contentEl.querySelectorAll('.cr-diagram-block').forEach(scaleDiagramBlock);
  }

  function initDiagramScaling() {
    if (!contentEl) return;
    cleanupDiagramObservers();
    scaleAllDiagrams();

    diagramResizeObserver = new ResizeObserver(() => {
      clearTimeout(diagramScaleTimer);
      diagramScaleTimer = setTimeout(scaleAllDiagrams, 100);
    });

    contentEl.querySelectorAll('.cr-diagram-wrap').forEach(wrap => {
      diagramResizeObserver.observe(wrap);
    });
    diagramResizeObserver.observe(contentEl);
  }

  function enhanceVisualBlocks(root = contentEl) {
    if (!root) return;
    root.querySelectorAll('pre').forEach(pre => {
      if (pre.closest('.code-tabs') || pre.classList.contains('cr-diagram-block')) return;

      const codeEl = pre.querySelector('code');
      if (!codeEl || isCodeLanguageBlock(codeEl)) return;

      const text = codeEl.textContent;
      const contextHeading = getVisualContextHeading(pre);
      if (!looksLikeDiagram(text, contextHeading)) return;

      const diagramType = getDiagramType(text, contextHeading);
      const wrap = document.createElement('div');
      wrap.className = 'cr-diagram-wrap';
      pre.parentNode.insertBefore(wrap, pre);
      wrap.appendChild(pre);

      pre.classList.add('cr-diagram-block', `cr-diagram-${diagramType}`);
      pre.setAttribute('role', 'img');
      pre.setAttribute('aria-label', 'ASCII diagram');

      stripHighlightFromDiagram(codeEl);
      // Copy buttons are only attached to solution regions upstream (reader-code-blocks.js)
      pre.querySelector('.cr-copy-btn')?.remove();
    });

    initDiagramScaling();
  }

  function handleResize() {
    clearTimeout(diagramScaleTimer);
    diagramScaleTimer = setTimeout(scaleAllDiagrams, 100);
  }

  return {
    bindContent(el) {
      contentEl = el;
    },
    enhanceVisualBlocks,
    scaleAllDiagrams,
    handleResize,
    cleanup: cleanupDiagramObservers,
    isDiagramBlock(node) {
      return node?.classList?.contains('cr-diagram-block') || !!node?.closest?.('.cr-diagram-block');
    },
  };
}

/** Compact mark-complete labels for narrow viewports (≤480px). */
export function compactCompleteLabel(label) {
  if (!window.matchMedia('(max-width: 480px)').matches) return label;
  const shortLabels = {
    'Complete Objectives First': 'Finish Steps',
    'Claim Quest XP': 'Claim XP',
    'Complete Checkpoint': 'Complete',
    'Pass Test Problem': 'Pass Test',
    'Complete Lesson': 'Complete',
    'Begin Ascension': 'Start Path',
    'Start Day 1 →': 'Start Day 1',
    'Quest Complete': 'Done',
    'Checkpoint Complete': 'Done',
    'Test Complete': 'Done',
    'Journey Complete': 'Done',
    'Lesson Complete': 'Done',
    'Briefing Complete': 'Done',
    'Completed': 'Done',
    'Claim XP': 'Claim XP',
    'Complete reflection prompts': 'Reflect',
    'Log habit action': 'Log Habit',
    'Review mistake mirror': 'Review',
  };
  return shortLabels[label] || label;
}
