# ⚔ B-Rank Test — Problem 3

> [Binary Tree Cameras #968](https://leetcode.com/problems/binary-tree-cameras/) · Hard · 200 XP

---

You've completed your B-Rank training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Binary Tree Cameras on LeetCode](https://leetcode.com/problems/binary-tree-cameras/)**

> ⚔ **Hunter's rule:** This is a rank test — treat it like real interview practice. Draw the tree. Trace the recursion. No peeking until you've genuinely tried.

---

## The Problem

See the full problem statement on LeetCode: **[Binary Tree Cameras #968](https://leetcode.com/problems/binary-tree-cameras/)**

---

## 💡 Hints

> 🎯 **What's being tested:** Pattern recognition from the B-Rank curriculum. Name the pattern before you code.

Revisit your rank's cheat sheet. Which traversal direction does this problem need?

---

## 🔍 Pattern Recognition Breakdown

**How to identify from the statement:**
- Read for tree structure clues
- Determine information flow direction
- Name the pattern family before opening your editor

**How a strong solver thinks before coding:**
1. *"Draw the example tree."*
2. *"What does my function return?"*
3. *"Top-down, bottom-up, BFS, or parallel?"*
4. *"What's the base case?"*

---

## ❌ Why Brute Force Fails

Tree problems have natural O(n) recursive solutions. Brute force typically means redundant traversal or storing unnecessary state. Trust the subtree structure.

---

## 🎯 Transfer to Unseen Problems

Can you spot the pattern without the problem name telling you?

Read the statement once. Say the pattern aloud. If you can name it in under 30 seconds, you're ready.

---

<details>
<summary><strong>📖 Solution & Walkthrough</strong></summary>

Trace the pattern on the example tree from the problem statement. Then implement the recursive skeleton you identified.

### C++
```cpp
class Solution {
    int cameras = 0;
    int dfs(TreeNode* node) {
        if (!node) return 2;
        int l = dfs(node->left), r = dfs(node->right);
        if (l == 0 || r == 0) { cameras++; return 1; }
        if (l == 1 || r == 1) return 2;
        return 0;
    }
public:
    int minCameraCover(TreeNode* root) {
        return dfs(root) == 0 ? cameras + 1 : cameras;
    }
};
```

### Python
```python
class Solution:
    def minCameraCover(self, root: Optional[TreeNode]) -> int:
        self.cameras = 0
        def dfs(node):
            if not node:
                return 2
            l, r = dfs(node.left), dfs(node.right)
            if l == 0 or r == 0:
                self.cameras += 1
                return 1
            if l == 1 or r == 1:
                return 2
            return 0
        return self.cameras + (1 if dfs(root) == 0 else 0)
```

### Java
```java
class Solution {
    int cameras = 0;
    public int minCameraCover(TreeNode root) {
        return dfs(root) == 0 ? cameras + 1 : cameras;
    }
    int dfs(TreeNode node) {
        if (node == null) return 2;
        int l = dfs(node.left), r = dfs(node.right);
        if (l == 0 || r == 0) { cameras++; return 1; }
        if (l == 1 || r == 1) return 2;
        return 0;
    }
}
```

**Complexity:** O(n) time · O(h) space

</details>

---

## 💭 What Should Have Clicked in Your Mind?

- **"This is a B-Rank test"** → Use patterns from this rank's training.
- **"Draw first, code second"** → Visual tracing beats guessing.
- **"Name the pattern"** → The code is just the template filled in.

---

*3 of 3 test problems. Continue to the next. →*
