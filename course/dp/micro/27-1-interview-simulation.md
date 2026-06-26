<!-- hand-authored -->
# 📝 Interview Simulation

> **Day 27** · Interview Simulation · 20 XP · 15 min read

---

Day 27 is **speed pattern recognition under interview pressure**. Two problems that look like DP but reward knowing when **greedy beats tabulation** — and when **prefix min-cost with pass options** is the right model. Tomorrow (Day 30) brings **Final Ascension** — interval DP on matrices and balloons. Today trains the 60-second classification habit.

> **Preview (Day 27 → Day 30):** Today: **Jump Game II** (greedy layers) + **Minimum Cost for Tickets** (`dp[day]` with 3 pass types). Day 30: **Burst Balloons** interval `dp[i][j]`, **LIP in Matrix** DFS+memo — harder multi-pattern synthesis.

---

## Part 1 — Learn the Pattern

### 1. What is the pattern?

**Interview Simulation** — two flagship shapes:

**A. Jump Game II — greedy layers**
- **Goal** — minimum jumps to reach last index (always reachable)
- **Greedy** — track `curEnd` (end of current jump range) and `farthest` reachable
- When `i == curEnd`, increment jumps and extend `curEnd = farthest`
- **Why not DP?** O(n) greedy optimal — DP works but slower to code under pressure

**B. Minimum Cost for Tickets — `(day, passType)` min cost**
- **State** — `dp[d]` = min cost to cover all travel **through day d**
- **Transition** on travel days: min of 3 pass choices:
  - 1-day: `dp[d-1] + costs[0]`
  - 7-day: `dp[max(0,d-7)] + costs[1]`
  - 30-day: `dp[max(0,d-30)] + costs[2]`
- **Non-travel days** — `dp[d] = dp[d-1]` (cost unchanged)

### 2. Simple explanation

**Jump Game II:** Think in **layers**. From index 0, one jump reaches everything within `nums[0]`. That's your first " frontier." Walk indices in the current frontier while tracking the farthest next frontier. When you exhaust the current frontier, you've used one jump — start the next layer.

**Tickets:** Walk day by day up to `lastDay`. If you travel on day `d`, buy the cheapest pass that covers today — either pay for today only, or buy a 7/30-day pass that covers today and look back to the last uncovered day. Non-travel days inherit yesterday's cost.

### 3. Visual — Jump Game II greedy layers

```
nums = [2,3,1,1,4]

Index:  0  1  2  3  4
        2  3  1  1  4

Layer 0 (jump 1): from 0 reach ≤2 → indices 1,2
  curEnd=0, farthest=2
  i=1: farthest=max(3,1+3)=4
  i=2: i==curEnd → jumps=1, curEnd=4

Layer 1: i=3 still within curEnd=4
  i=3: i==curEnd? at i=3, not yet curEnd from layer logic...
  
Actually: i=0 curEnd=0 farthest=2
i=1 farthest=4
i=2 i==curEnd(2) jumps=1 curEnd=4
done at i=3? loop to n-2, jumps=1

Wait [2,3,1,1,4]: 
i=0: farthest=2
i=1: farthest=4
i=2: i==curEnd(2), jumps=1, curEnd=4
i=3: within range, done → 2 jumps? Let me recalc...

Standard: jumps=0, curEnd=0, farthest=0
i=0: farthest=2
i=1: farthest=4
i=2: i==curEnd(0)? curEnd starts 0...
Actually curEnd=0 at start, i=0 farthest=2
i=0==curEnd: jumps=1, curEnd=2
i=1: farthest=4
i=2: i==curEnd(2): jumps=2, curEnd=4
Answer: 2 jumps ✓
```

### 4. Visual — Ticket dp[day] pass types

```
days = [1,4,6,7,8,20], costs = [2,7,15]

dp[d] = min cost through day d

Day 1 (travel): dp[1]=min(dp[0]+2, dp[0]+7, dp[0]+15)=2
Day 4 (travel): dp[4]=min(dp[3]+2, dp[0]+7, dp[0]+15)=7  (7-day from day 0)
Day 6: min(9, 7, 7)=7  (7-day still covers)
...

Non-travel day 2: dp[2]=dp[1]=2
```

Three pass types = three look-back offsets (1, 7, 30).

### 5. Greedy vs DP decision (interview speed)

| Problem | DP works? | Faster interview choice | Why |
|---|---|---|---|
| Jump Game II | Yes O(n²) or O(n) | **Greedy layers O(n)** | One pass, no table |
| Min Cost Tickets | Yes `dp[day]` | **Prefix dp[day]** | Natural day dimension |
| Burst Balloons (#312) | Required | Interval dp | Day 30 |

### 6. The universal templates

```
// Jump Game II — greedy
jumps = curEnd = farthest = 0
for i in 0..n-2:
  farthest = max(farthest, i + nums[i])
  if i == curEnd:
    jumps++
    curEnd = farthest

// Minimum cost tickets
dp[0..lastDay] = 0
daySet = set(days)
for d in 1..lastDay:
  if d not in daySet: dp[d] = dp[d-1]
  else: dp[d] = min(dp[d-1]+c0, dp[max(0,d-7)]+c1, dp[max(0,d-30)]+c2)
```

### 7. Pattern signals & recognition clues

| When the problem says… | Think… |
|---|---|
| "minimum jumps" / "reach last index" | Greedy layers if always reachable |
| "jump range nums[i]" | farthest / curEnd |
| "travel days" / "pass" / "7-day" | dp[day] with look-back |
| "minimum cost for tickets" | 3-option min on travel days |

**Keywords:** `curEnd` · `farthest` · `dp[day]` · `pass type` · `daySet`

### 8. Common beginner mistakes

| Mistake | Fix |
|---|---|
| O(n²) DP for Jump II in interview | Greedy layers is O(n) and optimal |
| dp on travel-day index not calendar day | Loop 1..lastDay, skip non-travel |
| Forgetting non-travel inherit | `dp[d]=dp[d-1]` when d ∉ daySet |
| Wrong look-back for 7-day pass | `dp[max(0,d-7)]` not `dp[d-7]` without clamp |
| Jump when unreachable | Jump I different — II assumes reachable |

### 9. Recognition drill

Read this problem aloud:

> *"Minimum jumps to reach the last index. You can jump 1 to nums[i] steps."*

Before coding, say:

> *"Greedy layers: curEnd + farthest. When i==curEnd, jump++. O(n). Not BFS, not O(n²) DP."*

---

*Jump Game first. Quest 1: #45. →*
