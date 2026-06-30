<!-- hand-authored -->
# ⚔ Quest: Search in BST

> **Day 11** · [Search in a Binary Search Tree #700](https://leetcode.com/problems/search-in-a-binary-search-tree/) · Easy · 10 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Search in a Binary Search Tree on LeetCode](https://leetcode.com/problems/search-in-a-binary-search-tree/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. At each node, write ONE arrow — left or right. Never visit both subtrees. The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Search in a Binary Search Tree #700](https://leetcode.com/problems/search-in-a-binary-search-tree/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which compass direction from today's concept applies? **↓ BST binary search walk** — one comparison per level, prune to left or right.

If you're stuck after 5 minutes: this is array binary search with pointers. `val < node.val` → left; else → right. Stop when null or found.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** BST Binary Search

**How to identify this from the problem statement:**
- "Search in a BST" → ordering lets you eliminate half the tree each step
- Return the node pointer (or null)
- No need to traverse both children — **one branch only**

| Keyword / phrase | What it signals |
|---|---|
| "search in BST" / "find node" | Left/right walk |
| "subtree" in output | Return node where found — that subtree root |
| "O(h) time" expected | Height-proportional — not full O(n) scan |
| "binary search tree" | Compare and prune |

**Why this pattern works:** BST ordering guarantees target, if present, lives entirely in one subtree. Wrong branch = impossible path.

**How a strong solver thinks before coding:**
1. *"While node exists and val != target…"*
2. *"Go left if val < node.val, else right."*
3. *"Return node (found) or null (fell off tree)."*
4. *"Iterative = O(1) extra space; recursive = O(h) stack."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Full tree DFS/BFS** | O(n) — ignores ordering, the whole point of BST |
| **Inorder scan until match** | Works but slower constant factor; overkill |
| **Visit both children recursively** | Correct but wasteful — compare first, pick one side |
| **Compare to parent only** | Wrong logic — use root of current subtree |

**The insight brute force misses:** BST search is **array binary search on a linked structure**. Each node is a pivot; you never backtrack.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Insert into BST #701](https://leetcode.com/problems/insert-into-a-binary-search-tree/) | Walk to null, attach new node | Same left/right decision |
| [Delete Node in BST #450](https://leetcode.com/problems/delete-node-in-a-bst/) | Day 12 — find then restructure | Search phase identical |
| [Two Sum IV - Input is a BST #653](https://leetcode.com/problems/two-sum-iv-input-is-a-bst/) | Search for `target − node` while walking | Same left/right prune per comparison |

Same skeleton: compare at root, go one way.

---

## 📖 Walkthrough

**Search val = 6 in today's BST:**

```
        8
       / \
      3   10
         / \
        6   14

Step 1 — [8]:  6 < 8   → LEFT
Step 2 — [3]:  6 > 3   → RIGHT
Step 3 — [6]:  6 == 6  → return node 6 ✓

3 nodes visited. Never touched 10, 14, or 3's left subtree.

Search val = 15:
  [8] → right  [10] → right  [14] → right  null → return null
```

> 💡 **The insight:** Every step shrinks the search space to one subtree. That's the BST payoff from Day 11's invariant.

---

## Solution

### C++
```cpp
class Solution {
public:
    TreeNode* searchBST(TreeNode* root, int val) {
        while (root) {
            if (val == root->val) return root;
            root = val < root->val ? root->left : root->right;
        }
        return nullptr;
    }
};
```

### Python
```python
class Solution:
    def searchBST(self, root: Optional[TreeNode], val: int) -> Optional[TreeNode]:
        while root:
            if val == root.val: return root
            root = root.left if val < root.val else root.right
        return None
```

### Java
```java
class Solution {
    public TreeNode searchBST(TreeNode root, int val) {
        while (root != null) {
            if (val == root.val) return root;
            root = val < root.val ? root.left : root.right;
        }
        return null;
    }
}
```

**Complexity:** undefined
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Search in BST"** → not full traversal — one branch per level.
- **"Same as binary search"** → compare to pivot, halve the space.
- **"While loop is enough"** → no recursion required for this quest.
- **"Pair with Validate"** → invariant (Day 11 concept) enables the walk.

If you wrote recursive DFS visiting both sides, refactor — the compare-then-prune loop is the canonical form.

> 🎯 **Pattern Unlocked:** BST Binary Search — left/right walk in O(h).

---

*Both quests complete. Head to the checkpoint. →*
