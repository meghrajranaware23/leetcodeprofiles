<!-- hand-authored -->
# ⚔ Quest: Validate BST

> **Day 10** · [Validate Binary Search Tree #98](https://leetcode.com/problems/validate-binary-search-tree/) · Medium · 15 min · 20 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Validate Binary Search Tree on LeetCode](https://leetcode.com/problems/validate-binary-search-tree/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. Why does parent-only check fail on `5,3,6`? The hints below are for *after* your attempt.

---

## The Problem

Given the `root` of a binary tree, determine if it is a **valid binary search tree** (BST).

A BST is defined as: for every node, all values in its **left subtree** are **less than** the node's value, and all values in its **right subtree** are **greater than** the node's value. Subtrees must also be valid BSTs.

```
Input:    2
         / \
        1   3
Output: true

Input:    5
         / \
        1   4
           / \
          3   6
Output: false
Explanation: root 5, but 4 is in right subtree with left child 3 < 5.
```

---

## 💡 Hints

Which pattern from today's concept applies? **Range-bounded helper** — `validate(node, lo, hi)` with strict open interval.

If you're stuck after 5 minutes: left child inherits `hi = node.val`; right child inherits `lo = node.val`. Tie to Day 5 range pruning.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Range-Bounded Helper

**How to identify this from the problem statement:**
- "Validate BST" → every node must fall in **ancestor-defined range**
- "All left subtree less" → not just parent — full `(lo, hi)` interval
- "Distinct values" / strict inequality → `lo < val < hi`

| Keyword / phrase | What it signals |
|---|---|
| "validate BST" | Helper with min/max bounds |
| "all nodes in left subtree" | Bounds from ancestors, not parent only |
| strict less / greater | Open interval `(lo, hi)` |
| "return true/false" | Boolean DFS like Day 4 |

**Why this pattern works:** Each node tightens the allowable range for descendants. Violation anywhere fails the `&&` chain.

**How a strong solver thinks before coding:**
1. *"Wrapper: validate(root, -∞, +∞)."*
2. *"Fail if val <= lo or val >= hi."*
3. *"Left: same lo, hi = node.val. Right: lo = node.val, same hi."*
4. *"Day 5 cousin — state down, not sum accumulation."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Only compare node to parent** | Fails when deep node violates ancestor |
| **Inorder: check strictly increasing** | Valid O(n) — but misses helper design lesson |
| **Integer bounds: use `INT_MIN/MAX` directly** | Node value may equal `INT_MIN` — use `long` or infinity |
| **Allow `<=` on bounds** | Duplicates break strict BST definition on LC |

**The insight brute force misses:** BST property is **global within subtree bounds**, encoded as shrinking `(lo, hi)`.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Validate BST #98](https://leetcode.com/problems/validate-binary-search-tree/) | Open interval | Bounded helper |
| [Range Sum of BST #938](https://leetcode.com/problems/range-sum-of-bst/) | Day 5 — sum in range | Prune with bounds |
| [Convert Sorted Array to BST #108](https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/) | Build valid BST | Inverse of validate |
| [Kth Smallest in BST #230](https://leetcode.com/problems/kth-smallest-element-in-a-bst/) | Inorder | Alternative BST tool |

---

## 📖 Walkthrough

Invalid tree `5 / 1, 4 / 3, 6`:

```
validate(5, -∞, +∞): 5 in (-∞,+∞) ✓
  validate(1, -∞, 5): 1 < 5 ✓
  validate(4, 5, +∞): 4 < 5? FAIL → false

Even if we only checked parent 5>4, we'd miss that 3 is under left of 4
but 3 < 5 ancestor — caught when validate(3, 5, 4) runs:
  3 < 5 ✓ but need 3 < 4 and 3 > 5? lo=5 → 3 > 5 false ✓ caught at 4 node first
```

Valid tree `2 / 1, 3`:

```
validate(2, -∞, +∞) ✓
  validate(1, -∞, 2): 1 < 2 ✓, null children ✓
  validate(3, 2, +∞): 3 > 2 ✓ ✓
→ true
```

Call stack on valid tree:

```
┌──────────────────────────────┐
│ validate(2, -∞, +∞)          │
│   validate(1, -∞, 2) → true  │
│   validate(3, 2, +∞) → true  │
│ return true                  │
└──────────────────────────────┘
```

> 💡 **The insight:** Helper carries **ancestor constraints** — same bounded DFS DNA as Day 5 Range Sum BST.

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

**Complexity:** O(n) time · O(h) space
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Validate BST"** → Not parent check — **range helper**.
- **"lo < node.val < hi"** → Strict open interval; tighten per child.
- **"Day 5 bounded DFS"** → State travels down; here it's lo/hi not target sum.
- **"Use long / infinity"** → Edge values at INT boundaries.

If you only compared to parent, the `5,3,6` pattern is the classic failure — bounds fix it.

> 🎯 **Pattern Unlocked:** Range-bounded helper — carry (lo, hi), tighten at each node.

---

*One quest down. Next: postorder rewire with prev pointer. →*
