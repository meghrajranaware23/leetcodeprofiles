<!-- hand-authored -->
# 📝 DP Synthesis II

> **Day 29** · DP Synthesis II · 25 XP · 18 min read

---

Day 28 mastered grid geometry and 1D partition. Day 29 pairs **2D string counting** (#115 Distinct Subsequences) with **K-transaction state machines** (#123 Stock III, K=2). Today's visuals are a **counting table** and a **four-state profit machine** — not interval bracket notation (that's Day 30 Burst Balloons).

---

## Part 1 — Complex String & State Machine DP

### 1. What is the pattern?

Two hard templates that share one habit: **define exactly what each state remembers**.

| Template | State | Aggregation | Today's quest |
|---|---|---|---|
| **2D subsequence count** | Ways to form `t[0..j]` from `s[0..i]` | Sum on match | #115 Distinct Subsequences |
| **K-transaction stock** | Best profit after ≤ K complete trades | Max over states | #123 Stock III (K=2) |

### 2. Distinct Subsequences — counting table visual (#115)

Count distinct subsequences of `t` inside `s`. Classic 2D definition:

```
s = "rabbbit",  t = "rabbit"

dp[i][j] = # ways to form t[0..j-1] using chars from s[0..i-1]

Base: dp[i][0] = 1  (empty t — one way: pick nothing)

Match s[i-1] == t[j-1]:
  dp[i][j] += dp[i-1][j-1]   ← use this char (extend match)
  (skip path already in dp[i-1][j] when tabulating row-wise)

Space-optimized 1D row (fill j right-to-left on match):
  dp[j] += dp[j-1]  when s[i-1]==t[j-1]

        t:  r  a  b  b  i  t
s:  ""  1  0  0  0  0  0  0
    r   1  1  0  0  0  0  0
    a   1  1  1  0  0  0  0
    b   1  1  1  1  1  0  0
    ...
Answer: dp[m][n] = 3
```

**Not** LCS max-length (Day 13) — here you **sum** paths, not maximize. **Not** edit distance (Day 21) — no insert/delete cost.

### 3. Stock III — K=2 state machine visual (#123)

At most **two complete transactions**. Four rolling states beat a 2D table:

```
States per day (process price p left-to-right):

  buy1  = min cost to hold after 1st buy
  sell1 = max profit after 1st complete sell
  buy2  = min effective cost for 2nd buy (p - sell1)
  sell2 = max profit after 2nd complete sell  ← answer

Transitions on each price p:
  buy1  = min(buy1, p)
  sell1 = max(sell1, p - buy1)
  buy2  = min(buy2, p - sell1)    ← reinvest 1st profit
  sell2 = max(sell2, p - buy2)

Day 20 cousin (cooldown/fee) — same machine skeleton, K=2 adds buy2/sell2 pair.

     REST ──buy──→ HOLD ──sell──→ (profit)
                      ↑              │
                      └── buy2 ←─────┘  (2nd round)
```

General K-transaction: `dp[k][hold]` or expand to 2K scalars — Stock III is the K=2 canonical form.

### 4. Pattern signals

| When the problem says… | Think… | Day link |
|---|---|---|
| "distinct subsequences" / "count subseq" | 2D count, sum on match | #115, Day 13 cousin |
| "how many ways" + two strings | Counting LCS variant | Today |
| "at most K transactions" | K×2 state machine | #123, Day 20 |
| "buy and sell stock" + number K | Expand buy/sell pairs | Day 5 → 20 → 29 |
| "burst / merge interval" | **Day 30** interval DP | Not today |

### 5. Common S-Rank mistakes

| Mistake | Fix |
|---|---|
| Use max instead of sum for #115 | Counting — **add** matching paths |
| Fill dp[j] left-to-right on match | Reverse j to avoid using same row twice |
| One buy/sell pair for Stock III | Need **buy1/sell1/buy2/sell2** |
| `buy2 = min(buy2, p)` without sell1 | Effective cost is `p - sell1` |
| Model #115 as LCS length | LCS maximizes; distinct subseq **counts** |

### 6. Recognition drill

> *"Count distinct subsequences of t in s."*
>
> → **2D count.** `dp[i][j]` += on match. Space: 1D row, j descending.

> *"Max profit with at most 2 transactions."*
>
> → **K=2 state machine.** buy1, sell1, buy2, sell2 — O(n) scalars.

---

*Counting table first, then the four-state machine. Quest 1: Distinct Subsequences. →*
