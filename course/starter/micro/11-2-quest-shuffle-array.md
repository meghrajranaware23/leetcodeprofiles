# ⚔ Quest: Shuffle the Array

> **Day 11** · [Shuffle the Array #1470](https://leetcode.com/problems/shuffle-the-array/) · Easy · 10 min · 10 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Shuffle the Array on LeetCode](https://leetcode.com/problems/shuffle-the-array/)**

> ⚔ **Mentor's rule:** Spend at least 5 minutes with pen and paper. Apply today's skill: **Array Transformation**. The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement, examples, and constraints on LeetCode.

**[Shuffle the Array #1470](https://leetcode.com/problems/shuffle-the-array/)**

---

## 💡 Hints

1. Re-read the constraints — what edge cases do they hint at?
2. Trace Example 1 by hand before writing any code
3. Start with the simplest approach that could work (brute force is fine)


---

## 🔍 Strategy Breakdown

**Skill practiced today:** Array Transformation

**Why this problem:** Simple array manipulation; introduces array transformation family

**How to read this problem:**
1. What is the input? What is the output?
2. What do the examples tell you about the expected behavior?
3. What's the simplest approach that handles all examples?

**How a mentor thinks (before coding):**
1. *"I've seen this type — it's about array transformation."*
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
| [Shuffle the Array #1470](https://leetcode.com/problems/shuffle-the-array/) | Easy | Array Transformation |

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
    vector<int> shuffle(vector<int>& nums, int n) {
        vector<int> res(2 * n);
        for (int i = 0; i < n; i++) {
            res[2*i] = nums[i];
            res[2*i+1] = nums[i+n];
        }
        return res;
    }
};
```

### Python
```python
class Solution:
    def shuffle(self, nums: List[int], n: int) -> List[int]:
        return [x for pair in zip(nums[:n], nums[n:]) for x in pair]
```

### Java
```java
class Solution {
    public int[] shuffle(int[] nums, int n) {
        int[] res = new int[2 * n];
        for (int i = 0; i < n; i++) {
            res[2*i] = nums[i];
            res[2*i+1] = nums[i+n];
        }
        return res;
    }
}
```

**Complexity:** O(n) time · O(n) space

---

## 💭 What a Mentor Would Tell You

- *"I didn't need the optimal solution — I needed a **correct** solution with a clear process."*
- *"Tracing the example first would have saved me from that off-by-one bug."*
- *"Getting stuck for 3 minutes is normal. Giving up at 30 seconds is the real problem."*

> 🎯 **Skill practiced:** Array Transformation

---

*One quest down. The next one builds on this skill. →*
