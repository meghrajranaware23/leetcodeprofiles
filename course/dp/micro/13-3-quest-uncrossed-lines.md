<!-- hand-authored -->
# ⚔ Quest: Uncrossed Lines

> **Day 13** · [Uncrossed Lines #1035](https://leetcode.com/problems/uncrossed-lines/) · Medium · 15 min · 20 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Uncrossed Lines on LeetCode](https://leetcode.com/problems/uncrossed-lines/)**

> ⚔ **Hunter's rule:** Draw lines on paper. Non-crossing pairs = matching values in **order**. That's LCS — same 2D table, different story.

---

## The Problem

See the full problem statement on LeetCode: **[Uncrossed Lines #1035](https://leetcode.com/problems/uncrossed-lines/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which DP pattern from today's concept applies? **LCS in Visual Disguise** — `nums1` and `nums2` are the two sequences; max uncrossed lines = LCS length.

Same recurrence as #1143: match → `dp[i-1][j-1]+1`, else `max(dp[i-1][j], dp[i][j-1])`.

If you're stuck after 5 minutes: lines crossing means order violated — count max **order-preserving** matches.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** LCS in Visual Disguise

**How to identify this from the problem statement:**
- Two arrays, connect equal values with lines
- Lines cannot cross → indices increase in **both** arrays
- Maximize number of connections = LCS length

| Keyword / phrase | What it signals |
|---|---|
| "uncrossed" / "non-crossing" | Order-preserving matching = LCS |
| "connect equal values" | Match when `nums1[i]==nums2[j]` |
| "maximum number of lines" | Maximize count = LCS DP |

**How a strong solver thinks before coding:**
1. *"Crossing lines = order break — same as subsequence not substring."*
2. *"Rename to LCS on nums1, nums2."*
3. *"Copy #1143 code with int arrays."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Try all pairs of connections, check crossing** | O(n⁴) or worse |
| **Greedy match leftmost equal each time** | Wrong order of pairing |
| **Graph matching algorithms** | Overkill — LCS O(mn) suffices |

**The insight brute force misses:** Non-crossing = pick indices `i₁ < i₂` in nums1 and `j₁ < j₂` in nums2 — exactly LCS structure.

```
nums1 = [1,4,2], nums2 = [1,2,4]
Max uncrossed = 2  (connect 1-1 and 2-2) = LCS length 2
```

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Longest Common Subsequence #1143](https://leetcode.com/problems/longest-common-subsequence/) | Strings instead of arrays | Identical DP |
| [Maximum Length of Repeated Subarray #718](https://leetcode.com/problems/maximum-length-of-repeated-subarray/) | **Contiguous** — different DP | Not LCS |
| [Delete Operation for Two Strings #583](https://leetcode.com/problems/delete-operation-for-two-strings/) | m+n-2*LCS deletions | LCS length in formula |

---

## 📖 Walkthrough

**nums1 = [1,4,2], nums2 = [1,2,4]**

```
LCS table (values):

      1  2  4
  1 [ 1  1  1 ]
  4 [ 1  1  2 ]
  2 [ 1  2  2 ]

Answer dp[3][3] = 2
Lines: (1,1) and (2,2) — no crossing
```

> 💡 **The insight:** When the problem draws lines, think **hidden LCS**. Code is byte-for-byte #1143.

---

## Solution

### C++
```cpp
class Solution {
public:
    int maxUncrossedLines(vector<int>& nums1, vector<int>& nums2) {
        int m = nums1.size(), n = nums2.size();
        vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (nums1[i - 1] == nums2[j - 1])
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
    def maxUncrossedLines(self, nums1: list[int], nums2: list[int]) -> int:
        m, n = len(nums1), len(nums2)
        dp = [[0] * (n + 1) for _ in range(m + 1)]
        for i in range(1, m + 1):
            for j in range(1, n + 1):
                if nums1[i - 1] == nums2[j - 1]:
                    dp[i][j] = dp[i - 1][j - 1] + 1
                else:
                    dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
        return dp[m][n]
```

### Java
```java
class Solution {
    public int maxUncrossedLines(int[] nums1, int[] nums2) {
        int m = nums1.length, n = nums2.length;
        int[][] dp = new int[m + 1][n + 1];
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (nums1[i - 1] == nums2[j - 1])
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

- **"Lines can't cross"** → Indices increase in both arrays → LCS.
- **"Not a graph problem"** → 2D DP beats matching.
- **"Same code as #1143"** → Recognition > reinvention.
- **"LCS visual applies"** → Fill the canonical grid.

> 🎯 **Pattern Unlocked:** LCS in Visual Disguise — uncrossed lines = subsequence match count.

---

*Both quests complete. Head to the checkpoint. →*
