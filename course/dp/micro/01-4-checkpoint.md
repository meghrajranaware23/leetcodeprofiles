<!-- hand-authored -->
# ✅ Day 1 Checkpoint

> **The DP Mental Model** · 2 quests completed · ⭐ 40 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

Day 1 is **overlap detection** on linear recurrences. Practice hearing the signal:

| When you see... | Think... | Why |
|---|---|---|
| "F(n) = F(n-1) + F(n-2)" | Linear recurrence, k=2 | Fib overlap — tabulate or memo |
| "T(n) = sum of previous 3 terms" | Extended recurrence, k=3 | Trib — same skeleton, wider tree |
| Same `(n)` in recursion tree twice | **Memo candidate** | Recursion pack bridge |
| "nth term" / single index state | `dp[i]` one-dimensional | Answer usually `dp[n]` |
| Draw tree → no repeated labels | Plain recursion OK | No DP speedup needed |

### 🧠 Quick Recognition Test

Read each mini-problem. Overlap? State? Transition?

1. *"Return the n-th Fibonacci number"* → **Overlap:** yes. **State:** `dp[i]` = i-th Fib. **Transition:** `dp[i-1]+dp[i-2]`
2. *"Return the n-th Tribonacci number"* → **Overlap:** yes (worse). **State:** `trib(i)`. **Transition:** sum of prior 3
3. *"Factorial of n recursively"* → **Overlap:** no — each `fact(k)` unique. **No memo needed**
4. *"Why draw the tree first?"* → **Repeated nodes = DP signal**

---

## 🎯 Transfer to Unseen Problems

You've seen Fib and Trib. Can you spot **k-term recurrence** on new problems?

**Scenario 1:** *"A sequence: a[0]=1, a[1]=1, a[i]=a[i-1]+a[i-2]+a[i-3]+a[i-4]. Return a[n]."*

What's the state? **dp[i] = i-th term.** Four bases, four rolling variables (or array). O(n) tabulation.

**Scenario 2:** *"Recursive function calls f(n-1) and f(n-2) but also f(n-2) from a different branch with no shared subtree."*

Is there overlap? **Only if the same argument appears in different branches.** Draw it — don't assume.

**Scenario 3:** *"Climbing stairs — count ways to reach step n (1 or 2 steps)."*

Recurrence? **ways(n) = ways(n-1) + ways(n-2)** — Fibonacci in disguise (Day 2).

> **Answer key:** Day 1 skill = **name the state + spot overlap**. The recurrence formula comes from the problem.

---

## ⚠ Common Mistakes

1. **Memoizing without overlap** — Factorial doesn't need a cache; Fib does.

2. **Wrong number of base cases** — Trib needs three (0,1,2), not two.

3. **Off-by-one on answer** — Return `dp[n]` or final rolling variable, not `dp[n-1]` unless state says so.

4. **Skipping the tree** — Jumping to code without circling repeats misses the learning goal.

5. **Confusing value recurrence with counting recurrence** — Climbing Stairs counts *ways*, not sums values (same formula, different meaning).

---

## 🏋️ Mini Challenge

### Related LeetCode Practice

Re-solve **Fibonacci #509** from scratch in three ways:

1. Naive recursion (feel the slowness at n=35+)
2. Memoized recursion
3. Rolling tabulation O(1) space

**Before each version:** Say the state sentence out loud.

> 💡 **Hint:** Compare call counts — naive vs memo for n=10 on paper.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Fibonacci Number #509](https://leetcode.com/problems/fibonacci-number/) | Easy | Linear Recurrence |
| [N-th Tribonacci Number #1137](https://leetcode.com/problems/n-th-tribonacci-number/) | Easy | Extended Recurrence |

---

*Day 1 complete! Tomorrow: memoization — cache hits on the climbing-stairs tree. →*
