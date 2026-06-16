<!-- hand-authored -->
# ✅ Day 7 Checkpoint

> **Counting Decompositions** · 2 quests completed · ⭐ 55 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Day 7 is **counting** — combine with **`+`**, not Day 6's **`max`**.

| When you see... | Think... | Why |
|---|---|---|
| "how many ways to decode" | 1D prefix: += dp[i-1], += dp[i-2] | String decomposition |
| "unique paths" R/D | 2D: dp[i][j] = top + left | Grid counting |
| "maximum non-adjacent sum" | **Day 6 max** | Not counting |
| "minimum path sum" | **Day 8 min** | Cost optimization |
| "take or skip" | **Day 6** | Optimization, not count |

### 🧠 Quick Recognition Test

1. *"Decode ways for digit string"* → **dp[i] sum of valid 1- and 2-char tails; dp[0]=1**
2. *"Paths from (0,0) to (m-1,n-1) R/D only"* → **dp[i][j]=dp[i-1][j]+dp[i][j-1]; edges=1**
3. *"Minimum cost to reach bottom-right"* → **Day 8: min(top,left)+cost**
4. *"Rob houses max sum"* → **Day 6: max(skip,take)**

---

## 🎯 Transfer to Unseen Problems

**Scenario 1:** *"Count ways to climb n stairs taking 1 or 2 steps at a time."*

Which pattern? **1D prefix counting** — same recurrence as decode without zero traps.

**Scenario 2:** *"Grid with obstacles — count paths avoiding blocked cells."*

Which pattern? **Grid counting** — if obstacle, `dp[i][j]=0`; else sum neighbors.

**Scenario 3:** *"Minimum editing operations between two strings."*

Which pattern? **Later rank string DP** — not Day 7 sum on one prefix.

> **Answer key:** Hear "how many" → **`+`**. Hear "minimum/maximum" → **`min`/`max`**.

---

## ⚠ Common Mistakes

1. **Using max from Day 6 habit** — Counting always **adds** valid branches.
2. **dp[0]=0 on decode** — Empty prefix needs **1** way.
3. **Ignoring '0' in decode** — Validate before +=.
4. **Unique Paths: interior 0** — Must seed first row/col with 1.
5. **Confusing with min path sum** — Same grid, different operator (Day 8).

---

## 🏋️ Mini Challenge

### Related LeetCode Practice

Solve [Climbing Stairs #70](https://leetcode.com/problems/climbing-stairs/) without hints — notice it's Day 7 1D counting without the zero edge cases.

**Before you code:** Write the sum recurrence. Identify base cases.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Decode Ways #91](https://leetcode.com/problems/decode-ways/) | Medium | String Decomposition DP |
| [Unique Paths #62](https://leetcode.com/problems/unique-paths/) | Medium | Grid Path Counting |

---

*Day 7 complete! Tomorrow: same grid shape, but minimize cost. →*
