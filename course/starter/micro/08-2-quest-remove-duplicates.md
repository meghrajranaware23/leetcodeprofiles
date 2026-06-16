<!-- hand-authored -->
# ⚔ Quest: Remove Duplicates from Sorted Array

> **Day 8** · [Remove Duplicates #26](https://leetcode.com/problems/remove-duplicates-from-sorted-array/) · Easy · 10 min · 10 XP

---

**[→ Open on LeetCode](https://leetcode.com/problems/remove-duplicates-from-sorted-array/)**

> ⚔ Attempt 5 min → read editorial for two-pointer idea → close → code yourself.

---

## The Problem

Remove duplicates **in-place**. Return count of unique elements.

**Example:** `[1,1,2]` → `2`, nums = `[1,2,_]`

**Constraints:** Sorted ascending; O(1) extra space

---

## 💡 Hints

1. Sorted → duplicates are adjacent
2. `w` = next unique write index; start `w=1`
3. If `nums[r] != nums[r-1]`, copy to `nums[w++]`
4. Return `w` (length of unique prefix)

---

## 📖 Walkthrough

```
[1,1,2,2,3]
 w=1 r scans
 r=1: dup skip
 r=2: nums[1]=2, w=2
 ...
 return w=3
```

---

## Solution

### C++
```cpp
class Solution {
public:
    int removeDuplicates(vector<int>& nums) {
        if (nums.empty()) return 0;
        int w = 1;
        for (int r = 1; r < nums.size(); r++)
            if (nums[r] != nums[r-1]) nums[w++] = nums[r];
        return w;
    }
};
```

### Python
```python
class Solution:
    def removeDuplicates(self, nums: List[int]) -> int:
        if not nums: return 0
        w = 1
        for r in range(1, len(nums)):
            if nums[r] != nums[r-1]:
                nums[w] = nums[r]
                w += 1
        return w
```

### Java
```java
class Solution {
    public int removeDuplicates(int[] nums) {
        if (nums.length == 0) return 0;
        int w = 1;
        for (int r = 1; r < nums.length; r++)
            if (nums[r] != nums[r-1]) nums[w++] = nums[r];
        return w;
    }
}
```

**Complexity:** O(n) time · O(1) space
---

## 💭 What a Mentor Would Tell You

- *"Editorial taught slow/fast — I closed it and rewrote from memory."*

> 🎯 **Skill practiced:** Two-Pointer Intro

---

*One quest down. The next one builds on this skill. →*
