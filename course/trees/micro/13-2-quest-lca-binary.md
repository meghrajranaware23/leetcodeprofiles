<!-- hand-authored -->
# ⚔ Quest: LCA of Binary Tree

> **Day 13** · [Lowest Common Ancestor of a Binary Tree #236](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/) · Medium · 15 min · 20 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Lowest Common Ancestor of a Binary Tree on LeetCode](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. For each node, ask: "Does left subtree contain p or q? Right subtree?" Mark the split node. The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Lowest Common Ancestor of a Binary Tree #236](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? **LCA split detection** — post-order; if both children return non-null, current node is the LCA.

If you're stuck after 5 minutes: base case — null returns null; if current is p or q, return current immediately. Otherwise bubble `l || r`.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** LCA Split Detection

**How to identify this from the problem statement:**
- "Lowest common ancestor" on **binary tree** (not BST) → no ordering shortcut
- Both nodes guaranteed to exist
- Return type is `TreeNode*` — the split node or the anchor (p/q) bubbled up

| Keyword / phrase | What it signals |
|---|---|
| "lowest common ancestor" | Deepest node covering both |
| "binary tree" (not BST) | Post-order split detection |
| "both p and q exist" | No missing-node handling |
| "lowest" | Deepest split — bubble preserves depth |

**Why this pattern works:** Each subtree answers "found p or q below?" Non-null return propagates upward. First node with **both** answers is the LCA.

**How a strong solver thinks before coding:**
1. *"If node is p or q → return node (anchor)."*
2. *"Recurse left and right."*
3. *"Both non-null → I'm the split → return me."*
4. *"One non-null → return it (LCA deeper in that subtree)."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Two root-to-node paths, compare** | Extra arrays; two passes |
| **Parent map from BFS, walk up from p** | Works but heavier than one dfs |
| **Find p, then search q stopping at p** | Fragile — misses general case |
| **Global variables for found nodes** | Unnecessary — return values carry signal |

**The insight brute force misses:** Post-order **is** the path comparison — split detection happens naturally when both subtrees report back.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [LCA of BST #235](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/) | Today's second quest — range walk | Same LCA goal, BST shortcut |
| [Smallest Subtree with All Deepest #865](https://leetcode.com/problems/smallest-subtree-with-all-the-deepest-nodes/) | All deepest leaves, not two nodes | Similar bubble-up logic |
| [Cousins in Binary Tree #993](https://leetcode.com/problems/cousins-in-binary-tree/) | D-Rank — depth + different parent | LCA at depth 2 for cousins |

Same skeleton: subtree reports bubble up; split node wins.

---

## 📖 Walkthrough

**LCA(5, 1) on tree from concept page:**

```
          3
         / \
        5   1
       / \
      6   2

dfs(6): null
dfs(2): null
dfs(5): node==p → return 5
dfs(1): node==q → return 1
dfs(3): l=5, r=1 → BOTH non-null → return 3 ✓

Split at 3 — first ancestor where paths to 5 and 1 diverge.
```

> 💡 **The insight:** `l && r` is the entire LCA test for general trees. One line, one post-order pass.

---

## Solution

### C++
```cpp
class Solution {
public:
    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
        if (!root || root == p || root == q) return root;
        TreeNode* left  = lowestCommonAncestor(root->left,  p, q);
        TreeNode* right = lowestCommonAncestor(root->right, p, q);
        if (left && right) return root;
        return left ? left : right;
    }
};
```

### Python
```python
class Solution:
    def lowestCommonAncestor(self, root: TreeNode, p: TreeNode, q: TreeNode) -> TreeNode:
        if not root or root is p or root is q:
            return root
        left  = self.lowestCommonAncestor(root.left,  p, q)
        right = self.lowestCommonAncestor(root.right, p, q)
        if left and right: return root
        return left or right
```

### Java
```java
class Solution {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        if (root == null || root == p || root == q) return root;
        TreeNode left  = lowestCommonAncestor(root.left,  p, q);
        TreeNode right = lowestCommonAncestor(root.right, p, q);
        if (left != null && right != null) return root;
        return left != null ? left : right;
    }
}
```

**Complexity:** undefined
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"LCA binary tree"** → split detection, not BST walk.
- **"Both sides non-null"** → current node is answer.
- **"I'm p or q"** → return self — partner may be in my subtree.
- **"One post-order pass"** → no path arrays.

If you built parent maps first, compare — split detection is the interview-preferred one-liner.

> 🎯 **Pattern Unlocked:** LCA Split Detection — `l && r` at the split node.

---

*One quest down. Next: BST LCA with the O(h) range walk. →*
