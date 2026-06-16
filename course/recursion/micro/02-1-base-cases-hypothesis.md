<!-- hand-authored -->
# 📝 Base Cases & The Recursive Hypothesis

> **Day 2** · Recursive Hypothesis · ★☆☆☆☆ · 10 XP · 10 min read

---

Your mission today: **trust the recursive call**. Day 1 taught you to trace the call stack and hit base cases. Day 2 adds the leap of faith: assume `f(n-1)` and `f(n-2)` are already correct — your job is only to **combine** them.

---

## Bridge from Day 1

Yesterday you traced frames shrinking inward (Reverse String) or halving (Power of Two). The stack still applies — but today's problems **branch**:

```
Day 1:  one recursive call per frame     rev(l+1, r-1)
Day 2:  two recursive calls per frame    f(n-1) + f(n-2)
```

Same stack mechanics. New skill: **don't expand both branches in your head** — trust the returns and add.

---

## Part 1 — The Recursive Hypothesis

### 1. What is the pattern?

**Recursive hypothesis (trust):** When defining `f(n)`, pretend `f(n-1)`, `f(n-2)`, … are already solved. Write `f(n)` using those answers.

Every solution still needs:

- **Base case(s)** — `f(0)`, `f(1)` (or `n <= 2`) — direct answers
- **Recursive case** — combine smaller trusted results
- **Memoization (when needed)** — cache results so overlapping subproblems aren't recomputed

### 2. Simple explanation

Climbing a staircase: to reach step `n`, you either came from step `n-1` (one step) or step `n-2` (two steps).

You don't enumerate every path from the ground. You say:

> *"However many ways exist to reach step n-1, plus however many exist to reach n-2 — that's my answer for step n."*

That sentence **is** the recursive hypothesis.

### 3. Visual — Fibonacci recursion tree (with overlap)

`fib(5)` expands into a tree — notice **`fib(3)` is computed twice**, **`fib(2)` three times**:

```
                         fib(5)
                        /      \
                   fib(4)        fib(3)  ← overlap starts
                  /     \       /    \
             fib(3)   fib(2) fib(2) fib(1)
            /    \
       fib(2)  fib(1)

Without memo: exponential redundant work
With memo: each fib(k) computed once → O(n) total
```

**Base cases:** `fib(0) = 0`, `fib(1) = 1` — return immediately, no further calls.

### 4. Visual — Climbing Stairs as `f(n-1) + f(n-2)`

`n = 5` stairs — each node is "how many ways to reach this step":

```
Reach step 5 from:
    step 4 (1-step hop)  ──┐
                           ├──  ways(5) = ways(4) + ways(3)
    step 3 (2-step hop)  ──┘

Expand (trust each sub-call):

ways(4) = ways(3) + ways(2)
ways(3) = ways(2) + ways(1)
ways(2) = 2        ← base
ways(1) = 1        ← base

Bottom-up evaluation:
ways(2)=2, ways(3)=3, ways(4)=5, ways(5)=8  ✓
```

Same recurrence as Fibonacci — different story, identical skeleton.

### 5. The template

```
function f(n):
    if n is base: return base_value

    if n in memo: return memo[n]          // cut overlap

    memo[n] = f(n-1) + f(n-2)             // TRUST both calls
    return memo[n]
```

The **hypothesis line** is the assignment: you don't prove `f(n-1)` inside `f(n)` — you assume it.

### 6. Why naive recursion explodes

| Approach | Problem |
|---|---|
| **Plain `fib(n-1) + fib(n-2)` with no memo** | O(2^n) — overlapping branches recompute forever |
| **Nested loops over all step sequences** | O(2^n) paths — same explosion, harder to read |
| **Expanding the full tree in your head** | Cognitive overload — trust + memo instead |
| **Forgetting both base cases** | Off-by-one on `n = 0`, `n = 1`, or `n = 2` |

Memoization doesn't change the **logic** — it changes **how many times** each subproblem runs.

### 7. The key observation

**Two sub-calls ≠ two independent problems.** They overlap. The recursive hypothesis gives you the formula; memoization makes it fast.

| Problem | Base case(s) | Combine step |
|---|---|---|
| Fibonacci | `n <= 1 → n` | `f(n-1) + f(n-2)` |
| Climbing Stairs | `n <= 2 → n` | `f(n-1) + f(n-2)` |

Different bases, same trust-and-add shape.

### 8. Pattern signals for Day 2

| When the problem says… | Think… |
|---|---|
| "nth Fibonacci" / "f(n-1) + f(n-2)" | Binary recursion + memo |
| "how many ways to climb" / "1 or 2 steps" | Same recurrence — count paths |
| "overlapping subproblems" | Memo table or hash map |
| "trust the sub-call" / "assume smaller works" | Recursive hypothesis |
| Day 1 "call stack" still applies | Frames wait; base unblocks; returns bubble up |

**Keywords:** `recursive hypothesis` · `memoization` · `overlapping subproblems` · `f(n-1)` · `base case`

### 9. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Not trusting sub-calls — trying to unroll entire tree | Write `f(n-1) + f(n-2)` and trace one small `n` on paper |
| No memo on Fibonacci-style recurrence | Add cache after naive TLE — same code, one map |
| Wrong base cases | Fibonacci: `n<=1→n`. Stairs: `n<=2→n`. Test `n=1`, `n=2`. |
| Confusing Fibonacci index with stair count | Same math — verify bases match the problem statement |
| Stack overflow on large n without memo | Memo reduces call depth work; iterative DP also works later |

### 10. Recognition drill

Read this problem aloud:

> *"You can climb 1 or 2 steps at a time. How many distinct ways to reach step n?"*

Before coding, say:

> *"Trust: ways(n) = ways(n-1) + ways(n-2). Base: n<=2 return n. Overlap → memo. Trace n=4 on paper — don't expand the full tree."*

---

*You trust the hypothesis. Your first quest puts Fibonacci on the stack. →*
