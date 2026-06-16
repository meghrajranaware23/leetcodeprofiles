<!-- hand-authored -->
# ⚔ Quest: As Far from Land as Possible

> **Day 6** · [As Far from Land as Possible #1162](https://leetcode.com/problems/as-far-from-land-as-possible/) · Medium · 15 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open As Far from Land as Possible on LeetCode](https://leetcode.com/problems/as-far-from-land-as-possible/)**

> ⚔ **Hunter's rule:** Enqueue every land cell (1) at once. Trace how many BFS layers reach water before the queue empties. The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[As Far from Land as Possible #1162](https://leetcode.com/problems/as-far-from-land-as-possible/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? **Multi-source BFS on grid** — sources are **all 1s** (land), not water. Each layer expands into 0s; increment `dist` after processing each full layer; answer = max layer reached (or -1 if no water / all land).

If you're stuck after 5 minutes: mirror 01 Matrix but seed land instead of zeros. Mark visited water as 1 (or use a visited set) so you don't re-enqueue.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Multi-Source BFS on Grid

**How to identify this from the problem statement:**
- "Furthest water cell from any land" = last layer of BFS from **all land simultaneously**
- Grid 0/1 → cells are nodes, 4-neighbors are edges
- Return one number (max distance), not full matrix — still multi-source init

| Keyword / phrase | What it signals |
|---|---|
| "as far from land as possible" | BFS from all land inward |
| "water cell" (0) | Cells the wave **reaches**, not sources |
| "only water cells" / edge cases | No land or no water → -1 |
| "Manhattan distance" | Unweighted BFS layers |

**Why this pattern works:** The last water cell touched by the land wave is equidistant from its nearest land in BFS terms — and maximizing that is exactly "as far from land as possible."

**How a strong solver thinks before coding:**
1. *"Enqueue every grid[i][j]==1."*
2. *"If queue empty or size==m*n → return -1."*
3. *"Process queue level-by-level; dist++ each layer."*
4. *"Mark water 1 when visited; return final dist after last layer."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **BFS from each water cell to nearest land** | O(water × cells) — flip to multi-source from land |
| **Check every water cell's min distance to all land** | O(cells²) nested search |
| **DFS depth as distance** | Not shortest / nearest-land distance |
| **Single-source from one land cell** | Only measures distance from one coastline |

**The insight brute force misses:** "Farthest from **any** land" = synchronized expansion from **every** land cell at t=0.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [01 Matrix #542](https://leetcode.com/problems/01-matrix/) | Sources = 0s; output full dist matrix | Multi-source BFS |
| [Map of Highest Peak #1765](https://leetcode.com/problems/map-of-highest-peak/) | Sources = water; fill height grid | Multi-source BFS |
| [01 Matrix variant: max dist to 0] | Same as today's logic inverted | Layer counting |

---

## 📖 Walkthrough

**All land in queue; expand into water layer by layer.**

```
grid:          Land cells seeded (marked visited):
1 0 1          q = all 1s
0 0 0    →     dist = -1 (before first layer)
1 0 1

Layer 0 (dist=0): process all land — enqueue adjacent 0s, mark 0→1
Layer 1 (dist=1): water cells one step from land
Layer 2 (dist=2): ...
Return dist after last complete layer (center water in 3×3 gets 2)
```

Level-by-level template:

```
while q:
    for _ in range(len(q)):   # one layer
        pop, expand to unvisited water
    dist += 1
return dist
```

> 💡 **The insight:** Same multi-source seed as 01 Matrix — only the source condition (1 vs 0) and the answer (max layer vs dist matrix) change.

---

## Solution

### C++
```cpp
class Solution {
public:
    int maxDistance(vector<vector<int>>& grid) {
        int m = grid.size(), n = grid[0].size();
        queue<pair<int,int>> q;
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                if (grid[i][j]) q.push({i, j});
        if (q.empty() || (int)q.size() == m * n) return -1;
        int dirs[4][2] = {{1,0},{-1,0},{0,1},{0,-1}}, dist = -1;
        while (!q.empty()) {
            int sz = q.size();
            dist++;
            while (sz--) {
                auto [r,c] = q.front(); q.pop();
                for (auto& d : dirs) {
                    int nr = r + d[0], nc = c + d[1];
                    if (nr >= 0 && nc >= 0 && nr < m && nc < n && !grid[nr][nc]) {
                        grid[nr][nc] = 1;
                        q.push({nr, nc});
                    }
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
    def maxDistance(self, grid: List[List[int]]) -> int:
        m, n = len(grid), len(grid[0])
        q = deque((i, j) for i in range(m) for j in range(n) if grid[i][j])
        if not q or len(q) == m * n: return -1
        dist = -1
        while q:
            for _ in range(len(q)):
                r, c = q.popleft()
                for dr, dc in ((1,0),(-1,0),(0,1),(0,-1)):
                    nr, nc = r + dr, c + dc
                    if 0 <= nr < m and 0 <= nc < n and not grid[nr][nc]:
                        grid[nr][nc] = 1
                        q.append((nr, nc))
            dist += 1
        return dist
```

### Java
```java
class Solution {
    public int maxDistance(int[][] grid) {
        int m = grid.length, n = grid[0].length;
        Queue<int[]> q = new ArrayDeque<>();
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                if (grid[i][j] == 1) q.offer(new int[]{i, j});
        if (q.isEmpty() || q.size() == m * n) return -1;
        int dist = -1;
        int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};
        while (!q.isEmpty()) {
            int sz = q.size();
            dist++;
            for (int k = 0; k < sz; k++) {
                int[] cur = q.poll();
                for (int[] d : dirs) {
                    int nr = cur[0] + d[0], nc = cur[1] + d[1];
                    if (nr >= 0 && nc >= 0 && nr < m && nc < n && grid[nr][nc] == 0) {
                        grid[nr][nc] = 1;
                        q.offer(new int[]{nr, nc});
                    }
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

- **"Farthest water from land"** → Multi-source from all **land**, not BFS from each water.
- **"Level counting"** → `for _ in range(len(q))` then `dist++`.
- **"Edge cases"** → No land or all land → -1.
- **"Same skeleton as 01 Matrix"** → Different sources, same wave.

> 🎯 **Pattern Unlocked:** Multi-Source BFS on Grid — land fires the wave, water records the depth.

---

*Both quests complete. Head to the checkpoint. →*
