<!-- hand-authored -->
# ⚔ Quest: Cousins in Binary Tree

> **Day 22** · [Cousins in Binary Tree #993](https://leetcode.com/problems/cousins-in-binary-tree/) · Easy · 10 min · 35 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Cousins in Binary Tree on LeetCode](https://leetcode.com/problems/cousins-in-binary-tree/)**

> ⚔ **Hunter's rule:** Cousins = same depth, different parents. Track `(parent, depth)` when you find x and y. The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Cousins in Binary Tree #993](https://leetcode.com/problems/cousins-in-binary-tree/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? **BFS parent tracking** — queue `(node, parent, depth)` OR DFS passing `(parent, depth)` down. Record both targets; answer `sameDepth && differentParent`.

If you're stuck after 5 minutes: siblings fail because they share a parent at the same depth.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** BFS Parent Tracking

**How to identify this from the problem statement:**
- Two target values x, y
- "Cousins" definition — depth + parent
- Not asking for LCA or path

| Keyword / phrase | What it signals |
|---|---|
| "cousins" | Same depth, different parent |
| "same depth" | Track depth per node |
| "not siblings" | Parent pointer matters |
| "binary tree" | Standard child links |

**Why this pattern works:** Depth locates the level; parent distinguishes siblings from cousins. One traversal records `(parent, depth)` for x and y.

**How a strong solver thinks before coding:**
1. *"Traverse with parent and depth."*
2. *"On x: save (xPar, xDepth)."*
3. *"On y: save (yPar, yDepth)."*
4. *"return xDepth==yDepth && xPar!=yPar."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Same depth only** | Siblings also same depth |
| **Same parent only** | Would mean siblings |
| **Find LCA and compare** | Overkill — parent+depth suffices |
| **Store all nodes at depth** | Wasteful vs two target lookups |

**The insight brute force misses:** Two scalars per target — parent pointer + depth — decide everything.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [LCA #236](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/) | Day 13 — split point | Different question |
| [Deepest Leaves Sum #1302](https://leetcode.com/problems/deepest-leaves-sum/) | Today's second quest | BFS level focus |
| [Binary Tree Level Order #102](https://leetcode.com/problems/binary-tree-level-order-traversal/) | Day 3 — full levels | Same BFS engine |

---

## 📖 Walkthrough

```
        1
       / \
      2   3
     / \
    4   5

Are 4 and 5 cousins?
  4: parent=2, depth=2
  5: parent=2, depth=2
  Same depth ✓, same parent ✗ → siblings, not cousins

Are 4 and 3 cousins?
  4: parent=2, depth=2
  3: parent=1, depth=1
  Different depth → not cousins
```

> 💡 **The insight:** Parent tracking is **new vs Day 17** — view problems didn't need who the parent was.

---

## Solution

### C++
```cpp
class Solution {
public:
    bool isCousins(TreeNode* root, int x, int y) {
        int xDepth, yDepth; TreeNode *xPar = nullptr, *yPar = nullptr;
        function<void(TreeNode*, TreeNode*, int)> dfs = [&](TreeNode* node, TreeNode* par, int d) {
            if (!node) return;
            if (node->val == x) { xDepth = d; xPar = par; }
            if (node->val == y) { yDepth = d; yPar = par; }
            dfs(node->left, node, d+1);
            dfs(node->right, node, d+1);
        };
        dfs(root, nullptr, 0);
        return xDepth == yDepth && xPar != yPar;
    }
};
```

### Python
```python
class Solution:
    def isCousins(self, root: Optional[TreeNode], x: int, y: int) -> bool:
        info = {}
        def dfs(node, parent, depth):
            if not node: return
            if node.val in (x, y):
                info[node.val] = (parent, depth)
            dfs(node.left,  node, depth + 1)
            dfs(node.right, node, depth + 1)
        dfs(root, None, 0)
        return info[x][1] == info[y][1] and info[x][0] is not info[y][0]
```

### Java
```java
class Solution {
    private int xDepth, yDepth;
    private TreeNode xPar, yPar;
    public boolean isCousins(TreeNode root, int x, int y) {
        dfs(root, null, 0, x, y);
        return xDepth == yDepth && xPar != yPar;
    }
    private void dfs(TreeNode node, TreeNode par, int d, int x, int y) {
        if (node == null) return;
        if (node.val == x) { xDepth = d; xPar = par; }
        if (node.val == y) { yDepth = d; yPar = par; }
        dfs(node.left,  node, d+1, x, y);
        dfs(node.right, node, d+1, x, y);
    }
}
```

**Complexity:** undefined
---

## 💭 What Should Have Clicked in Your Mind?

- **"Cousins"** → depth + parent, not just depth.
- **"(node, parent, depth)"** → Day 22 queue metadata (DFS equivalent here).
- **"Siblings trap"** → same parent fails.
- **"Not LCA problem"** → two lookups suffice.

> 🎯 **Pattern Unlocked:** BFS Parent Tracking

---

*One quest down. Next: sum every node at the deepest level. →*
