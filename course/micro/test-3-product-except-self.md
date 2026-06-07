# ⚔ E-Rank Test — Problem 3

> [Product of Array Except Self #238](https://leetcode.com/problems/product-of-array-except-self/) · Medium · 100 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Product of Array Except Self on LeetCode](https://leetcode.com/problems/product-of-array-except-self/)**

> ⚔ **Hunter's rule:** This is a rank test — treat it like real LeetCode practice. No peeking until you've genuinely tried.

---

## The Problem

Given an integer array `nums`, return an array `answer` where `answer[i]` equals the product of all elements **except** `nums[i]`. You must do it in O(n) time **without using division**.

```
Input:  [1, 2, 3, 4]
Output: [24, 12, 8, 6]

Input:  [-1, 1, 0, -3, 3]
Output: [0, 0, 9, 0, 0]
```

---

## 💡 Hints

> 🎯 **What's being tested:** Prefix/suffix product thinking — the extension of prefix sums to products (Day 5).

`answer[i] = (product of everything LEFT of i) × (product of everything RIGHT of i)`

Two passes: build left products first, then multiply in right products.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Prefix + Suffix Products (Extension of Prefix Sums)

| Clue in the problem | What it signals |
|---|---|
| "product of all elements **except** nums[i]" | Each answer uses everything left × right of i |
| "without division" | Can't simply divide total product — use prefix/suffix |
| "O(n) time" | Two passes, not nested loops |
| "except self" / "exclude index i" | Prefix × suffix at every position |
| answer[i] depends on **all other** elements | Precompute left and right aggregates |

**How to identify from the statement:** "Except self" is the giveaway — each index needs aggregated info from **both sides**. That's prefix thinking applied to multiplication.

**How a strong solver thinks before coding:**
1. *"Product except self → prefix products from left, suffix from right."*
2. *"answer[i] = left_product × right_product."*
3. *"Two passes, O(1) extra space if output array doesn't count."*
4. *"'Except self' = need both sides — same instinct as pivot index, but multiply."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **For each i, loop all j ≠ i and multiply** | O(n²) — nested loops re-walk the same products |
| **Compute total product, divide by nums[i]** | Violates "without division" — also breaks on zeros |
| **Build separate left[] and right[] arrays** | O(n) extra space — two-pass trick folds suffix into the answer array |

**The insight brute force misses:** `answer[i]` only needs the **product of everything left of i** and **everything right of i**. Prefix products from the left, suffix products from the right — same precomputation instinct as range sums, different operator.

---

## 🎯 Transfer to Unseen Problems

Can you spot prefix/suffix thinking without the word "product"?

**Scenario 1:** *"Given an array, return an array where each element is the sum of all elements to its left (index 0 gets 0)."*

Which pattern? **Prefix sum construction** (Running Sum variant). One forward pass, `result[i] = result[i-1] + nums[i-1]`.

**Scenario 2:** *"Given an array, find the index where the product of elements to the left equals the product of elements to the right."*

Which pattern? **Prefix/suffix products + balance check** — pivot index with multiplication instead of addition. Total product is tricky with zeros; prefix/suffix products handle it cleanly.

**Scenario 3:** *"Given a matrix, precompute row sums so any rectangular region sum can be answered in O(1)."*

Which pattern? **2D prefix sums** (B-Rank preview). Same precomputation instinct, extended to two dimensions.

> **Answer key:** All three → prefix/suffix family. Scenario 1 is addition (Day 5). Scenario 2 is the product mirror of pivot index. Scenario 3 is the 2D extension. If "except self" or "both sides" appears → prefix + suffix.

---

<details>
<summary><strong>📖 Solution & Walkthrough</strong></summary>

### Walkthrough

`answer[i] = (product of everything LEFT of i) × (product of everything RIGHT of i)`

Two passes: build left products first, then multiply in right products.

```
nums:    [ 1,  2,  3,  4 ]
left:    [ 1,  1,  2,  6 ]    ← prefix products
right:   [24, 12,  4,  1 ]    ← suffix products
answer:  [24, 12,  8,  6 ]    ← left × right
```

### C++
```cpp
class Solution {
public:
    vector<int> productExceptSelf(vector<int>& nums) {
        int n = nums.size();
        vector<int> answer(n, 1);
        int left_product = 1;
        for (int i = 0; i < n; i++) {
            answer[i] = left_product;
            left_product *= nums[i];
        }
        int right_product = 1;
        for (int i = n - 1; i >= 0; i--) {
            answer[i] *= right_product;
            right_product *= nums[i];
        }
        return answer;
    }
};
```

### Python
```python
class Solution:
    def productExceptSelf(self, nums: list[int]) -> list[int]:
        n = len(nums)
        answer = [1] * n
        left_product = 1
        for i in range(n):
            answer[i] = left_product
            left_product *= nums[i]
        right_product = 1
        for i in range(n - 1, -1, -1):
            answer[i] *= right_product
            right_product *= nums[i]
        return answer
```

### Java
```java
class Solution {
    public int[] productExceptSelf(int[] nums) {
        int n = nums.length;
        int[] answer = new int[n];
        Arrays.fill(answer, 1);
        int leftProduct = 1;
        for (int i = 0; i < n; i++) {
            answer[i] = leftProduct;
            leftProduct *= nums[i];
        }
        int rightProduct = 1;
        for (int i = n - 1; i >= 0; i--) {
            answer[i] *= rightProduct;
            rightProduct *= nums[i];
        }
        return answer;
    }
}
```

**Complexity:** O(n) time · O(1) extra space (output array doesn't count)

</details>

---

## 💭 What Should Have Clicked in Your Mind?

- **"Except nums[i]"** → Don't include index i — need left half × right half.
- **"No division"** → Prefix/suffix products, not total/nums[i].
- **"This is prefix sums with multiplication"** → Same precomputation instinct, different operator.

This is the capstone E-Rank pattern test: if prefix sums clicked on Day 5, this is the natural extension.

---

## 🏁 Scoring

| Result | Verdict |
|---|---|
| 3/3 solved | **Perfect.** You're ready for D-Rank. |
| 2/3 solved | **Pass.** Advance to D-Rank. Revisit the one you missed. |
| 1/3 solved | **Not yet.** Re-study the relevant days, retry in 24 hours. |
| 0/3 solved | **Go back.** Re-do Days 1–5 with focus. |

---

*Test complete. Proceed to claim your rank-up. →*
