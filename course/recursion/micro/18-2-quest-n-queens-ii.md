<!-- hand-authored -->
# ⚔ Quest: N-Queens II

> **Day 18** · [N-Queens II #52](https://leetcode.com/problems/n-queens-ii/) · Medium · 15 min · 35 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open N-Queens II on LeetCode](https://leetcode.com/problems/n-queens-ii/)**

> ⚔ **Hunter's rule:** Trace `n=4` row-by-row on paper. Mark which columns and diagonals are blocked after each placement. Count leaves where `r==4`.

---

## The Problem

The **n-queens** puzzle is placing `n` queens on an `n×n` chessboard so that no two queens attack each other.

Given an integer `n`, return the **number of distinct solutions** to the n-queens puzzle.

```
Input:  n = 4
Output: 2

Input:  n = 1
Output: 1
```

**Constraints:** `1 <= n <= 9`

---

## 💡 Hints

**Hint 1:** One queen per row → recurse on row `r`, try each column `c`.

**Hint 2:** Track three constraint sets: column `c`, main diagonal `r-c`, anti diagonal `r+c`.

**Hint 3:** Before placing: `if cols[c] or d1[r-c] or d2[r+c]: continue`.

**Hint 4:** Mark all three sets, `dfs(r+1)`, unmark all three — choose/explore/unchoose.

**Hint 5:** This is **count-only** — increment `ans` when `r == n`. No need to store board layouts.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Row-by-Row Constraint Backtracking (Count-Only)

**How to identify this from the problem statement:**
- "n-queens" / "no two queens attack" → column + diagonal constraints
- "number of distinct solutions" → count at leaf, not enumerate boards
- Fixed board size, one piece per row → row index drives recursion

| Keyword / phrase | What it signals |
|---|---|
| "n-queens" | Row-by-row placement |
| "number of solutions" / "count" | Global counter, no path storage |
| "not attacking" / "distinct solutions" | cols + two diagonal sets |
| "chessboard" / n×n | Try columns 0..n-1 at each row |
| N-Queens I vs II | I returns boards; II returns count only |

**Why this pattern works:** Row-by-row structure eliminates row conflicts by design. O(1) set checks prune illegal columns and diagonals before deeper recursion.

**How a strong solver thinks before coding:**
1. *"One queen per row → dfs(row)."*
2. *"Three sets: col, r-c, r+c."*
3. *"Mark → dfs(r+1) → unmark."*
4. *"r==n → ans++. No board array needed."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Place queens in all n^n positions** | Row conflicts everywhere — no structure |
| **Scan entire board to validate each placement** | O(n) per check; sets are O(1) |
| **Store all board strings like N-Queens I** | Wastes memory when only count requested |
| **Try 8 directions from each queen** | Wrong model — place one queen per row, not move pieces |
| **Forget to unmark diagonals** | Blocks valid sibling columns |

**The insight brute force misses:** Row-by-row placement + three boolean/set trackers reduces the search to valid partial boards only — and count-only needs no layout storage.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [N-Queens II #52](https://leetcode.com/problems/n-queens-ii/) | Count solutions | Row + col/diag sets |
| [N-Queens #51](https://leetcode.com/problems/n-queens/) | Return all boards | Same dfs, record board at leaf |
| [Sudoku Solver #37](https://leetcode.com/problems/sudoku-solver/) | Fill digits 1–9 | Slot assignment + constraints (next quest) |
| [Word Search #79](https://leetcode.com/problems/word-search/) | Grid path | Day 16 — movement, not slot fill |

If you recognized N-Queens II, Sudoku next uses the same choose/explore/unchoose — but fills cell values with row/col/box checks instead of counting.

---

## 📖 Walkthrough

`n = 4` — track `cols`, `d1[r-c]`, `d2[r+c]`:

```
dfs(r=0)
  c=0: place Q → cols={0}, d1={0}, d2={0}
    dfs(r=1)
      c=0: cols[0] blocked ✗
      c=1: d1[1-1=0] blocked ✗
      c=2: place → cols={0,2}, d1={0,0}, d2={0,2}
        dfs(r=2)
          c=0: cols[0] ✗
          c=1: d1[2-1=1] check... d2[2+1=3]...
          ... all fail → backtrack
        unmark c=2
      c=3: place → leads to complete board #1
        dfs(r=4) → ans++  (board: cols 0,3,1,2 pattern)
        unmark c=3
    unmark c=0

  c=1: ... eventually dead ends

  c=2: place at (0,2) → ... complete board #2 at ans=2
  ...

Final ans = 2
```

Constraint keys for queen at `(1, 3)`:
```
cols[3] = occupied
d1[1-3] = d1[-2] = occupied  (↘ diagonal)
d2[1+3] = d2[4] = occupied    (↙ diagonal)
```

> 💡 **The insight:** You never store the chessboard — only whether each column and diagonal lane is taken. `r==n` means all rows filled legally.

---

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
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Number of solutions, not list of boards"** → Counter at `r==n`, not `res.push_back(board)`.
- **"One queen per row"** → Outer loop is rows; inner loop tries columns.
- **"Attacks on diagonals"** → Track `r-c` and `r+c` — not just columns.
- **"Word Search was grid walking"** → This is slot assignment with constraint sets — no 4-direction move.

If you copied N-Queens I and stored every board, that's fine — the breakthrough is **three O(1) constraint trackers and count-only early exit**.

> 🎯 **Pattern Unlocked:** Row-by-row CSP — mark col + diagonals, count at full depth, unmark on retreat.

---

*One quest down. Next: fill a Sudoku board cell by cell. →*
