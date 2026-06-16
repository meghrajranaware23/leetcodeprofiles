<!-- hand-authored -->
# ✅ Day 17 Checkpoint

> **Tree Views** · 2 quests completed · ⭐ 120 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Day 17 is **BFS view aggregation** — same queue as Day 3/9, different per-level or per-column record.

| When you see... | Think... | Why |
|---|---|---|
| "bottom-left" / "last row leftmost" | Level-end first node | BFS deepest wave, i=0 |
| "vertical order" (no row/value sort) | Column BFS map #314 | `(node, col)` queue |
| "vertical order" + same row value tie | **C-Rank #987** | Sort `(row, val)` |
| "right side view" | **Day 9** — last per level | Opposite of bottom-left |
| "deepest leaves sum" | **Day 22 preview** — sum last level | Level-end, aggregate all |

### 🧠 Quick Recognition Test

1. *"Leftmost node in deepest row"* → **Level-end tracking** — first dequeued each batch
2. *"Nodes grouped by vertical column, top-to-bottom"* → **Column map** — #314
3. *"Same column, sort by row then value"* → **#987** — not today's #314
4. *"Zigzag level order"* → **Day 9** — direction flip, not column view

---

## 🎯 Transfer to Unseen Problems

**Scenario 1:** *"Return the rightmost value in the bottom row."*

Which pattern? **Level-end tracking** — last dequeued (`i == sz-1`) each batch, not first.

**Scenario 2:** *"Print all nodes column by column, left columns first."*

Which pattern? **Column BFS map** — same as #314 unless problem adds row sort.

**Scenario 3:** *"Top view — one node per column (smallest row wins)."*

Which pattern? **Column tagging + row min** — extends Day 15 coordinate idea; not pure #314.

> **Answer key:** Scenarios 1–2 = Day 17 BFS views. Scenario 3 = column coords with min-row rule.

---

## ⚠ Common Mistakes

1. **DFS for bottom-left** — Preorder doesn't guarantee deepest-leftmost.
2. **Forgetting to update `res` only at level start** — Every node vs `i==0`.
3. **Column direction inverted** — Left child = col−1, right = col+1.
4. **Applying #987 sort to #314** — Read statement; #314 needs no tie-break.
5. **Unsorted column keys in output** — Use `TreeMap` or `sorted(keys)`.

---

## 🏋️ Mini Challenge

### Compare #314 vs #987 on paper

Draw a tree where two nodes share a column at different rows (e.g. root and left-right child). Write #314 output vs #987 output. When do they differ?

**Before you code:** Label columns on a 7-node tree. Circle the first node of each BFS level.

> 💡 **Hint:** #314 lists BFS order in column 0; #987 sorts by row within column 0.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Find Bottom Left Tree Value #513](https://leetcode.com/problems/find-bottom-left-tree-value/) | Medium | BFS Level-End Tracking |
| [Binary Tree Vertical Order Traversal #314](https://leetcode.com/problems/binary-tree-vertical-order-traversal/) | Medium | Column BFS |

---

*Day 17 complete! Tomorrow: merge two trees and reverse-inorder transform. →*
