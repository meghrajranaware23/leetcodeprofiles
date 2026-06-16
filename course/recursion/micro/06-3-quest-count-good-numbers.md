<!-- hand-authored -->
# ⚔ Quest: Count Good Numbers

> **Day 6** · [Count Good Numbers #1922](https://leetcode.com/problems/count-good-numbers/) · Medium · 15 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Count Good Numbers on LeetCode](https://leetcode.com/problems/count-good-numbers/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. Count even vs odd positions for n=4. The hints below are for *after* your attempt.

---

## The Problem

A **good number** is an n-digit number (leading zeros allowed) where:

- Digits at **even indices** (0-indexed) must be **even** (0, 2, 4, 6, 8) → **5 choices**
- Digits at **odd indices** must be **prime** (2, 3, 5, 7) → **4 choices**

Return the **count** of all good numbers of length `n`, modulo `10⁹ + 7`.

```
Input:  n = 1
Output: 5
Explanation: 0, 2, 4, 6, 8

Input:  n = 4
Output: 400
Explanation: 5 choices at indices 0,2 × 4 choices at indices 1,3 → 5² × 4² = 400

Input:  n = 50
Output: 564908303
```

---

## 💡 Hints

Which pattern from today's concept applies? **Modular binary recursion** — same halving pow as #50, with `% MOD` on every multiply.

If you're stuck after 5 minutes: count even-index slots = `(n+1)/2`, odd-index slots = `n/2`. Answer = `5^evens × 4^odds`.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Modular Binary Recursion

**How to identify this from the problem statement:**
- "count" + independent per-position choices → **multiply** counts, don't enumerate
- "modulo 10⁹+7" → modular fast pow, not raw `pow()`
- "even index / odd index" rules → split positions, two exponent counts

| Keyword / phrase | What it signals |
|---|---|
| "count good numbers" | Combinatorics: `5^evens × 4^odds` |
| "modulo" / "1e9+7" | `pow_mod` with `%` after each multiply |
| "even indices" / "odd indices" | `(n+1)/2` even slots, `n/2` odd slots |
| "large n" (up to 10¹⁵) | O(log n) modular pow — never loop |

**Why this pattern works:** Positions are independent. Even slots: 5 ways each. Odd slots: 4 ways each. Product of powers = total count. Modular pow prevents overflow.

**How a strong solver thinks before coding:**
1. *"evens = (n+1)/2, odds = n/2."*
2. *"Answer = pow_mod(5, evens) * pow_mod(4, odds) % MOD."*
3. *"pow_mod is identical to Pow(x,n) but every step uses % MOD."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Enumerate all n-digit numbers** | 10^n strings — impossible for n = 10¹⁵ |
| **Nested loops per digit** | O(10^n) — same explosion |
| **Math.pow without mod** | Overflow before you can mod |
| **Linear modular multiply n times** | O(n) — times out on large n |

**The insight brute force misses:** You never build numbers. You **count** choices per position type and **multiply** with modular fast pow.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Pow(x, n) #50](https://leetcode.com/problems/powx-n/) | Float, no mod | Same halving skeleton |
| [Count Good Numbers #1922](https://leetcode.com/problems/count-good-numbers/) | Two pow calls + mod | `pow_mod` helper |
| [Super Pow #372](https://leetcode.com/problems/super-pow/) | Base 1337 | Modular binary pow |
| [Matrix Exponentiation problems](https://leetcode.com/problemset/) | 2×2 combine | Generalized fast pow |

---

## 📖 Walkthrough

`n = 4` — positions 0,1,2,3:

```
Index:     0    1    2    3
Rule:     even odd  even odd
Choices:    5    4    5    4

evens = (4+1)/2 = 2  → 5² = 25
odds  = 4/2 = 2      → 4² = 16
answer = 25 × 16 = 400 ✓
```

Modular `pow_mod(5, 2)` trace (same tree as Pow):

```
pow_mod(5, 2)
  half = pow_mod(5, 1)
    half = pow_mod(5, 0) → 1
    half = (1*1 % MOD) * 5 % MOD = 5
  half = (5*5) % MOD = 25
return 25
```

Full answer: `pow_mod(5,2) * pow_mod(4,2) % MOD = 25 * 16 = 400`

For `n = 50`: evens=25, odds=25 — two O(log 25) pow calls, not 50 loops.

> 💡 **The insight:** Combinatorics names the exponents; binary recursion computes them safely under mod.

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

- **"Independent digit choices"** → Multiply counts, don't enumerate strings.
- **"Even index = 5 choices, odd = 4"** → `evens = (n+1)/2`, `odds = n/2`.
- **"Modulo"** → Reuse Pow(x,n) skeleton with `% MOD` on every multiply.
- **"n up to 10¹⁵"** → O(log n) pow is mandatory.

If you tried building digits recursively, pivot to **counting formula + modular pow** — same Day 6 engine.

> 🎯 **Pattern Unlocked:** Modular binary recursion — combinatorics for the exponents, fast pow for the computation.

---

*Both quests complete. Head to the checkpoint. →*
