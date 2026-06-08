# ⚔ Quest: Number of Submatrices That Sum to Target

> **Day 20** · [Number of Submatrices That Sum to Target #1074](https://leetcode.com/problems/number-of-submatrices-that-sum-to-target/) · Hard · 45 XP · 20 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Number of Submatrices That Sum to Target on LeetCode](https://leetcode.com/problems/number-of-submatrices-that-sum-to-target/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen, paper, or your editor. The hints and walkthrough below are for *after* your attempt.

---

## The Problem

Given a `matrix` and an integer `target`, return the **number of non-empty submatrices** whose sum equals `target`.

```
Input:  matrix = [[0,1,0],[1,1,1],[0,1,0]], target = 0
Output: 4

Input:  matrix = [[1,-1],[-1,1]], target = 0
Output: 5

Input:  matrix = [[904]], target = 0
Output: 0
```

A submatrix is a contiguous block of rows and columns.

---

## 💡 Hints

Fix the **top row** and **bottom row** of the submatrix. For each pair, compress those rows into a 1D array of column sums.

Now the problem is 1D: *"How many contiguous subarrays sum to target?"* — Subarray Sum Equals K (#560) with a hash map.

```
For top in 0..rows-1:
  colSum[col] = 0 for all cols
  For bottom in top..rows-1:
    colSum[col] += matrix[bottom][col]
    Use hash map on running prefix of colSum
    Count prefix sums equal to (currentSum - target)
```

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** 2D Prefix Sum + Hash Map (Row-Pair Reduction)

**How to identify this from the problem statement:**
- "count submatrices" + "sum equals target" → enumerate row ranges, 1D subarray count per range
- "contiguous rows and columns" → fix top/bottom rows, column sums become 1D array
- Hard difficulty + matrix → often a dimension reduction trick

| Keyword / phrase | What it signals |
|---|---|
| "number of submatrices" | Count, not single query — iterate row pairs |
| "sum to target" | Hash map on prefix sums (#560) |
| "contiguous block" | Top/bottom row bounds + left/right column bounds |
| matrix + count + target | Reduce 2D → 1D prefix + hash map |

**Why this pattern works:** Any submatrix is defined by top row, bottom row, left col, right col. Fixing top and bottom rows collapses the 2D sum to a 1D array of column totals. Counting 1D subarrays with target sum is O(cols) with a hash map.

**How a strong solver thinks before coding:**
1. *"Count submatrices with sum target → can't query each of O(m²n²) submatrices."*
2. *"Fix top and bottom rows → column sums form 1D array."*
3. *"1D subarray sum = target → hash map prefix trick from Day 5 (#560)."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Four nested loops: all top, bottom, left, right** | O(m² × n²) — too slow for m, n up to 200 |
| **2D prefix + enumerate all four corners** | O(m² × n²) queries — same bottleneck |
| **Hash map without fixing row pairs** | No clean 1D reduction — hard to define prefix in 2D |
| **Forget to seed hash map with `{0: 1}`** | Misses subarrays starting at column 0 |

**The insight brute force misses:** A submatrix's row range is independent of its column range. Fix rows first (O(m²) pairs), then count valid column ranges in O(n) with a hash map.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Number of Submatrices That Sum to Target #1074](https://leetcode.com/problems/number-of-submatrices-that-sum-to-target/) | Count submatrices | Row-pair + hash map |
| [Subarray Sum Equals K #560](https://leetcode.com/problems/subarray-sum-equals-k/) | 1D version | Hash map on prefix sum |
| [Range Sum Query 2D - Immutable #304](https://leetcode.com/problems/range-sum-query-2d-immutable/) | Query, not count | 2D prefix four-corner |
| [Count Subarrays With Score Less Than K #2302](https://leetcode.com/problems/count-subarrays-with-score-less-than-k/) | 1D count with condition | Prefix + two pointers / map variants |

This is the **hardest canonical 2D prefix problem** — it combines Day 5's hash map with Day 20's row compression.

---

## 📖 Walkthrough

```
matrix = [[0,1,0],
          [1,1,1],
          [0,1,0]],  target = 0

top=0:
  bottom=0: colSum=[0,1,0]
    prefix walk: {0:1} → sum=0 at col 0 → count+1; sum=1; sum=1; sum=0 at col 2 → count+1
    submatrices: [0], [0,1,0] row — actually single cells and ranges summing to 0

  bottom=1: colSum=[1,2,1]
    count subarrays summing to 0...

  bottom=2: colSum=[1,3,1]
    count subarrays summing to 0...

(continues for top=1, top=2...)

Total count = 4 ✓
```

> 💡 **The insight:** `colSum[c]` = sum of `matrix[top..bottom][c]`. A submatrix from top to bottom with column range `[l..r]` has sum = `colSum[l] + ... + colSum[r]`. That's a 1D subarray problem.

---

## Solution

### C++
```cpp
class Solution {
public:
    int numSubmatrixSumTarget(vector<vector<int>>& matrix, int target) {
        int rows = matrix.size(), cols = matrix[0].size();
        int count = 0;

        for (int top = 0; top < rows; top++) {
            vector<int> colSum(cols, 0);
            for (int bottom = top; bottom < rows; bottom++) {
                for (int c = 0; c < cols; c++)
                    colSum[c] += matrix[bottom][c];

                unordered_map<int, int> prefixCount;
                prefixCount[0] = 1;
                int running = 0;

                for (int c = 0; c < cols; c++) {
                    running += colSum[c];
                    if (prefixCount.count(running - target))
                        count += prefixCount[running - target];
                    prefixCount[running]++;
                }
            }
        }
        return count;
    }
};
```

### Python
```python
class Solution:
    def numSubmatrixSumTarget(self, matrix: list[list[int]], target: int) -> int:
        rows, cols = len(matrix), len(matrix[0])
        count = 0

        for top in range(rows):
            col_sum = [0] * cols
            for bottom in range(top, rows):
                for c in range(cols):
                    col_sum[c] += matrix[bottom][c]

                prefix_count = {0: 1}
                running = 0

                for c in range(cols):
                    running += col_sum[c]
                    count += prefix_count.get(running - target, 0)
                    prefix_count[running] = prefix_count.get(running, 0) + 1

        return count
```

### Java
```java
class Solution {
    public int numSubmatrixSumTarget(int[][] matrix, int target) {
        int rows = matrix.length, cols = matrix[0].length;
        int count = 0;

        for (int top = 0; top < rows; top++) {
            int[] colSum = new int[cols];
            for (int bottom = top; bottom < rows; bottom++) {
                for (int c = 0; c < cols; c++)
                    colSum[c] += matrix[bottom][c];

                Map<Integer, Integer> prefixCount = new HashMap<>();
                prefixCount.put(0, 1);
                int running = 0;

                for (int c = 0; c < cols; c++) {
                    running += colSum[c];
                    count += prefixCount.getOrDefault(running - target, 0);
                    prefixCount.merge(running, 1, Integer::sum);
                }
            }
        }
        return count;
    }
}
```

**Complexity:** O(rows² × cols) time · O(cols) space per row-pair

---

## 💭 What Should Have Clicked in Your Mind?

Before you opened your editor, these thoughts should have fired:

- **"Count submatrices summing to target"** → Can't brute-force O(m²n²). Reduce dimensions.
- **Fix top and bottom rows** → Column sums become a 1D array for that row band.
- **"Subarray sum = target"** → Hash map prefix count from #560. Seed `{0: 1}`.
- **Hard + matrix + count** → Dimension reduction is the unlock, not a fancier 2D prefix.

If you tried four nested loops, you hit TLE. The signal was "count" + "target sum" — same hash map as Subarray Sum Equals K, applied after compressing rows.

> 🎯 **Pattern Combo:** 2D prefix thinking + 1D hash map. Row-pair enumeration turns a Hard 2D count into a Medium 1D count.

---

*Day 20 checkpoint next: block sums with neighborhood expansion. →*
