# ⚔ Quest: Partition to K Subsets (Revisited)

> **Day 19** · [Partition to K Equal Sum Subsets #698](https://leetcode.com/problems/partition-to-k-equal-sum-subsets/) · Medium · 15 min · 35 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Partition to K Equal Sum Subsets on LeetCode](https://leetcode.com/problems/partition-to-k-equal-sum-subsets/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. Trace the call stack on paper. Mark each frame push and pop. The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Partition to K Equal Sum Subsets #698](https://leetcode.com/problems/partition-to-k-equal-sum-subsets/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? Think about **Sorted Pruning Partition**.

If you're stuck after 5 minutes: revisit the concept page's visual walkthrough. Trace the call stack on paper. Mark each frame push and pop.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Sorted Pruning Partition

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
Apply Sorted Pruning Partition step by step on the example from the problem.
Mark the current call frame at each step.
Watch what gets returned (or what choices get made) at each level.
```

> 💡 **The insight:** The code is just the paper trace written in syntax. If you can trace it by hand, you can code it.

---

## Solution

### C++
```cpp
class Solution {
    bool dfs(vector<int>& nums, vector<int>& sides, int i, int target) {
        if (i == (int)nums.size()) {
            for (int s : sides) if (s != target) return false;
            return true;
        }
        for (int j = 0; j < (int)sides.size(); j++) {
            if (sides[j] + nums[i] > target) continue;
            if (j > 0 && sides[j] == sides[j - 1]) continue;
            sides[j] += nums[i];
            if (dfs(nums, sides, i + 1, target)) return true;
            sides[j] -= nums[i];
        }
        return false;
    }
public:
    bool canPartitionKSubsets(vector<int>& nums, int k) {
        int sum = accumulate(nums.begin(), nums.end(), 0);
        if (sum % k) return false;
        sort(nums.rbegin(), nums.rend());
        vector<int> sides(k);
        return dfs(nums, sides, 0, sum / k);
    }
};
```

### Python
```python
class Solution:
    def canPartitionKSubsets(self, nums: List[int], k: int) -> bool:
        total = sum(nums)
        if total % k: return False
        target = total // k
        nums.sort(reverse=True)
        sides = [0] * k
        def dfs(i):
            if i == len(nums):
                return all(s == target for s in sides)
            for j in range(k):
                if sides[j] + nums[i] > target: continue
                if j and sides[j] == sides[j - 1]: continue
                sides[j] += nums[i]
                if dfs(i + 1): return True
                sides[j] -= nums[i]
            return False
        return dfs(0)
```

### Java
```java
class Solution {
    public boolean canPartitionKSubsets(int[] nums, int k) {
        int sum = 0;
        for (int x : nums) sum += x;
        if (sum % k != 0) return false;
        int target = sum / k;
        Integer[] boxed = new Integer[nums.length];
        for (int i = 0; i < nums.length; i++) boxed[i] = nums[i];
        Arrays.sort(boxed, Collections.reverseOrder());
        for (int i = 0; i < nums.length; i++) nums[i] = boxed[i];
        return dfs(nums, new int[k], 0, target);
    }
    private boolean dfs(int[] nums, int[] sides, int i, int target) {
        if (i == nums.length) {
            for (int s : sides) if (s != target) return false;
            return true;
        }
        for (int j = 0; j < sides.length; j++) {
            if (sides[j] + nums[i] > target) continue;
            if (j > 0 && sides[j] == sides[j - 1]) continue;
            sides[j] += nums[i];
            if (dfs(nums, sides, i + 1, target)) return true;
            sides[j] -= nums[i];
        }
        return false;
    }
}
```

**Complexity:** O(k · 2^n) time · O(n) space

---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"This is a recursive problem"** → Trace it. Don't start coding blind.
- **"Sorted Pruning Partition"** → Name the pattern from the concept page.
- **"What's my base case?"** → Define it before the recursive call.
- **"What does the smaller call return?"** → Trust it and combine.

If you tried brute force first, that's fine — the breakthrough is **naming the pattern family**, not memorizing one solution.

> 🎯 **Pattern Unlocked:** Sorted Pruning Partition

---

*Both quests complete. Head to the checkpoint. →*
