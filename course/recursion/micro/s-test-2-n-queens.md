<!-- hand-authored -->
# ⚔ S-Rank Test — Problem 2

> [N-Queens #51](https://leetcode.com/problems/n-queens/) · Hard · 300 XP

---

You've completed your S-Rank training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open N-Queens on LeetCode](https://leetcode.com/problems/n-queens/)**

> ⚔ **Hunter's rule:** This is a rank test — treat it like real interview practice. Day 18 constraint sets + board snapshot. Draw both n=4 solutions before coding.

---

## The Problem

Place `n` queens on an `n×n` chessboard so no two queens attack each other. Return all distinct solutions as string arrays.

```
Input:  n = 4
Output: [[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]

Input:  n = 1
Output: [["Q"]]
```

---

## 💡 Hints

> 🎯 **What's being tested:** Day 30 Full Constraint Generation — Day 18 dfs with board output.

**Hint 1:** One queen per row → `dfs(r)`, try columns `0..n-1`.

**Hint 2:** O(1) attack check: `cols[c]`, `d1[r-c]`, `d2[r+c]`.

**Hint 3:** Base `r==n` → snapshot board rows into result.

**Hint 4:** Mark all three sets on place, unmark on backtrack.

**Hint 5:** Same as N-Queens II (#52) but collect boards instead of counting.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Full Constraint Generation (Day 18 + 30)

| Clue | Signal |
|---|---|
| "N-Queens" / all configurations | row-by-row backtrack |
| no attacks | cols + diagonal sets |
| return board strings | snapshot at leaf |
| vs N-Queens II | generate vs count |

**Decision tree route:** Backtrack → Board CSP → generate all.

**How a strong solver thinks before coding:**
1. *"Row dfs — not cell-by-cell brute force."*
2. *"Three sets — never scan board for conflicts."*
3. *"Snapshot at r==n."*
4. *"Unmark before trying next column."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Try all C(n²,n) placements** | Ignores one-queen-per-row structure |
| **Scan board for attacks each try** | O(n) validation per candidate |
| **Forget constraint unmark** | Ghost attacks block siblings |
| **Confuse #51 with #52** | Generate boards vs increment count |

**The insight brute force misses:** Row index + three boolean sets = O(n) branches per level with O(1) validation.

---

## 🎯 Transfer to Unseen Problems

**Scenario:** *"Count N-Queens solutions (N-Queens II)."*

Identical dfs — replace snapshot with `ans++`.

**Scenario:** *"Place n rooks (no diagonal constraint)."*

Column set only — simpler CSP.

**30-second check:** *"dfs(r), cols/d1/d2, mark, board[r][c]='Q', dfs(r+1), unmark."*

---

<details>
<summary><strong>📖 Solution & Walkthrough</strong></summary>

Trace the pattern on the example from the problem statement. Then implement the recursive skeleton you identified.

### C++
```cpp
class Solution {
    bool valid(int r, int c, vector<int>& cols, vector<int>& diag1, vector<int>& diag2) {
        return !cols[c] && !diag1[r - c + 50] && !diag2[r + c];
    }
    void dfs(int r, int n, vector<int>& cols, vector<int>& diag1, vector<int>& diag2,
             vector<string>& board, vector<vector<string>>& res) {
        if (r == n) { res.push_back(board); return; }
        for (int c = 0; c < n; c++) {
            if (!valid(r, c, cols, diag1, diag2)) continue;
            cols[c] = diag1[r - c + 50] = diag2[r + c] = 1;
            board[r][c] = 'Q';
            dfs(r + 1, n, cols, diag1, diag2, board, res);
            board[r][c] = '.';
            cols[c] = diag1[r - c + 50] = diag2[r + c] = 0;
        }
    }
public:
    vector<vector<string>> solveNQueens(int n) {
        vector<vector<string>> res;
        vector<string> board(n, string(n, '.'));
        vector<int> cols(n), diag1(100), diag2(100);
        dfs(0, n, cols, diag1, diag2, board, res);
        return res;
    }
};
```

### Python
```python
class Solution:
    def solveNQueens(self, n: int) -> List[List[str]]:
        res = []
        board = [['.'] * n for _ in range(n)]
        cols, d1, d2 = set(), set(), set()
        def dfs(r):
            if r == n:
                res.append([''.join(row) for row in board]); return
            for c in range(n):
                if c in cols or (r - c) in d1 or (r + c) in d2: continue
                cols.add(c); d1.add(r - c); d2.add(r + c)
                board[r][c] = 'Q'
                dfs(r + 1)
                board[r][c] = '.'
                cols.remove(c); d1.remove(r - c); d2.remove(r + c)
        dfs(0)
        return res
```

### Java
```java
class Solution {
    public List<List<String>> solveNQueens(int n) {
        List<List<String>> res = new ArrayList<>();
        char[][] board = new char[n][n];
        for (char[] row : board) Arrays.fill(row, '.');
        dfs(0, n, new boolean[n], new boolean[2 * n], new boolean[2 * n], board, res);
        return res;
    }
    private void dfs(int r, int n, boolean[] cols, boolean[] d1, boolean[] d2,
                     char[][] board, List<List<String>> res) {
        if (r == n) {
            List<String> snap = new ArrayList<>();
            for (char[] row : board) snap.add(new String(row));
            res.add(snap);
            return;
        }
        for (int c = 0; c < n; c++) {
            if (cols[c] || d1[r - c + n] || d2[r + c]) continue;
            cols[c] = d1[r - c + n] = d2[r + c] = true;
            board[r][c] = 'Q';
            dfs(r + 1, n, cols, d1, d2, board, res);
            board[r][c] = '.';
            cols[c] = d1[r - c + n] = d2[r + c] = false;
        }
    }
}
```

**Complexity:** O(n!) time · O(n^2) space

</details>

---

## 💭 What Should Have Clicked in Your Mind?

- **Day 18 → Day 30** — same dfs, different output (count vs boards).
- **cols, d1, d2** — O(1) attack detection.
- **One queen per row** — recurse on row index.
- **Two solutions for n=4** — trace both boards on paper.

---

*2 of 3 test problems. Continue to the next. →*

## Solution

### C++
```cpp
class Solution {
    bool valid(int r, int c, vector<int>& cols, vector<int>& diag1, vector<int>& diag2) {
        return !cols[c] && !diag1[r - c + 50] && !diag2[r + c];
    }
    void dfs(int r, int n, vector<int>& cols, vector<int>& diag1, vector<int>& diag2,
             vector<string>& board, vector<vector<string>>& res) {
        if (r == n) { res.push_back(board); return; }
        for (int c = 0; c < n; c++) {
            if (!valid(r, c, cols, diag1, diag2)) continue;
            cols[c] = diag1[r - c + 50] = diag2[r + c] = 1;
            board[r][c] = 'Q';
            dfs(r + 1, n, cols, diag1, diag2, board, res);
            board[r][c] = '.';
            cols[c] = diag1[r - c + 50] = diag2[r + c] = 0;
        }
    }
public:
    vector<vector<string>> solveNQueens(int n) {
        vector<vector<string>> res;
        vector<string> board(n, string(n, '.'));
        vector<int> cols(n), diag1(100), diag2(100);
        dfs(0, n, cols, diag1, diag2, board, res);
        return res;
    }
};
```

### Python
```python
class Solution:
    def solveNQueens(self, n: int) -> List[List[str]]:
        res = []
        board = [['.'] * n for _ in range(n)]
        cols, d1, d2 = set(), set(), set()
        def dfs(r):
            if r == n:
                res.append([''.join(row) for row in board]); return
            for c in range(n):
                if c in cols or (r - c) in d1 or (r + c) in d2: continue
                cols.add(c); d1.add(r - c); d2.add(r + c)
                board[r][c] = 'Q'
                dfs(r + 1)
                board[r][c] = '.'
                cols.remove(c); d1.remove(r - c); d2.remove(r + c)
        dfs(0)
        return res
```

### Java
```java
class Solution {
    public List<List<String>> solveNQueens(int n) {
        List<List<String>> res = new ArrayList<>();
        char[][] board = new char[n][n];
        for (char[] row : board) Arrays.fill(row, '.');
        dfs(0, n, new boolean[n], new boolean[2 * n], new boolean[2 * n], board, res);
        return res;
    }
    private void dfs(int r, int n, boolean[] cols, boolean[] d1, boolean[] d2,
                     char[][] board, List<List<String>> res) {
        if (r == n) {
            List<String> snap = new ArrayList<>();
            for (char[] row : board) snap.add(new String(row));
            res.add(snap);
            return;
        }
        for (int c = 0; c < n; c++) {
            if (cols[c] || d1[r - c + n] || d2[r + c]) continue;
            cols[c] = d1[r - c + n] = d2[r + c] = true;
            board[r][c] = 'Q';
            dfs(r + 1, n, cols, d1, d2, board, res);
            board[r][c] = '.';
            cols[c] = d1[r - c + n] = d2[r + c] = false;
        }
    }
}
```

**Complexity:** O(n!) time · O(n^2) space
