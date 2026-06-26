<!-- hand-authored -->
# 📝 DP Synthesis I

> **Day 28** · DP Synthesis I · 25 XP · 18 min read

---

Twenty-seven days of patterns. Day 28 combines two **advanced 2D-adjacent** skills that look unrelated until you name the state: **grid side-length DP** (#221) and **1D partition max-sum** (#1043). Today's concept is **not** interval `dp[i][j]` bracket notation — that arrives on Day 30. Here you extend grid neighbors and linear prefix decisions.

---

## Part 1 — Advanced 2D DP (Two Flavors)

### 1. What is the pattern?

**Advanced 2D DP** — two S-Rank templates:

| Template | State | Fill order | Today's quest |
|---|---|---|---|
| **Grid side-length** | `dp[i][j]` = max square side ending at `(i,j)` | Row-major | #221 Maximal Square |
| **1D partition lookback** | `dp[i]` = best sum for first `i` elements | Left-to-right | #1043 Partition Array |

Both ask: *"If smaller subproblems are solved, what's the one-step extension?"*

### 2. Grid side-length — the visual (#221)

Each `'1'` cell asks: *"What's the largest square whose bottom-right corner is here?"*

```
matrix (conceptual):          dp[i][j] = side length:

  1 0 1 0 0                   1 0 1 0 0
  1 0 1 1 1        →          1 0 1 1 2
  1 1 1 1 1                   1 1 1 2 3  ← dp[3][3]=2 (2×2 square)
  1 0 0 1 0                   1 0 0 1 0

At (i,j) with matrix[i-1][j-1]=='1':
  dp[i][j] = min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]) + 1
            └─ top ─┘ └─ left ─┘ └── diagonal ──┘

Why min? All three sides must support a square one cell larger.
Answer: maxSide² (area), not just maxSide.
```

**Not** a path-count grid (Day 7). **Not** LCS (Day 13). The cell stores **geometry** — side length of the largest square anchored here.

### 3. 1D partition max-sum — the visual (#1043)

Partition `arr[0..n-1]` into chunks of size ≤ `k`. Each chunk contributes `max(chunk) × length`.

```
arr = [1,15,7,9,2,5,10], k=3

dp[i] = max sum partitioning arr[0..i-1]

  i=0: dp[0]=0
  i=3: try j=1,2,3 chunk ending at i
       j=1: dp[2] + max(5)*1
       j=2: dp[1] + max(9,5)*2
       j=3: dp[0] + max(7,9,5)*3  ← best

Fill left-to-right — dp[i] only needs dp[i-j] for j ≤ k:

  dp: [0, 1, 16, 36, 45, ...]
       ↑  ↑   ↑
     base first two partitions

NOT interval dp[i][j] on subarray — single index i, lookback j ∈ [1..min(i,k)].
```

### 4. Side-by-side recognition

| Signal | Grid side-length | 1D partition |
|---|---|---|
| Input shape | 2D matrix of 0/1 | 1D array + chunk limit k |
| State | `dp[i][j]` per cell | `dp[i]` prefix |
| Transition | min of 3 neighbors + 1 | max over last j elements |
| Optimize | Track global maxSide | Track running max in inner loop |
| Wrong pattern | Unique paths (Day 7) | Interval burst (Day 30) |

### 5. The DP Pipeline (S-Rank edition)

```
Step 1: BRUTE FORCE
  → Grid: try every square size at every cell — O(m²n²)
  → Partition: try every split — O(k^n)

Step 2: IDENTIFY OVERLAP
  → Grid: same (i,j) recomputed when checking larger squares
  → Partition: same prefix i solved many ways

Step 3: MEMOIZE
  → Grid: memo[i][j] = side length at cell
  → Partition: memo[i] = best prefix sum

Step 4: TABULATE
  → Grid: row-major, +1 padding for clean boundaries
  → Partition: i from 1..n, inner j from 1..min(i,k)

Step 5: OPTIMIZE SPACE
  → Grid: can compress to two rows (side-length only)
  → Partition: already O(n)
```

### 6. Common S-Rank mistakes

| Mistake | Pattern | Fix |
|---|---|---|
| Return maxSide instead of area | #221 | Answer = maxSide **× maxSide** |
| Use max instead of min of 3 neighbors | #221 | Square needs **all** sides — min binds |
| Model #1043 as interval dp[i][j] | #1043 | Linear prefix `dp[i]`, lookback j ≤ k |
| Forget +1 padding row/col | #221 | `dp[m+1][n+1]` avoids edge checks |
| Greedy chunk sizes | #1043 | Must try all j ∈ [1..min(i,k)] |

### 7. Recognition drill

Read each problem. Name state before coding:

> *"Largest square of 1s in a binary matrix."*
>
> → **Grid side-length.** `dp[i][j] = min(top, left, diag) + 1`. Answer = max².

> *"Partition array into subarrays of size ≤ k; maximize sum of (max × length)."*
>
> → **1D partition lookback.** `dp[i] = max(dp[i-j] + mx×j)` for j in 1..min(i,k).

---

*Grid geometry first, then linear partition. Quest 1: Maximal Square. →*
