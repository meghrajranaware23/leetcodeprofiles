# ⚔ Quest: Plus One

> **Day 4** · [Plus One #66](https://leetcode.com/problems/plus-one/) · Easy · 10 min · 10 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Plus One on LeetCode](https://leetcode.com/problems/plus-one/)**

> ⚔ **Mentor's rule:** Spend at least 5 minutes with pen and paper. Apply today's skill: **Edge Case Thinking**. The hints below are for *after* your attempt.

---

## The Problem

Given the problem on LeetCode, apply today's skill: **Edge Case Thinking**.

**[→ Open Plus One on LeetCode](https://leetcode.com/problems/plus-one/)** for the full statement, examples, and constraints.

---

## 💡 Hints

1. Re-read the constraints — what edge cases do they hint at?
2. Trace Example 1 by hand before writing any code
3. Start with the simplest approach that could work (brute force is fine)


---

## 🔍 Strategy Breakdown

**Skill practiced today:** Edge Case Thinking

**Why this problem:** Classic carry edge case (999→1000); forces constraint thinking

**How to read this problem:**
1. What is the input? What is the output?
2. What do the examples tell you about the expected behavior?
3. What's the simplest approach that handles all examples?

**How a mentor thinks (before coding):**
1. *"I've seen this type — it's about edge case thinking."*
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
| [Plus One #66](https://leetcode.com/problems/plus-one/) | Easy | Edge Case Thinking |

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
    vector<int> plusOne(vector<int>& digits) {
        for (int i = digits.size() - 1; i >= 0; i--) {
            if (digits[i] < 9) { digits[i]++; return digits; }
            digits[i] = 0;
        }
        digits.insert(digits.begin(), 1);
        return digits;
    }
};
```

### Python
```python
class Solution:
    def plusOne(self, digits: List[int]) -> List[int]:
        for i in range(len(digits)-1, -1, -1):
            if digits[i] < 9:
                digits[i] += 1
                return digits
            digits[i] = 0
        return [1] + digits
```

### Java
```java
class Solution {
    public int[] plusOne(int[] digits) {
        for (int i = digits.length - 1; i >= 0; i--) {
            if (digits[i] < 9) { digits[i]++; return digits; }
            digits[i] = 0;
        }
        int[] res = new int[digits.length + 1];
        res[0] = 1;
        return res;
    }
}
```

**Complexity:** O(n) time · O(1) space

---

## 💭 What a Mentor Would Tell You

- *"I didn't need the optimal solution — I needed a **correct** solution with a clear process."*
- *"Tracing the example first would have saved me from that off-by-one bug."*
- *"Getting stuck for 3 minutes is normal. Giving up at 30 seconds is the real problem."*

> 🎯 **Skill practiced:** Edge Case Thinking

---

*One quest down. The next one builds on this skill. →*
