<!-- hand-authored -->
# ✅ Day 26 Checkpoint

> **Morris Traversal** · 2 quests completed · ⭐ 100 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Day 26 pushes **inorder** to space-optimal and structural extremes. Practice hearing the signal:

| When you see... | Think... | Why |
|---|---|---|
| "O(1) space inorder" | Morris thread create/visit/remove | No stack |
| "recover BST" / "two swapped" | Inorder dip: first=prev | C-Rank #99 + Morris option |
| "sorted list to balanced BST" | Slow/fast bisect on range | #109 |
| "inorder successor" (Day 23) | Stack or Morris | Same sorted walk |
| "threaded tree" | Temporary right links | Must remove after visit |

### 🧠 Quick Recognition Test

Read each mini-problem. Which Day 26 pattern fires first?

1. *"Recover BST after two nodes swapped"* → **Inorder anomaly detection**
2. *"Convert sorted linked list to height-balanced BST"* → **List bisect build**
3. *"Inorder traversal O(1) space"* → **Morris traversal**
4. *"Kth smallest BST"* → **Day 12 stack** — Morris alternative for O(1)

---

## 🎯 Transfer to Unseen Problems

You've done Recover BST and Sorted List to BST. Can you extend **space-optimal inorder**?

**Scenario 1:** *"Flatten BST to sorted doubly linked list in-place."*

Which pattern? **Morris or reverse-inorder** — thread or swap child pointers during walk.

**Scenario 2:** *"Find kth smallest with O(1) space follow-up."*

Which pattern? **Morris inorder with counter** — visit count instead of full collect.

**Scenario 3:** *"Convert sorted array to BST (#108)."*

Which pattern? **Mid index bisect** — array mid instead of slow/fast.

> **Answer key:** Day 26 = **inorder is the spine** — violations, construction, and O(1) threading all walk it.

---

## ⚠ Common Mistakes

1. **Morris: not removing thread** — corrupts tree; must set predecessor.right=null.

2. **Recover: first = node on dip** — should be prev on first violation.

3. **List bisect: inclusive tail** — use half-open `[head, tail)` — head==tail is empty.

4. **Slow/fast stopping too early/late** — stop when `fast.next == tail`.

5. **Rebuild tree on recover** — swap two values only.

---

## 🏋️ Mini Challenge

### [Recover Binary Search Tree #99](https://leetcode.com/problems/recover-binary-search-tree/) — Morris follow-up

After solving with recursive inorder, attempt **Morris O(1) space** from today's concept page.

**Before you code:** Trace create → visit → remove on a 3-node tree.

> 💡 **Hint:** Same dip detection during Morris visit steps.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Recover Binary Search Tree #99](https://leetcode.com/problems/recover-binary-search-tree/) | Medium | Inorder Anomaly Detection |
| [Convert Sorted List to Binary Search Tree #109](https://leetcode.com/problems/convert-sorted-list-to-binary-search-tree/) | Medium | Balanced BST Construction |

---

*Day 26 complete! Tomorrow: tree-graph hybrid — parent maps and path strings. →*
