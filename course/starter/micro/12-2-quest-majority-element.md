<!-- hand-authored -->
# ⚔ Quest: Majority Element

> **Day 12** · [Majority Element #169](https://leetcode.com/problems/majority-element/) · Easy · 10 min · 10 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Majority Element on LeetCode](https://leetcode.com/problems/majority-element/)**

> ⚔ **Mentor's rule:** Re-solve comparison day — time yourself and log minutes in your journal.

---

## The Problem

Given an array `nums` of size `n`, return the majority element. The majority element appears more than `⌊n / 2⌋` times. You may assume the majority element always exists.

**Example 1:**
```
Input: nums = [3,2,3]
Output: 3
```

**Example 2:**
```
Input: nums = [2,2,1,1,1,2,2]
Output: 2
```

**Constraints:** `n == nums.length`, `1 <= n <= 5 * 10^4`, `-10^9 <= nums[i] <= 10^9`

---

## 💡 Hints

1. Hash count works — O(n) time
2. Boyer-Moore vote: cancel different pairs; survivor is majority
3. Compare your Day 12 time to a hypothetical Week 1 attempt
4. Trace `[3,2,3]`: cand=3, count cancels 2, ends with 3

---

## 📖 Walkthrough

**Example 1:** `[3,2,3]` (Boyer-Moore)

| n | count before | action | cand | count after |
|---|--------------|--------|------|-------------|
| 3 | 0 | new cand | 3 | 1 |
| 2 | 1 | cancel | 3 | 0 |
| 3 | 0 | new cand | 3 | 1 |

Return `3`.

---

## Solution

### C++
```cpp
class Solution {
public:
    int majorityElement(vector<int>& nums) {
        int cand = 0, count = 0;
        for (int n : nums) {
            if (count == 0) { cand = n; count = 1; }
            else if (n == cand) count++;
            else count--;
        }
        return cand;
    }
};
```

### Python
```python
class Solution:
    def majorityElement(self, nums: List[int]) -> int:
        cand, count = 0, 0
        for n in nums:
            if count == 0: cand, count = n, 1
            elif n == cand: count += 1
            else: count -= 1
        return cand
```

### Java
```java
class Solution {
    public int majorityElement(int[] nums) {
        int cand = 0, count = 0;
        for (int n : nums) {
            if (count == 0) { cand = n; count = 1; }
            else if (n == cand) count++;
            else count--;
        }
        return cand;
    }
}
```

**Complexity:** O(n) time · O(1) space
---

## 💭 What a Mentor Would Tell You

- *"Logged re-solve time in journal — faster than I'd have been on Day 5."*
- *"Hash map works too — Boyer-Moore is the editorial upgrade I'll revisit."*
- *"array-scan family — one pass, track something."*

> 🎯 **Skill practiced:** Re-Solve Comparison

---

*One quest down. The next one builds on this skill. →*
