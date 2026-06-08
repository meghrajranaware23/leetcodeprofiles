# ⚔ Quest: Richest Customer Wealth

> **Day 3** · [Richest Customer Wealth #1672](https://leetcode.com/problems/richest-customer-wealth/) · Easy · 10 min · 10 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Richest Customer Wealth on LeetCode](https://leetcode.com/problems/richest-customer-wealth/)**

> ⚔ **Mentor's rule:** Spend at least 5 minutes with pen and paper. Apply today's skill: **Nested Loop Tracing**. The hints below are for *after* your attempt.

---

## The Problem

Given the problem on LeetCode, apply today's skill: **Nested Loop Tracing**.

**[→ Open Richest Customer Wealth on LeetCode](https://leetcode.com/problems/richest-customer-wealth/)** for the full statement, examples, and constraints.

---

## 💡 Hints

1. Re-read the constraints — what edge cases do they hint at?
2. Trace Example 1 by hand before writing any code
3. Start with the simplest approach that could work (brute force is fine)


---

## 🔍 Strategy Breakdown

**Skill practiced today:** Nested Loop Tracing

**Why this problem:** 2D iteration; teaches tracing nested loops on paper

**How to read this problem:**
1. What is the input? What is the output?
2. What do the examples tell you about the expected behavior?
3. What's the simplest approach that handles all examples?

**How a mentor thinks (before coding):**
1. *"I've seen this type — it's about nested loop tracing."*
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
| [Richest Customer Wealth #1672](https://leetcode.com/problems/richest-customer-wealth/) | Easy | Nested Loop Tracing |

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
    int maximumWealth(vector<vector<int>>& accounts) {
        int best = 0;
        for (auto& row : accounts) {
            int sum = 0;
            for (int x : row) sum += x;
            best = max(best, sum);
        }
        return best;
    }
};
```

### Python
```python
class Solution:
    def maximumWealth(self, accounts: List[List[int]]) -> int:
        return max(sum(row) for row in accounts)
```

### Java
```java
class Solution {
    public int maximumWealth(int[][] accounts) {
        int best = 0;
        for (int[] row : accounts) {
            int sum = 0;
            for (int x : row) sum += x;
            best = Math.max(best, sum);
        }
        return best;
    }
}
```

**Complexity:** O(m·n) time · O(1) space

---

## 💭 What a Mentor Would Tell You

- *"I didn't need the optimal solution — I needed a **correct** solution with a clear process."*
- *"Tracing the example first would have saved me from that off-by-one bug."*
- *"Getting stuck for 3 minutes is normal. Giving up at 30 seconds is the real problem."*

> 🎯 **Skill practiced:** Nested Loop Tracing

---

*Two quests down. Move to today's checkpoint. →*
