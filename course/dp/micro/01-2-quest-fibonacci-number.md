<!-- hand-authored -->
# ⚔ Quest: Fibonacci Number

> **Day 1** · [Fibonacci Number #509](https://leetcode.com/problems/fibonacci-number/) · Easy · 10 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Fibonacci Number on LeetCode](https://leetcode.com/problems/fibonacci-number/)**

> ⚔ **Hunter's rule:** Draw `fib(6)`'s recursion tree on paper. Circle every node that appears more than once. *Then* decide: memo, tabulation, or rolling variables?

---

## The Problem

See the full problem statement on LeetCode: **[Fibonacci Number #509](https://leetcode.com/problems/fibonacci-number/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

**Pattern:** Linear Recurrence — the canonical overlap demo from today's concept.

**Hint 1:** Brute force: `fib(n) = fib(n-1) + fib(n-2)` with base `n <= 1 → n`. Draw the tree for `n=5` — count how many times `fib(2)` appears.

**Hint 2:** State: `dp[i]` = the i-th Fibonacci number. Transition: `dp[i] = dp[i-1] + dp[i-2]`. Bases: `dp[0]=0`, `dp[1]=1`.

**Hint 3:** You only need the last two values to compute the next — full array is optional (Pipeline Step 5).

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Linear Recurrence

**How to identify this from the problem statement:**
- Explicit recurrence: each term = sum of previous terms
- Single integer input `n`, single integer output
- Classic overlap — same `fib(k)` from many branches

| Keyword / phrase | What it signals |
|---|---|
| "Fibonacci" / "F(n) = F(n-1) + F(n-2)" | Linear recurrence, k=2 |
| "nth" / "return F(n)" | Answer is `dp[n]` |
| Small constraints (n ≤ 30) | Even brute recursion passes — but learn the O(n) way |

**Why brute force fails at scale:** `fib(30)` naive recursion ≈ 2^30 calls. Only 30 unique subproblems exist.

**How a strong solver thinks before coding:**
1. *"Recurrence is given — write it recursively first."*
2. *"Tree for n=5 — fib(3) twice, fib(2) three times."*
3. *"Tabulate dp[0..n] or roll with (a,b)."*
4. *"Answer: dp[n] or b after loop."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Naive recursion, no cache** | O(2^n) — exponential recomputation |
| **Recursion with memo** | O(n) — valid; Day 2's style |
| **Bottom-up tabulation** | O(n) time, O(1) space with rolling |
| **Closed-form (Binet)** | Overkill for interviews; recurrence path matters |

**The insight:** 15 nodes in the tree for `fib(5)`, but only 6 unique values. DP = compute each unique value once.

```
Naive tree (n=5):          Tabulation:
     fib(5)                  dp: [0, 1, 1, 2, 3, 5]
    /    \                   i=2: 0+1=1
  fib(4) fib(3)              i=3: 1+1=2
  ...   ...                  i=4: 1+2=3
→ 15 calls                   i=5: 2+3=5  ✓
```

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays |
|---|---|---|
| Climbing Stairs #70 (Day 2) | Count ways, not Fib value | Same recurrence, different meaning |
| N-th Tribonacci #1137 (next quest) | Three-term sum | k=3 recurrence |
| Min Cost Climbing Stairs #746 | Add min + cost array | Recurrence + optimization |

---

## 📖 Walkthrough

**Trace `fib(5)` with tabulation:**

```
dp[0] = 0          base
dp[1] = 1          base
dp[2] = dp[1]+dp[0] = 1
dp[3] = dp[2]+dp[1] = 2
dp[4] = dp[3]+dp[2] = 3
dp[5] = dp[4]+dp[3] = 5  ← answer

Rolling equivalent: a=0, b=1 → iterate: c=a+b; a=b; b=c
After i=5: b=5 ✓
```

> 💡 **The insight:** The recursion tree *is* the dependency graph. Tabulation fills it bottom-up, one row at a time.

---

## Solution

### C++
```cpp
class Solution {
public:
    int fib(int n) {
        if (n <= 1) return n;
        int a = 0, b = 1;
        for (int i = 2; i <= n; i++) { int c = a + b; a = b; b = c; }
        return b;
    }
};
```

### Python
```python
class Solution:
    def fib(self, n: int) -> int:
        if n <= 1:
            return n
        a, b = 0, 1
        for _ in range(2, n + 1):
            a, b = b, a + b
        return b
```

### Java
```java
class Solution {
    public int fib(int n) {
        if (n <= 1) return n;
        int a = 0, b = 1;
        for (int i = 2; i <= n; i++) { int c = a + b; a = b; b = c; }
        return b;
    }
}
```

**Complexity:** O(n) time · O(1) space
---

## 💭 What Should Have Clicked in Your Mind?

- **"fib(n-1) + fib(n-2)"** → Recurrence given; overlap guaranteed.
- **"Draw the tree"** → Same nodes repeat — that's the DP signal from Recursion pack bridge.
- **"dp[i] = i-th Fib"** → One-sentence state before code.
- **"Rolling a,b"** → Pipeline Step 5 — only last two values needed.

If you wrote memoized recursion instead, that's valid — Day 2 makes it official.

> 🎯 **Pattern Unlocked:** Linear Recurrence

---

*One quest down. Next: Tribonacci — same overlap, three branches instead of two. →*
