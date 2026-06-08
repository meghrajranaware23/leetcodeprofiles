# ⚔ Quest: Maximal Network Rank

> **Day 27** · [Maximal Network Rank #1615](https://leetcode.com/problems/maximal-network-rank/) · Medium · 15 min · 35 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Maximal Network Rank on LeetCode](https://leetcode.com/problems/maximal-network-rank/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. Draw the graph. Trace the traversal. The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Maximal Network Rank #1615](https://leetcode.com/problems/maximal-network-rank/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? Think about **Adjacency Set Intersection**.

If you're stuck after 5 minutes: revisit the concept page's visual walkthrough. Draw the graph and trace BFS/DFS by hand before looking at the solution structure.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Adjacency Set Intersection

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

Apply Adjacency Set Intersection step by step on this graph.
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
    int maximalNetworkRank(int n, vector<vector<int>>& roads) {
        vector<int> deg(n);
        vector<vector<bool>> edge(n, vector<bool>(n));
        for (auto& r : roads) {
            deg[r[0]]++; deg[r[1]]++;
            edge[r[0]][r[1]] = edge[r[1]][r[0]] = true;
        }
        int best = 0;
        for (int i = 0; i < n; i++)
            for (int j = i + 1; j < n; j++) {
                int rank = deg[i] + deg[j] - (edge[i][j] ? 1 : 0);
                best = max(best, rank);
            }
        return best;
    }
};
```

### Python
```python
class Solution:
    def maximalNetworkRank(self, n: int, roads: List[List[int]]) -> int:
        deg = [0] * n
        edge = set()
        for a, b in roads:
            deg[a] += 1; deg[b] += 1
            edge.add((min(a, b), max(a, b)))
        return max(deg[i] + deg[j] - ((min(i, j), max(i, j)) in edge)
                   for i in range(n) for j in range(i + 1, n))
```

### Java
```java
class Solution {
    public int maximalNetworkRank(int n, int[][] roads) {
        int[] deg = new int[n];
        boolean[][] edge = new boolean[n][n];
        for (int[] r : roads) {
            deg[r[0]]++; deg[r[1]]++;
            edge[r[0]][r[1]] = edge[r[1]][r[0]] = true;
        }
        int best = 0;
        for (int i = 0; i < n; i++)
            for (int j = i + 1; j < n; j++)
                best = Math.max(best, deg[i] + deg[j] - (edge[i][j] ? 1 : 0));
        return best;
    }
}
```

**Complexity:** O(n² + E) time · O(n²) space

---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"This is a graph problem"** → Draw it. Identify nodes and edges first.
- **"Adjacency Set Intersection"** → Name the pattern from the concept page.
- **"BFS or DFS?"** → Shortest/levels = BFS. Connectivity/cycles = DFS.
- **"Visited set"** → Every graph traversal needs one.

If you tried DFS when BFS was cleaner (or vice versa), that's fine — the breakthrough is **naming the pattern family**, not memorizing one solution.

> 🎯 **Pattern Unlocked:** Adjacency Set Intersection

---

*Both quests complete. Head to the checkpoint. →*
