<!-- hand-authored -->
# ✅ Day 18 Checkpoint

> **Unbounded Knapsack** · 2 quests completed · ⭐ 120 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Day 18 = **unlimited reuse**, usually **forward** on amount. Loop order splits min vs count vs permutations.

| When you see... | Think... | Why |
|---|---|---|
| "fewest coins, unlimited" | `dp[a]=min(dp[a], dp[a-c]+1)`, a up | #322 |
| "count combinations" | **Coin outer**, a up, `+=` | Order fixed by coin type |
| "count permutations / order matters" | **Day 22** amount outer | #377 |
| "each item once" | **Day 17** j down | 0/1 |
| "perfect squares min count" | **Day 10** forward min | Same unbounded shape |

### 🧠 Quick Recognition Test

1. *"Min coins [1,2,5] for amount 11"* → Forward amount, min — answer 3.
2. *"Count coin combos to amount 5"* → Coin outer, += — answer 4 for [1,2,5].
3. *"Count ways order matters [1,2,3] target 4"* → **Amount outer** — (1,1,2) ≠ (1,2,1) counts separately.
4. *"Subset sum each num once"* → **Day 17** reverse.

---

## 🎯 Transfer to Unseen Problems

**Scenario 1:** *"Fewest perfect squares summing to 12."*

What's the state? **`dp[i]` min squares for sum i.** Transition: forward i, try all s²≤i, `min(dp[i], dp[i-s²]+1)`. Day 10 template.

**Scenario 2:** *"How many ways to make 10 using {2,5} unlimited?"*

What's the state? **`dp[a]` combinations.** Coin outer: first all 2s, then 5s. `dp[10]` = ways.

**Scenario 3:** *"Rod cutting — max profit with unlimited piece sizes."*

What's the state? **`dp[len]` max value for length len.** Forward: `max(dp[len], dp[len-size]+price)` — unbounded max variant.

> **Answer key:** Unlimited → **forward**. Combinations vs permutations → **which loop is outer**.

---

## ⚠ Common Mistakes

1. **Day 17 reverse on coins** — Wrong reuse; forward for unbounded.
2. **#518 with amount outer** — Counts permutations.
3. **#377 with coin outer** — Misses permutation order.
4. **Greedy min coins** — Fails on general denominations.
5. **Forgetting dp[0]=1 for counting** — All sums stay zero.

---

## 🏋️ Mini Challenge

For `coins=[1,2,3]`, `target=4`: compute **combinations** (#518 order) vs **permutations** (#377 order) by hand. Notice 3 vs 7.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Coin Change #322](https://leetcode.com/problems/coin-change/) | Medium | Minimize Coin Count |
| [Coin Change II #518](https://leetcode.com/problems/coin-change-ii/) | Medium | Count Combinations |

---

*Day 18 complete! Tomorrow: two-dimensional knapsack constraints. →*
