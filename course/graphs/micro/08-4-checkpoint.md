<!-- hand-authored -->
# ✅ Day 8 Checkpoint

> **Shortest Path (Unweighted)** · 2 quests completed · ⭐ 50 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Day 8 is **one shortest distance** with explicit **step counting** — not Day 6's full dist matrix.

| When you see... | Think... | Why |
|---|---|---|
| "shortest path" / "minimum steps" | BFS + `(r,c,steps)` or layers | First goal hit wins |
| "top-left to bottom-right" | Single-source BFS, 8 dirs | Binary Matrix Path |
| "shortest bridge between islands" | DFS mark + BFS expand | Two-phase Day 8 |
| "nearest exit" from entrance | BFS; goal = border cell | D-Rank test #1926 |
| "distance to nearest 0 for all" | **Day 6** multi-source | Full matrix, not one answer |

### 🧠 Quick Recognition Test

1. *"Shortest path in binary matrix with diagonals"* → **Layer BFS**, 8 directions, early exit at goal
2. *"Minimum 0-cells to connect two islands"* → **DFS mark island + multi-source BFS** from all marked cells
3. *"Steps from entrance to nearest maze exit"* → **BFS `(r,c,steps)`** — exit on border, not entrance
4. *"01 matrix of distances to nearest zero"* → **Day 6** — not Day 8

---

## 🎯 Transfer to Unseen Problems

**Scenario 1:** *"Given a maze and entrance, find steps to the nearest exit on the border."*

Which pattern? **BFS with step count** — D-Rank test Nearest Exit (#1926). Mark visited; return when you step onto a border cell (excluding entrance).

**Scenario 2:** *"Two groups of connected 1s separated by 0s — minimum 0s to flip to connect them."*

Which pattern? **Shortest Bridge** — phase 1 flood one group, phase 2 BFS.

**Scenario 3:** *"Shortest path from node A to node B in unweighted graph."*

Which pattern? **Classic BFS** — same layer logic, adjacency list instead of grid.

> **Answer key:** Scenarios 1–2 = Day 8 step BFS. Scenario 3 = same template on explicit graph.

---

## ⚠ Common Mistakes

1. **DFS for shortest path** — Always BFS when edges cost 1.
2. **Forgetting 8-directional** — Binary Matrix requires diagonals.
3. **Off-by-one on path length** — Align with problem (cells vs moves).
4. **Phase 2 from one island cell only** — Enqueue **all** marked cells (Shortest Bridge).
5. **Using Day 6 for single goal** — Full dist matrix overkill when one answer suffices.

---

## 🏋️ Mini Challenge

### [Nearest Exit from Entrance in Maze #1926](https://leetcode.com/problems/nearest-exit-from-entrance-in-maze/)

**[→ Try Nearest Exit on LeetCode](https://leetcode.com/problems/nearest-exit-from-entrance-in-maze/)**

BFS from entrance with `(r,c,steps)` — walk corridors in each direction until wall; check border for exit. D-Rank test #1.

**Before you code:** Why isn't the entrance cell itself a valid exit?

> 💡 **Hint:** Day 8 template — goal predicate changes, BFS skeleton stays.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Shortest Path in Binary Matrix #1091](https://leetcode.com/problems/shortest-path-in-binary-matrix/) | Medium | BFS Shortest Path |
| [Shortest Bridge #934](https://leetcode.com/problems/shortest-bridge/) | Medium | Component + BFS Expansion |

---

*Day 8 complete! Tomorrow: directed graphs — paths and edge direction. →*
