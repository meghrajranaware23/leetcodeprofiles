# ✅ Day 12 Checkpoint

> **Kadane's Algorithm** · 2 quests completed · ⭐ 45 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

| When you see... | Think... | Why |
|---|---|---|
| "maximum subarray sum" / "largest sum contiguous" | Kadane's extend/restart | O(n) single pass, handles negatives |
| "maximum product subarray" | Kadane's + min/max tracking | Negative × negative flips sign |
| negative numbers + max subarray | Kadane's, NOT sliding window | Window sum isn't monotonic |
| "contiguous" + "non-empty" | Subarray — Kadane's applies | At least one element required |
| "circular array" max subarray | Kadane's + wrap trick | max(normal, total - minSubarray) |
| all elements negative | Kadane's returns largest single element | Initialize to nums[0], not 0 |
| positive-only max sum subarray | Kadane's still works; sliding window also possible | Kadane's is the general solution |

### 🧠 Quick Recognition Test

1. *"Find the contiguous subarray with the largest sum, negatives allowed"* → **Kadane's: extend or restart, track globalMax**
2. *"Find the contiguous subarray with the largest product"* → **Kadane's with curMax AND curMin**
3. *"Array has negatives — can I use sliding window for max sum?"* → **No — sum isn't monotonic; use Kadane's**
4. *"All elements are negative — what's the max subarray sum?"* → **Single largest element (least negative)**

---

## 🎯 Transfer to Unseen Problems

You've studied Maximum Subarray and Maximum Product Subarray. Can you recognize Kadane's thinking on problems you've never walked through?

**Scenario 1:** *"Given a circular integer array, find the maximum sum of a non-empty subarray. The subarray can wrap from the end back to the beginning."*

Which pattern? **Kadane's + circular trick.** Max circular = max(normal Kadane's, totalSum − minSubarray). Handle the all-negative edge case separately. (Maximum Sum Circular Subarray #918.)

**Scenario 2:** *"Given an array, find the maximum absolute sum of any subarray."*

Which pattern? **Kadane's twice.** Run once for max subarray sum, once for min subarray sum (most negative). Answer = max(|maxSum|, |minSum|).

**Scenario 3:** *"Given an array representing stock prices, find the maximum profit from one buy and one sell."*

Which pattern? **Kadane's variant — running minimum.** At each day, profit = price − minPriceSoFar. Track max profit. Not subarray sum, but same single-pass extend/restart spirit. (Best Time to Buy and Sell Stock #121.)

> **Answer key:** Scenarios 1 and 2 → Kadane's directly (with circular or dual-run tricks). Scenario 3 → running min variant. Signal: **"optimal contiguous segment" or "best running state"** → one pass, O(n).

---

## ⚠ Common Mistakes

1. **Initializing globalMax to 0** — When all elements are negative, the answer is the largest element (e.g. -1), not 0.

2. **Using sliding window for max sum with negatives** — `[5, -10, 5]` breaks two pointers. Kadane's correctly restarts at -10.

3. **Tracking only max for product subarray** — Missing sign flips. `[-2, 3, -4]` needs min tracking to get 24.

4. **Confusing Kadane's with prefix sums** — Prefix sums query any range. Kadane's finds the best range in one pass. Different jobs.

5. **Forgetting to swap max/min when nums[i] < 0** — The old minimum product becomes the candidate for the new maximum after a negative multiplier.

---

## 🏋️ Mini Challenge

### [Maximum Sum Circular Subarray #918](https://leetcode.com/problems/maximum-sum-circular-subarray/)

**[→ Try Maximum Sum Circular Subarray on LeetCode](https://leetcode.com/problems/maximum-sum-circular-subarray/)**

Given a circular integer array, find the maximum sum of a non-empty subarray. The subarray can wrap around (end connects to start).

```
Input:  nums = [1, -2, 3, -2]
Output: 3
        (subarray [3])

Input:  nums = [5, -3, 5]
Output: 10
        (subarray [5, -3, 5] wraps around)

Input:  nums = [-3, -2, -3]
Output: -2
        (single element)
```

### 🔍 Pattern Recognition for This Challenge

| Clue | Signal |
|---|---|
| "circular array" / "wrap around" | Two cases: non-wrapping and wrapping |
| "maximum sum subarray" | Kadane's for normal case |
| wrap-around subarray | totalSum − minSubarraySum (complement) |

**Before you code:** *"Case 1: normal Kadane's max. Case 2: wrap = total − min subarray sum. Answer = max(case1, case2). If all negative, case 2 is invalid — return case 1 only."*

> 💡 **Hint:** Run Kadane's for max sum AND min sum. `wrapMax = totalSum - minSubarraySum`. Return `max(normalMax, wrapMax)` when `normalMax >= 0`; otherwise all-negative → return `normalMax`.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Maximum Sum Circular Subarray #918](https://leetcode.com/problems/maximum-sum-circular-subarray/) | Medium | Kadane's + circular trick |
| [Best Time to Buy and Sell Stock #121](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/) | Easy | Running min + max profit |
| [Maximum Absolute Sum of Any Subarray #1749](https://leetcode.com/problems/maximum-absolute-sum-of-any-subarray/) | Medium | Kadane's for max AND min |
| [Maximum Subarray Sum with One Deletion #1186](https://leetcode.com/problems/maximum-subarray-sum-with-one-deletion/) | Medium | Kadane's + one skip allowed |
| [Maximum Product Subarray #152](https://leetcode.com/problems/maximum-product-subarray/) | Medium | Kadane's min + max |

---

*Day 12 complete! Kadane's and window + map — two C-Rank pillars locked in. Day 13: Difference Arrays. →*
