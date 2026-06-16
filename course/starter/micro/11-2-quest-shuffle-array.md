<!-- hand-authored -->
# ⚔ Quest: Shuffle the Array

> **Day 11** · [Shuffle Array #1470](https://leetcode.com/problems/shuffle-the-array/) · Easy · 10 min · 10 XP

---

**[→ Open on LeetCode](https://leetcode.com/problems/shuffle-the-array/)**

---

## The Problem

`2n` array: first n = `x`, next n = `y`. Return `[x1,y1,x2,y2,...]`.

**Example:** `nums = [2,5,1,3,4,7], n = 3` → `[2,3,5,4,1,7]`

**Family tag:** array-transform / interleave

---

## 💡 Hints

1. `res[2*i] = nums[i]`, `res[2*i+1] = nums[i+n]`
2. Trace i=0,1,2 on paper
3. Same family as tomorrow's permutation build

---

## Solution

### C++
```cpp
class Solution {
public:
    vector<int> shuffle(vector<int>& nums, int n) {
        vector<int> res(2 * n);
        for (int i = 0; i < n; i++) {
            res[2*i] = nums[i];
            res[2*i+1] = nums[i+n];
        }
        return res;
    }
};
```

### Python
```python
class Solution:
    def shuffle(self, nums: List[int], n: int) -> List[int]:
        return [x for pair in zip(nums[:n], nums[n:]) for x in pair]
```

### Java
```java
class Solution {
    public int[] shuffle(int[] nums, int n) {
        int[] res = new int[2 * n];
        for (int i = 0; i < n; i++) {
            res[2*i] = nums[i];
            res[2*i+1] = nums[i+n];
        }
        return res;
    }
}
```

**Complexity:** O(n) time · O(n) space
---

## 💭 What a Mentor Would Tell You

- *"Tagged array-transform — tomorrow's quest will feel familiar."*

> 🎯 **Skill practiced:** Array Transformation

---

*One quest down. The next one builds on this skill. →*
