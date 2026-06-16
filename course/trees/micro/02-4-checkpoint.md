<!-- hand-authored -->
# ✅ Day 2 Checkpoint

> **DFS Traversals** · 2 quests completed · ⭐ 40 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Day 2 is about **visit order during DFS** — when you record the node relative to left and right recursion. Practice hearing the signal:

| When you see... | Think... | Why |
|---|---|---|
| "inorder traversal" | Left → Root → Right | Record between children |
| "preorder traversal" | Root → Left → Right | Record before children |
| "postorder" (preview) | Left → Right → Root | Record after children |
| "return list of node values" | Named DFS order | Order is in the problem title |
| "BST" + sorted output | Inorder | Left-first visit = ascending |
| "serialize" / root first | Preorder | Parent before subtrees |
| "visit before/after children" | Pre vs in/post | One line placement |
| "same tree, two orders" | Trace both | Same nodes, different lists |

### 🧠 Quick Recognition Test

Read each mini-problem. Which Day 2 pattern fires first?

1. *"Return inorder traversal of a binary tree"* → **Inorder** — left, record, right
2. *"Return preorder traversal of a binary tree"* → **Preorder** — record, left, right
3. *"On tree [3,9,20,15,7], inorder output?"* → **[9, 3, 15, 20, 7]**
4. *"Same tree — preorder output?"* → **[3, 9, 20, 15, 7]**

---

## 🎯 Transfer to Unseen Problems

You've traced inorder and preorder. Can you predict visit order on new trees?

**Scenario 1:** *"Given a BST, return values in ascending order."*

Which pattern? **Inorder** — left subtree has smaller values; recording between children yields sorted list.

**Scenario 2:** *"Serialize a tree by writing root value before child values."*

Which pattern? **Preorder** — root-first matches serialization convention.

**Scenario 3:** *"Delete a tree freeing nodes after children are freed."*

Which pattern? **Postorder** (preview) — process children before parent. Not inorder or preorder.

> **Answer key:** The problem either names the order or describes **when** to process the node. Match that timing — don't default to "any DFS."

---

## ⚠ Common Mistakes

1. **Confusing inorder and preorder** — Draw one tree; write both sequences before coding.

2. **Recording at wrong time** — Inorder: between calls. Preorder: before calls. One line moved = wrong algorithm.

3. **Iterative stack push order (preorder)** — Push **right** then **left** so left is processed first.

4. **Using BFS for named DFS order** — Level-order is Day 3; inorder/preorder are depth-first.

5. **Forgetting empty tree** — Return `[]`, not crash.

---

## 🏋️ Mini Challenge

### [Binary Tree Postorder Traversal #145](https://leetcode.com/problems/binary-tree-postorder-traversal/)

**[→ Try Postorder Traversal on LeetCode](https://leetcode.com/problems/binary-tree-postorder-traversal/)**

Return the **postorder** traversal (Left → Right → Root).

```
Input:       3
            / \
           9  20
             /  \
            15   7

Output: [9, 15, 7, 20, 3]
```

### 🔍 Pattern Recognition for This Challenge

| Clue | Signal |
|---|---|
| "postorder" | Record **after** both children |
| Same tree as Day 2 quests | Root 3 appears **last** |
| "left-right-root" | Opposite of preorder |

**Before you code:** Write the visit order 1–5 on paper. Compare all three: preorder starts with 3, inorder has 3 in middle, postorder ends with 3.

> 💡 **Hint:** Recursive postorder = `post(left); post(right); record(node)`.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Binary Tree Inorder Traversal #94](https://leetcode.com/problems/binary-tree-inorder-traversal/) | Easy | Left → Root → Right |
| [Binary Tree Preorder Traversal #144](https://leetcode.com/problems/binary-tree-preorder-traversal/) | Easy | Root → Left → Right |

---

*Day 2 complete! Tomorrow: go wide, not deep — BFS and the level queue. →*
