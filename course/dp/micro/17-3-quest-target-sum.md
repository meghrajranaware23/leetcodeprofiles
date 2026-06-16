<!-- hand-authored -->
# ⚔ Quest: Target Sum

> **Day 17** · [Target Sum #494](https://leetcode.com/problems/target-sum/) · Medium · 15 min · 35 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Target Sum on LeetCode](https://leetcode.com/problems/target-sum/)**

> ⚔ **Hunter's rule:** Assign + or − to each num. Before DFS, ask: *"Which subset sums to `(total+target)/2`?"*

---

## The Problem

See the full problem statement on LeetCode: **[Target Sum #494](https://leetcode.com/problems/target-sum/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

**Pattern:** Knapsack with Signs → **count** subset sums.

- Let `P` = sum of + group, `N` = sum of − group (as positive)
- `P - N = target` and `P + N = total` → `P = (total + target) / 2`
- If `(total + target)` odd or `|target| > total` → 0 ways
- `dp[s]` = number of ways to make sum `s` with items so far
- Same reverse loop as partition, but `dp[j] += dp[j - num]`

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Knapsack with Signs

**How to identify this from the problem statement:**
- Binary choice per element (+ or −)
- Count **ways**, not yes/no
- Reduces to subset-sum counting

| Keyword / phrase | What it signals |
|---|---|
| "+ and −" / "assign signs" | Partition into two signed groups |
| "number of ways" | `dp[j] += dp[j-num]` |
| "target sum" | Solve for positive subset `(total±target)/2` |
| "equal partition" | **Partition #416** — boolean cousin |

**Why brute force fails:** 2^n sign assignments — overlapping "ways to sum to s with first k nums."

**How a strong solver thinks before coding:**
1. *"Derive sum = (total + target) / 2."*
2. *"Impossible if odd or |target|>total."*
3. *"dp[0]=1 (one way to make zero)."*
4. *"Reverse j, += transition."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Try all 2^n sign flips** | O(2^n) |
| **Use boolean dp from #416** | Need **count**, not reachability |
| **Wrong subset sum formula** | Must be `(total+target)/2`, not `(total-target)/2` for positive part |
| **Forward inner loop** | Double-counts items |

**The insight:** Signs are a disguise. "+ group" is a subset; "− group" is the rest.

```
nums=[1,1,1,1,1], target=3
total=5, sum=(5+3)/2=4 → count subsets summing to 4
Only one: four +1s and one −1 → dp[4]=5? Actually 5 ways to pick which is −
Standard answer: 5 ways ✓
```

---

## 🔗 Same Pattern, Other Problems

| Problem | Variant | Pattern |
|---|---|---|
| [Partition Equal Subset Sum #416](https://leetcode.com/problems/partition-equal-subset-sum/) | Exists? | `||` |
| [Coin Change II #518](https://leetcode.com/problems/coin-change-ii/) | Unlimited | **Day 18** forward loop |
| [Ones and Zeroes #474](https://leetcode.com/problems/ones-and-zeroes/) | Two weights | **Day 19** |

---

## 📖 Walkthrough

**Example:** `nums = [1, 1, 1, 1, 1]`, target = 3

```
total=5, sum=(5+3)/2=4
dp[0]=1

After all five 1s (reverse j each time):
dp[4] = 5 ways to choose which single 1 is negative

Answer: 5
```

> 💡 **The insight:** Algebra collapses signs to one knapsack counting problem.

---

## Solution

### C++
```cpp
class Solution {
public:
    int findTargetSumWays(vector<int>& nums, int target) {
        int total = accumulate(nums.begin(), nums.end(), 0);
        if (abs(target) > total || (total + target) % 2) return 0;
        int sum = (total + target) / 2;
        vector<int> dp(sum + 1, 0);
        dp[0] = 1;
        for (int num : nums)
            for (int j = sum; j >= num; j--)
                dp[j] += dp[j - num];
        return dp[sum];
    }
};
```

### Python
```python
class Solution:
    def findTargetSumWays(self, nums: List[int], target: int) -> int:
        total = sum(nums)
        if abs(target) > total or (total + target) % 2:
            return 0
        s = (total + target) // 2
        dp = [0] * (s + 1)
        dp[0] = 1
        for num in nums:
            for j in range(s, num - 1, -1):
                dp[j] += dp[j - num]
        return dp[s]
```

### Java
```java
class Solution {
    public int findTargetSumWays(int[] nums, int target) {
        int total = 0;
        for (int num : nums) total += num;
        if (Math.abs(target) > total || (total + target) % 2 != 0) return 0;
        int sum = (total + target) / 2;
        int[] dp = new int[sum + 1];
        dp[0] = 1;
        for (int num : nums)
            for (int j = sum; j >= num; j--)
                dp[j] += dp[j - num];
        return dp[sum];
    }
}
```

**Complexity:** O(n · sum) time · O(sum) space
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Signs → subset sum (total+target)/2."** → Algebra first.
- **"dp[0]=1."** → One empty way to sum zero.
- **"+= not ||."** → Counting knapsack.
- **"Knapsack with Signs"** → 0/1 table, counting transition.

If you tried brute force first, that's fine — the breakthrough is the **P/N rewrite**, not memorizing DFS.

> 🎯 **Pattern Unlocked:** Knapsack with Signs

---

*Both quests complete. Head to the checkpoint. →*
