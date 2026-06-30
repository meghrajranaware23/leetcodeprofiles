<!-- hand-authored -->
# ⚔ Quest: Find Pivot Index

> **Day 10** · [Find Pivot Index #724](https://leetcode.com/problems/find-pivot-index/) · Easy · 10 min · 10 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Find Pivot Index on LeetCode](https://leetcode.com/problems/find-pivot-index/)**

> ⚔ **Mentor's rule:** Independent solve day — full 10-minute attempt before hints. Trace index 3 on paper.

---

## The Problem

Given an array of integers `nums`, return the **leftmost** pivot index. The pivot index is where the sum of numbers to the left equals the sum to the right. If no such index exists, return `-1`.

**Example 1:**
```
Input: nums = [1,7,3,6,5,6]
Output: 3
Explanation: left sum = 1+7+3 = 11, right sum = 5+6 = 11
```

**Example 2:**
```
Input: nums = [1,2,3]
Output: -1
```

**Example 3:**
```
Input: nums = [2,1,-1]
Output: 0
```

**Constraints:** `1 <= nums.length <= 10^4`, `-1000 <= nums[i] <= 1000`

---

## 💡 Hints

1. Total sum once; track `left` as you scan
2. Right sum at i = `total - left - nums[i]`
3. Trace index 3 on paper before coding
4. Example 3: pivot at 0 — left sum is 0

---

## 📖 Walkthrough

**Example 1:** `[1,7,3,6,5,6]`, total = 28

| i | left | right (28-left-nums[i]) | pivot? |
|---|------|---------------------------|--------|
| 0 | 0 | 21 | no |
| 1 | 1 | 20 | no |
| 2 | 8 | 17 | no |
| 3 | 11 | 11 | **yes → return 3** |

**Plain English:** One pass — accumulate left sum; compare to total minus left minus current.

---

## Solution

### C++
```cpp
class Solution {
public:
    int pivotIndex(vector<int>& nums) {
        int total = 0;
        for (int n : nums) total += n;
        int left = 0;
        for (int i = 0; i < nums.size(); i++) {
            if (left == total - left - nums[i]) return i;
            left += nums[i];
        }
        return -1;
    }
};
```

### Python
```python
class Solution:
    def pivotIndex(self, nums: List[int]) -> int:
        total, left = sum(nums), 0
        for i, n in enumerate(nums):
            if left == total - left - n: return i
            left += n
        return -1
```

### Java
```java
class Solution {
    public int pivotIndex(int[] nums) {
        int total = 0;
        for (int n : nums) total += n;
        int left = 0;
        for (int i = 0; i < nums.length; i++) {
            if (left == total - left - nums[i]) return i;
            left += nums[i];
        }
        return -1;
    }
}
```

**Complexity:** O(n) time · O(1) space
---

## 💭 What a Mentor Would Tell You

- *"Prefix thinking — full Arrays pack later; today I traced."*
- *"Example 3 taught me left sum can be 0 at index 0 — I almost skipped it."*
- *"Independent day: I didn't open hints until my trace matched the table."*

> 🎯 **Skill practiced:** Prefix Sums

---

*One quest down. The next one builds on this skill. →*
