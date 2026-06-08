# ⚔ Quest: Count Complete Tree Nodes

> **Day 4** · [Count Complete Tree Nodes #222](https://leetcode.com/problems/count-complete-tree-nodes/) · Medium · 15 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Count Complete Tree Nodes on LeetCode](https://leetcode.com/problems/count-complete-tree-nodes/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. Draw the tree. Trace the recursion. The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Count Complete Tree Nodes #222](https://leetcode.com/problems/count-complete-tree-nodes/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? Think about **Complete Tree Properties**.

If you're stuck after 5 minutes: revisit the concept page's visual walkthrough. Trace the tree by hand before looking at the solution structure.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Complete Tree Properties

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

Apply Complete Tree Properties step by step on this tree.
Draw it. Mark the current node at each step.
Watch what gets returned from leaves back to root.
```

> 💡 **The insight:** The code is just the paper trace written in syntax. If you can trace it by hand, you can code it.

---

## Solution

### C++
```cpp
class Solution {
public:
    int countNodes(TreeNode* root) {
        if (!root) return 0;
        int lh = 0, rh = 0;
        TreeNode *l = root, *r = root;
        while (l) { ++lh; l = l->left; }
        while (r) { ++rh; r = r->right; }
        if (lh == rh) return (1 << lh) - 1;
        return 1 + countNodes(root->left) + countNodes(root->right);
    }
};
```

### Python
```python
class Solution:
    def countNodes(self, root: Optional[TreeNode]) -> int:
        if not root:
            return 0
        lh = rh = 0
        l = r = root
        while l:
            lh += 1
            l = l.left
        while r:
            rh += 1
            r = r.right
        if lh == rh:
            return (1 << lh) - 1
        return 1 + self.countNodes(root.left) + self.countNodes(root.right)
```

### Java
```java
class Solution {
    public int countNodes(TreeNode root) {
        if (root == null) return 0;
        int lh = 0, rh = 0;
        TreeNode l = root, r = root;
        while (l != null) { lh++; l = l.left; }
        while (r != null) { rh++; r = r.right; }
        if (lh == rh) return (1 << lh) - 1;
        return 1 + countNodes(root.left) + countNodes(root.right);
    }
}
```

**Complexity:** O(log² n) time · O(log n) space

---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"This is a tree problem"** → Draw it. Don't start coding blind.
- **"Complete Tree Properties"** → Name the pattern from the concept page.
- **"What do my children return?"** → Define the return value first.
- **"Null is my base case"** → Every recursive tree function starts here.

If you tried BFS when DFS was cleaner (or vice versa), that's fine — the breakthrough is **naming the pattern family**, not memorizing one solution.

> 🎯 **Pattern Unlocked:** Complete Tree Properties

---

*Both quests complete. Head to the checkpoint. →*
