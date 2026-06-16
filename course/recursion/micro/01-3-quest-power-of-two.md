<!-- hand-authored -->
# ⚔ Quest: Power of Two

> **Day 1** · [Power of Two #231](https://leetcode.com/problems/power-of-two/) · Easy · 10 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Power of Two on LeetCode](https://leetcode.com/problems/power-of-two/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. Trace the `n / 2` chain on paper. Mark each frame push and pop. The hints below are for *after* your attempt.

---

## The Problem

Given an integer `n`, return `true` if it is a power of two. Otherwise, return `false`.

```
Input:  n = 1
Output: true
Explanation: 2^0 = 1
```

```
Input:  n = 16
Output: true
Explanation: 2^4 = 16
```

```
Input:  n = 3
Output: false
```

```
Input:  n = -2
Output: false
```

---

## 💡 Hints

Which pattern from today's concept applies? **Recursive reduction** — if `n` is even, halve it and ask the same question on `n/2`.

If you're stuck after 5 minutes: list base cases first — what should happen for `n <= 0`, `n == 1`, and odd `n > 1`?

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Recursive Reduction (Divide by 2)

**How to identify this from the problem statement:**
- "Power of two" → only factors of 2 — repeatedly divide by 2
- Each step asks the **same question** on a smaller `n`
- Odd `n > 1` fails immediately — not a power of two

| Keyword / phrase | What it signals |
|---|---|
| "power of two" | Halve until 1 or hit an odd number |
| "return true/false" | Boolean return bubbling up the stack |
| "integer n" | Watch edge cases: 0, negatives, 1 |
| "divide by 2" | Recursive shrink: `n → n/2` |
| "not a power" | Any odd step (except reaching 1) → false |

**Why this pattern works:** Powers of two have exactly one factor of 2 at each division step. Reaching `1` means success; hitting an odd number greater than 1 means failure.

**How a strong solver thinks before coding:**
1. *"Base: n <= 0 → false; n == 1 → true."*
2. *"If n is odd and > 1 → false (can't halve cleanly to 1)."*
3. *"Else recurse on n/2."*
4. *"Trace n=16 and n=6 side by side."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Loop i from 0..31, check if 2^i == n** | Works but O(log n) with manual exponentiation — misses the halving insight |
| **Divide by 2 in a loop without base cases** | Forgets `n <= 0` or `n == 1` — wrong answers on edges |
| **Recursing with `n - 1` instead of `n / 2`** | O(n) depth — TLE on large inputs; wrong shrink direction |
| **Using floating-point log** | Precision errors on large integers |

**The insight brute force misses:** Division **is** the recursive step. You don't need to generate powers — peel factors of 2 until you hit 1 or an odd dead end.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Power of Three #326](https://leetcode.com/problems/power-of-three/) | Divide by 3, check `% 3` | Same reduce-until-base skeleton |
| [Power of Four #342](https://leetcode.com/problems/power-of-four/) | Divide by 4 | Same halving chain with different divisor |
| [Sqrt(x) #69](https://leetcode.com/problems/sqrtx/) | Binary search / divide range | Divide-and-conquer shrink |
| [Pow(x, n) #50](https://leetcode.com/problems/powx-n/) | Multiply halves | Recursive reduction on exponent |

If you recognized Power of Two, you can spot any "divide until base" recursion.

---

## 📖 Walkthrough

Trace **`isPowerOfTwo(16)`** — each even step halves; **`isPowerOfTwo(6)`** dies at the odd step.

```
isPowerOfTwo(16):
  16 > 1, even  →  isPowerOfTwo(8)
    8 > 1, even  →  isPowerOfTwo(4)
      4 > 1, even  →  isPowerOfTwo(2)
        2 > 1, even  →  isPowerOfTwo(1)
          1 == 1  →  BASE → return true
        ↑ true
      ↑ true
    ↑ true
  ↑ true
return true  ✓


isPowerOfTwo(6):
  6 > 1, even  →  isPowerOfTwo(3)
    3 > 1, ODD  →  return false  ✓  (never reaches 1)


isPowerOfTwo(1):
  BASE → return true  ✓


isPowerOfTwo(0):
  n <= 0  →  return false  ✓


isPowerOfTwo(-8):
  n <= 0  →  return false  ✓
```

Call-stack view for `n = 16`:

```
┌─────────────────────┐
│ isPowerOfTwo(16)    │  wait →
├─────────────────────┤
│ isPowerOfTwo(8)     │  wait →
├─────────────────────┤
│ isPowerOfTwo(4)     │  wait →
├─────────────────────┤
│ isPowerOfTwo(2)     │  wait →
├─────────────────────┤
│ isPowerOfTwo(1)     │  BASE → true
└─────────────────────┘
unwind: true → true → true → true → true
```

> 💡 **The insight:** Odd `n > 1` is a **guard clause** — not a separate algorithm. One check prevents useless deeper calls.

---

## Solution

### C++
```cpp
class Solution {
public:
    bool isPowerOfTwo(int n) {
        if (n <= 0) return false;
        if (n == 1) return true;
        if (n % 2 != 0) return false;
        return isPowerOfTwo(n / 2);
    }
};
```

### Python
```python
class Solution:
    def isPowerOfTwo(self, n: int) -> bool:
        if n <= 0: return False
        if n == 1: return True
        if n % 2: return False
        return self.isPowerOfTwo(n // 2)
```

### Java
```java
class Solution {
    public boolean isPowerOfTwo(int n) {
        if (n <= 0) return false;
        if (n == 1) return true;
        if (n % 2 != 0) return false;
        return isPowerOfTwo(n / 2);
    }
}
```

**Complexity:** O(log n) time · O(log n) space
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Power of two"** → Keep dividing by 2 until 1 or stuck on odd.
- **"Three base cases"** → `n <= 0` false, `n == 1` true, odd `n > 1` false.
- **"Return value recursion"** → Unlike Reverse String, the bool bubbles **up** the stack.
- **"Same call stack idea as Day 1 concept"** → Frames wait; base case unblocks them.

If you tried generating `2^i` in a loop first, that's fine — the breakthrough is **halving as the recursive step**.

> 🎯 **Pattern Unlocked:** Recursive reduction — shrink by division, guard with parity checks.

---

*Both quests complete. Head to the checkpoint. →*
