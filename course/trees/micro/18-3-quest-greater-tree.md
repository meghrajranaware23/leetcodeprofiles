<!-- hand-authored -->
# ⚔ Quest: Convert BST to Greater Tree

> **Day 18** · [Convert BST to Greater Tree #538](https://leetcode.com/problems/convert-bst-to-greater-tree/) · Medium · 15 min · 35 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Convert BST to Greater Tree on LeetCode](https://leetcode.com/problems/convert-bst-to-greater-tree/)**

> ⚔ **Hunter's rule:** Draw a BST. Write reverse inorder order (right subtree first). Track running total. The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Convert BST to Greater Tree #538](https://leetcode.com/problems/convert-bst-to-greater-tree/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? **Reverse inorder with running sum** — `dfs(right)` → add to `total` → set `node.val = total` → `dfs(left)`.

If you're stuck after 5 minutes: normal inorder is ascending; reverse visits **largest first**. Each node should include all values already seen (all greater nodes).

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Reverse Inorder

**How to identify this from the problem statement:**
- BST structure given
- Each node → original + sum of all greater nodes
- In-place value update

| Keyword / phrase | What it signals |
|---|---|
| "BST" + "greater" | Reverse inorder |
| "all nodes greater than current" | Visit larger values before current |
| "convert in place" | Global/ref `total` during DFS |
| "sum of all keys greater" | Running accumulation |

**Why this pattern works:** Reverse inorder on BST = descending sort. When you reach a node, `total` holds sum of every node visited so far (all strictly larger values).

**How a strong solver thinks before coding:**
1. *"Right → node → left."*
2. *"total += node.val; node.val = total."*
3. *"Member variable or closure for total."*
4. *"Not normal inorder — that's ascending."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Inorder left-first** | Accumulates smaller values — wrong direction |
| **Store all values, prefix from end** | O(n) array — one DFS pass suffices |
| **BFS on BST** | Loses sorted visit order |
| **Per-node search for greater nodes** | O(n²) |

**The insight brute force misses:** BST order + reversed visit = one O(n) pass with O(h) stack.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Kth Smallest in BST #230](https://leetcode.com/problems/kth-smallest-element-in-a-bst/) | Day 12 — forward inorder | Opposite direction |
| [BST Iterator #173](https://leetcode.com/problems/binary-search-tree-iterator/) | Lazy forward inorder | Stack simulates order |
| [Merge BSTs #981](https://leetcode.com/problems/range-sum-of-bst/) | Range filter | Inorder with bounds |

---

## 📖 Walkthrough

```
BST:     4
        / \
       2   6
      / \ / \
     1  3 5  7

Reverse inorder: 7, 6, 5, 4, 3, 2, 1

total: 0→7→13→18→22→25→27→28
node values become: 7,13,18,22,25,27,28
```

> 💡 **The insight:** `total` is the "suffix sum" of all nodes not yet visited in reverse order.

---

## Solution

### C++
```cpp
class Solution {
    int total = 0;
    void dfs(TreeNode* node) {
        if (!node) return;
        dfs(node->right);
        total += node->val;
        node->val = total;
        dfs(node->left);
    }
public:
    TreeNode* convertBST(TreeNode* root) {
        dfs(root);
        return root;
    }
};
```

### Python
```python
class Solution:
    def convertBST(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        self.total = 0
        def dfs(node):
            if not node: return
            dfs(node.right)
            self.total += node.val
            node.val = self.total
            dfs(node.left)
        dfs(root)
        return root
```

### Java
```java
class Solution {
    private int total = 0;
    public TreeNode convertBST(TreeNode root) {
        dfs(root);
        return root;
    }
    private void dfs(TreeNode node) {
        if (node == null) return;
        dfs(node.right);
        total += node.val;
        node.val = total;
        dfs(node.left);
    }
}
```

**Complexity:** undefined
---

## 💭 What Should Have Clicked in Your Mind?

- **"Greater than all to the right in BST"** → reverse inorder.
- **"Right before left"** → descending visit.
- **"Running total global"** → suffix sum state.
- **"Day 12 inorder flipped"** → same BST order machinery.

> 🎯 **Pattern Unlocked:** Reverse Inorder

---

*Both quests complete. Head to the checkpoint. →*
