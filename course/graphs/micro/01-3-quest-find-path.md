<!-- hand-authored -->
# ⚔ Quest: Find if Path Exists

> **Day 1** · [Find if Path Exists in Graph #1971](https://leetcode.com/problems/find-if-path-exists-in-graph/) · Easy · 10 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Find if Path Exists in Graph on LeetCode](https://leetcode.com/problems/find-if-path-exists-in-graph/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. Draw nodes `0…n-1`, add each edge, then ask: *"Is destination reachable from source?"* The hints below are for *after* your attempt.

---

## The Problem

You have an **undirected** graph with `n` nodes and an edge list. Return `true` if there is a valid path from `source` to `destination`, else `false`.

```
Input:  n = 3, edges = [[0,1],[1,2],[2,3]], source = 0, destination = 3
Output: true

Input:  n = 6, edges = [[0,1],[0,2],[3,5],[5,4],[4,3]], source = 0, destination = 5
Output: false
Explanation: {0,1,2} and {3,4,5} are separate components.
```

---

## 💡 Hints

Which pattern from today's concept applies? **Adjacency list + connectivity** — are `source` and `destination` in the same component?

**Hint 1:** Build an adjacency list: for each `[u,v]`, add `v` to `adj[u]` and `u` to `adj[v]`.

**Hint 2:** Classic approach: DFS/BFS from `source` with a `visited` set; return true if you ever reach `destination`.

**Hint 3:** This graph is static — **Union-Find** also works: unite every edge, then check `find(source) == find(destination)`.

**Hint 4:** If `source == destination`, return true immediately.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Adjacency List + Connectivity (Union-Find in solution)

**How to identify this from the problem statement:**
- Undirected `edges` → build symmetric adjacency OR merge components
- "Path exists" → same connected component, not shortest path
- Single query → any O(E) preprocessing is fine
- No weights → no Dijkstra

| Keyword / phrase | What it signals |
|---|---|
| "path exists" / "can traverse" | Connectivity check |
| `edges` + `n` nodes | Build graph structure first |
| Undirected | Bidirectional adjacency |
| `source` and `destination` | Compare component membership |
| No "shortest" / "minimum steps" | BFS not required (though it works) |

**Why this pattern works:** In an undirected graph, a path exists iff both nodes belong to the same connected component. Union-Find merges components as you read edges; DFS/BFS explores from source.

**How a strong solver thinks before coding:**
1. *"Build adj from edges (both directions)."*
2. *"Alternative: UF — unite(u,v) for each edge."*
3. *"Answer: find(source) == find(destination)."*
4. *"Example 2: 0 and 5 never unite → false."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Try every permutation of nodes** | Factorial — absurd on n up to 10⁵ |
| **Re-walk all edges from source each step** | No visited tracking → cycles / repeated work |
| **Only check direct edge source–destination** | Path can be multi-hop: 0–1–2–3 |
| **Build adjacency but forget undirected reverse edge** | Half the graph missing |
| **DFS without visited set on cyclic graph** | Infinite recursion |

**The insight brute force misses:** Connectivity is a **component** question. Merge or mark once — don't enumerate paths.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| Number of Provinces #547 (Day 3) | Count components, not one query | Same "same group?" logic |
| Keys and Rooms #841 (Day 3) | Directed reachability from node 0 | DFS from source with visited |
| Graph valid tree (later) | Exactly n−1 edges + connected | UF or DFS |

Day 1 stores the graph; Day 3 will **walk** it with DFS. Same connectivity idea, different interface.

---

## 📖 Walkthrough

**Edges → unite components → compare roots.**

```
n = 4, edges = [[0,1],[2,3]], source = 0, destination = 3

Unions:  unite(0,1)  →  {0,1} | {2,3}
         unite(2,3)  →  {0,1} | {2,3}

find(0) = 0,  find(3) = 3  →  different roots  →  false ✓

n = 4, edges = [[0,1],[1,2],[2,3]], source = 0, destination = 3
All merge into one component  →  find(0) == find(3)  →  true ✓
```

> 💡 **The insight:** You don't need the actual path — only whether two nodes share a component. Union-Find answers that in near-constant time per query after O(E) setup.

---

## Solution

### C++
```cpp
class Solution {
    vector<int> p;
    int find(int x) { return p[x] == x ? x : p[x] = find(p[x]); }
    void unite(int a, int b) { p[find(b)] = find(a); }
public:
    bool validPath(int n, vector<vector<int>>& edges, int source, int destination) {
        p.resize(n);
        iota(p.begin(), p.end(), 0);
        for (auto& e : edges) unite(e[0], e[1]);
        return find(source) == find(destination);
    }
};
```

### Python
```python
class Solution:
    def validPath(self, n: int, edges: List[List[int]], source: int, destination: int) -> bool:
        p = list(range(n))
        def find(x):
            while p[x] != x:
                p[x] = p[p[x]]
                x = p[x]
            return x
        for a, b in edges:
            p[find(b)] = find(a)
        return find(source) == find(destination)
```

### Java
```java
class Solution {
    private int[] p;
    public boolean validPath(int n, int[][] edges, int source, int destination) {
        p = new int[n];
        for (int i = 0; i < n; i++) p[i] = i;
        for (int[] e : edges) unite(e[0], e[1]);
        return find(source) == find(destination);
    }
    private int find(int x) { return p[x] == x ? x : (p[x] = find(p[x])); }
    private void unite(int a, int b) { p[find(b)] = find(a); }
}
```

**Complexity:** O(E · α(n)) time · O(n) space
---

## 💭 What Should Have Clicked in Your Mind?

- **"Path exists" in undirected graph** → same connected component.
- **Build from edges first** → adjacency list or Union-Find — Day 1 representation habit.
- **DFS from source** is the mental picture even if you code UF here.
- **Separate components in Example 2** → no path regardless of n.

If you coded DFS/BFS instead of UF, that's equally valid — the breakthrough is naming **connectivity**, not memorizing one implementation.

> 🎯 **Pattern Unlocked:** Graph from edge list → answer "same component?"

---

*Both quests complete. Head to the checkpoint. →*
