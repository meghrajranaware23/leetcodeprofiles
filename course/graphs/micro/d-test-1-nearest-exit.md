<!-- hand-authored -->
# ⚔ D-Rank Test — Problem 1

> [Nearest Exit from Entrance in Maze #1926](https://leetcode.com/problems/nearest-exit-from-entrance-in-maze/) · Medium · 100 XP

---

You've completed your D-Rank training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Nearest Exit from Entrance in Maze on LeetCode](https://leetcode.com/problems/nearest-exit-from-entrance-in-maze/)**

> ⚔ **Hunter's rule:** This is a rank test — treat it like real interview practice. BFS with `(r,c,steps)` from entrance. Exit = first border cell that isn't the entrance. No peeking until you've genuinely tried.

---

## The Problem

See the full problem statement on LeetCode: **[Nearest Exit from Entrance in Maze #1926](https://leetcode.com/problems/nearest-exit-from-entrance-in-maze/)**

---

## 💡 Hints

> 🎯 **What's being tested:** **Day 8 BFS shortest path** — `(r,c,steps)` on a grid, but corridors extend in straight lines.

- Start at `entrance`; mark visited (`'+'`).
- For each direction, **walk the corridor** while cells are `'.'` — not just one step.
- **Goal:** first time you step onto a **border** cell (not the entrance itself) → return `steps`.
- Not Day 6 multi-source — one start, one numeric answer.
- Not Day 10 — this is a spatial maze, not abstract state strings.

**Pattern name before coding:** *Day 8 BFS with corridor expansion — nearest border exit.*

---

## 🔍 Pattern Recognition Breakdown

**How to identify from the statement:**
- "Nearest exit" / "minimum steps" → BFS with step count
- Maze with walls `'+'` and paths `'.'` → grid graph
- Entrance on border but **cannot** exit at entrance → special goal check
- Walk until wall in each direction → corridor BFS variant

**How a strong solver thinks before coding:**
1. *"Queue (er, ec, 0); mark entrance visited."*
2. *"From each cell, try 4 dirs; slide while '.'."*
3. *"If border cell during slide → return d + steps + 1."*
4. *"Not multi-source (Day 6) — single BFS from entrance."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **DFS** | Doesn't guarantee minimum steps to exit |
| **Day 6 multi-source from all border cells** | Wrong direction — start is entrance, not all borders |
| **One-step BFS only** | Must walk full corridors in each direction |
| **Allow exit at entrance cell** | Problem forbids — check border excluding start position logic |

---

## 🎯 Transfer to Unseen Problems

Same family as [Shortest Path in Binary Matrix #1091](https://leetcode.com/problems/shortest-path-in-binary-matrix/) — Day 8 step BFS. Here the twist is **corridor sliding** and **goal = any border cell**.

Reference: **Day 8** concept + Binary Matrix Path quest.

---

<details>
<summary><strong>📖 Solution & Walkthrough</strong></summary>

Trace the pattern on the example graph from the problem statement. Then implement the traversal skeleton you identified.

### C++
```cpp
class Solution {
public:
    int nearestExit(vector<vector<char>>& maze, vector<int>& entrance) {
        int m = maze.size(), n = maze[0].size();
        queue<tuple<int,int,int>> q;
        q.push({entrance[0], entrance[1], 0});
        maze[entrance[0]][entrance[1]] = '+';
        int dirs[4][2] = {{1,0},{-1,0},{0,1},{0,-1}};
        while (!q.empty()) {
            auto [r,c,d] = q.front(); q.pop();
            for (auto& dr : dirs) {
                int nr = r + dr[0], nc = c + dr[1], steps = 0;
                while (nr >= 0 && nc >= 0 && nr < m && nc < n && maze[nr][nc] == '.') {
                    if (nr == 0 || nc == 0 || nr == m - 1 || nc == n - 1) return d + steps + 1;
                    nr += dr[0]; nc += dr[1]; steps++;
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
    def nearestExit(self, maze: List[List[str]], entrance: List[int]) -> int:
        m, n = len(maze), len(maze[0])
        er, ec = entrance
        maze[er][ec] = '+'
        q = deque([(er, ec, 0)])
        while q:
            r, c, d = q.popleft()
            for dr, dc in ((1,0),(-1,0),(0,1),(0,-1)):
                nr, nc, steps = r + dr, c + dc, 0
                while 0 <= nr < m and 0 <= nc < n and maze[nr][nc] == '.':
                    if nr == 0 or nc == 0 or nr == m - 1 or nc == n - 1:
                        return d + steps + 1
                    nr += dr; nc += dc; steps += 1
        return -1
```

### Java
```java
class Solution {
    public int nearestExit(char[][] maze, int[] entrance) {
        int m = maze.length, n = maze[0].length;
        Queue<int[]> q = new ArrayDeque<>();
        q.offer(new int[]{entrance[0], entrance[1], 0});
        maze[entrance[0]][entrance[1]] = '+';
        int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};
        while (!q.isEmpty()) {
            int[] cur = q.poll();
            for (int[] d : dirs) {
                int nr = cur[0] + d[0], nc = cur[1] + d[1], steps = 0;
                while (nr >= 0 && nc >= 0 && nr < m && nc < n && maze[nr][nc] == '.') {
                    if (nr == 0 || nc == 0 || nr == m - 1 || nc == n - 1) return cur[2] + steps + 1;
                    nr += d[0]; nc += d[1]; steps++;
                }
            }
        }
        return -1;
    }
}
```

**Complexity:** O(m · n) time · O(m · n) space

</details>

---

## 💭 What Should Have Clicked in Your Mind?

- **"Nearest exit in maze"** → Day 8 BFS `(r,c,steps)`.
- **"Corridor walk"** → Slide in each direction while `'.'`.
- **"Border but not entrance"** → Mark entrance `'+'` before BFS.
- **"Not Day 6 / not Day 10"** → Single-source grid, not multi-source or lock strings.

---

*1 of 3 test problems. Continue to the next. →*

## Solution

### C++
```cpp
class Solution {
public:
    int nearestExit(vector<vector<char>>& maze, vector<int>& entrance) {
        int m = maze.size(), n = maze[0].size();
        queue<tuple<int,int,int>> q;
        q.push({entrance[0], entrance[1], 0});
        maze[entrance[0]][entrance[1]] = '+';
        int dirs[4][2] = {{1,0},{-1,0},{0,1},{0,-1}};
        while (!q.empty()) {
            auto [r,c,d] = q.front(); q.pop();
            for (auto& dr : dirs) {
                int nr = r + dr[0], nc = c + dr[1], steps = 0;
                while (nr >= 0 && nc >= 0 && nr < m && nc < n && maze[nr][nc] == '.') {
                    if (nr == 0 || nc == 0 || nr == m - 1 || nc == n - 1) return d + steps + 1;
                    nr += dr[0]; nc += dr[1]; steps++;
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
    def nearestExit(self, maze: List[List[str]], entrance: List[int]) -> int:
        m, n = len(maze), len(maze[0])
        er, ec = entrance
        maze[er][ec] = '+'
        q = deque([(er, ec, 0)])
        while q:
            r, c, d = q.popleft()
            for dr, dc in ((1,0),(-1,0),(0,1),(0,-1)):
                nr, nc, steps = r + dr, c + dc, 0
                while 0 <= nr < m and 0 <= nc < n and maze[nr][nc] == '.':
                    if nr == 0 or nc == 0 or nr == m - 1 or nc == n - 1:
                        return d + steps + 1
                    nr += dr; nc += dc; steps += 1
        return -1
```

### Java
```java
class Solution {
    public int nearestExit(char[][] maze, int[] entrance) {
        int m = maze.length, n = maze[0].length;
        Queue<int[]> q = new ArrayDeque<>();
        q.offer(new int[]{entrance[0], entrance[1], 0});
        maze[entrance[0]][entrance[1]] = '+';
        int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};
        while (!q.isEmpty()) {
            int[] cur = q.poll();
            for (int[] d : dirs) {
                int nr = cur[0] + d[0], nc = cur[1] + d[1], steps = 0;
                while (nr >= 0 && nc >= 0 && nr < m && nc < n && maze[nr][nc] == '.') {
                    if (nr == 0 || nc == 0 || nr == m - 1 || nc == n - 1) return cur[2] + steps + 1;
                    nr += d[0]; nc += d[1]; steps++;
                }
            }
        }
        return -1;
    }
}
```

**Complexity:** O(m · n) time · O(m · n) space
