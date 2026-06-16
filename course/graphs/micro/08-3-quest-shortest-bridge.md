<!-- hand-authored -->
# ⚔ Quest: Shortest Bridge

> **Day 8** · [Shortest Bridge #934](https://leetcode.com/problems/shortest-bridge/) · Medium · 15 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Shortest Bridge on LeetCode](https://leetcode.com/problems/shortest-bridge/)**

> ⚔ **Hunter's rule:** Phase 1 — DFS to mark one entire island as `2`. Phase 2 — BFS from **all** `2` cells into `0`s until you hit a `1`. The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Shortest Bridge #934](https://leetcode.com/problems/shortest-bridge/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? **Component + BFS Expansion** — two-phase Day 8 variant.

- **Phase 1 (DFS):** Find any `1`, flood entire connected island, mark as `2`.
- **Phase 2 (BFS):** Enqueue every `2` cell. Expand layer-by-layer into `0`s (flip to `2`). When a neighbor is `1` (second island), return current `steps`.

If you're stuck after 5 minutes: don't BFS from one cell on the island — multi-source BFS from the **whole** marked island boundary in phase 2.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Component + BFS Expansion

**How to identify this from the problem statement:**
- Exactly two islands → find one, expand to the other
- Flip water (`0`) during BFS — each flip = 1 bridge step
- Shortest connection → BFS layers in phase 2

| Keyword / phrase | What it signals |
|---|---|
| "shortest bridge" | Min 0-cells to connect islands |
| "two islands" | One DFS component + BFS to next |
| "change 0s to 1" | BFS through water counting layers |
| "4-directionally" | 4 dirs in this problem |

**Why this pattern works:** Phase 1 identifies island A. Phase 2 grows outward uniformly — first touch of island B is minimum water cells to bridge.

**How a strong solver thinks before coding:**
1. *"Find first 1, dfs mark entire island as 2."*
2. *"Enqueue all cells with value 2."*
3. *"BFS: expand to 0 (mark 2, enqueue) or 1 (return steps)."*
4. *"steps++ after each BFS layer."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **BFS from every cell on island A** | Redundant — one multi-source BFS from all 2s |
| **Try all bridge placements** | Exponential |
| **DFS through water** | Doesn't guarantee shortest bridge |
| **Skip marking full island in phase 1** | Incomplete frontier for phase 2 |

**The insight brute force misses:** Mark island A once; **multi-source BFS** from its entire shape beats cell-by-cell search.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Shortest Path in Binary Matrix #1091](https://leetcode.com/problems/shortest-path-in-binary-matrix/) | Pure point-to-point BFS | Phase 2 only |
| [01 Matrix #542](https://leetcode.com/problems/01-matrix/) | Multi-source from 0s, no DFS phase | Related wave idea |
| [Island Perimeter #463](https://leetcode.com/problems/island-perimeter/) | Count boundary edges | Component thinking |

---

## 📖 Walkthrough

**Phase 1: DFS mark → Phase 2: BFS expand.**

```
grid:           After DFS (island A → 2):
1 1 0 0 0       2 2 0 0 0
1 0 0 0 0  →    2 0 0 0 0
0 0 0 1 1       0 0 0 1 1   (island B still 1)

Phase 2 queue: all 2 cells
Layer 0: expand to adjacent 0s → mark 2
Layer 1, 2, ... until neighbor is 1 → return steps
```

```
mark(r,c): grid[r][c]=2; dfs to neighbor 1s
BFS:
  while q:
    process layer
    for each 0 neighbor: grid=2, enqueue
    for each 1 neighbor: return steps
    steps++
```

> 💡 **The insight:** Phase 1 is Day 4 flood fill; Phase 2 is Day 8 step BFS — hybrid on one grid.

---

## Solution

### C++
```cpp
class Solution {
    int m, n, dirs[4][2] = {{1,0},{-1,0},{0,1},{0,-1}};
    void mark(vector<vector<int>>& g, int r, int c) {
        g[r][c] = 2;
        for (auto& d : dirs) {
            int nr = r + d[0], nc = c + d[1];
            if (nr >= 0 && nc >= 0 && nr < m && nc < n && g[nr][nc] == 1)
                mark(g, nr, nc);
        }
    }
public:
    int shortestBridge(vector<vector<int>>& grid) {
        m = grid.size(); n = grid[0].size();
        queue<pair<int,int>> q;
        bool found = false;
        for (int i = 0; i < m && !found; i++)
            for (int j = 0; j < n; j++)
                if (grid[i][j] == 1) { mark(grid, i, j); found = true; break; }
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                if (grid[i][j] == 2) q.push({i, j});
        int steps = 0;
        while (!q.empty()) {
            int sz = q.size();
            while (sz--) {
                auto [r,c] = q.front(); q.pop();
                for (auto& d : dirs) {
                    int nr = r + d[0], nc = c + d[1];
                    if (nr < 0 || nc < 0 || nr >= m || nc >= n || grid[nr][nc] == 2) continue;
                    if (grid[nr][nc] == 1) return steps;
                    grid[nr][nc] = 2;
                    q.push({nr, nc});
                }
            }
            steps++;
        }
        return -1;
    }
};
```

### Python
```python
class Solution:
    def shortestBridge(self, grid: List[List[int]]) -> int:
        m, n = len(grid), len(grid[0])
        def mark(r, c):
            grid[r][c] = 2
            for dr, dc in ((1,0),(-1,0),(0,1),(0,-1)):
                nr, nc = r + dr, c + dc
                if 0 <= nr < m and 0 <= nc < n and grid[nr][nc] == 1:
                    mark(nr, nc)
        for i in range(m):
            for j in range(n):
                if grid[i][j] == 1:
                    mark(i, j)
                    break
            else: continue
            break
        q = deque((i, j) for i in range(m) for j in range(n) if grid[i][j] == 2)
        steps = 0
        while q:
            for _ in range(len(q)):
                r, c = q.popleft()
                for dr, dc in ((1,0),(-1,0),(0,1),(0,-1)):
                    nr, nc = r + dr, c + dc
                    if 0 <= nr < m and 0 <= nc < n and grid[nr][nc] != 2:
                        if grid[nr][nc] == 1: return steps
                        grid[nr][nc] = 2
                        q.append((nr, nc))
            steps += 1
        return -1
```

### Java
```java
class Solution {
    private int m, n;
    public int shortestBridge(int[][] grid) {
        m = grid.length; n = grid[0].length;
        Queue<int[]> q = new ArrayDeque<>();
        outer:
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                if (grid[i][j] == 1) { mark(grid, i, j); break outer; }
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                if (grid[i][j] == 2) q.offer(new int[]{i, j});
        int steps = 0;
        int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};
        while (!q.isEmpty()) {
            int sz = q.size();
            for (int k = 0; k < sz; k++) {
                int[] cur = q.poll();
                for (int[] d : dirs) {
                    int nr = cur[0] + d[0], nc = cur[1] + d[1];
                    if (nr < 0 || nc < 0 || nr >= m || nc >= n || grid[nr][nc] == 2) continue;
                    if (grid[nr][nc] == 1) return steps;
                    grid[nr][nc] = 2;
                    q.offer(new int[]{nr, nc});
                }
            }
            steps++;
        }
        return -1;
    }
    private void mark(int[][] grid, int r, int c) {
        grid[r][c] = 2;
        int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};
        for (int[] d : dirs) {
            int nr = r + d[0], nc = c + d[1];
            if (nr >= 0 && nc >= 0 && nr < m && nc < n && grid[nr][nc] == 1)
                mark(grid, nr, nc);
        }
    }
}
```

**Complexity:** O(n²) time · O(n²) space
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Two islands"** → DFS one, BFS to the other.
- **"Mark as 2"** → Separates island A from B during expansion.
- **"Multi-source phase 2"** → Queue **all** 2s, not one corner cell.
- **"Return steps when hitting 1"** → Day 8 shortest path through water.

> 🎯 **Pattern Unlocked:** Component + BFS Expansion — find island, expand bridge layers.

---

*Both quests complete. Head to the checkpoint. →*
