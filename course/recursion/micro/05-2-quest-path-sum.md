<!-- hand-authored -->
# ⚔ Quest: Path Sum

> **Day 5** · [Path Sum #112](https://leetcode.com/problems/path-sum/) · Easy · 10 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Path Sum on LeetCode](https://leetcode.com/problems/path-sum/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. Write the **remaining target** at each node on the way down. Check only at leaves. The hints below are for *after* your attempt.

---

## The Problem

Given the root of a binary tree and an integer `targetSum`, return `true` if the tree has a **root-to-leaf** path such that the sum of node values equals `targetSum`.

A **leaf** is a node with no children.

```
Input:  root = [5,4,8,11,null,13,4,7,2,null,null,null,1],  targetSum = 22
Output: true
Explanation: 5 → 4 → 11 → 2 sums to 22
```

---

## 💡 Hints

Which pattern from today's concept applies? **Top-down remainder** — pass `targetSum - node.val` to children; at a leaf, check if `node.val == targetSum`.

If you're stuck after 5 minutes: don't sum upward from subtrees. Subtract as you go down; use `||` because only one path needs to win.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Top-Down Remainder (Root-to-Leaf Existential)

**How to identify this from the problem statement:**
- **Root-to-leaf path** → must track running remainder downward; subtree alone doesn't know prefix
- "Has / exists" → boolean OR across branches
- Check at **leaf** → internal nodes don't declare success early (unless leaf)

| Keyword / phrase | What it signals |
|---|---|
| "root-to-leaf path" | Downward state; leaf-only success check |
| "path sum equals target" | Pass `target - val` each step |
| "return true if any" | `left || right` |
| "leaf node" | No children → equality test with remaining |

**Why this pattern works:** Each step reduces the question: *"After paying for this node, can any continuation below finish the budget?"* The leaf base case is a single equality check.

**How a strong solver thinks before coding:**
1. *"null → false (no path)."*
2. *"Leaf → return node.val == targetSum."*
3. *"Internal → rem = targetSum - val; return hasPath(left, rem) || hasPath(right, rem)."*
4. *"Not Day 4 depth — I'm passing state down, not max-ing returns up."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Sum all root-to-leaf paths into array, search** | Works but O(n) space; misses the O(h) recursive template |
| **Bottom-up subtree sum == target** | Wrong — any node could match partial sum; need full root-to-leaf |
| **Check target at every node** | Internal node match doesn't mean a leaf completes the path |
| **Global sum from root without leaf check** | Counts partial paths incorrectly |

**The insight brute force misses:** The target is a **budget** consumed node by node. Only a leaf with exact remainder proves a valid path.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Path Sum II #113](https://leetcode.com/problems/path-sum-ii/) | Collect all paths | Top-down remainder + backtrack path list |
| [Binary Tree Paths #257](https://leetcode.com/problems/binary-tree-paths/) | Build path strings | Top-down accumulation |
| [Sum Root to Leaf Numbers #129](https://leetcode.com/problems/sum-root-to-leaf-numbers/) | Accumulate digits ×10 | Top-down running number |

All pass **state down** along one root-to-leaf thread.

---

## 📖 Walkthrough

**Remainder flows down; leaf checks equality; `||` merges branches.**

```
target = 22

              5  rem=22
             / \
        rem=17  rem=17
          4       8
         / \     / \
    rem=13 rem=9 rem=9 rem=9
     11     2     13    4
     / \          (leaves)  / \
 rem=2 rem=11    ...       5   1

Path 5→4→11→2:
  22 → 17 → 13 → 2
  Leaf 2: 2 == 2?  YES ✓

Path 5→4→8→13:
  22 → 17 → 9 → -4 at 13... (13 != -4 at leaf) ✗

Any true wins:
  hasPath(5,22) = ... || hasPath(2,13) = true
```

State diagram:

```
     [node, remaining]
           │
    subtract node.val at each step
           │
     leaf? remaining == node.val
```

> 💡 **The insight:** At node 5 with target 22, you don't ask children "what's your depth?" — you ask *"can you finish 17?"* That's top-down state.

---

## Solution

### C++
```cpp
class Solution {
public:
    bool hasPathSum(TreeNode* root, int targetSum) {
        if (!root) return false;
        if (!root->left && !root->right) return root->val == targetSum;
        return hasPathSum(root->left,  targetSum - root->val) ||
               hasPathSum(root->right, targetSum - root->val);
    }
};
```

### Python
```python
class Solution:
    def hasPathSum(self, root: Optional[TreeNode], targetSum: int) -> bool:
        if not root: return False
        if not root.left and not root.right: return root.val == targetSum
        rem = targetSum - root.val
        return self.hasPathSum(root.left, rem) or self.hasPathSum(root.right, rem)
```

### Java
```java
class Solution {
    public boolean hasPathSum(TreeNode root, int targetSum) {
        if (root == null) return false;
        if (root.left == null && root.right == null) return root.val == targetSum;
        int rem = targetSum - root.val;
        return hasPathSum(root.left, rem) || hasPathSum(root.right, rem);
    }
}
```

**Complexity:** O(n) time · O(h) space
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Root-to-leaf path sum"** → Top-down remainder, not bottom-up aggregation.
- **"Leaf only"** → Internal nodes never return true on equality alone.
- **"Subtract before recurse"** → Children inherit `target - val`.
- **"|| not &&"** → One good path is enough — existential, not universal like same-tree.

If you tried Day 4's `1 + max(left, right)` instinct, stop — path problems carry **budget**, not **height**.

> 🎯 **Pattern Unlocked:** Top-down remainder — pass the shrinking target down; win at a leaf with `||`.

---

*One quest down. Next: same downward bounds, but prune whole BST subtrees. →*
