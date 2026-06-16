<!-- hand-authored -->
# ⚔ Quest: Vertical Order Traversal

> **Day 15** · [Vertical Order Traversal of a Binary Tree #987](https://leetcode.com/problems/vertical-order-traversal-of-a-binary-tree/) · Hard · 25 min · 25 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Vertical Order Traversal of a Binary Tree on LeetCode](https://leetcode.com/problems/vertical-order-traversal-of-a-binary-tree/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. Label every node with `(col, row)`. Group by column, sort by row then value. The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Vertical Order Traversal of a Binary Tree #987](https://leetcode.com/problems/vertical-order-traversal-of-a-binary-tree/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? **Column coordinate BFS/DFS** — tag `(col, row, val)`; collect into column buckets sorted by `(row, val)`.

If you're stuck after 5 minutes: BFS with `(col, row)` in queue; `map[col][row]` as multiset for value tie-break; output columns left-to-right.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Column Coordinate BFS

**How to identify this from the problem statement:**
- "Vertical order" → group by **column**, not level
- Same column + same row → sort by **value** ascending
- Output: list of columns left-to-right

| Keyword / phrase | What it signals |
|---|---|
| "vertical order traversal" | Column map (col, row, val) |
| "row order" within column | Sort by row ascending |
| "if same row and column" | Tie-break by value — multiset |
| "binary tree" | col-1 left, col+1 right |

**Why this pattern works:** Column index is deterministic from path (left = -1, right = +1 per level). Collect all tagged nodes, sort/group, emit columns.

**How a strong solver thinks before coding:**
1. *"Root at (0, 0)."*
2. *"BFS/DFS: push (left, c-1, r+1), (right, c+1, r+1)."*
3. *"Bucket by col; within col sort by (row, val)."*
4. *"Output cols from min to max."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Level-order BFS (#102)** | Groups by depth, not column — wrong output |
| **Inorder traversal** | Not column order for general trees |
| **Ignore value tie-break** | Wrong on #987 test cases |
| **Nested list without sort** | Nodes arrive BFS order — must sort by row |

**The insight brute force misses:** Two nodes at different depths can share a column (e.g. root and left-right child). Row sort disambiguates.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Binary Tree Vertical Order (lintcode classic)](https://leetcode.com/) | No value tie-break | Simpler sort by row only |
| [Top View of Binary Tree](https://leetcode.com/problems/) | First/last node per column by row | Column tagging same |
| [Boundary of Binary Tree #545](https://leetcode.com/problems/boundary-of-binary-tree/) | Today's second quest | Perimeter, not columns |

Same tagging `(col, row)` — different aggregation rule.

---

## 📖 Walkthrough

**Sample from concept page — column grouping:**

```
        3
       / \
      9   20
         /  \
        15   7

Tagged:
  (-1,1,9)  (0,0,3)  (1,1,20)  (0,2,15)  (2,2,7)

Column -1: [9]
Column  0: [3, 15]   ← row 0 before row 2
Column  1: [20]
Column  2: [7]

Output: [[9], [3,15], [20], [7]]
```

> 💡 **The insight:** `(col, row, val)` triple fully determines placement — traversal order doesn't matter after sort.

---

## Solution

### C++
```cpp
class Solution {
public:
    vector<vector<int>> verticalTraversal(TreeNode* root) {
        vector<tuple<int,int,int>> nodes;
        function<void(TreeNode*,int,int)> dfs = [&](TreeNode* node, int row, int col) {
            if (!node) return;
            nodes.emplace_back(col, row, node->val);
            dfs(node->left,  row+1, col-1);
            dfs(node->right, row+1, col+1);
        };
        dfs(root, 0, 0);
        sort(nodes.begin(), nodes.end());
        vector<vector<int>> res;
        int prevCol = INT_MIN;
        for (auto& [col, row, val] : nodes) {
            if (col != prevCol) { res.push_back({}); prevCol = col; }
            res.back().push_back(val);
        }
        return res;
    }
};
```

### Python
```python
class Solution:
    def verticalTraversal(self, root: Optional[TreeNode]) -> List[List[int]]:
        nodes = []
        def dfs(node, row, col):
            if not node: return
            nodes.append((col, row, node.val))
            dfs(node.left,  row+1, col-1)
            dfs(node.right, row+1, col+1)
        dfs(root, 0, 0)
        nodes.sort()
        res, prev_col = [], None
        for col, row, val in nodes:
            if col != prev_col:
                res.append([])
                prev_col = col
            res[-1].append(val)
        return res
```

### Java
```java
class Solution {
    private List<int[]> nodes = new ArrayList<>();
    public List<List<Integer>> verticalTraversal(TreeNode root) {
        dfs(root, 0, 0);
        nodes.sort((a,b) -> a[0]!=b[0] ? a[0]-b[0] : a[1]!=b[1] ? a[1]-b[1] : a[2]-b[2]);
        List<List<Integer>> res = new ArrayList<>();
        int prevCol = Integer.MIN_VALUE;
        for (int[] n : nodes) {
            if (n[0] != prevCol) { res.add(new ArrayList<>()); prevCol = n[0]; }
            res.get(res.size()-1).add(n[2]);
        }
        return res;
    }
    private void dfs(TreeNode node, int row, int col) {
        if (node == null) return;
        nodes.add(new int[]{col, row, node.val});
        dfs(node.left,  row+1, col-1);
        dfs(node.right, row+1, col+1);
    }
}
```

**Complexity:** undefined
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Vertical order"** → column map, not level BFS.
- **"(col, row, val)"** → tag every node; sort handles order.
- **"Same row + col"** → multiset / sort by val.
- **"Left col-1, right col+1"** → fixed coordinate rule.

If you used level-order #102 template, redraw with column lines on paper.

> 🎯 **Pattern Unlocked:** Column Coordinate BFS — tag, sort, group by col.

---

*One quest down. Next: boundary three-pass perimeter. →*
