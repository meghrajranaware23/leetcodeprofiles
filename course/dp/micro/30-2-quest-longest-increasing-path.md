<!-- hand-authored -->
# ⚔ Quest: Longest Increasing Path in a Matrix

> **Day 30** · [Longest Increasing Path in a Matrix #329](https://leetcode.com/problems/longest-increasing-path-in-a-matrix/) · Hard · 25 min · 60 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Longest Increasing Path in a Matrix on LeetCode](https://leetcode.com/problems/longest-increasing-path-in-a-matrix/)**

> ⚔ **Hunter's rule:** Only move to **strictly larger** cells → DAG, no cycles. `memo[i][j]` = 1 + best path from `(i,j)`. Run DFS from **every** cell; take global max.

---

## The Problem

See the full problem statement on LeetCode: **[Longest Increasing Path in a Matrix #329](https://leetcode.com/problems/longest-increasing-path-in-a-matrix/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

**Pattern:** **Grid DFS + Memoization** (Day 30 capstone #1).

- State: `memo[i][j]` = length of longest increasing path **starting** at `(i,j)`
- Recurse to 4 neighbors where `mat[ni][nj] > mat[i][j]`
- Base: no valid neighbor → length 1
- Answer: `max(memo[i][j])` over all cells

Top-down memo — not bottom-up tabulation. Strict increase guarantees DAG.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Grid DFS + Memoization

| Keyword / phrase | What it signals |
|---|---|
| "longest path in matrix" | DFS from each cell |
| "strictly increasing" | DAG — memo safe, no visited-in-path set |
| "4-directionally" | Standard grid neighbors |

**Day 28 contrast:** Maximal Square tabulates bottom-up; here values define implicit DAG → DFS memo.

**How a strong solver thinks before coding:**
1. *"Increasing only → no cycles."*
2. *"memo[i][j] before recursing — each cell once."*
3. *"Start from every cell — path need not include (0,0)."*
4. *"Return 1 + max(neighbor paths)."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **DFS without memo** | Exponential — same cell revisited in different paths |
| **BFS by length** | Harder — DFS memo is natural for longest path on DAG |
| **Allow equal or decreasing moves** | Infinite loops — need strict `>` |
| **Only start from corners** | Optimal path may start mid-matrix |

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Pacific Atlantic #417](https://leetcode.com/problems/pacific-atlantic-water-flow/) | Multi-source DFS | Grid DFS |
| [Course Schedule #207](https://leetcode.com/problems/course-schedule/) | Graph topo | DAG longest path cousin |

---

## 📖 Walkthrough

**matrix = [[9,9,4],[6,6,8],[2,1,1]]**

```
From (2,0)=2: can go to (2,1)=1? NO (must increase)
From (1,0)=6: → (0,0)=9 → length 3
From (0,2)=4: → (1,2)=8 → (0,1)=9 → length 4

memo fills on demand; each cell computed once.
Answer = 4
```

> 💡 **The insight:** Matrix values impose a partial order — DFS + memo is longest path on a DAG.

---

## Solution

### C++
```cpp
class Solution {
    int m, n;
    int dirs[4][2] = {{-1,0},{1,0},{0,-1},{0,1}};
    int dfs(vector<vector<int>>& mat, vector<vector<int>>& memo, int i, int j) {
        if (memo[i][j]) return memo[i][j];
        int best = 1;
        for (auto& d : dirs) {
            int ni = i + d[0], nj = j + d[1];
            if (ni >= 0 && ni < m && nj >= 0 && nj < n && mat[ni][nj] > mat[i][j])
                best = max(best, 1 + dfs(mat, memo, ni, nj));
        }
        return memo[i][j] = best;
    }
public:
    int longestIncreasingPath(vector<vector<int>>& matrix) {
        m = matrix.size(); n = matrix[0].size();
        vector<vector<int>> memo(m, vector<int>(n, 0));
        int ans = 0;
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                ans = max(ans, dfs(matrix, memo, i, j));
        return ans;
    }
};
```

### Python
```python
class Solution:
    def longestIncreasingPath(self, matrix: List[List[int]]) -> int:
        m, n = len(matrix), len(matrix[0])
        memo = {}
        def dfs(i, j):
            if (i, j) in memo: return memo[(i, j)]
            best = 1
            for di, dj in ((-1,0),(1,0),(0,-1),(0,1)):
                ni, nj = i + di, j + dj
                if 0 <= ni < m and 0 <= nj < n and matrix[ni][nj] > matrix[i][j]:
                    best = max(best, 1 + dfs(ni, nj))
            memo[(i, j)] = best
            return best
        return max(dfs(i, j) for i in range(m) for j in range(n))
```

### Java
```java
class Solution {
    int[][] dirs = {{-1,0},{1,0},{0,-1},{0,1}};
    public int longestIncreasingPath(int[][] matrix) {
        int m = matrix.length, n = matrix[0].length;
        int[][] memo = new int[m][n];
        int ans = 0;
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                ans = Math.max(ans, dfs(matrix, memo, i, j));
        return ans;
    }
    private int dfs(int[][] mat, int[][] memo, int i, int j) {
        if (memo[i][j] != 0) return memo[i][j];
        int best = 1;
        for (int[] d : dirs) {
            int ni = i + d[0], nj = j + d[1];
            if (ni >= 0 && ni < mat.length && nj >= 0 && nj < mat[0].length && mat[ni][nj] > mat[i][j])
                best = Math.max(best, 1 + dfs(mat, memo, ni, nj));
        }
        return memo[i][j] = best;
    }
}
```

**Complexity:** O(m · n) time · O(m · n) space
---

## 💭 What Should Have Clicked in Your Mind?

- **"Strictly increasing → DAG"** — memo without cycle fear.
- **"Start anywhere"** — outer double loop for global max.
- **"1 + max neighbors"** — path length from this cell.
- **"Grid DFS + Memoization"** — Day 30 capstone pattern #1.

> 🎯 **Pattern Unlocked:** Grid DFS + Memoization

---

*One quest down. Next: Burst Balloons interval DP. →*
