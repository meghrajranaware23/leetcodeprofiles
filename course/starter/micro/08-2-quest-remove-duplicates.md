# ⚔ Quest: Remove Duplicates from Sorted Array

> **Day 8** · [Remove Duplicates from Sorted Array #26](https://leetcode.com/problems/remove-duplicates-from-sorted-array/) · Easy · 10 min · 10 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Remove Duplicates from Sorted Array on LeetCode](https://leetcode.com/problems/remove-duplicates-from-sorted-array/)**

> ⚔ **Mentor's rule:** Spend at least 5 minutes with pen and paper. Apply today's skill: **Two-Pointer Intro**. The hints below are for *after* your attempt.

---

## The Problem

Given the problem on LeetCode, apply today's skill: **Two-Pointer Intro**.

**[→ Open Remove Duplicates from Sorted Array on LeetCode](https://leetcode.com/problems/remove-duplicates-from-sorted-array/)** for the full statement, examples, and constraints.

---

## 💡 Hints

1. Re-read the constraints — what edge cases do they hint at?
2. Trace Example 1 by hand before writing any code
3. Start with the simplest approach that could work (brute force is fine)


---

## 🔍 Strategy Breakdown

**Skill practiced today:** Two-Pointer Intro

**Why this problem:** Two-pointer intro; editorial comparison is instructive

**How to read this problem:**
1. What is the input? What is the output?
2. What do the examples tell you about the expected behavior?
3. What's the simplest approach that handles all examples?

**How a mentor thinks (before coding):**
1. *"I've seen this type — it's about two-pointer intro."*
2. *"Let me trace Example 1 on paper first."*
3. *"What's my brute force? Does it fit the constraints?"*
4. *"Only then do I open my editor."*

---

## ❌ Why Jumping to Code Fails

| Approach | Problem |
|---|---|
| Open editor immediately | You code before understanding — bugs multiply |
| Skip example tracing | You miss edge cases the examples reveal |
| Copy without understanding | You can't re-solve tomorrow without the editorial |
| Give up before 5 minutes | You never build the "attempt first" habit |

> **The insight:** Speed comes from **process**, not from skipping steps.

---

## 🔗 Problems That Build the Same Skill

| Problem | Difficulty | Skill |
|---|---|---|
| [Remove Duplicates from Sorted Array #26](https://leetcode.com/problems/remove-duplicates-from-sorted-array/) | Easy | Two-Pointer Intro |

---

## 📖 Walkthrough

Trace Example 1 on paper step by step. Write your brute force in plain English (3 lines). Only then translate to code.

> 💡 **The code is just the paper trace written in syntax.**

---

## Solution

### C++
```cpp
class Solution {
public:
    int removeDuplicates(vector<int>& nums) {
        if (nums.empty()) return 0;
        int w = 1;
        for (int r = 1; r < nums.size(); r++)
            if (nums[r] != nums[r-1]) nums[w++] = nums[r];
        return w;
    }
};
```

### Python
```python
class Solution:
    def removeDuplicates(self, nums: List[int]) -> int:
        if not nums: return 0
        w = 1
        for r in range(1, len(nums)):
            if nums[r] != nums[r-1]:
                nums[w] = nums[r]
                w += 1
        return w
```

### Java
```java
class Solution {
    public int removeDuplicates(int[] nums) {
        if (nums.length == 0) return 0;
        int w = 1;
        for (int r = 1; r < nums.length; r++)
            if (nums[r] != nums[r-1]) nums[w++] = nums[r];
        return w;
    }
}
```

**Complexity:** O(n) time · O(1) space

---

## 💭 What a Mentor Would Tell You

- *"I didn't need the optimal solution — I needed a **correct** solution with a clear process."*
- *"Tracing the example first would have saved me from that off-by-one bug."*
- *"Getting stuck for 3 minutes is normal. Giving up at 30 seconds is the real problem."*

> 🎯 **Skill practiced:** Two-Pointer Intro

---

*One quest down. The next one builds on this skill. →*
