<!-- hand-authored -->
# 📝 Counting Decompositions

> **Day 7** · Counting Decompositions · ★★★☆☆ · 15 XP · 15 min read

---

Day 6 asked **"take or skip for maximum?"** — two branches, **`max`**. Today asks **"how many ways?"** — same prefix idea, but you **add** valid branches. One quest decomposes a **string prefix** (1–2 char steps); the other counts **grid paths** (right or down). The visual is **summation**, not a take/skip fork.

> **Preview contrast (Day 6 vs Day 7):** Day 6 = `max(skip, take)` on a line. Day 7 = **`dp[i] = dp[i-1] + dp[i-2]`** (when valid) — **count** ways to reach prefix `i`. Same 1D sweep direction; different aggregation.

---

## Part 1 — Learn the Pattern

### 1. What is the pattern?

**Counting Decompositions DP** — count how many valid ways to build a target (prefix, cell, amount) by summing transitions from smaller states.

- **State** — `dp[i]` = number of ways to reach / decode / fill prefix or cell `i`
- **Transition** — **sum** over valid last steps: `dp[i] += dp[i - step]` for each valid step
- **Not optimization** — no `max`/`min`; invalid steps contribute **0**, not −∞
- **Two shapes today** — **1D prefix** (Decode Ways) · **2D grid** (Unique Paths)

### 2. Simple explanation

Imagine tiling a hallway with 1-step and 2-step tiles (when rules allow). At position `i`, every valid way that ends with a 1-step comes from position `i-1`; every way that ends with a 2-step comes from `i-2`. You **add** those counts — you're not choosing the better one. On a grid, every path to `(i,j)` comes from above or from the left — again, **add**.

### 3. Visual — Day 6 vs Day 7 (critical contrast)

```
DAY 6 (Take/Skip — MAXIMUM):          DAY 7 (Counting — SUM):

  dp[i] = max( SKIP , TAKE )            dp[i] = WAYS from (i-1)
              ↓      ↓                              +
          dp[i-1]  dp[i-2]+val              WAYS from (i-2)
          
  "pick the better loot"                "count every valid path"

  Example nums [2,7,9]:                 Example "12":
  dp: 2, 7, 11  (max)                   dp: 1, 1, 2  (1+"2" and "12")
```

**If the problem says "how many," stop thinking take/skip.**

### 4. Visual — string prefix (Decode Ways shape)

```
s = "226"

Index:  0   1   2   3   (dp[i] = ways to decode s[0..i-1])
dp:     1   1   2   3

At i=3 (char '6'):
  1-digit "6" valid  → += dp[2] = 2
  2-digit "26" valid → += dp[1] = 1
  dp[3] = 3

Ways: "2|2|6", "22|6", "2|26"
```

Leading `'0'` kills a branch — always validate before adding.

### 5. Visual — grid path count (Unique Paths shape)

```
3×3 grid — only right ↓ and down →

dp[i][j] = dp[i-1][j] + dp[i][j-1]

    j→  0   1   2
  i 0   1   1   1
  ↓ 1   1   2   3
    2   1   3   6

First row/col = 1 (only one way along edge)
Answer: dp[m-1][n-1] = 6
```

**2D table, but same idea: sum incoming ways.**

### 6. The universal templates

**1D prefix counting:**
```
dp[0] = 1   // empty prefix
for i = 1..n:
    if valid_1_step(i): dp[i] += dp[i-1]
    if valid_2_step(i): dp[i] += dp[i-2]
return dp[n]
```

**2D grid counting:**
```
dp[0][j] = dp[i][0] = 1
for i,j:
    dp[i][j] = dp[i-1][j] + dp[i][j-1]
return dp[m-1][n-1]
```

### 7. Day 6 vs Day 7 vs Day 8 — aggregation ladder

| Day | Question | Combine with |
|---|---|---|
| **Day 6** | Best non-adjacent sum? | **`max`** |
| **Day 7** | How many ways? | **`+`** |
| **Day 8** | Cheapest path? | **`min` + cost** |

Same "build from smaller subproblems" skeleton — **the operator changes**.

### 8. Pattern signals & recognition clues

| When the problem says… | Think… |
|---|---|
| "how many ways" / "number of decodings" | 1D prefix sum DP |
| "count paths" / "unique paths" | 2D sum from top and left |
| "maximum sum non-adjacent" | **Day 6 max** — not today |
| "minimum cost path" | **Day 8 min** — not today |
| "partition string into valid pieces" | Often prefix counting with validation |

**Keywords:** `count` · `ways` · `+=` · `dp[i-1] + dp[i-2]` · `grid sum`

### 9. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Using `max` like Day 6 | Counting uses **sum** |
| Forgetting `dp[0] = 1` | Empty prefix has one way |
| Ignoring invalid `'0'` / leading zero pairs | Check before adding |
| Drawing take/skip trees for decode | Use **prefix index** and valid step lengths |
| Unique Paths: leaving interior cells 0 | First row/col must be 1 |

### 10. Recognition drill

Read this problem aloud:

> *"A message contains letters A–Z encoded as digits 1–26. Count how many ways to decode the string."*

Before coding, say:

> *"Day 7 prefix counting: dp[i] += dp[i-1] if 1-digit valid; += dp[i-2] if 10–26 valid. Not take/skip — sum branches. Base dp[0]=1."*

---

*Count every valid decomposition. First quest: decode the string. →*
