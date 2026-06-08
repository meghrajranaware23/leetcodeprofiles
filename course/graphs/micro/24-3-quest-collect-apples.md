# ⚔ Quest: Min Time to Collect Apples

> **Day 24** · [Minimum Time to Collect All Apples in a Tree #1443](https://leetcode.com/problems/minimum-time-to-collect-all-apples-in-a-tree/) · Medium · 15 min · 30 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Minimum Time to Collect All Apples in a Tree on LeetCode](https://leetcode.com/problems/minimum-time-to-collect-all-apples-in-a-tree/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. Draw the graph. Trace the traversal. The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Minimum Time to Collect All Apples in a Tree #1443](https://leetcode.com/problems/minimum-time-to-collect-all-apples-in-a-tree/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? Think about **Tree DFS + Return Cost**.

If you're stuck after 5 minutes: revisit the concept page's visual walkthrough. Draw the graph and trace BFS/DFS by hand before looking at the solution structure.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Tree DFS + Return Cost

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

Apply Tree DFS + Return Cost step by step on this graph.
Draw it. Mark visited nodes at each step.
Watch the queue/stack grow and shrink.
```

> 💡 **The insight:** The code is just the paper trace written in syntax. If you can trace it by hand, you can code it.

---

## Solution

### C++
```cpp
class Solution {
    vector<vector<int>> adj;
    vector<bool> has;
    pair<int,int> dfs(int u, int parent, vector<int>& cost) {
        int total = has[u] ? 1 : 0, trips = 0;
        for (int v : adj[u]) {
            if (v == parent) continue;
            auto [sub, t] = dfs(v, u, cost);
            total += sub;
            trips += t + (sub ? 2 : 0);
        }
        return {total, trips};
    }
public:
    int minTime(int n, vector<vector<int>>& edges, vector<bool>& hasApple) {
        adj.assign(n, {});
        for (auto& e : edges) { adj[e[0]].push_back(e[1]); adj[e[1]].push_back(e[0]); }
        has = hasApple;
        vector<int> dummy;
        return dfs(0, -1, dummy).second;
    }
};
```

### Python
```python
class Solution:
    def minTime(self, n: int, edges: List[List[int]], hasApple: List[bool]) -> int:
        adj = [[] for _ in range(n)]
        for a, b in edges:
            adj[a].append(b); adj[b].append(a)
        def dfs(u, parent):
            total = 1 if hasApple[u] else 0
            trips = 0
            for v in adj[u]:
                if v == parent: continue
                sub, t = dfs(v, u)
                total += sub
                trips += t + (2 if sub else 0)
            return total, trips
        return dfs(0, -1)[1]
```

### Java
```java
class Solution {
    private List<List<Integer>> adj;
    private boolean[] hasApple;
    public int minTime(int n, int[][] edges, boolean[] hasApple) {
        adj = new ArrayList<>();
        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
        for (int[] e : edges) { adj.get(e[0]).add(e[1]); adj.get(e[1]).add(e[0]); }
        this.hasApple = hasApple;
        return dfs(0, -1)[1];
    }
    private int[] dfs(int u, int parent) {
        int total = hasApple[u] ? 1 : 0, trips = 0;
        for (int v : adj.get(u)) {
            if (v == parent) continue;
            int[] sub = dfs(v, u);
            total += sub[0];
            trips += sub[1] + (sub[0] > 0 ? 2 : 0);
        }
        return new int[]{total, trips};
    }
}
```

**Complexity:** O(n) time · O(n) space

---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"This is a graph problem"** → Draw it. Identify nodes and edges first.
- **"Tree DFS + Return Cost"** → Name the pattern from the concept page.
- **"BFS or DFS?"** → Shortest/levels = BFS. Connectivity/cycles = DFS.
- **"Visited set"** → Every graph traversal needs one.

If you tried DFS when BFS was cleaner (or vice versa), that's fine — the breakthrough is **naming the pattern family**, not memorizing one solution.

> 🎯 **Pattern Unlocked:** Tree DFS + Return Cost

---

*Both quests complete. Head to the checkpoint. →*
