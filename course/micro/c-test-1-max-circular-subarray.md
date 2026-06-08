# ⚔ C-Rank Test — Problem 1

> [Maximum Sum Circular Subarray #918](https://leetcode.com/problems/maximum-sum-circular-subarray/) · Medium · 150 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Maximum Sum Circular Subarray on LeetCode](https://leetcode.com/problems/maximum-sum-circular-subarray/)**

> ⚔ **Hunter's rule:** This is a rank test — treat it like real LeetCode practice. No peeking until you've genuinely tried.

---

## The Problem

Given a **circular integer array** `nums` of length `n`, return the **maximum possible sum** of a non-empty subarray of `nums`.

A circular array means the end of the array connects to the beginning. Formally, the next element of `nums[i]` is `nums[(i + 1) % n]` and the previous element is `nums[(i - 1 + n) % n]`.

```
Input:  nums = [1, -2, 3, -2]
Output: 3
Explanation: Subarray [3] has maximum sum 3.

Input:  nums = [5, -3, 5]
Output: 10
Explanation: Subarray [5, -3, 5] wraps around: 5 + (-3) + 5 = 10.

Input:  nums = [-3, -2, -3]
Output: -2
Explanation: Subarray [-2] has maximum sum -2.
```

---

## 💡 Hints

> 🎯 **What's being tested:** Kadane's Algorithm (Day 16) applied **twice** — once for maximum subarray, once for minimum subarray — to handle circular wrap-around.

**Hint 1:** A circular subarray is either a normal contiguous subarray (no wrap) or a wrap-around subarray that skips a middle segment. The wrap-around sum equals `total_sum - min_subarray_sum`.

**Hint 2:** Run Kadane's twice on the same array: `max_kadane` for the maximum subarray sum, `min_kadane` for the minimum subarray sum. The circular candidate is `total - min_kadane`.

**Hint 3:** Edge case — if **every** element is negative, `total - min_kadane` equals the entire array (which is the minimum, not the maximum). Return `max(max_kadane, total - min_kadane)` only when the circular candidate is valid; when all negatives, `max_kadane` alone is correct.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Kadane's Algorithm × 2 — Max & Min Subarray (Day 16)

| Clue in the problem | What it signals |
|---|---|
| "maximum sum subarray" | Kadane's — running max, reset when sum goes negative |
| "circular array" / "wraps around" | Two cases: normal subarray OR total minus middle segment |
| "non-empty subarray" | At least one element — handle all-negative edge case |
| contiguous subarray on circular data | Wrap-around subarray = everything except the minimum middle chunk |
| O(n) expected on array problems | Kadane's is O(n) — no nested loops needed |

**How to identify from the statement:** "Maximum subarray" → Kadane's. "Circular" → the wrap-around case is `total - min_subarray`. Apply Kadane's **twice** on the same pass or in two passes.

**How a strong solver thinks before coding:**
1. *"Max subarray → Kadane's for max."*
2. *"Circular wrap → skip the smallest middle chunk → total - min_subarray."*
3. *"Run Kadane's again tracking the minimum subarray sum."*
4. *"All negatives? Circular trick gives the whole array — fall back to max_kadane only."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Check every subarray with nested loops (including wrap-around)** | O(n²) or O(n³) with wrap logic — Kadane's solves in O(n) |
| **Duplicate the array and run Kadane's on length 2n** | Works but uses O(n) extra space — the min-subarray trick is cleaner |
| **Only run max Kadane's, ignore circular case** | Misses wrap-around winners like `[5, -3, 5]` → 10 |
| **Always return `total - min_kadane` without comparing to max_kadane** | Fails on all-negative arrays — returns the minimum, not the maximum |

**The insight brute force misses:** A wrap-around subarray that uses elements from both ends is equivalent to **the entire array minus one contiguous middle segment**. That middle segment is the **minimum subarray** — find it with a second Kadane's pass running on negated logic (track running minimum, reset when sum goes positive).

---

## 🎯 Transfer to Unseen Problems

Can you spot Kadane's variants without the word "circular"?

**Scenario 1:** *"Given an array, find the maximum product of any contiguous subarray."*

Which pattern? **Kadane's variant** (Maximum Product Subarray). Track both running max and running min — a negative flip can turn a min into a max. Same Kadane skeleton, two trackers.

**Scenario 2:** *"Given an array, find the maximum sum of any contiguous subarray."*

Which pattern? **Standard Kadane's** (Day 16). No circular twist — single pass, running max, reset when negative.

**Scenario 3:** *"Given a binary array, find the maximum number of consecutive 1s if you can flip at most one 0."*

Which pattern? **Sliding window** (Day 10), not Kadane's. "At most one" → expand/shrink window, not running sum reset.

> **Answer key:** Scenarios 1 and 2 → Kadane's family (Day 16). Scenario 3 → variable sliding window (Day 10). Signal: **"maximum subarray sum/product"** → Kadane's; **"circular"** → run Kadane's for both max and min.

---

<details>
<summary><strong>📖 Solution & Walkthrough</strong></summary>

### Walkthrough

Two candidates for the answer:
1. **Normal max subarray** — standard Kadane's.
2. **Circular max subarray** — `total_sum - min_subarray_sum` (everything except the smallest middle chunk).

```
nums = [5, -3, 5]
total = 7

Kadane max:  5 + (-3) + 5 = 7  (but this is non-circular)
             Actually on [5,-3,5]: running max = 5 → 2 → 7. max_kadane = 7

Kadane min:  track minimum subarray sum
             min at [-3] alone = -3, or segment [-3] in middle
             min_kadane = -3

Circular candidate: total - min_kadane = 7 - (-3) = 10 ✓
(wrap-around subarray [5, -3, 5] skipping nothing, or equivalently
 the full circle minus the empty middle)

Answer: max(7, 10) = 10 ✓
```

```
nums = [-3, -2, -3]
total = -8

max_kadane = -2  (single element [-2])
min_kadane = -8  (entire array)

Circular candidate: -8 - (-8) = 0  ← invalid (empty subarray)
Answer: max(-2, 0) → return max_kadane = -2 ✓
```

Guard: return `max(max_kadane, total - min_kadane)` only when `total != min_kadane` (circular candidate is non-empty). Otherwise return `max_kadane`.

### C++
```cpp
class Solution {
public:
    int maxSubarraySumCircular(vector<int>& nums) {
        int total = 0, maxSum = nums[0], curMax = 0;
        int minSum = nums[0], curMin = 0;
        for (int x : nums) {
            total += x;
            curMax = max(curMax + x, x);
            maxSum = max(maxSum, curMax);
            curMin = min(curMin + x, x);
            minSum = min(minSum, curMin);
        }
        return maxSum > 0 ? max(maxSum, total - minSum) : maxSum;
    }
};
```

### Python
```python
class Solution:
    def maxSubarraySumCircular(self, nums: list[int]) -> int:
        total = max_sum = cur_max = 0
        min_sum = cur_min = 0
        for x in nums:
            total += x
            cur_max = max(cur_max + x, x)
            max_sum = max(max_sum, cur_max)
            cur_min = min(cur_min + x, x)
            min_sum = min(min_sum, cur_min)
        return max(max_sum, total - min_sum) if max_sum > 0 else max_sum
```

### Java
```java
class Solution {
    public int maxSubarraySumCircular(int[] nums) {
        int total = 0, maxSum = nums[0], curMax = 0;
        int minSum = nums[0], curMin = 0;
        for (int x : nums) {
            total += x;
            curMax = Math.max(curMax + x, x);
            maxSum = Math.max(maxSum, curMax);
            curMin = Math.min(curMin + x, x);
            minSum = Math.min(minSum, curMin);
        }
        return maxSum > 0 ? Math.max(maxSum, total - minSum) : maxSum;
    }
}
```

**Complexity:** O(n) time · O(1) extra space

</details>

---

## 💭 What Should Have Clicked in Your Mind?

- **"Maximum subarray sum"** → Kadane's (Day 16) — running max, reset when sum goes negative.
- **"Circular" / "wraps around"** → The wrap-around subarray = total minus the minimum middle segment.
- **"Apply Kadane's twice"** → One pass for max subarray, one pass for min subarray — same O(n) loop, two trackers.

This is Kadane's first real variant: the circular trick transforms a confusing wrap-around into a subtraction problem. If Day 16 clicked, this is the natural extension.

---

## 🏁 Scoring

| Result | Verdict |
|---|---|
| 3/3 solved | **Perfect.** You're ready for B-Rank. |
| 2/3 solved | **Pass.** Advance to B-Rank. Revisit the one you missed. |
| 1/3 solved | **Not yet.** Re-study the relevant days, retry in 24 hours. |
| 0/3 solved | **Go back.** Re-do Days 11–16 with focus. |

---

*Test complete. Proceed to claim your rank-up. →*
