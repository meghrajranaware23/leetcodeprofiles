<!-- hand-authored -->
# ⚔ A-Rank Test — Problem 1

> [Unique Paths III #980](https://leetcode.com/problems/unique-paths-iii/) · Medium · 250 XP

---

You've completed your A-Rank training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Unique Paths III on LeetCode](https://leetcode.com/problems/unique-paths-iii/)**

> ⚔ **Hunter's rule:** This is a rank test — treat it like real interview practice. Count paths that visit **every empty cell exactly once**. Name the pattern before you code.

---

## The Problem

You are given an `m × n` grid where each cell is one of:

- `1` — start square
- `2` — end square
- `0` — empty square (must visit)
- `-1` — obstacle (blocked)

Return the **number of 4-directional walks** from start to end that visit **every empty square exactly once**.

```
Input:  grid = [[1,0,0,0],[0,0,0,0],[0,0,2,-1]]
Output: 2

Input:  grid = [[1,0,0,0],[0,0,0,0],[0,0,0,2]]
Output: 4
```

---

## 💡 Hints

> 🎯 **What's being tested:** Grid backtracking with **full coverage** (Day 24) — not simple path counting.

**Hint 1:** Preprocess — count empty cells (`0`). Start DFS from `(sr, sc)` with `left = empty_count`.

**Hint 2:** Each step: mark cell `-1` (visited), explore 4 directions, unmark (backtrack).

**Hint 3:** Base case: reached end `(er, ec)` **and** `left == 0` → increment answer. If end reached but `left > 0`, don't count.

**Hint 4:** Prune: if cell is `-1` or out of bounds, return immediately.

**Hint 5:** Same mark/unmark rhythm as Word Search (Day 16) — but you count paths, not search for one string. Track remaining empties instead of word index.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Full Grid Coverage Backtracking (count)

| Clue | Signal |
|---|---|
| "visit every empty square exactly once" | Must track remaining empties |
| start/end marked 1 and 2 | Preprocess positions + empty count |
| count 4-directional walks | DFS count at leaf, not boolean |
| grid with obstacles | Mark `-1` on visit, restore on backtrack |

**Contrast with simpler grid problems:**

| Word Search (#79) | Unique Paths III (#980) |
|---|---|
| Find one path for a word | Count all valid paths |
| Match character by character | Visit all empties exactly once |
| Return boolean | Increment global counter |
| Same mark/unmark | Same mark/unmark + `left` counter |

**How a strong solver thinks before coding:**
1. *"Count paths visiting all cells → backtrack with remaining count."*
2. *"Mark cell, dfs 4 dirs with left-1, unmark."*
3. *"Only count when at end AND left==0."*
4. *"Preprocess: find start, end, count empties."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **BFS without state tracking** | Can't enforce visit-each-cell-once |
| **DFS without `left` counter** | Reaching end early still counts invalid paths |
| **No mark/unmark** | Revisit cells — wrong count |
| **Count all paths start→end ignoring empties** | Misses the coverage constraint |

**The insight:** This is grid backtracking + a **budget** (`left`). The end cell is only valid when the budget is zero.

---

## 🎯 Transfer to Unseen Problems

Can you spot the pattern without the problem name telling you?

*"Walk a grid, visit every valid cell exactly once, count routes from A to B."*

→ **Full coverage grid backtracking.** Mark/unmark + remaining counter + count at leaf.

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

- **"Visit every empty cell"** → Track `left` — end alone isn't enough.
- **"Grid backtracking"** → Mark `-1`, explore, unmark — Day 16 rhythm.
- **"Count at leaf"** → Global `ans++` when end reached and `left == 0`.
- **"A-Rank test"** → Name pattern in 30 seconds, then code the template.

---

*1 of 3 test problems. Continue to the next. →*

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
