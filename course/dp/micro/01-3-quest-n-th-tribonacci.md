<!-- hand-authored -->
# ⚔ Quest: N-th Tribonacci Number

> **Day 1** · [N-th Tribonacci Number #1137](https://leetcode.com/problems/n-th-tribonacci-number/) · Easy · 10 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open N-th Tribonacci Number on LeetCode](https://leetcode.com/problems/n-th-tribonacci-number/)**

> ⚔ **Hunter's rule:** Fibonacci had 2 children per node. Tribonacci has **3**. Draw `trib(5)` and count repeats — overlap is *worse*, so caching matters even more.

---

## The Problem

See the full problem statement on LeetCode: **[N-th Tribonacci Number #1137](https://leetcode.com/problems/n-th-tribonacci-number/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

**Pattern:** Extended Recurrence (k=3 linear DP).

**Hint 1:** Bases: `T(0)=0`, `T(1)=T(2)=1`. Recurrence: `T(n) = T(n-1) + T(n-2) + T(n-3)` for `n ≥ 3`.

**Hint 2:** Same pipeline as Fibonacci — only the number of prior terms changes. State: `trib(i)` = i-th Tribonacci number.

**Hint 3:** Space optimization: keep three rolling variables `(a,b,c)` representing the last three values — not the full array.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Extended Recurrence

**How to identify this from the problem statement:**
- Recurrence uses **k previous terms** (here k=3)
- Explicit base cases for `n=0,1,2`
- Same overlap structure as Fib, wider tree

| Keyword / phrase | What it signals |
|---|---|
| "T(n) = T(n-1) + T(n-2) + T(n-3)" | k=3 linear recurrence |
| "tribonacci" | Fibonacci generalization |
| n up to 37 | O(n) tabulation is trivial |

**Why brute force fails:** Tribonacci naive recursion is **O(3^n)** — even faster blowup than Fib's O(2^n). Still only O(n) unique states.

**How a strong solver thinks before coding:**
1. *"Three bases, not two."*
2. *"Transition adds three prior dp values."*
3. *"Roll (a,b,c) — shift after each i."*
4. *"Answer: c after loop (or dp[n])."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Naive 3-way recursion** | O(3^n) — catastrophic overlap |
| **Memo on trib(n)** | O(n) time, O(n) space |
| **Tabulation + 3 rolling vars** | O(n) time, O(1) space ✓ |

```
trib(4) appears under trib(5), trib(6)'s left and middle branches...
Unique states: n+1 values. Naive tree: exponential nodes.
```

---

## 🔗 Same Pattern, Other Problems

| Problem | k | Transition |
|---|---|---|
| Fibonacci #509 | 2 | dp[i-1] + dp[i-2] |
| **Tribonacci #1137** | **3** | **dp[i-1] + dp[i-2] + dp[i-3]** |
| Climbing Stairs #70 | 2 | ways[i-1] + ways[i-2] (count, not sum of values) |

The **shape** of the recurrence is the pattern — meaning of dp[i] changes per problem.

---

## 📖 Walkthrough

**Tabulate T(0) through T(7):**

```
n:  0  1  2  3  4  5  6   7
T:  0  1  1  2  4  7  13  24

T(3) = T(2)+T(1)+T(0) = 1+1+0 = 2
T(4) = 1+1+2 = 4
T(5) = 1+2+4 = 7
T(6) = 2+4+7 = 13

Rolling: a=0, b=1, c=1
i=3: d=2 → a,b,c = 1,1,2
i=4: d=4 → a,b,c = 1,2,4
...
i=7: c=24 ✓
```

> 💡 **The insight:** Fib is Trib with k=2. Every "sum of last k terms" problem shares the same tabulation skeleton.

---

## Solution

### C++
```cpp
class Solution {
public:
    int tribonacci(int n) {
        if (n == 0) return 0;
        if (n <= 2) return 1;
        int a = 0, b = 1, c = 1;
        for (int i = 3; i <= n; i++) {
            int d = a + b + c;
            a = b; b = c; c = d;
        }
        return c;
    }
};
```

### Python
```python
class Solution:
    def tribonacci(self, n: int) -> int:
        if n == 0: return 0
        if n <= 2: return 1
        a, b, c = 0, 1, 1
        for _ in range(3, n + 1):
            a, b, c = b, c, a + b + c
        return c
```

### Java
```java
class Solution {
    public int tribonacci(int n) {
        if (n == 0) return 0;
        if (n <= 2) return 1;
        int a = 0, b = 1, c = 1;
        for (int i = 3; i <= n; i++) {
            int d = a + b + c;
            a = b; b = c; c = d;
        }
        return c;
    }
}
```

**Complexity:** O(n) time · O(1) space
---

## 💭 What Should Have Clicked in Your Mind?

- **"Three-term recurrence"** → Extend Fib pipeline: one more base, one more rolling variable.
- **"Wider recursion tree"** → More overlap, same O(n) fix.
- **"Recursion pack bridge"** → If tree has repeats → cache; Trib is the proof.
- **"Return c"** → After loop, c holds T(n).

> 🎯 **Pattern Unlocked:** Extended Recurrence

---

*Both quests complete. Head to the checkpoint. →*
