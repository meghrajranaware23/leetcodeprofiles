# ✅ Day 5 Checkpoint

> **Prefix Sums** · 2 quests completed · ⭐ 40 XP earned

---

## 🔍 Pattern Signals

| When you see... | Think... |
|---|---|
| "subarray sum" / "range query" | Prefix sum array |
| "sum between indices" | `prefix[R+1] - prefix[L]` |
| "cumulative" / "running total" | Prefix sum |
| "pivot index" / "equilibrium" | Total sum minus running left sum |
| "left sum equals right sum" | One-pass with running total |

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
