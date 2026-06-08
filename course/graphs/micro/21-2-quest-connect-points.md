# ⚔ Quest: Min Cost to Connect All Points

> **Day 21** · [Min Cost to Connect All Points #1584](https://leetcode.com/problems/min-cost-to-connect-all-points/) · Medium · 15 min · 35 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Min Cost to Connect All Points on LeetCode](https://leetcode.com/problems/min-cost-to-connect-all-points/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. Draw the graph. Trace the traversal. The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Min Cost to Connect All Points #1584](https://leetcode.com/problems/min-cost-to-connect-all-points/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? Think about **Kruskal's MST**.

If you're stuck after 5 minutes: revisit the concept page's visual walkthrough. Draw the graph and trace BFS/DFS by hand before looking at the solution structure.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Kruskal's MST

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

Apply Kruskal's MST step by step on this graph.
Draw it. Mark visited nodes at each step.
Watch the queue/stack grow and shrink.
```

> 💡 **The insight:** The code is just the paper trace written in syntax. If you can trace it by hand, you can code it.

---

## Solution

### C++
```cpp
class Solution {
    vector<int> p, r;
    int find(int x) { return p[x] == x ? x : p[x] = find(p[x]); }
    void unite(int a, int b) {
        a = find(a); b = find(b);
        if (a == b) return;
        if (r[a] < r[b]) swap(a, b);
        p[b] = a;
        if (r[a] == r[b]) r[a]++;
    }
    int manhattan(vector<vector<int>>& pts, int i, int j) {
        return abs(pts[i][0] - pts[j][0]) + abs(pts[i][1] - pts[j][1]);
    }
public:
    int minCostConnectPoints(vector<vector<int>>& points) {
        int n = points.size();
        p.resize(n); r.assign(n, 0);
        iota(p.begin(), p.end(), 0);
        priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> pq;
        for (int i = 1; i < n; i++) pq.push({manhattan(points, 0, i), i});
        int cost = 0, used = 1;
        while (used < n) {
            auto [w, v] = pq.top(); pq.pop();
            if (find(0) == find(v)) continue;
            unite(0, v);
            cost += w;
            used++;
            for (int i = 0; i < n; i++)
                if (find(i) != find(v)) pq.push({manhattan(points, v, i), i});
        }
        return cost;
    }
};
```

### Python
```python
class Solution:
    def minCostConnectPoints(self, points: List[List[int]]) -> int:
        n = len(points)
        p = list(range(n))
        def find(x):
            while p[x] != x:
                p[x] = p[p[x]]
                x = p[x]
            return x
        def unite(a, b):
            p[find(b)] = find(a)
        def dist(i, j):
            return abs(points[i][0] - points[j][0]) + abs(points[i][1] - points[j][1])
        pq = [(dist(0, i), i) for i in range(1, n)]
        heapq.heapify(pq)
        cost = used = 0
        while used < n - 1:
            w, v = heapq.heappop(pq)
            if find(v) == find(0):
                continue
            unite(0, v)
            cost += w
            used += 1
            for i in range(n):
                if find(i) != find(v):
                    heapq.heappush(pq, (dist(v, i), i))
        return cost
```

### Java
```java
class Solution {
    private int[] p;
    public int minCostConnectPoints(int[][] points) {
        int n = points.length;
        p = new int[n];
        for (int i = 0; i < n; i++) p[i] = i;
        PriorityQueue<int[]> pq = new PriorityQueue<>(Comparator.comparingInt(a -> a[0]));
        for (int i = 1; i < n; i++) pq.offer(new int[]{dist(points, 0, i), i});
        int cost = 0, used = 0;
        while (used < n - 1) {
            int[] cur = pq.poll();
            if (find(cur[1]) == find(0)) continue;
            unite(0, cur[1]);
            cost += cur[0];
            used++;
            for (int i = 0; i < n; i++)
                if (find(i) != find(cur[1])) pq.offer(new int[]{dist(points, cur[1], i), i});
        }
        return cost;
    }
    private int dist(int[][] pts, int i, int j) {
        return Math.abs(pts[i][0] - pts[j][0]) + Math.abs(pts[i][1] - pts[j][1]);
    }
    private int find(int x) { return p[x] == x ? x : (p[x] = find(p[x])); }
    private void unite(int a, int b) { p[find(b)] = find(a); }
}
```

**Complexity:** O(n² log n) time · O(n²) space

---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"This is a graph problem"** → Draw it. Identify nodes and edges first.
- **"Kruskal's MST"** → Name the pattern from the concept page.
- **"BFS or DFS?"** → Shortest/levels = BFS. Connectivity/cycles = DFS.
- **"Visited set"** → Every graph traversal needs one.

If you tried DFS when BFS was cleaner (or vice versa), that's fine — the breakthrough is **naming the pattern family**, not memorizing one solution.

> 🎯 **Pattern Unlocked:** Kruskal's MST

---

*One quest down. The next one builds on this pattern. →*
