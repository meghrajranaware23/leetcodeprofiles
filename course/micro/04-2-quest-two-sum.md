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

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Hash Map — Complement Lookup (One-Pass)

**How to identify this from the problem statement:**
- "two numbers add up to target" → for each number, you need its **complement** (target − num)
- "return indices" → store value → index in the map as you scan
- brute force is O(n²) nested search → hash map eliminates the inner loop

| Keyword / phrase | What it signals |
|---|---|
| "two sum" / "pair that adds to" | Complement lookup |
| "return indices" | Map: value → index |
| "exactly one solution" | Return on first match — no need to explore all pairs |

**Why this pattern works:** Instead of asking "does any prior element pair with me?" in a loop, you ask "have I already seen my complement?" in O(1).

**How a strong solver thinks before coding:**
1. *"Need a pair summing to target → complement = target - num."*
2. *"Check map BEFORE inserting — avoids using same element twice."*
3. *"Store num → index as I go."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Nested loops checking every pair** | O(n²) — hash map reduces to O(n) |
| **Sort + two pointers** | O(n log n); also loses original indices |
| **Insert into map before checking complement** | Matches an element with itself (e.g., target=6, num=3 at index 0) |
| **Store only values, not indices** | Can't return the required index pair |

**The insight brute force misses:** For each number, you don't need to search all prior numbers — you need **one specific number**: the complement. Remember past values in a map and ask *"Have I seen target − num?"*

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Two Sum II #167](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/) | Sorted array → two pointers instead | Still hunting for complement pair |
| [3Sum #15](https://leetcode.com/problems/3sum/) | Three numbers summing to zero | Fix one, Two Sum on remainder (D-Rank) |
| [Subarray Sum Equals K #560](https://leetcode.com/problems/subarray-sum-equals-k/) | Subarray, not pair | Prefix sum + complement map (D-Rank) |

Same skeleton: **at each step, look for what completes the target**.

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

---

## 💭 What Should Have Clicked in Your Mind?

- **"Find two numbers"** → Nested loop is the trap. Hash map is the pattern.
- **"Adds up to target"** → Complement = target − current. Have I seen it?
- **"This is THE hash map interview problem"** → If you recognize Two Sum, you recognize 30% of hash map questions.

Don't memorize `{seen[num] = i}`. Memorize the **question**: *"What am I looking for at each step?"* → *"The number that completes me to target."*

> 🎯 **Pattern Unlocked:** One-pass complement lookup. Build and query the map simultaneously — the most important hash map technique.

---

*Next: a harder quest that combines hash sets with clever logic. →*
