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

## 🏁 Scoring

| Result | Verdict |
|---|---|
| 3/3 solved | **Perfect.** You're ready for D-Rank. |
| 2/3 solved | **Pass.** Advance to D-Rank. Revisit the one you missed. |
| 1/3 solved | **Not yet.** Re-study the relevant days, retry in 24 hours. |
| 0/3 solved | **Go back.** Re-do Days 1–5 with focus. |

---

*Test complete. Proceed to claim your rank-up. →*
