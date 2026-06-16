<!-- hand-authored -->
# ⚔ Quest: Construct from Inorder & Postorder

> **Day 8** · [Construct Binary Tree from Inorder and Postorder Traversal #106](https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/) · Medium · 15 min · 20 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Construct Binary Tree from Inorder and Postorder Traversal on LeetCode](https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. Root = `post[pe]` (last). Build **right subtree before left**. The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Construct Binary Tree from Inorder and Postorder Traversal #106](https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? **Reverse construction** — root = `post[pe]`; find in inorder; `rightSize = ie - k`; build **right** first (`post[pe-rightSize .. pe-1]`), then left.

If you're stuck after 5 minutes: postorder reads root **last**, so you consume from the end — right subtree appears before left in the postorder tail. Same inorder split as #105, reversed build order.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Reverse Construction

**How to identify this from the problem statement:**
- **Postorder last element = root** — mirror of preorder first
- **Inorder still splits** left | root | right
- Build right before left — postorder processes children before parent

| Keyword / phrase | What it signals |
|---|---|
| "inorder and postorder" | Root = post[last], rightSize = ie - k |
| "last node in postorder" | Root at `pe` index |
| "construct" + two arrays | Hash inorder, range recurse |
| Same tree as pre+in variant | Split identical; build order reversed |

**Why this pattern works:** Postorder ends with root. Everything before root in postorder is children — right subtree occupies the **tail** before root, sized by `rightSize = ie - k`.

**How a strong solver thinks before coding:**
1. *"root = post[pe]; k = idx[root]."*
2. *"rightSize = ie - k."*
3. *"Build RIGHT: in[k+1..ie], post[pe-rightSize..pe-1]."*
4. *"Build LEFT: in[is..k-1], post[ps..pe-rightSize-1]."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Same code as pre+in without swapping order** | Wrong child assignment |
| **leftSize instead of rightSize** | Postorder variant sizes from the right |
| **Build left before right** | Consumes wrong postorder segment |
| **Scan inorder linearly** | O(n²) — use hash map |

**The insight brute force misses:** Pre+in grows preorder from the front; in+post shrinks postorder from the back — symmetric but reversed consumption direction.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Construct from Preorder and Inorder #105](https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/) | Root = pre[0], left first | Same inorder split |
| [Construct from Preorder and Postorder #889](https://leetcode.com/problems/construct-binary-tree-from-preorder-and-postorder-traversal/) | Unique tree constraint | Variant sizing |
| [Serialize and Deserialize BT #297](https://leetcode.com/problems/serialize-and-deserialize-binary-tree/) | String format | Same recursive build idea |

Mirror pair: **#105 front-root**, **#106 back-root**.

---

## 📖 Walkthrough

**Reverse construction — root from post tail, right before left.**

```
inorder:   [9, 3, 15, 20, 7]
postorder: [9, 15, 7, 20, 3]

root = post[4] = 3
inorder:   [9 | 3 | 15, 20, 7]
rightSize = 4 - 1 = 2

RIGHT first: in[2..4], post[2..3] = [15,7,20] → subtree 20
LEFT second: in[0..0], post[0..0] = [9]       → node 9

        3
       / \
      9   20
         /  \
        15   7
```

Compare to #105 — same tree, root discovered from opposite end of the "root list."

> 💡 **The insight:** `rightSize = ie - k` plays the same role as `leftSize = k - is` in preorder variant — it sizes the **first** recursive call (right, here).

---

## Solution

### C++
```cpp
class Solution {
    unordered_map<int,int> idx;
    int post;
    TreeNode* build(vector<int>& postorder, int l, int r) {
        if (l > r) return nullptr;
        int val = postorder[post--];
        TreeNode* node = new TreeNode(val);
        node->right = build(postorder, idx[val] + 1, r);
        node->left  = build(postorder, l, idx[val] - 1);
        return node;
    }
public:
    TreeNode* buildTree(vector<int>& inorder, vector<int>& postorder) {
        post = postorder.size() - 1;
        for (int i = 0; i < (int)inorder.size(); i++) idx[inorder[i]] = i;
        return build(postorder, 0, inorder.size() - 1);
    }
};
```

### Python
```python
class Solution:
    def buildTree(self, inorder: List[int], postorder: List[int]) -> Optional[TreeNode]:
        idx = {v: i for i, v in enumerate(inorder)}
        def build(l, r):
            if l > r: return None
            val = postorder.pop()
            node = TreeNode(val)
            node.right = build(idx[val] + 1, r)
            node.left  = build(l, idx[val] - 1)
            return node
        return build(0, len(inorder) - 1)
```

### Java
```java
class Solution {
    private Map<Integer,Integer> idx = new HashMap<>();
    private int post;
    public TreeNode buildTree(int[] inorder, int[] postorder) {
        post = postorder.length - 1;
        for (int i = 0; i < inorder.length; i++) idx.put(inorder[i], i);
        return build(postorder, 0, inorder.length - 1);
    }
    private TreeNode build(int[] postorder, int l, int r) {
        if (l > r) return null;
        int val = postorder[post--];
        TreeNode node = new TreeNode(val);
        node.right = build(postorder, idx.get(val) + 1, r);
        node.left  = build(postorder, l, idx.get(val) - 1);
        return node;
    }
}
```

**Complexity:** undefined
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Postorder last = root"** → `post[pe]`, not `post[0]`.
- **"rightSize = ie - k"** → Mirror of leftSize in #105.
- **"Right before left"** → Postorder reads children before parent, right subtree in tail.
- **"Same inorder split"** → Only root discovery and build order differ from #105.

If left and right swap, you likely built left first or used leftSize instead of rightSize.

> 🎯 **Pattern Unlocked:** Reverse Construction — post[last] root, rightSize split, build right first.

---

*Both quests complete. Head to the checkpoint. →*
