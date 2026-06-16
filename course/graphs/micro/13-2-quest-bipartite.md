<!-- hand-authored -->
# ⚔ Quest: Is Graph Bipartite?

> **Day 13** · [Is Graph Bipartite? #785](https://leetcode.com/problems/is-graph-bipartite/) · Medium · 15 min · 20 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Is Graph Bipartite? on LeetCode](https://leetcode.com/problems/is-graph-bipartite/)**

> ⚔ **Hunter's rule:** BFS each unvisited component. Neighbors get `color[u] ^ 1`. Same color on an edge → false.

---

## The Problem

See the full problem statement on LeetCode: **[Is Graph Bipartite? #785](https://leetcode.com/problems/is-graph-bipartite/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Graph is already an adjacency list (undirected). For each component: queue a node with color 0, propagate opposite colors. Odd cycle = neighbor already has your color.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** BFS/DFS Two-Coloring

**How to identify this from the problem statement:**
- Explicit undirected adjacency list
- "Bipartite" = 2-colorable
- May have disconnected components

| Keyword / phrase | What it signals |
|---|---|
| "is graph bipartite" | Direct 2-color |
| Adjacency list given | No graph construction step |
| Multiple components | Outer loop over all starts |

**Why this pattern works:** Bipartite ⟺ no odd-length cycle ⟺ BFS level parity is consistent.

**How a strong solver thinks before coding:**
1. *"color[n] = -1."*
2. *"For each i with color[i]==-1: BFS from i."*
3. *"Neighbor uncolored → flip; same color → return false."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Check only one component** | Misses odd cycle in another component |
| **3-color DFS** | Overkill; wrong mental model |
| **Union-Find** | Doesn't detect odd cycles |

**The insight:** One BFS per component, O(V+E) total.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Possible Bipartition #886](https://leetcode.com/problems/possible-bipartition/) | Build graph from dislikes | Next quest |
| [Flower Planting #1042](https://leetcode.com/problems/flower-planting-with-no-adjacent/) | C-test — greedy 4-color | Related constraint |
| [Graph Valid Tree #261](https://leetcode.com/problems/graph-valid-tree/) | Tree = always bipartite | Special case |

---

## 📖 Walkthrough

```
graph = [[1,3],[0,2],[1,3],[0,2]]

    0 — 1
    |   |
    3 — 2     (4-cycle, even → bipartite ✓)

BFS from 0: colors 0→0, 1→1, 3→1, 2→0
All edges cross colors ✓
```

> 💡 **The insight:** Even cycles are fine. Odd cycles fail at the closing edge.

---

## Solution

### C++
```cpp
class Solution {
public:
    bool isBipartite(vector<vector<int>>& graph) {
        int n = graph.size();
        vector<int> color(n, -1);
        for (int i = 0; i < n; i++) {
            if (color[i] != -1) continue;
            queue<int> q;
            q.push(i); color[i] = 0;
            while (!q.empty()) {
                int u = q.front(); q.pop();
                for (int v : graph[u]) {
                    if (color[v] == -1) {
                        color[v] = color[u] ^ 1;
                        q.push(v);
                    } else if (color[v] == color[u]) return false;
                }
            }
        }
        return true;
    }
};
```

### Python
```python
class Solution:
    def isBipartite(self, graph: List[List[int]]) -> bool:
        n = len(graph)
        color = [-1] * n
        for i in range(n):
            if color[i] != -1: continue
            q = deque([i])
            color[i] = 0
            while q:
                u = q.popleft()
                for v in graph[u]:
                    if color[v] == -1:
                        color[v] = color[u] ^ 1
                        q.append(v)
                    elif color[v] == color[u]:
                        return False
        return True
```

### Java
```java
class Solution {
    public boolean isBipartite(int[][] graph) {
        int n = graph.length;
        int[] color = new int[n];
        Arrays.fill(color, -1);
        for (int i = 0; i < n; i++) {
            if (color[i] != -1) continue;
            Queue<Integer> q = new ArrayDeque<>();
            q.offer(i); color[i] = 0;
            while (!q.isEmpty()) {
                int u = q.poll();
                for (int v : graph[u]) {
                    if (color[v] == -1) { color[v] = color[u] ^ 1; q.offer(v); }
                    else if (color[v] == color[u]) return false;
                }
            }
        }
        return true;
    }
}
```

**Complexity:** O(V + E) time · O(V) space
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Undirected + two groups = 2-color BFS."**
- **"XOR 1 flips partition."**
- **"Same color on edge = odd cycle."**
- **"Loop all components."**

> 🎯 **Pattern Unlocked:** BFS/DFS Two-Coloring

---

*One quest down. Next: build the conflict graph yourself. →*
