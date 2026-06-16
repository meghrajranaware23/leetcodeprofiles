<!-- hand-authored -->
# ⚔ Quest: Right Side View

> **Day 9** · [Binary Tree Right Side View #199](https://leetcode.com/problems/binary-tree-right-side-view/) · Medium · 15 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Binary Tree Right Side View on LeetCode](https://leetcode.com/problems/binary-tree-right-side-view/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. Trace BFS level waves — which node is **last** at each depth? The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Binary Tree Right Side View #199](https://leetcode.com/problems/binary-tree-right-side-view/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? **BFS last per level** — same level-size loop as Day 3 level order; record node when `i == sz - 1`.

If you're stuck after 5 minutes: you see the **rightmost** node at each depth — that's the last node dequeued in each BFS wave. DFS `root → right → left` also works, but BFS is the direct read.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** BFS Last Per Level

**How to identify this from the problem statement:**
- **"Top to bottom" + "right side"** → one node per depth
- **Not root-to-leaf path** → BFS, not Day 6 DFS
- Level boundary matters → inner `for sz = q.size()` loop

| Keyword / phrase | What it signals |
|---|---|
| "right side view" | Last node in each BFS level |
| "top level to bottom" | BFS waves, not DFS depth-first |
| "nodes you can see" | Rightmost wins ties at same depth |
| "level" implicit | `i == sz - 1` capture |

**Why this pattern works:** BFS processes left-to-right within a level. The last dequeued node at depth `d` is the rightmost visible from that direction.

**How a strong solver thinks before coding:**
1. *"Queue BFS, level-size inner loop (Day 3 skeleton)."*
2. *"For i from 0 to sz-1: dequeue; if i==sz-1 record."*
3. *"Enqueue left, then right."*
4. *"Not zigzag — always left-to-right dequeue."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **DFS without depth tracking** | Need `if depth > maxDepth[depth]` — works but less direct |
| **No level-size loop** | Can't identify "last of level" |
| **Record first node per level** | That's left side view, not right |
| **Preorder traversal** | Wrong visit order for level boundaries |

**The insight brute force misses:** Day 3's BFS skeleton + one `if i == sz-1` line IS the solution.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Binary Tree Level Order #102](https://leetcode.com/problems/binary-tree-level-order-traversal/) | Record all nodes per level | Same BFS wave (Day 3) |
| [Zigzag Level Order #103](https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/) | Alternate direction | Same wave, deque flip |
| [Find Bottom Left Tree Value #513](https://leetcode.com/problems/find-bottom-left-tree-value/) | First node, deepest level | BFS first per level |

All use **level-size BFS loop** from Day 3.

---

## 📖 Walkthrough

**Last dequeued node at each BFS wave = right side view.**

```
        1          Level 0: process [1]           → last = 1
       / \
      2   3        Level 1: process [2, 3]       → last = 3
     / \    \
    4   5    6      Level 2: process [4, 5, 6]    → last = 6

Answer: [1, 3, 6]

Inner loop at level 1:
  i=0: dequeue 2, enqueue 4,5
  i=1: dequeue 3, i==sz-1 → record 3 ✓
```

> 💡 **The insight:** Link to Day 3 — if you can level-order traverse, you can right-side view by recording one node per wave.

---

## Solution

### C++
```cpp
class Solution {
public:
    vector<int> rightSideView(TreeNode* root) {
        vector<int> res;
        if (!root) return res;
        queue<TreeNode*> q;
        q.push(root);
        while (!q.empty()) {
            int sz = q.size();
            for (int i = 0; i < sz; i++) {
                TreeNode* node = q.front(); q.pop();
                if (i == sz - 1) res.push_back(node->val);
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
    def rightSideView(self, root: Optional[TreeNode]) -> List[int]:
        if not root: return []
        res, q = [], deque([root])
        while q:
            n = len(q)
            for i in range(n):
                node = q.popleft()
                if i == n - 1: res.append(node.val)
                if node.left:  q.append(node.left)
                if node.right: q.append(node.right)
        return res
```

### Java
```java
class Solution {
    public List<Integer> rightSideView(TreeNode root) {
        List<Integer> res = new ArrayList<>();
        if (root == null) return res;
        Queue<TreeNode> q = new LinkedList<>();
        q.offer(root);
        while (!q.isEmpty()) {
            int sz = q.size();
            for (int i = 0; i < sz; i++) {
                TreeNode node = q.poll();
                if (i == sz - 1) res.add(node.val);
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

Before writing code, a strong solver's internal monologue sounds like this:

- **"One node per level, from the right"** → BFS last per level.
- **"Day 3 skeleton"** → `while q`, `sz = len(q)`, inner for-loop.
- **"i == sz - 1"** → The only addition to level-order traversal.
- **"Not DFS path"** → Horizontal waves, not root-to-leaf.

If you recorded the first node (`i == 0`), you'd solve left side view instead.

> 🎯 **Pattern Unlocked:** BFS Last Per Level — Day 3 queue + capture last of each wave.

---

*One quest down. Next: flip dequeue direction each level. →*
