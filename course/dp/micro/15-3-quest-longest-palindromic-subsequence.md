# ⚔ Quest: Longest Palindromic Subsequence

> **Day 15** · [Longest Palindromic Subsequence #516](https://leetcode.com/problems/longest-palindromic-subsequence/) · Medium · 15 min · 25 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Longest Palindromic Subsequence on LeetCode](https://leetcode.com/problems/longest-palindromic-subsequence/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. Which DP pattern from today's concept applies? What's the state? What's the transition? The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Longest Palindromic Subsequence #516](https://leetcode.com/problems/longest-palindromic-subsequence/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which DP pattern from today's concept applies? Think about **2D Palindrome DP**.

What is the state? What does dp[i] represent for this problem?

If you're stuck after 5 minutes: revisit the concept page's DP Pipeline. Fill in the 2D table cell by cell. Track which cells each cell depends on.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** 2D Palindrome DP

**How to identify this from the problem statement:**
- Does the problem ask for an optimal value (min/max) or a count of ways?
- Can the problem be broken into overlapping subproblems?
- Is there a clear decision at each step (take/skip, include/exclude)?

| Keyword / phrase | What it signals |
|---|---|
| "minimum" / "maximum" / "optimal" | DP — optimize over choices |
| "how many ways" / "count" / "number of" | DP — sum transitions |
| "can you reach" / "is it possible" | DP — boolean reachability |
| "longest" / "shortest" subsequence | DP — sequence comparison |
| "partition into" / "subset sum" | Knapsack DP |
| "using at most k" / "with capacity" | Bounded knapsack or state machine |

**Why brute force fails:** Without DP, the recursive solution recomputes the same subproblems exponentially many times. The recursion tree has O(2^n) or O(n!) nodes, but only O(n) or O(n²) unique subproblems.

**How a strong solver thinks before coding:**
1. *"What's the state? What does dp[i] represent?"*
2. *"What are my choices at each state?"*
3. *"What's the transition formula?"*
4. *"What's the base case? What's the answer cell?"*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Naive recursion without caching** | O(2^n) — same subproblems recomputed exponentially |
| **Trying all subsets with nested loops** | O(2^n) or O(n!) — misses the optimal substructure |
| **Greedy without proof** | Greedy doesn't work when locally optimal ≠ globally optimal |
| **Not identifying the state** | Without a clear state, no way to cache or tabulate |

**The insight brute force misses:** The recursion tree has massive overlap. DP exploits this by solving each unique subproblem exactly once.

```
Exponential tree:           DP table:
     f(5)                   dp: [0, 1, 1, 2, 3, 5]
    /    \                        → O(n) time
  f(4)   f(3)                     → each cell filled once
  / \    / \
f(3) f(2) f(2) f(1)        Same answer, no repeated work.
 ...  ...  ...
→ O(2^n) calls
```

---

## 🔗 The DP Pipeline Applied

```
Step 1: BRUTE FORCE
  → Write the naive recursive solution for this problem.

Step 2: IDENTIFY OVERLAP
  → Draw the recursion tree for a small example.
  → Which calls repeat?

Step 3: MEMOIZE
  → Add memo[state] = result before each return.
  → Check memo before recursing.

Step 4: TABULATE
  → Define dp[...]. Fill from base case forward.
  → dp[state] = transition(previous states)

Step 5: OPTIMIZE SPACE
  → Do you need the whole table? Or just prev/curr?
```

---

## 📖 Walkthrough

Fill in the 2D table cell by cell. Track which cells each cell depends on.

```
Fill the DP table cell by cell for the example from the problem.
At each cell, write which previous cells it depends on.
Watch the transition formula produce the correct value.
```

> 💡 **The insight:** The code is just the table-filling written in syntax. If you can fill the table by hand, you can code it.

---

## Solution

### C++
```cpp
class Solution {
public:
    int longestPalindromeSubseq(string s) {
        int n = s.size();
        vector<vector<int>> dp(n, vector<int>(n, 0));
        for (int i = n - 1; i >= 0; i--) {
            dp[i][i] = 1;
            for (int j = i + 1; j < n; j++) {
                if (s[i] == s[j]) dp[i][j] = dp[i + 1][j - 1] + 2;
                else dp[i][j] = max(dp[i + 1][j], dp[i][j - 1]);
            }
        }
        return dp[0][n - 1];
    }
};
```

### Python
```python
class Solution:
    def longestPalindromeSubseq(self, s: str) -> int:
        n = len(s)
        dp = [[0] * n for _ in range(n)]
        for i in range(n - 1, -1, -1):
            dp[i][i] = 1
            for j in range(i + 1, n):
                if s[i] == s[j]: dp[i][j] = dp[i + 1][j - 1] + 2
                else: dp[i][j] = max(dp[i + 1][j], dp[i][j - 1])
        return dp[0][n - 1]
```

### Java
```java
class Solution {
    public int longestPalindromeSubseq(String s) {
        int n = s.length();
        int[][] dp = new int[n][n];
        for (int i = n - 1; i >= 0; i--) {
            dp[i][i] = 1;
            for (int j = i + 1; j < n; j++) {
                if (s.charAt(i) == s.charAt(j)) dp[i][j] = dp[i + 1][j - 1] + 2;
                else dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1]);
            }
        }
        return dp[0][n - 1];
    }
}
```

**Complexity:** O(n²) time · O(n²) space

---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"State is..."** → dp[i] represents the answer for the first i elements (or whatever the state is).
- **"Transition is..."** → dp[i] = max/min/sum of (choices connecting to previous states).
- **"Base case is..."** → dp[0] = ... (the smallest subproblem answered directly).
- **"2D Palindrome DP"** → Name the DP pattern from the concept page.

If you tried brute force first, that's fine — the breakthrough is **defining the state and transition**, not memorizing one solution.

> 🎯 **Pattern Unlocked:** 2D Palindrome DP

---

*Both quests complete. Head to the checkpoint. →*
