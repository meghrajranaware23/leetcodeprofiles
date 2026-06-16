<!-- hand-authored -->
# ⚔ Quest: Possible Bipartition

> **Day 13** · [Possible Bipartition #886](https://leetcode.com/problems/possible-bipartition/) · Medium · 15 min · 25 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Possible Bipartition on LeetCode](https://leetcode.com/problems/possible-bipartition/)**

> ⚔ **Hunter's rule:** Step 1 — build the conflict graph. Each dislike `[a,b]` → undirected edge. Step 2 — 2-color DFS/BFS from #785.

---

## The Problem

See the full problem statement on LeetCode: **[Possible Bipartition #886](https://leetcode.com/problems/possible-bipartition/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

People are nodes 1..n. **Dislike = must be in different groups = edge in conflict graph.** Then run the exact bipartite check from the previous quest.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Conflict Graph Coloring

**How to identify this from the problem statement:**
- Partition people into two teams
- Pair constraints ("dislike") = can't share team
- No graph given — you construct it

| Keyword / phrase | What it signals |
|---|---|
| "dislikes" / "cannot stand each other" | Undirected conflict edge |
| "two groups" / "bipartition" | 2-color the built graph |
| People numbered 1..n | 1-indexed adjacency |

**Why this pattern works:** Valid partition ⟺ conflict graph is bipartite.

**How a strong solver thinks before coding:**
1. *"Build g[a].push(b); g[b].push(a) for each dislike."*
2. *"2-color DFS/BFS on 1..n."*
3. *"Same color on edge → false."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Try all 2^n assignments** | O(2^n) |
| **Greedy assign without propagation** | Misses transitive conflicts (A-B, B-C forces A≠C) |
| **Directed edges for dislikes** | Undirected — conflict is mutual |

**The insight:** Graph construction is half the problem. Transitive dislikes propagate through BFS levels.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Is Graph Bipartite? #785](https://leetcode.com/problems/is-graph-bipartite/) | Graph given | Previous quest |
| [Flower Planting #1042](https://leetcode.com/problems/flower-planting-with-no-adjacent/) | Adjacent gardens conflict | C-test — greedy coloring |
| [Divide Array Into Increasing Pairs #2176](https://leetcode.com/problems/divide-array-into-increasing-pairs/) | Different domain | Not bipartite |

---

## 📖 Walkthrough

```
n=4, dislikes = [[1,2],[1,3],[2,4]]

Conflict graph:
  1 — 2 — 4
  |
  3

DFS: 1→0, 2→1, 3→1, 4→0
Edge 2—4: colors 1 vs 0 ✓
Edge 1—3: 0 vs 1 ✓ → true
```

> 💡 **The insight:** You never compare people directly — the graph carries transitive constraints.

---

## Solution

### C++
```cpp
class Solution {
    vector<int> color;
    bool dfs(vector<vector<int>>& g, int u, int c) {
        color[u] = c;
        for (int v : g[u]) {
            if (color[v] == -1) { if (!dfs(g, v, c ^ 1)) return false; }
            else if (color[v] == color[u]) return false;
        }
        return true;
    }
public:
    bool possibleBipartition(int n, vector<vector<int>>& dislikes) {
        vector<vector<int>> g(n + 1);
        for (auto& d : dislikes) { g[d[0]].push_back(d[1]); g[d[1]].push_back(d[0]); }
        color.assign(n + 1, -1);
        for (int i = 1; i <= n; i++)
            if (color[i] == -1 && !dfs(g, i, 0)) return false;
        return true;
    }
};
```

### Python
```python
class Solution:
    def possibleBipartition(self, n: int, dislikes: List[List[int]]) -> bool:
        g = [[] for _ in range(n + 1)]
        for a, b in dislikes:
            g[a].append(b); g[b].append(a)
        color = [-1] * (n + 1)
        def dfs(u, c):
            color[u] = c
            for v in g[u]:
                if color[v] == -1:
                    if not dfs(v, c ^ 1): return False
                elif color[v] == color[u]:
                    return False
            return True
        return all(dfs(i, 0) for i in range(1, n + 1) if color[i] == -1)
```

### Java
```java
class Solution {
    private int[] color;
    public boolean possibleBipartition(int n, int[][] dislikes) {
        List<List<Integer>> g = new ArrayList<>();
        for (int i = 0; i <= n; i++) g.add(new ArrayList<>());
        for (int[] d : dislikes) { g.get(d[0]).add(d[1]); g.get(d[1]).add(d[0]); }
        color = new int[n + 1];
        Arrays.fill(color, -1);
        for (int i = 1; i <= n; i++)
            if (color[i] == -1 && !dfs(g, i, 0)) return false;
        return true;
    }
    private boolean dfs(List<List<Integer>> g, int u, int c) {
        color[u] = c;
        for (int v : g.get(u)) {
            if (color[v] == -1) { if (!dfs(g, v, c ^ 1)) return false; }
            else if (color[v] == color[u]) return false;
        }
        return true;
    }
}
```

**Complexity:** O(n + E) time · O(n + E) space
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Dislike → edge → bipartite check."** → two-step pipeline.
- **"Build graph first."** → half the work is modeling.
- **"Same DFS as #785."** → reuse template.
- **"1-indexed nodes."** → size n+1 array.

> 🎯 **Pattern Unlocked:** Conflict Graph Coloring

---

*Both quests complete. Head to the checkpoint. →*
