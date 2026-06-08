# ⚔ Quest: Step-by-Step Directions

> **Day 27** · [Step-by-Step Directions from a Binary Tree Node to Another #2096](https://leetcode.com/problems/step-by-step-directions-from-a-binary-tree-node-to-another/) · Medium · 15 min · 30 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Step-by-Step Directions from a Binary Tree Node to Another on LeetCode](https://leetcode.com/problems/step-by-step-directions-from-a-binary-tree-node-to-another/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. Draw the tree. Trace the recursion. The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Step-by-Step Directions from a Binary Tree Node to Another #2096](https://leetcode.com/problems/step-by-step-directions-from-a-binary-tree-node-to-another/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? Think about **LCA + Path Construction**.

If you're stuck after 5 minutes: revisit the concept page's visual walkthrough. Trace the tree by hand before looking at the solution structure.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** LCA + Path Construction

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

Apply LCA + Path Construction step by step on this tree.
Draw it. Mark the current node at each step.
Watch what gets returned from leaves back to root.
```

> 💡 **The insight:** The code is just the paper trace written in syntax. If you can trace it by hand, you can code it.

---

## Solution

### C++
```cpp
class Solution {
    bool path(TreeNode* node, int target, string& p) {
        if (!node) return false;
        if (node->val == target) return true;
        if (path(node->left, target, p)) { p += 'L'; return true; }
        if (path(node->right, target, p)) { p += 'R'; return true; }
        return false;
    }
public:
    string getDirections(TreeNode* root, int startValue, int destValue) {
        string a, b;
        path(root, startValue, a);
        path(root, destValue, b);
        int i = 0;
        while (i < (int)a.size() && i < (int)b.size() && a[a.size() - 1 - i] == b[b.size() - 1 - i]) ++i;
        return string(a.size() - i, 'U') + b.substr(b.size() - i);
    }
};
```

### Python
```python
class Solution:
    def getDirections(self, root: Optional[TreeNode], startValue: int, destValue: int) -> str:
        def path(node, target):
            if not node:
                return None
            if node.val == target:
                return ''
            l = path(node.left, target)
            if l is not None:
                return 'L' + l
            r = path(node.right, target)
            if r is not None:
                return 'R' + r
            return None
        a, b = path(root, startValue), path(root, destValue)
        i = 0
        while i < len(a) and i < len(b) and a[~i] == b[~i]:
            i += 1
        return 'U' * (len(a) - i) + b[len(b) - i:]
```

### Java
```java
class Solution {
    public String getDirections(TreeNode root, int startValue, int destValue) {
        String a = path(root, startValue), b = path(root, destValue);
        int i = 0;
        while (i < a.length() && i < b.length() && a.charAt(a.length() - 1 - i) == b.charAt(b.length() - 1 - i)) i++;
        return "U".repeat(a.length() - i) + b.substring(b.length() - i);
    }
    String path(TreeNode node, int target) {
        if (node == null) return null;
        if (node.val == target) return "";
        String l = path(node.left, target);
        if (l != null) return "L" + l;
        String r = path(node.right, target);
        if (r != null) return "R" + r;
        return null;
    }
}
```

**Complexity:** O(n) time · O(n) space

---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"This is a tree problem"** → Draw it. Don't start coding blind.
- **"LCA + Path Construction"** → Name the pattern from the concept page.
- **"What do my children return?"** → Define the return value first.
- **"Null is my base case"** → Every recursive tree function starts here.

If you tried BFS when DFS was cleaner (or vice versa), that's fine — the breakthrough is **naming the pattern family**, not memorizing one solution.

> 🎯 **Pattern Unlocked:** LCA + Path Construction

---

*Both quests complete. Head to the checkpoint. →*
