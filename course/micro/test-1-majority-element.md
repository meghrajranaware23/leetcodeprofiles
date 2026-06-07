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

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Frequency Counting (with optional Boyer-Moore Voting)

| Clue in the problem | What it signals |
|---|---|
| "appears more than ⌊n/2⌋ times" | Count occurrences — majority dominates |
| "majority element always exists" | You can return as soon as count > n/2 |
| "find the element" (not indices) | Frequency map or voting — not Two Sum |
| "which value" / "most frequent" | Tally, don't search pairs |
| "you may assume" majority exists | No tie-breaking needed — first count > n/2 wins |

**How to identify from the statement:** The problem asks *which value appears most* — not *where* or *in what pairs*. That's a counting question, not a search question.

**How a strong solver thinks before coding:**
1. *"More than half the array → frequency counting."*
2. *"Return as soon as any count exceeds n/2."*
3. *"Bonus: O(1) space? Boyer-Moore voting."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Nested loops comparing every pair** | O(n²) — you're asking "which value wins," not "which pair matches" |
| **Sort, then pick middle element** | O(n log n) — works (middle of sorted array IS the majority), but frequency counting is O(n) |
| **Track max count with nested scan per element** | O(n²) — recounts the same elements for every unique value |

**The insight brute force misses:** You don't need to compare elements pairwise. You need **one tally per unique value**. The majority appears more than all others combined — frequency counting finds it in a single pass.

---

## 🎯 Transfer to Unseen Problems

Can you spot frequency counting without the word "majority"?

**Scenario 1:** *"Given an array, return the element that appears most often. If there's a tie, return any."*

Which pattern? **Frequency map + scan for max count.** Same toolkit — no n/2 threshold, but identical structure.

**Scenario 2:** *"Given a string, return the first character that does not repeat anywhere else in the string."*

Which pattern? **Two-pass frequency** (Day 3). Count first, scan in order second. Different question, same counting instinct.

**Scenario 3:** *"Given an array, determine if any value appears more than once."*

Which pattern? **Frequency map OR hash set.** Set is lighter when you only need yes/no — map when you need the count.

> **Answer key:** All three → frequency counting family. The *container* (map vs set vs array) and *exit condition* (max count vs n/2 vs first unique) change — the instinct to tally instead of compare does not.

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

## 💭 What Should Have Clicked in Your Mind?

- **"Appears more than n/2 times"** → Count frequencies. The majority can't hide.
- **"Which element"** → Not indices, not pairs — pure counting.
- **"I studied anagrams and first unique today"** → Same frequency toolkit, different question.

If you tried sorting first, you were close — but frequency counting is O(n) vs O(n log n).

---

*1 of 3 test problems. Continue to the next. →*
