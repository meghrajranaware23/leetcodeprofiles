/**
 * Build Trees Ascension course content + trees-content.js
 * Run: node scripts/build-trees-course.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  DAYS,
  RANK_TESTS,
  RANK_THEMES,
  E_RANK_PATTERNS,
  D_RANK_PATTERNS,
  C_RANK_PATTERNS,
  B_RANK_PATTERNS,
  A_RANK_PATTERNS,
  S_RANK_PATTERNS,
} from './trees-curriculum.js';
import { lcUrl } from './trees-lc-slugs.js';
import { SOLUTIONS } from './trees-solutions.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const MICRO_DIR = path.join(ROOT, 'course', 'trees', 'micro');

const STAR = (n) => '★'.repeat(n) + '☆'.repeat(5 - n);
const HAND_AUTHORED_MARKER = '<!-- hand-authored -->';

function readMicroFile(file) {
  const full = path.join(MICRO_DIR, file);
  if (!fs.existsSync(full)) return null;
  return fs.readFileSync(full, 'utf8');
}

function isHandAuthored(content) {
  return content != null && content.trimStart().startsWith(HAND_AUTHORED_MARKER);
}

/** Replace ## Solution … up to the next --- + ## section in quest/test markdown. */
function patchSolutionSection(existing, lc) {
  const replacement = `## Solution\n\n${formatSolutions(lc)}`;
  const solStart = existing.indexOf('## Solution');
  if (solStart === -1) {
    return `${existing.trimEnd()}\n\n${replacement}\n`;
  }
  const tail = existing.slice(solStart + '## Solution'.length);
  const endMatch = tail.match(/\n---\n\n## /);
  if (endMatch && endMatch.index != null) {
    const endIdx = solStart + '## Solution'.length + endMatch.index;
    return existing.slice(0, solStart) + replacement + existing.slice(endIdx);
  }
  const clickIdx = existing.indexOf('\n## 💭', solStart);
  if (clickIdx !== -1) {
    return `${existing.slice(0, solStart)}${replacement}\n${existing.slice(clickIdx)}`;
  }
  const detailsEnd = existing.indexOf('\n</details>', solStart);
  if (detailsEnd !== -1) {
    const detailsStart = existing.lastIndexOf('<details>', solStart);
    if (detailsStart !== -1) {
      return `${existing.slice(0, detailsStart)}<details>\n<summary><strong>📖 Solution & Walkthrough</strong></summary>\n\n${formatSolutions(lc)}\n\n</details>${existing.slice(detailsEnd + '\n</details>'.length)}`;
    }
  }
  return `${existing.slice(0, solStart)}${replacement}\n`;
}

function formatSolutions(lc) {
  const sol = SOLUTIONS[lc];
  if (!sol) throw new Error(`Missing solution for LC #${lc}`);
  return `### C++
\`\`\`cpp
${sol.cpp}
\`\`\`

### Python
\`\`\`python
${sol.python}
\`\`\`

### Java
\`\`\`java
${sol.java}
\`\`\`

**Complexity:** ${sol.complexity}`;
}

function write(file, content) {
  const full = path.join(MICRO_DIR, file);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content.trim() + '\n', 'utf8');
}

/** Write generated content unless file is hand-authored (quests/tests: patch Solution only). */
function writeLesson(file, content, { type, lc } = {}) {
  const existing = readMicroFile(file);
  if (existing && isHandAuthored(existing)) {
    if ((type === 'quest' || type === 'test') && lc) {
      write(file, patchSolutionSection(existing, lc));
      return 'patched';
    }
    return 'skipped';
  }
  write(file, content);
  return 'wrote';
}

function conceptXp(rank) {
  const map = { e: 10, d: 10, c: 15, b: 25, a: 20, s: 25 };
  return map[rank] || 10;
}

