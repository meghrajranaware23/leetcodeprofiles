# ⚔ A-Rank Test — Problem 1

> [Unique Paths III #980](https://leetcode.com/problems/unique-paths-iii/) · Medium · 250 XP

---

You've completed your A-Rank training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Unique Paths III on LeetCode](https://leetcode.com/problems/unique-paths-iii/)**

> ⚔ **Hunter's rule:** This is a rank test — treat it like real interview practice. Trace the call stack. Name the pattern. No peeking until you've genuinely tried.

---

## The Problem

See the full problem statement on LeetCode: **[Unique Paths III #980](https://leetcode.com/problems/unique-paths-iii/)**

---

## 💡 Hints

> 🎯 **What's being tested:** Pattern recognition from the A-Rank curriculum. Name the pattern before you code.

Revisit your rank's cheat sheet. Is this linear recursion, backtracking, or memoized recursion?

---

## 🔍 Pattern Recognition Breakdown

**How to identify from the statement:**
- What gets smaller on each recursive call?
- Is this generate-all or compute-one?
- Do you need to undo choices (backtrack)?

**How a strong solver thinks before coding:**
1. *"Trace the example on paper."*
2. *"What's the base case?"*
3. *"Linear, branching, or backtracking?"*
4. *"Do I need memoization?"*

---

## ❌ Why Brute Force Fails

Recursive problems have natural structure. Brute force typically means nested loops or redundant recomputation. Name the pattern first.

---

## 🎯 Transfer to Unseen Problems

Can you spot the pattern without the problem name telling you?

Read the statement once. Say the pattern aloud. If you can name it in under 30 seconds, you're ready.

---

<details>
<summary><strong>📖 Solution & Walkthrough</strong></summary>

Trace the pattern on the example from the problem statement. Then implement the recursive skeleton you identified.

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

</details>

---

## 💭 What Should Have Clicked in Your Mind?

- **"This is a A-Rank test"** → Use patterns from this rank's training.
- **"Trace first, code second"** → Call stack tracing beats guessing.
- **"Name the pattern"** → The code is just the template filled in.

---

*1 of 3 test problems. Continue to the next. →*
