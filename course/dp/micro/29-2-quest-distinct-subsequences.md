<!-- hand-authored -->
# ⚔ Quest: Distinct Subsequences

> **Day 29** · [Distinct Subsequences #115](https://leetcode.com/problems/distinct-subsequences/) · Hard · 25 min · 60 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Distinct Subsequences on LeetCode](https://leetcode.com/problems/distinct-subsequences/)**

> ⚔ **Hunter's rule:** Count paths, don't maximize. When `s[i]==t[j]`, **add** ways from the shorter prefix. Fill `j` right-to-left if using 1D optimization.

---

## The Problem

See the full problem statement on LeetCode: **[Distinct Subsequences #115](https://leetcode.com/problems/distinct-subsequences/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

**Pattern:** **Advanced String DP** — 2D subsequence **counting**.

- `dp[i][j]` = # ways to form `t[0..j-1]` from `s[0..i-1]`
- Base: `dp[i][0] = 1` (empty target — one way)
- Match `s[i-1]==t[j-1]`: `dp[i][j] += dp[i-1][j-1]`
- Space trick: 1D `dp[j]`, iterate `j` **descending** on match

Not LCS length (Day 13) — here you **sum** distinct paths.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Advanced String DP — distinct subsequence count

| Keyword / phrase | What it signals |
|---|---|
| "distinct subsequences" | Counting 2D string DP |
| "how many ways" + two strings | Sum on match, not max |
| subsequence (not substring) | Skip chars in s freely |

**Day 13 contrast:** LCS takes max of skip/match; here match **adds** `dp[j-1]` ways.

**How a strong solver thinks before coding:**
1. *"Empty t → 1 way for any s prefix."*
2. *"Match extends: pick this char or skip (skip implicit in row)."*
3. *"1D: update j from high to low on match."*
4. *"Use unsigned long long / watch overflow on large inputs."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Generate all subsequences of s** | O(2^m) — exponential |
| **LCS-style max** | Wrong aggregation — need count |
| **Fill dp[j] left-to-right on match** | Double-counts same row |
| **Forget dp[0]=1 base** | Empty target has one alignment |

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Distinct Subsequences II #940](https://leetcode.com/problems/distinct-subsequences-ii/) | All distinct subseq of one string | Counting with dedup |
| [Is Subsequence #392](https://leetcode.com/problems/is-subsequence/) | Boolean only | E-Rank — one path exists? |

---

## 📖 Walkthrough

**s = "rabbbit", t = "rabbit"**

```
1D dp[j] after processing each char of s:

Start: dp = [1,0,0,0,0,0,0]  (base: 1 way for empty t)

After 'r': dp[1] += dp[0] → 1 way for "r"
After 'a': dp[2] += dp[1]
After 'b': dp[3] += dp[2]
... three 'b's create branching ...
Answer dp[6] = 3
```

> 💡 **The insight:** Each matching char **multiplies choices** by adding prior ways — counting, not optimizing.

---

## Solution

### C++
```cpp
class Solution {
public:
    int numDistinct(string s, string t) {
        int m = s.size(), n = t.size();
        vector<unsigned long long> dp(n + 1, 0);
        dp[0] = 1;
        for (int i = 1; i <= m; i++)
            for (int j = min(i, n); j >= 1; j--)
                if (s[i - 1] == t[j - 1]) dp[j] += dp[j - 1];
        return dp[n];
    }
};
```

### Python
```python
class Solution:
    def numDistinct(self, s: str, t: str) -> int:
        m, n = len(s), len(t)
        dp = [0] * (n + 1)
        dp[0] = 1
        for i in range(1, m + 1):
            for j in range(min(i, n), 0, -1):
                if s[i - 1] == t[j - 1]:
                    dp[j] += dp[j - 1]
        return dp[n]
```

### Java
```java
class Solution {
    public int numDistinct(String s, String t) {
        int m = s.length(), n = t.length();
        long[] dp = new long[n + 1];
        dp[0] = 1;
        for (int i = 1; i <= m; i++)
            for (int j = Math.min(i, n); j >= 1; j--)
                if (s.charAt(i - 1) == t.charAt(j - 1)) dp[j] += dp[j - 1];
        return (int) dp[n];
    }
}
```

**Complexity:** O(m · n) time · O(n) space
---

## 💭 What Should Have Clicked in Your Mind?

- **"Count, not max"** — sum matching paths.
- **"dp[0]=1"** — empty subsequence of t always reachable.
- **"j descending"** — 1D space without overwrite bugs.
- **"Advanced String DP"** — Day 13 cousin with different aggregation.

> 🎯 **Pattern Unlocked:** Advanced String DP — distinct subsequence count

---

*One quest down. Next: K=2 stock state machine. →*
