<!-- hand-authored -->
# ⚔ Quest: Best Time to Buy and Sell Stock with Transaction Fee

> **Day 20** · [Best Time to Buy and Sell Stock with Transaction Fee #714](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/) · Medium · 15 min · 35 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Best Time to Buy and Sell Stock with Transaction Fee on LeetCode](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/)**

> ⚔ **Hunter's rule:** Two states — **cash** (not holding) and **hold**. Fee applies on **sell**. Simpler than cooldown's three states.

---

## The Problem

See the full problem statement on LeetCode: **[Best Time to Buy and Sell Stock with Transaction Fee #714](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

**Pattern:** State Machine with Cost — **cash / hold**.

- `cash` — max profit ending today **not** holding stock
- `hold` — max profit ending today **holding** stock
- Sell: `cash = max(cash, hold + price - fee)`
- Buy: `hold = max(hold, cash - price)` — use cash **before** today's sell update, or equivalent sequential form in solution
- Init: `cash=0`, `hold=-prices[0]`
- Answer: `cash` (don't end holding)

No cooldown — can buy day after sell if profitable after fee.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** State Machine with Cost

**How to identify this from the problem statement:**
- Unlimited transactions
- Fixed **fee** charged per sell (or per transaction)
- Two-state machine suffices — no mandatory rest day

| Keyword / phrase | What it signals |
|---|---|
| "transaction fee" | Subtract on sell transition |
| "cooldown" | **#309** three states |
| "one transaction" | **E5** |
| "at most k" | Add transaction count dimension |

**Why brute force fails:** Exponential trade sequences — overlap on `(day, holding?)`.

**How a strong solver thinks before coding:**
1. *"cash and hold only."*
2. *"Fee on sell edge."*
3. *"Update cash then hold each day."*
4. *"Return cash."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **E5 single transaction** | Multiple trades needed |
| **Forget fee on sell** | Overstates profit |
| **Fee on buy and sell** | Read problem — usually sell only |
| **Three-state cooldown** | Overkill — no rest day required |

**The insight:** Fee is a **cost on the sell transition** — still a 2-state machine.

```
prices=[1,3,2,8,4,9], fee=2
Buy 1 sell 8 (profit 7-fee), buy 4 sell 9 (profit 5-fee) → total 8
```

---

## 🔗 Same Pattern, Other Problems

| Problem | Variant | Pattern |
|---|---|---|
| [Best Time to Buy and Sell Stock with Cooldown #309](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/) | Cooldown | HOLD/SOLD/REST |
| [Best Time to Buy and Sell Stock #121](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/) | One trade | E5 |
| [Maximum Subarray #53](https://leetcode.com/problems/maximum-subarray/) | Unrelated | Don't confuse |

---

## 📖 Walkthrough

**Example:** `prices = [1, 3, 2, 8, 4, 9]`, `fee = 2`

```
Init: cash=0, hold=-1

i=1 p=3: cash=max(0,-1+3-2)=1, hold=max(-1,0-3)=-3
i=2 p=2: cash=1, hold=max(-3,1-2)=-1
i=3 p=8: cash=max(1,-1+8-2)=5, hold=max(-1,1-8)=-7
i=4 p=4: cash=5, hold=max(-7,5-4)=1
i=5 p=9: cash=max(5,1+9-2)=8, hold=...

Answer cash=8 ✓
```

> 💡 **The insight:** Same state-machine muscle as cooldown — one fewer state, fee on sell edge.

---

## Solution

### C++
```cpp
class Solution {
public:
    int maxProfit(vector<int>& prices, int fee) {
        int cash = 0, hold = -prices[0];
        for (int i = 1; i < (int)prices.size(); i++) {
            cash = max(cash, hold + prices[i] - fee);
            hold = max(hold, cash - prices[i]);
        }
        return cash;
    }
};
```

### Python
```python
class Solution:
    def maxProfit(self, prices: List[int], fee: int) -> int:
        cash, hold = 0, -prices[0]
        for i in range(1, len(prices)):
            cash = max(cash, hold + prices[i] - fee)
            hold = max(hold, cash - prices[i])
        return cash
```

### Java
```java
class Solution {
    public int maxProfit(int[] prices, int fee) {
        int cash = 0, hold = -prices[0];
        for (int i = 1; i < prices.length; i++) {
            cash = Math.max(cash, hold + prices[i] - fee);
            hold = Math.max(hold, cash - prices[i]);
        }
        return cash;
    }
}
```

**Complexity:** O(n) time · O(1) space
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Fee → cheaper 2-state machine."** → cash/hold only.
- **"Subtract fee when selling."** → Transition cost.
- **"Return cash."** → Not holding at end.
- **"State Machine with Cost"** → Cooldown's cousin without REST.

If you used three states, ask whether a **mandatory wait** exists — here it doesn't.

> 🎯 **Pattern Unlocked:** State Machine with Cost

---

*Both quests complete. Head to the checkpoint. →*
