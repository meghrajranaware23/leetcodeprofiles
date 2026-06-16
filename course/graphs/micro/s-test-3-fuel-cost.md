<!-- hand-authored -->
# ⚔ S-Rank Test — Problem 3

> [Minimum Fuel Cost to Report to the Capital #2477](https://leetcode.com/problems/minimum-fuel-cost-to-report-to-the-capital/) · Medium · 300 XP

---

You've completed your S-Rank training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Minimum Fuel Cost to Report to the Capital on LeetCode](https://leetcode.com/problems/minimum-fuel-cost-to-report-to-the-capital/)**

> ⚔ **Hunter's rule:** This is a rank test — tree as undirected graph, capital = node 0. **Post-order DFS**: subtree size flows up; each edge needs `ceil(subtree/seats)` trips.

---

## The Problem

See the full problem statement on LeetCode: **[Minimum Fuel Cost to Report to the Capital #2477](https://leetcode.com/problems/minimum-fuel-cost-to-report-to-the-capital/)**

---

## 💡 Hints

> 🎯 **What's being tested:** **Tree post-order aggregation** — graph is a tree; fuel counts on edges toward root.

- Build undirected adj from `roads`; root DFS at city 0.
- `dfs(u, parent)` returns **subtree node count** (including u).
- For each child v: after `sub = dfs(v, u)`, add `(sub + seats - 1) / seats` to fuel.
- Each edge toward capital carries representatives from child's subtree in batches of `seats`.

**Pattern name before coding:** *Post-order subtree count — aggregate up the tree from leaves.*

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Tree Post-Order Subtree Aggregation

**How to identify from the statement:**
- Undirected roads, n cities, tree structure (n-1 edges)
- "Report to capital" → all paths converge at node 0
- Fuel per edge trip → count trips = ceil(people / seats)
- No shortest path — **bottom-up combine** from leaves

**How a strong solver thinks before coding:**
1. *"Tree rooted at 0?"* → DFS post-order, not BFS.
2. *"Each child subtree contributes `size` people needing transport."*
3. *"Trips across edge = ceil(size / seats)."*
4. *"Sum trips on all edges toward root."*

**S-Rank connection:** Decision tree → tree structure → aggregate from leaves → **post-order DFS** (Forest Legend cousin).

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Simulate each car individually** | Overcomplicated — batch by seats |
| **BFS from every city to capital** | O(n²) — one post-order pass is O(n) |
| **Dijkstra / shortest path** | Tree has unique paths — no search needed |
| **Forget ceiling division** | `(sub + seats - 1) / seats`, not `sub / seats` |
| **Count fuel at wrong node** | Fuel accrues on **edges** toward parent |

---

## 🎯 Transfer to Unseen Problems

*"Minimum cost to gather all nodes to root where each trip carries at most K items."*

Post-order subtree size + ceil(sub/K) per edge. Same skeleton as coin/excess problems on trees — aggregate upward.

Reference: **Day 3 DFS** + tree post-order (Forest Legend pattern).

---

<details>
<summary><strong>📖 Solution & Walkthrough</strong></summary>

Trace the pattern on the example graph from the problem statement. Then implement the traversal skeleton you identified.

### C++
```cpp
class Solution {
    vector<vector<int>> adj;
    int seats;
    long long fuel = 0;
    int dfs(int u, int parent) {
        int size = 1;
        for (int v : adj[u]) {
            if (v == parent) continue;
            int sub = dfs(v, u);
            size += sub;
            fuel += (sub + seats - 1) / seats;
        }
        return size;
    }
public:
    long long minimumFuelCost(vector<vector<int>>& roads, int seats) {
        int n = roads.size() + 1;
        adj.assign(n, {});
        this->seats = seats;
        fuel = 0;
        for (auto& r : roads) { adj[r[0]].push_back(r[1]); adj[r[1]].push_back(r[0]); }
        dfs(0, -1);
        return fuel;
    }
};
```

### Python
```python
class Solution:
    def minimumFuelCost(self, roads: List[List[int]], seats: int) -> int:
        n = len(roads) + 1
        adj = [[] for _ in range(n)]
        for a, b in roads:
            adj[a].append(b); adj[b].append(a)
        fuel = 0
        def dfs(u, parent):
            nonlocal fuel
            size = 1
            for v in adj[u]:
                if v == parent: continue
                sub = dfs(v, u)
                size += sub
                fuel += (sub + seats - 1) // seats
            return size
        dfs(0, -1)
        return fuel
```

### Java
```java
class Solution {
    private List<List<Integer>> adj;
    public long minimumFuelCost(int[][] roads, int seats) {
        int n = roads.length + 1;
        adj = new ArrayList<>();
        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
        for (int[] r : roads) { adj.get(r[0]).add(r[1]); adj.get(r[1]).add(r[0]); }
        long total = 0;
        for (int v : adj.get(0)) {
            int sub = dfs(v, 0);
            total += (sub + seats - 1) / seats;
        }
        return total;
    }
    private int dfs(int u, int parent) {
        int size = 1;
        for (int v : adj.get(u)) {
            if (v == parent) continue;
            size += dfs(v, u);
        }
        return size;
    }
}
```

**Complexity:** O(n) time · O(n) space

</details>

---

## 💭 What Should Have Clicked in Your Mind?

- **"Tree + gather at root"** → post-order subtree sizes, not graph BFS.
- **`ceil(subtree / seats)` per child edge** — batch representatives upward.
- **Undirected roads → root at 0** — parent pointer prevents back-edge.
- **Decision tree:** tree shape → aggregate up → post-order DFS.

---

*3 of 3 test problems. Graph Legend ascension complete. →*

## Solution

### C++
```cpp
class Solution {
    vector<vector<int>> adj;
    int seats;
    long long fuel = 0;
    int dfs(int u, int parent) {
        int size = 1;
        for (int v : adj[u]) {
            if (v == parent) continue;
            int sub = dfs(v, u);
            size += sub;
            fuel += (sub + seats - 1) / seats;
        }
        return size;
    }
public:
    long long minimumFuelCost(vector<vector<int>>& roads, int seats) {
        int n = roads.size() + 1;
        adj.assign(n, {});
        this->seats = seats;
        fuel = 0;
        for (auto& r : roads) { adj[r[0]].push_back(r[1]); adj[r[1]].push_back(r[0]); }
        dfs(0, -1);
        return fuel;
    }
};
```

### Python
```python
class Solution:
    def minimumFuelCost(self, roads: List[List[int]], seats: int) -> int:
        n = len(roads) + 1
        adj = [[] for _ in range(n)]
        for a, b in roads:
            adj[a].append(b); adj[b].append(a)
        fuel = 0
        def dfs(u, parent):
            nonlocal fuel
            size = 1
            for v in adj[u]:
                if v == parent: continue
                sub = dfs(v, u)
                size += sub
                fuel += (sub + seats - 1) // seats
            return size
        dfs(0, -1)
        return fuel
```

### Java
```java
class Solution {
    private List<List<Integer>> adj;
    public long minimumFuelCost(int[][] roads, int seats) {
        int n = roads.length + 1;
        adj = new ArrayList<>();
        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
        for (int[] r : roads) { adj.get(r[0]).add(r[1]); adj.get(r[1]).add(r[0]); }
        long total = 0;
        for (int v : adj.get(0)) {
            int sub = dfs(v, 0);
            total += (sub + seats - 1) / seats;
        }
        return total;
    }
    private int dfs(int u, int parent) {
        int size = 1;
        for (int v : adj.get(u)) {
            if (v == parent) continue;
            size += dfs(v, u);
        }
        return size;
    }
}
```

**Complexity:** O(n) time · O(n) space
