<!-- hand-authored -->
# ⚔ S-Rank Test — Problem 2

> [Longest Valid Parentheses #32](https://leetcode.com/problems/longest-valid-parentheses/) · Hard · 300 XP

---

You've completed your S-Rank training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Longest Valid Parentheses on LeetCode](https://leetcode.com/problems/longest-valid-parentheses/)**

> ⚔ **Hunter's rule:** This is a rank test — treat it like real interview practice. `dp[i]` = length of longest **valid** parentheses substring **ending at index i**. Only update when `s[i]==')'`.

---

## The Problem

See the full problem statement on LeetCode: **[Longest Valid Parentheses #32](https://leetcode.com/problems/longest-valid-parentheses/)**

---

## 💡 Hints

> 🎯 **What's being tested:** **Linear string DP** — extend valid runs on closing parens.

Two cases when `s[i]==')'`:
1. **`...()`** — `s[i-1]=='('` → `dp[i] = dp[i-2] + 2`
2. **`...))`** — `s[i-1]==')'` and matching `(` at `i - dp[i-1] - 1`:
   `dp[i] = dp[i-1] + 2 + dp[i - dp[i-1] - 2]` (if in bounds)

Track global `ans = max(dp[i])`.

**Pattern name before coding:** *Linear dp[i] valid-paren extension.*

Stack is an alternative — this test rewards the DP formulation.

---

## 🔍 Pattern Recognition Breakdown

**How to identify from the statement:**
- Longest **valid** (balanced) parentheses substring
- Contiguous — not subsequence
- Linear scan, state = length ending at i

**Day links:** Day 14–15 string DP family; distinct from expand-around-center palindrome.

**How a strong solver thinks before coding:**
1. *"Only ')' can close a valid extension."*
2. *"Adjacent `()` pair — add 2 to dp[i-2]."*
3. *"Nested `(...)` — jump to matching '(' via dp[i-1]."*
4. *"Chain previous valid segment before matching '('."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Check every substring O(n³)** | Too slow — need O(n) |
| **Count '(' - ')' globally** | Doesn't find longest contiguous valid block |
| **Update on '('** | Valid length only extends at ')' |
| **Forget dp[i-dp[i-1]-2] chain** | Misses concatenated valid segments `()()` |

---

## 🎯 Transfer to Unseen Problems

Same family: **dp[i] = best property of substring ending at i** — valid parens, max subarray ending at i (Kadane).

Read the statement once. Define `dp[i]` in one sentence. If you can write both `)` cases in under 60 seconds, you're ready.

---

<details>
<summary><strong>📖 Solution & Walkthrough</strong></summary>

Fill the DP table for the given example. Trace which cells each cell depends on. Then implement the transition.

### C++
```cpp
class Solution {
public:
    int longestValidParentheses(string s) {
        int n = s.size(), ans = 0;
        vector<int> dp(n, 0);
        for (int i = 1; i < n; i++) {
            if (s[i] == ')') {
                if (s[i - 1] == '(') {
                    dp[i] = (i >= 2 ? dp[i - 2] : 0) + 2;
                } else if (i - dp[i - 1] - 1 >= 0 && s[i - dp[i - 1] - 1] == '(') {
                    dp[i] = dp[i - 1] + 2 + (i - dp[i - 1] - 2 >= 0 ? dp[i - dp[i - 1] - 2] : 0);
                }
                ans = max(ans, dp[i]);
            }
        }
        return ans;
    }
};
```

### Python
```python
class Solution:
    def longestValidParentheses(self, s: str) -> int:
        n = len(s)
        dp = [0] * n
        ans = 0
        for i in range(1, n):
            if s[i] == ')':
                if s[i - 1] == '(':
                    dp[i] = (dp[i - 2] if i >= 2 else 0) + 2
                elif i - dp[i - 1] - 1 >= 0 and s[i - dp[i - 1] - 1] == '(':
                    dp[i] = dp[i - 1] + 2 + (dp[i - dp[i - 1] - 2] if i - dp[i - 1] - 2 >= 0 else 0)
                ans = max(ans, dp[i])
        return ans
```

### Java
```java
class Solution {
    public int longestValidParentheses(String s) {
        int n = s.length(), ans = 0;
        int[] dp = new int[n];
        for (int i = 1; i < n; i++) {
            if (s.charAt(i) == ')') {
                if (s.charAt(i - 1) == '(') {
                    dp[i] = (i >= 2 ? dp[i - 2] : 0) + 2;
                } else if (i - dp[i - 1] - 1 >= 0 && s.charAt(i - dp[i - 1] - 1) == '(') {
                    dp[i] = dp[i - 1] + 2 + (i - dp[i - 1] - 2 >= 0 ? dp[i - dp[i - 1] - 2] : 0);
                }
                ans = Math.max(ans, dp[i]);
            }
        }
        return ans;
    }
}
```

**Complexity:** O(n) time · O(n) space

</details>

---

## 💭 What Should Have Clicked in Your Mind?

- **"dp[i] = valid length ending at i"** — only ')' updates.
- **"Two cases: `()` and `(...)`"** — adjacent vs nested.
- **"Chain dp[i-dp[i-1]-2]"** — concatenate prior valid block.
- **"Linear string DP"** — S-Test capstone string skill.

---

*2 of 3 test problems. Continue to the next. →*

## Solution

### C++
```cpp
class Solution {
public:
    int longestValidParentheses(string s) {
        int n = s.size(), ans = 0;
        vector<int> dp(n, 0);
        for (int i = 1; i < n; i++) {
            if (s[i] == ')') {
                if (s[i - 1] == '(') {
                    dp[i] = (i >= 2 ? dp[i - 2] : 0) + 2;
                } else if (i - dp[i - 1] - 1 >= 0 && s[i - dp[i - 1] - 1] == '(') {
                    dp[i] = dp[i - 1] + 2 + (i - dp[i - 1] - 2 >= 0 ? dp[i - dp[i - 1] - 2] : 0);
                }
                ans = max(ans, dp[i]);
            }
        }
        return ans;
    }
};
```

### Python
```python
class Solution:
    def longestValidParentheses(self, s: str) -> int:
        n = len(s)
        dp = [0] * n
        ans = 0
        for i in range(1, n):
            if s[i] == ')':
                if s[i - 1] == '(':
                    dp[i] = (dp[i - 2] if i >= 2 else 0) + 2
                elif i - dp[i - 1] - 1 >= 0 and s[i - dp[i - 1] - 1] == '(':
                    dp[i] = dp[i - 1] + 2 + (dp[i - dp[i - 1] - 2] if i - dp[i - 1] - 2 >= 0 else 0)
                ans = max(ans, dp[i])
        return ans
```

### Java
```java
class Solution {
    public int longestValidParentheses(String s) {
        int n = s.length(), ans = 0;
        int[] dp = new int[n];
        for (int i = 1; i < n; i++) {
            if (s.charAt(i) == ')') {
                if (s.charAt(i - 1) == '(') {
                    dp[i] = (i >= 2 ? dp[i - 2] : 0) + 2;
                } else if (i - dp[i - 1] - 1 >= 0 && s.charAt(i - dp[i - 1] - 1) == '(') {
                    dp[i] = dp[i - 1] + 2 + (i - dp[i - 1] - 2 >= 0 ? dp[i - dp[i - 1] - 2] : 0);
                }
                ans = Math.max(ans, dp[i]);
            }
        }
        return ans;
    }
}
```

**Complexity:** O(n) time · O(n) space
