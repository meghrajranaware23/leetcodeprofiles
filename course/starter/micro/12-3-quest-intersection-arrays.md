<!-- hand-authored -->
# ⚔ Quest: Intersection of Two Arrays

> **Day 12** · [Intersection of Two Arrays #349](https://leetcode.com/problems/intersection-of-two-arrays/) · Easy · 10 min · 10 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Intersection of Two Arrays on LeetCode](https://leetcode.com/problems/intersection-of-two-arrays/)**

> ⚔ **Mentor's rule:** Tag **hash-lookup / set** before coding. Output must be **unique** elements only.

---

## The Problem

Given two integer arrays `nums1` and `nums2`, return an array of their intersection. Each element in the result must be **unique** and you may return the result in **any order**.

**Example 1:**
```
Input: nums1 = [1,2,2,1], nums2 = [2,2]
Output: [2]
```

**Example 2:**
```
Input: nums1 = [4,9,5], nums2 = [9,4,9,8,4]
Output: [9,4] or [4,9]
```

**Constraints:** `1 <= nums1.length, nums2.length <= 1000`, `0 <= nums1[i], nums2[i] <= 1000`

---

## 💡 Hints

1. Put nums1 into a set; scan nums2 for matches
2. Use a result set so each value appears once
3. Hash/set family from Day 11 tags
4. Smaller array into set first — minor optimization

---

## 📖 Walkthrough

**Example 1:** `nums1 = [1,2,2,1], nums2 = [2,2]`

```
set from nums1: {1, 2}
scan nums2: 2 in set → add to result
scan nums2: 2 again → already in result set, skip
output: [2]
```

---

## Solution

### C++
```cpp
class Solution {
public:
    vector<int> intersection(vector<int>& nums1, vector<int>& nums2) {
        unordered_set<int> s(nums1.begin(), nums1.end());
        unordered_set<int> res;
        for (int n : nums2) if (s.count(n)) res.insert(n);
        return vector<int>(res.begin(), res.end());
    }
};
```

### Python
```python
class Solution:
    def intersection(self, nums1: List[int], nums2: List[int]) -> List[int]:
        return list(set(nums1) & set(nums2))
```

### Java
```java
class Solution {
    public int[] intersection(int[] nums1, int[] nums2) {
        Set<Integer> s = new HashSet<>();
        for (int n : nums1) s.add(n);
        Set<Integer> res = new HashSet<>();
        for (int n : nums2) if (s.contains(n)) res.add(n);
        return res.stream().mapToInt(Integer::intValue).toArray();
    }
}
```

**Complexity:** O(n+m) time · O(n) space
---

## 💭 What a Mentor Would Tell You

- *"Starter solution uses set intersection; full II uses frequency map — upgrade in review."*
- *"Unique output — I almost returned [2,2] before re-reading the statement."*
- *"Same hash family as Contains Duplicate and Two Sum."*

> 🎯 **Skill practiced:** Set/Hash Intro

---

*Two quests down. Move to today's checkpoint. →*
