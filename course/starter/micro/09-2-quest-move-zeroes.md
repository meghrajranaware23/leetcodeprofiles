<!-- hand-authored -->
# ⚔ Quest: Move Zeroes

> **Day 9** · [Move Zeroes #283](https://leetcode.com/problems/move-zeroes/) · Easy · 10 min · 10 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Move Zeroes on LeetCode](https://leetcode.com/problems/move-zeroes/)**

> ⚔ **Mentor's rule:** Trace `w` after each non-zero on paper **before** coding. Same write-index family as Day 8 Remove Dup.

---

## The Problem

Given an integer array `nums`, move all `0`'s to the end of it while maintaining the relative order of the non-zero elements.

**Note:** You must do this in-place without making a copy of the array.

**Example 1:**
```
Input: nums = [0,1,0,3,12]
Output: [1,3,12,0,0]
```

**Example 2:**
```
Input: nums = [0]
Output: [0]
```

**Constraints:** `1 <= nums.length <= 10^4`, `-2^31 <= nums[i] <= 2^31 - 1`

---

## 💡 Hints

1. Phase 1: write all non-zero at front with `w`
2. Phase 2: fill rest with 0
3. Trace `[0,1,0,3,12]` — watch `w` after each non-zero
4. Day 8 family: same write-index pattern as Remove Dup

---

## 📖 Walkthrough

**Example 1:** `[0,1,0,3,12]`

| step | r value | action | w after | array snapshot |
|------|---------|--------|---------|----------------|
| 1 | 0 | skip (zero) | 0 | [0,1,0,3,12] |
| 2 | 1 | write 1 at w=0 | 1 | [1,1,0,3,12] |
| 3 | 0 | skip | 1 | — |
| 4 | 3 | write 3 at w=1 | 2 | [1,3,0,3,12] |
| 5 | 12 | write 12 at w=2 | 3 | [1,3,12,3,12] |
| phase 2 | — | fill w..end with 0 | — | [1,3,12,0,0] |

**Plain English:** Scan with `r`, write non-zeros at `w`, then zero-fill the tail.

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
- *"Phase 2 (zero-fill) is easy to forget — I wrote both phases on paper first."*
- *"Example 2 (`[0]`) catches solutions that skip the zero-fill loop."*

> 🎯 **Skill practiced:** In-Place Shifting

---

*One quest down. The next one builds on this skill. →*
