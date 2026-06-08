# ✅ Day 6 Checkpoint

> **Multiple Recursive Calls** · 2 quests completed · ⭐ 55 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Before you move on, practice **hearing the signal** in each phrase below:

| When you see... | Think... | Why |
|---|---|---|
| "reverse" / "factorial" / "power of" / single shrinking input | Simple linear recursion | Smaller self-similar subproblem |
| "how many ways" + overlapping subproblems | Recursion + memoization | Smaller self-similar subproblem |
| "all subsets" / "all combinations" / "include or exclude" | Subset backtracking | Smaller self-similar subproblem |
| "all permutations" / "all arrangements" / order matters | Permutation backtracking | Smaller self-similar subproblem |
| "combination sum" / "pick k from n" | Combination backtracking + start index | Smaller self-similar subproblem |
| "partition" / "split string" / "restore IP" | String partition backtracking | Smaller self-similar subproblem |
| "word search" / "grid path" / "visit all cells" | Grid backtracking + mark/unmark | Smaller self-similar subproblem |
| "N-Queens" / "Sudoku" / board constraints | Constraint satisfaction backtracking | Smaller self-similar subproblem |
| "matchsticks" / "partition equal" / assign to buckets | Partition backtracking + pruning | Smaller self-similar subproblem |
| "regex" / "wildcard" / pattern matching | Recursive string matching + memo | Smaller self-similar subproblem |

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
| [Pow(x, n) #50](https://leetcode.com/problems/powx-n/) | Medium | Fast Exponentiation |
| [Count Good Numbers #1922](https://leetcode.com/problems/count-good-numbers/) | Medium | Modular Binary Recursion |

---

*Day 6 complete! Tomorrow: the next descent of your ascension. →*
