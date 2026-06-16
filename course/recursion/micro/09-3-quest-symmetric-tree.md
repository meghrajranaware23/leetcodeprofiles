<!-- hand-authored -->
# ⚔ Quest: Symmetric Tree

> **Day 9** · [Symmetric Tree #101](https://leetcode.com/problems/symmetric-tree/) · Easy · 10 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Symmetric Tree on LeetCode](https://leetcode.com/problems/symmetric-tree/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. For root's two children, which pairs do you compare? The hints below are for *after* your attempt.

---

## The Problem

Given the `root` of a binary tree, check whether it is a **mirror of itself** (symmetric around its center).

```
Input:     1
          / \
         2   2
        / \ / \
       3  4 4  3
Output: true

Input:     1
          / \
         2   2
          \   \
           3   3
Output: false
```

---

## 💡 Hints

Which pattern from today's concept applies? **Mirror recursion** — helper compares `a` with `b` cross-wise: `a.left` vs `b.right`.

If you're stuck after 5 minutes: start with `mirror(root.left, root.right)`. Never compare `a.left` with `b.left`.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Mirror Recursion

**How to identify this from the problem statement:**
- "Symmetric" / "mirror of itself" → compare **two nodes** as mirror partners
- "Binary tree" → paired DFS, not single-node descent
- Returns boolean → same family as Same Tree #100 but cross-child pairing

| Keyword / phrase | What it signals |
|---|---|
| "symmetric" / "mirror image" | `mirror(a,b)` helper |
| "mirror of itself" | Compare left subtree with right subtree |
| cross-child compare | `a.left`↔`b.right`, `a.right`↔`b.left` |
| "same structure" variant | Same Tree compares `a.left,b.left` |

**Why this pattern works:** Symmetry means left subtree is mirror of right subtree — defined recursively on cross pairs.

**How a strong solver thinks before coding:**
1. *"Empty root → true."*
2. *"Helper mirror(a,b): both null → true."*
3. *"Vals must match, then two cross recursive calls."*
4. *"AND both cross pairs — not OR."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Compare left subtree to left subtree** | Misses cross-mirror requirement |
| **Invert then compare same tree** | O(n) extra work — direct mirror check suffices |
| **Check only root's two children** | Deep asymmetry missed |
| **BFS without mirror pairing** | Level order needs symmetric index pairing |

**The insight brute force misses:** Symmetry is a **relation between two nodes** — helper with two pointers, like Same Tree but cross-wired.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Symmetric Tree #101](https://leetcode.com/problems/symmetric-tree/) | Self-symmetric | Mirror helper |
| [Same Tree #100](https://leetcode.com/problems/same-tree/) | Parallel compare | `a.left,b.left` |
| [Invert Binary Tree #226](https://leetcode.com/problems/invert-binary-tree/) | Structural swap | Day 9 modify |
| [Merge Two Binary Trees #617](https://leetcode.com/problems/merge-two-binary-trees/) | Combine values | Paired recursion |

---

## 📖 Walkthrough

Symmetric example:

```
        1
       / \
      2   2
     / \ / \
    3  4 4  3

isSymmetric(1):
  mirror(2, 2):
    vals 2==2 ✓
    mirror(2.left=3, 2.right=4)?  NO — wait that's wrong tree

Correct symmetric tree at leaves: 3 mirrors 3, 4 mirrors 4

mirror(2a, 2b) where both are value 2:
  mirror(3, 3): both null children → true
  mirror(4, 4): true
  return true && true → true

mirror(left, right) of root → true ✓
```

**Invalid** example:

```
    1
   / \
  2   2
   \   \
    3   3

mirror(2, 2):
  vals match
  mirror(2.left=null, 2.right=3): one null → false ✓
```

Pair wiring diagram:

```
    a         b
   / \       / \
  al ar     bl br

SYMMETRIC requires:
  mirror(al, br) AND mirror(ar, bl)

NOT mirror(al, bl)  ← Same Tree, not Symmetric
```

> 💡 **The insight:** Two-node helper with **cross** children — mirror of invert's swap logic, but checking not mutating.

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

**Complexity:** O(n) time · O(h) space
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Symmetric tree"** → Left subtree mirrors right — paired helper.
- **"Cross compare"** → `a.left` with `b.right`, not `b.left`.
- **"Same as Same Tree #100"** → But wiring is crossed — know both.
- **"Day 4 boolean return"** → Children answers combined with `&&`.

If you only checked root's two children once, recurse **all mirror pairs**.

> 🎯 **Pattern Unlocked:** Mirror recursion — two-node helper with cross-child pairing.

---

*Both quests complete. Head to the checkpoint. →*
