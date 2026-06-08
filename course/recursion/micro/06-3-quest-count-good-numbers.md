# ⚔ Quest: Count Good Numbers

> **Day 6** · [Count Good Numbers #1922](https://leetcode.com/problems/count-good-numbers/) · Medium · 15 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Count Good Numbers on LeetCode](https://leetcode.com/problems/count-good-numbers/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. Trace the call stack on paper. Mark each frame push and pop. The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Count Good Numbers #1922](https://leetcode.com/problems/count-good-numbers/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? Think about **Modular Binary Recursion**.

If you're stuck after 5 minutes: revisit the concept page's visual walkthrough. Trace the call stack on paper. Mark each frame push and pop.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Modular Binary Recursion

**How to identify this from the problem statement:**
- Can the problem be broken into a smaller version of itself?
- Is there a clear base case when the input is small enough?
- Do you need to generate all valid choices or just compute one answer?

| Keyword / phrase | What it signals |
|---|---|
| "reverse" / "factorial" / "power" | Linear recursion — shrink by one |
| "all subsets" / "all combinations" | Backtracking — include/exclude |
| "all permutations" / "arrangements" | Backtracking — used[] or swap |
| "partition" / "split" / "restore" | String backtracking |
| "word search" / "grid" | Grid DFS + mark/unmark |
| "how many ways" + overlap | Recursion + memoization |

**Why this pattern works:** Recursive problems have self-similar structure. Name what shrinks, define the base case, trust the sub-call.

**How a strong solver thinks before coding:**
1. *"What is the base case?"*
2. *"What gets smaller on each call?"*
3. *"Do I pass state down or return results up?"*
4. *"Trace one example on paper before coding."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Nested loops for all combinations** | O(n!) — misses pruning and structure |
| **Iterating without recursive insight** | Hard to handle tree/backtracking shape |
| **No memoization on overlapping subproblems** | Exponential time on Fibonacci-style problems |
| **Forgetting to backtrack (undo)** | Wrong state leaks into sibling branches |

**The insight brute force misses:** Recursion names the substructure. Backtracking prunes invalid branches early.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| Related recursive problems | Different combine logic | Same skeleton: base + recurse + combine |
| Same backtracking family | Different constraints | Same choose / explore / unchoose |
| Variant constraints | Extra pruning or state | Same decision tree shape |

If you recognized this problem's pattern, you already have the skeleton for today's practice queue.

---

## 📖 Walkthrough

Trace the call stack on paper. Mark each frame push and pop.

```
Apply Modular Binary Recursion step by step on the example from the problem.
Mark the current call frame at each step.
Watch what gets returned (or what choices get made) at each level.
```

> 💡 **The insight:** The code is just the paper trace written in syntax. If you can trace it by hand, you can code it.

---

## Solution

### C++
```cpp
class Solution {
    const int MOD = 1e9 + 7;
    long long powMod(long long x, long long n) {
        if (n == 0) return 1;
        long long half = powMod(x, n / 2);
        half = half * half % MOD;
        if (n % 2) half = half * x % MOD;
        return half;
    }
public:
    int countGoodNumbers(long long n) {
        long long evens = (n + 1) / 2;
        long long odds  = n / 2;
        return (int)(powMod(5, evens) * powMod(4, odds) % MOD);
    }
};
```

### Python
```python
class Solution:
    def countGoodNumbers(self, n: int) -> int:
        MOD = 10**9 + 7
        def pow_mod(x, k):
            if k == 0: return 1
            half = pow_mod(x, k // 2)
            half = half * half % MOD
            if k % 2: half = half * x % MOD
            return half
        evens = (n + 1) // 2
        odds = n // 2
        return pow_mod(5, evens) * pow_mod(4, odds) % MOD
```

### Java
```java
class Solution {
    private static final int MOD = 1_000_000_007;
    public int countGoodNumbers(long long n) {
        long evens = (n + 1) / 2;
        long odds = n / 2;
        return (int) (powMod(5, evens) * powMod(4, odds) % MOD);
    }
    private long powMod(long x, long n) {
        if (n == 0) return 1;
        long half = powMod(x, n / 2);
        half = half * half % MOD;
        if (n % 2 != 0) half = half * x % MOD;
        return half;
    }
}
```

**Complexity:** O(log n) time · O(log n) space

---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"This is a recursive problem"** → Trace it. Don't start coding blind.
- **"Modular Binary Recursion"** → Name the pattern from the concept page.
- **"What's my base case?"** → Define it before the recursive call.
- **"What does the smaller call return?"** → Trust it and combine.

If you tried brute force first, that's fine — the breakthrough is **naming the pattern family**, not memorizing one solution.

> 🎯 **Pattern Unlocked:** Modular Binary Recursion

---

*Both quests complete. Head to the checkpoint. →*
