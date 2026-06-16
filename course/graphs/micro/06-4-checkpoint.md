<!-- hand-authored -->
# ✅ Day 6 Checkpoint

> **Multi-Source BFS** · 2 quests completed · ⭐ 50 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Day 6 is **many sources, one wave** — not Day 2's single start.

| When you see... | Think... | Why |
|---|---|---|
| "distance to nearest 0" | Multi-source from all 0s | Nearest = first BFS layer hit |
| "furthest from land" / "as far from land" | Multi-source from all **1s** | Max layer into water |
| "elevation from water" / "highest peak" | Multi-source from water | D-Rank test #1765 |
| "shortest path from A to B only" | **Day 8** single goal BFS | One start, one target |
| "BFS from each cell separately" | **Stop** — flip sources | O(cells²) trap |

### 🧠 Quick Recognition Test

1. *"Return matrix of distance to nearest 0"* → **Multi-source BFS** — seed all 0s, dist matrix
2. *"Furthest water cell from any land"* → **Multi-source from land** — layer count, max dist
3. *"Rotting oranges minimum time"* → **Multi-source** from all rotten (Day 2 preview)
4. *"Shortest path in binary matrix from (0,0) to (n-1,n-1)"* → **Day 8** — one source, one goal, not Day 6

---

## 🎯 Transfer to Unseen Problems

**Scenario 1:** *"Given a grid of 0s and 1s, assign each cell the Manhattan distance to the nearest 0."*

Which pattern? **Multi-source BFS from all 0s.** Identical skeleton to 01 Matrix.

**Scenario 2:** *"Find a water cell that is farthest from any land cell."*

Which pattern? **Multi-source BFS from all land** with layer tracking — today's Far from Land quest.

**Scenario 3:** *"Given water cells, build a height map where adjacent cells differ by at most 1 and water is height 0."*

Which pattern? **Multi-source BFS from all water** — D-Rank test Map of Highest Peak (#1765).

> **Answer key:** All three seed **all** qualifying cells before the while loop. None restart BFS per query cell.

---

## ⚠ Common Mistakes

1. **BFS from each 1 toward nearest 0** — Flip sources; enqueue all 0s (or all land for inverse problems).
2. **Forgetting `-1` / unvisited check** — `dist[nr][nc] == -1` is your visited guard.
3. **Single-source when many sources exist** — Day 2 habit; Day 6 needs synchronized init.
4. **Not handling all-land / all-water edge cases** — Far from Land returns -1.
5. **Using DFS for nearest-distance** — BFS layers guarantee shortest unweighted distance.

---

## 🏋️ Mini Challenge

### [Map of Highest Peak #1765](https://leetcode.com/problems/map-of-highest-peak/)

**[→ Try Map of Highest Peak on LeetCode](https://leetcode.com/problems/map-of-highest-peak/)**

Build a height map: water = 0, adjacent cells differ by at most 1. Pure Day 6 — seed all water cells, BFS outward assigning `height+1`.

**Before you code:** Say why this is 01 Matrix with sources = water and output = height instead of distance-to-zero.

> 💡 **Hint:** Same queue init as today's concept page — appears again on D-Rank test 3.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [01 Matrix #542](https://leetcode.com/problems/01-matrix/) | Medium | Multi-Source BFS |
| [As Far from Land as Possible #1162](https://leetcode.com/problems/as-far-from-land-as-possible/) | Medium | Multi-Source BFS on Grid |

---

*Day 6 complete! Tomorrow: flood from the border inward — outside-in thinking. →*
