# ⚔ Quest: Longest ZigZag Path

> **Day 20** · [Longest ZigZag Path in a Binary Tree #1372](https://leetcode.com/problems/longest-zigzag-path-in-a-binary-tree/) · Medium · 15 min · 45 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Longest ZigZag Path in a Binary Tree on LeetCode](https://leetcode.com/problems/longest-zigzag-path-in-a-binary-tree/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. Draw the tree. Trace the recursion. The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Longest ZigZag Path in a Binary Tree #1372](https://leetcode.com/problems/longest-zigzag-path-in-a-binary-tree/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? Think about **Direction State DP**.

If you're stuck after 5 minutes: revisit the concept page's visual walkthrough. Trace the tree by hand before looking at the solution structure.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Direction State DP

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

Apply Direction State DP step by step on this tree.
Draw it. Mark the current node at each step.
Watch what gets returned from leaves back to root.
```

> 💡 **The insight:** The code is just the paper trace written in syntax. If you can trace it by hand, you can code it.

---

## Solution

### C++
```cpp
class Solution {
    int ans = 0;
    pair<int,int> dfs(TreeNode* node) {
        if (!node) return {-1, -1};
        auto l = dfs(node->left), r = dfs(node->right);
        ans = max({ans, l.second + 1, r.first + 1});
        return {l.second + 1, r.first + 1};
    }
public:
    int longestZigZag(TreeNode* root) {
        dfs(root);
        return ans;
    }
};
```

### Python
```python
class Solution:
    def longestZigZag(self, root: Optional[TreeNode]) -> int:
        self.ans = 0
        def dfs(node):
            if not node:
                return -1, -1
            ll, lr = dfs(node.left)
            rl, rr = dfs(node.right)
            self.ans = max(self.ans, lr + 1, rl + 1)
            return lr + 1, rl + 1
        dfs(root)
        return self.ans
```

### Java
```java
class Solution {
    int ans = 0;
    public int longestZigZag(TreeNode root) {
        dfs(root);
        return ans;
    }
    int[] dfs(TreeNode node) {
        if (node == null) return new int[]{-1, -1};
        int[] l = dfs(node.left), r = dfs(node.right);
        ans = Math.max(ans, Math.max(l[1] + 1, r[0] + 1));
        return new int[]{l[1] + 1, r[0] + 1};
    }
}
```

**Complexity:** O(n) time · O(h) space

---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"This is a tree problem"** → Draw it. Don't start coding blind.
- **"Direction State DP"** → Name the pattern from the concept page.
- **"What do my children return?"** → Define the return value first.
- **"Null is my base case"** → Every recursive tree function starts here.

If you tried BFS when DFS was cleaner (or vice versa), that's fine — the breakthrough is **naming the pattern family**, not memorizing one solution.

> 🎯 **Pattern Unlocked:** Direction State DP

---

*Both quests complete. Head to the checkpoint. →*
