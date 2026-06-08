# ⚔ Quest: N-Queens II

> **Day 18** · [N-Queens II #52](https://leetcode.com/problems/n-queens-ii/) · Medium · 15 min · 35 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open N-Queens II on LeetCode](https://leetcode.com/problems/n-queens-ii/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. Trace the call stack on paper. Mark each frame push and pop. The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[N-Queens II #52](https://leetcode.com/problems/n-queens-ii/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? Think about **Row-by-Row Constraints**.

If you're stuck after 5 minutes: revisit the concept page's visual walkthrough. Trace the call stack on paper. Mark each frame push and pop.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Row-by-Row Constraints

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
Apply Row-by-Row Constraints step by step on the example from the problem.
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
    bool valid(int r, int c, vector<int>& cols, vector<int>& d1, vector<int>& d2) {
        return !cols[c] && !d1[r - c + 50] && !d2[r + c];
    }
    void dfs(int r, int n, vector<int>& cols, vector<int>& d1, vector<int>& d2) {
        if (r == n) { ans++; return; }
        for (int c = 0; c < n; c++) {
            if (!valid(r, c, cols, d1, d2)) continue;
            cols[c] = d1[r - c + 50] = d2[r + c] = 1;
            dfs(r + 1, n, cols, d1, d2);
            cols[c] = d1[r - c + 50] = d2[r + c] = 0;
        }
    }
public:
    int totalNQueens(int n) {
        vector<int> cols(n), d1(100), d2(100);
        dfs(0, n, cols, d1, d2);
        return ans;
    }
};
```

### Python
```python
class Solution:
    def totalNQueens(self, n: int) -> int:
        self.ans = 0
        cols, d1, d2 = set(), set(), set()
        def dfs(r):
            if r == n: self.ans += 1; return
            for c in range(n):
                if c in cols or (r - c) in d1 or (r + c) in d2: continue
                cols.add(c); d1.add(r - c); d2.add(r + c)
                dfs(r + 1)
                cols.remove(c); d1.remove(r - c); d2.remove(r + c)
        dfs(0)
        return self.ans
```

### Java
```java
class Solution {
    private int ans = 0;
    public int totalNQueens(int n) {
        dfs(0, n, new boolean[n], new boolean[2 * n], new boolean[2 * n]);
        return ans;
    }
    private void dfs(int r, int n, boolean[] cols, boolean[] d1, boolean[] d2) {
        if (r == n) { ans++; return; }
        for (int c = 0; c < n; c++) {
            if (cols[c] || d1[r - c + n] || d2[r + c]) continue;
            cols[c] = d1[r - c + n] = d2[r + c] = true;
            dfs(r + 1, n, cols, d1, d2);
            cols[c] = d1[r - c + n] = d2[r + c] = false;
        }
    }
}
```

**Complexity:** O(n!) time · O(n) space

---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"This is a recursive problem"** → Trace it. Don't start coding blind.
- **"Row-by-Row Constraints"** → Name the pattern from the concept page.
- **"What's my base case?"** → Define it before the recursive call.
- **"What does the smaller call return?"** → Trust it and combine.

If you tried brute force first, that's fine — the breakthrough is **naming the pattern family**, not memorizing one solution.

> 🎯 **Pattern Unlocked:** Row-by-Row Constraints

---

*One quest down. The next one builds on this pattern. →*
