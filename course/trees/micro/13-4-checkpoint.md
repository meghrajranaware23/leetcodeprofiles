<!-- hand-authored -->
# ✅ Day 13 Checkpoint

> **Lowest Common Ancestor** · 2 quests completed · ⭐ 65 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Day 13 is **LCA** — where two node paths diverge.

| When you see... | Think... | Why |
|---|---|---|
| "LCA" + general binary tree | Split detection post-order | `l && r` → return root |
| "LCA" + BST | Range/straddle walk | Both same side → continue |
| "both p and q in tree" | Anchor return when node==p or q | Bubble partner from subtree |
| "parent pointers" variant | Two-pointer ascend | Different pattern — not core Day 13 |
| "search one value in BST" | **Day 11** — single target | Not LCA |

### 🧠 Quick Recognition Test

1. *"LCA of two nodes in binary tree"* → **Split detection** — post-order, both children non-null
2. *"LCA in BST"* → **Straddle walk** — O(h), stop when sides differ
3. *"LCA when one node is ancestor of other"* → **Anchor case** — ancestor returned when hit
4. *"Are two nodes cousins?"* → **D-Rank** — same depth, different parent (LCA at depth 2)

---

## 🎯 Transfer to Unseen Problems

**Scenario 1:** *"LCA with parent pointers only (no root)."*

Which pattern? **Ascend from p with depth equalization** — not today's tree dfs, but same LCA definition.

**Scenario 2:** *"Find LCA of deepest leaves (Smallest Subtree with All Deepest)."*

Which pattern? **Bubble-up variant** — return depth + candidate node; merge at parent like split detection.

**Scenario 3:** *"LCA in BST where nodes are referenced by value not pointer."*

Which pattern? **Same straddle walk** — compare values; find nodes first if needed.

> **Answer key:** Scenario 2 closest to Day 13 bubble-up. Scenario 1 is parent-pointer technique.

---

## ⚠ Common Mistakes

1. **BST walk on general tree** — Ordering required for straddle shortcut.
2. **Returning parent on single non-null child** — Bubble the child result; LCA may be deeper.
3. **Missing anchor case** — When node==p or q, return immediately.
4. **Path arrays as first choice** — Works but split detection is cleaner one-pass.
5. **Confusing "split" with "root"** — LCA isn't always root — only when paths diverge there.

---

## 🏋️ Mini Challenge

### [Smallest Subtree with All the Deepest Nodes #865](https://leetcode.com/problems/smallest-subtree-with-all-the-deepest-nodes/)

**[→ Try on LeetCode](https://leetcode.com/problems/smallest-subtree-with-all-the-deepest-nodes/)**

Bubble-up variant — both subtrees report depth; parent merges like LCA split logic.

**Before you code:** Trace a tree with two deepest leaves in different subtrees. Where does merge happen?

> 💡 **Hint:** Return `(depth, node)` pairs; if left depth == right depth, current node is answer candidate.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Lowest Common Ancestor of a Binary Tree #236](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/) | Medium | LCA Split Detection |
| [Lowest Common Ancestor of a Binary Search Tree #235](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/) | Medium | BST LCA Walk |

---

*Day 13 complete! Tomorrow: path problems — prefix sums and univalue chains. →*
