<!-- hand-authored -->
# ⚔ Quest: Minimum Falling Path Sum

> **Day 11** · [Minimum Falling Path Sum #931](https://leetcode.com/problems/minimum-falling-path-sum/) · Medium · 15 min · 20 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Minimum Falling Path Sum on LeetCode](https://leetcode.com/problems/minimum-falling-path-sum/)**

> ⚔ **Hunter's rule:** This is still grid DP, but each cell has **three parents** in the row above (not two like path counting). Write the min-formula for one cell before coding.

---

## The Problem

See the full problem statement on LeetCode: **[Minimum Falling Path Sum #931](https://leetcode.com/problems/minimum-falling-path-sum/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which DP pattern from today's concept applies? **Column-Choice Grid DP** — `dp[j]` = min path sum ending at column `j` in the current row.

Transition: `ndp[j] = matrix[i][j] + min(dp[j-1], dp[j], dp[j+1])` from the previous row.

If you're stuck after 5 minutes: trace row 1 of the LeetCode example. For each column, circle the cheapest of the three cells directly above.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Column-Choice Grid DP

**How to identify this from the problem statement:**
- Matrix, move to next row only
- From `(i,j)` you came from `(i-1, j-1)`, `(i-1, j)`, or `(i-1, j+1)`
- Minimize total sum — `min` over parents, not `sum`

| Keyword / phrase | What it signals |
|---|---|
| "falling path" / "next row" | Vertical progression, horizontal choice of landing column |
| "minimum sum" | `min` transition + cell value |
| "n×n matrix" | Rolling one row of length n |

**Contrast with Unique Paths II:** Path count uses **two** parents (up, left). Falling path uses **three** parents in the row above.

**How a strong solver thinks before coding:**
1. *"dp = first row as base."*
2. *"For each next row, ndp[j] = cell + min of three dp neighbors."*
3. *"Answer = min(dp) after last row — can end any column."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Try every downward path** | O(3^n) — branches per row |
| **Greedy: always pick min in next row** | Local min column may force expensive future steps |
| **Full recursion without memo** | Exponential overlap on (row, col) pairs |

**The insight brute force misses:** Only O(n²) distinct `(row, col)` states — each needs the best sum from above once.

```
3^n paths          vs    n² cells filled once
```

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Unique Paths II #63](https://leetcode.com/problems/unique-paths-ii/) | Sum parents, two directions | Grid DP rolling row |
| [Minimum Path Sum #64](https://leetcode.com/problems/minimum-path-sum/) | Right+down only, two parents | Min grid DP |
| [Cherry Pickup #741](https://leetcode.com/problems/cherry-pickup/) | Two walkers, 3D state | Column-choice variant |

---

## 📖 Walkthrough

**matrix = [[2,1,3],[6,5,4],[7,8,9]]**

```
Row 0 dp:     [2, 1, 3]
Row 1: col 0 → 6+min(2)=8; col 1 → 5+min(2,1,3)=6; col 2 → 4+min(1,3)=5
  dp = [8, 6, 5]
Row 2: dp = [15, 13, 12]
Answer: min(15, 13, 12) = 12  (path 1→5→8 or similar)
```

```
ndp[j] = matrix[i][j] + min(dp[j-1], dp[j], dp[j+1])
         (guard j-1 and j+1 bounds)
```

> 💡 **The insight:** One rolling row holds the entire previous state. The table is 1D even though the problem is 2D.

---

## Solution

### C++
```cpp
class Solution {
public:
    int minFallingPathSum(vector<vector<int>>& matrix) {
        int n = matrix.size();
        vector<int> dp = matrix[0];
        for (int i = 1; i < n; i++) {
            vector<int> ndp(n);
            for (int j = 0; j < n; j++) {
                ndp[j] = dp[j];
                if (j > 0) ndp[j] = min(ndp[j], dp[j - 1]);
                if (j < n - 1) ndp[j] = min(ndp[j], dp[j + 1]);
                ndp[j] += matrix[i][j];
            }
            dp = ndp;
        }
        return *min_element(dp.begin(), dp.end());
    }
};
```

### Python
```python
class Solution:
    def minFallingPathSum(self, matrix: List[List[int]]) -> int:
        n = len(matrix)
        dp = matrix[0][:]
        for i in range(1, n):
            ndp = [0] * n
            for j in range(n):
                best = dp[j]
                if j > 0: best = min(best, dp[j - 1])
                if j < n - 1: best = min(best, dp[j + 1])
                ndp[j] = best + matrix[i][j]
            dp = ndp
        return min(dp)
```

### Java
```java
class Solution {
    public int minFallingPathSum(int[][] matrix) {
        int n = matrix.length;
        int[] dp = matrix[0].clone();
        for (int i = 1; i < n; i++) {
            int[] ndp = new int[n];
            for (int j = 0; j < n; j++) {
                ndp[j] = dp[j];
                if (j > 0) ndp[j] = Math.min(ndp[j], dp[j - 1]);
                if (j < n - 1) ndp[j] = Math.min(ndp[j], dp[j + 1]);
                ndp[j] += matrix[i][j];
            }
            dp = ndp;
        }
        int ans = dp[0];
        for (int v : dp) ans = Math.min(ans, v);
        return ans;
    }
}
```

**Complexity:** O(n²) time · O(n) space
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Grid DP but 1D rolling row"** → Only previous row matters.
- **"Three parents, not two"** → min over j-1, j, j+1 above.
- **"Answer not dp[n-1][n-1]"** → min of entire last row — any column exit.
- **"Not Unique Paths"** → min + three-way choice, not sum + two-way.

> 🎯 **Pattern Unlocked:** Column-Choice Grid DP — min over three upstairs neighbors.

---

*Both quests complete. Head to the checkpoint. →*
