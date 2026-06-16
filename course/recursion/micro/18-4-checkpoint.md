<!-- hand-authored -->
# ✅ Day 18 Checkpoint

> **Board & Grid CSP** · 2 quests completed · ⭐ 70 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

| When you see... | Think... | Key mechanic |
|---|---|---|
| "n-queens" / queens not attacking | Row-by-row placement | cols + d1[r-c] + d2[r+c] |
| "number of solutions" on board puzzle | Count-only CSP | ans++ at r==n, no board storage |
| "solve sudoku" / fill empty cells | Fill-board CSP | idx 0..80, try 1–9, undo with '.' |
| row + column + 3×3 box | Sudoku valid() | Scan all three before assign |
| "word search" / path in grid | Day 16 — not Day 18 | 4-dir movement + mark/unmark path |

### 🧠 Quick Recognition Test

1. *"Return count of n-queens solutions"* → **Row dfs, three constraint sets, ans++ at leaf.**

2. *"Solve sudoku in place"* → **Linear idx, skip givens, valid row/col/box, return true on first fill.**

3. *"Find word path in character grid"* → **Day 16 Word Search** — not slot assignment.

4. *"Return all n-queens board layouts"* → **N-Queens I (#51)** — same dfs, push board string at leaf.

---

## 🎯 Transfer to Unseen Problems

**Scenario 1:** *"Place rooks so none share row or column — count arrangements."*

Which pattern? **N-Queens without diagonals** — only `cols` set, simpler constraint.

**Scenario 2:** *"Determine if a partially filled Sudoku is valid (no solve needed)."*

Which pattern? **Valid Sudoku (#36)** — same row/col/box checks, no backtracking recursion.

**Scenario 3:** *"Fill a crossword grid with dictionary words."*

Which pattern? **Cell/slot CSP like Sudoku** — try candidates per slot, undo on failure; constraints from crossing words.

> **Answer key:** Scenarios 1 and 3 → Day 18 slot-fill family. Scenario 2 → validation only.

---

## ⚠ Common Mistakes

1. **N-Queens: forget anti-diagonal `r+c`** — Only checking columns leaves diagonal attacks.
2. **N-Queens II: storing all boards** — Count-only needs only `ans++`.
3. **Sudoku: validate row only** — Column and 3×3 box duplicates fail hidden tests.
4. **Sudoku: overwrite given cells** — Skip with `if board[r][c] != '.'`.
5. **Confusing with Word Search** — Day 18 assigns values to fixed slots; Day 16 walks adjacent cells.

---

## 🏋️ Mini Challenge

Without looking at notes, write the three constraint keys for a queen at `(r, c)` and the Sudoku `valid()` scan regions (row, column, box anchor formula).

Then solve [Valid Sudoku #36](https://leetcode.com/problems/valid-sudoku/) — no backtracking, just the constraint checks.

> 💡 **Keys:** `cols[c]`, `d1[r-c]`, `d2[r+c]`. Box anchor: `(r/3*3, c/3*3)`.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [N-Queens II #52](https://leetcode.com/problems/n-queens-ii/) | Medium | Row-by-row count CSP |
| [Sudoku Solver #37](https://leetcode.com/problems/sudoku-solver/) | Medium | Cell fill row/col/box |

---

*Day 18 complete. Tomorrow: partition backtracking — matchsticks and equal subsets revisited. →*
