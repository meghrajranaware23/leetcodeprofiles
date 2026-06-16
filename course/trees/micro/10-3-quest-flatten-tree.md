<!-- hand-authored -->
# ⚔ Quest: Flatten Binary Tree

> **Day 10** · [Flatten Binary Tree to Linked List #114](https://leetcode.com/problems/flatten-binary-tree-to-linked-list/) · Medium · 15 min · 20 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Flatten Binary Tree to Linked List on LeetCode](https://leetcode.com/problems/flatten-binary-tree-to-linked-list/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. Trace **right → left → node** visit order and watch `prev` rewire the right tail. The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Flatten Binary Tree to Linked List #114](https://leetcode.com/problems/flatten-binary-tree-to-linked-list/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? **In-place tree rewiring** — reverse postorder: `dfs(right); dfs(left); node.right = prev; node.left = null; prev = node`.

If you're stuck after 5 minutes: preorder flatten loses nodes; you need **right subtree fully processed before left** so `prev` points to the next node in the flattened list.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** In-Place Tree Rewiring

**How to identify this from the problem statement:**
- **"In-place" + "right child only"** → pointer rewiring, not new nodes
- **Preorder of flattened list** → reverse postorder construction
- **`prev` tail pointer** → links current node to already-flattened suffix

| Keyword / phrase | What it signals |
|---|---|
| "flatten to linked list" | Reverse postorder rewire |
| "right child pointer only" | `left = null`, extend right chain |
| "in-place" | Reuse TreeNode links |
| "preorder of flattened tree" | Visit right, then left, then attach |

**Why this pattern works:** Reverse postorder visits nodes from **last to first** in the target preorder list. Each node hooks its right pointer to the suffix already built in `prev`.

**How a strong solver thinks before coding:**
1. *"prev = null (future tail)."*
2. *"dfs(right) first — deeper/right nodes before left."*
3. *"dfs(left); then node.right = prev; node.left = null; prev = node."*
4. *"Recursive is clean; iterative = postorder stack variant."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Preorder: node, left, right with naive splice** | Loses right-subtree nodes |
| **Collect values, rebuild tree** | O(n) extra space — not in-place |
| **BFS level order** | Wrong order for preorder-linked-list |
| **Process left before right** | `prev` points wrong — list reversed |

**The insight brute force misses:** Flattened list is preorder; build it **backwards** via reverse postorder so each node knows its successor.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Postorder Traversal #145](https://leetcode.com/problems/binary-tree-postorder-traversal/) | Output values | Same visit order foundation |
| [Convert Sorted List to BST #109](https://leetcode.com/problems/convert-sorted-list-to-binary-search-tree/) | Build tree from list | Inverse direction |
| [Morris Traversal](later ranks) | O(1) space flatten | Threaded tree variant |

Right-before-left postorder + `prev` tail is the core rewire template.

---

## 📖 Walkthrough

**Right-tail rewire — reverse postorder.**

```
Before:        1
              / \
             2   5
            /   / \
           3   4   6

Flattened (preorder list): 1 → 2 → 3 → 5 → 4 → 6

Reverse postorder visit: 6, 4, 5, 3, 2, 1

Step by step:
  dfs(6): prev=null  → 6.right=null, prev=6
  dfs(4): 4.right=6, prev=4
  dfs(5): 5.right=4, prev=5
  dfs(3): 3.right=5, prev=3
  dfs(2): 2.right=3, prev=2
  dfs(1): 1.right=2, prev=1  ✓

After:
  1 → 2 → 3 → 5 → 4 → 6  (all left = null)
```

```
Visit order:  R-subtree fully done → L-subtree → attach self to prev tail

     1
    /
   2        prev walks backward building: 6←4←5←3←2←1
  /
 3
```

> 💡 **The insight:** `node.right = prev` makes the old tail the new right child — in-place preorder list without extra nodes.

---

## Solution

### C++
```cpp
class Solution {
public:
    void flatten(TreeNode* root) {
        TreeNode* curr = root;
        while (curr) {
            if (curr->left) {
                TreeNode* rightmost = curr->left;
                while (rightmost->right) rightmost = rightmost->right;
                rightmost->right = curr->right;
                curr->right = curr->left;
                curr->left = nullptr;
            }
            curr = curr->right;
        }
    }
};
```

### Python
```python
class Solution:
    def flatten(self, root: Optional[TreeNode]) -> None:
        curr = root
        while curr:
            if curr.left:
                rightmost = curr.left
                while rightmost.right:
                    rightmost = rightmost.right
                rightmost.right = curr.right
                curr.right = curr.left
                curr.left = None
            curr = curr.right
```

### Java
```java
class Solution {
    public void flatten(TreeNode root) {
        TreeNode curr = root;
        while (curr != null) {
            if (curr.left != null) {
                TreeNode rightmost = curr.left;
                while (rightmost.right != null) rightmost = rightmost.right;
                rightmost.right = curr.right;
                curr.right = curr.left;
                curr.left = null;
            }
            curr = curr.right;
        }
    }
}
```

**Complexity:** undefined
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Preorder list, in-place"** → Reverse postorder rewire.
- **"Right before left"** → Opposite of normal postorder child order.
- **"prev = built suffix"** → `node.right = prev` extends the chain backward.
- **"left = null always"** → Problem requires right-only linked structure.

If your list is reversed, you processed left before right.

> 🎯 **Pattern Unlocked:** In-Place Tree Rewiring — reverse postorder, prev tail, null left.

---

*Both quests complete. Head to the checkpoint. →*
