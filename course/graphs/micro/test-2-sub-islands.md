# ⚔ E-Rank Test — Problem 2

> [Count Sub Islands #1905](https://leetcode.com/problems/count-sub-islands/) · Medium · 100 XP

---

You've completed your E-Rank training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Count Sub Islands on LeetCode](https://leetcode.com/problems/count-sub-islands/)**

> ⚔ **Hunter's rule:** This is a rank test — treat it like real interview practice. Draw the graph. Trace the traversal. No peeking until you've genuinely tried.

---

## The Problem

See the full problem statement on LeetCode: **[Count Sub Islands #1905](https://leetcode.com/problems/count-sub-islands/)**

---

## 💡 Hints

> 🎯 **What's being tested:** Pattern recognition from the E-Rank curriculum. Name the pattern before you code.

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

- **"This is a E-Rank test"** → Use patterns from this rank's training.
- **"Draw first, code second"** → Visual tracing beats guessing.
- **"Name the pattern"** → The code is just the template filled in.

---

*2 of 3 test problems. Continue to the next. →*
