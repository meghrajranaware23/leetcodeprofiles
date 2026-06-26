<!-- hand-authored -->
# 📝 DP Pattern Synthesis

> **Day 26** · DP Pattern Synthesis · 20 XP · 15 min read

---

Days 1–25 built individual patterns. Day 26 asks you to **recognize which shape fits** when the problem looks unfamiliar — then execute the right recurrence. Today's quests: **count arithmetic slices by extending a running chain**, and **tile a row with domino/tromino pieces** using a multi-state recurrence.

> **Preview contrast (Day 22 vs Day 26):** Day 22 counted **partition structures** (BSTs, combos). Day 26 counts **contiguous arithmetic subarrays** (#413) and **tiling configurations** (#790) — local pattern detection + structural recurrence.

---

## Part 1 — Learn the Pattern

### 1. What is the pattern?

**DP Pattern Synthesis** — two flagship shapes:

**A. Arithmetic slice centered count**
- **State** — `dp` = length of current arithmetic run ending at `i` (count of slices **ending** at i with i as right end)
- **Transition** — if `nums[i]-nums[i-1] == nums[i-1]-nums[i-2]`: `dp += 1`, then `ans += dp`
- **Reset** — else `dp = 0`
- **Insight** — when you extend a run by one, you add **all slices ending at i-1** plus the new 3-element slice

**B. Domino/tromino tiling states**
- **State** — `f(n)` = ways to tile 2×n board; auxiliary states track **partial row coverage** (P, L shapes)
- **Recurrence** — `f(n) = 2*f(n-1) + f(n-3)` with rolling `(a,b,c)` = `(f(n-3), f(n-2), f(n-1))`
- **Base** — f(1)=1, f(2)=2

### 2. Simple explanation

**Arithmetic slices:** A slice needs ≥3 elements with constant gap. When index `i` continues the gap from `i-1` and `i-2`, every slice that ended at `i-1` extends by one element — plus the new minimal slice `(i-2, i-1, i)`. The inner `dp` counts extensions; `ans` accumulates.

**Tiling:** Cover a 2×n rectangle with 1×2 dominoes and L-trominoes. Think about the **rightmost column** — either filled by vertical domino, two horizontals, or an L-piece leaving a notch. The recurrence encodes those cases in O(1) space with three rolling values.

### 3. Visual — Arithmetic slice centered count

```
nums = [1, 2, 3, 4]

i=2: 1,2,3 arithmetic → dp=1, ans=1  (slice [1,2,3])
i=3: 2,3,4 continues → dp=2, ans=1+2=3
  slices: [1,2,3], [2,3,4], [1,2,3,4]

dp at i = # of arithmetic slices ENDING at i (with i as right end)
When gap continues: dp += 1; ans += dp
```

### 4. Visual — Domino/tromino tiling states

```
2×n board, fill left to right:

Case A: vertical domino at col n     → f(n-1)
Case B: two horizontal dominos       → f(n-2)
Case C: L-tromino + partial fill     → f(n-3)  (notch states)

Recurrence: f(n) = 2·f(n-1) + f(n-3)

n=1: 1 way   n=2: 2 ways   n=3: 5 ways
  ▐█▌  ▐█▌     ▐██▌ ▐█▌    (domino + tromino combos)
  ▐█▌  ▐█▌     ▐██▌ ▐█▌
```

Rolling `(a,b,c)` tracks three consecutive f-values — O(n) time, O(1) space.

### 5. When to use which synthesis cue

| Signal | Pattern | Quest |
|---|---|---|
| "arithmetic slice" / constant difference | Centered run count | #413 |
| "domino" / "tromino" / "tile 2×n" | Tiling recurrence | #790 |
| "how many subarrays" with local property | Running dp at each index | #413 style |
| "count tilings" mod 10⁹+7 | Multi-state rolling | #790 style |

### 6. The universal templates

```
// Arithmetic slices
dp = ans = 0
for i in 2..n-1:
  if nums[i]-nums[i-1] == nums[i-1]-nums[i-2]:
    dp += 1
    ans += dp
  else:
    dp = 0

// Domino/tromino (n >= 3)
a, b, c = 1, 1, 2
for i in 3..n:
  d = (2*c + a) % MOD
  a, b, c = b, c, d
return c
```

### 7. Pattern signals & recognition clues

| When the problem says… | Think… |
|---|---|
| "arithmetic slice" / "difference" | Running dp, ans += dp |
| "number of slices" (subarray) | Contiguous — check i-2,i-1,i |
| "domino and tromino" | Tiling recurrence, mod MOD |
| "2×n board" | Column-by-column states |

**Keywords:** `centered count` · `running dp` · `f(n-3)` · `tiling states` · `MOD`

### 8. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Count all triplets O(n³) | Running dp is O(n) |
| ans += 1 only (not dp) | Must add **all extended slices** → ans += dp |
| Fibonacci for tiling | Tromino adds f(n-3) term — not plain Fib |
| Off-by-one on tiling base | f(1)=1, f(2)=2, loop from 3 |
| Forget reset dp on break | Non-arithmetic gap → dp = 0 |

### 9. Recognition drill

Read this problem aloud:

> *"Return the number of arithmetic slices in nums."*

Before coding, say:

> *"Running dp = slices ending at i. If gap continues: dp++, ans+=dp. Else dp=0. O(n)."*

---

*Arithmetic slices first. Quest 1: #413. →*
