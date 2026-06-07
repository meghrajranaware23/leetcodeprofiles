# ⚔ Quest: Maximum Average Subarray I

> **Day 9** · [Maximum Average Subarray I #643](https://leetcode.com/problems/maximum-average-subarray-i/) · Easy · 10 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Maximum Average Subarray I on LeetCode](https://leetcode.com/problems/maximum-average-subarray-i/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen, paper, or your editor. The hints and walkthrough below are for *after* your attempt.

---

## The Problem

Given an integer array `nums` consisting of `n` elements and an integer `k`, find a contiguous subarray whose **length is equal to `k`** that has the maximum average value and return this value.

```
Input:  nums = [1, 12, -5, -6, 50, 3], k = 4
Output: 12.75
        (subarray [12, -5, -6, 50] has average 51/4 = 12.75)
```

---

## 💡 Hints

Maximizing the average of a fixed-length window is the same as maximizing the **sum** — divide by `k` only at the end.

Build the sum of the first `k` elements, then slide: add the new right element, subtract the element leaving on the left.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Fixed Sliding Window — Enter/Exit

**How to identify this from the problem statement:**
- "contiguous subarray whose length is equal to k" → fixed window size
- "maximum average" → track maximum window sum, divide by k at the end
- must examine every length-`k` window → slide with enter/exit

| Keyword / phrase | What it signals |
|---|---|
| "length equal to k" / "size k" | Fixed sliding window |
| "maximum average" / "maximum sum" | Running aggregate + track max |
| "contiguous subarray" | Single pass, no sorting |

**Why this pattern works:** Each slide changes exactly two elements. Enter/exit updates the sum in O(1) per window — O(n) total instead of O(n·k).

**How a strong solver thinks before coding:**
1. *"Fixed k → fixed sliding window."*
2. *"Max average = max sum; divide at the end."*
3. *"Build first window, slide with += right, -= left."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **For each start index, sum k elements** | O(n·k) — with n = 10⁵ and k = 10⁴, that's 10⁹ operations |
| **Sort or binary search on answer** | Average isn't monotonic over start positions — window sum can go up and down |
| **Prefix array then query each window** | Works in O(n), but unnecessary space when enter/exit is O(1) |

**The insight brute force misses:** Window `i` and window `i+1` share `k-1` elements. Only subtract `nums[i]` and add `nums[i+k]` — don't rescan k elements.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Maximum Average Subarray I #643](https://leetcode.com/problems/maximum-average-subarray-i/) | Track max sum, return average | Fixed window enter/exit |
| [Maximum Sum of Distinct Subarrays With Length K #2461](https://leetcode.com/problems/maximum-sum-of-distinct-subarrays-with-length-k/) | All elements in window must be unique | Fixed window + hash set |
| [Sliding Window Maximum #239](https://leetcode.com/problems/sliding-window-maximum/) | Need max, not sum | Fixed window + monotonic deque (B-Rank) |
| [Grumpy Bookstore Owner #1052](https://leetcode.com/problems/grumpy-bookstore-owner/) | Apply technique for k minutes | Fixed window on transformed array |

If you recognized Maximum Average Subarray, you have the skeleton for every fixed-window aggregate problem in D-Rank.

---

## 📖 Walkthrough

```
nums = [1, 12, -5, -6, 50, 3],  k = 4

Window 0: [1, 12, -5, -6]   sum = 2
Window 1: exit 1, enter 50  sum = 2 - 1 + 50 = 51   ← max
Window 2: exit 12, enter 3  sum = 51 - 12 + 3 = 42

max_sum = 51 → average = 51 / 4 = 12.75 ✓
```

> 💡 **The insight:** Compare sums as integers. Floating-point division only once at the end avoids precision issues.

---

## Solution

### C++
```cpp
class Solution {
public:
    double findMaxAverage(vector<int>& nums, int k) {
        int windowSum = 0;
        for (int i = 0; i < k; i++)
            windowSum += nums[i];

        int maxSum = windowSum;
        for (int right = k; right < (int)nums.size(); right++) {
            windowSum += nums[right];           // ENTER
            windowSum -= nums[right - k];       // EXIT
            maxSum = max(maxSum, windowSum);
        }
        return (double)maxSum / k;
    }
};
```

### Python
```python
class Solution:
    def findMaxAverage(self, nums: list[int], k: int) -> float:
        window_sum = sum(nums[:k])
        max_sum = window_sum

        for right in range(k, len(nums)):
            window_sum += nums[right]           # ENTER
            window_sum -= nums[right - k]       # EXIT
            max_sum = max(max_sum, window_sum)

        return max_sum / k
```

### Java
```java
class Solution {
    public double findMaxAverage(int[] nums, int k) {
        int windowSum = 0;
        for (int i = 0; i < k; i++)
            windowSum += nums[i];

        int maxSum = windowSum;
        for (int right = k; right < nums.length; right++) {
            windowSum += nums[right];           // ENTER
            windowSum -= nums[right - k];       // EXIT
            maxSum = Math.max(maxSum, windowSum);
        }
        return (double) maxSum / k;
    }
}
```

**Complexity:** O(n) time · O(1) space

---

## 💭 What Should Have Clicked in Your Mind?

Before you opened your editor, these thoughts should have fired:

- **"Length equal to k"** → Fixed sliding window. Not variable, not prefix-query.
- **"Maximum average"** → Max sum problem in disguise. Divide by k once at the end.
- **Enter/exit template** → `+= nums[right]`, `-= nums[right - k]`. This is Day 9's core mechanic.
- **"I don't need a prefix array"** → Streaming one pass is enough when scanning every window.

If you nested two loops summing k elements each time, you found brute force — but the signal was "size k" all along. Next time: hear "length k" → say "enter/exit slide" before writing code.

> 🎯 **Pattern Unlocked:** Fixed sliding window for O(n) window aggregates. Enter right, exit left — never rescan.

---

*Next: a window that isn't about sums — counting zeros inside a frame. →*
