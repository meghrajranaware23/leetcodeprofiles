<!-- hand-authored -->
# 📝 Two-Sequence DP — LCS

> **Day 13** · Two-Sequence DP — LCS · ★★★☆☆ · 20 XP · 15 min read

---

Day 12 scanned **one array** backward (`j < i`). Day 13 compares **two sequences** — strings, arrays, or lines — with a **2D table**: `dp[i][j]` = answer for prefixes `s1[0..i-1]` and `s2[0..j-1]`. The **Longest Common Subsequence (LCS)** visual lives here — this is the canonical home for the match-diagonal / max-up-left grid. Day 12 deliberately did **not** use this table.

> **Preview contrast (Day 12 vs Day 13):** Day 12 = 1D `dp[i]` on one array. Day 13 = **2D `dp[i][j]`** — match takes diagonal `↖`, else `max(↑, ←)`.

---

## Part 1 — Learn the Pattern

### 1. What is the pattern?

**LCS DP** — fill a table where each cell compares one character (or value) from each sequence.

- **State** — `dp[i][j]` = LCS length of `s1[0..i-1]` and `s2[0..j-1]`
- **Match** — `s1[i-1] == s2[j-1]` → `dp[i][j] = dp[i-1][j-1] + 1` (diagonal ↖)
- **No match** — `dp[i][j] = max(dp[i-1][j], dp[i][j-1])` (↑ or ←)
- **Base** — row 0 and col 0 are 0 (empty prefix)
- **Answer** — `dp[m][n]` (full strings)

### 2. Simple explanation

Walk two fingers along both strings. At each pair of positions, if the symbols **match**, you extend the best answer from **both previous prefixes** (without those symbols). If they don't match, you drop one symbol from either side and take the better of the two smaller subproblems. The 2D table records every prefix pair exactly once.

### 3. Visual walkthrough — canonical LCS 2D table

```
s1 = "ace",  s2 = "abcde"

      ""  a  b  c  d  e
  "" [ 0  0  0  0  0  0 ]
  a  [ 0  1← 1  1  1  1 ]
  c  [ 0  1  1  2↖ 2  2 ]
  e  [ 0  1  1  2  2  3↖]

Cell dependencies:
  ┌────────┐
  │ dp[i-1]│──→ dp[i-1][j] (↑ skip s1[i-1])
  │ [j-1]  │↘
  └────────┘  dp[i][j] = dp[i-1][j-1] + 1  (↖ match)
                │
                ▼
            dp[i][j-1] (← skip s2[j-1])

Match   → diagonal ↖ + 1
No match → max(↑ above, ← left)

Answer: dp[3][5] = 3  ("ace")
```

**This is the canonical LCS grid — use it on Day 13, not on Day 12.**

### 4. Fill order

```
for i = 1..m:
  for j = 1..n:
    if s1[i-1] == s2[j-1]:
      dp[i][j] = dp[i-1][j-1] + 1
    else:
      dp[i][j] = max(dp[i-1][j], dp[i][j-1])
```

Each cell depends only on **already-filled** cells above and left — top-left to bottom-right.

### 5. LCS in disguise

Many problems hide two sequences:

| Surface problem | Hidden sequences |
|---|---|
| Uncrossed Lines | Two arrays — non-crossing = LCS order |
| Edit distance | LCS variant with insert/delete cost |
| Shortest common supersequence | Built from LCS length |

If matching pairs must preserve **order** in both lists, think LCS.

### 6. Day 12 LIS vs Day 13 LCS

| | **Day 12 — LIS** | **Day 13 — LCS** |
|---|---|---|
| Sequences | 1 | 2 |
| State | `dp[i]` | `dp[i][j]` |
| Visual | 1D trace | **2D table above** |
| Transition | `j < i` on one array | match ↖ or max ↑← |
| Quest | #300, #673 | #1143, #1035 |

### 7. Pattern signals & recognition clues

| When the problem says… | Think… |
|---|---|
| "longest common subsequence" | Classic 2D LCS table |
| "two strings" / "two arrays" | `dp[i][j]` on prefixes |
| "uncrossed lines" / "connect equal values" | LCS on the two arrays |
| "increasing subsequence" one array | **Day 12** — not LCS |
| "palindrome" | **Day 14** — expand or interval |

**Keywords:** `dp[i][j]` · `match diagonal` · `max up left` · `two prefixes` · `subsequence`

### 8. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Using 1D LIS scan for two strings | Need 2D — two independent indices |
| `dp[i][j] = dp[i-1][j-1] + 1` on mismatch | Only +1 when characters **match** |
| Off-by-one: compare `s[i]` vs `s[j]` | Use `s[i-1]` vs `s[j-1]` when dp is 1-indexed |
| Returning `dp[m-1][n-1]` with padded table | Answer is `dp[m][n]` if size `(m+1)×(n+1)` |
| Confusing substring with subsequence | LCS skips chars — not contiguous |

### 9. Recognition drill

Read this problem aloud:

> *"Given two strings text1 and text2, return the length of their longest common subsequence."*

Before coding, say:

> *"dp[i][j] = LCS of prefixes. Match → dp[i-1][j-1]+1. Else max(dp[i-1][j], dp[i][j-1]). Fill 2D table — canonical LCS visual."*

---

*Two fingers, one table. First quest: classic LCS. →*
