# ⚔ Quest: Find Pivot Index

> **Day 5** · LeetCode #724 · Easy · 10 min

---

## The Mission

Given an array of integers `nums`, return the **pivot index** — the index where the sum of all elements to the left equals the sum of all elements to the right. If no such index exists, return `-1`.

```
Input:  [1, 7, 3, 6, 5, 6]
Output: 3       (← left sum: 1+7+3 = 11, right sum: 5+6 = 11)

Input:  [1, 2, 3]
Output: -1      (← no index where left sum = right sum)
```

> 🤔 **Before you scroll:** You know the total sum. As you scan left to right, you track a running left sum. Can you compute the right sum without a second pass?

---

## Approach

Compute the total sum first. Then scan left to right, maintaining a running left sum. At each index, the right sum is `total - left_sum - nums[i]`.

```
nums = [1, 7, 3, 6, 5, 6]
total = 28

i=0: left=0,  right=28-0-1=27   → 0 ≠ 27
i=1: left=1,  right=28-1-7=20   → 1 ≠ 20
i=2: left=8,  right=28-8-3=17   → 8 ≠ 17
i=3: left=11, right=28-11-6=11  → 11 == 11 ✓ → return 3
```

> 💡 **The insight:** You don't need a prefix sum array here. A single running total and one subtraction does the job. This is prefix sum thinking without the extra array.

---

## Solution

### C++
```cpp
class Solution {
public:
    int pivotIndex(vector<int>& nums) {
        int total = 0;
        for (int num : nums) total += num;
        int left_sum = 0;
        for (int i = 0; i < nums.size(); i++) {
            int right_sum = total - left_sum - nums[i];
            if (left_sum == right_sum) return i;
            left_sum += nums[i];
        }
        return -1;
    }
};
```

### Python
```python
class Solution:
    def pivotIndex(self, nums: list[int]) -> int:
        total = sum(nums)
        left_sum = 0
        for i, num in enumerate(nums):
            right_sum = total - left_sum - num
            if left_sum == right_sum:
                return i
            left_sum += num
        return -1
```

### Java
```java
class Solution {
    public int pivotIndex(int[] nums) {
        int total = 0;
        for (int num : nums) total += num;
        int leftSum = 0;
        for (int i = 0; i < nums.length; i++) {
            int rightSum = total - leftSum - nums[i];
            if (leftSum == rightSum) return i;
            leftSum += nums[i];
        }
        return -1;
    }
}
```

**Complexity:** O(n) time · O(1) space

> 🎯 **Pattern Unlocked:** Prefix sum thinking for balance-point problems. Compute the total, then use a running sum to split "left vs right" at each position.

---

*Both quests done! Time for your final E-Rank checkpoint. →*
