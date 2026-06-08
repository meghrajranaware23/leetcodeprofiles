# ⚔ S-Rank Test — Problem 1

> [Minimum Cost to Make at Least One Valid Path in a Grid #1368](https://leetcode.com/problems/minimum-cost-to-make-at-least-one-valid-path-in-a-grid/) · Hard · 300 XP

---

You've completed your S-Rank training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Minimum Cost to Make at Least One Valid Path in a Grid on LeetCode](https://leetcode.com/problems/minimum-cost-to-make-at-least-one-valid-path-in-a-grid/)**

> ⚔ **Hunter's rule:** This is a rank test — treat it like real interview practice. Draw the graph. Trace the traversal. No peeking until you've genuinely tried.

---

## The Problem

See the full problem statement on LeetCode: **[Minimum Cost to Make at Least One Valid Path in a Grid #1368](https://leetcode.com/problems/minimum-cost-to-make-at-least-one-valid-path-in-a-grid/)**

---

## 💡 Hints

> 🎯 **What's being tested:** Pattern recognition from the S-Rank curriculum. Name the pattern before you code.

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

- **"This is a S-Rank test"** → Use patterns from this rank's training.
- **"Draw first, code second"** → Visual tracing beats guessing.
- **"Name the pattern"** → The code is just the template filled in.

---

*1 of 3 test problems. Continue to the next. →*
