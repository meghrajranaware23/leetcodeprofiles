<!-- hand-authored -->
# ⚔ Quest: Fibonacci Number

> **Day 2** · [Fibonacci Number #509](https://leetcode.com/problems/fibonacci-number/) · Easy · 10 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Fibonacci Number on LeetCode](https://leetcode.com/problems/fibonacci-number/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. Draw the recursion tree for `fib(5)`. Circle overlapping nodes. The hints below are for *after* your attempt.

---

## The Problem

The **Fibonacci numbers**, commonly denoted `F(n)`, form a sequence where each number is the sum of the two preceding ones, starting from `0` and `1`. That is:

```
F(0) = 0,  F(1) = 1
F(n) = F(n - 1) + F(n - 2), for n > 1
```

Given `n`, calculate `F(n)`.

```
Input:  n = 2
Output: 1
Explanation: F(2) = F(1) + F(0) = 1 + 0 = 1
```

```
Input:  n = 3
Output: 2
Explanation: F(3) = F(2) + F(1) = 1 + 1 = 2
```

```
Input:  n = 4
Output: 3
Explanation: F(4) = F(3) + F(2) = 2 + 1 = 3
```

---

## 💡 Hints

Which pattern from today's concept applies? **Binary recursion with the recursive hypothesis** — trust that `fib(n-1)` and `fib(n-2)` return correct values.

If you're stuck after 5 minutes: write the base case `n <= 1 → return n` first. Then add memo so each `fib(k)` is computed once.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Binary Recursion + Memoization

**How to identify this from the problem statement:**
- Explicit recurrence: `F(n) = F(n-1) + F(n-2)`
- Two smaller subproblems per call → recursion tree branches
- Same subproblems repeat → memoization required for efficiency

| Keyword / phrase | What it signals |
|---|---|
| "Fibonacci" / "sum of two preceding" | `f(n-1) + f(n-2)` |
| "starting from 0 and 1" | Base cases at 0 and 1 |
| "calculate F(n)" | Return value bubbles up the stack |
| "given n" | Top-down DFS from n downward |
| overlapping recomputation | Memo table keyed by n |

**Why this pattern works:** The recursive hypothesis states the answer for `n` in terms of two trusted smaller answers. Memo ensures each smaller answer is computed once.

**How a strong solver thinks before coding:**
1. *"Base: n <= 1 → return n."*
2. *"Hypothesis: return fib(n-1) + fib(n-2)."*
3. *"Overlap: cache in memo[n] before returning."*
4. *"Trace fib(4) — mark duplicate nodes."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Naive recursion, no memo** | O(2^n) time — `fib(40)` explodes; stack depth alone hurts |
| **Iterating n times with nested loop to re-sum** | Reinvents DP the hard way — misses clean recurrence |
| **Expanding full tree for large n by hand** | Impossible — signals you need trust + memo, not full expansion |
| **Wrong bases (e.g. return 1 for n=0 always)** | Off-by-one on small test cases |

**The insight brute force misses:** The tree **reuses** subproblems. You don't need every path — you need every **unique** `fib(k)` once.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Climbing Stairs #70](https://leetcode.com/problems/climbing-stairs/) | Count paths, base `n<=2` | Same `f(n-1)+f(n-2)` + memo |
| [N-th Tribonacci Number #1137](https://leetcode.com/problems/n-th-tribonacci-number/) | Three-term sum | `f(n-1)+f(n-2)+f(n-3)` + memo |
| [Min Cost Climbing Stairs #746](https://leetcode.com/problems/min-cost-climbing-stairs/) | Add cost per step | Same two-step structure, min instead of sum |
| [Decode Ways #91](https://leetcode.com/problems/decode-ways/) | Constraint on digits | Two-way split from current index + memo |

If you recognized Fibonacci, Climbing Stairs is the same quest in a stairwell costume.

---

## 📖 Walkthrough

Compute **`fib(4)`** with memo. Without memo, the tree overlaps; with memo, each value is computed once.

```
Recursion tree for fib(4) (nodes = calls):

                    fib(4)
                   /      \
              fib(3)      fib(2)     ← fib(2) shared if fib(3) expanded first
             /    \
        fib(2)  fib(1)
       /    \
  fib(1) fib(0)

Naive call count: fib(2) computed 2×, fib(1) computed 3×


MEMOIZED trace (each k computed once):

fib(4)
  needs fib(3) → compute:
    fib(3)
      needs fib(2) → compute:
        fib(2)
          needs fib(1) → 1
          needs fib(0) → 0
          memo[2] = 1 + 0 = 1  ✓
      needs fib(1) → 1 (base)
      memo[3] = 1 + 1 = 2  ✓
  needs fib(2) → memo hit → 1
  memo[4] = 2 + 1 = 3  ✓

Return 3
```

Call-stack snapshot at deepest point (before unwind):

```
┌──────────────┐
│ fib(4)       │  waiting
├──────────────┤
│ fib(3)       │  waiting
├──────────────┤
│ fib(2)       │  waiting
├──────────────┤
│ fib(1)       │  BASE → 1
└──────────────┘
```

> 💡 **The insight:** Day 1 taught you to read the stack. Day 2 adds: **two children per node**, but memo means each label `fib(k)` appears on the stack at most once per top-level run.

---

## Solution

### C++
```cpp
class Solution {
    vector<int> memo;
    int dfs(int n) {
        if (n <= 1) return n;
        if (memo[n] != -1) return memo[n];
        return memo[n] = dfs(n - 1) + dfs(n - 2);
    }
public:
    int fib(int n) {
        memo.assign(n + 1, -1);
        return dfs(n);
    }
};
```

### Python
```python
class Solution:
    def fib(self, n: int) -> int:
        memo = {}
        def dfs(k):
            if k <= 1: return k
            if k in memo: return memo[k]
            memo[k] = dfs(k - 1) + dfs(k - 2)
            return memo[k]
        return dfs(n)
```

### Java
```java
class Solution {
    private int[] memo;
    public int fib(int n) {
        memo = new int[n + 1];
        Arrays.fill(memo, -1);
        return dfs(n);
    }
    private int dfs(int n) {
        if (n <= 1) return n;
        if (memo[n] != -1) return memo[n];
        return memo[n] = dfs(n - 1) + dfs(n - 2);
    }
}
```

**Complexity:** O(n) time · O(n) space
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Explicit recurrence in the statement"** → Write it as code: `f(n-1) + f(n-2)`.
- **"Two recursive calls"** → Recursive hypothesis — trust both returns.
- **"Tree has duplicates"** → Memo before you optimize anything else.
- **"Same stack as Day 1"** → Base case still stops the descent.

If naive recursion timed out, that's expected — the breakthrough is **overlap + cache**, not a different formula.

> 🎯 **Pattern Unlocked:** Binary recursion with memo — trust `f(n-1)` and `f(n-2)`, store each `f(k)` once.

---

*One quest down. The next one is the same recurrence with a real-world story. →*
