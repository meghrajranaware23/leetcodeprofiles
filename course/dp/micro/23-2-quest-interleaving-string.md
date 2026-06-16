<!-- hand-authored -->
# ⚔ Quest: Interleaving String

> **Day 23** · [Interleaving String #97](https://leetcode.com/problems/interleaving-string/) · Medium · 15 min · 35 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Interleaving String on LeetCode](https://leetcode.com/problems/interleaving-string/)**

> ⚔ **Hunter's rule:** Draw `dp[i][j]` — can prefixes of `s1` (i chars) and `s2` (j chars) form the first `i+j` chars of `s3`? Boolean OR, not LCS max.

---

## The Problem

See the full problem statement on LeetCode: **[Interleaving String #97](https://leetcode.com/problems/interleaving-string/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which DP pattern from today's concept applies? **Two-String Interleave DP** — `dp[i][j]` reachability.

If `m + n != len(s3)`, return false immediately. At `(i,j)`, the next char of `s3` is at index `i+j-1`.

Two ways to arrive: last char from `s1[i-1]` (need `dp[i-1][j]`) or from `s2[j-1]` (need `dp[i][j-1]`). **OR**, not max.

Space trick: only previous row needed — rolling 1D array of size `n+1`.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Two-String Interleave DP

**How to identify this from the problem statement:**
- Three strings — output must use **all** of s1 and s2 in original order
- Boolean answer — can/can't interleave
- 2D state `(i,j)` = progress into s1 and s2

| Keyword / phrase | What it signals |
|---|---|
| "interleaving" / "formed from s1 and s2" | `dp[i][j]` boolean OR |
| "while maintaining relative order" | No reordering — prefix DP |
| "s3 consists of s1 and s2" | Must consume both fully → answer `dp[m][n]` |

**Day 13 contrast:** LCS **skips** chars and **maximizes** matches. Interleaving **uses every char** from both strings — no skipping allowed.

**How a strong solver thinks before coding:**
1. *"Length check: m+n == len(s3)?"*
2. *"dp[i][j] = can prefixes interleave to s3[:i+j]?"*
3. *"Match s1[i-1] or s2[j-1] to s3[i+j-1], OR both paths."*
4. *"Answer: dp[m][n]."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Try all interleavings recursively** | O(C(m+n, m)) — exponential |
| **LCS-style max match** | Wrong — can't skip chars in s1/s2 |
| **Greedy pick s1 or s2** | Local choice doesn't guarantee global validity |

**The insight brute force misses:** Only `(i,j)` pairs repeat — O(m·n) unique states. Each cell asks one question: *did the last char come from s1 or s2?*

```
s1="aabcc", s2="dbbca", s3="aadbbcbcac"

dp[2][1] = can "aa"+"d" form "aad"?
  s3[2]='d' from s2[0] → need dp[2][0] && s2[0]=='d' ✓
```

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Distinct Subsequences #115](https://leetcode.com/problems/distinct-subsequences/) | Count ways s is subseq of t | 2D string, different transition |
| [Edit Distance #72](https://leetcode.com/problems/edit-distance/) | Min operations | Day 21 — min not boolean |
| [Longest Common Subsequence #1143](https://leetcode.com/problems/longest-common-subsequence/) | Max length, skip allowed | Day 13 |

---

## 📖 Walkthrough

**s1 = "aabcc", s2 = "dbbca", s3 = "aadbbcbcac"**

```
Key cells:
  dp[0][0] = T
  dp[1][0]: s1[0]='a' == s3[0] → T
  dp[2][0]: s1[1]='a' == s3[1] → T
  dp[2][1]: s3[2]='d' from s2[0]='d', dp[2][0]=T → T
  ...
  dp[5][5] = T → valid interleaving
```

Fill row by row. At each `(i,j)`, check both sources for `s3[i+j-1]`.

> 💡 **The insight:** Same 2D grid shape as LCS — but boolean OR replaces max(+1, ↑, ←).

---

## Solution

### C++
```cpp
class Solution {
public:
    bool isInterleave(string s1, string s2, string s3) {
        int m = s1.size(), n = s2.size();
        if (m + n != (int)s3.size()) return false;
        vector<bool> dp(n + 1, false);
        for (int i = 0; i <= m; i++)
            for (int j = 0; j <= n; j++) {
                if (i == 0 && j == 0) dp[j] = true;
                else if (i == 0) dp[j] = dp[j - 1] && s2[j - 1] == s3[j - 1];
                else if (j == 0) dp[j] = dp[j] && s1[i - 1] == s3[i - 1];
                else dp[j] = (dp[j] && s1[i - 1] == s3[i + j - 1]) || (dp[j - 1] && s2[j - 1] == s3[i + j - 1]);
            }
        return dp[n];
    }
};
```

### Python
```python
class Solution:
    def isInterleave(self, s1: str, s2: str, s3: str) -> bool:
        m, n = len(s1), len(s2)
        if m + n != len(s3):
            return False
        dp = [False] * (n + 1)
        for i in range(m + 1):
            for j in range(n + 1):
                if i == 0 and j == 0:
                    dp[j] = True
                elif i == 0:
                    dp[j] = dp[j - 1] and s2[j - 1] == s3[j - 1]
                elif j == 0:
                    dp[j] = dp[j] and s1[i - 1] == s3[i - 1]
                else:
                    dp[j] = (dp[j] and s1[i - 1] == s3[i + j - 1]) or (dp[j - 1] and s2[j - 1] == s3[i + j - 1])
        return dp[n]
```

### Java
```java
class Solution {
    public boolean isInterleave(String s1, String s2, String s3) {
        int m = s1.length(), n = s2.length();
        if (m + n != s3.length()) return false;
        boolean[] dp = new boolean[n + 1];
        for (int i = 0; i <= m; i++)
            for (int j = 0; j <= n; j++) {
                if (i == 0 && j == 0) dp[j] = true;
                else if (i == 0) dp[j] = dp[j - 1] && s2.charAt(j - 1) == s3.charAt(j - 1);
                else if (j == 0) dp[j] = dp[j] && s1.charAt(i - 1) == s3.charAt(i - 1);
                else dp[j] = (dp[j] && s1.charAt(i - 1) == s3.charAt(i + j - 1)) || (dp[j - 1] && s2.charAt(j - 1) == s3.charAt(i + j - 1));
            }
        return dp[n];
    }
}
```

**Complexity:** O(m · n) time · O(n) space
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"State is `dp[i][j]`"** — prefixes of s1 and s2 form prefix of s3 of length i+j.
- **"OR transition"** — last char from s1 or s2 if characters match s3[i+j-1].
- **"Not LCS"** — must use all chars; boolean not max.
- **"Day 13 grid shape"** — same 2D walk, different cell meaning.

If you tried brute force first, that's fine — the breakthrough is **`dp[i][j]` as weave progress**, not memorizing one solution.

> 🎯 **Pattern Unlocked:** Two-String Interleave DP

---

*One quest down. The next one builds on this pattern. →*
