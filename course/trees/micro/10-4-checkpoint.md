<!-- hand-authored -->
# ✅ Day 10 Checkpoint

> **Recursion vs Iteration** · 2 quests completed · ⭐ 55 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Day 10 is **simulate the call stack** — same visit orders, explicit control.

| When you see... | Think... | Why |
|---|---|---|
| "iterative postorder" | Stack + `last` pointer | Defer node until children done |
| "without recursion" | Explicit stack DFS | You manage frames |
| "flatten to linked list" | Reverse postorder rewire | `node.right = prev` |
| "preorder iterative" | Pop = process (simpler) | Push right then left |
| "morris traversal" | O(1) space (later rank) | Threaded tree — beyond Day 10 |

### 🧠 Quick Recognition Test

1. *"Postorder traversal iterative"* → **Stack + last** — peek, pivot right, output
2. *"Flatten BT to preorder linked list in-place"* → **Reverse postorder** — right, left, rewire
3. *"Max path sum anywhere"* → **Day 7 recursive** — iteration rarely needed
4. *"Level order traversal"* → **BFS queue Day 3** — not stack DFS

---

## 🎯 Transfer to Unseen Problems

**Scenario 1:** *"Iterative inorder traversal."*

Which pattern? **Stack variant** — go left pushing, pop, go right. Simpler than postorder (no `last`).

**Scenario 2:** *"Verify preorder serialization with iterative stack."*

Which pattern? **Stack simulation** — push/pop matching serialized tokens.

**Scenario 3:** *"Flatten tree using O(1) extra space (Morris)."*

Which pattern? **Advanced** — thread right pointers temporarily. Stretch beyond Day 10.

> **Answer key:** Scenarios 1–2 = stack simulation family. Scenario 3 = later rank optimization.

---

## ⚠ Common Mistakes

1. **Pop-on-push for postorder** — Gives preorder order instead.
2. **Missing `last` pointer** — Re-processes right subtree infinitely.
3. **Flatten: left before right** — Reversed list — need right first.
4. **Flatten: forget `node.left = null`** — Problem requires right-only chain.
5. **Choosing iteration when recursion is clearer** — Use iterative when asked or stack depth is a concern.

---

## 🏋️ Mini Challenge

### [Binary Tree Inorder Traversal #94](https://leetcode.com/problems/binary-tree-inorder-traversal/)

**[→ Try Inorder Iterative on LeetCode](https://leetcode.com/problems/binary-tree-inorder-traversal/)**

Implement inorder without recursion — stack: push left, pop, go right.

**Before you code:** Compare to postorder — inorder is simpler (no `last` guard).

> 💡 **Hint:** `while cur or stack: push left; pop and visit; cur = right`.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Binary Tree Postorder Traversal #145](https://leetcode.com/problems/binary-tree-postorder-traversal/) | Easy | Iterative Postorder |
| [Flatten Binary Tree to Linked List #114](https://leetcode.com/problems/flatten-binary-tree-to-linked-list/) | Medium | In-Place Tree Rewiring |

---

*Day 10 complete! D-Rank test next — prove the full D-Rank toolkit. →*
