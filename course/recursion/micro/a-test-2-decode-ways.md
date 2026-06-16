<!-- hand-authored -->
# ⚔ A-Rank Test — Problem 2

> [Decode Ways #91](https://leetcode.com/problems/decode-ways/) · Medium · 250 XP

---

You've completed your A-Rank training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Decode Ways on LeetCode](https://leetcode.com/problems/decode-ways/)**

> ⚔ **Hunter's rule:** This is a rank test — treat it like real interview practice. Count decodings, not generate strings. Name the pattern before you code.

---

## The Problem

A message containing letters `A-Z` is encoded to numbers using:

```
'A' → 1,  'B' → 2,  … ,  'Z' → 26
```

Given a string `s` containing digits, return the **number of ways** to decode it.

```
Input:  s = "12"
Output: 2
Explanation: "12" → "AB" (1,2) or "L" (12)

Input:  s = "226"
Output: 3
Explanation: (2,26), (22,6), (2,2,6)

Input:  s = "06"
Output: 0
Explanation: "06" cannot be mapped to "F" — no leading zero in a single-digit decode
```

---

## 💡 Hints

> 🎯 **What's being tested:** Linear index memo (Day 23) — not backtracking, not subset memo.

**Hint 1:** State = index `i` into string. Question: *how many ways to decode `s[i..]`?*

**Hint 2:** Base: `i == len(s) → 1` way (empty suffix). `s[i] == '0' → 0` ways (invalid).

**Hint 3:** Two branches from index `i`:
- Take **one digit**: `s[i]` if not `'0'` → `dfs(i+1)`
- Take **two digits**: `s[i..i+1]` if value 10–26 → `dfs(i+2)`

**Hint 4:** Memo key = `i` only (1D array). Sum the two valid branches.

**Hint 5:** Contrast with Combination Sum IV: decode has **no reuse** and **fixed two branches** (1-digit or 2-digit), not loop-all-nums.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Linear Index Memoization (count)

| Clue | Signal |
|---|---|
| "number of ways to decode" | Count via sum of sub-branches |
| string consumed left-to-right | Index `i` shrinks suffix |
| `'0'` invalid as single digit | Early return 0 |
| two choices: 1-char or 2-char | At most 2 branches per index |

**Contrast with similar-looking problems:**

| Decode Ways (#91) | Combination Sum IV (#377) |
|---|---|
| Linear string index | Target reduction |
| At most 2 branches | Loop all nums |
| No reuse (move forward) | Reuse nums |
| Memo on `i` | Memo on `target` |

**How a strong solver thinks before coding:**
1. *"Count decodings → dfs(i), sum valid branches."*
2. *"'0' at i → 0 ways immediately."*
3. *"One digit if s[i]!='0'; two digits if 10–26."*
4. *"Memo[i] — same index memo as Word Break I."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Generate all decode strings** | Works but slow — overlap on same index |
| **No memo on index** | Exponential — `dfs(i)` recomputed many times |
| **Allow single-digit decode of '0'** | Wrong — `'0'` alone is invalid |
| **Allow two-digit 01–09** | Wrong — must be 10–26 inclusive |

**The insight:** Only O(n) distinct subproblems (`i = 0..n-1`). Memo turns exponential into linear.

---

## 🎯 Transfer to Unseen Problems

Can you spot the pattern without the problem name telling you?

*"Count ways to partition a string left-to-right with 1- or 2-character valid chunks."*

→ **Linear index memo.** `dfs(i)` = sum of valid next-step decodings. Memo on `i`.

Read the statement once. Say the pattern aloud. If you can name it in under 30 seconds, you're ready.

---

<details>
<summary><strong>📖 Solution & Walkthrough</strong></summary>

Trace the pattern on the example from the problem statement. Then implement the recursive skeleton you identified.

### C++
```cpp
class Solution {
    vector<int> memo;
    int dfs(string& s, int i) {
        if (i == (int)s.size()) return 1;
        if (s[i] == '0') return 0;
        if (memo[i] != -1) return memo[i];
        int ans = dfs(s, i + 1);
        if (i + 1 < (int)s.size()) {
            int two = stoi(s.substr(i, 2));
            if (two >= 10 && two <= 26) ans += dfs(s, i + 2);
        }
        return memo[i] = ans;
    }
public:
    int numDecodings(string s) {
        memo.assign(s.size(), -1);
        return dfs(s, 0);
    }
};
```

### Python
```python
class Solution:
    def numDecodings(self, s: str) -> int:
        memo = {}
        def dfs(i):
            if i == len(s): return 1
            if s[i] == '0': return 0
            if i in memo: return memo[i]
            ans = dfs(i + 1)
            if i + 1 < len(s) and 10 <= int(s[i:i+2]) <= 26:
                ans += dfs(i + 2)
            memo[i] = ans
            return ans
        return dfs(0)
```

### Java
```java
class Solution {
    private int[] memo;
    public int numDecodings(String s) {
        memo = new int[s.length()];
        Arrays.fill(memo, -1);
        return dfs(s, 0);
    }
    private int dfs(String s, int i) {
        if (i == s.length()) return 1;
        if (s.charAt(i) == '0') return 0;
        if (memo[i] != -1) return memo[i];
        int ans = dfs(s, i + 1);
        if (i + 1 < s.length()) {
            int two = Integer.parseInt(s.substring(i, i + 2));
            if (two >= 10 && two <= 26) ans += dfs(s, i + 2);
        }
        return memo[i] = ans;
    }
}
```

**Complexity:** O(n) time · O(n) space

</details>

---

## 💭 What Should Have Clicked in Your Mind?

- **"Count decodings"** → Index memo, not backtracking path generation.
- **"'0' kills the branch"** → Return 0 immediately at `'0'`.
- **"Two choices: 1-digit or 2-digit"** → Sum branches, memo on `i`.
- **"A-Rank test"** → Distinguish from combo memo (#377) and subset memo (#416).

---

*2 of 3 test problems. Continue to the next. →*

## Solution

### C++
```cpp
class Solution {
    vector<int> memo;
    int dfs(string& s, int i) {
        if (i == (int)s.size()) return 1;
        if (s[i] == '0') return 0;
        if (memo[i] != -1) return memo[i];
        int ans = dfs(s, i + 1);
        if (i + 1 < (int)s.size()) {
            int two = stoi(s.substr(i, 2));
            if (two >= 10 && two <= 26) ans += dfs(s, i + 2);
        }
        return memo[i] = ans;
    }
public:
    int numDecodings(string s) {
        memo.assign(s.size(), -1);
        return dfs(s, 0);
    }
};
```

### Python
```python
class Solution:
    def numDecodings(self, s: str) -> int:
        memo = {}
        def dfs(i):
            if i == len(s): return 1
            if s[i] == '0': return 0
            if i in memo: return memo[i]
            ans = dfs(i + 1)
            if i + 1 < len(s) and 10 <= int(s[i:i+2]) <= 26:
                ans += dfs(i + 2)
            memo[i] = ans
            return ans
        return dfs(0)
```

### Java
```java
class Solution {
    private int[] memo;
    public int numDecodings(String s) {
        memo = new int[s.length()];
        Arrays.fill(memo, -1);
        return dfs(s, 0);
    }
    private int dfs(String s, int i) {
        if (i == s.length()) return 1;
        if (s.charAt(i) == '0') return 0;
        if (memo[i] != -1) return memo[i];
        int ans = dfs(s, i + 1);
        if (i + 1 < s.length()) {
            int two = Integer.parseInt(s.substring(i, i + 2));
            if (two >= 10 && two <= 26) ans += dfs(s, i + 2);
        }
        return memo[i] = ans;
    }
}
```

**Complexity:** O(n) time · O(n) space
