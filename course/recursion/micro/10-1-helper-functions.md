<!-- hand-authored -->
# 📝 Helper Functions & Recursion Design

> **Day 10** · Bounded Helpers · Postorder Rewire · 15 XP · 15 min read

---

Your mission today: **design a helper** when the public API doesn't carry enough state. Validate BST passes **min/max bounds** down (Day 5 cousin). Flatten tree uses **postorder rewiring** with a `prev` pointer — links to Day 5 bounded DFS and Day 9 postorder modify.

---

## Part 1 — When You Need a Helper

### 1. Why helpers exist

The main function signature often lacks room for:

- **Valid range** for BST check — each node must sit in `(lo, hi)`
- **Previous pointer** for flatten — stitch current node after right subtree processed
- **Mirror pair** (Day 9) — two nodes instead of one

Pattern: **public wrapper** sets initial state → **private helper** carries the real recursion.

### 2. Link to Day 5 bounded DFS

Day 5 Range Sum BST: pass `[low, high]`, **prune** when `node.val > high` (skip right) or `node.val < low` (skip left).

Validate BST: pass **open interval** `(lo, hi)` — node must satisfy `lo < val < hi`, then **tighten** bounds for children:

- Left child: upper bound becomes `node.val`
- Right child: lower bound becomes `node.val`

**Wrong shortcut:** only compare node to immediate parent — fails on deep violations like `5→3→6` under `5` with `6` in left subtree.

### 3. Visual — BST range tightening

```
Valid BST:       5
                / \
               3   8
              / \   \
             1   4   9

validate(5, lo=-∞, hi=+∞):  -∞ < 5 < +∞ ✓
  left: validate(3, lo=-∞, hi=5):  3 < 5 ✓
    validate(1, -∞, 3) ✓
    validate(4, 3, 5) ✓
  right: validate(8, lo=5, hi=+∞) ✓
    validate(9, 8, +∞) ✓

Invalid:    5
           / \
          3   8
         / \
        1   6   ← 6 in left of 5 but > 5

validate(6, lo=3, hi=5): 6 < 5? NO → false
```

### 4. Visual — flatten postorder rewire

Goal: right-skewed linked list in **preorder** order (1,2,3) using `right` pointers.

```
Before:    1
          / \
         2   5
        / \
       3   4

Postorder processing (right subtree first, then left, then node):
  Process 5 → prev=5
  Process 4 → 4.right=5, prev=4
  Process 3 → 3.right=4, prev=3
  Process 2 → 2.right=3, prev=2
  Process 1 → 1.right=2, prev=1

After: 1→2→3→4→5 (all via right pointers, left=null)
```

**Key:** `prev` tracks last placed node in the flattened list. Visit **right, left, node** so `node.right = prev` stitches correctly.

### 5. Helper templates

**Range-bounded BST:**
```
function validate(node, lo, hi):
    if !node: return true
    if node.val <= lo || node.val >= hi: return false
    return validate(node.left, lo, node.val)
        && validate(node.right, node.val, hi)
```

**Postorder rewire with prev:**
```
prev = null
function dfs(node):
    if !node: return
    dfs(node.right)
    dfs(node.left)
    node.right = prev
    node.left = null
    prev = node
```

### 6. Why brute force fails

| Approach | Problem |
|---|---|
| **BST: only parent-child compare** | Misses ancestor bound violations |
| **BST: inorder without recursion design** | Works but today's lesson is bounded helper |
| **Flatten: preorder stitch top-down** | Hard to find tail of left subtree |
| **Flatten: collect nodes then relink** | O(n) list — misses postorder rewire |

### 7. Pattern signals for Day 10

| When the problem says… | Think… |
|---|---|
| "validate BST" | Helper with `(lo, hi)` open interval |
| "flatten to linked list" | Postorder + `prev` pointer |
| "each node's left null" | Rewire `right` only |
| "preorder traversal order" | Process node after children in reverse postorder |
| bounds / valid range | Day 5 state down — tighten at each node |

**Keywords:** `helper` · `lo` · `hi` · `validate` · `prev` · `rewire` · `postorder`

### 8. Common beginner mistakes

| Mistake | Fix |
|---|---|
| BST: `node.val < parent.val` only on left | Need full `(lo, hi)` from ancestors |
| BST: `<=` vs `<` on bounds | Use strict open interval consistently |
| Flatten: left then right then node | **Right, left, node** for this prev trick |
| Forget `node.left = null` | Flatten requires no left children |
| Helper without wrapper init | Wrapper sets `(-∞, +∞)` or `prev = null` |

### 9. Recognition drill

Read this problem aloud:

> *"Validate a binary search tree."*

Before coding, say:

> *"Helper validate(node, lo, hi). Strict bounds. Tighten hi on left recurse, lo on right. Day 5 bounded DFS — boolean not sum."*

---

*You design helpers with state. First quest: Validate BST. →*
