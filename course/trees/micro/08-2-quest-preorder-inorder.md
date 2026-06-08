# ⚔ Quest: Construct from Preorder & Inorder

> **Day 8** · [Construct Binary Tree from Preorder and Inorder Traversal #105](https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/) · Medium · 15 min · 20 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Construct Binary Tree from Preorder and Inorder Traversal on LeetCode](https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. Draw the tree. Trace the recursion. The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Construct Binary Tree from Preorder and Inorder Traversal #105](https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? Think about **Divide and Conquer Construction**.

If you're stuck after 5 minutes: revisit the concept page's visual walkthrough. Trace the tree by hand before looking at the solution structure.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Divide and Conquer Construction

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

Apply Divide and Conquer Construction step by step on this tree.
Draw it. Mark the current node at each step.
Watch what gets returned from leaves back to root.
```

> 💡 **The insight:** The code is just the paper trace written in syntax. If you can trace it by hand, you can code it.

---

## Solution

### C++
```cpp
class Solution {
    unordered_map<int, int> idx;
    TreeNode* build(vector<int>& pre, int ps, int pe, vector<int>& in, int is, int ie) {
        if (ps > pe) return nullptr;
        TreeNode* root = new TreeNode(pre[ps]);
        int k = idx[pre[ps]], leftSize = k - is;
        root->left = build(pre, ps + 1, ps + leftSize, in, is, k - 1);
        root->right = build(pre, ps + leftSize + 1, pe, in, k + 1, ie);
        return root;
    }
public:
    TreeNode* buildTree(vector<int>& preorder, vector<int>& inorder) {
        for (int i = 0; i < (int)inorder.size(); ++i) idx[inorder[i]] = i;
        return build(preorder, 0, (int)preorder.size() - 1, inorder, 0, (int)inorder.size() - 1);
    }
};
```

### Python
```python
class Solution:
    def buildTree(self, preorder: List[int], inorder: List[int]) -> Optional[TreeNode]:
        idx = {v: i for i, v in enumerate(inorder)}
        def build(ps, pe, is_, ie):
            if ps > pe:
                return None
            root = TreeNode(preorder[ps])
            k = idx[preorder[ps]]
            left = k - is_
            root.left = build(ps + 1, ps + left, is_, k - 1)
            root.right = build(ps + left + 1, pe, k + 1, ie)
            return root
        return build(0, len(preorder) - 1, 0, len(inorder) - 1)
```

### Java
```java
class Solution {
    Map<Integer, Integer> idx = new HashMap<>();
    public TreeNode buildTree(int[] preorder, int[] inorder) {
        for (int i = 0; i < inorder.length; i++) idx.put(inorder[i], i);
        return build(preorder, 0, preorder.length - 1, inorder, 0, inorder.length - 1);
    }
    TreeNode build(int[] pre, int ps, int pe, int[] in, int is, int ie) {
        if (ps > pe) return null;
        TreeNode root = new TreeNode(pre[ps]);
        int k = idx.get(pre[ps]), left = k - is;
        root.left = build(pre, ps + 1, ps + left, in, is, k - 1);
        root.right = build(pre, ps + left + 1, pe, in, k + 1, ie);
        return root;
    }
}
```

**Complexity:** O(n) time · O(n) space

---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"This is a tree problem"** → Draw it. Don't start coding blind.
- **"Divide and Conquer Construction"** → Name the pattern from the concept page.
- **"What do my children return?"** → Define the return value first.
- **"Null is my base case"** → Every recursive tree function starts here.

If you tried BFS when DFS was cleaner (or vice versa), that's fine — the breakthrough is **naming the pattern family**, not memorizing one solution.

> 🎯 **Pattern Unlocked:** Divide and Conquer Construction

---

*One quest down. The next one builds on this pattern. →*
