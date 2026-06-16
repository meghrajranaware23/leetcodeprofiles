<!-- hand-authored -->
# ⚔ Quest: Maximum Subarray

> **Day 7** · [Maximum Subarray #53](https://leetcode.com/problems/maximum-subarray/) · Medium · 15 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Maximum Subarray on LeetCode](https://leetcode.com/problems/maximum-subarray/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. For `[-2,1,-3,4,-1,2,1,-5,4]`, find the cross sum at mid=4. The hints below are for *after* your attempt.

---

## The Problem

Given an integer array `nums`, find the **contiguous subarray** with the **largest sum** and return its sum.

```
Input:  nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
Output: 6
Explanation: [4, -1, 2, 1] has sum 6.

Input:  nums = [1]
Output: 1

Input:  nums = [5, 4, -1, 7, 8]
Output: 23
```

---

## 💡 Hints

Which pattern from today's concept applies? **Divide-and-conquer max** — best in left, best in right, best **crossing** mid.

If you're stuck after 5 minutes: cross = max suffix ending at mid + max prefix starting at mid+1.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Divide and Conquer Max

**How to identify this from the problem statement:**
- "Contiguous subarray" + recursive framing → split range, three candidates at combine
- **Cross-midpoint** subarray is the piece left-only/right-only miss
- Classic interview also uses Kadane O(n) — today's lesson is D&C shape

| Keyword / phrase | What it signals |
|---|---|
| "maximum subarray sum" | `max(left, right, cross)` |
| "contiguous" | Subarray = one interval [i..j] |
| "divide" / midpoint | Split `[lo,hi]` at mid |
| "spanning" / "crossing" | Suffix from mid + prefix from mid+1 |

**Why this pattern works:** Any optimal subarray lies entirely left, entirely right, or crosses mid. Recursion handles left/right; `cross()` handles the third case in O(n) per level → O(n log n).

**How a strong solver thinks before coding:**
1. *"Base: lo == hi → return nums[lo]."*
2. *"Left max = dc(lo,mid), right max = dc(mid+1,hi)."*
3. *"Cross: scan left from mid, scan right from mid+1, add bests."*
4. *"Return max of three — never forget cross."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **All O(n²) pairs (i,j)** | O(n²) — works small n, not the D&C lesson |
| **D&C without cross term** | Misses `[4,-1,2,1]` spanning mid in example |
| **Cross only, no recursion** | Can't decompose left/right optimally |
| **Sum entire array** | Subarray must be contiguous — may skip negatives |

**The insight brute force misses:** The answer might **straddle the split**. Left + right recursion alone is incomplete.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Maximum Subarray #53](https://leetcode.com/problems/maximum-subarray/) | Sum only | D&C with cross |
| [Maximum Product Subarray #152](https://leetcode.com/problems/maximum-product-subarray/) | Product | Cross tracks min/max product |
| [Best Time to Buy and Sell Stock](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/) | Kadane variant | O(n) alternative |
| [Shortest Subarray with Sum at Least K](https://leetcode.com/problems/shortest-subarray-with-sum-at-least-k/) | Deque / harder | Different tool |

---

## 📖 Walkthrough

`nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]`, indices 0..8, `mid = 4` (value -1):

```
THREE CANDIDATES at top level:

LEFT half [0..4]:  dc(0,4) → best entirely left
RIGHT half [5..8]: dc(5,8) → best entirely right
CROSS at mid=4:

  Scan LEFT from mid down to lo (suffix ending at mid):
    i=4: -1  sum=-1  best=-1
    i=3:  4  sum=3   best=3
    i=2:-3  sum=0   best=3
    i=1:  1  sum=1   best=3
    i=0:-2  sum=-1  best=3
    left_best = 3  (subarray [4] alone... but full suffix [4,-1] = 3)

  Scan RIGHT from mid+1 up to hi (prefix starting at mid+1):
    i=5:  2  sum=2   best=2
    i=6:  1  sum=3   best=3
    i=7: -5  sum=-2  best=3
    i=8:  4  sum=2   best=3
    right_best = 3  (prefix [2,1])

  cross = 3 + 3 = 6  ← matches [4,-1,2,1]

dc(0,8) = max(left_dc, right_dc, 6) = 6 ✓
```

Recursive split sketch:

```
        dc(0,8)
       /   |   \
  dc(0,4) dc(5,8) cross=6
   /  \     /  \
 ...  ...  ...  ...
```

> 💡 **The insight:** Cross is O(length) glue at each merge level — the D&C analog of merge's combine step.

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

- **"Max contiguous sum"** → Could be Kadane O(n), but D&C = three-way max.
- **"Crossing mid"** → Suffix ending at mid + prefix starting at mid+1.
- **"Never skip cross"** → Example answer `[4,-1,2,1]` spans the split.
- **"Base: single element"** → `lo == hi` returns that element (may be negative).

If you only compared left and right halves, cross is the fix — same combine discipline as merge sort.

> 🎯 **Pattern Unlocked:** Divide-and-conquer max — left, right, and cross-midpoint at every combine.

---

*Both quests complete. Head to the checkpoint. →*
