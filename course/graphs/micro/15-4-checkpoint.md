<!-- hand-authored -->
# ✅ Day 15 Checkpoint

> **Graph Reachability** · 2 quests completed · ⭐ 75 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Day 15 is **multi-hop reachability** and **tree-DAG propagation**.

| When you see... | Think... | Why |
|---|---|---|
| "is u prerequisite of v" (many queries) | Transitive closure | Precompute reach[u][v] |
| "direct or indirect" relationship | Multi-hop DFS from each source | Batch queries |
| "time to inform all in hierarchy" | Tree-DAG max path DFS | Parallel subtrees → max |
| "minimum starting vertices" | **Day 14** — indeg 0 | Static structure, not queries |
| "peel in-degree 0" | **Day 12** — Kahn | Dynamic ordering |

### 🧠 Quick Recognition Test

1. *"Batch prereq queries on same graph"* → **Transitive closure matrix**
2. *"CEO informs managers, managers inform reports..."* → **Max weighted DFS on tree**
3. *"List all ancestors per node"* → **Day 14** — list not boolean queries
4. *"Can reach index with value 0 by ±arr[i] jumps"* → **C-test 2** — BFS on implicit graph

---

## 🎯 Transfer to Unseen Problems

**Scenario 1:** *"Floyd-Warshall for all-pairs shortest paths."*

Which pattern? **Closure on min-plus** — related to reachability but with weights. Day 15 uses boolean closure.

**Scenario 2:** *"Parallel courses — minimum semesters."*

Which pattern? **Kahn layer count** — Day 12, not reachability matrix.

**Scenario 3:** *"Find quietest person among all richer ancestors."*

Which pattern? **DAG DFS + memo** — C-test 3 preview; reachability + optimization.

> **Answer key:** Scenario 1 = weighted closure. Scenario 3 = Day 15 reachability + min pick.

---

## ⚠ Common Mistakes

1. **BFS per query on #1462** — precompute once.
2. **Reversing reach direction** — u prereq of v means reach[u][v].
3. **Summing inform times** — max over parallel branches.
4. **BFS level count for #1376** — weights differ per manager.
5. **Confusing with shortest path BFS** — unweighted BFS ≠ weighted tree max.

---

## 🏋️ Mini Challenge

### [Jump Game III #1306](https://leetcode.com/problems/jump-game-iii/)

**[→ Preview C-Rank Test 2 on LeetCode](https://leetcode.com/problems/jump-game-iii/)**

Implicit graph: from index `i`, edges to `i±arr[i]`. BFS/DFS reachability to any index with value 0.

**Before you code:** What are the nodes? What are the edges?

> 💡 **Hint:** Nodes = indices; edges = jump targets in bounds.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Course Schedule IV #1462](https://leetcode.com/problems/course-schedule-iv/) | Medium | Transitive Closure |
| [Time Needed to Inform All Employees #1376](https://leetcode.com/problems/time-needed-to-inform-all-employees/) | Medium | Tree-DAG Time Bubble |

---

*Day 15 complete! Tomorrow: graph reduction — leaf peeling and weighted division graphs. →*
