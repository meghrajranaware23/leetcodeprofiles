<!-- hand-authored -->
# ⚔ Quest: BST from Preorder

> **Day 16** · [Construct Binary Search Tree from Preorder Traversal #1008](https://leetcode.com/problems/construct-binary-search-tree-from-preorder-traversal/) · Medium · 15 min · 20 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Construct Binary Search Tree from Preorder Traversal on LeetCode](https://leetcode.com/problems/construct-binary-search-tree-from-preorder-traversal/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. Read preorder left-to-right; track upper bound. When val > bound, subtree ends. The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Construct Binary Search Tree from Preorder Traversal #1008](https://leetcode.com/problems/construct-binary-search-tree-from-preorder-traversal/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? **Monotonic stack upper-bound** — recursive: if `preorder[i] > bound`, return null; left gets bound `node.val`, right keeps parent bound.

If you're stuck after 5 minutes: no `#` markers needed — BST order tells you when a subtree stops. One index `i` advances through array.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** BST Construction

**How to identify this from the problem statement:**
- "Construct BST from preorder" → single array, BST property
- No inorder given — bounds replace the split index
- O(n) one-pass expected

| Keyword / phrase | What it signals |
|---|---|
| "BST from preorder" | Upper-bound recursion |
| "monotonically increasing stack" | Iterative equivalent |
| "preorder traversal" | Read with index i |
| "binary search tree" | Left < root < right globally |

**Why this pattern works:** Preorder gives roots before subtrees. BST bound tells you where each subtree ends — next value too large means return to parent level.

**How a strong solver thinks before coding:**
1. *"Global index i into preorder."*
2. *"build(bound): if i>=n or pre[i]>bound → null."*
3. *"node = pre[i++]; node.left = build(node.val); node.right = build(bound)."*
4. *"Start with build(+∞)."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Sort + construct like Day 8** | O(n log n) — miss O(n) bound trick |
| **Insert one-by-one (#701 loop)** | O(n h) — worse than linear |
| **Preorder + inorder split** | Needs inorder — not provided |
| **Same bound for both children** | Left must cap at node.val |

**The insight brute force misses:** Upper bound **is** the inorder split — values exceeding bound belong to ancestor's right path.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Serialize Deserialize #297](https://leetcode.com/problems/serialize-and-deserialize-binary-tree/) | Today's other quest | Preorder decode — needs `#` |
| [Validate BST #98](https://leetcode.com/problems/validate-binary-search-tree/) | Day 11 — check not build | Same bound idea |
| [Construct from Preorder + Inorder #105](https://leetcode.com/problems/construct-binary-search-tree-from-preorder-and-inorder-traversal/) | Day 8 — two arrays | Split index vs upper bound |

Same preorder consumption — BST property collapses encoding.

---

## 📖 Walkthrough

**preorder = [8, 5, 1, 7, 10, 12]:**

```
build(∞):
  8 → left build(8):
    5 → left build(5): 1 ✓
        right build(5): 7 ✓
  8 → right build(∞):
    10 → left build(10): null (12>10... wait 12>10 so left null)
         right build(∞): 12 ✓

Tree:
      8
     / \
    5   10
   / \    \
  1   7   12
```

> 💡 **The insight:** When `pre[i] > bound`, you've finished the current subtree — pop back to parent scope. Stack version pops while top > current.

---

## Solution

### C++
```cpp
class Solution {
    int i = 0;
    TreeNode* build(vector<int>& pre, int lo, int hi) {
        if (i == (int)pre.size() || pre[i] < lo || pre[i] > hi) return nullptr;
        TreeNode* node = new TreeNode(pre[i++]);
        node->left  = build(pre, lo, node->val - 1);
        node->right = build(pre, node->val + 1, hi);
        return node;
    }
public:
    TreeNode* bstFromPreorder(vector<int>& preorder) {
        return build(preorder, INT_MIN, INT_MAX);
    }
};
```

### Python
```python
class Solution:
    def bstFromPreorder(self, preorder: List[int]) -> Optional[TreeNode]:
        self.i = 0
        def build(lo, hi):
            if self.i == len(preorder) or not (lo <= preorder[self.i] <= hi):
                return None
            val = preorder[self.i]; self.i += 1
            node = TreeNode(val)
            node.left  = build(lo, val - 1)
            node.right = build(val + 1, hi)
            return node
        return build(float('-inf'), float('inf'))
```

### Java
```java
class Solution {
    private int i = 0;
    public TreeNode bstFromPreorder(int[] preorder) {
        return build(preorder, Integer.MIN_VALUE, Integer.MAX_VALUE);
    }
    private TreeNode build(int[] pre, int lo, int hi) {
        if (i == pre.length || pre[i] < lo || pre[i] > hi) return null;
        TreeNode node = new TreeNode(pre[i++]);
        node.left  = build(pre, lo, node.val - 1);
        node.right = build(pre, node.val + 1, hi);
        return node;
    }
}
```

**Complexity:** undefined
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"BST from preorder only"** → upper-bound build, not Day 8 split.
- **"pre[i] > bound → null"** → subtree boundary test.
- **"Left bound = node.val"** → all left values smaller.
- **"No # markers"** → BST order encodes structure.

If you used inorder array, simplify — bound recursion is the intended O(n) path.

> 🎯 **Pattern Unlocked:** BST Construction — monotonic upper-bound from preorder.

---

*Both quests complete. Head to the checkpoint. →*
