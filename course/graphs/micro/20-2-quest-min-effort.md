<!-- hand-authored -->
# ⚔ Quest: Path With Minimum Effort

> **Day 20** · [Path With Minimum Effort #1631](https://leetcode.com/problems/path-with-minimum-effort/) · Medium · 15 min · 35 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Path With Minimum Effort on LeetCode](https://leetcode.com/problems/path-with-minimum-effort/)**

> ⚔ **Hunter's rule:** Grid Dijkstra — heap `(effort, r, c)`. Edge cost to neighbor = abs height diff; path cost = max edge on path so far.

---

## The Problem

See the full problem statement on LeetCode: **[Path With Minimum Effort #1631](https://leetcode.com/problems/path-with-minimum-effort/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? **Dijkstra on grid** — same heap skeleton as Day 19, but relax with `ne = max(eff, abs(heights[r][c] - heights[nr][nc]))`.

First time you pop `(effort, m-1, n-1)` → return effort. Not BFS — edge costs vary.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Dijkstra on Grid

**How to identify this from the problem statement:**
- Grid shortest path with **non-uniform** step cost
- Minimize **maximum** absolute height difference along path (bottleneck)
- 4-directional movement

| Keyword / phrase | What it signals |
|---|---|
| "minimum effort" / "minimum maximum difference" | Grid Dijkstra, max-edge relax |
| "heights matrix" | Cells = nodes; 4 neighbors |
| "minimum steps" | BFS — not this |
| "network delay" sum of weights | Sum Dijkstra — this uses **max** |

**Why this pattern works:** Bottleneck path cost is monotonic along relaxation — Dijkstra with custom edge weight still applies (non-negative "effort").

**How a strong solver thinks before coding:**
1. *"dist[r][c]=INF; dist[0][0]=0; push (0,0,0)."*
2. *"Pop; if at (m-1,n-1) return eff; stale skip."*
3. *"4 dirs: ne = max(eff, |h[r][c]-h[nr][nc]|)."*
4. *"If ne < dist[nr][nc]: update + push."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **BFS** | Treats all moves equal — wrong metric |
| **Day 19 sum Dijkstra** | Must use max, not sum of diffs |
| **DFS all paths** | Exponential |
| **Binary search effort + BFS check** | Valid alternate — Dijkstra direct |

**The insight brute force misses:** Day 19 heap on `(dist, node)` becomes `(effort, r, c)` on a grid — contrast plain Dijkstra's sum relax.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Network Delay Time #743](https://leetcode.com/problems/network-delay-time/) | Sum of weights | Min-heap Dijkstra |
| [Swim in Rising Water #778](https://leetcode.com/problems/swim-in-rising-water/) | Threshold BFS / Dijkstra | Max-edge path |
| [Cheapest Flights #787](https://leetcode.com/problems/cheapest-flights-within-k-stops/) | Stop constraint | Bellman-Ford — not grid Dijkstra |

Same heap loop — **different relax formula.**

---

## 📖 Walkthrough

```
heights:
  1 2 2
  3 8 2
  5 3 5

From (0,0) effort 0:
  → (0,1): max(0,|1-2|)=1
  → (1,0): max(0,|1-3|)=2
Best path to (2,2) minimizes worst single step on route
Trace heap pops until bottom-right finalized
```

> 💡 **The insight:** The grid is an implicit graph — Dijkstra doesn't care if nodes are integers or `(r,c)` pairs.

---

## Solution

### C++
```cpp
class Solution {
public:
    int minimumEffortPath(vector<vector<int>>& heights) {
        int m = heights.size(), n = heights[0].size();
        vector<vector<int>> dist(m, vector<int>(n, INT_MAX));
        priority_queue<tuple<int,int,int>, vector<tuple<int,int,int>>, greater<>> pq;
        pq.push({0, 0, 0});
        dist[0][0] = 0;
        int dirs[4][2] = {{1,0},{-1,0},{0,1},{0,-1}};
        while (!pq.empty()) {
            auto [eff, r, c] = pq.top(); pq.pop();
            if (r == m - 1 && c == n - 1) return eff;
            if (eff > dist[r][c]) continue;
            for (auto& d : dirs) {
                int nr = r + d[0], nc = c + d[1];
                if (nr < 0 || nc < 0 || nr >= m || nc >= n) continue;
                int ne = max(eff, abs(heights[r][c] - heights[nr][nc]));
                if (ne < dist[nr][nc]) {
                    dist[nr][nc] = ne;
                    pq.push({ne, nr, nc});
                }
            }
        }
        return 0;
    }
};
```

### Python
```python
class Solution:
    def minimumEffortPath(self, heights: List[List[int]]) -> int:
        m, n = len(heights), len(heights[0])
        dist = [[float('inf')] * n for _ in range(m)]
        pq = [(0, 0, 0)]
        dist[0][0] = 0
        while pq:
            eff, r, c = heapq.heappop(pq)
            if r == m - 1 and c == n - 1: return eff
            if eff > dist[r][c]: continue
            for dr, dc in ((1,0),(-1,0),(0,1),(0,-1)):
                nr, nc = r + dr, c + dc
                if 0 <= nr < m and 0 <= nc < n:
                    ne = max(eff, abs(heights[r][c] - heights[nr][nc]))
                    if ne < dist[nr][nc]:
                        dist[nr][nc] = ne
                        heapq.heappush(pq, (ne, nr, nc))
        return 0
```

### Java
```java
class Solution {
    public int minimumEffortPath(int[][] heights) {
        int m = heights.length, n = heights[0].length;
        int[][] dist = new int[m][n];
        for (int[] row : dist) Arrays.fill(row, Integer.MAX_VALUE);
        PriorityQueue<int[]> pq = new PriorityQueue<>(Comparator.comparingInt(a -> a[0]));
        pq.offer(new int[]{0, 0, 0});
        dist[0][0] = 0;
        int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};
        while (!pq.isEmpty()) {
            int[] cur = pq.poll();
            if (cur[1] == m - 1 && cur[2] == n - 1) return cur[0];
            if (cur[0] > dist[cur[1]][cur[2]]) continue;
            for (int[] d : dirs) {
                int nr = cur[1] + d[0], nc = cur[2] + d[1];
                if (nr < 0 || nc < 0 || nr >= m || nc >= n) continue;
                int ne = Math.max(cur[0], Math.abs(heights[cur[1]][cur[2]] - heights[nr][nc]));
                if (ne < dist[nr][nc]) {
                    dist[nr][nc] = ne;
                    pq.offer(new int[]{ne, nr, nc});
                }
            }
        }
        return 0;
    }
}
```

**Complexity:** O(m · n log(m · n)) time · O(m · n) space
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Minimize max step height"** → bottleneck Dijkstra on grid.
- **"Not Day 19 sum"** → relax with max(eff, edgeDiff).
- **"Heap (effort, r, c)"** → same stale skip as Network Delay.
- **"Not BFS"** → weighted cells need priority queue.

If you summed height diffs, you'd solve a different problem.

> 🎯 **Pattern Unlocked:** Dijkstra on Grid

---

*One quest down. Next: K stops — layered relax, not heap. →*
