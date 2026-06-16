<!-- hand-authored -->
# ✅ Day 16 Checkpoint

> **Serialization** · 2 quests completed · ⭐ 75 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Day 16 is **tree ↔ string** — shape encoding and BST decode.

| When you see... | Think... | Why |
|---|---|---|
| "serialize/deserialize binary tree" | Preorder + `#` | General tree needs null markers |
| "construct BST from preorder" | Upper-bound recursion | No inorder — bound replaces split |
| "codec" design | Paired encode/decode | Same traversal both ways |
| "construct from preorder + inorder" | **Day 8** | Two arrays — not Day 16 |
| "validate BST" | **Day 11** range descent | Check vs build |

### 🧠 Quick Recognition Test

1. *"Serialize null binary tree"* → **"#"** or empty — decode returns null
2. *"BST preorder [5,2,6] — build"* → **Upper bound** — 2<5 left, 6<∞ right of 5
3. *"String 1,2,#,#,#,3,#,#"* → **Decode preorder** — node 1, left 2, right 3
4. *"Clone tree with random pointers"* → **Not Day 16** — hash map clone |

---

## 🎯 Transfer to Unseen Problems

**Scenario 1:** *"Serialize BST without null markers (full tree)."*

Which pattern? **Preorder alone suffices** — decode with upper-bound like #1008.

**Scenario 2:** *"Find duplicate subtrees — hash subtree serializations."*

Which pattern? **Same `#` preorder** on each node as subproblem key.

**Scenario 3:** *"Deserialize JSON nested list tree representation."*

Which pattern? **Different format** — recursive on list structure, not comma `#`.

> **Answer key:** Scenarios 1–2 = Day 16 encoding family.

---

## ⚠ Common Mistakes

1. **General serialize without `#`** — Ambiguous leaf vs missing child.
2. **Deserialize: right before left finished** — Left subtree consumes tokens first.
3. **BST build: same bound both sides** — Left capped at `node.val`.
4. **#1008 with inorder split** — Overkill — upper-bound is O(n).
5. **Token split on multi-digit negatives** — Use proper split/queue.

---

## 🏋️ Mini Challenge

### Encode then decode by hand

Draw a 4-node tree. Write preorder-`#` string. Decode token-by-token without code. Then erase `#` and ask: would BST upper-bound still work on same values?

**Before coding:** If tree isn't BST, why does removing `#` break decode?

> 💡 **Hint:** Non-BST preorder without shape markers is ambiguous — multiple trees share same value preorder.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Serialize and Deserialize Binary Tree #297](https://leetcode.com/problems/serialize-and-deserialize-binary-tree/) | Hard | Preorder with Null Markers |
| [Construct Binary Search Tree from Preorder Traversal #1008](https://leetcode.com/problems/construct-binary-search-tree-from-preorder-traversal/) | Medium | BST Construction |

---

*Day 16 complete! C-Rank test next — iterator, distance K, recover BST. →*
