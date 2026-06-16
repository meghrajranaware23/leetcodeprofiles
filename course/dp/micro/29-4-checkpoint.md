<!-- hand-authored -->
# ✅ Day 29 Checkpoint

> **DP Synthesis II** · 2 quests completed · ⭐ 170 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Day 29 = **2D subsequence count** + **K-transaction state machine**. **Not** interval-only visuals.

| When you see... | Think... | Why |
|---|---|---|
| "distinct subsequences" | Count on match, dp[0]=1 | #115 sum paths |
| "how many ways" + two strings | 2D count or 1D row | Not LCS max |
| "at most 2 transactions" | buy1,sell1,buy2,sell2 | #123 four scalars |
| "at most K transactions" | K pairs buy/sell | Generalize Day 29 |
| "burst balloons" | **Day 30** interval | Not Day 29 |

### 🧠 Quick Recognition Test

1. *"Count distinct subsequences of t in s"* → **2D count.** Match: `dp[j]+=dp[j-1]`, j descending.
2. *"Max profit, at most 2 stock trades"* → **K=2 machine.** `buy2=min(buy2,p-sell1)`.
3. *"LCS length of two strings"* → **Day 13 max** — not sum.
4. *"Stock with cooldown"* → **Day 20** hold/sold/rest — not K=2.

---

## 🎯 Transfer to Unseen Problems

**Scenario 1:** *"Count distinct subsequences of a single string (all non-empty)."*

Which pattern? **Counting variant** — harder dedup; cousin of #115.

**Scenario 2:** *"Max profit with at most 3 transactions."*

Which pattern? **K=3 machine** — six scalars or `dp[k][hold]`.

**Scenario 3:** *"Is t a subsequence of s?"*

Which pattern? **Boolean** — E-Rank #392; one path, not count.

> **Answer key:** Scenario 1 = counting extension. Scenario 2 = K-generalization. Scenario 3 = not #115.

---

## ⚠ Common Mistakes

1. **Max instead of sum on #115** — counting adds paths.
2. **Fill dp[j] left-to-right on match** — overwrites same-row contributions.
3. **Single buy/sell for Stock III** — need second pair.
4. **`buy2 = min(buy2, p)` without sell1** — second buy is net of first profit.
5. **Use LCS template for distinct subseq** — different aggregation.

---

## 🏋️ Mini Challenge

`s="babgbag"`, `t="bag"`. Before coding: is this counting or maximizing? What is dp[0]?

> 💡 **Hint:** Counting. dp[0]=1 (empty target).

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Distinct Subsequences #115](https://leetcode.com/problems/distinct-subsequences/) | Hard | Advanced String DP |
| [Best Time to Buy and Sell Stock III #123](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/) | Hard | K-Transaction State Machine |

---

*Day 29 complete! Tomorrow: Dynamic Legend capstone + decision flowchart. →*
