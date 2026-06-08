# ⚔ D-Rank Test — Problem 3

> [Ugly Number II #264](https://leetcode.com/problems/ugly-number-ii/) · Medium · 100 XP

---

You've completed your D-Rank training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Ugly Number II on LeetCode](https://leetcode.com/problems/ugly-number-ii/)**

> ⚔ **Hunter's rule:** This is a rank test — treat it like real interview practice. Define the state. Write the transition. Fill the table by hand. No peeking until you've genuinely tried.

---

## The Problem

See the full problem statement on LeetCode: **[Ugly Number II #264](https://leetcode.com/problems/ugly-number-ii/)**

---

## 💡 Hints

> 🎯 **What's being tested:** Pattern recognition from the D-Rank curriculum. Define the state and transition before you code.

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
    int nthUglyNumber(int n) {
        vector<int> dp(n);
        dp[0] = 1;
        int i2 = 0, i3 = 0, i5 = 0;
        for (int i = 1; i < n; i++) {
            int next = min({dp[i2] * 2, dp[i3] * 3, dp[i5] * 5});
            dp[i] = next;
            if (next == dp[i2] * 2) i2++;
            if (next == dp[i3] * 3) i3++;
            if (next == dp[i5] * 5) i5++;
        }
        return dp[n - 1];
    }
};
```

### Python
```python
class Solution:
    def nthUglyNumber(self, n: int) -> int:
        dp = [0] * n
        dp[0] = 1
        i2 = i3 = i5 = 0
        for i in range(1, n):
            nxt = min(dp[i2] * 2, dp[i3] * 3, dp[i5] * 5)
            dp[i] = nxt
            if nxt == dp[i2] * 2: i2 += 1
            if nxt == dp[i3] * 3: i3 += 1
            if nxt == dp[i5] * 5: i5 += 1
        return dp[n - 1]
```

### Java
```java
class Solution {
    public int nthUglyNumber(int n) {
        int[] dp = new int[n];
        dp[0] = 1;
        int i2 = 0, i3 = 0, i5 = 0;
        for (int i = 1; i < n; i++) {
            int next = Math.min(dp[i2] * 2, Math.min(dp[i3] * 3, dp[i5] * 5));
            dp[i] = next;
            if (next == dp[i2] * 2) i2++;
            if (next == dp[i3] * 3) i3++;
            if (next == dp[i5] * 5) i5++;
        }
        return dp[n - 1];
    }
}
```

**Complexity:** O(n) time · O(n) space

</details>

---

## 💭 What Should Have Clicked in Your Mind?

- **"This is a D-Rank test"** → Use patterns from this rank's training.
- **"State first, code second"** → Define dp[i] before writing any code.
- **"Name the pattern"** → The code is just the transition formula in syntax.

---

*3 of 3 test problems. Continue to the next. →*
