<!-- hand-authored -->
# ✅ Day 30 Checkpoint

> **Final Ascension** · 2 quests completed · ⭐ 150 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Day 30 is the **capstone** — route through the decision tree, then execute. Final patterns:

| When you see... | Think... | Why |
|---|---|---|
| "distribute coins" / "minimum moves" | Post-order excess | `abs(excess)` = edge crossings |
| "each node has one coin" | `coins + L + R - 1` | Keep 1, rest flows to parent |
| "smallest missing genetic value" | Subtree set + MEX | Collect values, scan from 1 |
| "parents array" + tree | Build children adjacency | Not binary — n-ary from parent list |
| "permutation 1..n" | Unique node with 1 | Path-to-root optimization |
| "no node has value 1" | All answers = 1 | MEX can't exceed 1 without 1 in subtree |

### 🧠 Quick Recognition Test

Route each through the Day 30 decision tree:

1. *"Minimum moves to balance coins to 1 per node"* → **Post-order excess** — Day 30 quest 1
2. *"Smallest missing value in each subtree"* → **Gene set aggregation** — Day 30 quest 2
3. *"Minimum cameras to cover all nodes"* → **3-state bottom-up** — S-Test #968
4. *"Nodes equal to subtree average"* → **`(sum, count)` tuple** — S-Test #2265
5. *"Good paths with non-decreasing values"* → **DSU + sort by value** — S-Test #2421

---

## 🎯 Transfer to Unseen Problems

**Scenario 1:** *"Minimum edge weight to send supplies so each node has exactly k units."*

Which pattern? **Post-order excess** — generalize to `excess = coins + L + R - k`.

**Scenario 2:** *"For each node, count distinct values in subtree."*

Which pattern? **Set aggregation** — same collect as gene problem, output set size not MEX.

**Scenario 3:** *"You see a new tree problem in an interview — where do you start?"*

Which pattern? **Decision tree (Day 30 concept)** — BFS? Parallel? Top-down? Bottom-up tuple? Route first.

> **Answer key:** Day 30 quests are both **bottom-up**, but different return semantics — excess (scalar) vs set (aggregate).

---

## ⚠ Common Mistakes

1. **Distribute Coins: simulate instead of excess** — Post-order accounting is O(n).

2. **Distribute Coins: forget `- 1`** — Each node keeps exactly one coin.

3. **Gene MEX: O(n²) per-node DFS** — Use path-from-1 optimization + global visited.

4. **Gene MEX: reset mex each node** — `mex` only increases as set grows.

5. **Skip capstone decision tree** — 30 days of patterns collapse into the flowchart — use it.

---

## 🏋️ Mini Challenge

You have completed the Trees pack. Before S-Test, run the **capstone drill**:

1. Open a random tree problem on LeetCode.
2. Draw the tree.
3. Run the Day 30 decision flowchart — name the day and pattern.
4. Write the recursive skeleton before looking at solutions.

> 💡 **Hint:** If you can't route in 60 seconds, re-read `30-1-final-ascension.md` Section 1.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Distribute Coins in Binary Tree #979](https://leetcode.com/problems/distribute-coins-in-binary-tree/) | Medium | Bottom-Up Greedy Moves |
| [Smallest Missing Genetic Value in Each Subtree #2003](https://leetcode.com/problems/smallest-missing-genetic-value-in-each-subtree/) | Hard | Subtree Set Aggregation |

---

## 🏆 Ready for S-Test

Three problems stand between you and **Forest Legend**:

| Test | Problem | Pattern |
|---|---|---|
| s-test-1 | Binary Tree Cameras #968 | 3-state post-order (deeper than B-test) |
| s-test-2 | Number of Good Paths #2421 | DSU + value sort on tree |
| s-test-3 | Average of Subtree #2265 | `(sum, count)` tuple |

> *Day 30 complete. The forest awaits your final proof. →*
