<!-- hand-authored -->
# 📝 Counting & Structural DP

> **Day 22** · Counting & Structural DP · 25 XP · 15 min read

---

Day 18 counted **coin combinations** — order fixed by **coin-outer** loop. Day 22 covers **structural counting**: how many **BST shapes** (Catalan recurrence) and how many **ordered sums** (permutations matter). Same `dp[i] += dp[i-x]` spirit, but **loop order** and **recurrence shape** differ from both knapsack and coin combos.

> **Preview contrast (Day 18 vs Day 22):** Day 18 #518 = **combinations**, coin outer. Day 22 #377 = **permutations**, **amount outer**. Day 22 #96 = **Catalan** — `dp[n] = sum dp[j-1]*dp[n-j]`, not amount DP at all.

---

## Part 1 — Learn the Pattern

### 1. What is the pattern?

**Structural / Counting DP** — count objects defined by recursive structure or ordered compositions.

**Branch A — Catalan (#96 Unique BSTs):**
- `dp[n]` = number of structurally unique BSTs with nodes `1..n`
- Pick root `j`: left subtree size `j-1`, right size `n-j`
- **`dp[i] += dp[j-1] * dp[i-j]`** for `j = 1..i`
- Base: `dp[0] = dp[1] = 1`

**Branch B — Order-matters counting (#377 Combination Sum IV):**
- `dp[target]` = ways to make `target` using nums (unlimited)
- **`for i in 1..target: for num in nums: if num<=i: dp[i]+=dp[i-num]`**
- Amount outer → `(1,2)` and `(2,1)` count separately

### 2. Simple explanation

**BSTs:** How many trees on `{1,2,3}`? Try each root: root 1 → left empty, right `{2,3}`; root 2 → left `{1}`, right `{3}`; etc. Subproblems multiply because left and right subtrees are **independent** choices.

**Combination Sum IV:** Coins `[1,2,3]`, target 4 — sequences `1+1+2`, `1+2+1`, `2+1+1`, `2+2`, `1+3`, `3+1` all count. Fill `dp[i]` by "last step used num" → need **target outer** loop.

### 3. Visual — Catalan recurrence

```
n = 4 nodes → dp[4] = ?

dp[0]=1, dp[1]=1, dp[2]=2, dp[3]=5

dp[4] = sum over root j=1..4 of dp[j-1]*dp[4-j]:
  j=1: dp[0]*dp[3] = 1*5 = 5
  j=2: dp[1]*dp[2] = 1*2 = 2
  j=3: dp[2]*dp[1] = 2*1 = 2
  j=4: dp[3]*dp[0] = 5*1 = 5
  total = 14

Not an amount table — index = tree size
```

### 4. Visual — order matters vs Day 18 combinations

```
nums=[1,2], target=3

COMBINATIONS (#518, coin outer):
  Only {1,2} and {2,1} as multiset → 1 way? Actually one 1+2 combo

PERMUTATIONS (#377, amount outer):
  dp[1]=1, dp[2]=2 (1+1, 2), dp[3]=3 (1+1+1, 1+2, 2+1)

Same nums, same target — **loop order** changes the count
```

### 5. Templates

**Catalan BST count:**
```
dp[0]=dp[1]=1
for i in 2..n:
  for j in 1..i:
    dp[i] += dp[j-1] * dp[i-j]
return dp[n]
```

**Ordered sum (#377):**
```
dp[0]=1
for i in 1..target:
  for num in nums:
    if num<=i: dp[i]+=dp[i-num]
return dp[target]
```

**Combinations (#518 — Day 18 contrast):**
```
dp[0]=1
for num in coins:
  for i in num..target:
    dp[i]+=dp[i-num]
```

### 6. Day 18 vs Day 22

| | **#518 Combinations** | **#377 Permutations** | **#96 Catalan** |
|---|---|---|---|
| Loop | coin outer | **amount outer** | size i, root j |
| Reuse | unlimited | unlimited | N/A |
| Counts | multisets | **sequences** | tree structures |
| Recurrence | += dp[i-num] | += dp[i-num] | += dp[j-1]*dp[i-j] |

### 7. Pattern signals & recognition clues

| When the problem says… | Think… |
|---|---|
| "unique BSTs" / "structurally unique" | Catalan product recurrence |
| "order matters" / "permutation" | Amount outer, += |
| "combinations" / "order doesn't matter" | **Day 18** coin outer |
| "how many ways to climb" | Often amount outer (ordered steps) |
| "subset once each" | **Day 17** reverse |

**Keywords:** `Catalan` · `dp[j-1]*dp[i-j]` · `amount outer` · `order matters`

### 8. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Coin outer for #377 | Counts combinations — too few |
| Amount outer for #518 | Counts permutations — too many |
| Add instead of multiply in Catalan | Left × right independent |
| Forgetting dp[0]=1 | Empty tree / empty sum base |
| Using 0/1 reverse loop | Unlimited reuse — forward |

### 9. Recognition drill

Read this problem aloud:

> *"How many structurally unique BSTs store 1..n?"*

Before coding, say:

> *"Catalan: dp[i]+=dp[j-1]*dp[i-j] for each root j. dp[0]=dp[1]=1."*

Read this one:

> *"Count sequences of nums summing to target — order matters."*

Before coding, say:

> *"Amount outer, nums inner, dp[i]+=dp[i-num]. Not Day 18 coin outer."*

---

*Structure and order decide the recurrence. First quest: Catalan BST count. →*
