<!-- hand-authored -->
# ⚔ Quest: House Robber

> **Day 6** · [House Robber #198](https://leetcode.com/problems/house-robber/) · Medium · 15 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open House Robber on LeetCode](https://leetcode.com/problems/house-robber/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen and paper. Draw the **1D dp row** for the example — at each `i`, write skip vs take. The hints below are for *after* your attempt.

---

## The Problem

See the full problem statement on LeetCode: **[House Robber #198](https://leetcode.com/problems/house-robber/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

**Pattern:** Day 6 **Take or Skip** — `dp[i] = max(dp[i-1], dp[i-2] + nums[i])`.

- **Skip house i** → best loot through house `i-1`: `dp[i-1]`
- **Rob house i** → can't use house `i-1`: `dp[i-2] + nums[i]`
- Fill **left-to-right**; optimize to `prev2` / `prev1`

If stuck: label columns `i=0,1,2,...` and fill one cell at a time. No recursion tree needed — the 1D table is enough.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Take/Skip DP

**How to identify this from the problem statement:**
- Linear array, pick a subset
- **Constraint:** no two **adjacent** houses
- Optimize **maximum** sum — `max`, not count

| Keyword / phrase | What it signals |
|---|---|
| "cannot rob two adjacent houses" | Take/skip — jump 2 on take |
| "maximum amount of money" | `max` transition |
| "nums[i] ≥ 0" | No need for dual min/max (that's Day 9) |

**Why this pattern works:** Optimal loot for houses `0..i` only depends on optimal loot for `0..i-1` and `0..i-2` — classic 1D DP.

**How a strong solver thinks before coding:**
1. *"dp[i] = max money robbing houses 0..i."*
2. *"Skip → dp[i-1]. Take → dp[i-2] + nums[i]."*
3. *"Base: empty street = 0; one house = nums[0]."*
4. *"Rolling prev2/prev1 — O(1) space."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Try every subset** | O(2^n) — exponential |
| **Greedy: rob every other house from the start** | Fails when skipping a high house early wins globally |
| **Recursion without memo** | Same subproblem `rob(0..i)` recomputed on every branch |
| **Using dp[i-1] + nums[i] on take** | Violates adjacency — must use `dp[i-2]` |

**The insight brute force misses:** Only two prior answers matter. The 1D table stores each prefix once.

```
Brute: rob(0..4) forks take/skip at every index → O(2^n)
DP:    dp[0] dp[1] dp[2] dp[3] dp[4]  → O(n), one pass
```

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Delete and Earn #740](https://leetcode.com/problems/delete-and-earn/) | Freq-compress values first | Take/skip on `earn[1..maxVal]` |
| [House Robber II #213](https://leetcode.com/problems/house-robber-ii/) | Circle — two linear passes | Day 9 wraps today's recurrence |
| [Maximum Sum of Subarray (non-adjacent)](https://leetcode.com/problems/maximum-sum-of-subarray/) | Same recurrence | Take/skip 1D |

---

## 📖 Walkthrough

**Example:** `nums = [2, 7, 9, 3, 1]`

```
i :  0   1   2   3   4
val: 2   7   9   3   1
dp : 2   7  11  11  12

i=0: dp=2
i=1: max(2, 7) = 7
i=2: max(7, 2+9) = 11
i=3: max(11, 7+3) = 11   ← skip 3, keep 11
i=4: max(11, 11+1) = 12
```

> 💡 **The insight:** At each house you only compare two numbers — skip or take. The code is the table fill in a loop.

---

## Solution

### C++
```cpp
class Solution {
public:
    int rob(vector<int>& nums) {
        int prev2 = 0, prev1 = 0;
        for (int num : nums) {
            int curr = max(prev1, prev2 + num);
            prev2 = prev1; prev1 = curr;
        }
        return prev1;
    }
};
```

### Python
```python
class Solution:
    def rob(self, nums: List[int]) -> int:
        prev2 = prev1 = 0
        for num in nums:
            prev2, prev1 = prev1, max(prev1, prev2 + num)
        return prev1
```

### Java
```java
class Solution {
    public int rob(int[] nums) {
        int prev2 = 0, prev1 = 0;
        for (int num : nums) {
            int curr = Math.max(prev1, prev2 + num);
            prev2 = prev1; prev1 = curr;
        }
        return prev1;
    }
}
```

**Complexity:** O(n) time · O(1) space
---

## 💭 What Should Have Clicked in Your Mind?

- **"Non-adjacent max sum on a line"** → Day 6 take/skip 1D table.
- **"Take uses dp[i-2]"** → neighbor forbidden.
- **"Skip uses dp[i-1]"** → carry best so far.
- **"prev2, prev1"** → no full array needed.

> 🎯 **Pattern Unlocked:** Take/Skip DP

---

*One quest down. Next: same pattern after compression. →*
