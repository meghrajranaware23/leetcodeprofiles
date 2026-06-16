<!-- hand-authored -->
# ⚔ Quest: Redundant Connection

> **Day 17** · [Redundant Connection #684](https://leetcode.com/problems/redundant-connection/) · Medium · 15 min · 35 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Redundant Connection on LeetCode](https://leetcode.com/problems/redundant-connection/)**

> ⚔ **Hunter's rule:** Process edges in order. Before each union, ask: are u and v already in the same set? Draw the forest on paper — no BFS queue needed.

---

## The Problem

See the full problem statement on LeetCode: **[Redundant Connection #684](https://leetcode.com/problems/redundant-connection/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? **Union-Find cycle detection** — the first edge where `find(u) == find(v)` before union is the redundant one.

If you're stuck: trace edges on paper. After unions 1-2 and 2-3, adding 1-3 connects two nodes already sharing a root.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Union-Find Cycle Detection

**How to identify this from the problem statement:**
- Tree on n nodes has exactly n−1 edges; one extra edge creates **exactly one cycle**
- Edges given in order — return the **last** edge that closes a cycle
- Undirected — UF natural fit; no traversal order needed

| Keyword / phrase | What it signals |
|---|---|
| "redundant connection" / "edge that completes a cycle" | UF: same root before union |
| "return edge as [u,v]" | First offending edge in input order |
| "tree + one extra edge" | Cycle detection via UF |
| "shortest path" | **Not this** — BFS/Dijkstra |

**Why this pattern works:** Adding edge (u,v) to a connected component creates a cycle iff u and v were already connected — `find(u) == find(v)`.

**How a strong solver thinks before coding:**
1. *"Init parent[1..n], rank optional."*
2. *"For each edge: if find(u)==find(v) → return edge; else union(u,v)."*
3. *"Path compression in find."*
4. *"No BFS — Day 17 is merge, not walk."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **DFS cycle detect per new edge** | O(E · (V+E)) — UF is O(E · α(V)) |
| **Remove each edge and test connectivity** | O(E²) — overkill |
| **BFS from u to see if v reachable** | Works once but repeated — UF is direct |
| **Union without path compression** | Slower finds — still correct with compression |

**The insight brute force misses:** One pass, one check per edge: same root = cycle edge.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Redundant Connection II #685](https://leetcode.com/problems/redundant-connection-ii/) | Directed tree — extra cases | UF + edge order |
| [Accounts Merge #721](https://leetcode.com/problems/accounts-merge/) | Model emails as nodes | Union on shared rows |
| Kruskal's MST skip edge | Skip if same root | Same `find(u)!=find(v)` test |

Same skeleton: **find before union.**

---

## 📖 Walkthrough

**Edges: [1,2], [1,3], [2,3]**

```
Init: each node own root

[1,2]: find(1)≠find(2) → union → {1,2}
[1,3]: find(1)≠find(3) → union → {1,2,3}
[2,3]: find(2)==find(3) → SAME ROOT → return [2,3] ✓
```

```
parent after unions (conceptual):
  1 ← 2, 3   (one component)
  edge 2-3 would close cycle
```

> 💡 **The insight:** You're not exploring the graph — you're merging sets until one edge tries to merge a set with itself.

---

## Solution

### C++
```cpp
class Solution {
    vector<int> p, r;
    int find(int x) { return p[x] == x ? x : p[x] = find(p[x]); }
    bool unite(int a, int b) {
        a = find(a); b = find(b);
        if (a == b) return false;
        if (r[a] < r[b]) swap(a, b);
        p[b] = a;
        if (r[a] == r[b]) r[a]++;
        return true;
    }
public:
    vector<int> findRedundantConnection(vector<vector<int>>& edges) {
        int n = edges.size();
        p.resize(n + 1); r.assign(n + 1, 0);
        iota(p.begin(), p.end(), 0);
        for (auto& e : edges)
            if (!unite(e[0], e[1])) return e;
        return {};
    }
};
```

### Python
```python
class Solution:
    def findRedundantConnection(self, edges: List[List[int]]) -> List[int]:
        n = len(edges)
        p = list(range(n + 1))
        def find(x):
            while p[x] != x:
                p[x] = p[p[x]]
                x = p[x]
            return x
        for a, b in edges:
            ra, rb = find(a), find(b)
            if ra == rb: return [a, b]
            p[rb] = ra
        return []
```

### Java
```java
class Solution {
    private int[] p;
    public int[] findRedundantConnection(int[][] edges) {
        int n = edges.length;
        p = new int[n + 1];
        for (int i = 0; i <= n; i++) p[i] = i;
        for (int[] e : edges) {
            if (!unite(e[0], e[1])) return e;
        }
        return new int[0];
    }
    private int find(int x) { return p[x] == x ? x : (p[x] = find(p[x])); }
    private boolean unite(int a, int b) {
        a = find(a); b = find(b);
        if (a == b) return false;
        p[b] = a;
        return true;
    }
}
```

**Complexity:** O(n · α(n)) time · O(n) space
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Tree plus one edge"** → exactly one cycle; find the edge that closes it.
- **"Process in order"** → first same-root edge in the list wins.
- **"find before union"** → same root = redundant.
- **"Not BFS"** → Day 17 merge pattern; parent[] only.

If you reached for BFS, switch to UF — this is the first B-Rank concept without a queue.

> 🎯 **Pattern Unlocked:** Union-Find Cycle Detection

---

*One quest down. The next one counts components and spare cables. →*
