# ⚔ C-Rank Test — Problem 1

> [Binary Search Tree Iterator #173](https://leetcode.com/problems/binary-search-tree-iterator/) · Medium · 150 XP

---

You've completed your C-Rank training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Binary Search Tree Iterator on LeetCode](https://leetcode.com/problems/binary-search-tree-iterator/)**

> ⚔ **Hunter's rule:** This is a rank test — treat it like real interview practice. Draw the tree. Trace the recursion. No peeking until you've genuinely tried.

---

## The Problem

See the full problem statement on LeetCode: **[Binary Search Tree Iterator #173](https://leetcode.com/problems/binary-search-tree-iterator/)**

---

## 💡 Hints

> 🎯 **What's being tested:** Pattern recognition from the C-Rank curriculum. Name the pattern before you code.

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
class BSTIterator {
    stack<TreeNode*> st;
    void pushLeft(TreeNode* node) {
        while (node) { st.push(node); node = node->left; }
    }
public:
    BSTIterator(TreeNode* root) { pushLeft(root); }
    int next() {
        TreeNode* node = st.top(); st.pop();
        pushLeft(node->right);
        return node->val;
    }
    bool hasNext() { return !st.empty(); }
};
```

### Python
```python
class BSTIterator:
    def __init__(self, root: Optional[TreeNode]):
        self.st = []
        self._push_left(root)
    def _push_left(self, node):
        while node:
            self.st.append(node)
            node = node.left
    def next(self) -> int:
        node = self.st.pop()
        self._push_left(node.right)
        return node.val
    def hasNext(self) -> bool:
        return bool(self.st)
```

### Java
```java
class BSTIterator {
    Deque<TreeNode> st = new ArrayDeque<>();
    public BSTIterator(TreeNode root) { pushLeft(root); }
    void pushLeft(TreeNode node) {
        while (node != null) { st.push(node); node = node.left; }
    }
    public int next() {
        TreeNode node = st.pop();
        pushLeft(node.right);
        return node.val;
    }
    public boolean hasNext() { return !st.isEmpty(); }
}
```

**Complexity:** O(1) amortized next · O(h) space

</details>

---

## 💭 What Should Have Clicked in Your Mind?

- **"This is a C-Rank test"** → Use patterns from this rank's training.
- **"Draw first, code second"** → Visual tracing beats guessing.
- **"Name the pattern"** → The code is just the template filled in.

---

*1 of 3 test problems. Continue to the next. →*
