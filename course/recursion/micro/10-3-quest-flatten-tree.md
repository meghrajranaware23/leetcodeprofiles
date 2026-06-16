<!-- hand-authored -->
# ⚔ Quest: Flatten Binary Tree

> **Day 10** · [Flatten Binary Tree to Linked List #114](https://leetcode.com/problems/flatten-binary-tree-to-linked-list/) · Medium · 15 min · 20 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Flatten Binary Tree to Linked List on LeetCode](https://leetcode.com/problems/flatten-binary-tree-to-linked-list/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. Trace `prev` on the 5-node example. The hints below are for *after* your attempt.

---

## The Problem

Given the `root` of a binary tree, flatten the tree into a **linked list** in-place:

- Use `TreeNode.right` as the next pointer; set all `left` to `null`
- Order must follow **preorder**: root, then left subtree, then right subtree

```
Input:     1
          / \
         2   5
        / \
       3   4

Output: 1 → 2 → 3 → 4 → 5 (via right pointers, all left null)
```

---

## 💡 Hints

Which pattern from today's concept applies? **Postorder rewiring** — visit right, then left, then stitch `node.right = prev`.

If you're stuck after 5 minutes: `prev` tracks the next node in the flattened list. Process subtrees before current node.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Postorder Rewiring

**How to identify this from the problem statement:**
- "Flatten to linked list" → rewire pointers, not new nodes
- "Preorder traversal order" → process node **after** children with right-first postorder
- "left child null" → clear `left` at each stitch
- Needs **external `prev`** → helper / class field

| Keyword / phrase | What it signals |
|---|---|
| "flatten" / "linked list" | Rewire `right` pointers |
| "preorder" order | Right-left-node visit order + prev |
| "in-place" | `prev` helper, no new list |
| "all left null" | `node.left = null` each step |

**Why this pattern works:** Last processed node in postorder (right-first) is the next node in preorder flattened sequence.

**How a strong solver thinks before coding:**
1. *"`prev = null` in wrapper."*
2. *"dfs(right), dfs(left), then node.right = prev."*
3. *"node.left = null; prev = node."*
4. *"Day 9 postorder cousin — modify pointers not swap."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Collect preorder in array, rebuild links** | O(n) extra space — misses in-place rewire |
| **Preorder dfs: node then stitch** | Hard to find where left subtree ends |
| **Left then right then node** | Wrong order for prev stitching |
| **Forget clear left** | Invalid flattened structure |

**The insight brute force misses:** Reverse postorder (right, left, node) + `prev` **is** reverse preorder stitching.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Flatten Binary Tree #114](https://leetcode.com/problems/flatten-binary-tree-to-linked-list/) | Preorder flatten | Postorder rewire + prev |
| [Invert Binary Tree #226](https://leetcode.com/problems/invert-binary-tree/) | Swap children | Day 9 postorder modify |
| [Populating Next Right Pointers #116](https://leetcode.com/problems/populating-next-right-pointers-in-each-node/) | Level links | Different wiring |
| [Binary Tree Upside Down #156](https://leetcode.com/problems/binary-tree-upside-down/) | Parent flip | Postorder rewire variant |

---

## 📖 Walkthrough

Tree: `1 → (2 → 3,4), 5`

```
RIGHT-FIRST POSTORDER + prev:

Step 0: prev = null

dfs(5):  right/left null
  5.right = null (prev)
  5.left = null
  prev = 5

dfs(4):
  4.right = 5 (prev)
  4.left = null
  prev = 4

dfs(3):
  3.right = 4
  prev = 3

dfs(2): after children
  2.right = 3 (prev chain 3→4→5)
  prev = 2

dfs(1):
  1.right = 2
  prev = 1

Final right chain: 1→2→3→4→5 ✓
All left = null ✓
```

Pointer diagram after full dfs:

```
1.right → 2.right → 3.right → 4.right → 5.right → null
```

> 💡 **The insight:** `prev` is the helper state (like BST's lo/hi) — carries forward the tail of the list being built backward.

---

## Solution

### C++
```cpp
class Solution {
    TreeNode* prev = nullptr;
    void dfs(TreeNode* node) {
        if (!node) return;
        dfs(node->right);
        dfs(node->left);
        node->right = prev;
        node->left = nullptr;
        prev = node;
    }
public:
    void flatten(TreeNode* root) { dfs(root); }
};
```

### Python
```python
class Solution:
    def flatten(self, root: Optional[TreeNode]) -> None:
        self.prev = None
        def dfs(node):
            if not node: return
            dfs(node.right)
            dfs(node.left)
            node.right = self.prev
            node.left = None
            self.prev = node
        dfs(root)
```

### Java
```java
class Solution {
    private TreeNode prev;
    public void flatten(TreeNode root) {
        prev = null;
        dfs(root);
    }
    private void dfs(TreeNode node) {
        if (node == null) return;
        dfs(node.right);
        dfs(node.left);
        node.right = prev;
        node.left = null;
        prev = node;
    }
}
```

**Complexity:** O(n) time · O(h) space
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Flatten to preorder linked list"** → Rewire in place with `prev` helper.
- **"Right, left, node"** → Not standard postorder — reversed child order for preorder output.
- **"node.right = prev"** → Stitch current after already-processed subtrees.
- **"Helper state like Day 10 BST"** → `prev` travels like `lo/hi` — different meaning, same design.

If you tried collecting nodes first, the breakthrough is **one pass postorder rewire**.

> 🎯 **Pattern Unlocked:** Postorder rewiring — right-left-node visit with prev pointer helper.

---

*Both quests complete. Head to the checkpoint. →*
