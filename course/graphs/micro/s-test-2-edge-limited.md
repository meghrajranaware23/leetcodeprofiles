<!-- hand-authored -->
# ⚔ S-Rank Test — Problem 2

> [Checking Existence of Edge Length Limited Paths #1697](https://leetcode.com/problems/checking-existence-of-edge-length-limited-paths/) · Hard · 300 XP

---

You've completed your S-Rank training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Checking Existence of Edge Length Limited Paths on LeetCode](https://leetcode.com/problems/checking-existence-of-edge-length-limited-paths/)**

> ⚔ **Hunter's rule:** This is a rank test — offline processing. Sort edges and queries by limit; add edges incrementally to UF. No per-query BFS.

---

## The Problem

See the full problem statement on LeetCode: **[Checking Existence of Edge Length Limited Paths #1697](https://leetcode.com/problems/checking-existence-of-edge-length-limited-paths/)**

---

## 💡 Hints

> 🎯 **What's being tested:** **Offline sort + Union-Find** (Days 17–18, Day 21 Kruskal cousin).

- Query `(u, v, limit)`: path exists using only edges with weight **< limit**.
- Sort `edgeList` by weight ascending; sort queries by `limit` ascending.
- Sweep: add edges while `edge.weight < query.limit`; answer `find(u) == find(v)`.
- Attach original query index to preserve output order.

**Pattern name before coding:** *Offline UF — process queries in increasing limit order.*

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Offline Sort + Union-Find

**How to identify from the statement:**
- Many connectivity queries with weight thresholds
- "Path using edges shorter than L" → monotone in L as edges are added
- Batch queries → offline sort beats online per-query BFS

**How a strong solver thinks before coding:**
1. *"Threshold on edge weights?"* → sort edges + queries together by limit.
2. *"Incremental UF as edges become available."*
3. *"Answer each query when limit reached — find(u)==find(v)."*
4. *"Store query index — output order must match input."*

**S-Rank connection:** Decision tree → connectivity → many threshold queries → **offline UF**, not repeated DFS.

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **BFS/DFS per query with filtered edges** | O(Q · (V+E)) — too slow |
| **Dijkstra per query** | Overkill — only need connected/not |
| **Sort queries but forget edge index** | Output order scrambled |
| **Add edges with weight ≤ limit vs < limit** | Read problem: strictly **< limit** |
| **Single UF without resetting between queries** | Offline sweep relies on monotone add |

---

## 🎯 Transfer to Unseen Problems

*"Q queries: are nodes connected using only edges with cost ≤ W?"*

Sort edges and queries by W; sweep UF. Same template as Kruskal — but answer queries at each threshold instead of building one MST.

Reference: **Day 17 UF** + **Day 21** edge sorting discipline.

---

<details>
<summary><strong>📖 Solution & Walkthrough</strong></summary>

Trace the pattern on the example graph from the problem statement. Then implement the traversal skeleton you identified.

### C++
```cpp
class Solution {
    vector<int> p;
    int find(int x) { return p[x] == x ? x : p[x] = find(p[x]); }
    void unite(int a, int b) { p[find(b)] = find(a); }
public:
    vector<bool> distanceLimitedPathsExist(int n, vector<vector<int>>& edgeList, vector<vector<int>>& queries) {
        for (int i = 0; i < (int)queries.size(); i++) queries[i].push_back(i);
        sort(edgeList.begin(), edgeList.end(), [](auto& a, auto& b) { return a[2] < b[2]; });
        sort(queries.begin(), queries.end(), [](auto& a, auto& b) { return a[2] < b[2]; });
        p.resize(n);
        iota(p.begin(), p.end(), 0);
        vector<bool> ans(queries.size());
        int j = 0;
        for (auto& q : queries) {
            while (j < (int)edgeList.size() && edgeList[j][2] < q[2]) {
                unite(edgeList[j][0], edgeList[j][1]);
                j++;
            }
            ans[q[3]] = find(q[0]) == find(q[1]);
        }
        return ans;
    }
};
```

### Python
```python
class Solution:
    def distanceLimitedPathsExist(self, n: int, edgeList: List[List[int]], queries: List[List[int]]) -> List[bool]:
        edgeList.sort(key=lambda e: e[2])
        indexed = sorted(enumerate(queries), key=lambda x: x[1][2])
        p = list(range(n))
        def find(x):
            while p[x] != x:
                p[x] = p[p[x]]
                x = p[x]
            return x
        def unite(a, b):
            p[find(b)] = find(a)
        ans = [False] * len(queries)
        j = 0
        for idx, (u, v, limit) in indexed:
            while j < len(edgeList) and edgeList[j][2] < limit:
                unite(edgeList[j][0], edgeList[j][1])
                j += 1
            ans[idx] = find(u) == find(v)
        return ans
```

### Java
```java
class Solution {
    private int[] p;
    public boolean[] distanceLimitedPathsExist(int n, int[][] edgeList, int[][] queries) {
        int[][] qs = new int[queries.length][4];
        for (int i = 0; i < queries.length; i++) {
            qs[i][0] = queries[i][0]; qs[i][1] = queries[i][1];
            qs[i][2] = queries[i][2]; qs[i][3] = i;
        }
        Arrays.sort(edgeList, Comparator.comparingInt(a -> a[2]));
        Arrays.sort(qs, Comparator.comparingInt(a -> a[2]));
        p = new int[n];
        for (int i = 0; i < n; i++) p[i] = i;
        boolean[] ans = new boolean[queries.length];
        int j = 0;
        for (int[] q : qs) {
            while (j < edgeList.length && edgeList[j][2] < q[2]) {
                unite(edgeList[j][0], edgeList[j][1]);
                j++;
            }
            ans[q[3]] = find(q[0]) == find(q[1]);
        }
        return ans;
    }
    private int find(int x) { return p[x] == x ? x : (p[x] = find(p[x])); }
    private void unite(int a, int b) { p[find(b)] = find(a); }
}
```

**Complexity:** O((E + Q) log(E + Q) · α(n)) time · O(n + Q) space

</details>

---

## 💭 What Should Have Clicked in Your Mind?

- **"Path with edge length < limit"** → monotone threshold → offline sort.
- **UF sweep** — add edges as limit grows; no reset between queries.
- **Not BFS per query** — batch structure is the whole trick.
- **Decision tree:** connectivity + many limits → Day 17 offline UF.

---

*2 of 3 test problems. Continue to the next. →*

## Solution

### C++
```cpp
class Solution {
    vector<int> p;
    int find(int x) { return p[x] == x ? x : p[x] = find(p[x]); }
    void unite(int a, int b) { p[find(b)] = find(a); }
public:
    vector<bool> distanceLimitedPathsExist(int n, vector<vector<int>>& edgeList, vector<vector<int>>& queries) {
        for (int i = 0; i < (int)queries.size(); i++) queries[i].push_back(i);
        sort(edgeList.begin(), edgeList.end(), [](auto& a, auto& b) { return a[2] < b[2]; });
        sort(queries.begin(), queries.end(), [](auto& a, auto& b) { return a[2] < b[2]; });
        p.resize(n);
        iota(p.begin(), p.end(), 0);
        vector<bool> ans(queries.size());
        int j = 0;
        for (auto& q : queries) {
            while (j < (int)edgeList.size() && edgeList[j][2] < q[2]) {
                unite(edgeList[j][0], edgeList[j][1]);
                j++;
            }
            ans[q[3]] = find(q[0]) == find(q[1]);
        }
        return ans;
    }
};
```

### Python
```python
class Solution:
    def distanceLimitedPathsExist(self, n: int, edgeList: List[List[int]], queries: List[List[int]]) -> List[bool]:
        edgeList.sort(key=lambda e: e[2])
        indexed = sorted(enumerate(queries), key=lambda x: x[1][2])
        p = list(range(n))
        def find(x):
            while p[x] != x:
                p[x] = p[p[x]]
                x = p[x]
            return x
        def unite(a, b):
            p[find(b)] = find(a)
        ans = [False] * len(queries)
        j = 0
        for idx, (u, v, limit) in indexed:
            while j < len(edgeList) and edgeList[j][2] < limit:
                unite(edgeList[j][0], edgeList[j][1])
                j += 1
            ans[idx] = find(u) == find(v)
        return ans
```

### Java
```java
class Solution {
    private int[] p;
    public boolean[] distanceLimitedPathsExist(int n, int[][] edgeList, int[][] queries) {
        int[][] qs = new int[queries.length][4];
        for (int i = 0; i < queries.length; i++) {
            qs[i][0] = queries[i][0]; qs[i][1] = queries[i][1];
            qs[i][2] = queries[i][2]; qs[i][3] = i;
        }
        Arrays.sort(edgeList, Comparator.comparingInt(a -> a[2]));
        Arrays.sort(qs, Comparator.comparingInt(a -> a[2]));
        p = new int[n];
        for (int i = 0; i < n; i++) p[i] = i;
        boolean[] ans = new boolean[queries.length];
        int j = 0;
        for (int[] q : qs) {
            while (j < edgeList.length && edgeList[j][2] < q[2]) {
                unite(edgeList[j][0], edgeList[j][1]);
                j++;
            }
            ans[q[3]] = find(q[0]) == find(q[1]);
        }
        return ans;
    }
    private int find(int x) { return p[x] == x ? x : (p[x] = find(p[x])); }
    private void unite(int a, int b) { p[find(b)] = find(a); }
}
```

**Complexity:** O((E + Q) log(E + Q) · α(n)) time · O(n + Q) space
