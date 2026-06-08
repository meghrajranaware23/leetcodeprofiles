# ✅ Day 25 Checkpoint

> **Multi-Dimensional State DP** · 2 quests completed · ⭐ 115 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Before you move on, practice **hearing the signal** in each phrase below:

| When you see... | Think... | Why |
|---|---|---|
| "how many ways" / "count paths" / "counting" | Counting DP — dp[i] = sum of valid transitions | Overlapping subproblems with optimal substructure |
| "minimum cost" / "cheapest" / "fewest" | Min-cost DP — dp[i] = min(options) + cost | Overlapping subproblems with optimal substructure |
| "maximum profit" / "best score" / "longest" | Max-value DP — dp[i] = max(options) | Overlapping subproblems with optimal substructure |
| "take or skip" / "rob houses" / "select items" | 0/1 Knapsack — dp[i] = max(take, skip) | Overlapping subproblems with optimal substructure |
| "unlimited supply" / "coins" / "denominations" | Unbounded Knapsack — try all items at each amount | Overlapping subproblems with optimal substructure |
| "longest increasing" / "subsequence" | LIS — dp[i] = max(dp[j]+1) for valid j < i | Overlapping subproblems with optimal substructure |
| "longest common" / "two strings" | LCS — 2D DP on two sequences | Overlapping subproblems with optimal substructure |
| "palindrome" / "reads same" | Palindrome DP — expand or dp[i][j] | Overlapping subproblems with optimal substructure |
| "grid" / "path" / "top-left to bottom-right" | Grid DP — dp[i][j] from neighbors | Overlapping subproblems with optimal substructure |
| "buy and sell" / "stock" / "transaction" | State Machine DP — hold/sold/rest states | Overlapping subproblems with optimal substructure |
| "transform" / "edit distance" / "operations" | String DP — insert/delete/replace choices | Overlapping subproblems with optimal substructure |
| "partition into" / "subset sum" / "target" | Subset Sum DP — include/exclude with capacity | Overlapping subproblems with optimal substructure |

### 🧠 Quick Recognition Test

Read each mini-problem. What's the state? What's the transition?

1. *"Find the minimum cost to climb stairs, paying cost[i] per step"* → **State:** dp[i] = min cost to reach step i. **Transition:** dp[i] = cost[i] + min(dp[i-1], dp[i-2])
2. *"Count the number of ways to make change for amount n"* → **State:** dp[i] = number of ways to make amount i. **Transition:** dp[i] += dp[i - coin] for each coin
3. *"Find the longest common subsequence of two strings"* → **State:** dp[i][j] = LCS of s1[0..i] and s2[0..j]. **Transition:** match → dp[i-1][j-1]+1, else max(dp[i-1][j], dp[i][j-1])
4. *"Given weights and values, maximize value within capacity W"* → **State:** dp[i][w] = max value using items 0..i with capacity w. **Transition:** dp[i][w] = max(skip, take if fits)

---

## 🎯 Transfer to Unseen Problems

You've studied today's quests. Can you define the state on problems you've never seen?

**Scenario 1:** *"Given an array, find the length of the longest increasing subsequence."*

What's the state? **dp[i] = length of LIS ending at index i.** Transition: dp[i] = max(dp[j] + 1) for all j < i where nums[j] < nums[i].

**Scenario 2:** *"Find the minimum number of coins to make a given amount."*

What's the state? **dp[i] = min coins to make amount i.** Transition: dp[i] = min(dp[i - coin] + 1) for each coin denomination.

**Scenario 3:** *"Count paths in a grid from top-left to bottom-right, moving only right or down."*

What's the state? **dp[i][j] = number of paths to reach cell (i,j).** Transition: dp[i][j] = dp[i-1][j] + dp[i][j-1].

> **Answer key:** All three use DP patterns from this course. The *state and transition* change — the pipeline does not.

---

## ⚠ Common Mistakes

1. **Wrong state definition** — If your state doesn't capture enough information, the transition can't be correct.
2. **Forgetting base cases** — dp[0] (and sometimes dp[1]) must be set before the loop starts.
3. **Wrong fill order** — If dp[i] depends on dp[i+1], you must fill right-to-left, not left-to-right.
4. **Off-by-one errors** — DP arrays are usually size n+1 to include the empty/zero case.
5. **Returning the wrong cell** — The answer might be dp[n], dp[n-1], max(dp), or dp[0][n-1] depending on the state definition.

---

## 🏋️ Mini Challenge

### Related LeetCode Practice

Pick one problem from today's pattern family and solve it on LeetCode without looking at the walkthrough.

**Before you code:** Define the state in one sentence. Write the transition formula. Identify the base case. Then code.

> 💡 **Hint:** Re-read the DP Pipeline from today's concept if stuck.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Longest String Chain #1048](https://leetcode.com/problems/longest-string-chain/) | Medium | Sort + Subsequence DP |
| [Out of Boundary Paths #576](https://leetcode.com/problems/out-of-boundary-paths/) | Medium | 3D State Grid DP |

---

*Day 25 complete! Tomorrow: the next level of your dynamic ascension. →*
