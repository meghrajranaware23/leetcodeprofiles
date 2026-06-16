<!-- hand-authored -->
# 📝 Subsequence DP — LIS

> **Day 12** · Subsequence DP — LIS · ★★★☆☆ · 20 XP · 15 min read

---

Day 11 filled **2D grids**. Day 12 shifts to **1D subsequences** on a single array: the flagship pattern is **Longest Increasing Subsequence (LIS)** — `dp[i]` = best answer for a subsequence **ending at index i**. Look **backward** at all `j < i`, not at a second string. This is the highest-priority C-Rank day: master the `dp[i]` trace before touching LCS on Day 13.

> **Preview contrast (Day 12 vs Day 13):** Day 12 = **one array**, `dp[i]` from `j < i`. Day 13 = **two sequences**, `dp[i][j]` table — the LCS grid visual lives there, **not here**.

---

## Part 1 — Learn the Pattern

### 1. What is the pattern?

**LIS DP** — for each index `i`, the answer depends on the best answers at **earlier indices** that satisfy a monotonic rule.

- **State** — `dp[i]` (or `len[i]`) = length of longest increasing subsequence **ending at** `i`
- **Transition** — `dp[i] = max(dp[j] + 1)` for all `j < i` where `nums[j] < nums[i]`
- **Global answer** — `max(dp[0..n-1])` — not necessarily `dp[n-1]`
- **Counting variant** — parallel `cnt[i]` = number of LIS ending at `i` (today's second quest)
- **Optimization** — `tails` + binary search for O(n log n) length only (no counting)

### 2. Simple explanation

Stand at each array position and ask: *"If I **must** end my subsequence here, how long can it be?"* Look at every earlier position that is **strictly smaller**. The best you can do is their best length plus one (including yourself). The overall LIS might end anywhere — scan all `dp[i]` at the end.

### 3. Visual — dp[i] trace (canonical LIS table)

```
nums:  [10,  9,  2,  5,  3,  7, 101, 18]

Fill left-to-right. Each dp[i] looks back at j < i:

  i:    0   1   2   3   4   5   6    7
  num: 10   9   2   5   3   7  101   18
  dp:   1   1   1   2   2   3   4    4
        ↑   ↑   ↑   ↑   ↑   ↑    ↑    ↑
      base base base 2<5 3<5 5<7  7<101 ...

Trace dp[5] (num=7):
  j=2 (2): dp[2]+1=2
  j=3 (5): dp[3]+1=3  ← best
  j=4 (3): dp[4]+1=3
  dp[5] = 3

Answer: max(dp) = 4  (e.g. 2→3→7→18 or 2→5→7→101)
```

**This is a 1D array trace — not a 2D LCS grid.** Day 13 owns the two-string table.

### 4. Visual — Number of LIS (len + cnt)

```
Same nums. Parallel arrays:

  len[i] = max LIS length ending at i     (same as dp above)
  cnt[i] = number of LIS of that length ending at i

When nums[j] < nums[i]:
  if len[j]+1 > len[i]:  len[i]=len[j]+1; cnt[i]=cnt[j]
  elif len[j]+1 == len[i]: cnt[i] += cnt[j]

Answer: sum(cnt[i]) where len[i] == maxLen
```

### 5. The universal template

```
// O(n²) — length + count
len = [1]*n, cnt = [1]*n
for i in 1..n-1:
  for j in 0..i-1:
    if nums[j] < nums[i]:
      if len[j]+1 > len[i]: len[i]=len[j]+1; cnt[i]=cnt[j]
      elif len[j]+1 == len[i]: cnt[i] += cnt[j]
return max(len), sum(cnt where len==maxLen)

// O(n log n) — length only (tails + binary search)
tails = []
for num in nums:
  pos = lower_bound(tails, num)
  tails[pos] = num  (or append)
return len(tails)
```

### 6. LIS vs LCS — don't mix the visuals

| | **Day 12 — LIS** | **Day 13 — LCS** |
|---|---|---|
| Input | One array | Two strings/arrays |
| State | `dp[i]` ending at i | `dp[i][j]` on prefixes |
| Look direction | `j < i` backward | Match diagonal or max(up,left) |
| Visual | **1D trace** above | **2D table** — Day 13 only |
| Example | #300, #673 | #1143, #1035 |

If you're drawing a grid with two string headers, you're on the wrong day.

### 7. Pattern signals & recognition clues

| When the problem says… | Think… |
|---|---|
| "longest increasing subsequence" | `dp[i] = max(dp[j]+1)`, `j<i`, `nums[j]<nums[i]` |
| "number of longest increasing" | Add `cnt[i]` with tie-handling |
| "subsequence" on **one** array | 1D backward scan |
| "two strings" / "common subsequence" | **Day 13** LCS |
| "pairs" / "chain" with order rule | Often sort + LIS cousin (Day 16) |

**Keywords:** `ending at i` · `j < i` · `strictly increasing` · `len cnt` · `max over all i`

### 8. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Returning `dp[n-1]` | LIS may end before last index — **max(dp)** |
| Using `nums[j] <= nums[i]` when strict increase required | Check problem — LIS is usually **strict** `<` |
| Drawing LCS 2D table for LIS | 1D trace only on Day 12 |
| Counting LIS with tails+binary search | `cnt` needs O(n²) pairwise scan |
| Forgetting `cnt[i]=1` base | Single-element subsequence counts once |

### 9. Recognition drill

Read this problem aloud:

> *"Given an integer array, return the length of the longest strictly increasing subsequence."*

Before coding, say:

> *"dp[i] = LIS length ending at i. For each i, scan j<i where nums[j]<nums[i], dp[i]=max(dp[j]+1). Answer max(dp). 1D trace — not LCS grid."*

---

*The dp[i] trace is your weapon. First quest: classic LIS length. →*
