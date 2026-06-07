# ⚔ Quest: Range Sum Query

> **Day 5** · [Range Sum Query — Immutable #303](https://leetcode.com/problems/range-sum-query-immutable/) · Easy · 10 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Range Sum Query on LeetCode](https://leetcode.com/problems/range-sum-query-immutable/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen, paper, or your editor. The hints and walkthrough below are for *after* your attempt.

---

## The Problem

Given an integer array `nums`, handle multiple queries: calculate the sum of elements between indices `left` and `right` inclusive.

```
nums = [-2, 0, 3, -5, 2, -1]
sumRange(0, 2) → 1    (-2 + 0 + 3)
sumRange(2, 5) → -1   (3 + -5 + 2 + -1)
sumRange(0, 5) → -3   (entire array)
```

---

## 💡 Hints

If you just loop from left to right for each query, that's O(n) per query. With many queries, this adds up. Can you precompute something?

Build a prefix sum array once. Every query becomes a single subtraction: `prefix[R+1] - prefix[L]`.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Prefix Sum Precomputation

**How to identify this from the problem statement:**
- "sum of elements between indices left and right" → classic range sum query
- "multiple queries" → precompute once, answer each in O(1)
- "immutable" → array won't change, so preprocessing is safe

| Keyword / phrase | What it signals |
|---|---|
| "range sum" / "sum from L to R" | Prefix sum array |
| "multiple queries" | Build prefix once |
| "immutable" / "fixed array" | Preprocessing won't be invalidated |

**Why this pattern works:** `prefix[i]` = sum of first i elements. Range sum = prefix[R+1] − prefix[L] — one subtraction replaces a loop.

**How a strong solver thinks before coding:**
1. *"Range sum query → prefix array, length n+1, prefix[0]=0."*
2. *"Answer = prefix[right+1] - prefix[left]."*
3. *"Build in constructor; query in O(1)."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Loop from `left` to `right` for each query** | O(n) per query — with 10,000 queries on a 10,000-element array, that's 100 million operations |
| **Recompute prefix from scratch per query** | You already have cumulative totals — rebuilding them wastes the entire point of preprocessing |
| **Store every possible range sum in a 2D table** | O(n²) space and build time — prefix array does the same job in O(n) |

**The insight brute force misses:** Every range sum is a **difference of two prefix values**. You don't need to touch the elements between L and R at query time — they're already baked into `prefix[R+1]` and `prefix[L]`.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Running Sum of 1D Array #1480](https://leetcode.com/problems/running-sum-of-1d-array/) | Output IS the prefix array | Build cumulative totals |
| [Find Pivot Index #724](https://leetcode.com/problems/find-pivot-index/) | Balance check, not range query | Total − running left − current |
| [Left and Right Sum Differences #2574](https://leetcode.com/problems/left-and-right-sum-differences/) | Return both sides at each index | Prefix/suffix split |
| [Product of Array Except Self #238](https://leetcode.com/problems/product-of-array-except-self/) | Multiply instead of add | Prefix × suffix products |

If you recognized Range Sum Query, you already have the skeleton for every prefix-family problem in E-Rank.

---

## 📖 Walkthrough

Build a prefix sum array once. Every query becomes a single subtraction:

```
nums:    [-2,  0,  3, -5,  2, -1]
prefix:  [ 0, -2, -2,  1, -4, -2, -3]

sumRange(0, 2) = prefix[3] - prefix[0] = 1 - 0 = 1       ✓
sumRange(2, 5) = prefix[6] - prefix[2] = -3 - (-2) = -1   ✓
sumRange(0, 5) = prefix[6] - prefix[0] = -3 - 0 = -3      ✓
```

> 💡 **The insight:** O(n) preprocessing, then **O(1) per query** forever. This is the power of precomputation.

---

## Solution

### C++
```cpp
class NumArray {
    vector<int> prefix;
public:
    NumArray(vector<int>& nums) {
        int n = nums.size();
        prefix.resize(n + 1, 0);
        for (int i = 0; i < n; i++)
            prefix[i + 1] = prefix[i] + nums[i];
    }
    int sumRange(int left, int right) {
        return prefix[right + 1] - prefix[left];
    }
};
```

### Python
```python
class NumArray:
    def __init__(self, nums: list[int]):
        n = len(nums)
        self.prefix = [0] * (n + 1)
        for i in range(n):
            self.prefix[i + 1] = self.prefix[i] + nums[i]

    def sumRange(self, left: int, right: int) -> int:
        return self.prefix[right + 1] - self.prefix[left]
```

### Java
```java
class NumArray {
    private int[] prefix;
    public NumArray(int[] nums) {
        int n = nums.length;
        prefix = new int[n + 1];
        for (int i = 0; i < n; i++)
            prefix[i + 1] = prefix[i] + nums[i];
    }
    public int sumRange(int left, int right) {
        return prefix[right + 1] - prefix[left];
    }
}
```

**Complexity:** O(n) build · O(1) per query · O(n) space

---

## 💭 What Should Have Clicked in Your Mind?

Before you opened your editor, these thoughts should have fired:

- **"Sum from index L to R"** → Prefix sum. Not a loop per query.
- **"Multiple queries" + "immutable"** → Precompute in constructor. The upfront O(n) pays off on query #2.
- **`prefix[R+1] - prefix[L]`** → This formula should become automatic — the +1 is not optional.
- **"I don't need to touch elements between L and R"** → They're already summed into the prefix array.

If you looped from L to R for each query, you found the brute force — but the pattern signal was "range sum" all along. Next time: hear "range query" → say "prefix subtraction" before writing code.

> 🎯 **Pattern Unlocked:** Prefix sum precomputation for O(1) range queries. The formula `prefix[R+1] - prefix[L]` will become muscle memory.

---

*Next: the most important technique in E-Rank — prefix sums meet hash maps. →*
