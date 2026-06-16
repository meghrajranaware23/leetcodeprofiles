<!-- hand-authored -->
# ⚔ C-Rank Test — Problem 3

> [Recover Binary Search Tree #99](https://leetcode.com/problems/recover-binary-search-tree/) · Medium · 150 XP

---

You've completed your C-Rank training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Recover Binary Search Tree on LeetCode](https://leetcode.com/problems/recover-binary-search-tree/)**

> ⚔ **Hunter's rule:** This is a rank test — treat it like real interview practice. Inorder of BST must be sorted — find where it breaks. No peeking until you've genuinely tried.

---

## The Problem

See the full problem statement on LeetCode: **[Recover Binary Search Tree #99](https://leetcode.com/problems/recover-binary-search-tree/)**

---

## 💡 Hints

> 🎯 **What's being tested:** Day 12 **inorder on BST** — exactly two nodes swapped; inorder scan finds out-of-order pair(s).

- BST inorder → strictly increasing sequence.
- One pass inorder: track `prev` node value.
- If `node.val < prev.val` → violation found.
- **First** violation: `first = prev` (not current).
- **Second** violation: `second = node` (adjacent swap: only one violation, second = node).
- Swap `first.val` and `second.val` — O(1) extra if excluding recursion stack.

**Pattern name before coding:** *Inorder violation detection — two swapped nodes.*

---

## 🔍 Pattern Recognition Breakdown

**How to identify from the statement:**
- "Recover BST" / "two nodes swapped" → inorder sorted property broken
- O(1) space follow-up (excluding stack) → Morris traversal optional; recursion acceptable on interview
- In-place swap values — don't rebuild tree

**How a strong solver thinks before coding:**
1. *"Inorder traverse — compare to prev."*
2. *"On drop: if first unset, first=prev; second=node always on drop."*
3. *"After traversal: swap first.val, second.val."*
4. *"Day 11 validate would fail — fix not check."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Sort all values, reassign** | O(n log n) — inorder O(n) suffices |
| **Validate then search** | Two passes — combine in one inorder |
| **Rebuild BST from sorted array** | O(n) but mutates structure — swap values simpler |
| **Track every out-of-order pair in array** | Two nodes only — constant pointers enough |

---

## 🎯 Transfer to Unseen Problems

Connects Day 11 (BST order), Day 12 (inorder traversal), and sorted-array reasoning. Adjacent swap = one violation event; non-adjacent = two violation events with same `first` and updated `second`.

---

<details>
<summary><strong>📖 Solution & Walkthrough</strong></summary>

Trace the pattern on the example tree from the problem statement. Then implement the recursive skeleton you identified.

### C++
```cpp
class Solution {
    TreeNode *first = nullptr, *prev = nullptr, *second = nullptr;
    void inorder(TreeNode* node) {
        if (!node) return;
        inorder(node->left);
        if (prev && node->val < prev->val) {
            if (!first) first = prev;
            second = node;
        }
        prev = node;
        inorder(node->right);
    }
public:
    void recoverTree(TreeNode* root) {
        inorder(root);
        swap(first->val, second->val);
    }
};
```

### Python
```python
class Solution:
    def recoverTree(self, root: Optional[TreeNode]) -> None:
        self.first = self.prev = self.second = None
        def inorder(node):
            if not node:
                return
            inorder(node.left)
            if self.prev and node.val < self.prev.val:
                if not self.first:
                    self.first = self.prev
                self.second = node
            self.prev = node
            inorder(node.right)
        inorder(root)
        self.first.val, self.second.val = self.second.val, self.first.val
```

### Java
```java
class Solution {
    TreeNode first = null, prev = null, second = null;
    public void recoverTree(TreeNode root) {
        inorder(root);
        int tmp = first.val;
        first.val = second.val;
        second.val = tmp;
    }
    void inorder(TreeNode node) {
        if (node == null) return;
        inorder(node.left);
        if (prev != null && node.val < prev.val) {
            if (first == null) first = prev;
            second = node;
        }
        prev = node;
        inorder(node.right);
    }
}
```

**Complexity:** O(n) time · O(h) space

</details>

---

## 💭 What Should Have Clicked in Your Mind?

- **"Two swapped in BST"** → inorder must be sorted — find dips.
- **"first = prev on first dip"** → adjacent swap edge case handled.
- **"second always updated on dip"** → non-adjacent swap gets correct pair.
- **"Day 12 inorder"** → same walk as kth-smallest, different processing.

---

*3 of 3 test problems. Continue to the next. →*

## Solution

### C++
```cpp
class Solution {
    TreeNode *first = nullptr, *second = nullptr, *prev = nullptr;
    void inorder(TreeNode* node) {
        if (!node) return;
        inorder(node->left);
        if (prev && prev->val > node->val) {
            if (!first) first = prev;
            second = node;
        }
        prev = node;
        inorder(node->right);
    }
public:
    void recoverTree(TreeNode* root) {
        inorder(root);
        swap(first->val, second->val);
    }
};
```

### Python
```python
class Solution:
    def recoverTree(self, root: Optional[TreeNode]) -> None:
        self.first = self.second = self.prev = None
        def inorder(node):
            if not node: return
            inorder(node.left)
            if self.prev and self.prev.val > node.val:
                if not self.first: self.first = self.prev
                self.second = node
            self.prev = node
            inorder(node.right)
        inorder(root)
        self.first.val, self.second.val = self.second.val, self.first.val
```

### Java
```java
class Solution {
    private TreeNode first, second, prev;
    public void recoverTree(TreeNode root) {
        inorder(root);
        int tmp = first.val; first.val = second.val; second.val = tmp;
    }
    private void inorder(TreeNode node) {
        if (node == null) return;
        inorder(node.left);
        if (prev != null && prev.val > node.val) {
            if (first == null) first = prev;
            second = node;
        }
        prev = node;
        inorder(node.right);
    }
}
```

**Complexity:** undefined
