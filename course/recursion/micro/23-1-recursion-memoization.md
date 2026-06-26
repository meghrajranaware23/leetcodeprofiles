<!-- hand-authored -->
# 📝 Recursion + Memoization (Top-Down DP)

> **Day 23** · Top-Down DP · 20 XP · 15 min read

---

B-Rank Day 21 taught **index memo** on Word Break: `dfs(i)` asks about the suffix starting at `i`, and overlapping paths share the same subproblem. Today you generalize that picture into **top-down dynamic programming** — recursion first, cache second.

Two flavors of the same habit:

1. **`rob(i)`** — linear index memo for **optimization** (max value)
2. **`decode(i)`** — index memo for **counting**, with a critical **`'0'` guard**

Your mission: trace the call tree, circle repeated `(i)` nodes, then attach a memo table before you open LeetCode.

---

## Part 1 — Learn the Pattern

### 1. The bridge from Word Break (Day 21)

Word Break I already looked like top-down DP:

```
dfs(i):
    if i == n: return base
    if memo[i] known: return memo[i]
    for each valid choice from i:
        combine dfs(next_index)
    store at memo[i]; return
```

| Day 21 Word Break | Day 23 Top-Down DP |
|---|---|
| State = start index `i` | Same — often just `i` |
| Return bool or list | Return **max**, **count**, or **bool** |
| Overlap at same suffix | Overlap at same `(i)` or `(i, flag)` |
| Cache failures too | Always store computed answer |

**The shift:** you stop thinking "backtracking with pruning" and start thinking **"recursive definition + memo table."** The tree still exists — memo collapses duplicate subtrees.

### 2. Linear index memo — House Robber `rob(i)`

**Problem shape:** At house `i`, you either **rob it** (skip `i+1`) or **skip it** (move to `i+1`). Maximize total loot.

```
rob(i) = max(
    nums[i] + rob(i + 2),   // rob house i, can't rob i+1
    rob(i + 1)              // skip house i
)
Base: i >= n → 0
```

**What shrinks?** Index `i` moves forward — never backward.

**Why memo?** Without it, `rob(2)` is reached from both "rob 0, skip 1" and "skip 0, skip 1" — Fibonacci-style overlap.

```
nums = [2, 7, 9, 3, 1]

rob(0)
├─ rob 0: 2 + rob(2)
│         rob(2)
│         ├─ rob 2: 9 + rob(4) → 9 + 1 = 10
│         └─ skip 2: rob(3) → max(3+0, 0) = 3
│         → 10
└─ skip 0: rob(1)
          rob(1) → ... eventually also asks rob(3), rob(4)

memo[4] = 1, memo[3] = 3, memo[2] = 10, ...
Answer rob(0) = 12  (rob 0, skip 1, rob 2, skip 3, rob 4 → 2+9+1)
```

**Key:** two branches per index, but only **O(n)** distinct states because `i` only increases.

### 3. Count memo with invalid-prefix guard — `decode(i)`

**Problem shape:** Count ways to decode a digit string (`1→A`, …, `26→Z`). From index `i`, take **one digit** or **two digits** (if valid).

```
decode(i):
    if i == n: return 1          // one valid decoding for empty suffix
    if s[i] == '0': return 0     // GUARD — '0' cannot start a letter alone
    if memo[i] known: return memo[i]

    ans = decode(i + 1)            // single digit (always valid if not '0')
    if i+1 < n and 10 <= int(s[i:i+2]) <= 26:
        ans += decode(i + 2)       // two-digit letter

    memo[i] = ans; return ans
```

**The `'0'` guard is not optional.** Without it, `decode(i+1)` on a string starting with `'0'` returns 1 at the base case — counting invalid decodings.

```
s = "06"  →  answer 0 (cannot decode)
s = "10"  →  "J" only, or "1"+"0" invalid → 1 way
s = "226" →  "2,2,6" | "22,6" | "2,26" → 3 ways
```

**Two-digit rule:** values `01`–`09` are invalid (must be `10`–`26`). That's why the code checks `>= 10`, not just `<= 26`.

### 4. Side-by-side — optimize vs count

