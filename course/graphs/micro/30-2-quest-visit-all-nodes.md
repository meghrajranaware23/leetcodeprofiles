<!-- hand-authored -->
# ⚔ Quest: Shortest Path Visiting All Nodes

> **Day 30** · [Shortest Path Visiting All Nodes #847](https://leetcode.com/problems/shortest-path-visiting-all-nodes/) · Hard · 25 min · 50 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Shortest Path Visiting All Nodes on LeetCode](https://leetcode.com/problems/shortest-path-visiting-all-nodes/)**

> ⚔ **Hunter's rule:** State is `(node, mask)` — which nodes you've visited. Multi-source BFS from every node. Draw a 4-node graph and trace bitmask growth.

---

## The Problem

See the full problem statement on LeetCode: **[Shortest Path Visiting All Nodes #847](https://leetcode.com/problems/shortest-path-visiting-all-nodes/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

**Bitmask BFS** — `(node, mask, dist)`.

- `mask` bit i set ⟺ node i has been visited on this walk.
- Initialize **every** node i: queue `(i, 1<<i, 0)`, `dist[i][1<<i] = 0`.
- Move to neighbor v: `nmask = mask | (1<<v)`.
- If `nmask == (1<<n) - 1` → return `dist + 1`.
- `dist[u][mask]` prevents revisiting same state.

Not plain Day 8 BFS — you can revisit a node with a **different mask**.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Bitmask BFS

**How to identify this from the problem statement:**
- "Visit all nodes" on small n (≤ 12) → bitmask over subsets
- "Shortest path" → BFS on expanded state graph
- Undirected graph adjacency list → standard neighbor loop
- Revisiting same node OK if mask differs → 2D dist `[node][mask]`

| Keyword / phrase | What it signals |
|---|---|
| "visit all nodes" / "every node at least once" | Bitmask goal = all bits set |
| "shortest path" | BFS layers on `(node, mask)` |
| n ≤ 12 | 2^n masks feasible |
| Can start anywhere | Multi-source BFS init |

**Why this pattern works:** State space is `(node, subset of visited)`. BFS finds minimum steps to `(any node, full_mask)`. First completion = shortest tour length.

**How a strong solver thinks before coding:**
1. *"Visit all nodes → mask with n bits."*
2. *"Same node, different mask → different BFS state."*
3. *"Start anywhere → enqueue all (i, 1<<i, 0)."*
4. *"Goal check on nmask, not on node alone."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **BFS with visited[node] only** | Can't revisit node to complete missing visits |
| **DFS try all permutations** | Factorial — bitmask BFS is O(n² · 2^n) |
| **Single-source from node 0 only** | Optimal tour may start elsewhere |
| **TSP DP without BFS** | Valid but bitmask BFS is simpler at this n |
| **Forget multi-source init** | Wrong answer if best start ≠ 0 |

**The insight:** The bitmask **is** the visited set — encoded in the state, not a global array.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Visit All Nodes #847](https://leetcode.com/problems/shortest-path-visiting-all-nodes/) | Undirected, any start | `(node, mask)` BFS |
| [Can I Win #464](https://leetcode.com/problems/can-i-win/) | Game state mask | Same bitmask idea |
| Day 28 `(r,c,k)` | Spatial + counter | Same expanded-state BFS |

---

## 📖 Walkthrough

```
Graph: 0—1—2  (n=3)

Init: (0,001,0), (1,010,0), (2,100,0)

From (0,001,0) → neighbor 1:
  nmask = 001|010 = 011, dist=1

From (1,011,1) → neighbor 2:
  nmask = 011|100 = 111 = full! → return 1+1=2

Shortest path length: 2 (e.g. 0→1→2)
```

> 💡 **The insight:** You're BFS-ing on an implicit graph of `(node, subset)` pairs — not on nodes alone.

---

## Solution

### C++
```cpp
class Solution {
public:
    int shortestPathLength(vector<vector<int>>& graph) {
        int n = graph.size();
        if (n == 1) return 0;
        queue<tuple<int,int,int>> q;
        vector<vector<int>> dist(n, vector<int>(1 << n, -1));
        for (int i = 0; i < n; i++) {
            int mask = 1 << i;
            q.push({i, mask, 0});
            dist[i][mask] = 0;
        }
        while (!q.empty()) {
            auto [u, mask, d] = q.front(); q.pop();
            for (int v : graph[u]) {
                int nmask = mask | (1 << v);
                if (nmask == (1 << n) - 1) return d + 1;
                if (dist[v][nmask] == -1) {
                    dist[v][nmask] = d + 1;
                    q.push({v, nmask, d + 1});
                }
            }
        }
        return -1;
    }
};
```

### Python
```python
class Solution:
    def shortestPathLength(self, graph: List[List[int]]) -> int:
        n = len(graph)
        if n == 1: return 0
        full = (1 << n) - 1
        q = deque()
        dist = [[-1] * (1 << n) for _ in range(n)]
        for i in range(n):
            mask = 1 << i
            q.append((i, mask, 0))
            dist[i][mask] = 0
        while q:
            u, mask, d = q.popleft()
            for v in graph[u]:
                nmask = mask | (1 << v)
                if nmask == full: return d + 1
                if dist[v][nmask] == -1:
                    dist[v][nmask] = d + 1
                    q.append((v, nmask, d + 1))
        return -1
```

### Java
```java
class Solution {
    public int shortestPathLength(int[][] graph) {
        int n = graph.length;
        if (n == 1) return 0;
        int full = (1 << n) - 1;
        int[][] dist = new int[n][1 << n];
        for (int[] row : dist) Arrays.fill(row, -1);
        Queue<int[]> q = new ArrayDeque<>();
        for (int i = 0; i < n; i++) {
            int mask = 1 << i;
            q.offer(new int[]{i, mask, 0});
            dist[i][mask] = 0;
        }
        while (!q.isEmpty()) {
            int[] cur = q.poll();
            for (int v : graph[cur[0]]) {
                int nmask = cur[1] | (1 << v);
                if (nmask == full) return cur[2] + 1;
                if (dist[v][nmask] == -1) {
                    dist[v][nmask] = cur[2] + 1;
                    q.offer(new int[]{v, nmask, cur[2] + 1});
                }
            }
        }
        return -1;
    }
}
```

**Complexity:** O(n² · 2^n) time · O(n · 2^n) space
---

## 💭 What Should Have Clicked in Your Mind?

- **"Visit every node" + small n** → bitmask over visited set.
- **"(node, mask)" BFS** — Day 30 capstone state pattern.
- **Multi-source init** — any node can start the optimal tour.
- **Goal = all bits set** — check `nmask`, not current node.

> 🎯 **Pattern Unlocked:** Bitmask BFS

---

*One quest down. Next: dual UF Alice/Bob edge ordering. →*
