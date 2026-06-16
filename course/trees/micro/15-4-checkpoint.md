<!-- hand-authored -->
# ✅ Day 15 Checkpoint

> **Tree Coordinates** · 2 quests completed · ⭐ 75 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Day 15 is **geometric placement** — columns and perimeter.

| When you see... | Think... | Why |
|---|---|---|
| "vertical order" / "by column" | `(col, row, val)` tag + sort | Not level BFS |
| "boundary" / "perimeter" | Three-pass: left, leaves, right↓ | Disjoint segments |
| "top view" / "bottom view" | Column + row extrema | Variant of tagging |
| "level order traversal" | **Day 9 BFS** | Groups by row, not col |
| "right side view" | First node per level | Different view rule |

### 🧠 Quick Recognition Test

1. *"Vertical order traversal with value tie-break"* → **Column map** — sort (col, row, val)
2. *"Anti-clockwise boundary"* → **Three-pass** — edges skip leaves
3. *"Zigzag level order"* → **Day 9** — not coordinate columns
4. *"Nodes at depth k"* → **BFS by depth** — not Day 15

---

## 🎯 Transfer to Unseen Problems

**Scenario 1:** *"Top view of binary tree (first node per column)."*

Which pattern? **Column tagging** — track min row seen per column; BFS/DFS with `(col, row)`.

**Scenario 2:** *"Print corners of tree (root, leftmost, rightmost, leaves)."*

Which pattern? **Boundary variant** — subset of three-pass logic.

**Scenario 3:** *"Maximum width of tree (count nodes at widest level)."*

Which pattern? **Day 9 BFS** — level width, not column width.

> **Answer key:** Scenarios 1–2 = Day 15 family. Scenario 3 = BFS levels.

---

## ⚠ Common Mistakes

1. **Vertical: using level-order output** — Must group by column index.
2. **Vertical: forgetting value sort on same (col, row)** — #987 requires it.
3. **Boundary: leaves in edge passes** — Edges require `has child` guard.
4. **Boundary: right edge not reversed** — Perimeter goes up on right side.
5. **Column direction inverted** — Standard: left = col-1, right = col+1.

---

## 🏋️ Mini Challenge

### Draw coordinates on paper

Sketch a 7-node tree. Label all `(col, row)`. Which nodes share a column? Which appear in boundary pass 2 but not pass 1?

**Before coding anything:** Answer without looking at solutions — validates both patterns visually.

> 💡 **Hint:** Root `(0,0)`. Left-right child of left child shares column with root.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Vertical Order Traversal of a Binary Tree #987](https://leetcode.com/problems/vertical-order-traversal-of-a-binary-tree/) | Hard | Column Coordinate BFS |
| [Boundary of Binary Tree #545](https://leetcode.com/problems/boundary-of-binary-tree/) | Medium | Boundary DFS |

---

*Day 15 complete! Tomorrow: serialize trees to strings and rebuild BST from preorder. →*
