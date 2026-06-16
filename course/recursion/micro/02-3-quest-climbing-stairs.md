<!-- hand-authored -->
# ⚔ Quest: Climbing Stairs

> **Day 2** · [Climbing Stairs #70](https://leetcode.com/problems/climbing-stairs/) · Easy · 10 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Climbing Stairs on LeetCode](https://leetcode.com/problems/climbing-stairs/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. For `n = 4`, list every step sequence (1+1+1+1, 1+1+2, …). Then see if the count matches `ways(3) + ways(2)`. The hints below are for *after* your attempt.

---

## The Problem

You are climbing a staircase. It takes `n` steps to reach the top.

Each time you can either climb **1** or **2** steps. In how many **distinct ways** can you climb to the top?

```
Input:  n = 2
Output: 2
Explanation: 1+1, or 2
```

```
Input:  n = 3
Output: 3
Explanation: 1+1+1, 1+2, 2+1
```

```
Input:  n = 4
Output: 5
Explanation: 1+1+1+1, 1+1+2, 1+2+1, 2+1+1, 2+2
```

---

## 💡 Hints

Which pattern from today's concept applies? **Memoized recursion** — to stand on step `n`, you came from `n-1` or `n-2`.

If you're stuck after 5 minutes: write `ways(n) = ways(n-1) + ways(n-2)`. Base: `n <= 2 → return n`. Same skeleton as Fibonacci, different bases.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Memoized Recursion (Count Paths)

**How to identify this from the problem statement:**
- "1 or 2 steps" → every full path ends with either a 1-step or 2-step from below
- Counting distinct ways → sum of counts from two previous positions
- Overlap: `ways(k)` feeds many parent calls → memo

| Keyword / phrase | What it signals |
|---|---|
| "how many distinct ways" | Counting DP / recursive counting |
| "1 or 2 steps" | Split into `f(n-1) + f(n-2)` |
| "climb to the top" | Answer for full height n |
| "n steps" | Subproblem indexed by remaining stairs |
| same substructure at n-1 and n-2 | Memoization |

**Why this pattern works:** Every valid way to reach step `n` either ends with a single step from `n-1` or a double step from `n-2`. Those two sets don't overlap — partition of all paths.

**How a strong solver thinks before coding:**
1. *"Last move: 1-step or 2-step → ways(n) = ways(n-1) + ways(n-2)."*
2. *"Base: n=1 → 1 way; n=2 → 2 ways → compact as n<=2 return n."*
3. *"Trust both sub-calls — recursive hypothesis."*
4. *"Memoize — same overlap as Fibonacci."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Generate every 1/2 sequence with backtracking** | O(2^n) paths — correct but TLE on n=45 |
| **Naive recursion without memo** | Recomputes `ways(3)`, `ways(2)` exponentially often |
| **Nested loops simulating every path length** | Messy bookkeeping — recurrence is cleaner |
| **Using Fibonacci base `n<=1→n` for stairs** | Wrong on n=2 — stairs need `n<=2 → n` |

**The insight brute force misses:** You don't list paths — you **count** by trusting how many paths lead to the two landing spots below the top.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Fibonacci Number #509](https://leetcode.com/problems/fibonacci-number/) | Sequence definition | Identical recurrence, different story |
| [Min Cost Climbing Stairs #746](https://leetcode.com/problems/min-cost-climbing-stairs/) | Min cost, not count | Still choose step 1 or 2 from below |
| [Decode Ways #91](https://leetcode.com/problems/decode-ways/) | Digit constraints | Count splits from current position |
| [House Robber #198](https://leetcode.com/problems/house-robber/) | Skip-adjacent max sum | 1D DP flavor — next week in this pack |

If you solved Fibonacci today, Climbing Stairs is recognition practice — not a new algorithm.

---

## 📖 Walkthrough

Count ways for **`n = 4`**. Verify brute enumeration (5 paths) matches **`ways(4) = ways(3) + ways(2)`**.

```
All paths to step 4 (brute list):
  1+1+1+1
  1+1+2
  1+2+1
  2+1+1
  2+2
Total: 5  ✓


Recursive count (trust + memo):

ways(4) = ways(3) + ways(2)

ways(3) = ways(2) + ways(1)
        = 2 + 1 = 3

ways(2) = 2   ← base (1+1 or 2)

ways(4) = 3 + 2 = 5  ✓


Stair diagram — last hop onto step 4:

  ... → step 3 ──1 step──→ step 4
  ... → step 2 ──2 steps─→ step 4

Every path to 4 is exactly one of these extensions.
```

Memoized call order (each k once):

```
dfs(4)
  dfs(3)
    dfs(2) → 2  (base)
    dfs(1) → 1  (base)
    memo[3] = 3
  dfs(2) → memo hit → 2
  memo[4] = 5
```

> 💡 **The insight:** The stair story and Fibonacci formula differ in **wording** only. Your Day 2 skill is spotting `f(n-1) + f(n-2)` and applying the right base case.

---

## Solution

### C++
```cpp
class Solution {
    unordered_map<int,int> memo;
    int dfs(int n) {
        if (n <= 2) return n;
        if (memo.count(n)) return memo[n];
        return memo[n] = dfs(n - 1) + dfs(n - 2);
    }
public:
    int climbStairs(int n) { return dfs(n); }
};
```

### Python
```python
class Solution:
    def climbStairs(self, n: int) -> int:
        memo = {}
        def dfs(k):
            if k <= 2: return k
            if k in memo: return memo[k]
            memo[k] = dfs(k - 1) + dfs(k - 2)
            return memo[k]
        return dfs(n)
```

### Java
```java
class Solution {
    private Map<Integer, Integer> memo = new HashMap<>();
    public int climbStairs(int n) { return dfs(n); }
    private int dfs(int n) {
        if (n <= 2) return n;
        if (memo.containsKey(n)) return memo.get(n);
        int ans = dfs(n - 1) + dfs(n - 2);
        memo.put(n, ans);
        return ans;
    }
}
```

**Complexity:** O(n) time · O(n) space
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"1 or 2 steps to the top"** → Last move partitions paths → sum of two subcounts.
- **"Distinct ways"** → Counting recurrence, not generating paths.
- **"Looks like Fibonacci"** → Same memo skeleton — verify base case (`n<=2→n`).
- **"Day 1 stack + Day 2 trust"** → Frames still push/pop; you combine two return values.

If you listed all paths first, that's a valid sanity check for small n — the breakthrough is **trusting the recurrence** for large n.

> 🎯 **Pattern Unlocked:** Memoized counting recursion — `ways(n) = ways(n-1) + ways(n-2)`.

---

*Both quests complete. Head to the checkpoint. →*
