<!-- hand-authored -->
# ⚔ Quest: Domino and Tromino Tiling

> **Day 26** · [Domino and Tromino Tiling #790](https://leetcode.com/problems/domino-and-tromino-tiling/) · Medium · 15 min · 35 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Domino and Tromino Tiling on LeetCode](https://leetcode.com/problems/domino-and-tromino-tiling/)**

> ⚔ **Hunter's rule:** 2×n board tiling states. Recurrence: `f(n) = 2·f(n-1) + f(n-3)`. Roll `(a,b,c)` = three consecutive values.

---

## The Problem

See the full problem statement on LeetCode: **[Domino and Tromino Tiling #790](https://leetcode.com/problems/domino-and-tromino-tiling/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which DP pattern from today's concept applies? **Tiling Recurrence DP** — domino/tromino placement states.

Base cases: `n=1 → 1`, `n=2 → 2`. For `n ≥ 3`:
- Vertical domino at right edge → `f(n-1)`
- Two horizontal dominos → contributes `f(n-2)` plus tromino cases → total `2·f(n-1) + f(n-3)`

Maintain rolling `(a, b, c)` = `(f(n-3), f(n-2), f(n-1))`. Mod 10⁹+7.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Tiling Recurrence DP

**How to identify this from the problem statement:**
- 2×n grid, fill completely with 1×2 and L-shaped trominoes
- Count **distinct tilings** mod 10⁹+7
- n up to 1000 → need O(n) not exponential

| Keyword / phrase | What it signals |
|---|---|
| "domino and tromino" | Multi-piece tiling recurrence |
| "2×n" board | Column-sweep DP |
| "number of ways to tile" | Sum of case splits |

**Fibonacci contrast:** Plain domino-only 2×n is Fibonacci. **Tromino** adds the `f(n-3)` notch case — recurrence is `2c + a`, not `c + b`.

**How a strong solver thinks before coding:**
1. *"Base: n<=2 return n."*
2. *"a=1, b=1, c=2 (f(1), f(2) setup for rolling)."*
3. *"Loop 3..n: d = (2*c + a) % MOD; shift a,b,c."*
4. *"Return c."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Backtrack all placements** | Exponential in n |
| **Plain Fibonacci** | Missing tromino configurations |
| **2D dp on grid cells** | Overkill — 1D recurrence exists |

**The insight brute force misses:** Only the **width** matters — the 2×n board reduces to how the rightmost column(s) are covered. Three cases encode all domino/tromino endings.

```
n=3: f(3) = 2·f(2) + f(1) = 2·2 + 1 = 5
  vertical dom + horizontal pairs + L-tromino layouts
```

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Domino Tiling 2×n (classic)](https://leetcode.com/problems/domino-and-tromino-tiling/) | Domino only | Fibonacci f(n)=f(n-1)+f(n-2) |
| [Climbing Stairs #70](https://leetcode.com/problems/climbing-stairs/) | 1D steps | Simpler recurrence |
| [Arithmetic Slices #413](https://leetcode.com/problems/arithmetic-slices/) | Sequence counting | Today's other quest |

---

## 📖 Walkthrough

**n = 4**

```
f(1)=1, f(2)=2
f(3) = 2·2 + 1 = 5
f(4) = 2·5 + 2 = 12

Rolling:
  a=1, b=1, c=2
  i=3: d=2·2+1=5 → a=1,b=2,c=5
  i=4: d=2·5+1=11? wait 2*5+2=12 if a=f(2)=2
  After i=3: a=1,b=2,c=5
  i=4: d=2*5+2=12 ✓
```

Trace `(a,b,c)` as `(f(i-3), f(i-2), f(i-1))` each iteration.

> 💡 **The insight:** Tromino "notch" states collapse into the f(n-3) term — three rolling values suffice.

---

## Solution

### C++
```cpp
class Solution {
public:
    int numTilings(int n) {
        if (n <= 2) return n;
        const int MOD = 1e9 + 7;
        long a = 1, b = 1, c = 2;
        for (int i = 3; i <= n; i++) {
            long d = (2 * c % MOD + a) % MOD;
            a = b; b = c; c = d;
        }
        return c;
    }
};
```

### Python
```python
class Solution:
    def numTilings(self, n: int) -> int:
        if n <= 2:
            return n
        MOD = 10**9 + 7
        a, b, c = 1, 1, 2
        for _ in range(3, n + 1):
            a, b, c = b, c, (2 * c + a) % MOD
        return c
```

### Java
```java
class Solution {
    public int numTilings(int n) {
        if (n <= 2) return n;
        final int MOD = 1_000_000_007;
        long a = 1, b = 1, c = 2;
        for (int i = 3; i <= n; i++) {
            long d = (2 * c % MOD + a) % MOD;
            a = b; b = c; c = d;
        }
        return (int) c;
    }
}
```

**Complexity:** O(n) time · O(1) space
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"f(n) = 2·f(n-1) + f(n-3)"** — tromino adds the third-back term.
- **"Rolling a,b,c"** — O(1) space.
- **"Not plain Fib"** — coefficient 2 on f(n-1).
- **"Mod every step"** — n up to 1000, values huge.

If you tried brute force first, that's fine — the breakthrough is **tiling state recurrence**, not memorizing one solution.

> 🎯 **Pattern Unlocked:** Tiling Recurrence DP

---

*Both quests complete. Head to the checkpoint. →*
