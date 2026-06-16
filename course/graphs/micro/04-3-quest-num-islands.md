<!-- hand-authored -->
# ⚔ Quest: Number of Islands

> **Day 4** · [Number of Islands #200](https://leetcode.com/problems/number-of-islands/) · Medium · 15 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Number of Islands on LeetCode](https://leetcode.com/problems/number-of-islands/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. Scan row by row; each time you hit an unvisited `'1'`, that's a new island — flood it. The hints below are for *after* your attempt.

---

## The Problem

Given an `m×n` grid of `'1'` (land) and `'0'` (water), return the **number of islands**.

An island is a maximal group of `'1'` cells connected **4-directionally**.

```
Input:  grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]
Output: 1

Input:  grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]
Output: 3
```

---

## 💡 Hints

Which pattern from today's concept applies? **Grid DFS/BFS components** — Day 3 restart loop on `(r,c)`.

**Hint 1:** Double loop every cell. When `grid[r][c]=='1'`: increment `count`, then sink the whole island.

**Hint 2:** `dfs(r,c)`: set `grid[r][c]='0'`, then call dfs on 4 in-bounds neighbors that are still `'1'`.

**Hint 3:** Sinking to `'0'` **is** your visited mark — no extra array needed.

**Hint 4:** BFS with a queue works identically — DFS is shorter to write for many people.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Grid DFS/BFS Components

**How to identify this from the problem statement:**
- Count connected `'1'` regions → component count
- 4-directional → standard DIRS
- Grid input → restart scan + flood
- Classic "island" wording → E-Rank anchor problem

| Keyword / phrase | What it signals |
|---|---|
| "number of islands" | Restart + flood count |
| `'1'` land / `'0'` water | Condition for expansion |
| "4-directionally connected" | No diagonals |
| Return integer count | Increment before each flood |
| Mutate or visited grid | Prevent double-count |

**Why this pattern works:** Each DFS/BFS from a discovered `'1'` consumes exactly one island. The outer scan finds one representative cell per component.

**How a strong solver thinks before coding:**
1. *"for r,c: if grid[r][c]=='1': count++, dfs(r,c)."*
2. *"dfs: mark '0', recurse 4 neighbors."*
3. *"Bounds + char '1' check on neighbors."*
4. *"Example 2: three separate floods → 3."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Count every `'1'` cell** | One island has many cells — not one per cell |
| **Flood once from (0,0) only** | Misses islands elsewhere |
| **8-direction connectivity** | Diagonal `'1'` pairs merge wrongly |
| **DFS without marking visited** | Infinite recursion on cycles of land |
| **Union-Find on every cell** | Works but heavy; scan+flood is O(m·n) and simpler |

**The insight brute force misses:** **Restart loop on grid** — same as Provinces, cells instead of cities.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| Max Area of Island #695 (Day 5) | Return max flood size | Same dfs, accumulate area |
| Flood Fill #733 (Day 2) | Single flood from click | One component, not count |
| Surrounded Regions #130 (E-Rank test) | Border-aware flood | Variant of grid DFS |

#200 is the grid component template — memorize the restart skeleton.

---

## 📖 Walkthrough

**Scan → on `'1'`: count++ → sink island.**

```
grid:
  1 1 0
  0 1 0
  0 0 1

(r,c)=(0,0): '1' → count=1, dfs sinks (0,0),(0,1),(1,1)
grid now:
  0 0 0
  0 0 0
  0 0 1

(r,c)=(2,2): '1' → count=2, dfs sinks (2,2)

Answer: 2 ✓
```

> 💡 **The insight:** The outer loops are the **component counter**; dfs is the **flooder**. Identical structure to Provinces #547.

---

## Solution

### C++
```cpp
class Solution {
    int m, n, dirs[4][2] = {{1,0},{-1,0},{0,1},{0,-1}};
    void dfs(vector<vector<char>>& g, int r, int c) {
        g[r][c] = '0';
        for (auto& d : dirs) {
            int nr = r + d[0], nc = c + d[1];
            if (nr >= 0 && nc >= 0 && nr < m && nc < n && g[nr][nc] == '1')
                dfs(g, nr, nc);
        }
    }
public:
    int numIslands(vector<vector<char>>& grid) {
        m = grid.size(); if (!m) return 0;
        n = grid[0].size();
        int count = 0;
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                if (grid[i][j] == '1') { count++; dfs(grid, i, j); }
        return count;
    }
};
```

### Python
```python
class Solution:
    def numIslands(self, grid: List[List[str]]) -> int:
        m, n = len(grid), len(grid[0])
        def dfs(r, c):
            grid[r][c] = '0'
            for dr, dc in ((1,0),(-1,0),(0,1),(0,-1)):
                nr, nc = r + dr, c + dc
                if 0 <= nr < m and 0 <= nc < n and grid[nr][nc] == '1':
                    dfs(nr, nc)
        count = 0
        for i in range(m):
            for j in range(n):
                if grid[i][j] == '1':
                    count += 1
                    dfs(i, j)
        return count
```

### Java
```java
class Solution {
    private int m, n;
    public int numIslands(char[][] grid) {
        m = grid.length; n = grid[0].length;
        int count = 0;
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                if (grid[i][j] == '1') { count++; dfs(grid, i, j); }
        return count;
    }
    private void dfs(char[][] grid, int r, int c) {
        grid[r][c] = '0';
        int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};
        for (int[] d : dirs) {
            int nr = r + d[0], nc = c + d[1];
            if (nr >= 0 && nc >= 0 && nr < m && nc < n && grid[nr][nc] == '1')
                dfs(grid, nr, nc);
        }
    }
}
```

**Complexity:** O(m · n) time · O(m · n) space
---

## 💭 What Should Have Clicked in Your Mind?

- **"Number of islands"** → Provinces on a grid — restart + flood.
- **Sink to `'0'`** → visited without extra memory.
- **4-dir DIRS** → Day 2 neighbor loop, Day 4 component goal.
- **count++ before dfs** → discover new component, then consume it.

This is one of the highest-frequency graph patterns in interviews — own the skeleton.

> 🎯 **Pattern Unlocked:** Grid component count — scan, increment, flood.

---

*Both quests complete. Head to the checkpoint. →*
