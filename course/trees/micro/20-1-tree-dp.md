<!-- hand-authored -->
# 📝 Tree DP: Optimal Substructure

> **Day 20** · Tree DP · 25 XP · 15 min read

---

Linear DP on arrays asks: *include this element or skip?* On trees, the same question becomes **postorder**: each node returns two numbers — best if robbed, best if skipped — and children answer first. Today also covers **direction state**: zigzag paths need to know which way you arrived.

> **Contrast (Recursion pack #198):** Array House Robber is adjacent-index DP. **Tree #337** is the same rob/skip idea on a **tree** — cannot rob parent and child together.

---

## Part 1 — Learn the Pattern

### 1. What is the pattern?

**Postorder rob/skip + direction state DP** — two templates:

| Template | Returns | Combine |
|---|---|---|
| **Rob/skip** | `(with, without)` per node | Postorder from children |
| **Zigzag** | `(lenEndingLeft, lenEndingRight)` or top-down `(l, r)` state | Track last move direction |

### 2. Simple explanation

**House Robber III:** Robbing a node bans its immediate children. After children report their `(rob, skip)` pairs, the parent computes:
- **Rob self:** `val + left.skip + right.skip` (must skip children)
- **Skip self:** `max(left.rob, left.skip) + max(right.rob, right.skip)`

**Zigzag:** A valid step alternates left/right. From each node, track longest zigzag ending by going left vs right; extend by switching direction from child.

### 3. Visual — Rob/skip postorder bubble

```
Tree:     3
         / \
        4   5

POSTORDER — children before parent:

dfs(4): no children → (4, 0)   rob=4, skip=0
dfs(5): no children → (5, 0)

dfs(3):
  rob    = 3 + 0 + 0 = 3     (skip both children)
  skip   = max(4,0) + max(5,0) = 9
  return (3, 9)

Answer: max(3, 9) = 9  (rob nodes 4 and 5, skip 3)

PAIR MEANING:
  with    = max money if THIS node robbed
  without = max money if THIS node skipped
```

### 4. Visual — Zigzag direction state

```
Tree:     1
         / \
        2   1
           /
          3

At node 1 (root), dfs with (l=0, r=0):
  go left to 2:  dfs(2, r+1=1, 0)  → ans=1 (one left step)
  go right to 1: dfs(1, 0, l+1=1)  → can continue zigzag

State (l, r) = longest zigzag ending at node having arrived
               via l consecutive left / r consecutive right steps.

From parent going LEFT to child:
  child state = (r+1, 0)  — next must go right

From parent going RIGHT to child:
  child state = (0, l+1)  — next must go left

ans = max(all l, r seen)
```

### 5. The universal template

**Rob/skip (postorder):**
```
function dfs(node):
    if null: return (0, 0)
    (lr, ls) = dfs(left)
    (rr, rs) = dfs(right)
    rob    = node.val + ls + rs
    skip   = max(lr, ls) + max(rr, rs)
    return (rob, skip)
// answer: max(dfs(root))
```

**Zigzag (top-down state):**
```
ans = 0
function dfs(node, l, r):
    ans = max(ans, l, r)
    if node.left:  dfs(left,  r+1, 0)
    if node.right: dfs(right, 0, l+1)
```

| Problem | Pattern | State |
|---|---|---|
| House Robber III #337 | Rob/skip pairs | Postorder `(with, without)` |
| ZigZag Path #1372 | Direction state | `(leftLen, rightLen)` per step |

### 6. Why brute force fails

| Brute force | Problem |
|---|---|
| Try all rob subsets | O(2^n) — tree DP is O(n) |
| Greedy rob largest values | Adjacent parent-child constraint breaks greedy |
| Zigzag: store all paths | O(n²) paths — state compression to O(n) |
| Rob/skip top-down only | Parent decision needs child optimal subanswers |
| Ignore skip branch | Must track both include/exclude |

### 7. Bridge — Recursion pack House Robber #198 vs Tree #337

If you completed **Recursion pack Day 23** ([House Robber #198](https://leetcode.com/problems/house-robber/)), you know array DP: `rob(i) = max(rob(i-1), nums[i] + rob(i-2))`.

| Array #198 | Tree #337 (today) |
|---|---|
| Linear neighbors | Parent-child edges |
| Two rolling vars | Two-value **return** per node |
| Forward index | **Postorder** — children first |
| O(n) time | O(n) time, O(h) stack |

**Same rob/skip intuition — different topology.** Tree version returns `(with, without)` pairs upward instead of a 1D table.

### 8. Pattern signals & recognition clues

| When the problem says… | Think… |
|---|---|
| "rob" + tree + no adjacent | Postorder rob/skip pairs |
| "cannot rob parent and child" | `(val + l.skip + r.skip, ...)` |
| "zigzag" / "alternate left right" | Direction state |
| "longest path" with turn constraint | Pass `(l, r)` down, global ans |
| "optimal substructure on tree" | Bottom-up returns |

**Keywords:** `(rob, skip)` · `postorder` · `direction state` · `l+1, r+1`

### 9. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Rob parent + rob child | Rob node → force child **skip** branch |
| Only returning one value from dfs | Return **pair** for rob/skip |
| Zigzag: same direction twice | Reset opposite dir to 0 on recurse |
| Top-down rob/skip without memo | Tree needs postorder or memo on subtrees |
| Confusing with Day 7 max path sum | Zigzag counts edges with alternation |

### 10. Recognition drill

Read this problem aloud:

> *"Rob houses on a binary tree — no two connected nodes both robbed."*

Before coding, say:

> *"Postorder: return (rob, skip). Rob = val + left.skip + right.skip. Skip = max(left) + max(right). Answer max at root."*

---

*Optimal substructure bubbles up. First quest: House Robber III. →*
