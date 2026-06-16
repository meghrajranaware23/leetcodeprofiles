<!-- hand-authored -->
# ⚔ Quest: Symmetric Tree

> **Day 5** · [Symmetric Tree #101](https://leetcode.com/problems/symmetric-tree/) · Easy · 10 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Symmetric Tree on LeetCode](https://leetcode.com/problems/symmetric-tree/)**

> ⚔ **Hunter's rule:** Draw the tree. Compare **left child vs right child** with cross pairing. Hints are for *after* your attempt.

---

## The Problem

Given the root of a binary tree, check whether it is a **mirror of itself** (symmetric around its center).

```
Input:       1
            / \
           2   2
          / \ / \
         3  4 4  3

Output: true

Input:       1
            / \
           2   2
            \   \
             3    3

Output: false
```

---

## 💡 Hints

Which pattern from today's concept applies? **Mirror recursion** — compare `(a.left, b.right)` and `(a.right, b.left)`. Start with `mirror(root.left, root.right)`.

If stuck: Same Tree pairs left-left; Symmetric pairs **left-right cross**.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Mirror Recursion (cross pairing)

**How to identify this from the problem statement:**
- "Symmetric" / "mirror of itself" → cross child pairing
- Single tree input → compare two subtrees of same root
- Same null/value rules as Same Tree → different wiring

| Keyword / phrase | What it signals |
|---|---|
| "symmetric tree" | `(a.left, b.right)`, `(a.right, b.left)` |
| "mirror of itself" | Helper on root.left vs root.right |
| "reflection" / "flip horizontally" | Cross pairing |
| "same structure both sides" | Not Same Tree — cross compare |
| "corresponding mirror nodes" | Outer with outer, inner with inner |

**Why this pattern works:** Symmetry means left subtree is mirror of right subtree — outer nodes match outer, inner match inner, with roles swapped.

**How a strong solver thinks before coding:**
1. *"Empty root → true."*
2. *"mirror(a, b): both null → true; one null → false."*
3. *"a.val == b.val && mirror(a.left, b.right) && mirror(a.right, b.left)."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Same Tree parallel pairing** | Compares left-left — fails on valid symmetric trees |
| **Invert copy + Same Tree** | O(n) extra space — mirror walk is O(h) stack |
| **Compare inorder sequences** | Symmetric inorder isn't simply palindrome in all defs |
| **BFS level palindrome only** | Values per level palindrome necessary but check structure too |
| **Only compare root's two children values** | Deep asymmetry missed |

**The insight brute force misses:** Symmetric is Same Tree's **mirror wiring** — one line change in the two recursive calls.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Same Tree #100](https://leetcode.com/problems/same-tree/) | Parallel pairing | `(left,left)`, `(right,right)` |
| [Invert Binary Tree #226](https://leetcode.com/problems/invert-binary-tree/) | Mutate, not compare | Day 1 swap |
| [Subtree of Another Tree #572](https://leetcode.com/problems/subtree-of-another-tree/) | Parallel same() + search | Same Tree building block |

Mirror vs parallel — the Day 5 contrast table.

---

## 📖 Walkthrough

**Cross pairing on symmetric tree.**

```
        1
       / \
      2   2
     / \ / \
    3  4 4  3

mirror(2_left, 2_right):
  vals 2 == 2 ✓
  mirror(3, 3)     ← a.left vs b.right  ✓
  mirror(4, 4)     ← a.right vs b.left  ✓
→ true

Asymmetric:
        1
       / \
      2   2
       \   \
        3    3

mirror(2, 2): vals match
  mirror(null, 3) → one null → false ✓
```

> 💡 **The insight:** Draw the contrast table from the concept page. Same Tree: L-L, R-R. Symmetric: L-R, R-L.

---

## Solution

### C++
```cpp
class Solution {
    bool mirror(TreeNode* a, TreeNode* b) {
        if (!a && !b) return true;
        if (!a || !b || a->val != b->val) return false;
        return mirror(a->left, b->right) && mirror(a->right, b->left);
    }
public:
    bool isSymmetric(TreeNode* root) {
        return !root || mirror(root->left, root->right);
    }
};
```

### Python
```python
class Solution:
    def isSymmetric(self, root: Optional[TreeNode]) -> bool:
        def mirror(a, b):
            if not a and not b: return True
            if not a or not b or a.val != b.val: return False
            return mirror(a.left, b.right) and mirror(a.right, b.left)
        return not root or mirror(root.left, root.right)
```

### Java
```java
class Solution {
    private boolean mirror(TreeNode a, TreeNode b) {
        if (a == null && b == null) return true;
        if (a == null || b == null || a.val != b.val) return false;
        return mirror(a.left, b.right) && mirror(a.right, b.left);
    }
    public boolean isSymmetric(TreeNode root) {
        return root == null || mirror(root.left, root.right);
    }
}
```

**Complexity:** undefined
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Symmetric"** → Cross: `(a.left, b.right)` AND `(a.right, b.left)`.
- **"Same Tree diff"** → Parallel pairs left-left; mirror crosses.
- **"Start at root's children"** → Don't compare root with itself.
- **"Null rule identical to #100"** → Both null true; one null false.

If your recursive calls look like Same Tree, swap one pairing to cross.

> 🎯 **Pattern Unlocked:** Mirror recursion — left meets right across the axis.

---

*Both quests complete. Head to the checkpoint. →*
