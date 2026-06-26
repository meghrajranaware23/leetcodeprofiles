<!-- hand-authored -->
# 📝 Grid DP Foundations

> **Day 11** · Grid DP Foundations · 20 XP · 15 min read

---

Day 7 counted paths on a **clean grid** — only right and down, no blocked cells ([Unique Paths #62](https://leetcode.com/problems/unique-paths/)). Day 11 adds **obstacles** and **column-choice** moves: same 2D table idea, but each cell's value depends on which neighbors you can step from and whether the cell itself is walkable.

> **Preview contrast (Day 7 vs Day 11):** Day 7 = `dp[i][j] = dp[i-1][j] + dp[i][j-1]` on an open grid. Day 11 = **zero out obstacles** and **min over three parents** when falling diagonally — still fill a table from top-left forward.

---

## Part 1 — Learn the Pattern

### 1. What is the pattern?

**2D Grid DP** — each cell stores the answer for a subproblem anchored at `(i, j)`; transitions read only **already-filled** neighbors (above, left, or diagonal parents).

- **Path counting** — `dp[i][j]` = ways to reach `(i,j)`; obstacle → `0`; else sum of valid parents
- **Min-cost paths** — `dp[i][j]` = cheapest path sum ending at `(i,j)`; take `min` over parents + cell cost
- **Column-choice** — from row `i-1`, you may land in column `j` from `j-1`, `j`, or `j+1` (falling path)
- **Space optimization** — one row (or rolling `prev` / `curr`) when only the previous row matters

### 2. Simple explanation

Imagine filling a spreadsheet cell by cell. To know how many routes reach the bottom-right corner, you only need how many routes reached the cell **above** and **to the left**. Blocked cells are dead ends — their count is zero. For minimum falling path sum, each cell asks: *"Which of the three cells above me was cheapest to reach?"* then adds its own value.

### 3. Visual — path counting with an obstacle

```
Grid (1 = obstacle):          dp[i][j] = ways to reach cell:

  0  0  0                      1  1  1
  0  1  0    →                 1  0  1   ← obstacle kills paths through (1,1)
  0  0  0                      2  1  3

Fill order: top row, then left-to-right per row.
  dp[i][j] = 0           if grid[i][j] is blocked
  dp[i][j] = dp[i-1][j] + dp[i][j-1]   otherwise (with edge base cases)

Answer at bottom-right: dp[2][2] = 3
```

### 4. Visual — min falling path (three parents)

```
matrix row i-1:   [ 1, 2, 3 ]
matrix row i:     [ 4, 5, 6 ]

dp[j] at row i = matrix[i][j] + min(dp[j-1], dp[j], dp[j+1])  (from row i-1)

Cell (i,1) value 5: can fall from cols 0,1,2 above
  → min(1, 2, 3) + 5 = 6
```

### 5. The universal template

```
// Path count (right + down, obstacles)
for i in rows:
  for j in cols:
    if grid[i][j] == obstacle: dp[i][j] = 0
    else: dp[i][j] = dp[i-1][j] + dp[i][j-1]

// Min falling path (one row rolling)
dp = matrix[0]
for i in 1..n-1:
  ndp[j] = matrix[i][j] + min(dp[j-1], dp[j], dp[j+1])
  dp = ndp
return min(dp)
```

### 6. Day 7 #62 → Day 11 #63 — the bridge

| | **Day 7 — Unique Paths #62** | **Day 11 — Unique Paths II #63** |
|---|---|---|
| Grid | All open | Some cells blocked |
| Transition | `dp[i][j] = dp[i-1][j] + dp[i][j-1]` | Same, but **0 if obstacle** |
| Base | Top row / left col = 1 | Top-left blocked → entire answer 0 |
| Space | One row rolling | One row rolling (identical trick) |
| Quest | Count paths | Count paths **through** obstacles |

The code change is one line: `if obstacle → dp[j] = 0`. The mental model is unchanged.

### 7. Pattern signals & recognition clues

| When the problem says… | Think… |
|---|---|
| "grid" / "matrix" / "top-left to bottom-right" | 2D table filled row by row |
| "obstacle" / "blocked cell" | Zero the cell; don't propagate paths through it |
| "minimum path sum" in a grid | `min` over parents + cell value |
| "falling" / "diagonal step" | Three-parent min from row above |
| "count paths" / "how many ways" | `sum` parents, not `min`/`max` |

**Keywords:** `grid` · `dp[i][j]` · `obstacle` · `right and down` · `rolling row` · `min of three`

### 8. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Forgetting obstacle → 0 | Blocked cell cannot be on any path |
| Using `max` when problem asks for count | Path **count** = **sum** of parents |
| Wrong parent set for falling path | Three columns above: `j-1`, `j`, `j+1` |
| Returning `dp[0][0]` instead of bottom-right | Answer is usually last row/col or `min` of last row |
| Allocating full `m×n` when one row suffices | Rolling `dp` row when transitions use only previous row |

### 9. Recognition drill

Read this problem aloud:

> *"A robot on an `m×n` grid with obstacles. How many unique paths from top-left to bottom-right, moving only right or down?"*

Before coding, say:

> *"Day 7 #62 plus obstacles: dp[j] rolling row; if cell blocked dp[j]=0 else dp[j]+=dp[j-1]. Bridge from clean grid — same fill order."*

---

*Obstacles first. Quest 1: Unique Paths II — the #62 upgrade. →*
