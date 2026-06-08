# ⚔ Quest: Combination Sum III

> **Day 15** · [Combination Sum III #216](https://leetcode.com/problems/combination-sum-iii/) · Medium · 15 min · 25 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Combination Sum III on LeetCode](https://leetcode.com/problems/combination-sum-iii/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. Trace the call stack on paper. Mark each frame push and pop. The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Combination Sum III #216](https://leetcode.com/problems/combination-sum-iii/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? Think about **Fixed Count Combinations**.

If you're stuck after 5 minutes: revisit the concept page's visual walkthrough. Trace the call stack on paper. Mark each frame push and pop.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Fixed Count Combinations

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
Apply Fixed Count Combinations step by step on the example from the problem.
Mark the current call frame at each step.
Watch what gets returned (or what choices get made) at each level.
```

> 💡 **The insight:** The code is just the paper trace written in syntax. If you can trace it by hand, you can code it.

---

## Solution

### C++
```cpp
class Solution {
    void dfs(int k, int n, int start, vector<int>& path, vector<vector<int>>& res) {
        if (k == 0 && n == 0) { res.push_back(path); return; }
        if (k == 0 || n <= 0) return;
        for (int i = start; i <= 9; i++) {
            path.push_back(i);
            dfs(k - 1, n - i, i + 1, path, res);
            path.pop_back();
        }
    }
public:
    vector<vector<int>> combinationSum3(int k, int n) {
        vector<vector<int>> res;
        vector<int> path;
        dfs(k, n, 1, path, res);
        return res;
    }
};
```

### Python
```python
class Solution:
    def combinationSum3(self, k: int, n: int) -> List[List[int]]:
        res = []
        def dfs(start, k, rem, path):
            if k == 0 and rem == 0: res.append(list(path)); return
            if k == 0 or rem <= 0: return
            for i in range(start, 10):
                path.append(i); dfs(i + 1, k - 1, rem - i, path); path.pop()
        dfs(1, k, n, [])
        return res
```

### Java
```java
class Solution {
    public List<List<Integer>> combinationSum3(int k, int n) {
        List<List<Integer>> res = new ArrayList<>();
        dfs(k, n, 1, new ArrayList<>(), res);
        return res;
    }
    private void dfs(int k, int n, int start, List<Integer> path, List<List<Integer>> res) {
        if (k == 0 && n == 0) { res.add(new ArrayList<>(path)); return; }
        if (k == 0 || n <= 0) return;
        for (int i = start; i <= 9; i++) {
            path.add(i);
            dfs(k - 1, n - i, i + 1, path, res);
            path.remove(path.size() - 1);
        }
    }
}
```

**Complexity:** O(C(9,k)) time · O(k) space

---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"This is a recursive problem"** → Trace it. Don't start coding blind.
- **"Fixed Count Combinations"** → Name the pattern from the concept page.
- **"What's my base case?"** → Define it before the recursive call.
- **"What does the smaller call return?"** → Trust it and combine.

If you tried brute force first, that's fine — the breakthrough is **naming the pattern family**, not memorizing one solution.

> 🎯 **Pattern Unlocked:** Fixed Count Combinations

---

*Both quests complete. Head to the checkpoint. →*
