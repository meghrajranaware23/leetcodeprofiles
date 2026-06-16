<!-- hand-authored -->
# ⚔ Quest: Find the City With Smallest Neighbors

> **Day 25** · [Find the City With the Smallest Number of Neighbors at a Threshold Distance #1334](https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/) · Medium · 15 min · 35 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Find the City With the Smallest Number of Neighbors at a Threshold Distance on LeetCode](https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/)**

> ⚔ **Hunter's rule:** Need **all-pairs** shortest distances. n ≤ 100 → Floyd-Warshall. Count cities j with `dist[i][j] ≤ threshold` for each i.

---

## The Problem

See the full problem statement on LeetCode: **[Find the City With the Smallest Number of Neighbors at a Threshold Distance #1334](https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

**All-pairs threshold Dijkstra** (via Floyd-Warshall here).

- Initialize `dist[i][j]` from edges; `dist[i][i]=0`.
- Triple loop Floyd: `dist[i][j] = min(dist[i][j], dist[i][k]+dist[k][j])`.
- For each city `i`: `reach = count of j where dist[i][j] <= distanceThreshold`.
- Minimize `reach`; tie → **largest** city index.

Not single-source Day 19. Not path counting.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** All-Pairs Shortest Path + Threshold Count

**How to identify this from the problem statement:**
- Need distance from **every** city to **every** city
- "Within threshold" → filter dist matrix rows
- n ≤ 100 → O(n³) Floyd acceptable

| Keyword / phrase | What it signals |
|---|---|
| "Smallest number of neighbors at threshold" | Row count in dist matrix |
| "Weighted undirected edges" | Symmetric dist |
| "Return city with fewest" | Argmin over reach counts |
| "If tie, largest city number" | Update with `reach <= minReach` |

**Why this pattern works:** Each row `i` answers "how many cities can I reach within T?"

**How a strong solver thinks before coding:**
1. *"Build dist[n][n], INF except edges and diagonal 0."*
2. *"Floyd k,i,j relaxation."*
3. *"For each i: reach = sum(dist[i][j]<=T)."*
4. *"Track best with tie → max index."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Single Dijkstra from one city** | Need all sources |
| **BFS per pair** | O(n² · (V+E)) — Floyd simpler at n=100 |
| **Wrong tie-break (smallest index)** | Problem wants **largest** on tie |
| **Count only strict `< T`** | Problem says `≤ threshold` |

**The insight:** Query is a **row aggregate** of the all-pairs matrix — not one shortest path tree.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Network Delay Time #743](https://leetcode.com/problems/network-delay-time/) | Single source max | Day 19 |
| [Cheapest Flights Within K Stops #787](https://leetcode.com/problems/cheapest-flights-within-k-stops/) | Stops constraint | Day 20 |
| [Find the City #1334](https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/) | All-pairs + count | Day 25 |

---

## 📖 Walkthrough

```
n=3, edges (0,1,2),(0,2,5),(1,2,1), threshold=2

After Floyd:
dist[0] = [0, 2, 3]
dist[1] = [2, 0, 1]
dist[2] = [3, 1, 0]

Reach within T=2:
  city 0: {0,1} → 2
  city 1: {0,1,2} → 3
  city 2: {1,2} → 2

Min reach=2, tie cities 0 and 2 → pick **2** (largest index)
```

> 💡 **The insight:** Floyd fills the matrix; the quest is SQL-on-a-row counting.

---

## Solution

### C++
```cpp
class Solution {
public:
    int findTheCity(int n, vector<vector<int>>& edges, int distanceThreshold) {
        vector<vector<int>> dist(n, vector<int>(n, 1e9));
        for (int i = 0; i < n; i++) dist[i][i] = 0;
        for (auto& e : edges) dist[e[0]][e[1]] = dist[e[1]][e[0]] = e[2];
        for (int k = 0; k < n; k++)
            for (int i = 0; i < n; i++)
                for (int j = 0; j < n; j++)
                    dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]);
        int best = -1, minReach = n + 1;
        for (int i = 0; i < n; i++) {
            int reach = 0;
            for (int j = 0; j < n; j++)
                if (dist[i][j] <= distanceThreshold) reach++;
            if (reach <= minReach) { minReach = reach; best = i; }
        }
        return best;
    }
};
```

### Python
```python
class Solution:
    def findTheCity(self, n: int, edges: List[List[int]], distanceThreshold: int) -> int:
        dist = [[float('inf')] * n for _ in range(n)]
        for i in range(n): dist[i][i] = 0
        for u, v, w in edges:
            dist[u][v] = dist[v][u] = w
        for k in range(n):
            for i in range(n):
                for j in range(n):
                    dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])
        best, min_reach = -1, n + 1
        for i in range(n):
            reach = sum(1 for j in range(n) if dist[i][j] <= distanceThreshold)
            if reach <= min_reach:
                min_reach = reach
                best = i
        return best
```

### Java
```java
class Solution {
    public int findTheCity(int n, int[][] edges, int distanceThreshold) {
        int[][] dist = new int[n][n];
        for (int[] row : dist) Arrays.fill(row, 1_000_000_000);
        for (int i = 0; i < n; i++) dist[i][i] = 0;
        for (int[] e : edges) { dist[e[0]][e[1]] = e[2]; dist[e[1]][e[0]] = e[2]; }
        for (int k = 0; k < n; k++)
            for (int i = 0; i < n; i++)
                for (int j = 0; j < n; j++)
                    dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);
        int best = -1, minReach = n + 1;
        for (int i = 0; i < n; i++) {
            int reach = 0;
            for (int j = 0; j < n; j++) if (dist[i][j] <= distanceThreshold) reach++;
            if (reach <= minReach) { minReach = reach; best = i; }
        }
        return best;
    }
}
```

**Complexity:** O(n³) time · O(n²) space
---

## 💭 What Should Have Clicked in Your Mind?

- **"Every city as source"** → all-pairs, not Day 19 single-source.
- **"Within threshold"** → count row entries ≤ T.
- **"Tie → largest city"** → `reach <= minReach` updates best.
- **"n ≤ 100"** → Floyd-Warshall fits.
- **"Not ways to arrive"** → no path counting — matrix query.

> 🎯 **Pattern Unlocked:** All-Pairs Threshold Count

---

*Both quests complete. Head to the checkpoint. →*
