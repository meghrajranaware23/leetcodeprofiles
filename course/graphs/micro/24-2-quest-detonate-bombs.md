<!-- hand-authored -->
# ⚔ Quest: Detonate Maximum Bombs

> **Day 24** · [Detonate Maximum Bombs #2101](https://leetcode.com/problems/detonate-maximum-bombs/) · Medium · 15 min · 30 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Detonate Maximum Bombs on LeetCode](https://leetcode.com/problems/detonate-maximum-bombs/)**

> ⚔ **Hunter's rule:** Build directed edges: bomb `i` triggers bomb `j` if `dist(i,j) ≤ radius[i]`. DFS from each start; track max component size.

---

## The Problem

See the full problem statement on LeetCode: **[Detonate Maximum Bombs #2101](https://leetcode.com/problems/detonate-maximum-bombs/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

**Geometric overlap graph + DFS.**

- `overlap(a,b)`: `(dx² + dy²) ≤ (long long)r_a²` — bomb `a` detonating reaches center of `b` if dist ≤ **a's radius**.
- For each starting bomb `i`: DFS/BFS along built edges, count visited.
- Answer = max count over all starting bombs.
- n ≤ 1000 → O(n²) pair check is fine.

Not Union-Find (directed). Not Dijkstra.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Geometric Graph Construction + DFS

**How to identify this from the problem statement:**
- Points + radius in plane → pairwise edge test
- "Detonates all bombs in range" → reachability on built graph
- "Maximum" over starting choice → try each node as source

| Keyword / phrase | What it signals |
|---|---|
| "x, y, radius" per bomb | Node = index; edge = in-range |
| "Chain detonation" | DFS/BFS component from start |
| "Maximum bombs" | Max over all starts |

**Why this pattern works:** Once graph is built, detonation chain = reachable set from first blast.

**How a strong solver thinks before coding:**
1. *"overlap(i,j): dist² ≤ r_i² (long long)."*
2. *"dfs(u): mark vis; for all v if overlap(u,v) dfs(v)."*
3. *"For each i: fresh vis, dfs(i), update best."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Simulate without graph structure** | Chain tracking becomes ad hoc |
| **Use r_i + r_j as threshold** | Wrong rule — only i's radius matters |
| **32-bit overflow on coordinates** | Up to 10⁵ — square in long long |
| **Single BFS from arbitrary bomb** | Must try every starting bomb |

**The insight:** O(n²) modeling is the bottleneck; traversal is straightforward DFS.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Number of Boomerangs #447](https://leetcode.com/problems/number-of-boomerangs/) | Count pairs same distance | O(n²) geometry |
| [Detonate Maximum Bombs #2101](https://leetcode.com/problems/detonate-maximum-bombs/) | Directed reachability | Build + DFS |
| [Min Cost Connect Points #1584](https://leetcode.com/problems/min-cost-to-connect-all-points/) | MST on geometry | Day 21 |

---

## 📖 Walkthrough

```
Bombs: (0,0,r=3), (5,0,r=2), (2,0,r=1)

0 triggers 2? dist=2 ≤ 3 ✓
0 triggers 1? dist=5 > 3 ✗
2 triggers 1? dist=3 > 1 ✗

Start at 0 → {0,2} count=2
Start at 1 → {1} count=1
Answer: 2
```

> 💡 **The insight:** Geometry defines edges; DFS counts chain length.

---

## Solution

### C++
```cpp
class Solution {
    bool overlap(vector<int>& a, vector<int>& b) {
        long long dx = a[0] - b[0], dy = a[1] - b[1];
        long long r = (long long)a[2] + b[2];
        return dx * dx + dy * dy <= r * r;
    }
    void dfs(int u, vector<vector<int>>& bombs, vector<bool>& vis) {
        vis[u] = true;
        for (int v = 0; v < (int)bombs.size(); v++)
            if (!vis[v] && overlap(bombs[u], bombs[v])) dfs(v, bombs, vis);
    }
public:
    int maximumDetonation(vector<vector<int>>& bombs) {
        int best = 0;
        for (int i = 0; i < (int)bombs.size(); i++) {
            vector<bool> vis(bombs.size());
            dfs(i, bombs, vis);
            best = max(best, (int)count(vis.begin(), vis.end(), true));
        }
        return best;
    }
};
```

### Python
```python
class Solution:
    def maximumDetonation(self, bombs: List[List[int]]) -> int:
        def overlap(a, b):
            dx, dy = a[0] - b[0], a[1] - b[1]
            r = a[2] + b[2]
            return dx * dx + dy * dy <= r * r
        def dfs(u, vis):
            vis[u] = True
            for v in range(len(bombs)):
                if not vis[v] and overlap(bombs[u], bombs[v]):
                    dfs(v, vis)
        best = 0
        for i in range(len(bombs)):
            vis = [False] * len(bombs)
            dfs(i, vis)
            best = max(best, sum(vis))
        return best
```

### Java
```java
class Solution {
    public int maximumDetonation(int[][] bombs) {
        int best = 0;
        for (int i = 0; i < bombs.length; i++) {
            boolean[] vis = new boolean[bombs.length];
            dfs(i, bombs, vis);
            int cnt = 0;
            for (boolean v : vis) if (v) cnt++;
            best = Math.max(best, cnt);
        }
        return best;
    }
    private void dfs(int u, int[][] bombs, boolean[] vis) {
        vis[u] = true;
        for (int v = 0; v < bombs.length; v++)
            if (!vis[v] && overlap(bombs[u], bombs[v])) dfs(v, bombs, vis);
    }
    private boolean overlap(int[] a, int[] b) {
        long dx = a[0] - b[0], dy = a[1] - b[1], r = (long) a[2] + b[2];
        return dx * dx + dy * dy <= r * r;
    }
}
```

**Complexity:** O(n²) time · O(n) space
---

## 💭 What Should Have Clicked in Your Mind?

- **"Radius blast chain"** → build directed reachability graph.
- **"dist² ≤ r_i²"** → long long, per problem's trigger rule.
- **"Max over all starters"** → reset visited each trial.
- **"Not shortest path"** → DFS/BFS count, not Dijkstra.
- **"Model first, traverse second"** → Day 24 theme.

> 🎯 **Pattern Unlocked:** Geometric Graph Construction + DFS

---

*One quest down. Next: tree return-cost DFS for apples. →*
