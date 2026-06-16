<!-- hand-authored -->
# ⚔ Quest: 01 Matrix

> **Day 6** · [01 Matrix #542](https://leetcode.com/problems/01-matrix/) · Medium · 15 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open 01 Matrix on LeetCode](https://leetcode.com/problems/01-matrix/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. Mark every 0 on the grid, seed them all in the queue at dist=0, then trace one BFS wave. The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[01 Matrix #542](https://leetcode.com/problems/01-matrix/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? **Multi-source BFS** — enqueue **every 0** with distance 0; expand to neighbors; write `dist[nr][nc] = dist[r][c] + 1` on first visit.

If you're stuck after 5 minutes: don't BFS from each 1 toward a 0. Flip the question — "nearest 0" means **all 0s are sources**. Contrast Day 2: one start vs today: many starts, one wave.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Multi-Source BFS

**How to identify this from the problem statement:**
- Output is a **full distance matrix** → fill every cell in one pass
- "Nearest 0" → sources are 0-cells, not 1-cells
- Unweighted grid → BFS layers, not Dijkstra

| Keyword / phrase | What it signals |
|---|---|
| "distance to nearest 0" | Multi-source from all 0s |
| "return updated matrix" | `dist` array, -1 = unvisited |
| "4-directionally adjacent" | Standard grid neighbors |
| "each 1 cell" needs answer | Every 1 reached by the wave |

**Why this pattern works:** The first time the wave touches a 1, that layer number is the shortest path to **some** 0 — and BFS guarantees it's the nearest.

**How a strong solver thinks before coding:**
1. *"Sources = all (i,j) where mat[i][j]==0."*
2. *"dist[i][j]=0 for sources, -1 elsewhere."*
3. *"One queue, dequeue, 4 neighbors, skip if dist != -1."*
4. *"Return dist — don't mutate mat unless you prefer in-place marking."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **BFS from each 1 to nearest 0** | O(cells²) — one BFS per 1-cell |
| **Day 2 loop: BFS from each 0 separately** | Redundant — merge into multi-source |
| **DFS from each cell** | No shortest-distance guarantee |
| **Dynamic programming without BFS order** | Hard to get correct nearest-0 without wave |

**The insight brute force misses:** Nearest-0 is a **multi-source** problem. Seed all 0s once; the wave does the rest.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [As Far from Land as Possible #1162](https://leetcode.com/problems/as-far-from-land-as-possible/) | Sources = land (1s); track max layer | Multi-source from all 1s |
| [Map of Highest Peak #1765](https://leetcode.com/problems/map-of-highest-peak/) | Sources = water; build height map | Multi-source from all water |
| [Rotting Oranges #994](https://leetcode.com/problems/rotting-oranges/) | Sources = rotten; time layers | Multi-source BFS (Day 2 preview) |

Same init: **enqueue every source before the while loop.**

---

## 📖 Walkthrough

**Seed all zeros; wave assigns distances.**

```
mat:       Step 0 — queue all 0s, dist=0:
0 0 0      dist:  0  0  0
0 1 0              0 -1  0
1 1 1             -1 -1 -1

Layer 1: neighbors of 0s → dist=1
Layer 2: (2,0) and (2,1) get dist=2
(2,2) stays unreachable? No — reached at dist=2 from (1,2) or (2,1)

Trace: each 1 gets the layer number when first dequeued neighbor assigns it.
```

```
[r,c] dequeued → for each (nr,nc):
  if dist[nr][nc] == -1:
    dist[nr][nc] = dist[r][c] + 1
    enqueue (nr, nc)
```

> 💡 **The insight:** You're not finding one path — you're painting the whole grid with nearest-0 distances in one synchronized flood.

---

## Solution

### C++
```cpp
class Solution {
public:
    vector<vector<int>> updateMatrix(vector<vector<int>>& mat) {
        int m = mat.size(), n = mat[0].size();
        queue<pair<int,int>> q;
        vector<vector<int>> dist(m, vector<int>(n, -1));
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                if (!mat[i][j]) { q.push({i,j}); dist[i][j] = 0; }
        int dirs[4][2] = {{1,0},{-1,0},{0,1},{0,-1}};
        while (!q.empty()) {
            auto [r,c] = q.front(); q.pop();
            for (auto& d : dirs) {
                int nr = r + d[0], nc = c + d[1];
                if (nr >= 0 && nc >= 0 && nr < m && nc < n && dist[nr][nc] == -1) {
                    dist[nr][nc] = dist[r][c] + 1;
                    q.push({nr, nc});
                }
            }
        }
        return dist;
    }
};
```

### Python
```python
class Solution:
    def updateMatrix(self, mat: List[List[int]]) -> List[List[int]]:
        m, n = len(mat), len(mat[0])
        dist = [[-1] * n for _ in range(m)]
        q = deque()
        for i in range(m):
            for j in range(n):
                if mat[i][j] == 0:
                    dist[i][j] = 0
                    q.append((i, j))
        while q:
            r, c = q.popleft()
            for dr, dc in ((1,0),(-1,0),(0,1),(0,-1)):
                nr, nc = r + dr, c + dc
                if 0 <= nr < m and 0 <= nc < n and dist[nr][nc] == -1:
                    dist[nr][nc] = dist[r][c] + 1
                    q.append((nr, nc))
        return dist
```

### Java
```java
class Solution {
    public int[][] updateMatrix(int[][] mat) {
        int m = mat.length, n = mat[0].length;
        int[][] dist = new int[m][n];
        Queue<int[]> q = new ArrayDeque<>();
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                if (mat[i][j] == 0) { dist[i][j] = 0; q.offer(new int[]{i, j}); }
                else dist[i][j] = -1;
        int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};
        while (!q.isEmpty()) {
            int[] cur = q.poll();
            for (int[] d : dirs) {
                int nr = cur[0] + d[0], nc = cur[1] + d[1];
                if (nr >= 0 && nc >= 0 && nr < m && nc < n && dist[nr][nc] == -1) {
                    dist[nr][nc] = dist[cur[0]][cur[1]] + 1;
                    q.offer(new int[]{nr, nc});
                }
            }
        }
        return dist;
    }
}
```

**Complexity:** O(m · n) time · O(m · n) space
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Nearest 0 for every cell"** → Multi-source, not BFS from each 1.
- **"All 0s in queue at start"** → dist=0; `-1` means unvisited.
- **"First assignment wins"** → BFS layer = shortest steps.
- **"Not Day 2 single-source"** → One wave from many fires, not many separate floods.

If you tried BFS from each 1, flip the sources — that's the Day 6 breakthrough.

> 🎯 **Pattern Unlocked:** Multi-Source BFS — seed all zeros, fill the dist matrix.

---

*One quest down. Next: same pattern, sources are land cells. →*
