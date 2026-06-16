<!-- hand-authored -->
# ⚔ A-Rank Test — Problem 2

> [Champagne Tower #799](https://leetcode.com/problems/champagne-tower/) · Medium · 250 XP

---

You've completed your A-Rank training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Champagne Tower on LeetCode](https://leetcode.com/problems/champagne-tower/)**

> ⚔ **Hunter's rule:** **Pyramid flow DP** — `dp[r][g]` = champagne in glass (r,g). Overflow splits equally to `(r+1,g)` and `(r+1,g+1)`.

---

## The Problem

See the full problem statement on LeetCode: **[Champagne Tower #799](https://leetcode.com/problems/champagne-tower/)**

---

## 💡 Hints

> 🎯 **What's being tested:** Triangular grid flow — same family as grid DP but **top-down pour** with capacity 1.0 per glass.

Pour `poured` into top glass `dp[0][0]`. For each row `i`, if `dp[i][j] > 1.0`, overflow `(dp[i][j]-1)/2` goes to each child. Simulate through `query_row`.

Answer: `min(1.0, dp[query_row][query_glass])` — glass holds at most 1 unit.

**Pattern link:** Day 11 grid neighbors, but flow is **downward split** not path counting.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Pyramid Flow DP

**How to identify from the statement:**
- Triangular pyramid of glasses
- Liquid flows down, splits 50/50 when glass full (>1)
- Query amount at specific (row, glass)

**How a strong solver thinks before coding:**
1. *"dp[0][0] = poured."*
2. *"For row i, col j: overflow = (dp[i][j]-1)/2 if > 0."*
3. *"Children: dp[i+1][j] += overflow, dp[i+1][j+1] += overflow."*
4. *"Return min(1.0, dp[query_row][query_glass])."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Simulate each drop individually** | poured up to 10⁹ — need batch flow |
| **BFS per unit of champagne** | Absurdly slow |
| **Ignore 1.0 capacity cap** | Overcount at query glass |

**The insight:** Row-by-row flow DP propagates overflow in O(r²) where r = query_row (≤ 100). Each glass processed once per row.

---

## 🎯 Transfer to Unseen Problems

*"Liquid in triangular grid with split rules"* → same pyramid flow template. Capacity constraint per cell is the twist.

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

- **"Triangular grid flow"** — top-down, not path count.
- **"Overflow = (dp-1)/2"** — capacity 1.0 per glass.
- **"Split to two children"** — pyramid indexing.
- **"Pyramid flow DP"** — A-Rank grid variant (#799).

---

*2 of 3 test problems. Continue to the next. →*

## Solution

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
