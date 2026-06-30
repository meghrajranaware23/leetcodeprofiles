# ⚔ Quest: Maximum Subarray

> **Day 12** · [Maximum Subarray #53](https://leetcode.com/problems/maximum-subarray/) · Medium · 20 XP · 15 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Maximum Subarray on LeetCode](https://leetcode.com/problems/maximum-subarray/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen, paper, or your editor. The hints and walkthrough below are for *after* your attempt.

---

## The Problem

Given an integer array `nums`, find the contiguous subarray with the **largest sum** and return that sum.

```
Input:  nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
Output: 6
        (subarray [4, -1, 2, 1])

Input:  nums = [1]
Output: 1

Input:  nums = [5, 4, -1, 7, 8]
Output: 23
        (entire array)
```

A subarray is a contiguous non-empty sequence. At least one element must be included.

---

## 💡 Hints

At each index, ask: *"Is the best subarray ending here better if I extend the previous one, or restart at this element alone?"*

```
currentSum = max(nums[i], currentSum + nums[i])
globalMax  = max(globalMax, currentSum)
```

Initialize `globalMax` to `nums[0]` — the answer can be negative if all elements are negative.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Kadane's Algorithm — Extend or Restart

**How to identify this from the problem statement:**
- "contiguous subarray" + "largest sum" → Kadane's classic
- negative numbers allowed → rules out sliding window (sum isn't monotonic)
- return the sum, not the indices → one-pass running max

| Keyword / phrase | What it signals |
|---|---|
| "maximum subarray sum" | Kadane's extend/restart |
| "contiguous" | Subarray, not subsequence |
| "negative numbers" | Can't use positive-only sliding window |
| "non-empty" | At least one element — don't return 0 for all-negative |

**Why this pattern works:** The optimal subarray ending at `i` uses only the optimal subarray ending at `i-1`. If that sum is negative, it poisons any extension — restart at `nums[i]`.

**How a strong solver thinks before coding:**
1. *"Max contiguous sum with negatives → Kadane's, not sliding window."*
2. *"At each step: extend or restart. Track global max."*
3. *"Initialize to nums[0], not 0 — all-negative arrays exist."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Check every [i..j], sum each range** | O(n²) — Kadane's is O(n) |
| **Prefix sum + try every L, R pair** | O(n²) — same issue |
| **Sliding window (variable length)** | Fails with negatives — sum isn't monotonic when expanding |
| **Initialize globalMax = 0** | Wrong when all elements are negative (e.g. `[-3,-2,-1]` → answer is -1, not 0) |

**The insight brute force misses:** You don't need to know *where* the subarray starts. Only the sum of the best subarray **ending at each index** matters — that's one variable.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Maximum Absolute Sum of Any Subarray #1749](https://leetcode.com/problems/maximum-absolute-sum-of-any-subarray/) | Max of abs(sum) | Kadane's on both max and min |
| [Maximum Sum Circular Subarray #918](https://leetcode.com/problems/maximum-sum-circular-subarray/) | Circular wrap-around | Kadane's + total-sum trick |
| [Best Time to Buy and Sell Stock #121](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/) | Profit, not sum | Running min + max diff |

This is the **defining problem** for Kadane's — if you recognize "max subarray sum," you recognize #53.

---

## 📖 Walkthrough

```
nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]

 i  num   extend?              currentSum   globalMax
 0  -2    restart → -2              -2          -2
 1   1    restart (1 > -2+1)         1           1
 2  -3    restart (-3 > 1-3)        -2           1
 3   4    restart (4 > -2+4)         4           4
 4  -1    extend (4-1=3 > -1)        3           4
 5   2    extend (3+2=5 > 2)         5           5
 6   1    extend (5+1=6 > 1)         6           6  ← [4,-1,2,1]
 7  -5    extend (6-5=1 > -5)        1           6
 8   4    extend (1+4=5 > 4)         5           6

Answer: 6 ✓
```

```
nums = [-3, -2, -1]   (all negative)

 i  num   currentSum   globalMax
 0  -3       -3           -3
 1  -2       -2           -2
 2  -1       -1           -1

Answer: -1 ✓  (single element, not 0)
```

> 💡 **The insight:** `currentSum` is the best subarray **ending here**. If it's negative, the next element is better off restarting. `globalMax` remembers the best seen anywhere.

---

## Solution

### C++
```cpp
class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        int currentSum = nums[0], globalMax = nums[0];

        for (int i = 1; i < (int)nums.size(); i++) {
            currentSum = max(nums[i], currentSum + nums[i]);  // extend or restart
            globalMax = max(globalMax, currentSum);
        }
        return globalMax;
    }
};
```

### Python
```python
class Solution:
    def maxSubArray(self, nums: list[int]) -> int:
        current_sum = global_max = nums[0]

        for i in range(1, len(nums)):
            current_sum = max(nums[i], current_sum + nums[i])  # extend or restart
            global_max = max(global_max, current_sum)

        return global_max
```

### Java
```java
class Solution {
    public int maxSubArray(int[] nums) {
        int currentSum = nums[0], globalMax = nums[0];

        for (int i = 1; i < nums.length; i++) {
            currentSum = Math.max(nums[i], currentSum + nums[i]);  // extend or restart
            globalMax = Math.max(globalMax, currentSum);
        }
        return globalMax;
    }
}
```

**Complexity:** O(n) time · O(1) space

---

## 💭 What Should Have Clicked in Your Mind?

Before you opened your editor, these thoughts should have fired:

- **"Maximum subarray sum"** → Kadane's. The name of the pattern IS the problem.
- **"Negative numbers allowed"** → Not sliding window. Sum isn't monotonic.
- **Extend or restart** → One decision per element. O(n) single pass.
- **Initialize to nums[0]** → All-negative arrays return the least negative element.

If you checked every subarray, you found O(n²). The signal was "contiguous + max sum + negatives OK" — Kadane's every time.

> 🎯 **Kadane's Unlocked:** Extend if the running sum helps; restart if it poisons. `globalMax` captures the best segment anywhere.

---

*Next: when products flip signs, track both min and max. →*
