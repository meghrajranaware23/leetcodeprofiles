# ⚔ Quest: Find Pivot Index

> **Day 5** · [Find Pivot Index #724](https://leetcode.com/problems/find-pivot-index/) · Easy · 10 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Find Pivot Index on LeetCode](https://leetcode.com/problems/find-pivot-index/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen, paper, or your editor. The hints and walkthrough below are for *after* your attempt.

---

## The Problem

Given an array of integers `nums`, return the **pivot index** — the index where the sum of all elements to the left equals the sum of all elements to the right. If no such index exists, return `-1`.

```
Input:  [1, 7, 3, 6, 5, 6]
Output: 3       (← left sum: 1+7+3 = 11, right sum: 5+6 = 11)

Input:  [1, 2, 3]
Output: -1      (← no index where left sum = right sum)
```

---

## 💡 Hints

You know the total sum. As you scan left to right, track a running left sum. Can you compute the right sum without a second pass?

At each index: `right_sum = total - left_sum - nums[i]`.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Prefix Sum Thinking — Left/Right Balance

**How to identify this from the problem statement:**
- "sum of left equals sum of right" → split the array at index i into two halves
- "pivot index" → at each position, compare cumulative left sum vs everything else
- you know total sum → right sum = total − left − current (no second pass needed)

| Keyword / phrase | What it signals |
|---|---|
| "left sum equals right sum" | Running left sum + total |
| "pivot" / "balance point" | Prefix sum thinking |
| "split the array" | left_sum vs (total - left_sum - nums[i]) |

**Why this pattern works:** Total sum is fixed. As you walk left to right, left_sum grows and right_sum shrinks — you check equality at each step in O(1).

**How a strong solver thinks before coding:**
1. *"Balance point → total sum first."*
2. *"At index i: left = running sum, right = total - left - nums[i]."*
3. *"No prefix array needed — running sum is enough."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **At each index, loop left to sum left half, loop right to sum right half** | O(n²) — two inner loops per position |
| **Build full prefix array AND suffix array, then compare** | Works, but O(n) extra space when a running sum + total suffices |
| **Sort or rearrange first** | Pivot index is about **position**, not value order — sorting destroys the problem |

**The insight brute force misses:** The **total sum is fixed**. As you walk left to right, `left_sum` grows and `right_sum = total - left_sum - nums[i]` shrinks automatically. One subtraction per index — no second pass, no extra array.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Find Pivot Index #724](https://leetcode.com/problems/find-pivot-index/) | Return first balance index | Total + running left sum |
| [Left and Right Sum Differences #2574](https://leetcode.com/problems/left-and-right-sum-differences/) | Return both sums at every index | Prefix/suffix split at each i |
| [Range Sum Query #303](https://leetcode.com/problems/range-sum-query-immutable/) | Range query instead of balance | Full prefix array + subtraction |
| [Find the Highest Altitude #1732](https://leetcode.com/problems/find-the-highest-altitude/) | Track max of running sum | Running cumulative total |

The *question* changes (balance point vs range vs max altitude) — the **prefix thinking** does not.

---

## 📖 Walkthrough

Compute the total sum first. Then scan left to right, maintaining a running left sum. At each index, the right sum is `total - left_sum - nums[i]`.

```
nums = [1, 7, 3, 6, 5, 6]
total = 28

i=0: left=0,  right=28-0-1=27   → 0 ≠ 27
i=1: left=1,  right=28-1-7=20   → 1 ≠ 20
i=2: left=8,  right=28-8-3=17   → 8 ≠ 17
i=3: left=11, right=28-11-6=11  → 11 == 11 ✓ → return 3
```

> 💡 **The insight:** You don't need a prefix sum array here. A single running total and one subtraction does the job. This is prefix sum thinking without the extra array.

---

## Solution

### C++
```cpp
class Solution {
public:
    int pivotIndex(vector<int>& nums) {
        int total = 0;
        for (int num : nums) total += num;
        int left_sum = 0;
        for (int i = 0; i < nums.size(); i++) {
            int right_sum = total - left_sum - nums[i];
            if (left_sum == right_sum) return i;
            left_sum += nums[i];
        }
        return -1;
    }
};
```

### Python
```python
class Solution:
    def pivotIndex(self, nums: list[int]) -> int:
        total = sum(nums)
        left_sum = 0
        for i, num in enumerate(nums):
            right_sum = total - left_sum - num
            if left_sum == right_sum:
                return i
            left_sum += num
        return -1
```

### Java
```java
class Solution {
    public int pivotIndex(int[] nums) {
        int total = 0;
        for (int num : nums) total += num;
        int leftSum = 0;
        for (int i = 0; i < nums.length; i++) {
            int rightSum = total - leftSum - nums[i];
            if (leftSum == rightSum) return i;
            leftSum += nums[i];
        }
        return -1;
    }
}
```

**Complexity:** O(n) time · O(1) space

---

## 💭 What Should Have Clicked in Your Mind?

Before you opened your editor, these thoughts should have fired:

- **"Left equals right"** → Prefix sum family. Think totals, not nested loops.
- **"Compute total once"** → Then every index check is O(1) via subtraction.
- **"Don't overbuild a prefix array"** → A running sum suffices — lighter than Range Sum Query.
- **"Right sum shrinks as left sum grows"** → One forward pass; no backward scan needed.

This is prefix sum **thinking** without the extra array. Next time: hear "balance point" or "equilibrium" → say "total minus running left" before writing code.

> 🎯 **Pattern Unlocked:** Prefix sum thinking for balance-point problems. Compute the total, then use a running sum to split "left vs right" at each position.

---

*Both quests done! Time for your final E-Rank checkpoint. →*
