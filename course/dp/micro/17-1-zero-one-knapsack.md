<!-- hand-authored -->
# 📝 0/1 Knapsack

> **Day 17** · 0/1 Knapsack · ★★★★☆ · 25 XP · 15 min read

---

Day 6 taught **take or skip** on a line — one scalar rolling forward. Day 17 adds **capacity**: each item has weight and value, you pick a subset that **fits** and **maximizes total value**. Each item is used **at most once** — that's the **0/1** rule. Today's quests disguise knapsack as subset sum and signed targets; the table is the same.

> **Preview contrast (Day 6 vs Day 17):** Day 6 = `max(skip, take)` with **no weight limit**. Day 17 = same binary choice, but **take** only if `weight[i] ≤ w`, state is **`dp[i][w]`** — items × capacity.

---

## Part 1 — Learn the Pattern

### 1. What is the pattern?

**0/1 Knapsack DP** — for each item, decide **include once** or **exclude**, respecting a capacity budget.

- **State** — `dp[i][w]` = best value using items `0..i-1` with capacity exactly up to `w`
- **Transition** — `dp[i][w] = max(dp[i-1][w], dp[i-1][w-weight[i]] + value[i])` if item fits; else skip only
- **Variants today** — max value, boolean reachability (`||`), count ways (`+=`)
- **Space trick** — 1D array `dp[w]`, iterate `w` **right-to-left** when processing each item (0/1 guard)

### 2. Simple explanation

Walk items one by one. At each item ask: *"With capacity w, am I better off **without** this item (look at row above) or **with** it (look at remaining capacity in row above)?"* You can't use the same item twice — that's why inner loops go **backwards** in the 1D compression.

Day 6 robber is knapsack where **weight = 1** for every house and capacity = "how many you can take with adjacency rules" — different constraint, same include/exclude DNA.

### 3. Visual — dp[i][w] table (canonical 0/1 knapsack)

```
Items:  weight [1, 3, 4]   value [15, 20, 30]   capacity W = 4

        w=0   w=1   w=2   w=3   w=4
i=0     0     0     0     0     0      (no items)
i=1     0    15    15    15    15      item1: w=1 v=15
i=2     0    15    15    20    35      item2: w=3 v=20  → dp[2][4]=max(15,15+20)=35
i=3     0    15    15    20    35      item3: w=4 v=30  → take needs w=4, 15+30=45? 
                                              skip 35, take 0+30=30 → still 35

Answer: dp[3][4] = 35  (items 1 and 2)

Cell dp[i][w] depends on row i-1 only → compress to 1D dp[w]
```

### 4. Visual — take vs skip at one cell

```
At item i, capacity w:

  SKIP:  dp[i-1][w]           (don't use item i)
  TAKE:  dp[i-1][w-wt[i]] + val[i]   (only if wt[i] <= w)

  dp[i][w] = max(skip, take)

Example dp[2][4] with item (w=3, v=20):
  skip = dp[1][4] = 15
  take = dp[1][1] + 20 = 15 + 20 = 35  ✓
```

### 5. Templates

**2D table:**
```
for i in 1..n:
  for w in 0..W:
    dp[i][w] = dp[i-1][w]
    if weight[i-1] <= w:
      dp[i][w] = max(dp[i][w], dp[i-1][w-weight[i-1]] + value[i-1])
return dp[n][W]
```

**1D compressed (0/1 — reverse w):**
```
dp = [0]*(W+1)
for each item (wt, val):
  for w in W down to wt:
    dp[w] = max(dp[w], dp[w-wt] + val)
return dp[W]
```

**Boolean subset sum (Partition quest):**
```
dp[0] = true
for num in nums:
  for j in target down to num:
    dp[j] = dp[j] or dp[j-num]
```

### 6. Day 6 vs Day 17 — side by side

| | **Day 6 Robber** | **Day 17 0/1 Knapsack** |
|---|---|---|
| Choice | take / skip | take / skip |
| Constraint | no adjacent | capacity `w` |
| State | `prev1`, `prev2` scalars | `dp[i][w]` table |
| Take cost | `nums[i]` | `weight[i]`, gain `value[i]` |
| Loop direction | forward | **w backwards** in 1D |

### 7. Pattern signals & recognition clues

| When the problem says… | Think… |
|---|---|
| "each item once" / "0/1" | Reverse loop or 2D row |
| "subset sum" / "partition equal" | Boolean knapsack, target = sum/2 |
| "+/− signs" / "target sum" | Count ways to reach `(total+target)/2` |
| "unlimited coins" | **Day 18** — forward loop, not today |
| "two capacities" (0s and 1s) | **Day 19** 2D knapsack |

**Keywords:** `dp[i][w]` · `take skip` · `reverse w` · `subset sum` · `capacity`

### 8. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Forward loop on 1D for 0/1 | Item gets used twice — go **w down to wt** |
| Confusing with unbounded | Unlimited = forward inner loop (Day 18) |
| Wrong target for partition | Need `sum % 2 == 0`, target = sum/2 |
| Using max when problem wants count | Target Sum uses `+=`, not `max` |
| Drawing stock state machine | Not knapsack — that's **Day 20** |

### 9. Recognition drill

Read this problem aloud:

> *"Given weights and values, maximize value with capacity W — each item at most once."*

Before coding, say:

> *"0/1 knapsack: dp[i][w] = max(skip, take if fits). 1D: reverse w per item. Answer dp[n][W]."*

Read this one:

> *"Can you partition nums into two equal-sum subsets?"*

Before coding, say:

> *"Subset sum boolean: target = sum/2, dp[j] |= dp[j-num], j backwards. Not max value — reachability."*

---

*The dp[i][w] table is your map. First quest: equal partition disguised as knapsack. →*
