# 📝 The DP Mental Model

> **Day 1** · The DP Mental Model · ★☆☆☆☆ · 10 XP · 10 min read

---

Your mission today: **understand Overlapping Subproblems & Optimal Substructure visually** before you touch any code. Draw the recursion tree with overlapping calls. Fill the DP table by hand. Then the transitions become obvious.

---

## Part 1 — Why Does DP Work Here?

### 1. What is the pattern?

**Overlapping Subproblems & Optimal Substructure** — the core technique you'll use in today's quests.

Every DP problem reduces to one question: *If I already know the answer to all smaller subproblems, how do I compute the answer to this one?*
- **State** — what information do I need to describe a subproblem?
- **Transition** — how do I compute dp[i] from previously solved states?
- **Base case** — what are the smallest subproblems I can answer directly?

### 2. Simple explanation

Think of DP like building a house one brick at a time. Each brick (state) depends only on bricks already placed below it (previous states). You never re-lay a brick — once computed, the answer is final.

The recursion tree shows you which subproblems repeat. The DP table is you saying: *"I'll solve each one exactly once."*

### 3. Visual walkthrough

```
fib(5) — overlapping subproblems:

              fib(5)
             /      \
         fib(4)      fib(3)  ← repeated!
        /     \      /    \
    fib(3)  fib(2) fib(2) fib(1)
    /   \     ⬆      ⬆
fib(2) fib(1) ●      ●  ← same subproblems recomputed
  ⬆
  ●

After memoization:

fib(5) → fib(4) → fib(3) → fib(2) → fib(1) ✓ base
                                 ↑ cache[2]=1
                       ↑ cache[3]=2
              ↑ cache[4]=3
         fib(3) → CACHE HIT → 2  ✓
   ↑ cache[5]=5

O(n) calls instead of O(2^n) — each subproblem computed once
```

### 4. The DP Pipeline

Apply the five-step pipeline to today's pattern:

```
Step 1: BRUTE FORCE
  → Write the recursive solution. Don't worry about efficiency.

Step 2: IDENTIFY OVERLAP
  → Draw the recursion tree. Circle the repeated calls.
  → "Overlapping Subproblems & Optimal Substructure" has overlapping subproblems because...

Step 3: MEMOIZE (top-down)
  → Add a cache. Before recursing, check if already computed.
  → memo[state] = result

Step 4: TABULATE (bottom-up)
  → Define dp[i] (or dp[i][j]). Fill from base cases forward.
  → dp[state] = transition(previous states)

Step 5: OPTIMIZE SPACE
  → Do you need the whole table? Or just the last 1-2 rows/values?
```

### 5. State definition

**What does dp[i] represent?**

The hardest part of DP is naming the state correctly. For **Overlapping Subproblems & Optimal Substructure**:
- What parameters fully describe a subproblem?
- Is the state a single index, two indices, or an index + capacity?
- Can you state it in one sentence: *"dp[i] is the answer to..."*

### 6. Transition logic

**How do we compute dp[i]?**

The transition is the heart of every DP solution:
- What choices do I have at state i?
- How does each choice connect to a previous state?
- Is it min, max, sum, or count over the choices?

```
dp[i] = best/sum over all valid choices c:
          dp[previous_state(i, c)] + cost(c)
```

### 7. Base cases & answer extraction

| Component | Question |
|---|---|
| Base case | What is the smallest subproblem? What does dp[0] (or dp[0][0]) equal? |
| Fill order | Left-to-right? Bottom-up? By interval length? |
| Answer | Is the answer dp[n], dp[n-1], max(dp[...]), or something else? |

### 8. Pattern signals & recognition clues

| When the problem says… | Think… |
|---|---|
| "how many ways" / "count paths" / "counting" | Counting DP — dp[i] = sum of valid transitions |
| "minimum cost" / "cheapest" / "fewest" | Min-cost DP — dp[i] = min(options) + cost |
| "maximum profit" / "best score" / "longest" | Max-value DP — dp[i] = max(options) |
| "take or skip" / "rob houses" / "select items" | 0/1 Knapsack — dp[i] = max(take, skip) |
| "unlimited supply" / "coins" / "denominations" | Unbounded Knapsack — try all items at each amount |
| "longest increasing" / "subsequence" | LIS — dp[i] = max(dp[j]+1) for valid j < i |
| "optimal" / "minimum cost" / "maximum profit" | DP — optimize over choices |
| "how many ways" / "count paths" | DP — sum over transitions |

**Keywords:** `minimum` · `maximum` · `count ways` · `longest` · `shortest` · `can you reach` · `partition`

### 9. Common DP mistakes

| Mistake | Fix |
|---|---|
| Wrong state definition | State must capture all info needed to make the optimal choice |
| Missing base case | Always define dp[0] (and dp[1] if needed) before the loop |
| Wrong fill order | Ensure dp[i] only depends on already-computed states |
| Off-by-one in table size | dp array usually has size n+1 to include the empty/zero case |
| Forgetting to return the right cell | Answer might be dp[n], dp[n-1], max(dp), or dp[0][n-1] |

### 10. Recognition drill

Read this problem aloud:

> *"Given an array of integers, find the maximum sum of non-adjacent elements."*

Before coding, say:

> *"State: dp[i] = max sum using elements 0..i. Transition: dp[i] = max(dp[i-1], dp[i-2] + nums[i]). Base: dp[0] = nums[0], dp[1] = max(nums[0], nums[1]). Answer: dp[n-1]."*

---

*You understand the pattern. Your first quest puts it into practice. →*
