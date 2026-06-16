<!-- hand-authored -->
# ⚔ Quest: Network Delay Time

> **Day 19** · [Network Delay Time #743](https://leetcode.com/problems/network-delay-time/) · Medium · 15 min · 35 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Network Delay Time on LeetCode](https://leetcode.com/problems/network-delay-time/)**

> ⚔ **Hunter's rule:** Classic Dijkstra — min-heap `(dist, node)`, relax weighted edges, stale skip. Answer = max distance to any node.

---

## The Problem

See the full problem statement on LeetCode: **[Network Delay Time #743](https://leetcode.com/problems/network-delay-time/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? **Dijkstra's algorithm** — `dist[k]=0`, push `(0, k)`, for each pop relax neighbors with `dist[u]+w`.

Return **max** of all `dist[i]` (time until **all** nodes receive signal), or -1 if any node stays INF.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Dijkstra's Algorithm

**How to identify this from the problem statement:**
- Weighted directed edges `(u, v, time)` — non-negative
- Single source k — signal propagation
- Need farthest node's distance, not just one target

| Keyword / phrase | What it signals |
|---|---|
| "network delay" / "time to reach all nodes" | Dijkstra from source |
| "weighted edges" / "travel time" | Min-heap `(dist, node)` |
| "return -1 if unreachable" | Some dist[i] stays INF |
| "minimum steps" unweighted | **BFS** — not this |

**Why this pattern works:** Non-negative weights → Dijkstra gives shortest time to each node; last node to receive signal = max dist.

**How a strong solver thinks before coding:**
1. *"Build adj[u] = [(v, w), ...]."*
2. *"dist[k]=0; pq=[(0,k)]."*
3. *"Pop; if d>dist[u] skip; relax each neighbor."*
4. *"ans = max(dist[1..n]); return -1 if any INF."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **BFS treating all edges as 1** | Ignores travel times — wrong |
| **DFS all paths** | Exponential |
| **Dijkstra without stale skip** | Still correct but slower |
| **Return dist[target] only** | Must reach **all** nodes — take max |

**The insight brute force misses:** `(dist, node)` heap — always expand cheapest frontier first; max dist is the broadcast finish time.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Path with Maximum Probability #1514](https://leetcode.com/problems/path-with-maximum-probability/) | Maximize product | Modified Dijkstra |
| [Path With Minimum Effort #1631](https://leetcode.com/problems/path-with-minimum-effort/) | Grid + max edge | Dijkstra variant (Day 20) |
| [Cheapest Flights Within K Stops #787](https://leetcode.com/problems/cheapest-flights-within-k-stops/) | Stop limit | Bellman-Ford layers — not plain Dijkstra |

Same core: **heap + relax + stale skip.**

---

## 📖 Walkthrough

```
n=4, k=2, times=[[2,1,1],[2,3,1],[3,4,1]]

dist: INF everywhere, dist[2]=0
Pop (0,2): relax 1→dist[1]=1, 3→dist[3]=1
Pop (1,1): (no outgoing in tiny example)
Pop (1,3): relax 4→dist[4]=2
Max dist = 2 → answer 2
```

```
Heap order matters:
  Always pop smallest dist first
  Stale: popped d > dist[u] → skip
```

> 💡 **The insight:** BFS layers count hops; Dijkstra heap orders by **accumulated weight** — that's the Day 19 shift.

---

## Solution

### C++
```cpp
class Solution {
public:
    int networkDelayTime(vector<vector<int>>& times, int n, int k) {
        vector<vector<pair<int,int>>> adj(n + 1);
        for (auto& t : times) adj[t[0]].push_back({t[1], t[2]});
        vector<int> dist(n + 1, INT_MAX);
        dist[k] = 0;
        priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> pq;
        pq.push({0, k});
        while (!pq.empty()) {
            auto [d, u] = pq.top(); pq.pop();
            if (d > dist[u]) continue;
            for (auto [v, w] : adj[u])
                if (dist[u] + w < dist[v]) {
                    dist[v] = dist[u] + w;
                    pq.push({dist[v], v});
                }
        }
        int ans = 0;
        for (int i = 1; i <= n; i++) ans = max(ans, dist[i]);
        return ans == INT_MAX ? -1 : ans;
    }
};
```

### Python
```python
class Solution:
    def networkDelayTime(self, times: List[List[int]], n: int, k: int) -> int:
        adj = [[] for _ in range(n + 1)]
        for u, v, w in times:
            adj[u].append((v, w))
        dist = [float('inf')] * (n + 1)
        dist[k] = 0
        pq = [(0, k)]
        while pq:
            d, u = heapq.heappop(pq)
            if d > dist[u]: continue
            for v, w in adj[u]:
                if dist[u] + w < dist[v]:
                    dist[v] = dist[u] + w
                    heapq.heappush(pq, (dist[v], v))
        ans = max(dist[1:])
        return -1 if ans == float('inf') else ans
```

### Java
```java
class Solution {
    public int networkDelayTime(int[][] times, int n, int k) {
        List<int[]>[] adj = new List[n + 1];
        for (int i = 0; i <= n; i++) adj[i] = new ArrayList<>();
        for (int[] t : times) adj[t[0]].add(new int[]{t[1], t[2]});
        int[] dist = new int[n + 1];
        Arrays.fill(dist, Integer.MAX_VALUE);
        dist[k] = 0;
        PriorityQueue<int[]> pq = new PriorityQueue<>(Comparator.comparingInt(a -> a[0]));
        pq.offer(new int[]{0, k});
        while (!pq.isEmpty()) {
            int[] cur = pq.poll();
            if (cur[0] > dist[cur[1]]) continue;
            for (int[] e : adj[cur[1]]) {
                int nd = cur[0] + e[1];
                if (nd < dist[e[0]]) {
                    dist[e[0]] = nd;
                    pq.offer(new int[]{nd, e[0]});
                }
            }
        }
        int ans = 0;
        for (int i = 1; i <= n; i++) ans = Math.max(ans, dist[i]);
        return ans == Integer.MAX_VALUE ? -1 : ans;
    }
}
```

**Complexity:** O((V + E) log V) time · O(V + E) space
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Weighted signal propagation"** → Dijkstra, not BFS.
- **"Min-heap (dist, node)"** → pop cheapest; relax neighbors.
- **"All nodes must receive"** → answer is max dist, not single target.
- **"Stale skip"** → if d > dist[u], continue.

If you used a FIFO queue, switch to heap — edge weights break BFS layers.

> 🎯 **Pattern Unlocked:** Dijkstra's Algorithm

---

*One quest down. Next: maximize probability — same skeleton, different compare. →*
