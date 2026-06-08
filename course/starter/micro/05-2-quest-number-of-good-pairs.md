# ⚔ Quest: Number of Good Pairs

> **Day 5** · [Number of Good Pairs #1512](https://leetcode.com/problems/number-of-good-pairs/) · Easy · 10 min · 10 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Number of Good Pairs on LeetCode](https://leetcode.com/problems/number-of-good-pairs/)**

> ⚔ **Mentor's rule:** Spend at least 5 minutes with pen and paper. Apply today's skill: **Brute Force First**. The hints below are for *after* your attempt.

---

## The Problem

Given the problem on LeetCode, apply today's skill: **Brute Force First**.

**[→ Open Number of Good Pairs on LeetCode](https://leetcode.com/problems/number-of-good-pairs/)** for the full statement, examples, and constraints.

---

## 💡 Hints

1. Re-read the constraints — what edge cases do they hint at?
2. Trace Example 1 by hand before writing any code
3. Start with the simplest approach that could work (brute force is fine)


---

## 🔍 Strategy Breakdown

**Skill practiced today:** Brute Force First

**Why this problem:** Brute force works; teaches start simple, optimize later

**How to read this problem:**
1. What is the input? What is the output?
2. What do the examples tell you about the expected behavior?
3. What's the simplest approach that handles all examples?

**How a mentor thinks (before coding):**
1. *"I've seen this type — it's about brute force first."*
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
| [Number of Good Pairs #1512](https://leetcode.com/problems/number-of-good-pairs/) | Easy | Brute Force First |

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
    int numIdenticalPairs(vector<int>& nums) {
        unordered_map<int,int> cnt;
        long long ans = 0;
        for (int n : nums) {
            ans += cnt[n];
            cnt[n]++;
        }
        return ans;
    }
};
```

### Python
```python
class Solution:
    def numIdenticalPairs(self, nums: List[int]) -> int:
        cnt = {}
        ans = 0
        for n in nums:
            ans += cnt.get(n, 0)
            cnt[n] = cnt.get(n, 0) + 1
        return ans
```

### Java
```java
class Solution {
    public int numIdenticalPairs(int[] nums) {
        Map<Integer, Integer> cnt = new HashMap<>();
        int ans = 0;
        for (int n : nums) {
            ans += cnt.getOrDefault(n, 0);
            cnt.put(n, cnt.getOrDefault(n, 0) + 1);
        }
        return ans;
    }
}
```

**Complexity:** O(n) time · O(n) space

---

## 💭 What a Mentor Would Tell You

- *"I didn't need the optimal solution — I needed a **correct** solution with a clear process."*
- *"Tracing the example first would have saved me from that off-by-one bug."*
- *"Getting stuck for 3 minutes is normal. Giving up at 30 seconds is the real problem."*

> 🎯 **Skill practiced:** Brute Force First

---

*One quest down. The next one builds on this skill. →*
