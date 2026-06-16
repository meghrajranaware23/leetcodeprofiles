<!-- hand-authored -->
# ⚔ Quest: Longest Consecutive Sequence

> **Day 28** · [Binary Tree Longest Consecutive Sequence #298](https://leetcode.com/problems/binary-tree-longest-consecutive-sequence/) · Medium · 15 min · 40 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Binary Tree Longest Consecutive Sequence on LeetCode](https://leetcode.com/problems/binary-tree-longest-consecutive-sequence/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. At each node write `(parentVal, len)` on the way down. The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Binary Tree Longest Consecutive Sequence #298](https://leetcode.com/problems/binary-tree-longest-consecutive-sequence/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? **↓ Running consecutive length** — pass `(parentVal, len)` down; extend streak when `node.val == parentVal + 1`, else reset to 1.

If you're stuck after 5 minutes: the longest streak may **start at a non-root node**. Seed with `dfs(root, root.val - 1, 0)` so the root always begins length 1.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** DFS + Running State (top-down streak)

**How to identify this from the problem statement:**
- **"Consecutive"** along parent-child edges → compare current value to parent's value
- **"Longest"** anywhere in tree → global `ans`, not just return from root
- Not root-to-leaf path sum — streak can **reset** mid-tree when values skip

| Keyword / phrase | What it signals |
|---|---|
| "consecutive" / "increasing by 1" | `node.val == parentVal + 1` check |
| "longest sequence" | Global max over all nodes |
| "parent-child" (not any path) | Top-down — child needs parent's value |
| "binary tree" (not BST) | No ordering invariant — only local +1 rule |

**Why this pattern works:** Each node knows whether it **continues** the streak from its parent or **starts fresh**. That decision requires parent context — bottom-up cannot see it.

**How a strong solver thinks before coding:**
1. *"Void dfs(node, parentVal, len) — no return needed."*
2. *"len = extend or reset to 1."*
3. *"ans = max(ans, len) at every node."*
4. *"Recurse both children with node.val as new parentVal."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Only track streak from root** | Best streak may start at internal node |
| **Bottom-up max of child streaks** | Child doesn't know if parent continued +1 |
| **Enumerate all paths O(n²)** | Single top-down pass is O(n) |
| **BFS level order** | Consecutive is parent-child, not level-based |
| **Sort values and scan** | Tree structure defines valid edges, not sorted order |

**The insight brute force misses:** One downward parameter `parentVal` encodes the entire streak context in O(1).

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Longest Univalue Path #687](https://leetcode.com/problems/longest-univalue-path/) | Same value, not +1 | Dual-role bottom-up (Day 7) — different signal |
| [Binary Tree Longest Consecutive Sequence II #549](https://leetcode.com/problems/binary-tree-longest-consecutive-sequence-ii/) | ±1 allowed | Two streaks per node (up/down) |
| Day 6 Path Sum II | Remainder down, backtrack | Top-down state — different combine |

Same compass direction (↓), different state variable.

---

## 📖 Walkthrough

**Streak extends, breaks, and restarts — global captures best.**

```
        1
       / \
      2   3
         / \
        4   5

dfs(1, 0, 0):   len=1  ans=1
  dfs(2, 1, 1): len=2  ans=2   ← 2==1+1 ✓
  dfs(3, 1, 1): len=1  ans=2   ← 3≠2+1, reset
    dfs(4, 3, 1): len=2  ans=2   ← 4==3+1 ✓
    dfs(5, 3, 1): len=1  ans=2   ← 5≠4+1... wait parentVal=3 at 4

Correct trace at 5:
    dfs(4, 3, 1): len=2  ans=2
    dfs(5, 4, 2): len=3  ans=3   ← 5==4+1 ✓  BEST

Answer: 3  (path 3→4→5)
```

> 💡 **The insight:** After reset at node 3, a new streak builds 3→4→5. Global `ans` catches it even though root's streak was only 2.

---

## Solution

### C++
```cpp
class Solution {
    int ans = 0;
    void dfs(TreeNode* node, int parentVal, int len) {
        if (!node) return;
        len = (node->val == parentVal + 1) ? len + 1 : 1;
        ans = max(ans, len);
        dfs(node->left,  node->val, len);
        dfs(node->right, node->val, len);
    }
public:
    int longestConsecutive(TreeNode* root) {
        if (!root) return 0;
        dfs(root, root->val - 1, 0);
        return ans;
    }
};
```

### Python
```python
class Solution:
    def longestConsecutive(self, root: Optional[TreeNode]) -> int:
        self.ans = 0
        def dfs(node, parent_val, length):
            if not node: return
            length = length + 1 if node.val == parent_val + 1 else 1
            self.ans = max(self.ans, length)
            dfs(node.left,  node.val, length)
            dfs(node.right, node.val, length)
        if root: dfs(root, root.val - 1, 0)
        return self.ans
```

### Java
```java
class Solution {
    private int ans = 0;
    public int longestConsecutive(TreeNode root) {
        if (root != null) dfs(root, root.val - 1, 0);
        return ans;
    }
    private void dfs(TreeNode node, int parentVal, int len) {
        if (node == null) return;
        len = (node.val == parentVal + 1) ? len + 1 : 1;
        ans = Math.max(ans, len);
        dfs(node.left,  node.val, len);
        dfs(node.right, node.val, len);
    }
}
```

**Complexity:** undefined
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Consecutive parent-child"** → top-down running state, not bottom-up.
- **"Reset to 1"** → any break starts a new streak at current node.
- **"Seed parentVal = root.val - 1"** → root always gets length 1.
- **"Global ans"** → streak may peak in a subtree, not at root.

If you tried bottom-up first, that's the synthesis lesson — **direction follows the dependency**. Parent value flows down; children cannot infer it.

> 🎯 **Pattern Unlocked:** DFS + Running State — consecutive streak with `(parentVal, len)`.

---

*One quest down. Next: BST validity tuple + max subtree sum. →*
