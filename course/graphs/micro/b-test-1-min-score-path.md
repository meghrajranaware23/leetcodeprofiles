<!-- hand-authored -->
# ⚔ B-Rank Test — Problem 1

> [Minimum Score of a Path Between Two Cities #2492](https://leetcode.com/problems/minimum-score-of-a-path-between-two-cities/) · Medium · 200 XP

---

You've completed your B-Rank training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Minimum Score of a Path Between Two Cities on LeetCode](https://leetcode.com/problems/minimum-score-of-a-path-between-two-cities/)**

> ⚔ **Hunter's rule:** City 1 and city n must be in the **same UF component**. Answer = **minimum road score** among all roads in that component — not a path simulation.

---

## The Problem

See the full problem statement on LeetCode: **[Minimum Score of a Path Between Two Cities #2492](https://leetcode.com/problems/minimum-score-of-a-path-between-two-cities/)**

---

## 💡 Hints

> 🎯 **What's being tested:** **Day 17 UF + component scan** — union all roads; if `find(1) != find(n)` return -1; else min edge weight in that component.

- Roads are undirected; union both endpoints (watch 1-indexed → 0-indexed).
- "Minimum score of **a path**" in a connected component = **minimum edge weight in the component** (you can walk any route; the bottleneck is the smallest road on the best path = global min edge in component).
- Not Dijkstra — no source-target path search.
- Not MST — you need min edge in existing component, not build tree.

**Pattern name before coding:** *UF merge roads → same component check → min weight among edges in component.*

---

## 🔍 Pattern Recognition Breakdown

**How to identify from the statement:**
- Undirected roads with scores — connectivity via UF
- Query between city 1 and n — same component required
- Answer is min edge label in component (bottleneck path argument)

**How a strong solver thinks before coding:**
1. *"Union all (a,b) roads."*
2. *"If find(0) != find(n-1) → -1."*
3. *"For each road in find(0)'s component: ans = min(ans, score)."*
4. *"Not BFS/Dijkstra — one UF pass + one scan."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Dijkstra from city 1** | Wrong — want min edge in component, not path sum |
| **BFS/DFS path enumeration** | Exponential — min bottleneck = min edge in connected subgraph |
| **MST on full graph** | Overkill — only need min edge weight in one component |
| **Forget 1-indexed cities** | Off-by-one on union indices |

---

## 🎯 Transfer to Unseen Problems

Same UF family as [Redundant Connection #684](https://leetcode.com/problems/redundant-connection/) and Connect Network — merge first, then read component property (here: min edge weight).

Reference: **Day 17** UF + **Day 20** bottleneck intuition (min max edge vs min edge in component).

---

<details>
<summary><strong>📖 Solution & Walkthrough</strong></summary>

Trace the pattern on the example graph from the problem statement. Then implement the traversal skeleton you identified.

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
    int minScore(int n, vector<vector<int>>& roads) {
        p.resize(n); r.assign(n, 0);
        iota(p.begin(), p.end(), 0);
        for (auto& rd : roads) unite(rd[0] - 1, rd[1] - 1);
        int start = find(0), end = find(n - 1);
        if (start != end) return -1;
        int ans = INT_MAX;
        for (auto& rd : roads)
            if (find(rd[0] - 1) == start) ans = min(ans, rd[2]);
        return ans;
    }
};
```

### Python
```python
class Solution:
    def minScore(self, n: int, roads: List[List[int]]) -> int:
        p = list(range(n))
        def find(x):
            while p[x] != x:
                p[x] = p[p[x]]
                x = p[x]
            return x
        for a, b, _ in roads:
            p[find(b - 1)] = find(a - 1)
        if find(0) != find(n - 1): return -1
        return min(w for a, b, w in roads if find(a - 1) == find(0))
```

### Java
```java
class Solution {
    private int[] p;
    public int minScore(int n, int[][] roads) {
        p = new int[n];
        for (int i = 0; i < n; i++) p[i] = i;
        for (int[] rd : roads) unite(rd[0] - 1, rd[1] - 1);
        if (find(0) != find(n - 1)) return -1;
        int ans = Integer.MAX_VALUE;
        for (int[] rd : roads)
            if (find(rd[0] - 1) == find(0)) ans = Math.min(ans, rd[2]);
        return ans;
    }
    private int find(int x) { return p[x] == x ? x : (p[x] = find(p[x])); }
    private void unite(int a, int b) { p[find(b)] = find(a); }
}
```

**Complexity:** O(E · α(n)) time · O(n) space

</details>

---

## 💭 What Should Have Clicked in Your Mind?

- **"Min score path between 1 and n"** → same component + min road in component.
- **"UF all roads first"** → find(1)==find(n) required.
- **"Not Dijkstra"** → no weighted shortest path from source.
- **"1-indexed cities"** → subtract 1 for array indices.

---

*1 of 3 test problems. Continue to the next. →*

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
    int minScore(int n, vector<vector<int>>& roads) {
        p.resize(n); r.assign(n, 0);
        iota(p.begin(), p.end(), 0);
        for (auto& rd : roads) unite(rd[0] - 1, rd[1] - 1);
        int start = find(0), end = find(n - 1);
        if (start != end) return -1;
        int ans = INT_MAX;
        for (auto& rd : roads)
            if (find(rd[0] - 1) == start) ans = min(ans, rd[2]);
        return ans;
    }
};
```

### Python
```python
class Solution:
    def minScore(self, n: int, roads: List[List[int]]) -> int:
        p = list(range(n))
        def find(x):
            while p[x] != x:
                p[x] = p[p[x]]
                x = p[x]
            return x
        for a, b, _ in roads:
            p[find(b - 1)] = find(a - 1)
        if find(0) != find(n - 1): return -1
        return min(w for a, b, w in roads if find(a - 1) == find(0))
```

### Java
```java
class Solution {
    private int[] p;
    public int minScore(int n, int[][] roads) {
        p = new int[n];
        for (int i = 0; i < n; i++) p[i] = i;
        for (int[] rd : roads) unite(rd[0] - 1, rd[1] - 1);
        if (find(0) != find(n - 1)) return -1;
        int ans = Integer.MAX_VALUE;
        for (int[] rd : roads)
            if (find(rd[0] - 1) == find(0)) ans = Math.min(ans, rd[2]);
        return ans;
    }
    private int find(int x) { return p[x] == x ? x : (p[x] = find(p[x])); }
    private void unite(int a, int b) { p[find(b)] = find(a); }
}
```

**Complexity:** O(E · α(n)) time · O(n) space
