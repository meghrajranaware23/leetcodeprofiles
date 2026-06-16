<!-- hand-authored -->
# ✅ Day 11 Checkpoint

> **BST Fundamentals** · 2 quests completed · ⭐ 60 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Day 11 is **BST ordering** — the tree is a sorted structure. Prune, don't scan.

| When you see... | Think... | Why |
|---|---|---|
| "search in BST" / "find in BST" | Left/right walk | One branch per level, O(h) |
| "validate BST" | Range `(lo, hi)` descent | Ancestor bounds, not parent-only |
| "inorder of BST" | Sorted sequence | Preview for Day 12 kth-smallest |
| "general binary tree search" | Full DFS O(n) | No ordering — not Day 11 |
| "node in range (lo, hi)" on BST | Walk toward boundaries | Same compare logic as search |

### 🧠 Quick Recognition Test

1. *"Search for value 7 in a BST"* → **Left/right walk** — compare, prune one side
2. *"Is this tree a valid BST?"* → **Range descent** — `dfs(node, lo, hi)`
3. *"Find maximum depth of binary tree"* → **Not Day 11** — general tree, bottom-up
4. *"Node 4 in right subtree of 5 but 4 < 5 — valid?"* → **Invalid** — range check catches it

---

## 🎯 Transfer to Unseen Problems

**Scenario 1:** *"Insert a value into a BST."*

Which pattern? **Search walk to null.** Same left/right decisions as #700; attach new leaf where walk ends.

**Scenario 2:** *"Find the closest value to target in a BST."*

Which pattern? **Walk with best-so-far.** At each node update closest; go toward the side that might improve.

**Scenario 3:** *"Validate BST by checking inorder is sorted."*

Which pattern? **Alternative to range descent** — works with strict `<`; watch duplicates and INT boundary values. Range descent is safer in interviews.

> **Answer key:** Scenarios 1–2 = left/right walk. Scenario 3 = equivalent property, different implementation.

---

## ⚠ Common Mistakes

1. **Parent-only validation** — Right child must exceed all ancestors on path, not just parent.
2. **Closed intervals at bounds** — BST needs strict `<`; use `long` or infinity endpoints.
3. **Full traversal for BST search** — O(n) when O(h) suffices.
4. **Visiting both subtrees in search** — Compare once, pick one direction.
5. **Forgetting Recursion pack overlap** — Validate BST #98 is the same pattern if you did both tracks.

---

## 🏋️ Mini Challenge

### [Insert into a Binary Search Tree #701](https://leetcode.com/problems/insert-into-a-binary-search-tree/)

**[→ Try Insert into a BST on LeetCode](https://leetcode.com/problems/insert-into-a-binary-search-tree/)**

Walk until null, attach — search pattern with a construction step at the end.

**Before you code:** Trace inserting 5 into a 3-node BST. Where does the walk stop?

> 💡 **Hint:** Same loop as search; when `node` becomes null, parent link is your attach point.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Validate Binary Search Tree #98](https://leetcode.com/problems/validate-binary-search-tree/) | Medium | BST Range Validation |
| [Search in a Binary Search Tree #700](https://leetcode.com/problems/search-in-a-binary-search-tree/) | Easy | BST Binary Search |

---

*Day 11 complete! Tomorrow: modify the BST — kth smallest and delete. →*
