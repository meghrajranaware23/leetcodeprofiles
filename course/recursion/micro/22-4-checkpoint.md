<!-- hand-authored -->
# ✅ Day 22 Checkpoint

> **Advanced Constraint Backtracking** · 2 quests completed · ⭐ 70 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

| When you see... | Think... | Key mechanic |
|---|---|---|
| permutation + rule at position `i` | Divisibility constraint permutation | `used[]` + check before choose |
| "count arrangements" | Global counter at leaf | `pos > n → ans++` |
| build binary/string + differ from set | Cantor diagonal backtrack | Column check at each index |
| "find any valid" | Early return true | First complete path wins |
| board / row / column conflicts | Day 18 constraint satisfaction | Same check-before-choose idea |

### 🧠 Quick Recognition Test

1. *"Count permutations of 1..n where position divides value or vice versa."* → **Beautiful Arrangement.** `used[]`, divisibility guard, count at leaf.

2. *"Return a length-n binary string not in a list of n strings."* → **Cantor diagonal.** Bit-by-bit; skip if all inputs share bit at column.

3. *"Generate all permutations of distinct nums."* → **Day 12.** No positional constraint.

4. *"Place n queens on n×n board."* → **Day 18.** Row-by-row constraint, not permutation of numbers.

---

## 🎯 Transfer to Unseen Problems

**Scenario 1:** *"Count permutations where adjacent elements sum to a prime."*

Which pattern? **Constraint permutation.** `used[]` + check `(path[last], candidate)` before choose.

**Scenario 2:** *"Given strings, find shortest string not in the set (unbounded length)."*

Which pattern? **Not today's template** — tries / automata, not fixed-length backtrack.

**Scenario 3:** *"Construct string s such that s[i] != nums[i][i] for all i."*

Which pattern? **Greedy Cantor diagonal** — O(n), no backtrack needed. Special case of today's quest.

> **Answer key:** 1 → constraint permutation. 2 → different family. 3 → diagonal one-liner.

---

## ⚠ Common Mistakes

1. **0-indexed vs 1-indexed pos** — Beautiful Arrangement uses **1-indexed** positions for divisibility.

2. **Python `i % pos and pos % i`** — Truthy when both nonzero; means "neither divides" → skip. Correct.

3. **Cantor: accept if any string matches** — Code skips when **any** string matches your bit at column (`has` true → skip). You need a bit **no** input has at that column.

4. **Forgetting used[] undo** — Same as Day 12 — always unmark after dfs.

5. **Treating both quests as same constraint** — One is positional divisibility; one is external set column check.

---

## 🏋️ Mini Challenge

Without code: for `n=3`, how many beautiful arrangements exist? Trace `pos=1,2,3` and count leaves.

Then: for `nums=["000","111"]` (n=3), what does greedy diagonal `s[i] = flip(nums[i][i])` produce?

> 💡 **Check:** 3 arrangements for n=3. Diagonal gives `"101"` — verify it's not in the set.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Beautiful Arrangement #526](https://leetcode.com/problems/beautiful-arrangement/) | Medium | Divisibility constraint permutation |
| [Find Unique Binary String #1980](https://leetcode.com/problems/find-unique-binary-string/) | Medium | Cantor diagonal backtrack |

---

## 🏆 B-Rank Finale

Day 22 closes B-Rank core training. The **B-Rank test** (3 problems) draws from Days 17–22: pruning, board constraints, grid DFS, partition assignment. Name the pattern in 30 seconds, then code.

---

*Day 22 complete. B-Rank test awaits — prove the foundation. →*
