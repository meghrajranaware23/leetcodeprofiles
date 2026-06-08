# ✅ Day 13 Checkpoint

> **Bipartite Graphs** · 2 quests completed · ⭐ 75 XP earned

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
| [Is Graph Bipartite? #785](https://leetcode.com/problems/is-graph-bipartite/) | Medium | BFS/DFS Two-Coloring |
| [Possible Bipartition #886](https://leetcode.com/problems/possible-bipartition/) | Medium | Conflict Graph Coloring |

---

*Day 13 complete! Tomorrow: the next territory of your ascension. →*
