# ⚔ D-Rank Test — Problem 3

> [Maximum Width of Binary Tree #662](https://leetcode.com/problems/maximum-width-of-binary-tree/) · Medium · 100 XP

---

You've completed your D-Rank training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Maximum Width of Binary Tree on LeetCode](https://leetcode.com/problems/maximum-width-of-binary-tree/)**

> ⚔ **Hunter's rule:** This is a rank test — treat it like real interview practice. Draw the tree. Trace the recursion. No peeking until you've genuinely tried.

---

## The Problem

See the full problem statement on LeetCode: **[Maximum Width of Binary Tree #662](https://leetcode.com/problems/maximum-width-of-binary-tree/)**

---

## 💡 Hints

> 🎯 **What's being tested:** Pattern recognition from the D-Rank curriculum. Name the pattern before you code.

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
public:
    int widthOfBinaryTree(TreeNode* root) {
        if (!root) return 0;
        int ans = 0;
        queue<pair<TreeNode*, unsigned long long>> q;
        q.push({root, 0});
        while (!q.empty()) {
            int sz = q.size();
            unsigned long long left = q.front().second;
            unsigned long long right = left;
            for (int i = 0; i < sz; ++i) {
                auto [node, idx] = q.front(); q.pop();
                right = idx;
                if (node->left) q.push({node->left, idx * 2});
                if (node->right) q.push({node->right, idx * 2 + 1});
            }
            ans = max(ans, (int)(right - left + 1));
        }
        return ans;
    }
};
```

### Python
```python
class Solution:
    def widthOfBinaryTree(self, root: Optional[TreeNode]) -> int:
        if not root:
            return 0
        ans = 0
        q = deque([(root, 0)])
        while q:
            n = len(q)
            left = q[0][1]
            right = left
            for _ in range(n):
                node, idx = q.popleft()
                right = idx
                if node.left:
                    q.append((node.left, idx * 2))
                if node.right:
                    q.append((node.right, idx * 2 + 1))
            ans = max(ans, right - left + 1)
        return ans
```

### Java
```java
class Solution {
    public int widthOfBinaryTree(TreeNode root) {
        if (root == null) return 0;
        int ans = 0;
        Deque<TreeNode> q = new ArrayDeque<>();
        Deque<Long> idx = new ArrayDeque<>();
        q.offer(root); idx.offer(0L);
        while (!q.isEmpty()) {
            int sz = q.size();
            long left = idx.peekFirst(), right = left;
            for (int i = 0; i < sz; i++) {
                TreeNode node = q.pollFirst();
                long id = idx.pollFirst();
                right = id;
                if (node.left != null) { q.offerLast(node.left); idx.offerLast(id * 2); }
                if (node.right != null) { q.offerLast(node.right); idx.offerLast(id * 2 + 1); }
            }
            ans = Math.max(ans, (int)(right - left + 1));
        }
        return ans;
    }
}
```

**Complexity:** O(n) time · O(n) space

</details>

---

## 💭 What Should Have Clicked in Your Mind?

- **"This is a D-Rank test"** → Use patterns from this rank's training.
- **"Draw first, code second"** → Visual tracing beats guessing.
- **"Name the pattern"** → The code is just the template filled in.

---

*3 of 3 test problems. Continue to the next. →*
