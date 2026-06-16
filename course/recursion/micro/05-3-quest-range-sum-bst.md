<!-- hand-authored -->
# ⚔ Quest: Range Sum of BST

> **Day 5** · [Range Sum of BST #938](https://leetcode.com/problems/range-sum-of-bst/) · Easy · 10 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Range Sum of BST on LeetCode](https://leetcode.com/problems/range-sum-of-bst/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. At each node, ask: *"Can left help? Can right help?"* Mark pruned subtrees with an X. The hints below are for *after* your attempt.

---

## The Problem

Given the `root` of a BST and two integers `low` and `high`, return the **sum of values** of all nodes with value in the inclusive range `[low, high]`.

```
Input:  root = [10, 5, 15, 3, 7, null, 18],  low = 7,  high = 15
Output: 32
Explanation: 7 + 10 + 15 = 32
```

---

## 💡 Hints

Which pattern from today's concept applies? **Bounded DFS with BST pruning** — pass `[low, high]` down; skip left when `node.val <= low`, skip right when `node.val >= high`.

If you're stuck after 5 minutes: add `node.val` to sum only if it's in range. BST order tells you which side can still contain valid values.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Bounded DFS with Pruning (Top-Down Range)

**How to identify this from the problem statement:**
- **BST** + **range [low, high]** → sorted structure enables skipping whole subtrees
- Sum only **some** nodes → conditional add + conditional recursion
- Bounds stay the same going down → top-down parameters (not narrowing target like path sum)

| Keyword / phrase | What it signals |
|---|---|
| "range sum" / "between low and high" | Pass bounds; add if in range |
| "BST" / "binary search tree" | Prune left/right using ordering |
| "inclusive range" | `low <= val <= high` for inclusion |
| "sum of node values" | Accumulate on unwind (`+` child returns) |

**Why this pattern works:** In a BST, all left descendants are smaller, all right descendants are larger. If `node.val <= low`, nothing in the left subtree can be ≥ low — skip it. Mirror for the right when `node.val >= high`.

**How a strong solver thinks before coding:**
1. *"null → 0."*
2. *"Add val if in [low, high], else 0."*
3. *"Recurse left only if val > low."*
4. *"Recurse right only if val < high."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Visit every node, check range** | O(n) always — misses BST prune; still correct but wasteful |
| **In-order array + two pointers** | O(n) space and time setup |
| **Prune wrong side** | `val < low` → skip **left**, not right (all left are smaller) |
| **Bottom-up without bounds** | Subtree sum includes out-of-range nodes — must filter per node or prune |

**The insight brute force misses:** BST order turns range queries into **directed search** — you only visit nodes that can still land in `[low, high]`.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Validate BST #98](https://leetcode.com/problems/validate-binary-search-tree/) | Tighten `(min, max)` per node | Top-down valid interval |
| [Trim a Binary Search Tree #669](https://leetcode.com/problems/trim-a-binary-search-tree/) | Restructure tree to fit range | Same prune logic + link surgery |
| [Count BST nodes in range (variants)](https://leetcode.com/problems/range-sum-of-bst/) | Count instead of sum | Identical traversal |

---

## 📖 Walkthrough

**Prune subtrees that BST order proves cannot contribute.**

```
BST:        10     range [7, 15]
           /  \
          5    15
         / \     \
        3   7    18

Visit 10: in range → +10
  val=10 > low=7  → may visit left
  val=10 < high=15 → may visit right

Visit 5: NOT in range (5 < 7) → +0
  val=5 <= low=7 → SKIP LEFT (all left ≤ 5 < 7)  ✂️
  val=5 < high=15 → visit right

Visit 7: in range → +7
  7 > low → check left (3 — pruned path from 5's left anyway)
  7 < high → check right (null)

Visit 15: in range → +15
  15 > low → visit left (null)
  15 >= high=15 → SKIP RIGHT (18 > 15)  ✂️

Sum: 10 + 7 + 15 = 32  ✓

Prune diagram at node 5:
        5  (too small for sum, but right may hold 7)
       / \
      ✂️   7   ← left subtree dead (all < 5 < 7)
```

> 💡 **The insight:** Pruning is top-down **decision making before the call**. You still **add returns upward**, but whether to recurse left/right depends on state (`low`, `high`) passed from above — Day 5's hallmark.

---

## Solution

### C++
```cpp
class Solution {
public:
    int rangeSumBST(TreeNode* root, int low, int high) {
        if (!root) return 0;
        int sum = (root->val >= low && root->val <= high) ? root->val : 0;
        if (root->val > low)  sum += rangeSumBST(root->left, low, high);
        if (root->val < high) sum += rangeSumBST(root->right, low, high);
        return sum;
    }
};
```

### Python
```python
class Solution:
    def rangeSumBST(self, root: Optional[TreeNode], low: int, high: int) -> int:
        if not root: return 0
        s = root.val if low <= root.val <= high else 0
        if root.val > low:  s += self.rangeSumBST(root.left, low, high)
        if root.val < high: s += self.rangeSumBST(root.right, low, high)
        return s
```

### Java
```java
class Solution {
    public int rangeSumBST(TreeNode root, int low, int high) {
        if (root == null) return 0;
        int sum = (root.val >= low && root.val <= high) ? root.val : 0;
        if (root.val > low)  sum += rangeSumBST(root.left, low, high);
        if (root.val < high) sum += rangeSumBST(root.right, low, high);
        return sum;
    }
}
```

**Complexity:** O(n) time · O(h) space
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"BST + range"** → Top-down bounds; prune with ordering.
- **"Skip left when val <= low"** → Everything left is smaller still.
- **"Skip right when val >= high"** → Everything right is larger still.
- **"Path sum shrinks one parameter; range sum keeps both"** → Two flavors of Day 5 state.

If you visited all nodes anyway, your logic may still be correct — the win is **fewer calls** on large skewed trees.

> 🎯 **Pattern Unlocked:** BST prune DFS — bounds go down; skip subtrees order proves useless.

---

*Both quests complete. Head to the checkpoint. →*
