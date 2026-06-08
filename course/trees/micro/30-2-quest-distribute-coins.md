# ⚔ Quest: Distribute Coins

> **Day 30** · [Distribute Coins in Binary Tree #979](https://leetcode.com/problems/distribute-coins-in-binary-tree/) · Medium · 15 min · 40 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Distribute Coins in Binary Tree on LeetCode](https://leetcode.com/problems/distribute-coins-in-binary-tree/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. Draw the tree. Trace the recursion. The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Distribute Coins in Binary Tree #979](https://leetcode.com/problems/distribute-coins-in-binary-tree/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? Think about **Bottom-Up Greedy Moves**.

If you're stuck after 5 minutes: revisit the concept page's visual walkthrough. Trace the tree by hand before looking at the solution structure.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Bottom-Up Greedy Moves

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

Apply Bottom-Up Greedy Moves step by step on this tree.
Draw it. Mark the current node at each step.
Watch what gets returned from leaves back to root.
```

> 💡 **The insight:** The code is just the paper trace written in syntax. If you can trace it by hand, you can code it.

---

## Solution

### C++
```cpp
class Solution {
    int dfs(TreeNode* node, int& moves) {
        if (!node) return 0;
        int l = dfs(node->left, moves);
        int r = dfs(node->right, moves);
        moves += abs(l) + abs(r);
        return node->val + l + r - 1;
    }
public:
    int distributeCoins(TreeNode* root) {
        int moves = 0;
        dfs(root, moves);
        return moves;
    }
};
```

### Python
```python
class Solution:
    def distributeCoins(self, root: Optional[TreeNode]) -> int:
        self.moves = 0
        def dfs(node):
            if not node:
                return 0
            l, r = dfs(node.left), dfs(node.right)
            self.moves += abs(l) + abs(r)
            return node.val + l + r - 1
        dfs(root)
        return self.moves
```

### Java
```java
class Solution {
    int moves = 0;
    public int distributeCoins(TreeNode root) {
        dfs(root);
        return moves;
    }
    int dfs(TreeNode node) {
        if (node == null) return 0;
        int l = dfs(node.left), r = dfs(node.right);
        moves += Math.abs(l) + Math.abs(r);
        return node.val + l + r - 1;
    }
}
```

**Complexity:** O(n) time · O(h) space

---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"This is a tree problem"** → Draw it. Don't start coding blind.
- **"Bottom-Up Greedy Moves"** → Name the pattern from the concept page.
- **"What do my children return?"** → Define the return value first.
- **"Null is my base case"** → Every recursive tree function starts here.

If you tried BFS when DFS was cleaner (or vice versa), that's fine — the breakthrough is **naming the pattern family**, not memorizing one solution.

> 🎯 **Pattern Unlocked:** Bottom-Up Greedy Moves

---

*One quest down. The next one builds on this pattern. →*
