<!-- hand-authored -->
# ✅ Day 22 Checkpoint

> **Counting & Structural DP** · 2 quests completed · ⭐ 120 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Day 22 = **count structures** (Catalan) or **ordered sums** (amount outer).

| When you see... | Think... | Why |
|---|---|---|
| "unique BSTs with 1..n" | `dp[i]+=dp[j-1]*dp[i-j]` | Catalan product |
| "sequences summing to target" | Amount outer, += | #377 permutations |
| "coin combinations" | **Day 18** coin outer | Order ignored |
| "0/1 subset count" | **Day 17** reverse | Each item once |
| "edit distance" | **Day 21** | 2D strings |

### 🧠 Quick Recognition Test

1. *"BST count for n=4"* → Catalan → 14.
2. *"[1,2,3] target 4, order matters"* → Amount outer → 7 ways.
3. *"[1,2,3] amount 4, combinations"* → Coin outer → 4 ways.
4. *"Min coins unlimited"* → **#322** min, amount outer.

---

## 🎯 Transfer to Unseen Problems

**Scenario 1:** *"How many valid parentheses strings of n pairs?"*

What's the state? **Catalan cousin** — same product recurrence spirit as BSTs.

**Scenario 2:** *"Count ways to climb n stairs taking 1 or 2 steps."*

What's the state? **`dp[i]=dp[i-1]+dp[i-2]`** — ordered, amount-style forward fill.

**Scenario 3:** *"Count multisets of coins to make amount."*

What's the state? **#518** — coin outer, not amount outer.

> **Answer key:** **Multiply** substructures → Catalan. **Order in sum** → amount outer +=.

---

## ⚠ Common Mistakes

1. **Add in Catalan** — Must **multiply** left×right counts.
2. **Coin outer for #377** — Undercounts permutations.
3. **Amount outer for #518** — Overcounts combinations.
4. **dp[0] not 1** — Empty base for counting.
5. **Confusing with 0/1 knapsack** — Unlimited forward reuse here.

---

## 🏋️ Mini Challenge

Compute `dp[4]` for Catalan by hand. Then compute #377 vs #518 counts for `nums=[1,2]`, `target=3`.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Unique Binary Search Trees #96](https://leetcode.com/problems/unique-binary-search-trees/) | Medium | Catalan Number DP |
| [Combination Sum IV #377](https://leetcode.com/problems/combination-sum-iv/) | Medium | Order-Matters Counting |

---

*Day 22 complete! B-Rank training done — take the rank test. →*
