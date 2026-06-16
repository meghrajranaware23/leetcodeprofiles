<!-- hand-authored -->
# ✅ Day 3 Checkpoint

> **BFS Level-Order** · 2 quests completed · ⭐ 40 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Day 3 is **BFS only** — queue levels, `len(q)` batches, no DFS descent. Practice hearing the signal:

| When you see... | Think... | Why |
|---|---|---|
| "level order" / "row by row" | BFS queue | Process by depth generation |
| "return list of lists" | BFS + level batch | `for _ in range(len(q))` |
| "average" / "sum" / "max per level" | BFS + reduce batch | Same loop, different accumulator |
| "right side view" / "leftmost" | BFS; first/last in batch | Level boundary gives answer |
| "each level" / "same depth" | ↔ Across compass | Wide before deep |
| "shortest path to leaf" (sometimes) | BFS stops at first leaf | Nearest level found first |
| "inorder" / "preorder" | **Not today** — Day 2 DFS | Named order = depth-first |
| "max depth" combine | **Not today** — Day 1 ↑ | Bottom-up ≠ level batch |

### 🧠 Quick Recognition Test

Read each mini-problem. Which Day 3 pattern fires first?

1. *"Return level order traversal grouped by row"* → **BFS batch** — `[[3],[9,20],[15,7]]`
2. *"Average of node values at each level"* → **BFS + sum/count** — same skeleton as #102
3. *"On tree [3,9,20,15,7], queue after level 0?"* → **`[9, 20]`**
4. *"Rightmost node at each level"* → **BFS** — last node in each batch

---

## 🎯 Transfer to Unseen Problems

You've traced Level Order and Average of Levels. Can you reuse the **queue batch** elsewhere?

**Scenario 1:** *"Return the bottom-most left value (last level's first node)."*

Which pattern? **BFS** — track first node in each batch; when queue empties, that first node is the answer.

**Scenario 2:** *"Find the maximum sum among all levels."*

Which pattern? **BFS + sum per batch** — keep running max of level sums. Same loop as #637 with different reducer.

**Scenario 3:** *"Return nodes in zigzag level order (alternate left-right)."*

Which pattern? **BFS batch** — same `len(q)` loop; alternate push front/back or reverse every other level.

> **Answer key:** All three start with **queue + level_size loop**. Only post-processing changes.

---

## ⚠ Common Mistakes

1. **Missing `level_size = len(q)`** — New children must not join current batch.

2. **Using DFS for level problems** — If the problem says "level" or "row," default to BFS.

3. **Flat list instead of grouped** — #102 wants 2D list; one outer append per batch.

4. **Integer division on averages** — Cast sum to double before dividing (C++/Java).

5. **Empty tree** — Return `[]`, not null crash.

---

## 🏋️ Mini Challenge

### [Binary Tree Right Side View #199](https://leetcode.com/problems/binary-tree-right-side-view/)

**[→ Try Right Side View on LeetCode](https://leetcode.com/problems/binary-tree-right-side-view/)**

Return the value of the **rightmost node at each level**.

```
Input:       1       Output: [1, 3, 4]
            / \
           2   3
            \   \
             5   4
```

### 🔍 Pattern Recognition for This Challenge

| Clue | Signal |
|---|---|
| "each level" / "right side" | BFS batch |
| "rightmost" | Last node dequeued in each `len(q)` loop |
| Not "depth" or "path" | Queue, not ↑ bubble |

**Before you code:** Trace queue levels. Which node is last in each batch?

> 💡 **Hint:** Same skeleton as #102 — append `node.val` only when `i == level_size - 1`.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Binary Tree Level Order Traversal #102](https://leetcode.com/problems/binary-tree-level-order-traversal/) | Medium | BFS level batch |
| [Average of Levels in Binary Tree #637](https://leetcode.com/problems/average-of-levels-in-binary-tree/) | Easy | BFS + sum/divide |

---

*Day 3 complete! Tomorrow: tree **properties** bubble up — balance and complete-tree math. →*
