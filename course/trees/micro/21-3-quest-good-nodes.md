<!-- hand-authored -->
# ⚔ Quest: Count Good Nodes

> **Day 21** · [Count Good Nodes in Binary Tree #1448](https://leetcode.com/problems/count-good-nodes-in-binary-tree/) · Medium · 15 min · 35 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Count Good Nodes in Binary Tree on LeetCode](https://leetcode.com/problems/count-good-nodes-in-binary-tree/)**

> ⚔ **Hunter's rule:** A node is good if it's ≥ every ancestor. Carry max-so-far down from root — same family as Day 6 path problems. The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Count Good Nodes in Binary Tree #1448](https://leetcode.com/problems/count-good-nodes-in-binary-tree/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? **Top-down max tracking** — `dfs(node, maxSoFar)`: if `node.val >= maxSoFar`, count 1; update `maxSoFar = max(maxSoFar, node.val)`; sum counts from children.

If you're stuck after 5 minutes: start with `maxSoFar = -∞` so root is always good. Link to [Day 6 Top-Down DFS](../06-1-top-down-dfs.md).

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Top-Down Max Tracking

**How to identify this from the problem statement:**
- "Path from root" condition
- Compare to **all ancestors** = max on path so far
- Count nodes satisfying condition

| Keyword / phrase | What it signals |
|---|---|
| "no smaller value on path from root" | maxSoFar param |
| "good node" | val >= maxSoFar |
| "count" | Return int sum from dfs |
| "update maximum" | max before recursing children |

**Why this pattern works:** Max on root-to-node path is sufficient — if current ≥ max so far, it's ≥ all ancestors. Tighten max before descending.

**How a strong solver thinks before coding:**
1. *"dfs(node, maxSoFar) → int count."*
2. *"good = val >= maxSoFar ? 1 : 0."*
3. *"newMax = max(maxSoFar, val)."*
4. *"return good + dfs(left,newMax) + dfs(right,newMax)."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Check all ancestors per node** | O(n·h) redundant |
| **Bottom-up subtree max** | Doesn't know path from root |
| **BFS without path max** | Need ancestor chain state |
| **Compare to parent only** | Grandparent could be larger |

**The insight brute force misses:** One integer `maxSoFar` encodes entire ancestor chain — Day 6 top-down template.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Path Sum #112](https://leetcode.com/problems/path-sum/) | Day 6 — remainder | State down |
| [Path Sum II #113](https://leetcode.com/problems/path-sum-ii/) | Day 6 — collect paths | + backtrack |
| [Longest Univalue Path #687](https://leetcode.com/problems/longest-univalue-path/) | Match value chain | Different combine |

---

## 📖 Walkthrough

```
        3
       / \
      1   4
     /   / \
    3   1   5

dfs(3, -∞): good ✓  max→3
  dfs(1, 3): bad     max→3
    dfs(3, 3): good ✓
  dfs(4, 3): good ✓  max→4
    dfs(1, 4): bad
    dfs(5, 4): good ✓

Total good = 4
```

> 💡 **The insight:** maxSoFar replaces walking the whole ancestor list — O(1) state per frame.

---

## Solution

### C++
```cpp
class Solution {
public:
    int goodNodes(TreeNode* root) {
        function<int(TreeNode*, int)> dfs = [&](TreeNode* node, int maxSoFar) -> int {
            if (!node) return 0;
            int good = node->val >= maxSoFar ? 1 : 0;
            maxSoFar = max(maxSoFar, node->val);
            return good + dfs(node->left, maxSoFar) + dfs(node->right, maxSoFar);
        };
        return dfs(root, INT_MIN);
    }
};
```

### Python
```python
class Solution:
    def goodNodes(self, root: TreeNode) -> int:
        def dfs(node, max_so_far):
            if not node: return 0
            good = 1 if node.val >= max_so_far else 0
            max_so_far = max(max_so_far, node.val)
            return good + dfs(node.left, max_so_far) + dfs(node.right, max_so_far)
        return dfs(root, float('-inf'))
```

### Java
```java
class Solution {
    public int goodNodes(TreeNode root) {
        return dfs(root, Integer.MIN_VALUE);
    }
    private int dfs(TreeNode node, int maxSoFar) {
        if (node == null) return 0;
        int good = node.val >= maxSoFar ? 1 : 0;
        maxSoFar = Math.max(maxSoFar, node.val);
        return good + dfs(node.left, maxSoFar) + dfs(node.right, maxSoFar);
    }
}
```

**Complexity:** undefined
---

## 💭 What Should Have Clicked in Your Mind?

- **"No smaller on path from root"** → maxSoFar.
- **"Day 6 top-down"** → parameter down, no backtrack.
- **"-inf start"** → root always counts.
- **"Not parent only"** → max encodes all ancestors.

> 🎯 **Pattern Unlocked:** Top-Down Max Tracking

---

*Both quests complete. Head to the checkpoint. →*
