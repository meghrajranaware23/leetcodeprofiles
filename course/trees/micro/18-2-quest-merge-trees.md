<!-- hand-authored -->
# ⚔ Quest: Merge Two Binary Trees

> **Day 18** · [Merge Two Binary Trees #617](https://leetcode.com/problems/merge-two-binary-trees/) · Easy · 10 min · 25 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Merge Two Binary Trees on LeetCode](https://leetcode.com/problems/merge-two-binary-trees/)**

> ⚔ **Hunter's rule:** Draw two small trees side by side. Trace `(t1, t2)` pairs at each step. The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Merge Two Binary Trees #617](https://leetcode.com/problems/merge-two-binary-trees/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? **Parallel merge `(t1, t2)`** — if one root is null, return the other. Else add values, assign `t1.left = merge(t1.left, t2.left)`, same for right.

If you're stuck after 5 minutes: this is Day 5 parallel recursion with **construction** instead of comparison.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Parallel Construction

**How to identify this from the problem statement:**
- Two tree roots given
- Overlap → sum node values
- One-sided nodes preserved as-is

| Keyword / phrase | What it signals |
|---|---|
| "merge two trees" | Parallel `(a, b)` recursion |
| "sum values of overlapping nodes" | `a.val += b.val` |
| "if a node is null" | Return the other subtree |
| "return the merged tree" | Reuse t1 nodes in-place |

**Why this pattern works:** Each position in the overlay is independent — merge left pair and right pair recursively. Null acts as identity (other tree wins).

**How a strong solver thinks before coding:**
1. *"Both null? handled by early returns."*
2. *"One null → return other root."*
3. *"Both exist → add, recurse both children."*
4. *"Return t1 — in-place merge."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Copy t2 into all-new nodes** | Wastes space — problem allows t1 reuse |
| **BFS with two queues** | Awkward pointer assignment vs clean DFS |
| **Flatten to arrays, add, rebuild** | O(n) extra + loses shape |
| **Merge without null short-circuit** | Null dereference on mismatched depth |

**The insight brute force misses:** Null is the base case that **donates** the entire remaining subtree.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Same Tree #100](https://leetcode.com/problems/same-tree/) | Day 5 — compare, don't sum | Parallel `(a,b)` |
| [Symmetric Tree #101](https://leetcode.com/problems/symmetric-tree/) | Mirror parallel | Two-pointer recursion |
| [Construct Binary Tree #105](https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/) | Split arrays | Different combine |

---

## 📖 Walkthrough

```
t1:   1        t2:  2         merged:
     / \            / \            3
    3   2          1   3         / \
                                4   5

merge(1,2): val=3
  merge(3,1): val=4, leaves
  merge(2,3): val=5, leaves
```

> 💡 **The insight:** Two roots walk in lockstep. Where one stops, the other's subtree attaches wholesale.

---

## Solution

### C++
```cpp
class Solution {
public:
    TreeNode* mergeTrees(TreeNode* r1, TreeNode* r2) {
        if (!r1) return r2;
        if (!r2) return r1;
        r1->val  += r2->val;
        r1->left  = mergeTrees(r1->left,  r2->left);
        r1->right = mergeTrees(r1->right, r2->right);
        return r1;
    }
};
```

### Python
```python
class Solution:
    def mergeTrees(self, root1: Optional[TreeNode], root2: Optional[TreeNode]) -> Optional[TreeNode]:
        if not root1: return root2
        if not root2: return root1
        root1.val  += root2.val
        root1.left  = self.mergeTrees(root1.left,  root2.left)
        root1.right = self.mergeTrees(root1.right, root2.right)
        return root1
```

### Java
```java
class Solution {
    public TreeNode mergeTrees(TreeNode r1, TreeNode r2) {
        if (r1 == null) return r2;
        if (r2 == null) return r1;
        r1.val  += r2.val;
        r1.left  = mergeTrees(r1.left,  r2.left);
        r1.right = mergeTrees(r1.right, r2.right);
        return r1;
    }
}
```

**Complexity:** undefined
---

## 💭 What Should Have Clicked in Your Mind?

- **"Two roots"** → parallel recursion.
- **"Null returns other"** → donates subtree.
- **"Add at overlap"** → in-place on t1.
- **"Day 5 skeleton"** → compare → construct.

> 🎯 **Pattern Unlocked:** Parallel Construction

---

*One quest down. Next: reverse inorder running sum on a BST. →*