function genWelcome() {
  return `# 🌲 Trees Ascension

> Welcome, Hunter.

---

You've mastered arrays. You know how to slide windows and move pointers. But trees are different — they branch, they recurse, they demand you **see** structure before you write code.

Here's the truth: **tree problems aren't harder. They're visual.** Once you can trace a traversal on paper, the code writes itself.

**Visual-first philosophy:** Every concept shows the tree with step-by-step node visits BEFORE any code. Every quest asks you to try first, then reveals what should have clicked. Every checkpoint drills transfer — spotting tree patterns in problems you've never studied.

**30 days. 30 missions. 6 ranks. One forest ascension.**

---

## How It Works

Each day is a focused mission. You learn one tree pattern, solve real LeetCode problems with it, and prove mastery before moving on.

| | Your Daily Flow | |
|---|---|---|
| 📝 | **Concept** | See the tree visually, understand the pattern, then learn the code |
| ⚔ | **Quests** | Try on LeetCode first, then study the **Pattern Recognition Breakdown** |
| ✅ | **Checkpoint** | Drill signals, spot patterns in new problems |

Every quest includes:
- **🔍 Pattern Recognition Breakdown** — how to identify the pattern from the problem statement
- **💭 What Should Have Clicked** — the thoughts a strong solver has *before* writing code

Every quest has solutions in **C++, Python, and Java**.

---

## The Rank System

| Rank | Days | Focus | Difficulty |
|------|------|-------|------------|
| ⬛ **E-Rank** — Sapling | 1–5 | Tree structure, DFS, BFS, basic recursion | Easy |
| 🔵 **D-Rank** — Branch Walker | 6–10 | Top-down/bottom-up recursion, construction | Easy → Medium |
| 🟢 **C-Rank** — Forest Guard | 11–16 | BST, LCA, paths, serialization | Medium |
| 🟡 **B-Rank** — Canopy Commander | 17–22 | Tries, tree DP, views, tree-as-graph | Medium |
| 🟠 **A-Rank** — Ancient Oak | 23–27 | BST augmentation, Morris, re-rooting | Medium → Hard |
| 🔴 **S-Rank** — Forest Legend | 28–30 | Multi-pattern synthesis, final ascension | Expert |

Complete each rank to unlock the next. No skipping. No shortcuts.

---

## What You Need

- Basic programming: recursion, functions, pointers/references ✓
- Arrays & Strings Ascension (or equivalent pattern recognition) ✓
- A desire to **see** trees, not just memorize solutions ✓

---

> 💡 **The goal isn't to memorize tree templates.** It's to build the visual intuition that lets you trace any tree problem on paper before writing a single line of code.

---

*Your E-Rank training begins now. Plant your first root. →*`;
}

