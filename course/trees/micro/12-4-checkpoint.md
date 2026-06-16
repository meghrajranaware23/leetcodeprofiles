<!-- hand-authored -->
# ✅ Day 12 Checkpoint

> **BST Operations** · 2 quests completed · ⭐ 75 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Day 12 is **BST modification** — inorder rank and structural delete.

| When you see... | Think... | Why |
|---|---|---|
| "kth smallest in BST" | Inorder early-stop | Sorted visit order = rank |
| "delete node in BST" | 0/1/2 child cases | Search + rewire |
| "BST iterator" / "next smallest" | Lazy inorder stack | C-Rank test preview |
| "inorder successor" | Leftmost of right subtree | Delete Case 2 helper |
| "validate / search BST" | **Day 11** — read-only | No mutation |

### 🧠 Quick Recognition Test

1. *"Find 4th smallest in BST"* → **Inorder with k counter** — stop at k=0
2. *"Remove node with one right child"* → **Case 1** — return right child to parent
3. *"Remove node with two children"* → **Case 2** — successor value + delete successor
4. *"Search for value in BST"* → **Day 11** — left/right walk, no inorder needed

---

## 🎯 Transfer to Unseen Problems

**Scenario 1:** *"Trim BST to keep only values in [low, high]."*

Which pattern? **Delete variant.** Nodes below `low` → go right; above `high` → go left; in range → trim both subtrees recursively.

**Scenario 2:** *"Implement BSTIterator with O(h) space and O(1) amortized next()."*

Which pattern? **Lazy inorder** — stack holds left spine; pop processes; push right's left spine.

**Scenario 3:** *"Find kth largest in BST."*

Which pattern? **Reverse inorder** — right, node, left; same early-stop with k.

> **Answer key:** All three extend Day 12 inorder/delete machinery.

---

## ⚠ Common Mistakes

1. **Full inorder array for kth** — Early stop when k hits 0.
2. **Swapping nodes in Case 2** — Copy value only; delete successor position.
3. **Not capturing delete return** — `root.left = deleteNode(root.left, key)`.
4. **k off-by-one** — Decrement **after** visiting node (1-indexed k).
5. **Using predecessor inconsistently** — Successor (leftmost-right) is standard; stick to one.

---

## 🏋️ Mini Challenge

### [Binary Search Tree Iterator #173](https://leetcode.com/problems/binary-search-tree-iterator/)

**[→ Try BST Iterator on LeetCode](https://leetcode.com/problems/binary-search-tree-iterator/)**

Lazy inorder — appears again in C-Rank test. `next()` = one inorder step.

**Before you code:** Trace `next()` three times on a 5-node BST. What's on the stack after each call?

> 💡 **Hint:** Constructor pushes left spine from root. `next()` pops, then pushes left spine of `node.right`.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Kth Smallest Element in a BST #230](https://leetcode.com/problems/kth-smallest-element-in-a-bst/) | Medium | Inorder Early Termination |
| [Delete Node in a BST #450](https://leetcode.com/problems/delete-node-in-a-bst/) | Medium | BST Delete Cases |

---

*Day 12 complete! Tomorrow: lowest common ancestor — split detection and BST shortcut. →*
