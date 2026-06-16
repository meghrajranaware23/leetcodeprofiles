<!-- hand-authored -->
# ⚔ A-Rank Test — Problem 3

> [Stone Game #877](https://leetcode.com/problems/stone-game/) · Medium · 250 XP

---

You've completed your A-Rank training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Stone Game on LeetCode](https://leetcode.com/problems/stone-game/)**

> ⚔ **Hunter's rule:** **Game DP** — `dp[i][j]` = max score difference (Alice - Bob) on piles[i..j]. Alice picks left or right; opponent plays optimally.

---

## The Problem

See the full problem statement on LeetCode: **[Stone Game #877](https://leetcode.com/problems/stone-game/)**

---

## 💡 Hints

> 🎯 **What's being tested:** Interval game DP — same family as **Burst Balloons (Day 30)** interval structure, but **minimax** on ends not split-at-k.

`dp[i][j]` = best score difference current player can achieve from subarray `piles[i..j]`.

Transition: pick left → `piles[i] - dp[i+1][j]`. Pick right → `piles[j] - dp[i][j-1]`. Take max.

Base: `dp[i][i] = piles[i]`. Fill by increasing interval length.

Alice wins if `dp[0][n-1] > 0`. (Even n guarantees Alice win — but compute dp anyway.)

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Game DP (interval minimax)

**How to identify from the statement:**
- Two players, optimal play
- Pick from ends of array
- Score difference / who wins

**How a strong solver thinks before coding:**
1. *"dp[i][j] = score diff on piles[i..j]."*
2. *"My pick - opponent's best from remainder."*
3. *"Fill by length len=1..n."*
4. *"Return dp[0][n-1] > 0."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Simulate all games** | Exponential game tree |
| **Greedy pick larger end** | Opponent response matters |
| **1D dp[i] only** | Need interval — both ends matter |

**The insight:** Interval `dp[i][j]` with minimax transition — after I take `piles[i]`, opponent faces `dp[i+1][j]` from their view (negated in difference formulation).

---

## 🎯 Transfer to Unseen Problems

*"Stone Game II with k removals"* → same interval game dp with extra state. *"Predict the Winner"* → identical pattern.

---

<details>
<summary><strong>📖 Solution & Walkthrough</strong></summary>

Fill the DP table for the given example. Trace which cells each cell depends on. Then implement the transition.

### C++
```cpp
class Solution {
public:
    bool stoneGame(vector<int>& piles) {
        int n = piles.size();
        vector<vector<int>> dp(n, vector<int>(n, 0));
        for (int i = 0; i < n; i++) dp[i][i] = piles[i];
        for (int len = 2; len <= n; len++)
            for (int i = 0; i + len - 1 < n; i++) {
                int j = i + len - 1;
                dp[i][j] = max(piles[i] - dp[i + 1][j], piles[j] - dp[i][j - 1]);
            }
        return dp[0][n - 1] > 0;
    }
};
```

### Python
```python
class Solution:
    def stoneGame(self, piles: List[int]) -> bool:
        n = len(piles)
        dp = [[0] * n for _ in range(n)]
        for i in range(n):
            dp[i][i] = piles[i]
        for length in range(2, n + 1):
            for i in range(n - length + 1):
                j = i + length - 1
                dp[i][j] = max(piles[i] - dp[i + 1][j], piles[j] - dp[i][j - 1])
        return dp[0][n - 1] > 0
```

### Java
```java
class Solution {
    public boolean stoneGame(int[] piles) {
        int n = piles.length;
        int[][] dp = new int[n][n];
        for (int i = 0; i < n; i++) dp[i][i] = piles[i];
        for (int len = 2; len <= n; len++)
            for (int i = 0; i + len - 1 < n; i++) {
                int j = i + len - 1;
                dp[i][j] = Math.max(piles[i] - dp[i + 1][j], piles[j] - dp[i][j - 1]);
            }
        return dp[0][n - 1] > 0;
    }
}
```

**Complexity:** O(n²) time · O(n²) space

</details>

---

## 💭 What Should Have Clicked in Your Mind?

- **"Interval game dp[i][j]"** — both ends, optimal opponents.
- **"pick - dp[remainder]"** — minimax score difference.
- **"Fill by interval length"** — inner depends on smaller intervals.
- **"Game DP"** — A-Rank interval synthesis (#877).

---

*3 of 3 test problems. Continue to the next. →*

## Solution

### C++
```cpp
class Solution {
public:
    bool stoneGame(vector<int>& piles) {
        int n = piles.size();
        vector<vector<int>> dp(n, vector<int>(n, 0));
        for (int i = 0; i < n; i++) dp[i][i] = piles[i];
        for (int len = 2; len <= n; len++)
            for (int i = 0; i + len - 1 < n; i++) {
                int j = i + len - 1;
                dp[i][j] = max(piles[i] - dp[i + 1][j], piles[j] - dp[i][j - 1]);
            }
        return dp[0][n - 1] > 0;
    }
};
```

### Python
```python
class Solution:
    def stoneGame(self, piles: List[int]) -> bool:
        n = len(piles)
        dp = [[0] * n for _ in range(n)]
        for i in range(n):
            dp[i][i] = piles[i]
        for length in range(2, n + 1):
            for i in range(n - length + 1):
                j = i + length - 1
                dp[i][j] = max(piles[i] - dp[i + 1][j], piles[j] - dp[i][j - 1])
        return dp[0][n - 1] > 0
```

### Java
```java
class Solution {
    public boolean stoneGame(int[] piles) {
        int n = piles.length;
        int[][] dp = new int[n][n];
        for (int i = 0; i < n; i++) dp[i][i] = piles[i];
        for (int len = 2; len <= n; len++)
            for (int i = 0; i + len - 1 < n; i++) {
                int j = i + len - 1;
                dp[i][j] = Math.max(piles[i] - dp[i + 1][j], piles[j] - dp[i][j - 1]);
            }
        return dp[0][n - 1] > 0;
    }
}
```

**Complexity:** O(n²) time · O(n²) space
