<!-- hand-authored -->
# ✅ Day 28 Checkpoint

> **Tree Synthesis I** · 2 quests completed · ⭐ 150 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Day 28 fused **top-down running state** (Day 6) with **bottom-up validity tuples** (Day 11 + Day 20). Practice hearing the signal:

| When you see... | Think... | Why |
|---|---|---|
| "consecutive" / "parent + 1" | ↓ Running `(parentVal, len)` | Streak depends on parent value |
| "longest sequence" in tree | Global + top-down state | Best may start mid-tree |
| "valid BST subtree" + optimize | ↑ Tuple `(isBST, min, max, sum)` | Validate and aggregate in one pass |
| "lmax < node < rmin" | Bottom-up BST combine | Day 11 invariant via child bounds |
| "reset streak" | `len = 1` on break | Non-consecutive edge starts fresh |
| "poison tuple" on invalid | `(false, 0, 0, 0)` | Parent must not trust bad subtree |

### 🧠 Quick Recognition Test

Read each mini-problem. Which Day 28 pattern fires first?

1. *"Longest path of values increasing by 1 along parent-child edges"* → **Running length top-down** — `(parentVal, len)`, global `ans`
2. *"Maximum sum among all BST subtrees"* → **Validity tuple** — 4-field combine, update `ans` on valid
3. *"Validate BST only (no sum)"* → **Day 11 range descent** OR tuple without sum field
4. *"Largest BST by node count"* → **Same tuple** — swap `sum` for `size`

---

## 🎯 Transfer to Unseen Problems

**Scenario 1:** *"Count nodes in the largest BST subtree."*

Which pattern? **Validity tuple** — same as #1373 but track `count` instead of `sum` in the 4th field. Update global max count on valid combine.

**Scenario 2:** *"Longest consecutive decreasing sequence (each child is parent − 1)."*

Which pattern? **Running length top-down** — change check to `node.val == parentVal - 1`. Same skeleton.

**Scenario 3:** *"Is the entire tree a BST with total sum ≥ k?"*

Which pattern? **Tuple at root** — if root returns `isBST=true`, compare `sum >= k`. Single pass.

> **Answer key:** Ask *does the child need parent context?* → top-down. *Does parent combine child reports?* → bottom-up tuple.

---

## ⚠ Common Mistakes

1. **Consecutive: bottom-up max of children** — Parent value context is required; go top-down.

2. **Consecutive: forget seed `root.val - 1`** — Root must start at length 1, not 0.

3. **BST tuple: local child compare only** — Need `lmax` and `rmin` from entire subtrees.

4. **BST tuple: return sum when invalid** — Always poison with `(false, 0, 0, 0)`.

5. **Mixing patterns on same problem** — Consecutive = ↓ only. BST sum = ↑ only. Don't hybridize blindly.

---

## 🏋️ Mini Challenge

### [Largest BST Subtree #333](https://leetcode.com/problems/largest-bst-subtree/)

**[→ Try Largest BST Subtree on LeetCode](https://leetcode.com/problems/largest-bst-subtree/)**

Return the **number of nodes** in the largest BST subtree — same tuple skeleton as today's #1373 quest.

**Before you code:** Write the null tuple. Write the valid combine. Swap `sum` for `count = 1 + lcount + rcount`.

> 💡 **Hint:** If you've solved #1373 today, this is a 5-minute retarget of the 4th tuple field.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Binary Tree Longest Consecutive Sequence #298](https://leetcode.com/problems/binary-tree-longest-consecutive-sequence/) | Medium | DFS + Running State |
| [Maximum Sum BST in Binary Tree #1373](https://leetcode.com/problems/maximum-sum-bst-in-binary-tree/) | Hard | Tree DP + BST Validation |

---

*Day 28 complete! Tomorrow: trie wildcard design + quad-tree construction. →*
