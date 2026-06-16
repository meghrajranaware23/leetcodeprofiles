<!-- hand-authored -->
# ⚔ Quest: Burst Balloons

> **Day 30** · [Burst Balloons #312](https://leetcode.com/problems/burst-balloons/) · Hard · 25 min · 60 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Burst Balloons on LeetCode](https://leetcode.com/problems/burst-balloons/)**

> ⚔ **Hunter's rule:** Think **last balloon burst** in each interval, not first. Pad `nums` with `[1, ...nums, 1]`. Fill `dp[i][j]` by increasing interval length.

---

## The Problem

See the full problem statement on LeetCode: **[Burst Balloons #312](https://leetcode.com/problems/burst-balloons/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

**Pattern:** **Interval DP** — last-to-burst (Day 30 capstone #2).

- `dp[i][j]` = max coins bursting all balloons in **open interval** `(i,j)` exclusive
- Choose `k` as the **last** balloon burst in `(i,j)`:
  `dp[i][j] = max(dp[i][k-1] + dp[k+1][j] + a[i-1]*a[k]*a[j+1])`
- Fill by length `len = 1..n`, then `i`, then split `k`
- Answer: `dp[1][n]`

Padding `a[0]=a[n+1]=1` handles boundary multiplication.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Interval DP

| Keyword / phrase | What it signals |
|---|---|
| "burst balloons" / "merge stones" | Interval split — last action |
| "coins from neighbors" | Cost uses outside boundaries of interval |
| "maximum coins" | max over split k |

**Day 28 contrast:** #1043 is 1D prefix lookback; here true `dp[i][j]` on subarray.

**How a strong solver thinks before coding:**
1. *"Last burst k splits into independent left/right."*
2. *"Pad array — virtual balloons at edges."*
3. *"Fill shorter intervals first (by length)."*
4. *"dp[i][j] uses a[i-1] and a[j+1] as neighbors when k bursts last."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Simulate burst order greedily** | Locally optimal burst ≠ global max |
| **First-burst thinking** | Left/right not independent until last burst |
| **Forget padding 1s** | Boundary coins wrong at edges |
| **Fill dp[i][j] before smaller intervals** | Depends on dp[i][k-1], dp[k+1][j] |

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Minimum Cost Tree From Leaf Values #1130](https://leetcode.com/problems/minimum-cost-tree-from-leaf-values/) | A-Rank test | Interval merge max |
| [Strange Printer #664](https://leetcode.com/problems/strange-printer/) | String interval | Same length-fill order |

---

## 📖 Walkthrough

**nums = [3,1,5,8] → a = [1,3,1,5,8,1]**

```
len=1 intervals: dp[1][1], dp[2][2], dp[3][3], dp[4][4]
  dp[2][2]: k=2 → 1*1*5 = 5

len=2: dp[1][2] — try k=1, k=2 as last burst
...

len=4: dp[1][4] = 167 (classic example)
```

Fill order: length → start i → split k.

> 💡 **The insight:** "Last burst" makes sub-intervals independent — the hallmark of interval DP.

---

## Solution

### C++
```cpp
class Solution {
public:
    int maxCoins(vector<int>& nums) {
        int n = nums.size();
        vector<int> a(n + 2, 1);
        for (int i = 0; i < n; i++) a[i + 1] = nums[i];
        vector<vector<int>> dp(n + 2, vector<int>(n + 2, 0));
        for (int len = 1; len <= n; len++)
            for (int i = 1; i + len - 1 <= n; i++) {
                int j = i + len - 1;
                for (int k = i; k <= j; k++)
                    dp[i][j] = max(dp[i][j], dp[i][k - 1] + dp[k + 1][j] + a[i - 1] * a[k] * a[j + 1]);
            }
        return dp[1][n];
    }
};
```

### Python
```python
class Solution:
    def maxCoins(self, nums: List[int]) -> int:
        a = [1] + nums + [1]
        n = len(nums)
        dp = [[0] * (n + 2) for _ in range(n + 2)]
        for length in range(1, n + 1):
            for i in range(1, n - length + 2):
                j = i + length - 1
                for k in range(i, j + 1):
                    dp[i][j] = max(dp[i][j], dp[i][k - 1] + dp[k + 1][j] + a[i - 1] * a[k] * a[j + 1])
        return dp[1][n]
```

### Java
```java
class Solution {
    public int maxCoins(int[] nums) {
        int n = nums.length;
        int[] a = new int[n + 2];
        a[0] = a[n + 1] = 1;
        for (int i = 0; i < n; i++) a[i + 1] = nums[i];
        int[][] dp = new int[n + 2][n + 2];
        for (int len = 1; len <= n; len++)
            for (int i = 1; i + len - 1 <= n; i++) {
                int j = i + len - 1;
                for (int k = i; k <= j; k++)
                    dp[i][j] = Math.max(dp[i][j], dp[i][k - 1] + dp[k + 1][j] + a[i - 1] * a[k] * a[j + 1]);
            }
        return dp[1][n];
    }
}
```

**Complexity:** O(n³) time · O(n²) space
---

## 💭 What Should Have Clicked in Your Mind?

- **"Last burst k"** — left/right intervals independent.
- **"Pad with 1s"** — boundary multiplication handled.
- **"Fill by interval length"** — smaller intervals first.
- **"Interval DP"** — Day 30 capstone pattern #2.

> 🎯 **Pattern Unlocked:** Interval DP — burst balloons

---

*Both quests complete. Head to the checkpoint. →*
