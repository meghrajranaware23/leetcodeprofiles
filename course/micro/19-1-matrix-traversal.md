# 📝 Matrix Traversal

> **Day 19** · Matrix Traversal · 15 XP · 12 min read

---

Welcome to B-Rank matrix work. On C-Rank you mastered 1D arrays — sliding windows, prefix sums, Kadane's, difference arrays. Today the same traversal instincts move to a **2D grid**: rows and columns, boundaries, and in-place transforms.

The core skill is not memorizing four nested loops — it's recognizing **which direction to walk** and **when to shrink the boundary**.

---

## Part 1 — Learn the Pattern

### 1. What is the pattern?

A **matrix** is a 2D array: `matrix[row][col]`. Traversal means visiting every cell in a specific order without revisiting or skipping.

The most interview-critical variant is **spiral / boundary shrinking**:

```
Walk the current outer boundary → shrink top/bottom/left/right → repeat
```

```
matrix = [
  [ 1,  2,  3,  4 ],
  [ 5,  6,  7,  8 ],
  [ 9, 10, 11, 12 ]
]

Spiral order: 1 → 2 → 3 → 4 → 8 → 12 → 11 → 10 → 9 → 5 → 6 → 7
```

Four boundary pointers track the "unvisited rectangle":

```
top = 0, bottom = rows - 1
left = 0, right = cols - 1

Loop while top <= bottom AND left <= right:
  1. Walk top row:    left → right        then top++
  2. Walk right col:  top → bottom        then right--
  3. Walk bottom row: right → left        then bottom--   (if top <= bottom)
  4. Walk left col:   bottom → top        then left++     (if left <= right)
```

Each full loop peels one layer off the onion.

### 2. 1D traversal vs 2D traversal

| Tool | Moves along | Best for |
|---|---|---|
| **Forward loop** (Day 1) | One index `i` | Single row/column, building left-to-right |
| **Nested loops** | `i` rows, `j` cols | Visit every cell in row-major order |
| **Boundary shrinking** | Four edges of a rectangle | Spiral order, layer-by-layer extraction |
| **Transpose + reverse** | Swap rows/cols, flip rows | In-place 90° rotation |

**Rule of thumb:** If the problem says *"spiral"*, *"rotate"*, or *"walk the border"* — think boundary pointers, not a single `for` loop.

### 3. Cross-rank bridge — E-Rank Day 1, C-Rank patterns

**E-Rank Day 1 — Array Traversal** gave you the 1D mental model:

```
Index:  0 → 1 → 2 → 3 → 4
        ──────────────────→
```

A matrix is that same idea in two dimensions. Row `i` is a 1D array; visiting `matrix[i][j]` is forward traversal on row `i` at column `j`.

| Day 1 (1D) | Day 19 (2D) |
|---|---|
| `for i in 0..n-1` | `for i in 0..rows-1, for j in 0..cols-1` |
| Read-write pointer on one array | Boundary pointers on four edges |
| In-place modify with `write` index | In-place rotate with transpose + reverse |
| O(n) single pass | O(m × n) visit every cell once |

**C-Rank Day 9 — Fixed Sliding Window:** A window of size `k` slides along a 1D array. Spiral traversal slides a **shrinking rectangle** around a 2D array — same "move a boundary, collect elements" instinct, different geometry.

**C-Rank Day 14 — Sorting as Strategy:** Merge Intervals sorted by start. Spiral Matrix doesn't need sorting — but **layer order is deterministic** once you fix the walk direction (clockwise from top-left).

### 4. Small visual example — boundary shrinking

```
matrix = [
  [ 1,  2,  3 ],
  [ 4,  5,  6 ],
  [ 7,  8,  9 ]
]

top=0, bottom=2, left=0, right=2

Layer 1:
  top row:    1, 2, 3     → top becomes 1
  right col:  6, 9         → right becomes 1
  bottom row: 8, 7         → bottom becomes 1
  left col:   4            → left becomes 1

Layer 2:
  center: 5

Result: [1, 2, 3, 6, 9, 8, 7, 4, 5] ✓
```

**Guard checks matter:** After the top row, `top` and `bottom` may have crossed — skip the bottom row. After the right column, `left` and `right` may have crossed — skip the left column.

### 5. What problem does this pattern solve?

- **Spiral order output** — return elements in clockwise spiral (#54)
- **Spiral fill** — build a matrix from 1 to n² in spiral order (#59)
- **Rotate 90° clockwise** — transpose then reverse each row (#48)
- **Set matrix zeroes** — use first row/col as markers, then sweep (preview)
- **Diagonal traversal** — walk along `i + j = constant` (Day 21+ preview)

### 6. Why brute force is inefficient

| Brute force | Problem |
|---|---|
| Mark visited cells with a boolean grid | O(m × n) extra space when O(1) boundary pointers suffice |
| Simulate spiral with direction arrays + turn logic | Works, but easy to get turn conditions wrong on edge cases |
| Copy matrix, rotate with nested index math | O(m × n) extra space — transpose + reverse is in-place |
| Re-read the same cell after each direction change | Guard checks prevent double-visiting the center row/col |

Each cell is visited exactly once → **O(m × n)** time. Boundary shrinking uses **O(1)** extra space (four integers).

### 7. The key observation

Spiral traversal is **not** a mysterious direction machine — it's four straight walks on a shrinking rectangle:

```
top row    →  left to right
right col  →  top to bottom
bottom row →  right to left   (only if a row remains)
left col   →  bottom to top   (only if a column remains)
```

Rotate 90° clockwise decomposes into two 1D operations you already know:

```
Step 1: Transpose  — matrix[i][j] ↔ matrix[j][i]   (swap across diagonal)
Step 2: Reverse each row — same as reversing a 1D array (Day 1)
```

### 8. Pattern signals & recognition clues

| When the problem says… | Think matrix traversal |
|---|---|
| "spiral order" / "clockwise" | Boundary shrinking, four edges |
| "generate matrix 1 to n²" | Same spiral walk, but **write** instead of read |
| "rotate image 90°" | Transpose + reverse rows (clockwise) |
| "in-place" + "square matrix" | Transpose + reverse — no extra grid |
| "layer by layer" / "peel the onion" | Shrink top/bottom/left/right |

**Keywords:** `spiral` · `rotate` · `matrix` · `2D array` · `clockwise` · `in-place` · `boundary`

### 9. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Forgetting guard checks after top/right walks | Check `top <= bottom` before bottom row; `left <= right` before left col |
| Off-by-one on inner loops | Top row: `j = left..right`. Right col: `i = top+1..bottom` (skip corner already taken) |
| Rotating with index formula `matrix[i][j] → matrix[j][n-1-i]` | Works but needs extra buffer — transpose + reverse is simpler and in-place |
| Confusing rows and columns | `matrix[row][col]` — rows are horizontal, cols are vertical |
| Spiral Matrix II: wrong start position | Start at `(0,0)` with value 1, same boundary walk |

### 10. Recognition drill

Read this problem aloud:

> *"Given an m × n matrix, return all elements in spiral order."*

Before coding, say:

> *"Spiral = walk four edges of a rectangle, shrink boundaries, guard against crossing. O(m × n) time, O(1) extra space for the walk."*

---

## Part 2 — What's Next

Today you'll apply matrix traversal to two classic Medium problems:

1. **Spiral read** — Spiral Matrix (#54)
2. **In-place rotation** — Rotate Image (#48)

Same boundary instinct for #54. Transpose + reverse for #48 — two 1D skills from Day 1, combined.

---

*You see the grid as layers, not chaos. First quest: output a matrix in spiral order. →*