| | House Robber `rob(i)` | Decode Ways `decode(i)` |
|---|---|---|
| **Question** | Maximum sum | Number of ways |
| **Branches** | rob vs skip | 1-digit vs 2-digit |
| **Combine** | `max(a, b)` | `ans = a + b` |
| **Base** | `i >= n → 0` | `i == n → 1` |
| **Invalid state** | (none — skip is always ok) | `s[i]=='0' → 0` |
| **Memo stores** | max loot from `i..` | count from `i..` |

Same skeleton. Different combine and guard logic.

### 5. Visual — overlap at `decode(2)` on `"11106"`

```
decode(0)
├─ 1-digit → decode(1)
│   ├─ 1-digit → decode(2)  ─┐
│   └─ 2-digit "11" → decode(3)
└─ 2-digit "11" → decode(2)  ─┘ same subproblem!

Without memo: decode(2) computed twice
With memo:    memo[2] = 1 (only "06" fails → 0 from '0' guard)
```

### 6. Top-down vs bottom-up (same recurrence)

Top-down: write `dfs(i)`, add memo, start at `dfs(0)`.

Bottom-up: fill `dp[n]`, `dp[n-1]`, … using the same recurrence.

Today's goal is **recognizing the recurrence from the problem**, then memoizing. Bottom-up is the same math — different direction.

```
House Robber bottom-up:
dp[i] = max(nums[i] + dp[i+2], dp[i+1])   // fill from right to left

Decode Ways bottom-up:
dp[i] = dp[i+1] + (valid two-digit ? dp[i+2] : 0)
dp[n] = 1; if s[i]=='0' then dp[i]=0
```

### 7. Why brute force fails

| Approach | Problem |
|---|---|
| **House Robber: try all 2^n rob/skip subsets** | Same tree, no cache — exponential |
| **Decode Ways: enumerate all splits** | Overlapping suffixes recomputed |
| **Greedy rob (always take larger neighbor)** | Fails — `[2,1,1,2]` needs skip-then-rob |
| **Decode without `'0'` guard** | Counts impossible decodings |
| **Two-digit check only `<= 26`** | Allows `"06"`, `"07"` as two-digit "letters" |

### 8. Pattern signals

| When the problem says… | Think… |
|---|---|
| "maximum" + sequential choice (take/skip) | Linear index memo, `max` combine |
| "how many ways" + process string/array left-to-right | Count memo on index |
| "decode" / digit grouping / partition count | 1-step and 2-step branches from `i` |
| Same subproblem from different paths | Memo key = index (or `(i, j)`) |
| Saw Word Break index memo (Day 21) | Same cache idea — different return type |

**Keywords:** `top-down DP` · `memo[i]` · `rob(i)` · `decode(i)` · `'0' guard` · `overlap`

### 9. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Forgetting memo lookup at start of `dfs(i)` | Check cache before recursing |
| House Robber: `rob(i+1)` only, no skip-two | Must offer rob+skip-next option |
| Decode: missing `s[i]=='0'` early return | Return 0 before any branch |
| Two-digit `"06"` counted as valid | Require `10 <= value <= 26` |
| Base case `i==n` returns 0 for decode | Empty suffix = 1 valid way |
| Memo not storing result before return | Assign `memo[i] = ans` on every compute path |

### 10. Recognition drill

Read aloud:

> *"Professional robber — can't rob two adjacent houses. Maximize total."*

Before coding, say:

> *"`rob(i) = max(nums[i]+rob(i+2), rob(i+1))`. Base `i>=n → 0`. Memo on i. Overlap like Fibonacci."*

Read aloud:

> *"Count decodings of a digit string to letters A–Z."*

Before coding, say:

> *"`decode(i)`: base `i==n→1`, guard `s[i]=='0'→0`, branch 1-digit + optional 2-digit if 10–26. Memo on i."*

---

## Part 2 — What's Next

Today's quests:

1. **House Robber #198** — linear `rob(i)` memo, max combine
2. **Decode Ways #91** — count memo + `'0'` guard

Trace `rob(0)` on `[2,7,9,3,1]`. Circle every repeated index. Then trace `decode(0)` on `"226"` and mark where the `'0'` guard would fire on `"106"`.

---

*Same index memo as Word Break — new return types. First quest: max loot along a street. →*
