<!-- hand-authored -->
# 📝 Memoization — Your First DP Optimization

> **Day 2** · Memoization — Your First DP Optimization · ★☆☆☆☆ · 10 XP · 10 min read

---

Day 1 showed you the **exponential Fib tree**. Today you add a cache and watch repeated nodes become **instant cache hits**. Climbing Stairs is the flagship: same overlap as Fib, but the state means *"number of ways"* — and memo turns O(2^n) into O(n) without rewriting the recursion logic.

> **Preview contrast (Day 1 vs Day 2):** Day 1 = *see* the overlap. Day 2 = *fix* it top-down with `memo[i]` before you recurse.

---

## Part 1 — Learn the Pattern

### 1. What is the pattern?

**Top-Down Memoization** — keep the recursive structure; add a lookup table.

```
function solve(n):
    if n in memo: return memo[n]      ← CACHE HIT
    if base case: return base value
    result = combine(solve(n-1), solve(n-2), ...)
    memo[n] = result                  ← store before return
    return result
```

- **Memo key** — usually the recursive parameter (`n`, `i`, `(i,j)`)
- **Cache hit** — skip entire subtree; return stored answer
- **Fill on demand** — only states actually reached get computed

### 2. Simple explanation

Day 1's Fib tree recomputed `ways(3)` many times. Memoization is a notebook: first time you solve `ways(3)`, write `3` on the page. Every later call to `ways(3)` reads the page — **no re-descent**.

You keep thinking recursively ("from step n, I came from n-1 or n-2"). The cache just prevents redundant work.

### 3. Visual — Climbing Stairs: exponential tree vs memo hits

```
ways(5) — NAIVE (Day 1 style):

              ways(5)
             /       \
        ways(4)     ways(3)   ← ways(3) twice
        /    \       /    \
   ways(3) ways(2) ways(2) ways(1)
     ...     ⬆       ⬆
           repeated  repeated

→ O(2^n) nodes


ways(5) — WITH MEMO (Day 2):

ways(5)
  → ways(4)  [compute, memo[4]=5]
  → ways(3)  [compute, memo[3]=3]
       ways(2) [compute, memo[2]=2]
       ways(1) [base → 1]
  → ways(3)  CACHE HIT → 3  ✓  (entire subtree skipped)

Total distinct calls: ways(5), ways(4), ways(3), ways(2), ways(1) → 5 = O(n)
```

### 4. Visual — Day 1 exponential vs Day 2 cached path

```
Same problem, two timelines:

DAY 1 (identify):     Draw tree → circle ways(2), ways(3) repeats
DAY 2 (memoize):      Add memo[] → second visit = O(1) lookup

Fibonacci value:      memo[i] = i-th Fib number
Climbing Stairs:      memo[i] = # ways to reach step i
                      SAME recurrence, DIFFERENT meaning
```

### 5. The memo template

```
memo = array/map initialized to "unknown"

function climb(n):
    if n <= 2: return n
    if memo[n] != UNKNOWN: return memo[n]

    memo[n] = climb(n-1) + climb(n-2)
    return memo[n]
```

C++: `vector<int> memo(n+1, -1)` — check `memo[n] != -1`  
Python: `@lru_cache` or dict  
Java: `Integer[] memo` with null check

### 6. When memo beats tabulation (E-Rank scope)

| Top-down memo | Bottom-up tabulation |
|---|---|
| Natural recursive decomposition | Natural loop from base cases |
| May skip unreachable states | Computes all states 0..n |
| Same time O(n) for linear problems | Same time; often easier space roll |

Both are correct for Climbing Stairs. Day 3 formalizes bottom-up.

### 7. State for today's quests

**Climbing Stairs:** `memo[i]` = number of distinct ways to reach step `i`.  
**Min Cost Climbing Stairs:** `memo[i]` = minimum cost to **stand on** step `i` (or reach beyond — read problem carefully).

### 8. Pattern signals & recognition clues

| When the problem says… | Think… |
|---|---|
| "how many ways to climb" / "count paths" | Sum of prior states — Fib recurrence |
| "minimum cost to reach" | min of two prior + cost[i] |
| Recursive solution TLE on LeetCode | Add memo on the parameter |
| Same subproblem, different branches | **Cache hit** pattern |

**Keywords:** `memo` · `cache hit` · `top-down` · `if memo[n] != -1` · `@lru_cache`

### 9. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Forgetting to **store** before return | `memo[n] = result` on every compute path |
| Wrong memo size | Size `n+1` for steps 0..n |
| Checking cache after base case only | Check memo **first** (after bases) |
| Using global memo without reset | Re-init per test case in contests |
| Confusing memo[i] meaning | Ways vs min cost vs Fib **value** |

### 10. Recognition drill

Read this problem aloud:

> *"You can climb 1 or 2 steps. How many distinct ways to reach the top of n stairs?"*

Before coding, say:

> *"State: memo[i] = ways to reach step i. Overlap: ways(3) called twice from ways(5) — Day 1 tree, Day 2 cache. Transition: memo[i] = memo[i-1] + memo[i-2]. Base: memo[1]=1, memo[2]=2. Answer: memo[n]."*

---

*Cache ready. First quest: Climbing Stairs — feel the cache hit on ways(3). →*
