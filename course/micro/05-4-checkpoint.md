# ✅ Day 5 Checkpoint

> **Prefix Sums** · 2 quests completed · ⭐ 40 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

| When you see... | Think... | Why |
|---|---|---|
| "subarray sum" / "range query" | Prefix sum array | Precompute cumulative totals |
| "sum between indices" / "L to R inclusive" | `prefix[R+1] - prefix[L]` | One subtraction per query |
| "multiple queries" / "immutable" | Build prefix in constructor | Preprocessing pays off immediately |
| "cumulative" / "running total" | Prefix sum (or running scan) | Each index = aggregate so far |
| "pivot index" / "equilibrium" / "left = right" | Total − running left − current | Balance without extra array |
| "product except self" / "exclude index i" | Prefix × suffix products | Same structure, multiply operator |
| "O(1) per query" after setup | Prefix array | Standard time–space trade |

### 🧠 Quick Recognition Test

1. *"Sum of elements from index 2 to 5"* → **Prefix sum query**
2. *"Find index where left sum equals right sum"* → **Running left sum + total**
3. *"Product of all elements except nums[i]"* → **Prefix + suffix products**
4. *"Return array where each element is sum of all elements before it"* → **Running sum / prefix construction**

---

## 🎯 Transfer to Unseen Problems

You've studied Range Sum Query and Pivot Index. Can you recognize prefix-sum thinking on problems you've never walked through?

**Scenario 1:** *"Given an array, return an array `answer` where `answer[i]` is the absolute difference between the sum of elements to the left of `i` and the sum of elements to the right of `i`."*

Which pattern? **Prefix/suffix split.** Same skeleton as pivot index — at each i, `left = running_sum`, `right = total - running_sum - nums[i]`, output `|left - right|`. No prefix array needed.

**Scenario 2:** *"A hiker records altitude changes in an array. Return the highest altitude reached, starting from altitude 0."*

Which pattern? **Running prefix sum + track max.** `altitude += change[i]` each step; update max. You're building a cumulative total and querying its peak.

**Scenario 3:** *"Given an array and many queries, each asking for the sum of a subarray — but the array never changes."*

Which pattern? **Full prefix array.** Identical to Range Sum Query. `prefix[R+1] - prefix[L]` per query.

> **Answer key:** All three → prefix-sum family. Scenario 1 uses running sum + total (pivot-style). Scenario 2 uses running sum only. Scenario 3 uses the full prefix array. The *formula* changes — the instinct to precompute cumulative totals does not.

---

## ⚠ Common Mistakes

1. **Off-by-one in range formula** — It's `prefix[R+1] - prefix[L]`, NOT `prefix[R] - prefix[L]`. The "+1" catches everyone at least once.

2. **Forgetting prefix[0] = 0** — The extra zero at the start eliminates edge cases for ranges starting at index 0.

3. **Recomputing sums in a loop** — If you're summing a subarray inside a loop, you're doing redundant work. Precompute prefix sums first.

---

## 🏋️ Mini Challenge

### [Running Sum of 1D Array #1480](https://leetcode.com/problems/running-sum-of-1d-array/)

**[→ Try Running Sum on LeetCode](https://leetcode.com/problems/running-sum-of-1d-array/)**

Return an array where each element is the running sum of the input. This IS a prefix sum — just without the extra zero at the start.

> 💡 **Hint:** `result[i] = result[i-1] + nums[i]`. One pass, in-place.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Running Sum #1480](https://leetcode.com/problems/running-sum-of-1d-array/) | Easy | Basic prefix sum construction |
| [Left and Right Sum Differences #2574](https://leetcode.com/problems/left-and-right-sum-differences/) | Easy | Prefix/suffix sum comparison |
| [Find the Highest Altitude #1732](https://leetcode.com/problems/find-the-highest-altitude/) | Easy | Prefix sum max |
| [Sum of All Odd Length Subarrays #1588](https://leetcode.com/problems/sum-of-all-odd-length-subarrays/) | Easy | Prefix sum for subarray queries |

---

*All 5 days complete! The E-Rank Test awaits. Prove your foundation. →*
