# ⚔ Quest: Maximum Product Subarray

> **Day 12** · [Maximum Product Subarray #152](https://leetcode.com/problems/maximum-product-subarray/) · Medium · 25 XP · 20 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Maximum Product Subarray on LeetCode](https://leetcode.com/problems/maximum-product-subarray/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen, paper, or your editor. The hints and walkthrough below are for *after* your attempt.

---

## The Problem

Given an integer array `nums`, find a contiguous subarray that has the **largest product**, and return the product.

```
Input:  nums = [2, 3, -2, 4]
Output: 6
        (subarray [2, 3])

Input:  nums = [-2, 0, -1]
Output: 0
        (subarray [0] or [-2, 0])

Input:  nums = [-2, 3, -4]
Output: 24
        (entire array: -2 × 3 × -4 = 24)
```

The subarray must be non-empty. The answer fits in a 32-bit integer.

---

## 💡 Hints

Kadane's extend-or-restart works for sums. For **products**, a negative number flips the sign — a subarray that's currently your *worst* (most negative product) can become your *best* after multiplying by another negative.

Track **both** `currentMax` and `currentMin` at each step. A large negative min × negative number = large positive max.

At each element, compute three candidates: extend max, extend min, restart. Update both running values.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Kadane's Algorithm — Extend or Restart with Min/Max Tracking

**How to identify this from the problem statement:**
- "maximum product subarray" → Kadane's variant
- negative numbers can flip sign → need min tracking, not just max
- "contiguous" → subarray, single pass

| Keyword / phrase | What it signals |
|---|---|
| "maximum product" / "largest product" | Kadane's with min + max |
| "negative numbers" | Sign flip — min product can become max |
| "contiguous subarray" | Extend or restart, not subsequence |
| "contains zero" | Zero forces restart (product becomes 0) |

**Why this pattern works:** The best product ending at `i` might come from extending the previous max OR the previous min (if `nums[i]` is negative). Tracking both covers sign flips in O(1) per step.

**How a strong solver thinks before coding:**
1. *"Max product subarray → Kadane's, but negatives flip signs."*
2. *"Track currentMax AND currentMin ending here."*
3. *"If nums[i] < 0, swap max and min before extending — or compute both candidates explicitly."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Check every subarray, multiply elements** | O(n²) — too slow |
| **Kadane's with max only (no min tracking)** | Misses `-2 × 3 × -4 = 24` — the min at step 2 becomes the max at step 3 |
| **Sliding window on product** | Product isn't monotonic with negatives — same failure as max sum |
| **Sort and pick extremes** | Subarray must be contiguous — sorting destroys order |

**The insight brute force misses:** A running product at its **minimum** (large negative) is one negative multiplier away from becoming the **maximum**. You must carry both extremes forward.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Maximum Product Subarray #152](https://leetcode.com/problems/maximum-product-subarray/) | Product, sign flips | Kadane's min + max |
| [Maximum Subarray #53](https://leetcode.com/problems/maximum-subarray/) | Sum only | Kadane's max only |
| [Maximum Swap #670](https://leetcode.com/problems/maximum-swap/) | Single swap allowed | Different pattern — not Kadane's |
| [Sign of the Product of an Array #1822](https://leetcode.com/problems/sign-of-the-product-of-an-array/) | Count negatives/zeros | Related sign logic, simpler |

When the operation is **addition**, track one running value. When it's **multiplication with negatives**, track two.

---

## 📖 Walkthrough

```
nums = [2, 3, -2, 4]

 i  num   candidates (extend max, extend min, restart)     curMax  curMin  globalMax
 0   2    restart → 2                                       2       2        2
 1   3    extend max: 2×3=6, restart: 3 → 6                6       6        6
 2  -2    extend max: 6×(-2)=-12, extend min: 6×(-2)=-12
         restart: -2 → max(-12,-12,-2) = -2                -2      -12       6
 3   4    extend max: -2×4=-8, extend min: -12×4=-48
         restart: 4 → max(-8,-48,4) = 4                     4       -48       6

Answer: 6 ✓  (subarray [2, 3])
```

```
nums = [-2, 3, -4]

 i  num   curMax   curMin   globalMax
 0  -2      -2       -2         -2
 1   3      -2×3=-6, -2×3=-6, restart 3 → max=3, min=-6    3       -6         3
 2  -4      min(-6×-4=24, 3×-4=-12, -4) → curMax=24
            max(-6×-4=24, 3×-4=-12, -4) → curMin=-12       24      -12        24

Answer: 24 ✓  (entire array)
```

At index 2, `curMin` was -6. Multiplying by -4 flips it to +24 — the best product ending here.

> 💡 **The insight:** Negative × negative = positive. The min product ending at `i-1` can produce the max product at `i`. Always track both.

---

## Solution

### C++
```cpp
class Solution {
public:
    int maxProduct(vector<int>& nums) {
        int curMax = nums[0], curMin = nums[0], globalMax = nums[0];

        for (int i = 1; i < (int)nums.size(); i++) {
            int n = nums[i];
            if (n < 0) swap(curMax, curMin);  // flip: old min may become new max

            curMax = max(n, curMax * n);      // extend or restart (max)
            curMin = min(n, curMin * n);      // extend or restart (min)
            globalMax = max(globalMax, curMax);
        }
        return globalMax;
    }
};
```

### Python
```python
class Solution:
    def maxProduct(self, nums: list[int]) -> int:
        cur_max = cur_min = global_max = nums[0]

        for i in range(1, len(nums)):
            n = nums[i]
            if n < 0:
                cur_max, cur_min = cur_min, cur_max  # flip: old min may become new max

            cur_max = max(n, cur_max * n)            # extend or restart (max)
            cur_min = min(n, cur_min * n)            # extend or restart (min)
            global_max = max(global_max, cur_max)

        return global_max
```

### Java
```java
class Solution {
    public int maxProduct(int[] nums) {
        int curMax = nums[0], curMin = nums[0], globalMax = nums[0];

        for (int i = 1; i < nums.length; i++) {
            int n = nums[i];
            if (n < 0) {
                int temp = curMax;
                curMax = curMin;
                curMin = temp;                       // flip: old min may become new max
            }

            curMax = Math.max(n, curMax * n);         // extend or restart (max)
            curMin = Math.min(n, curMin * n);         // extend or restart (min)
            globalMax = Math.max(globalMax, curMax);
        }
        return globalMax;
    }
}
```

**Complexity:** O(n) time · O(1) space

---

## 💭 What Should Have Clicked in Your Mind?

Before you opened your editor, these thoughts should have fired:

- **"Maximum product subarray"** → Kadane's variant from today's concept.
- **"Negative numbers"** → Track min AND max. Sign flip is the whole trick.
- **Extend or restart** → Same decision as #53, but two running values instead of one.
- **Zero in array** → Restart at zero (extend gives 0 anyway).

If you only tracked max, you missed `[-2, 3, -4] → 24`. The signal was "product + negatives" — min tracking is mandatory.

> 🎯 **Kadane's Extended:** Sums need one runner. Products with negatives need two — today's min is tomorrow's max.

---

*Next: checkpoint — prove Kadane's instinct is yours. →*
