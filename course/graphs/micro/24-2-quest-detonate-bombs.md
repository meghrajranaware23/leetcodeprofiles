# ⚔ Quest: Detonate Maximum Bombs

> **Day 24** · [Detonate Maximum Bombs #2101](https://leetcode.com/problems/detonate-maximum-bombs/) · Medium · 15 min · 30 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Detonate Maximum Bombs on LeetCode](https://leetcode.com/problems/detonate-maximum-bombs/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. Draw the graph. Trace the traversal. The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Detonate Maximum Bombs #2101](https://leetcode.com/problems/detonate-maximum-bombs/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? Think about **Geometric Graph Construction**.

If you're stuck after 5 minutes: revisit the concept page's visual walkthrough. Draw the graph and trace BFS/DFS by hand before looking at the solution structure.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Geometric Graph Construction

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

Apply Geometric Graph Construction step by step on this graph.
Draw it. Mark visited nodes at each step.
Watch the queue/stack grow and shrink.
```

> 💡 **The insight:** The code is just the paper trace written in syntax. If you can trace it by hand, you can code it.

---

## Solution

### C++
```cpp
class Solution {
    bool overlap(vector<int>& a, vector<int>& b) {
        long long dx = a[0] - b[0], dy = a[1] - b[1];
        long long r = (long long)a[2] + b[2];
        return dx * dx + dy * dy <= r * r;
    }
    void dfs(int u, vector<vector<int>>& bombs, vector<bool>& vis) {
        vis[u] = true;
        for (int v = 0; v < (int)bombs.size(); v++)
            if (!vis[v] && overlap(bombs[u], bombs[v])) dfs(v, bombs, vis);
    }
public:
    int maximumDetonation(vector<vector<int>>& bombs) {
        int best = 0;
        for (int i = 0; i < (int)bombs.size(); i++) {
            vector<bool> vis(bombs.size());
            dfs(i, bombs, vis);
            best = max(best, (int)count(vis.begin(), vis.end(), true));
        }
        return best;
    }
};
```

### Python
```python
class Solution:
    def maximumDetonation(self, bombs: List[List[int]]) -> int:
        def overlap(a, b):
            dx, dy = a[0] - b[0], a[1] - b[1]
            r = a[2] + b[2]
            return dx * dx + dy * dy <= r * r
        def dfs(u, vis):
            vis[u] = True
            for v in range(len(bombs)):
                if not vis[v] and overlap(bombs[u], bombs[v]):
                    dfs(v, vis)
        best = 0
        for i in range(len(bombs)):
            vis = [False] * len(bombs)
            dfs(i, vis)
            best = max(best, sum(vis))
        return best
```

### Java
```java
class Solution {
    public int maximumDetonation(int[][] bombs) {
        int best = 0;
        for (int i = 0; i < bombs.length; i++) {
            boolean[] vis = new boolean[bombs.length];
            dfs(i, bombs, vis);
            int cnt = 0;
            for (boolean v : vis) if (v) cnt++;
            best = Math.max(best, cnt);
        }
        return best;
    }
    private void dfs(int u, int[][] bombs, boolean[] vis) {
        vis[u] = true;
        for (int v = 0; v < bombs.length; v++)
            if (!vis[v] && overlap(bombs[u], bombs[v])) dfs(v, bombs, vis);
    }
    private boolean overlap(int[] a, int[] b) {
        long dx = a[0] - b[0], dy = a[1] - b[1], r = (long) a[2] + b[2];
        return dx * dx + dy * dy <= r * r;
    }
}
```

**Complexity:** O(n²) time · O(n) space

---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"This is a graph problem"** → Draw it. Identify nodes and edges first.
- **"Geometric Graph Construction"** → Name the pattern from the concept page.
- **"BFS or DFS?"** → Shortest/levels = BFS. Connectivity/cycles = DFS.
- **"Visited set"** → Every graph traversal needs one.

If you tried DFS when BFS was cleaner (or vice versa), that's fine — the breakthrough is **naming the pattern family**, not memorizing one solution.

> 🎯 **Pattern Unlocked:** Geometric Graph Construction

---

*One quest down. The next one builds on this pattern. →*
