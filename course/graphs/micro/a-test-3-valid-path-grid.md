# ⚔ A-Rank Test — Problem 3

> [Check if There is a Valid Path in a Grid #1391](https://leetcode.com/problems/check-if-there-is-a-valid-path-in-a-grid/) · Medium · 250 XP

---

You've completed your A-Rank training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Check if There is a Valid Path in a Grid on LeetCode](https://leetcode.com/problems/check-if-there-is-a-valid-path-in-a-grid/)**

> ⚔ **Hunter's rule:** This is a rank test — treat it like real interview practice. Draw the graph. Trace the traversal. No peeking until you've genuinely tried.

---

## The Problem

See the full problem statement on LeetCode: **[Check if There is a Valid Path in a Grid #1391](https://leetcode.com/problems/check-if-there-is-a-valid-path-in-a-grid/)**

---

## 💡 Hints

> 🎯 **What's being tested:** Pattern recognition from the A-Rank curriculum. Name the pattern before you code.

Revisit your rank's cheat sheet. Which graph technique does this problem need?

---

## 🔍 Pattern Recognition Breakdown

**How to identify from the statement:**
- Read for graph structure clues
- Determine exploration strategy
- Name the pattern family before opening your editor

**How a strong solver thinks before coding:**
1. *"Draw the example graph."*
2. *"What are my nodes and edges?"*
3. *"BFS, DFS, Dijkstra, or Union-Find?"*
4. *"What goes in my visited set?"*

---

## ❌ Why Brute Force Fails

Graph problems have natural O(V+E) traversal solutions. Brute force typically means exponential path enumeration or missing visited sets. Trust the exploration strategy.

---

## 🎯 Transfer to Unseen Problems

Can you spot the pattern without the problem name telling you?

Read the statement once. Say the pattern aloud. If you can name it in under 30 seconds, you're ready.

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

- **"This is a A-Rank test"** → Use patterns from this rank's training.
- **"Draw first, code second"** → Visual tracing beats guessing.
- **"Name the pattern"** → The code is just the template filled in.

---

*3 of 3 test problems. Continue to the next. →*
