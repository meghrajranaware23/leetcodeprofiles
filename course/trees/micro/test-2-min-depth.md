<!-- hand-authored -->
# ⚔ E-Rank Test — Problem 2

> [Minimum Depth of Binary Tree #111](https://leetcode.com/problems/minimum-depth-of-binary-tree/) · Easy · 100 XP

---

You've completed your E-Rank training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Minimum Depth of Binary Tree on LeetCode](https://leetcode.com/problems/minimum-depth-of-binary-tree/)**

> ⚔ **Hunter's rule:** This is a rank test — treat it like real interview practice. Draw a tree with one missing child. Trace why `min(0, k)` is wrong. No peeking until you've genuinely tried.

---

## The Problem

Given a binary tree, find its **minimum depth** — the number of nodes along the shortest path from the root to a **leaf** node.

```
Input:       3
            / \
           9  20
             /  \
            15   7

Output: 2
Explanation: Shortest path is 3 → 9 (two nodes).

Input:       2
              \
               3
              /
             4

Output: 3
Explanation: Only path to leaf 4 has three nodes.
```

A **leaf** has no children. Minimum depth must end at a leaf, not at a null child.

---

## 💡 Hints

> 🎯 **What's being tested:** Day 1 ↑ bottom-up bubble — but **`min` not `max`**, with a one-child guard Max Depth didn't need.

**Hint 1:** Same skeleton as Max Depth #104: null → 0, else `1 + combine(children)`.

**Hint 2:** Use **`min`** of child depths when **both** children exist.

**Hint 3:** If **left is null**, you cannot take `min(0, right)` — the path must go through the non-null child: `1 + minDepth(right)`.

**Hint 4:** Symmetric: if **right is null**, return `1 + minDepth(left)`.

**Hint 5:** BFS also works (first leaf = answer) — but ↑ recursive is the Day 1/4 family this test expects you to know.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Bottom-Up Min Depth Bubble (Day 1 ↑ variant)

| Clue in the problem | What it signals |
|---|---|
| "minimum depth" | `min` instead of `max` |
| "shortest path to leaf" | Must reach actual leaf node |
| "binary tree" + return int | Bottom-up combine |
| One-child nodes | Skip null side — don't min with 0 |
| Contrast "maximum depth" | Same skeleton, different aggregate |

**Contrast with Max Depth #104:**

| Max Depth #104 | Min Depth #111 |
|---|---|
| `1 + max(L, R)` | `1 + min(L, R)` when both exist |
| null child depth 0 is fine in max | null child must not shorten path incorrectly |
| Always combine both | **Guard** one-child case |

**How a strong solver thinks before coding:**
1. *"null → 0."*
2. *"No left child → 1 + minDepth(right only)."*
3. *"No right child → 1 + minDepth(left only)."*
4. *"Both exist → 1 + min(L, R)."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **`1 + min(left, right)` without guards** | Root with one child returns 1 — wrong |
| **Copy Max Depth, change max to min only** | Classic trap on one-child nodes |
| **Treat null as depth 0 in min** | `min(0, 5) = 0` implies depth 1 at parent — not a leaf path |
| **DFS without leaf check** | Must define depth to **leaf**, not null |
| **Only BFS when recursive expected** | BFS valid; know ↑ fix for interviews |

**The insight brute force misses:** Min depth is the **evil twin** of Max Depth — same bubble, one extra branch when a child is missing.

---

## 🎯 Transfer to Unseen Problems

**Scenario:** *"Find closest leaf to root (min depth)."*

Same ↑ min depth or BFS first leaf.

**Scenario:** *"Minimum steps to reach a leaf (edges not nodes)."*

Same logic; adjust +1 counting — watch problem's edge vs node definition.

**30-second check:** *"One child? Don't min with 0. Both children? 1 + min(L,R)."*

---

<details>
<summary><strong>📖 Solution & Walkthrough</strong></summary>

Trace the pattern on the example tree from the problem statement. Then implement the recursive skeleton you identified.

### C++
```cpp
class Solution {
public:
    int minDepth(TreeNode* root) {
        if (!root) return 0;
        if (!root->left) return 1 + minDepth(root->right);
        if (!root->right) return 1 + minDepth(root->left);
        return 1 + min(minDepth(root->left), minDepth(root->right));
    }
};
```

### Python
```python
class Solution:
    def minDepth(self, root: Optional[TreeNode]) -> int:
        if not root:
            return 0
        if not root.left:
            return 1 + self.minDepth(root.right)
        if not root.right:
            return 1 + self.minDepth(root.left)
        return 1 + min(self.minDepth(root.left), self.minDepth(root.right))
```

### Java
```java
class Solution {
    public int minDepth(TreeNode root) {
        if (root == null) return 0;
        if (root.left == null) return 1 + minDepth(root.right);
        if (root.right == null) return 1 + minDepth(root.left);
        return 1 + Math.min(minDepth(root.left), minDepth(root.right));
    }
}
```

**Complexity:** O(n) time · O(h) space

</details>

---

## 💭 What Should Have Clicked in Your Mind?

- **"Minimum depth"** → Day 1 ↑ bubble with **min** — not max.
- **"One child null"** → Take the **only** non-null branch; never `min(0, k)`.
- **"Leaf"** → Path must end at node with no children.
- **Day 1 checkpoint preview** → This was the mini-challenge — now it's the test.

If Max Depth took 30 seconds, Min Depth should take 60 — add the one-child guards.

---

*2 of 3 test problems. Continue to the next. →*

## Solution

### C++
```cpp
class Solution {
public:
    int minDepth(TreeNode* root) {
        if (!root) return 0;
        queue<TreeNode*> q;
        q.push(root);
        int depth = 1;
        while (!q.empty()) {
            for (int sz = q.size(); sz > 0; sz--) {
                TreeNode* node = q.front(); q.pop();
                if (!node->left && !node->right) return depth;
                if (node->left)  q.push(node->left);
                if (node->right) q.push(node->right);
            }
            depth++;
        }
        return depth;
    }
};
```

### Python
```python
from collections import deque
class Solution:
    def minDepth(self, root: Optional[TreeNode]) -> int:
        if not root: return 0
        q, depth = deque([root]), 1
        while q:
            for _ in range(len(q)):
                node = q.popleft()
                if not node.left and not node.right:
                    return depth
                if node.left:  q.append(node.left)
                if node.right: q.append(node.right)
            depth += 1
        return depth
```

### Java
```java
class Solution {
    public int minDepth(TreeNode root) {
        if (root == null) return 0;
        Queue<TreeNode> q = new LinkedList<>();
        q.offer(root);
        int depth = 1;
        while (!q.isEmpty()) {
            for (int sz = q.size(); sz > 0; sz--) {
                TreeNode node = q.poll();
                if (node.left == null && node.right == null) return depth;
                if (node.left != null)  q.offer(node.left);
                if (node.right != null) q.offer(node.right);
            }
            depth++;
        }
        return depth;
    }
}
```

**Complexity:** undefined
