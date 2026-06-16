<!-- hand-authored -->
# ⚔ Quest: Maximum Path Sum

> **Day 7** · [Binary Tree Maximum Path Sum #124](https://leetcode.com/problems/binary-tree-maximum-path-sum/) · Hard · 25 min · 20 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Binary Tree Maximum Path Sum on LeetCode](https://leetcode.com/problems/binary-tree-maximum-path-sum/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. At each node draw **global: val+l+r** vs **return: val+max(l,r,0)**. The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Binary Tree Maximum Path Sum #124](https://leetcode.com/problems/binary-tree-maximum-path-sum/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? **Bottom-up path optimization** — same dual-role as diameter, but with values: global `ans = max(ans, node.val + l + r)`; return `node.val + max(l, r, 0)` (clamp negatives to 0).

If you're stuck after 5 minutes: the best path (e.g. 15→20→7) **bends** at 20 — parent can only take ONE branch upward, so return ≠ global.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Bottom-Up Path Optimization

**How to identify this from the problem statement:**
- **"Maximum path sum"** without "root-to-leaf" → any start, any end
- **Negative values allowed** → `max(0, dfs(child))` — skip losing branches
- Path can be a single node → initialize `ans = -∞`

| Keyword / phrase | What it signals |
|---|---|
| "any node" start/end | Cross-subtree global update |
| "path sum" + not root-to-leaf | Bottom-up, not Day 6 |
| "negative node values" | Clamp child gains: `max(0, dfs(child))` |
| "maximum" across tree | Global tracks best; return offers one branch |

**Why this pattern works:** At node 20, path 15–20–7 uses **both** children — that's the global candidate. Parent -10 can only extend through **one** side — that's the return value.

**How a strong solver thinks before coding:**
1. *"null → return 0."*
2. *"l = max(0, dfs(left)), r = max(0, dfs(right))."*
3. *"ans = max(ans, node.val + l + r)."*
4. *"return node.val + max(l, r) — one branch for parent."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Day 6 top-down remainder** | Only root-to-leaf threads — misses bent paths |
| **Return val+l+r to parent** | Parent can't use both branches — wrong upward contract |
| **No negative clamp** | Negative subtree drags return below 0 incorrectly |
| **Global only, no return** | Parent can't extend path through current node |
| **All paths enumeration O(n²)** | Single post-order O(n) |

**The insight brute force misses:** Global and return answer **different questions** at the same node — cross-subtree vs single-branch extension.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Diameter of Binary Tree #543](https://leetcode.com/problems/diameter-of-binary-tree/) | Edge count, no values | `l+r` global, height return |
| [Longest Univalue Path #687](https://leetcode.com/problems/longest-univalue-path/) | Same-value edges | Dual-role + global |
| [Path Sum #112](https://leetcode.com/problems/path-sum/) | Root-to-leaf only | **Day 6** — not this pattern |

Diameter is the template; max path sum adds values and negative clamping.

---

## 📖 Walkthrough

**Cross-subtree combine at each node — diagram from concept page.**

```
Tree:      -10
          /  \
         9   20
            /  \
           15   7

At node 20:
  l = 15,  r = 7
  GLOBAL: 20 + 15 + 7 = 42  → ans = 42
  RETURN: 20 + max(15,7) = 35  (up to parent)

At node -10:
  l = 9,  r = 35
  GLOBAL: -10 + 9 + 35 = 34  (not better than 42)
  RETURN: -10 + 35 = 25

Best path: 15 → 20 → 7  (sum 42) — bends at 20, not at root.
```

```
        15 ──┐
             ├── 20 ── 7     ← ans uses BOTH sides
             │
        return to -10 uses ONLY the 35-chain (one branch)
```

> 💡 **The insight:** `max(0, dfs(child))` means "if subtree hurts, pretend it's empty." Negative -10 at root doesn't kill the 42-path inside the right subtree.

---

## Solution

### C++
```cpp
class Solution {
    int ans = INT_MIN;
    int gain(TreeNode* node) {
        if (!node) return 0;
        int l = max(0, gain(node->left));
        int r = max(0, gain(node->right));
        ans = max(ans, node->val + l + r);
        return node->val + max(l, r);
    }
public:
    int maxPathSum(TreeNode* root) {
        gain(root);
        return ans;
    }
};
```

### Python
```python
class Solution:
    def maxPathSum(self, root: Optional[TreeNode]) -> int:
        self.ans = float('-inf')
        def gain(node):
            if not node: return 0
            l = max(0, gain(node.left))
            r = max(0, gain(node.right))
            self.ans = max(self.ans, node.val + l + r)
            return node.val + max(l, r)
        gain(root)
        return self.ans
```

### Java
```java
class Solution {
    private int ans = Integer.MIN_VALUE;
    public int maxPathSum(TreeNode root) {
        gain(root);
        return ans;
    }
    private int gain(TreeNode node) {
        if (node == null) return 0;
        int l = Math.max(0, gain(node.left));
        int r = Math.max(0, gain(node.right));
        ans = Math.max(ans, node.val + l + r);
        return node.val + Math.max(l, r);
    }
}
```

**Complexity:** undefined
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Path anywhere, not root-to-leaf"** → Day 7 global, not Day 6 remainder.
- **"val + l + r for ans"** → Cross-subtree through current node.
- **"val + max(l,r) for return"** → Parent picks one side.
- **"max(0, child)"** → Negative subtrees optional — skip if they hurt.

If you returned `node.val + l + r`, the parent would try to attach through both branches — impossible in a tree path.

> 🎯 **Pattern Unlocked:** Bottom-Up Path Optimization — global cross-subtree, return single-branch gain.

---

*Both quests complete. Head to the checkpoint. →*
