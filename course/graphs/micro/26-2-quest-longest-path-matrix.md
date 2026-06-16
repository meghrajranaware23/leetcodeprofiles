<!-- hand-authored -->
# ⚔ Quest: Longest Increasing Path in Matrix

> **Day 26** · [Longest Increasing Path in a Matrix #329](https://leetcode.com/problems/longest-increasing-path-in-a-matrix/) · Hard · 25 min · 40 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Longest Increasing Path in a Matrix on LeetCode](https://leetcode.com/problems/longest-increasing-path-in-a-matrix/)**

> ⚔ **Hunter's rule:** Only move to **strictly larger** neighbors → implicit DAG. `dfs(r,c)` with memo — no cycle fear.

---

## The Problem

See the full problem statement on LeetCode: **[Longest Increasing Path in a Matrix #329](https://leetcode.com/problems/longest-increasing-path-in-a-matrix/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

**DFS + memo on value-increasing DAG.**

- `dp[r][c]` = longest path starting at (r,c), including self.
- 4 directions; relax only if `matrix[nr][nc] > matrix[r][c]`.
- `dfs`: if `dp[r][c]` set, return; else `1 + max(dfs(neighbors))`.
- Answer = max `dfs(i,j)` over all cells.

No global visited — memo handles subproblem reuse.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** DFS + Memo on Implicit DAG

**How to identify this from the problem statement:**
- "Increasing path" → directed edges to larger values
- Matrix grid → 4-neighbor moves
- "Longest" on DAG → DFS + memo, not BFS

| Keyword / phrase | What it signals |
|---|---|
| "Strictly increasing" | DAG property |
| "Longest path" | DP/memo on DAG |
| "Matrix" | (r,c) state |
| Hard but m,n ≤ 200 | O(mn) memo fills once per cell |

**Why this pattern works:** Values strictly increase along paths → finite DAG → memo converges.

**How a strong solver thinks before coding:**
1. *"dp[m][n] initialized 0."*
2. *"dfs(r,c): if dp return; try 4 dirs with > check."*
3. *"dp[r][c]=best; return best."*
4. *"Global max over all starts."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **DFS without memo** | Exponential recomputation |
| **BFS** | Finds shortest, not longest |
| **Allow ≥ neighbor** | Cycles — infinite paths |
| **Topo sort explicit** | Unnecessary — value order guarantees DAG |

**The insight:** `>` constraint **is** the acyclicity proof.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Longest Path in DAG](https://leetcode.com/problems/maximum-height-of-a-triangle-with-the-same-base/) | Explicit DAG | Topo + DP |
| [Pacific Atlantic #417](https://leetcode.com/problems/pacific-atlantic-water-flow/) | Decreasing DFS from borders | Day 7 |
| [LIP Matrix #329](https://leetcode.com/problems/longest-increasing-path-in-a-matrix/) | Increasing memo | Day 26 |

---

## 📖 Walkthrough

```
[9, 9, 4]
[6, 6, 8]
[2, 3, 1]

From (2,0)=2: →3→6→9→... 
Longest: 2→3→6→9 (length 4) or via 8

dfs memo fills bottom-up by value layers
```

> 💡 **The insight:** Each cell computed once — O(m·n) total.

---

## Solution

### C++
```cpp
class Solution {
    int m, n, dirs[4][2] = {{1,0},{-1,0},{0,1},{0,-1}};
    int dfs(vector<vector<int>>& mat, vector<vector<int>>& dp, int r, int c) {
        if (dp[r][c]) return dp[r][c];
        int best = 1;
        for (auto& d : dirs) {
            int nr = r + d[0], nc = c + d[1];
            if (nr >= 0 && nc >= 0 && nr < m && nc < n && mat[nr][nc] > mat[r][c])
                best = max(best, 1 + dfs(mat, dp, nr, nc));
        }
        return dp[r][c] = best;
    }
public:
    int longestIncreasingPath(vector<vector<int>>& matrix) {
        m = matrix.size(); if (!m) return 0;
        n = matrix[0].size();
        vector<vector<int>> dp(m, vector<int>(n));
        int ans = 0;
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                ans = max(ans, dfs(matrix, dp, i, j));
        return ans;
    }
};
```

### Python
```python
class Solution:
    def longestIncreasingPath(self, matrix: List[List[int]]) -> int:
        m, n = len(matrix), len(matrix[0])
        dp = [[0] * n for _ in range(m)]
        def dfs(r, c):
            if dp[r][c]: return dp[r][c]
            best = 1
            for dr, dc in ((1,0),(-1,0),(0,1),(0,-1)):
                nr, nc = r + dr, c + dc
                if 0 <= nr < m and 0 <= nc < n and matrix[nr][nc] > matrix[r][c]:
                    best = max(best, 1 + dfs(nr, nc))
            dp[r][c] = best
            return best
        return max(dfs(i, j) for i in range(m) for j in range(n))
```

### Java
```java
class Solution {
    private int m, n;
    private int[][] dp;
    public int longestIncreasingPath(int[][] matrix) {
        m = matrix.length; n = matrix[0].length;
        dp = new int[m][n];
        int ans = 0;
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                ans = Math.max(ans, dfs(matrix, i, j));
        return ans;
    }
    private int dfs(int[][] matrix, int r, int c) {
        if (dp[r][c] != 0) return dp[r][c];
        int best = 1;
        int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};
        for (int[] d : dirs) {
            int nr = r + d[0], nc = c + d[1];
            if (nr >= 0 && nc >= 0 && nr < m && nc < n && matrix[nr][nc] > matrix[r][c])
                best = Math.max(best, 1 + dfs(matrix, nr, nc));
        }
        return dp[r][c] = best;
    }
}
```

**Complexity:** O(m · n) time · O(m · n) space
---

## 💭 What Should Have Clicked in Your Mind?

- **"Strictly increasing"** → DAG, memo safe.
- **"Longest path"** → DFS+memo, not BFS.
- **"Only greater neighbors"** → 4-dir with `>` test.
- **"Start anywhere"** → outer double loop max.
- **"No visited set"** → dp cache is enough.

> 🎯 **Pattern Unlocked:** DFS + Memo on Implicit DAG

---

*One quest down. Next: tree idle bottleneck BFS. →*
