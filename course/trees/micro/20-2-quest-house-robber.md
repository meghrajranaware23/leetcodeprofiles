<!-- hand-authored -->
# ⚔ Quest: House Robber III

> **Day 20** · [House Robber III #337](https://leetcode.com/problems/house-robber-iii/) · Medium · 15 min · 35 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open House Robber III on LeetCode](https://leetcode.com/problems/house-robber-iii/)**

> ⚔ **Hunter's rule:** Draw a small tree. For each node, write `(rob, skip)` after children return. The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[House Robber III #337](https://leetcode.com/problems/house-robber-iii/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? **Tree DP rob/skip** — postorder returns `(with, without)`. Rob current → add `left.without + right.without`. Skip → `max(left) + max(right)`.

If you're stuck after 5 minutes: same spirit as Recursion pack **#198 array** robber, but pairs bubble from children on a tree.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Tree DP Rob/Skip

**How to identify this from the problem statement:**
- Maximize sum with tree adjacency constraint
- Parent-child = cannot both rob
- Binary tree structure

| Keyword / phrase | What it signals |
|---|---|
| "house robber" + tree | Postorder (rob, skip) |
| "no two directly linked" | Rob forces children skipped |
| "maximum amount" | max(root pair) |
| "return non-negative" | Standard combine |

**Why this pattern works:** Subtree optimal depends only on child `(rob, skip)` — classic optimal substructure. Postorder ensures children resolved first.

**How a strong solver thinks before coding:**
1. *"null → (0, 0)."*
2. *"Get (lr, ls), (rr, rs) from children."*
3. *"rob = val + ls + rs."*
4. *"skip = max(lr,ls) + max(rr,rs)."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Enumerate all subsets** | O(2^n) |
| **Greedy by value** | High node may sit above another high node |
| **Single return value** | Need both rob and skip states |
| **Top-down without child answers** | Can't decide parent before subtree |

**The insight brute force misses:** Two numbers per node capture all downstream choices — O(n) postorder.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [House Robber #198](https://leetcode.com/problems/house-robber/) | Recursion pack — array | Rob/skip intuition |
| [House Robber II #213](https://leetcode.com/problems/house-robber-ii/) | Circular array | Two linear passes |
| [Binary Tree Cameras #968](https://leetcode.com/problems/binary-tree-cameras/) | B-Rank test — 3-state | Postorder states |

---

## 📖 Walkthrough

```
        3
       / \
      2   3
       \   \
        3   1

Leaves: (2,0), (3,0), (1,0)
Node 2 (right child 3): rob=2+0=2, skip=3 → (2,3)
Node 3 (right child 1): rob=3+0=3, skip=1 → (3,1)
Root 3: rob=3+0+0=3, skip=max(2,3)+max(3,1)=4+4=8? 
Trace carefully on paper — answer max(rob, skip) at root.
```

> 💡 **The insight:** Robbing node `v` forces using each child's **skip** branch only.

---

## Solution

### C++
```cpp
class Solution {
    pair<int,int> dfs(TreeNode* node) {
        if (!node) return {0, 0};
        auto [ll, lr] = dfs(node->left);
        auto [rl, rr] = dfs(node->right);
        int rob    = node->val + ll + rl;
        int no_rob = max(ll, lr) + max(rl, rr);
        return {rob, no_rob};
    }
public:
    int rob(TreeNode* root) {
        auto [a, b] = dfs(root);
        return max(a, b);
    }
};
```

### Python
```python
class Solution:
    def rob(self, root: Optional[TreeNode]) -> int:
        def dfs(node):
            # returns (rob_this, skip_this)
            if not node: return 0, 0
            ll, lr = dfs(node.left)
            rl, rr = dfs(node.right)
            return node.val + ll + rl, max(ll, lr) + max(rl, rr)
        return max(dfs(root))
```

### Java
```java
class Solution {
    public int rob(TreeNode root) {
        int[] res = dfs(root);
        return Math.max(res[0], res[1]);
    }
    private int[] dfs(TreeNode node) {
        if (node == null) return new int[]{0, 0};
        int[] l = dfs(node.left), r = dfs(node.right);
        int rob   = node.val + l[0] + r[0];
        int noRob = Math.max(l[0], l[1]) + Math.max(r[0], r[1]);
        return new int[]{rob, noRob};
    }
}
```

**Complexity:** undefined
---

## 💭 What Should Have Clicked in Your Mind?

- **"House robber on tree"** → postorder pair.
- **"Rob → children skip"** → `val + l[skip] + r[skip]`.
- **"#198 on a tree"** → same rob/skip, different topology.
- **"max of root pair"** → final answer.

> 🎯 **Pattern Unlocked:** Tree DP Rob/Skip

---

*One quest down. Next: zigzag with direction state. →*
