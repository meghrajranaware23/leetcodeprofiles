<!-- hand-authored -->
# 📝 Bottom-Up DFS: Gathering Results Upward

> **Day 7** · Bottom-Up DFS · ★★★☆☆ · 10 XP · 15 min read

---

Day 6 carried **budget** down root-to-leaf threads. Today paths can **turn** at any node — the best route may pass through the root, bend left, then dive right. Subtrees report **height** or **best single-branch gain** upward; the current frame **combines** child answers and sometimes updates a **global best** that no single return value can hold.

> **Contrast (Day 6):** Yesterday = *state down, leaf checks*. Today = *returns up, global captures cross-subtree winners*.

---

## Part 1 — Learn the Pattern

### 1. What is the pattern?

**Bottom-up with global update** — recursive function returns one thing (usually height or best downward gain); side effect records answers that span **both** subtrees.

- **Return value** — what the parent needs: `1 + max(leftH, rightH)` for height
- **Global variable** — best seen so far: diameter, max path sum
- **At each node** — after children return, compute cross-subtree candidate, update global, return upward contribution

### 2. Simple explanation

Each node is a hub with two cables (subtrees) coming in. Children report *"my longest cable inward is L / R."* The hub asks:
1. **Through me:** can L + R (+ my value) beat the world record? → update global
2. **Upward to my boss:** I'll offer `myVal + max(L, R)` — parent can only use **one** branch

The CEO (root caller) reads the global; individual returns stay local.

### 3. Visual — Diameter: height return + global update

```
Tree:       1
           / \
          2   3
         / \
        4   5

HEIGHT RETURNS (bubble UP):

dfs(4): return 1          (leaf)
dfs(5): return 1          (leaf)
dfs(2): l=1, r=1
        global = max(0, 1+1) = 2    ← diameter through 2 (path 4–2–5)
        return 1 + max(1,1) = 2     ← height of subtree rooted at 2
dfs(3): return 1
dfs(1): l=2, r=1
        global = max(2, 2+1) = 3    ← diameter through 1 (path 4–2–1–3)
        return 1 + max(2,1) = 3

TWO ROLES at every node:
  ┌─────────────────────────────────────┐
  │  RETURN: height for parent          │
  │  GLOBAL: max(leftH + rightH, best)  │
  └─────────────────────────────────────┘

Diameter = longest path between ANY two nodes (may not pass root).
Return = longest downward chain (for parent's combine).
```

### 4. Visual — Max Path Sum: cross-subtree combine

```
Tree:      -10
          /  \
         9   20
            /  \
           15   7

At node 20 (after children return):
  l = max(0, dfs(15)) = 15
  r = max(0, dfs(7))  = 7

  CROSS-SUBTREE (global candidate):
    20 + 15 + 7 = 42  → ans = 42   ← path 15–20–7

  UPWARD OFFER (return to parent):
    20 + max(15, 7) = 35           ← parent can attach ONE branch only

At node -10:
  l = 9,  r = 35
  global: -10 + 9 + 35 = 34  (not better than 42)
  return: -10 + max(9, 35) = 25

        15 ──┐
             ├── 20 ── 7     ← global best = 42 (uses BOTH sides)
        (only one side       return from 20 = 35 (one branch up)
         goes up to -10)
```

**Critical rule:** Global uses **both** branches. Return uses **one** branch (the better downward gain, floored at 0 if negatives allowed).

### 5. The universal template

```
global = initial_worst

function dfs(node):
    if node is null: return 0

    left  = dfs(node.left)
    right = dfs(node.right)

    // cross-subtree — update global (path may turn here)
    global = max(global, combine_cross(node, left, right))

    // upward — what parent can extend
    return node.val + max(left, right)   // or 1 + max(l,r) for height
```

| Problem | Return | Global update |
|---|---|---|
| Diameter | `1 + max(l, r)` height | `max(ans, l + r)` edge count |
| Max path sum | `node.val + max(l, r, 0)` | `max(ans, node.val + l + r)` |

### 6. Why bottom-up beats top-down here

| Top-down attempt | Problem |
|---|---|
| Pass "current path sum" down | Only tracks root-to-X paths — misses 15–20–7 style bends |
| Pass depth from root for diameter | Diameter may live entirely in a subtree |
| Return only `max(left, right)` without global | Misses cross-subtree path through current node |
| Two-pass (height then diameter) | Works but one DFS with dual role is cleaner |

If the optimal path **doesn't start at root**, downward state can't see it. Children must report measurable gains upward.

### 7. Day 7 vs Day 6 — the contrast

| | **Day 6 — Top-Down** | **Day 7 — Bottom-Up + Global** |
|---|---|---|
| Path shape | Root → leaf only | Any node → any descendant(s) |
| State | Parameters down | Returns up + global |
| Leaf role | Final check | Returns base height/gain |
| Backtrack | Often (path lists) | Never |
| "Do I need global?" | No | Yes when path **bends** at internal node |

### 8. Pattern signals & recognition clues

| When the problem says… | Think… |
|---|---|
| "diameter" / "longest path between nodes" | Return height, global `l + r` |
| "maximum path sum" (any path) | Return best one-branch gain, global `val + l + r` |
| "longest / max" without "root-to-leaf" | Likely bottom-up, not Day 6 |
| "may start and end at any node" | Global cross-subtree combine |
| "height of tree" | Pure bottom-up return (no global needed) |

**Keywords:** `return height` · `global ans` · `l + r` · `max(0, …)` · `cross-subtree`

### 9. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Returning `l + r` to parent | Parent can only use one branch — return `val + max(l,r)` |
| Forgetting global update before return | Cross-subtree winner lives in global |
| Using `l + r + 1` for diameter edges vs nodes | Diameter counts edges: `l + r`, height adds 1 |
| Not clamping negatives to 0 (max path sum) | `max(0, dfs(child))` — skip losing branches |
| Confusing with Day 6 path sum | Root-to-leaf = top-down; anywhere = bottom-up global |

### 10. Recognition drill

Read this problem aloud:

> *"Find the diameter of a binary tree — the longest path between any two nodes."*

Before coding, say:

> *"Return height from dfs. At each node: ans = max(ans, leftH + rightH). Return 1 + max(leftH, rightH). One function, two roles — not Day 6 remainder."*

---

*Heights bubble up; globals capture cross-subtree winners. First quest: diameter. →*
