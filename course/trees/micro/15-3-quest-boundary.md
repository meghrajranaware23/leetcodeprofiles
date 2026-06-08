# ⚔ Quest: Boundary of Binary Tree

> **Day 15** · [Boundary of Binary Tree #545](https://leetcode.com/problems/boundary-of-binary-tree/) · Medium · 15 min · 20 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Boundary of Binary Tree on LeetCode](https://leetcode.com/problems/boundary-of-binary-tree/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. Draw the tree. Trace the recursion. The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Boundary of Binary Tree #545](https://leetcode.com/problems/boundary-of-binary-tree/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? Think about **Boundary DFS**.

If you're stuck after 5 minutes: revisit the concept page's visual walkthrough. Trace the tree by hand before looking at the solution structure.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Boundary DFS

**How to identify this from the problem statement:**
- Look for tree structure keywords — "binary tree", "root", "subtree", "node"
- Ask: does information flow **down** (carry state) or **up** (combine child results)?
- Check if you need to compare two trees or build a new one

| Keyword / phrase | What it signals |
|---|---|
| "maximum depth" / "height" | Bottom-up: return 1 + max(children) |
| "path sum" / "root to leaf" | Top-down: carry running sum |
| "same tree" / "symmetric" | Parallel recursion on two trees |
| "level order" / "each level" | BFS with queue |
| "construct from traversals" | Divide and conquer with traversal split |
| "validate BST" | Range checking during DFS |

**Why this pattern works:** Trees are recursive structures. Each subtree is a smaller instance of the same problem. The pattern names which direction information flows.

**How a strong solver thinks before coding:**
1. *"What does my function return? What do my children return?"*
2. *"What's the base case? (usually null)"*
3. *"Draw a 3-node tree and trace by hand."*
4. *"One pass or do I need a global variable?"*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Store all paths/nodes** | O(n²) space when O(h) recursion suffices |
| **BFS for depth/height** | DFS bottom-up is simpler and O(h) space |
| **Iterating without recursion** | Loses natural subtree decomposition |
| **Nested loops on nodes** | O(n²) when O(n) single-pass recursion works |

**The insight brute force misses:** Trust the recursion. You don't need to track everything — just combine what your children return.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| Related tree problems | Different combine logic | Same recursive skeleton |
| Same traversal order | Different processing per node | Same visit sequence |
| Variant constraints | Extra state or early termination | Same flow direction |

If you recognized this problem's pattern, you already have the skeleton for today's practice queue.

---

## 📖 Walkthrough

Trace the pattern on a small tree before reading the code:

```
        3
       / \
      9    20
          /  \
         15   7

Apply Boundary DFS step by step on this tree.
Draw it. Mark the current node at each step.
Watch what gets returned from leaves back to root.
```

> 💡 **The insight:** The code is just the paper trace written in syntax. If you can trace it by hand, you can code it.

---

## Solution

### C++
```cpp
class Solution {
    void addLeftBoundary(TreeNode* node, vector<int>& res) {
        while (node) {
            if (node->left || node->right) res.push_back(node->val);
            node = node->left ? node->left : node->right;
        }
    }
    void addLeaves(TreeNode* node, vector<int>& res) {
        if (!node) return;
        if (!node->left && !node->right) { res.push_back(node->val); return; }
        addLeaves(node->left, res);
        addLeaves(node->right, res);
    }
    void addRightBoundary(TreeNode* node, vector<int>& res) {
        vector<int> tmp;
        while (node) {
            if (node->left || node->right) tmp.push_back(node->val);
            node = node->right ? node->right : node->left;
        }
        res.insert(res.end(), tmp.rbegin(), tmp.rend());
    }
public:
    vector<int> boundaryOfBinaryTree(TreeNode* root) {
        if (!root) return {};
        vector<int> res = {root->val};
        addLeftBoundary(root->left, res);
        addLeaves(root->left, res);
        addLeaves(root->right, res);
        addRightBoundary(root->right, res);
        return res;
    }
};
```

### Python
```python
class Solution:
    def boundaryOfBinaryTree(self, root: Optional[TreeNode]) -> List[int]:
        if not root:
            return []
        def leaves(node):
            if not node:
                return []
            if not node.left and not node.right:
                return [node.val]
            return leaves(node.left) + leaves(node.right)
        def left_boundary(node):
            res = []
            while node:
                if node.left or node.right:
                    res.append(node.val)
                node = node.left or node.right
            return res
        def right_boundary(node):
            res = []
            while node:
                if node.left or node.right:
                    res.append(node.val)
                node = node.right or node.left
            return res[::-1]
        return [root.val] + left_boundary(root.left) + leaves(root.left) + leaves(root.right) + right_boundary(root.right)
```

### Java
```java
class Solution {
    public List<Integer> boundaryOfBinaryTree(TreeNode root) {
        if (root == null) return new ArrayList<>();
        List<Integer> res = new ArrayList<>();
        res.add(root.val);
        addLeft(root.left, res);
        addLeaves(root.left, res);
        addLeaves(root.right, res);
        addRight(root.right, res);
        return res;
    }
    void addLeft(TreeNode node, List<Integer> res) {
        while (node != null) {
            if (node.left != null || node.right != null) res.add(node.val);
            node = node.left != null ? node.left : node.right;
        }
    }
    void addLeaves(TreeNode node, List<Integer> res) {
        if (node == null) return;
        if (node.left == null && node.right == null) { res.add(node.val); return; }
        addLeaves(node.left, res);
        addLeaves(node.right, res);
    }
    void addRight(TreeNode node, List<Integer> res) {
        List<Integer> tmp = new ArrayList<>();
        while (node != null) {
            if (node.left != null || node.right != null) tmp.add(node.val);
            node = node.right != null ? node.right : node.left;
        }
        Collections.reverse(tmp);
        res.addAll(tmp);
    }
}
```

**Complexity:** O(n) time · O(h) space

---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"This is a tree problem"** → Draw it. Don't start coding blind.
- **"Boundary DFS"** → Name the pattern from the concept page.
- **"What do my children return?"** → Define the return value first.
- **"Null is my base case"** → Every recursive tree function starts here.

If you tried BFS when DFS was cleaner (or vice versa), that's fine — the breakthrough is **naming the pattern family**, not memorizing one solution.

> 🎯 **Pattern Unlocked:** Boundary DFS

---

*Both quests complete. Head to the checkpoint. →*
