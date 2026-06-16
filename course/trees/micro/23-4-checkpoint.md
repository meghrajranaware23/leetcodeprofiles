<!-- hand-authored -->
# ✅ Day 23 Checkpoint

> **BST Augmentation** · 2 quests completed · ⭐ 110 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Day 23 extends **Day 12 inorder** into streaming and navigation. Practice hearing the signal:

| When you see... | Think... | Why |
|---|---|---|
| "BST iterator" / "next() smallest" | Lazy inorder stack | C-Rank #173 / Day 12 iterative |
| "closest value to target" | Walk path + update best | O(h), not full inorder |
| "inorder successor/predecessor" | Case split or unified walk | O(h) ancestor or subtree min |
| "kth smallest" (Day 12) | Inorder early-stop | Same stack as iterator |
| "average O(1) next()" | Amortized push/pop | Each node once |

### 🧠 Quick Recognition Test

Read each mini-problem. Which Day 23 pattern fires first?

1. *"Design BSTIterator with next() and hasNext()"* → **Lazy inorder stack** (pushLeft spine)
2. *"Find closest BST value to 3.7"* → **Path walk + running closest**
3. *"Inorder successor of node p"* → **Case A: leftmost-right; Case B: search-path res**
4. *"Serialize all values sorted"* → **Full inorder** — different goal, same order

---

## 🎯 Transfer to Unseen Problems

You've done Closest and Successor. Can you extend **BST ordering walks**?

**Scenario 1:** *"Return the k closest values to target in a BST."*

Which pattern? **Closest walk + stack** — find closest, then iterate predecessor/successor k-1 times. Extends today's closest quest.

**Scenario 2:** *"Implement a BST iterator with O(1) amortized next and O(h) space."*

Which pattern? **C-Rank #173** — constructor pushLeft(root); next pop + pushLeft(right).

**Scenario 3:** *"Find inorder predecessor of p in BST."*

Which pattern? **Mirror successor** — if left child exists, rightmost of left; else walk recording when `p.val > root.val`.

> **Answer key:** Day 23 = **inorder machinery without full traversal** — stream, closest, successor all O(h).

---

## ⚠ Common Mistakes

1. **Flattening BST in iterator constructor** — O(n) space; use stack of left spines.

2. **Closest: stopping when past target** — must walk to null; update best at every node.

3. **Successor: only Case A (right subtree)** — fails when `p` is rightmost leaf in subtree.

4. **Forgetting pushLeft after pop in iterator** — skips right subtree values.

5. **Confusing successor with delete's copied value** — same node, different operation context.

---

## 🏋️ Mini Challenge

### [Binary Search Tree Iterator #173](https://leetcode.com/problems/binary-search-tree-iterator/)

**[→ Try BST Iterator on LeetCode](https://leetcode.com/problems/binary-search-tree-iterator/)**

Design an iterator over BST with `next()` returning next smallest and `hasNext()`.

**Before you code:** Say *"Day 12 iterative inorder without k-stop."* Trace pushLeft on `[7,3,15,null,null,9,20]`.

> 💡 **Hint:** C-Rank test problem — same pattern as today's concept page.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Closest Binary Search Tree Value #270](https://leetcode.com/problems/closest-binary-search-tree-value/) | Easy | BST closest walk |
| [Inorder Successor in BST #285](https://leetcode.com/problems/inorder-successor-in-bst/) | Medium | Successor case split |

---

*Day 23 complete! Tomorrow: advanced trie — wildcards and prefix replace. →*
