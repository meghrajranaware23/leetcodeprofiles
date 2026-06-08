# ⚔ Quest: Shortest Path with Alternating Colors

> **Day 22** · [Shortest Path with Alternating Colors #1129](https://leetcode.com/problems/shortest-path-with-alternating-colors/) · Medium · 15 min · 35 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Shortest Path with Alternating Colors on LeetCode](https://leetcode.com/problems/shortest-path-with-alternating-colors/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. Draw the graph. Trace the traversal. The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Shortest Path with Alternating Colors #1129](https://leetcode.com/problems/shortest-path-with-alternating-colors/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? Think about **BFS with State (node, color)**.

If you're stuck after 5 minutes: revisit the concept page's visual walkthrough. Draw the graph and trace BFS/DFS by hand before looking at the solution structure.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** BFS with State (node, color)

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

Apply BFS with State (node, color) step by step on this graph.
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
    vector<int> shortestAlternatingPaths(int n, vector<vector<int>>& redEdges, vector<vector<int>>& blueEdges) {
        vector<vector<pair<int,int>>> adj(n);
        for (auto& e : redEdges) adj[e[0]].push_back({e[1], 0});
        for (auto& e : blueEdges) adj[e[0]].push_back({e[1], 1});
        vector<vector<int>> dist(n, vector<int>(2, -1));
        queue<tuple<int,int,int>> q;
        q.push({0, -1, 0});
        dist[0][0] = dist[0][1] = 0;
        while (!q.empty()) {
            auto [u, prev, d] = q.front(); q.pop();
            for (auto [v, color] : adj[u]) {
                if (color == prev) continue;
                if (dist[v][color] == -1) {
                    dist[v][color] = d + 1;
                    q.push({v, color, d + 1});
                }
            }
        }
        vector<int> ans(n);
        for (int i = 0; i < n; i++) {
            if (dist[i][0] == -1 && dist[i][1] == -1) ans[i] = -1;
            else if (dist[i][0] == -1) ans[i] = dist[i][1];
            else if (dist[i][1] == -1) ans[i] = dist[i][0];
            else ans[i] = min(dist[i][0], dist[i][1]);
        }
        return ans;
    }
};
```

### Python
```python
class Solution:
    def shortestAlternatingPaths(self, n: int, redEdges: List[List[int]], blueEdges: List[List[int]]) -> List[int]:
        adj = [[] for _ in range(n)]
        for u, v in redEdges: adj[u].append((v, 0))
        for u, v in blueEdges: adj[u].append((v, 1))
        dist = [[-1, -1] for _ in range(n)]
        q = deque([(0, -1, 0)])
        dist[0][0] = dist[0][1] = 0
        while q:
            u, prev, d = q.popleft()
            for v, color in adj[u]:
                if color == prev: continue
                if dist[v][color] == -1:
                    dist[v][color] = d + 1
                    q.append((v, color, d + 1))
        ans = []
        for i in range(n):
            if dist[i][0] == -1 and dist[i][1] == -1: ans.append(-1)
            elif dist[i][0] == -1: ans.append(dist[i][1])
            elif dist[i][1] == -1: ans.append(dist[i][0])
            else: ans.append(min(dist[i][0], dist[i][1]))
        return ans
```

### Java
```java
class Solution {
    public int[] shortestAlternatingPaths(int n, int[][] redEdges, int[][] blueEdges) {
        List<int[]>[] adj = new List[n];
        for (int i = 0; i < n; i++) adj[i] = new ArrayList<>();
        for (int[] e : redEdges) adj[e[0]].add(new int[]{e[1], 0});
        for (int[] e : blueEdges) adj[e[0]].add(new int[]{e[1], 1});
        int[][] dist = new int[n][2];
        for (int[] row : dist) Arrays.fill(row, -1);
        Queue<int[]> q = new ArrayDeque<>();
        q.offer(new int[]{0, -1, 0});
        dist[0][0] = dist[0][1] = 0;
        while (!q.isEmpty()) {
            int[] cur = q.poll();
            for (int[] e : adj[cur[0]]) {
                if (e[1] == cur[1]) continue;
                if (dist[e[0]][e[1]] == -1) {
                    dist[e[0]][e[1]] = cur[2] + 1;
                    q.offer(new int[]{e[0], e[1], cur[2] + 1});
                }
            }
        }
        int[] ans = new int[n];
        for (int i = 0; i < n; i++) {
            if (dist[i][0] == -1 && dist[i][1] == -1) ans[i] = -1;
            else if (dist[i][0] == -1) ans[i] = dist[i][1];
            else if (dist[i][1] == -1) ans[i] = dist[i][0];
            else ans[i] = Math.min(dist[i][0], dist[i][1]);
        }
        return ans;
    }
}
```

**Complexity:** O(V + E) time · O(V + E) space

---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"This is a graph problem"** → Draw it. Identify nodes and edges first.
- **"BFS with State (node, color)"** → Name the pattern from the concept page.
- **"BFS or DFS?"** → Shortest/levels = BFS. Connectivity/cycles = DFS.
- **"Visited set"** → Every graph traversal needs one.

If you tried DFS when BFS was cleaner (or vice versa), that's fine — the breakthrough is **naming the pattern family**, not memorizing one solution.

> 🎯 **Pattern Unlocked:** BFS with State (node, color)

---

*Both quests complete. Head to the checkpoint. →*
