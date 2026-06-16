<!-- hand-authored -->
# ⚔ Quest: Number of Enclaves

> **Day 7** · [Number of Enclaves #1020](https://leetcode.com/problems/number-of-enclaves/) · Medium · 15 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Number of Enclaves on LeetCode](https://leetcode.com/problems/number-of-enclaves/)**

> ⚔ **Hunter's rule:** DFS from every **border land cell** (1 on the edge). Flip visited land to 0. Sum what's left — that's the enclave count. The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Number of Enclaves #1020](https://leetcode.com/problems/number-of-enclaves/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? **Outside-In Flood Fill** — border land connects to the "outside"; flood it all away. **Enclave = unvisited land count** = sum of remaining 1s. NOT BFS from water (0).

If you're stuck after 5 minutes: you don't count island components. You **remove** everything touching the frame, then count leftover 1s.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Outside-In Flood Fill

**How to identify this from the problem statement:**
- "Cannot walk off the boundary" → land that **does** touch boundary is NOT enclave
- Return **count of cells**, not number of regions
- Binary grid → mark by setting `grid[r][c] = 0`

| Keyword / phrase | What it signals |
|---|---|
| "enclave" | Trapped land — border flood then sum 1s |
| "move off the grid" | Border-connected = safe, erase it |
| "return the number of land cells" | Count cells, not components |
| "4-directionally" | Standard grid DFS |

**Why this pattern works:** Any land path to the edge escapes. Border DFS marks all escapable land; what remains is fully enclosed.

**How a strong solver thinks before coding:**
1. *"For each border cell (i,j) with grid[i][j]==1: dfs."*
2. *"dfs: set grid[r][c]=0; recurse to neighbor 1s."*
3. *"Return sum(grid) or count 1s in final grid."*
4. *"Do NOT start from 0 cells."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Count islands, check each touches border** | Extra component logic — border flood is one pass |
| **BFS from all 0 cells inward** | Wrong seed — water isn't connected to outside frame the same way |
| **For each land cell, BFS to border** | O(cells²) per enclave check |
| **Union-Find on components** | Overkill for "remaining after erase" |

**The insight brute force misses:** Erase outside-connected land once; **enclave count = unvisited land count**.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Number of Closed Islands #1254](https://leetcode.com/problems/number-of-closed-islands/) | Count closed **components** after border erase | Border flood + inner scan |
| [Pacific Atlantic #417](https://leetcode.com/problems/pacific-atlantic-water-flow/) | Two oceans, height rule | Border seed, different condition |
| [Surrounded Regions #130](https://leetcode.com/problems/surrounded-regions/) | Border 'O' flood, flip inner | Outside-in erase |

---

## 📖 Walkthrough

**Border land erased; count survivors.**

```
grid:                    After border DFS (1→0):
0 0 0 0                  0 0 0 0
1 0 1 0          →       0 0 0 0
1 1 1 0                  0 1 1 0   ← inner 1s trapped
0 1 1 0                  0 1 1 0

Border (1,0) and (2,0) land → flood clears left column connection
Remaining 1s at (1,1),(2,1),(2,2),(1,2) → count = 4? Trace your example carefully on paper.

Template:
  for i in 0..m-1: dfs(i,0); dfs(i,n-1)
  for j in 0..n-1: dfs(0,j); dfs(m-1,j)
  return sum of 1s
```

> 💡 **The insight:** You're not finding islands — you're deleting everything that **isn't** an enclave, then counting.

---

## Solution

### C++
```cpp
class Solution {
    int m, n, dirs[4][2] = {{1,0},{-1,0},{0,1},{0,-1}};
    void dfs(vector<vector<int>>& g, int r, int c) {
        g[r][c] = 0;
        for (auto& d : dirs) {
            int nr = r + d[0], nc = c + d[1];
            if (nr >= 0 && nc >= 0 && nr < m && nc < n && g[nr][nc])
                dfs(g, nr, nc);
        }
    }
public:
    int numEnclaves(vector<vector<int>>& grid) {
        m = grid.size(); n = grid[0].size();
        for (int i = 0; i < m; i++) { dfs(grid, i, 0); dfs(grid, i, n - 1); }
        for (int j = 0; j < n; j++) { dfs(grid, 0, j); dfs(grid, m - 1, j); }
        int count = 0;
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++) count += grid[i][j];
        return count;
    }
};
```

### Python
```python
class Solution:
    def numEnclaves(self, grid: List[List[int]]) -> int:
        m, n = len(grid), len(grid[0])
        def dfs(r, c):
            grid[r][c] = 0
            for dr, dc in ((1,0),(-1,0),(0,1),(0,-1)):
                nr, nc = r + dr, c + dc
                if 0 <= nr < m and 0 <= nc < n and grid[nr][nc]:
                    dfs(nr, nc)
        for i in range(m):
            dfs(i, 0); dfs(i, n - 1)
        for j in range(n):
            dfs(0, j); dfs(m - 1, j)
        return sum(sum(row) for row in grid)
```

### Java
```java
class Solution {
    private int m, n;
    public int numEnclaves(int[][] grid) {
        m = grid.length; n = grid[0].length;
        for (int i = 0; i < m; i++) { dfs(grid, i, 0); dfs(grid, i, n - 1); }
        for (int j = 0; j < n; j++) { dfs(grid, 0, j); dfs(grid, m - 1, j); }
        int count = 0;
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++) count += grid[i][j];
        return count;
    }
    private void dfs(int[][] grid, int r, int c) {
        if (r < 0 || c < 0 || r >= m || c >= n || grid[r][c] == 0) return;
        grid[r][c] = 0;
        dfs(grid, r + 1, c); dfs(grid, r - 1, c);
        dfs(grid, r, c + 1); dfs(grid, r, c - 1);
    }
}
```

**Complexity:** O(m · n) time · O(m · n) space
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Land that can't reach border"** → Erase border-connected land first.
- **"Enclave = remaining 1s"** → Sum grid — not component count from Day 4.
- **"Seed border land only"** → NOT BFS from 0/water.
- **"Same border loop as Pacific"** → Different condition (any land vs height).

> 🎯 **Pattern Unlocked:** Outside-In Flood Fill — border erases escapable land; count what's trapped.

---

*Both quests complete. Head to the checkpoint. →*
