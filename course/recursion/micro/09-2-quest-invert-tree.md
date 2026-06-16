<!-- hand-authored -->
# ⚔ Quest: Invert Binary Tree

> **Day 9** · [Invert Binary Tree #226](https://leetcode.com/problems/invert-binary-tree/) · Easy · 10 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Invert Binary Tree on LeetCode](https://leetcode.com/problems/invert-binary-tree/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. Trace swap order on the 4-node example. The hints below are for *after* your attempt.

---

## The Problem

Given the `root` of a binary tree, invert the tree (mirror it horizontally) and return its root.

```
Input:     4
          / \
         2   7
        / \ / \
       1  3 6  9

Output:    4
          / \
         7   2
        / \ / \
       9  6 3  1
```

---

## 💡 Hints

Which pattern from today's concept applies? **Postorder modification** — recurse subtrees, then swap children at current node.

If you're stuck after 5 minutes: base `null`. Swap after children are inverted (C++). Or assign inverted right to left (Python one-liner).

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Postorder Modification

**How to identify this from the problem statement:**
- "Invert" / "mirror horizontally" → swap `left` and `right` at every node
- "Return root" → mutate in place, return same root
- Tree structure → recursive DFS on children

| Keyword / phrase | What it signals |
|---|---|
| "invert" / "mirror" tree | Swap left ↔ right recursively |
| "binary tree" | Two child calls per node |
| "return root" | Void-style modify with root return |
| postorder local work | Swap **after** child processing |

**Why this pattern works:** Inverting a subtree = invert left + invert right + swap at root. Children independent — classic tree recursion.

**How a strong solver thinks before coding:**
1. *"Base: null → null."*
2. *"Invert left subtree, invert right subtree."*
3. *"Swap pointers at current node."*
4. *"Same family as Day 4 depth — but modify instead of max+1."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Copy tree with reversed structure** | O(n) extra space — invert in place |
| **Swap before recursing** | Still works if careful, but postorder is clearer |
| **BFS queue swap only top level** | Must swap at **every** node |
| **Forget to return root** | Caller needs mutated tree reference |

**The insight brute force misses:** One swap per node after subtrees are correct — postorder discipline.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Invert Binary Tree #226](https://leetcode.com/problems/invert-binary-tree/) | Swap children | Postorder modify |
| [Maximum Depth #104](https://leetcode.com/problems/maximum-depth-of-binary-tree/) | Aggregate depth | Day 4 bottom-up |
| [Same Tree #100](https://leetcode.com/problems/same-tree/) | Compare pairs | Paired recursion |
| [Symmetric Tree #101](https://leetcode.com/problems/symmetric-tree/) | Mirror check | Cross-child compare |

---

## 📖 Walkthrough

Tree: `4 → (2 → 1,3), (7 → 6,9)`

```
POSTORDER TRACE (C++ style: recurse left, recurse right, swap):

invert(4):
  invert(2):
    invert(1): null,null → swap nothing → return 1
    invert(3): → return 3
    swap(2.left, 2.right): 1↔3
    2 now: (3, 1)
  invert(7):
    invert(6), invert(9)
    swap: 7 now (9, 6)
  swap(4.left, 4.right): 2↔7
  4 now: (7, 2) with inverted children ✓

CALL STACK growth on invert(4):

┌─────────────────────────┐
│ invert(4)               │
│   invert(2)...          │
│     invert(1) BASE      │
│     invert(3) BASE      │
│   swap 2's children     │
│   invert(7)...          │
│   swap 4's children     │
└─────────────────────────┘
```

Python one-liner equivalent: `root.left, root.right = invert(right), invert(left)` — recurses right first, assigns inverted subtrees.

> 💡 **The insight:** Every node does one local swap. Subtrees already inverted when swap runs (postorder).

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
        if not root: return None
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

**Complexity:** O(n) time · O(h) space
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Invert tree"** → Swap left and right at every node.
- **"Postorder"** → Children first, swap at current (C++ explicit order).
- **"Day 4 cousin"** → Same tree DFS skeleton; combine step is swap not `1+max`.
- **"Return root"** → Mutate in place; base returns `null`.

If you compared only root's children once, extend to **full tree DFS**.

> 🎯 **Pattern Unlocked:** Postorder tree modification — recurse subtrees, swap at node.

---

*One quest down. Next: mirror-pair symmetry check. →*
