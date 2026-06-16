<!-- hand-authored -->
# ⚔ B-Rank Test — Problem 1

> [N-Queens II #52](https://leetcode.com/problems/n-queens-ii/) · Medium · 200 XP

---

You've completed your B-Rank training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open N-Queens II on LeetCode](https://leetcode.com/problems/n-queens-ii/)**

> ⚔ **Hunter's rule:** This is a rank test — treat it like real interview practice. Place queens row by row. Name the pattern before you code.

---

## The Problem

The **n-queens** puzzle is the problem of placing `n` queens on an `n×n` chessboard such that no two queens attack each other.

Given an integer `n`, return the **number of distinct solutions** to the n-queens puzzle.

```
Input:  n = 4
Output: 2

Input:  n = 1
Output: 1
```

Each solution is a distinct board layout — you only count them, not print boards.

---

## 💡 Hints

> 🎯 **What's being tested:** Constraint satisfaction backtracking (Day 18) — count valid boards, don't generate them.

**Hint 1:** Place one queen per **row**. State = current row `r`. Try every column `c` in row `r`.

**Hint 2:** Before placing, check three attacks: **same column**, **main diagonal** (`r-c`), **anti-diagonal** (`r+c`).

**Hint 3:** Use boolean arrays (or sets) for `cols`, `d1`, `d2`. Mark on choose, unmark on unchoose — same rhythm as grid mark/unmark.

**Hint 4:** Base case: `r == n` → increment global counter. No need to store the board layout.

**Hint 5:** Prune in the column loop — invalid columns never call `dfs(r+1)`. This is Day 17 pruning + Day 18 board constraints combined.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Row-by-Row Constraint Satisfaction (count)

| Clue | Signal |
|---|---|
| "n-queens" / chessboard | One queen per row, try columns |
| "number of distinct solutions" | Count at leaf, no board collection |
| attack rules | Column + two diagonal sets |
| `n <= 9` on LeetCode | Full backtrack with pruning suffices |

**Contrast with N-Queens I (#51):**

| N-Queens I | N-Queens II |
|---|---|
| Return all board layouts | Return count only |
| Build string row representation | Skip board storage |
| Same dfs skeleton | Same dfs skeleton |

**How a strong solver thinks before coding:**
1. *"Row r — which columns are safe?"*
2. *"Mark cols/d1/d2, dfs(r+1), unmark."*
3. *"r==n → ans++."*
4. *"Diagonal index: d1 uses r-c+n offset, d2 uses r+c."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Try all C(n²,n) cell placements** | Ignores one-per-row structure |
| **Generate all permutations of columns** | Better — but still need diagonal check |
| **No unmark on backtrack** | Diagonal state leaks into sibling branches |
| **Store full boards when only counting** | Wastes memory — counter is enough |

**The insight brute force misses:** One queen per row → search space is permutations with diagonal pruning, not all cell subsets.

---

## 🎯 Transfer to Unseen Problems

**Scenario:** *"Count valid Sudoku boards (empty grid given)."*

Same constraint satisfaction — more constraints per cell, but mark/unmark + dfs level-by-level.

**Scenario:** *"Can n queens be placed?"* (existential)

Same dfs — return true on first `r==n` instead of counting.

**30-second check:** *"Row-by-row, cols+d1+d2 sets, mark/unmark, count at leaf."*

---

<details>
<summary><strong>📖 Solution & Walkthrough</strong></summary>

Trace the pattern on the example from the problem statement. Then implement the recursive skeleton you identified.

### C++
```cpp
class Solution {
    int ans = 0;
    bool valid(int r, int c, vector<int>& cols, vector<int>& d1, vector<int>& d2) {
        return !cols[c] && !d1[r - c + 50] && !d2[r + c];
    }
    void dfs(int r, int n, vector<int>& cols, vector<int>& d1, vector<int>& d2) {
        if (r == n) { ans++; return; }
        for (int c = 0; c < n; c++) {
            if (!valid(r, c, cols, d1, d2)) continue;
            cols[c] = d1[r - c + 50] = d2[r + c] = 1;
            dfs(r + 1, n, cols, d1, d2);
            cols[c] = d1[r - c + 50] = d2[r + c] = 0;
        }
    }
public:
    int totalNQueens(int n) {
        vector<int> cols(n), d1(100), d2(100);
        dfs(0, n, cols, d1, d2);
        return ans;
    }
};
```

### Python
```python
class Solution:
    def totalNQueens(self, n: int) -> int:
        self.ans = 0
        cols, d1, d2 = set(), set(), set()
        def dfs(r):
            if r == n: self.ans += 1; return
            for c in range(n):
                if c in cols or (r - c) in d1 or (r + c) in d2: continue
                cols.add(c); d1.add(r - c); d2.add(r + c)
                dfs(r + 1)
                cols.remove(c); d1.remove(r - c); d2.remove(r + c)
        dfs(0)
        return self.ans
```

### Java
```java
class Solution {
    private int ans = 0;
    public int totalNQueens(int n) {
        dfs(0, n, new boolean[n], new boolean[2 * n], new boolean[2 * n]);
        return ans;
    }
    private void dfs(int r, int n, boolean[] cols, boolean[] d1, boolean[] d2) {
        if (r == n) { ans++; return; }
        for (int c = 0; c < n; c++) {
            if (cols[c] || d1[r - c + n] || d2[r + c]) continue;
            cols[c] = d1[r - c + n] = d2[r + c] = true;
            dfs(r + 1, n, cols, d1, d2);
            cols[c] = d1[r - c + n] = d2[r + c] = false;
        }
    }
}
```

**Complexity:** O(n!) time · O(n) space

</details>

---

## 💭 What Should Have Clicked in Your Mind?

- **Day 18 board constraint pattern** — row-by-row placement with attack checks.
- **Mark/unmark** — three boolean structures, same push/pop rhythm.
- **Count, not collect** — `ans++` at `r==n`, no board vector.
- **Prune before dfs** — invalid column → `continue`, never explore.

---

*1 of 3 test problems. Continue to the next. →*

## Solution

### C++
```cpp
class Solution {
    int ans = 0;
    bool valid(int r, int c, vector<int>& cols, vector<int>& d1, vector<int>& d2) {
        return !cols[c] && !d1[r - c + 50] && !d2[r + c];
    }
    void dfs(int r, int n, vector<int>& cols, vector<int>& d1, vector<int>& d2) {
        if (r == n) { ans++; return; }
        for (int c = 0; c < n; c++) {
            if (!valid(r, c, cols, d1, d2)) continue;
            cols[c] = d1[r - c + 50] = d2[r + c] = 1;
            dfs(r + 1, n, cols, d1, d2);
            cols[c] = d1[r - c + 50] = d2[r + c] = 0;
        }
    }
public:
    int totalNQueens(int n) {
        vector<int> cols(n), d1(100), d2(100);
        dfs(0, n, cols, d1, d2);
        return ans;
    }
};
```

### Python
```python
class Solution:
    def totalNQueens(self, n: int) -> int:
        self.ans = 0
        cols, d1, d2 = set(), set(), set()
        def dfs(r):
            if r == n: self.ans += 1; return
            for c in range(n):
                if c in cols or (r - c) in d1 or (r + c) in d2: continue
                cols.add(c); d1.add(r - c); d2.add(r + c)
                dfs(r + 1)
                cols.remove(c); d1.remove(r - c); d2.remove(r + c)
        dfs(0)
        return self.ans
```

### Java
```java
class Solution {
    private int ans = 0;
    public int totalNQueens(int n) {
        dfs(0, n, new boolean[n], new boolean[2 * n], new boolean[2 * n]);
        return ans;
    }
    private void dfs(int r, int n, boolean[] cols, boolean[] d1, boolean[] d2) {
        if (r == n) { ans++; return; }
        for (int c = 0; c < n; c++) {
            if (cols[c] || d1[r - c + n] || d2[r + c]) continue;
            cols[c] = d1[r - c + n] = d2[r + c] = true;
            dfs(r + 1, n, cols, d1, d2);
            cols[c] = d1[r - c + n] = d2[r + c] = false;
        }
    }
}
```

**Complexity:** O(n!) time · O(n) space
