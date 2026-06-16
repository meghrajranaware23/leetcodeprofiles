<!-- hand-authored -->
# ⚔ Quest: Sudoku Solver

> **Day 18** · [Sudoku Solver #37](https://leetcode.com/problems/sudoku-solver/) · Medium · 15 min · 35 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Sudoku Solver on LeetCode](https://leetcode.com/problems/sudoku-solver/)**

> ⚔ **Hunter's rule:** Linearize the board 0–80. On the first empty cell, list which digits 1–9 pass row, column, and box checks before writing any code.

---

## The Problem

Write a program to solve a **Sudoku** puzzle by filling the empty cells.

A Sudoku solution must satisfy all of the following rules:

1. Each of the digits `1-9` must occur exactly once in each **row**.
2. Each of the digits `1-9` must occur exactly once in each **column**.
3. Each of the digits `1-9` must occur exactly once in each of the nine **3×3** sub-boxes.

The `.` character indicates empty cells. You must solve the puzzle **in place**.

```
Input:
[["5","3",".",".","7",".",".",".","."],
 ["6",".",".","1","9","5",".",".","."],
 [".","9","8",".",".",".",".","6","."],
 ...
Output: solved board (same grid structure, no '.' remaining)
```

**Constraints:** `board.length == 9`, only digits `1-9` and `'.'`. Guaranteed at least one solution.

---

## 💡 Hints

**Hint 1:** Walk cells with linear index `idx` from 0 to 80. Convert: `r = idx/9`, `c = idx%9`.

**Hint 2:** If `board[r][c] != '.'`, skip — recurse `dfs(idx+1)` (given cell).

**Hint 3:** For empty cells, try digits `'1'` through `'9'`. Call `valid(r, c, d)` checking row, column, and 3×3 box.

**Hint 4:** Assign `board[r][c] = d`, if `dfs(idx+1)` returns true → solved. Else reset `board[r][c] = '.'`.

**Hint 5:** Base case `idx == 81` → return true. This is **fill-board**, not count-all — return on first success.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Cell Assignment Backtracking (Fill-Board)

**How to identify this from the problem statement:**
- "Fill empty cells" / "solve in place" → mutate board, return true on success
- Row + column + box uniqueness → triple constraint check per digit
- Fixed 9×9 structure → linear index traversal, skip givens

| Keyword / phrase | What it signals |
|---|---|
| "solve sudoku" / "fill empty cells" | Idx dfs, try 1–9 |
| "each row/column/box" | valid() scans row, col, 3×3 |
| "in place" / modify board | Choose digit, unchoose with `'.'` |
| "." empty cell | Skip or assign |
| guaranteed solution | Return true immediately — no need to count |

**Why this pattern works:** Each empty cell tries at most 9 digits with O(9) validation — constraints eliminate most branches early. First complete assignment wins.

**How a strong solver thinks before coding:**
1. *"Linear idx 0..80, skip givens."*
2. *"Empty cell → loop d='1'..'9'."*
3. *"valid checks row AND col AND box."*
4. *"Assign, dfs(idx+1), if true return; else '.' undo."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Try 9^81 all assignments** | No constraint check until end — astronomical |
| **Check only row when validating** | Column/box duplicates slip through |
| **Overwrite given cells** | Must skip prefilled positions |
| **No undo on failed branch** | Board stays wrong for sibling digits |
| **Search all solutions when one suffices** | Wastes time — return true on first complete fill |

**The insight brute force misses:** Validate **before** recursing. Undo with `'.'` so the next digit attempt starts clean — same push/pop rhythm as N-Queens constraint marks.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Sudoku Solver #37](https://leetcode.com/problems/sudoku-solver/) | Fill one board | Idx dfs + row/col/box |
| [Valid Sudoku #36](https://leetcode.com/problems/valid-sudoku/) | Check only, no fill | Same constraint logic, no backtrack |
| [N-Queens II #52](https://leetcode.com/problems/n-queens-ii/) | Count queen placements | Constraint sets (previous quest) |
| [Word Search #79](https://leetcode.com/problems/word-search/) | Path in letter grid | Day 16 — mark path cells, not digit fill |

If you recognized Sudoku, you understand **fill-board CSP** — contrast with N-Queens II's **count-only** goal.

---

## 📖 Walkthrough

Fragment of a board — first empty at `(0,2)` after skipping givens:

```
Row 0:  5  3  .  |  .  7  .  |  .  .  .
              ↑ idx=2, empty

valid(0, 2, '1'): row has 5,3,7 — col has 6,9,... — box top-left has 5,3,6,9,8
Try '1': col conflict? scan col 2... if ok, box ok → assign

board[0][2] = '1'
  dfs(idx=3): board[0][3] is '.' ...
  ... deeper ...
  dead end → return false

board[0][2] = '.'   ← UNCHOOSE
Try '2': ...
Eventually '4' (example) → dfs continues → ... → idx=81 → return true
```

Box anchor for cell `(r,c)`:

```
box_row = (r / 3) * 3
box_col = (c / 3) * 3
Scan 3×3 cells starting at (box_row, box_col)
```

Skip given cell:

```
idx=0: board[0][0]='5' → dfs(1)   (no branch, no undo)
idx=1: board[0][1]='3' → dfs(2)
idx=2: board[0][2]='.' → try digits
```

> 💡 **The insight:** N-Queens marks constraint **sets**; Sudoku writes to the **board** and validates by scanning row/col/box. Both undo before the next sibling choice.

---

## Solution

### C++
```cpp
class Solution {
    bool valid(vector<vector<char>>& b, int r, int c, char d) {
        for (int i = 0; i < 9; i++)
            if (b[r][i] == d || b[i][c] == d) return false;
        int br = (r / 3) * 3, bc = (c / 3) * 3;
        for (int i = 0; i < 3; i++)
            for (int j = 0; j < 3; j++)
                if (b[br + i][bc + j] == d) return false;
        return true;
    }
    bool dfs(vector<vector<char>>& b, int idx) {
        if (idx == 81) return true;
        int r = idx / 9, c = idx % 9;
        if (b[r][c] != '.') return dfs(b, idx + 1);
        for (char d = '1'; d <= '9'; d++) {
            if (!valid(b, r, c, d)) continue;
            b[r][c] = d;
            if (dfs(b, idx + 1)) return true;
            b[r][c] = '.';
        }
        return false;
    }
public:
    void solveSudoku(vector<vector<char>>& board) { dfs(board, 0); }
};
```

### Python
```python
class Solution:
    def solveSudoku(self, board: List[List[str]]) -> None:
        def valid(r, c, d):
            for i in range(9):
                if board[r][i] == d or board[i][c] == d: return False
            br, bc = (r // 3) * 3, (c // 3) * 3
            for i in range(3):
                for j in range(3):
                    if board[br + i][bc + j] == d: return False
            return True
        def dfs(idx):
            if idx == 81: return True
            r, c = divmod(idx, 9)
            if board[r][c] != '.': return dfs(idx + 1)
            for d in '123456789':
                if not valid(r, c, d): continue
                board[r][c] = d
                if dfs(idx + 1): return True
                board[r][c] = '.'
            return False
        dfs(0)
```

### Java
```java
class Solution {
    public void solveSudoku(char[][] board) { dfs(board, 0); }
    private boolean dfs(char[][] b, int idx) {
        if (idx == 81) return true;
        int r = idx / 9, c = idx % 9;
        if (b[r][c] != '.') return dfs(b, idx + 1);
        for (char d = '1'; d <= '9'; d++) {
            if (!valid(b, r, c, d)) continue;
            b[r][c] = d;
            if (dfs(b, idx + 1)) return true;
            b[r][c] = '.';
        }
        return false;
    }
    private boolean valid(char[][] b, int r, int c, char d) {
        for (int i = 0; i < 9; i++)
            if (b[r][i] == d || b[i][c] == d) return false;
        int br = (r / 3) * 3, bc = (c / 3) * 3;
        for (int i = 0; i < 3; i++)
            for (int j = 0; j < 3; j++)
                if (b[br + i][bc + j] == d) return false;
        return true;
    }
}
```

**Complexity:** O(9^m) time · O(9) space
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Solve in place"** → Fill-board backtracking — return true when idx hits 81.
- **"Three rules: row, column, box"** → valid() must check all three before assigning.
- **"Skip givens"** → Don't overwrite `'5'` — just dfs(idx+1).
- **"Not Word Search"** → No 4-direction walk; fixed cell order with digit trials.
- **"Undo with '.'"** → Same unchoose as N-Queens unmark, but on the board cell.

If you tried nested loops over all 9^81 assignments, that's fine — the breakthrough is **validate-then-recurse with explicit undo on failure**.

> 🎯 **Pattern Unlocked:** Cell assignment CSP — try 1–9, triple constraint check, fill until idx==81.

---

*Both quests complete. Head to the checkpoint. →*
