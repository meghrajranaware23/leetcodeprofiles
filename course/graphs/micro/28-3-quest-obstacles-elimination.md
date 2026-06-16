<!-- hand-authored -->
# ⚔ Quest: Shortest Path with Obstacles Elimination

> **Day 28** · [Shortest Path in a Grid with Obstacles Elimination #1293](https://leetcode.com/problems/shortest-path-in-a-grid-with-obstacles-elimination/) · Hard · 25 min · 60 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Shortest Path in a Grid with Obstacles Elimination on LeetCode](https://leetcode.com/problems/shortest-path-in-a-grid-with-obstacles-elimination/)**

> ⚔ **Hunter's rule:** Your node is `(r, c, k)` — row, column, eliminations left. Draw a small grid and trace states by hand. A 2D visited array is wrong here.

---

## The Problem

See the full problem statement on LeetCode: **[Shortest Path in a Grid with Obstacles Elimination #1293](https://leetcode.com/problems/shortest-path-in-a-grid-with-obstacles-elimination/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

**3D state BFS** — `(r, c, rem, dist)` where `rem` = obstacles you can still eliminate.

- Queue `(0, 0, k, 0)`; mark `vis[0][0][k] = true`.
- Stepping onto obstacle costs 1 from `rem`: `nrem = rem - grid[nr][nc]`.
- If `nrem < 0` → can't enter. If `vis[nr][nc][nrem]` → skip.
- Goal `(m-1, n-1)` → return `d`.

Not Day 8 `(r,c)` only — same cell with different `rem` is a different node.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** 3D State BFS

**How to identify this from the problem statement:**
- "Eliminate at most k obstacles" → budget dimension in state
- "Shortest path" on grid → BFS with step count
- Same cell reachable with different remaining k → 3D visited

| Keyword / phrase | What it signals |
|---|---|
| "eliminate" / "at most k obstacles" | State includes remaining budget |
| "shortest path" in grid | BFS, not DFS |
| Obstacle = 1, free = 0 | Pay 1 from rem when entering obstacle |
| Return -1 if impossible | BFS exhausts without reaching goal |

**Why this pattern works:** BFS on `(r,c,rem)` treats each triple as a distinct node. First visit to goal = minimum steps. `vis[r][c][rem]` prevents redundant queue work.

**How a strong solver thinks before coding:**
1. *"What's my state beyond (r,c)?"* → remaining eliminations `rem`.
2. *"vis must be 3D: vis[r][c][rem]."*
3. *"nrem = rem - grid[nr][nc]; skip if nrem < 0."*
4. *"Not Day 10 string state — spatial + counter."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **2D visited `[r][c]` only** | Misses path that needs different rem at same cell |
| **DFS** | Doesn't guarantee shortest steps |
| **Try all subsets of k obstacles to remove** | Exponential — BFS with state is O(m·n·k) |
| **Dijkstra** | Unweighted steps — plain BFS suffices |
| **BFS without tracking rem** | Can't distinguish "arrived with 0 left" vs "1 left" |

**The insight:** The obstacle budget is part of the **node identity**, not a post-hoc check.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Obstacles Elimination #1293](https://leetcode.com/problems/shortest-path-in-a-grid-with-obstacles-elimination/) | Grid + k budget | `(r,c,rem)` BFS |
| [Shortest Path in a Grid with Obstacles Elimination](https://leetcode.com/problems/shortest-path-in-a-grid-with-obstacles-elimination/) | Same | 3D vis |
| [Open the Lock #752](https://leetcode.com/problems/open-the-lock/) | Day 10 — string state | Different state shape, same BFS skeleton |

---

## 📖 Walkthrough

```
Grid (0=free, 1=obstacle), k=1:

  0  0  1
  0  1  0
  0  0  0

Start (0,0,k=1,d=0)
  → (0,1,k=1,d=1) free
  → (0,2,k=0,d=2) obstacle — used 1 elimination
  → (1,2,k=0,d=3)
  → (2,2,k=0,d=4) goal ✓

State (0,2,k=1) might also exist via another route —
that's separate from (0,2,k=0). Both can be in queue.
```

> 💡 **The insight:** Think of k+1 copies of the grid stacked — BFS across the stack.

---

## Solution

### C++
```cpp
class Solution {
public:
    int shortestPath(vector<vector<int>>& grid, int k) {
        int m = grid.size(), n = grid[0].size();
        vector<vector<vector<bool>>> vis(m, vector<vector<bool>>(n, vector<bool>(k + 1)));
        queue<tuple<int,int,int,int>> q;
        q.push({0, 0, k, 0});
        vis[0][0][k] = true;
        int dirs[4][2] = {{1,0},{-1,0},{0,1},{0,-1}};
        while (!q.empty()) {
            auto [r, c, rem, d] = q.front(); q.pop();
            if (r == m - 1 && c == n - 1) return d;
            for (auto& dr : dirs) {
                int nr = r + dr[0], nc = c + dr[1];
                if (nr < 0 || nc < 0 || nr >= m || nc >= n) continue;
                int nrem = rem - grid[nr][nc];
                if (nrem < 0 || vis[nr][nc][nrem]) continue;
                vis[nr][nc][nrem] = true;
                q.push({nr, nc, nrem, d + 1});
            }
        }
        return -1;
    }
};
```

### Python
```python
class Solution:
    def shortestPath(self, grid: List[List[int]], k: int) -> int:
        m, n = len(grid), len(grid[0])
        vis = [[[False] * (k + 1) for _ in range(n)] for _ in range(m)]
        q = deque([(0, 0, k, 0)])
        vis[0][0][k] = True
        while q:
            r, c, rem, d = q.popleft()
            if r == m - 1 and c == n - 1: return d
            for dr, dc in ((1,0),(-1,0),(0,1),(0,-1)):
                nr, nc = r + dr, c + dc
                if 0 <= nr < m and 0 <= nc < n:
                    nrem = rem - grid[nr][nc]
                    if nrem >= 0 and not vis[nr][nc][nrem]:
                        vis[nr][nc][nrem] = True
                        q.append((nr, nc, nrem, d + 1))
        return -1
```

### Java
```java
class Solution {
    public int shortestPath(int[][] grid, int k) {
        int m = grid.length, n = grid[0].length;
        boolean[][][] vis = new boolean[m][n][k + 1];
        Queue<int[]> q = new ArrayDeque<>();
        q.offer(new int[]{0, 0, k, 0});
        vis[0][0][k] = true;
        int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};
        while (!q.isEmpty()) {
            int[] cur = q.poll();
            if (cur[0] == m - 1 && cur[1] == n - 1) return cur[3];
            for (int[] d : dirs) {
                int nr = cur[0] + d[0], nc = cur[1] + d[1];
                if (nr < 0 || nc < 0 || nr >= m || nc >= n) continue;
                int nrem = cur[2] - grid[nr][nc];
                if (nrem < 0 || vis[nr][nc][nrem]) continue;
                vis[nr][nc][nrem] = true;
                q.offer(new int[]{nr, nc, nrem, cur[3] + 1});
            }
        }
        return -1;
    }
}
```

**Complexity:** O(m · n · k) time · O(m · n · k) space
---

## 💭 What Should Have Clicked in Your Mind?

- **"At most k obstacles"** → `rem` in every queue entry and visited cell.
- **"Same (r,c) twice with different rem"** → both valid, both needed.
- **"Shortest path"** → BFS on expanded state graph, not DFS.
- **vis[r][c][rem]** — three indices, not two.

> 🎯 **Pattern Unlocked:** 3D State BFS

---

*Both quests complete. Head to the checkpoint. →*
