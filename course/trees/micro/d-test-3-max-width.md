<!-- hand-authored -->
# ⚔ D-Rank Test — Problem 3

> [Maximum Width of Binary Tree #662](https://leetcode.com/problems/maximum-width-of-binary-tree/) · Medium · 100 XP

---

You've completed your D-Rank training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Maximum Width of Binary Tree on LeetCode](https://leetcode.com/problems/maximum-width-of-binary-tree/)**

> ⚔ **Hunter's rule:** This is a rank test — treat it like real interview practice. Assign index positions during BFS. No peeking until you've genuinely tried.

---

## The Problem

See the full problem statement on LeetCode: **[Maximum Width of Binary Tree #662](https://leetcode.com/problems/maximum-width-of-binary-tree/)**

---

## 💡 Hints

> 🎯 **What's being tested:** Day 9 BFS with **index tracking** — treat the tree like a complete binary heap: left child = `2*i`, right child = `2*i+1`.

- Use Day 3 level-size BFS loop — but queue stores `(node, index)` pairs.
- At each level: `width = rightmost_index - leftmost_index + 1`; update global max.
- **Overflow guard:** when pushing children, normalize by subtracting `left` index of the level (or use `unsigned long long`).
- Width is measured between **end nodes of each level**, including gaps where nulls would be in a complete tree — indices capture those gaps.

**Pattern name before coding:** *BFS level loop + positional indexing — Day 9 extension.*

---

## 🔍 Pattern Recognition Breakdown

**How to identify from the statement:**
- "Maximum width" + "levels" → BFS level-by-level (Day 3 / Day 9)
- Width includes null gaps between end nodes → need **index positions**, not just node count
- "Index as in complete binary tree" → parent `i`, children `2i` and `2i+1`

**How a strong solver thinks before coding:**
1. *"BFS with (node, idx) in queue; root idx = 0."*
2. *"Each level: record left idx (first dequeued), right idx (last dequeued)."*
3. *"ans = max(ans, right - left + 1)."*
4. *"Enqueue children with doubled indices."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Count nodes per level** | Ignores gaps — width ≠ node count |
| **DFS without index** | Hard to compare leftmost/rightmost positions across subtrees |
| **Store entire level array with nulls** | Memory-heavy; index math is cleaner |
| **int overflow on deep trees** | Use `long long` / normalize indices each level |

---

## 🎯 Transfer to Unseen Problems

Same BFS-index idea appears in complete-tree validation and heap-style tree indexing. Combines Day 3 level BFS with arithmetic indexing — a natural Day 9 stretch.

---

<details>
<summary><strong>📖 Solution & Walkthrough</strong></summary>

Trace the pattern on the example tree from the problem statement. Then implement the recursive skeleton you identified.

### C++
```cpp
class Solution {
public:
    int widthOfBinaryTree(TreeNode* root) {
        if (!root) return 0;
        int ans = 0;
        queue<pair<TreeNode*, unsigned long long>> q;
        q.push({root, 0});
        while (!q.empty()) {
            int sz = q.size();
            unsigned long long left = q.front().second;
            unsigned long long right = left;
            for (int i = 0; i < sz; ++i) {
                auto [node, idx] = q.front(); q.pop();
                right = idx;
                if (node->left) q.push({node->left, idx * 2});
                if (node->right) q.push({node->right, idx * 2 + 1});
            }
            ans = max(ans, (int)(right - left + 1));
        }
        return ans;
    }
};
```

### Python
```python
class Solution:
    def widthOfBinaryTree(self, root: Optional[TreeNode]) -> int:
        if not root:
            return 0
        ans = 0
        q = deque([(root, 0)])
        while q:
            n = len(q)
            left = q[0][1]
            right = left
            for _ in range(n):
                node, idx = q.popleft()
                right = idx
                if node.left:
                    q.append((node.left, idx * 2))
                if node.right:
                    q.append((node.right, idx * 2 + 1))
            ans = max(ans, right - left + 1)
        return ans
```

### Java
```java
class Solution {
    public int widthOfBinaryTree(TreeNode root) {
        if (root == null) return 0;
        int ans = 0;
        Deque<TreeNode> q = new ArrayDeque<>();
        Deque<Long> idx = new ArrayDeque<>();
        q.offer(root); idx.offer(0L);
        while (!q.isEmpty()) {
            int sz = q.size();
            long left = idx.peekFirst(), right = left;
            for (int i = 0; i < sz; i++) {
                TreeNode node = q.pollFirst();
                long id = idx.pollFirst();
                right = id;
                if (node.left != null) { q.offerLast(node.left); idx.offerLast(id * 2); }
                if (node.right != null) { q.offerLast(node.right); idx.offerLast(id * 2 + 1); }
            }
            ans = Math.max(ans, (int)(right - left + 1));
        }
        return ans;
    }
}
```

**Complexity:** O(n) time · O(n) space

</details>

---

## 💭 What Should Have Clicked in Your Mind?

- **"Width including null gaps"** → Index positions, not node count.
- **"Day 3 BFS + index pairs"** → Same level-size loop, extra metadata.
- **"2*i and 2*i+1"** → Complete-tree indexing formula.
- **"Max over levels"** → Track leftmost and rightmost index each wave.

---

*3 of 3 test problems. Continue to the next. →*

## Solution

### C++
```cpp
class Solution {
public:
    int widthOfBinaryTree(TreeNode* root) {
        if (!root) return 0;
        int res = 1;
        queue<pair<TreeNode*, unsigned long long>> q;
        q.push({root, 0ULL});
        while (!q.empty()) {
            int sz = q.size();
            unsigned long long start = q.front().second;
            unsigned long long end   = start;
            for (int i = 0; i < sz; i++) {
                auto [node, idx] = q.front(); q.pop();
                unsigned long long norm = idx - start;
                end = norm;
                if (node->left)  q.push({node->left,  2 * norm});
                if (node->right) q.push({node->right, 2 * norm + 1});
            }
            res = max(res, (int)(end + 1));
        }
        return res;
    }
};
```

### Python
```python
from collections import deque
class Solution:
    def widthOfBinaryTree(self, root: Optional[TreeNode]) -> int:
        if not root: return 0
        res, q = 1, deque([(root, 0)])
        while q:
            n = len(q)
            start = q[0][1]
            end = start
            for _ in range(n):
                node, idx = q.popleft()
                norm = idx - start
                end = norm
                if node.left:  q.append((node.left,  2 * norm))
                if node.right: q.append((node.right, 2 * norm + 1))
            res = max(res, end + 1)
        return res
```

### Java
```java
class Solution {
    public int widthOfBinaryTree(TreeNode root) {
        if (root == null) return 0;
        int res = 1;
        Queue<long[]> idxQ = new LinkedList<>();
        Queue<TreeNode> nodeQ = new LinkedList<>();
        nodeQ.offer(root); idxQ.offer(new long[]{0});
        while (!nodeQ.isEmpty()) {
            int sz = nodeQ.size();
            long start = idxQ.peek()[0], end = start;
            for (int i = 0; i < sz; i++) {
                TreeNode node = nodeQ.poll();
                long norm = idxQ.poll()[0] - start;
                end = norm;
                if (node.left  != null) { nodeQ.offer(node.left);  idxQ.offer(new long[]{2*norm}); }
                if (node.right != null) { nodeQ.offer(node.right); idxQ.offer(new long[]{2*norm+1}); }
            }
            res = (int) Math.max(res, end + 1);
        }
        return res;
    }
}
```

**Complexity:** undefined
