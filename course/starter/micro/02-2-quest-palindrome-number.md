<!-- hand-authored -->
# ⚔ Quest: Palindrome Number

> **Day 2** · [Palindrome Number #9](https://leetcode.com/problems/palindrome-number/) · Easy · 10 min · 10 XP

---

## 🎯 Try the Problem First

**[→ Open Palindrome Number on LeetCode](https://leetcode.com/problems/palindrome-number/)**

> ⚔ **Mentor's rule:** Complete the 4-part reading card from today's guide **before** your editor. Apply **Problem Reading**.

---

## The Problem

Given an integer `x`, return `true` if `x` is a palindrome, and `false` otherwise.

**Example 1:** `x = 121` → `true`

**Example 2:** `x = -121` → `false` (reads `-121` from right; not same as `-121`)

**Example 3:** `x = 10` → `false` (reads `01` from right; not same as `10`)

**Constraints:** `-2^31 <= x <= 2^31 - 1`

**4-part reading notes (fill before coding):**
- ① Title: palindrome on **integer**, not string
- ② Constraints: negatives possible; zero edge case
- ③ Example 3: trailing zero trap
- ④ Output: boolean

---

## 💡 Hints

1. Example 2 answers "what if x is negative?" — read it before coding
2. Example 3 (`10`) breaks solutions that only compare digit reversal without handling trailing zeros
3. Brute force: convert to string and compare — valid if you read output is boolean
4. Without strings: reverse half the digits (optional optimization after brute force works)

---

## 🔍 Strategy Breakdown

**Skill practiced today:** Problem Reading

**Why this problem:** Clean examples, clear constraints — perfect for the 4-part framework

**Reading audit checklist:**
| Example | What it teaches |
|---------|-----------------|
| 121 | Basic true case |
| -121 | Negative → false |
| 10 | Trailing zero → false |

---

## ❌ Why Jumping to Code Fails

| Approach | Problem |
|---|---|
| Skip Example 2 | Return true for `-121` |
| Ignore Example 3 | Return true for `10` |
| Return reversed number | Output must be boolean |
| String conversion without reading constraints | Works but you miss the reading practice |

---

## 🔗 Problems That Build the Same Skill

| Problem | Difficulty | Skill |
|---|---|---|
| [Valid Palindrome #125](https://leetcode.com/problems/valid-palindrome/) | Easy | Phase 1 proof — string palindrome |
| [Sign of the Product of an Array #1822](https://leetcode.com/problems/sign-of-the-product-of-an-array/) | Easy | Read examples + constraints carefully |
| [Reverse Integer #7](https://leetcode.com/problems/reverse-integer/) | Medium | Digit reversal (later) |

---

## 📖 Walkthrough

**Example 1:** `x = 121`

Read digits left: `1-2-1`. Read right: `1-2-1`. Match → `true`.

**Example 3:** `x = 10`

Read right: `01` ≠ `10` → `false`. *This example exists to catch lazy solvers.*

**Plain English:** If x is negative, false. Otherwise check if digits read the same both ways.

---

## Solution

### C++
```cpp
class Solution {
public:
    bool isPalindrome(int x) {
        if (x < 0 || (x % 10 == 0 && x != 0)) return false;
        int rev = 0;
        while (x > rev) { rev = rev * 10 + x % 10; x /= 10; }
        return x == rev || x == rev / 10;
    }
};
```

### Python
```python
class Solution:
    def isPalindrome(self, x: int) -> bool:
        if x < 0 or (x % 10 == 0 and x != 0): return False
        rev = 0
        while x > rev:
            rev = rev * 10 + x % 10
            x //= 10
        return x == rev or x == rev // 10
```

### Java
```java
class Solution {
    public boolean isPalindrome(int x) {
        if (x < 0 || (x % 10 == 0 && x != 0)) return false;
        int rev = 0;
        while (x > rev) { rev = rev * 10 + x % 10; x /= 10; }
        return x == rev || x == rev / 10;
    }
}
```

**Complexity:** O(log n) time · O(1) space
---

## 💭 What a Mentor Would Tell You

- *"Example 3 saved me — I almost shipped code that failed on `10`."*
- *"I wrote the 4-part card in 90 seconds and avoided a Wrong Answer."*
- *"Brute force string compare is fine today if I understood every example first."*

> 🎯 **Skill practiced:** Problem Reading

---

*One quest down. The next one builds on this skill. →*
