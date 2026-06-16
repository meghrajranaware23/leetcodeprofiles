<!-- hand-authored -->
# ⚔ Quest: Delete Node in BST

> **Day 12** · [Delete Node in a BST #450](https://leetcode.com/problems/delete-node-in-a-bst/) · Medium · 15 min · 25 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Delete Node in a BST on LeetCode](https://leetcode.com/problems/delete-node-in-a-bst/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. For the target node, label its child count (0, 1, or 2). Draw the after-picture. The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Delete Node in a BST #450](https://leetcode.com/problems/delete-node-in-a-bst/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? **BST Delete Cases** — search to key, then 0/1/2 child rewire.

If you're stuck after 5 minutes: two children → find leftmost of right subtree (successor), copy its value into target node, recursively delete that successor value from the right subtree.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** BST Delete Cases

**How to identify this from the problem statement:**
- "Delete node with given key" → search phase (Day 11) + surgery phase
- Function returns **new subtree root** — parent must capture return value
- Two-child case uses **successor value copy**, not node swap

| Keyword / phrase | What it signals |
|---|---|
| "delete from BST" | Three-case rewire |
| "maintain BST property" | Successor/predecessor replacement |
| "return root after deletion" | Recursive return replaces child pointer |
| "key not in tree" | Search falls off — tree unchanged |

**Why this pattern works:** Cases 0 and 1 are pointer bypasses. Case 2 reduces to Case 0/1 by promoting successor value then deleting duplicate position.

**How a strong solver thinks before coding:**
1. *"Search: key < val → left; key > val → right."*
2. *"Found: 0 kids → return null; 1 kid → return that child."*
3. *"2 kids → successor = leftmost(right); copy val; delete successor from right."*
4. *"Always return node (possibly updated) to parent."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Rebuild BST from inorder array** | O(n) — correct but wasteful |
| **Swap entire successor node struct** | Pointer nightmare — copy value is simpler |
| **Only handle leaf delete** | Crashes on internal nodes |
| **Forget to reassign `root->left = delete(...)`** | Subtree change lost — tree breaks |

**The insight brute force misses:** Delete is **two phases** — find (search walk) then local fix (one of three templates). The BST property survives if you pick successor correctly.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Trim a Binary Search Tree #669](https://leetcode.com/problems/trim-a-binary-search-tree/) | Delete a **range** of keys | Same rewire logic per node |
| [Insert into BST #701](https://leetcode.com/problems/insert-into-a-binary-search-tree/) | Add instead of remove | Search walk to null |
| [Recover BST #99](https://leetcode.com/problems/recover-binary-search-tree/) | C-Rank test — fix two swapped vals | Inorder property |

Same skeleton: search down, mutate on way back up.

---

## 📖 Walkthrough

**Delete key = 3 from:**

```
        5
       / \
      3   7
     / \   \
    2   4   8

Search: 3 < 5 → left → found at node 3 (two children: 2 and 4)

Case 2:
  Successor = leftmost of right subtree = 4
  Copy 4 into node 3
  Delete 4 from right subtree (now Case 0 — leaf)

Result:
        5
       / \
      4   7
     /     \
    2       8

Inorder still sorted: 2, 4, 5, 7, 8 ✓
```

> 💡 **The insight:** Case 2 never removes the target node structurally — it **becomes** the successor value, then successor position is deleted as a simpler case.

---

## Solution

### C++
```cpp
class Solution {
public:
    TreeNode* deleteNode(TreeNode* root, int key) {
        if (!root) return nullptr;
        if (key < root->val)       root->left  = deleteNode(root->left,  key);
        else if (key > root->val)  root->right = deleteNode(root->right, key);
        else {
            if (!root->left)  return root->right;
            if (!root->right) return root->left;
            TreeNode* succ = root->right;
            while (succ->left) succ = succ->left;
            root->val   = succ->val;
            root->right = deleteNode(root->right, succ->val);
        }
        return root;
    }
};
```

### Python
```python
class Solution:
    def deleteNode(self, root: Optional[TreeNode], key: int) -> Optional[TreeNode]:
        if not root: return None
        if key < root.val:
            root.left  = self.deleteNode(root.left, key)
        elif key > root.val:
            root.right = self.deleteNode(root.right, key)
        else:
            if not root.left:  return root.right
            if not root.right: return root.left
            succ = root.right
            while succ.left: succ = succ.left
            root.val   = succ.val
            root.right = self.deleteNode(root.right, succ.val)
        return root
```

### Java
```java
class Solution {
    public TreeNode deleteNode(TreeNode root, int key) {
        if (root == null) return null;
        if (key < root.val)       root.left  = deleteNode(root.left,  key);
        else if (key > root.val)  root.right = deleteNode(root.right, key);
        else {
            if (root.left == null)  return root.right;
            if (root.right == null) return root.left;
            TreeNode succ = root.right;
            while (succ.left != null) succ = succ.left;
            root.val   = succ.val;
            root.right = deleteNode(root.right, succ.val);
        }
        return root;
    }
}
```

**Complexity:** undefined
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Delete in BST"** → search first, then 0/1/2 case.
- **"Two children"** → copy successor value, delete successor — not full node swap.
- **"Return root"** → every call returns updated subtree head for parent assignment.
- **"Same search as Day 11"** → `<` left, `>` right until found or null.

If Case 2 confused you, redraw the three-case diagram from the concept page before reattempting.

> 🎯 **Pattern Unlocked:** BST Delete Cases — 0/1 bypass, 2 = successor copy + delete.

---

*Both quests complete. Head to the checkpoint. →*
