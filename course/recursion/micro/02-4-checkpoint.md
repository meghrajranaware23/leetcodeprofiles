<!-- hand-authored -->
# ✅ Day 2 Checkpoint

> **Recursive Hypothesis** · 2 quests completed · ⭐ 40 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Day 2 adds **trust** and **overlap** on top of Day 1's call stack. Practice hearing the signal:

| When you see... | Think... | Why |
|---|---|---|
| "Fibonacci" / sum of two preceding | `f(n-1) + f(n-2)` + memo | Binary recursion with overlap |
| "how many ways" + 1 or 2 steps | Climbing stairs recurrence | Partition by last move |
| "overlapping subproblems" | Memo or cache | Each subproblem once → O(n) |
| "trust the recursive call" | Recursive hypothesis | Don't unroll full tree |
| two sub-calls returning values | Combine after both return | Day 1 stack, but branches |

### 🧠 Quick Recognition Test

Read each mini-problem. Which Day 2 pattern fires first?

1. *"Return the nth Fibonacci number"* → **Binary recursion + memo** — base `n<=1→n`
2. *"Count ways to climb n stairs with 1 or 2 steps"* → **Same recurrence** — base `n<=2→n`
3. *"Nth Tribonacci — sum of three preceding"* → **Three-way trust** — `f(n-1)+f(n-2)+f(n-3)` + memo
4. *"Reverse a string recursively"* → **Day 1** — single child call, two-pointer shrink (review)

---

## 🎯 Transfer to Unseen Problems

You've trusted `f(n-1)` and `f(n-2)` in Fibonacci and Climbing Stairs. Can you spot the same skeleton elsewhere?

**Scenario 1:** *"You pay `cost[i]` to step on stair i. Find minimum cost to reach the top (can start at step 0 or 1)."*

Which pattern? **Two-way recurrence with min instead of sum** — `min(cost[i] + dp(i-1), cost[i] + dp(i-2))`. Same 1-or-2-step structure as Climbing Stairs; memo on index. (See [Min Cost Climbing Stairs #746](https://leetcode.com/problems/min-cost-climbing-stairs/).)

**Scenario 2:** *"A message encoded as digits can be decoded: '12' → 'AB' or 'L'. Count decode ways for a string."*

Which pattern? **Count splits from current index** — at each position, try 1-digit and 2-digit decode if valid; `ways(i) = ways(i+1) + ways(i+2)` with constraints + memo. (See [Decode Ways #91](https://leetcode.com/problems/decode-ways/).)

**Scenario 3:** *"Return the nth Tribonacci number T(n) = T(n-1)+T(n-2)+T(n-3)."*

Which pattern? **Extended recursive hypothesis** — three trusted sub-calls, bases at T(0), T(1), T(2). Same memo idea as Fibonacci.

> **Answer key:** All three use **trust smaller answers + combine + memo when subtrees overlap**. The combine operator changes (sum, min, constrained sum).

---

## ⚠ Common Mistakes

1. **Naive Fibonacci without memo** — Correct logic, TLE. Overlap is the signal to cache — not to change the formula.

2. **Wrong base cases** — Fibonacci: `n <= 1 → n`. Climbing Stairs: `n <= 2 → n`. Swapping them breaks small tests.

3. **Trying to enumerate all paths** — Valid for n=4 sanity check; fails for n=45. Trust the recurrence instead.

4. **Forgetting Day 1 stack discipline** — Still trace base-case frames on paper. Two children means deeper trees, not a different stack model.

5. **Not checking memo before recursing** — Check cache after base cases; store result before return.

---

## 🏋️ Mini Challenge

### [N-th Tribonacci Number #1137](https://leetcode.com/problems/n-th-tribonacci-number/)

**[→ Try Tribonacci on LeetCode](https://leetcode.com/problems/n-th-tribonacci-number/)**

```
T(0)=0, T(1)=1, T(2)=1
T(n) = T(n-1) + T(n-2) + T(n-3) for n >= 3
```

```
Input:  n = 4
Output: 4
Explanation: T(4) = T(3)+T(2)+T(1) = 2+1+1 = 4
```

### 🔍 Pattern Recognition for This Challenge

| Clue | Signal |
|---|---|
| "sum of three preceding" | Three recursive calls — trust all three |
| "T(0), T(1), T(2) given" | Three base cases before general rule |
| same indexing as Fibonacci | Memo array size n+1 |

**Before you code:** Trace T(4) on paper. How many unique T(k) values exist? (Answer: 5 — indices 0 through 4.)

> 💡 **Hint:** Copy today's Fibonacci memo skeleton — add one more term and one more base.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Fibonacci Number #509](https://leetcode.com/problems/fibonacci-number/) | Easy | Binary recursion + memo |
| [Climbing Stairs #70](https://leetcode.com/problems/climbing-stairs/) | Easy | Count paths + memo |
| [Min Cost Climbing Stairs #746](https://leetcode.com/problems/min-cost-climbing-stairs/) | Easy | Same steps, min cost (stretch) |

---

## 🔗 Day 1 → Day 2 Bridge

| Day 1 | Day 2 |
|---|---|
| One recursive call per frame | Two (or more) calls per frame |
| Shrink input (pointers, ÷2) | Combine sub-results |
| Base case stops descent | Base case + **trust** + memo |
| Call stack trace on paper | Same trace — mark **overlap** nodes |

---

*Day 2 complete! Tomorrow: return values bubble up from tree and list structure. →*
