<!-- hand-authored -->
# ⚔ Quest: Average of Levels

> **Day 3** · [Average of Levels in Binary Tree #637](https://leetcode.com/problems/average-of-levels-in-binary-tree/) · Easy · 10 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Average of Levels in Binary Tree on LeetCode](https://leetcode.com/problems/average-of-levels-in-binary-tree/)**

> ⚔ **Hunter's rule:** Same queue as Level Order #102. Write `[3] → [9,20] → [15,7]`, then compute mean per batch. Hints are for *after* your attempt.

---

## The Problem

Given the root of a binary tree, return the **average value of nodes at each level**.

```
Input:       3
            / \
           9  20
             /  \
            15   7

Output: [3.00000, 14.50000, 11.00000]

Explanation:
  Level 0: 3 / 1 = 3.0
  Level 1: (9 + 20) / 2 = 14.5
  Level 2: (15 + 7) / 2 = 11.0
```

---

## 💡 Hints

Which pattern from today's concept applies? **BFS level computation** — identical queue skeleton to #102; instead of storing values, **sum** the batch and divide by `level_size`.

If stuck: you already wrote level-order grouping. Replace `level list` with `sum / sz`.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** BFS Level Aggregation (↔ Across + reduce)

**How to identify this from the problem statement:**
- "Each level" / "average" → BFS batch, then aggregate
- Same level structure as #102 → same `len(q)` loop
- Return one number per level → sum and divide

| Keyword / phrase | What it signals |
|---|---|
| "average of each level" | BFS + sum / count |
| "values at same depth" | Level batch boundary |
| "return array of doubles" | Divide integer sum by level size |
| "level order" family | Queue, not DFS |
| "sum" / "mean" per row | Reduce each batch |

**Why this pattern works:** Every node belongs to exactly one BFS batch. Summing that batch and dividing by its size is the definition of level average.

**How a strong solver thinks before coding:**
1. *"Same BFS as #102."*
2. *"Per batch: sum += node.val, count = level_size."*
3. *"Append sum / count to result."*
4. *"Use long for sum if values large (Java/C++)."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **DFS + depth index arrays** | Two passes or awkward indexing |
| **Store all level lists then average** | Extra memory — sum during batch |
| **Global node sum / total levels** | Loses per-level breakdown |
| **Floating divide after int sum only in Python** | Watch integer division in C++/Java |
| **Skip level_size — wrong denominator** | Average of mixed levels |

**The insight brute force misses:** #637 **is** #102 with a different last line. Reuse the skeleton.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Binary Tree Level Order Traversal #102](https://leetcode.com/problems/binary-tree-level-order-traversal/) | Collect values, not average | Same BFS batch |
| [Maximum Level Sum of a Binary Tree #1161](https://leetcode.com/problems/maximum-level-sum-of-a-binary-tree/) | Track max sum level | Sum per batch |
| [Find Largest Value in Each Tree Row #515](https://leetcode.com/problems/find-largest-value-in-each-tree-row/) | Max per batch | Same loop |

Same queue — different reducer (avg, max, sum).

---

## 📖 Walkthrough

**BFS batches with running sum per level.**

```
        3
       / \
      9  20
        /  \
       15   7

Queue flow: [3] → [9,20] → [15,7]

Level 0 — batch [3]:
  sum = 3, count = 1  →  avg = 3.0

Level 1 — batch [9, 20]:
  sum = 9 + 20 = 29, count = 2  →  avg = 14.5

Level 2 — batch [15, 7]:
  sum = 15 + 7 = 22, count = 2  →  avg = 11.0

Output: [3.0, 14.5, 11.0]  ✓
```

> 💡 **The insight:** `level_size` is both loop bound **and** divisor. Same nodes processed as #102 — only the accumulator changes.

---

## Solution

### C++
```cpp
class Solution {
public:
    vector<double> averageOfLevels(TreeNode* root) {
        vector<double> res;
        queue<TreeNode*> q;
        q.push(root);
        while (!q.empty()) {
            int sz = q.size();
            double sum = 0;
            for (int i = 0; i < sz; i++) {
                TreeNode* node = q.front(); q.pop();
                sum += node->val;
                if (node->left)  q.push(node->left);
                if (node->right) q.push(node->right);
            }
            res.push_back(sum / sz);
        }
        return res;
    }
};
```

### Python
```python
from collections import deque
class Solution:
    def averageOfLevels(self, root: Optional[TreeNode]) -> List[float]:
        res, q = [], deque([root])
        while q:
            n = len(q)
            total = 0
            for _ in range(n):
                node = q.popleft()
                total += node.val
                if node.left:  q.append(node.left)
                if node.right: q.append(node.right)
            res.append(total / n)
        return res
```

### Java
```java
class Solution {
    public List<Double> averageOfLevels(TreeNode root) {
        List<Double> res = new ArrayList<>();
        Queue<TreeNode> q = new LinkedList<>();
        q.offer(root);
        while (!q.isEmpty()) {
            int sz = q.size();
            double sum = 0;
            for (int i = 0; i < sz; i++) {
                TreeNode node = q.poll();
                sum += node.val;
                if (node.left != null)  q.offer(node.left);
                if (node.right != null) q.offer(node.right);
            }
            res.add(sum / sz);
        }
        return res;
    }
}
```

**Complexity:** undefined
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Average of levels"** → BFS — same as #102.
- **"Sum then divide"** → One pass per level; no need to store level list.
- **`level_size` = divisor** → Same number as loop iterations.
- **Not depth bubble** → Day 1 ↑ pattern doesn't group by level.

If you wrote recursion with depth parameter, compare to queue — BFS is cleaner here.

> 🎯 **Pattern Unlocked:** BFS level aggregation — batch, sum, divide.

---

*Both quests complete. Head to the checkpoint. →*
