<!-- hand-authored -->
# ⚔ E-Rank Test — Problem 1

> [Subtree of Another Tree #572](https://leetcode.com/problems/subtree-of-another-tree/) · Easy · 100 XP

---

You've completed your E-Rank training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Subtree of Another Tree on LeetCode](https://leetcode.com/problems/subtree-of-another-tree/)**

> ⚔ **Hunter's rule:** This is a rank test — treat it like real interview practice. Draw both trees. Trace where subRoot could align. No peeking until you've genuinely tried.

---

## The Problem

Given the roots of two binary trees `root` and `subRoot`, return `true` if there is a subtree of `root` with the **same structure and node values** as `subRoot`.

```
Input:  root = [3,4,5,1,2],  subRoot = [4,1,2]

        3                 4
       / \               / \
      4   5      vs     1   2
     / \
    1   2

Output: true
Explanation: Subtree rooted at 4 matches subRoot.

Input:  root = [3,4,5,1,2,null,1],  subRoot = [4,1,2]
Output: false
```

---

## 💡 Hints

> 🎯 **What's being tested:** Day 5 parallel recursion (#100) **plus** search — try `same()` at every node of `root`.

**Hint 1:** Write (or reuse) **`same(a, b)`** from Same Tree #100 — parallel `(a.left,b.left)`, `(a.right,b.right)`.

**Hint 2:** At each node in `root`, ask: *"Does the subtree here match subRoot?"* → `same(root, subRoot)`.

**Hint 3:** If not, search left OR right: `dfs(root.left, sub) || dfs(root.right, sub)`.

**Hint 4:** Base: if `root` is null → false (empty main tree has no subtree unless subRoot also empty — handled by same()).

**Hint 5:** Don't merge search and compare into one messy function — **same()** is clean parallel; **dfs()** only hunts starting positions.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Parallel Same-Check + DFS Search (Day 5 extension)

| Clue in the problem | What it signals |
|---|---|
| "subtree of another tree" | Hunt start node + verify structure |
| "same structure and values" | Parallel same() from #100 |
| Two tree roots | Side-by-side compass |
| "return true if any match" | OR across left/right search |
| "identical subtree" | NOT mirror — parallel pairing |

**Contrast with Day 5 quests:**

| Same Tree #100 | Subtree #572 |
|---|---|
| Compare two full trees | Compare subRoot to **candidate** subtree |
| Single call from roots | DFS every start + same() |
| One parallel walk | Search OR + parallel verify |

**How a strong solver thinks before coding:**
1. *"Implement same(p,q) — Day 5 parallel."*
2. *"At root: same(root, sub) || isSubtree(left) || isSubtree(right)."*
3. *"Null root → false."*
4. *"Trace example: match found when current node is 4."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Serialize both, substring search** | Works but O(n) strings; misses recursive template |
| **Mirror pairing by mistake** | Wrong — subtrees must match parallel, not cross |
| **Only compare roots once** | subRoot may start at descendant, not root |
| **Flatten to lists, find subsequence** | Loses structural null alignment |
| **Check only values, not shape** | Different shapes can share value multiset |

**The insight brute force misses:** Subtree = **where to start** (search) + **whether it matches** (same parallel walk). Two clean functions.

---

## 🎯 Transfer to Unseen Problems

**Scenario:** *"Does tree A appear anywhere inside tree B as an identical subtree?"*

Same search + same() — rename roots, same logic.

**Scenario:** *"Count how many times subRoot appears in root."*

Same dfs, but count when same() returns true instead of early OR exit.

**30-second check:** *"same() parallel + dfs OR search."*

---

<details>
<summary><strong>📖 Solution & Walkthrough</strong></summary>

Trace the pattern on the example from the problem statement. Then implement the recursive skeleton you identified.

### C++
```cpp
class Solution {
    bool same(TreeNode* a, TreeNode* b) {
        if (!a || !b) return a == b;
        return a->val == b->val && same(a->left, b->left) && same(a->right, b->right);
    }
    bool dfs(TreeNode* root, TreeNode* sub) {
        if (!root) return false;
        if (same(root, sub)) return true;
        return dfs(root->left, sub) || dfs(root->right, sub);
    }
public:
    bool isSubtree(TreeNode* root, TreeNode* subRoot) {
        return dfs(root, subRoot);
    }
};
```

### Python
```python
class Solution:
    def isSubtree(self, root: Optional[TreeNode], subRoot: Optional[TreeNode]) -> bool:
        def same(a, b):
            if not a or not b:
                return a is b
            return a.val == b.val and same(a.left, b.left) and same(a.right, b.right)
        if not root:
            return False
        return same(root, subRoot) or self.isSubtree(root.left, subRoot) or self.isSubtree(root.right, subRoot)
```

### Java
```java
class Solution {
    public boolean isSubtree(TreeNode root, TreeNode subRoot) {
        if (root == null) return false;
        return same(root, subRoot) || isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
    }
    boolean same(TreeNode a, TreeNode b) {
        if (a == null || b == null) return a == b;
        return a.val == b.val && same(a.left, b.left) && same(a.right, b.right);
    }
}
```

**Complexity:** O(n·m) time · O(h) space

</details>

---

## 💭 What Should Have Clicked in Your Mind?

- **"Subtree"** → Search every start node in main tree.
- **"Same structure"** → Reuse Day 5 parallel same() — not mirror.
- **`same() || search left || search right`** → Two-function split keeps code clean.
- **E-Rank synthesis** → Days 1–4 built tools; Day 5 parallel unlocks #572.

If Same Tree (#100) clicked on Day 5, this is search wrapped around it.

---

*1 of 3 test problems. Continue to the next. →*

## Solution

### C++
```cpp
class Solution {
    bool isSame(TreeNode* a, TreeNode* b) {
        if (!a && !b) return true;
        if (!a || !b || a->val != b->val) return false;
        return isSame(a->left, b->left) && isSame(a->right, b->right);
    }
public:
    bool isSubtree(TreeNode* root, TreeNode* subRoot) {
        if (!root) return false;
        if (isSame(root, subRoot)) return true;
        return isSubtree(root->left, subRoot) || isSubtree(root->right, subRoot);
    }
};
```

### Python
```python
class Solution:
    def isSubtree(self, root: Optional[TreeNode], subRoot: Optional[TreeNode]) -> bool:
        def same(a, b):
            if not a and not b: return True
            if not a or not b or a.val != b.val: return False
            return same(a.left, b.left) and same(a.right, b.right)
        if not root: return False
        if same(root, subRoot): return True
        return self.isSubtree(root.left, subRoot) or self.isSubtree(root.right, subRoot)
```

### Java
```java
class Solution {
    public boolean isSubtree(TreeNode root, TreeNode subRoot) {
        if (root == null) return false;
        if (isSame(root, subRoot)) return true;
        return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
    }
    private boolean isSame(TreeNode a, TreeNode b) {
        if (a == null && b == null) return true;
        if (a == null || b == null || a.val != b.val) return false;
        return isSame(a.left, b.left) && isSame(a.right, b.right);
    }
}
```

**Complexity:** undefined
