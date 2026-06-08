# ✅ Day 20 Checkpoint

> **2D Prefix Sums** · 2 quests completed · ⭐ 80 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

| When you see... | Think... | Why |
|---|---|---|
| "sum of rectangle" + multiple queries | 2D prefix, four-corner formula | O(1) query after O(m×n) build (#304) |
| "submatrix sum" / "region sum" | Inclusion-exclusion on prefix table | Subtract top and left strips, add corner back |
| "count submatrices with sum = target" | Row-pair + 1D hash map | Compress rows to colSum, #560 on columns |
| "block sum" / "neighborhood within distance k" | 2D prefix for any k×k block | Clamp bounds, four-corner lookup (#1314) |
| "immutable matrix" + query class | Build prefix in constructor | Same as Range Sum Query 1D (#303), in 2D |
| build without `- prefix[i-1][j-1]` | Inclusion-exclusion on build too | Double-counts top-left quadrant |
| `{0: 1}` in hash map | Subarray starting at index 0 | Same rule as Subarray Sum Equals K (#560) |

### 🧠 Quick Recognition Test

1. *"Answer 10,000 rectangle sum queries on a fixed matrix"* → **2D prefix sum, O(1) per query (#304)**
2. *"Count how many submatrices sum to exactly 0"* → **Row-pair loop + hash map on column prefix (#1074)**
3. *"Each cell becomes the sum of all neighbors within Manhattan distance k"* → **2D prefix for block sums (#1314)**
4. *"Given a matrix, find the largest square containing only 1s"* → **Prefix + binary search on side length, or DP (#221)**

---

## 🎯 Transfer to Unseen Problems

You've studied Range Sum Query 2D and Submatrices That Sum to Target. Can you recognize 2D prefix thinking on problems you've never walked through?

**Scenario 1:** *"Given a binary matrix, find the largest rectangle containing only 1s."*

Which pattern? **Row-by-row histogram + monotonic stack (Day 17).** Each row extends a histogram of consecutive 1s; stack finds max area. Not pure 2D prefix — but row compression is the same instinct. (Maximal Rectangle #85.)

**Scenario 2:** *"Given a matrix and integer k, every element becomes the sum of all elements in the k×k block centered on it (clamped at edges)."*

Which pattern? **2D prefix sum with boundary clamping.** Compute block corners via four-corner formula on a clamped rectangle. (Matrix Block Sum #1314.)

**Scenario 3:** *"Given a 2D grid of 0s and 1s, count the number of square submatrices with all 1s."*

Which pattern? **DP on side length** — `dp[i][j] = min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]) + 1` for cells with 1. Prefix sums can verify but DP is cleaner. (Count Square Submatrices #1277.)

> **Answer key:** Scenario 2 → 2D prefix (today's mini challenge). Scenario 1 → stack + row histogram. Scenario 3 → DP. The signal "many rectangle queries" → prefix; "count with target" → row-pair + hash map.

---

## ⚠ Common Mistakes

1. **Forgetting inclusion-exclusion on build** — `prefix[i][j]` needs `- prefix[i-1][j-1]`. Without it, the top-left quadrant is counted twice.

2. **Forgetting inclusion-exclusion on query** — Must add back `prefix[r1-1][c1-1]`. Subtracting top and left strips removes the corner twice.

3. **No zero-padding** — Leads to messy boundary branches. Pad with an extra row and column of zeros.

4. **Brute-forcing #1074 with four nested loops** — O(m²n²) TLE. Fix top/bottom rows, hash map the column prefix.

5. **Missing `{0: 1}` in hash map** — Submatrices starting at column 0 are missed. Same bug as #560.

---

## 🏋️ Mini Challenge

### [Matrix Block Sum #1314](https://leetcode.com/problems/matrix-block-sum/)

**[→ Try Matrix Block Sum on LeetCode](https://leetcode.com/problems/matrix-block-sum/)**

Given a matrix `mat` and integer `k`, return a matrix `answer` where each `answer[i][j]` is the sum of all elements in `mat` within the **Manhattan distance k** from `(i, j)` — i.e., the sum of the `(2k+1) × (2k+1)` block centered at `(i,j)`, clamped to matrix bounds.

```
Input:  mat = [[1,2,3],[4,5,6],[7,8,9]], k = 1
Output: [[12,21,16],[27,45,33],[24,39,28]]

Input:  mat = [[1,2,3],[4,5,6],[7,8,9]], k = 2
Output: [[45,45,45],[45,45,45],[45,45,45]]
        (entire matrix summed for every cell)
```

### 🔍 Pattern Recognition for This Challenge

| Clue | Signal |
|---|---|
| "sum of neighbors within distance k" | Rectangle sum with clamped bounds |
| "return a new matrix" | Build 2D prefix first, query per cell |
| every cell needs a block sum | O(m×n) queries, each O(1) with prefix |

**Before you code:** *"Clamp block corners: `r1 = max(0, i-k)`, `r2 = min(rows-1, i+k)`, same for cols. Four-corner prefix query on the clamped rectangle."*

> 💡 **Hint:** Build the same padded 2D prefix from #304. For each cell `(i,j)`, compute clamped `(r1,c1,r2,c2)` and apply the inclusion-exclusion formula. No special logic per edge — clamping handles boundaries.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Matrix Block Sum #1314](https://leetcode.com/problems/matrix-block-sum/) | Medium | 2D prefix + clamped rectangle |
| [Range Sum Query - Immutable #303](https://leetcode.com/problems/range-sum-query-immutable/) | Easy | 1D prefix foundation (Day 5) |
| [Subarray Sum Equals K #560](https://leetcode.com/problems/subarray-sum-equals-k/) | Medium | Hash map prefix — 1D half of #1074 |
| [Maximal Rectangle #85](https://leetcode.com/problems/maximal-rectangle/) | Hard | Row histogram + monotonic stack |
| [Count Square Submatrices #1277](https://leetcode.com/problems/count-square-submatrices-with-all-ones/) | Medium | DP on square side length |

---

*Day 20 complete! Tomorrow: Advanced Hashing — designing keys that group equivalent elements. →*
