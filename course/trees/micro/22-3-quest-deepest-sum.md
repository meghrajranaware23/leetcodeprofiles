<!-- hand-authored -->
# ⚔ Quest: Deepest Leaves Sum

> **Day 22** · [Deepest Leaves Sum #1302](https://leetcode.com/problems/deepest-leaves-sum/) · Medium · 15 min · 35 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Deepest Leaves Sum on LeetCode](https://leetcode.com/problems/deepest-leaves-sum/)**

> ⚔ **Hunter's rule:** BFS level batches — sum every value in the last wave. Links to Day 9 level-order and Day 17 level-end tracking. The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Deepest Leaves Sum #1302](https://leetcode.com/problems/deepest-leaves-sum/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? **BFS depth accumulation** — each level batch: `level_sum = 0`, add all vals, set `res = level_sum`. Last batch wins.

If you're stuck after 5 minutes: same inner loop as Day 17 bottom-left, but sum **all** nodes in the wave instead of capturing only the first.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** BFS Depth Accumulation

**How to identify this from the problem statement:**
- "Deepest leaves" → last BFS level
- "Sum" → aggregate whole level
- All deepest nodes count (not just one)

| Keyword / phrase | What it signals |
|---|---|
| "deepest level" / "deepest leaves" | Last BFS wave |
| "sum of values" | Accumulate per level |
| "leaf nodes at max depth" | Entire final batch |
| "binary tree" | Standard BFS enqueue |

**Why this pattern works:** BFS processes shallow to deep. Summing each level and keeping the last sum equals sum of deepest leaves.

**How a strong solver thinks before coding:**
1. *"while q not empty."*
2. *"level_sum = 0 at each batch start."*
3. *"Add every node.val in inner loop."*
4. *"res = level_sum after each batch."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **DFS find max depth then second pass** | Two traversals — one BFS enough |
| **Only leftmost deepest (Day 17 #513)** | Must sum **all** deepest nodes |
| **Global sum of all leaves** | Shallow leaves excluded |
| **No level separation** | Can't identify deepest only |

**The insight brute force misses:** Last level batch in BFS = exactly the deepest leaves.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Find Bottom Left #513](https://leetcode.com/problems/find-bottom-left-tree-value/) | Day 17 — first only | Same last level |
| [Level Order #102](https://leetcode.com/problems/binary-tree-level-order-traversal/) | Day 3 — collect all levels | Same BFS |
| [Average Levels #637](https://leetcode.com/problems/average-of-levels-in-binary-tree/) | Day 3 — mean per level | Level aggregate |

---

## 📖 Walkthrough

```
        1
       / \
      2   3
     / \   \
    4   5   6

Level 0: sum = 1
Level 1: sum = 5
Level 2: sum = 4+5+6 = 15  ✓

Deepest leaves {4,5,6} all in final wave.
```

> 💡 **The insight:** Day 17 tracked one node at level end; today sums the entire level end.

---

## Solution

### C++
```cpp
class Solution {
public:
    int deepestLeavesSum(TreeNode* root) {
        queue<TreeNode*> q;
        q.push(root);
        int res = 0;
        while (!q.empty()) {
            res = 0;
            for (int sz = q.size(); sz > 0; sz--) {
                TreeNode* node = q.front(); q.pop();
                res += node->val;
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
    def deepestLeavesSum(self, root: Optional[TreeNode]) -> int:
        q = deque([root])
        while q:
            level_sum = 0
            for _ in range(len(q)):
                node = q.popleft()
                level_sum += node.val
                if node.left:  q.append(node.left)
                if node.right: q.append(node.right)
        return level_sum
```

### Java
```java
class Solution {
    public int deepestLeavesSum(TreeNode root) {
        Queue<TreeNode> q = new LinkedList<>();
        q.offer(root);
        int res = 0;
        while (!q.isEmpty()) {
            res = 0;
            for (int sz = q.size(); sz > 0; sz--) {
                TreeNode node = q.poll();
                res += node.val;
                if (node.left != null)  q.offer(node.left);
                if (node.right != null) q.offer(node.right);
            }
        }
        return res;
    }
}
```

**Complexity:** undefined
---

## 💭 What Should Have Clicked in Your Mind?

- **"Deepest sum"** → last BFS level total.
- **"Sum all in wave"** → not Day 17 first-node only.
- **"Day 9 level loop"** → same engine, different aggregate.
- **"res reset each level"** → last assignment survives.

> 🎯 **Pattern Unlocked:** BFS Depth Accumulation

---

*Both quests complete. Head to the checkpoint. →*
