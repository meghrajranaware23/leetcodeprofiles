# ⚔ Quest: Shortest Path Visiting All Nodes

> **Day 30** · [Shortest Path Visiting All Nodes #847](https://leetcode.com/problems/shortest-path-visiting-all-nodes/) · Hard · 25 min · 50 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Shortest Path Visiting All Nodes on LeetCode](https://leetcode.com/problems/shortest-path-visiting-all-nodes/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. Draw the graph. Trace the traversal. The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Shortest Path Visiting All Nodes #847](https://leetcode.com/problems/shortest-path-visiting-all-nodes/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? Think about **Bitmask BFS**.

If you're stuck after 5 minutes: revisit the concept page's visual walkthrough. Draw the graph and trace BFS/DFS by hand before looking at the solution structure.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Bitmask BFS

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

Apply Bitmask BFS step by step on this graph.
Draw it. Mark visited nodes at each step.
Watch the queue/stack grow and shrink.
```

> 💡 **The insight:** The code is just the paper trace written in syntax. If you can trace it by hand, you can code it.

---

## Solution

### C++
```cpp
class Solution {
public:
    int shortestPathLength(vector<vector<int>>& graph) {
        int n = graph.size();
        if (n == 1) return 0;
        queue<tuple<int,int,int>> q;
        vector<vector<int>> dist(n, vector<int>(1 << n, -1));
        for (int i = 0; i < n; i++) {
            int mask = 1 << i;
            q.push({i, mask, 0});
            dist[i][mask] = 0;
        }
        while (!q.empty()) {
            auto [u, mask, d] = q.front(); q.pop();
            for (int v : graph[u]) {
                int nmask = mask | (1 << v);
                if (nmask == (1 << n) - 1) return d + 1;
                if (dist[v][nmask] == -1) {
                    dist[v][nmask] = d + 1;
                    q.push({v, nmask, d + 1});
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
    def shortestPathLength(self, graph: List[List[int]]) -> int:
        n = len(graph)
        if n == 1: return 0
        full = (1 << n) - 1
        q = deque()
        dist = [[-1] * (1 << n) for _ in range(n)]
        for i in range(n):
            mask = 1 << i
            q.append((i, mask, 0))
            dist[i][mask] = 0
        while q:
            u, mask, d = q.popleft()
            for v in graph[u]:
                nmask = mask | (1 << v)
                if nmask == full: return d + 1
                if dist[v][nmask] == -1:
                    dist[v][nmask] = d + 1
                    q.append((v, nmask, d + 1))
        return -1
```

### Java
```java
class Solution {
    public int shortestPathLength(int[][] graph) {
        int n = graph.length;
        if (n == 1) return 0;
        int full = (1 << n) - 1;
        int[][] dist = new int[n][1 << n];
        for (int[] row : dist) Arrays.fill(row, -1);
        Queue<int[]> q = new ArrayDeque<>();
        for (int i = 0; i < n; i++) {
            int mask = 1 << i;
            q.offer(new int[]{i, mask, 0});
            dist[i][mask] = 0;
        }
        while (!q.isEmpty()) {
            int[] cur = q.poll();
            for (int v : graph[cur[0]]) {
                int nmask = cur[1] | (1 << v);
                if (nmask == full) return cur[2] + 1;
                if (dist[v][nmask] == -1) {
                    dist[v][nmask] = cur[2] + 1;
                    q.offer(new int[]{v, nmask, cur[2] + 1});
                }
            }
        }
        return -1;
    }
}
```

**Complexity:** O(n² · 2^n) time · O(n · 2^n) space

---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"This is a graph problem"** → Draw it. Identify nodes and edges first.
- **"Bitmask BFS"** → Name the pattern from the concept page.
- **"BFS or DFS?"** → Shortest/levels = BFS. Connectivity/cycles = DFS.
- **"Visited set"** → Every graph traversal needs one.

If you tried DFS when BFS was cleaner (or vice versa), that's fine — the breakthrough is **naming the pattern family**, not memorizing one solution.

> 🎯 **Pattern Unlocked:** Bitmask BFS

---

*One quest down. The next one builds on this pattern. →*
