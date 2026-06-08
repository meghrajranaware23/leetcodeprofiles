# ⚔ D-Rank Test — Problem 2

> [Maximum Sum Circular Subarray #918](https://leetcode.com/problems/maximum-sum-circular-subarray/) · Medium · 100 XP

---

You've completed your D-Rank training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Maximum Sum Circular Subarray on LeetCode](https://leetcode.com/problems/maximum-sum-circular-subarray/)**

> ⚔ **Hunter's rule:** This is a rank test — treat it like real interview practice. Define the state. Write the transition. Fill the table by hand. No peeking until you've genuinely tried.

---

## The Problem

See the full problem statement on LeetCode: **[Maximum Sum Circular Subarray #918](https://leetcode.com/problems/maximum-sum-circular-subarray/)**

---

## 💡 Hints

> 🎯 **What's being tested:** Pattern recognition from the D-Rank curriculum. Define the state and transition before you code.

Revisit your rank's cheat sheet. Is this linear DP, grid DP, knapsack, or state machine?

---

## 🔍 Pattern Recognition Breakdown

**How to identify from the statement:**
- What is the state? What information describes a subproblem?
- What are the choices at each state?
- What's the transition formula?

**How a strong solver thinks before coding:**
1. *"What does dp[i] represent?"*
2. *"What's the base case?"*
3. *"Linear, grid, knapsack, or state machine?"*
4. *"Can I optimize the space?"*

---

## ❌ Why Brute Force Fails

DP problems have exponential recursion trees with massive overlap. Brute force means recomputing the same subproblems O(2^n) times. Define the state, cache it, and solve each subproblem exactly once.

---

## 🎯 Transfer to Unseen Problems

Can you define the state without the problem name telling you the pattern?

Read the statement once. Define dp[i] in one sentence. If you can write the transition in under 60 seconds, you're ready.

---

<details>
<summary><strong>📖 Solution & Walkthrough</strong></summary>

Fill the DP table for the given example. Trace which cells each cell depends on. Then implement the transition.

### C++
```cpp
class Solution {
public:
    int maxSubarraySumCircular(vector<int>& nums) {
        int total = 0, maxSum = INT_MIN, curMax = 0, minSum = INT_MAX, curMin = 0;
        for (int num : nums) {
            total += num;
            curMax = max(num, curMax + num);
            maxSum = max(maxSum, curMax);
            curMin = min(num, curMin + num);
            minSum = min(minSum, curMin);
        }
        return maxSum < 0 ? maxSum : max(maxSum, total - minSum);
    }
};
```

### Python
```python
class Solution:
    def maxSubarraySumCircular(self, nums: List[int]) -> int:
        total = 0
        max_sum = float('-inf'); cur_max = 0
        min_sum = float('inf'); cur_min = 0
        for num in nums:
            total += num
            cur_max = max(num, cur_max + num)
            max_sum = max(max_sum, cur_max)
            cur_min = min(num, cur_min + num)
            min_sum = min(min_sum, cur_min)
        return max_sum if max_sum < 0 else max(max_sum, total - min_sum)
```

### Java
```java
class Solution {
    public int maxSubarraySumCircular(int[] nums) {
        int total = 0, maxSum = Integer.MIN_VALUE, curMax = 0;
        int minSum = Integer.MAX_VALUE, curMin = 0;
        for (int num : nums) {
            total += num;
            curMax = Math.max(num, curMax + num);
            maxSum = Math.max(maxSum, curMax);
            curMin = Math.min(num, curMin + num);
            minSum = Math.min(minSum, curMin);
        }
        return maxSum < 0 ? maxSum : Math.max(maxSum, total - minSum);
    }
}
```

**Complexity:** O(n) time · O(1) space

</details>

---

## 💭 What Should Have Clicked in Your Mind?

- **"This is a D-Rank test"** → Use patterns from this rank's training.
- **"State first, code second"** → Define dp[i] before writing any code.
- **"Name the pattern"** → The code is just the transition formula in syntax.

---

*2 of 3 test problems. Continue to the next. →*
