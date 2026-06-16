<!-- hand-authored -->
# ✅ Day 3 Checkpoint

> **DFS — Depth-First Search** · 2 quests completed · ⭐ 40 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Day 3 is **DFS first introduction**: recursion stack, visit order, and the **component restart loop**. No BFS queue today.

| When you see... | Think... | Why |
|---|---|---|
| "connected components" / "provinces" | Outer loop + `dfs(i)` | Each restart = one group |
| "visit all rooms from start" | Single `dfs(0)` + `all(visited)` | Reachability, not counting |
| Explicit neighbor lists | `for v in adj[u]` | Same as adjacency from Day 1 |
| Undirected connectivity matrix | Symmetric edges | Scan row for neighbors |
| Directed keys / one-way edges | DFS follows arrow direction | Can't enter without path |
| Need shortest steps | **Not Day 3** — use BFS (Day 2) | DFS goes deep, not level-first |

### 🧠 Quick Recognition Test

Read each mini-problem. Which Day 3 pattern fires first?

1. *"How many disconnected groups in an undirected graph?"* → **Restart loop + DFS**
2. *"Can you reach every node from node 0 in a directed graph?"* → **Single-source DFS reachability**
3. *"Trace recursion stack during DFS from node 0"* → **Depth-first visit order**
4. *"Minimum steps from A to B on unweighted grid"* → **BFS (Day 2)** — not DFS

---

## 🎯 Transfer to Unseen Problems

You've done Provinces and Keys and Rooms. Can you apply **DFS patterns** to new problems?

**Scenario 1:** *"Given an undirected graph, return the size of the largest connected component."*

Which pattern? **Restart loop + DFS** — same as Provinces, but track max size during each flood.

**Scenario 2:** *"Starting at webpage 0, can you reach all pages following hyperlinks?"*

Which pattern? **Keys and Rooms template** — directed adjacency, `dfs(0)`, check all visited.

**Scenario 3:** *"Count islands in a binary grid."*

Which pattern? **Restart loop on grid** — Day 4 formalizes; each unvisited `1` triggers `dfs(r,c)`.

> **Answer key:** Questions 1 and 3 use **restart**; question 2 uses **single-source reachability**.

---

## ⚠ Common Mistakes

1. **Using BFS visual for DFS problems** — Think stack/recursion, not queue levels.

2. **Component count without outer loop** — One DFS from 0 misses other provinces.

3. **Keys and Rooms: restart from every room** — Only room 0 is initially open.

4. **Forgetting visited before recurse** — Cycles cause infinite DFS.

5. **Provinces: treating matrix as directed** — `isConnected[i][j]` implies both ways.

---

## 🏋️ Mini Challenge

### Related LeetCode Practice

**[Reorder Routes to Make All Paths Lead to the City Zero #1466](https://leetcode.com/problems/reorder-routes-to-make-all-paths-lead-to-the-city-zero/)** — DFS/BFS from 0 on directed roads (reachability with edge flips).

**Before you code:** Draw directed edges from 0 outward. Mark what DFS would visit.

> 💡 **Hint:** Re-read the restart-loop walkthrough in Provinces if component counting still feels fuzzy.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Number of Provinces #547](https://leetcode.com/problems/number-of-provinces/) | Medium | DFS Connected Components |
| [Keys and Rooms #841](https://leetcode.com/problems/keys-and-rooms/) | Medium | DFS Reachability |

---

*Day 3 complete! Tomorrow: grids as graphs — perimeter math and island counting. →*
