# ⚔ C-Rank Test — Problem 1

> [Count Square Submatrices with All Ones #1277](https://leetcode.com/problems/count-square-submatrices-with-all-ones/) · Medium · 150 XP

---

You've completed your C-Rank training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Count Square Submatrices with All Ones on LeetCode](https://leetcode.com/problems/count-square-submatrices-with-all-ones/)**

> ⚔ **Hunter's rule:** This is a rank test — treat it like real interview practice. Define the state. Write the transition. Fill the table by hand. No peeking until you've genuinely tried.

---

## The Problem

See the full problem statement on LeetCode: **[Count Square Submatrices with All Ones #1277](https://leetcode.com/problems/count-square-submatrices-with-all-ones/)**

---

## 💡 Hints

> 🎯 **What's being tested:** Pattern recognition from the C-Rank curriculum. Define the state and transition before you code.

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
    int countSquares(vector<vector<int>>& matrix) {
        int m = matrix.size(), n = matrix[0].size(), ans = 0;
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (matrix[i][j] && i > 0 && j > 0) {
                    matrix[i][j] = min({matrix[i-1][j], matrix[i][j-1], matrix[i-1][j-1]}) + 1;
                }
                ans += matrix[i][j];
            }
        }
        return ans;
    }
};
```

### Python
```python
class Solution:
    def countSquares(self, matrix: list[list[int]]) -> int:
        m, n = len(matrix), len(matrix[0])
        ans = 0
        for i in range(m):
            for j in range(n):
                if matrix[i][j] and i > 0 and j > 0:
                    matrix[i][j] = min(matrix[i-1][j], matrix[i][j-1], matrix[i-1][j-1]) + 1
                ans += matrix[i][j]
        return ans
```

### Java
```java
class Solution {
    public int countSquares(int[][] matrix) {
        int m = matrix.length, n = matrix[0].length, ans = 0;
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (matrix[i][j] > 0 && i > 0 && j > 0) {
                    matrix[i][j] = Math.min(Math.min(matrix[i-1][j], matrix[i][j-1]), matrix[i-1][j-1]) + 1;
                }
                ans += matrix[i][j];
            }
        }
        return ans;
    }
}
```

**Complexity:** Time: O(m*n), Space: O(1)

</details>

---

## 💭 What Should Have Clicked in Your Mind?

- **"This is a C-Rank test"** → Use patterns from this rank's training.
- **"State first, code second"** → Define dp[i] before writing any code.
- **"Name the pattern"** → The code is just the transition formula in syntax.

---

*1 of 3 test problems. Continue to the next. →*
