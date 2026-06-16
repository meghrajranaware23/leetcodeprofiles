<!-- hand-authored -->
# ⚔ A-Rank Test — Problem 3

> [Check if There is a Valid Path in a Grid #1391](https://leetcode.com/problems/check-if-there-is-a-valid-path-in-a-grid/) · Medium · 250 XP

---

You've completed your A-Rank training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Check if There is a Valid Path in a Grid on LeetCode](https://leetcode.com/problems/check-if-there-is-a-valid-path-in-a-grid/)**

> ⚔ **Hunter's rule:** This is a rank test — treat it like real interview practice. Each cell type defines which directions it connects. Track **entry direction** in DFS — pipes must align at shared border.

---

## The Problem

See the full problem statement on LeetCode: **[Check if There is a Valid Path in a Grid #1391](https://leetcode.com/problems/check-if-there-is-a-valid-path-in-a-grid/)**

---

## 💡 Hints

> 🎯 **What's being tested:** **Direction-constrained grid DFS** — not plain 4-directional flood fill.

- Cell types 1–6 define allowed exits (horizontal, vertical, turn shapes).
- DFS `(r, c, prevDir)` — `prevDir` = direction you **entered from** (1=down, 2=left, 3=up, 4=right).
- From current cell, try moves where cell type permits exit **and** neighbor accepts entry from opposite side.
- Goal: reach `(m-1, n-1)`. Mark visited by temporarily zeroing cell.

**Pattern name before coding:** *Grid DFS with pipe connectivity + entry direction.*

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Direction-Constrained Grid DFS

**How to identify from the statement:**
- Grid path with cell-type-specific connectivity
- Must enter/exit through compatible pipe openings
- Reachability yes/no — DFS suffices (not shortest path)

**How a strong solver thinks before coding:**
1. *"Encode for each type which prevDir allows which moves."*
2. *"dfs(r,c,prev): if bottom-right return true."*
3. *"Try down if type allows exit down and prev!=from-above blocked."*
4. *"Mark visited; restore on backtrack."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Plain 4-dir BFS ignoring pipe shapes** | Invalid paths through mismatched openings |
| **Only check cell types match** | Entry direction matters at each step |
| **Forget restore cell on backtrack** | Breaks other paths if mutating grid |
| **BFS when any path suffices** | DFS is fine for boolean reachability |

---

## 🎯 Transfer to Unseen Problems

*"Grid traversal where move legality depends on cell type and approach direction."*

Related to [Valid Path in a Grid](https://leetcode.com/problems/check-if-there-is-a-valid-path-in-a-grid/) only — harder than Day 4 island DFS because **edges are typed**. If you see "street connects only certain ways," think **directed adjacency per cell type**.

---

<details>
<summary><strong>📖 Solution & Walkthrough</strong></summary>

Trace the pattern on the example graph from the problem statement. Then implement the traversal skeleton you identified.

### C++
```cpp
class Solution {
    int m, n;
    bool dfs(vector<vector<int>>& grid, int r, int c, int prev) {
        if (r == m - 1 && c == n - 1) return true;
        int cell = grid[r][c];
        grid[r][c] = 0;
        bool ok = false;
        if ((cell == 1 || cell == 4 || cell == 6) && prev != 1 && r + 1 < m && grid[r+1][c])
            ok |= dfs(grid, r + 1, c, 3);
        if ((cell == 2 || cell == 5 || cell == 6) && prev != 3 && r - 1 >= 0 && grid[r-1][c])
            ok |= dfs(grid, r - 1, c, 1);
        if ((cell == 1 || cell == 3 || cell == 5) && prev != 4 && c + 1 < n && grid[r][c+1])
            ok |= dfs(grid, r, c + 1, 2);
        if ((cell == 2 || cell == 3 || cell == 4) && prev != 2 && c - 1 >= 0 && grid[r][c-1])
            ok |= dfs(grid, r, c - 1, 4);
        grid[r][c] = cell;
        return ok;
    }
public:
    bool hasValidPath(vector<vector<int>>& grid) {
        m = grid.size(); n = grid[0].size();
        return dfs(grid, 0, 0, -1);
    }
};
```

### Python
```python
class Solution:
    def hasValidPath(self, grid: List[List[int]]) -> bool:
        m, n = len(grid), len(grid[0])
        def dfs(r, c, prev):
            if r == m - 1 and c == n - 1: return True
            cell = grid[r][c]
            grid[r][c] = 0
            ok = False
            if cell in (1, 4, 6) and prev != 1 and r + 1 < m and grid[r + 1][c]:
                ok |= dfs(r + 1, c, 3)
            if cell in (2, 5, 6) and prev != 3 and r - 1 >= 0 and grid[r - 1][c]:
                ok |= dfs(r - 1, c, 1)
            if cell in (1, 3, 5) and prev != 4 and c + 1 < n and grid[r][c + 1]:
                ok |= dfs(r, c + 1, 2)
            if cell in (2, 3, 4) and prev != 2 and c - 1 >= 0 and grid[r][c - 1]:
                ok |= dfs(r, c - 1, 4)
            grid[r][c] = cell
            return ok
        return dfs(0, 0, -1)
```

### Java
```java
class Solution {
    private int m, n;
    public boolean hasValidPath(int[][] grid) {
        m = grid.length; n = grid[0].length;
        return dfs(grid, 0, 0, -1);
    }
    private boolean dfs(int[][] grid, int r, int c, int prev) {
        if (r == m - 1 && c == n - 1) return true;
        int cell = grid[r][c];
        grid[r][c] = 0;
        boolean ok = false;
        if ((cell == 1 || cell == 4 || cell == 6) && prev != 1 && r + 1 < m && grid[r + 1][c] != 0)
            ok |= dfs(grid, r + 1, c, 3);
        if ((cell == 2 || cell == 5 || cell == 6) && prev != 3 && r - 1 >= 0 && grid[r - 1][c] != 0)
            ok |= dfs(grid, r - 1, c, 1);
        if ((cell == 1 || cell == 3 || cell == 5) && prev != 4 && c + 1 < n && grid[r][c + 1] != 0)
            ok |= dfs(grid, r, c + 1, 2);
        if ((cell == 2 || cell == 3 || cell == 4) && prev != 2 && c - 1 >= 0 && grid[r][c - 1] != 0)
            ok |= dfs(grid, r, c - 1, 4);
        grid[r][c] = cell;
        return ok;
    }
}
```

**Complexity:** O(m · n) time · O(m · n) space

</details>

---

## 💭 What Should Have Clicked in Your Mind?

- **"Street shapes 1–6"** → typed connectivity, not plain grid.
- **"Entry direction prev"** → expanded DFS state on grid.
- **"Valid path exists?"** → DFS reachability, not BFS shortest.
- **"Restore cell after backtrack"** → standard path DFS hygiene.
- **"Not num islands"** → direction constraints at every step.

---

*3 of 3 test problems. Continue to the next. →*

## Solution

### C++
```cpp
class Solution {
    int m, n;
    bool dfs(vector<vector<int>>& grid, int r, int c, int prev) {
        if (r == m - 1 && c == n - 1) return true;
        int cell = grid[r][c];
        grid[r][c] = 0;
        bool ok = false;
        if ((cell == 1 || cell == 4 || cell == 6) && prev != 1 && r + 1 < m && grid[r+1][c])
            ok |= dfs(grid, r + 1, c, 3);
        if ((cell == 2 || cell == 5 || cell == 6) && prev != 3 && r - 1 >= 0 && grid[r-1][c])
            ok |= dfs(grid, r - 1, c, 1);
        if ((cell == 1 || cell == 3 || cell == 5) && prev != 4 && c + 1 < n && grid[r][c+1])
            ok |= dfs(grid, r, c + 1, 2);
        if ((cell == 2 || cell == 3 || cell == 4) && prev != 2 && c - 1 >= 0 && grid[r][c-1])
            ok |= dfs(grid, r, c - 1, 4);
        grid[r][c] = cell;
        return ok;
    }
public:
    bool hasValidPath(vector<vector<int>>& grid) {
        m = grid.size(); n = grid[0].size();
        return dfs(grid, 0, 0, -1);
    }
};
```

### Python
```python
class Solution:
    def hasValidPath(self, grid: List[List[int]]) -> bool:
        m, n = len(grid), len(grid[0])
        def dfs(r, c, prev):
            if r == m - 1 and c == n - 1: return True
            cell = grid[r][c]
            grid[r][c] = 0
            ok = False
            if cell in (1, 4, 6) and prev != 1 and r + 1 < m and grid[r + 1][c]:
                ok |= dfs(r + 1, c, 3)
            if cell in (2, 5, 6) and prev != 3 and r - 1 >= 0 and grid[r - 1][c]:
                ok |= dfs(r - 1, c, 1)
            if cell in (1, 3, 5) and prev != 4 and c + 1 < n and grid[r][c + 1]:
                ok |= dfs(r, c + 1, 2)
            if cell in (2, 3, 4) and prev != 2 and c - 1 >= 0 and grid[r][c - 1]:
                ok |= dfs(r, c - 1, 4)
            grid[r][c] = cell
            return ok
        return dfs(0, 0, -1)
```

### Java
```java
class Solution {
    private int m, n;
    public boolean hasValidPath(int[][] grid) {
        m = grid.length; n = grid[0].length;
        return dfs(grid, 0, 0, -1);
    }
    private boolean dfs(int[][] grid, int r, int c, int prev) {
        if (r == m - 1 && c == n - 1) return true;
        int cell = grid[r][c];
        grid[r][c] = 0;
        boolean ok = false;
        if ((cell == 1 || cell == 4 || cell == 6) && prev != 1 && r + 1 < m && grid[r + 1][c] != 0)
            ok |= dfs(grid, r + 1, c, 3);
        if ((cell == 2 || cell == 5 || cell == 6) && prev != 3 && r - 1 >= 0 && grid[r - 1][c] != 0)
            ok |= dfs(grid, r - 1, c, 1);
        if ((cell == 1 || cell == 3 || cell == 5) && prev != 4 && c + 1 < n && grid[r][c + 1] != 0)
            ok |= dfs(grid, r, c + 1, 2);
        if ((cell == 2 || cell == 3 || cell == 4) && prev != 2 && c - 1 >= 0 && grid[r][c - 1] != 0)
            ok |= dfs(grid, r, c - 1, 4);
        grid[r][c] = cell;
        return ok;
    }
}
```

**Complexity:** O(m · n) time · O(m · n) space
