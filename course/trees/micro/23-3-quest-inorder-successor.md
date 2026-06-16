<!-- hand-authored -->
# ⚔ Quest: Inorder Successor in BST

> **Day 23** · [Inorder Successor in BST #285](https://leetcode.com/problems/inorder-successor-in-bst/) · Medium · 15 min · 40 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Inorder Successor in BST on LeetCode](https://leetcode.com/problems/inorder-successor-in-bst/)**

> ⚔ **Hunter's rule:** Split into two cases before coding — does `p` have a right subtree? If not, which ancestor is the answer? Trace both on paper. Hints are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Inorder Successor in BST #285](https://leetcode.com/problems/inorder-successor-in-bst/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? **Successor case split** — Case A: leftmost of right subtree. Case B: lowest ancestor where `p` is in the left subtree.

The iterative one-pass walk unifies Case B: when `p.val < root.val`, record `root` as candidate and go left; else go right.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Inorder Successor — Case Split

**How to identify this from the problem statement:**
- "Successor" + BST → next node in inorder sequence after `p`
- `p` exists in tree — guaranteed answer (unless `p` is max, then null)
- O(h) expected — no full inorder

| Keyword / phrase | What it signals |
|---|---|
| "inorder successor" | Next larger in sorted order |
| "node p" given as reference | May not pass root separately in follow-ups |
| "BST" | Structure guides O(h) walk |
| "predecessor" (variant) | Mirror: rightmost of left OR ancestor from right walk |

**Why this pattern works:** Inorder = sorted order. Successor is either the smallest value **above** `p` in the right subtree, or the first ancestor **above** `p` when you last turned left during search.

**How a strong solver thinks before coding:**
1. *"Does p have right child? → leftmost(right)."*
2. *"No right? → walk from root: if p < node, res=node, left; else right."*
3. *"res holds lowest ancestor with p in left subtree."*
4. *"Connects to Day 12 delete Case 2 successor."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Full inorder, find p, return next** | O(n) time — O(h) walk exists |
| **Store inorder array** | O(n) space |
| **Always go to parent pointer** | Problem may not give parent — root walk works |
| **Case A logic when no right child** | Returns wrong node — need Case B |

**The insight brute force misses:** The search path **to** `p` already encodes the successor when `p` has no right subtree — just track the last node where you went left.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Inorder Successor in BST II #510](https://leetcode.com/problems/inorder-successor-in-bst-ii/) | Parent pointers given | Walk up instead of root walk |
| [Delete Node in BST #450](https://leetcode.com/problems/delete-node-in-a-bst/) | Day 12 — uses successor value | Same leftmost-of-right |
| [Binary Search Tree Iterator #173](https://leetcode.com/problems/binary-search-tree-iterator/) | Stream all successors | Stack inorder |

Same skeleton: inorder order = BST navigation.

---

## 📖 Walkthrough

**Tree: `[15,6,18,3,7,17,20]`, p = 6 (has right subtree 7)**

```
Case A: leftmost of right subtree
  Start at 7 → no left → successor = 7 ✓
  Inorder: 3,6,7,... → 7 follows 6
```

**Same tree, p = 7 (no right child)**

```
Case B: unified walk from root
  15: 7<15 → res=15, left
   6: 7>6  → right
   7: 7==7 → right (not less)
  return res=15? 

  Inorder: ...,6,7,15,... → successor of 7 is 15 ✓
```

> 💡 **The insight:** Case B = "where would I insert p+1?" — last node that routed left because p was smaller.

---

## Solution

### C++
```cpp
class Solution {
public:
    TreeNode* inorderSuccessor(TreeNode* root, TreeNode* p) {
        TreeNode* res = nullptr;
        while (root) {
            if (p->val < root->val) { res = root; root = root->left; }
            else root = root->right;
        }
        return res;
    }
};
```

### Python
```python
class Solution:
    def inorderSuccessor(self, root: TreeNode, p: TreeNode) -> Optional[TreeNode]:
        res = None
        while root:
            if p.val < root.val:
                res  = root
                root = root.left
            else:
                root = root.right
        return res
```

### Java
```java
class Solution {
    public TreeNode inorderSuccessor(TreeNode root, TreeNode p) {
        TreeNode res = null;
        while (root != null) {
            if (p.val < root.val) { res = root; root = root.left; }
            else root = root.right;
        }
        return res;
    }
}
```

**Complexity:** undefined
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Successor"** → Case A (right subtree min) or Case B (ancestor).
- **"Unified loop"** → `p < root` means root could be successor — save and go left.
- **"Day 12 delete"** → successor = same leftmost-of-right for two-child delete.
- **"Not full inorder"** → O(h) root walk.

If you only handled Case A, add Case B via the search-path `res` trick.

> 🎯 **Pattern Unlocked:** Inorder successor — case split collapsed into one downward walk.

---

*Both quests complete. Head to the checkpoint. →*
