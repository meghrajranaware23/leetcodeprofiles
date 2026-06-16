<!-- hand-authored -->
# ✅ Day 19 Checkpoint

> **Knapsack Variants** · 2 quests completed · ⭐ 120 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Day 19 extends Day 17 — **extra dimension** or **different answer from same table**.

| When you see... | Think... | Why |
|---|---|---|
| "m zeros, n ones max strings" | `dp[m][n]`, reverse both | 2D 0/1 |
| "min stone difference" | Boolean to total/2, `total-2*j` | Partition min-diff |
| "equal partition exists?" | **#416** `dp[target]` | Not min-diff |
| "one capacity only" | **Day 17** 1D | Simpler |
| "unlimited coins" | **Day 18** | Not 0/1 |

### 🧠 Quick Recognition Test

1. *"Max strings with 2 zero slots, 3 one slots"* → **2D knapsack**, reverse i,j, +1 value.
2. *"Stones → min leftover after smashing"* → **Subset sum ≤ total/2**, return `total-2*bestJ`.
3. *"Max value one weight limit"* → **Day 17** `max(skip,take)`.
4. *"Count +/− to target"* → **Day 17** count, not 2D.

---

## 🎯 Transfer to Unseen Problems

**Scenario 1:** *"Split array into two subsets; minimize absolute difference of sums."*

What's the state? **Boolean `dp[j]` for j ≤ sum/2.** Answer: `total - 2*maxReachableJ`. Same as Last Stone II.

**Scenario 2:** *"Pick tasks using at most A CPU and B memory; maximize count."*

What's the state? **`dp[a][b]` max tasks.** Double reverse per task — Ones and Zeroes pattern.

**Scenario 3:** *"Can you split into two equal-sum subsets?"*

What's the state? **`dp[target]` boolean only** — #416, not min-diff scan.

> **Answer key:** Two budgets → 2D reverse. Min difference → 1D boolean + **`total - 2·bestHalf`**.

---

## ⚠ Common Mistakes

1. **Forward loops on 2D** — Reuses strings; reverse both dimensions.
2. **Last stone: require exact target** — Best **≤ total/2** suffices.
3. **Confusing #416 and #1049** — Bool vs min-diff extraction.
4. **Using 1D for two constraints** — Need `dp[m][n]`.
5. **Forgetting +1 value for string count** — Maximize count, not weight sum.

---

## 🏋️ Mini Challenge

For `stones = [1, 2, 3, 4]`: fill boolean `dp` to target 5, find best j, compute `total - 2j` by hand.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Ones and Zeroes #474](https://leetcode.com/problems/ones-and-zeroes/) | Medium | Multi-Constraint Knapsack |
| [Last Stone Weight II #1049](https://leetcode.com/problems/last-stone-weight-ii/) | Medium | Knapsack in Disguise |

---

*Day 19 complete! Tomorrow: stock state machines — HOLD, SOLD, REST. →*
