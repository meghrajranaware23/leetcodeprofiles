<!-- hand-authored -->
# ⚔ Quest: Additive Number

> **Day 20** · [Additive Number #306](https://leetcode.com/problems/additive-number/) · Medium · 15 min · 35 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Additive Number on LeetCode](https://leetcode.com/problems/additive-number/)**

> ⚔ **Hunter's rule:** Try seeding `"112358"` with first=1, second=1. Write the required next term at each index. The hints below are for *after* your attempt.

---

## The Problem

An **additive number** is a string whose digits form an additive sequence: each number (after the first two) equals the sum of the two preceding numbers.

Given a string `num`, return `true` if it is an additive number.

```
Input:  num = "112358"
Output: true
Explanation: 1 + 1 = 2, 1 + 2 = 3, 2 + 3 = 5, 3 + 5 = 8

Input:  num = "199100199"
Output: true
Explanation: 1 + 99 = 100, 99 + 100 = 199 — sequence (1, 99, 100, 199) consumes the full string

Input:  num = "102"
Output: false
```

Valid numbers in the sequence may have multiple digits. No leading zeros except the single digit `"0"`.

---

## 💡 Hints

**Hint 1:** The first two numbers are unknown — try all cut pairs with a **double loop** before dfs.

**Hint 2:** `dfs(i, a, b)` — at index `i`, the next term must be exactly `str(a + b)` as a prefix of `num[i:]`.

**Hint 3:** If match, recurse: `dfs(i + len(sum_str), b, a + b)` — window slides forward.

**Hint 4:** Leading zeros: if first char of a cut is `'0'`, only length-1 cut is valid (`break` inner loop).

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Sequence Validation Backtracking

| Clue in the problem | What it signals |
|---|---|
| "sum of two preceding" | State = last two numbers `(a, b)` |
| "additive sequence" | Next term determined — no operator choice |
| first two unknown | Double loop seed before dfs |
| boolean, not generate-all | Return true on first valid seed |
| digit string | Cut lengths + leading zero rule |

**Why this pattern works:** Once the first two numbers are fixed, every subsequent term is forced. Dfs only checks whether the suffix matches `a+b`, then slides the window.

**How a strong solver thinks before coding:**
1. *"Can't dfs from index 0 — need two seeds first."*
2. *"Outer loop: end of first number. Inner: end of second."*
3. *"dfs: does num[i..] start with str(a+b)?"*
4. *"Slide (a,b) → (b, a+b) — Fibonacci on strings."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Single dfs picking one digit at a time** | No rule for what the next value should be without two seeds |
| **Generate all splits, check sums** | Same work but misses the clean two-phase structure |
| **int for a, b, sum** | Long numbers in string exceed int — use long long |
| **Allow "01" as a term** | Leading zero invalid — break, don't continue |
| **Re-parse a and b from string each dfs call** | Pass them as parameters — already parsed at seed |

**The insight brute force misses:** The first two numbers are free choices; everything after is **deterministic**. Seed with loops, validate with dfs.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Expression Add Operators #282](https://leetcode.com/problems/expression-add-operators/) | Choose operators | Cut loop + state (today's quest 1) |
| [Split Array into Fibonacci Sequence #842](https://leetcode.com/problems/split-array-into-fibonacci-sequence/) | Return the sequence | Same seed + dfs, collect path |
| [Valid Word Abbreviation #408](https://leetcode.com/problems/valid-word-abbreviation/) | Two-pointer match | Prefix check like dfs |

---

## 📖 Walkthrough

`num = "112358"`:

**Seed phase:**
```
i=1: first="1"
  j=2: second="1" → dfs(2, a=1, b=1)
    i=2, need "2" → num[2]="2" ✓ → dfs(3, 1, 2)
      need "3" → ✓ → dfs(4, 2, 3)
        need "5" → ✓ → dfs(5, 3, 5)
          need "8" → ✓ → dfs(6, 5, 8) → i==n → true ✓
```

`num = "102"` — no valid seed:
```
first="1", second="0" → need "1" at i=2, but num[2]='2' ✗
first="10", second="2" → need "12" at i=3, out of bounds ✗
→ false
```

`num = "199100199"` — large multi-digit terms:
```
Seed first="1", second="99" → dfs(3, a=1, b=99)
  need "100" at i=3 ✓ → dfs(6, 99, 100)
    need "199" at i=6 ✓ → dfs(9, 100, 199) → i==n → true ✓
```

> 💡 **The insight:** No operators to choose — the "operator" is always `+`. Your job is verifying the string agrees.

---

## Solution

### C++
```cpp
class Solution {
    bool dfs(string& s, int i, long long a, long long b) {
        if (i == (int)s.size()) return true;
        string nxt = s.substr(i);
        if (nxt.size() > 1 && nxt[0] == '0') return false;
        long long sum = a + b;
        if (nxt.size() > to_string(sum).size()) return false;
        if (nxt.substr(0, to_string(sum).size()) != to_string(sum)) return false;
        return dfs(s, i + to_string(sum).size(), b, sum);
    }
public:
    bool isAdditiveNumber(string num) {
        int n = num.size();
        for (int i = 1; i < n; i++) {
            if (num[0] == '0' && i > 1) break;
            for (int j = i + 1; j < n; j++) {
                if (num[i] == '0' && j > i + 1) break;
                long long a = stoll(num.substr(0, i));
                long long b = stoll(num.substr(i, j - i));
                if (dfs(num, j, a, b)) return true;
            }
        }
        return false;
    }
};
```

### Python
```python
class Solution:
    def isAdditiveNumber(self, num: str) -> bool:
        def dfs(i, a, b):
            if i == len(num): return True
            nxt = num[i:]
            if len(nxt) > 1 and nxt[0] == '0': return False
            s = str(a + b)
            if not nxt.startswith(s): return False
            return dfs(i + len(s), b, a + b)
        n = len(num)
        for i in range(1, n):
            if num[0] == '0' and i > 1: break
            for j in range(i + 1, n):
                if num[i] == '0' and j > i + 1: break
                if dfs(j, int(num[:i]), int(num[i:j])): return True
        return False
```

### Java
```java
class Solution {
    public boolean isAdditiveNumber(String num) {
        for (int i = 1; i < num.length(); i++) {
            if (num.charAt(0) == '0' && i > 1) break;
            for (int j = i + 1; j < num.length(); j++) {
                if (num.charAt(i) == '0' && j > i + 1) break;
                if (dfs(num, j, Long.parseLong(num.substring(0, i)), Long.parseLong(num.substring(i, j))))
                    return true;
            }
        }
        return false;
    }
    private boolean dfs(String s, int i, long a, long b) {
        if (i == s.length()) return true;
        String nxt = s.substring(i);
        if (nxt.length() > 1 && nxt.charAt(0) == '0') return false;
        long sum = a + b;
        String sumStr = String.valueOf(sum);
        if (!nxt.startsWith(sumStr)) return false;
        return dfs(s, i + sumStr.length(), b, sum);
    }
}
```

**Complexity:** O(n^2) time · O(n) space
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Two unknowns at the start"** → double loop seeds, not pure dfs from 0.
- **"Next term is forced"** → prefix check, not operator branches.
- **"Slide the pair"** → `(a, b)` becomes `(b, a+b)` — Fibonacci window.
- **"Same leading-zero rule"** as Expression Add Operators — break inner loop.

Expression Add Operators **chooses** the next operation. Additive Number **verifies** the only legal next term. Same cut-loop DNA, different constraint.

> 🎯 **Pattern Unlocked:** Sequence Validation Backtracking

---

*Both quests complete. Head to the checkpoint. →*
