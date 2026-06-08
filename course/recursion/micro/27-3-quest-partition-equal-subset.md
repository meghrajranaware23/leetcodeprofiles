# ⚔ Quest: Partition Equal Subset Sum

> **Day 27** · [Partition Equal Subset Sum #416](https://leetcode.com/problems/partition-equal-subset-sum/) · Medium · 15 min · 40 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Partition Equal Subset Sum on LeetCode](https://leetcode.com/problems/partition-equal-subset-sum/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. Trace the call stack on paper. Mark each frame push and pop. The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Partition Equal Subset Sum #416](https://leetcode.com/problems/partition-equal-subset-sum/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? Think about **Subset Sum Memoization**.

If you're stuck after 5 minutes: revisit the concept page's visual walkthrough. Trace the call stack on paper. Mark each frame push and pop.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Subset Sum Memoization

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
Apply Subset Sum Memoization step by step on the example from the problem.
Mark the current call frame at each step.
Watch what gets returned (or what choices get made) at each level.
```

> 💡 **The insight:** The code is just the paper trace written in syntax. If you can trace it by hand, you can code it.

---

## Solution

### C++
```cpp
class Solution {
    vector<vector<int>> memo;
    bool dfs(vector<int>& nums, int i, int rem) {
        if (rem == 0) return true;
        if (i == (int)nums.size() || rem < 0) return false;
        if (memo[i][rem] != -1) return memo[i][rem];
        return memo[i][rem] = dfs(nums, i + 1, rem - nums[i]) || dfs(nums, i + 1, rem);
    }
public:
    bool canPartition(vector<int>& nums) {
        int sum = accumulate(nums.begin(), nums.end(), 0);
        if (sum % 2) return false;
        memo.assign(nums.size(), vector<int>(sum / 2 + 1, -1));
        return dfs(nums, 0, sum / 2);
    }
};
```

### Python
```python
class Solution:
    def canPartition(self, nums: List[int]) -> bool:
        total = sum(nums)
        if total % 2: return False
        target = total // 2
        memo = {}
        def dfs(i, rem):
            if rem == 0: return True
            if i == len(nums) or rem < 0: return False
            if (i, rem) in memo: return memo[(i, rem)]
            memo[(i, rem)] = dfs(i + 1, rem - nums[i]) or dfs(i + 1, rem)
            return memo[(i, rem)]
        return dfs(0, target)
```

### Java
```java
class Solution {
    private Boolean[][] memo;
    public boolean canPartition(int[] nums) {
        int sum = 0;
        for (int x : nums) sum += x;
        if (sum % 2 != 0) return false;
        memo = new Boolean[nums.length][sum / 2 + 1];
        return dfs(nums, 0, sum / 2);
    }
    private boolean dfs(int[] nums, int i, int rem) {
        if (rem == 0) return true;
        if (i == nums.length || rem < 0) return false;
        if (memo[i][rem] != null) return memo[i][rem];
        return memo[i][rem] = dfs(nums, i + 1, rem - nums[i]) || dfs(nums, i + 1, rem);
    }
}
```

**Complexity:** O(n · sum) time · O(sum) space

---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"This is a recursive problem"** → Trace it. Don't start coding blind.
- **"Subset Sum Memoization"** → Name the pattern from the concept page.
- **"What's my base case?"** → Define it before the recursive call.
- **"What does the smaller call return?"** → Trust it and combine.

If you tried brute force first, that's fine — the breakthrough is **naming the pattern family**, not memorizing one solution.

> 🎯 **Pattern Unlocked:** Subset Sum Memoization

---

*Both quests complete. Head to the checkpoint. →*
