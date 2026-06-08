# 📝 Greedy on Arrays

> **Day 16** · Greedy Choice + Proof Sketches · ★★★★☆ · 12 min read

---

You've been making greedy moves all along — Day 6's Container With Most Water moves the shorter line; D-Rank's Boats to Save People pairs lightest with heaviest. Today you name the pattern: at each step, take the **locally optimal** choice and prove (or trust) it leads to the global optimum.

---

## Part 1 — Learn the Pattern

### 1. What is greedy?

A **greedy algorithm** builds a solution step by step, always picking the choice that looks best **right now** — without reconsidering past decisions.

```
Greedy template:

answer = initial value
for each decision point:
    make the locally best choice
    update answer
return answer
```

Unlike brute force (try all options) or dynamic programming (remember all subproblems), greedy commits immediately. It only works when the **greedy choice property** holds: a locally optimal choice is always part of some globally optimal solution.

### 2. You've already been greedy

| Problem | Greedy move | Why it works |
|---|---|---|
| **Container With Most Water** (Day 6) | Move the shorter pointer inward | Keeping the shorter side while width shrinks can't beat current area |
| **Boats to Save People** (D-Rank Test) | Pair lightest + heaviest when sum ≤ limit | Saving a boat by pairing is always safe; heavy alone if no pair fits |
| **Meeting Rooms II** (Day 15) | Reuse room with earliest end time | Frees capacity as early as possible — never wastes a room |

Greedy isn't new — today you learn to **recognize** it and **sketch proofs**.

### 3. Greedy proof sketch — the exchange argument

When an interviewer (or you) asks *"Why is greedy correct?"*, use an **exchange argument**:

1. Assume an optimal solution `OPT` differs from your greedy choice at some step.
2. Show you can **exchange** part of `OPT` to match the greedy choice without making the result worse.
3. Repeat until `OPT` equals the greedy solution → greedy is optimal.

**Example — Boats to Save People:**

> Greedy pairs lightest `L` with heaviest `H` when `L + H ≤ limit`.
>
> Suppose `OPT` sends `H` alone but greedy pairs `L + H`.
> Swapping: `OPT` used one boat for `H`. Greedy uses one boat for `(L, H)`.
> `L` still needs a boat in `OPT` — that boat is now free.
> Same or fewer boats → greedy is at least as good.

You don't need a formal proof on LeetCode — but sketching this builds confidence to commit to the greedy move.

### 4. Greedy proof sketch — the "can't do better" argument

Some problems show that **any** solution must satisfy a bound, and greedy achieves it:

**Example — Jump Game (#55):**

> Track `farthest` — the maximum index reachable so far.
> If `farthest >= i` at every step, you can reach index `i`.
> Updating `farthest = max(farthest, i + nums[i])` is the best any algorithm can do at step `i` — you can't reach beyond your best jump from a reachable position.

Greedy records the **frontier** of what's achievable. If the frontier ever falls behind the current index, you're stuck.

### 5. When greedy works on arrays — signal checklist

| Signal | Greedy instinct |
|---|---|
| "minimum number of X" with pairing/covering | Pair or cover greedily (Boats, arrows) |
| "can you reach end?" / "maximum reachable" | Track farthest reachable index |
| "minimum jumps to reach end" | Greedy: jump from current range edge |
| sorted or sortable input | Sort first (Day 14), then greedy scan |
| "pick locally best, never backtrack" | Greedy candidate — try exchange argument |

**Keywords:** `minimum` · `maximum reachable` · `can reach` · `minimum jumps` · `without backtracking` · `always pick`

### 6. Greedy vs other patterns

| Pattern | When to use | Backtracks? |
|---|---|---|
| **Greedy** | Local best → global best (provable) | No |
| **Two pointers** | Sorted pair search, window boundaries | Pointers only move forward |
| **DP** | Optimal substructure with overlapping subproblems | Remembers past states |
| **Brute force** | Small n, need to explore all choices | Yes |

If you can justify "this local choice is safe," greedy. If you need "best of all previous options," DP.

### 7. Small visual example — farthest reachable

```
nums = [2, 3, 1, 1, 4]   (max jump from each index)

i=0: farthest = max(0, 0+2) = 2   → can reach index 1, 2
i=1: 1 <= 2 ✓  farthest = max(2, 1+3) = 4  → can reach index 4
i=2: 2 <= 4 ✓  farthest = max(4, 2+1) = 4
i=3: 3 <= 4 ✓  farthest = max(4, 3+1) = 4
i=4: 4 <= 4 ✓  reached last index

Return true ✓
```

```
nums = [3, 2, 1, 0, 4]

i=0: farthest = 3
i=1: 1 <= 3 ✓  farthest = 3
i=2: 2 <= 3 ✓  farthest = 3
i=3: 3 <= 3 ✓  farthest = 3
i=4: 4 > 3 ✗  STUCK — can't reach index 4

Return false ✓
```

One pass, O(n) — no BFS, no DP.

### 8. Small visual example — circular greedy restart

Gas Station (#134) uses a different greedy trick:

```
Track total fuel balance and current tank.
If tank goes negative at station i, restart from i+1 (prior start was wrong).

Why? If you start at s and fail before i, starting anywhere in [s..i) 
also fails — you'd enter that range with less or equal fuel.
```

The restart is greedy: abandon a doomed starting point instead of trying all O(n²) starts.

### 9. Why brute force is inefficient

| Brute force | Problem |
|---|---|
| Try every starting position for gas station | O(n²) — single-pass restart is O(n) |
| BFS/DFS for jump game reachability | O(n²) or worse — farthest index is O(n) |
| Try all jump counts at each step | Exponential — greedy jump from range edge is O(n) |
| DP when greedy suffices | O(n) or O(n²) DP with unnecessary state |

### 10. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Using greedy without checking signals | If local choice can block a better global path, greedy fails — use DP |
| Confusing Jump Game I and II | I: can you reach? (farthest). II: minimum jumps (count layers) |
| Forgetting to sort before greedy pairing | Boats, Assign Cookies — sort first (Day 14) |
| Restarting gas station from index 0 each time | One pass: when tank < 0, restart at i+1 |
| Moving wrong pointer in Container With Most Water | Move **shorter** line — greedy move from Day 6 |

### 11. Recognition drill

Read this problem aloud:

> *"Given an array of non-negative integers, you are initially positioned at the first index. Each element represents your maximum jump length at that position. Determine if you can reach the last index."*

Before coding, say:

> *"Reachability with max jumps → greedy farthest reachable. Track max index reachable; if current index > farthest, stuck. O(n)."*

---

## Part 2 — What's Next

Today you'll prove greedy works in two classic forms:

1. **Frontier tracking** — Jump Game (#55): farthest reachable
2. **Circular restart** — Gas Station (#134): abandon doomed starts

Both connect back to Day 6's Container (move shorter side) and D-Rank's Boats (pair light + heavy). Greedy is the thread.

---

*You understand the greedy instinct. First quest: can you reach the end? →*
