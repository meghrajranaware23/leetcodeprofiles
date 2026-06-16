<!-- hand-authored -->
# ⚔ Quest: Climbing Stairs

> **Day 13** · [Climbing Stairs #70](https://leetcode.com/problems/climbing-stairs/) · Easy · 10 min · 10 XP

---

**[→ Open on LeetCode](https://leetcode.com/problems/climbing-stairs/)**

> ⚔ **Seed only** — trace ways to climb; full DP/recursion comes in Ascension packs.

---

## The Problem

`n` steps, 1 or 2 at a time. How many distinct ways?

**Example:** `n = 3` → `3` (1+1+1, 1+2, 2+1)

---

## 💡 Hints

1. Trace n=1→1, n=2→2, n=3→3 on paper
2. Pattern: ways(n) = ways(n-1) + ways(n-2) — Fibonacci shape
3. **Defer:** memo/recursion → Recursion Ascension; tabulation → DP Ascension

---

## 📖 Walkthrough n=3

```
1+1+1 | 1+2 | 2+1  → 3 ways
```

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

> 🎯 **Skill practiced:** Pattern Seed

---

*One quest down. The next one builds on this skill. →*
