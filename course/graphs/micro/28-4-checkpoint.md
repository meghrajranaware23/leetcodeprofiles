<!-- hand-authored -->
# ✅ Day 28 Checkpoint

> **Advanced Path Optimization** · 2 quests completed · ⭐ 160 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Day 28 is **answer-search + expanded state BFS** — when plain `(r,c)` or `(node)` is not enough.

| When you see... | Think... | Why |
|---|---|---|
| "minimum time/level until path exists" | Binary search T + can(T) BFS | Monotone feasibility on threshold |
| "eliminate at most k obstacles" | `(r,c,rem)` 3D state BFS | Same cell, different rem = different node |
| "minimum maximum value on path" | Binary search + flood BFS | Minimize worst cell on route |
| "shortest path" + resource budget | Add dimension to visited | Day 10 cousin — spatial + counter |
| Plain unweighted grid, no extra constraint | **Day 8** — not Day 28 | No threshold search or 3D state |

### 🧠 Quick Recognition Test

1. *"Swim when water rises to match cell elevation — min time?"* → **Binary search T + can(T) BFS**
2. *"Shortest path eliminating ≤ k obstacles?"* → **`(r,c,rem)` BFS, vis[r][c][rem]**
3. *"Shortest path in binary matrix?"* → **Day 8** — no k dimension
4. *"Path with minimum effort (max slope)?"* → **Day 20 Dijkstra** — not binary search BFS

---

## 🎯 Transfer to Unseen Problems

**Scenario 1:** *"Find minimum speed K so all items arrive by deadline — each speed defines feasibility."*

Which pattern? **Binary search K + feasibility check** — same outer loop as Swim in Rising Water, different inner check.

**Scenario 2:** *"Grid path: you have k teleports through walls."*

Which pattern? **`(r,c,teleports_left)` 3D BFS** — identical skeleton to Obstacles Elimination.

**Scenario 3:** *"Minimum cost path with weighted edges."*

Which pattern? **Day 19 Dijkstra** — not Day 28 unless you're binary-searching a threshold.

> **Answer key:** Scenarios 1–2 = Day 28. Scenario 3 = Day 19.

---

## ⚠ Common Mistakes

1. **2D visited for obstacle elimination** — must track `rem`: `vis[r][c][k]`.
2. **Linear scan of T instead of binary search** — swim water needs O(log max) outer loop.
3. **lo = 0 in swim water** — endpoints must be enterable: `lo = max(start, end)`.
4. **Dijkstra when unweighted + threshold** — can(T) is yes/no BFS inside binary search.
5. **Forgetting nrem < 0 check** — can't step on obstacle with 0 eliminations left.

---

## 🏋️ Mini Challenge

Before S-Rank tests, trace by hand:

| Problem | One-line plan |
|---|---|
| Swim #778 | Binary search T; can(T) = BFS cells ≤ T |
| Obstacles #1293 | Queue (r,c,rem,d); vis[r][c][rem] |

**Say the pattern name out loud before opening your editor.**

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Swim in Rising Water #778](https://leetcode.com/problems/swim-in-rising-water/) | Hard | Binary Search + BFS |
| [Shortest Path in a Grid with Obstacles Elimination #1293](https://leetcode.com/problems/shortest-path-in-a-grid-with-obstacles-elimination/) | Hard | 3D State BFS |

---

*Day 28 complete! Tomorrow: Euler trails and bridge detection — edge-centric DFS. →*
