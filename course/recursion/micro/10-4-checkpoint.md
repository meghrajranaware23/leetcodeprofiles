<!-- hand-authored -->
# ✅ Day 10 Checkpoint

> **Helper Functions** · 2 quests completed · ⭐ 65 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Day 10 is **helper design** — extra state the public API can't hold: bounds or `prev`.

| When you see... | Think... | Why |
|---|---|---|
| "validate BST" | `validate(node, lo, hi)` | Ancestor bounds, not parent only |
| "all left subtree less" | Tighten `hi` on left recurse | Open interval |
| "flatten to linked list" | Postorder rewire + `prev` | Right-left-node order |
| "preorder order" flatten | Process node after children | Reverse postorder stitch |
| "left null" on flatten | `node.left = null` each step | Linked-list shape |
| helper / wrapper split | Init `(-∞,+∞)` or `prev=null` | Public API stays clean |

### 🧠 Quick Recognition Test

1. *"Validate BST"* → **Bounded helper** — `lo < val < hi`
2. *"Flatten tree to preorder list"* → **prev postorder rewire**
3. *"Range sum in BST"* (Day 5) → **Bounded prune** — sum not validate
4. *"Invert tree"* (Day 9) → **Swap** — no lo/hi helper

---

## 🎯 Transfer to Unseen Problems

**Scenario 1:** *"Determine if array represents preorder traversal of a BST."*

Which pattern? **Bounded validation** or simulate with stack — same BST ordering rules as validate.

**Scenario 2:** *"Convert sorted linked list to balanced BST."*

Which pattern? **Helper with mid** — different helper, same design: wrapper + recursive helper with extra state.

**Scenario 3:** *"Serialize tree to string and deserialize back."*

Which pattern? **Preorder helper** with index or queue — state tracks position in string.

> **Answer key:** All three need **helpers beyond single node parameter** — bounds, mid, or cursor.

---

## ⚠ Common Mistakes

1. **BST: parent-only compare** — Use full `(lo, hi)` from ancestors.

2. **BST: `<=` on bounds** — Strict `lo < val < hi` for LC definition.

3. **Flatten: left-right-node order** — Use **right-left-node** for this prev trick.

4. **Forget `node.left = null`** — Flatten requires no left children.

5. **No wrapper init** — Set `prev = null` or infinite bounds before dfs.

---

## 🏋️ Mini Challenge

### [Convert Sorted List to Binary Search Tree #109](https://leetcode.com/problems/convert-sorted-list-to-binary-search-tree/)

**[→ Try Convert Sorted List to BST on LeetCode](https://leetcode.com/problems/convert-sorted-list-to-binary-search-tree/)**

Given head of sorted linked list, construct balanced BST.

```
Input:  head = [-10, -3, 0, 5, 9]
Output: [0, -3, 9, -10, null, 5]
```

### 🔍 Pattern Recognition for This Challenge

| Clue | Signal |
|---|---|
| "sorted" + "BST" | Mid-element root — helper with range or list cursor |
| "balanced" | Recurse on left/right halves |
| helper design | Wrapper + helper carries list index/head |

**Before you code:** Say *"helper with bounds or advancing list pointer."* Contrast with Validate BST — build vs validate.

> 💡 **Hint:** Find mid with slow/fast, or pass lo/hi indices if converted to array — helper carries construction state.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Validate Binary Search Tree #98](https://leetcode.com/problems/validate-binary-search-tree/) | Medium | Range-bounded helper |
| [Flatten Binary Tree #114](https://leetcode.com/problems/flatten-binary-tree-to-linked-list/) | Medium | Postorder rewiring |
| [Convert Sorted List to BST #109](https://leetcode.com/problems/convert-sorted-list-to-binary-search-tree/) | Medium | Helper construction (stretch) |

---

*Day 10 complete! D-Rank tree and helper patterns locked. Tomorrow: backtracking deep dive. →*
