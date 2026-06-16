<!-- hand-authored -->
# ✅ Day 9 Checkpoint

> **Level-Order Patterns** · 2 quests completed · ⭐ 50 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Day 9 varies **what you record per BFS level** — same Day 3 queue skeleton, new inner-loop rules.

| When you see... | Think... | Why |
|---|---|---|
| "right side view" | BFS last per level | `i == sz - 1` |
| "zigzag" / "spiral" level order | Deque direction flip | Pop front vs back |
| "each level" / "level order" | Day 3 BFS + level-size loop | Horizontal waves |
| "root-to-leaf path" | **DFS Day 6** — not BFS | Vertical threads |
| "maximum width of tree" | BFS + index tracking | D-Rank test #662 |

### 🧠 Quick Recognition Test

1. *"Nodes visible from right side"* → **BFS last per level**
2. *"Alternate left-to-right and right-to-left per level"* → **Deque zigzag**
3. *"Average of each level"* → **Day 3 BFS** — sum/count per wave
4. *"Path sum root to leaf"* → **Day 6 DFS** — not level-order

---

## 🎯 Transfer to Unseen Problems

**Scenario 1:** *"Return the left side view of a binary tree."*

Which pattern? **BFS first per level** — `i == 0` instead of `i == sz-1`.

**Scenario 2:** *"Find the smallest value at each depth."*

Which pattern? **BFS level loop** — track min (or first/last) per wave.

**Scenario 3:** *"Connect each node to its right neighbor on the same level (perfect tree)."*

Which pattern? **BFS level linking** — D-Rank test #116. Use existing `next` pointers as O(1) space bridge.

> **Answer key:** All three = Day 3 BFS skeleton with different per-level capture.

---

## ⚠ Common Mistakes

1. **No level-size inner loop** — Can't identify level boundaries.
2. **Recording first node for right view** — Need last (`i == sz-1`).
3. **Zigzag: wrong push order on reverse level** — Push right before left to front.
4. **Enqueuing null nodes** — Only push existing children.
5. **Using DFS when problem says "each level"** — BFS is the natural fit.

---

## 🏋️ Mini Challenge

### [Binary Tree Level Order Traversal II #107](https://leetcode.com/problems/binary-tree-level-order-traversal-ii/)

**[→ Try Level Order II on LeetCode](https://leetcode.com/problems/binary-tree-level-order-traversal-ii/)**

Return level order bottom-up — standard BFS, then reverse result (or prepend each level).

**Before you code:** Same Day 3 loop — one line change at the end.

> 💡 **Hint:** BFS collect levels → `reverse(res)` or `insert(0, level)`.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Binary Tree Right Side View #199](https://leetcode.com/problems/binary-tree-right-side-view/) | Medium | BFS Last Per Level |
| [Binary Tree Zigzag Level Order Traversal #103](https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/) | Medium | BFS Direction Alternation |

---

*Day 9 complete! Tomorrow: explicit stacks replace the call frame. →*
