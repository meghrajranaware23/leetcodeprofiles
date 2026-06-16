<!-- hand-authored -->
# ⚔ B-Rank Test — Problem 3

> [Guess Number Higher or Lower II #375](https://leetcode.com/problems/guess-number-higher-or-lower-ii/) · Medium · 200 XP

---

You've completed your B-Rank training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Guess Number Higher or Lower II on LeetCode](https://leetcode.com/problems/guess-number-higher-or-lower-ii/)**

> ⚔ **Hunter's rule:** You pay the guessed number; worst-case across adversarial placement. **Interval DP** — fill by increasing length.

---

## The Problem

See the full problem statement on LeetCode: **[Guess Number Higher or Lower II #375](https://leetcode.com/problems/guess-number-higher-or-lower-ii/)**

---

## 💡 Hints

> 🎯 **What's being tested:** **Interval minimax DP** — `dp[i][j]` = min cost to guarantee win for range `[i,j]`.

- Try every guess `k` in `[i,j]` — pay `k` if wrong, then worst of left or right subproblem
- **`dp[i][j] = min over k of (k + max(dp[i][k-1], dp[k+1][j]))`**
- Base: single number → cost 0 (`dp[i][i]=0`)
- Fill by **interval length** 2..n (later rank preview — interval DP pattern)

Not linear knapsack. Not string grid. **Split interval at guess k.**

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Interval Minimax DP (#375)

**How to identify from the statement:**
- Range `[1, n]` shrinks after each guess
- Minimize **worst-case** total cost (game theory)
- Optimal substructure on **sub-intervals**

**How a strong solver thinks before coding:**
1. *"dp[i][j] on closed interval."*
2. *"Try each pivot k."*
3. *"Cost k + max(left, right) — adversary picks worse side."*
4. *"Loop len, then i, then k."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Binary search cost** | Adversary picks worst branch — not binary search optimal |
| **Greedy guess middle** | Doesn't minimize worst-case total paid |
| **Linear dp[i]** | Need sub-range state `(i,j)` |
| **O(n!) simulation** | Exponential |

**The insight:** Every guess splits the range; DP stores optimal worst-case cost for each interval.

---

## 🎯 Transfer to Unseen Problems

*"Min max cost splitting range by pivot"* → interval DP. Preview of **Burst Balloons**, **Matrix Chain Multiplication** — fill by length.

---

<details>
<summary><strong>📖 Solution & Walkthrough</strong></summary>

Fill the DP table for the given example. Trace which cells each cell depends on. Then implement the transition.

### C++
```cpp
class Solution {
public:
    int getMoneyAmount(int n) {
        vector<vector<int>> dp(n + 2, vector<int>(n + 2, 0));
        for (int len = 2; len <= n; len++)
            for (int i = 1; i + len - 1 <= n; i++) {
                int j = i + len - 1;
                dp[i][j] = INT_MAX;
                for (int k = i; k <= j; k++)
                    dp[i][j] = min(dp[i][j], k + max(dp[i][k - 1], dp[k + 1][j]));
            }
        return dp[1][n];
    }
};
```

### Python
```python
class Solution:
    def getMoneyAmount(self, n: int) -> int:
        dp = [[0] * (n + 2) for _ in range(n + 2)]
        for length in range(2, n + 1):
            for i in range(1, n - length + 2):
                j = i + length - 1
                dp[i][j] = float('inf')
                for k in range(i, j + 1):
                    dp[i][j] = min(dp[i][j], k + max(dp[i][k - 1], dp[k + 1][j]))
        return dp[1][n]
```

### Java
```java
class Solution {
    public int getMoneyAmount(int n) {
        int[][] dp = new int[n + 2][n + 2];
        for (int len = 2; len <= n; len++)
            for (int i = 1; i + len - 1 <= n; i++) {
                int j = i + len - 1;
                dp[i][j] = Integer.MAX_VALUE;
                for (int k = i; k <= j; k++)
                    dp[i][j] = Math.min(dp[i][j], k + Math.max(dp[i][k - 1], dp[k + 1][j]));
            }
        return dp[1][n];
    }
}
```

**Complexity:** O(n³) time · O(n²) space

</details>

---

## 💭 What Should Have Clicked in Your Mind?

- **"Range game → dp[i][j]."** → Interval DP.
- **"k + max(left, right)."** → Minimax over adversary.
- **"Fill by length."** → Smaller intervals first.
- **"Not B-Rank knapsack."** → Split-at-pivot pattern.

---

*3 of 3 test problems. Continue to the next. →*

## Solution

### C++
```cpp
class Solution {
public:
    int getMoneyAmount(int n) {
        vector<vector<int>> dp(n + 2, vector<int>(n + 2, 0));
        for (int len = 2; len <= n; len++)
            for (int i = 1; i + len - 1 <= n; i++) {
                int j = i + len - 1;
                dp[i][j] = INT_MAX;
                for (int k = i; k <= j; k++)
                    dp[i][j] = min(dp[i][j], k + max(dp[i][k - 1], dp[k + 1][j]));
            }
        return dp[1][n];
    }
};
```

### Python
```python
class Solution:
    def getMoneyAmount(self, n: int) -> int:
        dp = [[0] * (n + 2) for _ in range(n + 2)]
        for length in range(2, n + 1):
            for i in range(1, n - length + 2):
                j = i + length - 1
                dp[i][j] = float('inf')
                for k in range(i, j + 1):
                    dp[i][j] = min(dp[i][j], k + max(dp[i][k - 1], dp[k + 1][j]))
        return dp[1][n]
```

### Java
```java
class Solution {
    public int getMoneyAmount(int n) {
        int[][] dp = new int[n + 2][n + 2];
        for (int len = 2; len <= n; len++)
            for (int i = 1; i + len - 1 <= n; i++) {
                int j = i + len - 1;
                dp[i][j] = Integer.MAX_VALUE;
                for (int k = i; k <= j; k++)
                    dp[i][j] = Math.min(dp[i][j], k + Math.max(dp[i][k - 1], dp[k + 1][j]));
            }
        return dp[1][n];
    }
}
```

**Complexity:** O(n³) time · O(n²) space
