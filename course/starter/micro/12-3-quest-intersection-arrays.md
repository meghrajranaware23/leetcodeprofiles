<!-- hand-authored -->
# ⚔ Quest: Intersection of Two Arrays

> **Day 12** · [Intersection of Two Arrays #349](https://leetcode.com/problems/intersection-of-two-arrays/) · Easy · 10 min · 10 XP

---

**[→ Open on LeetCode](https://leetcode.com/problems/intersection-of-two-arrays/)**

---

## The Problem

Return unique intersection of two arrays (each element once in output).

**Example:** `nums1 = [1,2,2,1], nums2 = [2,2]` → `[2]`

---

## 💡 Hints

1. Count frequency in smaller array
2. Scan other array, decrement when match
3. Hash/set family from Day 11 tags

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

- *"Note: starter solution uses set intersection; full II uses frequency map — upgrade in review."*

> 🎯 **Skill practiced:** Set/Hash Intro

---

*Two quests down. Move to today's checkpoint. →*
