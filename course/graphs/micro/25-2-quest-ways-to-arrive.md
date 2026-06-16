<!-- hand-authored -->
# ⚔ Quest: Number of Ways to Arrive

> **Day 25** · [Number of Ways to Arrive at Destination #1976](https://leetcode.com/problems/number-of-ways-to-arrive-at-destination/) · Medium · 15 min · 35 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Number of Ways to Arrive at Destination on LeetCode](https://leetcode.com/problems/number-of-ways-to-arrive-at-destination/)**

> ⚔ **Hunter's rule:** Dijkstra from 0 — but track `ways[v]` alongside `dist[v]`. Add counts when `nd == dist[v]`; reset when `nd < dist[v]`.

---

## The Problem

See the full problem statement on LeetCode: **[Number of Ways to Arrive at Destination #1976](https://leetcode.com/problems/number-of-ways-to-arrive-at-destination/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

**Dijkstra + path counting** — NOT plain Day 19 Network Delay.

- `ways[0] = 1`; undirected weighted roads.
- On relax `u→v`: `nd = dist[u] + w`.
  - `nd < dist[v]` → `dist[v]=nd; ways[v]=ways[u]`
  - `nd == dist[v]` → `ways[v] = (ways[v]+ways[u]) % MOD`
- Return `ways[n-1]`.

Stale pq entries: skip when `d > dist[u]`.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Dijkstra + DP Count (same dist layer)

**How to identify this from the problem statement:**
- Weighted undirected graph
- "Number of **ways**" + "**minimum time**" → count at optimal dist
- Mod 1e9+7 → multi-path accumulation

| Keyword / phrase | What it signals |
|---|---|
| "In the minimum time" | Tie counting to final dist |
| "Number of ways" | `ways[]` array |
| "Bidirectional roads" | Undirected adjacency |
| "Intersection 0 to n-1" | Single-source to fixed target |

**Why this pattern works:** Dijkstra processes nodes in non-decreasing dist; when equal-length paths meet, combine counts.

**How a strong solver thinks before coding:**
1. *"Build undirected adj with weights."*
2. *"dist[0]=0, ways[0]=1, pq (0,0)."*
3. *"Three-way relax: skip / reset / add."*
4. *"Return ways[n-1] % MOD."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Day 19 Dijkstra without ways[]** | Returns dist only — misses count |
| **DFS enumerate all paths** | Exponential |
| **BFS** | Ignores road lengths |
| **Count paths before Dijkstra finishes** | Dist may not be final yet |

**The insight:** Path counting is a **side effect of relaxation**, not a second graph traversal.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Network Delay Time #743](https://leetcode.com/problems/network-delay-time/) | Max dist only | Day 19 — no ways |
| [Path with Maximum Probability #1514](https://leetcode.com/problems/path-with-maximum-probability/) | Max product | Day 19 variant |
| [Ways to Arrive #1976](https://leetcode.com/problems/number-of-ways-to-arrive-at-destination/) | Count at min dist | Day 25 |

---

## 📖 Walkthrough

```
4 nodes, roads: 0-1(w1), 1-3(w1), 0-2(w2), 2-3(w2)

Shortest 0→3 time = 2
Paths: 0→1→3 and 0→2→3  → ways[3]=2

During Dijkstra when 1→3 and 2→3 both give nd=2:
  second equal relax adds ways[3]
```

> 💡 **The insight:** `else if (nd == dist[v])` is the whole Day 25 trick.

---

## Solution

### C++
```cpp
class Solution {
public:
    int countPaths(int n, vector<vector<int>>& roads) {
        const int MOD = 1e9 + 7;
        vector<vector<pair<int,int>>> adj(n);
        for (auto& r : roads) {
            adj[r[0]].push_back({r[1], r[2]});
            adj[r[1]].push_back({r[0], r[2]});
        }
        vector<long long> dist(n, LLONG_MAX), ways(n);
        ways[0] = 1;
        dist[0] = 0;
        priority_queue<pair<long long,int>, vector<pair<long long,int>>, greater<>> pq;
        pq.push({0, 0});
        while (!pq.empty()) {
            auto [d, u] = pq.top(); pq.pop();
            if (d > dist[u]) continue;
            for (auto [v, w] : adj[u]) {
                long long nd = d + w;
                if (nd < dist[v]) {
                    dist[v] = nd;
                    ways[v] = ways[u];
                    pq.push({nd, v});
                } else if (nd == dist[v]) {
                    ways[v] = (ways[v] + ways[u]) % MOD;
                }
            }
        }
        return ways[n - 1];
    }
};
```

### Python
```python
class Solution:
    def countPaths(self, n: int, roads: List[List[int]]) -> int:
        MOD = 10**9 + 7
        adj = [[] for _ in range(n)]
        for u, v, w in roads:
            adj[u].append((v, w)); adj[v].append((u, w))
        dist = [float('inf')] * n
        ways = [0] * n
        dist[0] = 0
        ways[0] = 1
        pq = [(0, 0)]
        while pq:
            d, u = heapq.heappop(pq)
            if d > dist[u]: continue
            for v, w in adj[u]:
                nd = d + w
                if nd < dist[v]:
                    dist[v] = nd
                    ways[v] = ways[u]
                    heapq.heappush(pq, (nd, v))
                elif nd == dist[v]:
                    ways[v] = (ways[v] + ways[u]) % MOD
        return ways[-1]
```

### Java
```java
class Solution {
    public int countPaths(int n, int[][] roads) {
        final int MOD = 1_000_000_007;
        List<long[]>[] adj = new List[n];
        for (int i = 0; i < n; i++) adj[i] = new ArrayList<>();
        for (int[] r : roads) {
            adj[r[0]].add(new long[]{r[1], r[2]});
            adj[r[1]].add(new long[]{r[0], r[2]});
        }
        long[] dist = new long[n];
        long[] ways = new long[n];
        Arrays.fill(dist, Long.MAX_VALUE);
        dist[0] = 0; ways[0] = 1;
        PriorityQueue<long[]> pq = new PriorityQueue<>(Comparator.comparingLong(a -> a[0]));
        pq.offer(new long[]{0, 0});
        while (!pq.isEmpty()) {
            long[] cur = pq.poll();
            if (cur[0] > dist[(int) cur[1]]) continue;
            for (long[] e : adj[(int) cur[1]]) {
                long nd = cur[0] + e[1];
                if (nd < dist[(int) e[0]]) {
                    dist[(int) e[0]] = nd;
                    ways[(int) e[0]] = ways[(int) cur[1]];
                    pq.offer(new long[]{nd, e[0]});
                } else if (nd == dist[(int) e[0]]) {
                    ways[(int) e[0]] = (ways[(int) e[0]] + ways[(int) cur[1]]) % MOD;
                }
            }
        }
        return (int) ways[n - 1];
    }
}
```

**Complexity:** O((V + E) log V) time · O(V + E) space
---

## 💭 What Should Have Clicked in Your Mind?

- **"Minimum time + number of ways"** → Dijkstra + ways, not plain Dijkstra.
- **"Equal nd branch"** → add ways — Day 25 vs Day 19 difference.
- **"Undirected weighted"** → Dijkstra not BFS.
- **"MOD on ways"** → long long / int64 for dist too.
- **"Not Network Delay"** → need count array.

> 🎯 **Pattern Unlocked:** Dijkstra + DP Count

---

*One quest down. Next: all-pairs threshold counting. →*
