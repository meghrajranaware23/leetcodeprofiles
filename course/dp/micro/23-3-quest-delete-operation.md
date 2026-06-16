<!-- hand-authored -->
# ⚔ Quest: Delete Operation for Two Strings

> **Day 23** · [Delete Operation for Two Strings #583](https://leetcode.com/problems/delete-operation-for-two-strings/) · Medium · 15 min · 35 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Delete Operation for Two Strings on LeetCode](https://leetcode.com/problems/delete-operation-for-two-strings/)**

> ⚔ **Hunter's rule:** Delete-only = keep the LCS, pay for everything else. Fill Day 13's table, then `m + n - 2 * LCS`.

---

## The Problem

See the full problem statement on LeetCode: **[Delete Operation for Two Strings #583](https://leetcode.com/problems/delete-operation-for-two-strings/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which DP pattern from today's concept applies? **LCS-Based String DP** — not edit distance.

You can only **delete** — no insert, no replace. The surviving chars must appear in both strings in order → that's the **longest common subsequence**.

Formula: `minDeletions = len(word1) + len(word2) - 2 * LCS(word1, word2)`.

Fill the standard Day 13 grid: match → `dp[i-1][j-1]+1`, else `max(dp[i-1][j], dp[i][j-1])`.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** LCS-Based String DP

**How to identify this from the problem statement:**
- Two strings, delete-only operations on either side
- Goal: make them **equal** (same remaining sequence)
- Min operations = delete everything not in the common subsequence

| Keyword / phrase | What it signals |
|---|---|
| "delete operation" / "make equal" | LCS reduction |
| "minimum steps" with delete only | NOT Day 21 edit distance |
| "both strings" | Day 13 2D table |

**Day 21 contrast:** Edit distance allows insert + delete + replace. Here only delete exists on both sides — equivalent to finding max chars to **keep** (LCS).

**How a strong solver thinks before coding:**
1. *"Delete-only → maximize kept = LCS."*
2. *"Fill Day 13 dp[i][j]."*
3. *"Answer = m + n - 2*dp[m][n]."*
4. *"No replace/insert logic needed."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Edit distance with 3 operations** | Overkill — replace never helps when only delete allowed |
| **Try all common subsequences** | O(2^n) — LCS table solves in O(m·n) |
| **Greedy character matching** | Misses optimal subsequence structure |

**The insight brute force misses:** Every char you **keep** must be in both strings in order — that's exactly LCS. Deletions = total length minus twice the kept length.

```
word1 = "sea", word2 = "eat"
LCS = "ea" (length 2)
Deletions = 3 + 3 - 4 = 2  (delete 's' and 't')
```

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Longest Common Subsequence #1143](https://leetcode.com/problems/longest-common-subsequence/) | Return LCS length directly | Same table |
| [Minimum ASCII Delete Sum #712](https://leetcode.com/problems/minimum-ascii-delete-sum-for-two-strings/) | Weighted delete cost | LCS variant with costs |
| [Edit Distance #72](https://leetcode.com/problems/edit-distance/) | Insert/replace allowed | Day 21 |

---

## 📖 Walkthrough

**word1 = "leetcode", word2 = "etco"**

```
      ""  e   t   c   o
  "" [ 0   0   0   0   0 ]
  l  [ 0   0   0   0   0 ]
  e  [ 0   1↖  1   1   1 ]
  e  [ 0   1   1   1   1 ]
  t  [ 0   1   2↖  2   2 ]
  c  [ 0   1   2   3↖  3 ]
  o  [ 0   1   2   3   4↖]
  d  [ 0   1   2   3   4 ]
  e  [ 0   1   2   3   4 ]

LCS = 4 ("etco")
Answer = 8 + 4 - 2*4 = 4 deletions
```

> 💡 **The insight:** Day 13 table + one-line formula. No third dimension, no edit operations.

---

## Solution

### C++
```cpp
class Solution {
public:
    int minDistance(string word1, string word2) {
        int m = word1.size(), n = word2.size();
        vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
        for (int i = 1; i <= m; i++)
            for (int j = 1; j <= n; j++) {
                if (word1[i - 1] == word2[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1;
                else dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);
            }
        return m + n - 2 * dp[m][n];
    }
};
```

### Python
```python
class Solution:
    def minDistance(self, word1: str, word2: str) -> int:
        m, n = len(word1), len(word2)
        dp = [[0] * (n + 1) for _ in range(m + 1)]
        for i in range(1, m + 1):
            for j in range(1, n + 1):
                if word1[i - 1] == word2[j - 1]: dp[i][j] = dp[i - 1][j - 1] + 1
                else: dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
        return m + n - 2 * dp[m][n]
```

### Java
```java
class Solution {
    public int minDistance(String word1, String word2) {
        int m = word1.length(), n = word2.length();
        int[][] dp = new int[m + 1][n + 1];
        for (int i = 1; i <= m; i++)
            for (int j = 1; j <= n; j++) {
                if (word1.charAt(i - 1) == word2.charAt(j - 1)) dp[i][j] = dp[i - 1][j - 1] + 1;
                else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        return m + n - 2 * dp[m][n];
    }
}
```

**Complexity:** O(m · n) time · O(m · n) space
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Delete-only → LCS"** — keep the longest common subsequence.
- **"Formula: m+n-2*LCS"** — each kept char saves one delete per string.
- **"Day 13 table"** — match ↖+1, else max(↑,←).
- **"Not edit distance"** — no insert/replace in this problem.

If you tried brute force first, that's fine — the breakthrough is **recognizing LCS inside delete-only wording**, not memorizing one solution.

> 🎯 **Pattern Unlocked:** LCS-Based String DP

---

*Both quests complete. Head to the checkpoint. →*
