# ⚔ Quest: Single Number

> **Day 27** · [Single Number #136](https://leetcode.com/problems/single-number/) · Easy · 30 XP · 12 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Single Number on LeetCode](https://leetcode.com/problems/single-number/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen, paper, or your editor. The hints and walkthrough below are for *after* your attempt.

---

## The Problem

Given a **non-empty** array of integers `nums`, every element appears **twice** except for one. Find that single element.

You must implement a solution with **linear runtime** and use only **constant extra space**.

```
Input:  nums = [2, 2, 1]
Output: 1

Input:  nums = [4, 1, 2, 1, 2]
Output: 4

Input:  nums = [1]
Output: 1
```

---

## 💡 Hints

Every element appears **twice** except one → **pairs cancel**. XOR has the self-inverse property: `a ^ a = 0`.

XOR all elements in the array. Pairs cancel to 0; the lone element survives.

`result ^= nums[i]` for each element. No hash map needed — O(n) time, O(1) space.

Order doesn't matter: `a ^ b ^ a ^ c ^ b = c` regardless of arrangement.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** XOR Cancellation — Self-Inverse Parity

**How to identify this from the problem statement:**
- "every element appears twice except one" → XOR trigger
- "linear runtime" + "constant space" → rules out hash map counting
- find the unique → not index, not frequency table
- non-empty array → at least one element

| Keyword / phrase | What it signals |
|---|---|
| "appears twice except one" | XOR — pairs cancel |
| "single element" / "single number" | Parity / cancellation |
| "linear time" + "constant space" | XOR O(n) O(1) — hash map is O(n) space |
| "find the one that doesn't have a pair" | a ^ a = 0 |

**Why this pattern works:** XOR is commutative and associative. Every paired element contributes `x ^ x = 0`. The unpaired element is the only non-zero residue.

**How a strong solver thinks before coding:**
1. *"Twice except one → XOR all elements."*
2. *"Pairs cancel. Result is the lone number."*
3. *"O(n) time, O(1) space — one variable."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Hash map count frequencies** | O(n) space — violates constant-space constraint |
| **Sort and check neighbors** | O(n log n) time — XOR is O(n) |
| **Nested loops find unmatched** | O(n²) time |
| **Sum formula (2×sum(unique) − sum(all))** | Overflow risk on large integers; XOR avoids arithmetic |

**The insight brute force misses:** You don't need to *identify* which elements pair — XOR lets them cancel automatically without tracking partners.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Single Number #136](https://leetcode.com/problems/single-number/) | One unique, rest paired | XOR all |
| [Single Number III #260](https://leetcode.com/problems/single-number-iii/) | Two uniques, rest paired | XOR all, split groups |
| [Missing Number #268](https://leetcode.com/problems/missing-number/) | 0..n with one gap | XOR indices and values |
| [Find the Duplicate Number #287](https://leetcode.com/problems/find-the-duplicate-number/) | One duplicate | Different technique (Floyd's) |

#136 is the XOR foundation — every bitmask parity problem starts here.

---

## 📖 Walkthrough

```
nums = [4, 1, 2, 1, 2]

result = 0

4: result = 0 ^ 4 = 4
1: result = 4 ^ 1 = 5
2: result = 5 ^ 2 = 7
1: result = 7 ^ 1 = 6    (1^1 cancels... not yet, first 1 still in)
2: result = 6 ^ 2 = 4    (2^2 cancels with earlier 2)

Wait — trace more carefully:
  0 ^ 4 = 4
  4 ^ 1 = 5
  5 ^ 2 = 7
  7 ^ 1 = 6   (second 1 pairs with... we'll see)
  6 ^ 2 = 4   (second 2: 6 = 4^1^2, then ^2 = 4^1 = 5... let me redo)

  0 ^ 4 = 4
  4 ^ 1 = 5
  5 ^ 2 = 7
  7 ^ 1 = 6     (has 4^1^2^1)
  6 ^ 2 = 4     (4^1^2^1^2 = 4^1^1^2^2 = 4^0^0 = 4) ✓
```

> 💡 **The insight:** You never need to find pairs explicitly. XOR commutes and self-cancels — the order of operations doesn't matter, only parity.

---

## Solution

### C++
```cpp
class Solution {
public:
    int singleNumber(vector<int>& nums) {
        int result = 0;
        for (int n : nums) result ^= n;
        return result;
    }
};
```

### Python
```python
class Solution:
    def singleNumber(self, nums: list[int]) -> int:
        result = 0
        for n in nums:
            result ^= n
        return result
```

### Java
```java
class Solution {
    public int singleNumber(int[] nums) {
        int result = 0;
        for (int n : nums) result ^= n;
        return result;
    }
}
```

**Complexity:** O(n) time · O(1) space

---

## 💭 What Should Have Clicked in Your Mind?

Before you opened your editor, these thoughts should have fired:

- **"Every element appears twice except one"** → XOR cancellation — Day 27 bitmask.
- **"Constant extra space"** → No hash map — single integer accumulator.
- **"Linear runtime"** → One pass XOR — O(n).
- **a ^ a = 0** → Pairs vanish; lone element survives.
- **Order doesn't matter** → XOR is commutative and associative.

If you built a frequency map, you solved it but missed the bitwise signal. The constraints scream XOR: linear time + constant space + pairs.

> 🎯 **Pattern:** XOR all elements. Self-inverse cancellation leaves the single number.

---

*Next: pack words into bitmasks — find the max product with no shared letters. →*
