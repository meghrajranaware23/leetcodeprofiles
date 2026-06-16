<!-- hand-authored -->
# ⚔ Quest: Best Time to Buy and Sell Stock III

> **Day 29** · [Best Time to Buy and Sell Stock III #123](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/) · Hard · 25 min · 60 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Best Time to Buy and Sell Stock III on LeetCode](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/)**

> ⚔ **Hunter's rule:** Draw four states: **buy1, sell1, buy2, sell2**. Process each price left-to-right. Second buy uses profit from first sell: `buy2 = min(buy2, p - sell1)`.

---

## The Problem

See the full problem statement on LeetCode: **[Best Time to Buy and Sell Stock III #123](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

**Pattern:** **K-Transaction State Machine** with K=2.

Four scalars (O(1) space):
- `buy1` — min cost after first purchase
- `sell1` — max profit after first complete transaction
- `buy2` — min effective cost for second hold (`price - sell1`)
- `sell2` — max profit after second transaction → **answer**

Update order each day: buy1 → sell1 → buy2 → sell2.

Day 20 bridge: same machine as cooldown/fee, but K=2 adds the second pair.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** K-Transaction State Machine (K=2)

| Keyword / phrase | What it signals |
|---|---|
| "at most two transactions" | K=2 → four states |
| "buy and sell stock" | State machine, not array dp |
| "maximum profit" | max over sell2 |

**How a strong solver thinks before coding:**
1. *"One transaction = buy1/sell1 (Day 5)."*
2. *"Second round reinvests sell1 profit."*
3. *"buy2 tracks p - sell1, not raw p."*
4. *"Return sell2 after all days."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Try all buy/sell quadruples** | O(n⁴) — unnecessary |
| **Single buy1/sell1 only** | Misses second transaction |
| **2D dp[day][k] without optimization** | Works but O(nK) space — four scalars suffice |
| **`buy2 = min(buy2, p)` ignoring sell1** | Second buy must account for first profit |

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Stock IV #188](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/) | General K | K pairs of buy/sell |
| [Stock with Cooldown #309](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/) | Cooldown state | Day 20 machine |
| [Stock with Fee #714](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/) | Fee on sell | Day 20 variant |

---

## 📖 Walkthrough

**prices = [3,3,5,0,0,3,1,4]**

```
Init: buy1=buy2=∞, sell1=sell2=0

p=3: buy1=3, sell1=0, buy2=3, sell2=0
p=5: buy1=3, sell1=2, buy2=3, sell2=2
p=0: buy1=0, sell1=2, buy2=-2, sell2=2
...
p=4: sell2=6

Answer = 6  (buy@0 sell@3, buy@1 sell@4)
```

> 💡 **The insight:** Four variables encode entire K=2 history — no 2D table needed.

---

## Solution

### C++
```cpp
class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int buy1 = INT_MAX, buy2 = INT_MAX;
        int sell1 = 0, sell2 = 0;
        for (int p : prices) {
            buy1 = min(buy1, p);
            sell1 = max(sell1, p - buy1);
            buy2 = min(buy2, p - sell1);
            sell2 = max(sell2, p - buy2);
        }
        return sell2;
    }
};
```

### Python
```python
class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        buy1 = buy2 = float('inf')
        sell1 = sell2 = 0
        for p in prices:
            buy1 = min(buy1, p)
            sell1 = max(sell1, p - buy1)
            buy2 = min(buy2, p - sell1)
            sell2 = max(sell2, p - buy2)
        return sell2
```

### Java
```java
class Solution {
    public int maxProfit(int[] prices) {
        int buy1 = Integer.MAX_VALUE, buy2 = Integer.MAX_VALUE;
        int sell1 = 0, sell2 = 0;
        for (int p : prices) {
            buy1 = Math.min(buy1, p);
            sell1 = Math.max(sell1, p - buy1);
            buy2 = Math.min(buy2, p - sell1);
            sell2 = Math.max(sell2, p - buy2);
        }
        return sell2;
    }
}
```

**Complexity:** O(n) time · O(1) space
---

## 💭 What Should Have Clicked in Your Mind?

- **"Four states, one pass"** — K=2 collapsed to scalars.
- **"buy2 uses sell1"** — second buy is net of first profit.
- **"sell2 is answer"** — best after ≤2 complete trades.
- **"K-Transaction State Machine"** — Day 20 extended.

> 🎯 **Pattern Unlocked:** K-Transaction State Machine — Stock III

---

*Both quests complete. Head to the checkpoint. →*
