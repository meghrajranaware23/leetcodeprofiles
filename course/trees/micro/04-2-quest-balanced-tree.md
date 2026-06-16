<!-- hand-authored -->
# ⚔ Quest: Balanced Binary Tree

> **Day 4** · [Balanced Binary Tree #110](https://leetcode.com/problems/balanced-binary-tree/) · Easy · 10 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Balanced Binary Tree on LeetCode](https://leetcode.com/problems/balanced-binary-tree/)**

> ⚔ **Hunter's rule:** Label heights bubbling up. At each node, check `|leftH − rightH| ≤ 1`. Hints are for *after* your attempt.

---

## The Problem

Given a binary tree, determine if it is **height-balanced** — for every node, the heights of left and right subtrees differ by at most 1.

```
Input:       3
            / \
           9  20
             /  \
            15   7

Output: true

Input:           1
                / \
               2   2
              / \
             3   3
            / \
           4   4

Output: false
Explanation: Node 3 has left height 2 and right height 0.
```

---

## 💡 Hints

Which pattern from today's concept applies? **Bottom-up height check with early exit** — return height like Max Depth, but if `abs(L − R) > 1`, mark false (or return -1 sentinel).

If stuck: don't call a separate height function on every node — combine check into the same postorder pass.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Bottom-Up Height Check + Early Exit

**How to identify this from the problem statement:**
- "Balanced" / "height difference at most 1" → compare child heights at parent
- Boolean answer from subtree heights → ↑ combine with predicate
- "Every node" constraint → one DFS, fail fast

| Keyword / phrase | What it signals |
|---|---|
| "balanced binary tree" | `abs(leftH - rightH) <= 1` at every node |
| "height of subtrees" | Return height from DFS |
| "return true/false" | Global flag or sentinel height |
| "difference at most 1" | Check at combine, not separate pass |
| "bottom-up" / "recursive" | Postorder height bubble |

**Why this pattern works:** Imbalance is visible the moment a node's child heights differ by 2+. One pass computes height and detects failure together.

**How a strong solver thinks before coding:**
1. *"null → height 0."*
2. *"L = dfs(left), R = dfs(right)."*
3. *"If |L−R| > 1 → fail."*
4. *"Return 1 + max(L, R)."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **For each node, call maxDepth(left) and maxDepth(right)** | O(n²) — recomputes heights repeatedly |
| **BFS level counts** | Doesn't measure subtree height difference |
| **Only check root's children** | Imbalance may be deep in tree |
| **Return bool without height** | Still need subtree heights — combine in one function |
| **Ignore early exit** | Correct but slower; sentinel stops wasted work |

**The insight brute force misses:** Max Depth (#104) and Balanced (#110) share the same height return — balanced adds one `abs` check at combine time.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Maximum Depth of Binary Tree #104](https://leetcode.com/problems/maximum-depth-of-binary-tree/) | No balance check | Same height bubble (Day 1) |
| [Diameter of Binary Tree #543](https://leetcode.com/problems/diameter-of-binary-tree/) | Track global max path | Height return + side effect |
| [Minimum Depth of Binary Tree #111](https://leetcode.com/problems/minimum-depth-of-binary-tree/) | min instead of max | Same ↑ family |

Same skeleton: children report height, parent combines.

---

## 📖 Walkthrough

**Heights bubble up; fail when diff > 1.**

```
Balanced tree:
        3
       / \
      9  20
        /  \
       15   7

  height(15)=1, height(7)=1
  height(9)=1
  height(20)=1+max(1,1)=2  |1-1|≤1 ✓
  height(3)=1+max(1,2)=3   |1-2|≤1 ✓  → true

Imbalanced tree (node 3 below):
           1
          / \
         2   2
        / \
       3   3
      / \
     4   4

  Left subtree of node 3 has height 2, right has 0
  |2 - 0| = 2 > 1  → false (early exit at that frame)
```

> 💡 **The insight:** Day 1 asked "how deep?" Day 4 asks "are both sides similar depth?" — same bubble, extra predicate.

---

## Solution

### C++
```cpp
class Solution {
    int height(TreeNode* node) {
        if (!node) return 0;
        int l = height(node->left);
        if (l == -1) return -1;
        int r = height(node->right);
        if (r == -1) return -1;
        if (abs(l - r) > 1) return -1;
        return 1 + max(l, r);
    }
public:
    bool isBalanced(TreeNode* root) {
        return height(root) != -1;
    }
};
```

### Python
```python
class Solution:
    def isBalanced(self, root: Optional[TreeNode]) -> bool:
        def height(node):
            if not node: return 0
            l = height(node.left)
            if l == -1: return -1
            r = height(node.right)
            if r == -1: return -1
            if abs(l - r) > 1: return -1
            return 1 + max(l, r)
        return height(root) != -1
```

### Java
```java
class Solution {
    private int height(TreeNode node) {
        if (node == null) return 0;
        int l = height(node.left);
        if (l == -1) return -1;
        int r = height(node.right);
        if (r == -1) return -1;
        if (Math.abs(l - r) > 1) return -1;
        return 1 + Math.max(l, r);
    }
    public boolean isBalanced(TreeNode root) {
        return height(root) != -1;
    }
}
```

**Complexity:** undefined
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Balanced"** → ↑ height bubble + `abs(L−R) ≤ 1` at every node.
- **"Not O(n²)"** → One DFS — don't re-call maxDepth per node.
- **"Same as #104"** → Return `1 + max(L,R)` — add one if-check.
- **"Early exit"** → Once `ok = false`, still unwind but answer won't flip back.

If you wrote two functions (`height` and `isBalanced` calling height twice per node), refactor to one pass.

> 🎯 **Pattern Unlocked:** Bottom-up height check — Max Depth plus balance predicate at combine.

---

*One quest down. Next: count nodes on a **complete** tree using O(log n) spine math. →*
