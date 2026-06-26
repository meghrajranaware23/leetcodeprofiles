<!-- hand-authored -->
# 📝 The DP Mental Model

> **Day 1** · The DP Mental Model · 10 XP · 10 min read

---

Day 1 is not about coding tricks yet — it's about **seeing why recursion explodes** and **when caching fixes it**. Fibonacci and Tribonacci are your microscopes: draw the recursion tree, circle the repeated nodes, then watch a memo turn an exponential forest into a linear path.

> **Preview contrast (Recursion pack vs Day 1):** Recursion taught you *how to decompose*. DP adds one question: *"Am I solving the same subproblem twice?"* If yes → cache or tabulate. If no → plain recursion is fine.

---

## Part 1 — Learn the Pattern

### 1. What is the pattern?

**Overlapping Subproblems & Optimal Substructure** — the two properties that make DP possible.

- **Overlapping subproblems** — the same `(n)` or `(i, j)` appears in many branches of the recursion tree
- **Optimal substructure** — the best answer for the whole problem uses best answers for smaller pieces
- **State** — one sentence: *"dp[i] is the answer when..."*
- **Transition** — how smaller states combine into `dp[i]`

### 2. Simple explanation

Imagine asking *"What's fib(5)?"* by always splitting into two smaller calls. You compute `fib(3)` twice, `fib(2)` three times — same questions, asked over and over. DP is the discipline of **writing the answer on a sticky note the first time** and reusing it.

The recursion pack gave you the decomposition muscle. Today you learn **when decomposition needs a cache**.

### 3. Visual — Fibonacci recursion tree with overlap

```
fib(5) — naive recursion:

              fib(5)
             /      \
         fib(4)      fib(3)  ← fib(3) computed twice!
        /     \      /    \
    fib(3)  fib(2) fib(2) fib(1)
    /   \     ⬆      ⬆
fib(2) fib(1) ●      ●  ← fib(2) computed three times!
  ⬆
  ●

Unique subproblems for fib(5): only n = 0,1,2,3,4,5 → 6 values
Naive calls: 15 nodes → O(2^n) growth as n grows
```

### 4. Visual — Tribonacci: wider overlap

```
trib(6) branches into THREE children (not two):

                    trib(6)
           /         |         \
      trib(5)     trib(4)     trib(3)
        ...         ...         ...

trib(4) appears under trib(6), trib(5), trib(5)'s middle child...
Even MORE repeated nodes than Fibonacci.

State: trib(i) = trib(i-1) + trib(i-2) + trib(i-3)
Same fix: memo[i] after first compute → O(n) total
```

### 5. Bridge from the Recursion pack — when to cache

| Situation | Action |
|---|---|
| Each recursive call reaches **unique** `(r,c)` or unique subset | Recursion only — no cache needed |
| Same parameter `(n)` or `(i,j)` hit from **different branches** | **DP candidate** — add memo or tabulate |
| Problem asks "count ways" / "min cost" with reuse | Almost always overlap |
| Tree/graph traversal with visited set | Visited ≠ memo — different pattern |

**The decision rule:** After writing brute-force recursion, **draw the tree**. If any label repeats → cache.

### 6. The DP Pipeline (your E-Rank workflow)

```
Step 1: BRUTE FORCE
  → Write the recursive solution. Don't optimize yet.

Step 2: IDENTIFY OVERLAP
  → Draw the tree for n = 5 or 6. Circle repeated nodes.

Step 3: MEMOIZE (top-down)     ← Day 2 formalizes this
  → if memo[n] exists: return memo[n]
  → else compute, store, return

Step 4: TABULATE (bottom-up)    ← Day 3 formalizes this
  → dp[0..n] left-to-right from base cases

Step 5: OPTIMIZE SPACE
  → Fib/Trib only need last 2–3 values, not full array
```

### 7. State definition — the hardest sentence

Before any code, finish this sentence out loud:

> *"dp[i] is _____________."*

For Fibonacci: **dp[i] = the i-th Fibonacci number.**  
For Tribonacci: **trib(i) = sum of the previous three trib values.**

If you can't say it in one line, the state isn't defined yet.

### 8. Pattern signals & recognition clues

| When the problem says… | Think… |
|---|---|
| "nth Fibonacci" / "tribonacci" / recurrence formula | Linear recurrence — dp[i] from prior k indices |
| "how many ways" / "count paths" | Sum transitions — often Fib-in-disguise (Day 2) |
| "minimum cost" / "maximum profit" | Min/max over choices (Day 5) |
| Same subproblem from multiple branches | **Overlap** — memo or tabulate |
| "return dp[n]" vs "return max(dp)" | Answer extraction — know which cell |

**Keywords:** `overlapping` · `optimal substructure` · `memo` · `dp[i]` · `base case` · `transition`

### 9. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Caching when there's no overlap | Draw the tree first — no repeats means no DP speedup |
| Wrong state ("dp[i] = max so far" when you need ending-at-i) | State must match the transition you write |
| Skipping base cases | fib(0)=0, fib(1)=1 before the loop |
| Confusing memo with visited in graphs | Memo stores **results**; visited stores **seen positions** |
| Jumping to code before naming dp[i] | One-sentence state definition first |

### 10. Recognition drill

Read this problem aloud:

> *"The Tribonacci sequence Tn is defined as T0=0, T1=1, T2=1, and Tn = Tn-1 + Tn-2 + Tn-3 for n ≥ 3. Return Tn."*

Before coding, say:

> *"Linear recurrence with k=3. State: trib(i) = i-th Tribonacci number. Overlap: trib(4) appears in multiple branches — memo or tabulate O(n). Base: trib(0)=0, trib(1)=trib(2)=1. Answer: trib(n)."*

---

*You see the overlap. First quest: Fibonacci — draw the tree, then fill the table. →*
