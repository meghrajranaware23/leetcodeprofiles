# ⚔ E-Rank Test — Problem 1

> [Majority Element #169](https://leetcode.com/problems/majority-element/) · Easy · 100 XP

---

You've completed 5 days of training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Majority Element on LeetCode](https://leetcode.com/problems/majority-element/)**

> ⚔ **Hunter's rule:** This is a rank test — treat it like real LeetCode practice. No peeking until you've genuinely tried.

---

## The Problem

Given an array `nums` of size `n`, return the **majority element** — the element that appears more than `⌊n / 2⌋` times. You may assume the majority element always exists.

```
Input:  [3, 2, 3]
Output: 3

Input:  [2, 2, 1, 1, 1, 2, 2]
Output: 2
```

---

## 💡 Hints

> 🎯 **What's being tested:** Frequency counting (Day 3) — the most direct application of the pattern.

Build a frequency map. The first element whose count exceeds `n / 2` is the answer.

**Bonus approach:** Boyer-Moore Voting solves this in O(1) space. Maintain a candidate and counter — increment for matches, decrement for mismatches.

---

<details>
<summary><strong>📖 Solution & Walkthrough</strong></summary>

### Walkthrough

Build a frequency map. The first element whose count exceeds `n / 2` is the answer.

```
nums = [2, 2, 1, 1, 1, 2, 2]

Frequency map:
  2 → 4
  1 → 3

n/2 = 3, element 2 has count 4 > 3 → answer: 2 ✓
```

> 💡 **Bonus:** Boyer-Moore Voting solves this in O(1) space. Maintain a candidate and counter — increment for matches, decrement for mismatches. When the counter hits 0, switch candidates. The majority element always survives because it appears more than all others combined.

### C++
```cpp
class Solution {
public:
    int majorityElement(vector<int>& nums) {
        unordered_map<int, int> freq;
        int n = nums.size();
        for (int num : nums) {
            freq[num]++;
            if (freq[num] > n / 2) return num;
        }
        return -1;
    }
};
```

### Python
```python
class Solution:
    def majorityElement(self, nums: list[int]) -> int:
        freq = {}
        n = len(nums)
        for num in nums:
            freq[num] = freq.get(num, 0) + 1
            if freq[num] > n // 2:
                return num
        return -1
```

### Java
```java
class Solution {
    public int majorityElement(int[] nums) {
        Map<Integer, Integer> freq = new HashMap<>();
        int n = nums.length;
        for (int num : nums) {
            freq.put(num, freq.getOrDefault(num, 0) + 1);
            if (freq.get(num) > n / 2) return num;
        }
        return -1;
    }
}
```

**Complexity:** O(n) time · O(n) space (hash map), or O(n) time · O(1) space (Boyer-Moore)

</details>

---

*1 of 3 test problems. Continue to the next. →*
