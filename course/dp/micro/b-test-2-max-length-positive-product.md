# ⚔ B-Rank Test — Problem 2

> [Maximum Length of Subarray With Positive Product #1567](https://leetcode.com/problems/maximum-length-of-subarray-with-positive-product/) · Medium · 200 XP

---

You've completed your B-Rank training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Maximum Length of Subarray With Positive Product on LeetCode](https://leetcode.com/problems/maximum-length-of-subarray-with-positive-product/)**

> ⚔ **Hunter's rule:** This is a rank test — treat it like real interview practice. Define the state. Write the transition. Fill the table by hand. No peeking until you've genuinely tried.

---

## The Problem

See the full problem statement on LeetCode: **[Maximum Length of Subarray With Positive Product #1567](https://leetcode.com/problems/maximum-length-of-subarray-with-positive-product/)**

---

## 💡 Hints

> 🎯 **What's being tested:** Pattern recognition from the B-Rank curriculum. Define the state and transition before you code.

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

- **"This is a B-Rank test"** → Use patterns from this rank's training.
- **"State first, code second"** → Define dp[i] before writing any code.
- **"Name the pattern"** → The code is just the transition formula in syntax.

---

*2 of 3 test problems. Continue to the next. →*
