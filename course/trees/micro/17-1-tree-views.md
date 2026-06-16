<!-- hand-authored -->
# 📝 Tree Views and Projections

> **Day 17** · Tree Views · ★★★★☆ · 25 XP · 15 min read

---

Day 9 and Day 15 taught BFS **waves** and **column tagging**. Today you reuse the same queue engine but change **what you record at each level or column** — first node per level, or nodes grouped by vertical index. No new traversal machinery; new **aggregation rules**.

> **Contrast (Day 15):** C-Rank #987 tags `(col, row, val)` and sorts by row then value. Today's #314 is the **simpler column variant** — BFS order within each column is enough.

---

## Part 1 — Learn the Pattern

### 1. What is the pattern?

**BFS with level-end or column metadata** — two views on the same queue:

| View | What you track | Output |
|---|---|---|
| **Level-end first node** | First dequeued node each level | Bottom-left value (#513) |
| **Column BFS map** | `col` index: left −1, right +1 | Vertical columns left-to-right (#314) |

Both use: outer `while q`, inner `for sz = q.size()` — or a flat BFS with `(node, col)` pairs.

### 2. Simple explanation

**Bottom-left:** BFS naturally visits shallow before deep. At every level, the **first** node out of the queue is the leftmost at that depth. Keep updating a variable whenever a new level starts — the last update wins (deepest level).

**Vertical order (#314):** Imagine vertical lines through the tree. Root sits at column 0. Each left step moves column −1; each right step moves column +1. BFS fills a `map[col] → list of values` in visit order.

### 3. Visual — Level-end first-node tracking (#513)

```
        1
       / \
      2   3
     /   / \
    4   5   6

BFS level batches:

Level 0:  process [1]     → first = 1   res = 1
Level 1:  process [2, 3]  → first = 2   res = 2
Level 2:  process [4,5,6] → first = 4   res = 4  ← answer

Inner loop: when i == 0 (or overwrite res at level start),
            capture leftmost node of this wave.
Last level's first node = bottom-left value.
```

### 4. Visual — Column BFS map (#314)

```
        3
       / \
      9   20
         /  \
        15   7

Columns (vertical lines):

  col -1   col 0   col 1   col 2
    |        |       |       |
    9        3      20       7
             15

BFS queue carries (node, col):
  (3,0) → (9,-1) (20,1) → (15,0) (7,2)

colMap:
  -1 → [9]
   0 → [3, 15]    ← BFS order within column
   1 → [20]
   2 → [7]

Output: [[9], [3,15], [20], [7]]
```

No row sort needed for #314 — unlike #987 where same `(col, row)` ties break by value.

### 5. The universal template

**Bottom-left (level-end tracking):**
```
res = root.val
while q not empty:
    for i in 0 .. q.size()-1:
        node = q.pop()
        if i == 0: res = node.val      // first of level
        enqueue children
return res
```

**Column BFS map:**
```
colMap = {}
q.push({root, 0})
while q not empty:
    (node, col) = q.pop()
    colMap[col].append(node.val)
    if node.left:  q.push({node.left,  col-1})
    if node.right: q.push({node.right, col+1})
return columns sorted by col key
```

| Problem | Pattern | Key state |
|---|---|---|
| Bottom Left #513 | Level-end first node | `res` updated each level |
| Vertical Order #314 | Column map + BFS | `(node, col)` in queue |

### 6. Why brute force fails

| Brute force | Problem |
|---|---|
| DFS for bottom-left | Visits depth-last node left-to-right in preorder — not deepest-left |
| Level-order list, pick last level's first | Works but redundant — track `res` during BFS |
| Vertical: inorder or preorder only | Doesn't group by column |
| Vertical: forget sorted column keys | Output order wrong |
| Using #987 row+value sort on #314 | Over-engineering — #314 needs no tie-break |

### 7. Bridge — C-Rank Day 15 #987 vs today #314

If you completed **C-Rank Day 15** ([Vertical Order #987](https://leetcode.com/problems/vertical-order-traversal-of-a-binary-tree/)), you tagged `(col, row, val)` and sorted by `(row, val)`.

| C-Rank #987 | B-Rank #314 (today) |
|---|---|
| Sort by row, then value within column | BFS arrival order within column |
| Hard — tie-break required | Medium — simpler aggregation |
| Same column tagging | Same `col-1 / col+1` rule |

**One coordinate system, two strictness levels.** #314 is the training wheel; #987 adds row ordering when nodes share a column at different depths.

### 8. Pattern signals & recognition clues

| When the problem says… | Think… |
|---|---|
| "bottom-left" / "last row leftmost" | BFS level-end, first node per wave |
| "vertical order" (no row tie-break) | Column map + BFS |
| "deepest level" + single value | Level-end tracking |
| "group by column" | `(node, col)` queue |
| "right side view" | **Day 9** — last node per level, not first |

**Keywords:** `level-end` · `first of level` · `col map` · `col-1 left` · `sorted keys`

### 9. Common beginner mistakes

| Mistake | Fix |
|---|---|
| DFS for #513 | BFS guarantees level order |
| Updating `res` on every node, not level start | Only first dequeued per inner loop |
| Column: right = col−1 | Standard: left = col−1, right = col+1 |
| Returning unsorted column keys | `TreeMap` or `sorted(col_map.keys())` |
| Applying #987 sort to #314 | Read problem — #314 has no value tie-break |

### 10. Recognition drill

Read this problem aloud:

> *"Find the leftmost value in the last row of a binary tree."*

Before coding, say:

> *"BFS level batches. First node each level → res. Last batch's first = bottom-left. Not DFS."*

---

*Same BFS engine, new view rules. First quest: level-end tracking. →*
