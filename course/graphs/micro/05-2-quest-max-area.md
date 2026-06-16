<!-- hand-authored -->
# ⚔ Quest: Max Area of Island

> **Day 5** · [Max Area of Island #695](https://leetcode.com/problems/max-area-of-island/) · Medium · 15 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Max Area of Island on LeetCode](https://leetcode.com/problems/max-area-of-island/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. Use the Number of Islands restart loop — but this time count cells in each flood. The hints below are for *after* your attempt.

---

## The Problem

Given a binary grid (`0` water, `1` land), return the **maximum area** of an island. If no land, return `0`.

```
Input:  grid = [[0,0,1,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],...]
Output: 6

Input:  grid = [[0,0,0,0,0,0,0,0]]
Output: 0
```

---

## 💡 Hints

Which pattern from today's concept applies? **Component size tracking** — dfs returns area of one flood.

**Hint 1:** Same double loop as #200: when `grid[i][j]==1`, call `area = dfs(i,j)`.

**Hint 2:** Inside dfs: mark cell `0`, start `area=1`, add dfs results from each 4-neighbor still `1`.

**Hint 3:** Update `best = max(best, area)` after each discovery.

**Hint 4:** Empty grid / all water → return 0 (default max).

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Component Size Tracking

**How to identify this from the problem statement:**
- Grid + islands → flood fill family
- "Maximum area" → compare sizes across components
- 4-direction implied → standard DIRS
- Binary values → int 0/1 grid

| Keyword / phrase | What it signals |
|---|---|
| "max area of island" | Restart + returning dfs |
| "size" / "area" / "number of cells" | Accumulate during flood |
| Same grid as #200 | Extend count → max size |
| Return 0 if none | Initialize best = 0 |

**Why this pattern works:** Each island's area equals cells visited in one dfs. Outer loop ensures every island measured once.

**How a strong solver thinks before coding:**
1. *"Copy #200 skeleton."*
2. *"dfs returns int area instead of void."*
3. *"best = max(best, dfs(r,c)) when finding new land."*
4. *"Trace small 3-cell L-shape — area 3."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Count all land cells globally** | One giant connected region — not max among islands |
| **BFS without marking visited** | Revisit cells; area wrong |
| **Only measure first island found** | Max might be later in scan |
| **8-direction area** | Inflates area vs problem's 4-dir |
| **Separate visited array when sinking works** | Extra space unnecessarily |

**The insight brute force misses:** #200 counts components; #695 takes **max of component sizes** — one line change in the combine step.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| Number of Islands #200 (Day 4) | Count not size | Same dfs flood |
| Count Sub Islands #1905 (E-Rank test) | Two grids, matching flood | Area + validity check |
| Largest Perimeter Triangle (unrelated) | Don't confuse perimeter with area | Grid flood family |

Max area = #200 + return value + max tracker.

---

## 📖 Walkthrough

**Restart scan → dfs returns island size → keep global max.**

```
grid:
  1 1 0
  1 0 0
  0 0 1

Find (0,0): dfs → sinks 3 cells → area=3, best=3
Find (2,2): dfs → area=1, best=max(3,1)=3

Answer: 3 ✓
```

> 💡 **The insight:** The recursion **returns** aggregated size bottom-up — like tree depth returning int, but on a grid flood.

---

## Solution

### C++
```cpp
class Solution {
    int m, n, dirs[4][2] = {{1,0},{-1,0},{0,1},{0,-1}};
    int dfs(vector<vector<int>>& g, int r, int c) {
        g[r][c] = 0;
        int area = 1;
        for (auto& d : dirs) {
            int nr = r + d[0], nc = c + d[1];
            if (nr >= 0 && nc >= 0 && nr < m && nc < n && g[nr][nc])
                area += dfs(g, nr, nc);
        }
        return area;
    }
public:
    int maxAreaOfIsland(vector<vector<int>>& grid) {
        m = grid.size(); n = grid[0].size();
        int best = 0;
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                if (grid[i][j]) best = max(best, dfs(grid, i, j));
        return best;
    }
};
```

### Python
```python
class Solution:
    def maxAreaOfIsland(self, grid: List[List[int]]) -> int:
        m, n = len(grid), len(grid[0])
        def dfs(r, c):
            grid[r][c] = 0
            area = 1
            for dr, dc in ((1,0),(-1,0),(0,1),(0,-1)):
                nr, nc = r + dr, c + dc
                if 0 <= nr < m and 0 <= nc < n and grid[nr][nc]:
                    area += dfs(nr, nc)
            return area
        return max((dfs(i, j) for i in range(m) for j in range(n) if grid[i][j]), default=0)
```

### Java
```java
class Solution {
    private int m, n;
    public int maxAreaOfIsland(int[][] grid) {
        m = grid.length; n = grid[0].length;
        int best = 0;
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                if (grid[i][j] == 1) best = Math.max(best, dfs(grid, i, j));
        return best;
    }
    private int dfs(int[][] grid, int r, int c) {
        grid[r][c] = 0;
        int area = 1;
        int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};
        for (int[] d : dirs) {
            int nr = r + d[0], nc = c + d[1];
            if (nr >= 0 && nc >= 0 && nr < m && nc < n && grid[nr][nc] == 1)
                area += dfs(grid, nr, nc);
        }
        return area;
    }
}
```

**Complexity:** O(m · n) time · O(m · n) space
---

## 💭 What Should Have Clicked in Your Mind?

- **"Max area"** → #200 + dfs returns cell count.
- **`best = max(best, dfs(...))`** → one line beyond island counting.
- **Sink to 0** → same visited trick as Day 4.
- **default=0 / best=0** → all-water grid.

If Number of Islands is muscle memory, this quest is a five-minute extension.

> 🎯 **Pattern Unlocked:** Component area — returning flood size, track maximum.

---

*One quest down. Next: clone an entire graph — old node to new node map. →*
