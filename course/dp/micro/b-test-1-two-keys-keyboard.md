<!-- hand-authored -->
# ⚔ B-Rank Test — Problem 1

> [2 Keys Keyboard #650](https://leetcode.com/problems/2-keys-keyboard/) · Medium · 200 XP

---

You've completed your B-Rank training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open 2 Keys Keyboard on LeetCode](https://leetcode.com/problems/2-keys-keyboard/)**

> ⚔ **Hunter's rule:** Start with `A` on screen. **Copy All** then **Paste** repeatedly — or build via factorization. Think **multiplicative DP**, not knapsack.

---

## The Problem

See the full problem statement on LeetCode: **[2 Keys Keyboard #650](https://leetcode.com/problems/2-keys-keyboard/)**

---

## 💡 Hints

> 🎯 **What's being tested:** **Factorization DP** — min steps to reach `n` characters uses prime building blocks.

Key insight: To get `n` 'A's, the last operation is often a **paste after copy** that multiplies the screen by factor `d`. If `d` divides `n`, you can reach `n/d` first, then copy+paste chain costs `d` steps (1 copy + d-1 pastes = `d` total from `n/d`).

Alternative view: `dp[i]` = min steps for exactly `i` A's; for each divisor `j` of `i`: `dp[i] = min(dp[i], dp[i/j] + j)`.

Or prime factorization: answer = sum of prime factors of `n` (e.g. n=12 → 2+2+3=7).

B-Rank connection: **Multiplicative structure** like Catalan products — not 0/1 knapsack.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Factorization / Multiplicative DP (#650)

**How to identify from the statement:**
- Start from 1, operations multiply or add copies
- Optimal builds through **divisors** / prime factors
- Small `n` (≤1000) allows O(n√n) or factor scan

**How a strong solver thinks before coding:**
1. *"Last paste multiplies by k where k|n."*
2. *"dp[n] = min over divisors d of dp[n/d]+d."*
3. *"Or sum of prime factors directly."*
4. *"Not coin change — multiplicative steps."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **BFS all (copy,paste) sequences** | Exponential without memo on n |
| **Linear dp[i]=dp[i-1]+1 only** | Misses copy-all jumps |
| **Knapsack reverse loop** | Wrong pattern family |
| **Greedy largest paste** | Factor structure needs DP |

**The insight:** Screen size jumps multiplicatively — factorization captures optimal copy-paste chains.

---

## 🎯 Transfer to Unseen Problems

*"Min operations to reach n by multiply-by-k steps"* → divisor DP or prime factor sum. Cousin of **Integer Break #343** (max product factorization).

---

<details>
<summary><strong>📖 Solution & Walkthrough</strong></summary>

Fill the DP table for the given example. Trace which cells each cell depends on. Then implement the transition.

### C++
```cpp
class Solution {
public:
    int minSteps(int n) {
        int ans = 0, d = 2;
        while (n > 1) {
            while (n % d == 0) { ans += d; n /= d; }
            d++;
        }
        return ans;
    }
};
```

### Python
```python
class Solution:
    def minSteps(self, n: int) -> int:
        ans, d = 0, 2
        while n > 1:
            while n % d == 0:
                ans += d
                n //= d
            d += 1
        return ans
```

### Java
```java
class Solution {
    public int minSteps(int n) {
        int ans = 0, d = 2;
        while (n > 1) {
            while (n % d == 0) { ans += d; n /= d; }
            d++;
        }
        return ans;
    }
}
```

**Complexity:** O(√n) time · O(1) space

</details>

---

## 💭 What Should Have Clicked in Your Mind?

- **"Copy+paste = multiply screen size."** → Divisor / prime structure.
- **"Sum of prime factors."** → Compact O(√n) implementation.
- **"Not B-Rank knapsack."** → Multiplicative counting DP.
- **"n=1 → 0 steps."** → Edge before factor loop.

---

*1 of 3 test problems. Continue to the next. →*

## Solution

### C++
```cpp
class Solution {
public:
    int minSteps(int n) {
        int ans = 0, d = 2;
        while (n > 1) {
            while (n % d == 0) { ans += d; n /= d; }
            d++;
        }
        return ans;
    }
};
```

### Python
```python
class Solution:
    def minSteps(self, n: int) -> int:
        ans, d = 0, 2
        while n > 1:
            while n % d == 0:
                ans += d
                n //= d
            d += 1
        return ans
```

### Java
```java
class Solution {
    public int minSteps(int n) {
        int ans = 0, d = 2;
        while (n > 1) {
            while (n % d == 0) { ans += d; n /= d; }
            d++;
        }
        return ans;
    }
}
```

**Complexity:** O(√n) time · O(1) space
