<!-- hand-authored -->
# ⚔ Quest: Coin Change

> **Day 18** · [Coin Change #322](https://leetcode.com/problems/coin-change/) · Medium · 15 min · 35 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Coin Change on LeetCode](https://leetcode.com/problems/coin-change/)**

> ⚔ **Hunter's rule:** Unlimited coins = **forward** amount loop. Trace `coins=[1,2,5], amount=11` before coding.

---

## The Problem

See the full problem statement on LeetCode: **[Coin Change #322](https://leetcode.com/problems/coin-change/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

**Pattern:** Minimize Coin Count — **unbounded knapsack**.

- `dp[a]` = minimum coins to make amount `a`
- `dp[0] = 0`, rest initialize to `INF` (or `amount+1` sentinel)
- `for a in 1..amount: for c in coins: if c<=a: dp[a]=min(dp[a], dp[a-c]+1)`
- **Forward** on `a` — same spirit as Day 10 perfect squares
- Return `-1` if `dp[amount]` still infinite

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Minimize Coin Count

**How to identify this from the problem statement:**
- Unlimited use of each coin
- Minimize count (not ways)
- Amount outer loop is standard for min-coins

| Keyword / phrase | What it signals |
|---|---|
| "fewest coins" | Min DP, forward amount |
| "unlimited coins" | Unbounded — not Day 17 reverse |
| "amount cannot be made" | Return -1 |
| "number of combinations" | **Coin Change II** — different loop order |

**Why brute force fails:** Try all multisets of coins — exponential; overlapping subproblems on amount.

**How a strong solver thinks before coding:**
1. *"dp[0]=0."*
2. *"Amount 1..n outer, coins inner."*
3. *"dp[a-c] already optimal for smaller amount — add one coin."*
4. *"Check unreachable at end."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Greedy (largest coin first)** | Fails on coins [1,3,4], amount 6 |
| **BFS on amount** | Works but same DP idea |
| **Day 17 reverse loop** | Treats as 0/1 — wrong |
| **Try all subsets** | Exponential |

**The insight:** Optimal for amount `a` builds from optimal for `a-c` plus one coin — forward fill.

```
coins=[1,3,4], amount=6
Greedy: 4+1+1 = 3 coins
DP: 3+3 = 2 coins ✓
```

---

## 🔗 Same Pattern, Other Problems

| Problem | Variant | Pattern |
|---|---|---|
| [Perfect Squares #279](https://leetcode.com/problems/perfect-squares/) | Squares as coins | Day 10 bridge |
| [Coin Change II #518](https://leetcode.com/problems/coin-change-ii/) | Count combos | Coin outer |
| [Combination Sum IV #377](https://leetcode.com/problems/combination-sum-iv/) | Order matters | **Day 22** amount outer |

---

## 📖 Walkthrough

**Example:** `coins = [1, 2, 5]`, `amount = 11`

```
dp[0]=0
a=1: 1
a=2: 1 (2)
a=3: 2 (1+2)
a=5: 1 (5)
a=6: 2 (5+1)
a=10: 2 (5+5)
a=11: 3 (5+5+1)

Answer: 3
```

> 💡 **The insight:** Same recurrence as Day 10 — "items" are coin values, unlimited copies.

---

## Solution

### C++
```cpp
class Solution {
public:
    int coinChange(vector<int>& coins, int amount) {
        vector<int> dp(amount + 1, amount + 1);
        dp[0] = 0;
        for (int i = 1; i <= amount; i++)
            for (int c : coins)
                if (c <= i) dp[i] = min(dp[i], dp[i - c] + 1);
        return dp[amount] > amount ? -1 : dp[amount];
    }
};
```

### Python
```python
class Solution:
    def coinChange(self, coins: List[int], amount: int) -> int:
        dp = [float('inf')] * (amount + 1)
        dp[0] = 0
        for i in range(1, amount + 1):
            for c in coins:
                if c <= i:
                    dp[i] = min(dp[i], dp[i - c] + 1)
        return dp[amount] if dp[amount] != float('inf') else -1
```

### Java
```java
class Solution {
    public int coinChange(int[] coins, int amount) {
        int[] dp = new int[amount + 1];
        Arrays.fill(dp, amount + 1);
        dp[0] = 0;
        for (int i = 1; i <= amount; i++)
            for (int c : coins)
                if (c <= i) dp[i] = Math.min(dp[i], dp[i - c] + 1);
        return dp[amount] > amount ? -1 : dp[amount];
    }
}
```

**Complexity:** O(n · amount) time · O(amount) space
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Unlimited → forward a loop."** → Opposite of Day 17.
- **"dp[a-c]+1."** → One more coin of value c.
- **"INF sentinel."** → Detect impossible.
- **"Minimize Coin Count"** → Day 10 perfect squares cousin.

If you tried greedy first, that's fine — arbitrary denominations need DP.

> 🎯 **Pattern Unlocked:** Minimize Coin Count

---

*One quest down. Next: count combinations — watch loop order. →*
