<!-- hand-authored -->
# 📝 The Final Ascension

> **Day 30** · The Final Ascension · 25 XP · 18 min read

---

Twenty-nine days. One decision tree. Today's concept is the **DP Pattern Decision Flowchart** — the capstone map that routes any new problem to the right template from Days 1–29. Today's quests are **matrix DFS memo** (#329 Longest Increasing Path) and **interval last-burst DP** (#312 Burst Balloons) — two capstone patterns that look unrelated until you run the tree.

This is not new theory. It is **Dynamic Legend synthesis**.

---

## Part 1 — The Capstone Pattern Decision Flowchart

### 1. The master flowchart

When a new DP problem lands, run this tree **before** coding:

```
                         NEW DP PROBLEM
                                │
              ┌─────────────────┴─────────────────┐
              │ Overlapping subproblems + optimal │
              │ substructure?                     │
              └─────────────────┬─────────────────┘
                           NO  │  YES
                                ↓
              ┌─────────────────────────────┐
              │ Greedy / two pointers /     │
              │ math — not DP (Days 0)      │
              └─────────────────────────────┘
                                │
                           YES ─┤
                                ↓
              ┌─────────────────────────────┐
              │ Input is a GRID / MATRIX?   │
              └─────────────┬───────────────┘
                       YES  │  NO
                            ↓
         ┌──────────────────┼──────────────────┐
         ↓                  ↓                  ↓
  ┌─────────────┐   ┌──────────────┐   ┌──────────────┐
  │ Path count  │   │ Min/max cost │   │ Side-length  │
  │ / unique    │   │ path sum     │   │ or DFS memo  │
  │ Days 7, 11  │   │ Days 8, 11   │   │ Days 28, 30  │
  └─────────────┘   └──────────────┘   │ #221, #329   │
         │                  │          └──────────────┘
         ↓                  ↓                  │
  ┌─────────────┐   ┌──────────────┐          │
  │ 3D state    │   │ Obstacles /  │          │
  │ (steps,k)   │   │ falling path │          │
  │ Day 25      │   │ Day 11       │          │
  └─────────────┘   └──────────────┘          │
                            │                  │
              (NO — sequence / array / string) ─┤
                                                ↓
              ┌─────────────────────────────┐
              │ TWO sequences / strings?    │
              └─────────────┬───────────────┘
                       YES  │  NO
                            ↓
         ┌──────────────────┼──────────────────┐
         ↓                  ↓                  ↓
  ┌─────────────┐   ┌──────────────┐   ┌──────────────┐
  │ LCS max     │   │ Edit / delete│   │ Count subseq │
  │ Day 13      │   │ Day 21, 23   │   │ Day 29 #115  │
  └─────────────┘   └──────────────┘   └──────────────┘
                            │
                       NO ──┤
                            ↓
              ┌─────────────────────────────┐
              │ "How many ways" / counting? │
              └─────────────┬───────────────┘
                       YES  │  NO
                            ↓
         ┌──────────────────┼──────────────────┐
         ↓                  ↓                  ↓
  ┌─────────────┐   ┌──────────────┐   ┌──────────────┐
  │ Decode /    │   │ Coin combos  │   │ Dice / FSM   │
  │ paths Day 7 │   │ Day 18, 22   │   │ Day 24       │
  └─────────────┘   └──────────────┘   └──────────────┘
                            │
                       NO ──┤
                            ↓
              ┌─────────────────────────────┐
              │ Capacity / subset / target? │
              └─────────────┬───────────────┘
                       YES  │  NO
                            ↓
         ┌──────────────────┼──────────────────┐
         ↓                  ↓                  ↓
  ┌─────────────┐   ┌──────────────┐   ┌──────────────┐
  │ 0/1 Knapsack│   │ Unbounded    │   │ Multi-dim    │
  │ Day 17      │   │ Day 18       │   │ Day 19       │
  └─────────────┘   └──────────────┘   └──────────────┘
                            │
                       NO ──┤
                            ↓
              ┌─────────────────────────────┐
              │ Buy/sell / stock / states?  │
              └─────────────┬───────────────┘
                       YES  │  NO
                            ↓
         ┌──────────────────┼──────────────────┐
         ↓                  ↓                  ↓
  ┌─────────────┐   ┌──────────────┐   ┌──────────────┐
  │ 1 txn Day 5 │   │ Cooldown/fee │   │ K txn        │
  │             │   │ Day 20       │   │ Day 29 #123  │
  └─────────────┘   └──────────────┘   └──────────────┘
                            │
                       NO ──┤
                            ↓
              ┌─────────────────────────────┐
              │ Palindrome / partition str? │
              └─────────────┬───────────────┘
                       YES  │  NO
                            ↓
         ┌──────────────────┼──────────────────┐
         ↓                  ↓                  ↓
  ┌─────────────┐   ┌──────────────┐   ┌──────────────┐
  │ Expand /    │   │ Word break   │   │ Min cuts     │
  │ LPS Day 14  │   │ Day 15       │   │ S-Test #132  │
  └─────────────┘   └──────────────┘   └──────────────┘
                            │
                       NO ──┤
                            ↓
              ┌─────────────────────────────┐
              │ Subsequence on ONE array?   │
              └─────────────┬───────────────┘
                       YES  │  NO
                            ↓
         ┌──────────────────┼──────────────────┐
         ↓                  ↓                  ↓
  ┌─────────────┐   ┌──────────────┐   ┌──────────────┐
  │ LIS Day 12  │   │ Take/skip    │   │ Wiggle /     │
  │             │   │ Day 6, 9     │   │ chain Day 16 │
  └─────────────┘   └──────────────┘   └──────────────┘
                            │
                       NO ──┤
                            ↓
              ┌─────────────────────────────┐
              │ Split array / interval?     │
              └─────────────┬───────────────┘
                       YES  │  NO
                            ↓
         ┌──────────────────┼──────────────────┐
         ↓                  ↓                  ↓
  ┌─────────────┐   ┌──────────────┐   ┌──────────────┐
  │ 1D partition│   │ Interval     │   │ Job schedule │
  │ Day 28 #1043│   │ burst Day 30 │   │ S-Test #1335 │
  └─────────────┘   │ #312         │   └──────────────┘
                    └──────────────┘
                            │
                       NO ──┤
                            ↓
              ┌─────────────────────────────┐
              │ Linear 1D — last resort     │
              │ Days 1–5, 10, 27            │
              │ (stairs, robber, Kadane)    │
              └─────────────────────────────┘
```

### 2. Route to the right day

| Problem shape | Reach for | Example days |
|---|---|---|
| Fibonacci / recurrence | Linear 1D | 1–2 |
| Memo vs tabulation | Pipeline | 2–3 |
| State definition drill | Framework | 4 |
| Running min / Kadane | Decision 1D | 5 |
| Take or skip adjacent | House Robber | 6 |
| Count ways / decode | Counting | 7 |
| Grid min-cost path | Cost optimization | 8 |
| Circular / dual state | Extended decision | 9 |
| Multi-choice per index | Integer break | 10 |
| Grid with obstacles | Grid foundations | 11 |
| LIS / increasing subseq | Subsequence | 12 |
| Two-string LCS | Two-sequence | 13 |
| Palindrome substring | Expand / interval | 14 |
| String partition | Word break | 15 |
| Wiggle / pair chain | Sequence variants | 16 |
| Subset sum / target | 0/1 Knapsack | 17 |
| Unlimited coins | Unbounded | 18 |
| Two constraints | Multi-dim knapsack | 19 |
| Stock cooldown/fee | State machine | 20 |
| Edit distance | String transform | 21 |
| Catalan / order counts | Structural | 22 |
| Interleaving / delete op | Advanced string | 23 |
| Dice / knight dialer | Counting FSM | 24 |
| 3D grid state | Multi-dimensional | 25 |
| Cross-pattern mix | Synthesis | 26 |
| Interview speed | Greedy+DP dual | 27 |
| Grid side-length / 1D partition | Advanced 2D | 28 |
| Distinct subseq / K stock | String + K-FSM | 29 |
| Matrix DFS memo / interval burst | **Capstone** | 30 |

### 3. Today's two capstone patterns

**Longest Increasing Path in a Matrix #329** — **grid DFS + memo**:

```
DAG property: only move to STRICTLY larger cells → no cycles
memo[i][j] = 1 + max DFS from increasing neighbors

for each cell (i,j):
  if memo[i][j]: return memo[i][j]
  best = 1
  for each neighbor with mat[ni][nj] > mat[i][j]:
    best = max(best, 1 + dfs(ni,nj))
  memo[i][j] = best

Answer = max over all starts (not corner-only — any cell can start)
Time O(m·n) — each cell computed once
```

Top-down memo, not bottom-up tabulation — the graph is implicit from value order.

**Burst Balloons #312** — **interval DP (last to burst)**:

```
Pad: a = [1] + nums + [1]
dp[i][j] = max coins bursting all balloons in (i,j) exclusive

For interval length 1..n:
  for i in 1..n-len+1, j = i+len-1:
    for k in i..j:  ← k is LAST balloon burst in (i,j)
      dp[i][j] = max(dp[i][j],
        dp[i][k-1] + dp[k+1][j] + a[i-1]*a[k]*a[j+1])

Answer = dp[1][n]
Key insight: pick LAST burst → left/right intervals independent
```

### 4. The Dynamic Legend workflow

Every S-Rank interview problem:

1. **State** — write `dp[...]` meaning in one sentence
2. **Route** — run the decision tree → name the day/pattern
3. **Trace** — fill one row/cell/interval on paper
4. **Code** — template first, edge cases second
5. **Prune** — can space drop to O(n) or O(1)?

> 💡 **The S-Rank skill:** Name the state first. Route through the tree second. Code third.

### 5. Full pack map — where you learned each branch

```
Days  1–5:  mental model + memo/tabulation + 1D decisions
Days  6–10: take/skip + counting + grid cost + circular + multi-option
Days 11–16: grid + LIS + LCS + palindrome + string partition + sequences
Days 17–22: knapsack family + state machine + edit + structural counting
Days 23–27: advanced string + counting FSM + 3D state + synthesis + speed
Days 28–29: grid side-length + 1D partition + distinct subseq + K stock
Days 30:    matrix DFS memo + interval burst + THIS decision tree
S-Test:     job partition #1335, parens #32, palindrome cuts #132
```

### 6. Common capstone mistakes

| Mistake | Pattern | Fix |
|---|---|---|
| LIP: BFS without increasing constraint | Day 30 | Only recurse to **strictly larger** neighbors |
| LIP: tabulate without topo order | Day 30 | DFS memo — DAG from value order |
| Burst: burst-first thinking | Day 30 | Think **last** balloon burst in interval |
| Burst: forget padding `[1,...nums,1]` | Day 30 | Boundary balloons multiply cost |
| Skip decision tree, guess template | All days | Route first — grid vs string vs interval |
| Use interval DP for #1043 | Day 28 vs 30 | #1043 is 1D prefix; #312 is interval |

### 7. Recognition drill — capstone edition

Read each problem. Route through the tree:

> *"Longest strictly increasing path in a matrix."*
>
> → **Grid DFS memo.** Day 30. `memo[i][j]` = 1 + max increasing neighbors.

> *"Maximum coins bursting balloons optimally."*
>
> → **Interval DP last-burst.** Day 30. `dp[i][j]`, split at k last burst.

> *"Minimum difficulty scheduling d job days."*
>
> → **2D partition DP.** S-Test #1335. `dp[day][job]` with segment max.

> *"Longest valid parentheses substring."*
>
> → **Linear dp[i] length.** S-Test #32. Extend on `()` and `)(` patterns.

> *"Minimum cuts to partition string into palindromes."*
>
> → **Linear partition + expand.** S-Test #132. `dp[i]` + center expansion.

---

*You have the full decision tree. Quest 1: Longest Increasing Path — DFS memo on the matrix DAG. →*
