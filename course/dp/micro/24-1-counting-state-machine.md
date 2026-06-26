<!-- hand-authored -->
# 📝 Counting & State Machine Mastery

> **Day 24** · Counting & State Machine Mastery · 20 XP · 15 min read

---

Day 22 counted **structures** (BSTs, combinations). Day 20 ran **state machines** on stocks. Day 24 merges both: **count ways under constraints** where the state tracks **progress toward a target** or **position on a graph**. Two shapes: dice rolls filling a sum table, and knight moves on a phone pad.

> **Preview contrast (Day 20 vs Day 24):** Day 20 stock = **max profit** across hold/sold/rest. Day 24 = **count paths** — sum transitions, often mod 10⁹+7.

---

## Part 1 — Learn the Pattern

### 1. What is the pattern?

**Counting & State Machine Mastery** — two flagship shapes:

**A. Dice / target sum (`dp[d][s]`)**
- **State** — after `d` dice rolled, how many ways to reach sum `s`?
- **Transition** — for each face `f` in 1..k: `ndp[s] += dp[s-f]`
- **Base** — `dp[0] = 1` (zero dice, sum zero = one way)

**B. Graph state machine (Knight Dialer)**
- **State** — `dp[digit]` = number of paths ending at that phone key after `t` moves
- **Transition** — from each digit, sum paths from all **valid predecessor** digits (mod 10⁹+7)
- **Base** — all 10 digits start with 1 path (length-1 sequences)

### 2. Simple explanation

**Dice:** Each die adds 1..k to your running sum. The table asks: *"How many distinct sequences of dice faces hit exactly this sum?"* Roll one die at a time — copy the previous row forward by each face value.

**Knight dialer:** The phone pad is a graph — not every digit connects to every other. A knight jump from `1` can only arrive from `6` or `8`. Each step, every digit's count = sum of counts from its legal predecessors.

### 3. Visual — Dice `dp[d][s]`

```
n=2 dice, k=6 faces, target=7

After 0 dice:  dp[0]=1
After 1 die:  dp[1..6] = 1 each  (one way per face)
After 2 dice:  dp[7] = dp[6]+dp[5]+dp[4]+dp[3]+dp[2]+dp[1]
              = 1+1+1+1+1+1 = 6 ways

      sum:  0  1  2  3  4  5  6  7
d=0:      1  0  0  0  0  0  0  0
d=1:      0  1  1  1  1  1  1  0
d=2:      0  0  1  2  3  4  5  6
                              ↑ answer
```

Same spirit as coin change counting — but dice have **bounded face values** 1..k.

### 4. Visual — Knight dialer mod-10 transitions

```
Phone pad (knight moves):

  1 ── 6 ── 7
  │    │    │
  4    0    8
  │    │    │
  3 ── 5* ── 9
       │
  (5 has no knight moves)

Predecessors of digit 1: {6, 8}
Predecessors of digit 4: {0, 3, 9}
Predecessors of 5: {} (dead end for incoming)

After t moves:
  dp_new[1] = dp_old[6] + dp_old[8]  (mod 1e9+7)
  dp_new[4] = dp_old[0] + dp_old[3] + dp_old[9]
  ...
  answer = sum(dp[0..9])
```

**10 states, fixed transition graph** — not a 2D grid.

### 5. Day 20 vs Day 24

| | **Day 20 — Stock FSM** | **Day 24 — Counting FSM** |
|---|---|---|
| Goal | Max profit | Count paths |
| Aggregation | max | sum (mod 10⁹+7) |
| States | hold / sold / rest | phone digits 0-9 |
| Quest | #309, #714 | #935, #1155 |
| Transition | buy/sell/cooldown | knight jump graph |

### 6. The universal templates

```
// Dice rolls to target
dp[0] = 1
for each die:
  ndp = zeros
  for s in 1..target:
    for f in 1..min(k, s):
      ndp[s] += dp[s - f]
  dp = ndp
return dp[target]

// Knight dialer
dp[d] = 1 for all digits
for step in 1..n-1:
  ndp[d] = sum(dp[prev] for prev in predecessors[d]) % MOD
return sum(dp) % MOD
```

### 7. Pattern signals & recognition clues

| When the problem says… | Think… |
|---|---|
| "number of dice rolls" / "target sum" | `dp[d][s]` counting |
| "k faces" / "n dice" | Bounded add 1..k per step |
| "knight move" / "phone pad" | Graph FSM, mod 10⁹+7 |
| "how many distinct phone numbers" | Sum over 10 digit-states |
| "mod 10^9+7" | Almost always counting DP |

**Keywords:** `dp[d][s]` · `ndp` · `predecessors` · `MOD` · `count ways`

### 8. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Using max instead of sum | Counting = add transitions |
| Forgetting mod on every add | Knight dialer overflows without `% MOD` |
| Wrong predecessor list for knight | Draw the pad — 5 is unreachable |
| Confusing dice with unbounded knapsack | Faces are 1..k, one die per iteration |
| Single 1D dp without rolling row | Need fresh `ndp` each die to avoid reuse |

### 9. Recognition drill

Read this problem aloud:

> *"Return the number of distinct phone numbers of length n a knight can dial."*

Before coding, say:

> *"10 digit states. dp[d] = paths ending at d. Each step: ndp[d] = sum of dp[predecessors]. Mod 1e9+7."*

---

*Dice first. Quest 1: Number of Dice Rolls with Target Sum. →*
