# ⚔ A-Rank Test — Problem 3

> [Delete Nodes And Return Forest #1110](https://leetcode.com/problems/delete-nodes-and-return-forest/) · Medium · 250 XP

---

You've completed your A-Rank training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Delete Nodes And Return Forest on LeetCode](https://leetcode.com/problems/delete-nodes-and-return-forest/)**

> ⚔ **Hunter's rule:** This is a rank test — treat it like real interview practice. Draw the tree. Trace the recursion. No peeking until you've genuinely tried.

---

## The Problem

See the full problem statement on LeetCode: **[Delete Nodes And Return Forest #1110](https://leetcode.com/problems/delete-nodes-and-return-forest/)**

---

## 💡 Hints

> 🎯 **What's being tested:** Pattern recognition from the A-Rank curriculum. Name the pattern before you code.

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
    TreeNode* dfs(TreeNode* node, unordered_set<int>& del, vector<TreeNode*>& forest) {
        if (!node) return nullptr;
        node->left = dfs(node->left, del, forest);
        node->right = dfs(node->right, del, forest);
        if (del.count(node->val)) {
            if (node->left) forest.push_back(node->left);
            if (node->right) forest.push_back(node->right);
            return nullptr;
        }
        return node;
    }
public:
    vector<TreeNode*> delNodes(TreeNode* root, vector<int>& to_delete) {
        unordered_set<int> del(to_delete.begin(), to_delete.end());
        vector<TreeNode*> forest;
        root = dfs(root, del, forest);
        if (root) forest.push_back(root);
        return forest;
    }
};
```

### Python
```python
class Solution:
    def delNodes(self, root: Optional[TreeNode], to_delete: List[int]) -> List[TreeNode]:
        del_set = set(to_delete)
        forest = []
        def dfs(node):
            if not node:
                return None
            node.left = dfs(node.left)
            node.right = dfs(node.right)
            if node.val in del_set:
                if node.left:
                    forest.append(node.left)
                if node.right:
                    forest.append(node.right)
                return None
            return node
        root = dfs(root)
        if root:
            forest.append(root)
        return forest
```

### Java
```java
class Solution {
    public List<TreeNode> delNodes(TreeNode root, int[] to_delete) {
        Set<Integer> del = new HashSet<>();
        for (int x : to_delete) del.add(x);
        List<TreeNode> forest = new ArrayList<>();
        root = dfs(root, del, forest);
        if (root != null) forest.add(root);
        return forest;
    }
    TreeNode dfs(TreeNode node, Set<Integer> del, List<TreeNode> forest) {
        if (node == null) return null;
        node.left = dfs(node.left, del, forest);
        node.right = dfs(node.right, del, forest);
        if (del.contains(node.val)) {
            if (node.left != null) forest.add(node.left);
            if (node.right != null) forest.add(node.right);
            return null;
        }
        return node;
    }
}
```

**Complexity:** O(n) time · O(n) space

</details>

---

## 💭 What Should Have Clicked in Your Mind?

- **"This is a A-Rank test"** → Use patterns from this rank's training.
- **"Draw first, code second"** → Visual tracing beats guessing.
- **"Name the pattern"** → The code is just the template filled in.

---

*3 of 3 test problems. Continue to the next. →*
