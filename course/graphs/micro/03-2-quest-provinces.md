<!-- hand-authored -->
# ⚔ Quest: Number of Provinces

> **Day 3** · [Number of Provinces #547](https://leetcode.com/problems/number-of-provinces/) · Medium · 15 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Number of Provinces on LeetCode](https://leetcode.com/problems/number-of-provinces/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. Draw cities as nodes; draw an edge when `isConnected[i][j]==1`. Count separate groups. The hints below are for *after* your attempt.

---

## The Problem

There are `n` cities. `isConnected[i][j] == 1` if city `i` and city `j` are **directly** connected (undirected). A **province** is a maximal connected group.

Return the number of provinces.

```
Input:  isConnected = [[1,1,0],[1,1,0],[0,0,1]]
Output: 2
Explanation: {0,1} and {2} are two provinces.

Input:  isConnected = [[1,0,0],[0,1,0],[0,0,1]]
Output: 3
Explanation: Each city alone.
```

---

## 💡 Hints

Which pattern from today's concept applies? **DFS connected components** — outer restart loop + flood each group.

**Hint 1:** Treat the matrix as an adjacency list: neighbors of `i` are all `j` where `isConnected[i][j]==1` and `j != i`.

**Hint 2:** `visited = [False]*n`, `components = 0`. For each `i`: if not visited, `components++` and `dfs(i)`.

**Hint 3:** In `dfs(u)`: mark `visited[u]=True`; for each neighbor `v`, if not visited, `dfs(v)`.

**Hint 4:** Union-Find also works (solution uses UF) — same "merge connected cities" idea as Day 1 Path Exists.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** DFS Connected Components

**How to identify this from the problem statement:**
- Undirected connectivity → components
- Matrix given instead of edge list → scan row `i` for neighbors
- Answer is a **count** of groups → restart loop pattern
- No shortest path → not BFS

| Keyword / phrase | What it signals |
|---|---|
| "provinces" / "circles" / "connected components" | Count groups |
| Symmetric `isConnected` matrix | Undirected graph |
| `isConnected[i][i]==1` always | Skip self or harmless |
| "directly connected" | Edge in adjacency |
| Return integer count | Outer loop increments |

**Why this pattern works:** Each DFS from an unvisited node marks exactly one entire province. The outer loop counts how many times you must start a new DFS.

**How a strong solver thinks before coding:**
1. *"Convert matrix row to neighbor list (or scan inline)."*
2. *"for i in range(n): if not vis[i]: count++, dfs(i)."*
3. *"dfs marks every city in the province."*
4. *"Example 1: dfs(0) marks 0,1; dfs(2) marks 2 → count=2."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Count 1s on diagonal or matrix cells** | Doesn't measure connectivity |
| **Single DFS from city 0 only** | Misses provinces not reachable from 0 |
| **Pairwise check if path exists for all pairs** | O(n²) path queries; one DFS pass is O(n²) total |
| **Treat matrix as directed** | Wrong — connection is mutual |
| **DFS without global visited** | Revisit cities; wrong count |

**The insight brute force misses:** Components = **how many times** you restart DFS on an unvisited node.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| Number of Islands #200 (Day 4) | Grid instead of matrix | Restart flood from each unvisited `1` |
| Keys and Rooms #841 (next quest) | Directed edges, one component from 0 | Same DFS skeleton, different question |
| Friend Circles = this problem | Same problem, old name | Component count |

Same restart loop — different graph input format.

---

## 📖 Walkthrough

**Restart loop — each new DFS = one province.**

```
isConnected:
  0 — 1    2

  [[1,1,0],
   [1,1,0],
   [0,0,1]]

i=0: not visited → components=1, dfs(0)
  dfs(0): mark 0 → neighbor 1 → dfs(1) marks 1
i=1: already visited → skip
i=2: not visited → components=2, dfs(2) marks 2

Answer: 2 ✓
```

> 💡 **The insight:** The outer `for i` loop is not the DFS — it's the **component counter**. DFS does the flooding inside each group.

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
public:
    int findCircleNum(vector<vector<int>>& isConnected) {
        int n = isConnected.size();
        p.resize(n); r.assign(n, 0);
        iota(p.begin(), p.end(), 0);
        for (int i = 0; i < n; i++)
            for (int j = i + 1; j < n; j++)
                if (isConnected[i][j]) unite(i, j);
        int comps = 0;
        for (int i = 0; i < n; i++) if (find(i) == i) comps++;
        return comps;
    }
};
```

### Python
```python
class Solution:
    def findCircleNum(self, isConnected: List[List[int]]) -> int:
        n = len(isConnected)
        p = list(range(n))
        def find(x):
            while p[x] != x:
                p[x] = p[p[x]]
                x = p[x]
            return x
        def unite(a, b):
            ra, rb = find(a), find(b)
            if ra != rb: p[rb] = ra
        for i in range(n):
            for j in range(i + 1, n):
                if isConnected[i][j]:
                    unite(i, j)
        return sum(find(i) == i for i in range(n))
```

### Java
```java
class Solution {
    private int[] p, r;
    public int findCircleNum(int[][] isConnected) {
        int n = isConnected.length;
        p = new int[n]; r = new int[n];
        for (int i = 0; i < n; i++) p[i] = i;
        for (int i = 0; i < n; i++)
            for (int j = i + 1; j < n; j++)
                if (isConnected[i][j] == 1) unite(i, j);
        int comps = 0;
        for (int i = 0; i < n; i++) if (find(i) == i) comps++;
        return comps;
    }
    private int find(int x) { return p[x] == x ? x : (p[x] = find(p[x])); }
    private void unite(int a, int b) {
        a = find(a); b = find(b);
        if (a == b) return;
        if (r[a] < r[b]) { int t = a; a = b; b = t; }
        p[b] = a;
        if (r[a] == r[b]) r[a]++;
    }
}
```

**Complexity:** O(n² · α(n)) time · O(n) space
---

## 💭 What Should Have Clicked in Your Mind?

- **"Provinces"** → connected components → **restart loop**.
- **Matrix = adjacency** → row `i` lists neighbors.
- **DFS picture:** each restart floods one province; solution uses UF (Day 1 tool).
- **Skip `j==i`** or ignore self-loop — diagonal is always 1.

If you coded DFS with outer loop, compare to UF — both count merged groups.

> 🎯 **Pattern Unlocked:** Component counting — unvisited node triggers new flood.

---

*One quest down. Next: directed graph, one start — can DFS reach every room? →*
