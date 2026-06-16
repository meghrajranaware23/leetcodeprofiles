<!-- hand-authored -->
# ⚔ S-Rank Test — Problem 1

> [Minimum Difficulty of a Job Schedule #1335](https://leetcode.com/problems/minimum-difficulty-of-a-job-schedule/) · Hard · 300 XP

---

You've completed your S-Rank training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Minimum Difficulty of a Job Schedule on LeetCode](https://leetcode.com/problems/minimum-difficulty-of-a-job-schedule/)**

> ⚔ **Hunter's rule:** This is a rank test — treat it like real interview practice. Schedule `n` jobs into exactly `d` days; each day must be a **contiguous** segment; day cost = max difficulty in segment. Run the decision tree first.

---

## The Problem

See the full problem statement on LeetCode: **[Minimum Difficulty of a Job Schedule #1335](https://leetcode.com/problems/minimum-difficulty-of-a-job-schedule/)**

---

## 💡 Hints

> 🎯 **What's being tested:** **2D partition DP** — days × job prefix. Route: decision tree → "split array / interval" → multi-dimensional partition.

- `dp[i][j]` = min total difficulty scheduling first `j` jobs into `i` days
- Base: `dp[1][j]` = max difficulty of jobs `[0..j]` (one segment)
- Transition: last day ends at job `j`; try start `k`:
  `dp[i][j] = min(dp[i-1][k-1] + max(jobs[k..j]))`
- Impossible if `n < d` → return -1

**Pattern name before coding:** *2D job-schedule partition — segment max cost.*

Inner loop: track `mx` right-to-left as you extend the last day's segment.

---

## 🔍 Pattern Recognition Breakdown

**How to identify from the statement:**
- Partition contiguous jobs into **exactly d groups**
- Each group cost = **max** in segment (not sum)
- Minimize total → min DP, not max

**Day links:** Day 28 #1043 (1D partition max-sum) + day constraint dimension.

**How a strong solver thinks before coding:**
1. *"dp[day][jobEnd] — two dimensions."*
2. *"Last day segment ends at j — try all starts k."*
3. *"Running max as k moves left."*
4. *"Answer dp[d][n-1]."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Try all d-1 cut positions** | O(C(n,d)) — exponential without memo |
| **Greedy: equal-sized chunks** | Max per segment — chunk boundaries matter |
| **1D dp[i] only** | Loses day count — need `dp[day][j]` |
| **Forget n < d check** | Impossible case must return -1 |

---

## 🎯 Transfer to Unseen Problems

Same family: **partition array into k segments with segment aggregate cost** (max, sum, or custom).

Read the statement once. Define `dp[i][j]` in one sentence. If you can write the transition in under 60 seconds, you're ready.

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

- **"Exactly d contiguous segments"** → 2D partition DP.
- **"Segment cost = max"** → running max in inner k loop.
- **"n < d → -1"** — can't assign one job per day minimum.
- **"Day 28 cousin"** — partition lookback + day dimension.

---

*1 of 3 test problems. Continue to the next. →*

## Solution

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
