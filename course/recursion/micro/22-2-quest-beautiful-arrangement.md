# ⚔ Quest: Beautiful Arrangement

> **Day 22** · [Beautiful Arrangement #526](https://leetcode.com/problems/beautiful-arrangement/) · Medium · 15 min · 35 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Beautiful Arrangement on LeetCode](https://leetcode.com/problems/beautiful-arrangement/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. Trace the call stack on paper. Mark each frame push and pop. The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Beautiful Arrangement #526](https://leetcode.com/problems/beautiful-arrangement/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? Think about **Divisibility Constraint Permutation**.

If you're stuck after 5 minutes: revisit the concept page's visual walkthrough. Trace the call stack on paper. Mark each frame push and pop.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Divisibility Constraint Permutation

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
Apply Divisibility Constraint Permutation step by step on the example from the problem.
Mark the current call frame at each step.
Watch what gets returned (or what choices get made) at each level.
```

> 💡 **The insight:** The code is just the paper trace written in syntax. If you can trace it by hand, you can code it.

---

## Solution

### C++
```cpp
class Solution {
    int ans = 0;
    void dfs(int n, int pos, vector<bool>& used) {
        if (pos > n) { ans++; return; }
        for (int i = 1; i <= n; i++) {
            if (used[i] || (i % pos != 0 && pos % i != 0)) continue;
            used[i] = true;
            dfs(n, pos + 1, used);
            used[i] = false;
        }
    }
public:
    int countArrangement(int n) {
        vector<bool> used(n + 1);
        dfs(n, 1, used);
        return ans;
    }
};
```

### Python
```python
class Solution:
    def countArrangement(self, n: int) -> int:
        self.ans = 0
        used = [False] * (n + 1)
        def dfs(pos):
            if pos > n: self.ans += 1; return
            for i in range(1, n + 1):
                if used[i] or (i % pos and pos % i): continue
                used[i] = True; dfs(pos + 1); used[i] = False
        dfs(1)
        return self.ans
```

### Java
```java
class Solution {
    private int ans = 0;
    public int countArrangement(int n) {
        dfs(n, 1, new boolean[n + 1]);
        return ans;
    }
    private void dfs(int n, int pos, boolean[] used) {
        if (pos > n) { ans++; return; }
        for (int i = 1; i <= n; i++) {
            if (used[i] || (i % pos != 0 && pos % i != 0)) continue;
            used[i] = true;
            dfs(n, pos + 1, used);
            used[i] = false;
        }
    }
}
```

**Complexity:** O(n!) time · O(n) space

---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"This is a recursive problem"** → Trace it. Don't start coding blind.
- **"Divisibility Constraint Permutation"** → Name the pattern from the concept page.
- **"What's my base case?"** → Define it before the recursive call.
- **"What does the smaller call return?"** → Trust it and combine.

If you tried brute force first, that's fine — the breakthrough is **naming the pattern family**, not memorizing one solution.

> 🎯 **Pattern Unlocked:** Divisibility Constraint Permutation

---

*One quest down. The next one builds on this pattern. →*
