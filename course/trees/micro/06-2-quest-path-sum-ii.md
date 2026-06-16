<!-- hand-authored -->
# ⚔ Quest: Path Sum II

> **Day 6** · [Path Sum II #113](https://leetcode.com/problems/path-sum-ii/) · Medium · 15 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Path Sum II on LeetCode](https://leetcode.com/problems/path-sum-ii/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. Draw the tree. Trace **push → recurse → pop** at each node. The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Path Sum II #113](https://leetcode.com/problems/path-sum-ii/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? **Top-down remainder + backtracking** — pass `targetSum - node.val` down; at a leaf with `rem == 0`, save `path[:]`; **pop** after both children so sibling branches start clean.

If you're stuck after 5 minutes: write the path list at every step. When you backtrack from node 11 to node 4, does 11 disappear before you visit the right subtree of 4?

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Top-Down with Backtracking

**How to identify this from the problem statement:**
- **"All paths"** → collect multiple results, not just exist/not-exist
- **Root-to-leaf** → downward remainder; leaf-only success
- Shared `path` list → must **undo** after exploring each branch

| Keyword / phrase | What it signals |
|---|---|
| "return all paths" | Backtrack: push, recurse, pop |
| "path sum equals target" | `rem -= node.val` each step |
| "root to leaf" | Check only at nodes with no children |
| "list of lists" | Copy path on save: `path[:]` or `new ArrayList<>(path)` |

**Why this pattern works:** Each root-to-leaf thread carries its own prefix. One shared path array explores all threads if you pop on unwind — same skeleton as Day 5 Path Sum, plus collection + backtrack.

**How a strong solver thinks before coding:**
1. *"null → return. push val. rem -= val."*
2. *"Leaf + rem==0 → append copy of path."*
3. *"Recurse left, recurse right."*
4. *"pop() — mandatory before sibling inherits path."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Store every node, filter later** | O(n²) space — most nodes aren't on answer paths |
| **String concatenation without backtrack** | Sibling branches inherit wrong prefix |
| **Bottom-up subtree sums** | Can't know root-to-here prefix from below |
| **BFS with path in queue** | Works but heavier; DFS backtrack is the template |
| **Save path reference, not copy** | Mutations corrupt saved results |

**The insight brute force misses:** One path array + push/pop explores all root-to-leaf threads in O(h) extra space.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Path Sum #112](https://leetcode.com/problems/path-sum/) | Existential `||` only | Top-down remainder, no collect |
| [Binary Tree Paths #257](https://leetcode.com/problems/binary-tree-paths/) | Build `"1->2->3"` strings | Top-down + leaf record |
| [Sum Root to Leaf Numbers #129](https://leetcode.com/problems/sum-root-to-leaf-numbers/) | `cur * 10 + val` | Top-down accumulation |

All pass state **down** — none aggregate subtree returns for the path prefix.

---

## 📖 Walkthrough

**push → recurse → pop on every internal node.**

```
target = 22

              5   path=[5]      rem=17
             / \
      path=[5,4]  path=[5,8]
          4       8
         / \
   path=[5,4,11]
       11
      /  \
  leaf 7  leaf 2 → rem=0 → SAVE [5,4,11,2]
          ↑
       POP back to [5,4,11] then [5,4] before visiting 8's subtree
```

Backtrack cycle at node 11:

```
push(11)     path = [5,4,11]
  dfs(7)     leaf, no match
  dfs(2)     leaf, rem=0 → save copy
pop()        path = [5,4]     ← critical
```

> 💡 **The insight:** Saving `[5,4,11,2]` requires a **copy**. The live `path` mutates; stored results must not.

---

## Solution

### C++
```cpp
class Solution {
    void dfs(TreeNode* node, int rem, vector<int>& path, vector<vector<int>>& res) {
        if (!node) return;
        path.push_back(node->val);
        rem -= node->val;
        if (!node->left && !node->right && rem == 0)
            res.push_back(path);
        dfs(node->left, rem, path, res);
        dfs(node->right, rem, path, res);
        path.pop_back();
    }
public:
    vector<vector<int>> pathSum(TreeNode* root, int targetSum) {
        vector<vector<int>> res;
        vector<int> path;
        dfs(root, targetSum, path, res);
        return res;
    }
};
```

### Python
```python
class Solution:
    def pathSum(self, root: Optional[TreeNode], targetSum: int) -> List[List[int]]:
        res = []
        def dfs(node, rem, path):
            if not node: return
            path.append(node.val)
            rem -= node.val
            if not node.left and not node.right and rem == 0:
                res.append(list(path))
            dfs(node.left, rem, path)
            dfs(node.right, rem, path)
            path.pop()
        dfs(root, targetSum, [])
        return res
```

### Java
```java
class Solution {
    public List<List<Integer>> pathSum(TreeNode root, int targetSum) {
        List<List<Integer>> res = new ArrayList<>();
        dfs(root, targetSum, new ArrayList<>(), res);
        return res;
    }
    private void dfs(TreeNode node, int rem, List<Integer> path, List<List<Integer>> res) {
        if (node == null) return;
        path.add(node.val);
        rem -= node.val;
        if (node.left == null && node.right == null && rem == 0)
            res.add(new ArrayList<>(path));
        dfs(node.left, rem, path, res);
        dfs(node.right, rem, path, res);
        path.remove(path.size() - 1);
    }
}
```

**Complexity:** undefined
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"All root-to-leaf paths"** → Top-down + backtrack, not bottom-up.
- **"push / pop"** → Same path array serves all branches.
- **"Leaf + rem == 0"** → Internal nodes never save early.
- **"Copy on save"** → `path[:]` — reference would corrupt results.

If you forgot `pop()`, sibling paths contain ghost nodes from the other branch.

> 🎯 **Pattern Unlocked:** Top-Down with Backtracking — remainder down, path push/pop, copy at leaves.

---

*One quest down. Next: accumulate digits into numbers on the way down. →*
