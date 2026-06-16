<!-- hand-authored -->
# ⚔ Quest: Integer Break

> **Day 10** · [Integer Break #343](https://leetcode.com/problems/integer-break/) · Medium · 15 min · 20 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Integer Break on LeetCode](https://leetcode.com/problems/integer-break/)**

> ⚔ **Hunter's rule:** For n=10, write all first cuts j=1..9 and whether you use j*(i-j) or j*dp[i-j]. Inner loop is the whole pattern.

---

## The Problem

See the full problem statement on LeetCode: **[Integer Break #343](https://leetcode.com/problems/integer-break/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

**Pattern:** Day 10 **Partition Maximization DP**.

- `dp[i]` = max product splitting `i` (must break — at least 2 factors for answer at n, but table builds all i)
- For each `j` from `1` to `i-1`:
  - `j * (i - j)` — one split into two parts only
  - `j * dp[i - j]` — split `j` off, optimally break the rest
- `dp[i] = max` over all j

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Partition Maximization DP

**How to identify this from the problem statement:**
- Split integer into **parts** — choice of cut position
- **Maximize product** — inner loop + max
- Overlapping subproblems on smaller integers

| Keyword / phrase | What it signals |
|---|---|
| "break into at least two" | Partition DP |
| "maximize product" | max over inner splits |
| "integer n" | 1D dp[2..n] |

**Why inner loop:** Cut location is the multi-option — not just two fixed branches.

**How a strong solver thinks before coding:**
1. *"dp[i] = best product for integer i."*
2. *"Try every first piece j."*
3. *"Compare j*(i-j) vs j*dp[i-j]."*
4. *"dp[1]=1 as multiplicative identity base."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Try all partitions recursively** | Exponential — O(2^n) splits |
| **Only j*(i-j), never dp[i-j]** | Misses 3+ factor splits (e.g. 10 = 3+3+4) |
| **Greedy: always split in half** | Not globally optimal product |
| **Day 6 take/skip** | Wrong model — must use **all** parts of n |

**The insight brute force misses:** Each first piece `j` reduces to a **smaller integer** already in the table.

```
n=10: optimal 3*3*4 = 36
Needs j=3, dp[7] path — not just 3*7=21
```

---

## 🔗 Same Pattern, Other Problems

| Problem | Objective | Inner loop |
|---|---|---|
| [Perfect Squares #279](https://leetcode.com/problems/perfect-squares/) | min squares | j² ≤ i |
| [Coin Change #322](https://leetcode.com/problems/coin-change/) | min coins | denominations |
| [Integer Break #343](https://leetcode.com/problems/integer-break/) | max product | j = 1..i-1 |

---

## 📖 Walkthrough

**Example:** `n = 10`

```
Build dp[2..10]:

dp[2]=1 (1*1)
dp[3]=max(1*2, 2*1)=2
dp[4]=max(1*3, 2*2, 3*1)=4
...
dp[10]=36 via j=3: 3*dp[7]=3*12=36
```

> 💡 **The insight:** Two-term split and multi-term split compete in the same inner loop.

---

## Solution

### C++
```cpp
class Solution {
public:
    int integerBreak(int n) {
        vector<int> dp(n + 1, 0);
        dp[1] = 1;
        for (int i = 2; i <= n; i++)
            for (int j = 1; j < i; j++)
                dp[i] = max({dp[i], j * (i - j), j * dp[i - j]});
        return dp[n];
    }
};
```

### Python
```python
class Solution:
    def integerBreak(self, n: int) -> int:
        dp = [0] * (n + 1)
        dp[1] = 1
        for i in range(2, n + 1):
            for j in range(1, i):
                dp[i] = max(dp[i], j * (i - j), j * dp[i - j])
        return dp[n]
```

### Java
```java
class Solution {
    public int integerBreak(int n) {
        int[] dp = new int[n + 1];
        dp[1] = 1;
        for (int i = 2; i <= n; i++)
            for (int j = 1; j < i; j++)
                dp[i] = Math.max(dp[i], Math.max(j * (i - j), j * dp[i - j]));
        return dp[n];
    }
}
```

**Complexity:** O(n²) time · O(n) space
---

## 💭 What Should Have Clicked in Your Mind?

- **"Max product partition"** → inner loop over cut j.
- **"j * dp[i-j]"** → break remainder further.
- **"Not take/skip"** — must account for all pieces of n.
- **"O(n²) table"** — multi-option cost.

> 🎯 **Pattern Unlocked:** Partition Maximization DP

---

*One quest down. Next: min layers with square peels. →*
