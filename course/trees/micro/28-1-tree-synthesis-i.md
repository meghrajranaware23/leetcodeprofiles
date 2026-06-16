<!-- hand-authored -->
# 📝 Tree Synthesis I: Multi-Pattern Combine

> **Day 28** · Tree Synthesis I · ★★★★★ · 25 XP · 18 min read

---

Day 6 taught **top-down running state** — carry a remainder or path prefix as you descend. Day 11 taught **BST range validation** — every node must fit an inherited `(lo, hi)` slice. Day 20 previewed **tree DP** — children return structured answers; the parent combines.

Today is **S-Rank synthesis**: two quests that fuse those threads into one pass each. Neither is a new traversal — both ask *what extra state travels with the dfs* and *what tuple bubbles back up*.

---

## Part 1 — Two Synthesis Patterns for Today

### 1. Pattern A — Running consecutive length (↓ top-down)

**Longest Consecutive Sequence #298** extends Day 6's "carry state down" compass:

```
dfs(node, parentVal, len):
    if !node: return
    len = (node.val == parentVal + 1) ? len + 1 : 1   // reset streak
    ans = max(ans, len)                                 // global best
    dfs(node.left,  node.val, len)
    dfs(node.right, node.val, len)
```

| Piece | Role |
|---|---|
| `parentVal` | Expected predecessor — streak continues iff `node.val == parentVal + 1` |
| `len` | Current consecutive run ending at this node |
| `ans` global | Longest run seen anywhere (path may start mid-tree) |
| Seed call | `dfs(root, root.val - 1, 0)` — first node always starts length 1 |

**Why top-down, not bottom-up?** The streak is defined by **parent → child** order. A child cannot know whether its parent continued the run without being told `parentVal`.

Trace on a streak that **breaks and restarts**:

```
        1
       / \
      2   3
         / \
        4   5

At 1: len=1 (seed)
At 2: 2==1+1 → len=2, ans=2
At 3: 3≠2+1 → len=1 (reset!)
At 4: 4==3+1 → len=2
At 5: 5==4+1 → len=3, ans=3 ✓
```

### 2. Pattern B — BST validity tuple (↑ bottom-up)

**Maximum Sum BST #1373** fuses Day 11's BST invariant with Day 20's multi-value return:

Each `dfs(node)` returns a **4-tuple**:

```
(isBST, minVal, maxVal, sum)
```

| Field | Meaning |
|---|---|
| `isBST` | Is this entire subtree a valid BST? |
| `minVal` / `maxVal` | Value range of subtree (for parent check) |
| `sum` | Total of all nodes (only meaningful when `isBST`) |

**Null base case:** `(true, +∞, -∞, 0)` — empty subtree is vacuously valid.

**Combine at parent:**

```
(lb, lmin, lmax, lsum) = dfs(left)
(rb, rmin, rmax, rsum) = dfs(right)

if lb && rb && lmax < node.val && node.val < rmin:
    total = lsum + rsum + node.val
    ans = max(ans, total)                    // update global best BST sum
    return (true, min(lmin, node.val), max(rmax, node.val), total)
else:
    return (false, 0, 0, 0)                  // poison — parent cannot be BST
```

This is Day 11's global bound check **compressed into child min/max** — if left's max `< node.val <` right's min, the whole subtree is ordered.

Trace on a tree where the **largest BST is not the whole tree**:

```
        4
       / \
      3   5
         / \
        1   8

dfs(3): (T, 3, 3, 3)
dfs(1): (T, 1, 1, 1)
dfs(8): (T, 8, 8, 8)
dfs(5): 1 < 5 < 8 → (T, 1, 8, 14)   ← valid BST, sum=14
dfs(4): 3 < 4 but right.min=1 < 4  → (F, 0, 0, 0)  ← whole tree NOT BST

ans = 14 (subtree rooted at 5) ✓
```

### 3. Side-by-side — when to use which

| Signal in problem | Pattern | State direction |
|---|---|---|
| "consecutive" / "parent+1" / streak along edges | Running length | ↓ pass `parentVal, len` |
| "valid BST" + optimize over subtrees | Validity tuple | ↑ return `(isBST, min, max, sum)` |
| "longest path through node" | Dual-role bottom-up | ↑ return height, global `l+r` (Day 7) |
| "path from root to leaf" | Remainder + backtrack | ↓ pass `target - val` (Day 6) |

### 4. Why brute force fails on both

| Brute force | Problem |
|---|---|
| Enumerate all root-to-leaf paths for consecutive | O(n²) paths — streak may start mid-tree |
| Check every subtree for BST by flattening to array | O(n²) — tuple combine is O(n) one pass |
| Top-down BST range + separate sum pass | Two traversals — tuple merges validation + sum |
| Store all valid BSTs in a list | Tuple updates `ans` inline |

### 5. Common synthesis mistakes

| Mistake | Fix |
|---|---|
| Consecutive: only check from root | Streak resets when `val ≠ parentVal + 1` |
| Consecutive: bottom-up max of children | Parent value context is required — go top-down |
| BST tuple: compare only immediate children | Need `lmax < node.val < rmin`, not just left/right child |
| BST tuple: return sum when invalid | Return `(false, 0, 0, 0)` — poison parent |
| BST tuple: forget to update global `ans` | Update when combine succeeds |

### 6. Recognition drill

Read each problem. Name pattern + direction before coding:

> *"Longest consecutive increasing values along parent-child edges."*
>
> → **Running length top-down.** `dfs(node, parentVal, len)`, seed `parentVal = root.val - 1`.

> *"Largest sum among all BST subtrees in a binary tree."*
>
> → **Validity tuple bottom-up.** Return `(isBST, min, max, sum)`; global `ans` on valid combine.

> *"Validate BST" (Day 11 revisit)*
>
> → **Range descent OR tuple** — tuple is the bottom-up upgrade when you also need aggregate stats.

---

*Two synthesis patterns locked. Quest 1: consecutive streak with running state. →*
