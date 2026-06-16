<!-- hand-authored -->
# ⚔ Quest: Longest ZigZag Path

> **Day 20** · [Longest ZigZag Path in a Binary Tree #1372](https://leetcode.com/problems/longest-zigzag-path-in-a-binary-tree/) · Medium · 15 min · 45 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Longest ZigZag Path in a Binary Tree on LeetCode](https://leetcode.com/problems/longest-zigzag-path-in-a-binary-tree/)**

> ⚔ **Hunter's rule:** Trace a path that alternates left/right. Track how many steps you've taken in the current direction. The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Longest ZigZag Path in a Binary Tree #1372](https://leetcode.com/problems/longest-zigzag-path-in-a-binary-tree/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? **Direction state DP** — pass `(l, r)` = longest zigzag ending here after arriving via left / right chain. Going left to child: `dfs(left, r+1, 0)`. Going right: `dfs(right, 0, l+1)`. Update global `ans`.

If you're stuck after 5 minutes: path can start anywhere — DFS from every node with initial `(0,0)`.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Direction State DP

**How to identify this from the problem statement:**
- Longest path with alternating left/right moves
- Path defined by **edges** (steps)
- Can start at any node

| Keyword / phrase | What it signals |
|---|---|
| "zigzag" / "alternate" | Direction state |
| "left then right then left" | Reset opposite dir on recurse |
| "longest path" (not root-to-leaf) | Global ans + DFS from all nodes |
| "number of edges" | Count steps in `(l,r)` |

**Why this pattern works:** Only the **last move direction** matters to extend — `(l, r)` captures enough state. Switch direction when recursing to child.

**How a strong solver thinks before coding:**
1. *"dfs(node, l, r) — l=left streak, r=right streak."*
2. *"ans = max(ans, l, r)."*
3. *"Left child: dfs(left, r+1, 0)."*
4. *"Right child: dfs(right, 0, l+1)."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Enumerate all paths** | O(n²) paths |
| **Only root-to-leaf** | Best zigzag may start mid-tree |
| **No direction tracking** | Can't enforce alternation |
| **Same direction twice** | Must reset opposite to 0 |

**The insight brute force misses:** Two integers `(l, r)` per frame replace path storage.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Longest Univalue Path #687](https://leetcode.com/problems/longest-univalue-path/) | Same value chain | Return + global |
| [Binary Tree Maximum Path Sum #124](https://leetcode.com/problems/binary-tree-maximum-path-sum/) | Day 7 — any path | Different combine |
| [Zigzag Level Order #103](https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/) | Day 9 BFS | Level order, not path |

---

## 📖 Walkthrough

```
        1
       / \
      2   1
         /
        3

dfs(1, 0, 0):
  ans = 0
  go left → dfs(2, 1, 0): ans = 1
  go right → dfs(1, 0, 1):
    go left → dfs(3, 2, 0): ans = 2  ✓ (1→1→3: R then L)

Two edges = zigzag length 2.
```

> 💡 **The insight:** `r+1` when going left because you **came from parent going left** — wait, when parent goes left to child, child extends **right** streak from parent's perspective... Template: left child gets `(r+1, 0)`.

---

## Solution

### C++
```cpp
class Solution {
    int ans = 0;
    // l = zigzag len if we arrived going left, r = if going right
    void dfs(TreeNode* node, int l, int r) {
        ans = max(ans, max(l, r));
        if (node->left)  dfs(node->left,  r + 1, 0);
        if (node->right) dfs(node->right, 0, l + 1);
    }
public:
    int longestZigZag(TreeNode* root) {
        dfs(root, 0, 0);
        return ans;
    }
};
```

### Python
```python
class Solution:
    def longestZigZag(self, root: Optional[TreeNode]) -> int:
        self.ans = 0
        def dfs(node, l, r):
            self.ans = max(self.ans, l, r)
            if node.left:  dfs(node.left,  r + 1, 0)
            if node.right: dfs(node.right, 0, l + 1)
        dfs(root, 0, 0)
        return self.ans
```

### Java
```java
class Solution {
    private int ans = 0;
    public int longestZigZag(TreeNode root) {
        dfs(root, 0, 0);
        return ans;
    }
    private void dfs(TreeNode node, int l, int r) {
        ans = Math.max(ans, Math.max(l, r));
        if (node.left  != null) dfs(node.left,  r + 1, 0);
        if (node.right != null) dfs(node.right, 0, l + 1);
    }
}
```

**Complexity:** undefined
---

## 💭 What Should Have Clicked in Your Mind?

- **"Alternate left/right"** → direction state.
- **"(l, r) passed down"** → streak lengths.
- **"Global ans"** → path can start anywhere.
- **"Switch: left child gets r+1"** → opposite direction extends.

> 🎯 **Pattern Unlocked:** Direction State DP

---

*Both quests complete. Head to the checkpoint. →*
