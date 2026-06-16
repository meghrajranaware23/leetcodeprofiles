<!-- hand-authored -->
# ✅ Day 5 Checkpoint

> **DP with Decisions** · 2 quests completed · ⭐ 45 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Day 5 = **one-pass decision DP** with O(1) state:

| When you see... | Think... | Why |
|---|---|---|
| "one buy, one sell" / max profit | Running min buy | minPrice + maxProfit scan |
| "maximum subarray sum" | Kadane extend-or-reset | cur ending-at-i, best global |
| "contiguous" + max sum | Can't skip internally | Reset starts new subarray at i |
| Negative numbers in array | Kadane reset essential | cur + nums[i] may lose to nums[i] |
| O(n) single pass | Two scalars often enough | Compressed dp state |

### 🧠 Quick Recognition Test

1. *"Best time to buy/sell stock I"* → **minPrice so far; maxProfit = max(p - minPrice)**
2. *"Maximum subarray"* → **cur = max(nums[i], cur+nums[i]); best = max(best, cur)**
3. *"Why not track max price for stock?"* → **Need cheapest buy before sell day**
4. *"cur vs best at end?"* → **Return best — cur is only ending-at-i**

---

## 🎯 Transfer to Unseen Problems

**Scenario 1:** *"Maximum sum circular subarray."*

Kadane + total sum trick — two passes; core still extend-or-reset.

**Scenario 2:** *"Best profit with at most k transactions."*

Stock I is k=1 — later ranks add **state machine** (hold/sold).

**Scenario 3:** *"Max sum non-adjacent elements (House Robber)."*

Decision at i: **take nums[i] + dp[i-2] vs skip dp[i-1]** — different from Kadane (no adjacency).

> **Answer key:** Day 5 = **decision at each index** with compressed state (minPrice, cur/best).

---

## ⚠ Common Mistakes

1. **Stock: max price instead of min** — Buy low, sell high — track min.

2. **Kadane: return cur at end** — Global best may be earlier peak.

3. **Kadane: init cur=0 on all-negative array** — Start with nums[0].

4. **Confusing reset with "skip element"** — Reset still **includes** nums[i].

5. **O(n²) pairs on stock** — Running min is the E-Rank intended path.

---

## 🏋️ Mini Challenge

Trace Kadane on **`[1, -2, 3, -1]`** by hand with extend/reset columns.

Then solve **Best Time to Buy and Sell Stock #121** explaining minPrice after each day aloud.

> 💡 **Hint:** When extend and reset tie, max picks either — same value.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Best Time to Buy and Sell Stock #121](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/) | Easy | Running Minimum DP |
| [Maximum Subarray #53](https://leetcode.com/problems/maximum-subarray/) | Medium | Kadane's / Linear Decision DP |

---

*Day 5 complete! E-Rank training done — take the rank test. →*
