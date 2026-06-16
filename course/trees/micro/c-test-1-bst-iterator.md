<!-- hand-authored -->
# ⚔ C-Rank Test — Problem 1

> [Binary Search Tree Iterator #173](https://leetcode.com/problems/binary-search-tree-iterator/) · Medium · 150 XP

---

You've completed your C-Rank training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Binary Search Tree Iterator on LeetCode](https://leetcode.com/problems/binary-search-tree-iterator/)**

> ⚔ **Hunter's rule:** This is a rank test — treat it like real interview practice. Trace what `next()` does as one inorder step. No peeking until you've genuinely tried.

---

## The Problem

See the full problem statement on LeetCode: **[Binary Search Tree Iterator #173](https://leetcode.com/problems/binary-search-tree-iterator/)**

---

## 💡 Hints

> 🎯 **What's being tested:** Day 12 **lazy inorder** — stack of left spines; each `next()` = one inorder visit.

- **BST iterator** → don't flatten to array — O(h) space.
- Constructor: push entire **left spine** from root onto stack.
- `next()`: pop top (current smallest unvisited), then push left spine of its **right** child.
- `hasNext()`: stack non-empty.
- Same pattern as [Kth Smallest #230](https://leetcode.com/problems/kth-smallest-element-in-a-bst/) iterative — but one step at a time.

**Pattern name before coding:** *Lazy inorder with stack — amortized O(1) next.*

---

## 🔍 Pattern Recognition Breakdown

**How to identify from the statement:**
- "Iterator" + BST → controlled inorder, not full traversal upfront
- `next()` and `hasNext()` → design class, stack state between calls
- Average O(1) per `next()` → each node pushed/popped once

**How a strong solver thinks before coding:**
1. *"Inorder = left, node, right — simulate with stack."*
2. *"Initialize: pushLeft(root)."*
3. *"next(): pop, pushLeft(node.right), return val."*
4. *"Day 12 kth-smallest without stopping at k."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Inorder into array at init** | O(n) space — violates O(h) requirement |
| **Full re-traverse each next()** | O(n) per call |
| **Recursive inorder with global index** | Works but stack design is cleaner |
| **Heap of all values** | O(n) space, O(n log n) build |

---

## 🎯 Transfer to Unseen Problems

Same machinery as kth-smallest iterative and BST inorder successor. If you mastered Day 12 early-stop, this is the **streaming** version — stop never comes; caller drives pace.

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

- **"BST Iterator"** → Day 12 lazy inorder stack.
- **"pushLeft before and after pop"** → left spine = pending smaller values.
- **"Not flatten array"** → O(h) space interview requirement.
- **"Amortized O(1)"** → each node pushed once, popped once.

---

*1 of 3 test problems. Continue to the next. →*

## Solution

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
        if (node->right) pushLeft(node->right);
        return node->val;
    }
    bool hasNext() { return !st.empty(); }
};
```

### Python
```python
class BSTIterator:
    def __init__(self, root: Optional[TreeNode]):
        self.stack = []
        self._push_left(root)

    def _push_left(self, node):
        while node:
            self.stack.append(node)
            node = node.left

    def next(self) -> int:
        node = self.stack.pop()
        if node.right: self._push_left(node.right)
        return node.val

    def hasNext(self) -> bool:
        return bool(self.stack)
```

### Java
```java
class BSTIterator {
    private Deque<TreeNode> stack = new ArrayDeque<>();
    public BSTIterator(TreeNode root) { pushLeft(root); }
    public int next() {
        TreeNode node = stack.pop();
        if (node.right != null) pushLeft(node.right);
        return node.val;
    }
    public boolean hasNext() { return !stack.isEmpty(); }
    private void pushLeft(TreeNode node) {
        while (node != null) { stack.push(node); node = node.left; }
    }
}
```

**Complexity:** undefined
