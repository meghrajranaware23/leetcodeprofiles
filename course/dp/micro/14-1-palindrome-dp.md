<!-- hand-authored -->
# 📝 Palindrome DP

> **Day 14** · Palindrome DP · ★★★★☆ · 20 XP · 15 min read

---

Day 13 matched **two different sequences** (LCS grid). Day 14 asks whether a string **reads the same forward and backward** — two tools: **expand around center** for contiguous substrings, or **interval DP `dp[i][j]`** when you need subsequence structure. **Do not** reuse the LCS table visual — palindrome state is about **symmetry** inside one string.

> **Preview contrast (Day 14 vs Day 15):** Day 14 = **substring** (contiguous) via expand, or count substrings. Day 15 = **subsequence** LPS with `dp[i][j]` on intervals — characters can be skipped.

---

## Part 1 — Learn the Pattern

### 1. What is the pattern?

**Palindrome DP** — exploit symmetry: inner answer depends on whether outer characters match.

- **Expand around center** — for each center, grow while `s[l]==s[r]`; O(n²) substrings, O(1) space
- **Interval `dp[i][j]`** — `dp[i][j]` = true/length if `s[i..j]` is palindrome (substring or subsequence variant)
- **Fill order** — by **increasing length** `j-i`, because inner interval `i+1..j-1` must be ready first
- **Counting** — each successful expand or `dp[i][j]=true` adds one to answer

### 2. Simple explanation

For **substring** problems, imagine a pin at each character (odd length) or between two characters (even length). Spread the pin outward while both sides match — every stop is a valid palindrome. For **interval DP**, ask whether the ends match; if yes, the middle must already be solved.

### 3. Visual — expand around center (substring)

```
s = "babad"

Center at index 2 ('a'):
  expand(2,2): "a"     → len 1
  expand(2,3): "aba"   → len 3  ← longest so far
  expand(1,2): "bab"  → len 3

Center at i, i+1 (even):
  expand(1,2): "aba"
  ...

No 2D LCS grid — radial expansion from each center.
```

### 4. Visual — interval dp[i][j] for substring check

```
s = "aba", fill by length (j-i):

  dp[i][j] = true if s[i]==s[j] && (j-i<2 || dp[i+1][j-1])

  length 0: dp[i][i] = true
  length 1: dp[i][i+1] = s[i]==s[i+1]
  length 2+: need inner dp[i+1][j-1]

  i\j  0   1   2
  0   T   F   T   → "aba" palindrome
  1       T   F
  2           T
```

### 5. Substring vs subsequence (bridge to Day 15)

| | **Day 14 — Substring** | **Day 15 — Subsequence (LPS)** |
|---|---|---|
| Contiguous? | **Yes** — expand or inner `i+1..j-1` | **No** — skip middle chars |
| Tool | Expand O(1) space, or interval check | `dp[i][j] = dp[i+1][j-1]+2` if match |
| Quest | #5 longest substring, #647 count | #516 LPS on Day 15 |
| Visual | **Expand / symmetric interval** | **2D skip-inner or take-one-end** |

**Substring = contiguous block. Subsequence = can delete chars without breaking order.**

### 6. The universal templates

```
// Expand — longest palindromic substring
for i in 0..n-1:
  expand(i, i)      // odd
  expand(i, i+1)    // even

// Interval — is s[i..j] palindrome substring?
for len in 2..n:
  for i in 0..n-len:
    j = i + len - 1
    dp[i][j] = s[i]==s[j] && (j-i<2 || dp[i+1][j-1])
```

### 7. Pattern signals & recognition clues

| When the problem says… | Think… |
|---|---|
| "palindromic substring" | Expand around center |
| "count palindromic substrings" | Expand, count each expansion |
| "reads same forward/backward" | Symmetry — match ends, solve middle |
| "palindromic subsequence" | **Day 15** — skip allowed |
| "longest common subsequence" | **Day 13** — two strings |

**Keywords:** `expand` · `dp[i][j]` interval · `symmetry` · `substring` · `center`

### 8. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Using LCS 2D table for palindrome | Wrong pattern — symmetry not two-sequence |
| Confusing substring with subsequence | Day 14 contiguous; Day 15 can skip |
| Wrong fill order for interval DP | Fill by **increasing length** `j-i` |
| Only odd-length expand centers | Also expand `(i, i+1)` for even lengths |
| `dp[i][j]` without checking `s[i]==s[j]` | Ends must match for palindrome |

### 9. Recognition drill

Read this problem aloud:

> *"Return the longest palindromic substring in s."*

Before coding, say:

> *"Substring → expand around each center, track max length. Not LCS grid. Not LPS subsequence (Day 15)."*

---

*Symmetric expansion first. Quest 1: longest palindromic substring. →*
