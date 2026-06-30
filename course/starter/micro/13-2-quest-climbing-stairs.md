<!-- hand-authored -->
# ⚔ Quest: Climbing Stairs

> **Day 13** · [Climbing Stairs #70](https://leetcode.com/problems/climbing-stairs/) · Easy · 10 min · 10 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Climbing Stairs on LeetCode](https://leetcode.com/problems/climbing-stairs/)**

> ⚔ **Mentor's rule:** **Seed only** — trace ways to climb n=3 on paper. Full DP/recursion comes in Ascension packs.

---

## The Problem

You are climbing a staircase. It takes `n` steps to reach the top. Each time you can climb 1 or 2 steps. In how many **distinct** ways can you climb to the top?

**Example 1:**
```
Input: n = 2
Output: 2
Explanation: 1+1 or 2
```

**Example 2:**
```
Input: n = 3
Output: 3
Explanation: 1+1+1, 1+2, 2+1
```

**Constraints:** `1 <= n <= 45`

---

## 💡 Hints

1. Trace n=1→1, n=2→2, n=3→3 on paper
2. Pattern: ways(n) = ways(n-1) + ways(n-2) — Fibonacci shape
3. **Defer:** memo/recursion → Recursion Ascension; tabulation → DP Ascension
4. Don't over-study today — trace is enough

---

## 📖 Walkthrough n=3

```
Ways to reach step 3:
  1+1+1
  1+2   (one step + two step)
  2+1   (two step + one step)
→ 3 distinct ways

Pattern: ways(3) = ways(2) + ways(1) = 2 + 1 = 3
```

**Plain English:** To land on step n, you came from n-1 (one step) or n-2 (two steps).

---

## Solution

### C++
```cpp
class Solution {
public:
    int climbStairs(int n) {
        if (n <= 2) return n;
        int a = 1, b = 2;
        for (int i = 3; i <= n; i++) { int c = a + b; a = b; b = c; }
        return b;
    }
};
```

### Python
```python
class Solution:
    def climbStairs(self, n: int) -> int:
        if n <= 2: return n
        a, b = 1, 2
        for _ in range(3, n + 1):
            a, b = b, a + b
        return b
```

### Java
```java
class Solution {
    public int climbStairs(int n) {
        if (n <= 2) return n;
        int a = 1, b = 2;
        for (int i = 3; i <= n; i++) { int c = a + b; a = b; b = c; }
        return b;
    }
}
```

**Complexity:** O(n) time · O(1) space
---

## 💭 What a Mentor Would Tell You

- *"I traced — I'll learn the full pattern in Recursion/DP pack."*
- *"Didn't need to master memo today — seed is enough for the roadmap."*
- *"ways(n)=ways(n-1)+ways(n-2) — I'll see this again in Ascension."*

> 🎯 **Skill practiced:** Pattern Seed

---

*One quest down. The next one builds on this skill. →*
