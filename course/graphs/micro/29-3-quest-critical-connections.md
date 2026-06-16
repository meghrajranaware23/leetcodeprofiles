<!-- hand-authored -->
# ⚔ Quest: Critical Connections

> **Day 29** · [Critical Connections in a Network #1192](https://leetcode.com/problems/critical-connections-in-a-network/) · Hard · 25 min · 60 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Critical Connections in a Network on LeetCode](https://leetcode.com/problems/critical-connections-in-a-network/)**

> ⚔ **Hunter's rule:** Trace disc/low on paper for a small graph. Mark tree edges; bridge when `low[v] > disc[u]`. Not BFS — timestamp DFS only.

---

## The Problem

See the full problem statement on LeetCode: **[Critical Connections in a Network #1192](https://leetcode.com/problems/critical-connections-in-a-network/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

**Tarjan's bridges** — undirected graph, find edges whose removal disconnects.

- `disc[u]`, `low[u]` — discovery time and earliest reachable disc from subtree.
- Tree edge to child v: after `dfs(v,u)`, if `low[v] > disc[u]` → `(u,v)` is critical.
- Back edge to visited v (v ≠ parent): `low[u] = min(low[u], disc[v])`.
- Run from every unvisited node (graph may be connected, but template handles all).

Not Union-Find. Not BFS level order.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Tarjan's Bridges

**How to identify this from the problem statement:**
- "Critical connection" / "removing disconnects" → bridge detection
- Undirected network → adjacency both ways
- Output edge list → Tarjan, not connectivity count

| Keyword / phrase | What it signals |
|---|---|
| "critical" / "bridge" | low-link bridge test |
| "if removed, some nodes unreachable" | Edge cut — not articulation point (node) |
| Undirected edges | DFS tree + back edges update low |
| n up to 10⁵ | O(V+E) Tarjan required |

**Why this pattern works:** `low[v] > disc[u]` means v's entire subtree has no back edge to u or above — the only link is tree edge `(u,v)`.

**How a strong solver thinks before coding:**
1. *"Edge removal problem on undirected graph?"* → Tarjan bridges.
2. *"Assign disc/low on DFS entry; propagate min on backtrack."*
3. *"Back edge: low[u] = min(low[u], disc[v]) — not low[v]."*
4. *"Skip parent to avoid false back edge."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Remove each edge, BFS connectivity** | O(E · (V+E)) — too slow |
| **Union-Find only** | Finds MST/cycles, not bridges directly |
| **BFS from each node** | Doesn't identify cut edges |
| **Tarjan without parent skip** | Treats tree edge as back edge — wrong low |
| **Compare low[v] with disc[v] for bridges** | Correct test is `low[v] > disc[u]` |

**The insight:** One DFS pass records enough structure (disc/low) to classify every tree edge as bridge or not.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Critical Connections #1192](https://leetcode.com/problems/critical-connections-in-a-network/) | Undirected, list bridges | Tarjan low-link |
| [1192 variant — articulation points](https://leetcode.com/problems/critical-connections-in-a-network/) | Node cuts vs edge cuts | Related Tarjan (root rule differs) |
| [Redundant Connection #684](https://leetcode.com/problems/redundant-connection/) | Day 17 UF | Different tool — cycle not bridge |

---

## 📖 Walkthrough

```
Chain: 0 — 1 — 2 — 3

dfs(0,-1): disc[0]=1, low[0]=1
  dfs(1,0): disc[1]=2, low[1]=2
    dfs(2,1): disc[2]=3, low[2]=3
      dfs(3,2): disc[3]=4, low[3]=4
      backtrack: (2,3) low[3]=4 > disc[2]=3 → BRIDGE
    backtrack: (1,2) low[2]=3 > disc[1]=2 → BRIDGE
  backtrack: (0,1) low[1]=2 > disc[0]=1 → BRIDGE

All three edges critical in a chain.
```

> 💡 **The insight:** Trace disc/low numbers on paper — bridge test is one comparison per tree edge.

---

## Solution

### C++
```cpp
class Solution {
    vector<vector<int>> adj;
    vector<int> disc, low;
    vector<vector<int>> res;
    int timer = 0;
    void dfs(int u, int parent) {
        disc[u] = low[u] = ++timer;
        for (int v : adj[u]) {
            if (!disc[v]) {
                dfs(v, u);
                low[u] = min(low[u], low[v]);
                if (low[v] > disc[u]) res.push_back({u, v});
            } else if (v != parent) {
                low[u] = min(low[u], disc[v]);
            }
        }
    }
public:
    vector<vector<int>> criticalConnections(int n, vector<vector<int>>& connections) {
        adj.resize(n);
        for (auto& c : connections) {
            adj[c[0]].push_back(c[1]);
            adj[c[1]].push_back(c[0]);
        }
        disc.assign(n, 0);
        low.assign(n, 0);
        for (int i = 0; i < n; i++)
            if (!disc[i]) dfs(i, -1);
        return res;
    }
};
```

### Python
```python
class Solution:
    def criticalConnections(self, n: int, connections: List[List[int]]) -> List[List[int]]:
        adj = [[] for _ in range(n)]
        for u, v in connections:
            adj[u].append(v); adj[v].append(u)
        disc = [0] * n
        low = [0] * n
        res = []
        timer = 0
        def dfs(u, parent):
            nonlocal timer
            timer += 1
            disc[u] = low[u] = timer
            for v in adj[u]:
                if not disc[v]:
                    dfs(v, u)
                    low[u] = min(low[u], low[v])
                    if low[v] > disc[u]:
                        res.append(sorted([u, v]))
                elif v != parent:
                    low[u] = min(low[u], disc[v])
        for i in range(n):
            if not disc[i]:
                dfs(i, -1)
        return res
```

### Java
```java
class Solution {
    private List<List<Integer>> adj;
    private int[] disc, low;
    private int timer = 0;
    private List<List<Integer>> res = new ArrayList<>();
    public List<List<Integer>> criticalConnections(int n, List<List<Integer>> connections) {
        adj = new ArrayList<>();
        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
        for (List<Integer> c : connections) {
            adj.get(c.get(0)).add(c.get(1));
            adj.get(c.get(1)).add(c.get(0));
        }
        disc = new int[n];
        low = new int[n];
        for (int i = 0; i < n; i++)
            if (disc[i] == 0) dfs(i, -1);
        return res;
    }
    private void dfs(int u, int parent) {
        disc[u] = low[u] = ++timer;
        for (int v : adj.get(u)) {
            if (disc[v] == 0) {
                dfs(v, u);
                low[u] = Math.min(low[u], low[v]);
                if (low[v] > disc[u]) res.add(List.of(u, v));
            } else if (v != parent) {
                low[u] = Math.min(low[u], disc[v]);
            }
        }
    }
}
```

**Complexity:** O(V + E) time · O(V + E) space
---

## 💭 What Should Have Clicked in Your Mind?

- **"Removing this edge disconnects"** → bridge → Tarjan `low[v] > disc[u]`.
- **Undirected DFS** — pass parent, skip back to parent.
- **Back edge updates low with disc[v]** — not low[v].
- **Not BFS** — timestamps come from depth-first tree.

> 🎯 **Pattern Unlocked:** Tarjan's Bridges

---

*Both quests complete. Head to the checkpoint. →*
