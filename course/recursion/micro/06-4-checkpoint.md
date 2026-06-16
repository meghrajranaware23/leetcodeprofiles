<!-- hand-authored -->
# ✅ Day 6 Checkpoint

> **Binary Recursion** · 2 quests completed · ⭐ 55 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Day 6 is **halve the problem, combine two half-results** — O(log n) depth, not O(n).

| When you see... | Think... | Why |
|---|---|---|
| "x^n" / "power" / "exponent" | Binary recursion | `half = pow(x,n/2)` then square |
| "efficiently" + large exponent | Halve, don't loop | One call per bit of n |
| "modulo" / "1e9+7" with pow | Modular `pow_mod` | `% MOD` after every multiply |
| "even / odd exponent" | Square vs square×x | `n % 2` guard at combine |
| "negative exponent" | `1 / pow(x, -n)` | Recurse on positive n |
| "count choices per position" | Product of powers | `5^a × 4^b` then modular pow |

### 🧠 Quick Recognition Test

1. *"Compute 3^1000 mod 10⁹+7"* → **Modular binary pow** — halve exponent, mod each step
2. *"Is there a closed form for x^n?"* → **Yes: halving** — not a loop of n multiplies
3. *"Count strings with per-index digit rules"* → **Multiply independent counts** + modular pow
4. *"Fibonacci with memo"* → **Different pattern** — overlapping linear recursion, not halving

---

## 🎯 Transfer to Unseen Problems

**Scenario 1:** *"Given integers a and b, compute a^b mod 10⁹+7 where b can be 10¹⁸."*

Which pattern? **Modular binary recursion.** `pow_mod(a, b)` — identical skeleton to Count Good Numbers. O(log b).

**Scenario 2:** *"Super Pow: given base 1337 and digit array for exponent, return 1337^exp mod."*

Which pattern? **Modular binary pow** — process exponent bits or halve recursively. Same combine: `half² % MOD`.

**Scenario 3:** *"Count n-digit numbers where each even position has 3 choices and each odd position has 7."*

Which pattern? **Combinatorics + modular pow.** `3^evens × 7^odds % MOD` — no enumeration.

> **Answer key:** All three use **halve exponent → square half → odd guard → mod**. The base and exponents change; the tree shape does not.

---

## ⚠ Common Mistakes

1. **Linear `pow(x, n-1)`** — O(n). Halve: `n/2`.

2. **Two recursive calls on same half** — Double work. Store `half` once.

3. **Forgetting odd combine `× x`** — Wrong for odd exponents.

4. **int overflow on negative n** — Cast to `long` before `-N`.

5. **Modular: mod only at end** — Overflow mid-calculation. Mod after each multiply.

---

## 🏋️ Mini Challenge

### [Super Pow #372](https://leetcode.com/problems/super-pow/)

**[→ Try Super Pow on LeetCode](https://leetcode.com/problems/super-pow/)**

Given base `b` and digit array `a` representing a large exponent, return `b^a mod 1337`.

```
Input:  b = 2, a = [1, 0]
Output: 1024
```

### 🔍 Pattern Recognition for This Challenge

| Clue | Signal |
|---|---|
| "mod 1337" | Modular binary pow |
| "array exponent" | Build exponent or process bits — still halving |
| "large exponent" | O(log exp) — never loop digits naïvely |

**Before you code:** Say *"modular fast pow."* Trace `2^10 mod 1337` with the halving tree from Pow(x, n).

> 💡 **Hint:** Same `pow_mod` as Count Good Numbers — change MOD to 1337.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Pow(x, n) #50](https://leetcode.com/problems/powx-n/) | Medium | Fast exponentiation |
| [Count Good Numbers #1922](https://leetcode.com/problems/count-good-numbers/) | Medium | Modular binary recursion |
| [Super Pow #372](https://leetcode.com/problems/super-pow/) | Medium | Modular pow (stretch) |

---

*Day 6 complete! Tomorrow: split arrays in half and combine — divide and conquer. →*
