# ⚔ Quest: Maximum Sum BST

> **Day 28** · [Maximum Sum BST in Binary Tree #1373](https://leetcode.com/problems/maximum-sum-bst-in-binary-tree/) · Hard · 25 min · 60 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Maximum Sum BST in Binary Tree on LeetCode](https://leetcode.com/problems/maximum-sum-bst-in-binary-tree/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. Draw the tree. Trace the recursion. The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Maximum Sum BST in Binary Tree #1373](https://leetcode.com/problems/maximum-sum-bst-in-binary-tree/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? Think about **Tree DP + BST Validation**.

If you're stuck after 5 minutes: revisit the concept page's visual walkthrough. Trace the tree by hand before looking at the solution structure.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Tree DP + BST Validation

**How to identify this from the problem statement:**
- Look for tree structure keywords — "binary tree", "root", "subtree", "node"
- Ask: does information flow **down** (carry state) or **up** (combine child results)?
- Check if you need to compare two trees or build a new one

| Keyword / phrase | What it signals |
|---|---|
| "maximum depth" / "height" | Bottom-up: return 1 + max(children) |
| "path sum" / "root to leaf" | Top-down: carry running sum |
| "same tree" / "symmetric" | Parallel recursion on two trees |
| "level order" / "each level" | BFS with queue |
| "construct from traversals" | Divide and conquer with traversal split |
| "validate BST" | Range checking during DFS |

**Why this pattern works:** Trees are recursive structures. Each subtree is a smaller instance of the same problem. The pattern names which direction information flows.

**How a strong solver thinks before coding:**
1. *"What does my function return? What do my children return?"*
2. *"What's the base case? (usually null)"*
3. *"Draw a 3-node tree and trace by hand."*
4. *"One pass or do I need a global variable?"*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Store all paths/nodes** | O(n²) space when O(h) recursion suffices |
| **BFS for depth/height** | DFS bottom-up is simpler and O(h) space |
| **Iterating without recursion** | Loses natural subtree decomposition |
| **Nested loops on nodes** | O(n²) when O(n) single-pass recursion works |

**The insight brute force misses:** Trust the recursion. You don't need to track everything — just combine what your children return.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| Related tree problems | Different combine logic | Same recursive skeleton |
| Same traversal order | Different processing per node | Same visit sequence |
| Variant constraints | Extra state or early termination | Same flow direction |

If you recognized this problem's pattern, you already have the skeleton for today's practice queue.

---

## 📖 Walkthrough

Trace the pattern on a small tree before reading the code:

```
        3
       / \
      9    20
          /  \
         15   7

Apply Tree DP + BST Validation step by step on this tree.
Draw it. Mark the current node at each step.
Watch what gets returned from leaves back to root.
```

> 💡 **The insight:** The code is just the paper trace written in syntax. If you can trace it by hand, you can code it.

---

## Solution

### C++
```cpp
class Solution {
    const long INF = 1e18;
    array<long,4> dfs(TreeNode* node) {
        if (!node) return {1, INF, -INF, 0};
        auto l = dfs(node->left), r = dfs(node->right);
        if (l[0] && r[0] && node->val > l[2] && node->val < r[1]) {
            long sum = node->val + l[3] + r[3];
            return {1, min(l[1], (long)node->val), max(r[2], (long)node->val), sum};
        }
        return {0, 0, 0, max(l[3], r[3])};
    }
public:
    int maxSumBSTSubTree(TreeNode* root) {
        return dfs(root)[3];
    }
};
```

### Python
```python
class Solution:
    def maxSumBSTSubTree(self, root: Optional[TreeNode]) -> int:
        def dfs(node):
            if not node:
                return True, float('inf'), float('-inf'), 0
            ll, lmn, lmx, ls = dfs(node.left)
            rl, rmn, rmx, rs = dfs(node.right)
            if ll and rl and lmx < node.val < rmn:
                return True, min(lmn, node.val), max(rmx, node.val), node.val + ls + rs
            return False, 0, 0, max(ls, rs)
        return dfs(root)[3]
```

### Java
```java
class Solution {
    public int maxSumBSTSubTree(TreeNode root) {
        return dfs(root)[3];
    }
    long[] dfs(TreeNode node) {
        if (node == null) return new long[]{1, Long.MAX_VALUE, Long.MIN_VALUE, 0};
        long[] l = dfs(node.left), r = dfs(node.right);
        if (l[0] == 1 && r[0] == 1 && node.val > l[2] && node.val < r[1]) {
            long sum = node.val + l[3] + r[3];
            return new long[]{1, Math.min(l[1], node.val), Math.max(r[2], node.val), sum};
        }
        return new long[]{0, 0, 0, Math.max(l[3], r[3])};
    }
}
```

**Complexity:** O(n) time · O(h) space

---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"This is a tree problem"** → Draw it. Don't start coding blind.
- **"Tree DP + BST Validation"** → Name the pattern from the concept page.
- **"What do my children return?"** → Define the return value first.
- **"Null is my base case"** → Every recursive tree function starts here.

If you tried BFS when DFS was cleaner (or vice versa), that's fine — the breakthrough is **naming the pattern family**, not memorizing one solution.

> 🎯 **Pattern Unlocked:** Tree DP + BST Validation

---

*Both quests complete. Head to the checkpoint. →*
