<!-- hand-authored -->
# ⚔ Quest: Preorder Traversal

> **Day 2** · [Binary Tree Preorder Traversal #144](https://leetcode.com/problems/binary-tree-preorder-traversal/) · Easy · 10 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Binary Tree Preorder Traversal on LeetCode](https://leetcode.com/problems/binary-tree-preorder-traversal/)**

> ⚔ **Hunter's rule:** Use the **same tree** as inorder. Number visits 1–5. Preorder = **Root → Left → Right**. Hints are for *after* your attempt.

---

## The Problem

Given the root of a binary tree, return the **preorder** traversal of its nodes' values.

```
Input:       1
              \
               2
              /
             3

Output: [1, 2, 3]

Input:       3
            / \
           9  20
             /  \
            15   7

Output: [3, 9, 20, 15, 7]
```

---

## 💡 Hints

Which pattern from today's concept applies? **Preorder DFS** — **record** node first, then recurse left, then recurse right.

If stuck: compare to inorder on the same tree — inorder gave [9,3,15,20,7]. Preorder records each root **before** diving into its subtrees.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Preorder DFS (Root → Left → Right)

**How to identify this from the problem statement:**
- Problem name says **preorder** — record before children
- Return list in visit sequence
- Root-first order matches serialization and copy-tree problems

| Keyword / phrase | What it signals |
|---|---|
| "preorder traversal" | Root → Left → Right |
| "visit root first" | Record before recursive calls |
| "serialize tree" (related) | Preorder + null markers |
| "construct from traversals" (preview) | Preorder gives root first |
| "return list of values" | One record per node |

**Why this pattern works:** Recording before recursion guarantees parents appear before all descendants — exactly the "root first" contract.

**How a strong solver thinks before coding:**
1. *"null → return."*
2. *"record node.val"*
3. *"preorder(left)"*
4. *"preorder(right)"*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Inorder (left before record)** | Wrong list — [9,3,...] instead of [3,9,...] |
| **Postorder (record last)** | Reversed feel — root appears after subtrees |
| **Level-order BFS** | [3,9,20,15,7] may match on some trees by luck, not definition |
| **Recursive without null guard** | Crashes on empty tree |
| **Stack push left then right (iterative)** | Must push **right** first so **left** is processed first |

**The insight brute force misses:** Preorder is defined by **one line of code placement** — record before the two recursive calls. Move that line and you change algorithms.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Construct Binary Tree from Preorder and Inorder #105](https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/) | First preorder val = root; split inorder | Preorder identifies root |
| [Serialize and Deserialize BST #449](https://leetcode.com/problems/serialize-and-deserialize-bst/) | Add markers | Preorder walk |
| [Binary Tree Inorder Traversal #94](https://leetcode.com/problems/binary-tree-inorder-traversal/) | Record between children | Same tree, different order |

Same frame — record moves to the top.

---

## 📖 Walkthrough

**Preorder on the same tree as inorder — Root → Left → Right.**

```
        3
       / \
      9  20
        /  \
       15   7

Step 1: preorder(3)
  → record 3                    [3]
  → preorder(9)
       → record 9               [3, 9]
  → preorder(20)
       → record 20              [3, 9, 20]
       → preorder(15)
            → record 15         [3, 9, 20, 15]
       → preorder(7)
            → record 7          [3, 9, 20, 15, 7]  ✓

Side-by-side with inorder (Quest 1):
  Preorder:  3,  9, 20, 15,  7   (roots before subtrees)
  Inorder:   9,  3, 15, 20,  7   (roots between subtrees)
```

> 💡 **The insight:** Iterative preorder uses a stack — push root, pop and record, push **right then left** so left is processed first.

---

## Solution

### C++
```cpp
class Solution {
public:
    vector<int> preorderTraversal(TreeNode* root) {
        vector<int> res;
        if (!root) return res;
        stack<TreeNode*> st;
        st.push(root);
        while (!st.empty()) {
            TreeNode* node = st.top(); st.pop();
            res.push_back(node->val);
            if (node->right) st.push(node->right);
            if (node->left)  st.push(node->left);
        }
        return res;
    }
};
```

### Python
```python
class Solution:
    def preorderTraversal(self, root: Optional[TreeNode]) -> List[int]:
        if not root:
            return []
        res, stack = [], [root]
        while stack:
            node = stack.pop()
            res.append(node.val)
            if node.right: stack.append(node.right)
            if node.left:  stack.append(node.left)
        return res
```

### Java
```java
class Solution {
    public List<Integer> preorderTraversal(TreeNode root) {
        List<Integer> res = new ArrayList<>();
        if (root == null) return res;
        Deque<TreeNode> stack = new ArrayDeque<>();
        stack.push(root);
        while (!stack.isEmpty()) {
            TreeNode node = stack.pop();
            res.add(node.val);
            if (node.right != null) stack.push(node.right);
            if (node.left != null)  stack.push(node.left);
        }
        return res;
    }
}
```

**Complexity:** undefined
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Preorder"** → **Record**, left, right — root always first in its subtree.
- **"Contrast inorder"** → Same tree, different list — order name is everything.
- **"Iterative stack"** → Push right before left so left pops first.
- **"Serialize preview"** → Root-first walks rebuild trees later.

If your list matches inorder output, the record line is in the wrong place.

> 🎯 **Pattern Unlocked:** Preorder DFS — record node before left and right subtrees.

---

*Both quests complete. Head to the checkpoint. →*
