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

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Hash Set — Seen/Visited Tracking

**How to identify this from the problem statement:**
- "appears at least twice" → you only need to know **if** you've seen a value before, not how many times or where
- "return true/false" → early exit on first duplicate
- brute force compares all pairs → set gives O(1) "have I seen this?"

| Keyword / phrase | What it signals |
|---|---|
| "contains duplicate" / "appears twice" | Hash set |
| "distinct" / "unique" (as question) | Set membership |
| "return true if any" | Early exit on first hit |

**Why this pattern works:** The question is pure existence checking — the simplest hash use case. Set, not map.

**How a strong solver thinks before coding:**
1. *"Duplicate → have I seen this before?"*
2. *"I only need yes/no → hash set, not map."*
3. *"Check before insert; return true immediately."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Nested loops comparing every pair** | O(n²) — set gives O(n) with O(1) membership |
| **Sort then scan for adjacent duplicates** | O(n log n) — set is O(n) and doesn't mutate order |
| **Hash map counting occurrences** | Works, but overkill — you only need yes/no, not counts |
| **Continue scanning after finding duplicate** | Wastes time — return `true` immediately on first hit |

**The insight brute force misses:** The question is pure **existence** — "have I seen this value before?" A set answers that in O(1); no counts or indices needed.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Contains Duplicate II #219](https://leetcode.com/problems/contains-duplicate-ii/) | Duplicate within distance k | Set + sliding window of indices |
| [Happy Number #202](https://leetcode.com/problems/happy-number/) | Cycle detection in digit sequence | Set tracks seen states |
| [Intersection of Two Arrays #349](https://leetcode.com/problems/intersection-of-two-arrays/) | Common elements across two arrays | Set from first, check second |

Same skeleton: **check membership before adding — early exit on hit**.

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

---

## 💭 What Should Have Clicked in Your Mind?

- **"Any duplicate?"** → Set. Not nested loops, not sorting (unless you want O(n log n)).
- **"Have I seen this?"** → The fundamental hash set question.
- **"Set vs map?"** → You don't need counts or indices — set is simpler.

This is the **simplest** hash pattern. If Two Sum is complement lookup, Contains Duplicate is membership lookup. Learn both signals.

> 🎯 **Pattern Unlocked:** Hash set for seen/visited tracking — the simplest and most common use of hash sets. "Have I seen this before?" in O(1).

---

*Both quests done! Time for your Day 4 checkpoint. →*
