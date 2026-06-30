<!-- hand-authored -->
# ⚔ Quest: Rotting Oranges

> **Day 2** · [Rotting Oranges #994](https://leetcode.com/problems/rotting-oranges/) · Medium · 15 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Rotting Oranges on LeetCode](https://leetcode.com/problems/rotting-oranges/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. Circle all rotten (`2`) cells, count fresh (`1`), then simulate minute-by-minute spread. The hints below are for *after* your attempt.

---

## The Problem

Each minute, every fresh orange **4-adjacent** to a rotten orange becomes rotten.

Given an `m×n` grid where `0` = empty, `1` = fresh, `2` = rotten:
- Return the **minimum minutes** until no fresh orange remains
- Return `-1` if impossible

```
Input:  grid = [[2,1,1],[1,1,0],[0,1,1]]
Output: 4

Input:  grid = [[2,1,1],[0,1,1],[1,0,1]]
Output: -1
Explanation: Bottom-left fresh orange is never adjacent to rot.
```

---

## 💡 Hints

Which pattern from today's concept applies? **Multi-source BFS with level timeline** — same `len(q)` batch as Trees level-order, but each batch = one minute.

**Hint 1:** First pass: enqueue every `(r,c)` with `grid[r][c]==2`; count `fresh` cells with value `1`.

**Hint 2:** While queue non-empty **and** `fresh > 0`: process exactly `len(q)` cells (one minute), rot each fresh 4-neighbor, decrement `fresh`, enqueue newly rotten.

**Hint 3:** Increment `mins` after each batch. When loop ends: return `-1` if `fresh > 0`, else `mins`.

**Hint 4:** Oranges rot in parallel each minute — that's why you batch the whole queue, not one cell at a time.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Multi-Source BFS (level = minute)

**How to identify this from the problem statement:**
- Simultaneous spread from many sources → enqueue all `2`s first
- "Minimum minutes" / time steps → BFS level count, not DFS
- Grid + 4-direction → `(r,c)` queue
- Global "all fresh rotten?" → track `fresh` counter

| Keyword / phrase | What it signals |
|---|---|
| "each minute" / "simultaneously" | BFS batch = one time step |
| Multiple rotten starting cells | Multi-source initialization |
| "minimum time" unweighted | BFS — first rot time is shortest |
| 4-adjacent | Standard DIRS array |
| Return -1 if stuck | Some fresh never reached |

**Why this pattern works:** BFS explores by distance from nearest rotten cell. All cells at distance `d` rot in minute `d`. Batching the queue matches parallel rot per minute.

**How a strong solver thinks before coding:**
1. *"Collect all rotten into queue; count fresh."*
2. *"while q and fresh: for _ in range(len(q)): spread to neighbors."*
3. *"mins++ each outer iteration."*
4. *"fresh==0 at end → return mins; else -1."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **DFS from each rotten orange separately** | Doesn't model simultaneous minutes correctly |
| **Process one cell per minute without batching** | Wrong timeline — parallel spread broken |
| **Simulate with nested loops per minute rescanning grid** | O(m·n·minutes) redundant; BFS is O(m·n) |
| **Forget to decrement fresh** | Can't detect stuck fresh at end |
| **Increment mins when queue empty but fresh remain** | Should return -1, not mins |

**The insight brute force misses:** Time = **BFS depth** from multi-source frontier. One batch loop = one clock tick.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Binary Tree Level Order Traversal #102](https://leetcode.com/problems/binary-tree-level-order-traversal/) | Tree children instead of grid | `len(q)` batch |
| [As Far from Land as Possible #1162](https://leetcode.com/problems/as-far-from-land-as-possible/) | Multi-source BFS from all land cells | Same init-all-sources |
| [01 Matrix #542](https://leetcode.com/problems/01-matrix/) | Distance to nearest 0 | Multi-source BFS levels |

Trees Day 3 taught the batch skeleton; this quest applies it to **grid time**.

---

## 📖 Walkthrough

**All rotten in queue → batch per minute → track fresh.**

```
Grid:
  2 1 1
  1 1 0
  0 1 1

Init: q = [(0,0)], fresh = 6

Minute 1 batch: rot (0,1),(1,0)     fresh = 4
Minute 2 batch: rot (0,2),(1,1)   fresh = 2
Minute 3 batch: rot (1,2),(2,1)   fresh = 0
Minute 4 batch: queue processes but fresh already 0

Return mins = 4 ✓
```

> 💡 **The insight:** `for _ in range(len(q))` is the minute hand. Same idiom as tree level-order — different domain.

---

## Solution

### C++
```cpp
class Solution {
public:
    int orangesRotting(vector<vector<int>>& grid) {
        int m = grid.size(), n = grid[0].size(), fresh = 0;
        queue<pair<int,int>> q;
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                if (grid[i][j] == 2) q.push({i, j});
                else if (grid[i][j] == 1) fresh++;
        int mins = 0, dirs[4][2] = {{1,0},{-1,0},{0,1},{0,-1}};
        while (!q.empty() && fresh) {
            int sz = q.size();
            while (sz--) {
                auto [r,c] = q.front(); q.pop();
                for (auto& d : dirs) {
                    int nr = r + d[0], nc = c + d[1];
                    if (nr >= 0 && nc >= 0 && nr < m && nc < n && grid[nr][nc] == 1) {
                        grid[nr][nc] = 2;
                        fresh--;
                        q.push({nr, nc});
                    }
                }
            }
            mins++;
        }
        return fresh ? -1 : mins;
    }
};
```

### Python
```python
class Solution:
    def orangesRotting(self, grid: List[List[int]]) -> int:
        m, n = len(grid), len(grid[0])
        q = deque()
        fresh = 0
        for i in range(m):
            for j in range(n):
                if grid[i][j] == 2: q.append((i, j))
                elif grid[i][j] == 1: fresh += 1
        mins = 0
        while q and fresh:
            for _ in range(len(q)):
                r, c = q.popleft()
                for dr, dc in ((1,0),(-1,0),(0,1),(0,-1)):
                    nr, nc = r + dr, c + dc
                    if 0 <= nr < m and 0 <= nc < n and grid[nr][nc] == 1:
                        grid[nr][nc] = 2
                        fresh -= 1
                        q.append((nr, nc))
            mins += 1
        return -1 if fresh else mins
```

### Java
```java
class Solution {
    public int orangesRotting(int[][] grid) {
        int m = grid.length, n = grid[0].length, fresh = 0;
        Queue<int[]> q = new ArrayDeque<>();
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                if (grid[i][j] == 2) q.offer(new int[]{i, j});
                else if (grid[i][j] == 1) fresh++;
        int mins = 0;
        int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};
        while (!q.isEmpty() && fresh > 0) {
            int sz = q.size();
            for (int k = 0; k < sz; k++) {
                int[] cur = q.poll();
                for (int[] d : dirs) {
                    int nr = cur[0] + d[0], nc = cur[1] + d[1];
                    if (nr >= 0 && nc >= 0 && nr < m && nc < n && grid[nr][nc] == 1) {
                        grid[nr][nc] = 2;
                        fresh--;
                        q.offer(new int[]{nr, nc});
                    }
                }
            }
            mins++;
        }
        return fresh > 0 ? -1 : mins;
    }
}
```

**Complexity:** O(m · n) time · O(m · n) space
---

## 💭 What Should Have Clicked in Your Mind?

- **"Each minute"** → `len(q)` batch loop (Trees Day 3 déjà vu).
- **All rotten start together** → multi-source enqueue before `while`.
- **BFS not DFS** → minimum time = wavefront distance.
- **`fresh` counter** → quick impossible check at end.

If level-order on trees clicked, this is that queue batch on a grid with a clock.

> 🎯 **Pattern Unlocked:** Multi-source BFS timeline — batch = minute, track remaining fresh.

---

*Both quests complete. Head to the checkpoint. →*
