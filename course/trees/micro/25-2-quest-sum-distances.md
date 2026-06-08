# ⚔ Quest: Sum of Distances in Tree

> **Day 25** · [Sum of Distances in Tree #834](https://leetcode.com/problems/sum-of-distances-in-tree/) · Hard · 25 min · 40 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Sum of Distances in Tree on LeetCode](https://leetcode.com/problems/sum-of-distances-in-tree/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. Draw the tree. Trace the recursion. The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Sum of Distances in Tree #834](https://leetcode.com/problems/sum-of-distances-in-tree/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? Think about **Re-rooting Technique**.

If you're stuck after 5 minutes: revisit the concept page's visual walkthrough. Trace the tree by hand before looking at the solution structure.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Re-rooting Technique

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

Apply Re-rooting Technique step by step on this tree.
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
    vector<int> cnt, sum;
    void dfs1(int u, int p) {
        for (int v : g[u]) if (v != p) {
            dfs1(v, u);
            cnt[u] += cnt[v];
            sum[u] += sum[v] + cnt[v];
        }
        cnt[u]++;
    }
    void dfs2(int u, int p) {
        for (int v : g[u]) if (v != p) {
            sum[v] = sum[u] - cnt[v] + (cnt.size() - cnt[v]);
            dfs2(v, u);
        }
    }
public:
    vector<int> sumOfDistancesInTree(int n, vector<vector<int>>& edges) {
        g.assign(n, {});
        for (auto& e : edges) { g[e[0]].push_back(e[1]); g[e[1]].push_back(e[0]); }
        cnt.assign(n, 0); sum.assign(n, 0);
        dfs1(0, -1);
        dfs2(0, -1);
        return sum;
    }
};
```

### Python
```python
class Solution:
    def sumOfDistancesInTree(self, n: int, edges: List[List[int]]) -> List[int]:
        g = [[] for _ in range(n)]
        for u, v in edges:
            g[u].append(v)
            g[v].append(u)
        cnt, res = [0] * n, [0] * n
        def dfs1(u, p):
            cnt[u] = 1
            for v in g[u]:
                if v != p:
                    dfs1(v, u)
                    cnt[u] += cnt[v]
                    res[u] += res[v] + cnt[v]
        def dfs2(u, p):
            for v in g[u]:
                if v != p:
                    res[v] = res[u] - cnt[v] + (n - cnt[v])
                    dfs2(v, u)
        dfs1(0, -1)
        dfs2(0, -1)
        return res
```

### Java
```java
class Solution {
    List<Integer>[] g;
    int[] cnt, sum;
    public int[] sumOfDistancesInTree(int n, int[][] edges) {
        g = new List[n];
        for (int i = 0; i < n; i++) g[i] = new ArrayList<>();
        for (int[] e : edges) { g[e[0]].add(e[1]); g[e[1]].add(e[0]); }
        cnt = new int[n]; sum = new int[n];
        dfs1(0, -1);
        dfs2(0, -1);
        return sum;
    }
    void dfs1(int u, int p) {
        cnt[u] = 1;
        for (int v : g[u]) if (v != p) {
            dfs1(v, u);
            cnt[u] += cnt[v];
            sum[u] += sum[v] + cnt[v];
        }
    }
    void dfs2(int u, int p) {
        for (int v : g[u]) if (v != p) {
            sum[v] = sum[u] - cnt[v] + (cnt.length - cnt[v]);
            dfs2(v, u);
        }
    }
}
```

**Complexity:** O(n) time · O(n) space

---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"This is a tree problem"** → Draw it. Don't start coding blind.
- **"Re-rooting Technique"** → Name the pattern from the concept page.
- **"What do my children return?"** → Define the return value first.
- **"Null is my base case"** → Every recursive tree function starts here.

If you tried BFS when DFS was cleaner (or vice versa), that's fine — the breakthrough is **naming the pattern family**, not memorizing one solution.

> 🎯 **Pattern Unlocked:** Re-rooting Technique

---

*One quest down. The next one builds on this pattern. →*
