<!-- hand-authored -->
# 📝 Take or Skip

> **Day 6** · Take or Skip · ★★★☆☆ · 15 XP · 15 min read

---

Day 5 taught **decisions at each step** — buy/sell, hold/cash. Today the decision narrows to two branches only: **take this item** or **skip it**. You fill a **1D table left-to-right**; each cell stores the best answer for the prefix ending at index `i`. House Robber is the canonical shape.

> **Preview contrast (Day 5 vs Day 6):** Day 5 = state machine (hold / sold / rest). Day 6 = **two choices per index** — `max(take, skip)` on a line. Same DP pipeline; simpler visual.

---

## Part 1 — Learn the Pattern

### 1. What is the pattern?

**Take or Skip (Include / Exclude) DP** — at each position, either include the current element (with a constraint) or exclude it and keep the best from before.

- **State** — `dp[i]` = best value using elements `0..i` (or ending at `i`, depending on problem)
- **Two branches** — **skip:** `dp[i-1]` · **take:** `dp[i-2] + value[i]` when adjacent picks are forbidden
- **1D table** — fill index `0 → n-1` (or `1 → n` with a sentinel row)
- **Space trick** — only `prev2` and `prev1` needed once transitions depend on two prior cells

### 2. Simple explanation

Walk a street of houses. At each door you ask: *"Do I rob this one?"* If you rob it, you cannot rob the neighbor you just passed — so your loot is **what you had two doors back** plus this house's value. If you skip, you keep **whatever was best one door back**. You never revisit a door; the table records the answer once.

### 3. Visual — 1D table fill (House Robber shape)

```
nums:     [2]   [7]   [9]   [3]   [1]
           │     │     │     │     │
At i:   skip? take? skip? take? skip?

  dp[i]  = max( SKIP dp[i-1] ,  TAKE dp[i-2] + nums[i] )

  i:      0     1     2     3     4
  dp:     2     7     11    11    12
          ↑     ↑     ↑     ↑     ↑
        base  max(2,  max(2+9, max(7+3, max(11,
              7)    7+9)   11)    11+1)

  prev2 / prev1 rolling:
  i=0: prev2=0, prev1=2
  i=1: prev2=2, prev1=7
  ...
```

**Not a decision tree you draw for every index** — one recurrence, one left-to-right sweep.

### 4. Visual — take vs skip at one cell

```
At index i = 3, nums[3] = 3:

  SKIP ──→ dp[2] = 11        (don't touch house 3)
  TAKE ──→ dp[1] + 3 = 10    (rob house 3; can't use dp[2] — neighbor)

  dp[3] = max(11, 10) = 11
```

### 5. The universal template

```
function takeOrSkip(nums):
    prev2 = 0
    prev1 = 0
    for num in nums:
        curr = max(prev1, prev2 + num)
        prev2 = prev1
        prev1 = curr
    return prev1
```

Tabulated form: `dp[i] = max(dp[i-1], dp[i-2] + nums[i])`, base `dp[0] = nums[0]`, `dp[1] = max(nums[0], nums[1])`.

### 6. When take/skip applies

| Signal | Meaning |
|---|---|
| "Maximum sum, no two adjacent" | Classic take/skip on a line |
| "Rob houses" / "select non-adjacent" | Same recurrence |
| "Delete and earn" | **Compress first** — then take/skip on values (today's second quest) |
| "How many ways to decode" | **Not Day 6** — that's **sum** transitions (Day 7) |

### 7. Day 5 vs Day 6 — the contrast

| | **Day 5 — State Machine** | **Day 6 — Take or Skip** |
|---|---|---|
| States per day | hold, sold, rest (multiple) | two branches: take / skip |
| Table shape | often 1D with meaning per state | 1D, one scalar per prefix |
| Transition | `max` over business rules | `max(dp[i-1], dp[i-2]+val)` |
| Example | Best Time to Buy/Sell Stock | House Robber |
| Visual | state diagram | **1D array left-to-right** |

If the problem is "pick some items on a line with an adjacency rule," think Day 6 before knapsack.

### 8. Pattern signals & recognition clues

| When the problem says… | Think… |
|---|---|
| "non-adjacent" / "cannot pick neighbors" | Take/skip — jump back 2 on take |
| "maximum sum" on a sequence | Often `max`, not `sum` |
| "rob" / "delete and earn" | Take/skip (earn may need freq compression) |
| "how many ways" | **Day 7 counting** — use `+`, not `max` |
| "minimum cost path in grid" | **Day 8** — `min` on a 2D table |

**Keywords:** `take or skip` · `include exclude` · `non-adjacent` · `dp[i-1]` · `dp[i-2]` · `prev2 prev1`

### 9. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Using `dp[i-1] + nums[i]` on take | Adjacency forbids the immediate neighbor — use `dp[i-2]` |
| Confusing max-sum with count-ways | Day 6 = **max**; Day 7 decode = **sum** of branches |
| Forgetting freq compression (Delete and Earn) | Collapse duplicates into `earn[v]` before take/skip |
| Returning `dp[n]` when state ends at `n-1` | Match your index convention to the answer cell |
| Drawing a full binary tree instead of filling 1D | The table *is* the compressed tree |

### 10. Recognition drill

Read this problem aloud:

> *"Given an array, find the maximum sum of non-adjacent elements."*

Before coding, say:

> *"Day 6 take/skip: dp[i] = max(dp[i-1], dp[i-2] + nums[i]). Fill 1D left-to-right. Space: prev2/prev1. Answer: last cell or rolling prev1."*

---

*The 1D table is your map. First quest: rob the street. →*
