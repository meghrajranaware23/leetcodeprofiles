<!-- hand-authored -->
# ✅ Day 17 Checkpoint

> **0/1 Knapsack** · 2 quests completed · ⭐ 120 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Day 17 = **each item once**, capacity = sum or weight. Inner loop **backwards** on 1D.

| When you see... | Think... | Why |
|---|---|---|
| "partition equal subset" | Boolean dp, target = sum/2 | One half determines the other |
| "+/− signs to target" | Count ways, sum = (total+target)/2 | Sign algebra → subset sum |
| "max value, capacity W, once each" | `max(skip, take)` on dp[i][w] | Classic 0/1 |
| "unlimited coins" | **Day 18** — forward loop | Not 0/1 |
| "take or skip, no weight" | **Day 6** robber | Scalar, not knapsack table |

### 🧠 Quick Recognition Test

1. *"Can nums split into two equal sums?"* → **Boolean knapsack**, target = total/2, `dp[j] |= dp[j-num]`, j down.
2. *"Count ways to assign +/− to reach target"* → **Count knapsack**, `(total+target)/2`, `dp[j] += dp[j-num]`.
3. *"Maximize value with weights [2,3], capacity 5"* → **dp[w] = max(dp[w], dp[w-wt]+val)**, w down.
4. *"Minimum coins unlimited supply"* → **Day 18**, not reverse loop.

---

## 🎯 Transfer to Unseen Problems

**Scenario 1:** *"Given array of positive ints, is there a subset summing to exactly k?"*

What's the state? **`dp[j]` = can we make sum j?** Transition: reverse j, `dp[j] |= dp[j-num]`. Same as partition with arbitrary target.

**Scenario 2:** *"Count subsets with sum equal to k."*

What's the state? **`dp[j]` = number of ways.** Transition: `dp[j] += dp[j-num]`, j backwards.

**Scenario 3:** *"Pick items with weights and values; max value under W."*

What's the state? **`dp[w]` max value at capacity w.** Transition: 0/1 reverse loop with `max`.

> **Answer key:** All three share the **0/1 reverse loop**. Only the aggregation changes: `||`, `+=`, or `max`.

---

## ⚠ Common Mistakes

1. **Forward loop on 1D** — Reuses same item; always **w down to weight** for 0/1.
2. **Partition without odd check** — `sum % 2 != 0` → false immediately.
3. **Target sum wrong formula** — Positive subset is `(total+target)/2`, not `(total-target)/2`.
4. **Using max for partition** — Need boolean `||`, not max value.
5. **Confusing with Day 6** — Robber has adjacency, not knapsack capacity.

---

## 🏋️ Mini Challenge

Trace the 1D `dp` array by hand for `nums = [2, 3, 5]`, target sum **5** (boolean). Then repeat counting **ways** to sum to 5.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Partition Equal Subset Sum #416](https://leetcode.com/problems/partition-equal-subset-sum/) | Medium | Subset Sum = 0/1 Knapsack |
| [Target Sum #494](https://leetcode.com/problems/target-sum/) | Medium | Knapsack with Signs |

---

*Day 17 complete! Tomorrow: unlimited supply — loop direction flips. →*
