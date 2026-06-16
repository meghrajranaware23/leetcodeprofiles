<!-- hand-authored -->
# 📝 Tree Width, Depth & Coordinates

> **Day 15** · Tree Coordinates · ★★★★☆ · 15 XP · 15 min read

---

Days 1–9 traversed by **structure** (DFS/BFS order). Today assign each node a **position on a grid**: column (horizontal), row (depth). Sort by `(col, row, val)` to produce vertical slices — or walk the **perimeter** in three deliberate passes: left edge, leaves, right edge.

> **Contrast (Day 9 BFS):** Level-order groups by depth. Day 15 groups by **column** — same depth can split across vertical lines.

---

## Part 1 — Learn the Pattern

### 1. What is the pattern?

**Coordinate tagging + ordered collection:**

| Problem | Tagging rule | Output order |
|---|---|---|
| Vertical order | `(col, row, val)` — left col-1, right col+1 | Sort/map by col, then row |
| Boundary | Three-pass perimeter walk | Left edge → leaves → right edge reversed |

### 2. Simple explanation

**Vertical order:** Root at column 0, row 0. Each left child shifts **column -1**; each right child **column +1**. Row increments on every downward step. Nodes sharing a column form one vertical line — sort by row (top to bottom); tie-break by value (#987).

**Boundary:** The silhouette of the tree from outside:
1. **Left edge** — top-down, always prefer **left** child (record internal nodes, skip leaves here)
2. **Leaves** — standard leaf collection, left-to-right (excluding root if alone)
3. **Right edge** — top-down preferring **right**, collected **bottom-to-top**

### 3. Visual — Column map (col, row, val) BFS

```
Tree:       3
           / \
          9   20
             /  \
            15   7

Coordinates (col, row):

  (0,0): 3
  (-1,1): 9          (1,1): 20
                     (0,2): 15    (2,2): 7

Column map:
  col -1: [9]
  col  0: [3, 15]     ← same column, sort by row
  col  1: [20]
  col  2: [7]

BFS/DFS with (col, row) tagging:

  queue: (node, col, row)
  root → (3, 0, 0)
  push left  (9, -1, 1)
  push right (20, 1, 1)
  ...

  Store in map[col][row] = val (or list for #987 tie-break)
  Output columns left-to-right (min col → max col)

  ┌────────────────────────────────────────────┐
  │  left child:  (col - 1, row + 1)           │
  │  right child: (col + 1, row + 1)           │
  │  sort by (col, row, val) for output        │
  └────────────────────────────────────────────┘
```

### 4. Visual — Boundary three-pass

```
Tree:       1
           / \
          2   3
         / \   \
        4   5   6

PASS 1 — Left edge (top→bottom, prefer left):
  Start at root.val = 1
  Go left to 2 (has children → record)
  Go left to 4 (leaf → skip in this pass)
  Result so far: [1, 2]

PASS 2 — Leaves (left-to-right inorder-style leaf scan):
  Leaves: 4, 5, 6
  Append: [1, 2, 4, 5, 6]

PASS 3 — Right edge (top→bottom prefer right, REVERSE append):
  From root.right = 3 (has child → record 3)
  Go right to 6 (leaf → skip)
  Collected [3], reversed → append 3
  But 6 already in leaves — avoid duplicate root handling

Full boundary: [1, 2, 4, 5, 6, 3]

  ┌────────────────────────────────────────────┐
  │  Left edge:   always go left if exists     │
  │  Leaves:     both-null nodes, LR order     │
  │  Right edge: always go right, reverse list │
  │  Root:       add once at start             │
  └────────────────────────────────────────────┘
```

### 5. The universal template

**Vertical order (BFS tag + sort):**
```
map col → row → values
queue (root, 0, 0)
while queue:
    pop (node, c, r)
    map[c][r].add(node.val)
    push (left, c-1, r+1), (right, c+1, r+1)
output columns in sorted col order
```

**Boundary (three-pass):**
```
res = [root.val]
addLeftBoundary(root.left)    // prefer left, skip leaves
addLeaves(root.left); addLeaves(root.right)
addRightBoundary(root.right)  // prefer right, reverse append
```

### 6. Why single-pass DFS fails

| Wrong approach | Problem |
|---|---|
| One DFS for vertical order without coordinates | Can't group by column |
| BFS level-order for vertical | Groups by row, not column |
| One traversal for boundary | Picks up internal nodes wrongly — need three phases |
| Include root twice on boundary | Root once; leaves pass skips root's duplicate |

### 7. Day 15 vs Day 9

| | **Day 9 BFS** | **Day 15 Coordinates** |
|---|---|---|
| Groups by | Depth (row) | Column |
| Queue carries | Level info | `(col, row)` pair |
| Output | Level-by-level | Column-by-column |
| Boundary | N/A | Three-pass perimeter |

### 8. Pattern signals & recognition clues

| When the problem says… | Think… |
|---|---|
| "vertical order" / "columns" | `(col, row, val)` tag + sort |
| "top view" / "bottom view" | Column extrema by row — variant |
| "boundary" / "perimeter" | Left edge + leaves + right edge reversed |
| "same column, sort by row" | `#987` tie-break on value too |

**Keywords:** `col ± 1` · `row + 1` · `multiset` · `three-pass` · `reverse right edge`

### 9. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Column drift wrong direction | Left = col-1, right = col+1 (standard convention) |
| Boundary: including leaves in edge passes | Edge passes skip leaf-only nodes |
| Boundary: right edge top-to-bottom append | Reverse before append — bottom-up on right |
| #987: ignoring value tie-break | Same col AND row → sort by val |
| Using float columns | Integer columns suffice for binary tree |

### 10. Recognition drill

Read this problem aloud:

> *"Return vertical order traversal grouped by column."*

Before coding, say:

> *"BFS/DFS tag (col, row, val). Map or sort by col then row. Left child col-1, right col+1, row always +1."*

---

*Coordinates tag position; three passes trace the silhouette. First quest: vertical order. →*
