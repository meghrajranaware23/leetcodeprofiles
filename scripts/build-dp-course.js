/**
 * Build Dynamic Programming Ascension course content + dp-content.js
 * Run: node scripts/build-dp-course.js
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
  DP_CHEAT_SHEET,
} from './dp-curriculum.js';
import { lcUrl } from './dp-lc-slugs.js';
import { SOLUTIONS } from './dp-solutions.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const MICRO_DIR = path.join(ROOT, 'course', 'dp', 'micro');

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
  const map = { e: 10, d: 15, c: 20, b: 25, a: 20, s: 25 };
  return map[rank] || 10;
}

function visualForDay(day) {
  const { rank, day: n } = day;
  if (n <= 5 || rank === 'e') {
    return `\`\`\`
fib(5) — overlapping subproblems:

              fib(5)
             /      \\
         fib(4)      fib(3)  ← repeated!
        /     \\      /    \\
    fib(3)  fib(2) fib(2) fib(1)
    /   \\     ⬆      ⬆
fib(2) fib(1) ●      ●  ← same subproblems recomputed
  ⬆
  ●

After memoization:

fib(5) → fib(4) → fib(3) → fib(2) → fib(1) ✓ base
                                 ↑ cache[2]=1
                       ↑ cache[3]=2
              ↑ cache[4]=3
         fib(3) → CACHE HIT → 2  ✓
   ↑ cache[5]=5

O(n) calls instead of O(2^n) — each subproblem computed once
\`\`\``;
  }
  if (n <= 10 || rank === 'd') {
    return `\`\`\`
Decision diagram — take or skip:

Item:    [3]   [4]   [2]   [8]
          │     │     │     │
          ▼     ▼     ▼     ▼
  TAKE ──→ ■   SKIP ──→ ■   TAKE ──→ ■   TAKE ──→ ■
  SKIP ──→ □   TAKE ──→ □   SKIP ──→ □   SKIP ──→ □

DP array fills left-to-right:

  dp[0]  dp[1]  dp[2]  dp[3]  dp[4]
  ┌──────┬──────┬──────┬──────┬──────┐
  │  0   │  3   │  4   │  5   │  12  │
  └──────┴──────┴──────┴──────┴──────┘
    ↑      ↑      ↑      ↑      ↑
   base  max(   max(   max(   max(
         take,  take,  take,  take,
         skip)  skip)  skip)  skip)

dp[i] = max(dp[i-1], dp[i-2] + nums[i])
\`\`\``;
  }
  if (n <= 16 || rank === 'c') {
    return `\`\`\`
2D DP table — Longest Common Subsequence:

      ""  a  b  c  d  e
  "" [ 0  0  0  0  0  0 ]
  a  [ 0  1← 1  1  1  1 ]
  c  [ 0  1  1  2↖ 2  2 ]
  e  [ 0  1  1  2  2  3↖]

Cell dependencies:
  ┌────────┐
  │ dp[i-1]│──→ dp[i-1][j] (no match: take from above)
  │ [j-1]  │↘
  └────────┘  dp[i][j] = dp[i-1][j-1] + 1  (match: diagonal + 1)
                │
                ▼
            dp[i][j-1] (no match: take from left)

Match   → diagonal ↖ + 1
No match → max(↑ above, ← left)
\`\`\``;
  }
  if (n <= 22 || rank === 'b') {
    return `\`\`\`
State machine — Stock Buy/Sell with Cooldown:

          buy          sell
  ┌──────────────┐──────────────┐
  │              ▼              │
  │   ┌──────────────┐         │
  │   │    HOLD      │─── sell ─┘
  │   │  (own stock) │
  │   └──────────────┘
  │         ▲
  │   buy   │
  │         │
  ┌──────────────┐    cooldown   ┌──────────────┐
  │     REST     │◄──────────────│     SOLD     │
  │  (no stock)  │               │  (just sold) │
  │              │───── buy ────→│              │
  └──────────────┘               └──────────────┘
        │ hold                         │ wait
        ▼                              ▼
      REST                           SOLD

Transitions:
  HOLD[i] = max(HOLD[i-1], REST[i-1] - price[i])
  SOLD[i] = HOLD[i-1] + price[i]
  REST[i] = max(REST[i-1], SOLD[i-1])
\`\`\``;
  }
  if (n <= 27 || rank === 'a') {
    return `\`\`\`
PATTERN DECISION TREE — classify any DP problem:

1. Does it have overlapping subproblems?
   NO → greedy / simple recursion
   YES ↓
2. Is the state 1D?
   YES → linear DP (climbing stairs, house robber, decode ways)
   NO ↓
3. Is it a grid?
   YES → grid DP (unique paths, min path sum, dungeon game)
   NO ↓
4. Two sequences?
   YES → two-sequence DP (LCS, edit distance, interleaving)
   NO ↓
5. Capacity constraint?
   YES → knapsack DP (subset sum, coin change, partition)
   NO ↓
6. Multiple states?
   YES → state machine DP (stock problems, paint house, FSM)
   NO → interval / tree DP or other advanced pattern
\`\`\``;
  }
  return `\`\`\`
Interval DP — bracket notation:

dp[i][j] = optimal answer for subarray arr[i..j]

Split at every k where i ≤ k < j:

dp[i][j] = min/max over k of:
           dp[i][k] ⊕ dp[k+1][j] + cost(i, k, j)

Dependency arrows:
  ┌─────────────────────────────────────┐
  │        dp[0][4]                     │
  │       /    |    \\                   │
  │  dp[0][0] dp[0][1] dp[0][2] ...    │
  │  dp[1][4] dp[2][4] dp[3][4] ...    │
  │       \\    |    /                   │
  │    smaller intervals first          │
  └─────────────────────────────────────┘

Fill order: by interval length (len=1, len=2, ..., len=n)

  for len in 1..n:
    for i in 0..n-len:
      j = i + len - 1
      for k in i..j-1:
        dp[i][j] = best(dp[i][k], dp[k+1][j])
\`\`\``;
}

function genWelcome() {
  return `# ⚡ Dynamic Programming Ascension

> Welcome, Hunter.

---

You've heard of DP. Maybe you've memorized a Fibonacci solution. But when a new problem appears, you freeze. Here's the truth: **DP isn't about memorizing solutions. It's about understanding state transitions.**

Every DP problem asks one question: *"If I knew the answer to all smaller subproblems, how would I compute the answer to this one?"* That's it. The rest is mechanics.

**The DP Pipeline:** Every problem follows the same five steps:

\`\`\`
1. BRUTE FORCE    → Write the naive recursive solution
2. IDENTIFY OVERLAP → Find which subproblems repeat
3. MEMOIZE         → Cache recursive results (top-down)
4. TABULATE        → Fill a table iteratively (bottom-up)
5. OPTIMIZE SPACE  → Reduce from O(n²) table to O(n) or O(1)
\`\`\`

**Visualization-first philosophy:** Every concept shows the recursion tree, DP table, or state diagram BEFORE any code. Every quest asks you to fill the table by hand first, then reveals what should have clicked. Every checkpoint drills transfer — spotting DP patterns in problems you've never studied.

**30 days. 30 missions. 6 ranks. One dynamic ascension.**

---

## How It Works

Each day is a focused mission. You learn one DP pattern, solve real LeetCode problems with it, and prove mastery before moving on.

| | Your Daily Flow | |
|---|---|---|
| 📝 | **Concept** | See the recursion tree and DP table visually, understand the state transition, then learn the code |
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
| ⬛ **E-Rank** — Learn to See (Novice) | 1–5 | Overlapping subproblems, memoization, 1D DP | Easy |
| 🔵 **D-Rank** — Learn to Decide (Apprentice) | 6–10 | Decision DP, take/skip, linear state | Easy → Medium |
| 🟢 **C-Rank** — Learn to Navigate (Pathfinder) | 11–16 | 2D DP, grids, two-sequence problems | Medium |
| 🟡 **B-Rank** — Learn to Transform (Strategist) | 17–22 | Knapsack, state machines, multi-state DP | Medium |
| 🟠 **A-Rank** — Learn to Synthesize (Master) | 23–27 | Pattern synthesis, mixed DP, optimization | Medium |
| 🔴 **S-Rank** — The Dynamic Ascension (Legend) | 28–30 | Interval DP, advanced synthesis, final ascension | Medium → Hard |

Complete each rank to unlock the next. No skipping. No shortcuts.

---

## What You Need

- Basic programming: loops, functions, arrays ✓
- Basic recursion understanding (recursive calls, base cases, return values) ✓
- Arrays & Strings Ascension (or equivalent pattern recognition) ✓
- A desire to **see** the state transitions, not just memorize templates ✓

---

> 💡 **The goal isn't to memorize DP templates.** It's to build the intuition that lets you define the state, write the transition, and fill the table for any problem — before writing a single line of code.

---

*Your E-Rank training begins now. Every state transition is a step toward optimal. →*`;
}

function genConcept(day) {
  const { concept, dayTitle, day: dayNum, rank } = day;
  const stars = STAR(concept.stars);
  const xp = conceptXp(rank);
  const readMin = rank === 'e' ? 10 : rank === 's' ? 18 : 15;
  const visual = visualForDay(day);

  const cheatRows = DP_CHEAT_SHEET.slice(0, 6).map(
    ([signal, pattern]) => `| ${signal} | ${pattern} |`
  ).join('\n');

  return `# 📝 ${concept.title}

> **Day ${dayNum}** · ${dayTitle} · ${stars} · ${xp} XP · ${readMin} min read

---

Your mission today: **understand ${concept.pattern} visually** before you touch any code. Draw the recursion tree with overlapping calls. Fill the DP table by hand. Then the transitions become obvious.

---

## Part 1 — Why Does DP Work Here?

### 1. What is the pattern?

**${concept.pattern}** — the core technique you'll use in today's quests.

Every DP problem reduces to one question: *If I already know the answer to all smaller subproblems, how do I compute the answer to this one?*
- **State** — what information do I need to describe a subproblem?
- **Transition** — how do I compute dp[i] from previously solved states?
- **Base case** — what are the smallest subproblems I can answer directly?

### 2. Simple explanation

Think of DP like building a house one brick at a time. Each brick (state) depends only on bricks already placed below it (previous states). You never re-lay a brick — once computed, the answer is final.

The recursion tree shows you which subproblems repeat. The DP table is you saying: *"I'll solve each one exactly once."*

### 3. Visual walkthrough

${visual}

### 4. The DP Pipeline

Apply the five-step pipeline to today's pattern:

\`\`\`
Step 1: BRUTE FORCE
  → Write the recursive solution. Don't worry about efficiency.

Step 2: IDENTIFY OVERLAP
  → Draw the recursion tree. Circle the repeated calls.
  → "${concept.pattern}" has overlapping subproblems because...

Step 3: MEMOIZE (top-down)
  → Add a cache. Before recursing, check if already computed.
  → memo[state] = result

Step 4: TABULATE (bottom-up)
  → Define dp[i] (or dp[i][j]). Fill from base cases forward.
  → dp[state] = transition(previous states)

Step 5: OPTIMIZE SPACE
  → Do you need the whole table? Or just the last 1-2 rows/values?
\`\`\`

### 5. State definition

**What does dp[i] represent?**

The hardest part of DP is naming the state correctly. For **${concept.pattern}**:
- What parameters fully describe a subproblem?
- Is the state a single index, two indices, or an index + capacity?
- Can you state it in one sentence: *"dp[i] is the answer to..."*

### 6. Transition logic

**How do we compute dp[i]?**

The transition is the heart of every DP solution:
- What choices do I have at state i?
- How does each choice connect to a previous state?
- Is it min, max, sum, or count over the choices?

\`\`\`
dp[i] = best/sum over all valid choices c:
          dp[previous_state(i, c)] + cost(c)
\`\`\`

### 7. Base cases & answer extraction

| Component | Question |
|---|---|
| Base case | What is the smallest subproblem? What does dp[0] (or dp[0][0]) equal? |
| Fill order | Left-to-right? Bottom-up? By interval length? |
| Answer | Is the answer dp[n], dp[n-1], max(dp[...]), or something else? |

### 8. Pattern signals & recognition clues

| When the problem says… | Think… |
|---|---|
${cheatRows}
| "optimal" / "minimum cost" / "maximum profit" | DP — optimize over choices |
| "how many ways" / "count paths" | DP — sum over transitions |

**Keywords:** \`minimum\` · \`maximum\` · \`count ways\` · \`longest\` · \`shortest\` · \`can you reach\` · \`partition\`

### 9. Common DP mistakes

| Mistake | Fix |
|---|---|
| Wrong state definition | State must capture all info needed to make the optimal choice |
| Missing base case | Always define dp[0] (and dp[1] if needed) before the loop |
| Wrong fill order | Ensure dp[i] only depends on already-computed states |
| Off-by-one in table size | dp array usually has size n+1 to include the empty/zero case |
| Forgetting to return the right cell | Answer might be dp[n], dp[n-1], max(dp), or dp[0][n-1] |

### 10. Recognition drill

Read this problem aloud:

> *"Given an array of integers, find the maximum sum of non-adjacent elements."*

Before coding, say:

> *"State: dp[i] = max sum using elements 0..i. Transition: dp[i] = max(dp[i-1], dp[i-2] + nums[i]). Base: dp[0] = nums[0], dp[1] = max(nums[0], nums[1]). Answer: dp[n-1]."*

---

*You understand the pattern. Your first quest puts it into practice. →*`;
}

function genQuest(day, quest, questNum) {
  const url = lcUrl(quest.lc);
  const xpLine = quest.xp >= 20 ? ` · ${quest.xp} XP` : '';
  const timeMin = quest.diff === 'Hard' ? 25 : quest.diff === 'Medium' ? 15 : 10;
  const traceHint = quest.pattern.toLowerCase().includes('grid') || quest.pattern.toLowerCase().includes('2d')
    ? 'Fill in the 2D table cell by cell. Track which cells each cell depends on.'
    : 'Draw the recursion tree. Circle the repeated subproblems. Then fill the DP table left-to-right.';

  return `# ⚔ ${quest.title}

> **Day ${day.day}** · [${quest.name} #${quest.lc}](${url}) · ${quest.diff} · ${timeMin} min${xpLine}

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open ${quest.name} on LeetCode](${url})**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. Which DP pattern from today's concept applies? What's the state? What's the transition? The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[${quest.name} #${quest.lc}](${url})**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which DP pattern from today's concept applies? Think about **${quest.pattern}**.

What is the state? What does dp[i] represent for this problem?

If you're stuck after 5 minutes: revisit the concept page's DP Pipeline. ${traceHint}

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** ${quest.pattern}

**How to identify this from the problem statement:**
- Does the problem ask for an optimal value (min/max) or a count of ways?
- Can the problem be broken into overlapping subproblems?
- Is there a clear decision at each step (take/skip, include/exclude)?

| Keyword / phrase | What it signals |
|---|---|
| "minimum" / "maximum" / "optimal" | DP — optimize over choices |
| "how many ways" / "count" / "number of" | DP — sum transitions |
| "can you reach" / "is it possible" | DP — boolean reachability |
| "longest" / "shortest" subsequence | DP — sequence comparison |
| "partition into" / "subset sum" | Knapsack DP |
| "using at most k" / "with capacity" | Bounded knapsack or state machine |

**Why brute force fails:** Without DP, the recursive solution recomputes the same subproblems exponentially many times. The recursion tree has O(2^n) or O(n!) nodes, but only O(n) or O(n²) unique subproblems.

**How a strong solver thinks before coding:**
1. *"What's the state? What does dp[i] represent?"*
2. *"What are my choices at each state?"*
3. *"What's the transition formula?"*
4. *"What's the base case? What's the answer cell?"*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Naive recursion without caching** | O(2^n) — same subproblems recomputed exponentially |
| **Trying all subsets with nested loops** | O(2^n) or O(n!) — misses the optimal substructure |
| **Greedy without proof** | Greedy doesn't work when locally optimal ≠ globally optimal |
| **Not identifying the state** | Without a clear state, no way to cache or tabulate |

**The insight brute force misses:** The recursion tree has massive overlap. DP exploits this by solving each unique subproblem exactly once.

\`\`\`
Exponential tree:           DP table:
     f(5)                   dp: [0, 1, 1, 2, 3, 5]
    /    \\                        → O(n) time
  f(4)   f(3)                     → each cell filled once
  / \\    / \\
f(3) f(2) f(2) f(1)        Same answer, no repeated work.
 ...  ...  ...
→ O(2^n) calls
\`\`\`

---

## 🔗 The DP Pipeline Applied

\`\`\`
Step 1: BRUTE FORCE
  → Write the naive recursive solution for this problem.

Step 2: IDENTIFY OVERLAP
  → Draw the recursion tree for a small example.
  → Which calls repeat?

Step 3: MEMOIZE
  → Add memo[state] = result before each return.
  → Check memo before recursing.

Step 4: TABULATE
  → Define dp[...]. Fill from base case forward.
  → dp[state] = transition(previous states)

Step 5: OPTIMIZE SPACE
  → Do you need the whole table? Or just prev/curr?
\`\`\`

---

## 📖 Walkthrough

${traceHint}

\`\`\`
Fill the DP table cell by cell for the example from the problem.
At each cell, write which previous cells it depends on.
Watch the transition formula produce the correct value.
\`\`\`

> 💡 **The insight:** The code is just the table-filling written in syntax. If you can fill the table by hand, you can code it.

---

## Solution

${formatSolutions(quest.lc)}

---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"State is..."** → dp[i] represents the answer for the first i elements (or whatever the state is).
- **"Transition is..."** → dp[i] = max/min/sum of (choices connecting to previous states).
- **"Base case is..."** → dp[0] = ... (the smallest subproblem answered directly).
- **"${quest.pattern}"** → Name the DP pattern from the concept page.

If you tried brute force first, that's fine — the breakthrough is **defining the state and transition**, not memorizing one solution.

> 🎯 **Pattern Unlocked:** ${quest.pattern}

---

*${questNum === 1 ? 'One quest down. The next one builds on this pattern.' : 'Both quests complete. Head to the checkpoint.'} →*`;
}

function genCheckpoint(day) {
  const dayXp = day.quests.reduce((s, q) => s + q.xp, conceptXp(day.rank)) + day.checkpoint.xp;

  const signalRows = DP_CHEAT_SHEET.map(
    ([signal, pattern]) => `| ${signal} | ${pattern} | Overlapping subproblems with optimal substructure |`
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

Read each mini-problem. What's the state? What's the transition?

1. *"Find the minimum cost to climb stairs, paying cost[i] per step"* → **State:** dp[i] = min cost to reach step i. **Transition:** dp[i] = cost[i] + min(dp[i-1], dp[i-2])
2. *"Count the number of ways to make change for amount n"* → **State:** dp[i] = number of ways to make amount i. **Transition:** dp[i] += dp[i - coin] for each coin
3. *"Find the longest common subsequence of two strings"* → **State:** dp[i][j] = LCS of s1[0..i] and s2[0..j]. **Transition:** match → dp[i-1][j-1]+1, else max(dp[i-1][j], dp[i][j-1])
4. *"Given weights and values, maximize value within capacity W"* → **State:** dp[i][w] = max value using items 0..i with capacity w. **Transition:** dp[i][w] = max(skip, take if fits)

---

## 🎯 Transfer to Unseen Problems

You've studied today's quests. Can you define the state on problems you've never seen?

**Scenario 1:** *"Given an array, find the length of the longest increasing subsequence."*

What's the state? **dp[i] = length of LIS ending at index i.** Transition: dp[i] = max(dp[j] + 1) for all j < i where nums[j] < nums[i].

**Scenario 2:** *"Find the minimum number of coins to make a given amount."*

What's the state? **dp[i] = min coins to make amount i.** Transition: dp[i] = min(dp[i - coin] + 1) for each coin denomination.

**Scenario 3:** *"Count paths in a grid from top-left to bottom-right, moving only right or down."*

What's the state? **dp[i][j] = number of paths to reach cell (i,j).** Transition: dp[i][j] = dp[i-1][j] + dp[i][j-1].

> **Answer key:** All three use DP patterns from this course. The *state and transition* change — the pipeline does not.

---

## ⚠ Common Mistakes

1. **Wrong state definition** — If your state doesn't capture enough information, the transition can't be correct.
2. **Forgetting base cases** — dp[0] (and sometimes dp[1]) must be set before the loop starts.
3. **Wrong fill order** — If dp[i] depends on dp[i+1], you must fill right-to-left, not left-to-right.
4. **Off-by-one errors** — DP arrays are usually size n+1 to include the empty/zero case.
5. **Returning the wrong cell** — The answer might be dp[n], dp[n-1], max(dp), or dp[0][n-1] depending on the state definition.

---

## 🏋️ Mini Challenge

### Related LeetCode Practice

Pick one problem from today's pattern family and solve it on LeetCode without looking at the walkthrough.

**Before you code:** Define the state in one sentence. Write the transition formula. Identify the base case. Then code.

> 💡 **Hint:** Re-read the DP Pipeline from today's concept if stuck.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
${day.quests.map(q => `| [${q.name} #${q.lc}](${lcUrl(q.lc)}) | ${q.diff} | ${q.pattern} |`).join('\n')}

---

*Day ${day.day} complete! Tomorrow: the next level of your dynamic ascension. →*`;
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

> ⚔ **Hunter's rule:** This is a rank test — treat it like real interview practice. Define the state. Write the transition. Fill the table by hand. No peeking until you've genuinely tried.

---

## The Problem

See the full problem statement on LeetCode: **[${test.name} #${test.lc}](${url})**

---

## 💡 Hints

> 🎯 **What's being tested:** Pattern recognition from the ${rankLabel} curriculum. Define the state and transition before you code.

Revisit your rank's cheat sheet. Is this linear DP, grid DP, knapsack, or state machine?

---

## 🔍 Pattern Recognition Breakdown

**How to identify from the statement:**
- What is the state? What information describes a subproblem?
- What are the choices at each state?
- What's the transition formula?

**How a strong solver thinks before coding:**
1. *"What does dp[i] represent?"*
2. *"What's the base case?"*
3. *"Linear, grid, knapsack, or state machine?"*
4. *"Can I optimize the space?"*

---

## ❌ Why Brute Force Fails

DP problems have exponential recursion trees with massive overlap. Brute force means recomputing the same subproblems O(2^n) times. Define the state, cache it, and solve each subproblem exactly once.

---

## 🎯 Transfer to Unseen Problems

Can you define the state without the problem name telling you the pattern?

Read the statement once. Define dp[i] in one sentence. If you can write the transition in under 60 seconds, you're ready.

---

<details>
<summary><strong>📖 Solution & Walkthrough</strong></summary>

Fill the DP table for the given example. Trace which cells each cell depends on. Then implement the transition.

${formatSolutions(test.lc)}

</details>

---

## 💭 What Should Have Clicked in Your Mind?

- **"This is a ${rankLabel} test"** → Use patterns from this rank's training.
- **"State first, code second"** → Define dp[i] before writing any code.
- **"Name the pattern"** → The code is just the transition formula in syntax.

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

  const cheatRows = DP_CHEAT_SHEET.map(
    ([signal, pattern]) => `| ${signal} | ${pattern} |`
  ).join('\n');

  const xpMap = { e: '500+', d: '1000+', c: '1800+', b: '3000+', a: '4200+', s: '6000+' };

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

There is no rank beyond S. **You are ${meta.title}.** Apply your DP mastery in weekly contests and real interviews.

> 💡 You didn't finish a course. You finished a **dynamic ascension**.`;
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

When a new DP problem appears, scan for these signals:

| If the problem says... | Reach for... |
|---|---|
${cheatRows}

> 💡 **The ${meta.label} skill:** Define the state first. Write the transition second. Code third.

---

## Stats

- **Quests completed:** ${rankDays.length * 2}
- **Test problems solved:** 3
- **Total XP earned:** ${xpMap[rank]}
- **Rank:** ${meta.label} → ${nextMeta ? `awaiting ${nextMeta.label}` : meta.title}

---
${nextSection}

---

> *"Every state transition is a step toward optimal." — The dynamic path reveals itself one subproblem at a time.*`;
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
  console.log(`${fs.readdirSync(MICRO_DIR).length} markdown files in course/dp/micro/`);
}

function buildContentJs() {
  const imports = [];
  const lessons = [];
  const importName = (file) => 'dp_' + file.replace(/\.md$/, '').replace(/[^a-zA-Z0-9]/g, '_');

  const addLesson = (meta, importVar) => {
    lessons.push({ ...meta, importVar });
  };

  imports.push(`import welcomeContent from './course/dp/micro/00-welcome.md?raw';`);
  addLesson({
    id: 'welcome', title: 'Welcome to the Dynamic Programming Ascension', rank: 'intro', day: 0, dayTitle: '',
    type: 'intro', icon: '⚡', xp: 0,
  }, 'welcomeContent');

  for (const day of DAYS) {
    const d = day.day;
    const cVar = importName(day.concept.file);
    imports.push(`import ${cVar} from './course/dp/micro/${day.concept.file}?raw';`);
    addLesson({
      id: `${d}-1`, title: day.concept.title, rank: day.rank, day: d, dayTitle: day.dayTitle,
      type: 'concept', icon: '📝', xp: conceptXp(day.rank),
    }, cVar);

    day.quests.forEach((q, qi) => {
      const qVar = importName(q.file);
      imports.push(`import ${qVar} from './course/dp/micro/${q.file}?raw';`);
      addLesson({
        id: `${d}-${qi + 2}`, title: q.title, rank: day.rank, day: d, dayTitle: day.dayTitle,
        type: 'quest', icon: '⚔', xp: q.xp,
      }, qVar);
    });

    const cpFile = `${String(d).padStart(2, '0')}-4-checkpoint.md`;
    const cpVar = importName(cpFile);
    imports.push(`import ${cpVar} from './course/dp/micro/${cpFile}?raw';`);
    addLesson({
      id: `${d}-4`, title: 'Checkpoint & Practice', rank: day.rank, day: d, dayTitle: day.dayTitle,
      type: 'checkpoint', icon: '✅', xp: day.checkpoint.xp,
    }, cpVar);
  }

  for (const [rank, block] of Object.entries(RANK_TESTS)) {
    block.tests.forEach((t, ti) => {
      const tVar = importName(t.file);
      imports.push(`import ${tVar} from './course/dp/micro/${t.file}?raw';`);
      const prefix = rank === 'e' ? 'test' : `${rank}-test`;
      addLesson({
        id: `${prefix}-${ti + 1}`, title: t.title, rank, day: block.day, dayTitle: block.dayTitle,
        type: 'test', icon: '⚔', xp: t.xp,
      }, tVar);
    });

    const rcVar = importName(block.complete.file);
    imports.push(`import ${rcVar} from './course/dp/micro/${block.complete.file}?raw';`);
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
//  DP CONTENT — Dynamic Programming Ascension
//  Micro-lesson architecture: E-Rank through S-Rank
//  Generated by scripts/build-dp-course.js — re-run after curriculum edits
// ══════════════════════════════════════════════════════════

${imports.join('\n')}

export const COURSE_LESSONS = [
${lessonEntries}
];
`;

  fs.writeFileSync(path.join(ROOT, 'dp-content.js'), out, 'utf8');
  console.log(`Wrote dp-content.js with ${lessons.length} lessons`);
}

buildContent();
buildContentJs();
