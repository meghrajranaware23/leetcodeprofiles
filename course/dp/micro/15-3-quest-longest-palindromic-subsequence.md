<!-- hand-authored -->
# ⚔ Quest: Longest Palindromic Subsequence

> **Day 15** · [Longest Palindromic Subsequence #516](https://leetcode.com/problems/longest-palindromic-subsequence/) · Medium · 15 min · 25 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Longest Palindromic Subsequence on LeetCode](https://leetcode.com/problems/longest-palindromic-subsequence/)**

> ⚔ **Hunter's rule:** **Subsequence** — you CAN skip chars. Day 14 expand gave substring max 3 on `"bbbab"`; LPS answer is 4. Use interval `dp[i][j]`.

---

## The Problem

See the full problem statement on LeetCode: **[Longest Palindromic Subsequence #516](https://leetcode.com/problems/longest-palindromic-subsequence/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which DP pattern from today's concept applies? **2D Palindrome DP** — `dp[i][j]` = LPS length in `s[i..j]`.

Match: `dp[i][j] = dp[i+1][j-1] + 2`. Else: `max(dp[i+1][j], dp[i][j-1])`. Fill `i` descending.

If you're stuck after 5 minutes: compare Day 14 #5 expand on `"bbbab"` (substring 3) vs LPS (subsequence 4).

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** 2D Palindrome DP

**How to identify this from the problem statement:**
- **Subsequence** — delete chars without reordering
- Palindrome symmetry on ends
- Maximize length in interval

| Keyword / phrase | What it signals |
|---|---|
| "palindromic subsequence" | Interval `dp[i][j]`, skip ends allowed |
| "subsequence" (not substring) | `max(dp[i+1][j], dp[i][j-1])` on mismatch |
| "longest" in one string | Fill intervals by length |

**Day 14 bridge:** #5 expand = contiguous only. #516 = skip middle → longer answer possible.

**How a strong solver thinks before coding:**
1. *"i from n-1 downto 0."*
2. *"Match ends → inner + 2."*
3. *"Mismatch → drop left or right end, take max."*
4. *"Return dp[0][n-1]."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Expand from center (#5)** | Only finds contiguous palindromes |
| **Enumerate all subsequences** | O(2^n) |
| **LCS(s, reverse(s))** | Works for length but interval DP is direct |

**The insight brute force misses:** Interval `i..j` has O(n²) states — each depends only on smaller intervals inside or adjacent.

```
"bbbab": substring max "bbb"=3, subsequence "bbbb"=4 by skipping 'a'
```

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Longest Palindromic Substring #5](https://leetcode.com/problems/longest-palindromic-substring/) | Substring — Day 14 expand | Contiguous only |
| [Palindromic Substrings #647](https://leetcode.com/problems/palindromic-substrings/) | Count substrings | Expand |
| [Word Break #139](https://leetcode.com/problems/word-break/) | Prefix partition | Today's other quest |

---

## 📖 Walkthrough

**s = "bbbab"** — interval fill:

```
i=4: dp[4][4]=1
i=3: dp[3][4]=1 (b≠a → max(1,1)=1)
...
dp[0][4]:
  s[0]=b, s[4]=b match → dp[1][3]+2
  inner "bba" → dp[1][3]=2 ("bb")
  dp[0][4] = 2+2 = 4
```

```
if s[i]==s[j]: dp[i][j] = dp[i+1][j-1] + 2
else:           dp[i][j] = max(dp[i+1][j], dp[i][j-1])
```

> 💡 **The insight:** Subsequence = optional skip via max of one-end-shorter intervals. Substring expand can't do this.

---

## Solution

### C++
```cpp
class Solution {
public:
    int longestPalindromeSubseq(string s) {
        int n = s.size();
        vector<vector<int>> dp(n, vector<int>(n, 0));
        for (int i = n - 1; i >= 0; i--) {
            dp[i][i] = 1;
            for (int j = i + 1; j < n; j++) {
                if (s[i] == s[j]) dp[i][j] = dp[i + 1][j - 1] + 2;
                else dp[i][j] = max(dp[i + 1][j], dp[i][j - 1]);
            }
        }
        return dp[0][n - 1];
    }
};
```

### Python
```python
class Solution:
    def longestPalindromeSubseq(self, s: str) -> int:
        n = len(s)
        dp = [[0] * n for _ in range(n)]
        for i in range(n - 1, -1, -1):
            dp[i][i] = 1
            for j in range(i + 1, n):
                if s[i] == s[j]: dp[i][j] = dp[i + 1][j - 1] + 2
                else: dp[i][j] = max(dp[i + 1][j], dp[i][j - 1])
        return dp[0][n - 1]
```

### Java
```java
class Solution {
    public int longestPalindromeSubseq(String s) {
        int n = s.length();
        int[][] dp = new int[n][n];
        for (int i = n - 1; i >= 0; i--) {
            dp[i][i] = 1;
            for (int j = i + 1; j < n; j++) {
                if (s.charAt(i) == s.charAt(j)) dp[i][j] = dp[i + 1][j - 1] + 2;
                else dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1]);
            }
        }
        return dp[0][n - 1];
    }
}
```

**Complexity:** O(n²) time · O(n²) space
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Subsequence not substring"** — Day 14 expand fails here.
- **"Match → inner + 2"** — Both ends taken together.
- **"Mismatch → skip one end"** — max of shorter intervals.
- **"Fill i descending"** — `dp[i+1][j-1]` must exist first.

> 🎯 **Pattern Unlocked:** 2D Palindrome DP — LPS interval, skip allowed.

---

*Both quests complete. Head to the checkpoint. →*
