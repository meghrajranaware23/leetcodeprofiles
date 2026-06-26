<!-- hand-authored -->
# 📝 Tabulation — Building Bottom-Up

> **Day 3** · Tabulation — Building Bottom-Up · 10 XP · 10 min read

---

Days 1–2 lived on **1D linear recurrences** (Fib, stairs). Day 3 is your first **non-Fib visual**: fill tables you can **draw on paper** — a 2D triangle where each cell comes from two above, and a 1D bit table where `dp[i]` comes from `dp[i >> 1]`. No recursion tree required; you see dependencies as arrows on a grid.

> **Preview contrast (Day 2 vs Day 3):** Day 2 = recurse down, cache on the way back. Day 3 = **loop forward**, each cell reads only already-filled neighbors.

---

## Part 1 — Learn the Pattern

### 1. What is the pattern?

**Bottom-Up Tabulation** — define the table, set bases, fill in dependency order.

```
dp = array/table of correct size
fill base cases: dp[0], dp[0][0], row 0 = 1, etc.

for i in fill order:
    dp[i] = transition from already-computed cells

return answer cell
```

- **Fill order matters** — never read an unfilled cell
- **2D tables** — often row-by-row, top to bottom
- **1D from 2D** — sometimes only previous row needed (preview Day 4)

### 2. Simple explanation

Memoization is "ask questions until you hit base, then remember answers." Tabulation is "write the multiplication table from top to bottom — row 7 only needs rows 0–6 already done."

Pascal's Triangle is the **poster child**: every interior cell is the sum of two parents above. Counting Bits is sneakier: `dp[i]` depends on `dp[i/2]` — half the index — not i-1.

### 3. Visual — Pascal's Triangle as 2D tabulation (FIRST non-Fib visual)

```
Row 0:       1
Row 1:      1 1
Row 2:     1 2 1        ← 2 = 1+1 (above-left + above-right)
Row 3:    1 3 3 1       ← 3 = 1+2, 3 = 2+1
Row 4:   1 4 6 4 1

dp[row][col]:
  borders: dp[r][0] = dp[r][r] = 1
  interior: dp[r][c] = dp[r-1][c-1] + dp[r-1][c]

Fill order: row 0 → row 1 → ... (never use unfilled row)
```

### 4. Visual — Counting Bits: dp[i] = dp[i>>1] + (i&1)

```
i:     0  1  2  3  4  5  6  7
bin:   0  1 10 11 100 101 110 111
dp[i]: 0  1  1  2  1   2   2   3

Transition:
  i >> 1  = drop last bit  (i/2)
  i & 1   = last bit (0 or 1)
  dp[i] = dp[i>>1] + (i&1)

Example i=5 (101):
  i>>1 = 2 (10) → dp[2]=1
  i&1 = 1
  dp[5] = 1+1 = 2 ✓

Fill left-to-right: dp[i>>1] always computed before dp[i]
```

### 5. Why this is NOT Fib-shaped

| Fib / Stairs | Pascal / Bits |
|---|---|
| dp[i] from i-1, i-2 | Pascal: two cells **above**; Bits: dp[i/2] |
| 1D index only | Pascal: 2D (row, col); Bits: bit structure |
| Recurrence obvious from problem | Bits recurrence hidden until you spot halving |

**Day 3 skill:** Read off **dependency arrows** on the table, not just "previous two indices."

### 6. The tabulation template

```
// 1D
dp[0..n], set bases
for i from first non-base to n:
    dp[i] = f(dp[...already filled...])

// 2D
for r in 0..rows:
    for c in 0..cols:
        if border: dp[r][c] = base
        else: dp[r][c] = dp[r-1][c-1] + dp[r-1][c]
```

### 7. Day 2 memo vs Day 3 tabulate

| Top-down memo (Day 2) | Bottom-up (Day 3) |
|---|---|
| Natural for recursive thinking | Natural for grid/triangle fill |
| May not visit all states | Visits all states in range |
| Stack depth O(n) | Loop only — no stack |

Same answers for equivalent states — pick the view that matches the problem shape.

### 8. Pattern signals & recognition clues

| When the problem says… | Think… |
|---|---|
| "generate triangle" / "cell = sum of two above" | 2D tabulation, row by row |
| "number of 1 bits" for 0..n | dp[i]=dp[i>>1]+(i&1) |
| "build table from smaller indices" | Bottom-up fill order |
| Dependencies form a DAG on a grid | Tabulate, don't recurse blindly |

**Keywords:** `bottom-up` · `fill order` · `dp[r-1][c]` · `i >> 1` · `i & 1`

### 9. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Reading dp[i+1] when filling left-to-right | Dependencies must point **backward** |
| Building full triangle when only one row needed | Day 4 optimizes — today build full triangle first |
| Per-i popcount in O(n log n) | Bit DP is O(n) total |
| Wrong Pascal border | Ends of each row are always 1 |

### 10. Recognition drill

Read this problem aloud:

> *"Given n, return an array where ans[i] is the number of 1's in the binary representation of i, for 0 ≤ i ≤ n."*

Before coding, say:

> *"Not Fib — dp[i] depends on dp[i/2]. Transition: dp[i]=dp[i>>1]+(i&1). Fill i=0..n left-to-right. Base: dp[0]=0."*

---

*Tables, not trees. First quest: Pascal's Triangle — fill the 2D grid by hand. →*
