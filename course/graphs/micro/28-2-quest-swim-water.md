<!-- hand-authored -->
# ⚔ Quest: Swim in Rising Water

> **Day 28** · [Swim in Rising Water #778](https://leetcode.com/problems/swim-in-rising-water/) · Hard · 25 min · 50 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Swim in Rising Water on LeetCode](https://leetcode.com/problems/swim-in-rising-water/)**

> ⚔ **Hunter's rule:** Binary search the answer (water level T). For each T, BFS: can you walk only on cells with value ≤ T? Draw the grid and trace can(T) by hand before coding.

---

## The Problem

See the full problem statement on LeetCode: **[Swim in Rising Water #778](https://leetcode.com/problems/swim-in-rising-water/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

**Binary search on T + BFS feasibility** — not Dijkstra, not plain Day 8 BFS.

- Answer = minimum time `T` when water level equals cell elevation.
- `can(T)`: BFS from `(0,0)` visiting only cells with `grid[r][c] ≤ T`.
- If `can(T)` → try smaller T (`hi = mid`); else `lo = mid + 1`.
- Lower bound: `lo = max(grid[0][0], grid[m-1][n-1])` — start and end must be enterable.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Binary Search + BFS Feasibility

**How to identify this from the problem statement:**
- "Minimum time" until you can swim → search the **time/level** answer
- At time T, only cells with elevation ≤ T are passable → monotone feasibility
- Shortest path inside each check → BFS (unweighted once threshold fixed)

| Keyword / phrase | What it signals |
|---|---|
| "swim" / "rising water" / "elevation" | Threshold T controls which cells open |
| "minimum time to reach" | Binary search T, not direct BFS |
| Grid + passable if value ≤ T | can(T) = flood-fill BFS |
| Implicit max on path | Minimize the maximum cell value along route |

**Why this pattern works:** `can(T)` is monotone — if path exists at T, it exists at any T' ≥ T. Binary search finds the smallest feasible T in O(n² log max) instead of O(n² · max).

**How a strong solver thinks before coding:**
1. *"Am I minimizing a threshold or minimizing steps?"* → threshold → binary search.
2. *"can(T) = BFS with grid[r][c] ≤ T."*
3. *"lo = max(start, end); hi = max grid value."*
4. *"Not Dijkstra — each can(T) is yes/no BFS."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Try every T from 0 to max linearly** | O(n² · max) — binary search → O(n² log max) |
| **Dijkstra treating elevation as edge weight** | Possible but harder — binary search + BFS is cleaner |
| **Plain BFS without threshold search** | No single BFS pass gives the min-max path |
| **can(T) with DFS** | Works for feasibility but BFS is natural for grid flood |
| **lo = 0 ignoring endpoints** | Start/end cells must satisfy T ≥ their elevation |

**The insight:** Separate **search for answer** (binary search) from **check feasibility** (BFS).

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Swim in Rising Water #778](https://leetcode.com/problems/swim-in-rising-water/) | Grid elevation threshold | Binary search + BFS |
| [Path With Minimum Effort #1631](https://leetcode.com/problems/path-with-minimum-effort/) | Day 20 — Dijkstra on max edge diff | Related min-max path |
| [Koko Eating Bananas](https://leetcode.com/problems/koko-eating-bananas/) (non-graph) | Same binary search skeleton | Monotone feasibility |

---

## 📖 Walkthrough

```
Grid:
  0  2
  1  3

Goal: (1,1), start (0,0)

can(T=1): cells ≤1 → (0,0),(1,0) only — can't reach (1,1) ✗
can(T=2): add (0,1) — still blocked ✗
can(T=3): all cells — path (0,0)→(1,0)→(1,1) ✓

Binary search: lo=3, hi=3 → answer 3

can(2) BFS trace:
  queue [(0,0)]  vis={(0,0)}
  → (1,0) val=1≤2 ✓, (0,1) val=2≤2 ✓
  from (0,1): (1,1) val=3>2 ✗ — stop, return false
```

> 💡 **The insight:** Outer loop binary-searches T. Inner loop is Day 8 BFS with a filter.

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

- **"Minimum time until water level allows crossing"** → binary search the time, not one BFS.
- **"Can I reach end if cells ≤ T are passable?"** → that's `can(T)` — monotone in T.
- **"Shortest path inside can(T)"** → BFS, but the outer loop is binary search.
- **Not Day 19 Dijkstra** — you're minimizing the threshold, not summing edge weights.

> 🎯 **Pattern Unlocked:** Binary Search + BFS

---

*One quest down. Next: obstacle elimination with `(r,c,k)` state. →*
