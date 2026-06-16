<!-- hand-authored -->
# ⚔ Quest: Island Perimeter

> **Day 4** · [Island Perimeter #463](https://leetcode.com/problems/island-perimeter/) · Easy · 10 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Island Perimeter on LeetCode](https://leetcode.com/problems/island-perimeter/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. For each land cell, count how many of its 4 sides touch water or the grid boundary. The hints below are for *after* your attempt.

---

## The Problem

Given a binary grid (`0` = water, `1` = land), return the **perimeter** of the island (there is exactly one connected land component in the problem's valid inputs).

```
Input:  grid = [[0,1,0,0],[1,1,1,0],[0,1,0,0],[0,1,0,0]]
Output: 16

Input:  grid = [[1]]
Output: 4
```

---

## 💡 Hints

Which pattern from today's concept applies? **Grid boundary counting** — +1 per water/out-of-bounds edge, or the equivalent +4/−2 scan.

**Hint 1:** Loop every cell. When `grid[i][j]==1`, add **4** to perimeter.

**Hint 2:** If cell above `(i-1,j)` is also land, subtract **2** (shared edge counted twice otherwise).

**Hint 3:** Same for cell to the left `(i,j-1)` if land — subtract 2.

**Hint 4:** Alternative: for each land cell, add 1 for each of 4 directions that is out of bounds OR water.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Grid Boundary Counting

**How to identify this from the problem statement:**
- Binary grid, measure **edge length** around land
- No traversal of full component required — local neighbor check suffices
- 4-direction implied (standard grid island)
- Single island in examples — formula works for multiple islands too

| Keyword / phrase | What it signals |
|---|---|
| "perimeter" / "boundary" | Edge counting, not BFS levels |
| Land vs water cells | Check each of 4 sides |
| Shared edge between two land cells | Subtract 2 (or don't double-count) |
| `m×n` grid | Double loop scan |
| No "shortest path" language | Arithmetic, not queue |

**Why this pattern works:** Each unit edge appears once on the perimeter if it borders water/boundary. Internal land-land edges cancel via −2 adjustments.

**How a strong solver thinks before coding:**
1. *"Land cell starts at +4."*
2. *"Up land neighbor? peri -= 2. Left land neighbor? peri -= 2."*
3. *"Single cell grid: +4, no neighbors → answer 4."*
4. *"Trace cross-shaped island — count exposed sides by hand."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Count land cells × 4** | Internal edges double-counted |
| **DFS entire island then measure boundary** | Works but slower to code than scan formula |
| **Subtract 1 for each land neighbor (not 2)** | Under-corrects shared edges |
| **8-direction connectivity** | Wrong shape — corners don't share edge |
| **Only check right/down and skip up/left logic** | Inconsistent — pick one pairing strategy |

**The insight brute force misses:** Perimeter is **local** — each cell's contribution depends only on its up/left neighbors (or its 4 side types).

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| Number of Islands #200 (next quest) | Count components via flood | Grid 4-dir |
| Max Area of Island #695 (Day 5) | Flood + accumulate area | Same neighbor loop |
| Island Perimeter variants | Multiple disjoint islands | Same +4/−2 per land cell |

Perimeter = arithmetic on edges; islands = connectivity flood. Both live on the same grid graph.

---

## 📖 Walkthrough

**+4 per land, −2 for each shared up/left land edge.**

```
grid = [[1]]

Cell (0,0): land → +4
No up, no left land neighbors
Perimeter = 4 ✓

grid = [[1,1],
        [1,0]]

(0,0): +4
(0,1): +4, left land → −2  → running careful sum
(1,0): +4, up land → −2
… total = 8 (trace all cells)
```

> 💡 **The insight:** A side between two land cells is **not** perimeter. The −2 trick removes it from both cells' +4 contributions.

---

## Solution

### C++
```cpp
class Solution {
public:
    int islandPerimeter(vector<vector<int>>& grid) {
        int m = grid.size(), n = grid[0].size(), peri = 0;
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                if (grid[i][j]) {
                    peri += 4;
                    if (i > 0 && grid[i-1][j]) peri -= 2;
                    if (j > 0 && grid[i][j-1]) peri -= 2;
                }
        return peri;
    }
};
```

### Python
```python
class Solution:
    def islandPerimeter(self, grid: List[List[int]]) -> int:
        m, n = len(grid), len(grid[0])
        peri = 0
        for i in range(m):
            for j in range(n):
                if grid[i][j]:
                    peri += 4
                    if i > 0 and grid[i - 1][j]: peri -= 2
                    if j > 0 and grid[i][j - 1]: peri -= 2
        return peri
```

### Java
```java
class Solution {
    public int islandPerimeter(int[][] grid) {
        int m = grid.length, n = grid[0].length, peri = 0;
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                if (grid[i][j] == 1) {
                    peri += 4;
                    if (i > 0 && grid[i - 1][j] == 1) peri -= 2;
                    if (j > 0 && grid[i][j - 1] == 1) peri -= 2;
                }
        return peri;
    }
}
```

**Complexity:** O(m · n) time · O(1) space
---

## 💭 What Should Have Clicked in Your Mind?

- **"Perimeter on grid"** → water/boundary edges, not BFS.
- **+4 then −2** → each internal edge removed exactly once.
- **4-direction** → only up/down/left/right sides count.
- **No DFS required** — but flood-fill intuition explains what "connected land" means.

If you counted +1 per exposed side manually, you used the same math in a different skin.

> 🎯 **Pattern Unlocked:** Grid perimeter — local neighbor arithmetic on land cells.

---

*One quest down. Next: how many separate islands? Restart flood from each `1`. →*
