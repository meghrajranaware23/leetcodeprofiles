<!-- hand-authored -->
# ⚔ Quest: Same Tree

> **Day 4** · [Same Tree #100](https://leetcode.com/problems/same-tree/) · Easy · 10 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Same Tree on LeetCode](https://leetcode.com/problems/same-tree/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. Draw two trees side by side. At each frame, check both current nodes together, then recurse **both** left pairs and **both** right pairs. The hints below are for *after* your attempt.

---

## The Problem

Given the roots of two binary trees `p` and `q`, determine if they are **the same**.

Two trees are the same if they have the same structure and the same node values.

```
Input:  p: 1          q: 1
           / \             / \
          2   3           2   3

Output: true
```

---

## 💡 Hints

Which pattern from today's concept applies? **Parallel bottom-up recursion** — compare current pair, then `&&` the results from left-left and right-right sub-calls.

If you're stuck after 5 minutes: both null → true; exactly one null or different values → false; else combine child booleans with `&&`.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Parallel Recursion (Dual-Tree Bottom-Up)

**How to identify this from the problem statement:**
- **Two trees** compared simultaneously → recurse `(p.left, q.left)` and `(p.right, q.right)`
- Return **boolean** built from child booleans → bottom-up
- Structure **and** value must match at every node → early false on mismatch

| Keyword / phrase | What it signals |
|---|---|
| "same tree" / "identical trees" | Parallel recurse on both roots |
| "same structure and values" | Null-null ok; one-null bad; vals must match |
| "compare two binary trees" | Two pointers moving in lockstep |
| "subtree of" variants | Often same parallel template with extra checks |

**Why this pattern works:** Trees are the same iff roots match **and** left subtrees match **and** right subtrees match. That's three ANDs — two delegated to recursion.

**How a strong solver thinks before coding:**
1. *"Both null → true."*
2. *"One null or val mismatch → false."*
3. *"Return isSame(p.left,q.left) && isSame(p.right,q.right)."*
4. *"Don't compare p.left to q.right — structure must align."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Serialize both to strings, compare** | O(n) extra space; misses structural recursion practice |
| **Compare only root values** | Ignores subtree shape — `[1,2]` vs `[1,null,2]` would wrongly pass |
| **Compare p.left to q.right** | Checks symmetry, not sameness |
| **BFS order comparison without nulls** | Loses shape — need null alignment |

**The insight brute force misses:** Alignment is **parallel** — every recursive step pairs one node from each tree at the same relative position.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Symmetric Tree #101](https://leetcode.com/problems/symmetric-tree/) | Compare left vs right mirror | Parallel on `(left, right)` cross pairs |
| [Subtree of Another Tree #572](https://leetcode.com/problems/subtree-of-another-tree/) | Find matching root, then isSame | Same tree check as subroutine |
| [Merge Two Binary Trees #617](https://leetcode.com/problems/merge-two-binary-trees/) | Combine values instead of `&&` | Parallel recurse, different combine |

---

## 📖 Walkthrough

**Compare pairs in parallel; short-circuit on first false.**

```
p:  1          q:  1
   / \             / \
  2   3           2   3

Frame 1: isSame(1, 1)
  vals match ✓
  need isSame(2,2) AND isSame(3,3)

Frame 2: isSame(2, 2)
  both leaves → both null children
  both null → true

Frame 3: isSame(3, 3)
  both leaves → true

Combine: true && true → true  ✓


Counterexample — different shape:
p:  1        q:  1
   /              \
  2                2

isSame(1,1): vals ok
  isSame(2,null) → one null → false
  short-circuit → false  ✓
```

Parallel picture at each frame:

```
       p         q
      / \       / \
   check     check
   together  together
     ↓           ↓
  (p.left, q.left)  (p.right, q.right)
```

> 💡 **The insight:** `&&` naturally short-circuits — first false anywhere in either tree kills the answer. Every node still gets checked on paths that stay true.

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

**Complexity:** O(n) time · O(h) space
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Two trees, same?"** → Parallel recursion, not two independent DFS passes.
- **"Both null is success"** → Structure match at this slot.
- **"One null or bad val → false"** → Early exit before deeper calls (optional but clear).
- **"Combine with &&"** → Bottom-up bool — same family as max depth's `max`, different aggregator.

If you confused this with symmetric tree, remember: same tree pairs **left-left** and **right-right**; symmetric pairs **left-right** crosswise.

> 🎯 **Pattern Unlocked:** Parallel bottom-up — lockstep recursion on two trees, combine child results with `&&`.

---

*Both quests complete. Head to the checkpoint. →*
