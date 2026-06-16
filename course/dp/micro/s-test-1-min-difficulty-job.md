# ⚔ S-Rank Test — Problem 1

> [Minimum Difficulty of a Job Schedule #1335](https://leetcode.com/problems/minimum-difficulty-of-a-job-schedule/) · Hard · 300 XP

---

You've completed your S-Rank training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Minimum Difficulty of a Job Schedule on LeetCode](https://leetcode.com/problems/minimum-difficulty-of-a-job-schedule/)**

> ⚔ **Hunter's rule:** This is a rank test — treat it like real interview practice. Define the state. Write the transition. Fill the table by hand. No peeking until you've genuinely tried.

---

## The Problem

See the full problem statement on LeetCode: **[Minimum Difficulty of a Job Schedule #1335](https://leetcode.com/problems/minimum-difficulty-of-a-job-schedule/)**

---

## 💡 Hints

> 🎯 **What's being tested:** Pattern recognition from the S-Rank curriculum. Define the state and transition before you code.

Revisit your rank's cheat sheet. Is this linear DP, grid DP, knapsack, or state machine?

---

## 🔍 Pattern Recognition Breakdown

**How to identify from the statement:**
- What is the state? What information describes a subproblem?
- What are the choices at each state?
- What's the transition formula?

**How a strong solver thinks before coding:**
1. *"What does dp[i] represent?"*
2. *"What's the base case?"*
3. *"Linear, grid, knapsack, or state machine?"*
4. *"Can I optimize the space?"*

---

## ❌ Why Brute Force Fails

DP problems have exponential recursion trees with massive overlap. Brute force means recomputing the same subproblems O(2^n) times. Define the state, cache it, and solve each subproblem exactly once.

---

## 🎯 Transfer to Unseen Problems

Can you define the state without the problem name telling you the pattern?

Read the statement once. Define dp[i] in one sentence. If you can write the transition in under 60 seconds, you're ready.

---

<details>
<summary><strong>📖 Solution & Walkthrough</strong></summary>

Fill the DP table for the given example. Trace which cells each cell depends on. Then implement the transition.

### C++
```cpp
class Solution {
public:
    int minDifficulty(vector<int>& jobDifficulty, int d) {
        int n = jobDifficulty.size();
        if (n < d) return -1;
        vector<vector<int>> dp(d + 1, vector<int>(n, INT_MAX));
        dp[1][0] = jobDifficulty[0];
        for (int j = 1; j < n; j++)
            dp[1][j] = max(dp[1][j - 1], jobDifficulty[j]);
        for (int i = 2; i <= d; i++) {
            for (int j = i - 1; j < n; j++) {
                int mx = jobDifficulty[j];
                for (int k = j; k >= i - 1; k--) {
                    dp[i][j] = min(dp[i][j], dp[i - 1][k - 1] + mx);
                    if (k > 0) mx = max(mx, jobDifficulty[k - 1]);
                }
            }
        }
        return dp[d][n - 1];
    }
};
```

### Python
```python
class Solution:
    def minDifficulty(self, jobDifficulty: list[int], d: int) -> int:
        n = len(jobDifficulty)
        if n < d: return -1
        dp = [[float('inf')] * n for _ in range(d + 1)]
        dp[1][0] = jobDifficulty[0]
        for j in range(1, n):
            dp[1][j] = max(dp[1][j - 1], jobDifficulty[j])
        for i in range(2, d + 1):
            for j in range(i - 1, n):
                mx = jobDifficulty[j]
                for k in range(j, i - 2, -1):
                    dp[i][j] = min(dp[i][j], dp[i - 1][k - 1] + mx)
                    if k > 0: mx = max(mx, jobDifficulty[k - 1])
        return dp[d][n - 1]
```

### Java
```java
class Solution {
    public int minDifficulty(int[] jobDifficulty, int d) {
        int n = jobDifficulty.length;
        if (n < d) return -1;
        int[][] dp = new int[d + 1][n];
        for (int[] row : dp) Arrays.fill(row, Integer.MAX_VALUE);
        dp[1][0] = jobDifficulty[0];
        for (int j = 1; j < n; j++)
            dp[1][j] = Math.max(dp[1][j - 1], jobDifficulty[j]);
        for (int i = 2; i <= d; i++) {
            for (int j = i - 1; j < n; j++) {
                int mx = jobDifficulty[j];
                for (int k = j; k >= i - 1; k--) {
                    dp[i][j] = Math.min(dp[i][j], dp[i - 1][k - 1] + mx);
                    if (k > 0) mx = Math.max(mx, jobDifficulty[k - 1]);
                }
            }
        }
        return dp[d][n - 1];
    }
}
```

**Complexity:** O(d · n²) time · O(n) space

</details>

---

## 💭 What Should Have Clicked in Your Mind?

- **"This is a S-Rank test"** → Use patterns from this rank's training.
- **"State first, code second"** → Define dp[i] before writing any code.
- **"Name the pattern"** → The code is just the transition formula in syntax.

---

*1 of 3 test problems. Continue to the next. →*
