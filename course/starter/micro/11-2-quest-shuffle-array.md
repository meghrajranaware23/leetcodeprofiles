<!-- hand-authored -->
# ⚔ Quest: Shuffle the Array

> **Day 11** · [Shuffle Array #1470](https://leetcode.com/problems/shuffle-the-array/) · Easy · 10 min · 10 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Shuffle the Array on LeetCode](https://leetcode.com/problems/shuffle-the-array/)**

> ⚔ **Mentor's rule:** Tag **array-transform / interleave** before coding. Trace i=0,1,2 on paper.

---

## The Problem

Given array `nums` of `2n` elements where the first `n` elements form `x` and the next `n` form `y`, return the array shuffled into `[x1,y1,x2,y2,...,xn,yn]`.

**Example 1:**
```
Input: nums = [2,5,1,3,4,7], n = 3
Output: [2,3,5,4,1,7]
```

**Example 2:**
```
Input: nums = [1,2,3,4,4,3,2,1], n = 4
Output: [1,4,2,3,3,2,4,1]
```

**Constraints:** `1 <= n <= 500`, `nums.length == 2n`, `1 <= nums[i] <= 10^3`

**Family tag:** array-transform / interleave

---

## 💡 Hints

1. `res[2*i] = nums[i]`, `res[2*i+1] = nums[i+n]`
2. Trace i=0,1,2 on paper for Example 1
3. Same family as tomorrow's permutation build
4. Loop `i` from 0 to n-1 only

---

## 📖 Walkthrough

**Example 1:** `nums = [2,5,1,3,4,7], n = 3`

| i | res[2*i] = nums[i] | res[2*i+1] = nums[i+n] |
|---|--------------------|-------------------------|
| 0 | res[0]=2 | res[1]=3 |
| 1 | res[2]=5 | res[3]=4 |
| 2 | res[4]=1 | res[5]=7 |

Output: `[2,3,5,4,1,7]` ✓

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
- *"The formula is two lines — tracing i=0,1,2 prevented off-by-one on indices."*
- *"Interleave pattern: even slots from first half, odd from second."*

> 🎯 **Skill practiced:** Array Transformation

---

*One quest down. The next one builds on this skill. →*
