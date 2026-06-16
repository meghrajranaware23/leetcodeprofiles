<!-- hand-authored -->
# ⚔ Quest: Combination Sum IV

> **Day 22** · [Combination Sum IV #377](https://leetcode.com/problems/combination-sum-iv/) · Medium · 15 min · 35 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Combination Sum IV on LeetCode](https://leetcode.com/problems/combination-sum-iv/)**

> ⚔ **Hunter's rule:** **Order matters** → **target outer**, nums inner. Opposite of Day 18 Coin Change II.

---

## The Problem

See the full problem statement on LeetCode: **[Combination Sum IV #377](https://leetcode.com/problems/combination-sum-iv/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

**Pattern:** Order-Matters Counting.

- `dp[i]` = number of **sequences** (ordered) that sum to `i`
- `dp[0] = 1`
- **`for i in 1..target: for num in nums: if num<=i: dp[i]+=dp[i-num]`**
- Unlimited reuse — forward on `i`
- **Amount outer** — distinguishes permutations from Day 18 combinations

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Order-Matters Counting

**How to identify this from the problem statement:**
- Count ways to reach target summing nums
- **Different order = different way** (problem statement)
- Unlimited reuse of each num

| Keyword / phrase | What it signals |
|---|---|
| "order matters" / "permutation" | Amount outer loop |
| "combinations" / order ignored | **#518** coin outer |
| "minimum coins" | **#322** min not count |
| "unique BST" | **#96** Catalan |

**Why brute force fails:** Enumerate all sequences — exponential; overlap on `(remaining target)`.

**How a strong solver thinks before coding:**
1. *"dp[0]=1."*
2. *"Outer i=1..target."*
3. *"Inner nums: dp[i]+=dp[i-num]."*
4. *"Not coin outer."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Coin outer (#518 order)** | Undercounts — treats as combinations |
| **Reverse 0/1 loop** | Wrong reuse semantics |
| **Catalan recurrence** | Wrong problem family |
| **Greedy** | Counting needs all sequences |

**The insight:** Loop order is the **only** difference from #518 for unlimited reuse.

```
nums=[1,2,3], target=4
Ordered: 1+1+2, 1+2+1, 2+1+1, 2+2, 1+3, 3+1 → 7 ways
#518 would count 4 (combinations)
```

---

## 🔗 Same Pattern, Other Problems

| Problem | Variant | Pattern |
|---|---|---|
| [Coin Change II #518](https://leetcode.com/problems/coin-change-ii/) | Combinations | Day 18 — coin outer |
| [Climbing Stairs #70](https://leetcode.com/problems/climbing-stairs/) | Steps 1 or 2 | Amount outer cousin |
| [Unique Binary Search Trees #96](https://leetcode.com/problems/unique-binary-search-trees/) | Catalan | Earlier today |

---

## 📖 Walkthrough

**Example:** `nums = [1, 2, 3]`, `target = 4`

```
dp[0]=1
dp[1]=1  (1)
dp[2]=2  (1+1, 2)
dp[3]=4  (1+1+1, 1+2, 2+1, 3)
dp[4]=7  (1+1+1+1, 1+1+2, 1+2+1, 1+3, 2+1+1, 2+2, 3+1)

Answer: 7 ✓
```

> 💡 **The insight:** Same += recurrence as coins — **which loop is outer** encodes order.

---

## Solution

### C++
```cpp
class Solution {
public:
    int combinationSum4(vector<int>& nums, int target) {
        vector<unsigned long long> dp(target + 1, 0);
        dp[0] = 1;
        for (int i = 1; i <= target; i++)
            for (int num : nums)
                if (num <= i) dp[i] += dp[i - num];
        return dp[target];
    }
};
```

### Python
```python
class Solution:
    def combinationSum4(self, nums: List[int], target: int) -> int:
        dp = [0] * (target + 1)
        dp[0] = 1
        for i in range(1, target + 1):
            for num in nums:
                if num <= i:
                    dp[i] += dp[i - num]
        return dp[target]
```

### Java
```java
class Solution {
    public int combinationSum4(int[] nums, int target) {
        int[] dp = new int[target + 1];
        dp[0] = 1;
        for (int i = 1; i <= target; i++)
            for (int num : nums)
                if (num <= i) dp[i] += dp[i - num];
        return dp[target];
    }
}
```

**Complexity:** O(n · target) time · O(target) space
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Order matters → amount outer."** → Opposite of #518.
- **"dp[0]=1."** → Empty sequence base.
- **"Forward i, unlimited nums."** → Unbounded counting.
- **"Order-Matters Counting"** → Day 18's loop mirror image.

If you got 4 instead of 7 on `[1,2,3]` target 4, swap to **amount outer**.

> 🎯 **Pattern Unlocked:** Order-Matters Counting

---

*Both quests complete. Head to the checkpoint. →*
