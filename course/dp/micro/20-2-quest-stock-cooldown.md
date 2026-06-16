<!-- hand-authored -->
# ⚔ Quest: Best Time to Buy and Sell Stock with Cooldown

> **Day 20** · [Best Time to Buy and Sell Stock with Cooldown #309](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/) · Medium · 15 min · 35 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Best Time to Buy and Sell Stock with Cooldown on LeetCode](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/)**

> ⚔ **Hunter's rule:** Draw **HOLD → SOLD → REST → buy** before coding. E5's one-pass min won't work here.

---

## The Problem

See the full problem statement on LeetCode: **[Best Time to Buy and Sell Stock with Cooldown #309](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

**Pattern:** State Machine DP — **HOLD / SOLD / REST**.

- **HOLD** — best profit ending today **owning** stock
- **SOLD** — best profit ending today **just sold**
- **REST** — best profit ending today **not holding**, free to buy tomorrow

Transitions at price `p`:
- `hold = max(hold, rest - p)` — keep or buy from rest only
- `sold = prevHold + p` — sell what you held yesterday
- `rest = max(rest, sold)` — stay idle or enter rest after sell

Init: `hold=-prices[0]`, `sold=0`, `rest=0`. Answer: `max(sold, rest)`.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** State Machine DP

**How to identify this from the problem statement:**
- Unlimited transactions allowed
- **Mandatory cooldown** day after sell
- Maximize profit — not counting transactions

| Keyword / phrase | What it signals |
|---|---|
| "cooldown" / "cannot buy next day" | SOLD → REST before buy |
| "multiple transactions" | Not E5 single trade |
| "fee per transaction" | **#714** two-state variant |
| "at most k transactions" | Later — add dimension |

**Why brute force fails:** Exponential day-by-day buy/sell/skip choices — overlap on `(day, state)`.

**How a strong solver thinks before coding:**
1. *"Three states — diagram on paper."*
2. *"Buy only from REST."*
3. *"Save prevHold before updating hold."*
4. *"Never answer with hold."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **E5 running minimum** | Ignores cooldown — may buy day after sell |
| **Greedy local max** | Cooldown blocks future buys |
| **Knapsack dp[i][w]** | Wrong pattern family |
| **Buy from SOLD** | Violates cooldown rule |

**The insight:** Profit depends on **legal state**, not just price history.

```
prices = [1,2,0,3]
Buy@1, sell@2, rest, buy@0, sell@3 → profit 4
Trying E5-style misses cooldown gap
```

---

## 🔗 Same Pattern, Other Problems

| Problem | Variant | Pattern |
|---|---|---|
| [Best Time to Buy and Sell Stock #121](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/) | One trade | **E5** bridge |
| [Best Time to Buy and Sell Stock with Transaction Fee #714](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/) | Fee | Today's second quest |
| [Best Time to Buy and Sell Stock III #123](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/) | ≤2 trades | 2D state machine |

---

## 📖 Walkthrough

**Example:** `prices = [1, 2, 3, 0, 2]`

```
Day0 p=1: hold=-1, sold=0, rest=0
Day1 p=2: sold=1 (sell), hold=-1, rest=1
Day2 p=3: sold=2, hold=max(-1,1-3)=-1, rest=2
Day3 p=0: rest=2, hold=max(-1,2-0)=2, sold=-1+0=-1? prevHold was -1 → sold=-1
  Recalc carefully with code order:
  prevHold=-1 → sold=(-1)+3=2 at day2... trace with algorithm:

i=1: prevH=-1, hold=max(-1,0-2)=-1, rest=1, sold=-1+2=1
i=2: prevH=-1, hold=max(-1,1-3)=-1, rest=2, sold=2
i=3: prevH=-1, hold=max(-1,2-0)=2, rest=2, sold=-1
i=4: prevH=2, hold=2, rest=2, sold=2+2=4

Answer max(4,2)=4 ✓
```

> 💡 **The insight:** State machine replaces E5 when **rules between trades** matter.

---

## Solution

### C++
```cpp
class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int hold = -prices[0], sold = 0, rest = 0;
        for (int i = 1; i < (int)prices.size(); i++) {
            int prevHold = hold;
            hold = max(hold, rest - prices[i]);
            rest = max(rest, sold);
            sold = prevHold + prices[i];
        }
        return max(sold, rest);
    }
};
```

### Python
```python
class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        hold, sold, rest = -prices[0], 0, 0
        for i in range(1, len(prices)):
            prev_hold = hold
            hold = max(hold, rest - prices[i])
            rest = max(rest, sold)
            sold = prev_hold + prices[i]
        return max(sold, rest)
```

### Java
```java
class Solution {
    public int maxProfit(int[] prices) {
        int hold = -prices[0], sold = 0, rest = 0;
        for (int i = 1; i < prices.length; i++) {
            int prevHold = hold;
            hold = Math.max(hold, rest - prices[i]);
            rest = Math.max(rest, sold);
            sold = prevHold + prices[i];
        }
        return Math.max(sold, rest);
    }
}
```

**Complexity:** O(n) time · O(1) space
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Cooldown → three states."** → Diagram first.
- **"Buy from REST only."** → Not from SOLD.
- **"prevHold for sold."** → Order of updates matters.
- **"State Machine DP"** → Bridge from E5 when rules grow.

If you reused Stock I, the breakthrough is naming **which state** you end each day in.

> 🎯 **Pattern Unlocked:** State Machine DP

---

*One quest down. Next: two-state fee variant. →*
