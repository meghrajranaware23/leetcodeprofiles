<!-- hand-authored -->
# ⚔ Quest: Vertical Order Traversal II

> **Day 17** · [Binary Tree Vertical Order Traversal #314](https://leetcode.com/problems/binary-tree-vertical-order-traversal/) · Medium · 15 min · 35 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Binary Tree Vertical Order Traversal on LeetCode](https://leetcode.com/problems/binary-tree-vertical-order-traversal/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. Label columns: root = 0, left = −1, right = +1. The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Binary Tree Vertical Order Traversal #314](https://leetcode.com/problems/binary-tree-vertical-order-traversal/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? **Column BFS map** — queue `(node, col)`; append `node.val` to `colMap[col]`; output columns sorted by key left-to-right.

If you're stuck after 5 minutes: this is **#314**, not C-Rank #987 — no `(row, val)` sort. BFS visit order within each column is correct.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Column BFS

**How to identify this from the problem statement:**
- "Vertical order" → group by column index
- No mention of row tie-break or value sort → #314 variant
- Return list of columns from leftmost to rightmost

| Keyword / phrase | What it signals |
|---|---|
| "vertical order traversal" | `map[col] → values` |
| "top to bottom" within column | BFS order (shallower first) |
| "left to right" across columns | Sort column keys |
| "binary tree" | col−1 on left, col+1 on right |

**Why this pattern works:** Column index is fixed by path from root. BFS ensures top-to-bottom within a column. Emit columns in ascending col order.

**How a strong solver thinks before coding:**
1. *"Root at col 0."*
2. *"Queue pairs (node, col)."*
3. *"colMap[col].push(val) on each visit."*
4. *"Return sorted column keys — TreeMap or sorted()."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Level-order BFS (#102)** | Groups by depth, not column |
| **#987 row+value sort on #314** | Over-engineering — not required |
| **DFS without caring about order** | May break top-to-bottom within column |
| **Unsorted column output** | Must go left column to right |

**The insight brute force misses:** #314 is the simpler sibling of C-Rank #987 — same column tagging, no multiset tie-break.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Vertical Order #987](https://leetcode.com/problems/vertical-order-traversal-of-a-binary-tree/) | C-Rank — sort by `(row, val)` | Same col tagging |
| [Find Bottom Left #513](https://leetcode.com/problems/find-bottom-left-tree-value/) | Today's first quest | Level-end vs column map |
| [Top View of Binary Tree](https://leetcode.com/problems/) | First/last per column by row | Column index same |

---

## 📖 Walkthrough

```
        3
       / \
      9   20
         /  \
        15   7

Column lines:
  -1: 9
   0: 3, 15
   1: 20
   2: 7

BFS (node, col):
  (3,0) → (9,-1) (20,1) → (15,0) (7,2)

colMap after BFS:
  -1:[9]  0:[3,15]  1:[20]  2:[7]

Output: [[9], [3,15], [20], [7]]
```

> 💡 **The insight:** #314 = column bucket + BFS order. #987 adds row/value sort when nodes share a column at different depths.

---

## Solution

### C++
```cpp
class Solution {
public:
    vector<vector<int>> verticalOrder(TreeNode* root) {
        if (!root) return {};
        map<int, vector<int>> colMap;
        queue<pair<TreeNode*, int>> q;
        q.push({root, 0});
        while (!q.empty()) {
            auto [node, col] = q.front(); q.pop();
            colMap[col].push_back(node->val);
            if (node->left)  q.push({node->left,  col - 1});
            if (node->right) q.push({node->right, col + 1});
        }
        vector<vector<int>> res;
        for (auto& [col, vals] : colMap) res.push_back(vals);
        return res;
    }
};
```

### Python
```python
from collections import defaultdict, deque
class Solution:
    def verticalOrder(self, root: Optional[TreeNode]) -> List[List[int]]:
        if not root: return []
        col_map = defaultdict(list)
        q = deque([(root, 0)])
        while q:
            node, col = q.popleft()
            col_map[col].append(node.val)
            if node.left:  q.append((node.left,  col - 1))
            if node.right: q.append((node.right, col + 1))
        return [col_map[c] for c in sorted(col_map)]
```

### Java
```java
class Solution {
    public List<List<Integer>> verticalOrder(TreeNode root) {
        List<List<Integer>> res = new ArrayList<>();
        if (root == null) return res;
        TreeMap<Integer, List<Integer>> colMap = new TreeMap<>();
        Queue<int[]> idxQ = new LinkedList<>();
        Queue<TreeNode> nodeQ = new LinkedList<>();
        nodeQ.offer(root); idxQ.offer(new int[]{0});
        while (!nodeQ.isEmpty()) {
            TreeNode node = nodeQ.poll();
            int col = idxQ.poll()[0];
            colMap.computeIfAbsent(col, k -> new ArrayList<>()).add(node.val);
            if (node.left != null)  { nodeQ.offer(node.left);  idxQ.offer(new int[]{col-1}); }
            if (node.right != null) { nodeQ.offer(node.right); idxQ.offer(new int[]{col+1}); }
        }
        return new ArrayList<>(colMap.values());
    }
}
```

**Complexity:** undefined
---

## 💭 What Should Have Clicked in Your Mind?

- **"Vertical order" without row tie-break** → #314, not #987.
- **"(node, col) in queue"** → column map fills in BFS order.
- **"Sorted column keys"** → left-to-right output.
- **"C-Rank Day 15 bridge"** → same col rule, simpler aggregation.

> 🎯 **Pattern Unlocked:** Column BFS

---

*Both quests complete. Head to the checkpoint. →*
