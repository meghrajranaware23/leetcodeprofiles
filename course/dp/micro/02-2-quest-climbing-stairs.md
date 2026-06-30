<!-- hand-authored -->
# ⚔ Quest: Climbing Stairs

> **Day 2** · [Climbing Stairs #70](https://leetcode.com/problems/climbing-stairs/) · Easy · 10 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Climbing Stairs on LeetCode](https://leetcode.com/problems/climbing-stairs/)**

> ⚔ **Hunter's rule:** Write naive `climb(n) = climb(n-1) + climb(n-2)`. Trace `n=5`. Mark the second time `climb(3)` is called — that's your memo target.

---

## The Problem

See the full problem statement on LeetCode: **[Climbing Stairs #70](https://leetcode.com/problems/climbing-stairs/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

**Pattern:** Fibonacci in Disguise — count ways, not Fib values.

**Hint 1:** To reach step `i`, your last move was 1 step (from `i-1`) or 2 steps (from `i-2`). **Add** the ways from each.

**Hint 2:** State: `ways(i)` = number of distinct ways to reach step `i`. Same recurrence as Fib: `ways(i) = ways(i-1) + ways(i-2)`.

**Hint 3:** Implement with memo first (Day 2). Notice `ways(3)` computed once, returned twice — the cache hit from today's concept.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Fibonacci in Disguise

**How to identify this from the problem statement:**
- "Distinct ways" + fixed step sizes (1 or 2)
- Counting, not optimizing cost
- Recurrence identical to Fib; bases differ (`ways(1)=1`, `ways(2)=2`)

| Keyword / phrase | What it signals |
|---|---|
| "how many distinct ways" | Sum transitions — counting DP |
| "1 or 2 steps" | Two predecessors: i-1 and i-2 |
| "reach the top" / step n | Answer: `ways(n)` |

**Why brute force fails:** Identical exponential tree to Fib — O(2^n) calls, O(n) unique `ways(i)`.

**How a strong solver thinks before coding:**
1. *"Last step 1 or 2 → sum two subproblems."*
2. *"Draw tree for n=5 — spot ways(3) repeat."*
3. *"memo[i] before recurse; return memo[i] on hit."*
4. *"Or tabulate — Day 3; roll a,b — Day 1 Step 5."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Naive recursion** | O(2^n) — Day 1 exponential tree |
| **Memoized recursion** | O(n) — Day 2 cache hits |
| **Bottom-up / rolling** | O(n) time, O(1) space |
| **Enumerate all path strings** | O(2^n) — overkill |

```
n=5 naive:                    With memo:
    ways(5)                       ways(5)=8
   /      \                      memo[4]=5, memo[3]=3
ways(4)  ways(3)×2              ways(3) second call → 3 ✓
→ 15 calls                      → 5 unique states
```

---

## 🔗 Same Pattern, Other Problems

| Problem | dp[i] meaning | Recurrence |
|---|---|---|
| [Fibonacci Number #509](https://leetcode.com/problems/fibonacci-number/) | i-th Fib **value** | dp[i-1]+dp[i-2] |
| [N-th Tribonacci Number #1137](https://leetcode.com/problems/n-th-tribonacci-number/) | 3-step variant | dp[i-1]+dp[i-2]+dp[i-3] |
| [Decode Ways #91](https://leetcode.com/problems/decode-ways/) | ways with 1/2 digit | similar counting |

---

## 📖 Walkthrough

**Count ways for n=4:**

```
ways(1) = 1                    base
ways(2) = 2                    base  (1+1, or 2)
ways(3) = ways(2)+ways(1) = 3
ways(4) = ways(3)+ways(2) = 5

Paths to step 4: 1-1-1-1, 1-1-2, 1-2-1, 2-1-1, 2-2 → 5 ✓

Memo trace for ways(4):
  compute ways(3)→ needs ways(2), ways(1)
  compute ways(2)→ base
  memo[3]=3
  compute ways(2)→ CACHE HIT for ways(2) if already stored
  memo[4]=5
```

> 💡 **The insight:** Fibonacci **values** vs climbing **ways** — same math, different English. Memo doesn't care; it caches the integer.

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
        if n <= 2:
            return n
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

## 💭 What Should Have Clicked in Your Mind?

- **"Distinct ways" + 1 or 2 steps** → Fib recurrence on counts.
- **"Day 1 tree, Day 2 memo"** → Second `ways(3)` call = cache hit.
- **"ways(1)=1, ways(2)=2"** → Bases differ from Fib's 0,1,1,...
- **"Solution uses rolling"** → Memo *or* tabulate — both O(n); rolling is Step 5.

> 🎯 **Pattern Unlocked:** Fibonacci in Disguise

---

*One quest down. Next: same stairs, but min cost — min instead of sum. →*
