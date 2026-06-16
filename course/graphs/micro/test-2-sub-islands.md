<!-- hand-authored -->
# ⚔ E-Rank Test — Problem 2

> [Count Sub Islands #1905](https://leetcode.com/problems/count-sub-islands/) · Medium · 100 XP

---

You've completed your E-Rank training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Count Sub Islands on LeetCode](https://leetcode.com/problems/count-sub-islands/)**

> ⚔ **Hunter's rule:** This is a rank test — treat it like real interview practice. Overlay both grids. Trace one island in grid2 and check it matches grid1 cell-for-cell. No peeking until you've genuinely tried.

---

## The Problem

Given two binary grids `grid1` and `grid2` of the same size:

A **sub-island** is an island in `grid2` such that every land cell in that island is also land in `grid1` at the same coordinates (shape and position must match inside grid1's land).

Return the number of sub-islands in `grid2`.

```
Input:  grid1 = [[1,1,1,0,0],[0,1,1,1,1],[0,0,0,0,0],[1,1,1,0,0],[0,1,1,0,0]]
        grid2 = [[1,1,1,0,0],[0,0,1,1,1],[0,1,0,0,0],[1,1,1,0,0],[0,1,1,0,0]]
Output: 3
```

---

## 💡 Hints

> 🎯 **What's being tested:** Day 4/5 grid flood + Day 5 area logic — **synchronized DFS** on both grids.

**Hint 1:** Use the #200 restart loop on `grid2` — when you find a `1` in grid2, start a flood.

**Hint 2:** During dfs at `(r,c)`: if `grid1[r][c] != grid2[r][c]`, this island is **not** a sub-island → return false.

**Hint 3:** Sink both grids at `(r,c)` (set to 0) as you visit — same as marking visited on both.

**Hint 4:** dfs returns **bool** `ok`: start true, `ok &= dfs(neighbor)` for each 4-dir land neighbor in grid2.

**Hint 5:** Increment count only when dfs from a new grid2 island returns true (entire island matched grid1).

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Dual-grid matching flood (Day 4 restart + Day 5 validity)

| Clue in the problem | What it signals |
|---|---|
| Two grids same size | Compare cell-by-cell during flood |
| "Sub-island" in grid2 | Island must fit inside grid1 land |
| Count islands in grid2 | Outer loop on grid2 like #200 |
| 4-direction connectivity | Standard DIRS |
| Match shape **and** position | Same coordinates must both be land |

**Contrast with Day 4/5 quests:**

| Number of Islands #200 | Sub Islands #1905 |
|---|---|
| One grid | Two grids, must agree |
| Any land island counts | Only if grid1 also land everywhere |
| void dfs | bool dfs — any mismatch fails island |

**How a strong solver thinks before coding:**
1. *"Scan grid2 for 1s — restart loop."*
2. *"Flood both; mismatch → return false."*
3. *"Sink both grids to avoid revisiting."*
4. *"Count++ only when dfs returns true."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Count grid2 islands, check grid1 separately** | Position alignment requires simultaneous walk |
| **Only compare total area** | Shapes can differ with same cell count |
| **Flood grid1 only** | Sub-island defined by grid2 components |
| **8-direction flood** | Wrong connectivity |
| **Don't sink visited cells** | Same island counted multiple times |

**The insight brute force misses:** Validity is **per cell during one coordinated flood** — not a post-hoc check.

---

## 🎯 Transfer to Unseen Problems

**Scenario:** *"Count islands in B that are identical in value and position to islands in A."*

Same dual dfs with equality check.

**Scenario:** *"Is every land cell in B covered by land in A?"*

Single pass — sub-island count asks for **whole island** validity, not global subset.

**30-second check:** *"Restart on grid2 + bool dfs on both grids."*

---

<details>
<summary><strong>📖 Solution & Walkthrough</strong></summary>

Trace the pattern on the example graph from the problem statement. Then implement the traversal skeleton you identified.

### C++
```cpp
class Solution {
    int m, n, dirs[4][2] = {{1,0},{-1,0},{0,1},{0,-1}};
    bool dfs(vector<vector<int>>& g1, vector<vector<int>>& g2, int r, int c) {
        if (g1[r][c] != g2[r][c]) return false;
        g1[r][c] = g2[r][c] = 0;
        bool ok = true;
        for (auto& d : dirs) {
            int nr = r + d[0], nc = c + d[1];
            if (nr >= 0 && nc >= 0 && nr < m && nc < n && g1[nr][nc] && g2[nr][nc])
                ok &= dfs(g1, g2, nr, nc);
        }
        return ok;
    }
public:
    int countSubIslands(vector<vector<int>>& grid1, vector<vector<int>>& grid2) {
        m = grid1.size(); n = grid1[0].size();
        int count = 0;
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                if (grid1[i][j] && grid2[i][j] && dfs(grid1, grid2, i, j)) count++;
        return count;
    }
};
```

### Python
```python
class Solution:
    def countSubIslands(self, grid1: List[List[int]], grid2: List[List[int]]) -> int:
        m, n = len(grid1), len(grid1[0])
        def dfs(r, c):
            if grid1[r][c] != grid2[r][c]: return False
            grid1[r][c] = grid2[r][c] = 0
            ok = True
            for dr, dc in ((1,0),(-1,0),(0,1),(0,-1)):
                nr, nc = r + dr, c + dc
                if 0 <= nr < m and 0 <= nc < n and grid1[nr][nc] and grid2[nr][nc]:
                    ok &= dfs(nr, nc)
            return ok
        return sum(1 for i in range(m) for j in range(n)
                   if grid1[i][j] and grid2[i][j] and dfs(i, j))
```

### Java
```java
class Solution {
    private int m, n;
    public int countSubIslands(int[][] grid1, int[][] grid2) {
        m = grid1.length; n = grid1[0].length;
        int count = 0;
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                if (grid1[i][j] == 1 && grid2[i][j] == 1 && dfs(grid1, grid2, i, j)) count++;
        return count;
    }
    private boolean dfs(int[][] g1, int[][] g2, int r, int c) {
        if (g1[r][c] != g2[r][c]) return false;
        g1[r][c] = 0; g2[r][c] = 0;
        boolean ok = true;
        int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};
        for (int[] d : dirs) {
            int nr = r + d[0], nc = c + d[1];
            if (nr >= 0 && nc >= 0 && nr < m && nc < n && g1[nr][nc] == 1 && g2[nr][nc] == 1)
                ok &= dfs(g1, g2, nr, nc);
        }
        return ok;
    }
}
```

**Complexity:** O(m · n) time · O(m · n) space

</details>

---

## 💭 What Should Have Clicked in Your Mind?

- **"Sub-island"** → grid2 island fully contained in grid1 land at same cells.
- **#200 restart on grid2** — but validate during flood.
- **bool dfs** — one bad cell kills the whole island.
- **Sink both grids** — dual visited mark.

Max Area taught returning values; this returns **validity** instead of size.

---

*2 of 3 test problems. Continue to the next. →*

## Solution

### C++
```cpp
class Solution {
    int m, n, dirs[4][2] = {{1,0},{-1,0},{0,1},{0,-1}};
    bool dfs(vector<vector<int>>& g1, vector<vector<int>>& g2, int r, int c) {
        if (g1[r][c] != g2[r][c]) return false;
        g1[r][c] = g2[r][c] = 0;
        bool ok = true;
        for (auto& d : dirs) {
            int nr = r + d[0], nc = c + d[1];
            if (nr >= 0 && nc >= 0 && nr < m && nc < n && g1[nr][nc] && g2[nr][nc])
                ok &= dfs(g1, g2, nr, nc);
        }
        return ok;
    }
public:
    int countSubIslands(vector<vector<int>>& grid1, vector<vector<int>>& grid2) {
        m = grid1.size(); n = grid1[0].size();
        int count = 0;
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                if (grid1[i][j] && grid2[i][j] && dfs(grid1, grid2, i, j)) count++;
        return count;
    }
};
```

### Python
```python
class Solution:
    def countSubIslands(self, grid1: List[List[int]], grid2: List[List[int]]) -> int:
        m, n = len(grid1), len(grid1[0])
        def dfs(r, c):
            if grid1[r][c] != grid2[r][c]: return False
            grid1[r][c] = grid2[r][c] = 0
            ok = True
            for dr, dc in ((1,0),(-1,0),(0,1),(0,-1)):
                nr, nc = r + dr, c + dc
                if 0 <= nr < m and 0 <= nc < n and grid1[nr][nc] and grid2[nr][nc]:
                    ok &= dfs(nr, nc)
            return ok
        return sum(1 for i in range(m) for j in range(n)
                   if grid1[i][j] and grid2[i][j] and dfs(i, j))
```

### Java
```java
class Solution {
    private int m, n;
    public int countSubIslands(int[][] grid1, int[][] grid2) {
        m = grid1.length; n = grid1[0].length;
        int count = 0;
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                if (grid1[i][j] == 1 && grid2[i][j] == 1 && dfs(grid1, grid2, i, j)) count++;
        return count;
    }
    private boolean dfs(int[][] g1, int[][] g2, int r, int c) {
        if (g1[r][c] != g2[r][c]) return false;
        g1[r][c] = 0; g2[r][c] = 0;
        boolean ok = true;
        int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};
        for (int[] d : dirs) {
            int nr = r + d[0], nc = c + d[1];
            if (nr >= 0 && nc >= 0 && nr < m && nc < n && g1[nr][nc] == 1 && g2[nr][nc] == 1)
                ok &= dfs(g1, g2, nr, nc);
        }
        return ok;
    }
}
```

**Complexity:** O(m · n) time · O(m · n) space
