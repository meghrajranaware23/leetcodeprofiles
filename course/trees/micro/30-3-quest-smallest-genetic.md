# ⚔ Quest: Smallest Missing Genetic Value

> **Day 30** · [Smallest Missing Genetic Value in Each Subtree #2003](https://leetcode.com/problems/smallest-missing-genetic-value-in-each-subtree/) · Hard · 25 min · 60 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Smallest Missing Genetic Value in Each Subtree on LeetCode](https://leetcode.com/problems/smallest-missing-genetic-value-in-each-subtree/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. Draw the tree. Trace the recursion. The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Smallest Missing Genetic Value in Each Subtree #2003](https://leetcode.com/problems/smallest-missing-genetic-value-in-each-subtree/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? Think about **Subtree Set Aggregation**.

If you're stuck after 5 minutes: revisit the concept page's visual walkthrough. Trace the tree by hand before looking at the solution structure.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Subtree Set Aggregation

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

Apply Subtree Set Aggregation step by step on this tree.
Draw it. Mark the current node at each step.
Watch what gets returned from leaves back to root.
```

> 💡 **The insight:** The code is just the paper trace written in syntax. If you can trace it by hand, you can code it.

---

## Solution

### C++
```cpp
class Solution {
    vector<vector<int>> g;
    vector<int> nums, ans;
    set<int> dfs(int u, int p) {
        set<int> seen;
        if (nums[u] == 1) seen.insert(1);
        for (int v : g[u]) if (v != p) {
            set<int> child = dfs(v, u);
            if (child.size() > seen.size()) seen.swap(child);
            seen.insert(child.begin(), child.end());
        }
        int mex = 1;
        while (seen.count(mex)) ++mex;
        ans[u] = mex;
        return seen;
    }
public:
    vector<int> smallestMissingValueSubtree(vector<int>& parents, vector<int>& nums_) {
        int n = parents.size();
        nums = nums_;
        ans.assign(n, 1);
        if (!count(nums.begin(), nums.end(), 1)) return ans;
        g.assign(n, {});
        for (int i = 1; i < n; ++i) { g[i].push_back(parents[i]); g[parents[i]].push_back(i); }
        dfs(0, -1);
        return ans;
    }
};
```

### Python
```python
class Solution:
    def smallestMissingValueSubtree(self, parents: List[int], nums: List[int]) -> List[int]:
        n = len(parents)
        if 1 not in nums:
            return [1] * n
        g = [[] for _ in range(n)]
        for i in range(1, n):
            g[i].append(parents[i])
            g[parents[i]].append(i)
        ans = [1] * n
        def dfs(u, p):
            seen = set()
            if nums[u] == 1:
                seen.add(1)
            for v in g[u]:
                if v != p:
                    child = dfs(v, u)
                    if len(seen) < len(child):
                        seen, child = child, seen
                    seen |= child
            mex = 1
            while mex in seen:
                mex += 1
            ans[u] = mex
            return seen
        dfs(0, -1)
        return ans
```

### Java
```java
class Solution {
    List<Integer>[] g;
    int[] nums, ans;
    public int[] smallestMissingValueSubtree(int[] parents, int[] nums) {
        int n = parents.length;
        this.nums = nums; ans = new int[n];
        Arrays.fill(ans, 1);
        boolean hasOne = false;
        for (int x : nums) if (x == 1) hasOne = true;
        if (!hasOne) return ans;
        g = new List[n];
        for (int i = 0; i < n; i++) g[i] = new ArrayList<>();
        for (int i = 1; i < n; i++) { g[i].add(parents[i]); g[parents[i]].add(i); }
        dfs(0, -1, new HashSet<>());
        return ans;
    }
    Set<Integer> dfs(int u, int p, Set<Integer> seen) {
        if (nums[u] == 1) seen.add(1);
        for (int v : g[u]) if (v != p) {
            Set<Integer> child = dfs(v, u, new HashSet<>());
            if (child.size() > seen.size()) { Set<Integer> tmp = seen; seen = child; child = tmp; }
            seen.addAll(child);
        }
        int mex = 1;
        while (seen.contains(mex)) mex++;
        ans[u] = mex;
        return seen;
    }
}
```

**Complexity:** O(n·k) time · O(n) space

---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"This is a tree problem"** → Draw it. Don't start coding blind.
- **"Subtree Set Aggregation"** → Name the pattern from the concept page.
- **"What do my children return?"** → Define the return value first.
- **"Null is my base case"** → Every recursive tree function starts here.

If you tried BFS when DFS was cleaner (or vice versa), that's fine — the breakthrough is **naming the pattern family**, not memorizing one solution.

> 🎯 **Pattern Unlocked:** Subtree Set Aggregation

---

*Both quests complete. Head to the checkpoint. →*
