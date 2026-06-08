# ⚔ D-Rank Test — Problem 1

> [Nearest Exit from Entrance in Maze #1926](https://leetcode.com/problems/nearest-exit-from-entrance-in-maze/) · Medium · 100 XP

---

You've completed your D-Rank training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Nearest Exit from Entrance in Maze on LeetCode](https://leetcode.com/problems/nearest-exit-from-entrance-in-maze/)**

> ⚔ **Hunter's rule:** This is a rank test — treat it like real interview practice. Draw the graph. Trace the traversal. No peeking until you've genuinely tried.

---

## The Problem

See the full problem statement on LeetCode: **[Nearest Exit from Entrance in Maze #1926](https://leetcode.com/problems/nearest-exit-from-entrance-in-maze/)**

---

## 💡 Hints

> 🎯 **What's being tested:** Pattern recognition from the D-Rank curriculum. Name the pattern before you code.

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

- **"This is a D-Rank test"** → Use patterns from this rank's training.
- **"Draw first, code second"** → Visual tracing beats guessing.
- **"Name the pattern"** → The code is just the template filled in.

---

*1 of 3 test problems. Continue to the next. →*
