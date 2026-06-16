<!-- hand-authored -->
# ⚔ Quest: Partition Array for Maximum Sum

> **Day 28** · [Partition Array for Maximum Sum #1043](https://leetcode.com/problems/partition-array-for-maximum-sum/) · Medium · 15 min · 50 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Partition Array for Maximum Sum on LeetCode](https://leetcode.com/problems/partition-array-for-maximum-sum/)**

> ⚔ **Hunter's rule:** `dp[i]` = best sum for first `i` elements. Try every last chunk size `j` from 1 to `min(i,k)`. **Linear lookback** — not interval `dp[i][j]`.

---

## The Problem

See the full problem statement on LeetCode: **[Partition Array for Maximum Sum #1043](https://leetcode.com/problems/partition-array-for-maximum-sum/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

**Pattern:** **1D partition max-sum** — prefix DP with bounded lookback.

- `dp[i]` = maximum sum partitioning `arr[0..i-1]` into valid chunks (each size ≤ k)
- For each `i`, try `j = 1..min(i,k)` as the **last** chunk length
- Last chunk value = `max(arr[i-j..i-1]) × j`
- Transition: `dp[i] = max(dp[i-j] + maxChunk × j)`

Inner loop: track running `mx` as you extend chunk leftward.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** 1D Partition Lookback DP (not interval bracket notation)

| Keyword / phrase | What it signals |
|---|---|
| "partition array" + optimize sum | Prefix `dp[i]` |
| "subarray length at most k" | Inner loop j ≤ k |
| "max element × length" | Running max in inner j loop |
| "maximum sum" | max over choices |

**Day 10 bridge:** Integer break also splits numbers — here chunk size capped by `k`.

**How a strong solver thinks before coding:**
1. *"dp[0]=0 — empty prefix."*
2. *"Last chunk ends at i — try lengths 1..k."*
3. *"Extend mx left as j grows."*
4. *"Answer = dp[n]."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Try all partition schemes recursively** | O(k^n) — exponential |
| **Greedy: always take max chunk** | Local max chunk ≠ global optimum |
| **Interval dp[i][j] on subarray** | Overkill — only need prefix index i |
| **Forget running max in inner loop** | Re-scanning chunk each j wastes time |

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Integer Break #343](https://leetcode.com/problems/integer-break/) | Split integer n | Prefix max over split sizes |
| [Burst Balloons #312](https://leetcode.com/problems/burst-balloons/) | **Day 30** — true interval | Different state shape |

---

## 📖 Walkthrough

**arr = [1,15,7,9,2,5,10], k = 3**

```
dp[0]=0
i=1: j=1 → dp[0]+1×1 = 1
i=2: j=1 → dp[1]+15×1=16; j=2 → dp[0]+15×2=30 → dp[2]=30? 
       (trace: max(1,15)=15, dp[0]+30=30)
i=3: best partitions using chunks ≤3
...
Answer = dp[7]
```

Fill left-to-right; each `dp[i]` only reads `dp[i-j]` where j ≤ k.

> 💡 **The insight:** One dimension (prefix length), inner loop over last chunk size — not `dp[i][j]` interval table.

---

## Solution

### C++
```cpp
class Solution {
public:
    int maxSumAfterPartitioning(vector<int>& arr, int k) {
        int n = arr.size();
        vector<int> dp(n + 1, 0);
        for (int i = 1; i <= n; i++) {
            int mx = 0;
            for (int j = 1; j <= min(i, k); j++) {
                mx = max(mx, arr[i - j]);
                dp[i] = max(dp[i], dp[i - j] + mx * j);
            }
        }
        return dp[n];
    }
};
```

### Python
```python
class Solution:
    def maxSumAfterPartitioning(self, arr: list[int], k: int) -> int:
        n = len(arr)
        dp = [0] * (n + 1)
        for i in range(1, n + 1):
            mx = 0
            for j in range(1, min(i, k) + 1):
                mx = max(mx, arr[i - j])
                dp[i] = max(dp[i], dp[i - j] + mx * j)
        return dp[n]
```

### Java
```java
class Solution {
    public int maxSumAfterPartitioning(int[] arr, int k) {
        int n = arr.length;
        int[] dp = new int[n + 1];
        for (int i = 1; i <= n; i++) {
            int mx = 0;
            for (int j = 1; j <= Math.min(i, k); j++) {
                mx = Math.max(mx, arr[i - j]);
                dp[i] = Math.max(dp[i], dp[i - j] + mx * j);
            }
        }
        return dp[n];
    }
}
```

**Complexity:** O(n · k) time · O(n) space
---

## 💭 What Should Have Clicked in Your Mind?

- **"dp[i] = prefix answer"** — single index, not interval pair.
- **"Try last chunk size j"** — bounded by k.
- **"mx × j"** — chunk score uses max element, not sum.
- **"1D Partition Lookback"** — Day 28 second template; Day 30 is interval burst.

> 🎯 **Pattern Unlocked:** 1D Partition Lookback DP

---

*Both quests complete. Head to the checkpoint. →*
