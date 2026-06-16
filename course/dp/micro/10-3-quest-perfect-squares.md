<!-- hand-authored -->
# ⚔ Quest: Perfect Squares

> **Day 10** · [Perfect Squares #279](https://leetcode.com/problems/perfect-squares/) · Medium · 15 min · 20 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Perfect Squares on LeetCode](https://leetcode.com/problems/perfect-squares/)**

> ⚔ **Hunter's rule:** For n=12, try peeling j² = 1, 4, 9 last. Each gives dp[remainder]+1 — pick **min**.

---

## The Problem

See the full problem statement on LeetCode: **[Perfect Squares #279](https://leetcode.com/problems/perfect-squares/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

**Pattern:** Day 10 **Minimization with Multiple Choices**.

- `dp[i]` = minimum number of perfect squares summing to `i`
- `dp[0] = 0`
- For each `i`, loop `j` while `j*j ≤ i`:
  - `dp[i] = min(dp[i], dp[i - j*j] + 1)`
- Answer: `dp[n]`

Lagrange four-square theorem guarantees an answer ≤ 4 — DP finds the minimum.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Minimization with Multiple Choices

**How to identify this from the problem statement:**
- Represent `n` as sum of squares — **how few** terms
- Unlimited reuse of same square (4+4+4)
- Classic inner loop over `j` with j² ≤ i

| Keyword / phrase | What it signals |
|---|---|
| "least number of perfect square numbers" | min DP |
| "sum to n" | subtract j², 1 + dp[rest] |
| "break integer max product" | **Integer Break** — max, not min |

**Why inner loop:** Many square sizes can be the "last layer" — try all.

**How a strong solver thinks before coding:**
1. *"dp[0]=0."*
2. *"dp[i] starts INF."*
3. *"For j=1; j*j<=i: relax min."*
4. *"Return dp[n]."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Try all combinations of squares** | Exponential |
| **Greedy: always take largest square** | Fails — e.g. 12 = 4+4+4 not 9+1+1+1 |
| **Only check if sqrt is integer** | Need **sum** of squares, not one square |
| **Max instead of min** | Wrong objective |

**The insight brute force misses:** Order doesn't matter — only remaining sum after peeling j².

```
n=12: dp[12]=3 via 4+4+4
Greedy largest-first 9+1+1+1 → 4 terms — not minimal
```

---

## 🔗 Same Pattern, Other Problems

| Problem | Peel / choice | Aggregate |
|---|---|---|
| [Coin Change #322](https://leetcode.com/problems/coin-change/) | coin value | min |
| [Integer Break #343](https://leetcode.com/problems/integer-break/) | split j | max |
| [Perfect Squares #279](https://leetcode.com/problems/perfect-squares/) | j² | min |

---

## 📖 Walkthrough

**Example:** `n = 13`

```
dp[0]=0
dp[1]=1 (1)
dp[4]=1 (4)
dp[9]=1 (9)
dp[13]=min(
  dp[12]+1 = 3+1 = 4,
  dp[9]+1  = 1+1 = 2,
  dp[4]+1  = 1+1 = 2
) → 2  (9+4)
```

> 💡 **The insight:** Each square peel is one multi-option — same skeleton as Integer Break but **min** and j² steps.

---

## Solution

### C++
```cpp
class Solution {
public:
    int numSquares(int n) {
        vector<int> dp(n + 1, INT_MAX);
        dp[0] = 0;
        for (int i = 1; i <= n; i++)
            for (int j = 1; j * j <= i; j++)
                dp[i] = min(dp[i], dp[i - j * j] + 1);
        return dp[n];
    }
};
```

### Python
```python
class Solution:
    def numSquares(self, n: int) -> int:
        dp = [float('inf')] * (n + 1)
        dp[0] = 0
        for i in range(1, n + 1):
            j = 1
            while j * j <= i:
                dp[i] = min(dp[i], dp[i - j * j] + 1)
                j += 1
        return dp[n]
```

### Java
```java
class Solution {
    public int numSquares(int n) {
        int[] dp = new int[n + 1];
        Arrays.fill(dp, Integer.MAX_VALUE);
        dp[0] = 0;
        for (int i = 1; i <= n; i++)
            for (int j = 1; j * j <= i; j++)
                dp[i] = Math.min(dp[i], dp[i - j * j] + 1);
        return dp[n];
    }
}
```

**Complexity:** O(n · √n) time · O(n) space
---

## 💭 What Should Have Clicked in Your Mind?

- **"Fewest squares summing to n"** → min DP + inner j.
- **"j*j <= i"** — only valid square peels.
- **"dp[0]=0"** — zero needs zero squares.
- **"Contrast Integer Break"** — max splits vs min square layers.

> 🎯 **Pattern Unlocked:** Minimization with Multiple Choices

---

*Both quests complete. Head to the checkpoint. →*
