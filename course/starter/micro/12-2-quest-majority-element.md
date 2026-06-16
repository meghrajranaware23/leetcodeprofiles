<!-- hand-authored -->
# ⚔ Quest: Majority Element

> **Day 12** · [Majority Element #169](https://leetcode.com/problems/majority-element/) · Easy · 10 min · 10 XP

---

**[→ Open on LeetCode](https://leetcode.com/problems/majority-element/)**

> ⚔ Re-solve comparison day — note if you solve faster than Week 1.

---

## The Problem

Element appearing more than `n/2` times. Guaranteed to exist.

**Example:** `[3,2,3]` → `3`

---

## 💡 Hints

1. Hash count works — O(n) time
2. Boyer-Moore vote: cancel different pairs; survivor is majority
3. Compare your Day 12 time to a hypothetical Week 1 attempt

---

## Solution

### C++
```cpp
class Solution {
public:
    int majorityElement(vector<int>& nums) {
        int cand = 0, count = 0;
        for (int n : nums) {
            if (count == 0) { cand = n; count = 1; }
            else if (n == cand) count++;
            else count--;
        }
        return cand;
    }
};
```

### Python
```python
class Solution:
    def majorityElement(self, nums: List[int]) -> int:
        cand, count = 0, 0
        for n in nums:
            if count == 0: cand, count = n, 1
            elif n == cand: count += 1
            else: count -= 1
        return cand
```

### Java
```java
class Solution {
    public int majorityElement(int[] nums) {
        int cand = 0, count = 0;
        for (int n : nums) {
            if (count == 0) { cand = n; count = 1; }
            else if (n == cand) count++;
            else count--;
        }
        return cand;
    }
}
```

**Complexity:** O(n) time · O(1) space
---

## 💭 What a Mentor Would Tell You

- *"Logged re-solve time in journal — faster than I'd have been on Day 5."*

> 🎯 **Skill practiced:** Re-Solve Comparison

---

*One quest down. The next one builds on this skill. →*
