<!-- hand-authored -->
# ⚔ Quest: Bottom Left Tree Value

> **Day 17** · [Find Bottom Left Tree Value #513](https://leetcode.com/problems/find-bottom-left-tree-value/) · Medium · 15 min · 35 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Find Bottom Left Tree Value on LeetCode](https://leetcode.com/problems/find-bottom-left-tree-value/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. Draw the tree. Trace BFS level-by-level. The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Find Bottom Left Tree Value #513](https://leetcode.com/problems/find-bottom-left-tree-value/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? **BFS level-end first-node tracking** — at the start of each level batch, the first dequeued node is the leftmost at that depth. Overwrite `res` each level; the last overwrite is the answer.

If you're stuck after 5 minutes: use the Day 3 inner loop `for sz = q.size()`. When `i == 0`, that's the leftmost node of this wave.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** BFS Level-End Tracking

**How to identify this from the problem statement:**
- "Last row" + "leftmost" → BFS reaches deepest level last
- Leftmost at a level = first enqueued = first dequeued in that batch
- Single integer answer — no path list

| Keyword / phrase | What it signals |
|---|---|
| "bottom-left" / "last row leftmost" | BFS, first node per level |
| "deepest level" | Last BFS wave |
| "if last level has only right child" | Still first of that level |
| "binary tree" | Standard left-before-right enqueue |

**Why this pattern works:** BFS processes shallow before deep. Within each level, left children enqueue before right — first out = leftmost. Track first per level; deepest level's first wins.

**How a strong solver thinks before coding:**
1. *"BFS with level-size loop — Day 3 template."*
2. *"At i==0 in inner loop, res = node.val."*
3. *"After loop ends, res is bottom-left."*
4. *"Don't DFS — preorder doesn't guarantee deepest-left."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **DFS inorder / preorder** | Deepest-left ≠ leftmost leaf in DFS order |
| **Store all levels in array, pick last[0]** | Works but wastes space — track `res` inline |
| **Max depth DFS + left bias** | Misses when deepest level has nodes only on right subtree |
| **BFS without level separation** | Can't identify "first of deepest level" |

**The insight brute force misses:** One variable updated at each level start — O(1) extra space beyond the queue.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Deepest Leaves Sum #1302](https://leetcode.com/problems/deepest-leaves-sum/) | Sum all nodes at last level | Same level-end BFS |
| [Binary Tree Right Side View #199](https://leetcode.com/problems/binary-tree-right-side-view/) | **Day 9** — last node per level | Same inner loop, opposite end |
| [Level Order Traversal #102](https://leetcode.com/problems/binary-tree-level-order-traversal/) | Collect full level lists | Same BFS skeleton |

First vs last node per wave — same engine, different index.

---

## 📖 Walkthrough

```
        1
       / \
      2   3
     /   / \
    4   5   6

Level 0:  dequeue 1        → res = 1
Level 1:  dequeue 2 (i=0)  → res = 2
          dequeue 3
Level 2:  dequeue 4 (i=0)  → res = 4  ✓ answer

Left child enqueued before right at every node —
first out at deepest wave = bottom-left.
```

> 💡 **The insight:** You don't need to store levels. Overwrite `res` when `i == 0` each batch.

---

## Solution

### C++
```cpp
class Solution {
public:
    int findBottomLeftValue(TreeNode* root) {
        queue<TreeNode*> q;
        q.push(root);
        int res = root->val;
        while (!q.empty()) {
            int sz = q.size();
            for (int i = 0; i < sz; i++) {
                TreeNode* node = q.front(); q.pop();
                if (i == 0) res = node->val;
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
    def findBottomLeftValue(self, root: Optional[TreeNode]) -> int:
        q = deque([root])
        res = root.val
        while q:
            res = q[0].val
            for _ in range(len(q)):
                node = q.popleft()
                if node.left:  q.append(node.left)
                if node.right: q.append(node.right)
        return res
```

### Java
```java
class Solution {
    public int findBottomLeftValue(TreeNode root) {
        Queue<TreeNode> q = new LinkedList<>();
        q.offer(root);
        int res = root.val;
        while (!q.isEmpty()) {
            int sz = q.size();
            for (int i = 0; i < sz; i++) {
                TreeNode node = q.poll();
                if (i == 0) res = node.val;
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

- **"Bottom-left"** → BFS, not DFS.
- **"First of each level"** → `i == 0` in inner loop (or `res = q[0].val` before draining).
- **"Last overwrite wins"** → deepest level processed last.
- **"Day 3 skeleton"** → `while q` + `for sz`.

> 🎯 **Pattern Unlocked:** BFS Level-End Tracking

---

*One quest down. Next: column BFS map — simpler cousin of C-Rank #987. →*
