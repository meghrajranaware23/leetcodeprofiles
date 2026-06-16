<!-- hand-authored -->
# ⚔ C-Rank Test — Problem 2

> [Longest Arithmetic Subsequence #1027](https://leetcode.com/problems/longest-arithmetic-subsequence/) · Medium · 150 XP

---

You've completed your C-Rank training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Longest Arithmetic Subsequence on LeetCode](https://leetcode.com/problems/longest-arithmetic-subsequence/)**

> ⚔ **Hunter's rule:** **Diff-index 2D DP** — `dp[i][d]` = longest arithmetic subsequence ending at index `i` with common difference `d`. Day 12 LIS scan + difference dimension.

---

## The Problem

See the full problem statement on LeetCode: **[Longest Arithmetic Subsequence #1027](https://leetcode.com/problems/longest-arithmetic-subsequence/)**

---

## 💡 Hints

> 🎯 **What's being tested:** Day 12 subsequence DP extended — for each pair `(j, i)`, difference `d = nums[i]-nums[j]` extends `dp[j][d]`.

State is **index + difference**, not plain `dp[i]`. Map or hash per index for sparse `d` values. Base length 2 for any pair.

C-Rank connection: Same `j < i` scan as LIS, but difference must match across the chain.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Diff-Index 2D DP (Day 12 synthesis)

**How to identify from the statement:**
- Arithmetic subsequence = constant gap between consecutive elements
- Difference `d` can be negative — need flexible key storage
- At least 2 elements — every pair seeds length 2

**How a strong solver thinks before coding:**
1. *"For each i, scan all j < i."*
2. *"d = nums[i] - nums[j]."*
3. *"dp[i][d] = dp[j].get(d, 1) + 1."*
4. *"Track global max."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Plain LIS dp[i]** | Ignores difference constraint |
| **Fix d globally first** | d unknown — must be part of state |
| **All subsequences O(2^n)** | Exponential |

**The insight:** LIS state "ending value" isn't enough — must remember **common difference** with previous term. `dp[i][d]` is the natural state.

---

## 🎯 Transfer to Unseen Problems

*"Longest arithmetic slice with fixed difference k"* → if `d` known, simpler 1D. Unknown `d` → diff-index DP like this problem.

---

<details>
<summary><strong>📖 Solution & Walkthrough</strong></summary>

Fill the DP table for the given example. Trace which cells each cell depends on. Then implement the transition.

### C++
```cpp
class Solution {
public:
    int longestArithSeqLength(vector<int>& nums) {
        int n = nums.size(), ans = 2;
        vector<unordered_map<int,int>> dp(n);
        for (int i = 1; i < n; i++) {
            for (int j = 0; j < i; j++) {
                int d = nums[i] - nums[j];
                dp[i][d] = (dp[j].count(d) ? dp[j][d] : 1) + 1;
                ans = max(ans, dp[i][d]);
            }
        }
        return ans;
    }
};
```

### Python
```python
class Solution:
    def longestArithSeqLength(self, nums: list[int]) -> int:
        n = len(nums)
        dp = [dict() for _ in range(n)]
        ans = 2
        for i in range(1, n):
            for j in range(i):
                d = nums[i] - nums[j]
                dp[i][d] = dp[j].get(d, 1) + 1
                ans = max(ans, dp[i][d])
        return ans
```

### Java
```java
class Solution {
    public int longestArithSeqLength(int[] nums) {
        int n = nums.length, ans = 2;
        Map<Integer, Integer>[] dp = new HashMap[n];
        for (int i = 0; i < n; i++) dp[i] = new HashMap<>();
        for (int i = 1; i < n; i++) {
            for (int j = 0; j < i; j++) {
                int d = nums[i] - nums[j];
                dp[i].put(d, dp[j].getOrDefault(d, 1) + 1);
                ans = Math.max(ans, dp[i].get(d));
            }
        }
        return ans;
    }
}
```

**Complexity:** O(n²) time · O(n²) space

</details>

---

## 💭 What Should Have Clicked in Your Mind?

- **"Day 12 j<i scan"** — Same outer loop structure as LIS.
- **"Difference in state"** — `dp[i][d]` not just `dp[i]`.
- **"Default length 1 before +1"** — Pair `(j,i)` gives length 2 minimum.
- **"Not LCS"** — One array, not two-sequence table.

---

*2 of 3 test problems. Continue to the next. →*

## Solution

### C++
```cpp
class Solution {
public:
    int longestArithSeqLength(vector<int>& nums) {
        int n = nums.size(), ans = 2;
        vector<unordered_map<int,int>> dp(n);
        for (int i = 1; i < n; i++) {
            for (int j = 0; j < i; j++) {
                int d = nums[i] - nums[j];
                dp[i][d] = (dp[j].count(d) ? dp[j][d] : 1) + 1;
                ans = max(ans, dp[i][d]);
            }
        }
        return ans;
    }
};
```

### Python
```python
class Solution:
    def longestArithSeqLength(self, nums: list[int]) -> int:
        n = len(nums)
        dp = [dict() for _ in range(n)]
        ans = 2
        for i in range(1, n):
            for j in range(i):
                d = nums[i] - nums[j]
                dp[i][d] = dp[j].get(d, 1) + 1
                ans = max(ans, dp[i][d])
        return ans
```

### Java
```java
class Solution {
    public int longestArithSeqLength(int[] nums) {
        int n = nums.length, ans = 2;
        Map<Integer, Integer>[] dp = new HashMap[n];
        for (int i = 0; i < n; i++) dp[i] = new HashMap<>();
        for (int i = 1; i < n; i++) {
            for (int j = 0; j < i; j++) {
                int d = nums[i] - nums[j];
                dp[i].put(d, dp[j].getOrDefault(d, 1) + 1);
                ans = Math.max(ans, dp[i].get(d));
            }
        }
        return ans;
    }
}
```

**Complexity:** O(n²) time · O(n²) space
