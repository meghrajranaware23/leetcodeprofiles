# ⚔ Quest: Swim in Rising Water

> **Day 28** · [Swim in Rising Water #778](https://leetcode.com/problems/swim-in-rising-water/) · Hard · 25 min · 50 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Swim in Rising Water on LeetCode](https://leetcode.com/problems/swim-in-rising-water/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. Draw the graph. Trace the traversal. The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Swim in Rising Water #778](https://leetcode.com/problems/swim-in-rising-water/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? Think about **Binary Search + BFS**.

If you're stuck after 5 minutes: revisit the concept page's visual walkthrough. Draw the graph and trace BFS/DFS by hand before looking at the solution structure.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Binary Search + BFS

**How to identify this from the problem statement:**
- Look for graph structure keywords — "node", "edge", "connected", "adjacent", "grid"
- Ask: do I need **BFS** (shortest/levels), **DFS** (connectivity/cycles), or **Dijkstra** (weighted)?
- Check if the input is explicit graph, implicit grid, or abstract state space

| Keyword / phrase | What it signals |
|---|---|
| "shortest path" / "minimum steps" | BFS with visited set |
| "connected" / "reachable" | DFS/BFS from source |
| "grid" / "island" / "matrix" | Grid-as-graph traversal |
| "prerequisites" / "dependencies" | Topological sort |
| "bipartite" / "two teams" | Graph 2-coloring |
| "union" / "merge" / "equivalent" | Union-Find |
| "minimum cost" / "network delay" | Dijkstra |

**Why this pattern works:** Graphs model relationships. The pattern names how you explore those relationships — wavefront (BFS), deep dive (DFS), or group merging (UF).

**How a strong solver thinks before coding:**
1. *"What are my nodes? What are my edges?"*
2. *"BFS, DFS, Dijkstra, or Union-Find?"*
3. *"Draw a small example graph and trace by hand."*
4. *"What goes in my visited set?"*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Try all paths without pruning** | Exponential time — visited set is essential |
| **DFS for shortest unweighted path** | BFS guarantees minimum steps |
| **Dijkstra on unweighted graph** | BFS is simpler and equally correct |
| **Nested loops for connectivity** | O(n²) when O(n) BFS/DFS works |

**The insight brute force misses:** Name the exploration strategy. BFS for shortest, DFS for connectivity, Dijkstra for weighted — then add a visited set.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| Related tree problems | Different combine logic | Same recursive skeleton |
| Same traversal order | Different processing per node | Same visit sequence |
| Variant constraints | Extra state or early termination | Same flow direction |

If you recognized this problem's pattern, you already have the skeleton for today's practice queue.

---

## 📖 Walkthrough

Trace the pattern on a small graph before reading the code:

```
Graph:  A — B — C
        |       |
        D — E   F

Apply Binary Search + BFS step by step on this graph.
Draw it. Mark visited nodes at each step.
Watch the queue/stack grow and shrink.
```

> 💡 **The insight:** The code is just the paper trace written in syntax. If you can trace it by hand, you can code it.

---

## Solution

### C++
```cpp
class Solution {
    int m, n, dirs[4][2] = {{1,0},{-1,0},{0,1},{0,-1}};
    bool can(vector<vector<int>>& g, int t) {
        if (g[0][0] > t) return false;
        vector<vector<bool>> vis(m, vector<bool>(n));
        queue<pair<int,int>> q;
        q.push({0,0}); vis[0][0] = true;
        while (!q.empty()) {
            auto [r,c] = q.front(); q.pop();
            if (r == m - 1 && c == n - 1) return true;
            for (auto& d : dirs) {
                int nr = r + d[0], nc = c + d[1];
                if (nr >= 0 && nc >= 0 && nr < m && nc < n && !vis[nr][nc] && g[nr][nc] <= t) {
                    vis[nr][nc] = true;
                    q.push({nr, nc});
                }
            }
        }
        return false;
    }
public:
    int swimInWater(vector<vector<int>>& grid) {
        m = grid.size(); n = grid[0].size();
        int lo = max(grid[0][0], grid[m-1][n-1]), hi = 0;
        for (auto& row : grid) for (int v : row) hi = max(hi, v);
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (can(grid, mid)) hi = mid;
            else lo = mid + 1;
        }
        return lo;
    }
};
```

### Python
```python
class Solution:
    def swimInWater(self, grid: List[List[int]]) -> int:
        m, n = len(grid), len(grid[0])
        def can(t):
            if grid[0][0] > t: return False
            vis = set()
            q = deque([(0, 0)])
            vis.add((0, 0))
            while q:
                r, c = q.popleft()
                if r == m - 1 and c == n - 1: return True
                for dr, dc in ((1,0),(-1,0),(0,1),(0,-1)):
                    nr, nc = r + dr, c + dc
                    if 0 <= nr < m and 0 <= nc < n and (nr, nc) not in vis and grid[nr][nc] <= t:
                        vis.add((nr, nc)); q.append((nr, nc))
            return False
        lo, hi = max(grid[0][0], grid[-1][-1]), max(max(row) for row in grid)
        while lo < hi:
            mid = (lo + hi) // 2
            if can(mid): hi = mid
            else: lo = mid + 1
        return lo
```

### Java
```java
class Solution {
    private int m, n;
    public int swimInWater(int[][] grid) {
        m = grid.length; n = grid[0].length;
        int lo = Math.max(grid[0][0], grid[m - 1][n - 1]), hi = 0;
        for (int[] row : grid) for (int v : row) hi = Math.max(hi, v);
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (can(grid, mid)) hi = mid;
            else lo = mid + 1;
        }
        return lo;
    }
    private boolean can(int[][] grid, int t) {
        if (grid[0][0] > t) return false;
        boolean[][] vis = new boolean[m][n];
        Queue<int[]> q = new ArrayDeque<>();
        q.offer(new int[]{0, 0}); vis[0][0] = true;
        int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};
        while (!q.isEmpty()) {
            int[] cur = q.poll();
            if (cur[0] == m - 1 && cur[1] == n - 1) return true;
            for (int[] d : dirs) {
                int nr = cur[0] + d[0], nc = cur[1] + d[1];
                if (nr >= 0 && nc >= 0 && nr < m && nc < n && !vis[nr][nc] && grid[nr][nc] <= t) {
                    vis[nr][nc] = true; q.offer(new int[]{nr, nc});
                }
            }
        }
        return false;
    }
}
```

**Complexity:** O(n² log n) time · O(n²) space

---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"This is a graph problem"** → Draw it. Identify nodes and edges first.
- **"Binary Search + BFS"** → Name the pattern from the concept page.
- **"BFS or DFS?"** → Shortest/levels = BFS. Connectivity/cycles = DFS.
- **"Visited set"** → Every graph traversal needs one.

If you tried DFS when BFS was cleaner (or vice versa), that's fine — the breakthrough is **naming the pattern family**, not memorizing one solution.

> 🎯 **Pattern Unlocked:** Binary Search + BFS

---

*One quest down. The next one builds on this pattern. →*
