<!-- hand-authored -->
# 📝 Partition Problems

> **Day 19** · Partition Problems · ★★★★☆ · 25 XP · 15 min read

---

B-Rank Day 17 introduced **k-bucket assignment**: place each number into one of `k` equal-sum groups, prune when a bucket overflows, skip duplicate empty buckets. Today you sharpen that pattern on two Medium classics — one where `k` is fixed at **4**, and one where you revisit **#698** with the full pruning toolkit.

The skeleton is not new. The art is recognizing **when buckets are interchangeable** and applying **sorted-sticks pruning** so dead branches die early.

---

## Part 1 — Learn the Pattern

### 1. The k-bucket template (Day 17 recap)

You already saw this on Day 17:

```
dfs(nums, i, sides[], target):
    if i == n:  return all sides == target
    for j in 0..k-1:
        if sides[j] + nums[i] > target: continue   // overflow prune
        if j > 0 && sides[j] == sides[j-1]: continue   // duplicate-bucket prune
        sides[j] += nums[i]                          // CHOOSE bucket
        if dfs(i+1): return true                     // EXPLORE
        sides[j] -= nums[i]                          // UNCHOOSE
    return false
```

**What shrinks:** index `i` — one stick/number placed per call.

**State:** `sides[]` holds running sums of each bucket. Buckets are **unlabeled** — swapping bucket 0 and bucket 1 is the same partition.

### 2. Why duplicate-bucket pruning works

Empty buckets are identical. If bucket 0 and bucket 1 both hold `0`, placing stick `5` in bucket 0 is the same partition as placing it in bucket 1.

```
sides = [0, 0, 0, 0], next stick = 5

Try bucket 0 → [5, 0, 0, 0]
Try bucket 1 → [0, 5, 0, 0]   ← same partition, explored twice!

Fix: if sides[j] == sides[j-1], skip j
```

This is the same **sort + skip-same-at-level** idea from Day 11 dedup — but applied to **bucket sums** instead of array values.

### 3. Sorted-sticks pruning (the B-Rank upgrade)

Sort matchsticks **descending** before DFS. Place the largest sticks first.

```
matchsticks = [1, 1, 2, 2, 2, 2]   sorted desc → [2, 2, 2, 2, 1, 1]
target = 4

Place 2 first → forces early commitment to a bucket
If a branch fails with the big stick, prune immediately
Small sticks at the end have fewer ways to "rescue" a bad layout
```

Why it helps: a failed branch with a large stick is discovered sooner. Without sorting, you might waste depth placing `1`s before discovering a `2` cannot fit.

**Pre-check:** if `sum % k != 0`, return false immediately — no partition exists.

### 4. Matchsticks to Square (#473) — k = 4 frozen

**Problem:** Can you rearrange matchsticks into a square? Four equal sides.

This is **exactly** k-bucket with `k = 4`:

| Step | Action |
|---|---|
| Sum all sticks | `total = 8` → side = `2` |
| `total % 4 != 0` | Impossible |
| Sort descending | Largest sticks first |
| `sides = [0,0,0,0]` | Four unlabeled buckets |
| DFS | Place each stick in a bucket ≤ target |

```
matchsticks = [1,1,2,2,2], target = 2

i=0, stick=2: try bucket0 → sides=[2,0,0,0]   ← one side full
  i=1, stick=2: bucket1: [2,2,0,0]
    i=2, stick=2: bucket2: [2,2,2,0]
      i=3, stick=1: bucket3: [2,2,2,1] ✗ overflow → backtrack
      ... valid layout: [2], [2], [1+1], [1+1] → all sides = 2 ✓
```

Answer: `true` — one valid assignment fills all four sides to 2.

### 5. Partition K Subsets (#698) — general k

Same code, different `k`:

```
nums = [4,3,2,3,5,2,1], k = 4
sum = 20, target = 5
```

The DFS skeleton is **identical**. Only `k` and the overflow check change.

On Day 17 you learned the pattern. Today you **revisit** it after seeing the 4-bucket special case — the insight should feel automatic now.

### 6. Contrast: 4-equal-side vs k-bucket

| | Matchsticks to Square (#473) | Partition K Subsets (#698) |
|---|---|---|
| **k value** | Fixed at 4 | Given as input |
| **Pre-check** | `sum % 4 != 0` | `sum % k != 0` |
| **Buckets** | Four sides of a square | k arbitrary groups |
| **DFS skeleton** | Same | Same |
| **Pruning** | Sort desc + overflow + duplicate bucket | Same |
| **Return** | `true` / `false` | `true` / `false` |

**Recognition shortcut:** If the problem mentions "square", "four equal sides", or "four groups" — it's k-bucket with `k=4`. If it says "partition into k subsets" — parameterize `k`.

Both are **assignment backtracking**, not string partition (Day 14) and not include/exclude subset generation (Day 11).

### 7. Visual — bucket assignment tree (simplified)

```
sticks [3, 2, 1], target = 3, k = 2

                    sides=[0,0]
                   /    |    \
           bucket0   bucket1  (skip dup)
           [3,0]     [0,3]
            /  \       /  \
        [3,2] [3,0] [0,3,2] ...
         ✗>3  ...    ...
```

Each level picks **which bucket** gets the next stick — not whether to include the stick (every stick must be placed).

### 8. Why brute force fails

| Brute force | Problem |
|---|---|
| Try all permutations of sticks into 4 labeled slots | 4^n assignments — most overflow |
| Generate all subsets of size n/4, check sums | Hard to chain four disjoint subsets |
| No sort — place small sticks first | Fails late; explores huge dead subtrees |
| No duplicate-bucket skip | Explores symmetric partitions 4× (or k×) |
| Skip `sum % k` check | Wastes full DFS on impossible inputs |

### 9. Pattern signals & recognition clues

| When the problem says… | Think… |
|---|---|
| "form a square" / "four equal sides" | k-bucket, k=4 |
| "partition into k equal subsets" | k-bucket, general k |
| "assign each element to a group" | Bucket loop, not subset include/exclude |
| "equal sum" + every element used once | Sum pre-check + target = sum/k |
| array length ≤ 16, Medium | Backtracking with pruning, not DP |

**Keywords:** `partition` · `equal sum` · `k subsets` · `square` · `matchsticks` · `bucket`

### 10. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Treating as subset generation (include/exclude) | Every element must go into **some** bucket |
| Labeled buckets (bucket 0 ≠ bucket 1 when both empty) | Skip when `sides[j] == sides[j-1]` |
| Ascending sort | Sort **descending** — fail fast on large sticks |
| Forgetting `sum % k` guard | O(1) impossibility check before DFS |
| Not undoing bucket add | `sides[j] -= nums[i]` after failed recurse |

### 11. Recognition drill

Read this aloud:

> *"Given matchstick lengths, return true if you can use all of them to form a square."*

Before coding, say:

> *"Four equal buckets, target = sum/4. Sort desc. DFS: try each bucket, overflow prune, skip duplicate empty buckets. Same as Day 17 with k=4."*

Read this variant:

> *"Given an array and integer k, return true if it can be partitioned into k equal-sum subsets."*

Before coding, say:

> *"Identical skeleton — k buckets, target = sum/k. I already solved this on Day 17; today I add the matchsticks framing."*

---

## Part 2 — What's Next

Today's quests:

1. **Matchsticks to Square #473** — k=4 special case, sorted-sticks prune
2. **Partition K Subsets #698 (revisited)** — same code, general k

Trace one stick placement on paper before opening LeetCode. Mark each bucket add and undo.

---

*Four buckets, one skeleton. First quest: build a square from sticks. →*
