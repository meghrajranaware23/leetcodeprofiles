<!-- hand-authored -->
# ⚔ Quest: Closest BST Value

> **Day 23** · [Closest Binary Search Tree Value #270](https://leetcode.com/problems/closest-binary-search-tree-value/) · Easy · 10 min · 30 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Closest Binary Search Tree Value on LeetCode](https://leetcode.com/problems/closest-binary-search-tree-value/)**

> ⚔ **Hunter's rule:** Walk the search path toward `target`. Update your best candidate at **every** node — don't stop early just because you passed target. Hints are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Closest Binary Search Tree Value #270](https://leetcode.com/problems/closest-binary-search-tree-value/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? **BST closest walk** — descend like search, track the node with minimum `|val - target|` seen so far.

If stuck: at each node, compare distance to current best, then go left if `target < val`, else right. Tie-break toward smaller value is handled by `<` comparison in the walk.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** BST Closest Walk (Early-Exit Path)

**How to identify this from the problem statement:**
- "Closest" + BST → single downward path, not full traversal
- Floating `target` vs integer node values → compare as doubles
- One node on path is closest (or tie) — update as you go

| Keyword / phrase | What it signals |
|---|---|
| "closest value" / "nearest" | Track best on search path |
| "binary search tree" | Ordering guides left/right |
| "unique values" | No duplicate tie complexity |
| O(h) expected | One path only |

**Why this pattern works:** All nodes closer to target than the current best must lie on the search path — BST ordering guarantees no better answer hides in the unexplored subtree once you've committed to a direction (with best updated at each step).

**How a strong solver thinks before coding:**
1. *"Initialize closest = root.val."*
2. *"While root: update closest if this node is better."*
3. *"Go left if target < val, else right."*
4. *"Return closest — O(h) time, O(1) space."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Inorder all values, scan for min diff** | O(n) — ignores BST structure |
| **BFS / level order** | Visits nodes out of order — wasteful |
| **Stop when diff starts increasing** | Closest may be an ancestor you already passed without updating |
| **Recursive full tree scan** | O(n) when O(h) path suffices |

**The insight brute force misses:** BST search path **is** the only relevant corridor. Update best at every node on that corridor.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Closest Binary Search Tree Value II #272](https://leetcode.com/problems/closest-binary-search-tree-value-ii/) | Return k closest | Stack + predecessor/successor |
| [Search in BST #700](https://leetcode.com/problems/search-in-a-binary-search-tree/) | Exact match | Same left/right walk |
| [Kth Closest #658](https://leetcode.com/problems/find-k-closest-elements/) | Array not tree | Two-pointer / binary search variant |

Same skeleton: ordering collapses search to one path.

---

## 📖 Walkthrough

**Tree: `[4,2,6,1,3,5,7]`, target = 3.7**

```
        4
       / \
      2   6
     / \ / \
    1  3 5  7

At 4: closest=4, 3.7 < 4 → left
At 2: |2-3.7|=1.7 vs |4-3.7|=0.3 → keep 4, 3.7 > 2 → right
At 3: |3-3.7|=0.7 vs 0.3 → keep 4, 3.7 > 3 → right → null

Return 4 ✓
```

**target = 3.2:** same path, at 3: |3-3.2|=0.2 beats 0.8 → closest=3 → return 3 ✓

> 💡 **The insight:** You're doing BST search with a running "best so far." No backtracking.

---

## Solution

### C++
```cpp
class Solution {
public:
    int closestValue(TreeNode* root, double target) {
        int closest = root->val;
        while (root) {
            if (abs((double)root->val - target) < abs((double)closest - target))
                closest = root->val;
            root = target < root->val ? root->left : root->right;
        }
        return closest;
    }
};
```

### Python
```python
class Solution:
    def closestValue(self, root: Optional[TreeNode], target: float) -> int:
        closest = root.val
        while root:
            if abs(root.val - target) < abs(closest - target):
                closest = root.val
            root = root.left if target < root.val else root.right
        return closest
```

### Java
```java
class Solution {
    public int closestValue(TreeNode root, double target) {
        int closest = root.val;
        while (root != null) {
            if (Math.abs(root.val - target) < Math.abs(closest - target))
                closest = root.val;
            root = target < root.val ? root.left : root.right;
        }
        return closest;
    }
}
```

**Complexity:** undefined
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Closest in BST"** → walk search path, update best each step.
- **"Don't stop early"** → full path to null; best may be last node visited.
- **"Same as search"** → left/right decision uses target vs val.
- **"O(1) space"** → iterative while loop, no stack.

If you inordered the whole tree, refactor to the path walk — same answer, better complexity.

> 🎯 **Pattern Unlocked:** BST closest walk — search path + running minimum distance.

---

*One quest down. Next: inorder successor with the case split. →*
