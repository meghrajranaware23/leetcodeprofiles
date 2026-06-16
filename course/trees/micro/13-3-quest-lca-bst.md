<!-- hand-authored -->
# ⚔ Quest: LCA of BST

> **Day 13** · [Lowest Common Ancestor of a Binary Search Tree #235](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/) · Medium · 15 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Lowest Common Ancestor of a Binary Search Tree on LeetCode](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. At each node, check: are **both** p and q smaller? Both larger? Otherwise stop. The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Lowest Common Ancestor of a Binary Search Tree #235](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? **BST LCA walk** — descend while both targets share the same side; stop when they straddle current value.

If you're stuck after 5 minutes: no recursion required. While loop: both < root → left; both > root → right; else → return root.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** BST LCA Walk

**How to identify this from the problem statement:**
- "LCA" + **BST** → ordering gives O(h) walk
- Both p and q in tree, values unique (standard BST)
- Current node is LCA when p and q fall on **different sides** (or one is current)

| Keyword / phrase | What it signals |
|---|---|
| "LCA of BST" | Range/straddle walk — not post-order |
| "all nodes unique" | Clean comparisons with `<` / `>` |
| "lowest" | First straddle on path from root |
| "binary search tree" | Day 11 ordering applies |

**Why this pattern works:** BST property guarantees LCA is the **deepest node whose value lies between p and q** (inclusive of equality cases). Walk toward that interval.

**How a strong solver thinks before coding:**
1. *"Compare p.val and q.val to root.val."*
2. *"Both smaller → entire LCA is in left subtree."*
3. *"Both larger → entire LCA is in right subtree."*
4. *"Otherwise → root separates them → return root."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **General LCA #236 on BST** | Works but O(n) — ignores ordering |
| **Find p path + find q path** | Two searches + compare — heavier |
| **Store ancestors of p in set** | Extra space — walk is O(1) space |
| **Inorder to find positions** | O(n) — walk is O(h) |

**The insight brute force misses:** When both targets sit in the **same** subtree, LCA can't be current node — keep walking. When they **straddle**, stop immediately.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [LCA Binary Tree #236](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/) | No ordering — split detection | Same LCA definition |
| [Search in BST #700](https://leetcode.com/problems/search-in-a-binary-search-tree/) | One target | Single-side walk |
| [Insert into BST #701](https://leetcode.com/problems/insert-into-a-binary-search-tree/) | Walk until null | Same compare logic |

Same skeleton: compare values, pick one direction or stop.

---

## 📖 Walkthrough

**LCA(2, 8) on BST from concept page:**

```
        6
       / \
      2   8
     / \ / \
    0  4 7  9

Step 1 — [6]: p=2 < 6, q=8 > 6 → straddle → return 6 ✓

One comparison. No post-order.

LCA(3, 5):
  [6] both left → [2] both right → [4]: 3<4, 5>4 → straddle → return 4 ✓
```

> 💡 **The insight:** BST LCA is a **targeted search** for the straddle point — Day 11 search logic with two targets.

---

## Solution

### C++
```cpp
class Solution {
public:
    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
        while (root) {
            if (p->val < root->val && q->val < root->val) root = root->left;
            else if (p->val > root->val && q->val > root->val) root = root->right;
            else return root;
        }
        return nullptr;
    }
};
```

### Python
```python
class Solution:
    def lowestCommonAncestor(self, root: TreeNode, p: TreeNode, q: TreeNode) -> TreeNode:
        while root:
            if p.val < root.val and q.val < root.val:
                root = root.left
            elif p.val > root.val and q.val > root.val:
                root = root.right
            else:
                return root
        return None
```

### Java
```java
class Solution {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        while (root != null) {
            if (p.val < root.val && q.val < root.val)      root = root.left;
            else if (p.val > root.val && q.val > root.val) root = root.right;
            else return root;
        }
        return null;
    }
}
```

**Complexity:** undefined
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"LCA + BST"** → range walk, not #236 post-order.
- **"Both on same side"** → keep descending.
- **"Straddle"** → current node is deepest common ancestor.
- **"O(1) space"** → iterative while loop suffices.

If you reused #236 recursively, it works — but name the BST shortcut for interviews.

> 🎯 **Pattern Unlocked:** BST LCA Walk — straddle detection in O(h).

---

*Both quests complete. Head to the checkpoint. →*
