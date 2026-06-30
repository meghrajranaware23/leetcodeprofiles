<!-- hand-authored -->
# ⚔ Quest: Remove Element

> **Day 9** · [Remove Element #27](https://leetcode.com/problems/remove-element/) · Easy · 10 min · 10 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Remove Element on LeetCode](https://leetcode.com/problems/remove-element/)**

> ⚔ **Mentor's rule:** Return `w` — not `r`. Trace the all-`val` edge case before coding.

---

## The Problem

Given an integer array `nums` and an integer `val`, remove all occurrences of `val` in-place. The order of the elements may be changed. Return the number of elements in `nums` which are not equal to `val`.

**Example 1:**
```
Input: nums = [3,2,2,3], val = 3
Output: 2, nums = [2,2,_,_] (first 2 elements)
```

**Example 2:**
```
Input: nums = [0,1,2,2,3,0,4,2], val = 2
Output: 5, nums = [0,1,4,0,3,_,_,_]
```

**Constraints:** `0 <= nums.length <= 100`, `0 <= nums[i] <= 50`, `0 <= val <= 100`

---

## 💡 Hints

1. Write index `w`; scan `r`
2. If `nums[r] != val`, copy to `nums[w++]`
3. Return `w` — not `r`
4. Edge: all elements equal val → return 0

---

## 📖 Walkthrough

**Example 1:** `nums = [3,2,2,3], val = 3`

| r | nums[r] | action | w after |
|---|---------|--------|---------|
| 0 | 3 | skip (equals val) | 0 |
| 1 | 2 | write to w=0 | 1 |
| 2 | 2 | write to w=1 | 2 |
| 3 | 3 | skip | 2 |

Return `2`. First two slots: `[2,2]`.

**Plain English:** Keep non-`val` elements at the front; return how many you kept.

---

## Solution

### C++
```cpp
class Solution {
public:
    int removeElement(vector<int>& nums, int val) {
        int w = 0;
        for (int r = 0; r < nums.size(); r++)
            if (nums[r] != val) nums[w++] = nums[r];
        return w;
    }
};
```

### Python
```python
class Solution:
    def removeElement(self, nums: List[int], val: int) -> int:
        w = 0
        for r in range(len(nums)):
            if nums[r] != val:
                nums[w] = nums[r]
                w += 1
        return w
```

### Java
```java
class Solution {
    public int removeElement(int[] nums, int val) {
        int w = 0;
        for (int r = 0; r < nums.length; r++)
            if (nums[r] != val) nums[w++] = nums[r];
        return w;
    }
}
```

**Complexity:** O(n) time · O(1) space
---

## 💭 What a Mentor Would Tell You

- *"Returning w not r — classic Day 9 mistake I avoided by tracing."*
- *"All elements equal val → return 0. I tested that edge before Submit."*
- *"Same w/r family as Move Zeroes — third time this week, pattern sticks."*

> 🎯 **Skill practiced:** Mistake Prevention

---

*Two quests down. Move to today's checkpoint. →*
