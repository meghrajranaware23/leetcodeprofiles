<!-- hand-authored -->
# ⚔ Quest: Path with Maximum Probability

> **Day 19** · [Path with Maximum Probability #1514](https://leetcode.com/problems/path-with-maximum-probability/) · Medium · 15 min · 35 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Path with Maximum Probability on LeetCode](https://leetcode.com/problems/path-with-maximum-probability/)**

> ⚔ **Hunter's rule:** Dijkstra skeleton — but **maximize** product. `prob[start]=1.0`, max-heap by probability, relax with multiply.

---

## The Problem

See the full problem statement on LeetCode: **[Path with Maximum Probability #1514](https://leetcode.com/problems/path-with-maximum-probability/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? **Modified Dijkstra** — same as Network Delay, but:
- `prob[v] = max(prob[v], prob[u] * w)`
- Max-heap (or negate for Python min-heap)
- Stale skip: `if p < prob[u]: continue`

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Modified Dijkstra

**How to identify this from the problem statement:**
- Undirected weighted graph — edge weights are probabilities in (0,1]
- Maximize product along path — log trick optional; direct multiply works
- Single pair start → end

| Keyword / phrase | What it signals |
|---|---|
| "maximum probability" / "success probability" | Max Dijkstra / max product |
| "multiply edge probabilities" | Relax with × not + |
| "shortest path minimum cost" | Min Dijkstra — opposite compare |
| "unweighted shortest" | BFS |

**Why this pattern works:** All edge probs positive → optimal substructure like Dijkstra; always settle highest-prob frontier first.

**How a strong solver thinks before coding:**
1. *"Build undirected adj with prob weights."*
2. *"prob[start]=1.0; max-heap (prob, node)."*
3. *"Relax: np = prob[u]*w; if np > prob[v] update."*
4. *"Return prob[end]."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **BFS** | Can't compare products by hop count |
| **Min Dijkstra on probabilities** | Want maximum, not minimum |
| **DFS all paths** | Exponential |
| **Add probabilities instead of multiply** | Wrong math |

**The insight brute force misses:** Flip min→max, add→× — same heap skeleton as #743.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Network Delay Time #743](https://leetcode.com/problems/network-delay-time/) | Minimize sum | Min-heap Dijkstra |
| [Max Probability](same) | Product metric | Max-heap |
| Log-transform variant | Max sum of log(p) | Min Dijkstra on -log |

Same traversal — **different relax and heap order.**

---

## 📖 Walkthrough

```
start=0, end=2, edges: 0—1 (0.5), 0—2 (0.3), 1—2 (0.8)

prob[0]=1.0
From 0: prob[1]=0.5, prob[2]=0.3
From 1: prob[2]=max(0.3, 0.5*0.8)=0.4  ← path 0→1→2 wins

Answer: 0.4
```

```
Compare to Network Delay:
  Delay: dist[v] = min(dist[v], dist[u] + w)  min-heap
  Prob:  prob[v] = max(prob[v], prob[u] * w)  max-heap
```

> 💡 **The insight:** Dijkstra isn't only for distance — any "best path" with non-negative edge combine + optimal substructure fits the template.

---

## Solution

### C++
```cpp
class Solution {
public:
    double maxProbability(int n, vector<vector<int>>& edges, vector<double>& succProb, int start_node, int end_node) {
        vector<vector<pair<int,double>>> adj(n);
        for (int i = 0; i < (int)edges.size(); i++) {
            adj[edges[i][0]].push_back({edges[i][1], succProb[i]});
            adj[edges[i][1]].push_back({edges[i][0], succProb[i]});
        }
        vector<double> prob(n, 0.0);
        prob[start_node] = 1.0;
        priority_queue<pair<double,int>> pq;
        pq.push({1.0, start_node});
        while (!pq.empty()) {
            auto [p, u] = pq.top(); pq.pop();
            if (p < prob[u]) continue;
            for (auto [v, w] : adj[u]) {
                double np = p * w;
                if (np > prob[v]) {
                    prob[v] = np;
                    pq.push({np, v});
                }
            }
        }
        return prob[end_node];
    }
};
```

### Python
```python
class Solution:
    def maxProbability(self, n: int, edges: List[List[int]], succProb: List[float], start_node: int, end_node: int) -> float:
        adj = [[] for _ in range(n)]
        for (a, b), p in zip(edges, succProb):
            adj[a].append((b, p)); adj[b].append((a, p))
        prob = [0.0] * n
        prob[start_node] = 1.0
        pq = [(-1.0, start_node)]
        while pq:
            p, u = heapq.heappop(pq)
            p = -p
            if p < prob[u]: continue
            for v, w in adj[u]:
                np = p * w
                if np > prob[v]:
                    prob[v] = np
                    heapq.heappush(pq, (-np, v))
        return prob[end_node]
```

### Java
```java
class Solution {
    public double maxProbability(int n, int[][] edges, double[] succProb, int start_node, int end_node) {
        List<double[]>[] adj = new List[n];
        for (int i = 0; i < n; i++) adj[i] = new ArrayList<>();
        for (int i = 0; i < edges.length; i++) {
            adj[edges[i][0]].add(new double[]{edges[i][1], succProb[i]});
            adj[edges[i][1]].add(new double[]{edges[i][0], succProb[i]});
        }
        double[] prob = new double[n];
        prob[start_node] = 1.0;
        PriorityQueue<double[]> pq = new PriorityQueue<>((a, b) -> Double.compare(b[0], a[0]));
        pq.offer(new double[]{1.0, start_node});
        while (!pq.isEmpty()) {
            double[] cur = pq.poll();
            if (cur[0] < prob[(int) cur[1]]) continue;
            for (double[] e : adj[(int) cur[1]]) {
                double np = cur[0] * e[1];
                if (np > prob[(int) e[0]]) {
                    prob[(int) e[0]] = np;
                    pq.offer(new double[]{np, e[0]});
                }
            }
        }
        return prob[end_node];
    }
}
```

**Complexity:** O((V + E) log V) time · O(V + E) space
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Maximize product"** → modified Dijkstra with × and max-heap.
- **"Same as #743"** → stale skip, adj list, single source.
- **"prob starts at 1.0"** → not 0 or INF.
- **"Undirected edges"** → add both directions.

If you minimized sum of `(1-p)`, you'd overcomplicate — multiply directly.

> 🎯 **Pattern Unlocked:** Modified Dijkstra

---

*Both quests complete. Head to the checkpoint. →*
