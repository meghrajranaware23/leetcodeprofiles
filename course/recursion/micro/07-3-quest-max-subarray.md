# ⚔ Quest: Maximum Subarray

> **Day 7** · [Maximum Subarray #53](https://leetcode.com/problems/maximum-subarray/) · Medium · 15 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Maximum Subarray on LeetCode](https://leetcode.com/problems/maximum-subarray/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. Trace the call stack on paper. Mark each frame push and pop. The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Maximum Subarray #53](https://leetcode.com/problems/maximum-subarray/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? Think about **Divide and Conquer Max**.

If you're stuck after 5 minutes: revisit the concept page's visual walkthrough. Trace the call stack on paper. Mark each frame push and pop.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Divide and Conquer Max

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
Apply Divide and Conquer Max step by step on the example from the problem.
Mark the current call frame at each step.
Watch what gets returned (or what choices get made) at each level.
```

> 💡 **The insight:** The code is just the paper trace written in syntax. If you can trace it by hand, you can code it.

---

## Solution

### C++
```cpp
class Solution {
    int cross(vector<int>& a, int lo, int mid, int hi) {
        int left = INT_MIN, sum = 0;
        for (int i = mid; i >= lo; i--) { sum += a[i]; left = max(left, sum); }
        int right = INT_MIN; sum = 0;
        for (int i = mid + 1; i <= hi; i++) { sum += a[i]; right = max(right, sum); }
        return left + right;
    }
    int dc(vector<int>& a, int lo, int hi) {
        if (lo == hi) return a[lo];
        int mid = lo + (hi - lo) / 2;
        return max({dc(a, lo, mid), dc(a, mid + 1, hi), cross(a, lo, mid, hi)});
    }
public:
    int maxSubArray(vector<int>& nums) { return dc(nums, 0, nums.size() - 1); }
};
```

### Python
```python
class Solution:
    def maxSubArray(self, nums: List[int]) -> int:
        def cross(lo, mid, hi):
            left = float('-inf'); s = 0
            for i in range(mid, lo - 1, -1):
                s += nums[i]; left = max(left, s)
            right = float('-inf'); s = 0
            for i in range(mid + 1, hi + 1):
                s += nums[i]; right = max(right, s)
            return left + right
        def dc(lo, hi):
            if lo == hi: return nums[lo]
            mid = (lo + hi) // 2
            return max(dc(lo, mid), dc(mid + 1, hi), cross(lo, mid, hi))
        return dc(0, len(nums) - 1)
```

### Java
```java
class Solution {
    public int maxSubArray(int[] nums) { return dc(nums, 0, nums.length - 1); }
    private int dc(int[] a, int lo, int hi) {
        if (lo == hi) return a[lo];
        int mid = lo + (hi - lo) / 2;
        return Math.max(Math.max(dc(a, lo, mid), dc(a, mid + 1, hi)), cross(a, lo, mid, hi));
    }
    private int cross(int[] a, int lo, int mid, int hi) {
        int left = Integer.MIN_VALUE, sum = 0;
        for (int i = mid; i >= lo; i--) { sum += a[i]; left = Math.max(left, sum); }
        int right = Integer.MIN_VALUE; sum = 0;
        for (int i = mid + 1; i <= hi; i++) { sum += a[i]; right = Math.max(right, sum); }
        return left + right;
    }
}
```

**Complexity:** O(n log n) time · O(log n) space

---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"This is a recursive problem"** → Trace it. Don't start coding blind.
- **"Divide and Conquer Max"** → Name the pattern from the concept page.
- **"What's my base case?"** → Define it before the recursive call.
- **"What does the smaller call return?"** → Trust it and combine.

If you tried brute force first, that's fine — the breakthrough is **naming the pattern family**, not memorizing one solution.

> 🎯 **Pattern Unlocked:** Divide and Conquer Max

---

*Both quests complete. Head to the checkpoint. →*
