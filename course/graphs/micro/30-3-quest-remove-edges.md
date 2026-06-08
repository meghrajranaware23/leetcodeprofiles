# ⚔ Quest: Remove Max Edges

> **Day 30** · [Remove Max Number of Edges to Keep Graph Fully Traversable #1579](https://leetcode.com/problems/remove-max-number-of-edges-to-keep-graph-fully-traversable/) · Hard · 25 min · 60 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Remove Max Number of Edges to Keep Graph Fully Traversable on LeetCode](https://leetcode.com/problems/remove-max-number-of-edges-to-keep-graph-fully-traversable/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. Draw the graph. Trace the traversal. The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Remove Max Number of Edges to Keep Graph Fully Traversable #1579](https://leetcode.com/problems/remove-max-number-of-edges-to-keep-graph-fully-traversable/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? Think about **Dual Union-Find**.

If you're stuck after 5 minutes: revisit the concept page's visual walkthrough. Draw the graph and trace BFS/DFS by hand before looking at the solution structure.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Dual Union-Find

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

Apply Dual Union-Find step by step on this graph.
Draw it. Mark visited nodes at each step.
Watch the queue/stack grow and shrink.
```

> 💡 **The insight:** The code is just the paper trace written in syntax. If you can trace it by hand, you can code it.

---

## Solution

### C++
```cpp
class UF {
    vector<int> p, r;
    int comps;
public:
    UF(int n) : p(n + 1), r(n + 1), comps(n) { iota(p.begin(), p.end(), 0); }
    int find(int x) { return p[x] == x ? x : p[x] = find(p[x]); }
    bool unite(int a, int b) {
        a = find(a); b = find(b);
        if (a == b) return false;
        if (r[a] < r[b]) swap(a, b);
        p[b] = a;
        if (r[a] == r[b]) r[a]++;
        comps--;
        return true;
    }
    bool connected() { return comps == 1; }
};
class Solution {
public:
    int maxNumEdgesToRemove(int n, vector<vector<int>>& edges) {
        UF alice(n), bob(n);
        int used = 0;
        for (auto& e : edges)
            if (e[0] == 3 && (alice.unite(e[1], e[2]) | bob.unite(e[1], e[2]))) used++;
        for (auto& e : edges)
            if (e[0] == 1 && alice.unite(e[1], e[2])) used++;
        for (auto& e : edges)
            if (e[0] == 2 && bob.unite(e[1], e[2])) used++;
        if (!alice.connected() || !bob.connected()) return -1;
        return (int)edges.size() - used;
    }
};
```

### Python
```python
class Solution:
    def maxNumEdgesToRemove(self, n: int, edges: List[List[int]]) -> int:
        class UF:
            def __init__(self, n):
                self.p = list(range(n + 1))
                self.comps = n
            def find(self, x):
                while self.p[x] != x:
                    self.p[x] = self.p[self.p[x]]
                    x = self.p[x]
                return x
            def unite(self, a, b):
                ra, rb = self.find(a), self.find(b)
                if ra == rb: return False
                self.p[rb] = ra
                self.comps -= 1
                return True
        alice, bob = UF(n), UF(n)
        used = 0
        for t, u, v in edges:
            if t == 3 and (alice.unite(u, v) or bob.unite(u, v)):
                used += 1
        for t, u, v in edges:
            if t == 1 and alice.unite(u, v):
                used += 1
        for t, u, v in edges:
            if t == 2 and bob.unite(u, v):
                used += 1
        if alice.comps != 1 or bob.comps != 1:
            return -1
        return len(edges) - used
```

### Java
```java
class Solution {
    public int maxNumEdgesToRemove(int n, int[][] edges) {
        UF alice = new UF(n), bob = new UF(n);
        int used = 0;
        for (int[] e : edges)
            if (e[0] == 3 && alice.unite(e[1], e[2]) | bob.unite(e[1], e[2])) used++;
        for (int[] e : edges)
            if (e[0] == 1 && alice.unite(e[1], e[2])) used++;
        for (int[] e : edges)
            if (e[0] == 2 && bob.unite(e[1], e[2])) used++;
        if (!alice.connected() || !bob.connected()) return -1;
        return edges.length - used;
    }
    static class UF {
        int[] p, r; int comps;
        UF(int n) { p = new int[n + 1]; r = new int[n + 1]; comps = n; for (int i = 0; i <= n; i++) p[i] = i; }
        int find(int x) { return p[x] == x ? x : (p[x] = find(p[x])); }
        boolean unite(int a, int b) {
            a = find(a); b = find(b);
            if (a == b) return false;
            if (r[a] < r[b]) { int t = a; a = b; b = t; }
            p[b] = a; if (r[a] == r[b]) r[a]++; comps--; return true;
        }
        boolean connected() { return comps == 1; }
    }
}
```

**Complexity:** O(E · α(n)) time · O(n) space

---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"This is a graph problem"** → Draw it. Identify nodes and edges first.
- **"Dual Union-Find"** → Name the pattern from the concept page.
- **"BFS or DFS?"** → Shortest/levels = BFS. Connectivity/cycles = DFS.
- **"Visited set"** → Every graph traversal needs one.

If you tried DFS when BFS was cleaner (or vice versa), that's fine — the breakthrough is **naming the pattern family**, not memorizing one solution.

> 🎯 **Pattern Unlocked:** Dual Union-Find

---

*Both quests complete. Head to the checkpoint. →*
