<!-- hand-authored -->
# ⚔ Quest: Diameter of Binary Tree

> **Day 7** · [Diameter of Binary Tree #543](https://leetcode.com/problems/diameter-of-binary-tree/) · Easy · 10 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Diameter of Binary Tree on LeetCode](https://leetcode.com/problems/diameter-of-binary-tree/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. At each node write **return height** and **global candidate l+r**. The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Diameter of Binary Tree #543](https://leetcode.com/problems/diameter-of-binary-tree/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? **Bottom-up with global update** — `dfs` returns height; at each node `ans = max(ans, leftH + rightH)`; return `1 + max(leftH, rightH)` to parent.

If you're stuck after 5 minutes: diameter is the longest path between **any two nodes** — it may live entirely in a subtree. Top-down depth from root won't find it.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Bottom-Up with Global Update

**How to identify this from the problem statement:**
- **"Longest path between any two nodes"** → may bend at any node, not root-to-leaf
- **Not "from root"** → bottom-up, not Day 6 remainder
- One function, two roles: return height + update global

| Keyword / phrase | What it signals |
|---|---|
| "diameter" / "longest path" | Global `l + r`, return height |
| "may or may not pass through root" | Every node is a potential bend point |
| "number of edges" | Diameter = `leftH + rightH` (heights are edge counts) |
| "subtree" | Recurse; best may be fully inside one child |

**Why this pattern works:** At node `N`, the longest path **through** `N` uses left height + right height. The global best might be that path, or something entirely in a child — hence `max` at every node.

**How a strong solver thinks before coding:**
1. *"null → return 0 height."*
2. *"l = dfs(left), r = dfs(right)."*
3. *"ans = max(ans, l + r) — cross-subtree through me."*
4. *"return 1 + max(l, r) — one branch up to parent."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Top-down depth from root** | Misses diameter wholly inside a subtree |
| **Return l + r to parent** | Parent can only extend one branch — corrupts height |
| **Two-pass (height then diameter)** | Works but one DFS is cleaner |
| **Store all paths O(n²)** | Single post-order pass suffices |
| **Count nodes instead of edges** | Problem asks for edge count: `l + r`, not `l + r + 1` |

**The insight brute force misses:** Height return and diameter global are **different values** at the same node — don't conflate them.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Binary Tree Maximum Path Sum #124](https://leetcode.com/problems/binary-tree-maximum-path-sum/) | Values + negative clamp | Return one-branch gain, global `val+l+r` |
| [Maximum Depth #104](https://leetcode.com/problems/maximum-depth-of-binary-tree/) | Pure height, no global | Same return, no cross update |
| [Longest Univalue Path #687](https://leetcode.com/problems/longest-univalue-path/) | Same-value constraint | Dual-role dfs + global |

Same skeleton: **return for parent, global for cross-subtree best**.

---

## 📖 Walkthrough

**Height bubbles up; global captures l+r at every node.**

```
        1
       / \
      2   3
     / \
    4   5

dfs(4): return 1
dfs(5): return 1
dfs(2): l=1, r=1 → ans=max(0,2)=2  return 2   ← path 4–2–5
dfs(3): return 1
dfs(1): l=2, r=1 → ans=max(2,3)=3  return 3   ← path 4–2–1–3

Answer: 3 edges ✓
```

Dual role at node 2:

```
        2
       / \
   h=1   h=1

GLOBAL: 1 + 1 = 2  (diameter through 2)
RETURN: 1 + max(1,1) = 2  (height offered to parent 1)
```

> 💡 **The insight:** Node 1's return (3) is height — not diameter. Diameter (3) lives in `ans`, updated when `l=2, r=1`.

---

## Solution

### C++
```cpp
class Solution {
    int ans = 0;
    int depth(TreeNode* node) {
        if (!node) return 0;
        int l = depth(node->left), r = depth(node->right);
        ans = max(ans, l + r);
        return 1 + max(l, r);
    }
public:
    int diameterOfBinaryTree(TreeNode* root) {
        depth(root);
        return ans;
    }
};
```

### Python
```python
class Solution:
    def diameterOfBinaryTree(self, root: Optional[TreeNode]) -> int:
        self.ans = 0
        def depth(node):
            if not node: return 0
            l, r = depth(node.left), depth(node.right)
            self.ans = max(self.ans, l + r)
            return 1 + max(l, r)
        depth(root)
        return self.ans
```

### Java
```java
class Solution {
    private int ans = 0;
    public int diameterOfBinaryTree(TreeNode root) {
        depth(root);
        return ans;
    }
    private int depth(TreeNode node) {
        if (node == null) return 0;
        int l = depth(node.left), r = depth(node.right);
        ans = Math.max(ans, l + r);
        return 1 + Math.max(l, r);
    }
}
```

**Complexity:** undefined
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Longest path anywhere"** → Not Day 6 root-to-leaf — bottom-up global.
- **"Return height, track diameter separately"** → Two roles, one dfs.
- **"l + r at each node"** → Cross-subtree candidate for global.
- **"1 + max(l,r) upward"** → Parent extends one branch only.

If you returned `l + r` from dfs, the parent would misinterpret it as height.

> 🎯 **Pattern Unlocked:** Bottom-Up with Global Update — height return, diameter in `ans`.

---

*One quest down. Next: the same dual-role pattern with node values. →*
