<!-- hand-authored -->
# ⚔ Quest: Path with Maximum Gold

> **Day 24** · [Path with Maximum Gold #1219](https://leetcode.com/problems/path-with-maximum-gold/) · Medium · 15 min · 35 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Path with Maximum Gold on LeetCode](https://leetcode.com/problems/path-with-maximum-gold/)**

> ⚔ **Hunter's rule:** Draw a 3×3 grid with gold values. Trace one dfs path: write `take → 0 → explore → restore`. That's Day 16 mark/unmark.

---

## The Problem

In a gold mine grid `m × n`, each cell contains an amount of gold (0 means none). Every minute, you can move to an adjacent cell (up, down, left, right). **You cannot visit the same cell twice in one path.**

Return the **maximum** gold you can collect starting from any cell with gold.

```
Input:  grid = [[0,6,0],[5,8,7],[0,9,0]]
Output: 24
Explanation: Path 9 → 8 → 7 (or similar) collects 24.

Input:  grid = [[1,0,7],[2,0,6],[3,4,5],[0,3,0],[9,0,20]]
Output: 28
```

---

## 💡 Hints

**Hint 1:** Outer loop — start `dfs` from **every** cell where `grid[i][j] > 0`.

**Hint 2:** `dfs(r, c, gold)`: if out of bounds or `grid[r][c] == 0`, return (dead end).

**Hint 3:** Take gold: `take = grid[r][c]`, add to `gold`, update global `best = max(best, gold)`.

**Hint 4:** **Mark:** `grid[r][c] = 0`. Explore 4 directions. **Unmark:** `grid[r][c] = take`.

**Hint 5:** No fixed end cell — any dead end is a valid stopping point. Record `best` at every step, not only at leaves.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Grid Path Enumeration (Collect-and-Backtrack)

| Clue in the problem | What it signals |
|---|---|
| "maximum gold" + grid path | DFS exploring all paths, track max |
| "cannot visit same cell twice" | Mark cell during path, restore after |
| "start from any cell" | Outer double loop on gold cells |
| Small grid, no overlapping states | Pure backtrack — no memo |

**Contrast with Day 16 (Word Search):**

| Word Search | Path Max Gold |
|---|---|
| Match characters of a word | Accumulate numeric gold |
| Mark with `'#'` | Mark with `0` |
| Return true when word complete | Update global max continuously |
| Existential search | Optimization over all paths |

**How a strong solver thinks before coding:**
1. *"Same as Word Search mark/unmark — but sum gold instead of match chars."*
2. *"Try every gold cell as entry point."*
3. *"best updates on every dfs call after taking cell."*
4. *"Restore gold before returning to parent."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Greedy: always go to largest neighbor** | Local max misses global best path |
| **DFS without restoring cell** | `0` cells block all future paths from other starts |
| **Single start at max gold cell** | Optimal path may start elsewhere and chain |
| **BFS for max path** | Path length varies; need full DFS exploration with unmark |
| **Memo on (r,c) only** | Grid state depends on which cells remain — not simple index memo |

**The insight brute force misses:** Mark/unmark lets you explore every simple path from each start without copying the whole grid.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes |
|---|---|
| [Word Search #79](https://leetcode.com/problems/word-search/) | Day 16 — match word, early exit |
| [Unique Paths III #980](https://leetcode.com/problems/unique-paths-iii/) | Today's next quest — count + visit all cells |
| [Path Maximum Gold #1219](https://leetcode.com/problems/path-with-maximum-gold/) | Today's problem |

---

## 📖 Walkthrough

`grid = [[0,6,0],[5,8,7],[0,9,0]]`:

```
Start dfs(1,1) with gold=8:
  best = 8
  mark (1,1)=0
  → (0,1)=6: gold=14, best=14, mark, explore...
  → (2,1)=9: gold=17, best=17, mark, explore...
  → (1,2)=7: gold=15 from (1,1)→(1,2), etc.
  restore each cell on backtrack

Best path chains 9+8+7 or 6+8+7+... depending on grid
Answer for this example: 24 (path through 9, 8, 7 or similar)
```

Mark/unmark trace at `(1,1)`:

```
ENTER (1,1): take=8, grid[1][1]=0
  ENTER (2,1): take=9, grid[2][1]=0
    dead ends → restore grid[2][1]=9
  restore grid[1][1]=8
```

---

## Solution

### C++
```cpp
class Solution {
    int m, n, best = 0;
    void dfs(vector<vector<int>>& grid, int r, int c, int gold) {
        if (r < 0 || c < 0 || r >= m || c >= n || grid[r][c] == 0) return;
        int take = grid[r][c];
        gold += take; best = max(best, gold);
        grid[r][c] = 0;
        dfs(grid, r + 1, c, gold);
        dfs(grid, r - 1, c, gold);
        dfs(grid, r, c + 1, gold);
        dfs(grid, r, c - 1, gold);
        grid[r][c] = take;
    }
public:
    int getMaximumGold(vector<vector<int>>& grid) {
        m = grid.size(); n = grid[0].size();
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                if (grid[i][j]) dfs(grid, i, j, 0);
        return best;
    }
};
```

### Python
```python
class Solution:
    def getMaximumGold(self, grid: List[List[int]]) -> int:
        m, n = len(grid), len(grid[0])
        self.best = 0
        def dfs(r, c, gold):
            if r < 0 or c < 0 or r >= m or c >= n or grid[r][c] == 0: return
            take = grid[r][c]
            gold += take; self.best = max(self.best, gold)
            grid[r][c] = 0
            for dr, dc in ((1,0),(-1,0),(0,1),(0,-1)): dfs(r + dr, c + dc, gold)
            grid[r][c] = take
        for i in range(m):
            for j in range(n):
                if grid[i][j]: dfs(i, j, 0)
        return self.best
```

### Java
```java
class Solution {
    private int m, n, best = 0;
    public int getMaximumGold(int[][] grid) {
        m = grid.length; n = grid[0].length;
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                if (grid[i][j] != 0) dfs(grid, i, j, 0);
        return best;
    }
    private void dfs(int[][] grid, int r, int c, int gold) {
        if (r < 0 || c < 0 || r >= m || c >= n || grid[r][c] == 0) return;
        int take = grid[r][c];
        gold += take; best = Math.max(best, gold);
        grid[r][c] = 0;
        dfs(grid, r + 1, c, gold); dfs(grid, r - 1, c, gold);
        dfs(grid, r, c + 1, gold); dfs(grid, r, c - 1, gold);
        grid[r][c] = take;
    }
}
```

**Complexity:** O(m · n · 4^k) time · O(k) space
---

## 💭 What Should Have Clicked in Your Mind?

- **"Max on grid path, no reuse"** → mark/unmark DFS from Day 16.
- **`grid[r][c] = 0`** → temporary visited mark (like `'#'`).
- **Restore `take`** → unchoose before sibling branches.
- **Every gold cell is a start** → outer double loop.
- **Not Day 23 memo** → paths don't overlap on a simple index key.

> 🎯 **Pattern Unlocked:** Grid Path Enumeration

---

*One quest down. Next: count paths that visit every empty cell — coverage backtracking. →*
