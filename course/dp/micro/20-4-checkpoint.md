<!-- hand-authored -->
# ✅ Day 20 Checkpoint

> **State Machine DP** · 2 quests completed · ⭐ 120 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Day 20 = **multiple trading states** per day. Not knapsack. Bridge from **E5 Stock I**.

| When you see... | Think... | Why |
|---|---|---|
| "cooldown after sell" | HOLD / SOLD / REST | Buy from REST only |
| "transaction fee" | cash / hold, fee on sell | Two states |
| "one transaction max" | **E5** minPrice scan | Not state machine |
| "subset sum / coins" | **Days 17–18** | Wrong family |
| "unlimited trades, no extra rules" | Greedy or simple 2-state | Fee=0 → still use cash/hold |

### 🧠 Quick Recognition Test

1. *"Sell, then must skip one day before buy"* → **3 states**, `max(sold, rest)`.
2. *"Pay $2 fee every sell, unlimited trades"* → **cash/hold**, `- fee` on sell.
3. *"One buy, one sell max profit"* → **E5** running min — not Day 20.
4. *"At most 2 transactions"* → Add transaction count (later rank).

---

## 🎯 Transfer to Unseen Problems

**Scenario 1:** *"Stock with cooldown — can you draw the transition diagram?"*

What's the state? **HOLD, SOLD, REST.** Buy from REST, sell from HOLD, SOLD→REST mandatory.

**Scenario 2:** *"Stock with $5 fee per sell, unlimited trades."*

What's the state? **cash, hold.** `cash = max(cash, hold+p-fee)`, `hold = max(hold, cash-p)`.

**Scenario 3:** *"Best single buy-sell pair."*

What's the state? **E5:** track `minPrice`, update `maxProfit` — no parallel states.

> **Answer key:** Extra **rules between trades** → state machine. **One trade only** → E5.

---

## ⚠ Common Mistakes

1. **E5 on cooldown problem** — Must respect REST day.
2. **Buy from SOLD** — Illegal in #309; buy from REST.
3. **Return hold at end** — Use `max(sold, rest)` or `cash`.
4. **Forgetting prevHold** — SOLD uses yesterday's hold before overwrite.
5. **Knapsack table for stock** — State machine, not dp[i][w].

---

## 🏋️ Mini Challenge

Draw HOLD/SOLD/REST arrows from memory. Label each edge with the price update. Then draw cash/hold for fee variant.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Best Time to Buy and Sell Stock with Cooldown #309](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/) | Medium | State Machine DP |
| [Best Time to Buy and Sell Stock with Transaction Fee #714](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/) | Medium | State Machine with Cost |

---

*Day 20 complete! Tomorrow: string transformation — edit distance grid. →*
