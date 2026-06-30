<!-- hand-authored -->
# ⚔ Quest: Missing Number

> **Day 7** · [Missing Number #268](https://leetcode.com/problems/missing-number/) · Easy · 10 min · 10 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Missing Number on LeetCode](https://leetcode.com/problems/missing-number/)**

> ⚔ **Mentor's rule:** When WA, reproduce on `n=1` before changing code. Print expected vs actual sum.

---

## The Problem

Array contains `n` distinct numbers in `[0, n]`. Find the missing one.

**Example 1:** `[3,0,1]` → `2`

**Example 2:** `[0,1]` → `2`

**Example 3:** `[9,6,4,2,3,5,7,0,1]` → `8`

---

## 💡 Hints

1. Sum `0..n` = `n*(n+1)/2` — subtract array sum
2. Debug: print `n`, `expected_sum`, `actual_sum`
3. Off-by-one trap: `n = len(nums)`, not len+1 for range
4. XOR approach exists — brute sum fine for debugging practice

---

## 📖 Walkthrough

`[3,0,1]`: expected sum 0+1+2+3=6, array sum=4, missing=2.

---

## Solution

### C++
```cpp
class Solution {
public:
    int missingNumber(vector<int>& nums) {
        int n = nums.size(), sum = n * (n + 1) / 2;
        for (int x : nums) sum -= x;
        return sum;
    }
};
```

### Python
```python
class Solution:
    def missingNumber(self, nums: List[int]) -> int:
        n = len(nums)
        return n * (n + 1) // 2 - sum(nums)
```

### Java
```java
class Solution {
    public int missingNumber(int[] nums) {
        int n = nums.length, sum = n * (n + 1) / 2;
        for (int x : nums) sum -= x;
        return sum;
    }
}
```

**Complexity:** O(n) time · O(1) space
---

## 💭 What a Mentor Would Tell You

- *"Print statements found my off-by-one in 2 minutes."*
- *"`n = len(nums)` not len+1 — that was my Wrong Answer."*
- *"Sum formula 0..n is easier to debug than XOR on Day 7."*

> 🎯 **Skill practiced:** Off-by-One Debugging

---

*One quest down. The next one builds on this skill. →*
