# ✅ Day 20 Checkpoint

> **Tree DP** · 2 quests completed · ⭐ 130 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Before you move on, practice **hearing the signal** in each phrase below:

| When you see... | Think... | Why |
|---|---|---|
| "binary tree" + "depth/height" | Bottom-up recursion | Combine child heights |
| "path sum" / "root to leaf" | Top-down DFS | Carry running state down |
| "same tree" / "subtree of" | Parallel recursion | Compare two nodes at a time |
| "level order" / "each level" | BFS with queue | Process breadth-first |
| "construct from traversals" | Divide and conquer | Preorder root + inorder split |
| "validate BST" | Range-bounded DFS | Pass min/max down |

### 🧠 Quick Recognition Test

Read each mini-problem. Which pattern fires first?

1. *"Find the maximum depth of a binary tree"* → **Bottom-up recursion** (1 + max of children)
2. *"Check if two trees are identical"* → **Parallel recursion** (compare node + both subtrees)
3. *"Return values level by level"* → **BFS** (queue + level separation)
4. *"Find all paths with target sum"* → **Top-down DFS** (carry sum, backtrack at leaves)

---

## 🎯 Transfer to Unseen Problems

You've studied today's quests. Can you recognize the pattern on problems you've never seen?

**Scenario 1:** *"Given a binary tree, return the number of nodes."*

Which pattern? **Bottom-up or simple DFS.** Return 1 + left count + right count. Or just traverse and increment.

**Scenario 2:** *"Given a binary tree, check if it is symmetric."*

Which pattern? **Parallel mirror recursion.** Compare left.left with right.right and left.right with right.left.

**Scenario 3:** *"Given a binary tree, find the bottom-most left value."*

Which pattern? **BFS level-order.** Track the first node at each level; the last level's first node is the answer.

> **Answer key:** All three use patterns from today's training. The *combine logic* changes — the recursive skeleton does not.

---

## ⚠ Common Mistakes

1. **Forgetting null check** — Every tree function starts with `if not node: return`.
2. **Wrong traversal order** — Draw the tree and trace before coding.
3. **Using global when return suffices** — Prefer returning values from recursion.
4. **Not tracing on paper** — Tree problems are visual. Always draw first.
5. **Confusing top-down vs bottom-up** — Parameters going down = top-down. Return values coming up = bottom-up.

---

## 🏋️ Mini Challenge

### Related LeetCode Practice

Pick one problem from today's pattern family and solve it on LeetCode without looking at the walkthrough.

**Before you code:** Say the pattern name out loud. Draw a 4-node tree. Trace your approach by hand.

> 💡 **Hint:** Re-read the Pattern Recognition Breakdown from today's quests if stuck.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [House Robber III #337](https://leetcode.com/problems/house-robber-iii/) | Medium | Tree DP Rob/Skip |
| [Longest ZigZag Path in a Binary Tree #1372](https://leetcode.com/problems/longest-zigzag-path-in-a-binary-tree/) | Medium | Direction State DP |

---

*Day 20 complete! Tomorrow: the next branch of your ascension. →*
