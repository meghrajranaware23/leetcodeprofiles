<!-- hand-authored -->
# ⚔ Quest: Partition Equal Subset Sum

> **Day 17** · [Partition Equal Subset Sum #416](https://leetcode.com/problems/partition-equal-subset-sum/) · Medium · 15 min · 35 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Partition Equal Subset Sum on LeetCode](https://leetcode.com/problems/partition-equal-subset-sum/)**

> ⚔ **Hunter's rule:** "Two equal subsets" = "Can I pick items summing to **half** the total?" Draw the **1D boolean dp** before coding.

---

## The Problem

See the full problem statement on LeetCode: **[Partition Equal Subset Sum #416](https://leetcode.com/problems/partition-equal-subset-sum/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

**Pattern:** Subset Sum = **0/1 Knapsack (boolean)**.

- `total = sum(nums)`. If odd → impossible.
- `target = total / 2` — can we form a subset summing to target?
- `dp[j]` = can we make sum `j` using items processed so far
- For each `num`: `for j from target down to num: dp[j] |= dp[j - num]`
- Answer: `dp[target]`

Not max value — **reachability**. Same reverse loop as 0/1 knapsack.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Subset Sum = 0/1 Knapsack

**How to identify this from the problem statement:**
- Partition into two **equal** groups → one group must sum to `total/2`
- Each number used at most once
- Return true/false, not optimal value

| Keyword / phrase | What it signals |
|---|---|
| "partition equal subset" | Boolean knapsack, target = sum/2 |
| "split into two groups" | Subset sum |
| "can you reach sum" | `dp[j]` boolean |
| "how many ways" | **Target Sum** — counting variant |

**Why brute force fails:** Try all 2^n subsets — same subproblems repeat (can I make sum `s` with first `k` items?).

**How a strong solver thinks before coding:**
1. *"Odd total → false immediately."*
2. *"target = total/2."*
3. *"dp[0]=true, reverse j per num."*
4. *"Return dp[target]."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **All 2^n subsets** | Exponential |
| **Greedy by size** | [1,2,5] vs [1,2,3,3] — order fails |
| **Forward loop on dp** | Same num used twice |
| **Check sum without half target** | Two equal halves need exact half |

**The insight:** Partition = **one knapsack** of capacity `total/2`. If you fill it, the rest is the other half.

```
nums = [1, 5, 11, 5], total=22, target=11

After processing, dp[11] = true → split {1,5,5} | {11}
```

---

## 🔗 Same Pattern, Other Problems

| Problem | Variant | Pattern |
|---|---|---|
| [Target Sum #494](https://leetcode.com/problems/target-sum/) | Count +/− ways | Same table, `+=` |
| [Last Stone Weight II #1049](https://leetcode.com/problems/last-stone-weight-ii/) | Minimize difference | **Day 19** — best `dp[j]` near target |
| [0/1 Knapsack classic](https://leetcode.com/) | Max value | `max` instead of `||` |

---

## 📖 Walkthrough

**Example:** `nums = [1, 5, 11, 5]`, target = 11

```
dp[0]=T, rest F

num=1:  dp[1]=T
num=5:  dp[6], dp[5] become T
num=11: dp[11]=T  ← done early if you want
num=5:  dp[10], dp[11] stay T

Answer: true
```

> 💡 **The insight:** You never build both subsets — one knapsack of size `target` is enough.

---

## Solution

### C++
```cpp
class Solution {
public:
    bool canPartition(vector<int>& nums) {
        int total = accumulate(nums.begin(), nums.end(), 0);
        if (total % 2) return false;
        int target = total / 2;
        vector<bool> dp(target + 1, false);
        dp[0] = true;
        for (int num : nums)
            for (int j = target; j >= num; j--)
                dp[j] = dp[j] || dp[j - num];
        return dp[target];
    }
};
```

### Python
```python
class Solution:
    def canPartition(self, nums: List[int]) -> bool:
        total = sum(nums)
        if total % 2:
            return False
        target = total // 2
        dp = [False] * (target + 1)
        dp[0] = True
        for num in nums:
            for j in range(target, num - 1, -1):
                dp[j] = dp[j] or dp[j - num]
        return dp[target]
```

### Java
```java
class Solution {
    public boolean canPartition(int[] nums) {
        int total = 0;
        for (int num : nums) total += num;
        if (total % 2 != 0) return false;
        int target = total / 2;
        boolean[] dp = new boolean[target + 1];
        dp[0] = true;
        for (int num : nums)
            for (int j = target; j >= num; j--)
                dp[j] = dp[j] || dp[j - num];
        return dp[target];
    }
}
```

**Complexity:** O(n · sum) time · O(sum) space
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Equal partition → subset sum target/2."** → One boolean knapsack.
- **"Reverse j loop."** → 0/1 — each num once.
- **"Odd sum → false."** → No integer half.
- **"Subset Sum = 0/1 Knapsack"** → Same table as concept page, `||` not `max`.

If you tried brute force first, that's fine — the breakthrough is seeing **half the total as capacity**.

> 🎯 **Pattern Unlocked:** Subset Sum = 0/1 Knapsack

---

*One quest down. Next: count ways with + and − signs. →*
