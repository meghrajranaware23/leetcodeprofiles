<!-- hand-authored -->
# 📝 String Decision DP

> **Day 15** · String Decision DP · ★★★★☆ · 20 XP · 15 min read

---

Day 14 solved **contiguous** palindromes with expand. Day 15 handles **prefix decisions** on strings: can you **partition** `s` into dictionary words (Word Break), or pick a **palindromic subsequence** by skipping characters (LPS). Both use DP on prefixes or intervals — but the state meaning differs sharply from Day 14's substring expand.

> **Preview contrast (Day 14 vs Day 15):** Day 14 **substring** = contiguous (`#5`, `#647`). Day 15 **subsequence LPS** = skip allowed (`#516`). Same string, different question — don't reuse expand for LPS.

---

## Part 1 — Learn the Pattern

### 1. What is the pattern?

**String Decision DP** — two flagship shapes on Day 15:

**A. Prefix partition (Word Break)**
- **State** — `dp[i]` = can prefix `s[0..i-1]` be segmented into dictionary words?
- **Transition** — try every split `j < i`: if `dp[j]` and `s[j..i-1]` in dict → `dp[i] = true`
- **Base** — `dp[0] = true` (empty prefix valid)

**B. Interval palindrome subsequence (LPS)**
- **State** — `dp[i][j]` = length of longest palindromic **subsequence** in `s[i..j]`
- **Match** — `s[i]==s[j]` → `dp[i][j] = dp[i+1][j-1] + 2`
- **No match** — `dp[i][j] = max(dp[i+1][j], dp[i][j-1])` (skip one end)
- **Fill** — `i` from `n-1` down to `0`, `j` from `i+1` to `n-1`

### 2. Simple explanation

**Word Break:** Walk the string left to right. At position `i`, ask: *"Did I already reach a valid cut point `j`, and is the slice from `j` to `i` a word?"* If any `j` works, position `i` is reachable.

**LPS:** On interval `i..j`, if both ends match, take them plus the best inside. If not, drop one end and take the better half-interval. You're building a subsequence — gaps allowed.

### 3. Visual — Word Break prefix DP

```
s = "leetcode", dict = {leet, code}

dp[i] = can prefix of length i be segmented?

  index:  0  1  2  3  4  5  6  7  8
  char:   -  l  e  e  t  c  o  d  e
  dp:     T  F  F  F  T  F  F  F  T
                ↑       ↑           ↑
              fail    "leet" ok   "code" from dp[4]

dp[8]=T → "leetcode" = "leet" + "code"
```

### 4. Visual — LPS interval dp[i][j] (subsequence)

```
s = "bbbab"

Fill i descending, j ascending (by length):

  Match ends: dp[i][j] = dp[i+1][j-1] + 2
  Else:       dp[i][j] = max(dp[i+1][j], dp[i][j-1])

  dp[0][4] = 4  ("bbbb" subsequence — skips middle 'a')

NOT expand — skipping 'a' means subsequence, not substring.
Day 14 #5 could NOT skip — longest substring is "bbb" length 3.
```

### 5. Day 14 substring vs Day 15 subsequence

| | **Day 14 — Substring** | **Day 15 — Subsequence (LPS)** |
|---|---|---|
| Contiguous? | Yes | **No — skip chars** |
| Method | Expand around center | Interval `dp[i][j]` |
| Quest | #5, #647 | #516 |
| Example `bbbab` | Max substring len 3 | Max subsequence len 4 |
| Bridge | *"Can I skip middle chars?"* → Day 15 |

### 6. The universal templates

```
// Word Break
dp[0] = true
for i in 1..n:
  for j in 0..i-1:
    if dp[j] and s[j:i] in dict: dp[i]=true; break

// LPS
for i from n-1 downto 0:
  dp[i][i] = 1
  for j from i+1 to n-1:
    if s[i]==s[j]: dp[i][j] = dp[i+1][j-1] + 2
    else: dp[i][j] = max(dp[i+1][j], dp[i][j-1])
return dp[0][n-1]
```

### 7. Pattern signals & recognition clues

| When the problem says… | Think… |
|---|---|
| "word break" / "segment into dictionary" | Prefix `dp[i]`, try all splits |
| "can be segmented" | Boolean reachability on prefix |
| "palindromic subsequence" | Interval LPS — not expand |
| "palindromic substring" | **Day 14** expand |
| "partition string" | Often prefix DP like Word Break |

**Keywords:** `dp[i] prefix` · `split j` · `dp[i][j] interval` · `subsequence` · `dictionary`

### 8. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Expand for LPS (#516) | Subsequence needs `max(dp[i+1][j], dp[i][j-1])` |
| Wrong fill order for LPS | `i` descending — inner `i+1..j-1` must exist |
| Word Break: `dp[i]` without `dp[0]=true` | Empty prefix is valid base |
| Confusing substring and subsequence | Day 14 vs 15 — read problem carefully |
| Checking dict word as `s[i:j]` vs `s[j:i]` | Consistent with `dp[j]` + word `s[j..i-1]` |

### 9. Recognition drill

Read this problem aloud:

> *"Given string s and wordDict, return true if s can be segmented into dictionary words."*

Before coding, say:

> *"dp[i] = prefix length i reachable. Try all j<i: dp[j] and s[j:i] in set. Not palindrome — prefix partition."*

---

*Partition first. Quest 1: Word Break. →*
