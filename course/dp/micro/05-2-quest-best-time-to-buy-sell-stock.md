<!-- hand-authored -->
# ⚔ Quest: Best Time to Buy and Sell Stock

> **Day 5** · [Best Time to Buy and Sell Stock #121](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/) · Easy · 10 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Best Time to Buy and Sell Stock on LeetCode](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/)**

> ⚔ **Hunter's rule:** One buy, one sell, buy before sell. Trace `prices = [7,1,5,3,6,4]` — track **min price so far** and profit if you sold each day.

---

## The Problem

See the full problem statement on LeetCode: **[Best Time to Buy and Sell Stock #121](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

**Pattern:** Running Minimum DP — Day 5's first decision template.

**Hint 1:** You can't sell before you buy. When considering sell on day i, best buy is **minimum price in days 0..i-1** (or 0..i if buy same day before sell — here buy strictly earlier).

**Hint 2:** Maintain `minPrice` while scanning left-to-right. Candidate profit at day i: `prices[i] - minPrice`.

**Hint 3:** `maxProfit = max(maxProfit, prices[i] - minPrice)` after updating minPrice.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Running Minimum DP

**How to identify this from the problem statement:**
- One transaction only
- Maximize profit = sell - buy
- Must buy before sell — causal left-to-right scan

| Keyword / phrase | What it signals |
|---|---|
| "best time to buy and sell" | Track min buy, max diff |
| "at most one transaction" | O(n) scan — no state machine yet |
| Array of prices over time | Single pass |

**Why brute force fails:** O(n²) all pairs (buy i, sell j) — DP/decision pass is O(n).

**How a strong solver thinks before coding:**
1. *"minPrice = best buy opportunity so far."*
2. *"Each day: try selling today, update maxProfit."*
3. *"Then minPrice = min(minPrice, price)."*
4. *"Order: update min before profit? Either works if consistent — standard: min first, then profit check."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **All pairs (i,j) with i<j** | O(n²) |
| **Track max price only** | Wrong — need min **before** current |
| **Running min + max profit** | O(n) ✓ |

```
prices = [7, 1, 5, 3, 6, 4]

i=1: min=1, profit if sell=0
i=2: min=1, sell@5 → profit 4
i=4: min=1, sell@6 → profit 5  ← max

Buy day 1 (price 1), sell day 4 (price 6)
```

---

## 🔗 Same Pattern, Other Problems

| Problem | Decision |
|---|---|
| **Stock I #121** | running min buy |
| Stock II (later) | accumulate all gains |
| Max subarray (next quest) | extend vs reset (Kadane) |

---

## 📖 Walkthrough

**Full trace — prices = [2, 4, 1]**

```
minPrice=∞, maxProfit=0

p=2: min=2, profit=0
p=4: min=2, profit=4-2=2, max=2
p=1: min=1, profit=4-1=3? sell@1: 1-1=0, max stays 2

Answer: 2 (buy 2, sell 4) ✓
```

> 💡 **The insight:** `minPrice` **is** your compressed dp state — no array needed.

---

## Solution

### C++
```cpp
class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int minPrice = INT_MAX, maxProfit = 0;
        for (int p : prices) {
            minPrice = min(minPrice, p);
            maxProfit = max(maxProfit, p - minPrice);
        }
        return maxProfit;
    }
};
```

### Python
```python
class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        min_price = float('inf')
        max_profit = 0
        for p in prices:
            min_price = min(min_price, p)
            max_profit = max(max_profit, p - min_price)
        return max_profit
```

### Java
```java
class Solution {
    public int maxProfit(int[] prices) {
        int minPrice = Integer.MAX_VALUE, maxProfit = 0;
        for (int p : prices) {
            minPrice = Math.min(minPrice, p);
            maxProfit = Math.max(maxProfit, p - minPrice);
        }
        return maxProfit;
    }
}
```

**Complexity:** O(n) time · O(1) space
---

## 💭 What Should Have Clicked in Your Mind?

- **"One transaction"** → Running min, not full state machine.
- **"minPrice so far"** → Day 5 decision DP in O(1) space.
- **"Sell today - min buy"** → Optimal substructure each step.
- **"Not max price"** → Common trap — track min for buy side.

> 🎯 **Pattern Unlocked:** Running Minimum DP

---

*One quest down. Next: Kadane — extend the subarray or reset at i. →*
