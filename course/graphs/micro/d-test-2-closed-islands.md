<!-- hand-authored -->
# ⚔ D-Rank Test — Problem 2

> [Number of Closed Islands #1254](https://leetcode.com/problems/number-of-closed-islands/) · Medium · 100 XP

---

You've completed your D-Rank training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Number of Closed Islands on LeetCode](https://leetcode.com/problems/number-of-closed-islands/)**

> ⚔ **Hunter's rule:** This is a rank test — treat it like real interview practice. **Day 7 border flood** first, then count inner islands. Not BFS from water. No peeking until you've genuinely tried.

---

## The Problem

See the full problem statement on LeetCode: **[Number of Closed Islands #1254](https://leetcode.com/problems/number-of-closed-islands/)**

---

## 💡 Hints

> 🎯 **What's being tested:** **Day 7 outside-in** — border flood + component logic.

- **Phase 1:** DFS from every **border land cell** (`1` on edge) — mark all outside-connected land as `0`.
- **Phase 2:** Scan interior; each unvisited `1` starts a **closed island** — DFS it; if component never touches border (already erased), count it.
- Solution uses DFS that returns `closed` boolean — `false` if component touches border during inner scan (shouldn't happen after phase 1) or neighbor out of bounds.
- **NOT** generic BFS from `0` cells. **NOT** Day 4 island count without border erase.

**Pattern name before coding:** *Day 7 border flood, then count enclosed land components.*

---

## 🔍 Pattern Recognition Breakdown

**How to identify from the statement:**
- "Closed island" = land fully surrounded by water — can't reach border
- "0 is water, 1 is land" → same encoding as Enclaves
- Count **islands**, not individual cells (unlike Enclaves #1020)
- Requires border preprocessing — Enclaves cousin + Day 4 component count

**How a strong solver thinks before coding:**
1. *"Border DFS on land — erase outside-connected 1s."*
2. *"Scan grid; on each remaining 1, DFS component."*
3. *"If DFS never hits grid edge, count++."*
4. *"Reference Day 7 Enclaves border loop — different aggregation."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Day 4 island count without border flood** | Counts border-touching islands as closed — wrong |
| **BFS from all water (0) inward** | Wrong seed — flood from **border land** |
| **Check each island touches border after counting** | Works but border-first erase is cleaner |
| **Enclaves cell count instead of island count** | Different question — #1020 sums cells |

---

## 🎯 Transfer to Unseen Problems

Combines **Day 7** (Pacific/Enclaves border flood) with **Day 4** (component counting). If you mastered Enclaves, the border loop is identical — only the final count differs.

Reference: **Day 7** Enclaves quest + checkpoint Closed Islands mini-challenge.

---

<details>
<summary><strong>📖 Solution & Walkthrough</strong></summary>

Trace the pattern on the example graph from the problem statement. Then implement the traversal skeleton you identified.

### C++
```cpp
class Solution {
    int m, n, dirs[4][2] = {{1,0},{-1,0},{0,1},{0,-1}};
    bool dfs(vector<vector<int>>& g, int r, int c) {
        g[r][c] = 0;
        bool closed = true;
        for (auto& d : dirs) {
            int nr = r + d[0], nc = c + d[1];
            if (nr < 0 || nc < 0 || nr >= m || nc >= n) closed = false;
            else if (g[nr][nc]) closed &= dfs(g, nr, nc);
        }
        return closed;
    }
public:
    int closedIsland(vector<vector<int>>& grid) {
        m = grid.size(); n = grid[0].size();
        for (int i = 0; i < m; i++) { if (grid[i][0]) dfs(grid, i, 0); if (grid[i][n-1]) dfs(grid, i, n-1); }
        for (int j = 0; j < n; j++) { if (grid[0][j]) dfs(grid, 0, j); if (grid[m-1][j]) dfs(grid, m-1, j); }
        int count = 0;
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                if (grid[i][j] && dfs(grid, i, j)) count++;
        return count;
    }
};
```

### Python
```python
class Solution:
    def closedIsland(self, grid: List[List[int]]) -> int:
        m, n = len(grid), len(grid[0])
        def dfs(r, c):
            grid[r][c] = 0
            closed = True
            for dr, dc in ((1,0),(-1,0),(0,1),(0,-1)):
                nr, nc = r + dr, c + dc
                if nr < 0 or nc < 0 or nr >= m or nc >= n:
                    closed = False
                elif grid[nr][nc]:
                    closed &= dfs(nr, nc)
            return closed
        for i in range(m):
            if grid[i][0]: dfs(i, 0)
            if grid[i][n - 1]: dfs(i, n - 1)
        for j in range(n):
            if grid[0][j]: dfs(0, j)
            if grid[m - 1][j]: dfs(m - 1, j)
        return sum(1 for i in range(m) for j in range(n) if grid[i][j] and dfs(i, j))
```

### Java
```java
class Solution {
    private int m, n;
    public int closedIsland(int[][] grid) {
        m = grid.length; n = grid[0].length;
        for (int i = 0; i < m; i++) { if (grid[i][0] == 1) dfs(grid, i, 0); if (grid[i][n - 1] == 1) dfs(grid, i, n - 1); }
        for (int j = 0; j < n; j++) { if (grid[0][j] == 1) dfs(grid, 0, j); if (grid[m - 1][j] == 1) dfs(grid, m - 1, j); }
        int count = 0;
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                if (grid[i][j] == 1 && dfsClosed(grid, i, j)) count++;
        return count;
    }
    private void dfs(int[][] grid, int r, int c) {
        if (r < 0 || c < 0 || r >= m || c >= n || grid[r][c] == 0) return;
        grid[r][c] = 0;
        dfs(grid, r + 1, c); dfs(grid, r - 1, c);
        dfs(grid, r, c + 1); dfs(grid, r, c - 1);
    }
    private boolean dfsClosed(int[][] grid, int r, int c) {
        grid[r][c] = 0;
        boolean closed = true;
        int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};
        for (int[] d : dirs) {
            int nr = r + d[0], nc = c + d[1];
            if (nr < 0 || nc < 0 || nr >= m || nc >= n) closed = false;
            else if (grid[nr][nc] == 1) closed &= dfsClosed(grid, nr, nc);
        }
        return closed;
    }
}
```

**Complexity:** O(m · n) time · O(m · n) space

</details>

---

## 💭 What Should Have Clicked in Your Mind?

- **"Closed island"** → Day 7 border erase, then count inner components.
- **"Border land flood first"** → Same loop as Enclaves #1020.
- **"NOT BFS from 0"** → Outside-in from frame, not from water.
- **"NOT raw Day 4 count"** → Border preprocessing is mandatory.

---

*2 of 3 test problems. Continue to the next. →*

## Solution

### C++
```cpp
class Solution {
    int m, n, dirs[4][2] = {{1,0},{-1,0},{0,1},{0,-1}};
    bool dfs(vector<vector<int>>& g, int r, int c) {
        g[r][c] = 0;
        bool closed = true;
        for (auto& d : dirs) {
            int nr = r + d[0], nc = c + d[1];
            if (nr < 0 || nc < 0 || nr >= m || nc >= n) closed = false;
            else if (g[nr][nc]) closed &= dfs(g, nr, nc);
        }
        return closed;
    }
public:
    int closedIsland(vector<vector<int>>& grid) {
        m = grid.size(); n = grid[0].size();
        for (int i = 0; i < m; i++) { if (grid[i][0]) dfs(grid, i, 0); if (grid[i][n-1]) dfs(grid, i, n-1); }
        for (int j = 0; j < n; j++) { if (grid[0][j]) dfs(grid, 0, j); if (grid[m-1][j]) dfs(grid, m-1, j); }
        int count = 0;
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                if (grid[i][j] && dfs(grid, i, j)) count++;
        return count;
    }
};
```

### Python
```python
class Solution:
    def closedIsland(self, grid: List[List[int]]) -> int:
        m, n = len(grid), len(grid[0])
        def dfs(r, c):
            grid[r][c] = 0
            closed = True
            for dr, dc in ((1,0),(-1,0),(0,1),(0,-1)):
                nr, nc = r + dr, c + dc
                if nr < 0 or nc < 0 or nr >= m or nc >= n:
                    closed = False
                elif grid[nr][nc]:
                    closed &= dfs(nr, nc)
            return closed
        for i in range(m):
            if grid[i][0]: dfs(i, 0)
            if grid[i][n - 1]: dfs(i, n - 1)
        for j in range(n):
            if grid[0][j]: dfs(0, j)
            if grid[m - 1][j]: dfs(m - 1, j)
        return sum(1 for i in range(m) for j in range(n) if grid[i][j] and dfs(i, j))
```

### Java
```java
class Solution {
    private int m, n;
    public int closedIsland(int[][] grid) {
        m = grid.length; n = grid[0].length;
        for (int i = 0; i < m; i++) { if (grid[i][0] == 1) dfs(grid, i, 0); if (grid[i][n - 1] == 1) dfs(grid, i, n - 1); }
        for (int j = 0; j < n; j++) { if (grid[0][j] == 1) dfs(grid, 0, j); if (grid[m - 1][j] == 1) dfs(grid, m - 1, j); }
        int count = 0;
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                if (grid[i][j] == 1 && dfsClosed(grid, i, j)) count++;
        return count;
    }
    private void dfs(int[][] grid, int r, int c) {
        if (r < 0 || c < 0 || r >= m || c >= n || grid[r][c] == 0) return;
        grid[r][c] = 0;
        dfs(grid, r + 1, c); dfs(grid, r - 1, c); dfs(grid, r, c + 1); dfs(grid, r, c - 1);
    }
    private boolean dfsClosed(int[][] grid, int r, int c) {
        grid[r][c] = 0;
        boolean closed = true;
        int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};
        for (int[] d : dirs) {
            int nr = r + d[0], nc = c + d[1];
            if (nr < 0 || nc < 0 || nr >= m || nc >= n) closed = false;
            else if (grid[nr][nc] == 1) closed &= dfsClosed(grid, nr, nc);
        }
        return closed;
    }
}
```

**Complexity:** O(m · n) time · O(m · n) space
