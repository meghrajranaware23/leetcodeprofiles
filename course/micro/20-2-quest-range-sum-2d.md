# ⚔ Quest: Range Sum Query 2D - Immutable

> **Day 20** · [Range Sum Query 2D - Immutable #304](https://leetcode.com/problems/range-sum-query-2d-immutable/) · Medium · 35 XP · 15 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Range Sum Query 2D - Immutable on LeetCode](https://leetcode.com/problems/range-sum-query-2d-immutable/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen, paper, or your editor. The hints and walkthrough below are for *after* your attempt.

---

## The Problem

Given a 2D matrix, handle multiple queries: return the sum of elements inside the rectangle from `(row1, col1)` to `(row2, col2)` inclusive.

Implement the `NumMatrix` class:

- `NumMatrix(int[][] matrix)` — build the data structure from a matrix
- `int sumRegion(int row1, int col1, int row2, int col2)` — return the rectangle sum

```
Input:
  ["NumMatrix", "sumRegion", "sumRegion", "sumRegion"]
  [[[[3,0,1,4,2],[5,6,3,2,1],[1,2,0,1,5],[4,1,0,1,7],[1,0,3,0,5]]], [2,1,4,3], [1,1,2,2], [1,2,2,4]]

Output: [null, 8, 11, 12]

sumRegion(2,1,4,3) = 2+0+1+7 = 8
sumRegion(1,1,2,2) = 6+3+2+0 = 11
sumRegion(1,2,2,4) = 3+2+1+5 = 12
```

The matrix will not be modified. Only queries are performed.

---

## 💡 Hints

Build a 2D prefix array where `prefix[i][j]` = sum of all elements in `(0,0)` to `(i,j)` inclusive.

Build formula:

```
prefix[i][j] = matrix[i][j] + prefix[i-1][j] + prefix[i][j-1] - prefix[i-1][j-1]
```

Query formula (inclusion-exclusion):

```
sum = prefix[row2][col2]
    - prefix[row1-1][col2]
    - prefix[row2][col1-1]
    + prefix[row1-1][col1-1]
```

Pad with a zero row and zero column to avoid boundary branches.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** 2D Prefix Sum — Inclusion-Exclusion Query

**How to identify this from the problem statement:**
- "sum of elements inside rectangle" → 2D prefix query
- "multiple queries" / "immutable" → preprocess once, O(1) per query
- `sumRegion(row1, col1, row2, col2)` → four-corner formula

| Keyword / phrase | What it signals |
|---|---|
| "range sum query 2D" | Build 2D prefix, answer with inclusion-exclusion |
| "immutable" | Matrix never changes — preprocessing is safe |
| "sumRegion" | Axis-aligned rectangle query |
| "multiple queries" | O(1) query after O(m×n) build |

**Why this pattern works:** Every rectangle sum decomposes into four prefix lookups. The prefix array encodes all partial sums — no repeated cell addition per query.

**How a strong solver thinks before coding:**
1. *"Many rectangle queries → 2D prefix sum. Day 5 in two dimensions."*
2. *"Pad with zeros — same trick as prefix[0]=0 in 1D."*
3. *"Four corners: add big, subtract top and left strips, add back corner."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Nested loop over query rectangle each time** | O(m × n) per query — TLE with many queries |
| **Sum rows with 1D prefix only** | Still O(cols) per query row — not fully O(1) |
| **Rebuild prefix on every query** | Matrix is immutable — waste O(m × n) per query |
| **Forget to add back `prefix[r1-1][c1-1]`** | Subtracts the corner strip twice — wrong answer |

**The insight brute force misses:** Precompute once. Every future rectangle is four array lookups — the 1D `prefix[R+1] - prefix[L]` formula with two extra subtractions and one addition.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Range Sum Query 2D - Immutable #304](https://leetcode.com/problems/range-sum-query-2d-immutable/) | Class with constructor + queries | 2D prefix build + four-corner query |
| [Range Sum Query - Immutable #303](https://leetcode.com/problems/range-sum-query-immutable/) | 1D version | Same idea, one dimension (Day 5) |
| [Matrix Block Sum #1314](https://leetcode.com/problems/matrix-block-sum/) | Expand each cell by k neighbors | Prefix to get any block sum in O(1) |
| [Number of Submatrices That Sum to Target #1074](https://leetcode.com/problems/number-of-submatrices-that-sum-to-target/) | Count, not query | Row-pair prefix + hash map |

This is the **canonical** 2D prefix sum problem — if you recognize "rectangle sum query," you build the prefix table.

---

## 📖 Walkthrough

```
matrix (3×3):
[ 1,  2,  3 ]
[ 4,  5,  6 ]
[ 7,  8,  9 ]

Build prefix (with zero padding):
       col:  0   1   2   3
row 0:      [ 0,  0,  0,  0 ]
row 1:      [ 0,  1,  3,  6 ]
row 2:      [ 0,  5, 12, 21 ]
row 3:      [ 0, 12, 27, 45 ]

Query: sumRegion(1, 1, 2, 2)  → 5 + 6 + 8 + 9 = 28

sum = prefix[2][2] - prefix[0][2] - prefix[2][0] + prefix[0][0]
    = 21 - 0 - 5 + 0
    = 16

Wait — 0-indexed matrix with padding:
row1=1,col1=1 → prefix indices (2,2) in 1-indexed padded = (1+1, 1+1)
Using padded prefix[row2+1][col2+1] - prefix[row1][col2+1] - prefix[row2+1][col1] + prefix[row1][col1]:
  = prefix[3][3] - prefix[1][3] - prefix[3][1] + prefix[1][1]
  = 45 - 6 - 12 + 1 = 28 ✓
```

> 💡 **The insight:** Zero-padding converts boundary cases into the general formula. No special branches for `row1=0` or `col1=0`.

---

## Solution

### C++
```cpp
class NumMatrix {
    vector<vector<int>> prefix;
public:
    NumMatrix(vector<vector<int>>& matrix) {
        if (matrix.empty()) return;
        int rows = matrix.size(), cols = matrix[0].size();
        prefix.assign(rows + 1, vector<int>(cols + 1, 0));

        for (int i = 1; i <= rows; i++)
            for (int j = 1; j <= cols; j++)
                prefix[i][j] = matrix[i-1][j-1]
                             + prefix[i-1][j]
                             + prefix[i][j-1]
                             - prefix[i-1][j-1];
    }

    int sumRegion(int row1, int col1, int row2, int col2) {
        return prefix[row2+1][col2+1]
             - prefix[row1][col2+1]
             - prefix[row2+1][col1]
             + prefix[row1][col1];
    }
};
```

### Python
```python
class NumMatrix:
    def __init__(self, matrix: list[list[int]]):
        if not matrix:
            self.prefix = []
            return
        rows, cols = len(matrix), len(matrix[0])
        self.prefix = [[0] * (cols + 1) for _ in range(rows + 1)]

        for i in range(1, rows + 1):
            for j in range(1, cols + 1):
                self.prefix[i][j] = (matrix[i-1][j-1]
                                   + self.prefix[i-1][j]
                                   + self.prefix[i][j-1]
                                   - self.prefix[i-1][j-1])

    def sumRegion(self, row1: int, col1: int, row2: int, col2: int) -> int:
        return (self.prefix[row2+1][col2+1]
              - self.prefix[row1][col2+1]
              - self.prefix[row2+1][col1]
              + self.prefix[row1][col1])
```

### Java
```java
class NumMatrix {
    private int[][] prefix;

    public NumMatrix(int[][] matrix) {
        if (matrix.length == 0) return;
        int rows = matrix.length, cols = matrix[0].length;
        prefix = new int[rows + 1][cols + 1];

        for (int i = 1; i <= rows; i++)
            for (int j = 1; j <= cols; j++)
                prefix[i][j] = matrix[i-1][j-1]
                             + prefix[i-1][j]
                             + prefix[i][j-1]
                             - prefix[i-1][j-1];
    }

    public int sumRegion(int row1, int col1, int row2, int col2) {
        return prefix[row2+1][col2+1]
             - prefix[row1][col2+1]
             - prefix[row2+1][col1]
             + prefix[row1][col1];
    }
}
```

**Complexity:** O(m × n) build · O(1) per query · O(m × n) space

---

## 💭 What Should Have Clicked in Your Mind?

Before you opened your editor, these thoughts should have fired:

- **"Range sum query 2D"** → 2D prefix sum. Direct extension of Day 5.
- **"Immutable"** → Preprocess in constructor. Queries never modify data.
- **Inclusion-exclusion** → Four prefix lookups. Add back the double-subtracted corner.
- **Zero padding** → Extra row/col of zeros — same as `prefix[0]=0` in 1D.

If you looped over every cell per query, you missed "multiple queries." The signal was `sumRegion` on a fixed matrix — build once, subtract four corners.

> 🎯 **Pattern Unlocked:** 2D prefix sum = Day 5 prefix sum with inclusion-exclusion. The build is O(m×n); every query is O(1).

---

*Next: count submatrices summing to target — 2D prefix meets hash map. →*
