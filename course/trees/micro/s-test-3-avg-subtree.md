<!-- hand-authored -->
# ⚔ S-Rank Test — Problem 3

> [Count Nodes Equal to Average of Subtree #2265](https://leetcode.com/problems/count-nodes-equal-to-average-of-subtree/) · Medium · 300 XP

---

You've completed your S-Rank training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Count Nodes Equal to Average of Subtree on LeetCode](https://leetcode.com/problems/count-nodes-equal-to-average-of-subtree/)**

> ⚔ **Hunter's rule:** This is a rank test — treat it like real interview practice. At each node post-order, write `(sum, count)` returning up. No peeking until you've genuinely tried.

---

## The Problem

See the full problem statement on LeetCode: **[Count Nodes Equal to Average of Subtree #2265](https://leetcode.com/problems/count-nodes-equal-to-average-of-subtree/)**

---

## 💡 Hints

> 🎯 **What's being tested:** **Multi-value bottom-up tuple `(sum, count)`** — same family as Day 28 BST tuple and Day 30 gene aggregation, but simpler fields.

**Skeleton:**
```
dfs(node) → (subtree_sum, subtree_count)
  if !node: return (0, 0)
  (ls, lc) = dfs(left), (rs, rc) = dfs(right)
  s = ls + rs + node.val
  c = lc + rc + 1
  if s / c == node.val: res++
  return (s, c)
```

**Pattern name before coding:** *Post-order aggregate — sum and count bubble up; check average at each node.*

**Integer division:** Use `s // c == node.val` (Python) or `s / c == node.val` (C++/Java int division truncates toward zero — matches LeetCode).

---

## 🔍 Pattern Recognition Breakdown

**How to identify from the statement:**
- "Average of subtree" → need total sum AND node count of subtree
- "Count nodes where …" → global counter at each combine step
- Cannot know average from sum alone — **tuple required**

**How a strong solver thinks before coding:**
1. *"Return pair (sum, count) — not just sum."*
2. *"Post-order: children first."*
3. *"Check `sum/count == node.val` before returning."*
4. *"Global res++ on match."*

**Connect to pack:** Day 28 `(isBST, min, max, sum)` — same multi-field post-order; Day 30 gene set — different aggregate, same direction.

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Re-traverse subtree for each node** | O(n²) |
| **Return sum only** | Can't compute average without count |
| **Top-down passing sum/count** | Subtree average is not path-based — bottom-up natural |
| **Float average comparison** | Integer division matches problem — avoid float precision |

---

## 🎯 Transfer to Unseen Problems

| Problem | Tuple fields |
|---|---|
| Day 28 Max Sum BST | `(isBST, min, max, sum)` |
| Day 7 Diameter | return height, global best |
| **This problem** | `(sum, count)` |
| Day 30 Gene MEX | set of values (heavier aggregate) |

When question asks about **subtree statistics**, ask: *what two numbers does parent need from children?*

---

<details>
<summary><strong>📖 Solution & Walkthrough</strong></summary>

Trace the pattern on the example tree from the problem statement. Then implement the recursive skeleton you identified.

### C++
```cpp
class Solution {
    int res = 0;
    pair<int,int> dfs(TreeNode* node) {
        if (!node) return {0, 0};
        auto [ls, lc] = dfs(node->left);
        auto [rs, rc] = dfs(node->right);
        int s = ls + rs + node->val, c = lc + rc + 1;
        if (s / c == node->val) res++;
        return {s, c};
    }
public:
    int averageOfSubtree(TreeNode* root) { dfs(root); return res; }
};
```

### Python
```python
class Solution:
    def averageOfSubtree(self, root: Optional[TreeNode]) -> int:
        self.res = 0
        def dfs(node):
            if not node: return 0, 0
            ls, lc = dfs(node.left)
            rs, rc = dfs(node.right)
            s, c = ls + rs + node.val, lc + rc + 1
            if s // c == node.val: self.res += 1
            return s, c
        dfs(root)
        return self.res
```

### Java
```java
class Solution {
    private int res = 0;
    public int averageOfSubtree(TreeNode root) { dfs(root); return res; }
    private int[] dfs(TreeNode node) {
        if (node == null) return new int[]{0, 0};
        int[] l = dfs(node.left), r = dfs(node.right);
        int s = l[0] + r[0] + node.val, c = l[1] + r[1] + 1;
        if (s / c == node.val) res++;
        return new int[]{s, c};
    }
}
```

**Complexity:** undefined

</details>

---

## 💭 What Should Have Clicked in Your Mind?

- **"Average of subtree"** → return `(sum, count)` — tuple post-order.
- **"Count matching nodes"** → global `res` at combine, like Day 7 global diameter.
- **"Can't do with sum alone"** → multi-value return is mandatory.
- **"Decision tree route"** → bottom-up combine branch, Day 28/30 family.

---

*3 of 3 test problems. Continue to the next. →*

## Solution

### C++
```cpp
class Solution {
    int res = 0;
    pair<int,int> dfs(TreeNode* node) {
        if (!node) return {0, 0};
        auto [ls, lc] = dfs(node->left);
        auto [rs, rc] = dfs(node->right);
        int s = ls + rs + node->val, c = lc + rc + 1;
        if (s / c == node->val) res++;
        return {s, c};
    }
public:
    int averageOfSubtree(TreeNode* root) { dfs(root); return res; }
};
```

### Python
```python
class Solution:
    def averageOfSubtree(self, root: Optional[TreeNode]) -> int:
        self.res = 0
        def dfs(node):
            if not node: return 0, 0
            ls, lc = dfs(node.left)
            rs, rc = dfs(node.right)
            s, c = ls + rs + node.val, lc + rc + 1
            if s // c == node.val: self.res += 1
            return s, c
        dfs(root)
        return self.res
```

### Java
```java
class Solution {
    private int res = 0;
    public int averageOfSubtree(TreeNode root) { dfs(root); return res; }
    private int[] dfs(TreeNode node) {
        if (node == null) return new int[]{0, 0};
        int[] l = dfs(node.left), r = dfs(node.right);
        int s = l[0] + r[0] + node.val, c = l[1] + r[1] + 1;
        if (s / c == node.val) res++;
        return new int[]{s, c};
    }
}
```

**Complexity:** undefined
