<!-- hand-authored -->
# ⚔ Quest: Cheapest Flights Within K Stops

> **Day 20** · [Cheapest Flights Within K Stops #787](https://leetcode.com/problems/cheapest-flights-within-k-stops/) · Medium · 15 min · 35 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Cheapest Flights Within K Stops on LeetCode](https://leetcode.com/problems/cheapest-flights-within-k-stops/)**

> ⚔ **Hunter's rule:** **Not** plain Day 19 Dijkstra. Run k+1 **layers** of Bellman-Ford: each layer `tmp = dist.copy()`, relax all flights once.

---

## The Problem

See the full problem statement on LeetCode: **[Cheapest Flights Within K Stops #787](https://leetcode.com/problems/cheapest-flights-within-k-stops/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? **Bellman-Ford / layered relax** — state is effectively `(city, stops_used)`; at most k stops = at most k+1 edges.

Copy `dist` before each round so you don't chain multiple flights in one stop layer. Contrast Day 19 where one `dist[node]` finalize is OK.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Bellman-Ford / Modified Dijkstra

**How to identify this from the problem statement:**
- Cheapest path with **at most K intermediate stops** (K+1 edges max)
- Directed flight graph with prices
- Plain Dijkstra wrong — cheaper path may need more stops

| Keyword / phrase | What it signals |
|---|---|
| "at most k stops" / "k layovers" | Bellman-Ford k+1 rounds |
| "cheapest price" | Min cost relax |
| "network delay" no limit | Day 19 Dijkstra |
| "unweighted shortest" | BFS |

**Why this pattern works:** Layer i = best price using ≤ i edges. tmp copy prevents using 2 new edges in one layer.

**How a strong solver thinks before coding:**
1. *"dist[src]=0; rest INF."*
2. *"Repeat k+1 times: tmp=dist; for each flight relax into tmp."*
3. *"dist=tmp after each round."*
4. *"Return dist[dst] or -1."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Day 19 Dijkstra** | Freezes node too early — misses cheaper route with extra stop |
| **BFS by stop count** | Can work with `(node, stops)` BFS — BF layers equivalent |
| **One Bellman-Ford pass without tmp** | Allows unlimited edges in one iteration |
| **DFS all paths** | Exponential |

**The insight brute force misses:** Stop limit breaks Dijkstra's "visit once" — layered relax tracks `(city, stops)` implicitly.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Network Delay Time #743](https://leetcode.com/problems/network-delay-time/) | No stop cap | Dijkstra |
| [Path With Minimum Effort #1631](https://leetcode.com/problems/path-with-minimum-effort/) | Grid bottleneck | Heap Dijkstra |
| Bellman-Ford full | V-1 rounds | Negative weights |

Day 20 contrast: **K constraint → layers, not heap.**

---

## 📖 Walkthrough

```
src=0, dst=2, k=1, flights: 0→1 ($100), 0→2 ($500), 1→2 ($100)

Layer 0: dist=[0, INF, INF]
Layer 1: tmp from dist → dist[1]=100, dist[2]=500
Layer 2 (k+1=2): relax 1→2 → dist[2]=min(500, 100+100)=200 ✓

Without tmp copy in one pass: might chain incorrectly within layer
```

> 💡 **The insight:** Day 19 = one best dist per node. Day 20 K-flights = best dist per node **using bounded edges** — layers encode that.

---

## Solution

### C++
```cpp
class Solution {
public:
    int findCheapestPrice(int n, vector<vector<int>>& flights, int src, int dst, int k) {
        vector<int> dist(n, INT_MAX);
        dist[src] = 0;
        for (int i = 0; i <= k; i++) {
            vector<int> tmp = dist;
            for (auto& f : flights) {
                int u = f[0], v = f[1], w = f[2];
                if (dist[u] != INT_MAX && dist[u] + w < tmp[v])
                    tmp[v] = dist[u] + w;
            }
            dist = tmp;
        }
        return dist[dst] == INT_MAX ? -1 : dist[dst];
    }
};
```

### Python
```python
class Solution:
    def findCheapestPrice(self, n: int, flights: List[List[int]], src: int, dst: int, k: int) -> int:
        dist = [float('inf')] * n
        dist[src] = 0
        for _ in range(k + 1):
            tmp = dist[:]
            for u, v, w in flights:
                if dist[u] != float('inf') and dist[u] + w < tmp[v]:
                    tmp[v] = dist[u] + w
            dist = tmp
        return -1 if dist[dst] == float('inf') else dist[dst]
```

### Java
```java
class Solution {
    public int findCheapestPrice(int n, int[][] flights, int src, int dst, int k) {
        int[] dist = new int[n];
        Arrays.fill(dist, Integer.MAX_VALUE);
        dist[src] = 0;
        for (int i = 0; i <= k; i++) {
            int[] tmp = dist.clone();
            for (int[] f : flights) {
                if (dist[f[0]] != Integer.MAX_VALUE && dist[f[0]] + f[2] < tmp[f[1]])
                    tmp[f[1]] = dist[f[0]] + f[2];
            }
            dist = tmp;
        }
        return dist[dst] == Integer.MAX_VALUE ? -1 : dist[dst];
    }
}
```

**Complexity:** O(k · E) time · O(n) space
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"At most K stops"** → not Day 19 Dijkstra.
- **"k+1 relax rounds"** → each round = one more edge allowed.
- **"tmp = dist.copy()"** → critical — no multi-hop within one layer.
- **"Contrast #743"** → no stop limit there; heap works.

If Dijkstra gave wrong answers on LeetCode, switch to layered BF.

> 🎯 **Pattern Unlocked:** Bellman-Ford / Modified Dijkstra

---

*Both quests complete. Head to the checkpoint. →*
