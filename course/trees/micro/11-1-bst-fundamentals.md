<!-- hand-authored -->
# 📝 BST Fundamentals: Search & Validate

> **Day 11** · BST Fundamentals · ★★★☆☆ · 15 XP · 15 min read

---

Day 10 built and flattened general binary trees. Today the tree carries an **ordering contract**: every node sits in a strict `(min, max)` window inherited from ancestors. That single rule unlocks **O(h) search** (one comparison per level) and **range-bounded validation** (pass bounds down, fail fast on violation).

> **Contrast (Day 10):** General trees need full traversal. BSTs let you **prune** — go left if smaller, right if larger.

---

## Part 1 — Learn the Pattern

### 1. What is the pattern?

**BST invariant + range descent** — two faces of the same rule:

- **Search:** at each node, compare target to `node.val`; walk **left** or **right** only — never both
- **Validate:** carry `(lo, hi)` down; node must satisfy `lo < val < hi`; tighten bounds for children

| Operation | Direction | Key state |
|---|---|---|
| Search | Top-down walk | Target value |
| Validate | Top-down DFS | `(min, max)` open interval |

### 2. Simple explanation

A BST is a **sorted filing cabinet** laid flat. The root is the middle drawer. Everything left is smaller; everything right is larger — and that holds **recursively inside every subtree**.

To **search:** start at root. Too big? Right drawer only. Too small? Left only. Miss a drawer? Return null.

To **validate:** each drawer must fit inside its parent's allowed range. Left child inherits `(lo, parent.val)`; right inherits `(parent.val, hi)`.

### 3. Visual — BST search: left/right walk

```
BST:        8
           / \
          3   10
         / \    \
        1   6    14
           / \   /
          4   7 13

Search target = 6:

  Start [8]:  6 < 8  → go LEFT
  At   [3]:  6 > 3  → go RIGHT
  At   [6]:  6 == 6 → FOUND ✓

Only 3 nodes visited — not all 8.

Search target = 13:

  [8]:  13 > 8   → RIGHT
  [10]: 13 > 10  → RIGHT
  [14]: 13 < 14  → LEFT
  [13]: FOUND ✓

Each step eliminates half the remaining tree (in balanced case).
```

### 4. Visual — Range validation: (min, max) descent

```
INVALID tree (classic trap):

        5
       / \
      1   4        ← 4 is in RIGHT subtree of 5
     /              but 4 < 5 — violates BST!

Checking node 4 alone looks fine (1 < 4).
The bug: 4 must be > 5 because it's in 5's RIGHT subtree.

RANGE DESCENT fixes this:

dfs(5, -∞, +∞):
  5 OK in (-∞, +∞)
  left:  dfs(1, -∞, 5)   → 1 OK
  right: dfs(4, 5, +∞)   → 4 < 5 → FAIL ✗

At each node:
  ┌──────────────────────────────────────────┐
  │  FAIL if val <= lo OR val >= hi          │
  │  left:  dfs(node.left,  lo, node.val)    │
  │  right: dfs(node.right, node.val, hi)    │
  └──────────────────────────────────────────┘

Use long / open interval — INT_MIN and INT_MAX as endpoints
can equal legitimate node values at the boundary.
```

### 5. The universal template

**Search (iterative or recursive):**
```
function search(node, val):
    while node and node.val != val:
        node = val < node.val ? node.left : node.right
    return node
```

**Validate (range descent):**
```
function valid(node, lo, hi):
    if node is null: return true
    if node.val <= lo or node.val >= hi: return false
    return valid(node.left, lo, node.val)
        && valid(node.right, node.val, hi)
```

| Problem | Pattern | Why BST helps |
|---|---|---|
| Search in BST #700 | Left/right walk | O(h) — one branch per level |
| Validate BST #98 | Range descent | Catches "local OK, global wrong" nodes |

### 6. Why local checks fail

| Wrong approach | Problem |
|---|---|
| `left.val < node.val < right.val` only | Misses nodes deep in wrong subtree (see 4 under 5's right) |
| Inorder "is sorted?" without null handling | Duplicate values break strict `<` |
| BFS level-by-level | Ignores ancestor bounds entirely |
| Compare to parent only | Grandparent range violations slip through |

**The insight:** Validation is **inheritance** — each node receives legal bounds from every ancestor, not just its parent.

### 7. Bridge — Recursion pack Validate BST

If you completed **Recursion pack Day 10** ([Validate BST #98](https://leetcode.com/problems/validate-binary-search-tree/)), you already coded this pattern with a helper `dfs(node, lo, hi)`.

| Trees pack (today) | Recursion pack |
|---|---|
| Same `(min, max)` descent | Same helper signature |
| Search #700 as companion | Often paired with helper-function template |
| BST as ordered structure | BST as recursion-with-constraints |

**One pattern, two homes.** If Validate BST felt familiar from Recursion, that's the bridge working — today you add **search** and the **ordering mental model** that makes BST ops (Days 12–13) click.

### 8. Pattern signals & recognition clues

| When the problem says… | Think… |
|---|---|
| "binary search tree" + "search/find" | Left/right walk, O(h) |
| "validate BST" / "is valid BST" | Range `(lo, hi)` descent |
| "inorder is sorted" | Equivalent property — but range check is safer to code |
| "kth smallest" (Day 12 preview) | Inorder order = sorted sequence |
| "values in range" on BST | Walk toward range boundaries |

**Keywords:** `lo < val < hi` · `go left if smaller` · `open interval` · `LONG_MIN/MAX`

### 9. Common beginner mistakes

| Mistake | Fix |
|---|---|
| `left.val < root.val` only | Pass `(lo, hi)` from root — bounds compound |
| Using `<=` / `>=` at boundaries | BST requires **strict** inequality |
| `INT_MIN`/`INT_MAX` as sentinel values | Use `long` or `-inf`/`+inf` — nodes can equal INT bounds |
| Recursive search visiting both children | Compare once, pick **one** branch |
| Confusing BST search with binary search on array | Tree pointers replace index arithmetic |

### 10. Recognition drill

Read this problem aloud:

> *"Determine if a binary tree is a valid binary search tree."*

Before coding, say:

> *"Range descent: dfs(node, lo, hi). Fail if val outside (lo, hi). Left gets (lo, val), right gets (val, hi). Not just parent comparison."*

---

*Invariant locked. First quest: catch the hidden invalid node with range descent. →*
