# ⚔ Quest: Longest Path Different Chars

> **Day 25** · [Longest Path With Different Adjacent Characters #2246](https://leetcode.com/problems/longest-path-with-different-adjacent-characters/) · Hard · 25 min · 50 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Longest Path With Different Adjacent Characters on LeetCode](https://leetcode.com/problems/longest-path-with-different-adjacent-characters/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. Draw the tree. Trace the recursion. The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Longest Path With Different Adjacent Characters #2246](https://leetcode.com/problems/longest-path-with-different-adjacent-characters/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? Think about **N-ary Diameter Variant**.

If you're stuck after 5 minutes: revisit the concept page's visual walkthrough. Trace the tree by hand before looking at the solution structure.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** N-ary Diameter Variant

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

Apply N-ary Diameter Variant step by step on this tree.
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
    string s;
    int ans = 0;
    pair<int,int> dfs(int u, int p) {
        int best = 0, second = 0, upBest = 0;
        for (int v : g[u]) if (v != p) {
            auto child = dfs(v, u);
            if (s[u - 1] != s[v - 1]) {
                int len = child.second + 1;
                if (len > best) { second = best; best = len; }
                else if (len > second) second = len;
                upBest = max(upBest, child.first + 1);
            }
        }
        ans = max(ans, best + second);
        return {upBest, best};
    }
public:
    int longestPath(vector<int>& parent, string s) {
        this->s = s;
        int n = parent.size();
        g.assign(n, {});
        for (int i = 1; i < n; ++i) { g[i].push_back(parent[i]); g[parent[i]].push_back(i); }
        dfs(0, -1);
        return ans + 1;
    }
};
```

### Python
```python
class Solution:
    def longestPath(self, parent: List[int], s: str) -> int:
        n = len(parent)
        g = [[] for _ in range(n)]
        for i in range(1, n):
            g[i].append(parent[i])
            g[parent[i]].append(i)
        self.ans = 0
        def dfs(u, p):
            best = second = 0
            up_best = 0
            for v in g[u]:
                if v == p:
                    continue
                up, down = dfs(v, u)
                if s[u] != s[v]:
                    length = down + 1
                    if length > best:
                        second, best = best, length
                    elif length > second:
                        second = length
                    up_best = max(up_best, up + 1)
            self.ans = max(self.ans, best + second)
            return up_best, best
        dfs(0, -1)
        return self.ans + 1
```

### Java
```java
class Solution {
    List<Integer>[] g;
    String s;
    int ans = 0;
    public int longestPath(int[] parent, String s) {
        this.s = s;
        int n = parent.length;
        g = new List[n];
        for (int i = 0; i < n; i++) g[i] = new ArrayList<>();
        for (int i = 1; i < n; i++) { g[i].add(parent[i]); g[parent[i]].add(i); }
        dfs(0, -1);
        return ans + 1;
    }
    int[] dfs(int u, int p) {
        int best = 0, second = 0, upBest = 0;
        for (int v : g[u]) if (v != p) {
            int[] child = dfs(v, u);
            if (s.charAt(u) != s.charAt(v)) {
                int len = child[1] + 1;
                if (len > best) { second = best; best = len; }
                else if (len > second) second = len;
                upBest = Math.max(upBest, child[0] + 1);
            }
        }
        ans = Math.max(ans, best + second);
        return new int[]{upBest, best};
    }
}
```

**Complexity:** O(n) time · O(n) space

---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"This is a tree problem"** → Draw it. Don't start coding blind.
- **"N-ary Diameter Variant"** → Name the pattern from the concept page.
- **"What do my children return?"** → Define the return value first.
- **"Null is my base case"** → Every recursive tree function starts here.

If you tried BFS when DFS was cleaner (or vice versa), that's fine — the breakthrough is **naming the pattern family**, not memorizing one solution.

> 🎯 **Pattern Unlocked:** N-ary Diameter Variant

---

*Both quests complete. Head to the checkpoint. →*
