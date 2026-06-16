<!-- hand-authored -->
# ⚔ C-Rank Test — Problem 1

> [Count Square Submatrices with All Ones #1277](https://leetcode.com/problems/count-square-submatrices-with-all-ones/) · Medium · 150 XP

---

You've completed your C-Rank training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Count Square Submatrices with All Ones on LeetCode](https://leetcode.com/problems/count-square-submatrices-with-all-ones/)**

> ⚔ **Hunter's rule:** This is a rank test — treat it like real interview practice. **Grid side-length DP** — each cell stores the largest square ending there. Sum all cells.

---

## The Problem

See the full problem statement on LeetCode: **[Count Square Submatrices with All Ones #1277](https://leetcode.com/problems/count-square-submatrices-with-all-ones/)**

---

## 💡 Hints

> 🎯 **What's being tested:** Day 11 grid DP — but `dp[i][j]` = **side length** of largest all-1 square with bottom-right corner at `(i,j)`.

If `matrix[i][j]==1` and `i>0,j>0`: `dp[i][j] = min(up, left, diagonal) + 1`. **Add every `dp[i][j]` to answer** — a cell with value 3 contributes 3 squares (1×1, 2×2, 3×3 anchored there).

C-Rank connection: Same grid neighbor dependency as path DP, but **min of three** instead of sum.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Grid Side-Length DP (Day 11 synthesis)

**How to identify from the statement:**
- Binary matrix, count **square** submatrices of all 1s
- Bottom-right corner determines square size
- Depends on top, left, and top-left neighbors

**How a strong solver thinks before coding:**
1. *"Reuse matrix or dp[i][j] as side length."*
2. *"If cell is 1: min of three neighbors + 1."*
3. *"ans += dp[i][j] each cell — each size counts."*
4. *"O(mn) single pass."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Check every square submatrix** | O(m²n²) or worse |
| **Only count 1×1 cells** | Misses larger squares |
| **Sum paths instead of min neighbors** | Wrong recurrence — need min for square fit |

**The insight:** Side length at `(i,j)` = 1 + min(top, left, diagonal) when all are 1. Each value `k` at a cell counts `k` distinct squares.

---

## 🎯 Transfer to Unseen Problems

*"Count squares of 1s in binary grid"* → side-length DP, sum cells. Cousin of **Maximal Square #221** (track max only, not count all).

---

<details>
<summary><strong>📖 Solution & Walkthrough</strong></summary>

Fill the DP table for the given example. Trace which cells each cell depends on. Then implement the transition.

### C++
```cpp
class Solution {
public:
    int countSquares(vector<vector<int>>& matrix) {
        int m = matrix.size(), n = matrix[0].size(), ans = 0;
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (matrix[i][j] && i > 0 && j > 0) {
                    matrix[i][j] = min({matrix[i-1][j], matrix[i][j-1], matrix[i-1][j-1]}) + 1;
                }
                ans += matrix[i][j];
            }
        }
        return ans;
    }
};
```

### Python
```python
class Solution:
    def countSquares(self, matrix: list[list[int]]) -> int:
        m, n = len(matrix), len(matrix[0])
        ans = 0
        for i in range(m):
            for j in range(n):
                if matrix[i][j] and i > 0 and j > 0:
                    matrix[i][j] = min(matrix[i-1][j], matrix[i][j-1], matrix[i-1][j-1]) + 1
                ans += matrix[i][j]
        return ans
```

### Java
```java
class Solution {
    public int countSquares(int[][] matrix) {
        int m = matrix.length, n = matrix[0].length, ans = 0;
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (matrix[i][j] > 0 && i > 0 && j > 0) {
                    matrix[i][j] = Math.min(Math.min(matrix[i-1][j], matrix[i][j-1]), matrix[i-1][j-1]) + 1;
                }
                ans += matrix[i][j];
            }
        }
        return ans;
    }
}
```

**Complexity:** O(m · n) time · O(1) space

</details>

---

## 💭 What Should Have Clicked in Your Mind?

- **"Grid DP Day 11"** — Neighbor dependency, fill row by row.
- **"min of three + 1"** — Square needs all three corners of smaller square.
- **"Sum dp values"** — Each side length k contributes k squares at that corner.
- **"Not path count"** — min not sum for square geometry.

---

*1 of 3 test problems. Continue to the next. →*

## Solution

### C++
```cpp
class Solution {
public:
    int countSquares(vector<vector<int>>& matrix) {
        int m = matrix.size(), n = matrix[0].size(), ans = 0;
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (matrix[i][j] && i > 0 && j > 0) {
                    matrix[i][j] = min({matrix[i-1][j], matrix[i][j-1], matrix[i-1][j-1]}) + 1;
                }
                ans += matrix[i][j];
            }
        }
        return ans;
    }
};
```

### Python
```python
class Solution:
    def countSquares(self, matrix: list[list[int]]) -> int:
        m, n = len(matrix), len(matrix[0])
        ans = 0
        for i in range(m):
            for j in range(n):
                if matrix[i][j] and i > 0 and j > 0:
                    matrix[i][j] = min(matrix[i-1][j], matrix[i][j-1], matrix[i-1][j-1]) + 1
                ans += matrix[i][j]
        return ans
```

### Java
```java
class Solution {
    public int countSquares(int[][] matrix) {
        int m = matrix.length, n = matrix[0].length, ans = 0;
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (matrix[i][j] > 0 && i > 0 && j > 0) {
                    matrix[i][j] = Math.min(Math.min(matrix[i-1][j], matrix[i][j-1]), matrix[i-1][j-1]) + 1;
                }
                ans += matrix[i][j];
            }
        }
        return ans;
    }
}
```

**Complexity:** O(m · n) time · O(1) space