function genConcept(day) {
  const { concept, dayTitle, day: dayNum, rank } = day;
  const stars = STAR(concept.stars);
  const xp = conceptXp(rank);
  const readMin = rank === 'e' ? 10 : rank === 's' ? 18 : 15;

  return `# 📝 ${concept.title}

> **Day ${dayNum}** · ${dayTitle} · ${stars} · ${xp} XP · ${readMin} min read

---

Your mission today: **understand ${concept.pattern} visually** before you touch any code. Trace the tree on paper. Watch information flow. Then the recursion becomes obvious.

---

## Part 1 — Why Does This Work?

### 1. What is the pattern?

**${concept.pattern}** — the core technique you'll use in today's quests.

Every tree problem reduces to one question: *Where does information flow?*
- **Down** (top-down): carry state as you descend
- **Up** (bottom-up): ask children, combine at parent
- **Across** (BFS): process level by level with a queue
- **Side-by-side** (parallel): compare or merge two trees

### 2. Simple explanation

Think of a tree like a family tree. You start at the root (the ancestor). To visit everyone, you either:
- Go **deep first** (DFS) — finish one branch before the next
- Go **wide first** (BFS) — visit all children before grandchildren

Recursion is just: *"I'll handle my part, and trust my children to handle theirs."*

### 3. Visual walkthrough

\`\`\`
        1
       / \\
      2    3
     / \\    \\
    4    5    6

Step 1: Start at root [1]
Step 2: Go left to [2]
Step 3: Go left to [4] (leaf — return)
Step 4: Back to [2], go right to [5] (leaf — return)
Step 5: Back to [1], go right to [3]
Step 6: Go right to [6] (leaf — return)
\`\`\`

### 4. How the pattern works

\`\`\`
function solve(node):
    if node is null: return base_case
    left_result  = solve(node.left)   // trust left subtree
    right_result = solve(node.right)  // trust right subtree
    return combine(node, left_result, right_result)
\`\`\`

The magic: you never need to think about the whole tree — just the current node and what your children return.

### 5. What problem does this solve?

| Problem family | How this pattern helps |
|---|---|
| Traversals | Visit every node in a specific order |
| Properties (height, depth, count) | Combine child results at each node |
| Path problems | Carry running state down or gather up |
| Tree comparison | Mirror recursion on two trees |
| Construction | Split and rebuild from traversal orders |

### 6. Why brute force fails

| Brute force | Problem |
|---|---|
| Store all paths in an array | O(n²) space — most nodes aren't on the answer path |
| BFS when DFS suffices | Unnecessary queue overhead |
| Global traversal without recursion | You lose the natural subtree structure |
| Iterating without understanding order | Wrong visit order = wrong answer |

### 7. The key observation

**A tree is defined by its subtrees.** Every node is the root of its own smaller tree. Recursion exploits this: solve the big tree by solving two smaller trees and combining.

### 8. Pattern signals & recognition clues

| When the problem says… | Think… |
|---|---|
| "traverse" / "visit all nodes" | DFS or BFS |
| "depth" / "height" / "max depth" | Bottom-up recursion |
| "path from root to leaf" | Top-down with running state |
| "diameter" / "longest path" | Bottom-up + global update |
| "same tree" / "symmetric" / "subtree" | Parallel recursion |
| "level order" / "each level" | BFS with queue |
| "BST" / "sorted" / "validate" | BST invariant + inorder |
| "lowest common ancestor" | Split detection recursion |

**Keywords:** \`binary tree\` · \`subtree\` · \`root-to-leaf\` · \`depth\` · \`traverse\` · \`recursive\`

### 9. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Forgetting null base case | Always check \`if not node: return\` |
| Confusing depth vs height | Depth = distance from root; height = distance to deepest leaf |
| Not returning child results | Bottom-up MUST return combined value |
| Mixing up traversal orders | Draw the tree and trace by hand first |
| Using global when return works | Prefer returning values over globals when possible |

### 10. Recognition drill

Read this problem aloud:

> *"Given a binary tree, find its maximum depth."*

Before coding, say:

> *"Depth = 1 + max(left depth, right depth) → bottom-up recursion, base case null returns 0."*

---

*You understand the pattern. Your first quest puts it into practice. →*`;
}

