<!-- hand-authored -->
# 📝 Path Problems: Root-to-Leaf & Any-to-Any

> **Day 14** · Path Problems · ★★★★☆ · 15 XP · 15 min read

---

Day 6 tracked **root-to-leaf** remainders downward. Day 7 bent paths with **bottom-up globals**. Today paths start **anywhere** and end anywhere — two tools: a **prefix-sum hashmap** on tree DFS (Path Sum III), and **bottom-up univalue length** combine (Longest Univalue Path).

> **Contrast (Day 7):** Day 7 global = cross-subtree through a node. Day 14 prefix map = count paths with target sum; univalue = same-value chain lengths upward.

---

## Part 1 — Learn the Pattern

### 1. What is the pattern?

**Two path families:**

| Problem shape | Technique | State |
|---|---|---|
| Count paths summing to target (any start/end) | Prefix-sum hashmap on DFS | `cnt[prefix]` + backtrack |
| Longest same-value path | Bottom-up length combine | Return arm lengths; global max |

### 2. Simple explanation

**Path Sum III:** On an array, count subarrays summing to `k` with `cnt[prefix_sum]`. On a tree, DFS **is** the path — carry running sum from root **down**; at each node, how many ancestors had prefix `current - target`? That's how many paths ending here sum to target. **Backtrack** the map when unwinding (sibling branches need clean state).

**Univalue path:** Each node asks children: *"Longest same-value chain you can offer through your edge to me?"* Combine left + right arms through current node; update global. Return **one** arm upward (the longer) — parent can only extend one side.

### 3. Visual — Prefix-sum hashmap on tree DFS

```
Tree:       10
           /  \
          5   -3
         / \    \
        3   2   11
       / \   \
      3  -2   1

Target = 8

DFS carries prefix sum from root (NOT required to start at root!)

At node 5 (prefix=15 from 10→5):
  cnt has {0:1, 10:1, 15:1} along current path
  Need prefix = 15-8 = 7 → count paths ending here summing to 8

Key insight: path 5→3 (5+3=8) starts at 5, not root.
Prefix map on downward walk catches ALL downward paths.

BACKTRACK at each unwind:
  cnt[sum] -= 1   ← sibling branch must not see this path's prefixes

  ┌─────────────────────────────────────────────┐
  │  cnt[0] = 1  (empty prefix before root)     │
  │  Enter node: sum += val                     │
  │  ans += cnt[sum - target]                   │
  │  cnt[sum] += 1                              │
  │  recurse children                           │
  │  cnt[sum] -= 1  ← BACKTRACK                 │
  └─────────────────────────────────────────────┘
```

### 4. Visual — Univalue bottom-up length combine

```
Tree:       5
           / \
          4   5
         / \   \
        1   1   5

At node 5 (leaf right): return (0, 0) — no same-value child
At node 5 (middle, val=5):
  left child 4 ≠ 5 → left arm = 0
  right child 5 = 5 → right arm = 1
  global = max(0, 0+1) = 1  (path: right child only)
  return (0, 1) — offer 1-step right arm upward

At node 5 (root):
  left: child 4 ≠ 5 → 0
  right: child 5 = 5 → right arm from child = 1 → +1 = 2
  global through root = 0 + 2 = 2  (path: root→right→right, three 5s?)

Trace carefully — return (leftArm, rightArm):
  leftArm  = longest same-value chain via LEFT child edge
  rightArm = longest same-value chain via RIGHT child edge
  global candidate = leftArm + rightArm (edges through node)
  return (leftArm, rightArm) for parent

  ┌─────────────────────────────────────────────┐
  │  GLOBAL: ans = max(ans, left + right)       │
  │  RETURN: (leftArm, rightArm) to parent      │
  │  Arm = childArm+1 IF child.val == node.val  │
  └─────────────────────────────────────────────┘
```

### 5. The universal template

**Prefix-sum on tree:**
```
cnt[0] = 1
function dfs(node, sum):
    if not node: return 0
    sum += node.val
    res = cnt[sum - target]
    cnt[sum] += 1
    res += dfs(left) + dfs(right)
    cnt[sum] -= 1          // backtrack
    return res
```

**Univalue bottom-up:**
```
function dfs(node):
    if not node: return (0, 0)
    (ll, lr) = dfs(left); (rl, rr) = dfs(right)
    left  = lr+1 if left.val==node.val else 0
    right = rl+1 if right.val==node.val else 0
    ans = max(ans, left + right)
    return (left, right)
```

### 6. Why naive approaches fail

| Naive | Problem |
|---|---|
| Fix root, DFS every start node | O(n²) — prefix map is O(n) |
| Root-to-leaf only (Day 6) | Misses paths starting at internal nodes |
| Univalue: return single int height | Need **two** arm lengths (left vs right) |
| Univalue: top-down same-value count | Can't see cross-subtree through node |

### 7. Day 14 vs Day 6–7

| | **Day 6** | **Day 7** | **Day 14** |
|---|---|---|---|
| Path start | Root only | Any node | Any node |
| Technique | Remainder down | Global cross-subtree | Prefix map OR univalue arms |
| Backtrack | Path list | None | Prefix map yes |

### 8. Pattern signals & recognition clues

| When the problem says… | Think… |
|---|---|
| "path sum" + "does not need to start at root" | Prefix-sum hashmap |
| "number of paths" (not list) | Count via map — likely #437 |
| "longest path same value" | Bottom-up dual-arm + global |
| "count edges vs nodes" | Univalue counts **edges** — off-by-one care |

**Keywords:** `cnt[sum - target]` · `backtrack` · `leftArm + rightArm` · `global ans`

### 9. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Forgetting `cnt[0] = 1` | Empty prefix before root — paths starting at current node |
| No backtrack on prefix map | Sibling subtrees pollute each other's counts |
| Using int for prefix sum (negatives) | Use `long long` / Python int |
| Univalue: returning `left + right` to parent | Return tuple of arms; parent uses one side only |
| Confusing Path Sum III with Path Sum I | I = root-to-leaf; III = any downward path |

### 10. Recognition drill

Read this problem aloud:

> *"Count paths with sum exactly target — path can start and end anywhere."*

Before coding, say:

> *"DFS with prefix map: ans += cnt[sum-target]; enter cnt[sum]++; recurse; leave cnt[sum]--. Init cnt[0]=1."*

---

*Prefix map counts bent sum paths; univalue arms bubble length up. First quest: Path Sum III. →*
