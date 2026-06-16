<!-- hand-authored -->
# 📝 String Transformation DP

> **Day 21** · String Transformation DP · ★★★★☆ · 25 XP · 15 min read

---

Day 13 (**C13 LCS**) filled a 2D grid when characters **match or skip** — maximize common subsequence length. Day 21 uses the **same table shape** but different operations: **insert**, **delete**, **replace** to transform one string into another at minimum cost. Still `dp[i][j]` on prefixes — not a state machine, not knapsack.

> **Preview contrast (C13 LCS vs Day 21):** C13 match → `dp[i-1][j-1]+1`; else `max(up, left)`. Day 21 match → `dp[i-1][j-1]`; else **`1 + min(up, left, diag)`** — three edit operations. **LCS grid visual lives on both days; transitions differ.**

---

## Part 1 — Learn the Pattern

### 1. What is the pattern?

**Edit Distance / String Transformation DP** — `dp[i][j]` = min cost to transform `word1[0..i-1]` into `word2[0..j-1]`.

- **Insert** — `dp[i][j-1] + 1` (insert char to match word2[j-1])
- **Delete** — `dp[i-1][j] + 1` (remove word1[i-1])
- **Replace** — `dp[i-1][j-1] + 1` when chars differ
- **Match** — `dp[i-1][j-1]` when chars equal (free)
- **Base** — `dp[i][0]=i`, `dp[0][j]=j` (delete all / insert all)

**Variant (Minimum ASCII Delete Sum):** Only deletions allowed; cost = ASCII of deleted char. Match → diagonal free; mismatch → `min(delete from s1, delete from s2)` with char cost.

### 2. Simple explanation

Walk both prefixes. At cell `(i,j)` you're aligning `word1[i-1]` with `word2[j-1]`. If they match, inherit the cost from the smaller prefixes. If not, pay 1 (or ASCII) for the cheapest of: drop from s1, drop from s2, or swap one char (replace).

LCS asks *"how long can we match without editing?"* Edit distance asks *"how much to pay to make them equal?"*

### 3. Visual — edit distance 2D grid

```
word1 = "horse", word2 = "ros"

        ""   r   o   s
    ""   0   1   2   3
    h    1   1   2   3
    o    2   2   1   2
    r    3   2   2   2
    s    4   3   3   2
    e    5   4   4   3

dp[5][3] = 3  (replace h→r, delete r, delete e — or equivalent)

Mismatch at (i,j):
  dp[i][j] = 1 + min( dp[i-1][j],    // delete word1[i-1]
                       dp[i][j-1],    // insert word2[j-1]
                       dp[i-1][j-1] ) // replace

Match: dp[i][j] = dp[i-1][j-1]
```

### 4. Visual — LCS vs Edit Distance (same grid, different recurrence)

```
Both use dp[i][j] on prefixes of s1, s2:

LCS (C13):                    Edit Distance (Day 21):
  match: diag + 1               match: diag (0 cost)
  else: max(up, left)           else: 1 + min(up, left, diag)

LCS maximizes kept chars       Edit minimizes paid ops
No insert/delete cost          Each op costs 1 (or ASCII)
```

### 5. Templates

**Classic edit distance (#72):**
```
for i in 0..m: dp[i][0]=i
for j in 0..n: dp[0][j]=j
for i in 1..m:
  for j in 1..n:
    if s1[i-1]==s2[j-1]: dp[i][j]=dp[i-1][j-1]
    else dp[i][j]=1+min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])
return dp[m][n]
```

**ASCII delete sum (#712):**
```
// base: dp[i][0]=sum s1[0..i-1], dp[0][j]=sum s2[0..j-1]
if match: dp[i][j]=dp[i-1][j-1]
else: dp[i][j]=min(dp[i-1][j]+ord(s1[i-1]), dp[i][j-1]+ord(s2[j-1]))
```

### 6. C13 LCS vs Day 21 — side by side

| | **C13 LCS** | **Day 21 Edit Distance** |
|---|---|---|
| Goal | max length | min cost |
| Match | diag + 1 | diag + 0 |
| Mismatch | max(up, left) | 1 + min(up, left, diag) |
| Operations | implicit skip | insert / delete / replace |
| Grid | 2D prefix | Same 2D prefix |

### 7. Pattern signals & recognition clues

| When the problem says… | Think… |
|---|---|
| "edit distance" / "one operation" | Classic 3-way min |
| "insert delete replace" | #72 template |
| "minimum deletions" / "ASCII sum" | Delete-only variant |
| "longest common subsequence" | **C13** — max not min |
| "stock cooldown" | **Day 20** — not string grid |

**Keywords:** `dp[i][j]` · `insert delete replace` · `prefix` · `diag up left`

### 8. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Using LCS max on edit distance | Mismatch → **min** of three |
| Forgetting base row/col | dp[i][0]=i, dp[0][j]=j |
| Off-by-one on indices | dp[i] uses s1[i-1] |
| Drawing stock state machine | String day — **2D grid only** |
| Replace cost 0 on mismatch | Replace costs 1 in #72 |

### 9. Recognition drill

Read this problem aloud:

> *"Minimum operations to convert word1 to word2 — insert, delete, replace."*

Before coding, say:

> *"Edit distance: dp[i][j] on prefixes. Match=diag. Else 1+min(up,left,diag). Base row/col = indices."*

Read this one:

> *"Min ASCII sum of deleted chars to make two strings equal."*

Before coding, say:

> *"LCS-shaped grid, delete-only: match free, else min delete from s1 or s2 with ASCII cost."*

---

*Same grid as LCS, different transitions. First quest: classic edit distance. →*
