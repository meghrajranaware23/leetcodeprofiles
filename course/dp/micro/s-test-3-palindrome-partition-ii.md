<!-- hand-authored -->
# ⚔ S-Rank Test — Problem 3

> [Palindrome Partitioning II #132](https://leetcode.com/problems/palindrome-partitioning-ii/) · Hard · 300 XP

---

You've completed your S-Rank training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Palindrome Partitioning II on LeetCode](https://leetcode.com/problems/palindrome-partitioning-ii/)**

> ⚔ **Hunter's rule:** This is a rank test — treat it like real interview practice. `dp[i]` = min cuts for prefix `s[0..i]`. When you discover palindrome `s[l..r]`, update `dp[r]` from `dp[l-1]`. Combine **expand-around-center** (Day 14) with **partition DP** (Day 15).

---

## The Problem

See the full problem statement on LeetCode: **[Palindrome Partitioning II #132](https://leetcode.com/problems/palindrome-partitioning-ii/)**

---

## 💡 Hints

> 🎯 **What's being tested:** **Palindrome expand + linear min-cut partition.**

- Init: `dp[i] = i` (worst case: cut every char)
- For each center `c`, expand odd `(c,c)` and even `(c,c+1)` while palindrome:
  - If palindrome `s[l..r]`: `dp[r] = min(dp[r], (l>0 ? dp[l-1]+1 : 0))`
- Answer: `dp[n-1]`

**Pattern name before coding:** *Expand palindromes → relax dp[r] from dp[l-1].*

Alternative: precompute `isPal[i][j]` then standard partition — expand is one-pass elegant.

---

## 🔍 Pattern Recognition Breakdown

**How to identify from the statement:**
- Partition string into palindrome **substrings**
- Minimize number of cuts
- Every piece must be palindrome (contiguous)

**Day links:** Day 14 expand + Day 15 word-break-style `dp[i]`.

**How a strong solver thinks before coding:**
1. *"dp[i] = min cuts for prefix ending at i."*
2. *"Every palindrome s[l..r] is a valid last piece."*
3. *"Expand from each center to find all palindromes."*
4. *"l=0 → 0 cuts for whole prefix palindrome."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Try all 2^(n-1) cut positions** | Exponential |
| **Check every substring O(n³) without DP** | Too slow alone |
| **Word-break without palindrome check** | Each piece must read same forward/back |
| **LPS subsequence template** | Subsequence skips chars — wrong for partition |

---

## 🎯 Transfer to Unseen Problems

Same family: **min partition with piece validity** — palindrome (#132), word dict (#139), regex match variants.

Read the statement once. Define `dp[i]` in one sentence. If you can connect expand to `dp[r]` update in under 60 seconds, you're ready.

---

<details>
<summary><strong>📖 Solution & Walkthrough</strong></summary>

Fill the DP table for the given example. Trace which cells each cell depends on. Then implement the transition.

### C++
```cpp
class Solution {
public:
    int minCut(string s) {
        int n = s.size();
        vector<int> dp(n);
        iota(dp.begin(), dp.end(), 0);
        for (int c = 0; c < n; c++) {
            for (int l = c, r = c; l >= 0 && r < n && s[l] == s[r]; l--, r++)
                dp[r] = min(dp[r], l > 0 ? dp[l - 1] + 1 : 0);
            for (int l = c, r = c + 1; l >= 0 && r < n && s[l] == s[r]; l--, r++)
                dp[r] = min(dp[r], l > 0 ? dp[l - 1] + 1 : 0);
        }
        return dp[n - 1];
    }
};
```

### Python
```python
class Solution:
    def minCut(self, s: str) -> int:
        n = len(s)
        dp = list(range(n))
        for c in range(n):
            l, r = c, c
            while l >= 0 and r < n and s[l] == s[r]:
                dp[r] = min(dp[r], dp[l - 1] + 1 if l > 0 else 0)
                l -= 1; r += 1
            l, r = c, c + 1
            while l >= 0 and r < n and s[l] == s[r]:
                dp[r] = min(dp[r], dp[l - 1] + 1 if l > 0 else 0)
                l -= 1; r += 1
        return dp[n - 1]
```

### Java
```java
class Solution {
    public int minCut(String s) {
        int n = s.length();
        int[] dp = new int[n];
        for (int i = 0; i < n; i++) dp[i] = i;
        for (int c = 0; c < n; c++) {
            for (int l = c, r = c; l >= 0 && r < n && s.charAt(l) == s.charAt(r); l--, r++)
                dp[r] = Math.min(dp[r], l > 0 ? dp[l - 1] + 1 : 0);
            for (int l = c, r = c + 1; l >= 0 && r < n && s.charAt(l) == s.charAt(r); l--, r++)
                dp[r] = Math.min(dp[r], l > 0 ? dp[l - 1] + 1 : 0);
        }
        return dp[n - 1];
    }
}
```

**Complexity:** O(n²) time · O(n) space

</details>

---

## 💭 What Should Have Clicked in Your Mind?

- **"Min cuts = partition DP"** — `dp[i]` on prefix.
- **"Expand finds palindrome pieces"** — Day 14 tool inside Day 15 frame.
- **"l=0 → 0 cuts"** — whole prefix is one palindrome piece.
- **"Not LPS subsequence"** — contiguous palindrome segments only.

---

*3 of 3 test problems. Continue to the next. →*

## Solution

### C++
```cpp
class Solution {
public:
    int minCut(string s) {
        int n = s.size();
        vector<int> dp(n);
        iota(dp.begin(), dp.end(), 0);
        for (int c = 0; c < n; c++) {
            for (int l = c, r = c; l >= 0 && r < n && s[l] == s[r]; l--, r++)
                dp[r] = min(dp[r], l > 0 ? dp[l - 1] + 1 : 0);
            for (int l = c, r = c + 1; l >= 0 && r < n && s[l] == s[r]; l--, r++)
                dp[r] = min(dp[r], l > 0 ? dp[l - 1] + 1 : 0);
        }
        return dp[n - 1];
    }
};
```

### Python
```python
class Solution:
    def minCut(self, s: str) -> int:
        n = len(s)
        dp = list(range(n))
        for c in range(n):
            l, r = c, c
            while l >= 0 and r < n and s[l] == s[r]:
                dp[r] = min(dp[r], dp[l - 1] + 1 if l > 0 else 0)
                l -= 1; r += 1
            l, r = c, c + 1
            while l >= 0 and r < n and s[l] == s[r]:
                dp[r] = min(dp[r], dp[l - 1] + 1 if l > 0 else 0)
                l -= 1; r += 1
        return dp[n - 1]
```

### Java
```java
class Solution {
    public int minCut(String s) {
        int n = s.length();
        int[] dp = new int[n];
        for (int i = 0; i < n; i++) dp[i] = i;
        for (int c = 0; c < n; c++) {
            for (int l = c, r = c; l >= 0 && r < n && s.charAt(l) == s.charAt(r); l--, r++)
                dp[r] = Math.min(dp[r], l > 0 ? dp[l - 1] + 1 : 0);
            for (int l = c, r = c + 1; l >= 0 && r < n && s.charAt(l) == s.charAt(r); l--, r++)
                dp[r] = Math.min(dp[r], l > 0 ? dp[l - 1] + 1 : 0);
        }
        return dp[n - 1];
    }
}
```

**Complexity:** O(n²) time · O(n) space