function genQuest(day, quest, questNum) {
  const url = lcUrl(quest.lc);
  const xpLine = quest.xp >= 20 ? ` · ${quest.xp} XP` : '';
  const timeMin = quest.diff === 'Hard' ? 25 : quest.diff === 'Medium' ? 15 : 10;

  return `# ⚔ ${quest.title}

> **Day ${day.day}** · [${quest.name} #${quest.lc}](${url}) · ${quest.diff} · ${timeMin} min${xpLine}

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open ${quest.name} on LeetCode](${url})**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. Draw the tree. Trace the recursion. The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[${quest.name} #${quest.lc}](${url})**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? Think about **${quest.pattern}**.

If you're stuck after 5 minutes: revisit the concept page's visual walkthrough. Trace the tree by hand before looking at the solution structure.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** ${quest.pattern}

**How to identify this from the problem statement:**
- Look for tree structure keywords — "binary tree", "root", "subtree", "node"
- Ask: does information flow **down** (carry state) or **up** (combine child results)?
- Check if you need to compare two trees or build a new one

| Keyword / phrase | What it signals |
|---|---|
| "maximum depth" / "height" | Bottom-up: return 1 + max(children) |
| "path sum" / "root to leaf" | Top-down: carry running sum |
| "same tree" / "symmetric" | Parallel recursion on two trees |
| "level order" / "each level" | BFS with queue |
| "construct from traversals" | Divide and conquer with traversal split |
| "validate BST" | Range checking during DFS |

**Why this pattern works:** Trees are recursive structures. Each subtree is a smaller instance of the same problem. The pattern names which direction information flows.

**How a strong solver thinks before coding:**
1. *"What does my function return? What do my children return?"*
2. *"What's the base case? (usually null)"*
3. *"Draw a 3-node tree and trace by hand."*
4. *"One pass or do I need a global variable?"*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Store all paths/nodes** | O(n²) space when O(h) recursion suffices |
| **BFS for depth/height** | DFS bottom-up is simpler and O(h) space |
| **Iterating without recursion** | Loses natural subtree decomposition |
| **Nested loops on nodes** | O(n²) when O(n) single-pass recursion works |

**The insight brute force misses:** Trust the recursion. You don't need to track everything — just combine what your children return.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| Related tree problems | Different combine logic | Same recursive skeleton |
| Same traversal order | Different processing per node | Same visit sequence |
| Variant constraints | Extra state or early termination | Same flow direction |

If you recognized this problem's pattern, you already have the skeleton for today's practice queue.

---

## 📖 Walkthrough

Trace the pattern on a small tree before reading the code:

\`\`\`
        3
       / \\
      9    20
          /  \\
         15   7

Apply ${quest.pattern} step by step on this tree.
Draw it. Mark the current node at each step.
Watch what gets returned from leaves back to root.
\`\`\`

> 💡 **The insight:** The code is just the paper trace written in syntax. If you can trace it by hand, you can code it.

---

## Solution

${formatSolutions(quest.lc)}

---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"This is a tree problem"** → Draw it. Don't start coding blind.
- **"${quest.pattern}"** → Name the pattern from the concept page.
- **"What do my children return?"** → Define the return value first.
- **"Null is my base case"** → Every recursive tree function starts here.

If you tried BFS when DFS was cleaner (or vice versa), that's fine — the breakthrough is **naming the pattern family**, not memorizing one solution.

> 🎯 **Pattern Unlocked:** ${quest.pattern}

---

*${questNum === 1 ? 'One quest down. The next one builds on this pattern.' : 'Both quests complete. Head to the checkpoint.'} →*`;
}

