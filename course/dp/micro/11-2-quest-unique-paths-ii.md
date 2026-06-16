<!-- hand-authored -->
# ⚔ Quest: Unique Paths II

> **Day 11** · [Unique Paths II #63](https://leetcode.com/problems/unique-paths-ii/) · Medium · 15 min · 20 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Unique Paths II on LeetCode](https://leetcode.com/problems/unique-paths-ii/)**

> ⚔ **Hunter's rule:** You solved the clean version on Day 7 ([Unique Paths #62](https://leetcode.com/problems/unique-paths/)). What's the **one line** that changes when a cell is blocked? Fill a small grid on paper before peeking.

---

## The Problem

See the full problem statement on LeetCode: **[Unique Paths II #63](https://leetcode.com/problems/unique-paths-ii/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which DP pattern from today's concept applies? **Grid DP with Obstacles** — same as Day 7 #62, but `dp[i][j] = 0` when `grid[i][j] == 1`.

What is the state? `dp[j]` (rolling row) = number of paths to reach column `j` in the current row.

If you're stuck after 5 minutes: draw the 3×3 example from LeetCode. Mark obstacle cells as 0; propagate sums from top-left.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Grid DP with Obstacles

**How to identify this from the problem statement:**
- Grid traversal, only right/down
- Count paths (sum transitions, not min/max)
- Obstacle cells invalidate any path through them

| Keyword / phrase | What it signals |
|---|---|
| "obstacle" / "blocked" | Zero that cell in the DP table |
| "unique paths" / "how many ways" | Sum of parent cells |
| "top-left to bottom-right" | Fill row-by-row, rolling one row |
| "grid" | 2D DP — Day 11 pattern |

**Day 7 bridge:** #62 had no obstacles. #63 is literally #62 + `if obstacle → 0`.

**How a strong solver thinks before coding:**
1. *"Same rolling row as Day 7."*
2. *"dp[0] = 1 unless start is obstacle."*
3. *"Each row: if blocked dp[j]=0; else if j>0 dp[j]+=dp[j-1]."*
4. *"Return dp[n-1]."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Enumerate all right/down paths** | Exponential — C(m+n) paths in worst case |
| **DFS without memo** | Revisits same (i,j) millions of times |
| **Greedy "always go down then right"** | Obstacles break any fixed direction rule |

**The insight brute force misses:** Each cell's path count depends only on counts from **above and left** — O(m·n) unique subproblems, one fill pass.

```
Brute: try every path → O(2^(m+n))
Grid DP: each cell once     → O(m·n)
```

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Unique Paths #62](https://leetcode.com/problems/unique-paths/) | No obstacles | Day 7 — same rolling row |
| [Minimum Path Sum #64](https://leetcode.com/problems/minimum-path-sum/) | `min` instead of `sum` | Grid DP, right+down |
| [Minimum Falling Path Sum #931](https://leetcode.com/problems/minimum-falling-path-sum/) | Three parents above | Today's second quest |

---

## 📖 Walkthrough

**Example:** `grid = [[0,0,0],[0,1,0],[0,0,0]]`

```
After row 0:  dp = [1, 1, 1]
After row 1:  obstacle at (1,1) → dp = [1, 0, 1]
After row 2:  dp = [2, 1, 3]   → answer 3
```

Rolling row: only `dp[j]` array needed — no full `m×n` table.

> 💡 **The insight:** Day 7 taught the fill order. Day 11 teaches the obstacle guard. Together they're one pattern.

---

## Solution

### C++
```cpp
class Solution {
public:
    int uniquePathsWithObstacles(vector<vector<int>>& grid) {
        int n = grid[0].size();
        vector<int> dp(n, 0);
        dp[0] = 1;
        for (int i = 0; i < (int)grid.size(); i++)
            for (int j = 0; j < n; j++) {
                if (grid[i][j]) dp[j] = 0;
                else if (j > 0) dp[j] += dp[j - 1];
            }
        return dp[n - 1];
    }
};
```

### Python
```python
class Solution:
    def uniquePathsWithObstacles(self, grid: List[List[int]]) -> int:
        n = len(grid[0])
        dp = [0] * n
        dp[0] = 1
        for row in grid:
            for j in range(n):
                if row[j]:
                    dp[j] = 0
                elif j > 0:
                    dp[j] += dp[j - 1]
        return dp[n - 1]
```

### Java
```java
class Solution {
    public int uniquePathsWithObstacles(int[][] grid) {
        int n = grid[0].length;
        int[] dp = new int[n];
        dp[0] = 1;
        for (int[] row : grid)
            for (int j = 0; j < n; j++) {
                if (row[j] == 1) dp[j] = 0;
                else if (j > 0) dp[j] += dp[j - 1];
            }
        return dp[n - 1];
    }
}
```

**Complexity:** O(m · n) time · O(n) space
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"I did #62 on Day 7"** → Same rolling row; add obstacle check.
- **"State is dp[j]"** → Paths to column j in current row.
- **"Obstacle → 0"** → No path can stand on a blocked cell.
- **"Start blocked?"** → dp[0] becomes 0 on first row — answer 0.

> 🎯 **Pattern Unlocked:** Grid DP with Obstacles — Day 7 #62 + zero on blocked cells.

---

*One quest down. Next: min cost when you can fall diagonally. →*
