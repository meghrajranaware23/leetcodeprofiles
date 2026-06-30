<!-- hand-authored -->
# ⚔ Quest: Flood Fill

> **Day 2** · [Flood Fill #733](https://leetcode.com/problems/flood-fill/) · Easy · 10 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Flood Fill on LeetCode](https://leetcode.com/problems/flood-fill/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. Mark the starting pixel, then trace which 4-direction neighbors share the same color. The hints below are for *after* your attempt.

---

## The Problem

You are given an image as an `m×n` grid of integers. Perform a **flood fill** starting at `(sr, sc)`:

- Let `src = image[sr][sc]` (the original color)
- Change every **4-directionally connected** cell with color `src` to `color`
- Return the modified image

```
Input:  image = [[1,1,1],[1,1,0],[1,0,1]], sr = 1, sc = 1, color = 2
Output: [[2,2,2],[2,2,0],[2,0,1]]
```

---

## 💡 Hints

Which pattern from today's concept applies? **Grid traversal on `(r,c)`** — 4-direction flood from the click point.

**Hint 1:** Save `src = image[sr][sc]`. If `src == color`, return early — nothing to do.

**Hint 2:** Define `DIRS = (1,0), (-1,0), (0,1), (0,-1)`. Every neighbor is `(r+dr, c+dc)`.

**Hint 3:** From `(r,c)`: if out of bounds or `image[r][c] != src`, stop. Otherwise set `image[r][c] = color` and recurse/queue all 4 neighbors.

**Hint 4:** Mark by **writing the new color** — no separate visited array needed once recolored.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Grid Flood Fill (4-direction component)

**How to identify this from the problem statement:**
- `m×n` image + starting cell → grid graph
- "Connected" + "same color" → one component from `(sr,sc)`
- 4-directional explicitly → not 8-connectivity
- Modify in place → recoloring = visited mark

| Keyword / phrase | What it signals |
|---|---|
| "flood fill" / "paint bucket" | Expand from seed through matching cells |
| "4-directionally connected" | `(r,c)` + 4 neighbors |
| "same color" / "same value" | Only continue while `grid[nr][nc] == src` |
| `sr, sc` starting pixel | BFS/DFS origin |
| Return modified grid | In-place mutation |

**Why this pattern works:** All cells reachable through same-color 4-paths form one component. Walk it from the seed; each cell visited exactly once.

**How a strong solver thinks before coding:**
1. *"src = original color; early exit if src == new color."*
2. *"Bounds + same-color check on every neighbor."*
3. *"Recolor before expanding — prevents infinite loops."*
4. *"Trace upper-left blob in Example 1 — all 1s become 2s except isolated 1 at (2,2)."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Scan entire grid, recolor every `src` pixel** | Breaks connectivity — diagonal same-color cells shouldn't merge if not 4-connected |
| **No bounds check** | Crash on `r-1` or `c+1` off grid |
| **Separate visited without recoloring** | Extra space; recoloring is simpler |
| **8-direction flood when problem says 4** | Wrong shape — corner-touching cells aren't connected |
| **Forget early exit when src == color** | Infinite recursion on recolor-to-same |

**The insight brute force misses:** Flood fill is **component traversal from one seed**, not global replace. The 4-dir rule defines edges.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Number of Islands #200](https://leetcode.com/problems/number-of-islands/) | Count components, start from each `1` | Same 4-dir flood, different goal |
| [Max Area of Island #695](https://leetcode.com/problems/max-area-of-island/) | Accumulate area during flood | Same walk + counter |
| [Island Perimeter #463](https://leetcode.com/problems/island-perimeter/) | Count border edges instead of recolor | Same 4-dir neighbor check |

Same grid skeleton: bounds → check condition → mark → expand 4 ways.

---

## 📖 Walkthrough

**Seed → recolor → expand to matching 4-neighbors.**

```
image (1=old, target color 2):
  1 1 1
  1 1 0
  1 0 1

Start (1,1), src=1:
  dfs(1,1): set to 2 → try (0,1),(2,1),(1,0),(1,2)
  dfs(0,1): set to 2 → …
  … all 4-connected 1s become 2

Isolated 1 at (2,2) not 4-adjacent to blob → stays 1 ✓

Result:
  2 2 2
  2 2 0
  2 0 1
```

> 💡 **The insight:** The grid **is** the graph. `(r,c)` are nodes; edges go to in-bounds neighbors with matching color.

---

## Solution

### C++
```cpp
class Solution {
    int m, n, dirs[4][2] = {{1,0},{-1,0},{0,1},{0,-1}};
    void dfs(vector<vector<int>>& img, int r, int c, int src, int color) {
        if (r < 0 || c < 0 || r >= m || c >= n || img[r][c] != src) return;
        img[r][c] = color;
        for (auto& d : dirs) dfs(img, r + d[0], c + d[1], src, color);
    }
public:
    vector<vector<int>> floodFill(vector<vector<int>>& image, int sr, int sc, int color) {
        m = image.size(); n = image[0].size();
        int src = image[sr][sc];
        if (src != color) dfs(image, sr, sc, src, color);
        return image;
    }
};
```

### Python
```python
class Solution:
    def floodFill(self, image: List[List[int]], sr: int, sc: int, color: int) -> List[List[int]]:
        src = image[sr][sc]
        if src == color: return image
        m, n = len(image), len(image[0])
        def dfs(r, c):
            if r < 0 or c < 0 or r >= m or c >= n or image[r][c] != src: return
            image[r][c] = color
            for dr, dc in ((1,0),(-1,0),(0,1),(0,-1)):
                dfs(r + dr, c + dc)
        dfs(sr, sc)
        return image
```

### Java
```java
class Solution {
    private int m, n;
    public int[][] floodFill(int[][] image, int sr, int sc, int color) {
        m = image.length; n = image[0].length;
        int src = image[sr][sc];
        if (src != color) dfs(image, sr, sc, src, color);
        return image;
    }
    private void dfs(int[][] image, int r, int c, int src, int color) {
        if (r < 0 || c < 0 || r >= m || c >= n || image[r][c] != src) return;
        image[r][c] = color;
        dfs(image, r + 1, c, src, color); dfs(image, r - 1, c, src, color);
        dfs(image, r, c + 1, src, color); dfs(image, r, c - 1, src, color);
    }
}
```

**Complexity:** O(m · n) time · O(m · n) space
---

## 💭 What Should Have Clicked in Your Mind?

- **"Flood fill"** → One connected component from `(sr,sc)` on the grid graph.
- **4-direction `(r,c)` loop** → Day 2 grid vocabulary; same as BFS neighbor expansion.
- **Recolor = visited** → No second array needed.
- **Solution uses DFS** → Flood is about connectivity; BFS also works if you prefer queue.

If you coded BFS with a `deque`, compare visit order to DFS — same cells, different order.

> 🎯 **Pattern Unlocked:** Grid flood from seed — bounds, match `src`, expand 4 ways.

---

*One quest down. Next: multiple sources, one clock — rotting oranges spread by the minute. →*
