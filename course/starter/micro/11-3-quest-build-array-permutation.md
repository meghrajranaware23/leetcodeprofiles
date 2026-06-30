<!-- hand-authored -->
# ⚔ Quest: Build Array from Permutation

> **Day 11** · [Build Array from Permutation #1920](https://leetcode.com/problems/build-array-from-permutation/) · Easy · 10 min · 10 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Build Array from Permutation on LeetCode](https://leetcode.com/problems/build-array-from-permutation/)**

> ⚔ **Mentor's rule:** Same **array-transform** family as Shuffle — trace i=0,1,2 before coding.

---

## The Problem

Given a **zero-based permutation** `nums` of `0..n-1`, build an array `ans` of the same length where `ans[i] = nums[nums[i]]` for each `0 <= i < n`.

**Example 1:**
```
Input: nums = [0,2,1,5,3,4]
Output: [0,1,2,4,5,3]
```

**Example 2:**
```
Input: nums = [5,0,1,2,3,4]
Output: [4,5,0,1,2,3]
```

**Constraints:** `1 <= nums.length <= 1000`, `0 <= nums[i] < nums.length`, all elements **distinct**

**Family tag:** array-transform (same family as Shuffle)

---

## 💡 Hints

1. For each i, answer is `nums[nums[i]]` — trace i=0,1,2
2. Index map pattern — feels like yesterday's interleave
3. Example 1 at i=0: nums[0]=0, nums[0]=0 → ans[0]=0
4. One loop, O(n) time

---

## 📖 Walkthrough

**Example 1:** `nums = [0,2,1,5,3,4]`

| i | nums[i] | nums[nums[i]] | ans[i] |
|---|---------|---------------|--------|
| 0 | 0 | nums[0]=0 | 0 |
| 1 | 2 | nums[2]=1 | 1 |
| 2 | 1 | nums[1]=2 | 2 |
| 3 | 5 | nums[5]=4 | 4 |

Output begins `[0,1,2,4,...]` ✓

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
- *"Double index lookup confused me until I traced i=0 on paper."*
- *"Tagging saved time — didn't hunt for a 'new' pattern."*

> 🎯 **Skill practiced:** Familiarity Recognition

---

*Two quests down. Move to today's checkpoint. →*
