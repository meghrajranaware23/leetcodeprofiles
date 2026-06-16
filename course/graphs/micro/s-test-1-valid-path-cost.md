<!-- hand-authored -->
# ⚔ S-Rank Test — Problem 1

> [Minimum Cost to Make at Least One Valid Path in a Grid #1368](https://leetcode.com/problems/minimum-cost-to-make-at-least-one-valid-path-in-a-grid/) · Hard · 300 XP

---

You've completed your S-Rank training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Minimum Cost to Make at Least One Valid Path in a Grid on LeetCode](https://leetcode.com/problems/minimum-cost-to-make-at-least-one-valid-path-in-a-grid/)**

> ⚔ **Hunter's rule:** This is a rank test — treat it like real interview practice. Grid cells have forced directions; changing costs 1. **0-1 BFS** with deque — free moves front, paid moves back.

---

## The Problem

See the full problem statement on LeetCode: **[Minimum Cost to Make at Least One Valid Path in a Grid #1368](https://leetcode.com/problems/minimum-cost-to-make-at-least-one-valid-path-in-a-grid/)**

---

## 💡 Hints

> 🎯 **What's being tested:** **0-1 BFS** (Day 8 BFS + Day 20 cost idea) — not plain Dijkstra heap.

- Each cell `grid[r][c]` points in one direction (1=right, 2=left, 3=down, 4=up).
- Moving **with** the arrow costs 0; changing direction costs 1.
- Deque BFS: if cost 0 → `push_front`; if cost 1 → `push_back`.
- `dist[r][c]` = min changes to reach cell; answer = `dist[m-1][n-1]`.

**Pattern name before coding:** *0-1 BFS deque — weighted BFS with only 0/1 edge costs.*

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** 0-1 BFS (Deque Shortest Path)

**How to identify from the statement:**
- Grid shortest path with modification cost 0 or 1
- Only two edge weights → deque beats Dijkstra heap
- "Minimum cost to make valid path" → treat as weighted grid BFS

**How a strong solver thinks before coding:**
1. *"Costs only 0 and 1?"* → 0-1 BFS, not generic Dijkstra.
2. *"Follow arrow = 0; any other direction = +1."*
3. *"Deque: 0-cost front, 1-cost back."*
4. *"dist[][] like Day 8, relax like Day 19."*

**S-Rank connection:** Decision tree → grid → shortest path → weights only 0/1 → **0-1 BFS**.

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Plain BFS treating all moves equal** | Ignores 0 vs 1 cost distinction |
| **Dijkstra heap** | Works but O(mn log mn) — deque is O(mn) |
| **DFS** | No shortest-path guarantee |
| **Try all change subsets** | Exponential |
| **BFS without dist relax** | Must update if cheaper path found |

---

## 🎯 Transfer to Unseen Problems

*"Shortest path where some edges cost 0 and others cost 1."*

Always check for **0-1 BFS** before reaching for a heap. Same family as [Sliding Puzzle](https://leetcode.com/problems/sliding-puzzle/) with move costs.

Reference: **Day 8** BFS skeleton + **Day 20** cost relaxation.

---

<details>
<summary><strong>📖 Solution & Walkthrough</strong></summary>

Trace the pattern on the example graph from the problem statement. Then implement the traversal skeleton you identified.

### C++
```cpp
class Solution {
public:
    int minCost(vector<vector<int>>& grid) {
        int m = grid.size(), n = grid[0].size();
        vector<vector<int>> dist(m, vector<int>(n, INT_MAX));
        deque<pair<int,int>> dq;
        dist[0][0] = 0;
        dq.push_front({0, 0});
        int dirs[4][2] = {{1,0},{-1,0},{0,1},{0,-1}};
        while (!dq.empty()) {
            auto [r, c] = dq.front(); dq.pop_front();
            for (int d = 0; d < 4; d++) {
                int nr = r + dirs[d][0], nc = c + dirs[d][1];
                if (nr < 0 || nc < 0 || nr >= m || nc >= n) continue;
                int cost = dist[r][c] + (grid[r][c] != d + 1);
                if (cost < dist[nr][nc]) {
                    dist[nr][nc] = cost;
                    if (grid[r][c] == d + 1) dq.push_front({nr, nc});
                    else dq.push_back({nr, nc});
                }
            }
        }
        return dist[m-1][n-1];
    }
};
```

### Python
```python
class Solution:
    def minCost(self, grid: List[List[int]]) -> int:
        m, n = len(grid), len(grid[0])
        dist = [[float('inf')] * n for _ in range(m)]
        dq = deque([(0, 0)])
        dist[0][0] = 0
        dirs = [(1,0),(-1,0),(0,1),(0,-1)]
        while dq:
            r, c = dq.popleft()
            for d, (dr, dc) in enumerate(dirs):
                nr, nc = r + dr, c + dc
                if 0 <= nr < m and 0 <= nc < n:
                    cost = dist[r][c] + (grid[r][c] != d + 1)
                    if cost < dist[nr][nc]:
                        dist[nr][nc] = cost
                        if grid[r][c] == d + 1:
                            dq.appendleft((nr, nc))
                        else:
                            dq.append((nr, nc))
        return dist[-1][-1]
```

### Java
```java
class Solution {
    public int minCost(int[][] grid) {
        int m = grid.length, n = grid[0].length;
        int[][] dist = new int[m][n];
        for (int[] row : dist) Arrays.fill(row, Integer.MAX_VALUE);
        Deque<int[]> dq = new ArrayDeque<>();
        dist[0][0] = 0;
        dq.offerFirst(new int[]{0, 0});
        int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};
        while (!dq.isEmpty()) {
            int[] cur = dq.pollFirst();
            for (int d = 0; d < 4; d++) {
                int nr = cur[0] + dirs[d][0], nc = cur[1] + dirs[d][1];
                if (nr < 0 || nc < 0 || nr >= m || nc >= n) continue;
                int cost = dist[cur[0]][cur[1]] + (grid[cur[0]][cur[1]] != d + 1 ? 1 : 0);
                if (cost < dist[nr][nc]) {
                    dist[nr][nc] = cost;
                    if (grid[cur[0]][cur[1]] == d + 1) dq.offerFirst(new int[]{nr, nc});
                    else dq.offerLast(new int[]{nr, nc});
                }
            }
        }
        return dist[m - 1][n - 1];
    }
}
```

**Complexity:** O(m · n) time · O(m · n) space

</details>

---

## 💭 What Should Have Clicked in Your Mind?

- **"Minimum changes to follow valid directions"** → 0/1 edge costs on grid.
- **0-1 BFS deque** — not Day 19 heap when weights are only 0 and 1.
- **Follow arrow = free (push front)** — change direction = paid (push back).
- **Decision tree:** grid → shortest path → two weights → 0-1 BFS.

---

*1 of 3 test problems. Continue to the next. →*

## Solution

### C++
```cpp
class Solution {
public:
    int minCost(vector<vector<int>>& grid) {
        int m = grid.size(), n = grid[0].size();
        vector<vector<int>> dist(m, vector<int>(n, INT_MAX));
        deque<pair<int,int>> dq;
        dist[0][0] = 0;
        dq.push_front({0, 0});
        int dirs[4][2] = {{1,0},{-1,0},{0,1},{0,-1}};
        while (!dq.empty()) {
            auto [r, c] = dq.front(); dq.pop_front();
            for (int d = 0; d < 4; d++) {
                int nr = r + dirs[d][0], nc = c + dirs[d][1];
                if (nr < 0 || nc < 0 || nr >= m || nc >= n) continue;
                int cost = dist[r][c] + (grid[r][c] != d + 1);
                if (cost < dist[nr][nc]) {
                    dist[nr][nc] = cost;
                    if (grid[r][c] == d + 1) dq.push_front({nr, nc});
                    else dq.push_back({nr, nc});
                }
            }
        }
        return dist[m-1][n-1];
    }
};
```

### Python
```python
class Solution:
    def minCost(self, grid: List[List[int]]) -> int:
        m, n = len(grid), len(grid[0])
        dist = [[float('inf')] * n for _ in range(m)]
        dq = deque([(0, 0)])
        dist[0][0] = 0
        dirs = [(1,0),(-1,0),(0,1),(0,-1)]
        while dq:
            r, c = dq.popleft()
            for d, (dr, dc) in enumerate(dirs):
                nr, nc = r + dr, c + dc
                if 0 <= nr < m and 0 <= nc < n:
                    cost = dist[r][c] + (grid[r][c] != d + 1)
                    if cost < dist[nr][nc]:
                        dist[nr][nc] = cost
                        if grid[r][c] == d + 1:
                            dq.appendleft((nr, nc))
                        else:
                            dq.append((nr, nc))
        return dist[-1][-1]
```

### Java
```java
class Solution {
    public int minCost(int[][] grid) {
        int m = grid.length, n = grid[0].length;
        int[][] dist = new int[m][n];
        for (int[] row : dist) Arrays.fill(row, Integer.MAX_VALUE);
        Deque<int[]> dq = new ArrayDeque<>();
        dist[0][0] = 0;
        dq.offerFirst(new int[]{0, 0});
        int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};
        while (!dq.isEmpty()) {
            int[] cur = dq.pollFirst();
            for (int d = 0; d < 4; d++) {
                int nr = cur[0] + dirs[d][0], nc = cur[1] + dirs[d][1];
                if (nr < 0 || nc < 0 || nr >= m || nc >= n) continue;
                int cost = dist[cur[0]][cur[1]] + (grid[cur[0]][cur[1]] != d + 1 ? 1 : 0);
                if (cost < dist[nr][nc]) {
                    dist[nr][nc] = cost;
                    if (grid[cur[0]][cur[1]] == d + 1) dq.offerFirst(new int[]{nr, nc});
                    else dq.offerLast(new int[]{nr, nc});
                }
            }
        }
        return dist[m - 1][n - 1];
    }
}
```

**Complexity:** O(m · n) time · O(m · n) space
