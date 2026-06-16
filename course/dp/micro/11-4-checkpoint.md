<!-- hand-authored -->
# ✅ Day 11 Checkpoint

> **Grid DP Foundations** · 2 quests completed · ⭐ 75 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Day 11 is **2D grid state** — fill cell-by-cell (or one rolling row) from the top. Not LIS, not LCS.

| When you see... | Think... | Why |
|---|---|---|
| "grid" / "matrix" / "top-left to bottom-right" | Grid DP — neighbors as parents | Optimal substructure on cells |
| "obstacle" / "blocked" | Zero the cell; Day 7 #62 + guard | #63 = #62 with obstacles |
| "count paths" / "unique paths" | **Sum** parents (up + left) | Counting, not min |
| "minimum path sum" in grid | **Min** parents + cell | Min-cost grid |
| "falling" / "next row only" | Min over **three** cols above | Column-choice DP |
| "longest common subsequence" | **Day 13** — not Day 11 | Two sequences, not a grid |

### 🧠 Quick Recognition Test

1. *"Paths from top-left to bottom-right, right/down only, some obstacles"* → **Rolling row**, obstacle → 0 (#63, Day 11)
2. *"Same but no obstacles"* → **Day 7 #62** — identical fill, no zero guard
3. *"Min sum path falling one row at a time, diagonal allowed"* → **Min of three parents** above (#931)
4. *"Min sum path, only right and down"* → **Min of two parents** — #64 cousin, not falling

---

## 🎯 Transfer to Unseen Problems

**Scenario 1:** *"Count paths in a grid with obstacles, moves right or down."*

What's the state? **dp[j] = paths to column j in current row.** Transition: if blocked `0`, else `dp[j] += dp[j-1]` (plus top-row base).

**Scenario 2:** *"Minimum cost to cross an n×n matrix, each step goes to the next row in any of three columns."*

What's the state? **dp[j] = min sum ending at column j in current row.** Transition: `matrix[i][j] + min(dp[j-1], dp[j], dp[j+1])`.

**Scenario 3:** *"How many ways to decode a string of digits?"*

Which day? **Not Day 11** — that's 1D counting (Day 7 decode). No grid.

> **Answer key:** Grid DP = table on `(row, col)` or rolling row when only previous row matters.

---

## ⚠ Common Mistakes

1. **Using max/sum for min problems** — Falling path = `min`; path count = `sum` of parents.
2. **Two parents for falling path** — Need **three** columns above: `j-1`, `j`, `j+1`.
3. **Forgetting obstacle → 0** — Blocked cell kills all paths through it.
4. **Returning wrong cell** — Falling path answer = `min(last row)`, not corner only.
5. **Full m×n table when one row suffices** — Rolling `dp[j]` for both #63 and #931.

---

## 🏋️ Mini Challenge

### [Unique Paths #62](https://leetcode.com/problems/unique-paths/)

**[→ Try Unique Paths on LeetCode](https://leetcode.com/problems/unique-paths/)**

Day 7 quest — solve without obstacles. Then mentally add one obstacle and predict how `dp` changes.

**Before you code:** State the Day 7 → Day 11 bridge in one sentence.

> 💡 **Hint:** If your #63 solution works on #62 by removing the obstacle check, you've internalized the pattern.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Unique Paths II #63](https://leetcode.com/problems/unique-paths-ii/) | Medium | Grid DP with Obstacles |
| [Minimum Falling Path Sum #931](https://leetcode.com/problems/minimum-falling-path-sum/) | Medium | Column-Choice Grid DP |

---

*Day 11 complete! Tomorrow: subsequence DP — LIS is the flagship. →*
