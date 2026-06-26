<!-- hand-authored -->
# 📝 Multi-Option Decision DP

> **Day 10** · Multi-Option Decision DP · 15 XP · 15 min read

---

Days 6–9 had **two branches** per step (take/skip, 1-or-2 char, top/left, two passes). Today each state tries **many predecessors** — an inner loop over all valid splits or square sizes. Integer Break asks *"where do I cut?"*; Perfect Squares asks *"which square do I peel off last?"*

> **Preview contrast (Day 9 vs Day 10):** Day 9 = fix the **constraint** (circle, sign). Day 10 = fix the **transition width** — `for j in choices: dp[i] = best(dp[i], f(j))`.

---

## Part 1 — Learn the Pattern

### 1. What is the pattern?

**Multi-Option Decision DP** — at state `i`, iterate all valid choices `j` and relax `dp[i]` from smaller states.

**Integer Break (maximize product of parts):**
- `dp[i]` = max product splitting integer `i` into ≥2 parts (quest allows break into integers)
- Inner loop: `j` from `1` to `i-1` — last piece is `j`, remainder is `i-j` or `dp[i-j]`
- `dp[i] = max over j of: j*(i-j), j*dp[i-j]`

**Perfect Squares (minimize layers):**
- `dp[n]` = minimum count of perfect squares summing to `n`
- Inner loop: `j` where `j*j ≤ i` — peel square `j²`, cost `1 + dp[i - j*j]`
- `dp[i] = min over j of: dp[i - j*j] + 1`

### 2. Simple explanation

**Integer Break:** To maximize the product for number 10, try every first cut: 1+9, 2+8, … For each cut, either leave the rest whole (`j × (i-j)`) or break the rest further (`j × dp[i-j]`). Keep the best.

**Perfect Squares:** To make 12 from squares, try peeling 1, 4, or 9 last. Each peel reduces to a smaller amount you've already solved. Minimize layers = min over square choices + 1.

### 3. Visual — Integer Break inner splits

```
n = 10, find max product:

  j=1: 1 * max(9, dp[9])
  j=2: 2 * max(8, dp[8])
  j=3: 3 * max(7, dp[7])
  ...
  j=9: 9 * max(1, dp[1])

dp table build 2..n:

  i:  2   3   4   5   6   7   8   9  10
  dp: 1   2   4   6   9  12  18  27  36

dp[10]=36 from 3+3+4 style splits (3*dp[7] etc.)
```

### 4. Visual — Perfect Squares min layers

```
n = 12:

squares ≤12: 1, 4, 9

dp[0]=0
dp[1]=1  (1)
dp[4]=1  (4)
dp[8]=2  (4+4)
dp[12]=min(
    dp[11]+1,
    dp[8]+1  = 3,
    dp[3]+1  = 4
) → 3  (4+4+4)

Inner j loop at i=12: j=1 → dp[11]+1, j=2 → dp[8]+1, j=3 → dp[3]+1
```

### 5. Templates

**Max over splits:**
```
dp[1] = 1  // base for break
for i = 2..n:
    for j = 1..i-1:
        dp[i] = max(dp[i], j*(i-j), j*dp[i-j])
return dp[n]
```

**Min over square peels:**
```
dp[0] = 0
for i = 1..n:
    dp[i] = INF
    for j = 1; j*j <= i; j++:
        dp[i] = min(dp[i], dp[i - j*j] + 1)
return dp[n]
```

### 6. When inner loops appear

| Problem shape | Inner loop over | Aggregate |
|---|---|---|
| Integer Break | split point `j` | **max** |
| Perfect Squares | side `j` with j² ≤ i | **min** |
| Coin change (unbounded) | coin denominations | min or count |
| Day 6 take/skip | **no inner loop** — 2 fixed branches | max |

### 7. Pattern signals & recognition clues

| When the problem says… | Think… |
|---|---|
| "break integer into parts, max product" | Inner splits, max |
| "least number of perfect squares" | Inner squares, min |
| "minimum coins" / denominations | Inner coins, min |
| "two choices only" | Earlier days — no inner loop |
| "how many ways" with many coins | Inner loop + sum |

**Keywords:** `for j in 1..i` · `j*j <= i` · `relax dp[i]` · `max/min over choices`

### 8. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Only `j * (i-j)` in Integer Break | Also `j * dp[i-j]` — further breaks help |
| `dp[0]` wrong for break | `dp[1]=1` base; define carefully per problem |
| Squares: j up to i | j*j ≤ i only |
| Using max instead of min on squares | Perfect Squares = **min** layers |
| O(n) when inner loop needed | Accept O(n²) or O(n√n) |

### 9. Recognition drill

Read this problem aloud:

> *"Break a positive integer n into at least two positive integers to maximize their product."*

Before coding, say:

> *"Day 10 multi-option: dp[i] = max over j of j*(i-j) and j*dp[i-j]. Inner loop j=1..i-1. Fill 2..n."*

Read this one:

> *"Return the least number of perfect square numbers which sum to n."*

Before coding, say:

> *"Day 10 min layers: dp[i] = min(dp[i-j²]+1) for j²≤i. dp[0]=0."*

---

*Many choices per cell. First quest: break the integer. →*
