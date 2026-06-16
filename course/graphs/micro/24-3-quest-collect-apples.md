<!-- hand-authored -->
# ⚔ Quest: Min Time to Collect Apples

> **Day 24** · [Minimum Time to Collect All Apples in a Tree #1443](https://leetcode.com/problems/minimum-time-to-collect-all-apples-in-a-tree/) · Medium · 15 min · 30 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Minimum Time to Collect All Apples in a Tree on LeetCode](https://leetcode.com/problems/minimum-time-to-collect-all-apples-in-a-tree/)**

> ⚔ **Hunter's rule:** DFS from root 0. Only enter subtrees that contain apples. Each such branch costs +2 edge-crossings (down and back).

---

## The Problem

See the full problem statement on LeetCode: **[Minimum Time to Collect All Apples in a Tree #1443](https://leetcode.com/problems/minimum-time-to-collect-all-apples-in-a-tree/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

**Tree DFS + return cost** — not BFS, not Dijkstra.

- `dfs(u, parent)` returns `(appleCountInSubtree, tripTime)`.
- `total = 1 if hasApple[u] else 0` — this node counts toward "subtree has apples."
- For each child `v`: recurse; if child subtree has apples → `trips += t + 2`.
- Root starts at 0; answer is `dfs(0,-1).second`.

The `+2` = traverse edge parent↔child once down and once back.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Tree DFS + Return Cost

**How to identify this from the problem statement:**
- Undirected tree, rooted at 0
- Must collect apples, return to start
- Each edge traversal = 1 second
- Skip branches with no apples below

| Keyword / phrase | What it signals |
|---|---|
| "Tree" + "collect all" | Post-order aggregation |
| "Return to starting vertex" | Count round-trips on used edges |
| `hasApple[]` boolean array | Subtree pruning condition |

**Why this pattern works:** Optimal route is depth-first on apple-bearing branches only; no need for TSP.

**How a strong solver thinks before coding:**
1. *"Build adj from edges."*
2. *"dfs returns (hasAnyApple, edgeCrossings)."*
3. *"Child with sub>0 → add 2 + child.trips."*
4. *"Don't enter leaf-only-empty subtrees."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Visit every node** | Wastes 2·edge on barren subtrees |
| **BFS from root** | Doesn't compute round-trip edge count |
| **Try all permutations of apple nodes** | NP-hard overkill |
| **Forget +2 on return leg** | Undercount time |

**The insight:** Post-order tells you whether a child subtree is worth entering.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Time Needed to Inform All Employees #1376](https://leetcode.com/problems/time-needed-to-inform-all-employees/) | Tree BFS max depth | Day 15 cousin |
| [Min Time Collect Apples #1443](https://leetcode.com/problems/minimum-time-to-collect-all-apples-in-a-tree/) | Return cost | Subtree DFS |
| [Diameter of Binary Tree #543](https://leetcode.com/problems/diameter-of-binary-tree/) | Max path | Tree DFS combine |

---

## 📖 Walkthrough

```
    0
   / \
  1*  2
     /
    3*

Apples at 1 and 3. Root 0.

dfs(3): (1, 0)
dfs(1): (1, 0)
dfs(2): child 3 has apples → trips = 0+2 = 2
dfs(0): child 1 → +2; child 2 → +2+2 = 4 total? 

Trace: 0→1 (1), back (2), 0→2 (3), 2→3 (4), back (5), back (6)
Answer: 6 seconds
```

> 💡 **The insight:** `+2` per child subtree that contains any apple.

---

## Solution

### C++
```cpp
class Solution {
    vector<vector<int>> adj;
    vector<bool> has;
    pair<int,int> dfs(int u, int parent, vector<int>& cost) {
        int total = has[u] ? 1 : 0, trips = 0;
        for (int v : adj[u]) {
            if (v == parent) continue;
            auto [sub, t] = dfs(v, u, cost);
            total += sub;
            trips += t + (sub ? 2 : 0);
        }
        return {total, trips};
    }
public:
    int minTime(int n, vector<vector<int>>& edges, vector<bool>& hasApple) {
        adj.assign(n, {});
        for (auto& e : edges) { adj[e[0]].push_back(e[1]); adj[e[1]].push_back(e[0]); }
        has = hasApple;
        vector<int> dummy;
        return dfs(0, -1, dummy).second;
    }
};
```

### Python
```python
class Solution:
    def minTime(self, n: int, edges: List[List[int]], hasApple: List[bool]) -> int:
        adj = [[] for _ in range(n)]
        for a, b in edges:
            adj[a].append(b); adj[b].append(a)
        def dfs(u, parent):
            total = 1 if hasApple[u] else 0
            trips = 0
            for v in adj[u]:
                if v == parent: continue
                sub, t = dfs(v, u)
                total += sub
                trips += t + (2 if sub else 0)
            return total, trips
        return dfs(0, -1)[1]
```

### Java
```java
class Solution {
    private List<List<Integer>> adj;
    private boolean[] hasApple;
    public int minTime(int n, int[][] edges, boolean[] hasApple) {
        adj = new ArrayList<>();
        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
        for (int[] e : edges) { adj.get(e[0]).add(e[1]); adj.get(e[1]).add(e[0]); }
        this.hasApple = hasApple;
        return dfs(0, -1)[1];
    }
    private int[] dfs(int u, int parent) {
        int total = hasApple[u] ? 1 : 0, trips = 0;
        for (int v : adj.get(u)) {
            if (v == parent) continue;
            int[] sub = dfs(v, u);
            total += sub[0];
            trips += sub[1] + (sub[0] > 0 ? 2 : 0);
        }
        return new int[]{total, trips};
    }
}
```

**Complexity:** O(n) time · O(n) space
---

## 💭 What Should Have Clicked in Your Mind?

- **"Tree + collect + return home"** → DFS return-cost, not shortest path BFS.
- **"Skip empty subtrees"** → `sub ? 2 : 0` gate.
- **"Undirected edges counted twice"** → +2 per used child branch.
- **"Root at 0"** → fixed start, no choice of root.
- **"Pair with bomb quest"** → both Day 24: model graph/tree, then one traversal.

> 🎯 **Pattern Unlocked:** Tree DFS + Return Cost

---

*Both quests complete. Head to the checkpoint. →*
