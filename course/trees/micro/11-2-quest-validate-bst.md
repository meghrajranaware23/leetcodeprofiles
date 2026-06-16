<!-- hand-authored -->
# ⚔ Quest: Validate BST

> **Day 11** · [Validate Binary Search Tree #98](https://leetcode.com/problems/validate-binary-search-tree/) · Medium · 15 min · 20 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Validate Binary Search Tree on LeetCode](https://leetcode.com/problems/validate-binary-search-tree/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. For each node, write its inherited `(min, max)` interval. The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Validate Binary Search Tree #98](https://leetcode.com/problems/validate-binary-search-tree/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which compass direction from today's concept applies? **↓ Range descent** — pass `(lo, hi)` down; node must satisfy `lo < val < hi`.

If you're stuck after 5 minutes: the trap tree is `5 → right child 4`. Node 4 passes a parent-only check but fails `(5, +∞)`. Trace bounds, not just immediate neighbors.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** BST Range Validation

**How to identify this from the problem statement:**
- "Validate BST" → every node must fit an open interval inherited from ancestors
- Not enough to compare left/right children locally
- DFS with tightening bounds — same pattern as Recursion pack Day 10 if you did both

| Keyword / phrase | What it signals |
|---|---|
| "validate BST" / "is valid" | Range-bounded DFS |
| "left subtree < root < right subtree" | Global bound inheritance, not one-level check |
| "strictly less / greater" | Open interval — no equal values at boundaries |
| "node values can be INT_MIN/MAX" | Use `long` or `-inf`/`+inf` endpoints |

**Why this pattern works:** Each subtree is a slice of the number line. The root of a subtree must stay inside the slice its ancestors carved out.

**How a strong solver thinks before coding:**
1. *"Helper dfs(node, lo, hi) — open interval."*
2. *"Fail fast if val <= lo or val >= hi."*
3. *"Left tightens hi to val; right tightens lo to val."*
4. *"Start with (-∞, +∞) at root."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Check only `left.val < root.val < right.val`** | Misses deep violations (4 in right subtree of 5) |
| **Inorder array, check sorted** | Works but duplicates break; also extra O(n) space |
| **BFS without bounds** | No ancestor context |
| **Using `INT_MIN`/`INT_MAX` as bounds** | Legitimate nodes can equal those values — false reject |

**The insight brute force misses:** Validation is **global inheritance**. A right-subtree node must exceed **every** ancestor on the path, not just its parent.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Recover Binary Search Tree #99](https://leetcode.com/problems/recover-binary-search-tree/) | Inorder finds two swapped nodes | Sorted order property of BST |
| [Convert Sorted Array to BST #108](https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/) | Build, not validate | BST ordering invariant |
| Recursion pack Validate BST #98 | Helper-function framing | Identical `(lo, hi)` descent |

Same skeleton: bounds down, boolean up.

---

## 📖 Walkthrough

**The trap tree — local checks pass, global fails:**

```
        5
       / \
      1   4

dfs(5, -∞, +∞):  5 OK
  dfs(1, -∞, 5):  1 OK  → leaf, return true
  dfs(4, 5, +∞):  4 <= 5 → FAIL ✗

Node 4 looks fine next to its parent (1 < 4).
But 4 is in 5's RIGHT subtree — must be > 5.
Range descent catches it; parent-only check does not.
```

> 💡 **The insight:** `(lo, hi)` encodes **every** ancestor constraint in two numbers. Tighten at each step.

---

## Solution

### C++
```cpp
class Solution {
    bool validate(TreeNode* node, long long lo, long long hi) {
        if (!node) return true;
        if (node->val <= lo || node->val >= hi) return false;
        return validate(node->left, lo, node->val) &&
               validate(node->right, node->val, hi);
    }
public:
    bool isValidBST(TreeNode* root) {
        return validate(root, LLONG_MIN, LLONG_MAX);
    }
};
```

### Python
```python
class Solution:
    def isValidBST(self, root: Optional[TreeNode]) -> bool:
        def validate(node, lo, hi):
            if not node: return True
            if not (lo < node.val < hi): return False
            return validate(node.left, lo, node.val) and validate(node.right, node.val, hi)
        return validate(root, float('-inf'), float('inf'))
```

### Java
```java
class Solution {
    public boolean isValidBST(TreeNode root) {
        return validate(root, Long.MIN_VALUE, Long.MAX_VALUE);
    }
    private boolean validate(TreeNode node, long lo, long hi) {
        if (node == null) return true;
        if (node.val <= lo || node.val >= hi) return false;
        return validate(node.left, lo, node.val) && validate(node.right, node.val, hi);
    }
}
```

**Complexity:** undefined
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Validate BST"** → range descent, not parent-only compare.
- **"Open interval"** → strict `<` on both sides; use long/infinity endpoints.
- **"Trap: 4 under 5's right"** → draw it; local OK, global wrong.
- **"Recursion pack overlap"** → same helper if you did Day 10 there.

If you tried inorder sorting first, compare approaches — range descent is one pass, no array.

> 🎯 **Pattern Unlocked:** BST Range Validation — `(lo, hi)` inheritance on descent.

---

*One quest down. Next: O(h) search with a single left/right walk. →*
