<!-- hand-authored -->
# ⚔ Quest: N-Queens

> **Day 30** · [N-Queens #51](https://leetcode.com/problems/n-queens/) · Hard · 25 min · 60 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open N-Queens on LeetCode](https://leetcode.com/problems/n-queens/)**

> ⚔ **Hunter's rule:** Day 18 N-Queens II constraint sets — but **snapshot the board** at each leaf. Trace both n=4 solutions on paper with full board diagrams.

---

## The Problem

The **n-queens** puzzle: place `n` queens on an `n×n` board so no two queens attack each other (same row, column, or diagonal).

Return all distinct solutions. Each solution is a board configuration as a string array where `'Q'` and `'.'` represent a queen and empty cell.

```
Input:  n = 4
Output: [[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]

Input:  n = 1
Output: [["Q"]]
```

---

## 💡 Hints

**Hint 1:** One queen per row → recurse on **row index** `r`, try each **column** `c`.

**Hint 2:** Day 18 constraint sets: `cols[c]`, `d1[r-c]`, `d2[r+c]` — O(1) attack check.

**Hint 3:** Base: `r == n` → snapshot board into result.

**Hint 4:** Choose: mark constraints + `board[r][c]='Q'`. Unchoose: unmark + `board[r][c]='.'`.

**Hint 5:** Difference from N-Queens II (#52): same dfs, but **store board strings** instead of incrementing count.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Full Constraint Generation (Day 18 + board output)

| Clue | Signal |
|---|---|
| "N-Queens" / place n queens | row-by-row backtrack |
| no two attack | cols + diag sets |
| return all configurations | snapshot board at leaf |
| vs N-Queens II | generate vs count |

**Day 18 vs Day 30:**

| N-Queens II #52 | N-Queens #51 |
|---|---|
| return count | return all board strings |
| `ans++` at leaf | `res.push_back(board)` |
| no board storage needed | maintain `board[n][n]` |
| same dfs skeleton | same dfs skeleton |

**How a strong solver thinks before coding:**
1. *"Row index dfs — one queen per row."*
2. *"cols, d1, d2 — don't scan board."*
3. *"Snapshot at r==n."*
4. *"Unmark before next column try."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Place queens anywhere on board (n² positions)** | Violates one-per-row structure |
| **Scan full board for attacks each placement** | O(n) per check → O(n!) with extra factor |
| **Forget to unmark constraints** | Ghost queens block valid configs |
| **Store board before backtrack unmark** | Must copy board at leaf only |

**The insight brute force misses:** Row-by-row placement + three boolean sets reduces each decision to O(n) column tries with O(1) validation.

---

## 🔗 Same Pattern, Other Problems

| Problem | Output |
|---|---|
| [N-Queens II #52](https://leetcode.com/problems/n-queens-ii/) | Count only (Day 18) |
| [N-Queens #51](https://leetcode.com/problems/n-queens/) | All boards (today) |
| [Sudoku Solver #37](https://leetcode.com/problems/sudoku-solver/) | Fill one board (Day 18) |

---

## 📖 Walkthrough

### n = 4 — Solution 1 (full board trace)

Target: `[".Q..","...Q","Q...","..Q."]`

```
dfs(r=0): c=1 → Q@(0,1)   cols={1}, d1={-1}, d2={1}

         . Q . .
         . . . .
         . . . .
         . . . .

dfs(r=1): c=3 → Q@(1,3)   cols={1,3}, d1={-1,-2}, d2={1,4}

         . Q . .
         . . . Q
         . . . .
         . . . .

dfs(r=2): c=0 → Q@(2,0)   all sets clear

         . Q . .
         . . . Q
         Q . . .
         . . . .

dfs(r=3): c=2 → Q@(3,2)   r==4 → SNAPSHOT ✓

         . Q . .
         . . . Q
         Q . . .
         . . Q .
```

### n = 4 — Solution 2

Target: `["..Q.","Q...","...Q",".Q.."]`

```
Row 0: c=2 → ..Q.
Row 1: c=0 → Q...
Row 2: c=3 → ...Q
Row 3: c=1 → .Q..
SNAPSHOT ✓
```

### dfs tree (n=4, abbreviated)

```
dfs(0)
├── c=0 → ... → dead end
├── c=1 → c=3 → c=0 → c=2 → dfs(4) → Solution 1 ✓
├── c=2 → c=0 → c=3 → c=1 → dfs(4) → Solution 2 ✓
└── c=3 → dead end
```

Two leaves at `r==n`. Constraint sets prune all other branches at O(1) per column try.

---

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
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Day 18 dfs — row by row."** → Same constraint sets as N-Queens II.
- **"cols, d1, d2 — O(1) check."** → Never scan the board for attacks.
- **"r==n → snapshot."** → Copy board rows to result.
- **"Two boards for n=4."** → Trace both on paper before coding.

If you tried nested loops over all cell combinations, that's fine — the breakthrough is **one queen per row + constraint sets**, not brute placement.

> 🎯 **Pattern Unlocked:** Full Constraint Generation

---

*Both quests complete. Head to the checkpoint — you are at the summit. →*
