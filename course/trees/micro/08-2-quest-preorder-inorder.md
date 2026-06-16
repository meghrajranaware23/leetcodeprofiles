<!-- hand-authored -->
# ⚔ Quest: Construct from Preorder & Inorder

> **Day 8** · [Construct Binary Tree from Preorder and Inorder Traversal #105](https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/) · Medium · 15 min · 20 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Construct Binary Tree from Preorder and Inorder Traversal on LeetCode](https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. Mark `pre[0]` as root, draw the inorder split line. The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Construct Binary Tree from Preorder and Inorder Traversal #105](https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? **Divide and conquer construction** — root = `pre[ps]`; find root in inorder at index `k`; `leftSize = k - is`; left subtree gets `pre[ps+1 .. ps+leftSize]`, right gets the rest.

If you're stuck after 5 minutes: hash inorder values to indices. Base case: `ps > pe` → null. Inorder tells you **how many** nodes belong left vs right.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Divide and Conquer Construction

**How to identify this from the problem statement:**
- **Two traversals given** — one names root (preorder first), one splits (inorder)
- **Unique tree** — deterministic left/right sizes
- Recursive **range shrink** on both arrays

| Keyword / phrase | What it signals |
|---|---|
| "preorder and inorder" | Root = pre[0], split inorder |
| "construct binary tree" | Recursive build on index ranges |
| "unique" | leftSize = k - is, no ambiguity |
| "build left and right subtree" | Two recursive calls with computed bounds |

**Why this pattern works:** Preorder says *who* is root; inorder says *what's left vs right*. `leftSize` tells preorder how many nodes the left recursive call consumes.

**How a strong solver thinks before coding:**
1. *"Map inorder value → index."*
2. *"root = TreeNode(pre[ps]); k = idx[pre[ps]]."*
3. *"leftSize = k - is."*
4. *"Left: pre[ps+1..ps+leftSize], in[is..k-1]. Right: rest."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Linear scan inorder each call** | O(n²) — hash map to O(n) total |
| **Wrong right subtree pre bounds** | Right starts at `ps + leftSize + 1`, not `ps + 1` |
| **Try every node as root** | Ignores preorder's first-element guarantee |
| **Off-by-one on leftSize** | Corrupts entire tree shape |

**The insight brute force misses:** `leftSize = k - is` is the only size you need — preorder and inorder ranges follow from it.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Construct from Inorder and Postorder #106](https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/) | Root = post[last], build right first | Same inorder split |
| [Construct from Preorder and Postorder #889](https://leetcode.com/problems/construct-binary-tree-from-preorder-and-postorder-traversal/) | Need uniqueness / length check | Variant bounds |
| [Maximum Binary Tree #654](https://leetcode.com/problems/maximum-binary-tree/) | Find max in range as root | Same split idea |

All: **pick root → split inorder → recurse on halves**.

---

## 📖 Walkthrough

**pre[0] = root → split inorder → recurse.**

```
preorder:  [3, 9, 20, 15, 7]
inorder:   [9, 3, 15, 20, 7]

root = 3 (pre[0])
inorder:   [9 | 3 | 15, 20, 7]
            ←1→     ←──2──→
          leftSize=1

Left build:  pre[1..1]=[9],   in[0..0]=[9]   → node 9
Right build: pre[2..4],       in[2..4]       → subtree 20

        3
       / \
      9   20
         /  \
        15   7
```

> 💡 **The insight:** Left subtree always consumes the next `leftSize` elements of preorder — that's why right starts at `ps + leftSize + 1`.

---

## Solution

### C++
```cpp
class Solution {
    unordered_map<int,int> idx;
    int pre;
    TreeNode* build(vector<int>& preorder, int l, int r) {
        if (l > r) return nullptr;
        int val = preorder[pre++];
        TreeNode* node = new TreeNode(val);
        node->left  = build(preorder, l, idx[val] - 1);
        node->right = build(preorder, idx[val] + 1, r);
        return node;
    }
public:
    TreeNode* buildTree(vector<int>& preorder, vector<int>& inorder) {
        pre = 0;
        for (int i = 0; i < (int)inorder.size(); i++) idx[inorder[i]] = i;
        return build(preorder, 0, inorder.size() - 1);
    }
};
```

### Python
```python
class Solution:
    def buildTree(self, preorder: List[int], inorder: List[int]) -> Optional[TreeNode]:
        idx = {v: i for i, v in enumerate(inorder)}
        self.pre = 0
        def build(l, r):
            if l > r: return None
            val = preorder[self.pre]; self.pre += 1
            node = TreeNode(val)
            node.left  = build(l, idx[val] - 1)
            node.right = build(idx[val] + 1, r)
            return node
        return build(0, len(inorder) - 1)
```

### Java
```java
class Solution {
    private Map<Integer,Integer> idx = new HashMap<>();
    private int pre = 0;
    public TreeNode buildTree(int[] preorder, int[] inorder) {
        for (int i = 0; i < inorder.length; i++) idx.put(inorder[i], i);
        return build(preorder, 0, inorder.length - 1);
    }
    private TreeNode build(int[] preorder, int l, int r) {
        if (l > r) return null;
        int val = preorder[pre++];
        TreeNode node = new TreeNode(val);
        node.left  = build(preorder, l, idx.get(val) - 1);
        node.right = build(preorder, idx.get(val) + 1, r);
        return node;
    }
}
```

**Complexity:** undefined
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Preorder first = root"** → Always `pre[ps]`.
- **"Inorder split"** → `k = idx[root]`, `leftSize = k - is`.
- **"Right pre starts after left block"** → `ps + leftSize + 1`.
- **"Hash inorder"** → O(1) lookup per call.

If your tree shape is wrong but root is right, check off-by-one on `leftSize` bounds.

> 🎯 **Pattern Unlocked:** Divide and Conquer Construction — pre[0] root, inorder split, range recurse.

---

*One quest down. Next: the mirror variant with postorder last. →*
