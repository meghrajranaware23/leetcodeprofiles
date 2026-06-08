# ⚔ Quest: Sort an Array

> **Day 7** · [Sort an Array #912](https://leetcode.com/problems/sort-an-array/) · Medium · 15 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Sort an Array on LeetCode](https://leetcode.com/problems/sort-an-array/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. Trace the call stack on paper. Mark each frame push and pop. The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[Sort an Array #912](https://leetcode.com/problems/sort-an-array/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which pattern from today's concept applies? Think about **Merge Sort Recursion**.

If you're stuck after 5 minutes: revisit the concept page's visual walkthrough. Trace the call stack on paper. Mark each frame push and pop.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Merge Sort Recursion

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
Apply Merge Sort Recursion step by step on the example from the problem.
Mark the current call frame at each step.
Watch what gets returned (or what choices get made) at each level.
```

> 💡 **The insight:** The code is just the paper trace written in syntax. If you can trace it by hand, you can code it.

---

## Solution

### C++
```cpp
class Solution {
    void merge(vector<int>& a, int lo, int mid, int hi, vector<int>& tmp) {
        int i = lo, j = mid + 1, k = lo;
        while (i <= mid && j <= hi)
            tmp[k++] = a[i] <= a[j] ? a[i++] : a[j++];
        while (i <= mid) tmp[k++] = a[i++];
        while (j <= hi) tmp[k++] = a[j++];
        for (int t = lo; t <= hi; t++) a[t] = tmp[t];
    }
    void sort(vector<int>& a, int lo, int hi, vector<int>& tmp) {
        if (lo >= hi) return;
        int mid = lo + (hi - lo) / 2;
        sort(a, lo, mid, tmp);
        sort(a, mid + 1, hi, tmp);
        merge(a, lo, mid, hi, tmp);
    }
public:
    vector<int> sortArray(vector<int>& nums) {
        vector<int> tmp(nums.size());
        sort(nums, 0, nums.size() - 1, tmp);
        return nums;
    }
};
```

### Python
```python
class Solution:
    def sortArray(self, nums: List[int]) -> List[int]:
        def merge(lo, mid, hi):
            tmp = nums[lo:hi + 1]
            i, j, k = 0, mid - lo + 1, lo
            while i <= mid - lo and j <= hi - lo:
                if tmp[i] <= tmp[j]:
                    nums[k] = tmp[i]; i += 1
                else:
                    nums[k] = tmp[j]; j += 1
                k += 1
            while i <= mid - lo:
                nums[k] = tmp[i]; i += 1; k += 1
            while j <= hi - lo:
                nums[k] = tmp[j]; j += 1; k += 1
        def sort(lo, hi):
            if lo >= hi: return
            mid = (lo + hi) // 2
            sort(lo, mid); sort(mid + 1, hi); merge(lo, mid, hi)
        sort(0, len(nums) - 1)
        return nums
```

### Java
```java
class Solution {
    public int[] sortArray(int[] nums) {
        int[] tmp = new int[nums.length];
        sort(nums, 0, nums.length - 1, tmp);
        return nums;
    }
    private void sort(int[] a, int lo, int hi, int[] tmp) {
        if (lo >= hi) return;
        int mid = lo + (hi - lo) / 2;
        sort(a, lo, mid, tmp);
        sort(a, mid + 1, hi, tmp);
        merge(a, lo, mid, hi, tmp);
    }
    private void merge(int[] a, int lo, int mid, int hi, int[] tmp) {
        int i = lo, j = mid + 1, k = lo;
        while (i <= mid && j <= hi) tmp[k++] = a[i] <= a[j] ? a[i++] : a[j++];
        while (i <= mid) tmp[k++] = a[i++];
        while (j <= hi) tmp[k++] = a[j++];
        for (int t = lo; t <= hi; t++) a[t] = tmp[t];
    }
}
```

**Complexity:** O(n log n) time · O(n) space

---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"This is a recursive problem"** → Trace it. Don't start coding blind.
- **"Merge Sort Recursion"** → Name the pattern from the concept page.
- **"What's my base case?"** → Define it before the recursive call.
- **"What does the smaller call return?"** → Trust it and combine.

If you tried brute force first, that's fine — the breakthrough is **naming the pattern family**, not memorizing one solution.

> 🎯 **Pattern Unlocked:** Merge Sort Recursion

---

*One quest down. The next one builds on this pattern. →*
