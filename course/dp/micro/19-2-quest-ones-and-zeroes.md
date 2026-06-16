<!-- hand-authored -->
# ⚔ Quest: Ones and Zeroes

> **Day 19** · [Ones and Zeroes #474](https://leetcode.com/problems/ones-and-zeroes/) · Medium · 15 min · 35 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Ones and Zeroes on LeetCode](https://leetcode.com/problems/ones-and-zeroes/)**

> ⚔ **Hunter's rule:** Each string = item with **two weights** (0-count, 1-count). Draw `dp[m][n]` before coding.

---

## The Problem

See the full problem statement on LeetCode: **[Ones and Zeroes #474](https://leetcode.com/problems/ones-and-zeroes/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

**Pattern:** Multi-Constraint Knapsack — **2D 0/1**.

- `dp[i][j]` = max number of strings using at most `i` zeros and `j` ones
- For each string: count `z` = zeros, `o` = ones in string
- **Reverse both** `i` from m down to z, `j` from n down to o
- `dp[i][j] = max(dp[i][j], dp[i-z][j-o] + 1)`
- Answer: `dp[m][n]`

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Multi-Constraint Knapsack

**How to identify this from the problem statement:**
- Two simultaneous budgets (m zeros, n ones)
- Each item used at most once
- Maximize **count** of items (value 1 each)

| Keyword / phrase | What it signals |
|---|---|
| "at most m 0s and n 1s" | 2D knapsack |
| "maximize number of strings" | +1 on take |
| "each string once" | Reverse both dimensions |
| "single weight capacity" | **Day 17** 1D |

**Why brute force fails:** 2^n subset of strings — overlap on `(remaining zeros, remaining ones)`.

**How a strong solver thinks before coding:**
1. *"Precompute (z,o) per string."*
2. *"dp[m+1][n+1] initialized 0."*
3. *"Double reverse per string."*
4. *"Return dp[m][n]."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Try all subsets** | O(2^n) |
| **Greedy by length** | May violate 0/1 budgets |
| **Forward i,j loops** | Reuses same string |
| **1D knapsack only** | Two constraints need 2D |

**The insight:** Classic knapsack with weight vector `(z, o)` instead of scalar weight.

```
m=3, n=3, pick "1","0","10" → 3 strings, uses 2 zeros 2 ones ✓
```

---

## 🔗 Same Pattern, Other Problems

| Problem | Variant | Pattern |
|---|---|---|
| [0/1 Knapsack](https://leetcode.com/) | One weight | Day 17 |
| [Last Stone Weight II #1049](https://leetcode.com/problems/last-stone-weight-ii/) | 1D min-diff | Today's second quest |
| [Profitable Schemes](https://leetcode.com/problems/profitable-schemes/) | Profit + people | Hard 2D+ |

---

## 📖 Walkthrough

**Example:** `strs = ["10","0001","111001","1","0"]`, `m=3`, `n=3`

```
Process strings, double reverse:

"10" (z=1,o=1): enables dp[1][1]=1, dp[2][2]=1, ...
"0001" (z=3,o=1): extends counts
...

Best dp[3][3] = 4 strings
```

> 💡 **The insight:** Same 0/1 DNA as Day 17 — one extra dimension in the table.

---

## Solution

### C++
```cpp
class Solution {
public:
    int findMaxForm(vector<string>& strs, int m, int n) {
        vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
        for (const string& s : strs) {
            int zeros = count(s.begin(), s.end(), '0');
            int ones = s.size() - zeros;
            for (int i = m; i >= zeros; i--)
                for (int j = n; j >= ones; j--)
                    dp[i][j] = max(dp[i][j], dp[i - zeros][j - ones] + 1);
        }
        return dp[m][n];
    }
};
```

### Python
```python
class Solution:
    def findMaxForm(self, strs: List[str], m: int, n: int) -> int:
        dp = [[0] * (n + 1) for _ in range(m + 1)]
        for s in strs:
            zeros = s.count('0')
            ones = len(s) - zeros
            for i in range(m, zeros - 1, -1):
                for j in range(n, ones - 1, -1):
                    dp[i][j] = max(dp[i][j], dp[i - zeros][j - ones] + 1)
        return dp[m][n]
```

### Java
```java
class Solution {
    public int findMaxForm(String[] strs, int m, int n) {
        int[][] dp = new int[m + 1][n + 1];
        for (String s : strs) {
            int zeros = 0;
            for (char c : s.toCharArray()) if (c == '0') zeros++;
            int ones = s.length() - zeros;
            for (int i = m; i >= zeros; i--)
                for (int j = n; j >= ones; j--)
                    dp[i][j] = Math.max(dp[i][j], dp[i - zeros][j - ones] + 1);
        }
        return dp[m][n];
    }
}
```

**Complexity:** O(l · m · n) time · O(m · n) space
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Two budgets → dp[m][n]."** → 2D knapsack.
- **"Reverse i and j."** → 0/1 per string.
- **"+1 on take."** → Maximize count, not value sum.
- **"Multi-Constraint Knapsack"** → Day 17 with two weights.

If you tried bitmask subsets, the breakthrough is the **2D table fill**.

> 🎯 **Pattern Unlocked:** Multi-Constraint Knapsack

---

*One quest down. Next: partition min-diff in disguise. →*
