<!-- hand-authored -->
# ⚔ Quest: Build Array from Permutation

> **Day 11** · [Build Array from Permutation #1920](https://leetcode.com/problems/build-array-from-permutation/) · Easy · 10 min · 10 XP

---

**[→ Open on LeetCode](https://leetcode.com/problems/build-array-from-permutation/)**

---

## The Problem

`nums` is a permutation of `0..n-1`. Build `ans` where `ans[i] = nums[nums[i]]`.

**Example:** `nums = [0,2,1,5,3,4]` → `[0,1,2,4,5,3]`

**Family tag:** array-transform (same family as Shuffle)

---

## 💡 Hints

1. For each i, answer is nums[nums[i]] — trace i=0,1,2
2. Index map pattern — feels like yesterday's interleave

---

## Solution

### C++
```cpp
class Solution {
public:
    vector<int> buildArray(vector<int>& nums) {
        vector<int> res(nums.size());
        for (int i = 0; i < nums.size(); i++) res[i] = nums[nums[i]];
        return res;
    }
};
```

### Python
```python
class Solution:
    def buildArray(self, nums: List[int]) -> List[int]:
        return [nums[nums[i]] for i in range(len(nums))]
```

### Java
```java
class Solution {
    public int[] buildArray(int[] nums) {
        int[] res = new int[nums.length];
        for (int i = 0; i < nums.length; i++) res[i] = nums[nums[i]];
        return res;
    }
}
```

**Complexity:** O(n) time · O(n) space
---

## 💭 What a Mentor Would Tell You

- *"Same family as Shuffle — I recognized before coding."*

> 🎯 **Skill practiced:** Familiarity Recognition

---

*Two quests down. Move to today's checkpoint. →*
