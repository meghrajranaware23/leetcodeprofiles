<!-- hand-authored -->
# ⚔ Quest: Minimum ASCII Delete Sum for Two Strings

> **Day 21** · [Minimum ASCII Delete Sum for Two Strings #712](https://leetcode.com/problems/minimum-ascii-delete-sum-for-two-strings/) · Medium · 15 min · 35 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Minimum ASCII Delete Sum for Two Strings on LeetCode](https://leetcode.com/problems/minimum-ascii-delete-sum-for-two-strings/)**

> ⚔ **Hunter's rule:** Only **deletions** allowed — no insert/replace. Match = free diagonal; mismatch = delete cheaper side (pay ASCII).

---

## The Problem

See the full problem statement on LeetCode: **[Minimum ASCII Delete Sum for Two Strings #712](https://leetcode.com/problems/minimum-ascii-delete-sum-for-two-strings/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

**Pattern:** Cost-Weighted LCS Variant.

- `dp[i][j]` = min ASCII sum to make `s1[0..i-1]` and `s2[0..j-1]` equal using deletions only
- Base: `dp[i][0] = sum ASCII s1[0..i-1]`, `dp[0][j] = sum ASCII s2[0..j-1]`
- Match: `dp[i][j] = dp[i-1][j-1]`
- Mismatch: `dp[i][j] = min(dp[i-1][j] + s1[i-1], dp[i][j-1] + s2[j-1])`
- Same grid shape as LCS / edit distance — **two choices** on mismatch, not three

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Cost-Weighted LCS Variant

**How to identify this from the problem statement:**
- Equalize strings by **deleting** only
- Cost = ASCII value of deleted character
- Match characters for free (keep both)

| Keyword / phrase | What it signals |
|---|---|
| "minimum delete sum" / "ASCII" | Weighted delete DP |
| "make strings equal" | 2D prefix alignment |
| "insert and replace allowed" | **#72** three-way |
| "longest common subsequence" | **C13** — max length |

**Why brute force fails:** Choose which chars to delete — 2^(m+n) overlap on prefixes.

**How a strong solver thinks before coding:**
1. *"Build prefix sums for base row/col."*
2. *"Match → diag."*
3. *"Else min-cost delete from s1 or s2."*
4. *"No replace shortcut."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Edit distance with replace** | Replace not allowed |
| **Unit cost deletes (#72)** | Need ASCII weights |
| **LCS length only** | Need min **cost**, not max len |
| **Zero base row** | Deleting all of s1 costs sum ASCII |

**The insight:** LCS keeps matches; here deleting non-matches costs ASCII — still a 2D prefix walk.

```
s1="sea", s2="eat"
Keep 'a','e' via match; delete 's'(115)+'t'(116)=231? 
Actual: delete 's' and 't' → 231 ✓
```

---

## 🔗 Same Pattern, Other Problems

| Problem | Variant | Pattern |
|---|---|---|
| [Edit Distance #72](https://leetcode.com/problems/edit-distance/) | + insert/replace | Earlier quest |
| [Longest Common Subsequence #1143](https://leetcode.com/problems/longest-common-subsequence/) | Max len | C13 |
| [Delete Operation for Two Strings #583](https://leetcode.com/problems/delete-operation-for-two-strings/) | Min delete **count** | m+n-2·LCS |

---

## 📖 Walkthrough

**Example:** `s1 = "delete"`, `s2 = "leet"`

```
Fill dp with prefix delete costs on borders
Match 'e','e' and 'e','e' on diagonals
Mismatch cells pick cheaper ASCII delete

dp[6][4] = minimum delete sum to align
```

> 💡 **The insight:** C13 grid + weighted deletes — no third replace branch.

---

## Solution

### C++
```cpp
class Solution {
public:
    int minimumDeleteSum(string s1, string s2) {
        int m = s1.size(), n = s2.size();
        vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
        for (int i = 1; i <= m; i++) dp[i][0] = dp[i - 1][0] + s1[i - 1];
        for (int j = 1; j <= n; j++) dp[0][j] = dp[0][j - 1] + s2[j - 1];
        for (int i = 1; i <= m; i++)
            for (int j = 1; j <= n; j++) {
                if (s1[i - 1] == s2[j - 1]) dp[i][j] = dp[i - 1][j - 1];
                else dp[i][j] = min(dp[i - 1][j] + s1[i - 1], dp[i][j - 1] + s2[j - 1]);
            }
        return dp[m][n];
    }
};
```

### Python
```python
class Solution:
    def minimumDeleteSum(self, s1: str, s2: str) -> int:
        m, n = len(s1), len(s2)
        dp = [[0] * (n + 1) for _ in range(m + 1)]
        for i in range(1, m + 1): dp[i][0] = dp[i - 1][0] + ord(s1[i - 1])
        for j in range(1, n + 1): dp[0][j] = dp[0][j - 1] + ord(s2[j - 1])
        for i in range(1, m + 1):
            for j in range(1, n + 1):
                if s1[i - 1] == s2[j - 1]:
                    dp[i][j] = dp[i - 1][j - 1]
                else:
                    dp[i][j] = min(dp[i - 1][j] + ord(s1[i - 1]), dp[i][j - 1] + ord(s2[j - 1]))
        return dp[m][n]
```

### Java
```java
class Solution {
    public int minimumDeleteSum(String s1, String s2) {
        int m = s1.length(), n = s2.length();
        int[][] dp = new int[m + 1][n + 1];
        for (int i = 1; i <= m; i++) dp[i][0] = dp[i - 1][0] + s1.charAt(i - 1);
        for (int j = 1; j <= n; j++) dp[0][j] = dp[0][j - 1] + s2.charAt(j - 1);
        for (int i = 1; i <= m; i++)
            for (int j = 1; j <= n; j++) {
                if (s1.charAt(i - 1) == s2.charAt(j - 1)) dp[i][j] = dp[i - 1][j - 1];
                else dp[i][j] = Math.min(dp[i - 1][j] + s1.charAt(i - 1), dp[i][j - 1] + s2.charAt(j - 1));
            }
        return dp[m][n];
    }
}
```

**Complexity:** O(m · n) time · O(m · n) space
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Delete only → two branches."** → Not edit distance three-way.
- **"ASCII on border."** → Prefix delete sums.
- **"Match free on diag."** → Same as LCS alignment.
- **"Cost-Weighted LCS Variant"** → C13 shape, min cost.

If you used `+1` costs, switch to **`ord(char)`** on delete edges.

> 🎯 **Pattern Unlocked:** Cost-Weighted LCS Variant

---

*Both quests complete. Head to the checkpoint. →*
