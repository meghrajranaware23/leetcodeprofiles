<!-- hand-authored -->
# ⚔ Quest: Edit Distance

> **Day 21** · [Edit Distance #72](https://leetcode.com/problems/edit-distance/) · Medium · 15 min · 35 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Edit Distance on LeetCode](https://leetcode.com/problems/edit-distance/)**

> ⚔ **Hunter's rule:** Same **2D prefix grid** as C13 LCS — but mismatch uses **min of three**, not max of two.

---

## The Problem

See the full problem statement on LeetCode: **[Edit Distance #72](https://leetcode.com/problems/edit-distance/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

**Pattern:** Classic String Transformation DP.

- `dp[i][j]` = min ops to turn `word1[0..i-1]` → `word2[0..j-1]`
- Base: `dp[i][0]=i`, `dp[0][j]=j`
- Match (`word1[i-1]==word2[j-1]`): `dp[i][j]=dp[i-1][j-1]`
- Else: `dp[i][j] = 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])`
  - delete, insert, replace

Fill row by row. Answer: `dp[m][n]`.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Classic String Transformation DP

**How to identify this from the problem statement:**
- Two strings, minimum **operations**
- Insert / delete / replace each cost 1
- Prefix subproblems overlap

| Keyword / phrase | What it signals |
|---|---|
| "edit distance" / "word1 to word2" | 2D min grid |
| "one operation" | Unit cost per edit |
| "longest common" | **C13** max grid |
| "delete only" / "ASCII" | **#712** variant |

**Why brute force fails:** Try all edit sequences — exponential; same `(i,j)` prefix recomputed.

**How a strong solver thinks before coding:**
1. *"Size (m+1)×(n+1)."*
2. *"Fill first row/col."*
3. *"Match → diag; else 1+min three."*
4. *"Not LCS max."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Recursive all edits** | O(3^max(m,n)) without memo |
| **LCS then convert** | Overcomplicated — direct grid |
| **Wrong base cases** | Empty string = all inserts/deletes |
| **max instead of min** | LCS confusion |

**The insight:** Same table topology as LCS; only the recurrence changes on mismatch.

```
"horse" → "ros": dp[5][3]=3
```

---

## 🔗 Same Pattern, Other Problems

| Problem | Variant | Pattern |
|---|---|---|
| [Longest Common Subsequence #1143](https://leetcode.com/problems/longest-common-subsequence/) | Max match | **C13** bridge |
| [Minimum ASCII Delete Sum #712](https://leetcode.com/problems/minimum-ascii-delete-sum-for-two-strings/) | Delete + cost | Today's second quest |
| [Delete Operation for Two Strings #583](https://leetcode.com/problems/delete-operation-for-two-strings/) | Delete only, count ops | LCS length trick |

---

## 📖 Walkthrough

**Example:** `word1 = "intention"`, `word2 = "execution"`

```
Fill grid — final cell dp[9][9] = 5

Typical path: replace i→e, replace n→x, ... (5 edits total)
Trace one mismatch cell:
  dp[i][j] = 1 + min(delete, insert, replace neighbors)
```

> 💡 **The insight:** If you can fill LCS, you can fill edit distance — swap max for min-of-three.

---

## Solution

### C++
```cpp
class Solution {
public:
    int minDistance(string word1, string word2) {
        int m = word1.size(), n = word2.size();
        vector<vector<int>> dp(m + 1, vector<int>(n + 1));
        for (int i = 0; i <= m; i++) dp[i][0] = i;
        for (int j = 0; j <= n; j++) dp[0][j] = j;
        for (int i = 1; i <= m; i++)
            for (int j = 1; j <= n; j++) {
                if (word1[i - 1] == word2[j - 1]) dp[i][j] = dp[i - 1][j - 1];
                else dp[i][j] = 1 + min({dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]});
            }
        return dp[m][n];
    }
};
```

### Python
```python
class Solution:
    def minDistance(self, word1: str, word2: str) -> int:
        m, n = len(word1), len(word2)
        dp = [[0] * (n + 1) for _ in range(m + 1)]
        for i in range(m + 1): dp[i][0] = i
        for j in range(n + 1): dp[0][j] = j
        for i in range(1, m + 1):
            for j in range(1, n + 1):
                if word1[i - 1] == word2[j - 1]:
                    dp[i][j] = dp[i - 1][j - 1]
                else:
                    dp[i][j] = 1 + min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1])
        return dp[m][n]
```

### Java
```java
class Solution {
    public int minDistance(String word1, String word2) {
        int m = word1.length(), n = word2.length();
        int[][] dp = new int[m + 1][n + 1];
        for (int i = 0; i <= m; i++) dp[i][0] = i;
        for (int j = 0; j <= n; j++) dp[0][j] = j;
        for (int i = 1; i <= m; i++)
            for (int j = 1; j <= n; j++) {
                if (word1.charAt(i - 1) == word2.charAt(j - 1)) dp[i][j] = dp[i - 1][j - 1];
                else dp[i][j] = 1 + Math.min(dp[i - 1][j - 1], Math.min(dp[i - 1][j], dp[i][j - 1]));
            }
        return dp[m][n];
    }
}
```

**Complexity:** O(m · n) time · O(m · n) space
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Prefix grid dp[i][j]."** → Same scaffold as LCS.
- **"Three operations on mismatch."** → min not max.
- **"Base = index counts."** → Empty ↔ all edits.
- **"Classic String Transformation DP"** → #72 canonical.

If you wrote LCS first, change only the **mismatch branch**.

> 🎯 **Pattern Unlocked:** Classic String Transformation DP

---

*One quest down. Next: delete-only with ASCII costs. →*
