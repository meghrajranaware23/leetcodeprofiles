<!-- hand-authored -->
# ⚔ B-Rank Test — Problem 2

> [Maximum Length of Subarray With Positive Product #1567](https://leetcode.com/problems/maximum-length-of-subarray-with-positive-product/) · Medium · 200 XP

---

You've completed your B-Rank training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Maximum Length of Subarray With Positive Product on LeetCode](https://leetcode.com/problems/maximum-length-of-subarray-with-positive-product/)**

> ⚔ **Hunter's rule:** Need **positive product** subarray — track both **pos** and **neg** ending lengths. Cousin of **Day 9 dual-state product**.

---

## The Problem

See the full problem statement on LeetCode: **[Maximum Length of Subarray With Positive Product #1567](https://leetcode.com/problems/maximum-length-of-subarray-with-positive-product/)**

---

## 💡 Hints

> 🎯 **What's being tested:** **Dual-state product cousin** — like Day 9 `(maxProd, minProd)`, but track **lengths** not values.

- `pos` = length of longest subarray ending here with **positive** product
- `neg` = length of longest ending here with **negative** product (0 if no valid negative-ending subarray)
- `x > 0`: extend both; `x < 0`: swap (neg×neg → positive length); `x == 0`: reset both
- Answer = max `pos` over scan (positive product subarray)

Not knapsack. Not stock state machine. **Two rolling scalars** at each index.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Dual-State Length DP (Day 9 product cousin)

**How to identify from the statement:**
- Contiguous subarray, sign of product matters
- Zeros break the streak
- Negative flip connects long `neg` ending to future positive length

**How a strong solver thinks before coding:**
1. *"Track posLen and negLen ending at i."*
2. *"Negative x: swap extend logic."*
3. *"Zero: reset both to 0."*
4. *"ans = max(ans, pos)."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Only track positive length** | Misses neg×neg comeback |
| **O(n²) all subarrays** | Too slow |
| **Kadane on values** | Need sign tracking, not sum |
| **Single state dp[i]** | Negative product history lost |

**The insight:** Longest **positive** product subarray ending at `i` may come from previous **negative** length + one negative — dual state like Day 9.

---

## 🎯 Transfer to Unseen Problems

*"Longest subarray with positive product"* → pos/neg length pair. Same sign-flip DNA as **Maximum Product Subarray #152** (Day 9) but optimize **length** not value.

---

<details>
<summary><strong>📖 Solution & Walkthrough</strong></summary>

Fill the DP table for the given example. Trace which cells each cell depends on. Then implement the transition.

### C++
```cpp
class Solution {
public:
    int getMaxLen(vector<int>& nums) {
        int pos = 0, neg = 0, ans = 0;
        for (int x : nums) {
            if (x > 0) { pos++; neg = neg > 0 ? neg + 1 : 0; }
            else if (x < 0) { int t = pos; pos = neg > 0 ? neg + 1 : 0; neg = t + 1; }
            else { pos = 0; neg = 0; }
            ans = max(ans, pos);
        }
        return ans;
    }
};
```

### Python
```python
class Solution:
    def getMaxLen(self, nums: list[int]) -> int:
        pos = neg = ans = 0
        for x in nums:
            if x > 0:
                pos += 1
                neg = neg + 1 if neg > 0 else 0
            elif x < 0:
                pos, neg = (neg + 1 if neg > 0 else 0), pos + 1
            else:
                pos = neg = 0
            ans = max(ans, pos)
        return ans
```

### Java
```java
class Solution {
    public int getMaxLen(int[] nums) {
        int pos = 0, neg = 0, ans = 0;
        for (int x : nums) {
            if (x > 0) { pos++; neg = neg > 0 ? neg + 1 : 0; }
            else if (x < 0) { int t = pos; pos = neg > 0 ? neg + 1 : 0; neg = t + 1; }
            else { pos = 0; neg = 0; }
            ans = Math.max(ans, pos);
        }
        return ans;
    }
}
```

**Complexity:** O(n) time · O(1) space

</details>

---

## 💭 What Should Have Clicked in Your Mind?

- **"Positive product → track pos AND neg lengths."** → Day 9 cousin.
- **"Swap on negative x."** → neg×neg → long positive.
- **"Zero resets."** → Breaks contiguous sign chain.
- **"Not knapsack / not stock."** → Dual rolling scalars.

---

*2 of 3 test problems. Continue to the next. →*

## Solution

### C++
```cpp
class Solution {
public:
    int getMaxLen(vector<int>& nums) {
        int pos = 0, neg = 0, ans = 0;
        for (int x : nums) {
            if (x > 0) { pos++; neg = neg > 0 ? neg + 1 : 0; }
            else if (x < 0) { int t = pos; pos = neg > 0 ? neg + 1 : 0; neg = t + 1; }
            else { pos = 0; neg = 0; }
            ans = max(ans, pos);
        }
        return ans;
    }
};
```

### Python
```python
class Solution:
    def getMaxLen(self, nums: list[int]) -> int:
        pos = neg = ans = 0
        for x in nums:
            if x > 0:
                pos += 1
                neg = neg + 1 if neg > 0 else 0
            elif x < 0:
                pos, neg = (neg + 1 if neg > 0 else 0), pos + 1
            else:
                pos = neg = 0
            ans = max(ans, pos)
        return ans
```

### Java
```java
class Solution {
    public int getMaxLen(int[] nums) {
        int pos = 0, neg = 0, ans = 0;
        for (int x : nums) {
            if (x > 0) { pos++; neg = neg > 0 ? neg + 1 : 0; }
            else if (x < 0) { int t = pos; pos = neg > 0 ? neg + 1 : 0; neg = t + 1; }
            else { pos = 0; neg = 0; }
            ans = Math.max(ans, pos);
        }
        return ans;
    }
}
```

**Complexity:** O(n) time · O(1) space
