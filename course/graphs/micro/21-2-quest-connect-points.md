<!-- hand-authored -->
# ⚔ Quest: Min Cost to Connect All Points

> **Day 21** · [Min Cost to Connect All Points #1584](https://leetcode.com/problems/min-cost-to-connect-all-points/) · Medium · 15 min · 35 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Min Cost to Connect All Points on LeetCode](https://leetcode.com/problems/min-cost-to-connect-all-points/)**

> ⚔ **Hunter's rule:** MST problem — connect all points at minimum Manhattan cost. Prim-style: min-heap edges from current tree + UF skip if already connected.

---

## The Problem

See the full problem statement on LeetCode: **[Min Cost to Connect All Points #1584](https://leetcode.com/problems/min-cost-to-connect-all-points/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? **Kruskal's MST** (Prim variant) — grow connected set; push `(dist, nextPoint)` from each newly added point; skip if `find(0)==find(v)`.

Alternative: sort all O(n²) edges + Kruskal UF. Same MST answer.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Kruskal's MST

**How to identify this from the problem statement:**
- Connect **all** nodes minimum total cost
- Edge weight = Manhattan distance between points
- Complete graph implicit — don't materialize all edges upfront if using Prim+heap

| Keyword / phrase | What it signals |
|---|---|
| "min cost connect all points" | MST |
| "Manhattan distance" | Edge weight formula |
| "shortest path A to B" | Dijkstra — not MST |
| "redundant edge" | Cycle detect — Day 17 |

**Why this pattern works:** MST picks n−1 cheapest safe edges spanning all nodes — Kruskal/Prim with UF cycle avoidance.

**How a strong solver thinks before coding:**
1. *"Need n-1 edges total."*
2. *"Start point 0 in tree; heap edges to other points."*
3. *"Pop min; if already connected skip; else add cost, push new edges."*
4. *"UF or visited set tracks components."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Dijkstra from one point** | Doesn't span all nodes at min total |
| **Connect greedily without cycle check** | May form loops |
| **Try all spanning trees** | Exponential |
| **BFS** | Unweighted — edges have Manhattan cost |

**The insight brute force misses:** Global minimum wiring = MST — sort/grow by edge weight with UF.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Smallest String With Swaps #1202](https://leetcode.com/problems/smallest-string-with-swaps/) | UF group + sort | UF components |
| Classic Kruskal | Sort all edges | UF merge |
| [Connecting Cities #1135](https://leetcode.com/problems/connecting-cities-with-minimum-cost/) | Explicit edges | Kruskal |

Same MST spirit — **cheapest edges that don't cycle.**

---

## 📖 Walkthrough

```
3 points: (0,0), (1,1), (2,2)
Costs: 0—1: 2, 1—2: 2, 0—2: 4

MST picks 0—1 (2) and 1—2 (2) → total 4
Skip 0—2 (4) — would be redundant with cheaper path through 1
```

> 💡 **The insight:** You're not finding shortest path between two cities — you're wiring the whole network cheapest.

---

## Solution

### C++
```cpp
class Solution {
    vector<int> p, r;
    int find(int x) { return p[x] == x ? x : p[x] = find(p[x]); }
    void unite(int a, int b) {
        a = find(a); b = find(b);
        if (a == b) return;
        if (r[a] < r[b]) swap(a, b);
        p[b] = a;
        if (r[a] == r[b]) r[a]++;
    }
    int manhattan(vector<vector<int>>& pts, int i, int j) {
        return abs(pts[i][0] - pts[j][0]) + abs(pts[i][1] - pts[j][1]);
    }
public:
    int minCostConnectPoints(vector<vector<int>>& points) {
        int n = points.size();
        p.resize(n); r.assign(n, 0);
        iota(p.begin(), p.end(), 0);
        priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> pq;
        for (int i = 1; i < n; i++) pq.push({manhattan(points, 0, i), i});
        int cost = 0, used = 1;
        while (used < n) {
            auto [w, v] = pq.top(); pq.pop();
            if (find(0) == find(v)) continue;
            unite(0, v);
            cost += w;
            used++;
            for (int i = 0; i < n; i++)
                if (find(i) != find(v)) pq.push({manhattan(points, v, i), i});
        }
        return cost;
    }
};
```

### Python
```python
class Solution:
    def minCostConnectPoints(self, points: List[List[int]]) -> int:
        n = len(points)
        p = list(range(n))
        def find(x):
            while p[x] != x:
                p[x] = p[p[x]]
                x = p[x]
            return x
        def unite(a, b):
            p[find(b)] = find(a)
        def dist(i, j):
            return abs(points[i][0] - points[j][0]) + abs(points[i][1] - points[j][1])
        pq = [(dist(0, i), i) for i in range(1, n)]
        heapq.heapify(pq)
        cost = used = 0
        while used < n - 1:
            w, v = heapq.heappop(pq)
            if find(v) == find(0):
                continue
            unite(0, v)
            cost += w
            used += 1
            for i in range(n):
                if find(i) != find(v):
                    heapq.heappush(pq, (dist(v, i), i))
        return cost
```

### Java
```java
class Solution {
    private int[] p;
    public int minCostConnectPoints(int[][] points) {
        int n = points.length;
        p = new int[n];
        for (int i = 0; i < n; i++) p[i] = i;
        PriorityQueue<int[]> pq = new PriorityQueue<>(Comparator.comparingInt(a -> a[0]));
        for (int i = 1; i < n; i++) pq.offer(new int[]{dist(points, 0, i), i});
        int cost = 0, used = 0;
        while (used < n - 1) {
            int[] cur = pq.poll();
            if (find(cur[1]) == find(0)) continue;
            unite(0, cur[1]);
            cost += cur[0];
            used++;
            for (int i = 0; i < n; i++)
                if (find(i) != find(cur[1])) pq.offer(new int[]{dist(points, cur[1], i), i});
        }
        return cost;
    }
    private int dist(int[][] pts, int i, int j) {
        return Math.abs(pts[i][0] - pts[j][0]) + Math.abs(pts[i][1] - pts[j][1]);
    }
    private int find(int x) { return p[x] == x ? x : (p[x] = find(p[x])); }
    private void unite(int a, int b) { p[find(b)] = find(a); }
}
```

**Complexity:** O(n² log n) time · O(n²) space
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Connect ALL points minimum cost"** → MST, not Dijkstra.
- **"Manhattan = edge weight"** → Kruskal sort or Prim heap.
- **"Skip if same component"** → UF from Day 17.
- **"n−1 edges"** → stop when tree spans all.

If you ran Dijkstra from one point, you'd only get shortest paths from that source.

> 🎯 **Pattern Unlocked:** Kruskal's MST

---

*One quest down. Next: UF components + char sort. →*
