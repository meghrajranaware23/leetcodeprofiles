<!-- hand-authored -->
# 📝 Board & Grid Constraint Backtracking

> **Day 18** · Board & Grid CSP · 25 XP · 15 min read

---

Day 16's Word Search **walks** a grid — start anywhere, move 4 directions, mark/unmark cells along a path. Today's problems **fill** a fixed board: each decision assigns a value to a slot, and **constraint sets** tell you what's legal.

Two templates:

1. **N-Queens II (#52)** — place one queen per row; track occupied columns and diagonals; **count** valid boards
2. **Sudoku Solver (#37)** — fill empty cells 1–9; check row, column, and 3×3 box; **construct** one complete board

Same backtracking rhythm: choose → explore → unchoose. Different output goal: **count-only** vs **fill-until-solved**.

---

## Part 1 — Learn the Pattern

### 1. Count-only vs fill-board

| N-Queens II (#52) | Sudoku Solver (#37) |
|---|---|
| Return **count** of solutions | **Mutate board** to one valid solution |
| Increment global counter at leaf | Return `true` on first complete fill |
| No board storage needed | Write digit, backtrack with `'.'` |
| One queen per row | One digit per empty cell |

Both stop exploring a branch the moment a constraint breaks. Both undo the assignment before trying the next sibling.

### 2. N-Queens — row-by-row with constraint sets

Place queens on an `n×n` board so no two share a row, column, or diagonal.

**Key insight:** exactly one queen per row → recurse on **row index**, try each **column**.

```
n = 4, one valid board:

. Q . .
. . . Q
Q . . .
. . Q .

Row 0: try col 0,1,2,3 — check constraints
Row 1: only cols not attacked by row 0
...
Leaf (row == n): ans++
```

**Three attack sets** (O(1) lookup):

| Set | Key | Tracks |
|---|---|---|
| `cols` | column `c` | any queen in column c |
| `d1` | `r - c` | main diagonal ↘ |
| `d2` | `r + c` | anti diagonal ↙ |

```
Place queen at (r, c):
  if cols[c] or d1[r-c] or d2[r+c]: invalid
  mark all three → dfs(r+1)
  unmark all three
```

Why sets instead of scanning the board? Each placement check is O(1) — critical when counting millions of solutions for larger n.

### 3. N-Queens walkthrough (n = 4, count)

```
dfs(r=0)
  c=0: mark cols[0], d1[0], d2[0]
    dfs(r=1)
      c=0: cols[0] taken ✗
      c=1: d1[0] taken (same ↘ diag) ✗
      c=2: mark → dfs(r=2)
        c=0: cols[0] ✗
        c=1: d1[-1] ✗ ... eventually dead end → backtrack
      c=3: mark → dfs(r=2) → ... → dfs(r=4) ans++  ✓
      unmark c=3
    unmark c=0

Second distinct solution found at different row-0 choice → total ans = 2 for n=4
```

**Count-only:** you never store the board — only increment `ans` when `r == n`.

### 4. Sudoku — cell assignment with box constraint

9×9 grid. Each row, column, and 3×3 box must contain digits 1–9 exactly once. Fill empty cells (`.`).

**Linearize the board:** index `0..80` → `r = idx/9`, `c = idx%9`.

```
dfs(idx):
  if idx == 81: return true          // solved
  if board[r][c] != '.': return dfs(idx+1)   // skip givens

  for d in '1'..'9':
    if valid(r, c, d):               // row + col + box check
      board[r][c] = d                // CHOOSE
      if dfs(idx+1): return true     // EXPLORE
      board[r][c] = '.'              // UNCHOOSE
  return false
```

**valid(r, c, d):** scan row `r`, column `c`, and 3×3 box anchored at `(r/3*3, c/3*3)`.

### 5. Sudoku walkthrough (fragment)

```
. 3 . | . 7 . | . . .
6 . . | 1 9 5 | . . .
. 9 8 | . . . | . 6 .

idx finds first empty at (0,0)
Try d='1': row 0 has no 1, col 0 has 6 — check box...
Try d='4': valid → board[0][0]='4'
  recurse to next empty...
  if dead end → backtrack board[0][0]='.'
```

**Fill-board:** return `true` immediately when a complete assignment works — don't search for all solutions unless asked.

### 6. Day 16 Word Search vs Day 18 board CSP

| Word Search (#79, Day 16) | N-Queens / Sudoku (Day 18) |
|---|---|
| Path through adjacent cells | Fixed slot assignment (row or index) |
| Start from any cell | Structured order: row 0..n-1 or idx 0..80 |
| Mark visited along a **path** | Mark **global constraints** (col/diag or row/col/box) |
| Goal: find one word | N-Queens: count all; Sudoku: fill one board |
| 4-direction movement | No movement — try values at current slot |
| Unmark restores path cell | Unmark releases constraint for next sibling |

Word Search asks *"does this path exist?"* Board CSP asks *"what value belongs in this slot?"*

### 7. Why brute force fails

| Brute force | Problem |
|---|---|
| Try all `n^n` queen placements | No row/column/diag prune — explores hopeless boards |
| Scan full board for each queen check | O(n) per try — slow; use constraint sets |
| Sudoku: try 1–9 on every cell including givens | Must skip prefilled cells |
| Sudoku: no undo on failed branch | Board corrupted for siblings |
| N-Queens I: store all boards when only count needed | Wastes memory — increment counter instead |

### 8. Pattern signals & recognition clues

| When the problem says… | Think… |
|---|---|
| "N-Queens" / "queens not attacking" | Row-by-row, col + diag sets |
| "return number of solutions" | Count at leaf, no board storage |
| "solve sudoku" / "fill empty cells" | Linear idx, try 1–9, row/col/box valid |
| "return the board" / "modify in place" | Return true on first success |
| "each row/col/box unique" | Constraint check before recurse |

**Keywords:** `N-Queens` · `Sudoku` · `constraint` · `row column box` · `diagonal` · `count solutions`

### 9. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Checking only row/col for queens | Add both diagonals: `r-c` and `r+c` |
| Storing full board for N-Queens II | Increment counter — count-only |
| Not skipping Sudoku givens | `if board[r][c] != '.'` → dfs(idx+1) |
| Validating only row in Sudoku | Also column and 3×3 box |
| 8-direction queen moves | One queen per row, one column pick — no movement |
| Confusing with Word Search mark/unmark | Day 18 marks **constraint sets**, not path cells |

### 10. Recognition drill

Read this problem aloud:

> *"Return the number of distinct solutions to the n-queens puzzle."*

Before coding, say:

> *"Row-by-row backtrack. Try each column. O(1) check with cols, d1[r-c], d2[r+c]. Mark, dfs(r+1), unmark. ans++ when r==n."*

Read this variant:

> *"Write a program to solve a Sudoku puzzle by filling the empty cells."*

Before coding, say:

> *"Linear index dfs. Skip givens. Try digits 1–9 with row/col/box valid. Choose, recurse, unchoose with '.'."*

---

## Part 2 — What's Next

Today's quests:

1. **N-Queens II #52** — count-only, constraint sets
2. **Sudoku Solver #37** — fill-board, row/col/box validation

Trace constraint marks on paper before you code. The undo step is what separates CSP backtracking from brute enumeration.

---

*You understand board CSP vs grid path search. First quest: count the queen placements. →*
