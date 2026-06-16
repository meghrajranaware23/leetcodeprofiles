<!-- hand-authored -->
# 📝 Pruning Strategies

> **Day 17** · Pruning Strategies · ★★★★☆ · 25 XP · 15 min read

---

Days 13 and 15 taught you **combination sum backtracking** — pick elements forward, track a running total, stop when the sum overshoots. Today you extend that idea: same decision-tree skeleton, but the **pruning rule** changes with the problem shape.

Two new families:

1. **Sign-choice tree** — each element gets `+` or `-` (Target Sum #494)
2. **K-bucket assignment** — each element goes into one of `k` bins that must each hit the same target (Partition K Equal Sum Subsets #698)

Both are backtracking. Both prune dead branches early instead of exploring the full exponential tree.

---

## Part 1 — Learn the Pattern

### 1. What changed from combination sum?

| Combination Sum (Day 13/15) | Day 17 pruning problems |
|---|---|
| Include element or skip | **Target Sum:** add or subtract |
| One running sum toward one target | **K subsets:** `k` bucket sums, each capped at `target` |
| Prune when `rem < 0` | Prune when bucket would exceed `target`, or sign tree can't recover |
| Build a combo list | Count ways (#494) or return yes/no (#698) |

The skeleton is still **choose → explore → unchoose**. What changes is **what you choose** and **when you cut a branch**.

### 2. Target Sum — the +/- sign tree

Given `nums` and `target`, assign `+` or `-` to each number. Count ways the signed sum equals `target`.

```
nums = [1, 2], target = 1   (solution tracks remaining target)

dfs(i=0, t=1)
├── t - nums[0] → dfs(1, 0)
│   ├── t - 2 → dfs(2, -2) → miss ✗
│   └── t + 2 → dfs(2,  2) → miss ✗
└── t + nums[0] → dfs(1, 2)
    ├── t - 2 → dfs(2, 0) → i==2, t==0 → 1 way ✓  (+1-2=1)
    └── t + 2 → dfs(2, 4) → miss ✗

Answer: 1 way
```

Trace `nums = [1, 1, 1, 1, 1], target = 3`:

```
At each index, branch:
  subtract nums[i] from running total  OR  add nums[i]

Leaf (i == n): count 1 if total == 0 (relative to how you track it)

With memo on (index, running_total): overlapping subtrees collapse
```

**State:** `(index i, current signed sum)`.  
**Base:** `i == n` → return 1 if sum matches target, else 0.  
**Recurse:** `dfs(i+1, sum - nums[i]) + dfs(i+1, sum + nums[i])`.

This is **not** include/exclude — you always use every element; you only pick its sign.

### 3. Running-sum prune (sign tree)

Before memo, a naive +/- tree is `O(2^n)`. Pruning helps when you can prove a branch cannot reach the target:

```
If remaining elements are all positive and current_sum already exceeds target
by more than the sum of remaining → cut branch
```

In practice, **memoization on `(i, sum)`** is the standard AC approach — the same subproblem `(i, t)` is reached by different sign choices upstream.

Bridge to Day 13: Combination Sum prunes when `rem < 0`. Target Sum prunes implicitly when memo hits — you've already computed `(i, t)`.

### 4. Partition K Equal Sum Subsets — k-bucket fill

Given `nums` and `k`, can you split into **exactly k non-empty subsets** with **equal sum**?

```
nums = [4, 3, 2, 3, 5, 2, 1], k = 4
total = 20 → target = 5 per bucket

Buckets: [0, 0, 0, 0]

Place 4 → bucket0=4
Place 3 → bucket0=7 > 5 ✗ backtrack
Place 3 → bucket0=4, bucket1=3 ... eventually:

[5], [5], [5], [5]  ✓  e.g. {4,1}, {3,2}, {3,2}, {5}
```

**State:** `(index i, sides[0..k-1])`.  
**Base:** `i == n` → all sides equal `target`.  
**Loop:** try placing `nums[i]` into bucket `j`:

```
if sides[j] + nums[i] > target: continue   // PRUNE — bucket overflow
if j > 0 && sides[j] == sides[j-1]: continue  // skip duplicate empty buckets
sides[j] += nums[i]
if dfs(i+1): return true
sides[j] -= nums[i]                         // UNCHOOSE
```

### 5. Why skip equal empty buckets?

Buckets are **unlabeled**. Putting `4` in bucket 0 vs bucket 1 when both are empty produces the same partition — double work.

```
sides = [0, 0, 0, 0]
Try bucket 0 first ✓
Skip bucket 1 when sides[1]==sides[0]==0 — same state as bucket 0
```

Same dedup philosophy as Day 11's `j > start && nums[j]==nums[j-1]`, but on **bucket sums** instead of array values.

### 6. Sort descending — early failure prune

Place **largest numbers first**. If a partition is impossible, you fail fast:

```cpp
sort(nums.rbegin(), nums.rend());  // descending
```

A big number that doesn't fit any bucket kills the branch immediately.

### 7. Bridge from Days 13 and 15

| Day 13 Combination Sum | Day 17 K-Subsets |
|---|---|
| One combo summing to `target` | **k** combos each summing to `target = sum/k` |
| Include at `i` or skip to `i+1` | Place `nums[i]` into bucket `j` |
| `rem < 0` prune | `sides[j] + nums[i] > target` prune |
| Reuse allowed (#39) | Each element used once |

| Day 15 Combination Sum III | Day 17 Target Sum |
|---|---|
| Pick k digits 1–9 summing to n | Pick +/- for all n nums summing to target |
| Forward index, fixed count | Every element used — two branches per index |
| Prune when `n <= 0` or `k == 0` | Memo on `(i, running_sum)` |

You already know **running-sum tracking** and **forward assignment**. Day 17 applies those instincts to sign trees and multi-bucket fills.

### 8. Why brute force fails

| Brute force | Problem |
|---|---|
| Enumerate all `2^n` sign assignments, filter | No memo — recomputes identical `(i, sum)` subtrees |
| Try every partition of n elements into k groups | `O(k^n)` without bucket-overflow prune |
| Label buckets 0..k-1 without skip-dedup | Explores same partition k! times |
| Place smallest elements first | Harder to fail early; more branches before impossibility is obvious |

**The insight:** Name the state `(i, sum)` or `(i, sides[])`, prune before recursing, and memoize or skip symmetric choices.

### 9. Pattern signals & recognition clues

| When the problem says… | Think… |
|---|---|
| "assign + or -" / "target sum ways" | Sign-choice tree + memo on `(i, sum)` |
| "partition into k equal subsets" | k buckets, target = total/k, overflow prune |
| "can you divide" + equal sums | Sort desc, skip duplicate empty buckets |
| "how many ways" + assign signs | Count at leaves, memoize |
| combination sum + every element used | Not skip/include — different branch semantics |

**Keywords:** `target sum` · `partition` · `k subsets` · `equal sum` · `prune` · `bucket` · `+/−`

### 10. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Treating Target Sum as include/exclude | Every element is used — only sign varies |
| Forgetting `sum % k != 0` early exit | Impossible partition — return false immediately |
| Not skipping equal empty buckets | `j > 0 && sides[j] == sides[j-1]` |
| Missing undo on bucket assignment | `sides[j] -= nums[i]` after failed dfs |
| No memo on Target Sum | TLE — add `memo[i][sum]` |

### 11. Recognition drill

Read this problem aloud:

> *"Given an integer array and an integer k, return true if it is possible to divide into k non-empty subsets whose sums are all equal."*

Before coding, say:

> *"K-bucket backtracking. target = sum/k. Prune overflow. Sort descending. Skip duplicate empty buckets. Undo after explore."*

Read this variant:

> *"You are given a list of numbers and a target. Return the number of ways to assign + or - so the result equals target."*

Before coding, say:

> *"Sign-choice tree at each index. Two branches: subtract or add nums[i]. Memo on (i, running_sum). Base: i==n, check sum==target."*

---

## Part 2 — What's Next

Today's quests apply two pruning templates:

1. **Target Sum #494** — +/- sign tree with memo
2. **Partition to K Equal Sum Subsets #698** — k-bucket fill with target-sum prune

Draw the tree before you code. Mark where branches get cut — that's the whole lesson.

---

*You understand pruning beyond combination sum. First quest: count the sign assignments. →*
