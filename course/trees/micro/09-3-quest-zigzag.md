<!-- hand-authored -->
# ⚔ Quest: Zigzag Level Order

> **Day 9** · [Binary Tree Zigzag Level Order Traversal #103](https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/) · Medium · 15 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Binary Tree Zigzag Level Order Traversal on LeetCode](https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. Track **leftToRight** flag each level. Trace deque pop/push ends. The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Binary Tree Zigzag Level Order Traversal #103](https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? **BFS direction alternation** — use a deque; even levels pop front / push back (L→R); odd levels pop back / push front (R→L). Toggle `leftToRight` after each level.

If you're stuck after 5 minutes: on reverse levels, push **right child before left** to the front — order matters for correct zigzag output.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** BFS Direction Alternation

**How to identify this from the problem statement:**
- **"Zigzag" / "spiral" level order** → alternate read direction per level
- Still **one level at a time** → inner level-size loop preserved
- Deque replaces queue for O(1) pop from both ends

| Keyword / phrase | What it signals |
|---|---|
| "zigzag" / "spiral" | Toggle direction each level |
| "left to right, then right to left" | Deque pop front vs back |
| "level order" variant | Day 3 BFS skeleton + direction flag |
| "return a list of lists" | Collect full level, then append |

**Why this pattern works:** Level boundaries stay the same as Day 3 — only the **order nodes exit the deque** changes per level.

**How a strong solver thinks before coding:**
1. *"Deque BFS, level-size loop."*
2. *"leftToRight: pop front, push children to back (L, R)."*
3. *"!leftToRight: pop back, push children to front (R, L)."*
4. *"Toggle flag; append level to result."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Normal BFS then reverse odd levels** | Works but extra pass — deque flip is cleaner |
| **Always pop front** | Only gives L→R every level |
| **Wrong push order on reverse level** | Output order scrambled |
| **DFS with depth + direction** | Possible but harder than deque BFS |

**The insight brute force misses:** Push order on reverse levels must mirror pop end — right child enters deque before left.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Binary Tree Level Order #102](https://leetcode.com/problems/binary-tree-level-order-traversal/) | Always L→R | Day 3 base template |
| [Right Side View #199](https://leetcode.com/problems/binary-tree-right-side-view/) | Last node only | Same wave, one capture |
| [Vertical Order #314](https://leetcode.com/problems/binary-tree-vertical-order-traversal/) | Column grouping | Different per-node metadata |

All start from **level-size BFS** — variation is what you do inside the inner loop.

---

## 📖 Walkthrough

**Deque direction flip each level.**

```
        3
       / \
      9   20
         /  \
        15   7

Level 0 (L→R): pop front 3        → [3]
Level 1 (R→L): pop back 20, then 9 → [20, 9]
Level 2 (L→R): pop front 15, then 7 → [15, 7]

Result: [[3], [20,9], [15,7]]

Reverse level (R→L) at node 20:
  pop back (20)
  push front: right(7) then left(15)
  → deque front-to-back for next pops: [15, 7] ... wait, we pop BACK
  Actually: after processing 20, deque has [9, 15, 7] from prior...
  Trace carefully: after level 1 starts with [9,20], R→L pops 20 first.
```

Step-by-step level 1:

```
Start level 1: deque = [9, 20]  (leftToRight was true last level → now false)

i=0: pop BACK → 20, push front: 7, then 15  → deque = [7, 15, 9]
i=1: pop BACK → 9,  level = [20, 9]
```

> 💡 **The insight:** Same level-size loop as Day 3 — deque end selection replaces simple `popleft()`.

---

## Solution

### C++
```cpp
class Solution {
public:
    vector<vector<int>> zigzagLevelOrder(TreeNode* root) {
        vector<vector<int>> res;
        if (!root) return res;
        queue<TreeNode*> q;
        q.push(root);
        bool leftToRight = true;
        while (!q.empty()) {
            int sz = q.size();
            deque<int> level;
            for (int i = 0; i < sz; i++) {
                TreeNode* node = q.front(); q.pop();
                if (leftToRight) level.push_back(node->val);
                else             level.push_front(node->val);
                if (node->left)  q.push(node->left);
                if (node->right) q.push(node->right);
            }
            res.push_back(vector<int>(level.begin(), level.end()));
            leftToRight = !leftToRight;
        }
        return res;
    }
};
```

### Python
```python
from collections import deque
class Solution:
    def zigzagLevelOrder(self, root: Optional[TreeNode]) -> List[List[int]]:
        if not root: return []
        res, q, left_to_right = [], deque([root]), True
        while q:
            level = deque()
            for _ in range(len(q)):
                node = q.popleft()
                if left_to_right: level.append(node.val)
                else:              level.appendleft(node.val)
                if node.left:  q.append(node.left)
                if node.right: q.append(node.right)
            res.append(list(level))
            left_to_right = not left_to_right
        return res
```

### Java
```java
class Solution {
    public List<List<Integer>> zigzagLevelOrder(TreeNode root) {
        List<List<Integer>> res = new ArrayList<>();
        if (root == null) return res;
        Queue<TreeNode> q = new LinkedList<>();
        q.offer(root);
        boolean leftToRight = true;
        while (!q.isEmpty()) {
            int sz = q.size();
            Deque<Integer> level = new ArrayDeque<>();
            for (int i = 0; i < sz; i++) {
                TreeNode node = q.poll();
                if (leftToRight) level.addLast(node.val);
                else             level.addFirst(node.val);
                if (node.left != null)  q.offer(node.left);
                if (node.right != null) q.offer(node.right);
            }
            res.add(new ArrayList<>(level));
            leftToRight = !leftToRight;
        }
        return res;
    }
}
```

**Complexity:** undefined
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Alternate direction per level"** → Deque + boolean flag.
- **"Same level boundaries as Day 3"** → Inner `for sz` loop unchanged.
- **"Reverse level: pop back, push front"** → Right child pushed before left.
- **"Toggle after each level"** → `left = !left`.

If output is correct but reversed within levels, check push order on the R→L pass.

> 🎯 **Pattern Unlocked:** BFS Direction Alternation — Day 3 waves + deque zigzag.

---

*Both quests complete. Head to the checkpoint. →*
