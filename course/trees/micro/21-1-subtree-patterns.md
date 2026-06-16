<!-- hand-authored -->
# 📝 Subtree Patterns: Sum, Count, Compare

> **Day 21** · Subtree Patterns · ★★★★☆ · 25 XP · 15 min read

---

Some problems need **every subtree's aggregate** (sum, count, frequency). Others need **root-to-node state** (max so far on the path). Today pairs **postorder subtree sum + hashmap** with **top-down max tracking** — the same tree, opposite information flow.

> **Link (Day 6):** [Top-Down DFS](../06-1-top-down-dfs.md) carried remainder and path lists downward. Good nodes uses the same engine with **max-so-far** instead of sum.

---

## Part 1 — Learn the Pattern

### 1. What is the pattern?

**Postorder subtree aggregate + top-down path max** — dual toolkit:

| Direction | Returns / carries | Side effect |
|---|---|---|
| **Postorder sum** | Subtree sum upward | Hashmap frequency count |
| **Top-down max** | `maxSoFar` parameter down | Count good nodes |

### 2. Simple explanation

**Most Frequent Subtree Sum:** Each node computes `sum = val + leftSum + rightSum`, records it in a frequency map, returns sum to parent. After one DFS, find sum(s) with highest count.

**Good Nodes:** A node is "good" if `val >= maxSoFar` on the path from root. Carry `maxSoFar = max(maxSoFar, val)` down; count nodes that qualify.

### 3. Visual — Postorder subtree sum + frequency map

```
Tree:     5
         / \
        2  -3

POSTORDER bubble:

dfs(2):  sum=2,  map{2:1}
dfs(-3): sum=-3, map{2:1, -3:1}
dfs(5):  sum=5+2+(-3)=4, map{2:1, -3:1, 4:1}

If another subtree also sums to 4, increment map[4].

At each node AFTER children return:
  sum = node.val + leftSum + rightSum
  freq[sum]++
  return sum

Then scan map for max frequency → return all keys tied.
```

### 4. Visual — Top-down max-so-far (Day 6 link)

```
Tree:     3
         / \
        1   4
       /   / \
      3   1   5

dfs(3, max=-∞): good ✓ (3>=-∞), maxSoFar=3
  dfs(1, 3): not good (1<3), max=3
    dfs(3, 3): good ✓ (3>=3)
  dfs(4, 3): good ✓, max=4
    dfs(1, 4): not good
    dfs(5, 4): good ✓

Good count = 4

STATE DOWN (Day 6 family):
  maxSoFar tightens as larger values appear on path
  no backtrack needed — just count
```

### 5. The universal template

**Subtree sum + frequency:**
```
map freq
function dfs(node):
    if null: return 0
    s = node.val + dfs(left) + dfs(right)
    freq[s]++
    return s
// after dfs(root): keys with freq == max(freq.values())
```

**Top-down good nodes:**
```
function dfs(node, maxSoFar):
    if null: return 0
    good = node.val >= maxSoFar ? 1 : 0
    maxSoFar = max(maxSoFar, node.val)
    return good + dfs(left, maxSoFar) + dfs(right, maxSoFar)
```

| Problem | Flow | Key |
|---|---|---|
| Most Frequent Subtree Sum #508 | Postorder + map | Return sum, count freq |
| Count Good Nodes #1448 | Top-down | maxSoFar from Day 6 |

### 6. Why brute force fails

| Brute force | Problem |
|---|---|
| Recompute subtree sum per node from scratch | O(n²) — postorder O(n) |
| Store all subtree sums in array, sort | O(n log n) unnecessary |
| Good nodes: check all ancestors per node | O(n·h) — one path param O(h) |
| BFS for subtree sums | DFS postorder is natural |
| Good nodes bottom-up | Need path-from-root max, not subtree |

### 7. Day 21 vs Day 6 — when to use which

| | **Day 6 Top-Down** | **Day 21 Postorder Map** |
|---|---|---|
| Question | "On path from root…?" | "Whole subtree total?" |
| State | Parameter down | Return up |
| Example | Path sum, good nodes | Subtree sum frequency |
| Backtrack | Often (path lists) | Never |

Good nodes = Day 6 without backtrack — just count + max param.

### 8. Pattern signals & recognition clues

| When the problem says… | Think… |
|---|---|
| "subtree sum" / "sum of all nodes in subtree" | Postorder return sum |
| "most frequent" / "count occurrences" | Hashmap on return |
| "good if no smaller on path to root" | Top-down maxSoFar |
| "max on path from root" | Day 6 parameter |
| "each subtree" | Postorder aggregate |

**Keywords:** `return sum` · `freq[s]++` · `maxSoFar` · `path from root`

### 9. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Updating map before children return | Postorder — children first |
| Good nodes: compare to parent only | Compare to **maxSoFar** on full path |
| Forgetting INT_MIN / -inf start | Root always good |
| Returning freq from dfs instead of sum | Return sum; map is side effect |
| Good nodes bottom-up | Max on path requires top-down |

### 10. Recognition drill

Read this problem aloud:

> *"Return all subtree sums that appear most frequently."*

Before coding, say:

> *"Postorder: return subtree sum, increment freq[sum]. After traversal, collect keys at max freq."*

---

*Subtrees aggregate up; path max flows down. First quest: subtree sum frequency. →*
