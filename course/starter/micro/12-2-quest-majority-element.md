# ⚔ Quest: Majority Element

> **Day 12** · [Majority Element #169](https://leetcode.com/problems/majority-element/) · Easy · 10 min · 10 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Majority Element on LeetCode](https://leetcode.com/problems/majority-element/)**

> ⚔ **Mentor's rule:** Spend at least 5 minutes with pen and paper. Apply today's skill: **Re-Solve Comparison**. The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement, examples, and constraints on LeetCode.

**[Majority Element #169](https://leetcode.com/problems/majority-element/)**

---

## 💡 Hints

1. Re-read the constraints — what edge cases do they hint at?
2. Trace Example 1 by hand before writing any code
3. Start with the simplest approach that could work (brute force is fine)


---

## 🔍 Strategy Breakdown

**Skill practiced today:** Re-Solve Comparison

**Why this problem:** Multiple approaches; good for re-solve comparison

**How to read this problem:**
1. What is the input? What is the output?
2. What do the examples tell you about the expected behavior?
3. What's the simplest approach that handles all examples?

**How a mentor thinks (before coding):**
1. *"I've seen this type — it's about re-solve comparison."*
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
| [Majority Element #169](https://leetcode.com/problems/majority-element/) | Easy | Re-Solve Comparison |

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

- *"I didn't need the optimal solution — I needed a **correct** solution with a clear process."*
- *"Tracing the example first would have saved me from that off-by-one bug."*
- *"Getting stuck for 3 minutes is normal. Giving up at 30 seconds is the real problem."*

> 🎯 **Skill practiced:** Re-Solve Comparison

---

*One quest down. The next one builds on this skill. →*
