# ⚔ Quest: Two Sum

> **Day 4** · [Two Sum #1](https://leetcode.com/problems/two-sum/) · Easy · 10 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Two Sum on LeetCode](https://leetcode.com/problems/two-sum/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen, paper, or your editor. The hints and walkthrough below are for *after* your attempt.

---

## The Problem

Given an array `nums` and a `target`, return indices of two numbers that add up to `target`. Each input has exactly one solution.

```
Input:  nums = [2, 7, 11, 15], target = 9
Output: [0, 1]   (nums[0] + nums[1] = 2 + 7 = 9)
```

---

## 💡 Hints

Brute force checks every pair — O(n²). Can you do it in one pass with a hash map?

For each number, compute the **complement** (`target - num`) and check if the map already contains it. Check *before* inserting.

---

## 📖 Walkthrough

For each number, compute the **complement** (`target - num`) and check if the map already contains it:

```
nums = [2, 7, 11, 15], target = 9

i=0: num=2,  complement=7,  map={}      → 7 not found → store {2:0}
i=1: num=7,  complement=2,  map={2:0}   → 2 FOUND at index 0!
     → return [0, 1]
```

> 💡 **The insight:** Check *before* inserting. This ensures you never match an element with itself.

---

## Solution

### C++
```cpp
class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> seen;
        for (int i = 0; i < nums.size(); i++) {
            int complement = target - nums[i];
            if (seen.count(complement))
                return {seen[complement], i};
            seen[nums[i]] = i;
        }
        return {};
    }
};
```

### Python
```python
class Solution:
    def twoSum(self, nums: list[int], target: int) -> list[int]:
        seen = {}
        for i, num in enumerate(nums):
            complement = target - num
            if complement in seen:
                return [seen[complement], i]
            seen[num] = i
        return []
```

### Java
```java
class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> seen = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (seen.containsKey(complement))
                return new int[]{seen.get(complement), i};
            seen.put(nums[i], i);
        }
        return new int[]{};
    }
}
```

**Complexity:** O(n) time · O(n) space

> 🎯 **Pattern Unlocked:** One-pass complement lookup. Build and query the map simultaneously — the most important hash map technique.

---

*Next: a harder quest that combines hash sets with clever logic. →*
