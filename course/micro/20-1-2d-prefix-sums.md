# 📝 2D Prefix Sums

> **Day 20** · 2D Prefix Sums · 15 XP · 12 min read

---

On Day 19 you learned to **walk** a matrix. Today you learn to **precompute** one — so any rectangular region sum answers in O(1).

E-Rank Day 5 gave you 1D prefix sums: `sum(L, R) = prefix[R+1] - prefix[L]`. The 2D version uses the same idea with **inclusion-exclusion** — subtract the regions you counted twice.

---

## Part 1 — Learn the Pattern

### 1. What is the pattern?

A **2D prefix sum** (also called an integral image) stores cumulative totals of all cells in the rectangle from `(0, 0)` to `(i, j)`:

```
prefix[i][j] = sum of all matrix[0..i][0..j]
```

Build it row by row, column by column:

```
prefix[i][j] = matrix[i][j]
             + prefix[i-1][j]      (everything above)
             + prefix[i][j-1]      (everything to the left)
             - prefix[i-1][j-1]    (subtract double-counted corner)
```

```
matrix:          prefix (cumulative):
[ 3,  1,  4 ]    [ 3,  4,  8 ]
[ 2,  5,  1 ]    [ 5, 12, 17 ]
[ 6,  0,  3 ]    [11, 18, 24 ]
```

### 2. 1D prefix vs 2D prefix

| Tool | Stores | Query |
|---|---|---|
| **1D prefix** (Day 5) | Sum of `nums[0..i]` | `sum(L, R) = prefix[R+1] - prefix[L]` |
| **2D prefix** (Day 20) | Sum of submatrix `(0,0)..(i,j)` | Four-corner inclusion-exclusion |
| **Difference array** (Day 13) | Range update stamps | Prefix to reconstruct — 2D version exists too |

**Rule of thumb:** If the problem asks for **many rectangle sum queries** on a fixed matrix → build 2D prefix once, answer each query in O(1).

### 3. Cross-rank bridge — E-Rank Day 5, C-Rank Day 13

**E-Rank Day 5 — Prefix Sums:**

```
sum(L, R) = prefix[R + 1] - prefix[L]
```

One subtraction. The 2D formula adds the big rectangle and subtracts the two strips that stick out:

```
Query: sum of rectangle (r1,c1) to (r2,c2)  [inclusive]

         (r1,c1)──────────(r1,c2)
            │                  │
            │    TARGET        │
            │                  │
         (r2,c1)──────────(r2,c2)

sum = prefix[r2][c2]
    - prefix[r1-1][c2]     (remove top strip)
    - prefix[r2][c1-1]     (remove left strip)
    + prefix[r1-1][c1-1]  (add back double-removed corner)
```

Same inclusion-exclusion logic as Venn diagrams — the corner `(r1-1, c1-1)` was subtracted twice, so add it back.

**C-Rank Day 13 — Difference Arrays:** 1D difference arrays stamp range updates; prefix reconstructs. The 2D difference array (advanced) stamps rectangular updates with four corners — inverse of today's 2D prefix query.

**C-Rank Day 5 (via hash map) — Subarray Sum Equals K:** 1D prefix + hash map counts subarrays with target sum. Day 20's hardest quest (#1074) applies the **same combo in 2D** — prefix sum every row's subarray, hash map counts targets.

### 4. Small visual example — rectangle query

```
matrix:
[ 1,  2,  3 ]
[ 4,  5,  6 ]
[ 7,  8,  9 ]

prefix:
[  1,   3,   6 ]
[  5,  12,  21 ]
[ 12,  27,  45 ]

Query: sum of submatrix (1,1) to (2,2)  → elements 5, 6, 8, 9

sum = prefix[2][2] - prefix[0][2] - prefix[2][0] + prefix[0][0]
    = 45 - 6 - 12 + 1
    = 28

Check: 5 + 6 + 8 + 9 = 28 ✓
```

### 5. What problem does this pattern solve?

- **Range sum query 2D** — many rectangle queries on fixed matrix (#304)
- **Count submatrices with target sum** — 2D prefix + hash map per row (#1074)
- **Matrix block sum** — expand each cell by neighbors using prefix (#1314)
- **Largest square of 1s** — prefix helps verify square sums quickly (preview)
- **Image integral** — computer vision blur/threshold uses same precomputation

### 6. Why brute force is inefficient

| Brute force | Problem |
|---|---|
| Sum every cell in query rectangle with nested loops | O(m × n) per query — prefix answers in O(1) |
| Rebuild cumulative sums from scratch per query | Wastes O(m × n) preprocessing already available |
| Count all submatrices with brute-force corners | O(m² × n²) — hash map + row prefix reduces to O(m² × n) |
| Forget inclusion-exclusion corner term | Off-by-one entire strips — answer is wrong |

Build prefix once in O(m × n). Each query in O(1). For k queries: O(m × n + k) instead of O(k × m × n).

### 7. The key observation

The 2D prefix array is a **lookup table for axis-aligned rectangles**. Any submatrix sum is four prefix lookups — no cell-by-cell addition at query time.

For **counting submatrices that sum to target** (Hard):

```
For each top row r1:
  For each bottom row r2:
    Build 1D prefix of column sums for rows r1..r2
    Use hash map on 1D prefix (Day 5 Subarray Sum Equals K)
    Count subarrays (column ranges) with sum = target
```

You reduce 2D to **1D prefix + hash map** by fixing row boundaries.

### 8. Pattern signals & recognition clues

| When the problem says… | Think 2D prefix sum |
|---|---|
| "sum of elements inside rectangle" + multiple queries | Build prefix, four-corner formula |
| "submatrix sum" / "rectangular region" | Inclusion-exclusion query |
| "count submatrices with sum equal to target" | Row-pair loop + 1D prefix + hash map |
| "block sum" / "neighborhood sum" | Prefix to answer any k×k window sum |
| "immutable matrix" + "sumRegion" | Classic #304 — preprocess once |

**Keywords:** `submatrix` · `rectangle sum` · `2D prefix` · `inclusion-exclusion` · `range query` · `block sum`

### 9. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Building prefix without subtracting `prefix[i-1][j-1]` | Double-counts the top-left quadrant |
| Off-by-one in query coordinates | Use `prefix[r2][c2] - prefix[r1-1][c2] - ...`; pad with row/col of zeros |
| 1D formula on 2D problem | Need four corners, not two |
| Not handling `r1=0` or `c1=0` edge cases | Pad prefix with extra zero row/column, or branch on boundary |
| O(m²n²) brute force on #1074 | Fix row top/bottom, compress to 1D, hash map the rest |

### 10. Recognition drill

Read this problem aloud:

> *"Given a 2D matrix, answer multiple queries: what is the sum of the rectangle from (r1, c1) to (r2, c2)?"*

Before coding, say:

> *"Many rectangle queries on fixed matrix → build 2D prefix in O(m×n), answer each with four-corner inclusion-exclusion in O(1)."*

---

## Part 2 — What's Next

Today you'll apply 2D prefix sums to two problems:

1. **Range queries** — Range Sum Query 2D - Immutable (#304)
2. **Count with target** — Number of Submatrices That Sum to Target (#1074, Hard)

The build formula doesn't change. The query side ranges from a four-corner lookup to a hash map combo.

---

*You can sum any rectangle in four lookups. First quest: answer range queries on a 2D grid. →*
