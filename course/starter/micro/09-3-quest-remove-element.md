<!-- hand-authored -->
# ⚔ Quest: Remove Element

> **Day 9** · [Remove Element #27](https://leetcode.com/problems/remove-element/) · Easy · 10 min · 10 XP

---

**[→ Open on LeetCode](https://leetcode.com/problems/remove-element/)**

---

## The Problem

Remove all instances of `val` in-place. Return count of elements not equal to `val`.

**Example:** `nums = [3,2,2,3], val = 3` → `2`, nums = `[2,2,_,_]`

---

## 💡 Hints

1. Write index `w`; scan `r`
2. If `nums[r] != val`, copy to `nums[w++]`
3. Return `w` — not `r`
4. Edge: all elements equal val → return 0

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

> 🎯 **Skill practiced:** Mistake Prevention

---

*Two quests down. Move to today's checkpoint. →*
