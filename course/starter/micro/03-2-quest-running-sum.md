<!-- hand-authored -->
# ⚔ Quest: Running Sum of 1d Array

> **Day 3** · [Running Sum #1480](https://leetcode.com/problems/running-sum-of-1d-array/) · Easy · 10 min · 10 XP

---

## 🎯 Try the Problem First

**[→ Open Running Sum on LeetCode](https://leetcode.com/problems/running-sum-of-1d-array/)**

> ⚔ **Mentor's rule:** Fill the hand-trace table below **before** coding.

---

## The Problem

Return `runningSum` where `runningSum[i] = sum(nums[0]..nums[i])`.

**Example 1:** `nums = [1,2,3,4]` → `[1,3,6,10]`

**Example 2:** `nums = [1,1,1,1,1]` → `[1,2,3,4,5]`

**Example 3:** `nums = [3,1,2,10,1]` → `[3,4,6,16,17]`

**Constraints:** `1 <= nums.length <= 1000`

---

## 💡 Hints

1. `runningSum[0]` stays `nums[0]` — loop starts at index 1
2. Each step: `nums[i] += nums[i-1]` (in-place is fine)
3. Trace Example 1 row-by-row — if your table matches `[1,3,6,10]`, your code will too
4. Custom test: `[5]` → output `[5]`

---

## 📖 Walkthrough (hand trace)

**Example 1:** `[1, 2, 3, 4]`

| i | before | operation | after |
|---|--------|-----------|-------|
| 0 | 1 | (unchanged) | 1 |
| 1 | 2 | 2+1 | 3 |
| 2 | 3 | 3+3 | 6 |
| 3 | 4 | 4+6 | 10 |

**Plain English:** Each position adds the previous running total.

---

## 🔗 Related

| Problem | Skill |
|---|---|
| [Find Pivot Index #724](https://leetcode.com/problems/find-pivot-index/) | Prefix sums (Day 10) |
| [Calculate Money in Leetcode Bank #1360](https://leetcode.com/problems/calculate-money-in-leetcode-bank/) | Running total trace |

---

## Solution

### C++
```cpp
class Solution {
public:
    vector<int> runningSum(vector<int>& nums) {
        for (int i = 1; i < nums.size(); i++) nums[i] += nums[i-1];
        return nums;
    }
};
```

### Python
```python
class Solution:
    def runningSum(self, nums: List[int]) -> List[int]:
        for i in range(1, len(nums)):
            nums[i] += nums[i-1]
        return nums
```

### Java
```java
class Solution {
    public int[] runningSum(int[] nums) {
        for (int i = 1; i < nums.length; i++) nums[i] += nums[i-1];
        return nums;
    }
}
```

**Complexity:** O(n) time · O(1) space
---

## 💭 What a Mentor Would Tell You

- *"The trace table IS my algorithm — code was copy-paste."*
- *"I invented `[5]` as a custom test — single element still works."*

> 🎯 **Skill practiced:** Hand Tracing

---

*One quest down. The next one builds on this skill. →*
