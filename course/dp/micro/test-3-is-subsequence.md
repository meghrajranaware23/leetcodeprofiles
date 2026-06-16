<!-- hand-authored -->
# ⚔ E-Rank Test — Problem 3

> [Is Subsequence #392](https://leetcode.com/problems/is-subsequence/) · Easy · 100 XP

---

You've completed your E-Rank training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Is Subsequence on LeetCode](https://leetcode.com/problems/is-subsequence/)**

> ⚔ **Hunter's rule:** Can you match all of `s` in order inside `t`? Two pointers — preview of **LCS / string DP** (Day 13+). Don't jump to 2D table unless needed.

---

## The Problem

See the full problem statement on LeetCode: **[Is Subsequence #392](https://leetcode.com/problems/is-subsequence/)**

---

## 💡 Hints

> 🎯 **What's being tested:** **Two-pointer scan** — lightweight sequence DP preview, not full `dp[i][j]` LCS table yet.

**Hint 1:** Pointer `i` on `s`, `j` on `t`. Scan `t` left-to-right.

**Hint 2:** When `s[i] == t[j]`, match — advance `i`. Always advance `j`.

**Hint 3:** Success iff `i == len(s)` after scan — all chars of `s` matched in order.

**LCS preview:** This is LCS when |s| is small — state is "how many chars of s matched so far" (one index), not full 2D.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Two-Pointer Subsequence Match (LCS preview)

**How to identify from the statement:**
- Order preserved, gaps allowed in `t`
- Single pass O(n) on `t`
- Boolean — no optimization score

**How a strong solver thinks before coding:**
1. *"Greedy match: take earliest t[j] that matches s[i]."*
2. *"i only increases on match — never backtrack."*
3. *"Empty s → true; exhaust t before matching s → false."*
4. *"Full LCS later uses dp[i][j]; this is the O(n) special case."*

**E-Rank connection:** Day 5 decisions at each step — at `t[j]`, decision: does this char advance `i`? String DP ranks expand to 2D tables.

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Try all subsequences of t** | O(2^|t|) |
| **Full LCS dp table** | O(m·n) — works but overkill for boolean |
| **Two pointers** | O(|t|) time, O(1) space ✓ |

**The insight:** Subsequence check is the **one-row** version of LCS — compressed state `i` only.

---

## 🎯 Transfer to Unseen Problems

*"Is A a subsequence of B? How many chars matched in order?"*

Two pointers on the longer string. If you need **count** or **edit distance**, upgrade to 2D string DP.

---

<details>
<summary><strong>📖 Solution & Walkthrough</strong></summary>

Fill the DP table for the given example. Trace which cells each cell depends on. Then implement the transition.

### C++
```cpp
class Solution {
public:
    bool isSubsequence(string s, string t) {
        int i = 0;
        for (int j = 0; j < (int)t.size() && i < (int)s.size(); j++)
            if (s[i] == t[j]) i++;
        return i == (int)s.size();
    }
};
```

### Python
```python
class Solution:
    def isSubsequence(self, s: str, t: str) -> bool:
        i = 0
        for c in t:
            if i < len(s) and c == s[i]:
                i += 1
        return i == len(s)
```

### Java
```java
class Solution {
    public boolean isSubsequence(String s, String t) {
        int i = 0;
        for (int j = 0; j < t.length() && i < s.length(); j++)
            if (s.charAt(i) == t.charAt(j)) i++;
        return i == s.length();
    }
}
```

**Complexity:** O(n) time · O(1) space

</details>

---

## 💭 What Should Have Clicked in Your Mind?

- **"Subsequence = order, gaps OK"** → Two pointers, not substring sliding window.
- **"i only forward"** → Compressed DP state — preview of string DP.
- **"Not full LCS table yet"** → E-Rank O(n) path; 2D comes in later ranks.
- **"Match greedily on t"** → Earliest match never hurts.

---

*3 of 3 test problems. Continue to the next. →*

## Solution

### C++
```cpp
class Solution {
public:
    bool isSubsequence(string s, string t) {
        int i = 0;
        for (int j = 0; j < (int)t.size() && i < (int)s.size(); j++)
            if (s[i] == t[j]) i++;
        return i == (int)s.size();
    }
};
```

### Python
```python
class Solution:
    def isSubsequence(self, s: str, t: str) -> bool:
        i = 0
        for c in t:
            if i < len(s) and c == s[i]:
                i += 1
        return i == len(s)
```

### Java
```java
class Solution {
    public boolean isSubsequence(String s, String t) {
        int i = 0;
        for (int j = 0; j < t.length() && i < s.length(); j++)
            if (s.charAt(i) == t.charAt(j)) i++;
        return i == s.length();
    }
}
```

**Complexity:** O(n) time · O(1) space
