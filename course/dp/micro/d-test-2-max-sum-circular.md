<!-- hand-authored -->
# ⚔ D-Rank Test — Problem 2

> [Maximum Sum Circular Subarray #918](https://leetcode.com/problems/maximum-sum-circular-subarray/) · Medium · 100 XP

---

You've completed your D-Rank training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Maximum Sum Circular Subarray on LeetCode](https://leetcode.com/problems/maximum-sum-circular-subarray/)**

> ⚔ **Hunter's rule:** Circle + **contiguous subarray** — bridge **E-Rank Kadane** with **Day 9 circular thinking**. Not House Robber two-pass.

---

## The Problem

See the full problem statement on LeetCode: **[Maximum Sum Circular Subarray #918](https://leetcode.com/problems/maximum-sum-circular-subarray/)**

---

## 💡 Hints

> 🎯 **What's being tested:** **Circular Kadane** — max subarray either non-wrapping (normal Kadane) or **wraps around** the circle.

- **Case 1:** Standard max subarray sum (Kadane `curMax`, `maxSum`)
- **Case 2 (wrap):** Total sum − **minimum** subarray sum (`curMin`, `minSum`)
  - Wrapping max = `total - minSum` (exclude the middle minimum segment)
- **All negative:** `maxSum < 0` → return `maxSum` (can't wrap profitably)
- Else: `max(maxSum, total - minSum)`

**Not Day 9 robber:** subarray is **contiguous**, may wrap — dual Kadane, not `robRange`.

**Pattern name before coding:** *Kadane max + min bridge for circular subarray (E5 + Day 9 circle).*

---

## 🔍 Pattern Recognition Breakdown

**How to identify from the statement:**
- "Circular array" + **subarray** (not pick/non-adjacent)
- Max **sum**, not product (Day 9 dual product)
- Connects to [Maximum Subarray #53](https://leetcode.com/problems/maximum-subarray/) from E-Rank

**How a strong solver thinks before coding:**
1. *"Run Kadane for max and for min in one pass."*
2. *"Track total sum."*
3. *"If all negative, maxSum is the answer."*
4. *"Else max(maxSum, total - minSum)."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **House Robber II two-pass** | Wrong constraint — subarray is contiguous, not skip/take |
| **Duplicate array length 2n** | O(n) Kadane on circle math is cleaner |
| **Only normal Kadane** | Misses wrap case like `[5,-3,5]` on circle |
| **total - minSum when all negative** | Would return 0 incorrectly — guard with maxSum < 0 |

---

## 🎯 Transfer to Unseen Problems

**Day 9 contrast:** House Robber II = **non-adjacent** on circle → two rob passes. This = **contiguous** on circle → Kadane + total−min.

Reference: **E-Rank Maximum Subarray** + **Day 9 circular flavor**.

---

<details>
<summary><strong>📖 Solution & Walkthrough</strong></summary>

Fill the DP table for the given example. Trace which cells each cell depends on. Then implement the transition.

### C++
```cpp
class Solution {
public:
    int maxSubarraySumCircular(vector<int>& nums) {
        int total = 0, maxSum = INT_MIN, curMax = 0, minSum = INT_MAX, curMin = 0;
        for (int num : nums) {
            total += num;
            curMax = max(num, curMax + num);
            maxSum = max(maxSum, curMax);
            curMin = min(num, curMin + num);
            minSum = min(minSum, curMin);
        }
        return maxSum < 0 ? maxSum : max(maxSum, total - minSum);
    }
};
```

### Python
```python
class Solution:
    def maxSubarraySumCircular(self, nums: List[int]) -> int:
        total = 0
        max_sum = float('-inf'); cur_max = 0
        min_sum = float('inf'); cur_min = 0
        for num in nums:
            total += num
            cur_max = max(num, cur_max + num)
            max_sum = max(max_sum, cur_max)
            cur_min = min(num, cur_min + num)
            min_sum = min(min_sum, cur_min)
        return max_sum if max_sum < 0 else max(max_sum, total - min_sum)
```

### Java
```java
class Solution {
    public int maxSubarraySumCircular(int[] nums) {
        int total = 0, maxSum = Integer.MIN_VALUE, curMax = 0;
        int minSum = Integer.MAX_VALUE, curMin = 0;
        for (int num : nums) {
            total += num;
            curMax = Math.max(num, curMax + num);
            maxSum = Math.max(maxSum, curMax);
            curMin = Math.min(num, curMin + num);
            minSum = Math.min(minSum, curMin);
        }
        return maxSum < 0 ? maxSum : Math.max(maxSum, total - minSum);
    }
}
```

**Complexity:** O(n) time · O(1) space

</details>

---

## 💭 What Should Have Clicked in Your Mind?

- **"Circular subarray max sum"** → Kadane max + (total − Kadane min).
- **"All negative"** → only maxSum valid.
- **"Not robber II"** — contiguous wrap, not non-adjacent.
- **"E5 bridge"** — same curMax/curMin pass as Maximum Subarray.

---

*2 of 3 test problems. Continue to the next. →*

## Solution

### C++
```cpp
class Solution {
public:
    int maxSubarraySumCircular(vector<int>& nums) {
        int total = 0, maxSum = INT_MIN, curMax = 0, minSum = INT_MAX, curMin = 0;
        for (int num : nums) {
            total += num;
            curMax = max(num, curMax + num);
            maxSum = max(maxSum, curMax);
            curMin = min(num, curMin + num);
            minSum = min(minSum, curMin);
        }
        return maxSum < 0 ? maxSum : max(maxSum, total - minSum);
    }
};
```

### Python
```python
class Solution:
    def maxSubarraySumCircular(self, nums: List[int]) -> int:
        total = 0
        max_sum = float('-inf'); cur_max = 0
        min_sum = float('inf'); cur_min = 0
        for num in nums:
            total += num
            cur_max = max(num, cur_max + num)
            max_sum = max(max_sum, cur_max)
            cur_min = min(num, cur_min + num)
            min_sum = min(min_sum, cur_min)
        return max_sum if max_sum < 0 else max(max_sum, total - min_sum)
```

### Java
```java
class Solution {
    public int maxSubarraySumCircular(int[] nums) {
        int total = 0, maxSum = Integer.MIN_VALUE, curMax = 0;
        int minSum = Integer.MAX_VALUE, curMin = 0;
        for (int num : nums) {
            total += num;
            curMax = Math.max(num, curMax + num);
            maxSum = Math.max(maxSum, curMax);
            curMin = Math.min(num, curMin + num);
            minSum = Math.min(minSum, curMin);
        }
        return maxSum < 0 ? maxSum : Math.max(maxSum, total - minSum);
    }
}
```

**Complexity:** O(n) time · O(1) space
