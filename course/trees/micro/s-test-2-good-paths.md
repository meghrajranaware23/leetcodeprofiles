<!-- hand-authored -->
# ⚔ S-Rank Test — Problem 2

> [Number of Good Paths #2421](https://leetcode.com/problems/number-of-good-paths/) · Hard · 300 XP

---

You've completed your S-Rank training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Number of Good Paths on LeetCode](https://leetcode.com/problems/number-of-good-paths/)**

> ⚔ **Hunter's rule:** This is a rank test — treat it like real interview practice. Sort nodes by value; union edges only when both endpoints ≤ current threshold. No peeking until you've genuinely tried.

---

## The Problem

See the full problem statement on LeetCode: **[Number of Good Paths #2421](https://leetcode.com/problems/number-of-good-paths/)**

---

## 💡 Hints

> 🎯 **What's being tested:** **DSU + sort by value** on a tree — not pure tree DFS. Good path = two same-value nodes connected through nodes all ≤ that value.

**Algorithm sketch:**
1. Group nodes by `vals[i]`
2. Process groups in **increasing value order**
3. For each node in current group, union with neighbors where `vals[neighbor] <= current_val`
4. Within each connected component, count pairs of same-value nodes: `k*(k-1)/2`
5. Start with `res = n` (each node is a trivial good path)

**Pattern name before coding:** *Offline DSU — activate edges as value threshold rises.*

**Why not tree DFS?** Path must be non-decreasing in values — global connectivity by value threshold, not root-to-leaf.

---

## 🔍 Pattern Recognition Breakdown

**How to identify from the statement:**
- "Good path" = endpoints same value, all intermediate ≤ that value
- Tree edges + value constraint → **union-find** as threshold increases
- Count pairs in components → combinatorics per DSU root

**How a strong solver thinks before coding:**
1. *"Sort unique values ascending."*
2. *"Union edge (u,v) only when both vals ≤ current threshold."*
3. *"For nodes with val=V in this round, count by component root."*
4. *"Add k choose 2 for each root with k same-value nodes."*

**S-Rank depth:** Connect to Day 27 tree-graph hybrid — tree structure gives edges, but **connectivity query** needs DSU not dfs.

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **BFS/DFS between every same-value pair** | O(n²) pairs — TLE |
| **Pure tree LCA for each pair** | Still O(n²) pairs |
| **Union all edges upfront** | Violates non-decreasing constraint — high-value nodes bridge too early |
| **Forget single-node paths** | Answer includes `n` trivial paths |

---

## 🎯 Transfer to Unseen Problems

| Problem | Technique |
|---|---|
| [Similar problems with threshold connectivity](https://leetcode.com/tag/union-find/) | Offline DSU + sort |
| Day 27 tree-as-graph | Tree edges, graph algorithm |
| Count pairs in components | `k*(k-1)/2` per root |

When constraint is **"only use nodes with value ≤ X"**, think **process X increasing + DSU**.

---

<details>
<summary><strong>📖 Solution & Walkthrough</strong></summary>

Trace the pattern on the example tree from the problem statement. Then implement the recursive skeleton you identified.

### C++
```cpp
class Solution {
    vector<int> parent, rnk;
    int find(int x) {
        if (parent[x] != x) parent[x] = find(parent[x]);
        return parent[x];
    }
    void unite(int x, int y) {
        int px = find(x), py = find(y);
        if (px == py) return;
        if (rnk[px] < rnk[py]) swap(px, py);
        parent[py] = px;
        if (rnk[px] == rnk[py]) rnk[px]++;
    }
public:
    int numberOfGoodPaths(vector<int>& vals, vector<vector<int>>& edges) {
        int n = vals.size();
        parent.resize(n); rnk.assign(n, 0);
        iota(parent.begin(), parent.end(), 0);
        vector<vector<int>> adj(n);
        for (auto& e : edges) { adj[e[0]].push_back(e[1]); adj[e[1]].push_back(e[0]); }
        map<int, vector<int>> groups;
        for (int i = 0; i < n; i++) groups[vals[i]].push_back(i);
        int res = n;
        for (auto& [val, nodes] : groups) {
            for (int node : nodes)
                for (int nb : adj[node])
                    if (vals[nb] <= val) unite(node, nb);
            unordered_map<int,int> comp;
            for (int node : nodes) comp[find(node)]++;
            for (auto& [root, k] : comp) res += k * (k-1) / 2;
        }
        return res;
    }
};
```

### Python
```python
from collections import defaultdict
class Solution:
    def numberOfGoodPaths(self, vals: List[int], edges: List[List[int]]) -> int:
        n = len(vals)
        parent = list(range(n))
        rank = [0] * n
        def find(x):
            while parent[x] != x: parent[x] = parent[parent[x]]; x = parent[x]
            return x
        def union(x, y):
            px, py = find(x), find(y)
            if px == py: return
            if rank[px] < rank[py]: px, py = py, px
            parent[py] = px
            if rank[px] == rank[py]: rank[px] += 1
        adj = defaultdict(list)
        for u, v in edges: adj[u].append(v); adj[v].append(u)
        groups = defaultdict(list)
        for i, v in enumerate(vals): groups[v].append(i)
        res = n
        for val in sorted(groups):
            for node in groups[val]:
                for nb in adj[node]:
                    if vals[nb] <= val: union(node, nb)
            comp = defaultdict(int)
            for node in groups[val]: comp[find(node)] += 1
            for k in comp.values(): res += k * (k-1) // 2
        return res
```

### Java
```java
class Solution {
    private int[] parent, rank;
    private int find(int x) {
        if (parent[x] != x) parent[x] = find(parent[x]);
        return parent[x];
    }
    private void union(int x, int y) {
        int px = find(x), py = find(y);
        if (px == py) return;
        if (rank[px] < rank[py]) { int t=px; px=py; py=t; }
        parent[py] = px;
        if (rank[px] == rank[py]) rank[px]++;
    }
    public int numberOfGoodPaths(int[] vals, int[][] edges) {
        int n = vals.length;
        parent = new int[n]; rank = new int[n];
        for (int i=0;i<n;i++) parent[i]=i;
        List<List<Integer>> adj = new ArrayList<>();
        for (int i=0;i<n;i++) adj.add(new ArrayList<>());
        for (int[] e : edges) { adj.get(e[0]).add(e[1]); adj.get(e[1]).add(e[0]); }
        TreeMap<Integer,List<Integer>> groups = new TreeMap<>();
        for (int i=0;i<n;i++) groups.computeIfAbsent(vals[i], k->new ArrayList<>()).add(i);
        int res = n;
        for (Map.Entry<Integer,List<Integer>> entry : groups.entrySet()) {
            int val = entry.getKey();
            for (int node : entry.getValue())
                for (int nb : adj.get(node))
                    if (vals[nb] <= val) union(node, nb);
            Map<Integer,Integer> comp = new HashMap<>();
            for (int node : entry.getValue()) comp.merge(find(node), 1, Integer::sum);
            for (int k : comp.values()) res += k*(k-1)/2;
        }
        return res;
    }
}
```

**Complexity:** undefined

</details>

---

## 💭 What Should Have Clicked in Your Mind?

- **"Same value endpoints, non-decreasing path"** → threshold DSU, not tree dfs.
- **"Process values ascending"** → only union edges when both ends allowed.
- **"Count pairs per component"** → `k*(k-1)/2` for k same-value nodes.
- **"Tree + global connectivity"** → Day 27 hybrid — graph tool on tree edges.

---

*2 of 3 test problems. Continue to the next. →*

## Solution

### C++
```cpp
class Solution {
    vector<int> parent, rnk;
    int find(int x) {
        if (parent[x] != x) parent[x] = find(parent[x]);
        return parent[x];
    }
    void unite(int x, int y) {
        int px = find(x), py = find(y);
        if (px == py) return;
        if (rnk[px] < rnk[py]) swap(px, py);
        parent[py] = px;
        if (rnk[px] == rnk[py]) rnk[px]++;
    }
public:
    int numberOfGoodPaths(vector<int>& vals, vector<vector<int>>& edges) {
        int n = vals.size();
        parent.resize(n); rnk.assign(n, 0);
        iota(parent.begin(), parent.end(), 0);
        vector<vector<int>> adj(n);
        for (auto& e : edges) { adj[e[0]].push_back(e[1]); adj[e[1]].push_back(e[0]); }
        map<int, vector<int>> groups;
        for (int i = 0; i < n; i++) groups[vals[i]].push_back(i);
        int res = n;
        for (auto& [val, nodes] : groups) {
            for (int node : nodes)
                for (int nb : adj[node])
                    if (vals[nb] <= val) unite(node, nb);
            unordered_map<int,int> comp;
            for (int node : nodes) comp[find(node)]++;
            for (auto& [root, k] : comp) res += k * (k-1) / 2;
        }
        return res;
    }
};
```

### Python
```python
from collections import defaultdict
class Solution:
    def numberOfGoodPaths(self, vals: List[int], edges: List[List[int]]) -> int:
        n = len(vals)
        parent = list(range(n))
        rank = [0] * n
        def find(x):
            while parent[x] != x: parent[x] = parent[parent[x]]; x = parent[x]
            return x
        def union(x, y):
            px, py = find(x), find(y)
            if px == py: return
            if rank[px] < rank[py]: px, py = py, px
            parent[py] = px
            if rank[px] == rank[py]: rank[px] += 1
        adj = defaultdict(list)
        for u, v in edges: adj[u].append(v); adj[v].append(u)
        groups = defaultdict(list)
        for i, v in enumerate(vals): groups[v].append(i)
        res = n
        for val in sorted(groups):
            for node in groups[val]:
                for nb in adj[node]:
                    if vals[nb] <= val: union(node, nb)
            comp = defaultdict(int)
            for node in groups[val]: comp[find(node)] += 1
            for k in comp.values(): res += k * (k-1) // 2
        return res
```

### Java
```java
class Solution {
    private int[] parent, rank;
    private int find(int x) {
        if (parent[x] != x) parent[x] = find(parent[x]);
        return parent[x];
    }
    private void union(int x, int y) {
        int px = find(x), py = find(y);
        if (px == py) return;
        if (rank[px] < rank[py]) { int t=px; px=py; py=t; }
        parent[py] = px;
        if (rank[px] == rank[py]) rank[px]++;
    }
    public int numberOfGoodPaths(int[] vals, int[][] edges) {
        int n = vals.length;
        parent = new int[n]; rank = new int[n];
        for (int i=0;i<n;i++) parent[i]=i;
        List<List<Integer>> adj = new ArrayList<>();
        for (int i=0;i<n;i++) adj.add(new ArrayList<>());
        for (int[] e : edges) { adj.get(e[0]).add(e[1]); adj.get(e[1]).add(e[0]); }
        TreeMap<Integer,List<Integer>> groups = new TreeMap<>();
        for (int i=0;i<n;i++) groups.computeIfAbsent(vals[i], k->new ArrayList<>()).add(i);
        int res = n;
        for (Map.Entry<Integer,List<Integer>> entry : groups.entrySet()) {
            int val = entry.getKey();
            for (int node : entry.getValue())
                for (int nb : adj.get(node))
                    if (vals[nb] <= val) union(node, nb);
            Map<Integer,Integer> comp = new HashMap<>();
            for (int node : entry.getValue()) comp.merge(find(node), 1, Integer::sum);
            for (int k : comp.values()) res += k*(k-1)/2;
        }
        return res;
    }
}
```

**Complexity:** undefined
