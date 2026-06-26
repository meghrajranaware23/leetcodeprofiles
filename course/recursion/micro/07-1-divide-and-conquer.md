<!-- hand-authored -->
# 📝 Divide and Conquer

> **Day 7** · Split · Solve · Combine · 15 XP · 15 min read

---

Your mission today: **split the input in half**, solve each half recursively, then **combine** the half-answers. Merge sort is the canonical picture. Maximum Subarray adds a third candidate — the best sum **crossing** the midpoint.

---

## Part 1 — The Divide-and-Conquer Template

### 1. What is divide and conquer?

**Divide and conquer** — break a problem of size n into **two** subproblems of size ≈ n/2, solve each recursively, **merge** results.

Three explicit phases:

- **Divide** — split range `[lo, hi]` at `mid`
- **Conquer** — `leftAns = solve(lo, mid)`, `rightAns = solve(mid+1, hi)`
- **Combine** — merge sorted halves, or `max(left, right, cross)`

Unlike Day 6 (one halving call on exponent), you make **two** recursive calls on **disjoint halves** of the data.

### 2. Simple explanation

Sorting `[38, 27, 43, 3]`:

1. Split → `[38, 27]` and `[43, 3]`
2. Split again → singles (base case: one element is sorted)
3. **Combine upward** — merge `[27, 38]` and `[3, 43]` → `[3, 27, 38, 43]`

The combine step (merge) is where sorted order appears — children return sorted subarrays.

### 3. Visual — merge sort split/combine

```
SPLIT (down):

        [38, 27, 43, 3]
         /            \
    [38, 27]        [43, 3]
     /    \          /    \
  [38]  [27]      [43]   [3]   ← base: lo >= hi

COMBINE (up):

  [38] [27] → merge → [27, 38]
  [43]  [3] → merge → [3, 43]
  [27,38] + [3,43] → merge → [3, 27, 38, 43] ✓
```

Merge step compares front of each half, writes smaller to temp, advances pointer.

### 4. Visual — max subarray cross-midpoint

For `[-2, 1, -3, 4, -1, 2, 1, -5, 4]` at full range:

```
maxSub(lo, hi) = max(
    maxSub(left half),      // best entirely in left
    maxSub(right half),     // best entirely in right
    cross(lo, mid, hi)      // best spanning mid — CANNOT be missed!
)

cross: max sum ending at mid going left  +  max sum starting at mid+1 going right
       scan left from mid:  [4,-1,2] → best ending at mid = 6
       scan right from mid+1: [1,-5,4] → best starting = 5
       cross = 6 + 5 = 11  ← global answer for this problem
```

**Why cross matters:** The global max might straddle the split — neither left-only nor right-only recursion finds it alone.

### 5. The universal template

```
function solve(lo, hi):
    if base(lo, hi): return direct(lo, hi)
    mid = (lo + hi) / 2
    left  = solve(lo, mid)
    right = solve(mid + 1, hi)
    return combine(lo, mid, hi, left, right)
```

Merge sort: base `lo >= hi`; combine = merge. Max subarray: base `lo == hi` → `a[lo]`; combine = `max(left, right, cross)`.

### 6. Why brute force fails

| Approach | Problem |
|---|---|
| **Sort with nested loops (bubble)** | O(n²) — misses split structure |
| **Max subarray: all O(n²) subarrays** | Works for small n but O(n²) — Kadane is O(n) |
| **Merge sort without temp array** | Merge needs scratch space — O(n) extra |
| **Max subarray: only left + right, no cross** | Wrong — misses spanning subarrays |

### 7. Pattern signals for Day 7

| When the problem says… | Think… |
|---|---|
| "sort array" / merge halves | Divide, sort halves, merge |
| "maximum subarray" + recursion | Left, right, **cross** at mid |
| "split in half" / "midpoint" | `mid = lo + (hi-lo)/2` |
| "combine results" | Merge or max-of-three |
| "O(n log n) sort" | Merge sort divide-and-conquer |

**Keywords:** `divide` · `conquer` · `combine` · `mid` · `merge` · `cross sum`

### 8. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Forgetting cross sum in max subarray | Always third candidate at combine |
| `mid = (lo+hi)/2` overflow in other langs | Use `lo + (hi-lo)/2` |
| Merge without copying back | Loop `tmp` → `a[lo..hi]` |
| Only one recursive call | D&C needs **both** halves |
| Confusing D&C with binary recursion | D&C: two halves of **data**; Day 6: one halved **exponent** |

### 9. Recognition drill

Read this problem aloud:

> *"Sort an array using merge sort recursively."*

Before coding, say:

> *"Base: lo>=hi. Divide at mid. Recurse both halves. Combine: merge into temp. Trace split on [3,1,4,2]."*

---

*You see split and combine. First quest: merge sort. →*
