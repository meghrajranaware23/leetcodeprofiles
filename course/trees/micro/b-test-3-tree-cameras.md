<!-- hand-authored -->
# ⚔ B-Rank Test — Problem 3

> [Binary Tree Cameras #968](https://leetcode.com/problems/binary-tree-cameras/) · Hard · 200 XP

---

You've completed your B-Rank training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Binary Tree Cameras on LeetCode](https://leetcode.com/problems/binary-tree-cameras/)**

> ⚔ **Hunter's rule:** This is a rank test — treat it like real interview practice. Bottom-up state DP: each node reports coverage status to parent. No peeking until you've genuinely tried.

---

## The Problem

See the full problem statement on LeetCode: **[Binary Tree Cameras #968](https://leetcode.com/problems/binary-tree-cameras/)**

---

## 💡 Hints

> 🎯 **What's being tested:** Day 20 **bottom-up state DP** — postorder returns one of three states: not covered, has camera, covered (no camera on this node).

- **0 = not covered** — parent must place camera to watch this node.
- **1 = has camera** — placed on this node.
- **2 = covered** — watched by child camera, none on this node.
- If any child **not covered** → place camera here → return 1, increment count.
- If any child **has camera** → this node covered → return 2.
- Else → return 0 (uncovered, defer to parent).
- After dfs(root), if root **not covered** → place one more camera.

**Pattern name before coding:** *Postorder 3-state coverage DP.*

---

## 🔍 Pattern Recognition Breakdown

**How to identify from the statement:**
- Minimize cameras covering all nodes → greedy-on-tree via states
- Local decision from child states only → postorder
- Root may remain uncovered after child pass → extra camera check

**How a strong solver thinks before coding:**
1. *"dfs returns 0/1/2."*
2. *"Child uncovered → camera here (1)."*
3. *"Child has camera → I'm covered (2)."*
4. *"Else uncovered (0) — parent handles."*
5. *"After root dfs: if 0 → cameras++."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Try all 2^n placements** | Exponential |
| **Top-down greedy only** | Misses optimal child-driven placement |
| **Two states only** | Can't distinguish "covered by child" vs "has camera" |
| **Forget root uncovered case** | Off-by-one on single-node or line trees |

---

## 🎯 Transfer to Unseen Problems

Same postorder state family as Day 20 House Robber III `(rob, skip)` — children report status, parent decides. Also relates to **Dijkstra/guard problems** on trees — local 3-state is the tree-optimal template.

---

<details>
<summary><strong>📖 Solution & Walkthrough</strong></summary>

Trace the pattern on the example tree from the problem statement. Then implement the recursive skeleton you identified.

### C++
```cpp
class Solution {
    // 0=not covered, 1=has camera, 2=covered (no camera)
    int cameras = 0;
    int dfs(TreeNode* node) {
        if (!node) return 2;
        int l = dfs(node->left), r = dfs(node->right);
        if (l == 0 || r == 0) { cameras++; return 1; }
        if (l == 1 || r == 1) return 2;
        return 0;
    }
public:
    int minCameraCover(TreeNode* root) {
        if (dfs(root) == 0) cameras++;
        return cameras;
    }
};
```

### Python
```python
class Solution:
    def minCameraCover(self, root: Optional[TreeNode]) -> int:
        self.cameras = 0
        NOT_COVERED, HAS_CAMERA, COVERED = 0, 1, 2
        def dfs(node):
            if not node: return COVERED
            l, r = dfs(node.left), dfs(node.right)
            if l == NOT_COVERED or r == NOT_COVERED:
                self.cameras += 1; return HAS_CAMERA
            if l == HAS_CAMERA or r == HAS_CAMERA: return COVERED
            return NOT_COVERED
        if dfs(root) == NOT_COVERED: self.cameras += 1
        return self.cameras
```

### Java
```java
class Solution {
    private static final int NOT_COVERED=0, HAS_CAMERA=1, COVERED=2;
    private int cameras = 0;
    public int minCameraCover(TreeNode root) {
        if (dfs(root) == NOT_COVERED) cameras++;
        return cameras;
    }
    private int dfs(TreeNode node) {
        if (node == null) return COVERED;
        int l = dfs(node.left), r = dfs(node.right);
        if (l == NOT_COVERED || r == NOT_COVERED) { cameras++; return HAS_CAMERA; }
        if (l == HAS_CAMERA || r == HAS_CAMERA) return COVERED;
        return NOT_COVERED;
    }
}
```

**Complexity:** undefined

</details>

---

## 💭 What Should Have Clicked in Your Mind?

- **"Min cameras cover tree"** → postorder 3-state.
- **"Child uncovered → camera now"** → greedy works on trees.
- **"Null returns COVERED"** — empty child doesn't force placement.
- **"Root still 0 after dfs"** → one more camera.

---

*3 of 3 test problems. Continue to the next. →*

## Solution

### C++
```cpp
class Solution {
    // 0=not covered, 1=has camera, 2=covered (no camera)
    int cameras = 0;
    int dfs(TreeNode* node) {
        if (!node) return 2;
        int l = dfs(node->left), r = dfs(node->right);
        if (l == 0 || r == 0) { cameras++; return 1; }
        if (l == 1 || r == 1) return 2;
        return 0;
    }
public:
    int minCameraCover(TreeNode* root) {
        if (dfs(root) == 0) cameras++;
        return cameras;
    }
};
```

### Python
```python
class Solution:
    def minCameraCover(self, root: Optional[TreeNode]) -> int:
        self.cameras = 0
        NOT_COVERED, HAS_CAMERA, COVERED = 0, 1, 2
        def dfs(node):
            if not node: return COVERED
            l, r = dfs(node.left), dfs(node.right)
            if l == NOT_COVERED or r == NOT_COVERED:
                self.cameras += 1; return HAS_CAMERA
            if l == HAS_CAMERA or r == HAS_CAMERA: return COVERED
            return NOT_COVERED
        if dfs(root) == NOT_COVERED: self.cameras += 1
        return self.cameras
```

### Java
```java
class Solution {
    private static final int NOT_COVERED=0, HAS_CAMERA=1, COVERED=2;
    private int cameras = 0;
    public int minCameraCover(TreeNode root) {
        if (dfs(root) == NOT_COVERED) cameras++;
        return cameras;
    }
    private int dfs(TreeNode node) {
        if (node == null) return COVERED;
        int l = dfs(node.left), r = dfs(node.right);
        if (l == NOT_COVERED || r == NOT_COVERED) { cameras++; return HAS_CAMERA; }
        if (l == HAS_CAMERA || r == HAS_CAMERA) return COVERED;
        return NOT_COVERED;
    }
}
```

**Complexity:** undefined
