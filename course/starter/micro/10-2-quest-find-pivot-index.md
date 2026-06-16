<!-- hand-authored -->
# ⚔ Quest: Find Pivot Index

> **Day 10** · [Find Pivot Index #724](https://leetcode.com/problems/find-pivot-index/) · Easy · 10 min · 10 XP

---

**[→ Open on LeetCode](https://leetcode.com/problems/find-pivot-index/)**

---

## The Problem

Return leftmost index where sum left equals sum right. `-1` if none.

**Example:** `[1,7,3,6,5,6]` → `3` (left 1+7+3=11, right 5+6=11)

---

## 💡 Hints

1. Total sum once; track `left` as you scan
2. Right sum at i = `total - left - nums[i]`
3. Trace index 3 on paper before coding

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

> 🎯 **Skill practiced:** Prefix Sums

---

*One quest down. The next one builds on this skill. →*
