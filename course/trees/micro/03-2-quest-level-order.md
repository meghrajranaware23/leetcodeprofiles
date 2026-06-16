<!-- hand-authored -->
# ⚔ Quest: Level Order Traversal

> **Day 3** · [Binary Tree Level Order Traversal #102](https://leetcode.com/problems/binary-tree-level-order-traversal/) · Medium · 15 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Binary Tree Level Order Traversal on LeetCode](https://leetcode.com/problems/binary-tree-level-order-traversal/)**

> ⚔ **Hunter's rule:** Draw the tree. Write queue snapshots: `[3] → [9,20] → [15,7]`. No DFS. Hints are for *after* your attempt.

---

## The Problem

Given the root of a binary tree, return the **level order** traversal as a list of lists — each inner list is one level left-to-right.

```
Input:       3
            / \
           9  20
             /  \
            15   7

Output: [[3], [9, 20], [15, 7]]
```

---

## 💡 Hints

Which pattern from today's concept applies? **BFS with queue** — snapshot `len(q)` at the start of each outer loop; that batch is one level.

If stuck: do not recurse depth-first. Enqueue root, then repeatedly drain exactly `len(q)` nodes before starting the next level list.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** BFS Level Batch (↔ Across compass)

**How to identify this from the problem statement:**
- "Level order" / "row by row" → BFS, not DFS
- Return grouped by level → need `level_size` boundary
- Binary tree → enqueue left then right children

| Keyword / phrase | What it signals |
|---|---|
| "level order traversal" | Queue + per-level loop |
| "return a list of lists" | One inner list per BFS batch |
| "each level left to right" | Dequeue order + enqueue left, right |
| "nodes at same depth" | `for _ in range(len(q))` |
| "zigzag" / "right side" (related) | Same BFS skeleton, different processing |

**Why this pattern works:** Queue FIFO guarantees nodes are processed in non-decreasing depth. Freezing `len(q)` separates generations.

**How a strong solver thinks before coding:**
1. *"Empty root → return []."*
2. *"queue = [root]."*
3. *"While queue: level_size = len(q); drain level_size nodes."*
4. *"Append level list to result."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **DFS with depth map** | Extra hash map; BFS is direct |
| **No level_size — process until queue empty in one loop** | Single flat list — wrong shape |
| **Preorder traversal + guess levels** | Visit order ≠ level grouping |
| **BFS without grouping** | Returns `[3,9,20,15,7]` not `[[3],[9,20],...]` |
| **Enqueue null nodes** | Pollutes queue with useless entries |

**The insight brute force misses:** The `level_size = len(q)` line **is** the algorithm. Without it, levels bleed together.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Binary Tree Level Order Traversal II #107](https://leetcode.com/problems/binary-tree-level-order-traversal-ii/) | Reverse result list | Same BFS, flip at end |
| [Binary Tree Right Side View #199](https://leetcode.com/problems/binary-tree-right-side-view/) | Keep last node per level | Same batch loop |
| [Average of Levels in Binary Tree #637](https://leetcode.com/problems/average-of-levels-in-binary-tree/) | Sum / count per level | Same skeleton (Quest 2) |

Same queue batch — different per-level aggregation.

---

## 📖 Walkthrough

**Queue levels — no recursion down a spine.**

```
        3
       / \
      9  20
        /  \
       15   7

Initial: q = [3]

── Level 0 (level_size = 1) ──
  dequeue 3 → level = [3]
  enqueue 9, 20        q = [9, 20]
  result = [[3]]

── Level 1 (level_size = 2) ──
  dequeue 9  → level = [9]
  dequeue 20 → level = [9, 20]
  enqueue 15, 7        q = [15, 7]
  result = [[3], [9, 20]]

── Level 2 (level_size = 2) ──
  dequeue 15 → level = [15]
  dequeue 7  → level = [15, 7]
  no children            q = []
  result = [[3], [9, 20], [15, 7]]  ✓
```

> 💡 **The insight:** Children enqueued while processing level 1 sit in queue for level 2 — because you only dequeue `level_size` times per outer loop.

---

## Solution

### C++
```cpp
class Solution {
public:
    vector<vector<int>> levelOrder(TreeNode* root) {
        vector<vector<int>> res;
        if (!root) return res;
        queue<TreeNode*> q;
        q.push(root);
        while (!q.empty()) {
            int sz = q.size();
            res.push_back({});
            for (int i = 0; i < sz; i++) {
                TreeNode* node = q.front(); q.pop();
                res.back().push_back(node->val);
                if (node->left)  q.push(node->left);
                if (node->right) q.push(node->right);
            }
        }
        return res;
    }
};
```

### Python
```python
from collections import deque
class Solution:
    def levelOrder(self, root: Optional[TreeNode]) -> List[List[int]]:
        if not root:
            return []
        res, q = [], deque([root])
        while q:
            level = []
            for _ in range(len(q)):
                node = q.popleft()
                level.append(node.val)
                if node.left:  q.append(node.left)
                if node.right: q.append(node.right)
            res.append(level)
        return res
```

### Java
```java
class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> res = new ArrayList<>();
        if (root == null) return res;
        Queue<TreeNode> q = new LinkedList<>();
        q.offer(root);
        while (!q.isEmpty()) {
            int sz = q.size();
            List<Integer> level = new ArrayList<>();
            for (int i = 0; i < sz; i++) {
                TreeNode node = q.poll();
                level.add(node.val);
                if (node.left != null)  q.offer(node.left);
                if (node.right != null) q.offer(node.right);
            }
            res.add(level);
        }
        return res;
    }
}
```

**Complexity:** undefined
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Level order"** → BFS queue — not inorder/preorder from Day 2.
- **`len(q)` snapshot** → One batch = one level.
- **Enqueue after dequeue** → New nodes wait for next outer loop.
- **2D output** → Append one list per batch.

If you got a flat list, you skipped the level boundary loop.

> 🎯 **Pattern Unlocked:** BFS level batch — `[3] → [9,20] → [15,7]`.

---

*One quest down. Next: same BFS skeleton, but average each level's values. →*
