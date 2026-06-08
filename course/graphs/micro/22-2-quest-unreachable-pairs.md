# ⚔ Quest: Count Unreachable Pairs

> **Day 22** · [Count Unreachable Pairs of Nodes in an Undirected Graph #2316](https://leetcode.com/problems/count-unreachable-pairs-of-nodes-in-an-undirected-graph/) · Medium · 15 min · 35 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Count Unreachable Pairs of Nodes in an Undirected Graph on LeetCode](https://leetcode.com/problems/count-unreachable-pairs-of-nodes-in-an-undirected-graph/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. Draw the graph. Trace the traversal. The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Count Unreachable Pairs of Nodes in an Undirected Graph #2316](https://leetcode.com/problems/count-unreachable-pairs-of-nodes-in-an-undirected-graph/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? Think about **Component Size Math**.

If you're stuck after 5 minutes: revisit the concept page's visual walkthrough. Draw the graph and trace BFS/DFS by hand before looking at the solution structure.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Component Size Math

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

Apply Component Size Math step by step on this graph.
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
public:
    long long countPairs(int n, vector<vector<int>>& edges) {
        p.resize(n); r.assign(n, 0);
        iota(p.begin(), p.end(), 0);
        for (auto& e : edges) unite(e[0], e[1]);
        unordered_map<int, long long> size;
        for (int i = 0; i < n; i++) size[find(i)]++;
        long long unreachable = 0;
        for (auto& [root, cnt] : size)
            unreachable += cnt * (n - cnt);
        return unreachable / 2;
    }
};
```

### Python
```python
class Solution:
    def countPairs(self, n: int, edges: List[List[int]]) -> int:
        p = list(range(n))
        def find(x):
            while p[x] != x:
                p[x] = p[p[x]]
                x = p[x]
            return x
        for a, b in edges:
            p[find(b)] = find(a)
        from collections import Counter
        sizes = Counter(find(i) for i in range(n))
        unreachable = sum(c * (n - c) for c in sizes.values())
        return unreachable // 2
```

### Java
```java
class Solution {
    private int[] p;
    public long countPairs(int n, int[][] edges) {
        p = new int[n];
        for (int i = 0; i < n; i++) p[i] = i;
        for (int[] e : edges) unite(e[0], e[1]);
        Map<Integer, Long> size = new HashMap<>();
        for (int i = 0; i < n; i++) size.merge(find(i), 1L, Long::sum);
        long unreachable = 0;
        for (long cnt : size.values()) unreachable += cnt * (n - cnt);
        return unreachable / 2;
    }
    private int find(int x) { return p[x] == x ? x : (p[x] = find(p[x])); }
    private void unite(int a, int b) { p[find(b)] = find(a); }
}
```

**Complexity:** O(E · α(n)) time · O(n) space

---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"This is a graph problem"** → Draw it. Identify nodes and edges first.
- **"Component Size Math"** → Name the pattern from the concept page.
- **"BFS or DFS?"** → Shortest/levels = BFS. Connectivity/cycles = DFS.
- **"Visited set"** → Every graph traversal needs one.

If you tried DFS when BFS was cleaner (or vice versa), that's fine — the breakthrough is **naming the pattern family**, not memorizing one solution.

> 🎯 **Pattern Unlocked:** Component Size Math

---

*One quest down. The next one builds on this pattern. →*
