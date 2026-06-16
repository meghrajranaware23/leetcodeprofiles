<!-- hand-authored -->
# ✅ Day 1 Checkpoint

> **The Tree Mental Model** · 2 quests completed · ⭐ 40 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Day 1 is about the **information-flow compass**, **null base cases**, and two concrete patterns: **↑ depth bubble** and **in-place swap**. Practice hearing the signal:

| When you see... | Think... | Why |
|---|---|---|
| "maximum depth" / "height" | ↑ Bottom-up bubble | `1 + max(left, right)`; null → 0 |
| "invert" / "mirror the tree" | DFS + swap | Recurse both sides; swap pointers |
| "binary tree" + return int | ↑ Combine from children | Trust recursive returns |
| "return the root" after modify | In-place mutation | null → null; work at each node |
| "empty tree" / null input | Base case first | Answer before recursing |
| "longest path root to leaf" (depth) | Max of child depths | Not sum of both branches |
| "flip left and right" | Same as invert | Swap at every node |
| "subtree height" (preview) | ↑ Same bubble family | Day 4 extends this |

### 🧠 Quick Recognition Test

Read each mini-problem. Which Day 1 pattern fires first?

1. *"Find the maximum depth of a binary tree"* → **↑ Bottom-up bubble** — `1 + max(left, right)`
2. *"Invert a binary tree in place"* → **DFS swap** — recurse, swap children, return root
3. *"Return 0 for an empty tree's depth"* → **Null base case** — empty subtree = 0 nodes
4. *"A single-node tree has depth 1"* → **Leaf combine** — `1 + max(0, 0) = 1`

---

## 🎯 Transfer to Unseen Problems

You've traced Max Depth and Invert Tree. Can you apply the **compass** to new problems?

**Scenario 1:** *"Given a binary tree, return the number of nodes."*

Which pattern? **↑ Bottom-up** — return `1 + count(left) + count(right)`. null → 0. Same skeleton as depth, but **sum** instead of max.

**Scenario 2:** *"Given a binary tree, check if every node has 0 or 2 children (full tree property)."*

Which pattern? **↑ Bottom-up bool** — `isFull(left) && isFull(right) && (0 or 2 children check)`. Combine with `&&`.

**Scenario 3:** *"Mirror a binary tree by swapping every node's children (same as invert)."*

Which pattern? **DFS swap** — identical to Invert #226. Name the pattern before coding.

> **Answer key:** All three use **null base case + recurse both children + combine/mutate at node**. The local step changes (max, sum, swap) — the skeleton does not.

---

## ⚠ Common Mistakes

1. **Base case after recursive call** — Write `if not node: return ...` first. Falling through causes null pointer errors.

2. **Return 0 at leaf for depth** — null → 0, but a **node** returns `1 + max(children)`. Off-by-one is the #1 depth bug.

3. **Swap only at root (invert)** — Every node must swap its two children, not just the top.

4. **Passing depth counter down for max depth** — Valid alternative, but Day 1's ↑ bubble is the tree-native template.

5. **Not tracing on paper** — Draw the tree. Label return values bubbling up (depth) or mark swaps (invert).

---

## 🏋️ Mini Challenge

### [Minimum Depth of Binary Tree #111](https://leetcode.com/problems/minimum-depth-of-binary-tree/)

**[→ Try Minimum Depth on LeetCode](https://leetcode.com/problems/minimum-depth-of-binary-tree/)**

Return the minimum number of nodes along the shortest path from root to a **leaf**.

```
Input:  root = [3,9,20,null,null,15,7]
Output: 2
Explanation: Shortest path is 3 → 9 (two nodes).
```

### 🔍 Pattern Recognition for This Challenge

| Clue | Signal |
|---|---|
| "minimum depth" | ↑ Bottom-up — `min` instead of `max` |
| "shortest path to leaf" | One-child node: don't take min of 0 and child |
| "binary tree" + return int | Same skeleton as Max Depth #104 |

**Before you code:** Say the pattern name out loud. Trace a tree where root has only a left child — why is `1 + min(0, 5)` wrong?

> 💡 **Hint:** If one child is null, the min depth comes entirely from the **non-null** child. Max Depth didn't need this guard; min depth does.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Maximum Depth of Binary Tree #104](https://leetcode.com/problems/maximum-depth-of-binary-tree/) | Easy | ↑ Bottom-up bubble |
| [Invert Binary Tree #226](https://leetcode.com/problems/invert-binary-tree/) | Easy | DFS swap |

---

*Day 1 complete! Tomorrow: visit order matters — inorder vs preorder on the same tree. →*
