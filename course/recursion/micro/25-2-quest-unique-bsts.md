# ⚔ Quest: Unique Binary Search Trees

> **Day 25** · [Unique Binary Search Trees #96](https://leetcode.com/problems/unique-binary-search-trees/) · Medium · 15 min · 35 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Unique Binary Search Trees on LeetCode](https://leetcode.com/problems/unique-binary-search-trees/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. Trace the call stack on paper. Mark each frame push and pop. The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Unique Binary Search Trees #96](https://leetcode.com/problems/unique-binary-search-trees/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? Think about **Catalan Recursion**.

If you're stuck after 5 minutes: revisit the concept page's visual walkthrough. Trace the call stack on paper. Mark each frame push and pop.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Catalan Recursion

**How to identify this from the problem statement:**
- Can the problem be broken into a smaller version of itself?
- Is there a clear base case when the input is small enough?
- Do you need to generate all valid choices or just compute one answer?

| Keyword / phrase | What it signals |
|---|---|
| "reverse" / "factorial" / "power" | Linear recursion — shrink by one |
| "all subsets" / "all combinations" | Backtracking — include/exclude |
| "all permutations" / "arrangements" | Backtracking — used[] or swap |
| "partition" / "split" / "restore" | String backtracking |
| "word search" / "grid" | Grid DFS + mark/unmark |
| "how many ways" + overlap | Recursion + memoization |

**Why this pattern works:** Recursive problems have self-similar structure. Name what shrinks, define the base case, trust the sub-call.

**How a strong solver thinks before coding:**
1. *"What is the base case?"*
2. *"What gets smaller on each call?"*
3. *"Do I pass state down or return results up?"*
4. *"Trace one example on paper before coding."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Nested loops for all combinations** | O(n!) — misses pruning and structure |
| **Iterating without recursive insight** | Hard to handle tree/backtracking shape |
| **No memoization on overlapping subproblems** | Exponential time on Fibonacci-style problems |
| **Forgetting to backtrack (undo)** | Wrong state leaks into sibling branches |

**The insight brute force misses:** Recursion names the substructure. Backtracking prunes invalid branches early.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| Related recursive problems | Different combine logic | Same skeleton: base + recurse + combine |
| Same backtracking family | Different constraints | Same choose / explore / unchoose |
| Variant constraints | Extra pruning or state | Same decision tree shape |

If you recognized this problem's pattern, you already have the skeleton for today's practice queue.

---

## 📖 Walkthrough

Trace the call stack on paper. Mark each frame push and pop.

```
Apply Catalan Recursion step by step on the example from the problem.
Mark the current call frame at each step.
Watch what gets returned (or what choices get made) at each level.
```

> 💡 **The insight:** The code is just the paper trace written in syntax. If you can trace it by hand, you can code it.

---

## Solution

### C++
```cpp
class Solution {
    vector<int> memo;
    int dfs(int n) {
        if (n <= 1) return 1;
        if (memo[n]) return memo[n];
        int total = 0;
        for (int i = 1; i <= n; i++)
            total += dfs(i - 1) * dfs(n - i);
        return memo[n] = total;
    }
public:
    int numTrees(int n) {
        memo.assign(n + 1, 0);
        return dfs(n);
    }
};
```

### Python
```python
class Solution:
    def numTrees(self, n: int) -> int:
        memo = {}
        def dfs(k):
            if k <= 1: return 1
            if k in memo: return memo[k]
            total = sum(dfs(i - 1) * dfs(k - i) for i in range(1, k + 1))
            memo[k] = total
            return total
        return dfs(n)
```

### Java
```java
class Solution {
    private int[] memo;
    public int numTrees(int n) {
        memo = new int[n + 1];
        return dfs(n);
    }
    private int dfs(int n) {
        if (n <= 1) return 1;
        if (memo[n] != 0) return memo[n];
        int total = 0;
        for (int i = 1; i <= n; i++)
            total += dfs(i - 1) * dfs(n - i);
        return memo[n] = total;
    }
}
```

**Complexity:** O(n^2) time · O(n) space

---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"This is a recursive problem"** → Trace it. Don't start coding blind.
- **"Catalan Recursion"** → Name the pattern from the concept page.
- **"What's my base case?"** → Define it before the recursive call.
- **"What does the smaller call return?"** → Trust it and combine.

If you tried brute force first, that's fine — the breakthrough is **naming the pattern family**, not memorizing one solution.

> 🎯 **Pattern Unlocked:** Catalan Recursion

---

*One quest down. The next one builds on this pattern. →*
