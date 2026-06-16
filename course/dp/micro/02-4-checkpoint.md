<!-- hand-authored -->
# ✅ Day 2 Checkpoint

> **Memoization — Your First DP Optimization** · 2 quests completed · ⭐ 40 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Day 2 is **top-down cache hits** on the climbing-stairs family:

| When you see... | Think... | Why |
|---|---|---|
| "how many ways" + 1 or 2 steps | Fib-in-disguise + memo | Sum merge; overlap like Day 1 Fib |
| "minimum cost" + same moves | min + memo/tabulate | Same graph, min operator |
| Recursive TLE on linear recurrence | Add `memo[n]` check first | Day 2 fix |
| Second call to same `ways(k)` | **Cache hit** — skip subtree | Contrast Day 1 exponential |
| `@lru_cache` / `memo[i] != -1` | Top-down pattern | Store before return |

### 🧠 Quick Recognition Test

1. *"Ways to climb n stairs (1 or 2 steps)"* → **memo[i] = ways to i; memo[i]=memo[i-1]+memo[i-2]**
2. *"Min cost climbing with cost[i] on step i"* → **memo[i] = cost[i]+min(memo[i-1],memo[i-2]); free start**
3. *"Why memo ways(3) twice?"* → **Two branches from ways(5) both need ways(3) — cache second**
4. *"Memo vs tabulation for these?"* → **Both O(n); memo keeps recursive thinking**

---

## 🎯 Transfer to Unseen Problems

**Scenario 1:** *"Decode ways: count strings where '1'→A, '2'→B, ... '26'→Z."*

Same skeleton? **ways(i) = ways(i-1) [if valid] + ways(i-2) [if valid]** — memo on index with validity checks.

**Scenario 2:** *"Min cost path with 1, 2, or 3 step sizes."*

**memo[i] = cost[i] + min(memo[i-1], memo[i-2], memo[i-3])** — k=3 min recurrence.

**Scenario 3:** *"You wrote memo but forgot memo[n]=result before return."*

Symptom? **Infinite recompute — still TLE.** Always store after computing.

> **Answer key:** Climbing family = **same indices, different merge** (+ count, min cost, max profit later).

---

## ⚠ Common Mistakes

1. **Checking memo after recursion** — Check **before** diving in (after base cases).

2. **Wrong base for ways** — `ways(1)=1`, `ways(2)=2`, not Fib 0,1,1.

3. **Forgetting free start on min cost** — dp[0]=dp[1]=0.

4. **Returning dp[n-1] instead of top** — Min cost answer is beyond last index.

5. **Using sum merge on min-cost problem** — Operator must match optimization goal.

---

## 🏋️ Mini Challenge

Implement **Climbing Stairs #70** twice:

1. Top-down with explicit `memo` array — log (on paper) each cache hit for n=6.
2. Bottom-up rolling — compare line count.

**Before you code:** Draw the n=5 tree and circle nodes that would be cache hits.

> 💡 **Hint:** Day 1 drew the tree; Day 2 fixes it. Day 3 fills the table without recursion.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Climbing Stairs #70](https://leetcode.com/problems/climbing-stairs/) | Easy | Fibonacci in Disguise |
| [Min Cost Climbing Stairs #746](https://leetcode.com/problems/min-cost-climbing-stairs/) | Easy | Decision + Cost Memoization |

---

*Day 2 complete! Tomorrow: tabulation — Pascal's 2D triangle and bit DP (first non-Fib visual). →*
