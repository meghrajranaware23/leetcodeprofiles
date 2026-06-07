# ⚔ Quest: Contains Duplicate

> **Day 4** · [Contains Duplicate #217](https://leetcode.com/problems/contains-duplicate/) · Easy · 10 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Contains Duplicate on LeetCode](https://leetcode.com/problems/contains-duplicate/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen, paper, or your editor. The hints and walkthrough below are for *after* your attempt.

---

## The Problem

Given an integer array `nums`, return `true` if any value appears **at least twice**, and `false` if every element is distinct.

```
Input:  [1, 2, 3, 1]
Output: true       (← 1 appears twice)

Input:  [1, 2, 3, 4]
Output: false      (← all distinct)
```

---

## 💡 Hints

Brute force checks every pair — O(n²). How can a hash set make this O(n)?

Walk through the array. For each element, check if it's already in the set. If yes, duplicate found. If no, add it.

---

## 📖 Walkthrough

Walk through the array. For each element, check if it's already in the set. If yes, duplicate found. If no, add it.

```
nums = [1, 2, 3, 1]

i=0: 1 → not in set → add → {1}
i=1: 2 → not in set → add → {1, 2}
i=2: 3 → not in set → add → {1, 2, 3}
i=3: 1 → IN SET! → return true ✓
```

> 💡 **The insight:** The hash set gives O(1) lookup, so the entire check is O(n). This is the simplest example of "hash set eliminates the inner loop."

---

## Solution

### C++
```cpp
class Solution {
public:
    bool containsDuplicate(vector<int>& nums) {
        unordered_set<int> seen;
        for (int num : nums) {
            if (seen.count(num)) return true;
            seen.insert(num);
        }
        return false;
    }
};
```

### Python
```python
class Solution:
    def containsDuplicate(self, nums: list[int]) -> bool:
        seen = set()
        for num in nums:
            if num in seen:
                return True
            seen.add(num)
        return False
```

### Java
```java
class Solution {
    public boolean containsDuplicate(int[] nums) {
        Set<Integer> seen = new HashSet<>();
        for (int num : nums) {
            if (seen.contains(num)) return true;
            seen.add(num);
        }
        return false;
    }
}
```

**Complexity:** O(n) time · O(n) space

> 🎯 **Pattern Unlocked:** Hash set for seen/visited tracking — the simplest and most common use of hash sets. "Have I seen this before?" in O(1).

---

*Both quests done! Time for your Day 4 checkpoint. →*
