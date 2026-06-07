# ⚔ Quest: Minimum Size Subarray Sum

> **Day 10** · [Minimum Size Subarray Sum #209](https://leetcode.com/problems/minimum-size-subarray-sum/) · Medium · 15 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Minimum Size Subarray Sum on LeetCode](https://leetcode.com/problems/minimum-size-subarray-sum/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen, paper, or your editor. The hints and walkthrough below are for *after* your attempt.

---

## The Problem

Given an array of **positive integers** `nums` and a positive integer `target`, return the **minimal length** of a contiguous subarray whose sum is greater than or equal to `target`. If there is no such subarray, return `0`.

```
Input:  target = 7, nums = [2, 3, 1, 2, 4, 3]
Output: 2
        (subarray [4, 3] has sum 7)

Input:  target = 4, nums = [1, 4, 4]
Output: 1

Input:  target = 11, nums = [1, 1, 1, 1, 1, 1, 1, 1]
Output: 0
```

---

## 💡 Hints

All elements are positive — growing the window **always increases** the sum, shrinking **always decreases** it. That monotonicity makes two pointers work.

Expand `right` until `windowSum >= target`. Then shrink `left` while the sum stays valid, tracking the minimum length.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Variable Sliding Window — Expand Right, Shrink Left (Shortest Valid)

**How to identify this from the problem statement:**
- "minimal length" contiguous subarray → variable window, track minimum
- "sum ≥ target" → expand until valid, shrink while still valid
- **positive integers only** → sum is monotonic; two pointers are safe

| Keyword / phrase | What it signals |
|---|---|
| "minimal length" / "shortest subarray" | Variable window, minimize size |
| "sum ≥ target" / "at least target" | Expand until sum ≥ target, then shrink |
| "positive integers" | Monotonic sum — enables O(n) two pointers |

**Why this pattern works:** With positive numbers, once `windowSum >= target`, removing from the left can only decrease the sum. Shrink while still ≥ target to find the shortest valid window ending at `right`.

**How a strong solver thinks before coding:**
1. *"Shortest subarray, sum ≥ target, all positive → variable window."*
2. *"Expand right until valid. Shrink left while still valid."*
3. *"Track min length. Return 0 if never valid."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Check every subarray [i..j], compute sum** | O(n²) — fails at n = 10⁵ |
| **Prefix sum + binary search per start** | O(n log n) — works but slower than O(n) two pointers |
| **Sliding window with negative numbers** | Not valid here — but note: positive-only is required for this O(n) approach |

**The insight brute force misses:** For positive arrays, the sum only goes up when you expand and only goes down when you shrink. You never need to restart — `left` only moves forward.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Minimum Size Subarray Sum #209](https://leetcode.com/problems/minimum-size-subarray-sum/) | Sum ≥ target, minimize length | Shrink while valid |
| [Minimum Window Substring #76](https://leetcode.com/problems/minimum-window-substring/) | Character coverage constraint | Shrink while valid (C-Rank) |
| [Max Consecutive Ones III #1004](https://leetcode.com/problems/max-consecutive-ones-iii/) | Maximize length with budget | Shrink when invalid (opposite goal) |
| [Subarray Product Less Than K #713](https://leetcode.com/problems/subarray-product-less-than-k/) | Product < k, count subarrays | Expand/shrink on product |

Minimum Size Subarray Sum is the canonical **shortest valid window** template. Memorize the shrink-while-valid loop.

---

## 📖 Walkthrough

```
target = 7, nums = [2, 3, 1, 2, 4, 3]

right=3: window [2,3,1,2] sum=8 ≥ 7
  shrink: left=1 [3,1,2] sum=6 < 7 → stop, len=3, min=3
right=4: window [3,1,2,4] sum=10 ≥ 7
  shrink: left=2 [1,2,4] sum=7 ≥ 7, len=3
  shrink: left=3 [2,4] sum=6 < 7 → stop, min=3
right=5: window [2,4,3] sum=9 ≥ 7
  shrink: left=4 [4,3] sum=7 ≥ 7, len=2
  shrink: left=5 [3] sum=3 < 7 → stop, min=2 ✓
```

> 💡 **The insight:** For each `right`, shrink `left` as far as possible while sum ≥ target. That finds the shortest window ending at `right`.

---

## Solution

### C++
```cpp
class Solution {
public:
    int minSubArrayLen(int target, vector<int>& nums) {
        int left = 0, windowSum = 0, minLen = INT_MAX;

        for (int right = 0; right < (int)nums.size(); right++) {
            windowSum += nums[right];                   // EXPAND

            while (windowSum >= target) {
                minLen = min(minLen, right - left + 1);
                windowSum -= nums[left];                 // SHRINK
                left++;
            }
        }
        return minLen == INT_MAX ? 0 : minLen;
    }
};
```

### Python
```python
class Solution:
    def minSubArrayLen(self, target: int, nums: list[int]) -> int:
        left = window_sum = 0
        min_len = float('inf')

        for right in range(len(nums)):
            window_sum += nums[right]                   # EXPAND

            while window_sum >= target:
                min_len = min(min_len, right - left + 1)
                window_sum -= nums[left]                # SHRINK
                left += 1

        return 0 if min_len == float('inf') else min_len
```

### Java
```java
class Solution {
    public int minSubArrayLen(int target, int[] nums) {
        int left = 0, windowSum = 0, minLen = Integer.MAX_VALUE;

        for (int right = 0; right < nums.length; right++) {
            windowSum += nums[right];                   // EXPAND

            while (windowSum >= target) {
                minLen = Math.min(minLen, right - left + 1);
                windowSum -= nums[left];                // SHRINK
                left++;
            }
        }
        return minLen == Integer.MAX_VALUE ? 0 : minLen;
    }
}
```

**Complexity:** O(n) time · O(1) space

---

## 💭 What Should Have Clicked in Your Mind?

Before you opened your editor, these thoughts should have fired:

- **"Minimal length" + "sum ≥ target"** → Shortest valid variable window.
- **"Positive integers"** → Monotonic sum. Two pointers work in O(n). (With negatives, you'd need prefix sum + hash map.)
- **Shrink while valid** — opposite of Max Consecutive Ones III, which shrinks when *invalid*.
- **Return 0 if impossible** — initialize `minLen` to infinity, check at the end.

If you nested loops over all subarrays, you found O(n²). The signal was "shortest contiguous subarray meeting sum condition on positive array" — that's expand/shrink.

> 🎯 **Pattern Unlocked:** Shortest valid window — expand until valid, shrink while still valid, track minimum length.

---

*Next: your first pattern combo — hash set meets sliding window. →*
