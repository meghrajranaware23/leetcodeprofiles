# 📝 Difference Arrays

> **Day 13** · Difference Arrays · ★★★☆☆ · 10 min read

---

On Day 5 you learned **prefix sums** — precompute once, answer range queries in O(1). Today you flip the script. A **difference array** lets you apply **many range updates** in O(1) each, then reconstruct the final array with one prefix pass. It's the inverse of prefix sums — and the backbone of interval sweep problems.

---

## Part 1 — Learn the Pattern

### 1. What is the pattern?

A **difference array** marks where a range update **starts** and **ends** — without touching every index in between.

```
nums:     [ 0,  0,  0,  0,  0 ]   ← final array (unknown yet)
diff:     [ 0,  0,  0,  0,  0 ]   ← difference array (same length)

Update range [1, 3] by +5:
  diff[1] += 5      ← range starts here
  diff[4] -= 5      ← range ends after index 3

diff:     [ 0,  5,  0,  0, -5 ]

Prefix sum of diff → nums:
  i=0: 0
  i=1: 0+5 = 5
  i=2: 5+0 = 5
  i=3: 5+0 = 5
  i=4: 5+(-5) = 0

nums:     [ 0,  5,  5,  5,  0 ]   ✓
```

You never loop from `L` to `R` for each update. You stamp **two marks** and move on.

### 2. The inverse of prefix sums

Day 5 built prefix from nums. Difference arrays run the pipeline **backward**:

```
┌─────────────────────────────────────────────────────────────┐
│  PREFIX SUMS (Day 5)          DIFFERENCE ARRAY (Day 13)     │
├─────────────────────────────────────────────────────────────┤
│  nums  ──build──►  prefix     diff  ──prefix──►  nums       │
│  "What is sum[L..R]?"         "Add val to every index in    │
│  prefix[R+1] - prefix[L]       [L..R]" — stamp +val at L,   │
│                                -val at R+1                  │
│  Many queries, one array       Many updates, one final array│
└─────────────────────────────────────────────────────────────┘
```

| Direction | Input | Output | Core operation |
|---|---|---|---|
| **Prefix sum** | Fixed array | Answer range queries | `sum(L,R) = prefix[R+1] - prefix[L]` |
| **Difference array** | Range updates | Reconstructed array | `diff[L] += val; diff[R+1] -= val` then prefix |

Same math, opposite direction.

### 3. How range updates work

For each update "add `val` to every index from `L` to `R` inclusive":

```
diff[L]   += val    // value jumps UP at the start
diff[R+1] -= val    // value jumps DOWN after the range ends
```

**Visual — three updates on length 6:**

```
Update 1: [0, 2] +3
Update 2: [1, 4] +2
Update 3: [3, 5] +1

Step 1 — stamp all updates on diff:
         index:  0   1   2   3   4   5   6
         diff:  +3      -3  +2      -2  +1  -1
                ↑           ↑           ↑
              [0,2]       [1,4]       [3,5]

Step 2 — prefix sum (running total):
         nums:   3   5   5   6   3   2   0
                 └───┘   └───────┘   └─────┘
                 +3      +2 then     +1
                         overlaps
```

Each stamp is O(1). Reconstruction is O(n). Total: **O(n + q)** for `q` updates.

### 4. The universal template

```
diff = array of zeros, size n + 1   // extra slot for R+1 boundary

for each update (L, R, val):
    diff[L]   += val
    diff[R+1] -= val

running = 0
for i in 0..n-1:
    running += diff[i]
    result[i] = running
```

The `n + 1` length mirrors Day 5's `prefix[0] = 0` trick — `diff[R+1]` safely handles updates ending at the last index.

### 5. What problem does this pattern solve?

- **Bulk range updates** — "add `val` to every seat from flight `first` to `last`"
- **Event timelines** — pickups and dropoffs at specific locations
- **Sweep-line preprocessing** — compress many overlapping intervals into one pass
- **Reconstructing final state** after many overlapping modifications

### 6. Why brute force is inefficient

| Brute force | Problem |
|---|---|
| Loop `L` to `R` for every update | O(q × n) — dies when q and n are large |
| Rebuild entire array after each update | O(q × n) redundant work |
| Store every interval and merge later | Works, but difference array is simpler for +/− stamps |

### 7. The key observation

A range update changes **every** element in `[L..R]` by the **same amount**. You don't need to touch each element — you only need to record that "starting at `L`, everything goes up by `val`" and "starting at `R+1`, everything goes down by `val`." The prefix pass distributes the change automatically.

### 8. Pattern signals & recognition clues

| When the problem says… | Think difference array |
|---|---|
| "add `val` to every index from `L` to `R`" (many times) | Stamp `diff[L] += val`, `diff[R+1] -= val` |
| "flight bookings" / "seat reservations" on a range | Classic difference array |
| "pickup at mile X, dropoff at mile Y" | Events on a timeline → difference array or sort+scan |
| "return the final array after all updates" | Build diff, prefix once |
| many range updates + one final answer | Never update nums directly |

**Keywords:** `range update` · `add to all in range` · `bookings` · `pickup` · `dropoff` · `timeline` · `sweep` · `prefix of diff`

### 9. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Forgetting `diff[R+1] -= val` | Without the end stamp, the +val bleeds past `R` forever |
| Using `diff[R] -= val` instead of `diff[R+1]` | Off-by-one — range is **inclusive** of `R` |
| 0-indexed vs 1-indexed input | Flight bookings use 1-indexed flights — convert: `diff[first-1] += seats` |
| Updating `nums` directly in a loop | Stamp `diff` instead; prefix at the end |
| `diff` array too short | Size `n + 1` so `diff[R+1]` is valid when `R = n-1` |

### 10. Recognition drill

Read this problem aloud:

> *"You have n seats. Several bookings each reserve `seats` on flights `first` through `last` (inclusive). Return the total seats booked on each flight."*

Before coding, say:

> *"Many overlapping range additions → difference array. Stamp +seats at `first-1`, −seats at `last`. Prefix sum to get per-flight totals."*

---

## Part 2 — What's Next

Today you'll apply difference arrays to real interval problems:

1. **Pure range stamps** — Corporate Flight Bookings (#1109)
2. **Events on a timeline** — Car Pooling (#1094) — difference array thinking + sorted events

The stamp-and-prefix skeleton stays the same. Only the input shape changes.

---

*You understand the inverse of prefix sums. First quest: book flights with O(1) range stamps. →*
