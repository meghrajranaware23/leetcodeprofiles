<!-- hand-authored -->
# ⚔ A-Rank Test — Problem 3

> [Delete Nodes And Return Forest #1110](https://leetcode.com/problems/delete-nodes-and-return-forest/) · Medium · 250 XP

---

You've completed your A-Rank training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Delete Nodes And Return Forest on LeetCode](https://leetcode.com/problems/delete-nodes-and-return-forest/)**

> ⚔ **Hunter's rule:** This is a rank test — post-order rewire with **isRoot** flag. Deleted node's non-deleted children become new forest roots. No peeking until you've genuinely tried.

---

## The Problem

See the full problem statement on LeetCode: **[Delete Nodes And Return Forest #1110](https://leetcode.com/problems/delete-nodes-and-return-forest/)**

---

## 💡 Hints

> 🎯 **What's being tested:** **Structural delete + forest collection** — extends Day 12 delete cases.

- Put `to_delete` values in a set for O(1) lookup.
- `dfs(node, isRoot)` returns new subtree root (null if deleted).
- If `isRoot && !deleted` → append node to `res` (new tree root in forest).
- Recurse: `node.left = dfs(left, deleted)`, `node.right = dfs(right, deleted)`.
- Return `null` if current deleted, else `node`.
- `isRoot=true` only on initial call — children get `isRoot = parent_was_deleted`.

**Pattern name before coding:** *Post-order delete + isRoot forest roots.*

---

## 🔍 Pattern Recognition Breakdown

**How to identify from the statement:**
- "Delete nodes" + "return forest" → multiple roots after removal
- Delete set given — not single key like Day 12
- Rewire children before removing parent — post-order

**How a strong solver thinks before coding:**
1. *"deleted = node.val in set."*
2. *"If isRoot and not deleted → forest.push(node)."*
3. *"Recurse with isRoot = deleted (parent deleted → child may be new root)."*
4. *"Return null if deleted else node."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Copy tree then delete** | Wasteful — in-place rewire works |
| **Collect all nodes then filter** | Doesn't rewire parent pointers |
| **Pre-order delete before processing children** | Lose access to subtrees — need post-order |
| **Always isRoot=true for children** | Wrong — only when parent deleted |

---

## 🎯 Transfer to Unseen Problems

Same **return new subtree root** pattern as Day 12 delete — plus forest collection when parent link is cut. Generalizes to "remove nodes matching predicate, return components."

---

<details>
<summary><strong>📖 Solution & Walkthrough</strong></summary>

Trace the pattern on the example tree from the problem statement. Then implement the recursive skeleton you identified.

### C++
```cpp
class Solution {
    unordered_set<int> del;
    vector<TreeNode*> res;
    TreeNode* dfs(TreeNode* node, bool isRoot) {
        if (!node) return nullptr;
        bool deleted = del.count(node->val);
        if (isRoot && !deleted) res.push_back(node);
        node->left  = dfs(node->left,  deleted);
        node->right = dfs(node->right, deleted);
        return deleted ? nullptr : node;
    }
public:
    vector<TreeNode*> delNodes(TreeNode* root, vector<int>& to_delete) {
        del = unordered_set<int>(to_delete.begin(), to_delete.end());
        dfs(root, true);
        return res;
    }
};
```

### Python
```python
class Solution:
    def delNodes(self, root: Optional[TreeNode], to_delete: List[int]) -> List[Optional[TreeNode]]:
        to_del = set(to_delete)
        res = []
        def dfs(node, is_root):
            if not node: return None
            deleted = node.val in to_del
            if is_root and not deleted: res.append(node)
            node.left  = dfs(node.left,  deleted)
            node.right = dfs(node.right, deleted)
            return None if deleted else node
        dfs(root, True)
        return res
```

### Java
```java
class Solution {
    private Set<Integer> del;
    private List<TreeNode> res = new ArrayList<>();
    public List<TreeNode> delNodes(TreeNode root, int[] to_delete) {
        del = new HashSet<>();
        for (int v : to_delete) del.add(v);
        dfs(root, true);
        return res;
    }
    private TreeNode dfs(TreeNode node, boolean isRoot) {
        if (node == null) return null;
        boolean deleted = del.contains(node.val);
        if (isRoot && !deleted) res.add(node);
        node.left  = dfs(node.left,  deleted);
        node.right = dfs(node.right, deleted);
        return deleted ? null : node;
    }
}
```

**Complexity:** undefined

</details>

---

## 💭 What Should Have Clicked in Your Mind?

- **"Delete and return forest"** → post-order rewire + isRoot flag.
- **"Parent deleted → child isRoot=true"** → child may become new tree root.
- **"Day 12 delete"** → same return-null-to-parent pattern, batch delete set.
- **"Set lookup"** → O(1) per node check.

---

*3 of 3 test problems. Continue to the next. →*

## Solution

### C++
```cpp
class Solution {
    unordered_set<int> del;
    vector<TreeNode*> res;
    TreeNode* dfs(TreeNode* node, bool isRoot) {
        if (!node) return nullptr;
        bool deleted = del.count(node->val);
        if (isRoot && !deleted) res.push_back(node);
        node->left  = dfs(node->left,  deleted);
        node->right = dfs(node->right, deleted);
        return deleted ? nullptr : node;
    }
public:
    vector<TreeNode*> delNodes(TreeNode* root, vector<int>& to_delete) {
        del = unordered_set<int>(to_delete.begin(), to_delete.end());
        dfs(root, true);
        return res;
    }
};
```

### Python
```python
class Solution:
    def delNodes(self, root: Optional[TreeNode], to_delete: List[int]) -> List[Optional[TreeNode]]:
        to_del = set(to_delete)
        res = []
        def dfs(node, is_root):
            if not node: return None
            deleted = node.val in to_del
            if is_root and not deleted: res.append(node)
            node.left  = dfs(node.left,  deleted)
            node.right = dfs(node.right, deleted)
            return None if deleted else node
        dfs(root, True)
        return res
```

### Java
```java
class Solution {
    private Set<Integer> del;
    private List<TreeNode> res = new ArrayList<>();
    public List<TreeNode> delNodes(TreeNode root, int[] to_delete) {
        del = new HashSet<>();
        for (int v : to_delete) del.add(v);
        dfs(root, true);
        return res;
    }
    private TreeNode dfs(TreeNode node, boolean isRoot) {
        if (node == null) return null;
        boolean deleted = del.contains(node.val);
        if (isRoot && !deleted) res.add(node);
        node.left  = dfs(node.left,  deleted);
        node.right = dfs(node.right, deleted);
        return deleted ? null : node;
    }
}
```

**Complexity:** undefined
