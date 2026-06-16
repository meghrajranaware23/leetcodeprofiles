<!-- hand-authored -->
# 📝 Unbounded Knapsack

> **Day 18** · Unbounded Knapsack · ★★★★☆ · 25 XP · 15 min read

---

Day 17: each item **once**, inner loop **backwards**. Day 18 flips the rule — **unlimited copies** of each coin/denomination. The loop direction flips too: for amount `a`, you may add another coin of value `c`, so read **`dp[a - c]`** already updated this round → iterate **`a` forward**. Same table shape as Day 10 perfect squares; different "items."

> **Preview contrast (Day 17 vs Day 18):** Day 17 = **0/1**, `j` **down** (don't reuse item). Day 18 = **unbounded**, `j` **up** (reuse allowed). Day 10 = min count with squares `{1,4,9,...}` — same forward loop as coin change.

---

## Part 1 — Learn the Pattern

### 1. What is the pattern?

**Unbounded Knapsack / Coin DP** — unlimited supply of each choice; optimize or count ways to reach amount `a`.

- **State** — `dp[a]` = min coins / max ways / best value to make amount `a`
- **Transition (min coins)** — `dp[a] = min(dp[a], dp[a-c] + 1)` for each coin `c ≤ a`
- **Transition (count combos)** — outer loop **coins**, inner **a forward**: `dp[a] += dp[a-c]` (order avoids permutations double-count in #518)
- **0/1 vs unbounded** — only the **inner loop direction** and **outer loop order** change

### 2. Simple explanation

Building amount `a` penny by penny: *"What's the best way to make `a` if I just used coin `c`?"* Look at **`dp[a-c]`** — which already includes any number of coins. Forward fill means `dp[a-c]` may have used another `c` this pass — that's unlimited supply.

Day 10 asked: *"Fewest perfect squares summing to n."* Squares `{1,4,9,...}` are unlimited "coins" — identical forward min loop.

### 3. Visual — forward loop (unbounded coin change)

```
coins = [1, 2, 5], amount = 5

dp[a] = min coins to make amount a

Init: dp[0]=0, dp[1..5]=INF

for a = 1..5:
  for c in coins:
    if c <= a: dp[a] = min(dp[a], dp[a-c]+1)

Trace:
  a=1: dp[1]=1
  a=2: dp[2]=1 (two 1s) or dp[1]+1=2 from coin 2 → 1
  a=3: dp[3]=2 (1+2)
  a=4: dp[4]=2 (2+2)
  a=5: dp[5]=1 (5) beats dp[4]+1=3, dp[3]+1=3 → 1

Answer: 1 coin
```

### 4. Visual — Day 17 vs Day 18 loop direction

```
Same dp[0..W], processing one "item type":

0/1 (Day 17):          Unbounded (Day 18):
for w = W down to wt     for a = wt up to W
  dp[w] = max(...,         dp[a] = min(...,
    dp[w-wt]+val)            dp[a-wt]+1)
       ↑                          ↑
  dp[w-wt] is OLD row        dp[a-wt] may include
  (item not reused)          same item again
```

### 5. Templates

**Min coins (amount outer — #322 style):**
```
dp[0]=0, rest INF
for a in 1..amount:
  for c in coins:
    if c<=a: dp[a]=min(dp[a], dp[a-c]+1)
return dp[amount] if finite else -1
```

**Count combinations (coin outer — #518 style):**
```
dp[0]=1
for c in coins:
  for a in c..amount:
    dp[a] += dp[a-c]
return dp[amount]
```

**Perfect squares bridge (Day 10):**
```
for i in 1..n:
  for s in 1..sqrt(i):
    dp[i] = min(dp[i], dp[i-s*s]+1)
```

### 6. Day 17 vs Day 18 vs Day 10

| | **Day 17 0/1** | **Day 18 Unbounded** | **Day 10 Squares** |
|---|---|---|---|
| Reuse | once | unlimited | unlimited |
| Loop | j **down** | a **up** | i **up** |
| Typical goal | max / bool / count | min coins / count combos | min count |
| Items | array nums | coin denominations | s² for s=1..√i |

### 7. Pattern signals & recognition clues

| When the problem says… | Think… |
|---|---|
| "minimum coins" / "fewest" | Forward min on amount |
| "unlimited supply" / "infinite coins" | Unbounded — not reverse |
| "how many **combinations**" | Coin outer, amount inner forward |
| "each item once" | **Day 17** reverse |
| "perfect squares sum to n" | **Day 10** — same forward min |

**Keywords:** `forward loop` · `dp[a-c]` · `unlimited` · `coin outer` · `combinations not permutations`

### 8. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Reverse loop from Day 17 | Unlimited needs **forward** |
| Coin Change II: amount outer first | **Coin outer** for combinations |
| Counting permutations in #518 | Order of loops matters — coin then amount |
| Using 0/1 for "any number of coins" | Classic unbounded sign |
| Greedy on arbitrary coins | Fails — need DP |

### 9. Recognition drill

Read this problem aloud:

> *"Fewest coins to make amount n; unlimited of each denomination."*

Before coding, say:

> *"Unbounded min: dp[a]=min(dp[a], dp[a-c]+1), a forward 1..n. Not reverse — that's 0/1."*

Read this one:

> *"Count combinations of coins summing to amount."*

Before coding, say:

> *"Coin outer, amount inner forward, dp[a]+=dp[a-c]. Combinations — order of loops."*

---

*Loop direction is the whole game. First quest: minimum coin count. →*
