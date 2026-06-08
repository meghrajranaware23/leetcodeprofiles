# ⚔ C-Rank Test — Problem 2

> [All Nodes Distance K in Binary Tree #863](https://leetcode.com/problems/all-nodes-distance-k-in-binary-tree/) · Medium · 150 XP

---

You've completed your C-Rank training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open All Nodes Distance K in Binary Tree on LeetCode](https://leetcode.com/problems/all-nodes-distance-k-in-binary-tree/)**

> ⚔ **Hunter's rule:** This is a rank test — treat it like real interview practice. Draw the tree. Trace the recursion. No peeking until you've genuinely tried.

---

## The Problem

See the full problem statement on LeetCode: **[All Nodes Distance K in Binary Tree #863](https://leetcode.com/problems/all-nodes-distance-k-in-binary-tree/)**

---

## 💡 Hints

> 🎯 **What's being tested:** Pattern recognition from the C-Rank curriculum. Name the pattern before you code.

Revisit your rank's cheat sheet. Which traversal direction does this problem need?

---

## 🔍 Pattern Recognition Breakdown

**How to identify from the statement:**
- Read for tree structure clues
- Determine information flow direction
- Name the pattern family before opening your editor

**How a strong solver thinks before coding:**
1. *"Draw the example tree."*
2. *"What does my function return?"*
3. *"Top-down, bottom-up, BFS, or parallel?"*
4. *"What's the base case?"*

---

## ❌ Why Brute Force Fails

Tree problems have natural O(n) recursive solutions. Brute force typically means redundant traversal or storing unnecessary state. Trust the subtree structure.

---

## 🎯 Transfer to Unseen Problems

Can you spot the pattern without the problem name telling you?

Read the statement once. Say the pattern aloud. If you can name it in under 30 seconds, you're ready.

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

- **"This is a C-Rank test"** → Use patterns from this rank's training.
- **"Draw first, code second"** → Visual tracing beats guessing.
- **"Name the pattern"** → The code is just the template filled in.

---

*2 of 3 test problems. Continue to the next. →*
