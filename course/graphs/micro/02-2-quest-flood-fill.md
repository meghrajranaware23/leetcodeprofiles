# ⚔ Quest: Flood Fill

> **Day 2** · [Flood Fill #733](https://leetcode.com/problems/flood-fill/) · Easy · 10 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Flood Fill on LeetCode](https://leetcode.com/problems/flood-fill/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. Draw the graph. Trace the traversal. The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Flood Fill #733](https://leetcode.com/problems/flood-fill/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? Think about **BFS on Grid**.

If you're stuck after 5 minutes: revisit the concept page's visual walkthrough. Draw the graph and trace BFS/DFS by hand before looking at the solution structure.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** BFS on Grid

**How to identify this from the problem statement:**
- Look for graph structure keywords — "node", "edge", "connected", "adjacent", "grid"
- Ask: do I need **BFS** (shortest/levels), **DFS** (connectivity/cycles), or **Dijkstra** (weighted)?
- Check if the input is explicit graph, implicit grid, or abstract state space

| Keyword / phrase | What it signals |
|---|---|
| "shortest path" / "minimum steps" | BFS with visited set |
| "connected" / "reachable" | DFS/BFS from source |
| "grid" / "island" / "matrix" | Grid-as-graph traversal |
| "prerequisites" / "dependencies" | Topological sort |
| "bipartite" / "two teams" | Graph 2-coloring |
| "union" / "merge" / "equivalent" | Union-Find |
| "minimum cost" / "network delay" | Dijkstra |

**Why this pattern works:** Graphs model relationships. The pattern names how you explore those relationships — wavefront (BFS), deep dive (DFS), or group merging (UF).

**How a strong solver thinks before coding:**
1. *"What are my nodes? What are my edges?"*
2. *"BFS, DFS, Dijkstra, or Union-Find?"*
3. *"Draw a small example graph and trace by hand."*
4. *"What goes in my visited set?"*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Try all paths without pruning** | Exponential time — visited set is essential |
| **DFS for shortest unweighted path** | BFS guarantees minimum steps |
| **Dijkstra on unweighted graph** | BFS is simpler and equally correct |
| **Nested loops for connectivity** | O(n²) when O(n) BFS/DFS works |

**The insight brute force misses:** Name the exploration strategy. BFS for shortest, DFS for connectivity, Dijkstra for weighted — then add a visited set.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| Related tree problems | Different combine logic | Same recursive skeleton |
| Same traversal order | Different processing per node | Same visit sequence |
| Variant constraints | Extra state or early termination | Same flow direction |

If you recognized this problem's pattern, you already have the skeleton for today's practice queue.

---

## 📖 Walkthrough

Trace the pattern on a small graph before reading the code:

```
Graph:  A — B — C
        |       |
        D — E   F

Apply BFS on Grid step by step on this graph.
Draw it. Mark visited nodes at each step.
Watch the queue/stack grow and shrink.
```

> 💡 **The insight:** The code is just the paper trace written in syntax. If you can trace it by hand, you can code it.

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

Before writing code, a strong solver's internal monologue sounds like this:

- **"This is a graph problem"** → Draw it. Identify nodes and edges first.
- **"BFS on Grid"** → Name the pattern from the concept page.
- **"BFS or DFS?"** → Shortest/levels = BFS. Connectivity/cycles = DFS.
- **"Visited set"** → Every graph traversal needs one.

If you tried DFS when BFS was cleaner (or vice versa), that's fine — the breakthrough is **naming the pattern family**, not memorizing one solution.

> 🎯 **Pattern Unlocked:** BFS on Grid

---

*One quest down. The next one builds on this pattern. →*
