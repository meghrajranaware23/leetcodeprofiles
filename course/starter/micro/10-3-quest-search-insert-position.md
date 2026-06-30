<!-- hand-authored -->
# ⚔ Quest: Search Insert Position

> **Day 10** · [Search Insert Position #35](https://leetcode.com/problems/search-insert-position/) · Easy · 10 min · 10 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Search Insert Position on LeetCode](https://leetcode.com/problems/search-insert-position/)**

> ⚔ **Mentor's rule:** Trace `target=2` on paper — answer index 1. `hi=n`, not `n-1`.

---

## The Problem

Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be inserted in order.

**Example 1:**
```
Input: nums = [1,3,5,6], target = 5
Output: 2
```

**Example 2:**
```
Input: nums = [1,3,5,6], target = 2
Output: 1
```

**Example 3:**
```
Input: nums = [1,3,5,6], target = 7
Output: 4
```

**Constraints:** `1 <= nums.length <= 10^4`, `-10^4 <= nums[i], target <= 10^4`, all values **distinct**, array is **sorted ascending**

---

## 💡 Hints

1. Binary search: `lo=0`, `hi=n` (not n-1)
2. If `nums[mid] < target`, search right half
3. Trace `target=2` on paper — answer index 1
4. When loop ends, `lo` is the insert position

---

## 📖 Walkthrough

**Example 2:** `nums = [1,3,5,6], target = 2`

| step | lo | hi | mid | nums[mid] | action |
|------|----|----|-----|-----------|--------|
| 1 | 0 | 4 | 2 | 5 | 5>2 → hi=2 |
| 2 | 0 | 2 | 1 | 3 | 3>2 → hi=1 |
| 3 | 0 | 1 | 0 | 1 | 1<2 → lo=1 |
| done | 1 | 1 | — | — | return lo=1 |

**Plain English:** Binary search for first position where `nums[i] >= target`.

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
- *"`hi=n` not `n-1` — I traced target=7 to see insert at index 4."*
- *"Independent day: bounds were my stuck point — paper trace fixed it."*

> 🎯 **Skill practiced:** Binary Search Intro

---

*Two quests down. Move to today's checkpoint. →*
