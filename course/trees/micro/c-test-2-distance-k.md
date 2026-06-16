<!-- hand-authored -->
# ⚔ C-Rank Test — Problem 2

> [All Nodes Distance K in Binary Tree #863](https://leetcode.com/problems/all-nodes-distance-k-in-binary-tree/) · Medium · 150 XP

---

You've completed your C-Rank training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open All Nodes Distance K in Binary Tree on LeetCode](https://leetcode.com/problems/all-nodes-distance-k-in-binary-tree/)**

> ⚔ **Hunter's rule:** This is a rank test — treat it like real interview practice. Trees don't have backward edges — build a parent map first, then BFS. No peeking until you've genuinely tried.

---

## The Problem

See the full problem statement on LeetCode: **[All Nodes Distance K in Binary Tree #863](https://leetcode.com/problems/all-nodes-distance-k-in-binary-tree/)**

---

## 💡 Hints

> 🎯 **What's being tested:** **Graph view of tree** — add parent pointers, BFS from target with distance.

- Step 1: DFS/BFS from root to fill `parent[node] = par`.
- Step 2: BFS from **target** treating neighbors as `{left, right, parent}`.
- Track `seen` — avoid bouncing back.
- When `dist == k`, collect values (don't expand further from those nodes — or continue with dist check).
- Combines Day 13 ancestor thinking with BFS — not pure LCA.

**Pattern name before coding:** *Parent map + undirected BFS from target.*

---

## 🔍 Pattern Recognition Breakdown

**How to identify from the statement:**
- "Distance K" from **target node** (not root) → may need to go **up** to parent
- Binary tree edges are one-way downward — temporarily add upward edges via map
- Return all values at exactly distance k

**How a strong solver thinks before coding:**
1. *"Build parent map in one DFS."*
2. *"BFS queue (node, dist) from target."*
3. *"Neighbors = left, right, parent — skip seen."*
4. *"dist == k → collect val."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **DFS from root only downward** | Can't reach nodes above target |
| **Find root-to-target path, then fan out** | Heavy path logic — parent BFS simpler |
| **LCA-based without parent map** | Possible but parent+BFS is cleaner |
| **No seen set** | Infinite ping-pong between parent and child |

---

## 🎯 Transfer to Unseen Problems

Same **tree-as-graph** idea appears in graph-hybrid days (later ranks). Parent map converts a tree into an undirected graph for multi-direction search. Related: [Lowest Common Ancestor #236](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/) with parent pointers uses similar upward walks.

---

<details>
<summary><strong>📖 Solution & Walkthrough</strong></summary>

Trace the pattern on the example tree from the problem statement. Then implement the recursive skeleton you identified.

### C++
```cpp
class Solution {
    unordered_map<TreeNode*, TreeNode*> par;
    void build(TreeNode* node, TreeNode* parent) {
        if (!node) return;
        par[node] = parent;
        build(node->left, node);
        build(node->right, node);
    }
public:
    vector<int> distanceK(TreeNode* root, TreeNode* target, int k) {
        build(root, nullptr);
        vector<int> res;
        unordered_set<TreeNode*> seen;
        queue<pair<TreeNode*, int>> q;
        q.push({target, 0});
        seen.insert(target);
        while (!q.empty()) {
            auto [node, d] = q.front(); q.pop();
            if (d == k) { res.push_back(node->val); continue; }
            vector<TreeNode*> nei = {node->left, node->right};
            if (par.count(node)) nei.push_back(par[node]);
            for (TreeNode* n : nei)
                if (n && !seen.count(n)) { seen.insert(n); q.push({n, d + 1}); }
        }
        return res;
    }
};
```

### Python
```python
class Solution:
    def distanceK(self, root: TreeNode, target: TreeNode, k: int) -> List[int]:
        g = {}
        def build(node, par=None):
            if not node:
                return
            g[node] = [par]
            build(node.left, node)
            build(node.right, node)
        build(root)
        for node in list(g):
            for ch in (node.left, node.right):
                if ch:
                    g[node].append(ch)
        res = []
        seen = {target}
        q = deque([(target, 0)])
        while q:
            node, d = q.popleft()
            if d == k:
                res.append(node.val)
                continue
            if d > k:
                continue
            for nei in g[node]:
                if nei and nei not in seen:
                    seen.add(nei)
                    q.append((nei, d + 1))
        return res
```

### Java
```java
class Solution {
    Map<TreeNode, TreeNode> parent = new HashMap<>();
    public List<Integer> distanceK(TreeNode root, TreeNode target, int k) {
        build(root, null);
        List<Integer> res = new ArrayList<>();
        Set<TreeNode> seen = new HashSet<>();
        Deque<TreeNode> q = new ArrayDeque<>();
        q.offer(target); seen.add(target);
        int dist = 0;
        while (!q.isEmpty()) {
            int sz = q.size();
            if (dist == k) {
                for (TreeNode n : q) res.add(n.val);
                return res;
            }
            for (int i = 0; i < sz; i++) {
                TreeNode node = q.poll();
                if (node.left != null && seen.add(node.left)) q.offer(node.left);
                if (node.right != null && seen.add(node.right)) q.offer(node.right);
                TreeNode p = parent.get(node);
                if (p != null && seen.add(p)) q.offer(p);
            }
            dist++;
        }
        return res;
    }
    void build(TreeNode node, TreeNode par) {
        if (node == null) return;
        parent.put(node, par);
        build(node.left, node);
        build(node.right, node);
    }
}
```

**Complexity:** O(n) time · O(n) space

</details>

---

## 💭 What Should Have Clicked in Your Mind?

- **"Distance from target, not root"** → need upward movement — parent map.
- **"BFS on graph"** → three neighbors per node after map built.
- **"seen set mandatory"** → prevent parent↔child loops.
- **"Not Day 13 LCA"** → different goal — radius collection, not split node.

---

*2 of 3 test problems. Continue to the next. →*

## Solution

### C++
```cpp
class Solution {
    unordered_map<int, vector<int>> graph;
    void buildGraph(TreeNode* node, int par) {
        if (!node) return;
        if (par != -1) {
            graph[node->val].push_back(par);
            graph[par].push_back(node->val);
        }
        buildGraph(node->left,  node->val);
        buildGraph(node->right, node->val);
    }
public:
    vector<int> distanceK(TreeNode* root, TreeNode* target, int k) {
        buildGraph(root, -1);
        unordered_set<int> visited;
        queue<int> q;
        q.push(target->val); visited.insert(target->val);
        for (int dist = 0; !q.empty(); dist++) {
            if (dist == k) {
                vector<int> res;
                while (!q.empty()) { res.push_back(q.front()); q.pop(); }
                return res;
            }
            for (int sz = q.size(); sz > 0; sz--) {
                int curr = q.front(); q.pop();
                for (int nb : graph[curr]) {
                    if (!visited.count(nb)) { visited.insert(nb); q.push(nb); }
                }
            }
        }
        return {};
    }
};
```

### Python
```python
from collections import defaultdict, deque
class Solution:
    def distanceK(self, root: TreeNode, target: TreeNode, k: int) -> List[int]:
        graph = defaultdict(list)
        def build(node, par):
            if not node: return
            if par is not None:
                graph[node.val].append(par.val)
                graph[par.val].append(node.val)
            build(node.left, node); build(node.right, node)
        build(root, None)
        visited, q = {target.val}, deque([target.val])
        dist = 0
        while q:
            if dist == k: return list(q)
            for _ in range(len(q)):
                curr = q.popleft()
                for nb in graph[curr]:
                    if nb not in visited:
                        visited.add(nb); q.append(nb)
            dist += 1
        return []
```

### Java
```java
class Solution {
    private Map<Integer, List<Integer>> graph = new HashMap<>();
    public List<Integer> distanceK(TreeNode root, TreeNode target, int k) {
        buildGraph(root, -1);
        Set<Integer> visited = new HashSet<>();
        Queue<Integer> q = new LinkedList<>();
        q.offer(target.val); visited.add(target.val);
        int dist = 0;
        while (!q.isEmpty()) {
            if (dist == k) return new ArrayList<>(q);
            for (int sz = q.size(); sz > 0; sz--) {
                int curr = q.poll();
                for (int nb : graph.getOrDefault(curr, new ArrayList<>())) {
                    if (!visited.contains(nb)) { visited.add(nb); q.offer(nb); }
                }
            }
            dist++;
        }
        return new ArrayList<>();
    }
    private void buildGraph(TreeNode node, int par) {
        if (node == null) return;
        if (par != -1) {
            graph.computeIfAbsent(node.val, k -> new ArrayList<>()).add(par);
            graph.computeIfAbsent(par, k -> new ArrayList<>()).add(node.val);
        }
        buildGraph(node.left, node.val); buildGraph(node.right, node.val);
    }
}
```

**Complexity:** undefined
