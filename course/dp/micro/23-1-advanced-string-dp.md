<!-- hand-authored -->
# 📝 Advanced String DP

> **Day 23** · Advanced String DP · 20 XP · 15 min read

---

Day 21 transformed strings with **insert / delete / replace** (`#72`). Day 13 matched two sequences with **LCS `dp[i][j]`** (`#1143`). Day 23 combines those ideas: **three strings interleaved into one**, and **delete-only cost = keep the LCS, pay for the rest**. Same 2D prefix grid — different question at each cell.

> **Preview contrast (Day 21 vs Day 23):** Day 21 **Edit Distance** = min operations to equalize. Day 23 **Interleaving** = boolean — can `s3` be built from `s1` + `s2` in order? **Delete Operation** = LCS disguise — not edit distance with replace.

---

## Part 1 — Learn the Pattern

### 1. What is the pattern?

**Advanced String DP** — two flagship shapes:

**A. Interleaving (`dp[i][j]`)**
- **State** — `dp[i][j]` = can prefix `s1[0..i-1]` + prefix `s2[0..j-1]` form prefix `s3[0..i+j-1]`?
- **Transition** — last char of `s3` must come from `s1[i-1]` or `s2[j-1]` (if chars match)
- **Base** — `dp[0][0] = true`

**B. Delete-only = LCS reduction**
- Min deletions to make two strings equal = `(m + n) - 2 * LCS`
- Fill standard LCS table from **Day 13** — match → diagonal +1, else `max(↑, ←)`

### 2. Simple explanation

**Interleaving:** You weave two threads into one output. At cell `(i,j)`, you've consumed `i` chars from `s1` and `j` from `s2`, producing `i+j` chars of `s3`. The next char of `s3` must match the next unconsumed char from **either** source — OR logic, not max/min.

**Delete operation:** You can only delete — no insert, no replace. Whatever survives in both strings must be a **common subsequence**. Maximize kept chars = LCS length. Everything else gets deleted once per side.

### 3. Visual — Interleaving `dp[i][j]`

```
s1 = "aab",  s2 = "axy",  s3 = "aaxaby"

      ""  a   x   y
  "" [ T   F   F   F ]
  a  [ T   T   F   F ]  ← s3[1]='a' from s1
  a  [ T   T   T   F ]
  b  [ F   F   F   T ]  ← s3[5]='b' from s1

dp[i][j] = (take from s1 if s1[i-1]==s3[i+j-1] && dp[i-1][j])
        OR (take from s2 if s2[j-1]==s3[i+j-1] && dp[i][j-1])

Answer: dp[3][3] = true
```

**Not** LCS max — it's **reachability** (boolean OR), like Word Break on two sources.

### 4. Visual — Delete op = LCS (Day 13 bridge)

```
word1 = "sea",  word2 = "eat"

      ""  e   a   t
  "" [ 0   0   0   0 ]
  s  [ 0   0   0   0 ]
  e  [ 0   1↖  1   1 ]
  a  [ 0   1   2↖  2 ]

LCS = dp[3][3] = 2  ("ea")
Min deletions = 3 + 3 - 2*2 = 2

Day 13 table, Day 21 *delete-only* interpretation.
```

### 5. Day 21 vs Day 13 vs Day 23

| | **Day 13 — LCS** | **Day 21 — Edit Distance** | **Day 23 — Today** |
|---|---|---|---|
| Goal | Max common length | Min insert/delete/replace | Interleave OR delete-only |
| Transition | match → +1; else max | match → 0 cost; else +1 min | Interleave: OR; Delete: LCS then formula |
| Quest | #1143 | #72 | #97, #583 |
| Key insight | ↖ on match | Three-way min on mismatch | Boolean weave vs LCS reduction |

### 6. The universal templates

```
// Interleaving
dp[0][0] = true
for i in 0..m:
  for j in 0..n:
    if s1[i-1]==s3[i+j-1]: dp[i][j] |= dp[i-1][j]
    if s2[j-1]==s3[i+j-1]: dp[i][j] |= dp[i][j-1]

// Delete operation
// Standard LCS fill (Day 13)
return m + n - 2 * dp[m][n]
```

### 7. Pattern signals & recognition clues

| When the problem says… | Think… |
|---|---|
| "interleaving" / "formed from two strings" | `dp[i][j]` boolean OR on s1/s2 |
| "delete to make equal" / "minimum delete" | LCS → `m+n-2*LCS` |
| "edit distance" with replace | **Day 21** — not today |
| "longest common subsequence" | **Day 13** — building block for #583 |

**Keywords:** `dp[i][j]` · `interleave` · `LCS` · `delete only` · `prefix`

### 8. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Using edit distance for #583 | Delete-only = LCS, no insert/replace |
| max(↑) instead of OR for interleaving | #97 is reachability, not optimization |
| Forgetting `m+n != len(s3)` early exit | Length check before DP |
| Confusing interleaving with LCS | LCS picks matching subsequence; interleaving uses **all** chars in order |
| Generic pattern decision tree | Use the **specific** 2D string grid from Day 13/21 |

### 9. Recognition drill

Read this problem aloud:

> *"Given s1, s2, s3, return true if s3 is formed by interleaving s1 and s2."*

Before coding, say:

> *"dp[i][j] = can s1[:i] + s2[:j] build s3[:i+j]. OR from s1 or s2 if chars match. Not LCS max."*

---

*Interleaving first. Quest 1: Interleaving String. →*
