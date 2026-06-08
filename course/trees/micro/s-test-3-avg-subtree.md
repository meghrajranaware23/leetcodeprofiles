# ⚔ S-Rank Test — Problem 3

> [Count Nodes Equal to Average of Subtree #2265](https://leetcode.com/problems/count-nodes-equal-to-average-of-subtree/) · Medium · 300 XP

---

You've completed your S-Rank training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Count Nodes Equal to Average of Subtree on LeetCode](https://leetcode.com/problems/count-nodes-equal-to-average-of-subtree/)**

> ⚔ **Hunter's rule:** This is a rank test — treat it like real interview practice. Draw the tree. Trace the recursion. No peeking until you've genuinely tried.

---

## The Problem

See the full problem statement on LeetCode: **[Count Nodes Equal to Average of Subtree #2265](https://leetcode.com/problems/count-nodes-equal-to-average-of-subtree/)**

---

## 💡 Hints

> 🎯 **What's being tested:** Pattern recognition from the S-Rank curriculum. Name the pattern before you code.

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
    pair<long long, int> dfs(TreeNode* node, int& ans) {
        if (!node) return {0, 0};
        auto l = dfs(node->left, ans), r = dfs(node->right, ans);
        long long sum = node->val + l.first + r.first;
        int cnt = 1 + l.second + r.second;
        if (sum / cnt == node->val) ans++;
        return {sum, cnt};
    }
public:
    int averageOfSubtree(TreeNode* root) {
        int ans = 0;
        dfs(root, ans);
        return ans;
    }
};
```

### Python
```python
class Solution:
    def averageOfSubtree(self, root: Optional[TreeNode]) -> int:
        self.ans = 0
        def dfs(node):
            if not node:
                return 0, 0
            ls, lc = dfs(node.left)
            rs, rc = dfs(node.right)
            total, count = node.val + ls + rs, 1 + lc + rc
            if total // count == node.val:
                self.ans += 1
            return total, count
        dfs(root)
        return self.ans
```

### Java
```java
class Solution {
    int ans = 0;
    public int averageOfSubtree(TreeNode root) {
        dfs(root);
        return ans;
    }
    long[] dfs(TreeNode node) {
        if (node == null) return new long[]{0, 0};
        long[] l = dfs(node.left), r = dfs(node.right);
        long sum = node.val + l[0] + r[0];
        long cnt = 1 + l[1] + r[1];
        if (sum / cnt == node.val) ans++;
        return new long[]{sum, cnt};
    }
}
```

**Complexity:** O(n) time · O(h) space

</details>

---

## 💭 What Should Have Clicked in Your Mind?

- **"This is a S-Rank test"** → Use patterns from this rank's training.
- **"Draw first, code second"** → Visual tracing beats guessing.
- **"Name the pattern"** → The code is just the template filled in.

---

*3 of 3 test problems. Continue to the next. →*
