<!-- hand-authored -->
# ⚔ Quest: Minimum Path Sum

> **Day 8** · [Minimum Path Sum #64](https://leetcode.com/problems/minimum-path-sum/) · Medium · 15 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Minimum Path Sum on LeetCode](https://leetcode.com/problems/minimum-path-sum/)**

> ⚔ **Hunter's rule:** Fill the dp grid for a 3×3 example. Same shape as Unique Paths — but **`min` + cell cost**, not count.

---

## The Problem

See the full problem statement on LeetCode: **[Minimum Path Sum #64](https://leetcode.com/problems/minimum-path-sum/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

**Pattern:** Day 8 **Grid Min-Cost DP** — `dp[i][j] = grid[i][j] + min(dp[i-1][j], dp[i][j-1])`.

- Moves: right and down only (same as Unique Paths)
- **First row:** cumulative sum left → right
- **First column:** cumulative sum top → bottom
- Contrast Day 7: **`min`**, not `+` of path counts

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Grid Min-Cost DP

**How to identify this from the problem statement:**
- Grid path with **minimum total**
- Non-negative costs in cells
- Fixed move directions → only two predecessors

| Keyword / phrase | What it signals |
|---|---|
| "minimum path sum" | min-cost grid DP |
| "only right or down" | top + left neighbors |
| "unique paths" (count) | **Day 7** — wrong operator |

**Why this pattern works:** Optimal substructure — cheapest path to `(i,j)` extends cheapest path from above or left.

**How a strong solver thinks before coding:**
1. *"dp[i][j] = min cost to (i,j)."*
2. *"Seed row 0 and col 0."*
3. *"Interior: cell + min(top, left)."*
4. *"1D row rolling for O(n) space."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **DFS all paths** | Exponential paths — recomputes subpaths |
| **Day 7 sum of counts** | Counts paths, ignores cost |
| **Greedy: always pick smaller neighbor** | Local choice fails on larger grids |
| **Forgetting edge initialization** | First row/col need cumulative min |

**The insight brute force misses:** Each cell's min depends only on two neighbors — one table pass suffices.

```
grid 1,3,1 / 1,5,1 / 4,2,1  →  min path sum = 7
Same grid as Unique Paths example family — different question
```

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Unique Paths #62](https://leetcode.com/problems/unique-paths/) | Count, no costs | Day 7 `+` |
| [Triangle #120](https://leetcode.com/problems/triangle/) | Bottom-up triangle | Day 8 min, different fill order |
| [Dungeon Game #174](https://leetcode.com/problems/dungeon-game/) | Max health needed | Reverse min/max variant |

---

## 📖 Walkthrough

**Example:**

```
grid:          dp:

1  3  1        1  4  5
1  5  1   →    2  7  6
4  2  1        6  8  7

Path: 1→3→1→1→1 with sum 7 (trace dp[2][2])
(2,2): 1 + min(6,6) = 7
```

> 💡 **The insight:** Unique Paths counts routes; this picks the **cheapest** route — same grid skeleton, `min` instead of `+`.

---

## Solution

### C++
```cpp
class Solution {
public:
    int minPathSum(vector<vector<int>>& grid) {
        int m = grid.size(), n = grid[0].size();
        vector<int> dp(n);
        dp[0] = grid[0][0];
        for (int j = 1; j < n; j++) dp[j] = dp[j - 1] + grid[0][j];
        for (int i = 1; i < m; i++) {
            dp[0] += grid[i][0];
            for (int j = 1; j < n; j++)
                dp[j] = grid[i][j] + min(dp[j], dp[j - 1]);
        }
        return dp[n - 1];
    }
};
```

### Python
```python
class Solution:
    def minPathSum(self, grid: List[List[int]]) -> int:
        m, n = len(grid), len(grid[0])
        dp = [0] * n
        dp[0] = grid[0][0]
        for j in range(1, n):
            dp[j] = dp[j - 1] + grid[0][j]
        for i in range(1, m):
            dp[0] += grid[i][0]
            for j in range(1, n):
                dp[j] = grid[i][j] + min(dp[j], dp[j - 1])
        return dp[n - 1]
```

### Java
```java
class Solution {
    public int minPathSum(int[][] grid) {
        int m = grid.length, n = grid[0].length;
        int[] dp = new int[n];
        dp[0] = grid[0][0];
        for (int j = 1; j < n; j++) dp[j] = dp[j - 1] + grid[0][j];
        for (int i = 1; i < m; i++) {
            dp[0] += grid[i][0];
            for (int j = 1; j < n; j++)
                dp[j] = grid[i][j] + Math.min(dp[j], dp[j - 1]);
        }
        return dp[n - 1];
    }
}
```

**Complexity:** O(m · n) time · O(n) space
---

## 💭 What Should Have Clicked in Your Mind?

- **"Min path on grid R/D"** → min(top, left) + cell.
- **"Same shape as Unique Paths"** → Day 7 count vs Day 8 min.
- **"Edge rows first"** → cumulative base cases.
- **"Rolling 1D row"** → space optimization.

> 🎯 **Pattern Unlocked:** Grid Min-Cost DP

---

*One quest down. Next: min-cost, but fill upward. →*
