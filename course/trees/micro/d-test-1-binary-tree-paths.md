<!-- hand-authored -->
# ⚔ D-Rank Test — Problem 1

> [Binary Tree Paths #257](https://leetcode.com/problems/binary-tree-paths/) · Easy · 100 XP

---

You've completed your D-Rank training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Binary Tree Paths on LeetCode](https://leetcode.com/problems/binary-tree-paths/)**

> ⚔ **Hunter's rule:** This is a rank test — treat it like real interview practice. Draw the tree. Trace the path prefix at each node. No peeking until you've genuinely tried.

---

## The Problem

See the full problem statement on LeetCode: **[Binary Tree Paths #257](https://leetcode.com/problems/binary-tree-paths/)**

---

## 💡 Hints

> 🎯 **What's being tested:** Day 6 top-down accumulation — build path strings root-to-leaf, record at every leaf.

- **Root-to-leaf** → prefix only makes sense on the way **down** (Day 6, not Day 7).
- At each node: append `node.val`; if leaf, push full string to result; else append `"->"` and recurse both children.
- You can pass string by value (`path + '->'`) — no backtrack needed if strings are immutable (Python/Java).
- C++: pass string, append at leaf, append `"->"` before children — or use backtrack push/pop like Path Sum II.

**Pattern name before coding:** *Top-down path accumulation — collect at leaves.*

---

## 🔍 Pattern Recognition Breakdown

**How to identify from the statement:**
- "All paths from **root to leaf**" → downward prefix, not bottom-up
- "Return as strings `1->2->3`" → accumulate and format at leaves
- No target sum → simpler than Path Sum II (no remainder check, no pop unless mutating one buffer)

**How a strong solver thinks before coding:**
1. *"Draw example tree — list every root-to-leaf string."*
2. *"Leaf = no left AND no right → save path."*
3. *"Internal → extend path with `->` and recurse."*
4. *"Day 6, not BFS — paths are vertical threads."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **BFS level order** | Doesn't trace root-to-leaf threads |
| **Bottom-up from leaves** | Can't reconstruct prefix without downward walk |
| **Store nodes, format later** | Works but top-down string build is direct |
| **Forget leaf check** | Internal nodes aren't valid path endpoints |

---

## 🎯 Transfer to Unseen Problems

Same family as [Path Sum II #113](https://leetcode.com/problems/path-sum-ii/) and [Sum Root to Leaf #129](https://leetcode.com/problems/sum-root-to-leaf-numbers/) — all Day 6 top-down. #257 is the string-collect variant without a target filter.

---

<details>
<summary><strong>📖 Solution & Walkthrough</strong></summary>

Trace the pattern on the example tree from the problem statement. Then implement the recursive skeleton you identified.

### C++
```cpp
class Solution {
    void dfs(TreeNode* node, string path, vector<string>& res) {
        if (!node) return;
        path += to_string(node->val);
        if (!node->left && !node->right) { res.push_back(path); return; }
        path += "->";
        dfs(node->left, path, res);
        dfs(node->right, path, res);
    }
public:
    vector<string> binaryTreePaths(TreeNode* root) {
        vector<string> res;
        dfs(root, "", res);
        return res;
    }
};
```

### Python
```python
class Solution:
    def binaryTreePaths(self, root: Optional[TreeNode]) -> List[str]:
        res = []
        def dfs(node, path):
            if not node:
                return
            path += str(node.val)
            if not node.left and not node.right:
                res.append(path)
                return
            dfs(node.left, path + '->')
            dfs(node.right, path + '->')
        dfs(root, '')
        return res
```

### Java
```java
class Solution {
    public List<String> binaryTreePaths(TreeNode root) {
        List<String> res = new ArrayList<>();
        dfs(root, "", res);
        return res;
    }
    void dfs(TreeNode node, String path, List<String> res) {
        if (node == null) return;
        path += node.val;
        if (node.left == null && node.right == null) { res.add(path); return; }
        path += "->";
        dfs(node.left, path, res);
        dfs(node.right, path, res);
    }
}
```

**Complexity:** O(n²) time · O(h) space

</details>

---

## 💭 What Should Have Clicked in Your Mind?

- **"All root-to-leaf paths as strings"** → Day 6 top-down accumulation.
- **"Record at leaves only"** → Same leaf test as Path Sum II.
- **"Not Day 7"** → No global, no height returns — prefix flows down.
- **"Sibling of Path Sum II"** → Same skeleton, no target filter.

---

*1 of 3 test problems. Continue to the next. →*

## Solution

### C++
```cpp
class Solution {
public:
    vector<string> binaryTreePaths(TreeNode* root) {
        vector<string> res;
        function<void(TreeNode*, string)> dfs = [&](TreeNode* node, string path) {
            if (!node->left && !node->right) { res.push_back(path); return; }
            if (node->left)  dfs(node->left,  path + "->" + to_string(node->left->val));
            if (node->right) dfs(node->right, path + "->" + to_string(node->right->val));
        };
        if (root) dfs(root, to_string(root->val));
        return res;
    }
};
```

### Python
```python
class Solution:
    def binaryTreePaths(self, root: Optional[TreeNode]) -> List[str]:
        res = []
        def dfs(node, path):
            if not node.left and not node.right:
                res.append(path); return
            if node.left:  dfs(node.left,  path + '->' + str(node.left.val))
            if node.right: dfs(node.right, path + '->' + str(node.right.val))
        if root: dfs(root, str(root.val))
        return res
```

### Java
```java
class Solution {
    public List<String> binaryTreePaths(TreeNode root) {
        List<String> res = new ArrayList<>();
        if (root != null) dfs(root, String.valueOf(root.val), res);
        return res;
    }
    private void dfs(TreeNode node, String path, List<String> res) {
        if (node.left == null && node.right == null) { res.add(path); return; }
        if (node.left  != null) dfs(node.left,  path + "->" + node.left.val,  res);
        if (node.right != null) dfs(node.right, path + "->" + node.right.val, res);
    }
}
```

**Complexity:** undefined
