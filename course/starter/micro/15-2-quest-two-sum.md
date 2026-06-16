<!-- hand-authored -->
# ⚔ Quest: Two Sum

> **Day 15** · [Two Sum #1](https://leetcode.com/problems/two-sum/) · Easy · 10 min · 10 XP

---

**[→ Open on LeetCode](https://leetcode.com/problems/two-sum/)**

> ⚔ **Milestone quest** — the classic. Trust your full 15-day workflow.

---

## The Problem

Return indices of two numbers that add to `target`.

**Example:** `nums = [2,7,11,15], target = 9` → `[0,1]`

---

## 💡 Hints

1. Brute: all pairs — fine for trace
2. Hash map: store `value → index`, look for `target - nums[i]`
3. Trace Example: at i=1, need 2, seen `{2:0}` → `[0,1]`

---

## Solution

### C++
```cpp
class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> seen;
        for (int i = 0; i < nums.size(); i++) {
            int need = target - nums[i];
            if (seen.count(need)) return {seen[need], i};
            seen[nums[i]] = i;
        }
        return {};
    }
};
```

### Python
```python
class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        seen = {}
        for i, n in enumerate(nums):
            if target - n in seen:
                return [seen[target - n], i]
            seen[n] = i
        return []
```

### Java
```java
class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> seen = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int need = target - nums[i];
            if (seen.containsKey(need)) return new int[]{seen.get(need), i};
            seen.put(nums[i], i);
        }
        return new int[]{};
    }
}
```

**Complexity:** O(n) time · O(n) space
---

## 💭 What a Mentor Would Tell You

- *"Two Sum at Day 15 hits different — I had a workflow, not luck."*
- *"Pick an Ascension pack from today's guide matrix."*

> 🎯 **Skill practiced:** Belonging Milestone

---

*One quest down. The next one builds on this skill. →*
