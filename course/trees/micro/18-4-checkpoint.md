<!-- hand-authored -->
# ✅ Day 18 Checkpoint

> **Tree Manipulation** · 2 quests completed · ⭐ 110 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Day 18 is **parallel construction** and **BST reverse walks**.

| When you see... | Think... | Why |
|---|---|---|
| "merge two trees" / two roots | Parallel merge `(t1,t2)` | Null donates other subtree |
| "sum overlapping nodes" | `t1.val += t2.val` in-place | #617 |
| "BST" + "greater than" / suffix sum | Reverse inorder | Right → node → left |
| "same tree?" / compare two | **Day 5** parallel compare | Not merge |
| "construct from traversals" | **Day 8** divide & conquer | Different split logic |

### 🧠 Quick Recognition Test

1. *"Add two binary trees node by node"* → **Parallel merge**
2. *"Every node += sum of greater BST keys"* → **Reverse inorder + total**
3. *"Are two trees identical?"* → **Day 5** — boolean compare
4. *"Merge k sorted lists"* → Not tree parallel — different domain

---

## 🎯 Transfer to Unseen Problems

**Scenario 1:** *"Overlay tree A on B; where B missing, keep A unchanged."*

Which pattern? **Parallel merge** — identical skeleton to #617.

**Scenario 2:** *"Replace each BST node with sum of all nodes ≥ it."*

Which pattern? **Reverse inorder** — same as Greater Tree.

**Scenario 3:** *"Add a constant to every node in subtree."*

Which pattern? **Top-down DFS** — pass delta down, not reverse inorder.

> **Answer key:** Scenarios 1–2 = Day 18. Scenario 3 = simple propagation.

---

## ⚠ Common Mistakes

1. **Merge: not returning other tree on null** — Crashes or drops branches.
2. **Merge: always allocating new nodes** — Reuse t1 when allowed.
3. **Greater Tree: normal inorder** — Must visit right subtree first.
4. **Greater Tree: total passed by value** — Use instance/ref variable.
5. **Confusing merge with symmetric check** — Construct vs compare.

---

## 🏋️ Mini Challenge

Draw two misaligned trees (different depths). Trace merge pairs by hand. Then draw a 4-node BST and list reverse inorder visit order with running total.

**Before you code anything new:** Say which pattern each scenario uses.

> 💡 **Hint:** Null in merge = "copy this subtree pointer."

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Merge Two Binary Trees #617](https://leetcode.com/problems/merge-two-binary-trees/) | Easy | Parallel Construction |
| [Convert BST to Greater Tree #538](https://leetcode.com/problems/convert-bst-to-greater-tree/) | Medium | Reverse Inorder |

---

*Day 18 complete! Tomorrow: tries and N-ary trees. →*
