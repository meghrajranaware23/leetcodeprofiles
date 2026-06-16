<!-- hand-authored -->
# ⚔ C-Rank Test — Problem 3

> [Loud and Rich #851](https://leetcode.com/problems/loud-and-rich/) · Medium · 150 XP

---

You've completed your C-Rank training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Loud and Rich on LeetCode](https://leetcode.com/problems/loud-and-rich/)**

> ⚔ **Hunter's rule:** This is a rank test — treat it like real interview practice. `[a,b]` in richer means **b is richer than a** — edge b→a. For each person, find the quietest among themselves and all richer ancestors.

---

## The Problem

See the full problem statement on LeetCode: **[Loud and Rich #851](https://leetcode.com/problems/loud-and-rich/)**

---

## 💡 Hints

> 🎯 **What's being tested:** **DAG reachability + optimization** — Day 14–15 ancestor walk, but pick min `quiet[]` instead of listing all ancestors.

Build adj: for `[a,b]` richer, `adj[b].push(a)`. DFS with memo from each node: `ans[u] = u`, then for each richer child `v`, compare `quiet[dfs(v)]` with `quiet[ans[u]]`.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** DAG DFS with Memo (min over reachable set)

**How to identify from the statement:**
- Partial order "richer than" → DAG (no cycles stated)
- For each node: best among node + all nodes reachable via "richer" edges
- `quiet[i]` is the weight to minimize

**How a strong solver thinks before coding:**
1. *"Edge b→a if b richer than a."*
2. *"dfs(u): best = u; for v in adj[u]: cand = dfs(v); pick quieter."*
3. *"Memo per node — shared subproblems."*

**C-Rank connection:** Course Schedule IV asks "is u reachable?"; Loud and Rich asks "who is the quietest reachable node?"

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **BFS each node, scan all reachable** | O(n · (V+E)) without memo |
| **Reverse edge direction** | Walks wrong way in richness |
| **Sort by quiet globally** | Ignores richer constraint |

**The insight:** Same DAG DFS as ancestors — combine step picks min quiet instead of collecting a list.

---

## 🎯 Transfer to Unseen Problems

*"Among all nodes reachable in a DAG, find the one optimizing some property."*

Reachability + aggregation (min/max/count) with memo on DAG DFS.

---

<details>
<summary><strong>📖 Solution & Walkthrough</strong></summary>

Trace the pattern on the example graph from the problem statement. Then implement the traversal skeleton you identified.

### C++
```cpp
class Solution {
    vector<vector<int>> adj;
    vector<int> quiet, ans;
    int dfs(int u) {
        if (ans[u] != -1) return ans[u];
        ans[u] = u;
        for (int v : adj[u]) {
            int cand = dfs(v);
            if (quiet[cand] < quiet[ans[u]]) ans[u] = cand;
        }
        return ans[u];
    }
public:
    vector<int> loudAndRich(vector<vector<int>>& richer, vector<int>& quiet) {
        int n = quiet.size();
        this->quiet = quiet;
        adj.assign(n, {});
        for (auto& r : richer) adj[r[1]].push_back(r[0]);
        ans.assign(n, -1);
        vector<int> res(n);
        for (int i = 0; i < n; i++) res[i] = dfs(i);
        return res;
    }
};
```

### Python
```python
class Solution:
    def loudAndRich(self, richer: List[List[int]], quiet: List[int]) -> List[int]:
        n = len(quiet)
        adj = [[] for _ in range(n)]
        for a, b in richer:
            adj[b].append(a)
        memo = {}
        def dfs(u):
            if u in memo: return memo[u]
            best = u
            for v in adj[u]:
                cand = dfs(v)
                if quiet[cand] < quiet[best]:
                    best = cand
            memo[u] = best
            return best
        return [dfs(i) for i in range(n)]
```

### Java
```java
class Solution {
    private List<List<Integer>> adj;
    private int[] quiet, ans;
    public int[] loudAndRich(int[][] richer, int[] quiet) {
        int n = quiet.length;
        this.quiet = quiet;
        adj = new ArrayList<>();
        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
        for (int[] r : richer) adj.get(r[1]).add(r[0]);
        ans = new int[n];
        Arrays.fill(ans, -1);
        int[] res = new int[n];
        for (int i = 0; i < n; i++) res[i] = dfs(i);
        return res;
    }
    private int dfs(int u) {
        if (ans[u] != -1) return ans[u];
        ans[u] = u;
        for (int v : adj.get(u)) {
            int cand = dfs(v);
            if (quiet[cand] < quiet[ans[u]]) ans[u] = cand;
        }
        return ans[u];
    }
}
```

**Complexity:** O(n + E) time · O(n) space

</details>

---

## 💭 What Should Have Clicked in Your Mind?

- **"Richer → edge to poorer."** → b→a for `[a,b]`.
- **"Quietest among self + richer descendants."** → DFS min with memo.
- **"DAG DFS like Day 14 ancestors."** → combine step differs.
- **"Memo avoids recomputing subtrees."**

---

*3 of 3 test problems. Continue to the next. →*

## Solution

### C++
```cpp
class Solution {
    vector<vector<int>> adj;
    vector<int> quiet, ans;
    int dfs(int u) {
        if (ans[u] != -1) return ans[u];
        ans[u] = u;
        for (int v : adj[u]) {
            int cand = dfs(v);
            if (quiet[cand] < quiet[ans[u]]) ans[u] = cand;
        }
        return ans[u];
    }
public:
    vector<int> loudAndRich(vector<vector<int>>& richer, vector<int>& quiet) {
        int n = quiet.size();
        this->quiet = quiet;
        adj.assign(n, {});
        for (auto& r : richer) adj[r[1]].push_back(r[0]);
        ans.assign(n, -1);
        vector<int> res(n);
        for (int i = 0; i < n; i++) res[i] = dfs(i);
        return res;
    }
};
```

### Python
```python
class Solution:
    def loudAndRich(self, richer: List[List[int]], quiet: List[int]) -> List[int]:
        n = len(quiet)
        adj = [[] for _ in range(n)]
        for a, b in richer:
            adj[b].append(a)
        memo = {}
        def dfs(u):
            if u in memo: return memo[u]
            best = u
            for v in adj[u]:
                cand = dfs(v)
                if quiet[cand] < quiet[best]:
                    best = cand
            memo[u] = best
            return best
        return [dfs(i) for i in range(n)]
```

### Java
```java
class Solution {
    private List<List<Integer>> adj;
    private int[] quiet, ans;
    public int[] loudAndRich(int[][] richer, int[] quiet) {
        int n = quiet.length;
        this.quiet = quiet;
        adj = new ArrayList<>();
        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
        for (int[] r : richer) adj.get(r[1]).add(r[0]);
        ans = new int[n];
        Arrays.fill(ans, -1);
        int[] res = new int[n];
        for (int i = 0; i < n; i++) res[i] = dfs(i);
        return res;
    }
    private int dfs(int u) {
        if (ans[u] != -1) return ans[u];
        ans[u] = u;
        for (int v : adj.get(u)) {
            int cand = dfs(v);
            if (quiet[cand] < quiet[ans[u]]) ans[u] = cand;
        }
        return ans[u];
    }
}
```

**Complexity:** O(n + E) time · O(n) space
