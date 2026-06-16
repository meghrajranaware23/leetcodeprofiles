<!-- hand-authored -->
# ⚔ Quest: Count Complete Tree Nodes

> **Day 4** · [Count Complete Tree Nodes #222](https://leetcode.com/problems/count-complete-tree-nodes/) · Medium · 15 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Count Complete Tree Nodes on LeetCode](https://leetcode.com/problems/count-complete-tree-nodes/)**

> ⚔ **Hunter's rule:** Walk left spine and right spine for heights. If equal, use `2^h - 1`. Else recurse. Hints are for *after* your attempt.

---

## The Problem

Given the root of a **complete** binary tree, return the number of nodes.

```
Input:       1
            / \
           2   3
          / \ /
         4  5 6

Output: 6

Input:       1
            / \
           2   3
          / \
         4   5

Output: 5
```

A complete tree fills every level except possibly the last, which fills left-to-right.

---

## 💡 Hints

Which pattern from today's concept applies? **Complete-tree O(log n) insight** — compare left-spine height vs right-spine height from current root.

If equal: subtree is a perfect tree → `(1 << h) - 1` nodes. If not: `1 + count(left) + count(right)`.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Complete Tree Properties (spine height + math shortcut)

**How to identify this from the problem statement:**
- "Complete binary tree" → shape guarantee enables math
- Count nodes faster than O(n) → exploit full last level
- Recursion splits when last level partially filled

| Keyword / phrase | What it signals |
|---|---|
| "complete binary tree" | Left/right spine height trick |
| "count nodes" | Usually O(n); complete allows O(log² n) |
| "perfectly filled levels" | `2^h - 1` formula |
| "last level left-filled" | Split when spines differ |
| "follow up O(log n)" (LC) | This recursive approach |

**Why this pattern works:** Equal spines mean no missing nodes in any level below — count is pure math. Unequal spines mean last level is partial — only then recurse.

**How a strong solver thinks before coding:**
1. *"null → 0."*
2. *"lh = walk left spine, rh = walk right spine."*
3. *"lh == rh → return (1 << lh) - 1."*
4. *"Else → 1 + count(left) + count(right)."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Plain DFS count every node** | O(n) — misses complete-tree constraint |
| **BFS count** | O(n) — correct but slower than required follow-up |
| **Day 1 style `1 + count(L) + count(R)` always** | Works O(n) — doesn't use completeness |
| **Wrong formula `2^h` instead of `2^h - 1`** | Off-by-one on node count |
| **Ignore complete guarantee** | Problem gives shape — use it |

**The insight brute force misses:** Day 1 Max Depth visits every node for depth. Here, **perfect subtrees collapse to one formula** — skip visiting them entirely.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Maximum Depth of Binary Tree #104](https://leetcode.com/problems/maximum-depth-of-binary-tree/) | Any tree; no shortcut | Full traversal (Day 1) |
| [Balanced Binary Tree #110](https://leetcode.com/problems/balanced-binary-tree/) | Predicate not count | ↑ height bubble (Quest 1) |
| [Convert Sorted Array to BST #108](https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/) | Build complete-ish tree | Complete shape appears often |

Same theme: **tree shape** changes complexity.

---

## 📖 Walkthrough

**Spine heights decide: math or split.**

```
        1
       / \
      2   3
     / \ /
    4  5 6

At root 1:
  left spine:  1 → 2 → 4        lh = 3
  right spine: 1 → 3            rh = 2   (6 is left child, not right)
  lh ≠ rh  →  last level partial  →  split:
    count = 1 + count(2) + count(3)

At node 2 (subtree 2,4,5):
  left spine 2→4, right spine 2→5 → lh=2, rh=2
  lh == rh  →  perfect subtree  →  (1<<2) - 1 = 3 nodes ✓

At node 3 (subtree 3,6):
  left spine 3→6, right spine 3 only → lh=2, rh=1
  lh ≠ rh  →  1 + count(6) + 0 = 1 + 1 = 2

Total: 1 + 3 + 2 = 6  ✓
```

> 💡 **The insight:** Equal spines = **full** perfect subtree. Unequal = last level has gaps → recurse only where needed. Contrast Day 1 depth which always walks both sides fully.

---

## Solution

### C++
```cpp
class Solution {
public:
    int countNodes(TreeNode* root) {
        if (!root) return 0;
        int lh = 0, rh = 0;
        TreeNode *l = root, *r = root;
        while (l) { lh++; l = l->left; }
        while (r) { rh++; r = r->right; }
        if (lh == rh) return (1 << lh) - 1;
        return 1 + countNodes(root->left) + countNodes(root->right);
    }
};
```

### Python
```python
class Solution:
    def countNodes(self, root: Optional[TreeNode]) -> int:
        if not root:
            return 0
        lh = rh = 0
        l = r = root
        while l: lh += 1; l = l.left
        while r: rh += 1; r = r.right
        if lh == rh:
            return (1 << lh) - 1
        return 1 + self.countNodes(root.left) + self.countNodes(root.right)
```

### Java
```java
class Solution {
    public int countNodes(TreeNode root) {
        if (root == null) return 0;
        int lh = 0, rh = 0;
        TreeNode l = root, r = root;
        while (l != null) { lh++; l = l.left; }
        while (r != null) { rh++; r = r.right; }
        if (lh == rh) return (1 << lh) - 1;
        return 1 + countNodes(root.left) + countNodes(root.right);
    }
}
```

**Complexity:** undefined
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Complete tree"** → Spine trick — not plain `1 + count(L) + count(R)` every time.
- **"lh == rh"** → Perfect subtree → `(1 << h) - 1` — stop recursing.
- **"Contrast #104"** → Max depth always O(n); complete count can skip levels.
- **"Off-by-one"** → Nodes = `2^h - 1`, not `2^h`.

If you wrote O(n) DFS only, it's acceptable for small n — the **insight** is the shape shortcut.

> 🎯 **Pattern Unlocked:** Complete-tree count — spine heights, math or split.

---

*Both quests complete. Head to the checkpoint. →*
