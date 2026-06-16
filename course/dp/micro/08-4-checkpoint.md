<!-- hand-authored -->
# ✅ Day 8 Checkpoint

> **Cost Optimization** · 2 quests completed · ⭐ 55 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Day 8 is **min/max cost** — `min` (or `max`) of predecessors **plus local cost**.

| When you see... | Think... | Why |
|---|---|---|
| "minimum path sum" grid R/D | `grid[i][j]+min(top,left)` | Grid min-cost |
| "minimum total" triangle | Bottom-up: `tri[i][j]+min(dp[j],dp[j+1])` | Base = last row |
| "unique paths count" | **Day 7 +** | Count, not cost |
| "max non-adjacent sum" | **Day 6 max** | Line, not grid |
| "maximum product subarray" | **Day 9 dual state** | Sign flips |

### 🧠 Quick Recognition Test

1. *"Cheapest path top-left to bottom-right with cell costs"* → **Min path sum template**
2. *"How many paths R/D"* → **Day 7: sum neighbors**
3. *"Min path top to bottom in triangle"* → **Bottom-up dp from last row**
4. *"Decode ways count"* → **Day 7: prefix sum**

---

## 🎯 Transfer to Unseen Problems

**Scenario 1:** *"Grid with positive weights — find minimum cost path from (0,0) to (m-1,n-1), moving only right/down."*

Which pattern? **Grid min-cost** — identical skeleton to Minimum Path Sum.

**Scenario 2:** *"Falling path: pick one cell per row, adjacent columns, minimize sum."*

Which pattern? **Bottom-up or top-down min** — triangle-like staggered grid.

**Scenario 3:** *"Count minimum-cost paths (same cost, count ties)."*

Which pattern? **Hybrid** — often count on top of min layer (later rank); pure min is Day 8.

> **Answer key:** Cell costs + "minimum" → **`min` + cost**. No costs + "how many" → Day 7.

---

## ⚠ Common Mistakes

1. **Using + like Unique Paths** — Min-cost needs **`min`**.
2. **Triangle top-down without memo** — Bottom-up 1D is standard.
3. **Forgetting to add current cell/triangle value** — `min` alone is wrong.
4. **Wrong fill order on triangle** — Start **bottom row**, move up.
5. **Edge row/col not seeded on grid** — Cumulative sum along borders first.

---

## 🏋️ Mini Challenge

### Related LeetCode Practice

Solve [Falling Path Sum #931](https://leetcode.com/problems/falling-path-sum/) — triangle-shaped min-cost with a square grid.

**Before you code:** Decide fill direction. Write recurrence.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Minimum Path Sum #64](https://leetcode.com/problems/minimum-path-sum/) | Medium | Grid Min-Cost DP |
| [Triangle #120](https://leetcode.com/problems/triangle/) | Medium | Bottom-Up Min-Cost DP |

---

*Day 8 complete! Tomorrow: break the line — circles and dual state. →*
