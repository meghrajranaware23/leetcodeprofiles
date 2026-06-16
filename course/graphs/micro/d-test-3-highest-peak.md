<!-- hand-authored -->
# ⚔ D-Rank Test — Problem 3

> [Map of Highest Peak #1765](https://leetcode.com/problems/map-of-highest-peak/) · Medium · 100 XP

---

You've completed your D-Rank training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Map of Highest Peak on LeetCode](https://leetcode.com/problems/map-of-highest-peak/)**

> ⚔ **Hunter's rule:** This is a rank test — treat it like real interview practice. **Day 6 multi-source BFS** from all water cells. Fill a height matrix — not Day 8 single goal. No peeking until you've genuinely tried.

---

## The Problem

See the full problem statement on LeetCode: **[Map of Highest Peak #1765](https://leetcode.com/problems/map-of-highest-peak/)**

---

## 💡 Hints

> 🎯 **What's being tested:** **Day 6 multi-source BFS** — identical skeleton to 01 Matrix.

- **Sources:** every cell where `isWater[i][j] == 1` → enqueue with `height = 0`.
- **Dist matrix:** `height[][] = -1` unvisited; assign `height[nr][nc] = height[r][c] + 1` on first visit.
- Adjacent cells differ by at most 1 → BFS layers build valid elevation map.
- **NOT Day 8** — you fill the **entire** grid, not one shortest path.
- **NOT Day 2 single-source** — enqueue **all** water before the while loop.

**Pattern name before coding:** *Day 6 multi-source — seed all water, wave outward, return height matrix.*

---

## 🔍 Pattern Recognition Breakdown

**How to identify from the statement:**
- "Highest peak" on land given water at height 0 → distance from nearest water
- Output is full `m×n` matrix → multi-source dist fill
- Constraint "adjacent difference at most 1" → BFS layering is optimal
- Water cells = 0 height = BFS sources

**How a strong solver thinks before coding:**
1. *"Find all water → queue, height=0."*
2. *"height[][] = -1 elsewhere."*
3. *"Standard 4-dir BFS; first visit sets height."*
4. *"Same code as 01 Matrix with sources = water instead of 0."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **BFS from each land cell to nearest water** | O(cells²) — flip to multi-source from water |
| **Day 8 single-target BFS** | Need full matrix, not one answer |
| **Greedy per-cell height assignment** | BFS order ensures valid global map |
| **DFS** | Doesn't guarantee minimum-height valid assignment |

---

## 🎯 Transfer to Unseen Problems

Direct transfer from [01 Matrix #542](https://leetcode.com/problems/01-matrix/) — swap "0" for "water" and interpret dist as elevation. Day 6 checkpoint mini-challenge previewed this exact problem.

Reference: **Day 6** concept + 01 Matrix quest + Day 6 checkpoint.

---

<details>
<summary><strong>📖 Solution & Walkthrough</strong></summary>

Trace the pattern on the example graph from the problem statement. Then implement the traversal skeleton you identified.

### C++
```cpp
class Solution {
public:
    vector<vector<int>> highestPeak(vector<vector<int>>& isWater) {
        int m = isWater.size(), n = isWater[0].size();
        vector<vector<int>> height(m, vector<int>(n, -1));
        queue<pair<int,int>> q;
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                if (isWater[i][j]) { height[i][j] = 0; q.push({i, j}); }
        int dirs[4][2] = {{1,0},{-1,0},{0,1},{0,-1}};
        while (!q.empty()) {
            auto [r,c] = q.front(); q.pop();
            for (auto& d : dirs) {
                int nr = r + d[0], nc = c + d[1];
                if (nr >= 0 && nc >= 0 && nr < m && nc < n && height[nr][nc] == -1) {
                    height[nr][nc] = height[r][c] + 1;
                    q.push({nr, nc});
                }
            }
        }
        return height;
    }
};
```

### Python
```python
class Solution:
    def highestPeak(self, isWater: List[List[int]]) -> List[List[int]]:
        m, n = len(isWater), len(isWater[0])
        height = [[-1] * n for _ in range(m)]
        q = deque()
        for i in range(m):
            for j in range(n):
                if isWater[i][j]:
                    height[i][j] = 0
                    q.append((i, j))
        while q:
            r, c = q.popleft()
            for dr, dc in ((1,0),(-1,0),(0,1),(0,-1)):
                nr, nc = r + dr, c + dc
                if 0 <= nr < m and 0 <= nc < n and height[nr][nc] == -1:
                    height[nr][nc] = height[r][c] + 1
                    q.append((nr, nc))
        return height
```

### Java
```java
class Solution {
    public int[][] highestPeak(int[][] isWater) {
        int m = isWater.length, n = isWater[0].length;
        int[][] height = new int[m][n];
        for (int[] row : height) Arrays.fill(row, -1);
        Queue<int[]> q = new ArrayDeque<>();
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                if (isWater[i][j] == 1) { height[i][j] = 0; q.offer(new int[]{i, j}); }
        int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};
        while (!q.isEmpty()) {
            int[] cur = q.poll();
            for (int[] d : dirs) {
                int nr = cur[0] + d[0], nc = cur[1] + d[1];
                if (nr >= 0 && nc >= 0 && nr < m && nc < n && height[nr][nc] == -1) {
                    height[nr][nc] = height[cur[0]][cur[1]] + 1;
                    q.offer(new int[]{nr, nc});
                }
            }
        }
        return height;
    }
}
```

**Complexity:** O(m · n) time · O(m · n) space

</details>

---

## 💭 What Should Have Clicked in Your Mind?

- **"Water at height 0, fill entire map"** → Day 6 multi-source dist matrix.
- **"Enqueue ALL water first"** → Same init as 01 Matrix.
- **"height[nr][nc] == -1"** → Visited guard.
- **"Not Day 8 / not Day 10"** → Grid multi-source, not single path or string states.

---

*3 of 3 test problems. Continue to the next. →*

## Solution

### C++
```cpp
class Solution {
public:
    vector<vector<int>> highestPeak(vector<vector<int>>& isWater) {
        int m = isWater.size(), n = isWater[0].size();
        vector<vector<int>> height(m, vector<int>(n, -1));
        queue<pair<int,int>> q;
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                if (isWater[i][j]) { height[i][j] = 0; q.push({i, j}); }
        int dirs[4][2] = {{1,0},{-1,0},{0,1},{0,-1}};
        while (!q.empty()) {
            auto [r,c] = q.front(); q.pop();
            for (auto& d : dirs) {
                int nr = r + d[0], nc = c + d[1];
                if (nr >= 0 && nc >= 0 && nr < m && nc < n && height[nr][nc] == -1) {
                    height[nr][nc] = height[r][c] + 1;
                    q.push({nr, nc});
                }
            }
        }
        return height;
    }
};
```

### Python
```python
class Solution:
    def highestPeak(self, isWater: List[List[int]]) -> List[List[int]]:
        m, n = len(isWater), len(isWater[0])
        height = [[-1] * n for _ in range(m)]
        q = deque()
        for i in range(m):
            for j in range(n):
                if isWater[i][j]:
                    height[i][j] = 0
                    q.append((i, j))
        while q:
            r, c = q.popleft()
            for dr, dc in ((1,0),(-1,0),(0,1),(0,-1)):
                nr, nc = r + dr, c + dc
                if 0 <= nr < m and 0 <= nc < n and height[nr][nc] == -1:
                    height[nr][nc] = height[r][c] + 1
                    q.append((nr, nc))
        return height
```

### Java
```java
class Solution {
    public int[][] highestPeak(int[][] isWater) {
        int m = isWater.length, n = isWater[0].length;
        int[][] height = new int[m][n];
        for (int[] row : height) Arrays.fill(row, -1);
        Queue<int[]> q = new ArrayDeque<>();
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                if (isWater[i][j] == 1) { height[i][j] = 0; q.offer(new int[]{i, j}); }
        int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};
        while (!q.isEmpty()) {
            int[] cur = q.poll();
            for (int[] d : dirs) {
                int nr = cur[0] + d[0], nc = cur[1] + d[1];
                if (nr >= 0 && nc >= 0 && nr < m && nc < n && height[nr][nc] == -1) {
                    height[nr][nc] = height[cur[0]][cur[1]] + 1;
                    q.offer(new int[]{nr, nc});
                }
            }
        }
        return height;
    }
}
```

**Complexity:** O(m · n) time · O(m · n) space
