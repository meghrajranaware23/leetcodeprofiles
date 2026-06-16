<!-- hand-authored -->
# ⚔ Quest: Shortest Path in Binary Matrix

> **Day 8** · [Shortest Path in Binary Matrix #1091](https://leetcode.com/problems/shortest-path-in-binary-matrix/) · Medium · 15 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Shortest Path in Binary Matrix on LeetCode](https://leetcode.com/problems/shortest-path-in-binary-matrix/)**

> ⚔ **Hunter's rule:** BFS from (0,0). Track steps per **layer** or carry `(r,c,steps)`. Include **8 directions**. Return steps when you first reach (n-1,n-1). The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Shortest Path in Binary Matrix #1091](https://leetcode.com/problems/shortest-path-in-binary-matrix/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? **BFS Shortest Path** — unweighted grid, one start, one goal. Mark visited when entering a cell (`grid[r][c]=1`). Process queue **level-by-level** and increment `steps` after each layer (path length includes both endpoints).

If you're stuck after 5 minutes: not Day 6 — you don't need distances for every cell. Stop as soon as bottom-right is reached.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** BFS Shortest Path

**How to identify this from the problem statement:**
- "Shortest clear path" → BFS, not DFS
- Single start `(0,0)`, single goal `(n-1,n-1)`
- 8-directional movement → 8 neighbor offsets
- Return path **length** (cells in path), not move count only

| Keyword / phrase | What it signals |
|---|---|
| "shortest path" | BFS layers |
| "8-directionally" | Diagonal neighbors included |
| "path length" | Count cells — layer BFS matches examples |
| "0 = walkable" | Mark 1 when visited |

**Why this pattern works:** All edges cost 1 (including diagonals). BFS explores increasing path lengths; first goal hit is shortest.

**How a strong solver thinks before coding:**
1. *"If start or end is 1 → -1."*
2. *"n==1 → return 1."*
3. *"Queue (0,0), mark visited, steps=1 before loop or increment per layer."*
4. *"8 dirs; on reaching (n-1,n-1) return current steps."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **DFS backtracking all paths** | Exponential; may not find shortest first |
| **Day 6 dist matrix for all cells** | Works but wasteful — early exit at goal suffices |
| **4-direction only** | Wrong — problem allows diagonals |
| **Dijkstra** | Unnecessary for unit weights |

**The insight brute force misses:** One BFS wave with layer counting — stop at first goal.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Shortest Bridge #934](https://leetcode.com/problems/shortest-bridge/) | Two-phase: mark island + BFS | Step-count BFS expansion |
| [Nearest Exit from Entrance #1926](https://leetcode.com/problems/nearest-exit-from-entrance-in-maze/) | Goal = any border; `(r,c,steps)` | D-Rank test — Day 8 |
| [Word Ladder #127](https://leetcode.com/problems/word-ladder/) | Abstract states, not grid | Layer BFS (later ranks) |

---

## 📖 Walkthrough

**Layer BFS with 8 neighbors.**

```
3×3 grid (0=open):
0 0 0
0 1 0
0 0 0

steps=1: start (0,0) in queue
Layer at steps=2: cells distance 1 from start
...
First time (2,2) reached at steps=4 → return 4

8 dirs: (1,0),(-1,0),(0,1),(0,-1),(1,1),(1,-1),(-1,1),(-1,-1)
Skip if out of bounds or grid[nr][nc]==1
```

> 💡 **The insight:** `(r,c,steps)` tuple and layer counter are equivalent — today's solution uses layers with `steps++` after each full queue slice.

---

## Solution

### C++
```cpp
class Solution {
public:
    int shortestPathBinaryMatrix(vector<vector<int>>& grid) {
        int n = grid.size();
        if (grid[0][0] || grid[n-1][n-1]) return -1;
        if (n == 1) return 1;
        queue<pair<int,int>> q;
        q.push({0,0});
        grid[0][0] = 1;
        int dirs[8][2] = {{1,0},{-1,0},{0,1},{0,-1},{1,1},{1,-1},{-1,1},{-1,-1}};
        int steps = 1;
        while (!q.empty()) {
            int sz = q.size();
            steps++;
            while (sz--) {
                auto [r,c] = q.front(); q.pop();
                for (auto& d : dirs) {
                    int nr = r + d[0], nc = c + d[1];
                    if (nr < 0 || nc < 0 || nr >= n || nc >= n || grid[nr][nc]) continue;
                    if (nr == n - 1 && nc == n - 1) return steps;
                    grid[nr][nc] = 1;
                    q.push({nr, nc});
                }
            }
        }
        return -1;
    }
};
```

### Python
```python
class Solution:
    def shortestPathBinaryMatrix(self, grid: List[List[int]]) -> int:
        n = len(grid)
        if grid[0][0] or grid[-1][-1]: return -1
        if n == 1: return 1
        q = deque([(0, 0)])
        grid[0][0] = 1
        steps = 0
        dirs = [(1,0),(-1,0),(0,1),(0,-1),(1,1),(1,-1),(-1,1),(-1,-1)]
        while q:
            steps += 1
            for _ in range(len(q)):
                r, c = q.popleft()
                for dr, dc in dirs:
                    nr, nc = r + dr, c + dc
                    if 0 <= nr < n and 0 <= nc < n and not grid[nr][nc]:
                        if nr == n - 1 and nc == n - 1: return steps
                        grid[nr][nc] = 1
                        q.append((nr, nc))
        return -1
```

### Java
```java
class Solution {
    public int shortestPathBinaryMatrix(int[][] grid) {
        int n = grid.length;
        if (grid[0][0] == 1 || grid[n - 1][n - 1] == 1) return -1;
        if (n == 1) return 1;
        Queue<int[]> q = new ArrayDeque<>();
        q.offer(new int[]{0, 0});
        grid[0][0] = 1;
        int steps = 1;
        int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1},{1,1},{1,-1},{-1,1},{-1,-1}};
        while (!q.isEmpty()) {
            int sz = q.size();
            steps++;
            for (int k = 0; k < sz; k++) {
                int[] cur = q.poll();
                for (int[] d : dirs) {
                    int nr = cur[0] + d[0], nc = cur[1] + d[1];
                    if (nr < 0 || nc < 0 || nr >= n || nc >= n || grid[nr][nc] == 1) continue;
                    if (nr == n - 1 && nc == n - 1) return steps;
                    grid[nr][nc] = 1;
                    q.offer(new int[]{nr, nc});
                }
            }
        }
        return -1;
    }
}
```

**Complexity:** O(n²) time · O(n²) space
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Shortest clear path"** → BFS, not DFS.
- **"8-directional"** → 8 neighbor offsets, not 4.
- **"One goal cell"** → Stop early — not Day 6 full matrix.
- **"Layer steps = path length"** → Match problem's length definition.

> 🎯 **Pattern Unlocked:** BFS Shortest Path — layers until goal, 8-way grid.

---

*One quest down. Next: two phases — find island, then expand. →*
