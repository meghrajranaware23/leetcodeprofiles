<!-- hand-authored -->
# ⚔ Quest: Move Zeroes

> **Day 9** · [Move Zeroes #283](https://leetcode.com/problems/move-zeroes/) · Easy · 10 min · 10 XP

---

**[→ Open on LeetCode](https://leetcode.com/problems/move-zeroes/)**

---

## The Problem

Move all 0s to end in-place. Maintain relative order of non-zero elements.

**Example:** `[0,1,0,3,12]` → `[1,3,12,0,0]`

---

## 💡 Hints

1. Phase 1: write all non-zero at front with `w`
2. Phase 2: fill rest with 0
3. Trace `[0,1,0,3,12]` — watch `w` after each non-zero
4. Day 8 family: same write-index pattern as Remove Dup

---

## Solution

### C++
```cpp
class Solution {
public:
    void moveZeroes(vector<int>& nums) {
        int w = 0;
        for (int n : nums) if (n != 0) nums[w++] = n;
        while (w < nums.size()) nums[w++] = 0;
    }
};
```

### Python
```python
class Solution:
    def moveZeroes(self, nums: List[int]) -> None:
        w = 0
        for n in nums:
            if n != 0:
                nums[w] = n
                w += 1
        while w < len(nums):
            nums[w] = 0
            w += 1
```

### Java
```java
class Solution {
    public void moveZeroes(int[] nums) {
        int w = 0;
        for (int n : nums) if (n != 0) nums[w++] = n;
        while (w < nums.length) nums[w++] = 0;
    }
}
```

**Complexity:** O(n) time · O(1) space
---

## 💭 What a Mentor Would Tell You

- *"Same w/r pattern as Day 8 — I traced before coding."*

> 🎯 **Skill practiced:** In-Place Shifting

---

*One quest down. The next one builds on this skill. →*