function genCheckpoint(day) {
  const dayXp = day.quests.reduce((s, q) => s + q.xp, conceptXp(day.rank)) + day.checkpoint.xp;
  const mini = day.quests[0];

  return `# ✅ Day ${day.day} Checkpoint

> **${day.dayTitle}** · 2 quests completed · ⭐ ${dayXp} XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Before you move on, practice **hearing the signal** in each phrase below:

| When you see... | Think... | Why |
|---|---|---|
| "binary tree" + "depth/height" | Bottom-up recursion | Combine child heights |
| "path sum" / "root to leaf" | Top-down DFS | Carry running state down |
| "same tree" / "subtree of" | Parallel recursion | Compare two nodes at a time |
| "level order" / "each level" | BFS with queue | Process breadth-first |
| "construct from traversals" | Divide and conquer | Preorder root + inorder split |
| "validate BST" | Range-bounded DFS | Pass min/max down |

### 🧠 Quick Recognition Test

Read each mini-problem. Which pattern fires first?

1. *"Find the maximum depth of a binary tree"* → **Bottom-up recursion** (1 + max of children)
2. *"Check if two trees are identical"* → **Parallel recursion** (compare node + both subtrees)
3. *"Return values level by level"* → **BFS** (queue + level separation)
4. *"Find all paths with target sum"* → **Top-down DFS** (carry sum, backtrack at leaves)

---

## 🎯 Transfer to Unseen Problems

You've studied today's quests. Can you recognize the pattern on problems you've never seen?

**Scenario 1:** *"Given a binary tree, return the number of nodes."*

Which pattern? **Bottom-up or simple DFS.** Return 1 + left count + right count. Or just traverse and increment.

**Scenario 2:** *"Given a binary tree, check if it is symmetric."*

Which pattern? **Parallel mirror recursion.** Compare left.left with right.right and left.right with right.left.

**Scenario 3:** *"Given a binary tree, find the bottom-most left value."*

Which pattern? **BFS level-order.** Track the first node at each level; the last level's first node is the answer.

> **Answer key:** All three use patterns from today's training. The *combine logic* changes — the recursive skeleton does not.

---

## ⚠ Common Mistakes

1. **Forgetting null check** — Every tree function starts with \`if not node: return\`.
2. **Wrong traversal order** — Draw the tree and trace before coding.
3. **Using global when return suffices** — Prefer returning values from recursion.
4. **Not tracing on paper** — Tree problems are visual. Always draw first.
5. **Confusing top-down vs bottom-up** — Parameters going down = top-down. Return values coming up = bottom-up.

---

## 🏋️ Mini Challenge

### Related LeetCode Practice

Pick one problem from today's pattern family and solve it on LeetCode without looking at the walkthrough.

**Before you code:** Say the pattern name out loud. Draw a 4-node tree. Trace your approach by hand.

> 💡 **Hint:** Re-read the Pattern Recognition Breakdown from today's quests if stuck.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
${day.quests.map(q => `| [${q.name} #${q.lc}](${lcUrl(q.lc)}) | ${q.diff} | ${q.pattern} |`).join('\n')}

---

*Day ${day.day} complete! Tomorrow: the next branch of your ascension. →*`;
}

function genTest(rank, test, index, total) {
  const url = lcUrl(test.lc);
  const rankLabel = RANK_THEMES[rank].label;

  return `# ⚔ ${rankLabel} Test — Problem ${index + 1}

> [${test.name} #${test.lc}](${url}) · ${test.diff} · ${test.xp} XP

---

You've completed your ${rankLabel} training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open ${test.name} on LeetCode](${url})**

> ⚔ **Hunter's rule:** This is a rank test — treat it like real interview practice. Draw the tree. Trace the recursion. No peeking until you've genuinely tried.

---

## The Problem

See the full problem statement on LeetCode: **[${test.name} #${test.lc}](${url})**

---

## 💡 Hints

> 🎯 **What's being tested:** Pattern recognition from the ${rankLabel} curriculum. Name the pattern before you code.

Revisit your rank's cheat sheet. Which traversal direction does this problem need?

---

## 🔍 Pattern Recognition Breakdown

**How to identify from the statement:**
- Read for tree structure clues
- Determine information flow direction
- Name the pattern family before opening your editor

**How a strong solver thinks before coding:**
1. *"Draw the example tree."*
2. *"What does my function return?"*
3. *"Top-down, bottom-up, BFS, or parallel?"*
4. *"What's the base case?"*

---

## ❌ Why Brute Force Fails

Tree problems have natural O(n) recursive solutions. Brute force typically means redundant traversal or storing unnecessary state. Trust the subtree structure.

---

## 🎯 Transfer to Unseen Problems

Can you spot the pattern without the problem name telling you?

Read the statement once. Say the pattern aloud. If you can name it in under 30 seconds, you're ready.

---

<details>
<summary><strong>📖 Solution & Walkthrough</strong></summary>

Trace the pattern on the example tree from the problem statement. Then implement the recursive skeleton you identified.

${formatSolutions(test.lc)}

</details>

---

## 💭 What Should Have Clicked in Your Mind?

- **"This is a ${rankLabel} test"** → Use patterns from this rank's training.
- **"Draw first, code second"** → Visual tracing beats guessing.
- **"Name the pattern"** → The code is just the template filled in.

---

*${index + 1} of ${total} test problems. Continue to the next. →*`;
}

function genRankComplete(rank) {
  const meta = RANK_THEMES[rank];
  const patterns = {
    e: E_RANK_PATTERNS,
    d: D_RANK_PATTERNS,
    c: C_RANK_PATTERNS,
    b: B_RANK_PATTERNS,
    a: A_RANK_PATTERNS,
    s: S_RANK_PATTERNS,
  }[rank];

  const nextRank = { e: 'd', d: 'c', c: 'b', b: 'a', a: 's', s: null }[rank];
  const nextMeta = nextRank ? RANK_THEMES[nextRank] : null;

  const rankDays = DAYS.filter(d => d.rank === rank);
  const journeyRows = rankDays.map(d =>
    `| ${d.day} | ${d.dayTitle} | ${d.concept.pattern} |`
  ).join('\n');

  const patternList = patterns.map(p => `✅ ${p}`).join('\n        ');

  const xpMap = { e: '500+', d: '1000+', c: '1500+', b: '2400+', a: '3150+', s: '5800+' };

  let nextSection = '';
  if (nextMeta) {
    const nextDays = DAYS.filter(d => d.rank === nextRank).slice(0, 5);
    const previewRows = nextDays.map(d => `| ${d.day} | ${d.dayTitle} |`).join('\n');
    nextSection = `
## What's Next: ${nextMeta.label} Preview

${nextMeta.label} introduces **${nextMeta.theme}**:

| Day | Topic |
|-----|-------|
${previewRows}

> 💡 These patterns build directly on your ${meta.label} foundation.

---

## ${nextMeta.label === 'D-Rank' ? '🔵' : nextMeta.label === 'C-Rank' ? '🟢' : nextMeta.label === 'B-Rank' ? '🟡' : nextMeta.label === 'A-Rank' ? '🟠' : '🔴'} ${nextMeta.label} — Unlocked

You've earned ${nextMeta.label}. Continue from **Day ${nextDays[0]?.day}: ${nextDays[0]?.dayTitle}** in the sidebar.

> 💡 ${nextMeta.label} teaches you to ${nextMeta.theme.toLowerCase()}.`;
  } else {
    nextSection = `
## What's Next

There is no rank beyond S. **You are ${meta.title}.** Apply your tree mastery in weekly contests and real interviews.

> 💡 You didn't finish a course. You finished a **forest ascension**.`;
  }

  return `# 🏆 ${meta.label} Complete — ${meta.title} Confirmed

> **Congratulations, Hunter.** You've proven your **${meta.theme}** mastery.

---

## Your ${meta.label} Journey

| Day | Pattern | Core Technique |
|-----|---------|---------------|
${journeyRows}

---

## Patterns Unlocked: ${patterns.length}

\`\`\`
        ${patternList}
\`\`\`

## 🧠 Your Pattern Recognition Cheat Sheet

When a new tree problem appears, scan for these signals:

| If the problem says... | Reach for... |
|---|---|
| "depth" / "height" / "maximum depth" | Bottom-up recursion |
| "path sum" / "root to leaf" | Top-down DFS with state |
| "same tree" / "symmetric" / "subtree" | Parallel recursion |
| "level order" / "each level" / "right side view" | BFS with queue |
| "construct from traversals" | Divide and conquer |
| "validate BST" / "search BST" | BST invariant |
| "lowest common ancestor" | LCA split detection |
| "serialize" / "deserialize" | Preorder + null markers |
| "trie" / "prefix" / "dictionary" | Trie traversal |

> 💡 **The ${meta.label} skill:** Draw the tree first. Name the pattern second. Code third.

---

## Stats

- **Quests completed:** ${rankDays.length * 2}
- **Test problems solved:** 3
- **Total XP earned:** ${xpMap[rank]}
- **Rank:** ${meta.label} → ${nextMeta ? `awaiting ${nextMeta.label}` : meta.title}

---
${nextSection}

---

> *"I alone level up." — The forest grows with every root you plant.*`;
}

function buildContent() {
  fs.mkdirSync(MICRO_DIR, { recursive: true });
  const stats = { wrote: 0, skipped: 0, patched: 0 };

  const track = (result) => {
    stats[result] = (stats[result] || 0) + 1;
  };

  track(writeLesson('00-welcome.md', genWelcome()));

  for (const day of DAYS) {
    track(writeLesson(day.concept.file, genConcept(day)));
    track(writeLesson(`${String(day.day).padStart(2, '0')}-4-checkpoint.md`, genCheckpoint(day)));
    day.quests.forEach((q) => track(writeLesson(q.file, genQuest(day, q, day.quests.indexOf(q) + 1), { type: 'quest', lc: q.lc })));
  }

  for (const [rank, block] of Object.entries(RANK_TESTS)) {
    block.tests.forEach((t, i) => track(writeLesson(t.file, genTest(rank, t, i, block.tests.length), { type: 'test', lc: t.lc })));
    track(writeLesson(block.complete.file, genRankComplete(rank)));
  }

  console.log(`Build: ${stats.wrote} wrote, ${stats.skipped} skipped (hand-authored), ${stats.patched} solution-patched`);
  console.log(`${fs.readdirSync(MICRO_DIR).length} markdown files in course/trees/micro/`);
}

function buildContentJs() {
  const imports = [];
  const lessons = [];
  const importName = (file) => 't_' + file.replace(/\.md$/, '').replace(/[^a-zA-Z0-9]/g, '_');

  const addLesson = (meta, importVar) => {
    lessons.push({ ...meta, importVar });
  };

  // Welcome
  imports.push(`import welcomeContent from './course/trees/micro/00-welcome.md?raw';`);
  addLesson({
    id: 'welcome', title: 'Welcome to the Forest Ascension', rank: 'intro', day: 0, dayTitle: '',
    type: 'intro', icon: '🌲', xp: 0,
  }, 'welcomeContent');

  for (const day of DAYS) {
    const d = day.day;
    const cVar = importName(day.concept.file);
    imports.push(`import ${cVar} from './course/trees/micro/${day.concept.file}?raw';`);
    addLesson({
      id: `${d}-1`, title: day.concept.title, rank: day.rank, day: d, dayTitle: day.dayTitle,
      type: 'concept', icon: '📝', xp: conceptXp(day.rank),
    }, cVar);

    day.quests.forEach((q, qi) => {
      const qVar = importName(q.file);
      imports.push(`import ${qVar} from './course/trees/micro/${q.file}?raw';`);
      addLesson({
        id: `${d}-${qi + 2}`, title: q.title, rank: day.rank, day: d, dayTitle: day.dayTitle,
        type: 'quest', icon: '⚔', xp: q.xp,
      }, qVar);
    });

    const cpFile = `${String(d).padStart(2, '0')}-4-checkpoint.md`;
    const cpVar = importName(cpFile);
    imports.push(`import ${cpVar} from './course/trees/micro/${cpFile}?raw';`);
    addLesson({
      id: `${d}-4`, title: 'Checkpoint & Practice', rank: day.rank, day: d, dayTitle: day.dayTitle,
      type: 'checkpoint', icon: '✅', xp: day.checkpoint.xp,
    }, cpVar);
  }

  for (const [rank, block] of Object.entries(RANK_TESTS)) {
    block.tests.forEach((t, ti) => {
      const tVar = importName(t.file);
      imports.push(`import ${tVar} from './course/trees/micro/${t.file}?raw';`);
      const prefix = rank === 'e' ? 'test' : `${rank}-test`;
      addLesson({
        id: `${prefix}-${ti + 1}`, title: t.title, rank, day: block.day, dayTitle: block.dayTitle,
        type: 'test', icon: '⚔', xp: t.xp,
      }, tVar);
    });

    const rcVar = importName(block.complete.file);
    imports.push(`import ${rcVar} from './course/trees/micro/${block.complete.file}?raw';`);
    addLesson({
      id: `rank-${rank}-complete`, title: `${RANK_THEMES[rank].label} Complete`, rank, day: block.complete.day,
      dayTitle: 'Rank Up!', type: 'complete', icon: '🏆', xp: 0,
    }, rcVar);
  }

  const lessonEntries = lessons.map(l => `  {
    id: '${l.id}',
    title: '${l.title.replace(/'/g, "\\'")}',
    rank: '${l.rank}',
    day: ${l.day},
    dayTitle: '${l.dayTitle.replace(/'/g, "\\'")}',
    type: '${l.type}',
    icon: '${l.icon}',
    xp: ${l.xp},
    content: ${l.importVar},
  }`).join(',\n');

  const out = `// ══════════════════════════════════════════════════════════
//  TREES CONTENT — Trees Ascension
//  Micro-lesson architecture: E-Rank + D-Rank + C-Rank + B-Rank + A-Rank + S-Rank
//  Generated by scripts/build-trees-course.js — re-run after curriculum edits
// ══════════════════════════════════════════════════════════

${imports.join('\n')}

export const COURSE_LESSONS = [
${lessonEntries}
];
`;

  fs.writeFileSync(path.join(ROOT, 'trees-content.js'), out, 'utf8');
  console.log(`Wrote trees-content.js with ${lessons.length} lessons`);
}

buildContent();
buildContentJs();
