<!-- hand-authored -->
# ⚔ Quest: Invert Binary Tree

> **Day 1** · [Invert Binary Tree #226](https://leetcode.com/problems/invert-binary-tree/) · Easy · 10 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Invert Binary Tree on LeetCode](https://leetcode.com/problems/invert-binary-tree/)**

> ⚔ **Hunter's rule:** Draw the tree. At each node, mark the swap. Trace which child becomes left vs right after inversion. Hints are for *after* your attempt.

---

## The Problem

Given the root of a binary tree, **invert** the tree (mirror it) and return its root.

```
Input:       4
            / \
           2   7
          / \ / \
         1  3 6  9

Output:      4
            / \
           7   2
          / \ / \
         9  6 3  1
```

Every node's left and right children are swapped, recursively.

---

## 💡 Hints

Which pattern from today's concept applies? **In-place DFS mutation** — null returns null; at each node, recurse both subtrees then **swap** left and right pointers.

If stuck: you don't build a new tree. Swap pointers on the existing nodes.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Recursive Tree Modification (swap at node)

**How to identify this from the problem statement:**
- "Invert" / "mirror" → swap children at every node
- Return modified root → in-place mutation, not a new tree
- Binary tree + structural change → DFS on both subtrees

| Keyword / phrase | What it signals |
|---|---|
| "invert" / "mirror" | Swap `left` and `right` at each node |
| "return the root" | Mutate in place; return same root pointer |
| "flip" / "reverse left-right" | Same swap pattern |
| "binary tree" + modify structure | DFS; null → null |
| "recursively" | Trust subtrees, then local swap |

**Why this pattern works:** Inverting a tree = invert left subtree + invert right subtree + swap them at the current node. Each subproblem is identical, just smaller.

**How a strong solver thinks before coding:**
1. *"null → return null."*
2. *"Recurse left and right first (or swap first — both work)."*
3. *"Swap node.left and node.right."*
4. *"Return root."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Build a new mirrored tree** | O(n) extra nodes — swap in place is O(1) per node |
| **BFS + store values, rebuild** | Destroys structure; overkill for pointer swap |
| **Swap only at root** | Subtrees stay un-inverted — wrong answer |
| **Serialize → reverse string → deserialize** | O(n) string work when a swap suffices |
| **Copy values into new positions** | Values move but original tree unchanged |

**The insight brute force misses:** The tree already has the nodes you need. Inverting is just rewiring pointers — no new memory required.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Symmetric Tree #101](https://leetcode.com/problems/symmetric-tree/) | Compare mirror pairs instead of swapping | Mirror thinking |
| [Flatten Binary Tree to Linked List #114](https://leetcode.com/problems/flatten-binary-tree-to-linked-list/) | Rewire children into linked list | In-place DFS mutate |
| [Merge Two Binary Trees #617](https://leetcode.com/problems/merge-two-binary-trees/) | Combine two trees node-by-node | DFS mutate + trust recursion on children |

Same skeleton: visit node, mutate locally, trust recursion on children.

---

## 📖 Walkthrough

**Postorder-style: trust children, swap at parent, return root.**

```
        4
       / \
      2   7
     / \ / \
    1  3 6  9

Step 1 — recurse to leaves:
  invertTree(1): null children → return 1
  invertTree(3): return 3
  invertTree(6): return 6
  invertTree(9): return 9

Step 2 — node 2:
  invertTree(2): recurse done → swap(1, 3) → 2 now has 3 left, 1 right

Step 3 — node 7:
  invertTree(7): swap(6, 9) → 7 now has 9 left, 6 right

Step 4 — root 4:
  invertTree(4): swap(2, 7) → 7 left, 2 right

Final tree:
        4
       / \
      7   2
     / \ / \
    9  6 3  1  ✓
```

> 💡 **The insight:** Swap happens at **every** node, not just the root. One forgotten swap leaves a partially inverted tree.

---

## Solution

### C++
```cpp
class Solution {
public:
    TreeNode* invertTree(TreeNode* root) {
        if (!root) return nullptr;
        swap(root->left, root->right);
        invertTree(root->left);
        invertTree(root->right);
        return root;
    }
};
```

### Python
```python
class Solution:
    def invertTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        if not root:
            return None
        root.left, root.right = self.invertTree(root.right), self.invertTree(root.left)
        return root
```

### Java
```java
class Solution {
    public TreeNode invertTree(TreeNode root) {
        if (root == null) return null;
        TreeNode tmp = root.left;
        root.left = invertTree(root.right);
        root.right = invertTree(tmp);
        return root;
    }
}
```

**Complexity:** undefined
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Invert"** → Swap left and right at every node — not just the root.
- **"Return root"** → Mutate in place; same pointer comes back.
- **"null → null"** → Empty subtree needs no swap.
- **"Not depth"** → No `1 + max(...)` — this is modification, not aggregation.

If you tried to collect nodes in a list and rebuild, compare to the swap — three lines of real work per node.

> 🎯 **Pattern Unlocked:** Recursive invert — trust both subtrees, swap children, return root.

---

*Both quests complete. Head to the checkpoint. →*
