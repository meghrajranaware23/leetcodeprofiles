<!-- hand-authored -->
# ⚔ Quest: Maximal Network Rank

> **Day 27** · [Maximal Network Rank #1615](https://leetcode.com/problems/maximal-network-rank/) · Medium · 15 min · 35 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Maximal Network Rank on LeetCode](https://leetcode.com/problems/maximal-network-rank/)**

> ⚔ **Hunter's rule:** Rank(i,j) = deg[i]+deg[j] − (1 if edge i—j else 0). Max over all pairs — **no BFS**.

---

## The Problem

See the full problem statement on LeetCode: **[Maximal Network Rank #1615](https://leetcode.com/problems/maximal-network-rank/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

**Adjacency intersection rank** — static graph property.

- Compute `deg[city]` from roads.
- Store edges in adjacency matrix or hash set for O(1) lookup.
- For each pair `i < j`: `rank = deg[i] + deg[j] - (edge[i][j] ? 1 : 0)`.
- Track maximum.

Pattern decision: no traversal — formula on built degrees.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Adjacency Set Intersection (Degree Rank)

**How to identify this from the problem statement:**
- "Network rank of two cities" — defined from degrees + direct link
- Maximize over pairs — O(n²) enumeration
- No path / reachability question

| Keyword / phrase | What it signals |
|---|---|
| "Rank of two cities" | deg sum adjust |
| "Directly connected by road" | subtract 1 if edge |
| "Maximum network rank" | max over i<j |
| n ≤ 500 | O(n²) fine |

**Why this pattern works:** Rank counts distinct roads touching either city; shared road counted twice in deg sum — subtract once.

**How a strong solver thinks before coding:**
1. *"deg[] from roads."*
2. *"edge[i][j] bool or set of pairs."*
3. *"Double loop i<j, update best."*
4. *"Don't BFS — wrong tool."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **BFS/DFS from each city** | Rank is not reachability |
| **Forget subtract 1 when connected** | Overcount shared road |
| **Count only deg[i]+deg[j] always** | Miss intersection correction |
| **Dijkstra** | No weights involved |

**The insight:** Read definition → static formula — **pattern triage** saves time.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Find Center of Star Graph #1791](https://leetcode.com/problems/find-center-of-star-graph/) | deg n-1 node | Degree observation |
| [Maximal Network Rank #1615](https://leetcode.com/problems/maximal-network-rank/) | Pair rank | deg intersection |
| [Couples Holding Hands #765](https://leetcode.com/problems/couples-holding-hands/) | Component swap | Different — not rank |

---

## 📖 Walkthrough

```
n=4, roads: 0-1, 0-3, 1-2

deg = [2, 2, 1, 1]

pair (0,1): edge yes → rank = 2+2-1 = 3
pair (0,2): no edge → 2+1 = 3
pair (1,3): no edge → 2+1 = 3

Answer: 3
```

> 💡 **The insight:** Adjacency lookup is the "intersection" in the name — shared edge detection.

---

## Solution

### C++
```cpp
class Solution {
public:
    int maximalNetworkRank(int n, vector<vector<int>>& roads) {
        vector<int> deg(n);
        vector<vector<bool>> edge(n, vector<bool>(n));
        for (auto& r : roads) {
            deg[r[0]]++; deg[r[1]]++;
            edge[r[0]][r[1]] = edge[r[1]][r[0]] = true;
        }
        int best = 0;
        for (int i = 0; i < n; i++)
            for (int j = i + 1; j < n; j++) {
                int rank = deg[i] + deg[j] - (edge[i][j] ? 1 : 0);
                best = max(best, rank);
            }
        return best;
    }
};
```

### Python
```python
class Solution:
    def maximalNetworkRank(self, n: int, roads: List[List[int]]) -> int:
        deg = [0] * n
        edge = set()
        for a, b in roads:
            deg[a] += 1; deg[b] += 1
            edge.add((min(a, b), max(a, b)))
        return max(deg[i] + deg[j] - ((min(i, j), max(i, j)) in edge)
                   for i in range(n) for j in range(i + 1, n))
```

### Java
```java
class Solution {
    public int maximalNetworkRank(int n, int[][] roads) {
        int[] deg = new int[n];
        boolean[][] edge = new boolean[n][n];
        for (int[] r : roads) {
            deg[r[0]]++; deg[r[1]]++;
            edge[r[0]][r[1]] = edge[r[1]][r[0]] = true;
        }
        int best = 0;
        for (int i = 0; i < n; i++)
            for (int j = i + 1; j < n; j++)
                best = Math.max(best, deg[i] + deg[j] - (edge[i][j] ? 1 : 0));
        return best;
    }
}
```

**Complexity:** O(n² + E) time · O(n²) space
---

## 💭 What Should Have Clicked in Your Mind?

- **"Rank of pair"** → degrees, not BFS.
- **"Directly connected"** → subtract 1 from sum.
- **"Maximum over pairs"** → O(n²) scan.
- **"Pattern decision"** → static metric vs traversal.
- **"Pairs with min-jumps quest"** → one expands state, one doesn't — same day, different tools.

> 🎯 **Pattern Unlocked:** Adjacency Set Intersection

---

*Both quests complete. Head to the checkpoint. →*
