<!-- hand-authored -->
# ⚔ Quest: Reorder Routes

> **Day 9** · [Reorder Routes to Make All Paths Lead to the City Zero #1466](https://leetcode.com/problems/reorder-routes-to-make-all-paths-lead-to-the-city-zero/) · Medium · 15 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Reorder Routes to Make All Paths Lead to the City Zero on LeetCode](https://leetcode.com/problems/reorder-routes-to-make-all-paths-lead-to-the-city-zero/)**

> ⚔ **Hunter's rule:** Build adjacency: for each `(a,b)` add `(b,1)` from a and `(a,0)` from b. DFS from 0; sum `cost` on tree edges. The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Reorder Routes to Make All Paths Lead to the City Zero #1466](https://leetcode.com/problems/reorder-routes-to-make-all-paths-lead-to-the-city-zero/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? **Edge Direction Reasoning** — DFS tree rooted at city 0. When you traverse `(parent → child)` against the original one-way sign, add 1 to flip count. `cost=1` means edge was pointing **toward** parent (wrong way for tree descent).

If you're stuck after 5 minutes: you don't try all flip combinations — one DFS pass counts misdirected edges in the tree.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Edge Direction Reasoning

**How to identify this from the problem statement:**
- Connected graph, unique paths between cities → tree-like DFS from 0 visits all
- "Reorder" / "change direction" → count wrong-way edges
- Goal: every city can reach 0 → all edges should point **toward** 0 in arborescence

| Keyword / phrase | What it signals |
|---|---|
| "reorder routes" | Flip minimum directed edges |
| "lead to city zero" | Root DFS at 0 |
| `connections[i] = [a,b]` means a→b | Encode direction in adjacency cost |
| "minimum number of changes" | Sum costs in DFS tree |

**Why this pattern works:** In the DFS tree from 0, each original edge is either aligned (flow toward 0) or misaligned (needs flip). Summing over tree edges counts each road once.

**How a strong solver thinks before coding:**
1. *"For (a,b): adj[a].push(b,1); adj[b].push(a,0)."*
2. *"dfs(u, parent): flips = sum(cost + dfs(v,u)) for v≠parent."*
3. *"Return dfs(0,-1)."*
4. *"cost=1 on edge u→v means original edge was v→u."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Try all 2^E flip subsets** | Exponential |
| **BFS from every city to 0** | Doesn't minimize flips directly |
| **Topological sort** | Tree with undirected walk — DFS simpler |
| **Forget parent guard** | Cycle in undirected view — use parent param |

**The insight brute force misses:** Orient every edge toward 0 in the DFS tree — count mismatches with one traversal.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [All Paths #797](https://leetcode.com/problems/all-paths-from-source-to-target/) | Collect paths | DFS on directed graph |
| [Redundant Connection #684](https://leetcode.com/problems/redundant-connection/) | Cycle in tree | Later rank — UF |
| [Minimum Height Trees #310](https://leetcode.com/problems/minimum-height-trees/) | Tree center | Different tree property |

---

## 📖 Walkthrough

**Misdirected edge count in DFS tree.**

```
connections: 0→1, 1→3, 2→0, 4→2

Build adj (u → v, cost):
  0: (1,1), (2,0)   // 0→1 ok; 2→0 reversed as 0→2 costs 0
  1: (0,0), (3,1)
  2: (0,1), (4,0)
  ...

dfs(0,-1):
  to 1: cost=1 (edge 0→1 correct? a→b from 0→1, going 0→1 costs 1? 
  Standard: edge (a,b) means a→b built.
  adj[a].push(b,1): traverse a→b in DFS costs 1 if... 

  Actually: adj[c[0]].push(c[1], 1) and adj[c[1]].push(c[0], 0)
  DFS 0→1: cost=1 means original was 1→0? No:
  From 0 to 1: if original is 0→1, we're going with arrow → cost should be 0.
  
  Code: adj[a].push(b,1) — traversing a to b costs 1 flip.
  Original a→b: going a→b in DFS costs 1? That means we PAY when following given direction.

  Correct interpretation in solution:
  adj[c[0]].push({c[1], 1}) — edge exists as c[0]→c[1]; if DFS goes c[0]→c[1], cost 1
  adj[c[1]].push({c[0], 0}) — reverse walk costs 0

  So cost=1 means we're using the edge in its given direction away from parent... 
  Parent 0, child 1: edge 0→1, cost=1 on adj[0]→1. That adds 1 flip?

  Edge (0,1) means 0→1. DFS 0→1 uses given direction → should NOT flip.
  adj[0].push(1,1) adds cost 1 when going 0→1 — hmm.

  Looking at code again: adj[c[0]].push({c[1], 1}) — when at c[0] we go to c[1] with cost 1.
  Original road is c[0]→c[1]. We want roads pointing TO 0. Road 0→1 points away from 0 → needs flip → cost 1. ✓

  adj[c[1]].push({c[0], 0}) — from 1 to 0, reverse of 0→1, cost 0 (aligned toward 0). ✓
```

> 💡 **The insight:** Encode each directed edge as `(forward, cost=1)` and `(backward, cost=0)` — DFS tree sums alignment tax.

---

## Solution

### C++
```cpp
class Solution {
    vector<vector<pair<int,int>>> adj;
    int dfs(int u, int parent) {
        int flips = 0;
        for (auto [v, cost] : adj[u]) {
            if (v != parent) flips += cost + dfs(v, u);
        }
        return flips;
    }
public:
    int minReorder(int n, vector<vector<int>>& connections) {
        adj.assign(n, {});
        for (auto& c : connections) {
            adj[c[0]].push_back({c[1], 1});
            adj[c[1]].push_back({c[0], 0});
        }
        return dfs(0, -1);
    }
};
```

### Python
```python
class Solution:
    def minReorder(self, n: int, connections: List[List[int]]) -> int:
        adj = [[] for _ in range(n)]
        for a, b in connections:
            adj[a].append((b, 1))
            adj[b].append((a, 0))
        def dfs(u, parent):
            return sum(cost + dfs(v, u) for v, cost in adj[u] if v != parent)
        return dfs(0, -1)
```

### Java
```java
class Solution {
    private List<List<int[]>> adj;
    public int minReorder(int n, int[][] connections) {
        adj = new ArrayList<>();
        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
        for (int[] c : connections) {
            adj.get(c[0]).add(new int[]{c[1], 1});
            adj.get(c[1]).add(new int[]{c[0], 0});
        }
        return dfs(0, -1);
    }
    private int dfs(int u, int parent) {
        int flips = 0;
        for (int[] e : adj.get(u))
            if (e[0] != parent) flips += e[1] + dfs(e[0], u);
        return flips;
    }
}
```

**Complexity:** O(n) time · O(n) space
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"All paths lead to 0"** → Root DFS at 0; edges should point toward root.
- **"cost 1 / cost 0 adjacency"** → Encodes flip penalty per traverse direction.
- **"Sum on tree edges"** → Each road counted once with parent guard.
- **"Not path enumeration"** → Different Day 9 flavor from All Paths.

> 🎯 **Pattern Unlocked:** Edge Direction Reasoning — misdirected edge count in DFS tree.

---

*Both quests complete. Head to the checkpoint. →*
