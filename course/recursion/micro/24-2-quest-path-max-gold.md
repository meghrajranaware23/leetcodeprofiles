# ⚔ Quest: Path with Maximum Gold

> **Day 24** · [Path with Maximum Gold #1219](https://leetcode.com/problems/path-with-maximum-gold/) · Medium · 15 min · 35 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Path with Maximum Gold on LeetCode](https://leetcode.com/problems/path-with-maximum-gold/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. Draw the decision tree. Trace choose / explore / unchoose. The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Path with Maximum Gold #1219](https://leetcode.com/problems/path-with-maximum-gold/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? Think about **Grid Path Enumeration**.

If you're stuck after 5 minutes: revisit the concept page's visual walkthrough. Draw the decision tree. Trace choose / explore / unchoose.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Grid Path Enumeration

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
Apply Grid Path Enumeration step by step on the example from the problem.
Mark the current call frame at each step.
Watch what gets returned (or what choices get made) at each level.
```

> 💡 **The insight:** The code is just the paper trace written in syntax. If you can trace it by hand, you can code it.

---

## Solution

### C++
```cpp
class Solution {
    int m, n, best = 0;
    void dfs(vector<vector<int>>& grid, int r, int c, int gold) {
        if (r < 0 || c < 0 || r >= m || c >= n || grid[r][c] == 0) return;
        int take = grid[r][c];
        gold += take; best = max(best, gold);
        grid[r][c] = 0;
        dfs(grid, r + 1, c, gold);
        dfs(grid, r - 1, c, gold);
        dfs(grid, r, c + 1, gold);
        dfs(grid, r, c - 1, gold);
        grid[r][c] = take;
    }
public:
    int getMaximumGold(vector<vector<int>>& grid) {
        m = grid.size(); n = grid[0].size();
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                if (grid[i][j]) dfs(grid, i, j, 0);
        return best;
    }
};
```

### Python
```python
class Solution:
    def getMaximumGold(self, grid: List[List[int]]) -> int:
        m, n = len(grid), len(grid[0])
        self.best = 0
        def dfs(r, c, gold):
            if r < 0 or c < 0 or r >= m or c >= n or grid[r][c] == 0: return
            take = grid[r][c]
            gold += take; self.best = max(self.best, gold)
            grid[r][c] = 0
            for dr, dc in ((1,0),(-1,0),(0,1),(0,-1)): dfs(r + dr, c + dc, gold)
            grid[r][c] = take
        for i in range(m):
            for j in range(n):
                if grid[i][j]: dfs(i, j, 0)
        return self.best
```

### Java
```java
class Solution {
    private int m, n, best = 0;
    public int getMaximumGold(int[][] grid) {
        m = grid.length; n = grid[0].length;
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                if (grid[i][j] != 0) dfs(grid, i, j, 0);
        return best;
    }
    private void dfs(int[][] grid, int r, int c, int gold) {
        if (r < 0 || c < 0 || r >= m || c >= n || grid[r][c] == 0) return;
        int take = grid[r][c];
        gold += take; best = Math.max(best, gold);
        grid[r][c] = 0;
        dfs(grid, r + 1, c, gold); dfs(grid, r - 1, c, gold);
        dfs(grid, r, c + 1, gold); dfs(grid, r, c - 1, gold);
        grid[r][c] = take;
    }
}
```

**Complexity:** O(m · n · 4^k) time · O(k) space

---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"This is a recursive problem"** → Trace it. Don't start coding blind.
- **"Grid Path Enumeration"** → Name the pattern from the concept page.
- **"What's my base case?"** → Define it before the recursive call.
- **"What does the smaller call return?"** → Trust it and combine.

If you tried brute force first, that's fine — the breakthrough is **naming the pattern family**, not memorizing one solution.

> 🎯 **Pattern Unlocked:** Grid Path Enumeration

---

*One quest down. The next one builds on this pattern. →*
