<!-- hand-authored -->
# ⚔ Quest: Sum of Distances in Tree

> **Day 25** · [Sum of Distances in Tree #834](https://leetcode.com/problems/sum-of-distances-in-tree/) · Hard · 25 min · 40 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Sum of Distances in Tree on LeetCode](https://leetcode.com/problems/sum-of-distances-in-tree/)**

> ⚔ **Hunter's rule:** Draw the tree as adjacency list. Pass 1: compute subtree sizes and sum from node 0. Pass 2: reroot with `ans[child] = ans[parent] - cnt[child] + (n - cnt[child])`. Hints are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Sum of Distances in Tree #834](https://leetcode.com/problems/sum-of-distances-in-tree/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? **Re-rooting two-pass** — Pass 1 gathers `cnt[u]` and `ans[0]`; Pass 2 propagates answers using the reroot formula when crossing parent→child edge.

If stuck: when moving root from `u` to child `v`, nodes in `v`'s subtree get 1 closer; everyone else gets 1 farther.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Re-rooting Technique (Pass 1 Sizes / Pass 2 Reroot)

**How to identify this from the problem statement:**
- "Sum of distances" **for every node** → can't BFS from each node O(n²)
- Undirected tree as edges → build adjacency list
- Output array length n → reroot DP

| Keyword / phrase | What it signals |
|---|---|
| "each node" / "all nodes as root" | Rerooting, not single-source BFS |
| "tree with n nodes" | Two DFS passes O(n) |
| "edges[i] = [u,v]" | Bidirectional graph |
| Hard + distance sum | Classic #834 reroot |

**Why this pattern works:** Moving root across one edge only changes distance to each node by exactly ±1 depending on which side of the edge they lie. Subtree count `cnt[v]` tells you how many move closer vs farther.

**How a strong solver thinks before coding:**
1. *"Build undirected graph from edges."*
2. *"dfs1(0): cnt[u]+=cnt[v], ans[u]+=ans[v]+cnt[v]."*
3. *"dfs2(0): ans[v]=ans[u]-cnt[v]+(n-cnt[v])."*
4. *"Return ans array."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **BFS/DFS from every node** | O(n²) — fails on n=3×10⁴ |
| **All-pairs shortest path** | O(n³) or O(n² log n) — tree structure wasted |
| **Recompute sum from scratch on reroot** | O(n) per node — Pass 2 formula is O(1) per edge |
| **Directed tree only one way** | Need undirected adjacency for both passes |

**The insight brute force misses:** Only **one edge** changes between adjacent roots — adjust the sum in O(1) using subtree size.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Tree Diameter #1245](https://leetcode.com/problems/tree-diameter/) | Longest path not sum | Two-pass or two BFS |
| [Min Height Trees #310](https://leetcode.com/problems/minimum-height-trees/) | Centroids | Trim leaves — different technique |
| [Max Score After Split #2497](https://leetcode.com/problems/maximum-score-of-a-tree-split/) | Split edge score | Subtree count from Pass 1 |

Same skeleton: subtree counts unlock global tree metrics.

---

## 📖 Walkthrough

**n=6, edges: [[0,1],[1,2],[1,3],[3,4],[3,5]]**

```
      0
      |
      1
     / \
    2   3
       / \
      4   5

Pass 1 from 0:
  cnt[2]=1, cnt[4]=1, cnt[5]=1
  cnt[3]=3, ans[3]=2
  cnt[1]=5, ans[1]=6
  cnt[0]=6, ans[0]=11

Pass 2:
  ans[1] = 11 - 5 + 1 = 7
  ans[3] = 7 - 3 + 3 = 7
  ans[2] = 7 - 1 + 5 = 11
  ...
```

> 💡 **The insight:** Pass 1 computes once from node 0; Pass 2 slides the root along every edge.

---

## Solution

### C++
```cpp
class Solution {
    vector<vector<int>> graph;
    vector<int> cnt, ans;
    int n;
    void dfs1(int node, int par) {
        for (int child : graph[node]) {
            if (child == par) continue;
            dfs1(child, node);
            cnt[node] += cnt[child];
            ans[node] += ans[child] + cnt[child];
        }
    }
    void dfs2(int node, int par) {
        for (int child : graph[node]) {
            if (child == par) continue;
            ans[child] = ans[node] - cnt[child] + (n - cnt[child]);
            dfs2(child, node);
        }
    }
public:
    vector<int> sumOfDistancesInTree(int n, vector<vector<int>>& edges) {
        this->n = n;
        graph.resize(n);
        cnt.assign(n, 1);
        ans.assign(n, 0);
        for (auto& e : edges) {
            graph[e[0]].push_back(e[1]);
            graph[e[1]].push_back(e[0]);
        }
        dfs1(0, -1);
        dfs2(0, -1);
        return ans;
    }
};
```

### Python
```python
from collections import defaultdict
class Solution:
    def sumOfDistancesInTree(self, n: int, edges: List[List[int]]) -> List[int]:
        graph = defaultdict(list)
        for u, v in edges:
            graph[u].append(v); graph[v].append(u)
        cnt = [1] * n
        ans = [0] * n
        def dfs1(node, par):
            for child in graph[node]:
                if child == par: continue
                dfs1(child, node)
                cnt[node] += cnt[child]
                ans[node] += ans[child] + cnt[child]
        def dfs2(node, par):
            for child in graph[node]:
                if child == par: continue
                ans[child] = ans[node] - cnt[child] + (n - cnt[child])
                dfs2(child, node)
        dfs1(0, -1)
        dfs2(0, -1)
        return ans
```

### Java
```java
class Solution {
    private List<List<Integer>> graph;
    private int[] cnt, ans;
    private int n;
    public int[] sumOfDistancesInTree(int n, int[][] edges) {
        this.n = n;
        graph = new ArrayList<>();
        cnt = new int[n]; ans = new int[n];
        Arrays.fill(cnt, 1);
        for (int i = 0; i < n; i++) graph.add(new ArrayList<>());
        for (int[] e : edges) {
            graph.get(e[0]).add(e[1]);
            graph.get(e[1]).add(e[0]);
        }
        dfs1(0, -1);
        dfs2(0, -1);
        return ans;
    }
    private void dfs1(int node, int par) {
        for (int child : graph.get(node)) {
            if (child == par) continue;
            dfs1(child, node);
            cnt[node] += cnt[child];
            ans[node] += ans[child] + cnt[child];
        }
    }
    private void dfs2(int node, int par) {
        for (int child : graph.get(node)) {
            if (child == par) continue;
            ans[child] = ans[node] - cnt[child] + (n - cnt[child]);
            dfs2(child, node);
        }
    }
}
```

**Complexity:** undefined
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Sum of distances for ALL nodes"** → reroot — not n BFS calls.
- **"Pass 1"** → cnt + ans rooted at 0.
- **"Pass 2 formula"** → `- cnt[child] + (n - cnt[child])`.
- **"Undirected graph"** → add both edge directions.

If you BFS'd from every node, replace with two-pass reroot — same answers, O(n).

> 🎯 **Pattern Unlocked:** Re-rooting — Pass 1 subtree sizes, Pass 2 reroot formula.

---

*One quest down. Next: N-ary diameter with letter state. →*
