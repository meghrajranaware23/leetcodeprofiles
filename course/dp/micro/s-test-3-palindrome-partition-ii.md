# ⚔ S-Rank Test — Problem 3

> [Palindrome Partitioning II #132](https://leetcode.com/problems/palindrome-partitioning-ii/) · Hard · 300 XP

---

You've completed your S-Rank training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Palindrome Partitioning II on LeetCode](https://leetcode.com/problems/palindrome-partitioning-ii/)**

> ⚔ **Hunter's rule:** This is a rank test — treat it like real interview practice. Define the state. Write the transition. Fill the table by hand. No peeking until you've genuinely tried.

---

## The Problem

See the full problem statement on LeetCode: **[Palindrome Partitioning II #132](https://leetcode.com/problems/palindrome-partitioning-ii/)**

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
    int minCut(string s) {
        int n = s.size();
        vector<int> dp(n);
        iota(dp.begin(), dp.end(), 0);
        for (int c = 0; c < n; c++) {
            for (int l = c, r = c; l >= 0 && r < n && s[l] == s[r]; l--, r++)
                dp[r] = min(dp[r], l > 0 ? dp[l - 1] + 1 : 0);
            for (int l = c, r = c + 1; l >= 0 && r < n && s[l] == s[r]; l--, r++)
                dp[r] = min(dp[r], l > 0 ? dp[l - 1] + 1 : 0);
        }
        return dp[n - 1];
    }
};
```

### Python
```python
class Solution:
    def minCut(self, s: str) -> int:
        n = len(s)
        dp = list(range(n))
        for c in range(n):
            l, r = c, c
            while l >= 0 and r < n and s[l] == s[r]:
                dp[r] = min(dp[r], dp[l - 1] + 1 if l > 0 else 0)
                l -= 1; r += 1
            l, r = c, c + 1
            while l >= 0 and r < n and s[l] == s[r]:
                dp[r] = min(dp[r], dp[l - 1] + 1 if l > 0 else 0)
                l -= 1; r += 1
        return dp[n - 1]
```

### Java
```java
class Solution {
    public int minCut(String s) {
        int n = s.length();
        int[] dp = new int[n];
        for (int i = 0; i < n; i++) dp[i] = i;
        for (int c = 0; c < n; c++) {
            for (int l = c, r = c; l >= 0 && r < n && s.charAt(l) == s.charAt(r); l--, r++)
                dp[r] = Math.min(dp[r], l > 0 ? dp[l - 1] + 1 : 0);
            for (int l = c, r = c + 1; l >= 0 && r < n && s.charAt(l) == s.charAt(r); l--, r++)
                dp[r] = Math.min(dp[r], l > 0 ? dp[l - 1] + 1 : 0);
        }
        return dp[n - 1];
    }
}
```

**Complexity:** O(n²) time · O(n) space

</details>

---

## 💭 What Should Have Clicked in Your Mind?

- **"This is a S-Rank test"** → Use patterns from this rank's training.
- **"State first, code second"** → Define dp[i] before writing any code.
- **"Name the pattern"** → The code is just the transition formula in syntax.

---

*3 of 3 test problems. Continue to the next. →*
