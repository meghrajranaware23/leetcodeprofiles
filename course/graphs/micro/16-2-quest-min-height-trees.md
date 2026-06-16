<!-- hand-authored -->
# ⚔ Quest: Minimum Height Trees

> **Day 16** · [Minimum Height Trees #310](https://leetcode.com/problems/minimum-height-trees/) · Medium · 15 min · 20 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Minimum Height Trees on LeetCode](https://leetcode.com/problems/minimum-height-trees/)**

> ⚔ **Hunter's rule:** Peel all degree-1 leaves each round. Stop when ≤2 nodes remain. Those are the MHT roots.

---

## The Problem

See the full problem statement on LeetCode: **[Minimum Height Trees #310](https://leetcode.com/problems/minimum-height-trees/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Track `deg[u]`. Initial queue: all deg==1 (leaves). Each round: remove entire layer, decrement neighbor degrees, newly deg==1 nodes join next layer. `n==1` → `[0]`.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Leaf Peeling / Graph Reduction

**How to identify this from the problem statement:**
- Undirected tree — unique path between nodes
- Find root(s) minimizing max depth
- Answer has at most 2 nodes (tree center theorem)

| Keyword / phrase | What it signals |
|---|---|
| "minimum height tree" | Tree center via leaf peel |
| Undirected edges | Degree, not in-degree |
| "return all roots" | 1 or 2 centers |

**Why this pattern works:** Outer leaves never become optimal root — strip them layer by layer until the middle remains.

**How a strong solver thinks before coding:**
1. *"Build adj, deg[], queue deg==1."*
2. *"While rem > 2: peel layer, update deg."*
3. *"Return remaining queue nodes."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Try every node as root, BFS height** | O(n²) |
| **Kahn in-degree peel** | Directed tool on undirected tree |
| **Single leaf removal (not batched)** | Same asymptotic but layer batching is cleaner |

**The insight:** O(n) leaf-peel vs O(n²) try-all-roots.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Find Eventual Safe States #802](https://leetcode.com/problems/find-eventual-safe-states/) | Directed outdeg peel | Day 12 cousin |
| [Tree Diameter](https://leetcode.com/problems/diameter-of-binary-tree/) | Two-endpoint path | Related tree structure |
| [Flower Planting #1042](https://leetcode.com/problems/flower-planting-with-no-adjacent/) | Greedy color | C-test 1 |

---

## 📖 Walkthrough

```
n=6, edges = [[0,1],[1,2],[2,3],[3,4],[4,5]]

Line: 0—1—2—3—4—5

Peel {0,5} → peel {1,4} → remain {2,3}
Answer: [2,3]
```

> 💡 **The insight:** Long path centers — never the endpoints.

---

## Solution

### C++
```cpp
class Solution {
public:
    vector<int> findMinHeightTrees(int n, vector<vector<int>>& edges) {
        if (n == 1) return {0};
        vector<vector<int>> adj(n);
        vector<int> deg(n);
        for (auto& e : edges) {
            adj[e[0]].push_back(e[1]);
            adj[e[1]].push_back(e[0]);
            deg[e[0]]++; deg[e[1]]++;
        }
        queue<int> q;
        for (int i = 0; i < n; i++)
            if (deg[i] == 1) q.push(i);
        int rem = n;
        while (rem > 2) {
            int sz = q.size();
            rem -= sz;
            while (sz--) {
                int u = q.front(); q.pop();
                for (int v : adj[u])
                    if (--deg[v] == 1) q.push(v);
            }
        }
        vector<int> res;
        while (!q.empty()) { res.push_back(q.front()); q.pop(); }
        return res;
    }
};
```

### Python
```python
class Solution:
    def findMinHeightTrees(self, n: int, edges: List[List[int]]) -> List[int]:
        if n == 1: return [0]
        adj = [[] for _ in range(n)]
        deg = [0] * n
        for a, b in edges:
            adj[a].append(b); adj[b].append(a)
            deg[a] += 1; deg[b] += 1
        q = deque(i for i in range(n) if deg[i] == 1)
        rem = n
        while rem > 2:
            sz = len(q)
            rem -= sz
            for _ in range(sz):
                u = q.popleft()
                for v in adj[u]:
                    deg[v] -= 1
                    if deg[v] == 1:
                        q.append(v)
        return list(q)
```

### Java
```java
class Solution {
    public List<Integer> findMinHeightTrees(int n, int[][] edges) {
        if (n == 1) return List.of(0);
        List<List<Integer>> adj = new ArrayList<>();
        int[] deg = new int[n];
        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
        for (int[] e : edges) {
            adj.get(e[0]).add(e[1]); adj.get(e[1]).add(e[0]);
            deg[e[0]]++; deg[e[1]]++;
        }
        Queue<Integer> q = new ArrayDeque<>();
        for (int i = 0; i < n; i++) if (deg[i] == 1) q.offer(i);
        int rem = n;
        while (rem > 2) {
            int sz = q.size(); rem -= sz;
            for (int i = 0; i < sz; i++) {
                int u = q.poll();
                for (int v : adj.get(u)) if (--deg[v] == 1) q.offer(v);
            }
        }
        return new ArrayList<>(q);
    }
}
```

**Complexity:** O(V + E) time · O(V + E) space
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Undirected tree → degree not indeg."**
- **"Peel leaves in layers."** → like Day 12 but deg 1 not indeg 0.
- **"At most 2 centers remain."**
- **"n=1 edge case."**

> 🎯 **Pattern Unlocked:** Leaf Peeling / Graph Reduction

---

*One quest down. Next: build weighted division graph and query. →*
