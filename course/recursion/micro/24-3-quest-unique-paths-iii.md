# ⚔ Quest: Unique Paths III

> **Day 24** · [Unique Paths III #980](https://leetcode.com/problems/unique-paths-iii/) · Medium · 15 min · 40 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Unique Paths III on LeetCode](https://leetcode.com/problems/unique-paths-iii/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. Draw the decision tree. Trace choose / explore / unchoose. The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Unique Paths III #980](https://leetcode.com/problems/unique-paths-iii/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? Think about **Full Grid Coverage Backtracking**.

If you're stuck after 5 minutes: revisit the concept page's visual walkthrough. Draw the decision tree. Trace choose / explore / unchoose.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Full Grid Coverage Backtracking

**How to identify this from the problem statement:**
- Can the problem be broken into a smaller version of itself?
- Is there a clear base case when the input is small enough?
- Do you need to generate all valid choices or just compute one answer?

| Keyword / phrase | What it signals |
|---|---|
| "reverse" / "factorial" / "power" | Linear recursion — shrink by one |
| "all subsets" / "all combinations" | Backtracking — include/exclude |
| "all permutations" / "arrangements" | Backtracking — used[] or swap |
| "partition" / "split" / "restore" | String backtracking |
| "word search" / "grid" | Grid DFS + mark/unmark |
| "how many ways" + overlap | Recursion + memoization |

**Why this pattern works:** Recursive problems have self-similar structure. Name what shrinks, define the base case, trust the sub-call.

**How a strong solver thinks before coding:**
1. *"What is the base case?"*
2. *"What gets smaller on each call?"*
3. *"Do I pass state down or return results up?"*
4. *"Trace one example on paper before coding."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Nested loops for all combinations** | O(n!) — misses pruning and structure |
| **Iterating without recursive insight** | Hard to handle tree/backtracking shape |
| **No memoization on overlapping subproblems** | Exponential time on Fibonacci-style problems |
| **Forgetting to backtrack (undo)** | Wrong state leaks into sibling branches |

**The insight brute force misses:** Recursion names the substructure. Backtracking prunes invalid branches early.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| Related recursive problems | Different combine logic | Same skeleton: base + recurse + combine |
| Same backtracking family | Different constraints | Same choose / explore / unchoose |
| Variant constraints | Extra pruning or state | Same decision tree shape |

If you recognized this problem's pattern, you already have the skeleton for today's practice queue.

---

## 📖 Walkthrough

Draw the decision tree. Trace choose / explore / unchoose.

```
Apply Full Grid Coverage Backtracking step by step on the example from the problem.
Mark the current call frame at each step.
Watch what gets returned (or what choices get made) at each level.
```

> 💡 **The insight:** The code is just the paper trace written in syntax. If you can trace it by hand, you can code it.

---

## Solution

### C++
```cpp
class Solution {
    int ans = 0, empty = 1, sr, sc, er, ec;
    void dfs(vector<vector<int>>& g, int r, int c, int left) {
        if (r < 0 || c < 0 || r >= (int)g.size() || c >= (int)g[0].size() || g[r][c] == -1) return;
        if (r == er && c == ec) { if (left == 0) ans++; return; }
        g[r][c] = -1;
        dfs(g, r + 1, c, left - 1);
        dfs(g, r - 1, c, left - 1);
        dfs(g, r, c + 1, left - 1);
        dfs(g, r, c - 1, left - 1);
        g[r][c] = 0;
    }
public:
    int uniquePathsIII(vector<vector<int>>& grid) {
        for (int i = 0; i < (int)grid.size(); i++)
            for (int j = 0; j < (int)grid[0].size(); j++) {
                if (grid[i][j] == 1) { sr = i; sc = j; }
                else if (grid[i][j] == 2) { er = i; ec = j; }
                else if (grid[i][j] == 0) empty++;
            }
        dfs(grid, sr, sc, empty);
        return ans;
    }
};
```

### Python
```python
class Solution:
    def uniquePathsIII(self, grid: List[List[int]]) -> int:
        m, n = len(grid), len(grid[0])
        empty = 1; sr = sc = er = ec = 0
        for i in range(m):
            for j in range(n):
                if grid[i][j] == 1: sr, sc = i, j
                elif grid[i][j] == 2: er, ec = i, j
                elif grid[i][j] == 0: empty += 1
        self.ans = 0
        def dfs(r, c, left):
            if r < 0 or c < 0 or r >= m or c >= n or grid[r][c] == -1: return
            if r == er and c == ec:
                if left == 0: self.ans += 1
                return
            grid[r][c] = -1
            for dr, dc in ((1,0),(-1,0),(0,1),(0,-1)): dfs(r + dr, c + dc, left - 1)
            grid[r][c] = 0
        dfs(sr, sc, empty)
        return self.ans
```

### Java
```java
class Solution {
    private int ans = 0, empty = 1, sr, sc, er, ec;
    public int uniquePathsIII(int[][] grid) {
        for (int i = 0; i < grid.length; i++)
            for (int j = 0; j < grid[0].length; j++) {
                if (grid[i][j] == 1) { sr = i; sc = j; }
                else if (grid[i][j] == 2) { er = i; ec = j; }
                else if (grid[i][j] == 0) empty++;
            }
        dfs(grid, sr, sc, empty);
        return ans;
    }
    private void dfs(int[][] g, int r, int c, int left) {
        if (r < 0 || c < 0 || r >= g.length || c >= g[0].length || g[r][c] == -1) return;
        if (r == er && c == ec) { if (left == 0) ans++; return; }
        g[r][c] = -1;
        dfs(g, r + 1, c, left - 1); dfs(g, r - 1, c, left - 1);
        dfs(g, r, c + 1, left - 1); dfs(g, r, c - 1, left - 1);
        g[r][c] = 0;
    }
}
```

**Complexity:** O(4^(m·n)) time · O(m · n) space

---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"This is a recursive problem"** → Trace it. Don't start coding blind.
- **"Full Grid Coverage Backtracking"** → Name the pattern from the concept page.
- **"What's my base case?"** → Define it before the recursive call.
- **"What does the smaller call return?"** → Trust it and combine.

If you tried brute force first, that's fine — the breakthrough is **naming the pattern family**, not memorizing one solution.

> 🎯 **Pattern Unlocked:** Full Grid Coverage Backtracking

---

*Both quests complete. Head to the checkpoint. →*
