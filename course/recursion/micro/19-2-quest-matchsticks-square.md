# ⚔ Quest: Matchsticks to Square

> **Day 19** · [Matchsticks to Square #473](https://leetcode.com/problems/matchsticks-to-square/) · Medium · 15 min · 35 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Matchsticks to Square on LeetCode](https://leetcode.com/problems/matchsticks-to-square/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. Trace the call stack on paper. Mark each frame push and pop. The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Matchsticks to Square #473](https://leetcode.com/problems/matchsticks-to-square/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? Think about **4-Bucket Partition**.

If you're stuck after 5 minutes: revisit the concept page's visual walkthrough. Trace the call stack on paper. Mark each frame push and pop.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** 4-Bucket Partition

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
Apply 4-Bucket Partition step by step on the example from the problem.
Mark the current call frame at each step.
Watch what gets returned (or what choices get made) at each level.
```

> 💡 **The insight:** The code is just the paper trace written in syntax. If you can trace it by hand, you can code it.

---

## Solution

### C++
```cpp
class Solution {
    bool dfs(vector<int>& ms, vector<int>& sides, int i, int target) {
        if (i == (int)ms.size()) {
            return sides[0] == target && sides[1] == target && sides[2] == target && sides[3] == target;
        }
        for (int j = 0; j < 4; j++) {
            if (sides[j] + ms[i] > target) continue;
            if (j > 0 && sides[j] == sides[j - 1]) continue;
            sides[j] += ms[i];
            if (dfs(ms, sides, i + 1, target)) return true;
            sides[j] -= ms[i];
        }
        return false;
    }
public:
    bool makesquare(vector<int>& matchsticks) {
        int sum = accumulate(matchsticks.begin(), matchsticks.end(), 0);
        if (sum % 4) return false;
        sort(matchsticks.rbegin(), matchsticks.rend());
        vector<int> sides(4);
        return dfs(matchsticks, sides, 0, sum / 4);
    }
};
```

### Python
```python
class Solution:
    def makesquare(self, matchsticks: List[int]) -> bool:
        total = sum(matchsticks)
        if total % 4: return False
        target = total // 4
        matchsticks.sort(reverse=True)
        sides = [0] * 4
        def dfs(i):
            if i == len(matchsticks):
                return all(s == target for s in sides)
            for j in range(4):
                if sides[j] + matchsticks[i] > target: continue
                if j and sides[j] == sides[j - 1]: continue
                sides[j] += matchsticks[i]
                if dfs(i + 1): return True
                sides[j] -= matchsticks[i]
            return False
        return dfs(0)
```

### Java
```java
class Solution {
    public boolean makesquare(int[] matchsticks) {
        int sum = 0;
        for (int x : matchsticks) sum += x;
        if (sum % 4 != 0) return false;
        int target = sum / 4;
        Integer[] boxed = new Integer[matchsticks.length];
        for (int i = 0; i < matchsticks.length; i++) boxed[i] = matchsticks[i];
        Arrays.sort(boxed, Collections.reverseOrder());
        for (int i = 0; i < matchsticks.length; i++) matchsticks[i] = boxed[i];
        return dfs(matchsticks, new int[4], 0, target);
    }
    private boolean dfs(int[] ms, int[] sides, int i, int target) {
        if (i == ms.length) return sides[0] == target && sides[1] == target && sides[2] == target;
        for (int j = 0; j < 4; j++) {
            if (sides[j] + ms[i] > target) continue;
            if (j > 0 && sides[j] == sides[j - 1]) continue;
            sides[j] += ms[i];
            if (dfs(ms, sides, i + 1, target)) return true;
            sides[j] -= ms[i];
        }
        return false;
    }
}
```

**Complexity:** O(4 · 2^n) time · O(n) space

---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"This is a recursive problem"** → Trace it. Don't start coding blind.
- **"4-Bucket Partition"** → Name the pattern from the concept page.
- **"What's my base case?"** → Define it before the recursive call.
- **"What does the smaller call return?"** → Trust it and combine.

If you tried brute force first, that's fine — the breakthrough is **naming the pattern family**, not memorizing one solution.

> 🎯 **Pattern Unlocked:** 4-Bucket Partition

---

*One quest down. The next one builds on this pattern. →*
