<!-- hand-authored -->
# 📝 State Machine DP

> **Day 20** · State Machine DP · 25 XP · 15 min read

---

Day 5 (**E5 Stock I**) tracked one buy and one sell with a running minimum — a single scalar. Day 20 upgrades to **multiple transactions** with **rules**: cooldown day after sell, or fee per trade. You can't summarize with one number — you need **parallel states** at each day: what you're **allowed** to do next depends on whether you **hold**, just **sold**, or **rest** (cooldown).

> **Preview contrast (E5 vs Day 20):** E5 = `minPrice` + `maxProfit` — one pass, one transaction. Day 20 = **HOLD / SOLD / REST** (cooldown) or **cash / hold** (fee) — update all states each day. **This is the canonical state-machine visual for B-Rank.**

---

## Part 1 — Learn the Pattern

### 1. What is the pattern?

**State Machine DP** — at each time step, track **best profit in each trading state**; transitions follow problem rules.

**Branch A — Cooldown (#309):**
- **HOLD** — owning stock; can sell today
- **SOLD** — sold today; must cooldown tomorrow
- **REST** — not holding, can buy (includes cooldown days and idle days)

**Branch B — Transaction fee (#714):**
- **cash** — not holding, may buy
- **hold** — holding stock, may sell (pay fee on sell)

### 2. Simple explanation

Each day you ask three questions (cooldown version): *"Best profit if I must end today **holding**? **Just sold**? **Free to buy**?"* Transitions wire yesterday's states into today's — sell moves HOLD→SOLD, buy moves REST→HOLD, cooldown forces SOLD→REST.

E5 was simpler: *"Cheapest buy so far?"* — only one decision path. Cooldown adds **mandatory waiting** — greedy fails because selling early might block a better buy after rest.

### 3. Visual — HOLD / SOLD / REST state machine (cooldown)

```
          buy          sell
  ┌──────────────┐──────────────┐
  │              ▼              │
  │   ┌──────────────┐         │
  │   │    HOLD      │─── sell ─┘
  │   │  (own stock) │
  │   └──────────────┘
  │         ▲
  │   buy   │
  │         │
  ┌──────────────┐    cooldown   ┌──────────────┐
  │     REST     │◄──────────────│     SOLD     │
  │  (no stock)  │               │  (just sold) │
  │              │───── buy ────→│              │
  └──────────────┘               └──────────────┘

Per day i (price = p):
  HOLD[i] = max(HOLD[i-1],  REST[i-1] - p)    // keep holding or buy from rest
  SOLD[i] = HOLD[i-1] + p                        // sell yesterday's hold
  REST[i] = max(REST[i-1], SOLD[i-1])           // stay idle or finish cooldown

Answer: max(SOLD[n-1], REST[n-1])  // never end holding for max profit
Init day 0: HOLD=-p0, SOLD=0, REST=0
```

### 4. Visual — fee variant (two states)

```
  cash ←──────────────────┐
   │  buy (-p)             │ sell (+p - fee)
   ▼                       │
  hold ────────────────────┘

Per day:
  cash = max(cash, hold + p - fee)   // sell
  hold = max(hold, cash - p)         // buy

Answer: cash (end not holding)
Init: cash=0, hold=-p0
```

### 5. Templates

**Cooldown (3 states, O(1) space):**
```
hold = -prices[0], sold = 0, rest = 0
for i in 1..n-1:
  prevHold = hold
  hold = max(hold, rest - prices[i])
  rest = max(rest, sold)
  sold = prevHold + prices[i]
return max(sold, rest)
```

**Fee (2 states):**
```
cash = 0, hold = -prices[0]
for i in 1..n-1:
  cash = max(cash, hold + prices[i] - fee)
  hold = max(hold, cash - prices[i])   // note: use updated cash or prev — code uses sequential update
return cash
```

### 6. E5 Stock I vs Day 20 — side by side

| | **E5 Stock I** | **Day 20 Cooldown** | **Day 20 Fee** |
|---|---|---|---|
| Transactions | one | unlimited | unlimited |
| States | 2 scalars (min, profit) | **3** (hold,sold,rest) | **2** (cash,hold) |
| Constraint | buy before sell | 1-day cooldown after sell | fee on sell |
| Answer | maxProfit | max(sold, rest) | cash |
| Visual | running min | **state diagram above** | 2-state loop |

### 7. Pattern signals & recognition clues

| When the problem says… | Think… |
|---|---|
| "cooldown one day after sell" | HOLD/SOLD/REST |
| "transaction fee" | cash/hold, subtract fee on sell |
| "at most one transaction" | **E5** — not state machine |
| "at most k transactions" | Later rank — 2D by k |
| "hold stock end of day" | State tracks ownership |

**Keywords:** `hold sold rest` · `cash hold` · `state machine` · `cooldown` · `fee`

### 8. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Using E5 minPrice on cooldown | Cooldown needs **3 states** |
| Buying from SOLD same day | Must REST first — buy from REST only |
| Returning HOLD at end | End holding rarely optimal — max(sold, rest) or cash |
| Wrong order of same-day updates | Save `prevHold` before overwriting for SOLD |
| Applying knapsack table | Stock = **state machine**, not dp[i][w] |

### 9. Recognition drill

Read this problem aloud:

> *"Max profit, unlimited trades, must wait one day after each sell."*

Before coding, say:

> *"State machine: HOLD, SOLD, REST. Buy from REST, sell from HOLD, REST absorbs cooldown. max(sold, rest) at end."*

Read this one:

> *"Unlimited trades with fee per sell."*

Before coding, say:

> *"Two states cash/hold. Sell: cash=max(cash, hold+p-fee). Buy: hold=max(hold, cash-p). Return cash."*

---

*Draw the diagram before you code. First quest: cooldown #309. →*
