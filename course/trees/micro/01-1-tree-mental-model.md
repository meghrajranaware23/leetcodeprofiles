<!-- hand-authored -->
# 📝 The Tree Mental Model

> **Day 1** · The Tree Mental Model · ★☆☆☆☆ · 10 XP · 10 min read

---

Your mission today: **learn the information-flow compass for trees** before you touch any code. Every E-Rank tree problem asks one question — *where does the answer travel?* Draw the tree. Mark the direction. Then the recursion writes itself.

---

## Part 1 — The Information-Flow Compass

### 1. What makes trees different from arrays?

An array is linear — one index, one neighbor. A **binary tree** is recursive: every node is the root of its own smaller tree with at most two children.

That structure forces a compass with four directions:

| Direction | Name | How it works | Day 1 example |
|---|---|---|---|
| **↓ Down** | Top-down | Pass state as you descend | (Preview: path sum — Day 6+) |
| **↑ Up** | Bottom-up | Children report; parent combines | Max Depth #104 |
| **↔ Across** | BFS | Queue processes level by level | (Preview: Day 3) |
| **⇄ Side-by-side** | Parallel | Two pointers walk two subtrees | (Preview: Day 5) |

**Today's focus:** **↑ Up** (depth bubbles) and **in-place modification** (invert swap). The compass tells you which arrow to follow before you open your editor.

### 2. The null base case — every tree function starts here

```
if node is null:
    return base_value   // often 0, false, null, or empty list
```

`null` is not an error — it is the **empty subtree**. It answers the smallest question without recursing further.

| Problem | null returns |
|---|---|
| Max Depth | `0` (no nodes below) |
| Invert Tree | `null` (nothing to flip) |
| Count nodes | `0` |

**Rule:** Write the null check first. If you cannot state what null returns, you are not ready to code.

### 3. Visual — Depth bubbles **up** (Max Depth #104)

This is the **Trees pack home problem** for bottom-up recursion. You saw Max Depth in the Recursion pack as a warm-up; here we trace it as a **tree-native** pattern — values travel **up** the edges, not down a counter.

```
        3
       / \
      9  20
        /  \
       15   7

UNWIND (postorder-style returns):

  maxDepth(15) → 1        (leaf)
  maxDepth(7)  → 1        (leaf)
  maxDepth(9)  → 1        (leaf)
  maxDepth(20) → 1 + max(1, 1) = 2
  maxDepth(3)  → 1 + max(1, 2) = 3  ✓

Each frame asks: "How deep is MY subtree?"
Leaves answer 1. Parents add 1 and take max of children.
null answers 0 so `1 + max(0, 0)` at a lone leaf still gives 1.
```

**Contrast with top-down:** You do *not* pass `depthSoFar++` down. Subtrees fully report their depth; the root only combines.

### 4. Visual — Invert: swap at each node (postorder-friendly)

Invert Binary Tree #226 **mutates** the tree. At each node: trust children to invert their subtrees, **then** swap left and right pointers.

```
Before:          After invert at root:
    4                4
   / \              / \
  2   7            7   2
 / \ / \          / \ / \
1  3 6  9        9  6 3  1

Trace at node 4:
  1. invertTree(2)  → subtree flipped
  2. invertTree(7)  → subtree flipped
  3. swap(4.left, 4.right)
  4. return root

Order note: swap-before-recurse also works; what matters is
"every node eventually swaps its two children."
```

### 5. The universal skeleton

```
function solve(node):
    if node is null: return base_case

    left_result  = solve(node.left)    // trust left subtree
    right_result = solve(node.right)   // trust right subtree

    return combine(node, left_result, right_result)
    // OR mutate node in place, then return node
```

**Max Depth combine:** `1 + max(left, right)`  
**Invert combine:** swap pointers, return `node`

### 6. Pattern signals — Day 1 only

| When the problem says… | Compass direction | Think… |
|---|---|---|
| "maximum depth" / "height" | ↑ Up | `1 + max(left, right)`; null → 0 |
| "invert" / "mirror the tree" | ↑ Up + mutate | Recurse both sides, swap children |
| "binary tree" + return a number | ↑ Up | Children return ints; parent combines |
| "return the root" after modify | In-place DFS | Base null; work at each node |
| "empty tree" / null root | Base case | Answer before any recursion |
| "longest path root to leaf" (depth) | ↑ Up | Max of child depths, not sum |
| "flip left and right" | Swap at node | Same skeleton as invert |
| "subtree" (preview) | Side-by-side later | Day 5 — compare two structures |

**Keywords:** `null` · `bottom-up` · `max(left, right)` · `swap` · `subtree` · `return`

### 7. Why brute force fails on Day 1 problems

| Brute force | Problem |
|---|---|
| Global `depth++` while traversing | Hides the bottom-up template used in harder tree DP |
| BFS just to count depth | Works, but misses the ↑ bubble pattern |
| Copy entire tree then invert | O(n) extra space — swap in place |
| Iterating nodes without recursion | Loses natural subtree decomposition |
| `sum(leftDepth + rightDepth)` | Depth uses **max**, not sum |

### 8. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Forgetting null base case | First line of every tree function |
| Return 0 at leaf instead of 1 (depth) | null → 0; **node** → 1 + max(children) |
| Swap only at root | Every node must swap its children |
| Confusing depth vs height wording | In LC #104, both mean "longest root-to-leaf node count" |
| Starting to code without drawing | Trace bubbles on paper first |

### 9. Bridge from Recursion pack

In the **Recursion pack**, Max Depth introduced "trust the recursive call." Here in **Trees**, that same problem becomes your **compass anchor**:

- Recursion pack: "children return depths, I combine"
- Trees pack: same skeleton, plus **four flow directions**, **null as empty subtree**, and **in-place mutation** (invert)

You are not re-learning `#104` — you are placing it on the tree compass so every future problem has a direction.

### 10. Recognition drill — today's quests

Read each problem aloud. Name the compass direction before coding.

**Quest 1 — Max Depth #104:**
> *"↑ Bottom-up bubble. null → 0. Return `1 + max(leftDepth, rightDepth)`."*

**Quest 2 — Invert Tree #226:**
> *"DFS mutate. null → null. Recurse both children, swap left/right, return root."*

---

*You have the compass. Quest 1 puts the ↑ arrow into practice. →*
