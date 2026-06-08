/**
 * Build Graphs Ascension course content + graphs-content.js
 * Run: node scripts/build-graphs-course.js
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
} from './graphs-curriculum.js';
import { lcUrl } from './graphs-lc-slugs.js';
import { SOLUTIONS } from './graphs-solutions.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const MICRO_DIR = path.join(ROOT, 'course', 'graphs', 'micro');

const STAR = (n) => '★'.repeat(n) + '☆'.repeat(5 - n);

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

function conceptXp(rank) {
  const map = { e: 10, d: 10, c: 15, b: 25, a: 20, s: 25 };
  return map[rank] || 10;
}

function genWelcome() {
  return `# 🕸️ Graphs Ascension

> Welcome, Hunter.

---

You've mastered arrays and trees. But graphs are different — nodes connect in every direction, cycles lurk, and the same problem can hide as a grid, a network, or an abstract state machine.

Here's the truth: **graph problems aren't harder. They're visual.** Once you can trace BFS wavefronts and DFS paths on paper, the code writes itself.

**Visual-first philosophy:** Every concept shows the graph being traversed node-by-node BEFORE any code. Every quest asks you to try first, then reveals what should have clicked. Every checkpoint drills transfer — spotting graph patterns in problems you've never studied.

**30 days. 30 missions. 6 ranks. One territory ascension.**

---

## How It Works

Each day is a focused mission. You learn one graph pattern, solve real LeetCode problems with it, and prove mastery before moving on.

| | Your Daily Flow | |
|---|---|---|
| 📝 | **Concept** | See the graph visually, understand the pattern, then learn the code |
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
| ⬛ **E-Rank** — Scout | 1–5 | Representation, BFS, DFS, grids, components | Easy |
| 🔵 **D-Rank** — Pathfinder | 6–10 | Multi-source BFS, boundary DFS, shortest path, state BFS | Medium |
| 🟢 **C-Rank** — Cartographer | 11–16 | Directed graphs, topo sort, bipartite, DAG reasoning | Medium |
| 🟡 **B-Rank** — Navigator | 17–22 | Union-Find, Dijkstra, MST, combined techniques | Medium |
| 🟠 **A-Rank** — Expedition Leader | 23–27 | Advanced BFS, graph modeling, DFS+memo, synthesis | Medium → Hard |
| 🔴 **S-Rank** — Graph Legend | 28–30 | Threshold BFS, Euler paths, Tarjan's, bitmask BFS | Expert |

Complete each rank to unlock the next. No skipping. No shortcuts.

---

## What You Need

- Basic programming: queues, stacks, recursion, hash maps ✓
- Arrays & Strings + Trees Ascension (or equivalent pattern recognition) ✓
- A desire to **see** graphs, not just memorize templates ✓

---

> 💡 **The goal isn't to memorize graph templates.** It's to build the visual intuition that lets you trace any graph problem on paper before writing a single line of code.

---

*Your E-Rank training begins now. Scout your first node. →*`;
}

function genConcept(day) {
  const { concept, dayTitle, day: dayNum, rank } = day;
  const stars = STAR(concept.stars);
  const xp = conceptXp(rank);
  const readMin = rank === 'e' ? 10 : rank === 's' ? 18 : 15;

  return `# 📝 ${concept.title}

> **Day ${dayNum}** · ${dayTitle} · ${stars} · ${xp} XP · ${readMin} min read

---

Your mission today: **understand ${concept.pattern} visually** before you touch any code. Draw the graph on paper. Watch nodes get visited. Then the traversal becomes obvious.

---

## Part 1 — Why Does This Work?

### 1. What is the pattern?

**${concept.pattern}** — the core technique you'll use in today's quests.

Every graph problem reduces to one question: *How do I explore the connections?*
- **BFS** (breadth-first): expand wavefront level by level — shortest path in unweighted graphs
- **DFS** (depth-first): go deep before wide — connectivity, cycles, backtracking
- **Union-Find**: merge connected groups efficiently — connectivity queries
- **Dijkstra**: weighted shortest path — priority queue relaxation
- **State-space**: treat configurations as nodes — abstract graph BFS

### 2. Simple explanation

Think of a graph like a city map. Nodes are intersections, edges are roads. To explore:
- **BFS** = flood filling outward — visit all neighbors before going deeper
- **DFS** = walking one road to the end, then backtracking

The visited set prevents infinite loops. The queue/stack determines exploration order.

### 3. Visual walkthrough

\`\`\`
Graph:  0 — 1 — 2
        |       |
        3 — 4   5

BFS from 0:
Queue: [0] → visit 0, enqueue 1,3
Queue: [1,3] → visit 1, enqueue 2; visit 3, enqueue 4
Queue: [2,4] → visit 2, enqueue 5; visit 4
Queue: [5] → visit 5
Visited: {0,1,3,2,4,5}
\`\`\`

### 4. How the pattern works

\`\`\`
function bfs(start):
    queue = [start]
    visited = {start}
    while queue not empty:
        node = queue.dequeue()
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.enqueue(neighbor)
\`\`\`

The magic: you never revisit a node. Each visit is O(1) amortized with a visited set.

### 5. What problem does this solve?

| Problem family | How this pattern helps |
|---|---|
| Connectivity | DFS/BFS finds all reachable nodes |
| Shortest path (unweighted) | BFS guarantees minimum steps |
| Grid traversal | Treat cells as nodes, 4-directional edges |
| Multi-source propagation | Initialize BFS from all sources |
| Cycle detection | DFS with coloring or in-degree topo sort |
| Weighted shortest path | Dijkstra with priority queue |

### 6. Why brute force fails

| Brute force | Problem |
|---|---|
| Try all paths recursively without memo | Exponential time on dense graphs |
| BFS without visited set | Infinite loops on cyclic graphs |
| Dijkstra on unweighted graphs | Unnecessary priority queue overhead |
| Nested loops for connectivity | O(n²) when O(n) BFS/DFS suffices |
| Ignoring graph structure in grids | Miss the natural adjacency model |

### 7. The key observation

**A graph is just nodes and edges.** Most interview problems are one of: traverse it, find shortest path, detect structure, or build it from input. Name the exploration strategy first.

### 8. Pattern signals & recognition clues

| When the problem says… | Think… |
|---|---|
| "shortest path" / "minimum steps" | BFS (unweighted) or Dijkstra (weighted) |
| "connected" / "reachable" / "can visit" | DFS/BFS with visited set |
| "grid" / "matrix" / "island" | Grid-as-graph, 4-directional BFS/DFS |
| "course schedule" / "prerequisites" | Topological sort / cycle detection |
| "bipartite" / "two groups" | Graph 2-coloring |
| "union" / "merge groups" / "connected components" | Union-Find |
| "minimum cost" / "network delay" | Dijkstra |
| "all paths" / "backtrack" | DFS with path recording |

**Keywords:** \`graph\` · \`node\` · \`edge\` · \`adjacent\` · \`connected\` · \`traverse\` · \`shortest\`

### 9. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Forgetting visited set | Always track visited — cycles cause infinite loops |
| Using DFS for shortest path | BFS guarantees shortest in unweighted graphs |
| Not building adjacency list | Convert edge list to adjacency list first |
| Off-by-one in grid bounds | Check \`0 <= r < rows and 0 <= c < cols\` |
| Confusing directed vs undirected | Check if edges are one-way or two-way |

### 10. Recognition drill

Read this problem aloud:

> *"Given an m×n grid, count the number of islands."*

Before coding, say:

> *"Grid-as-graph → DFS/BFS from each unvisited '1' cell, mark visited, count components."*

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

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. Draw the graph. Trace the traversal. The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[${quest.name} #${quest.lc}](${url})**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? Think about **${quest.pattern}**.

If you're stuck after 5 minutes: revisit the concept page's visual walkthrough. Draw the graph and trace BFS/DFS by hand before looking at the solution structure.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** ${quest.pattern}

**How to identify this from the problem statement:**
- Look for graph structure keywords — "node", "edge", "connected", "adjacent", "grid"
- Ask: do I need **BFS** (shortest/levels), **DFS** (connectivity/cycles), or **Dijkstra** (weighted)?
- Check if the input is explicit graph, implicit grid, or abstract state space

| Keyword / phrase | What it signals |
|---|---|
| "shortest path" / "minimum steps" | BFS with visited set |
| "connected" / "reachable" | DFS/BFS from source |
| "grid" / "island" / "matrix" | Grid-as-graph traversal |
| "prerequisites" / "dependencies" | Topological sort |
| "bipartite" / "two teams" | Graph 2-coloring |
| "union" / "merge" / "equivalent" | Union-Find |
| "minimum cost" / "network delay" | Dijkstra |

**Why this pattern works:** Graphs model relationships. The pattern names how you explore those relationships — wavefront (BFS), deep dive (DFS), or group merging (UF).

**How a strong solver thinks before coding:**
1. *"What are my nodes? What are my edges?"*
2. *"BFS, DFS, Dijkstra, or Union-Find?"*
3. *"Draw a small example graph and trace by hand."*
4. *"What goes in my visited set?"*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Try all paths without pruning** | Exponential time — visited set is essential |
| **DFS for shortest unweighted path** | BFS guarantees minimum steps |
| **Dijkstra on unweighted graph** | BFS is simpler and equally correct |
| **Nested loops for connectivity** | O(n²) when O(n) BFS/DFS works |

**The insight brute force misses:** Name the exploration strategy. BFS for shortest, DFS for connectivity, Dijkstra for weighted — then add a visited set.

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

Trace the pattern on a small graph before reading the code:

\`\`\`
Graph:  A — B — C
        |       |
        D — E   F

Apply ${quest.pattern} step by step on this graph.
Draw it. Mark visited nodes at each step.
Watch the queue/stack grow and shrink.
\`\`\`

> 💡 **The insight:** The code is just the paper trace written in syntax. If you can trace it by hand, you can code it.

---

## Solution

${formatSolutions(quest.lc)}

---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"This is a graph problem"** → Draw it. Identify nodes and edges first.
- **"${quest.pattern}"** → Name the pattern from the concept page.
- **"BFS or DFS?"** → Shortest/levels = BFS. Connectivity/cycles = DFS.
- **"Visited set"** → Every graph traversal needs one.

If you tried DFS when BFS was cleaner (or vice versa), that's fine — the breakthrough is **naming the pattern family**, not memorizing one solution.

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
| "shortest path" / "minimum steps" | BFS | First visit = shortest in unweighted |
| "connected" / "reachable" | DFS/BFS | Traverse with visited set |
| "grid" / "island" / "matrix" | Grid-as-graph | 4-directional BFS/DFS |
| "prerequisites" / "dependencies" | Topological sort | DAG ordering |
| "bipartite" / "two groups" | Graph 2-coloring | BFS/DFS with alternating colors |
| "union" / "merge" / "equivalent" | Union-Find | Near-O(1) connectivity |

### 🧠 Quick Recognition Test

Read each mini-problem. Which pattern fires first?

1. *"Find shortest path in an unweighted graph"* → **BFS** (queue + visited)
2. *"Count connected components"* → **DFS/BFS** (restart from each unvisited node)
3. *"Check if graph has a cycle"* → **DFS 3-color** or **topological sort**
4. *"Minimum cost to connect all points"* → **MST / Kruskal's** with Union-Find

---

## 🎯 Transfer to Unseen Problems

You've studied today's quests. Can you recognize the pattern on problems you've never seen?

**Scenario 1:** *"Given a grid, count the number of islands."*

Which pattern? **Grid DFS/BFS.** Each unvisited '1' cell starts a new component. Mark visited, count components.

**Scenario 2:** *"Given prerequisites, can you finish all courses?"*

Which pattern? **Cycle detection / topological sort.** If the prerequisite graph has a cycle, impossible.

**Scenario 3:** *"Given a network, find minimum time for signal to reach all nodes."*

Which pattern? **Dijkstra.** Weighted shortest path from source to all nodes.

> **Answer key:** All three use patterns from today's training. The *combine logic* changes — the recursive skeleton does not.

---

## ⚠ Common Mistakes

1. **Forgetting visited set** — Every graph traversal needs one to avoid infinite loops.
2. **Using DFS for shortest path** — BFS guarantees minimum steps in unweighted graphs.
3. **Not building adjacency list** — Convert edge list to adjacency list before traversing.
4. **Not tracing on paper** — Graph problems are visual. Always draw first.
5. **Confusing directed vs undirected** — Check if edges are one-way or bidirectional.

---

## 🏋️ Mini Challenge

### Related LeetCode Practice

Pick one problem from today's pattern family and solve it on LeetCode without looking at the walkthrough.

**Before you code:** Say the pattern name out loud. Draw a 5-node graph. Trace your approach by hand.

> 💡 **Hint:** Re-read the Pattern Recognition Breakdown from today's quests if stuck.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
${day.quests.map(q => `| [${q.name} #${q.lc}](${lcUrl(q.lc)}) | ${q.diff} | ${q.pattern} |`).join('\n')}

---

*Day ${day.day} complete! Tomorrow: the next territory of your ascension. →*`;
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

> ⚔ **Hunter's rule:** This is a rank test — treat it like real interview practice. Draw the graph. Trace the traversal. No peeking until you've genuinely tried.

---

## The Problem

See the full problem statement on LeetCode: **[${test.name} #${test.lc}](${url})**

---

## 💡 Hints

> 🎯 **What's being tested:** Pattern recognition from the ${rankLabel} curriculum. Name the pattern before you code.

Revisit your rank's cheat sheet. Which graph technique does this problem need?

---

## 🔍 Pattern Recognition Breakdown

**How to identify from the statement:**
- Read for graph structure clues
- Determine exploration strategy
- Name the pattern family before opening your editor

**How a strong solver thinks before coding:**
1. *"Draw the example graph."*
2. *"What are my nodes and edges?"*
3. *"BFS, DFS, Dijkstra, or Union-Find?"*
4. *"What goes in my visited set?"*

---

## ❌ Why Brute Force Fails

Graph problems have natural O(V+E) traversal solutions. Brute force typically means exponential path enumeration or missing visited sets. Trust the exploration strategy.

---

## 🎯 Transfer to Unseen Problems

Can you spot the pattern without the problem name telling you?

Read the statement once. Say the pattern aloud. If you can name it in under 30 seconds, you're ready.

---

<details>
<summary><strong>📖 Solution & Walkthrough</strong></summary>

Trace the pattern on the example graph from the problem statement. Then implement the traversal skeleton you identified.

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

There is no rank beyond S. **You are ${meta.title}.** Apply your graph mastery in weekly contests and real interviews.

> 💡 You didn't finish a course. You finished a **territory ascension**.`;
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

When a new graph problem appears, scan for these signals:

| If the problem says... | Reach for... |
|---|---|
| "shortest path" / "minimum steps" | BFS (unweighted) or Dijkstra (weighted) |
| "connected" / "reachable" / "can visit" | DFS/BFS with visited set |
| "grid" / "island" / "matrix" | Grid-as-graph traversal |
| "prerequisites" / "dependencies" | Topological sort |
| "bipartite" / "two groups" | Graph 2-coloring |
| "union" / "merge" / "equivalent" | Union-Find |
| "minimum cost" / "network delay" | Dijkstra |
| "all paths" / "backtrack" | DFS with path recording |
| "state" / "transformation" / "lock" | State-space BFS |

> 💡 **The ${meta.label} skill:** Draw the graph first. Name the pattern second. Code third.

---

## Stats

- **Quests completed:** ${rankDays.length * 2}
- **Test problems solved:** 3
- **Total XP earned:** ${xpMap[rank]}
- **Rank:** ${meta.label} → ${nextMeta ? `awaiting ${nextMeta.label}` : meta.title}

---
${nextSection}

---

> *"I alone level up." — Every node explored is territory conquered.*`;
}

function buildContent() {
  fs.mkdirSync(MICRO_DIR, { recursive: true });
  write('00-welcome.md', genWelcome());

  for (const day of DAYS) {
    write(day.concept.file, genConcept(day));
    write(`${String(day.day).padStart(2, '0')}-4-checkpoint.md`, genCheckpoint(day));
    day.quests.forEach((q, i) => write(q.file, genQuest(day, q, i + 1)));
  }

  for (const [rank, block] of Object.entries(RANK_TESTS)) {
    block.tests.forEach((t, i) => write(t.file, genTest(rank, t, i, block.tests.length)));
    write(block.complete.file, genRankComplete(rank));
  }

  console.log(`Wrote ${fs.readdirSync(MICRO_DIR).length} markdown files to course/graphs/micro/`);
}

function buildContentJs() {
  const imports = [];
  const lessons = [];
  const importName = (file) => 'g_' + file.replace(/\.md$/, '').replace(/[^a-zA-Z0-9]/g, '_');

  const addLesson = (meta, importVar) => {
    lessons.push({ ...meta, importVar });
  };

  // Welcome
  imports.push(`import welcomeContent from './course/graphs/micro/00-welcome.md?raw';`);
  addLesson({
    id: 'welcome', title: 'Welcome to the Territory Ascension', rank: 'intro', day: 0, dayTitle: '',
    type: 'intro', icon: '🕸️', xp: 0,
  }, 'welcomeContent');

  for (const day of DAYS) {
    const d = day.day;
    const cVar = importName(day.concept.file);
    imports.push(`import ${cVar} from './course/graphs/micro/${day.concept.file}?raw';`);
    addLesson({
      id: `${d}-1`, title: day.concept.title, rank: day.rank, day: d, dayTitle: day.dayTitle,
      type: 'concept', icon: '📝', xp: conceptXp(day.rank),
    }, cVar);

    day.quests.forEach((q, qi) => {
      const qVar = importName(q.file);
      imports.push(`import ${qVar} from './course/graphs/micro/${q.file}?raw';`);
      addLesson({
        id: `${d}-${qi + 2}`, title: q.title, rank: day.rank, day: d, dayTitle: day.dayTitle,
        type: 'quest', icon: '⚔', xp: q.xp,
      }, qVar);
    });

    const cpFile = `${String(d).padStart(2, '0')}-4-checkpoint.md`;
    const cpVar = importName(cpFile);
    imports.push(`import ${cpVar} from './course/graphs/micro/${cpFile}?raw';`);
    addLesson({
      id: `${d}-4`, title: 'Checkpoint & Practice', rank: day.rank, day: d, dayTitle: day.dayTitle,
      type: 'checkpoint', icon: '✅', xp: day.checkpoint.xp,
    }, cpVar);
  }

  for (const [rank, block] of Object.entries(RANK_TESTS)) {
    block.tests.forEach((t, ti) => {
      const tVar = importName(t.file);
      imports.push(`import ${tVar} from './course/graphs/micro/${t.file}?raw';`);
      const prefix = rank === 'e' ? 'test' : `${rank}-test`;
      addLesson({
        id: `${prefix}-${ti + 1}`, title: t.title, rank, day: block.day, dayTitle: block.dayTitle,
        type: 'test', icon: '⚔', xp: t.xp,
      }, tVar);
    });

    const rcVar = importName(block.complete.file);
    imports.push(`import ${rcVar} from './course/graphs/micro/${block.complete.file}?raw';`);
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
//  GRAPHS CONTENT — Graphs Ascension
//  Micro-lesson architecture: E-Rank + D-Rank + C-Rank + B-Rank + A-Rank + S-Rank
//  Generated by scripts/build-graphs-course.js — re-run after curriculum edits
// ══════════════════════════════════════════════════════════

${imports.join('\n')}

export const COURSE_LESSONS = [
${lessonEntries}
];
`;

  fs.writeFileSync(path.join(ROOT, 'graphs-content.js'), out, 'utf8');
  console.log(`Wrote graphs-content.js with ${lessons.length} lessons`);
}

buildContent();
buildContentJs();
