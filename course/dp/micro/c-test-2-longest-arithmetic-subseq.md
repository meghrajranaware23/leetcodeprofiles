# ⚔ C-Rank Test — Problem 2

> [Longest Arithmetic Subsequence #1027](https://leetcode.com/problems/longest-arithmetic-subsequence/) · Medium · 150 XP

---

You've completed your C-Rank training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Longest Arithmetic Subsequence on LeetCode](https://leetcode.com/problems/longest-arithmetic-subsequence/)**

> ⚔ **Hunter's rule:** This is a rank test — treat it like real interview practice. Define the state. Write the transition. Fill the table by hand. No peeking until you've genuinely tried.

---

## The Problem

See the full problem statement on LeetCode: **[Longest Arithmetic Subsequence #1027](https://leetcode.com/problems/longest-arithmetic-subsequence/)**

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
    int longestArithSeqLength(vector<int>& nums) {
        int n = nums.size(), ans = 2;
        vector<unordered_map<int,int>> dp(n);
        for (int i = 1; i < n; i++) {
            for (int j = 0; j < i; j++) {
                int d = nums[i] - nums[j];
                dp[i][d] = (dp[j].count(d) ? dp[j][d] : 1) + 1;
                ans = max(ans, dp[i][d]);
            }
        }
        return ans;
    }
};
```

### Python
```python
class Solution:
    def longestArithSeqLength(self, nums: list[int]) -> int:
        n = len(nums)
        dp = [dict() for _ in range(n)]
        ans = 2
        for i in range(1, n):
            for j in range(i):
                d = nums[i] - nums[j]
                dp[i][d] = dp[j].get(d, 1) + 1
                ans = max(ans, dp[i][d])
        return ans
```

### Java
```java
class Solution {
    public int longestArithSeqLength(int[] nums) {
        int n = nums.length, ans = 2;
        Map<Integer, Integer>[] dp = new HashMap[n];
        for (int i = 0; i < n; i++) dp[i] = new HashMap<>();
        for (int i = 1; i < n; i++) {
            for (int j = 0; j < i; j++) {
                int d = nums[i] - nums[j];
                dp[i].put(d, dp[j].getOrDefault(d, 1) + 1);
                ans = Math.max(ans, dp[i].get(d));
            }
        }
        return ans;
    }
}
```

**Complexity:** Time: O(n^2), Space: O(n^2)

</details>

---

## 💭 What Should Have Clicked in Your Mind?

- **"This is a C-Rank test"** → Use patterns from this rank's training.
- **"State first, code second"** → Define dp[i] before writing any code.
- **"Name the pattern"** → The code is just the transition formula in syntax.

---

*2 of 3 test problems. Continue to the next. →*
