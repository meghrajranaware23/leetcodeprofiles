<!-- hand-authored -->
# ⚔ Quest: Longest Common Subsequence

> **Day 13** · [Longest Common Subsequence #1143](https://leetcode.com/problems/longest-common-subsequence/) · Medium · 15 min · 20 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Longest Common Subsequence on LeetCode](https://leetcode.com/problems/longest-common-subsequence/)**

> ⚔ **Hunter's rule:** Draw the **full 2D LCS table** from today's concept. Fill match-diagonal and max-up-left before writing code.

---

## The Problem

See the full problem statement on LeetCode: **[Longest Common Subsequence #1143](https://leetcode.com/problems/longest-common-subsequence/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which DP pattern from today's concept applies? **Classic LCS DP** — `dp[i][j]` on prefixes of `text1` and `text2`.

Match: `dp[i][j] = dp[i-1][j-1] + 1`. No match: `max(dp[i-1][j], dp[i][j-1])`.

If you're stuck after 5 minutes: use `text1 = "ace"`, `text2 = "abcde"` from the concept page and fill every cell.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Classic LCS DP

**How to identify this from the problem statement:**
- Two strings (or sequences)
- Subsequence — characters can be skipped
- Maximize common length

| Keyword / phrase | What it signals |
|---|---|
| "common subsequence" | 2D LCS table |
| "two strings" | `dp[i][j]` on prefixes |
| "longest" | `max` on mismatch, `+1` on match |

**How a strong solver thinks before coding:**
1. *"dp size (m+1)×(n+1), base row/col 0."*
2. *"Match → diagonal + 1."*
3. *"Mismatch → max from above or left."*
4. *"Return dp[m][n]."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Try all subsequences of both strings** | O(2^m · 2^n) |
| **Greedy: match first equal chars** | Skipping early match may block longer LCS |
| **1D LIS on one string** | Need **two** indices — Day 12 pattern insufficient |

**The insight brute force misses:** Only `(m+1)(n+1)` prefix pairs — each cell one computation.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Uncrossed Lines #1035](https://leetcode.com/problems/uncrossed-lines/) | Integer arrays, visual disguise | Identical LCS recurrence |
| [Edit Distance #72](https://leetcode.com/problems/edit-distance/) | Min cost insert/delete/replace | LCS cousin |
| [Longest Increasing Subsequence #300](https://leetcode.com/problems/longest-increasing-subsequence/) | One array | Day 12 — 1D, not this |

---

## 📖 Walkthrough

**text1 = "abcde", text2 = "ace"** — canonical table:

```
      ""  a  c  e
  "" [ 0  0  0  0 ]
  a  [ 0  1  1  1 ]
  b  [ 0  1  1  1 ]
  c  [ 0  1  2  2 ]
  d  [ 0  1  2  2 ]
  e  [ 0  1  2  3 ]

dp[5][3] = 3  ("ace")
```

> 💡 **The insight:** The code is the table-fill loop. If you can draw the grid, you can code LCS.

---

## Solution

### C++
```cpp
class Solution {
public:
    int longestCommonSubsequence(string text1, string text2) {
        int m = text1.size(), n = text2.size();
        vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (text1[i - 1] == text2[j - 1])
                    dp[i][j] = dp[i - 1][j - 1] + 1;
                else
                    dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
        return dp[m][n];
    }
};
```

### Python
```python
class Solution:
    def longestCommonSubsequence(self, text1: str, text2: str) -> int:
        m, n = len(text1), len(text2)
        dp = [[0] * (n + 1) for _ in range(m + 1)]
        for i in range(1, m + 1):
            for j in range(1, n + 1):
                if text1[i - 1] == text2[j - 1]:
                    dp[i][j] = dp[i - 1][j - 1] + 1
                else:
                    dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
        return dp[m][n]
```

### Java
```java
class Solution {
    public int longestCommonSubsequence(String text1, String text2) {
        int m = text1.length(), n = text2.length();
        int[][] dp = new int[m + 1][n + 1];
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (text1.charAt(i - 1) == text2.charAt(j - 1))
                    dp[i][j] = dp[i - 1][j - 1] + 1;
                else
                    dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
        return dp[m][n];
    }
}
```

**Complexity:** O(m · n) time · O(m · n) space
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Two sequences → 2D table"** — Not Day 12's 1D LIS.
- **"Match = diagonal"** — Both chars consumed together.
- **"Mismatch = drop one side"** — max of up and left.
- **"Canonical LCS visual"** — This grid is the reference for two-sequence DP.

> 🎯 **Pattern Unlocked:** Classic LCS DP — match ↖, else max(↑, ←).

---

*One quest down. Next: LCS wearing a disguise. →*
