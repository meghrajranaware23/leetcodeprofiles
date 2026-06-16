<!-- hand-authored -->
# ⚔ Quest: Sum Root to Leaf Numbers

> **Day 6** · [Sum Root to Leaf Numbers #129](https://leetcode.com/problems/sum-root-to-leaf-numbers/) · Medium · 15 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Sum Root to Leaf Numbers on LeetCode](https://leetcode.com/problems/sum-root-to-leaf-numbers/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. Write the running number `cur` at each node on the way down. The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Sum Root to Leaf Numbers #129](https://leetcode.com/problems/sum-root-to-leaf-numbers/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? **Top-down accumulation** — `cur = cur * 10 + node.val` at each step; at a leaf return `cur`; internal nodes return `dfs(left) + dfs(right)`.

If you're stuck after 5 minutes: this is Path Sum without a target — you **build** the number downward, then **sum leaf values** on the way up. No backtrack needed (no path list).

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Top-Down Accumulation

**How to identify this from the problem statement:**
- **Root-to-leaf digits** → prefix known only on descent
- **Sum all leaf numbers** → leaves return value; internal nodes add child returns
- No "all paths" collection → no push/pop

| Keyword / phrase | What it signals |
|---|---|
| "root-to-leaf numbers" | `cur * 10 + val` top-down |
| "sum all path numbers" | Leaf returns cur; internal returns left + right |
| "each path represents a number" | Digit accumulation, not remainder subtraction |
| "binary tree" + no target | Accumulate, don't subtract toward goal |

**Why this pattern works:** The number 129 comes from path 1→2→9: `((0*10+1)*10+2)*10+9`. Only the downward walk knows the prefix; leaves deliver finished numbers.

**How a strong solver thinks before coding:**
1. *"null → 0 (no contribution)."*
2. *"Update cur = cur*10 + val."*
3. *"Leaf → return cur (finished number)."*
4. *"Internal → return dfs(left, cur) + dfs(right, cur)."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Collect all path strings, parse, sum** | O(n²) string work — direct int accumulation is O(n) |
| **Bottom-up without prefix** | Subtree can't reconstruct digit position from below |
| **Global sum at every node** | Must only count leaves — internal nodes aren't valid numbers |
| **Backtrack path list** | Unnecessary — no collection of paths, just numeric sum |

**The insight brute force misses:** `cur * 10 + val` is O(1) per node. Leaves return; parents add — hybrid of top-down state and bottom-up sum.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Path Sum #112](https://leetcode.com/problems/path-sum/) | Subtract toward target | Top-down numeric state |
| [Path Sum II #113](https://leetcode.com/problems/path-sum-ii/) | Collect paths + backtrack | Top-down + path list |
| [Binary Tree Paths #257](https://leetcode.com/problems/binary-tree-paths/) | String build `"a->b"` | Top-down accumulation variant |

All carry a **running value down** the root-to-leaf thread.

---

## 📖 Walkthrough

**Running number flows down; leaves return; parents sum.**

```
Tree:    1
        / \
       2   3

Path 1→2:  cur: 0→1→12   leaf 2 returns 12
Path 1→3:  cur: 0→1→13   leaf 3 returns 13

              1   cur=1
             / \
        cur=12  cur=13
          2       3
        return 12  return 13

At node 1: dfs(2,1) + dfs(3,1) = 12 + 13 = 25 ✓
```

State diagram:

```
[node, cur]
    │
 cur = cur * 10 + node.val
    │
 leaf? → return cur
 else  → return dfs(L) + dfs(R)
```

> 💡 **The insight:** Unlike Path Sum II, no pop — `cur` is passed by value (or recomputed per call). Each branch gets its own running number.

---

## Solution

### C++
```cpp
class Solution {
    int dfs(TreeNode* node, int curr) {
        if (!node) return 0;
        curr = curr * 10 + node->val;
        if (!node->left && !node->right) return curr;
        return dfs(node->left, curr) + dfs(node->right, curr);
    }
public:
    int sumNumbers(TreeNode* root) { return dfs(root, 0); }
};
```

### Python
```python
class Solution:
    def sumNumbers(self, root: Optional[TreeNode]) -> int:
        def dfs(node, curr):
            if not node: return 0
            curr = curr * 10 + node.val
            if not node.left and not node.right: return curr
            return dfs(node.left, curr) + dfs(node.right, curr)
        return dfs(root, 0)
```

### Java
```java
class Solution {
    public int sumNumbers(TreeNode root) { return dfs(root, 0); }
    private int dfs(TreeNode node, int curr) {
        if (node == null) return 0;
        curr = curr * 10 + node.val;
        if (node.left == null && node.right == null) return curr;
        return dfs(node.left, curr) + dfs(node.right, curr);
    }
}
```

**Complexity:** undefined
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Digits form a number root-to-leaf"** → `cur * 10 + val`, not remainder subtract.
- **"Sum all paths"** → Leaf returns number; parent adds children (no global list).
- **"No backtrack"** → Integer `cur` passed down — branches don't share mutable path state.
- **"Not Day 7"** → No height/global; prefix only makes sense top-down.

If you tried storing strings like `"129"`, switch to integer accumulation — same logic, cleaner code.

> 🎯 **Pattern Unlocked:** Top-Down Accumulation — build the number on descent, sum at leaves.

---

*Both quests complete. Head to the checkpoint. →*
