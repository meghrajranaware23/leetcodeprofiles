<!-- hand-authored -->
# ⚔ Quest: Maximum Sum BST

> **Day 28** · [Maximum Sum BST in Binary Tree #1373](https://leetcode.com/problems/maximum-sum-bst-in-binary-tree/) · Hard · 25 min · 60 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Maximum Sum BST in Binary Tree on LeetCode](https://leetcode.com/problems/maximum-sum-bst-in-binary-tree/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. At each node write the 4-tuple `(isBST, min, max, sum)` returning up. The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Maximum Sum BST in Binary Tree #1373](https://leetcode.com/problems/maximum-sum-bst-in-binary-tree/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? **↑ BST validity tuple** — return `(isBST, minVal, maxVal, sum)` from each subtree; valid combine when `lmax < node.val < rmin`.

If you're stuck after 5 minutes: when combine fails, return `(false, 0, 0, 0)` to poison ancestors. Day 11 range check, but min/max bubble up instead of bounds going down.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Tree DP + BST Validation (4-tuple combine)

**How to identify this from the problem statement:**
- **"BST subtree"** → need global ordering, not local child compare
- **"Maximum sum"** → aggregate `sum` in the same pass as validation
- **"Any subtree"** → global `ans` updated whenever a valid BST is confirmed

| Keyword / phrase | What it signals |
|---|---|
| "sum of BST" / "valid BST subtree" | Tuple: validity + min + max + sum |
| "largest / maximum" among subtrees | Global update on valid combine |
| "binary tree" (may not be BST overall) | Best answer may be strict sub-subtree |
| "node values can be negative" | Sum can decrease — still track max |

**Why this pattern works:** Day 11 validates with `(lo, hi)` descent. Here you need **both** validation and sum — bottom-up tuple merges them in one post-order pass.

**How a strong solver thinks before coding:**
1. *"null → (true, +∞, -∞, 0)."*
2. *"Get left/right tuples."*
3. *"Valid iff lb && rb && lmax < val < rmin."*
4. *"On valid: ans = max(ans, total); return (true, min(lmin,val), max(rmax,val), total)."*
5. *"On invalid: return poison tuple."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Check every subtree by inorder array** | O(n²) — re-flatten each candidate |
| **Day 11 range descent only** | Validates but doesn't compute sum in one pass |
| **Compare only left.val and right.val** | Misses deep violations (Day 11 trap tree) |
| **Return sum without validity flag** | Invalid subtree sum pollutes parent |
| **Separate DFS for sum and validate** | Two passes when one tuple suffices |

**The insight brute force misses:** `(isBST, min, max, sum)` is the **minimum information** a parent needs to decide both validity and aggregate.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Validate BST #98](https://leetcode.com/problems/validate-binary-search-tree/) | Boolean only | Range descent (Day 11) or tuple without sum |
| [Largest BST Subtree #333](https://leetcode.com/problems/largest-bst-subtree/) | Count nodes, not sum | Same tuple — track size instead of sum |
| [Maximum Binary Tree #654](https://leetcode.com/problems/maximum-binary-tree/) | Build, not validate | Different combine — same post-order trust |

Tuple combine is the S-Rank upgrade when optimization rides on subtree validity.

---

## 📖 Walkthrough

**Valid BST buried inside invalid outer tree.**

```
        1
       / \
      4   3
         / \
        2   5

dfs(4): (T, 4, 4, 4)
dfs(2): (T, 2, 2, 2)
dfs(5): (T, 5, 5, 5)
dfs(3): 2 < 3 < 5 → (T, 2, 5, 10)   ans = 10
dfs(1): 4 < 1? NO → (F, 0, 0, 0)

Whole tree invalid. Best BST = subtree at 3, sum = 2+3+5 = 10 ✓
```

**Poison propagation:**

```
When node 1 fails:
  returns (F, 0, 0, 0)
  parent (if any) sees lb or rb false → also invalid
  min/max from failed branch are IGNORED
```

> 💡 **The insight:** `lmax < node.val < rmin` is the entire Day 11 invariant compressed into two numbers from children.

---

## Solution

### C++
```cpp
class Solution {
    int ans = 0;
    // returns {isBST, minVal, maxVal, sum}
    tuple<bool,int,int,int> dfs(TreeNode* node) {
        if (!node) return {true, INT_MAX, INT_MIN, 0};
        auto [lb, lmin, lmax, lsum] = dfs(node->left);
        auto [rb, rmin, rmax, rsum] = dfs(node->right);
        if (lb && rb && lmax < node->val && node->val < rmin) {
            int total = lsum + rsum + node->val;
            ans = max(ans, total);
            return {true, min(lmin, node->val), max(rmax, node->val), total};
        }
        return {false, 0, 0, 0};
    }
public:
    int maxSumBST(TreeNode* root) {
        dfs(root);
        return ans;
    }
};
```

### Python
```python
class Solution:
    def maxSumBST(self, root: Optional[TreeNode]) -> int:
        self.ans = 0
        def dfs(node):
            if not node:
                return True, float('inf'), float('-inf'), 0
            lb, lmin, lmax, lsum = dfs(node.left)
            rb, rmin, rmax, rsum = dfs(node.right)
            if lb and rb and lmax < node.val < rmin:
                total = lsum + rsum + node.val
                self.ans = max(self.ans, total)
                return True, min(lmin, node.val), max(rmax, node.val), total
            return False, 0, 0, 0
        dfs(root)
        return self.ans
```

### Java
```java
class Solution {
    private int ans = 0;
    public int maxSumBST(TreeNode root) {
        dfs(root);
        return ans;
    }
    // returns int[]{isBST(1/0), min, max, sum}
    private int[] dfs(TreeNode node) {
        if (node == null) return new int[]{1, Integer.MAX_VALUE, Integer.MIN_VALUE, 0};
        int[] l = dfs(node.left), r = dfs(node.right);
        if (l[0]==1 && r[0]==1 && l[2] < node.val && node.val < r[1]) {
            int total = l[3] + r[3] + node.val;
            ans = Math.max(ans, total);
            return new int[]{1, Math.min(l[1], node.val), Math.max(r[2], node.val), total};
        }
        return new int[]{0, 0, 0, 0};
    }
}
```

**Complexity:** undefined
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"BST + optimize subtree"** → validity tuple, not range descent alone.
- **"lmax < val < rmin"** → Day 11 global invariant in bottom-up form.
- **"Poison on fail"** → `(false, 0, 0, 0)` stops bad sums propagating.
- **"Global ans on valid combine"** → best BST may not include root.

If you tried top-down range + separate sum dfs, compare — one tuple pass is cleaner and O(n).

> 🎯 **Pattern Unlocked:** Tree DP + BST Validation — `(isBST, min, max, sum)` combine.

---

*Both quests complete. Head to the checkpoint. →*
