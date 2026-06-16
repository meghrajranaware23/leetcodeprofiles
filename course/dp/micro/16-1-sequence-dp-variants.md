<!-- hand-authored -->
# 📝 Sequence DP Variants

> **Day 16** · Sequence DP Variants · ★★★★☆ · 20 XP · 15 min read

---

Day 12's LIS asked for **strictly increasing** subsequences. Day 16 stretches the same **look-backward** idea with extra state: **wiggle** alternation (up/down direction) and **pair chains** after sorting by interval end. Both connect back to Day 12 — wiggle is directional LIS; pair chain is sort + greedy/DP on non-overlapping intervals.

> **Preview contrast (Day 12 vs Day 16):** Day 12 = one number rule (`nums[j] < nums[i]`). Day 16 = **up/down states** (#376) or **sort pairs by end + chain** (#646).

---

## Part 1 — Learn the Pattern

### 1. What is the pattern?

**Sequence DP variants** — still `dp` on an array or sorted list, but state captures **direction** or **ordering constraint**:

**A. Wiggle / directional subsequence**
- **State** — `up` = longest wiggle ending with last **rise**; `down` = ending with last **fall**
- **Transition** — if `nums[i] > nums[i-1]`: `up = down + 1`; if `nums[i] < nums[i-1]`: `down = up + 1`
- **Answer** — `max(up, down)` — each index starts length 1 implicitly

**B. Interval pair chain (LIS cousin)**
- Sort pairs by **end** (second coordinate)
- **Greedy/DP** — pick next pair if `start > prev_end` (strict chain)
- Equivalent to LIS on ends after sort with start constraint

### 2. Simple explanation

**Wiggle:** Track whether your subsequence last moved **up** or **down**. A new up move must follow a down move — so `up` extends from previous `down`. Flat steps (`==`) don't update either state.

**Pair chain:** Sort by when each interval **finishes**. Greedily take the next interval that **starts after** the last taken end — classic activity selection, same spirit as LIS on one dimension after sort.

### 3. Visual — wiggle up/down states

```
nums: [1, 7, 4, 9, 2, 3]

Track up / down (length ending with rise vs fall):

  i=1: 7>1 → up = down+1 = 2  (rise from flat start)
  i=2: 4<7 → down = up+1 = 3   (fall after rise)
  i=3: 9>4 → up = down+1 = 4
  i=4: 2<9 → down = up+1 = 5
  i=5: 3>2 → up = down+1 = 6

Answer max(up,down) = 6  (subsequence 1,7,4,9,2,3 wiggles)
```

```
up   = longest wiggle ending with nums[i] > nums[i-1]
down = longest wiggle ending with nums[i] < nums[i-1]
flat (==): no update
```

### 4. Visual — pair chain after sort by end

```
pairs: [[1,2], [2,3], [3,4]]  → sort by end: same order

Greedy scan:
  take [1,2]  end=2
  [2,3]: start 2 not > 2 → skip
  [3,4]: start 3 > 2 → take, end=4
Answer: 2

Same as: sort by end, chain where start[i] > end[last]
Bridge to Day 12 LIS: monotone chain on sorted ends.
```

### 5. Day 12 LIS bridge

| | **Day 12 — LIS** | **Day 16 — Variants** |
|---|---|---|
| Rule | `nums[j] < nums[i]` | Alternating `<` and `>` |
| State | `dp[i]` or `len[i]` | `up` / `down` scalars |
| Sort? | Usually no | **Pair chain: sort by end** |
| Quest | #300, #673 | #376, #646 |
| Look-back | All `j < i` | Previous direction or greedy scan |

Wiggle = LIS with **sign memory**. Pair chain = LIS on **time axis** after sort.

### 6. The universal templates

```
// Wiggle O(n)
up = down = 1
for i in 1..n-1:
  if nums[i] > nums[i-1]: up = down + 1
  elif nums[i] < nums[i-1]: down = up + 1
return max(up, down)

// Pair chain O(n log n)
sort pairs by end
ans = 0, end = MIN
for (a,b) in pairs:
  if a > end: ans++; end = b
return ans
```

### 7. Pattern signals & recognition clues

| When the problem says… | Think… |
|---|---|
| "wiggle" / "alternating up and down" | `up` / `down` states |
| "pairs" / "chain" / `[a,b]` intervals | Sort by end, greedy chain |
| "non-crossing" / "non-overlapping" intervals | `start > prev_end` |
| "longest increasing subsequence" | **Day 12** — single direction |
| "uncrossed lines" | **Day 13** LCS |

**Keywords:** `up down` · `wiggle` · `sort by end` · `chain` · `start > end`

### 8. Common beginner mistakes

| Mistake | Fix |
|---|---|
| `up = up + 1` on rise | **up = down + 1** — rise follows a down |
| Forgetting flat `==` skips update | Neither state changes on equal |
| Pair chain: sort by start | Sort by **end** for greedy chain |
| `start >= end` for chain | Usually **strict** `start > prev_end` |
| O(n²) wiggle when O(n) suffices | Two scalars `up`/`down` enough |

### 9. Recognition drill

Read this problem aloud:

> *"Find the length of the longest wiggle subsequence."*

Before coding, say:

> *"up/down states: rise extends from down, fall extends from up. max(up,down). Day 12 LIS with direction memory."*

---

*Direction first. Quest 1: Wiggle Subsequence. →*
