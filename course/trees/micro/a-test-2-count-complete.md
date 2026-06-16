<!-- hand-authored -->
# ⚔ A-Rank Test — Problem 2

> [Count Complete Tree Nodes #222](https://leetcode.com/problems/count-complete-tree-nodes/) · Medium · 250 XP

---

You've completed your A-Rank training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Count Complete Tree Nodes on LeetCode](https://leetcode.com/problems/count-complete-tree-nodes/)**

> ⚔ **Hunter's rule:** This is a rank test — bridge **Day 4 complete-tree math** (`2^h - 1`). Compare left and right spine heights before full recursion. No peeking until you've genuinely tried.

---

## The Problem

See the full problem statement on LeetCode: **[Count Complete Tree Nodes #222](https://leetcode.com/problems/count-complete-tree-nodes/)**

---

## 💡 Hints

> 🎯 **What's being tested:** **Day 4 E-Rank bridge** — complete tree shortcut vs fallback recursion.

- Compute **left spine height** (always go left) and **right spine height** (always go right).
- If `lh == rh`: perfect last level → `(1 << lh) - 1` nodes — O(log n).
- Else: `1 + count(left) + count(right)` — recurse on one imperfect side.
- Better than O(n) BFS when tree is complete or near-complete.

**Pattern name before coding:** *Spine height check + complete tree formula.*

---

## 🔍 Pattern Recognition Breakdown

**How to identify from the statement:**
- "Complete binary tree" → all levels full except possibly last, filled left-to-right
- Count nodes faster than O(n) → spine trick
- Same problem as Day 4 Quest — A-Rank test confirms retention

**How a strong solver thinks before coding:**
1. *"Walk left spine → lh, right spine → rh."*
2. *"Equal spines → return 2^lh - 1."*
3. *"Else recurse both children + 1."*
4. *"O(log² n) — log levels × log spine walk."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **BFS level order count** | O(n) always — misses complete-tree math |
| **Full recursion 1+L+R every node** | O(n) — spine check prunes |
| **Assume always complete without check** | Wrong on general complete-but-not-perfect shapes |
| **Off-by-one on 2^h vs 2^h-1** | Nodes not levels |

---

## 🎯 Transfer to Unseen Problems

Day 4 introduced this; A-Rank tests it cold. Same spine logic applies to **perfect binary tree** checks and **minimum height** reasoning on nearly complete trees.

---

<details>
<summary><strong>📖 Solution & Walkthrough</strong></summary>

Trace the pattern on the example tree from the problem statement. Then implement the recursive skeleton you identified.

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

</details>

---

## 💭 What Should Have Clicked in Your Mind?

- **"Complete tree count"** → Day 4 spine heights + `2^h - 1`.
- **"lh == rh"** → last level full — formula applies.
- **"Else recurse"** → one side incomplete — can't use formula at this node.
- **"Bridge E4"** — same problem as Day 4 quest.

---

*2 of 3 test problems. Continue to the next. →*

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
