<!-- hand-authored -->
# ⚔ Quest: All Ancestors in DAG

> **Day 14** · [All Ancestors of a Node in a Directed Acyclic Graph #2192](https://leetcode.com/problems/all-ancestors-of-a-node-in-a-directed-acyclic-graph/) · Medium · 15 min · 25 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open All Ancestors of a Node in a Directed Acyclic Graph on LeetCode](https://leetcode.com/problems/all-ancestors-of-a-node-in-a-directed-acyclic-graph/)**

> ⚔ **Hunter's rule:** For each node `i`, DFS outward from `i` collecting all reachable nodes (excluding `i`). DAG = no infinite loops — visited set suffices.

---

## The Problem

See the full problem statement on LeetCode: **[All Ancestors of a Node in a Directed Acyclic Graph #2192](https://leetcode.com/problems/all-ancestors-of-a-node-in-a-directed-acyclic-graph/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Build forward adjacency. For each `i`, run DFS from `i`, add each newly visited node to `ancestors[i]`. Sort each list at the end. Alternative: topo order + set merge — today's quest uses per-source DFS.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** DAG Reachability / Ancestor Accumulation

**How to identify this from the problem statement:**
- Explicit DAG — no cycle handling
- Need all nodes reachable along outgoing edges from each start
- Output sorted ancestor lists

| Keyword / phrase | What it signals |
|---|---|
| "ancestors in a DAG" | Reachability from each node |
| "directed acyclic" | DFS with visited — no cycle fear |
| Sorted output | Sort after collection |

**Why this pattern works:** From node `i`, every ancestor is reachable via forward DFS. DAG guarantees finite exploration.

**How a strong solver thinks before coding:**
1. *"Build adj[u] = outgoing neighbors."*
2. *"For each i: DFS(i,i,vis), collect visited nodes."*
3. *"Sort each result list."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Enumerate all paths** | Exponential path count |
| **No visited set** | Revisit nodes wastefully (still terminates on DAG) |
| **Reverse graph from each sink** | Works but overkill for this constraint size |

**The insight:** n ≤ 500 — O(n · (V+E)) DFS per source is acceptable.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Course Schedule IV #1462](https://leetcode.com/problems/course-schedule-iv/) | Precompute reachability matrix | Day 15 |
| [Minimum Vertices #1557](https://leetcode.com/problems/minimum-number-of-vertices-to-reach-all-nodes/) | Source scan only | Previous quest |
| [Loud and Rich #851](https://leetcode.com/problems/loud-and-rich/) | Weighted pick on DAG | C-test 3 |

---

## 📖 Walkthrough

```
n=4, edges = [[0,1],[1,2],[0,3],[3,2]]

    0 → 1 → 2
    ↓       ↑
    3 ──────┘

From 0: reach {1,3,2} → anc[0]=[1,2,3]
From 1: reach {2} → anc[1]=[2]
From 2: reach {} → anc[2]=[]
From 3: reach {2} → anc[3]=[2]
```

> 💡 **The insight:** Forward DFS from each node — ancestors = reachable set minus self.

---

## Solution

### C++
```cpp
class Solution {
    vector<vector<int>> adj, ancestors;
    void dfs(int src, int u, vector<bool>& vis) {
        for (int v : adj[u]) {
            if (!vis[v]) {
                vis[v] = true;
                ancestors[src].push_back(v);
                dfs(src, v, vis);
            }
        }
    }
public:
    vector<vector<int>> getAncestors(int n, vector<vector<int>>& edges) {
        adj.assign(n, {});
        for (auto& e : edges) adj[e[0]].push_back(e[1]);
        ancestors.assign(n, {});
        for (int i = 0; i < n; i++) {
            vector<bool> vis(n);
            dfs(i, i, vis);
            sort(ancestors[i].begin(), ancestors[i].end());
        }
        return ancestors;
    }
};
```

### Python
```python
class Solution:
    def getAncestors(self, n: int, edges: List[List[int]]) -> List[List[int]]:
        adj = [[] for _ in range(n)]
        for u, v in edges:
            adj[u].append(v)
        res = []
        for i in range(n):
            vis = [False] * n
            anc = []
            def dfs(u):
                for v in adj[u]:
                    if not vis[v]:
                        vis[v] = True
                        anc.append(v)
                        dfs(v)
            dfs(i)
            res.append(sorted(anc))
        return res
```

### Java
```java
class Solution {
    private List<List<Integer>> adj;
    public List<List<Integer>> getAncestors(int n, int[][] edges) {
        adj = new ArrayList<>();
        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
        for (int[] e : edges) adj.get(e[0]).add(e[1]);
        List<List<Integer>> res = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            boolean[] vis = new boolean[n];
            List<Integer> anc = new ArrayList<>();
            dfs(i, vis, anc);
            Collections.sort(anc);
            res.add(anc);
        }
        return res;
    }
    private void dfs(int u, boolean[] vis, List<Integer> anc) {
        for (int v : adj.get(u)) {
            if (!vis[v]) {
                vis[v] = true;
                anc.add(v);
                dfs(v, vis, anc);
            }
        }
    }
}
```

**Complexity:** O(n · (V + E)) time · O(n²) space
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"DAG → DFS won't loop forever."**
- **"From each i, walk forward."** → collect reachable nodes.
- **"Visited per source DFS."** → separate search spaces.
- **"Day 15 will precompute this for queries."** → same reachability idea.

> 🎯 **Pattern Unlocked:** DAG Ancestor Accumulation via DFS

---

*Both quests complete. Head to the checkpoint. →*
