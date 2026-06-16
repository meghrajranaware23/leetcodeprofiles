<!-- hand-authored -->
# ⚔ Quest: Boundary of Binary Tree

> **Day 15** · [Boundary of Binary Tree #545](https://leetcode.com/problems/boundary-of-binary-tree/) · Medium · 15 min · 20 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Boundary of Binary Tree on LeetCode](https://leetcode.com/problems/boundary-of-binary-tree/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. Trace three passes separately: left edge, leaves, right edge (reversed). The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Boundary of Binary Tree #545](https://leetcode.com/problems/boundary-of-binary-tree/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? **Boundary three-pass** — `[root] + leftEdge + leaves + reverse(rightEdge)`.

If you're stuck after 5 minutes: left/right edge passes record nodes **with at least one child** only — pure leaves belong in the middle pass.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Boundary DFS

**How to identify this from the problem statement:**
- "Boundary" / "anti-clockwise" perimeter
- Three components: left side, leaves, right side (bottom-up)
- Root counted once at start

| Keyword / phrase | What it signals |
|---|---|
| "boundary of binary tree" | Three-pass perimeter |
| "counterclockwise" | Left down → leaves LR → right up |
| "left boundary nodes" | Prefer left, skip leaves |
| "right boundary bottom-up" | Prefer right, reverse collection |

**Why this pattern works:** Perimeter decomposes into disjoint segments — no single traversal captures "outer shell" without double-counting internals.

**How a strong solver thinks before coding:**
1. *"res = [root.val]."*
2. *"Left edge: while node, if has child record; go left else right."*
3. *"Leaves: standard leaf DFS left-to-right (both subtrees)."*
4. *"Right edge: same as left but prefer right; reverse before append."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Single DFS around outside** | Hard to define "outside" without three phases |
| **Include all left-path nodes** | Leaves on left spine double-count |
| **Right edge top-to-bottom order** | Wrong — boundary goes up on right side |
| **Preorder everything** | Picks up internal nodes not on perimeter |

**The insight brute force misses:** Edge passes and leaf pass have **different inclusion rules** — edges skip leaves; leaf pass gets all leaves.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Vertical Order #987](https://leetcode.com/problems/vertical-order-traversal-of-a-binary-tree/) | Today's other quest | Coordinate tagging |
| [Right Side View #199](https://leetcode.com/problems/binary-tree-right-side-view/) | One node per level | Different "view" concept |
| [Leaf order traversal variants](https://leetcode.com/) | Leaves only | Subroutine of boundary pass |

Same decomposition mindset — break geometry into named passes.

---

## 📖 Walkthrough

**Tree from concept page:**

```
        1
       / \
      2   3
     / \   \
    4   5   6

Pass 1 — left edge: 1, 2 (4 is leaf → skip)
Pass 2 — leaves: 4, 5, 6
Pass 3 — right edge from 3: record 3, reverse → 3

Boundary: [1, 2, 4, 5, 6, 3] ✓
```

> 💡 **The insight:** `node.left or node.right` guard on edge passes — leaves wait for the dedicated leaf sweep.

---

## Solution

### C++
```cpp
class Solution {
    bool isLeaf(TreeNode* n) { return !n->left && !n->right; }
    void addLeft(TreeNode* node, vector<int>& res) {
        while (node) {
            if (!isLeaf(node)) res.push_back(node->val);
            node = node->left ? node->left : node->right;
        }
    }
    void addLeaves(TreeNode* node, vector<int>& res) {
        if (!node) return;
        if (isLeaf(node)) { res.push_back(node->val); return; }
        addLeaves(node->left, res);
        addLeaves(node->right, res);
    }
    void addRight(TreeNode* node, vector<int>& res) {
        vector<int> tmp;
        while (node) {
            if (!isLeaf(node)) tmp.push_back(node->val);
            node = node->right ? node->right : node->left;
        }
        for (int i = tmp.size()-1; i >= 0; i--) res.push_back(tmp[i]);
    }
public:
    vector<int> boundaryOfBinaryTree(TreeNode* root) {
        if (!root) return {};
        vector<int> res;
        if (!isLeaf(root)) res.push_back(root->val);
        addLeft(root->left, res);
        addLeaves(root, res);
        addRight(root->right, res);
        return res;
    }
};
```

### Python
```python
class Solution:
    def boundaryOfBinaryTree(self, root: Optional[TreeNode]) -> List[int]:
        if not root: return []
        def is_leaf(n): return not n.left and not n.right
        def add_left(node):
            while node:
                if not is_leaf(node): res.append(node.val)
                node = node.left if node.left else node.right
        def add_leaves(node):
            if not node: return
            if is_leaf(node): res.append(node.val); return
            add_leaves(node.left); add_leaves(node.right)
        def add_right(node):
            tmp = []
            while node:
                if not is_leaf(node): tmp.append(node.val)
                node = node.right if node.right else node.left
            res.extend(reversed(tmp))
        res = []
        if not is_leaf(root): res.append(root.val)
        add_left(root.left)
        add_leaves(root)
        add_right(root.right)
        return res
```

### Java
```java
class Solution {
    public List<Integer> boundaryOfBinaryTree(TreeNode root) {
        List<Integer> res = new ArrayList<>();
        if (root == null) return res;
        if (!isLeaf(root)) res.add(root.val);
        addLeft(root.left, res);
        addLeaves(root, res);
        addRight(root.right, res);
        return res;
    }
    private boolean isLeaf(TreeNode n) { return n.left == null && n.right == null; }
    private void addLeft(TreeNode node, List<Integer> res) {
        while (node != null) {
            if (!isLeaf(node)) res.add(node.val);
            node = node.left != null ? node.left : node.right;
        }
    }
    private void addLeaves(TreeNode node, List<Integer> res) {
        if (node == null) return;
        if (isLeaf(node)) { res.add(node.val); return; }
        addLeaves(node.left, res); addLeaves(node.right, res);
    }
    private void addRight(TreeNode node, List<Integer> res) {
        Deque<Integer> tmp = new ArrayDeque<>();
        while (node != null) {
            if (!isLeaf(node)) tmp.push(node.val);
            node = node.right != null ? node.right : node.left;
        }
        while (!tmp.isEmpty()) res.add(tmp.pop());
    }
}
```

**Complexity:** undefined
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Boundary"** → three passes, not one DFS.
- **"Left edge prefer left"** → if no left, slide to right (stay on perimeter).
- **"Skip leaves in edge passes"** → `has child` check.
- **"Right edge reversed"** → bottom-up on the right side.

If duplicates appeared, check whether leaves were recorded in edge passes too.

> 🎯 **Pattern Unlocked:** Boundary DFS — left edge + leaves + reversed right edge.

---

*Both quests complete. Head to the checkpoint. →*
