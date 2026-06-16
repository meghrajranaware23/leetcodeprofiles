<!-- hand-authored -->
# ✅ Day 7 Checkpoint

> **Boundary Traversal** · 2 quests completed · ⭐ 50 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Day 7 is **outside-in from the border** — not center-out island counting.

| When you see... | Think... | Why |
|---|---|---|
| "enclave" / "can't reach border" | Border flood → sum remaining land | Erase escapable, count trapped |
| "closed island" / "surrounded by water" | Border flood + count inner islands | D-Rank test #1254 |
| "flow to Pacific and Atlantic" | Two border DFS, intersect | Reverse uphill from oceans |
| "number of islands" (any land) | **Day 4** inside-out | Different question |
| "BFS from all 0 cells" | **Wrong seed** for enclaves | Start from **border land** |

### 🧠 Quick Recognition Test

1. *"Land cells that cannot walk off the grid"* → **Border DFS**, sum remaining 1s (Enclaves)
2. *"Cells where water flows to both Pacific and Atlantic"* → **Two border floods**, height ≥ neighbor inward
3. *"Count islands in binary grid"* → **Day 4** — DFS from each unvisited 1, not Day 7
4. *"Count islands completely surrounded by water"* → **Day 7** border erase + count closed components (test)

---

## 🎯 Transfer to Unseen Problems

**Scenario 1:** *"Flip all 'O' surrounded by 'X' to 'X', but not 'O' on the border."*

Which pattern? **Border flood** on 'O' from edges, mark connected, flip inner — Surrounded Regions cousin.

**Scenario 2:** *"How many land cells are trapped and cannot reach any edge?"*

Which pattern? **Enclaves** — border DFS on land, return sum of remaining 1s.

**Scenario 3:** *"Which height map cells can drain to both top-left ocean and bottom-right ocean?"*

Which pattern? **Pacific Atlantic** — dual border DFS with non-decreasing height inward.

> **Answer key:** All three seed from the **grid frame**, not from interior cells or water BFS.

---

## ⚠ Common Mistakes

1. **BFS/DFS from water (0)** — Enclaves seed **border land**, not ocean cells.
2. **Counting components instead of remaining cells** — Enclaves = **cell count**, not island count.
3. **Simulating water downhill from each cell** — Pacific Atlantic: flood **from** oceans inward.
4. **Forgetting corner border cells** — Loop all four edges completely.
5. **Confusing with Day 6 multi-source** — Day 7 is reachability erase, not dist matrix layers.

---

## 🏋️ Mini Challenge

### [Number of Closed Islands #1254](https://leetcode.com/problems/number-of-closed-islands/)

**[→ Try Number of Closed Islands on LeetCode](https://leetcode.com/problems/number-of-closed-islands/)**

Border-flood land connected to edge, then count island components in the remaining grid — D-Rank test #2 combines Day 7 erase with Day 4 component scan.

**Before you code:** Explain why you border-flood **before** counting, not after.

> 💡 **Hint:** Same border loop as Enclaves — different final aggregation.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Pacific Atlantic Water Flow #417](https://leetcode.com/problems/pacific-atlantic-water-flow/) | Medium | Boundary DFS |
| [Number of Enclaves #1020](https://leetcode.com/problems/number-of-enclaves/) | Medium | Outside-In Flood Fill |

---

*Day 7 complete! Tomorrow: shortest paths with explicit step counts. →*
