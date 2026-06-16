<!-- hand-authored -->
# 📝 Multiple Recursive Calls

> **Day 6** · Binary Recursion · ★★★☆☆ · 15 XP · 15 min read

---

Your mission today: **one recursive call is not enough** — you halve the problem and combine two half-results. Trace the binary tree of calls on paper before coding. Pow(x, n) and Count Good Numbers are the same skeleton with different combine math.

---

## Part 1 — Binary Recursion

### 1. What is binary recursion?

**Binary recursion** — each frame makes **one** recursive call on a **halved** subproblem, then **combines** the half-result with itself (and maybe one extra factor).

Unlike Day 1's linear shrink (`n → n-1`), the depth is **O(log n)** because the input **halves** each level.

Three pieces:

- **Base case** — smallest exponent: `n == 0` → return `1`
- **Recursive case** — `half = pow(x, n/2)`; combine with `half * half` (and `* x` if odd)
- **Trust** — assume `pow(x, n/2)` is correct; you only square (or square-and-multiply)

### 2. Simple explanation

To compute `2^10`, don't multiply ten times. Ask: *"What's 2^5?"* When that returns `32`, square it: `32² = 1024`. One recursive friend, not ten.

If the exponent is odd (`2^5`), you get `half = 2^2 = 4`, then `4² × 2 = 32`.

### 3. Visual — pow halving tree

`pow(2, 10)`:

```
                    pow(2, 10)
                   /          \
              n even          (combine: half²)
                  │
              pow(2, 5)
             /         \
        n odd           (combine: half² × 2)
            │
        pow(2, 2)
       /        \
   pow(2,1)   (half²)
    /    \
pow(2,0)  → BASE: return 1
   ↑
returns 1 → half=1 → 1²×2=2 → half=2 → 2²=4 → half=4 → 4²×2=32 → half=32 → 32²=1024 ✓
```

**What shrinks?** Exponent `n` → `n/2` each call. Depth ≈ `log₂(n)`.

### 4. The universal template

```
function pow(x, n):
    if n == 0: return 1
    half = pow(x, n / 2)
  if n is even: return half * half
  else:         return half * half * x
```

**Negative exponent:** `x^(-n) = 1 / x^n` — recurse on `|n|`, divide at the top.

### 5. Modular variant (Count Good Numbers)

Same tree, but every multiply uses `% MOD` to avoid overflow:

```
half = pow_mod(x, n/2)
half = (half * half) % MOD
if n odd: half = (half * x) % MOD
```

Count Good Numbers doesn't recurse on digit positions — it **counts** choices per position (5 even digits, 4 odd) and uses **two** modular pow calls. Same halving engine underneath.

### 6. Why brute force fails

| Approach | Problem |
|---|---|
| **Multiply x, n times** | O(n) — misses halving; times out on n ≈ 10⁹ |
| **Loop with `x *= x` without halving** | Still O(n) if you only increment exponent |
| **Recursion without base `n == 0`** | Infinite descent on negative or wrong branch |
| **Integer overflow in pow** | Need `long` / modular arithmetic for large n |

**The insight brute force misses:** `x^n = (x^(n/2))²` — one subproblem, not n.

### 7. Pattern signals for Day 6

| When the problem says… | Think… |
|---|---|
| "compute x^n" / "power" / "exponent" | Binary recursion — halve n, square half |
| "efficiently" / "large exponent" | O(log n) halving, not O(n) loop |
| "count good numbers" / "modulo" | Same pow skeleton + `% MOD` on every combine |
| "even index / odd index" choices | Multiply independent counts: `5^evens × 4^odds` |
| "negative exponent" | Recurse on positive n, return `1.0 / result` |

**Keywords:** `halve` · `binary recursion` · `fast exponentiation` · `half * half` · `modulo`

### 8. Common beginner mistakes

| Mistake | Fix |
|---|---|
| `pow(x, n-1)` linear recursion | Halve: `pow(x, n/2)` |
| Forgetting odd case `* x` | After `half²`, multiply once more when `n % 2 == 1` |
| `int n` overflow on `-n` | Cast to `long` before negating |
| Modular: multiply before mod | `(half * half) % MOD` — mod after each multiply |
| Two recursive calls `pow(n/2) + pow(n/2)` | **One** call — reuse `half` variable |

### 9. Recognition drill

Read this problem aloud:

> *"Implement pow(x, n) with O(log n) time."*

Before coding, say:

> *"Base: n==0 → 1. Half: pow(x, n/2). Even: half². Odd: half² × x. Negative n: 1/pow(x, -n). Trace pow(2,10) on paper."*

---

*You see the halving tree. First quest: Pow(x, n). →*
