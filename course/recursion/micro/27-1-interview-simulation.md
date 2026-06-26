<!-- hand-authored -->
# 📝 Interview Simulation

> **Day 27** · Interview Simulation · 20 XP · 15 min read

---

In real interviews, two memo problems look **almost identical** on first read: both say *"given nums and a target, can/how many ways…"* Both use recursion + memo. But picking the **wrong memo shape** costs you the problem.

Your mission today: learn to distinguish **ordered combination counting** from **0/1 subset knapsack** in under 30 seconds — then code the right template under time pressure.

---

## Part 1 — Two Memos That Look Alike

### 1. The interview trap

| | Combination Sum IV #377 | Partition Equal Subset Sum #416 |
|---|---|---|
| **Question** | How many **ordered** sequences sum to target? | Can array split into **two equal-sum** subsets? |
| **Reuse elements?** | Yes — same num can appear many times | No — each element once (include or skip) |
| **Order matters?** | **Yes** — `[1,2]` ≠ `[2,1]` | **No** — subset membership only |
| **Return type** | Count (integer) | Boolean |
| **Memo key** | `target` only (1D) | `(index, remaining)` (2D) |
| **Loop style** | `for x in nums: dfs(target - x)` | `include(nums[i]) OR skip(nums[i])` |
| **Reduce target?** | Subtract chosen value | Subtract on include; unchanged on skip |

Both shrink a number on each call. Both cache overlapping subproblems. **The memo dimension tells you which problem you're in.**

### 2. Side-by-side — same nums, different questions

`nums = [1, 2, 3]`, `target = 4`

**Combination Sum IV** — order matters, reuse allowed:

```
ways(4) = ways(3) + ways(2) + ways(1)
        = ways(4-1) + ways(4-2) + ways(4-3)

ways(3) includes [1,1,1], [1,2], [2,1]  ← [1,2] and [2,1] BOTH count
ways(4) = 7 total ordered sequences

Memo: memo[target] = sum of memo[target - x] for each x in nums
Key: just target (1D array size target+1)
```

**Partition Equal Subset Sum** — each element once, order irrelevant:

```
total = 6 → need subset summing to 3 (half)

dfs(i, rem): include nums[i] OR skip nums[i]
  dfs(i+1, rem - nums[i])  OR  dfs(i+1, rem)

[1,2] and [2,1] are the SAME subset — only include/skip per index

Memo: memo[i][rem] = boolean
Key: (index, remaining) — 2D
```

### 3. Visual — memo tree shapes

**Ordered counting (377)** — fan out from target, reuse nums:

```
                    ways(4)
           /         |         \
      ways(3)     ways(2)     ways(1)
      / | \       / | \       / | \
   w(2) w(1) w(0) ...       ...
   
Same target reached by different paths → different orderings → all counted
Memo[target] stores total count
```

**0/1 subset (416)** — walk index, binary include/skip:

```
              dfs(0, rem=3)
             /              \
    include nums[0]=1      skip
    dfs(1, rem=2)          dfs(1, rem=3)
       /    \                 /    \
  inc  skip              inc   skip
  ...  ...                ...   ...

Each index visited once — no reuse
Memo[i][rem] stores true/false
```

### 4. Recognition in 30 seconds

Before coding, ask three questions:

| Question | If YES → | If NO → |
|---|---|---|
| Does **order** of picks matter? | Ordered combo memo (#377) | Subset / 0-1 memo (#416) |
| Can the **same element** be reused? | Loop all nums at every target (#377) | Advance index `i+1` on both branches (#416) |
| Need **boolean** or **count**? | Count → sum children; Bool → OR children | — |

**One-liners for interviews:**

> *"Ordered ways to hit target with reuse → 1D memo on target, loop nums each call."*

> *"Split into equal subset → 2D memo on (index, rem), include OR skip, no reuse."*

### 5. Why brute force fails (both)

| Brute force | Problem |
|---|---|
| Enumerate all sequences for #377 | Exponential — overlap on same target |
| Enumerate all 2^n subsets for #416 | Exponential — overlap on same (i, rem) |
| Use start-index combo template on #377 | Misses order — treats [1,2] and [2,1] as one |
| Use 1D target memo on #416 | Loses index — can't enforce single-use |

### 6. Common interview mistakes

| Mistake | Fix |
|---|---|
| Start-index combo on #377 | Order matters — loop ALL nums every call, no start index |
| Allow reuse on #416 | Each index once — always `i+1` on both branches |
| Forget odd-sum early exit (#416) | `sum % 2 != 0` → false immediately |
| No memo on either | Both have overlapping subproblems — cache results |
| Confuse #377 with #39 | #39 = unordered combos (start index); #377 = ordered (no start index) |

### 7. Pattern signals — speed drill

| When the problem says… | Memo type | Key |
|---|---|---|
| "combination sum IV" / "ordered" / "permutation of sums" | Ordered combo | `memo[target]` |
| "how many ways" + reuse + order matters | Ordered combo | 1D on target |
| "partition equal subset" / "split into two" | 0/1 subset | `memo[i][rem]` |
| "can you partition" / "subset sum" | 0/1 subset | include OR skip |
| "each element used once" | 0/1 subset | index advances |

**Keywords:** `ordered` · `reuse` · `1D memo` · `include/skip` · `0/1` · `2D memo` · `partition`

### 8. Recognition drill — say it aloud

> *"Count ordered sequences from nums that sum to target, reuse allowed."*
>
> → **Combination Sum IV.** `dfs(target)`: base `target==0 → 1`, loop all nums, `sum dfs(target-x)`. Memo on target.

> *"Can nums partition into two subsets with equal sum?"*
>
> → **Partition Equal Subset Sum.** `sum/2` target. `dfs(i, rem)`: include OR skip, memo on `(i, rem)`.

---

*You know both memos. Quest 1 is ordered counting under time pressure. →*
