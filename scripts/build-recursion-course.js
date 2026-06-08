/**
 * Build Recursion & Backtracking Ascension course content + recursion-content.js
 * Run: node scripts/build-recursion-course.js
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
  RECURSION_CHEAT_SHEET,
} from './recursion-curriculum.js';
import { lcUrl } from './recursion-lc-slugs.js';
import { SOLUTIONS } from './recursion-solutions.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const MICRO_DIR = path.join(ROOT, 'course', 'recursion', 'micro');

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
  const map = { e: 10, d: 15, c: 20, b: 25, a: 20, s: 25 };
  return map[rank] || 10;
}

function visualForDay(day) {
  const { rank, day: n, concept } = day;
  if (n <= 2 || rank === 'e') {
    return `\`\`\`
factorial(3):

CALL STACK (grows downward):
┌─────────────────┐
│ factorial(3)    │  waiting for factorial(2)
│   n = 3         │
├─────────────────┤
│ factorial(2)    │  waiting for factorial(1)
│   n = 2         │
├─────────────────┤
│ factorial(1)    │  BASE CASE → returns 1
│   n = 1         │
└─────────────────┘

RETURNS (bubble upward):
factorial(1) → 1
factorial(2) → 2 × 1 = 2
factorial(3) → 3 × 2 = 6
\`\`\``;
  }
  if (n <= 10 || rank === 'd') {
    return `\`\`\`
pow(2, 10) — binary recursion:

              pow(2,10)
             /        \\
        pow(2,5)      (cached half)
        /     \\
   pow(2,2)  pow(2,3)
    /   \\
pow(2,1) pow(2,1)

Each level halves the problem → O(log n) calls instead of O(n)
\`\`\``;
  }
  if (n <= 16 || rank === 'c') {
    return `\`\`\`
subsets([1,2,3]) — decision tree:

                    []
           /                  \\
        [1]                  []
       /   \\                /   \\
    [1,2]  [1]           [2]     []
    /  \\   / \\          / \\    / \\
  ...  ... ... ...     ... ... ... ...

At each index: INCLUDE element or EXCLUDE element
Backtrack = undo the choice and try the other branch
\`\`\``;
  }
  if (n <= 22 || rank === 'b') {
    return `\`\`\`
N-Queens row-by-row with pruning:

Row 0: place Q at col 0
Row 1: try col 0 ✗ (same column)
       try col 1 ✗ (diagonal)
       try col 2 ✓
Row 2: try cols... ✗ all blocked → BACKTRACK to row 1
       try col 3 ✓
...

Pruned branches never explored → saves exponential time
\`\`\``;
  }
  if (n <= 27 || rank === 'a') {
    return `\`\`\`
fib(5) WITH memoization:

        fib(5)
       /      \\
    fib(4)    fib(3) ← already computed!
    /    \\
 fib(3) fib(2)
  /   \\
fib(2) fib(1)

Memo cache: { fib(3): 2, fib(2): 1, ... }
Duplicate subtrees skipped → O(n) instead of O(2^n)
\`\`\``;
  }
  return `\`\`\`
PATTERN DECISION TREE — any new problem:

1. Can I define a smaller version of the same problem?
   NO → probably not recursion
   YES ↓
2. Do I need to try ALL valid choices?
   YES → backtracking (choose / explore / unchoose)
   NO ↓
3. Does information flow UP from sub-results?
   YES → bottom-up return recursion
   NO → top-down state passing
4. Same subproblem repeated?
   YES → add memoization
\`\`\``;
}

function genWelcome() {
  return `# 🔄 Recursion & Backtracking Ascension

> Welcome, Hunter.

---

You've solved problems with loops. Maybe you even tried recursion once — and got lost in the call stack. Here's the truth: **recursion isn't magic. It's a stack of smaller versions of the same problem.**

Most beginners fail because they cannot *see* what happens when a function calls itself. This course makes the invisible visible — stack frames, return flow, decision trees — before you write a single line of code.

**Visualization-first philosophy:** Every concept shows the call stack or decision tree BEFORE any code. Every quest asks you to try first, then reveals what should have clicked. Every checkpoint drills transfer — spotting recursive patterns in problems you've never studied.

**30 days. 30 missions. 6 ranks. One recursive ascension.**

---

## How It Works

Each day is a focused mission. You learn one recursive pattern, solve real LeetCode problems with it, and prove mastery before moving on.

| | Your Daily Flow | |
|---|---|---|
| 📝 | **Concept** | See the call stack visually, understand the pattern, then learn the code |
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
| ⬛ **E-Rank** — Novice | 1–5 | Call stack, base cases, recursive thinking | Easy |
| 🔵 **D-Rank** — Apprentice | 6–10 | Divide & conquer, multiple calls, helpers | Easy → Medium |
| 🟢 **C-Rank** — Pathfinder | 11–16 | Backtracking template, subsets, permutations | Medium |
| 🟡 **B-Rank** — Strategist | 17–22 | Pruning, board constraints, partitions | Medium |
| 🟠 **A-Rank** — Master | 23–27 | Recursion + memo, advanced backtracking | Medium |
| 🔴 **S-Rank** — Legend | 28–30 | Multi-pattern synthesis, final ascension | Medium → Hard |

Complete each rank to unlock the next. No skipping. No shortcuts.

---

## What You Need

- Basic programming: loops, functions, arrays ✓
- Arrays & Strings Ascension (or equivalent pattern recognition) ✓
- Trees Ascension recommended (tree recursion appears on Days 4–10) ✓
- A desire to **see** the call stack, not just memorize templates ✓

---

> 💡 **The goal isn't to memorize recursive templates.** It's to build the visual intuition that lets you trace any recursive problem on paper before writing a single line of code.

---

*Your E-Rank training begins now. Descend to rise. →*`;
}

function genConcept(day) {
  const { concept, dayTitle, day: dayNum, rank } = day;
  const stars = STAR(concept.stars);
  const xp = conceptXp(rank);
  const readMin = rank === 'e' ? 10 : rank === 's' ? 18 : 15;
  const visual = visualForDay(day);

  const cheatRows = RECURSION_CHEAT_SHEET.slice(0, 6).map(
    ([signal, pattern]) => `| ${signal} | ${pattern} |`
  ).join('\n');

  return `# 📝 ${concept.title}

> **Day ${dayNum}** · ${dayTitle} · ${stars} · ${xp} XP · ${readMin} min read

---

Your mission today: **understand ${concept.pattern} visually** before you touch any code. Trace the call stack on paper. Watch values flow. Then the recursion becomes obvious.

---

## Part 1 — Why Does This Work?

### 1. What is the pattern?

**${concept.pattern}** — the core technique you'll use in today's quests.

Every recursive problem reduces to one question: *What is the smaller version of this problem?*
- **Base case** — the smallest input you can answer directly
- **Recursive case** — call yourself on a smaller input and combine the result
- **Trust** — assume the recursive call returns the correct answer

### 2. Simple explanation

Think of recursion like asking a friend to handle the hard part. You say: *"I'll do my one step — you figure out the rest."* When the friend returns an answer, you combine it with your step.

The call stack is just a line of friends waiting for the next friend to finish.

### 3. Visual walkthrough

${visual}

### 4. How the pattern works

\`\`\`
function solve(input):
    if base_case(input):
        return direct_answer
    smaller = reduce(input)
    sub_result = solve(smaller)   // trust this works
    return combine(input, sub_result)
\`\`\`

The magic: you never need to think about the whole problem — just the current step and what the smaller call returns.

### 5. What problem does this solve?

| Problem family | How this pattern helps |
|---|---|
| Linear reduction | Reverse, factorial, power — shrink input by one |
| Tree / list structure | Natural subproblems at each node |
| Generate all possibilities | Decision tree with choose / explore / unchoose |
| Count / optimize | Memoize overlapping subproblems |
| Partition / assign | Try each valid choice, backtrack on failure |

### 6. Why brute force / iteration fails

| Brute force | Problem |
|---|---|
| Nested loops for all combinations | O(n!) — misses the recursive structure |
| Manual stack simulation without understanding | Hard to debug, easy to lose state |
| Iterating without base case | Infinite loops or stack overflow |
| Generating then filtering | Explores invalid branches unnecessarily |

### 7. The key observation

**Every recursive problem has self-similar substructure.** The art is naming what gets smaller, what the base case is, and what you do with the returned result.

### 8. Pattern signals & recognition clues

| When the problem says… | Think… |
|---|---|
${cheatRows}
| "base case" / "smallest input" | Stop recursion — return directly |
| "trust" / "assume subproblem solved" | Recursive hypothesis |

**Keywords:** \`recursive\` · \`backtrack\` · \`all combinations\` · \`generate\` · \`partition\` · \`subsets\`

### 9. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Missing base case | Always define the smallest input first |
| Not trusting the recursive call | Assume f(n-1) is correct; focus on f(n) |
| Forgetting to undo (backtracking) | Remove choice after exploring branch |
| Confusing parameters vs return values | Down = parameters, up = return values |
| Stack overflow on large input | Add memoization or convert to iteration |

### 10. Recognition drill

Read this problem aloud:

> *"Given an array, generate all possible subsets."*

Before coding, say:

> *"Include/exclude each element → backtracking template. Base case: index == n. Choose: add nums[i] or skip. Unchoose: pop after explore."*

---

*You understand the pattern. Your first quest puts it into practice. →*`;
}

function genQuest(day, quest, questNum) {
  const url = lcUrl(quest.lc);
  const xpLine = quest.xp >= 20 ? ` · ${quest.xp} XP` : '';
  const timeMin = quest.diff === 'Hard' ? 25 : quest.diff === 'Medium' ? 15 : 10;
  const traceHint = quest.pattern.toLowerCase().includes('backtrack') || quest.pattern.toLowerCase().includes('grid')
    ? 'Draw the decision tree. Trace choose / explore / unchoose.'
    : 'Trace the call stack on paper. Mark each frame push and pop.';

  return `# ⚔ ${quest.title}

> **Day ${day.day}** · [${quest.name} #${quest.lc}](${url}) · ${quest.diff} · ${timeMin} min${xpLine}

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open ${quest.name} on LeetCode](${url})**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. ${traceHint} The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[${quest.name} #${quest.lc}](${url})**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? Think about **${quest.pattern}**.

If you're stuck after 5 minutes: revisit the concept page's visual walkthrough. ${traceHint}

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** ${quest.pattern}

**How to identify this from the problem statement:**
- Can the problem be broken into a smaller version of itself?
- Is there a clear base case when the input is small enough?
- Do you need to generate all valid choices or just compute one answer?

| Keyword / phrase | What it signals |
|---|---|
| "reverse" / "factorial" / "power" | Linear recursion — shrink by one |
| "all subsets" / "all combinations" | Backtracking — include/exclude |
| "all permutations" / "arrangements" | Backtracking — used[] or swap |
| "partition" / "split" / "restore" | String backtracking |
| "word search" / "grid" | Grid DFS + mark/unmark |
| "how many ways" + overlap | Recursion + memoization |

**Why this pattern works:** Recursive problems have self-similar structure. Name what shrinks, define the base case, trust the sub-call.

**How a strong solver thinks before coding:**
1. *"What is the base case?"*
2. *"What gets smaller on each call?"*
3. *"Do I pass state down or return results up?"*
4. *"Trace one example on paper before coding."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Nested loops for all combinations** | O(n!) — misses pruning and structure |
| **Iterating without recursive insight** | Hard to handle tree/backtracking shape |
| **No memoization on overlapping subproblems** | Exponential time on Fibonacci-style problems |
| **Forgetting to backtrack (undo)** | Wrong state leaks into sibling branches |

**The insight brute force misses:** Recursion names the substructure. Backtracking prunes invalid branches early.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| Related recursive problems | Different combine logic | Same skeleton: base + recurse + combine |
| Same backtracking family | Different constraints | Same choose / explore / unchoose |
| Variant constraints | Extra pruning or state | Same decision tree shape |

If you recognized this problem's pattern, you already have the skeleton for today's practice queue.

---

## 📖 Walkthrough

${traceHint}

\`\`\`
Apply ${quest.pattern} step by step on the example from the problem.
Mark the current call frame at each step.
Watch what gets returned (or what choices get made) at each level.
\`\`\`

> 💡 **The insight:** The code is just the paper trace written in syntax. If you can trace it by hand, you can code it.

---

## Solution

${formatSolutions(quest.lc)}

---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"This is a recursive problem"** → Trace it. Don't start coding blind.
- **"${quest.pattern}"** → Name the pattern from the concept page.
- **"What's my base case?"** → Define it before the recursive call.
- **"What does the smaller call return?"** → Trust it and combine.

If you tried brute force first, that's fine — the breakthrough is **naming the pattern family**, not memorizing one solution.

> 🎯 **Pattern Unlocked:** ${quest.pattern}

---

*${questNum === 1 ? 'One quest down. The next one builds on this pattern.' : 'Both quests complete. Head to the checkpoint.'} →*`;
}

function genCheckpoint(day) {
  const dayXp = day.quests.reduce((s, q) => s + q.xp, conceptXp(day.rank)) + day.checkpoint.xp;

  const signalRows = RECURSION_CHEAT_SHEET.map(
    ([signal, pattern]) => `| ${signal} | ${pattern} | Smaller self-similar subproblem |`
  ).join('\n');

  return `# ✅ Day ${day.day} Checkpoint

> **${day.dayTitle}** · 2 quests completed · ⭐ ${dayXp} XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Before you move on, practice **hearing the signal** in each phrase below:

| When you see... | Think... | Why |
|---|---|---|
${signalRows}

### 🧠 Quick Recognition Test

Read each mini-problem. Which pattern fires first?

1. *"Reverse a string in-place using recursion"* → **Linear recursion** (swap ends, recurse middle)
2. *"Generate all subsets of an array"* → **Subset backtracking** (include/exclude)
3. *"Find maximum depth of a binary tree"* → **Bottom-up return** (1 + max(children))
4. *"Search a word in a 2D grid"* → **Grid backtracking** (mark/unmark cells)

---

## 🎯 Transfer to Unseen Problems

You've studied today's quests. Can you recognize the pattern on problems you've never seen?

**Scenario 1:** *"Given a string, generate all permutations of its characters."*

Which pattern? **Permutation backtracking.** Used[] array or swap-based. Base case: path length == n.

**Scenario 2:** *"Given n, compute x^n efficiently."*

Which pattern? **Binary recursion (divide and conquer).** Half the exponent each call. O(log n).

**Scenario 3:** *"Given a grid, find all paths from top-left to bottom-right."*

Which pattern? **Grid backtracking or DFS.** Depends on constraints — backtrack if visiting each cell once.

> **Answer key:** All three use patterns from today's training. The *combine logic* changes — the recursive skeleton does not.

---

## ⚠ Common Mistakes

1. **Missing base case** — Every recursive function needs a stopping condition.
2. **Not tracing on paper** — Recursion problems are visual. Always trace first.
3. **Forgetting to undo (backtracking)** — Pop/remove after exploring a branch.
4. **Confusing top-down vs bottom-up** — Parameters going down = top-down. Returns coming up = bottom-up.
5. **Stack overflow** — Add memoization or switch to iteration for deep recursion.

---

## 🏋️ Mini Challenge

### Related LeetCode Practice

Pick one problem from today's pattern family and solve it on LeetCode without looking at the walkthrough.

**Before you code:** Say the pattern name out loud. Trace one example by hand on paper.

> 💡 **Hint:** Re-read the Pattern Recognition Breakdown from today's quests if stuck.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
${day.quests.map(q => `| [${q.name} #${q.lc}](${lcUrl(q.lc)}) | ${q.diff} | ${q.pattern} |`).join('\n')}

---

*Day ${day.day} complete! Tomorrow: the next descent of your ascension. →*`;
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

> ⚔ **Hunter's rule:** This is a rank test — treat it like real interview practice. Trace the call stack. Name the pattern. No peeking until you've genuinely tried.

---

## The Problem

See the full problem statement on LeetCode: **[${test.name} #${test.lc}](${url})**

---

## 💡 Hints

> 🎯 **What's being tested:** Pattern recognition from the ${rankLabel} curriculum. Name the pattern before you code.

Revisit your rank's cheat sheet. Is this linear recursion, backtracking, or memoized recursion?

---

## 🔍 Pattern Recognition Breakdown

**How to identify from the statement:**
- What gets smaller on each recursive call?
- Is this generate-all or compute-one?
- Do you need to undo choices (backtrack)?

**How a strong solver thinks before coding:**
1. *"Trace the example on paper."*
2. *"What's the base case?"*
3. *"Linear, branching, or backtracking?"*
4. *"Do I need memoization?"*

---

## ❌ Why Brute Force Fails

Recursive problems have natural structure. Brute force typically means nested loops or redundant recomputation. Name the pattern first.

---

## 🎯 Transfer to Unseen Problems

Can you spot the pattern without the problem name telling you?

Read the statement once. Say the pattern aloud. If you can name it in under 30 seconds, you're ready.

---

<details>
<summary><strong>📖 Solution & Walkthrough</strong></summary>

Trace the pattern on the example from the problem statement. Then implement the recursive skeleton you identified.

${formatSolutions(test.lc)}

</details>

---

## 💭 What Should Have Clicked in Your Mind?

- **"This is a ${rankLabel} test"** → Use patterns from this rank's training.
- **"Trace first, code second"** → Call stack tracing beats guessing.
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

  const cheatRows = RECURSION_CHEAT_SHEET.map(
    ([signal, pattern]) => `| ${signal} | ${pattern} |`
  ).join('\n');

  const xpMap = { e: '500+', d: '1000+', c: '1500+', b: '2400+', a: '3150+', s: '5800+' };

  const rankEmoji = { e: '⬛', d: '🔵', c: '🟢', b: '🟡', a: '🟠', s: '🔴' };

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

## ${rankEmoji[nextRank] || '🔵'} ${nextMeta.label} — Unlocked

You've earned ${nextMeta.label}. Continue from **Day ${nextDays[0]?.day}: ${nextDays[0]?.dayTitle}** in the sidebar.

> 💡 ${nextMeta.label} teaches you to ${nextMeta.theme.toLowerCase()}.`;
  } else {
    nextSection = `
## What's Next

There is no rank beyond S. **You are ${meta.title}.** Apply your recursive mastery in weekly contests and real interviews.

> 💡 You didn't finish a course. You finished a **recursive ascension**.`;
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

When a new recursive problem appears, scan for these signals:

| If the problem says... | Reach for... |
|---|---|
${cheatRows}

> 💡 **The ${meta.label} skill:** Trace the call stack first. Name the pattern second. Code third.

---

## Stats

- **Quests completed:** ${rankDays.length * 2}
- **Test problems solved:** 3
- **Total XP earned:** ${xpMap[rank]}
- **Rank:** ${meta.label} → ${nextMeta ? `awaiting ${nextMeta.label}` : meta.title}

---
${nextSection}

---

> *"I alone level up." — Descend to rise. Every call stack frame is a step toward mastery.*`;
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

  console.log(`Wrote ${fs.readdirSync(MICRO_DIR).length} markdown files to course/recursion/micro/`);
}

function buildContentJs() {
  const imports = [];
  const lessons = [];
  const importName = (file) => 'r_' + file.replace(/\.md$/, '').replace(/[^a-zA-Z0-9]/g, '_');

  const addLesson = (meta, importVar) => {
    lessons.push({ ...meta, importVar });
  };

  imports.push(`import welcomeContent from './course/recursion/micro/00-welcome.md?raw';`);
  addLesson({
    id: 'welcome', title: 'Welcome to the Recursive Ascension', rank: 'intro', day: 0, dayTitle: '',
    type: 'intro', icon: '🔄', xp: 0,
  }, 'welcomeContent');

  for (const day of DAYS) {
    const d = day.day;
    const cVar = importName(day.concept.file);
    imports.push(`import ${cVar} from './course/recursion/micro/${day.concept.file}?raw';`);
    addLesson({
      id: `${d}-1`, title: day.concept.title, rank: day.rank, day: d, dayTitle: day.dayTitle,
      type: 'concept', icon: '📝', xp: conceptXp(day.rank),
    }, cVar);

    day.quests.forEach((q, qi) => {
      const qVar = importName(q.file);
      imports.push(`import ${qVar} from './course/recursion/micro/${q.file}?raw';`);
      addLesson({
        id: `${d}-${qi + 2}`, title: q.title, rank: day.rank, day: d, dayTitle: day.dayTitle,
        type: 'quest', icon: '⚔', xp: q.xp,
      }, qVar);
    });

    const cpFile = `${String(d).padStart(2, '0')}-4-checkpoint.md`;
    const cpVar = importName(cpFile);
    imports.push(`import ${cpVar} from './course/recursion/micro/${cpFile}?raw';`);
    addLesson({
      id: `${d}-4`, title: 'Checkpoint & Practice', rank: day.rank, day: d, dayTitle: day.dayTitle,
      type: 'checkpoint', icon: '✅', xp: day.checkpoint.xp,
    }, cpVar);
  }

  for (const [rank, block] of Object.entries(RANK_TESTS)) {
    block.tests.forEach((t, ti) => {
      const tVar = importName(t.file);
      imports.push(`import ${tVar} from './course/recursion/micro/${t.file}?raw';`);
      const prefix = rank === 'e' ? 'test' : `${rank}-test`;
      addLesson({
        id: `${prefix}-${ti + 1}`, title: t.title, rank, day: block.day, dayTitle: block.dayTitle,
        type: 'test', icon: '⚔', xp: t.xp,
      }, tVar);
    });

    const rcVar = importName(block.complete.file);
    imports.push(`import ${rcVar} from './course/recursion/micro/${block.complete.file}?raw';`);
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
//  RECURSION CONTENT — Recursion & Backtracking Ascension
//  Micro-lesson architecture: E-Rank through S-Rank
//  Generated by scripts/build-recursion-course.js — re-run after curriculum edits
// ══════════════════════════════════════════════════════════

${imports.join('\n')}

export const COURSE_LESSONS = [
${lessonEntries}
];
`;

  fs.writeFileSync(path.join(ROOT, 'recursion-content.js'), out, 'utf8');
  console.log(`Wrote recursion-content.js with ${lessons.length} lessons`);
}

buildContent();
buildContentJs();
