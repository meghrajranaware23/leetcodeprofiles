<!-- hand-authored -->
# ⚔ Quest: Search Insert Position

> **Day 10** · [Search Insert Position #35](https://leetcode.com/problems/search-insert-position/) · Easy · 10 min · 10 XP

---

**[→ Open on LeetCode](https://leetcode.com/problems/search-insert-position/)**

---

## The Problem

Sorted array, find index of `target` or where it would be inserted.

**Example:** `nums = [1,3,5,6], target = 5` → `2`

**Example:** `target = 2` → `1`

---

## 💡 Hints

1. Binary search: `lo=0`, `hi=n` (not n-1)
2. If `nums[mid] < target`, search right half
3. Trace `target=2` on paper — answer index 1

---

## Solution

### C++
```cpp
class Solution {
public:
    int searchInsert(vector<int>& nums, int target) {
        int lo = 0, hi = nums.size();
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (nums[mid] < target) lo = mid + 1;
            else hi = mid;
        }
        return lo;
    }
};
```

### Python
```python
class Solution:
    def searchInsert(self, nums: List[int], target: int) -> int:
        lo, hi = 0, len(nums)
        while lo < hi:
            mid = (lo + hi) // 2
            if nums[mid] < target: lo = mid + 1
            else: hi = mid
        return lo
```

### Java
```java
class Solution {
    public int searchInsert(int[] nums, int target) {
        int lo = 0, hi = nums.length;
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (nums[mid] < target) lo = mid + 1;
            else hi = mid;
        }
        return lo;
    }
}
```

**Complexity:** O(log n) time · O(1) space
---

## 💭 What a Mentor Would Tell You

- *"Sorted + find position → binary search seed for later packs."*

> 🎯 **Skill practiced:** Binary Search Intro

---

*Two quests down. Move to today's checkpoint. →*
