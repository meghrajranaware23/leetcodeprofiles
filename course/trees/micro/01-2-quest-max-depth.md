<!-- hand-authored -->
# ⚔ Quest: Maximum Depth

> **Day 1** · [Maximum Depth of Binary Tree #104](https://leetcode.com/problems/maximum-depth-of-binary-tree/) · Easy · 10 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Maximum Depth of Binary Tree on LeetCode](https://leetcode.com/problems/maximum-depth-of-binary-tree/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. Label each node with the depth its subtree **returns on the way up**. The hints below are for *after* your attempt.

---

## The Problem

Given the root of a binary tree, return its **maximum depth** — the number of nodes along the longest path from root to a leaf.

```
Input:       3
            / \
           9  20
             /  \
            15   7

Output: 3
Explanation: Longest path is 3 → 20 → 15 (or 3 → 20 → 7), three nodes.
```

---

## 💡 Hints

Which compass direction from today's concept applies? **↑ Bottom-up** — empty tree returns `0`; otherwise `1 + max(leftDepth, rightDepth)`.

If you're stuck after 5 minutes: don't pass a counter down. Let each subtree report its depth; the root adds 1 and takes the max of the two reports.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Bottom-Up Depth Bubble (↑ compass)

**How to identify this from the problem statement:**
- "Maximum depth" / "height" → aggregate from children, not a downward counter
- Binary tree → two recursive calls, one combine step
- Return type is **int** computed from child ints → classic bottom-up

| Keyword / phrase | What it signals |
|---|---|
| "maximum depth" / "height" | `1 + max(left, right)` |
| "longest path root to leaf" | Depth = 1 at leaf; empty = 0 |
| "binary tree" + return number | Recurse both children, aggregate up |
| "number of nodes on path" | Count levels via return values |
| "empty tree" | Return 0 immediately |

**Why this pattern works:** A node's depth is 1 plus the deeper of its two subtrees. Leaves know they're depth 1 without asking their parent.

**How a strong solver thinks before coding:**
1. *"null → 0 (no nodes below)."*
2. *"Get leftDepth and rightDepth from recursive calls."*
3. *"Return 1 + max(leftDepth, rightDepth)."*
4. *"Trace bubbling from leaves to root on paper."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **BFS level-by-level counting** | Works iteratively, but hides the ↑ template used in balanced-tree and diameter problems |
| **Pass `depthSoFar` down, update global max** | Top-down state — valid, but wrong compass for today's home problem |
| **Sum left depth + right depth** | Counts both branches — depth is **max**, not sum |
| **Return 0 at leaf instead of 1** | Off-by-one — a single-node tree should return 1 |
| **Only traverse left spine** | Must visit both subtrees to find the deeper side |

**The insight brute force misses:** Each subtree fully answers *"how deep am I?"* before the parent adds one. No shared mutable state needed.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Minimum Depth of Binary Tree #111](https://leetcode.com/problems/minimum-depth-of-binary-tree/) | `min` instead of `max`; careful at one-child nodes | Bottom-up bubble |
| [Balanced Binary Tree #110](https://leetcode.com/problems/balanced-binary-tree/) | Return height or sentinel; check abs diff | Combine with early exit |
| [Diameter of Binary Tree #543](https://leetcode.com/problems/diameter-of-binary-tree/) | Track global max of left+right | Bottom-up height + side effect |

Same skeleton: children report, parent combines.

---

## 📖 Walkthrough

**Depth bubbles up from leaves; root adds 1 and takes the max.**

```
        3
       / \
      9  20
        /  \
       15   7

Step 1 — leaves report:
  maxDepth(15): no children → return 1
  maxDepth(7):  no children → return 1
  maxDepth(9):  no children → return 1

Step 2 — node 20 combines:
  maxDepth(20) = 1 + max(1, 1) = 2

Step 3 — root combines:
  maxDepth(3) = 1 + max(1, 2) = 3  ✓

Return chain (unwind order):
  15 → 1
  7  → 1
  9  → 1
  20 → 2
  3  → 3
```

> 💡 **The insight:** `null` returns 0 so `1 + max(0,0)` at a leaf gives 1. The empty child doesn't add a level — the current node does.

---

## Solution

### C++
```cpp
class Solution {
public:
    int maxDepth(TreeNode* root) {
        if (!root) return 0;
        return 1 + max(maxDepth(root->left), maxDepth(root->right));
    }
};
```

### Python
```python
class Solution:
    def maxDepth(self, root: Optional[TreeNode]) -> int:
        if not root:
            return 0
        return 1 + max(self.maxDepth(root.left), self.maxDepth(root.right))
```

### Java
```java
class Solution {
    public int maxDepth(TreeNode root) {
        if (root == null) return 0;
        return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
    }
}
```

**Complexity:** undefined
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Max depth"** → ↑ Bottom-up; children return depths, I take max.
- **"Empty tree = 0"** → Base case before any `+1`.
- **"One line combine"** → `1 + max(left, right)` — trust both calls.
- **"Trees pack anchor"** → Same problem as Recursion pack, but now on the ↑ compass.

If you started with a `depth++` parameter going down, compare it to this — both can work, but **aggregation problems** usually want returns up.

> 🎯 **Pattern Unlocked:** Bottom-up depth bubble — leaves return 1, each ancestor adds 1 and takes max of children.

---

*One quest down. Next: mutate the tree in place — swap every node's children. →*
