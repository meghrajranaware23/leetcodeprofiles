<!-- hand-authored -->
# ⚔ S-Rank Test — Problem 1

> [Binary Tree Cameras #968](https://leetcode.com/problems/binary-tree-cameras/) · Hard · 300 XP

---

You've completed your S-Rank training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Binary Tree Cameras on LeetCode](https://leetcode.com/problems/binary-tree-cameras/)**

> ⚔ **Hunter's rule:** This is a rank test — treat it like real interview practice. At each node post-order, write child states: NOT_COVERED / HAS_CAMERA / COVERED. No peeking until you've genuinely tried.

---

## The Problem

See the full problem statement on LeetCode: **[Binary Tree Cameras #968](https://leetcode.com/problems/binary-tree-cameras/)**

---

## 💡 Hints

> 🎯 **What's being tested:** **3-state bottom-up DP** — deeper than B-Rank's same problem. You saw #968 on B-test; S-Rank expects you to derive the state machine cold and explain *why* greedy top-down fails.

**State machine (post-order):**

| Return | Meaning |
|---|---|
| `0` NOT_COVERED | Subtree root has no camera above/ below covering it |
| `1` HAS_CAMERA | This node has a camera |
| `2` COVERED | Monitored but no camera on this node |

**Transition at node `N` after `l = dfs(L)`, `r = dfs(R)`:**
- If `l==0 OR r==0` → place camera on `N`, `cameras++`, return `1`
- Else if `l==1 OR r==1` → `N` is covered by child's camera, return `2`
- Else → both children covered, no camera here, return `0`

**Root edge case:** if `dfs(root)==0`, root uncovered → add one camera.

**Why not greedy top-down?** Placing at root may waste cameras; optimal placement depends on **child coverage status** bubbling up — same family as Day 30 Distribute Coins post-order.

**Pattern name before coding:** *3-state post-order — place camera on parent when any child uncovered.*

---

## 🔍 Pattern Recognition Breakdown

**How to identify from the statement:**
- "Monitor all nodes" / "minimum cameras" → optimization on tree
- Coverage is **local to edges** — parent can cover child, child camera covers parent
- Greedy: **force camera on parent when child exposes NOT_COVERED**

**How a strong solver thinks before coding:**
1. *"null → COVERED (2) — empty needs no monitoring."*
2. *"Post-order: children first."*
3. *"Any child NOT_COVERED → camera here."*
4. *"After dfs(root), if NOT_COVERED → camera above root."*

**Deeper than B-test:** Explain *why* returning COVERED for null prevents false NOT_COVERED at leaves. Trace `[0,0,null,0,0]` — camera at root vs parent-of-leaves.

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Try all 2^n camera subsets** | Exponential — state DP is O(n) |
| **Greedy: camera at every node with uncovered child (top-down)** | Wrong on chains — miss optimal parent placement |
| **BFS level cameras** | Coverage is edge-based, not level-based |
| **Return boolean covered only** | Lose distinction HAS_CAMERA vs COVERED — parent needs to know if child has camera |

---

## 🎯 Transfer to Unseen Problems

Same 3-state skeleton applies when **child status forces parent action**:
- Guardians on tree nodes
- Minimum vertex cover variants on trees
- Day 30 Distribute Coins — different states, same post-order trust

If you solved B-test #968, S-Rank expects the **derivation**, not recall.

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

- **"Minimum cameras / cover all nodes"** → 3-state post-order — not B-test recall alone.
- **"Child NOT_COVERED → camera on me"** → greedy proven optimal on trees.
- **"null → COVERED"** → leaf with no children doesn't force parent camera.
- **"Root still NOT_COVERED"** → one final camera above root.

---

*1 of 3 test problems. Continue to the next. →*

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
