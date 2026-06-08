# ⚔ Quest: Path Sum III

> **Day 14** · [Path Sum III #437](https://leetcode.com/problems/path-sum-iii/) · Medium · 15 min · 25 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Path Sum III on LeetCode](https://leetcode.com/problems/path-sum-iii/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. Draw the tree. Trace the recursion. The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Path Sum III #437](https://leetcode.com/problems/path-sum-iii/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? Think about **Prefix Sum on Trees**.

If you're stuck after 5 minutes: revisit the concept page's visual walkthrough. Trace the tree by hand before looking at the solution structure.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Prefix Sum on Trees

**How to identify this from the problem statement:**
- Look for tree structure keywords — "binary tree", "root", "subtree", "node"
- Ask: does information flow **down** (carry state) or **up** (combine child results)?
- Check if you need to compare two trees or build a new one

| Keyword / phrase | What it signals |
|---|---|
| "maximum depth" / "height" | Bottom-up: return 1 + max(children) |
| "path sum" / "root to leaf" | Top-down: carry running sum |
| "same tree" / "symmetric" | Parallel recursion on two trees |
| "level order" / "each level" | BFS with queue |
| "construct from traversals" | Divide and conquer with traversal split |
| "validate BST" | Range checking during DFS |

**Why this pattern works:** Trees are recursive structures. Each subtree is a smaller instance of the same problem. The pattern names which direction information flows.

**How a strong solver thinks before coding:**
1. *"What does my function return? What do my children return?"*
2. *"What's the base case? (usually null)"*
3. *"Draw a 3-node tree and trace by hand."*
4. *"One pass or do I need a global variable?"*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Store all paths/nodes** | O(n²) space when O(h) recursion suffices |
| **BFS for depth/height** | DFS bottom-up is simpler and O(h) space |
| **Iterating without recursion** | Loses natural subtree decomposition |
| **Nested loops on nodes** | O(n²) when O(n) single-pass recursion works |

**The insight brute force misses:** Trust the recursion. You don't need to track everything — just combine what your children return.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| Related tree problems | Different combine logic | Same recursive skeleton |
| Same traversal order | Different processing per node | Same visit sequence |
| Variant constraints | Extra state or early termination | Same flow direction |

If you recognized this problem's pattern, you already have the skeleton for today's practice queue.

---

## 📖 Walkthrough

Trace the pattern on a small tree before reading the code:

```
        3
       / \
      9    20
          /  \
         15   7

Apply Prefix Sum on Trees step by step on this tree.
Draw it. Mark the current node at each step.
Watch what gets returned from leaves back to root.
```

> 💡 **The insight:** The code is just the paper trace written in syntax. If you can trace it by hand, you can code it.

---

## Solution

### C++
```cpp
class Solution {
    int target;
    int dfs(TreeNode* node, long sum, unordered_map<long long, int>& cnt) {
        if (!node) return 0;
        sum += node->val;
        int res = cnt[sum - target];
        cnt[sum]++;
        res += dfs(node->left, sum, cnt) + dfs(node->right, sum, cnt);
        cnt[sum]--;
        return res;
    }
public:
    int pathSum(TreeNode* root, int targetSum) {
        target = targetSum;
        unordered_map<long long, int> cnt;
        cnt[0] = 1;
        return dfs(root, 0, cnt);
    }
};
```

### Python
```python
class Solution:
    def pathSum(self, root: Optional[TreeNode], targetSum: int) -> int:
        cnt = {0: 1}
        def dfs(node, s):
            if not node:
                return 0
            s += node.val
            res = cnt.get(s - targetSum, 0)
            cnt[s] = cnt.get(s, 0) + 1
            res += dfs(node.left, s) + dfs(node.right, s)
            cnt[s] -= 1
            return res
        return dfs(root, 0)
```

### Java
```java
class Solution {
    public int pathSum(TreeNode root, int targetSum) {
        Map<Long, Integer> cnt = new HashMap<>();
        cnt.put(0L, 1);
        return dfs(root, 0L, targetSum, cnt);
    }
    int dfs(TreeNode node, long sum, int target, Map<Long, Integer> cnt) {
        if (node == null) return 0;
        sum += node.val;
        int res = cnt.getOrDefault(sum - target, 0);
        cnt.put(sum, cnt.getOrDefault(sum, 0) + 1);
        res += dfs(node.left, sum, target, cnt) + dfs(node.right, sum, target, cnt);
        cnt.put(sum, cnt.getOrDefault(sum, 0) - 1);
        return res;
    }
}
```

**Complexity:** O(n) time · O(n) space

---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"This is a tree problem"** → Draw it. Don't start coding blind.
- **"Prefix Sum on Trees"** → Name the pattern from the concept page.
- **"What do my children return?"** → Define the return value first.
- **"Null is my base case"** → Every recursive tree function starts here.

If you tried BFS when DFS was cleaner (or vice versa), that's fine — the breakthrough is **naming the pattern family**, not memorizing one solution.

> 🎯 **Pattern Unlocked:** Prefix Sum on Trees

---

*One quest down. The next one builds on this pattern. →*
