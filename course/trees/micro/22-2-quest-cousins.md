# ⚔ Quest: Cousins in Binary Tree

> **Day 22** · [Cousins in Binary Tree #993](https://leetcode.com/problems/cousins-in-binary-tree/) · Easy · 10 min · 35 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Cousins in Binary Tree on LeetCode](https://leetcode.com/problems/cousins-in-binary-tree/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. Draw the tree. Trace the recursion. The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Cousins in Binary Tree #993](https://leetcode.com/problems/cousins-in-binary-tree/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? Think about **BFS Parent Tracking**.

If you're stuck after 5 minutes: revisit the concept page's visual walkthrough. Trace the tree by hand before looking at the solution structure.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** BFS Parent Tracking

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

Apply BFS Parent Tracking step by step on this tree.
Draw it. Mark the current node at each step.
Watch what gets returned from leaves back to root.
```

> 💡 **The insight:** The code is just the paper trace written in syntax. If you can trace it by hand, you can code it.

---

## Solution

### C++
```cpp
class Solution {
    bool dfs(TreeNode* node, int x, int y, int d, TreeNode* par, int& dx, TreeNode*& px, int& dy, TreeNode*& py) {
        if (!node) return false;
        if (node->val == x) { dx = d; px = par; }
        if (node->val == y) { dy = d; py = par; }
        return dfs(node->left, x, y, d + 1, node, dx, px, dy, py)
            || dfs(node->right, x, y, d + 1, node, dx, px, dy, py);
    }
public:
    bool isCousins(TreeNode* root, int x, int y) {
        int dx = -1, dy = -1;
        TreeNode *px = nullptr, *py = nullptr;
        dfs(root, x, y, 0, nullptr, dx, px, dy, py);
        return dx == dy && px != py;
    }
};
```

### Python
```python
class Solution:
    def isCousins(self, root: Optional[TreeNode], x: int, y: int) -> bool:
        def find(node, val, depth, par):
            if not node:
                return None
            if node.val == val:
                return depth, par
            l = find(node.left, val, depth + 1, node)
            if l:
                return l
            return find(node.right, val, depth + 1, node)
        dx, px = find(root, x, 0, None)
        dy, py = find(root, y, 0, None)
        return dx == dy and px is not py
```

### Java
```java
class Solution {
    public boolean isCousins(TreeNode root, int x, int y) {
        int[] ax = new int[2], ay = new int[2];
        TreeNode[] px = new TreeNode[1], py = new TreeNode[1];
        dfs(root, x, 0, null, ax, px);
        dfs(root, y, 0, null, ay, py);
        return ax[0] == ay[0] && px[0] != py[0];
    }
    void dfs(TreeNode node, int val, int d, TreeNode par, int[] depth, TreeNode[] parent) {
        if (node == null) return;
        if (node.val == val) { depth[0] = d; parent[0] = par; return; }
        dfs(node.left, val, d + 1, node, depth, parent);
        dfs(node.right, val, d + 1, node, depth, parent);
    }
}
```

**Complexity:** O(n) time · O(h) space

---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"This is a tree problem"** → Draw it. Don't start coding blind.
- **"BFS Parent Tracking"** → Name the pattern from the concept page.
- **"What do my children return?"** → Define the return value first.
- **"Null is my base case"** → Every recursive tree function starts here.

If you tried BFS when DFS was cleaner (or vice versa), that's fine — the breakthrough is **naming the pattern family**, not memorizing one solution.

> 🎯 **Pattern Unlocked:** BFS Parent Tracking

---

*One quest down. The next one builds on this pattern. →*
