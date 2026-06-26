<!-- hand-authored -->
# 📝 DP with Decisions

> **Day 5** · DP with Decisions · 10 XP · 10 min read

---

E-Rank closes with **decisions at each index**: not "sum two prior states," but *"extend the current run or reset?"* and *"update the best buy price or skip?"* Stock #121 tracks a **running minimum buy**; Maximum Subarray uses **Kadane's extend-or-reset** trace. Both are one-pass O(n) — but the state story is what makes them DP, not greedy magic.

> **Preview contrast (Day 4 vs Day 5):** Day 4 = define table, fill by formula. Day 5 = at each i, **choose** extend vs reset (or update min vs compute profit).

---

## Part 1 — Learn the Pattern

### 1. What is the pattern?

**Optimal Decision at Each Step** — carry forward the best substructure **ending at** or **reachable by** index i.

Two E-Rank templates:

| Template | State (conceptual) | Decision at i |
|---|---|---|
| Running minimum | `minPrice` = cheapest buy so far | Sell today at `price[i] - minPrice`? Update max profit |
| Kadane extend-or-reset | `cur` = max sum subarray **ending at** i | Extend: `cur + nums[i]` vs Reset: `nums[i]` |

### 2. Simple explanation

**Stock:** You must buy before you sell. At each day, the only "memory" you need is the **lowest price seen so far** — that's your best buy opportunity. Profit if you sell today = today's price minus that min.

**Kadane:** At each index, either the best subarray ending here **includes** the previous best ending at i-1, or it **starts fresh** at i. Negative running sum? Reset beats extend.

### 3. Visual — Running min buy price (Stock #121)

```
prices = [7, 1, 5, 3, 6, 4]

Day:     0  1  2  3  4  5
price:   7  1  5  3  6  4
minSoFar:7  1  1  1  1  1   ← running min buy
profit:  0  0  4  2  5  3   ← price - minSoFar (if sold today)
maxProfit:     4     5  ← answer 5 (buy 1, sell 6)

No table needed — two scalars: minPrice, maxProfit
State story: "best profit if we sell no later than day i"
```

### 4. Visual — Kadane extend-or-reset trace

```
nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]

 i   nums[i]  extend(cur+nums[i])  reset(nums[i])  cur   best
 0     -2            —                 -2         -2     -2
 1      1            -1                  1          1      1
 2     -3            -2                 -3         -2      1
 3      4             2                  4          4      4   ← reset won
 4     -1             3                 -1          3      4
 5      2             5                  2          5      5
 6      1             6                  1          6      6   ← peak subarray [4,-1,2,1]
 7     -5             1                 -5          1      6
 8      4             5                  4          5      6

cur = max(reset, extend) = max(nums[i], cur + nums[i])
best = max(best, cur)
Answer: 6
```

### 5. Why these are DP (not "just greedy")

| Greedy suspicion | DP justification |
|---|---|
| "Always buy lowest" | minPrice is **optimal substructure** — best buy using days 0..i |
| "Extend when positive" | cur stores **best subarray ending exactly at i** — optimal substructure |
| Overlap | Same minPrice/cur reused for all future days — one pass |

State sentences:
- Stock: *"max profit achievable selling on or before day i with one transaction"*
- Kadane: *"max sum of subarray that must end at index i"*

### 6. Decision templates

```
// Running min (stock)
minPrice = INF
maxProfit = 0
for p in prices:
    minPrice = min(minPrice, p)
    maxProfit = max(maxProfit, p - minPrice)

// Kadane
cur = best = nums[0]
for i in 1..n-1:
    cur = max(nums[i], cur + nums[i])   // reset vs extend
    best = max(best, cur)
```

### 7. Day 5 vs earlier days

| Days 1–4 | Day 5 |
|---|---|
| Explicit dp[i] array common | Often O(1) scalars |
| Recurrence from i-1, i-2 | **Decision** at i: extend/reset, update min |
| Count/min cost on stairs | Profit/max subarray on arrays |

### 8. Pattern signals & recognition clues

| When the problem says… | Think… |
|---|---|
| "best time to buy and sell" (one transaction) | Running min buy |
| "maximum subarray sum" | Kadane extend-or-reset |
| "contiguous subarray" + max/min | Ending-at-i state |
| "must pick one buy, one sell" | Track min before max profit |

**Keywords:** `running min` · `extend or reset` · `cur` · `best` · `ending at i`

### 9. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Track max price instead of min buy | minPrice so far, not maxPrice |
| Kadane: global max without cur | cur = ending-at-i; best = global |
| Empty subarray when all negative | Kadane starts with nums[0] — at least one element |
| Confusing "skip day" with "reset subarray" | Reset = start new subarray at i |

### 10. Recognition drill

Read this problem aloud:

> *"Find the maximum sum of any contiguous subarray."*

Before coding, say:

> *"State: cur = max sum subarray ending at i. Decision: extend (cur+nums[i]) vs reset (nums[i]). best = max(best, cur). O(n) one pass."*

---

*Decisions, not just recurrences. First quest: running minimum buy price. →*
