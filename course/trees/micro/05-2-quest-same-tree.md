<!-- hand-authored -->
# ⚔ Quest: Same Tree

> **Day 5** · [Same Tree #100](https://leetcode.com/problems/same-tree/) · Easy · 10 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Same Tree on LeetCode](https://leetcode.com/problems/same-tree/)**

> ⚔ **Hunter's rule:** Draw both trees. Pair nodes: left-with-left, right-with-right. Hints are for *after* your attempt.

---

## The Problem

Given the roots of two binary trees `p` and `q`, check if they are **the same** — same structure and same values at corresponding positions.

```
Input:  p = [1,2,3]     q = [1,2,3]

Output: true

Input:  p = [1,2]       q = [1,null,2]

Output: false
Explanation: Structure differs — q's 2 is right child of 1, not left.
```

---

## 💡 Hints

Which pattern from today's concept applies? **Parallel recursion** — `(p.left, q.left)` and `(p.right, q.right)`. Both null → true; one null → false; values must match.

If stuck: this is **not** mirror pairing. Left goes with left.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Parallel Recursion (⇄ Side-by-side)

**How to identify this from the problem statement:**
- Two tree roots `p` and `q` → two-pointer walk
- "Same structure and values" → parallel child pairing
- Boolean short-circuit → `&&` on both subtrees

| Keyword / phrase | What it signals |
|---|---|
| "same tree" / "identical" | `(p.left,q.left)`, `(p.right,q.right)` |
| "corresponding nodes" | Parallel, not cross |
| "structure and value" | Null check + val equality |
| "two binary trees" | Two parameters in recursive function |
| "subtree" (related #572) | Reuse same() as building block |

**Why this pattern works:** Two trees are identical iff roots match and left subtrees match in parallel and right subtrees match in parallel.

**How a strong solver thinks before coding:**
1. *"Both null → true. One null → false."*
2. *"Values differ → false."*
3. *"same(p.left,q.left) && same(p.right,q.right)."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Serialize to strings, compare** | Works but hides parallel skeleton used in #572 |
| **Mirror pairing (symmetric style)** | Wrong — rejects valid identical trees |
| **Compare only values, ignore shape** | `[1,2]` vs `[1,null,2]` would falsely pass |
| **Flatten inorder lists** | Different shapes can yield same list |
| **BFS both trees separately** | Harder null alignment than DFS parallel |

**The insight brute force misses:** Same Tree is the **building block** for Subtree (#572) — master parallel pairing first.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Subtree of Another Tree #572](https://leetcode.com/problems/subtree-of-another-tree/) | Search + same() at each node | Parallel check |
| [Symmetric Tree #101](https://leetcode.com/problems/symmetric-tree/) | **Cross** pairing instead | Mirror variant (Quest 2) |
| [Merge Two Binary Trees #617](https://leetcode.com/problems/merge-two-binary-trees/) | Build new tree | Parallel walk both |

Same two-pointer frame — different combine or build step.

---

## 📖 Walkthrough

**Parallel pairing — left with left, right with right.**

```
p:        1              q:        1
         / \                      / \
        2   3                    2   3

Step 1: same(1, 1)  → vals match
Step 2: same(2, 2)  → both leaves → true
Step 3: same(3, 3)  → both leaves → true
→ true ✓

Mismatch example:
p:   1          q:   1
    /                 \
   2                   2

same(1,1) ✓
same(2, null) → one null → false ✓
(Never compare p's left 2 with q's right 2 — wrong pairing)
```

> 💡 **The insight:** Structure matters. `(p.left, q.left)` must be checked even when one side is null.

---

## Solution

### C++
```cpp
class Solution {
public:
    bool isSameTree(TreeNode* p, TreeNode* q) {
        if (!p && !q) return true;
        if (!p || !q || p->val != q->val) return false;
        return isSameTree(p->left, q->left) && isSameTree(p->right, q->right);
    }
};
```

### Python
```python
class Solution:
    def isSameTree(self, p: Optional[TreeNode], q: Optional[TreeNode]) -> bool:
        if not p and not q: return True
        if not p or not q or p.val != q.val: return False
        return self.isSameTree(p.left, q.left) and self.isSameTree(p.right, q.right)
```

### Java
```java
class Solution {
    public boolean isSameTree(TreeNode p, TreeNode q) {
        if (p == null && q == null) return true;
        if (p == null || q == null || p.val != q.val) return false;
        return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
    }
}
```

**Complexity:** undefined
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Same tree"** → Parallel `(p.left,q.left)` AND `(p.right,q.right)`.
- **"Not symmetric"** → No cross pairing — that's Quest 2.
- **"Null rule"** → Both null true; exactly one null false.
- **"Subtree test preview"** → This same() function is reused in #572.

If you paired `p.left` with `q.right`, you wrote mirror logic by mistake.

> 🎯 **Pattern Unlocked:** Parallel recursion — corresponding children stay paired.

---

*One quest down. Next: one tree, but compare left subtree against right — mirror. →*
