<!-- hand-authored -->
# ⚔ Quest: Unique Paths III

> **Day 24** · [Unique Paths III #980](https://leetcode.com/problems/unique-paths-iii/) · Medium · 15 min · 40 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Unique Paths III on LeetCode](https://leetcode.com/problems/unique-paths-iii/)**

> ⚔ **Hunter's rule:** On a 3×3 example, precompute `empty` and trace `dfs` with a running `left` counter. Count `ans++` only when you hit `2` with `left==0`.

---

## The Problem

You are given an `m × n` grid where:

- `1` = start
- `2` = end
- `0` = empty squares you must walk through
- `-1` = obstacle

Return the **number of unique paths** from start to end that **visit every empty square exactly once**.

```
Input:  grid = [[1,0,0,0],[0,0,0,0],[0,0,2,-1]]
Output: 2

Input:  grid = [[1,0,0,0],[0,0,0,0],[0,0,0,2]]
Output: 4

Input:  grid = [[0,1],[2,0]]
Output: 0
Explanation: Start/end placement — no path visits all empties correctly.
```

---

## 💡 Hints

**Hint 1:** Preprocess: find `sr, sc` (start), `er, ec` (end), count zeros as `empty`. Set **`empty = number of 0 cells + 1`** (start counts as one cell to consume).

**Hint 2:** `dfs(r, c, left)`: if out of bounds or `grid[r][c] == -1`, return.

**Hint 3:** If `(r,c) == (er, ec)`: if `left == 0`, increment `ans`. Return either way.

**Hint 4:** Mark: `grid[r][c] = -1`. Four directions with `left - 1`. Restore: `grid[r][c] = 0`.

**Hint 5:** Start with `dfs(sr, sc, empty)` — not from every cell.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Full Grid Coverage Backtracking

| Clue in the problem | What it signals |
|---|---|
| "visit every empty square exactly once" | Counter `left` tracks remaining cells |
| Fixed start `1` and end `2` | Preprocess positions; success test at end |
| "count unique paths" | Global `ans++` at valid leaf |
| Obstacles `-1` | Same as visited mark during dfs |
| Small grid (≤ 20×20, often tiny) | Exponential backtrack acceptable |

**Contrast with Day 18 (N-Queens II):**

| N-Queens II | Unique Paths III |
|---|---|
| Place one queen per row | Walk one step per dfs call |
| Count complete boards | Count complete walks |
| Constraint sets | Mark/unmark on grid |

**Contrast with Day 16 (Word Search):**

| Word Search | Unique Paths III |
|---|---|
| Match external word | Internal visit-all rule |
| Any path length = word len | Path must cover all zeros + start |
| Return bool | Count all valid paths |

**How a strong solver thinks before coding:**
1. *"Hamiltonian-path-style walk on empty cells."*
2. *"`left` decrements each step; success at end only if left==0."*
3. *"Mark -1, restore 0 — same unmark as gold quest."*
4. *"Don't count reaching end early with unvisited zeros."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Reach end without visiting all zeros** | Must check `left == 0` at end |
| **`empty = count of zeros` only** | Off-by-one — start cell must be counted |
| **Permanent visited array not cleared** | Backtrack requires restore |
| **Count paths to end without coverage rule** | Standard unique paths — wrong problem |
| **Start dfs from every cell** | Paths must begin at `1` |

**The insight brute force misses:** The `left` counter encodes "have I visited every required cell?" — reaching `2` alone is insufficient.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes |
|---|---|
| [Path with Maximum Gold #1219](https://leetcode.com/problems/path-with-maximum-gold/) | Today's prior quest — max gold, no coverage |
| [Unique Paths #61](https://leetcode.com/problems/unique-paths/) | No backtrack — DP, only right/down |
| [Word Search #79](https://leetcode.com/problems/word-search/) | Day 16 — mark/unmark, different win test |

---

## 📖 Walkthrough

`grid = [[1,0,0,0],[0,0,0,0],[0,0,0,2]]` — 4 zeros + 1 start → `empty = 5`:

```
dfs(0,0, left=5) at start
  mark (0,0)=-1, left=4
  explore neighbors...
  ... eventually reach (2,3)=2 with left=0 → ans++

Four distinct Hamiltonian paths from start to end covering all zeros
Answer: 4
```

Failure case — reach end too early:

```
If left=2 when stepping on end cell:
  at (er,ec): left != 0 → do NOT ans++
  backtrack
```

`left` accounting:

```
empty = 1 (for start) + count of 0 cells
Each dfs step onto a non-end cell: left--
At end: accept only if left == 0
```

---

## Solution

### C++
```cpp
class Solution {
    int ans = 0, empty = 1, sr, sc, er, ec;
    void dfs(vector<vector<int>>& g, int r, int c, int left) {
        if (r < 0 || c < 0 || r >= (int)g.size() || c >= (int)g[0].size() || g[r][c] == -1) return;
        if (r == er && c == ec) { if (left == 0) ans++; return; }
        g[r][c] = -1;
        dfs(g, r + 1, c, left - 1);
        dfs(g, r - 1, c, left - 1);
        dfs(g, r, c + 1, left - 1);
        dfs(g, r, c - 1, left - 1);
        g[r][c] = 0;
    }
public:
    int uniquePathsIII(vector<vector<int>>& grid) {
        for (int i = 0; i < (int)grid.size(); i++)
            for (int j = 0; j < (int)grid[0].size(); j++) {
                if (grid[i][j] == 1) { sr = i; sc = j; }
                else if (grid[i][j] == 2) { er = i; ec = j; }
                else if (grid[i][j] == 0) empty++;
            }
        dfs(grid, sr, sc, empty);
        return ans;
    }
};
```

### Python
```python
class Solution:
    def uniquePathsIII(self, grid: List[List[int]]) -> int:
        m, n = len(grid), len(grid[0])
        empty = 1; sr = sc = er = ec = 0
        for i in range(m):
            for j in range(n):
                if grid[i][j] == 1: sr, sc = i, j
                elif grid[i][j] == 2: er, ec = i, j
                elif grid[i][j] == 0: empty += 1
        self.ans = 0
        def dfs(r, c, left):
            if r < 0 or c < 0 or r >= m or c >= n or grid[r][c] == -1: return
            if r == er and c == ec:
                if left == 0: self.ans += 1
                return
            grid[r][c] = -1
            for dr, dc in ((1,0),(-1,0),(0,1),(0,-1)): dfs(r + dr, c + dc, left - 1)
            grid[r][c] = 0
        dfs(sr, sc, empty)
        return self.ans
```

### Java
```java
class Solution {
    private int ans = 0, empty = 1, sr, sc, er, ec;
    public int uniquePathsIII(int[][] grid) {
        for (int i = 0; i < grid.length; i++)
            for (int j = 0; j < grid[0].length; j++) {
                if (grid[i][j] == 1) { sr = i; sc = j; }
                else if (grid[i][j] == 2) { er = i; ec = j; }
                else if (grid[i][j] == 0) empty++;
            }
        dfs(grid, sr, sc, empty);
        return ans;
    }
    private void dfs(int[][] g, int r, int c, int left) {
        if (r < 0 || c < 0 || r >= g.length || c >= g[0].length || g[r][c] == -1) return;
        if (r == er && c == ec) { if (left == 0) ans++; return; }
        g[r][c] = -1;
        dfs(g, r + 1, c, left - 1); dfs(g, r - 1, c, left - 1);
        dfs(g, r, c + 1, left - 1); dfs(g, r, c - 1, left - 1);
        g[r][c] = 0;
    }
}
```

**Complexity:** O(4^(m·n)) time · O(m · n) space
---

## 💭 What Should Have Clicked in Your Mind?

- **"Visit every empty cell once"** → `left` counter + coverage dfs.
- **`empty = zeros + 1`** → start cell consumed on first step.
- **End cell with `left > 0`** → invalid — don't count.
- **Mark `-1`, restore `0`** → same backtrack rhythm as gold quest and Word Search.
- **Day 18 counting** → increment global `ans` at valid complete assignment.

> 🎯 **Pattern Unlocked:** Full Grid Coverage Backtracking

---

*Both quests complete. Head to the checkpoint. →*
