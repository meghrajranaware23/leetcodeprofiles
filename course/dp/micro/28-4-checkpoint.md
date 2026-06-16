<!-- hand-authored -->
# ✅ Day 28 Checkpoint

> **DP Synthesis I** · 2 quests completed · ⭐ 150 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Day 28 = **grid side-length** + **1D partition lookback**. **Not** interval `dp[i][j]` bracket notation (Day 30).

| When you see... | Think... | Why |
|---|---|---|
| "largest square of 1s" in matrix | min(top,left,diag)+1 | #221 side-length |
| "binary matrix" + geometry | Grid dp[i][j] per cell | Day 28 quest 1 |
| "partition array" + chunk ≤ k | dp[i] prefix, lookback j | #1043 linear |
| "max × length" per chunk | Running max in inner loop | Chunk score formula |
| "burst / merge interval" | **Day 30** interval | Not Day 28 |

### 🧠 Quick Recognition Test

1. *"Maximal square in binary matrix"* → **Grid side-length.** `dp[i][j]=min(neighbors)+1`. Return max².
2. *"Partition into subarrays size ≤ k, max element × length"* → **1D lookback.** `dp[i]=max(dp[i-j]+mx×j)`.
3. *"Count paths in grid"* → **Day 7/11** — sum paths, not side-length.
4. *"Burst balloons for max coins"* → **Day 30** — interval last-burst.

---

## 🎯 Transfer to Unseen Problems

**Scenario 1:** *"Count all square submatrices of 1s."*

Which pattern? **Same as #221** — `dp[i][j]` side length; **add** all dp values to count every square size.

**Scenario 2:** *"Split array into at most d segments minimizing difficulty (max per segment)."*

Which pattern? **2D partition** — S-Test #1335. Not pure 1D lookback — adds day dimension.

**Scenario 3:** *"Maximum sum after partitioning with chunk size at most 3."*

Which pattern? **#1043 template** — prefix dp[i], inner j ≤ k.

> **Answer key:** Scenario 1 = Day 28 grid. Scenario 2 = S-Test. Scenario 3 = Day 28 quest 2.

---

## ⚠ Common Mistakes

1. **Return side not area on #221** — answer is maxSide **squared**.
2. **max instead of min of three neighbors** — square needs all sides.
3. **Model #1043 as interval dp[i][j]** — only prefix index i needed.
4. **Greedy chunk sizes on #1043** — must try all j ∈ [1..min(i,k)].
5. **Confuse with Count Square Submatrices** — #1277 sums all dp; #221 takes global max².

---

## 🏋️ Mini Challenge

Without code: for a 2×2 all-1 matrix, what is `maxSide`? What is the returned area?

> 💡 **Hint:** dp[2][2]=2 → area = 4.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Maximal Square #221](https://leetcode.com/problems/maximal-square/) | Medium | 2D Grid DP Synthesis |
| [Partition Array for Maximum Sum #1043](https://leetcode.com/problems/partition-array-for-maximum-sum/) | Medium | 1D Partition Lookback DP |

---

*Day 28 complete! Tomorrow: distinct subseq counting + K-stock machine. →*
