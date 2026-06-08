# ⚔ A-Rank Test — Problem 2

> [Champagne Tower #799](https://leetcode.com/problems/champagne-tower/) · Medium · 250 XP

---

You've completed your A-Rank training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Champagne Tower on LeetCode](https://leetcode.com/problems/champagne-tower/)**

> ⚔ **Hunter's rule:** This is a rank test — treat it like real interview practice. Define the state. Write the transition. Fill the table by hand. No peeking until you've genuinely tried.

---

## The Problem

See the full problem statement on LeetCode: **[Champagne Tower #799](https://leetcode.com/problems/champagne-tower/)**

---

## 💡 Hints

> 🎯 **What's being tested:** Pattern recognition from the A-Rank curriculum. Define the state and transition before you code.

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
    double champagneTower(int poured, int query_row, int query_glass) {
        vector<vector<double>> dp(query_row + 1, vector<double>(query_row + 1, 0));
        dp[0][0] = poured;
        for (int i = 0; i < query_row; i++)
            for (int j = 0; j <= i; j++) {
                double overflow = (dp[i][j] - 1.0) / 2.0;
                if (overflow > 0) { dp[i + 1][j] += overflow; dp[i + 1][j + 1] += overflow; }
            }
        return min(1.0, dp[query_row][query_glass]);
    }
};
```

### Python
```python
class Solution:
    def champagneTower(self, poured: int, query_row: int, query_glass: int) -> float:
        dp = [[0.0] * (i + 1) for i in range(query_row + 1)]
        dp[0][0] = poured
        for i in range(query_row):
            for j in range(len(dp[i])):
                overflow = (dp[i][j] - 1.0) / 2.0
                if overflow > 0:
                    dp[i + 1][j] += overflow
                    dp[i + 1][j + 1] += overflow
        return min(1.0, dp[query_row][query_glass])
```

### Java
```java
class Solution {
    public double champagneTower(int poured, int query_row, int query_glass) {
        double[][] dp = new double[query_row + 1][query_row + 1];
        dp[0][0] = poured;
        for (int i = 0; i < query_row; i++)
            for (int j = 0; j <= i; j++) {
                double overflow = (dp[i][j] - 1.0) / 2.0;
                if (overflow > 0) { dp[i + 1][j] += overflow; dp[i + 1][j + 1] += overflow; }
            }
        return Math.min(1.0, dp[query_row][query_glass]);
    }
}
```

**Complexity:** O(r²) time · O(r²) space

</details>

---

## 💭 What Should Have Clicked in Your Mind?

- **"This is a A-Rank test"** → Use patterns from this rank's training.
- **"State first, code second"** → Define dp[i] before writing any code.
- **"Name the pattern"** → The code is just the transition formula in syntax.

---

*2 of 3 test problems. Continue to the next. →*
