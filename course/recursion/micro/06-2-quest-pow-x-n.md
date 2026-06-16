<!-- hand-authored -->
# ⚔ Quest: Pow(x, n)

> **Day 6** · [Pow(x, n) #50](https://leetcode.com/problems/powx-n/) · Medium · 15 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Pow(x, n) on LeetCode](https://leetcode.com/problems/powx-n/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. Draw the halving tree for `2^10`. The hints below are for *after* your attempt.

---

## The Problem

Implement `pow(x, n)`, which calculates `x` raised to the power `n`.

```
Input:  x = 2.0, n = 10
Output: 1024.0

Input:  x = 2.1, n = 3
Output: 9.261

Input:  x = 2.0, n = -2
Output: 0.25
```

---

## 💡 Hints

Which pattern from today's concept applies? **Binary recursion** — halve the exponent, square the half-result.

If you're stuck after 5 minutes: trace `pow(2, 5)`. Base at `n=0`. Odd step needs one extra `× x`.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Fast Exponentiation (Binary Recursion)

**How to identify this from the problem statement:**
- "Implement pow(x, n)" → classic **halve exponent, combine squares**
- "n can be negative" → recurse on `|n|`, return `1.0 / result`
- "O(log n) expected" → one recursive call per level, not n multiplications

| Keyword / phrase | What it signals |
|---|---|
| "x raised to n" / "power" | `half = pow(x, n/2)` then `half²` |
| "negative n" | `1 / pow(x, -n)` at wrapper level |
| "efficient" / large n | Halving → O(log n) depth |
| "even / odd exponent" | Even: `half²`; odd: `half² × x` |

**Why this pattern works:** `x^n = (x^(n/2))²` when n is even. One sub-call, square the result. Odd n adds one more `x`.

**How a strong solver thinks before coding:**
1. *"Base: n == 0 → 1."*
2. *"One call: half = pow(x, n/2). Don't call twice."*
3. *"n % 2 decides square-only vs square-and-multiply."*
4. *"Use long for n to handle -2³¹ safely."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Loop: multiply x, n times** | O(n) — fails when n ≈ 2³¹ |
| **Two calls: pow(n/2) + pow(n/2)** | Doubles work — still exponential |
| **Linear recursion pow(x, n-1)** | O(n) depth — stack overflow |
| **Ignoring negative n** | Wrong sign on half of test cases |

**The insight brute force misses:** You only need **one** half-result. Square it. Odd exponent needs one extra factor — not a second full recursion tree.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Count Good Numbers #1922](https://leetcode.com/problems/count-good-numbers/) | Modular pow + counting | Same `pow_mod` halving |
| [Pow(x, n) #50](https://leetcode.com/problems/powx-n/) | Float x, negative n | Halve, square, odd guard |
| [Super Pow #372](https://leetcode.com/problems/super-pow/) | Base 1337, array exponent | Modular binary pow |
| [Pow(x, n) — iterative variant](https://leetcode.com/problems/powx-n/) | Same logic, while loop | Bit-scan exponent instead of recursion |

If you recognized Pow(x, n), Count Good Numbers is the same engine with `% MOD`.

---

## 📖 Walkthrough

Binary recursion on `x = 2, n = 10`:

```
CALL TREE (values returned upward):

pow(2, 10)  n even
  half = pow(2, 5)
    half = pow(2, 2)
      half = pow(2, 1)  n odd
        half = pow(2, 0) → 1  (BASE)
        return 1² × 2 = 2
      return 2² = 4
    return 4² × 2 = 32
  return 32² = 1024  ✓

Negative: x=2, n=-2
  → 1.0 / pow(2, 2) = 1.0 / 4 = 0.25
```

Frame trace for `pow(2, 5)`:

```
┌─────────────────────────┐
│ pow(2,5)  half=pow(2,2) │
│   waiting...            │
├─────────────────────────┤
│ pow(2,2)  half=pow(2,1) │
│   waiting...            │
├─────────────────────────┤
│ pow(2,1)  half=pow(2,0) │
│   half=1 → 1²×2 = 2     │
├─────────────────────────┤
│ pow(2,0)  BASE → 1      │
└─────────────────────────┘
UNWIND: 2 → 4 → 32
```

> 💡 **The insight:** One `half` variable per frame. Never `pow(n/2) + pow(n/2)`.

---

## Solution

### C++
```cpp
class Solution {
    double powRec(double x, long n) {
        if (n == 0) return 1;
        double half = powRec(x, n / 2);
        if (n % 2 == 0) return half * half;
        return half * half * x;
    }
public:
    double myPow(double x, int n) {
        long N = n;
        if (N < 0) return 1.0 / powRec(x, -N);
        return powRec(x, N);
    }
};
```

### Python
```python
class Solution:
    def myPow(self, x: float, n: int) -> float:
        def pow_rec(x, n):
            if n == 0: return 1.0
            half = pow_rec(x, n // 2)
            return half * half if n % 2 == 0 else half * half * x
        if n < 0: return 1.0 / pow_rec(x, -n)
        return pow_rec(x, n)
```

### Java
```java
class Solution {
    public double myPow(double x, int n) {
        long N = n;
        if (N < 0) return 1.0 / powRec(x, -N);
        return powRec(x, N);
    }
    private double powRec(double x, long n) {
        if (n == 0) return 1.0;
        double half = powRec(x, n / 2);
        return (n % 2 == 0) ? half * half : half * half * x;
    }
}
```

**Complexity:** O(log n) time · O(log n) space
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Power of n"** → Don't loop n times. Halve n.
- **"x^n = (x^(n/2))²"** → One recursive call, store `half`, square it.
- **"n is odd"** → After squaring, multiply once more by x.
- **"n is negative"** → `long N = n` then `1.0 / powRec(x, -N)` — avoid int overflow.

If you tried a linear loop first, that's fine — the breakthrough is seeing the **halving tree** on paper, not memorizing the formula.

> 🎯 **Pattern Unlocked:** Fast exponentiation via binary recursion — halve exponent, square half, odd guard.

---

*One quest down. Next: same skeleton with modular arithmetic. →*
