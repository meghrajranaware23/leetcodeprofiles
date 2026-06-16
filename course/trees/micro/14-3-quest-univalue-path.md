<!-- hand-authored -->
# ⚔ Quest: Longest Univalue Path

> **Day 14** · [Longest Univalue Path #687](https://leetcode.com/problems/longest-univalue-path/) · Medium · 15 min · 25 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Longest Univalue Path on LeetCode](https://leetcode.com/problems/longest-univalue-path/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. At each node, label left-arm and right-arm lengths (same-value edges). Global = left + right. The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Longest Univalue Path #687](https://leetcode.com/problems/longest-univalue-path/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? **Bottom-up path length** — return `(leftArm, rightArm)`; global `max(left + right)`.

If you're stuck after 5 minutes: arm length = child's offered arm + 1 **only if** child.val == node.val; else 0. Answer counts **edges**, not nodes.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Bottom-Up Path Length

**How to identify this from the problem statement:**
- "Longest path" where all nodes share same value
- Path can start/end anywhere — cross-subtree through current node
- Return edge count — dual-role like Day 7 diameter

| Keyword / phrase | What it signals |
|---|---|
| "longest univalue path" | Bottom-up arms + global |
| "same value" | Conditional extend — break on mismatch |
| "number of edges" | left + right arms = edge count through node |
| "any node start/end" | Global cross combine — Day 7 family |

**Why this pattern works:** Longest univalue path through a node = best same-value chain from left + best from right. Children report arm lengths upward; parent merges.

**How a strong solver thinks before coding:**
1. *"Return pair (leftArm, rightArm) — not single height."*
2. *"Arm extends only if child.val == node.val."*
3. *"ans = max(ans, left + right) before return."*
4. *"Return (left, right) — parent uses lr from left, rl from right."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Try every node as path center O(n²)** | Bottom-up O(n) suffices |
| **Return single max height** | Need separate left/right arms for cross path |
| **Top-down carry value** | Can't see cross-subtree winner at internal node |
| **Count nodes instead of edges** | Off-by-one — problem asks for edges |

**The insight brute force misses:** Same dual-role as diameter — **global** for cross-path through node, **return** one arm upward for parent's use.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Diameter of Binary Tree #543](https://leetcode.com/problems/diameter-of-binary-tree/) | Day 7 — any path, not same value | Global l+r, return height |
| [Binary Tree Maximum Path Sum #124](https://leetcode.com/problems/binary-tree-maximum-path-sum/) | Weighted values, max(0) clamp | Same dual-role |
| [Path Sum III #437](https://leetcode.com/problems/path-sum-iii/) | Today's other quest — prefix map | Different path family |

Same skeleton: children report, parent combines cross + return one side.

---

## 📖 Walkthrough

**Tree of all 5s — three nodes in line:**

```
    5
     \
      5
       \
        5

At bottom 5: (0,0) → global 0
At middle 5: right child matches → right=1, global=max(0,1)=1, return (0,1)
At top 5: right arm=2, global=max(1,2)=2 ✓

2 edges — path through all three 5s.
```

> 💡 **The insight:** `(leftArm, rightArm)` naming matches **which child edge** the arm comes from — parent reads `lr` from left child, `rl` from right.

---

## Solution

### C++
```cpp
class Solution {
    int ans = 0;
    int dfs(TreeNode* node, int parentVal) {
        if (!node) return 0;
        int l = dfs(node->left,  node->val);
        int r = dfs(node->right, node->val);
        ans = max(ans, l + r);
        return node->val == parentVal ? max(l, r) + 1 : 0;
    }
public:
    int longestUnivaluePath(TreeNode* root) {
        dfs(root, -1);
        return ans;
    }
};
```

### Python
```python
class Solution:
    def longestUnivaluePath(self, root: Optional[TreeNode]) -> int:
        self.ans = 0
        def dfs(node, parent_val):
            if not node: return 0
            l = dfs(node.left,  node.val)
            r = dfs(node.right, node.val)
            self.ans = max(self.ans, l + r)
            return max(l, r) + 1 if node.val == parent_val else 0
        dfs(root, None)
        return self.ans
```

### Java
```java
class Solution {
    private int ans = 0;
    public int longestUnivaluePath(TreeNode root) {
        dfs(root, -1001);
        return ans;
    }
    private int dfs(TreeNode node, int parentVal) {
        if (node == null) return 0;
        int l = dfs(node.left,  node.val);
        int r = dfs(node.right, node.val);
        ans = Math.max(ans, l + r);
        return node.val == parentVal ? Math.max(l, r) + 1 : 0;
    }
}
```

**Complexity:** undefined
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Longest same-value path"** → bottom-up arms, Day 7 cousin.
- **"left + right = global"** → cross through current node.
- **"Return pair"** → parent extends one arm only.
- **"Edges not nodes"** → arms already count edges.

If you used prefix sums here, wrong tool — value equality needs conditional arm extend.

> 🎯 **Pattern Unlocked:** Bottom-Up Path Length — univalue arms + global combine.

---

*Both quests complete. Head to the checkpoint. →*
