<!-- hand-authored -->
# ⚔ Quest: Target Sum

> **Day 17** · [Target Sum #494](https://leetcode.com/problems/target-sum/) · Medium · 15 min · 35 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Target Sum on LeetCode](https://leetcode.com/problems/target-sum/)**

> ⚔ **Hunter's rule:** Draw the +/- tree for `nums = [1, 1, 1, 1, 1], target = 3`. Count leaves that hit 3 before you touch an editor.

---

## The Problem

You are given an integer array `nums` and an integer `target`.

Build an expression by adding a `'+'` or `'-'` sign before each integer in `nums`, then concatenate them into an expression. Return the **number of different expressions** that evaluate to `target`.

```
Input:  nums = [1, 1, 1, 1, 1], target = 3
Output: 5

Explanation: -1+1+1+1+1, +1-1+1+1+1, +1+1-1+1+1,
             +1+1+1-1+1, +1+1+1+1-1  (five ways)
```

```
Input:  nums = [1], target = 1
Output: 1
```

**Constraints:** `1 <= nums.length <= 20`, `-1000 <= nums[i], target <= 1000`

---

## 💡 Hints

**Hint 1:** This is **not** include/exclude. Every element appears in the final expression — you only choose its sign.

**Hint 2:** At index `i`, branch twice: `dfs(i+1, sum - nums[i])` and `dfs(i+1, sum + nums[i])`.

**Hint 3:** Base case `i == len(nums)`: return 1 if `sum == 0` (when tracking `target - nums[i]` style) or if your running sum equals target — match your parameter convention.

**Hint 4:** Memoize `(i, current_sum)` — the same subproblem is reached from different upstream sign choices.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Sign-Choice Backtracking + Memo

**How to identify this from the problem statement:**
- "Add `'+'` or `'-'` before each integer" → two branches per element, not skip
- "Number of ways" → count at leaves, sum left + right subtree counts
- Every element used → depth always `n`, not a subset-size problem

| Keyword / phrase | What it signals |
|---|---|
| "assign + or -" / "sign before each" | Sign-choice tree |
| "number of expressions" / "how many ways" | Count at base + memo |
| "evaluate to target" | Running sum state in dfs |
| "all elements used" | Not subset backtracking — always recurse `i+1` |
| combination sum family | Similar running-sum intuition, different branches |

**Why this pattern works:** Each level fixes one element's sign. The state `(i, sum)` fully describes the subproblem — memo collapses exponential recomputation.

**How a strong solver thinks before coding:**
1. *"Every element used → two branches, not include/exclude."*
2. *"State = (index, running sum). Base = i==n, check sum."*
3. *"Return left + right counts. Memo (i, sum)."*
4. *"Trace [1,1], target=0 on paper — two paths: +1-1 and -1+1."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Generate all `2^n` sign strings, evaluate each** | Correct logic, but no memo — TLE on n=20 |
| **Include/exclude some elements** | Wrong — all elements must appear with a sign |
| **Greedy sign pick toward target** | Misses count — need all valid expressions |
| **Nested loops over sign bits** | Same as brute bitmask without `(i,sum)` cache |

**The insight brute force misses:** Different sign choices upstream can land on the same `(i, sum)`. Memo turns `O(2^n)` into `O(n · sum_range)`.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Target Sum #494](https://leetcode.com/problems/target-sum/) | Count +/- ways | Sign tree + memo |
| [Partition Equal Subset Sum #416](https://leetcode.com/problems/partition-equal-subset-sum/) | Can split into two equal sums? | Subset-sum DP (related state) |
| [Combination Sum III #216](https://leetcode.com/problems/combination-sum-iii/) | Pick k digits summing to n | Running-sum prune (Day 15) |
| [Ones and Zeroes #474](https://leetcode.com/problems/ones-and-zeroes/) | 2D knapsack variant | Multi-constraint counting |

If you recognized Target Sum, the k-bucket quest next reuses **running-sum prune** with a different assignment shape.

---

## 📖 Walkthrough

`nums = [1, 1], target = 0` — track `dfs(i, sum)` where we subtract/add `nums[i]` to running total, starting `sum = 0`:

```
dfs(0, 0)
├── subtract 1 → dfs(1, -1)
│   ├── subtract 1 → dfs(2, -2)  → i==2, sum≠0 → 0
│   └── add 1      → dfs(2,  0)  → i==2, sum==0 → 1  ✓  (-1+1)
└── add 1      → dfs(1,  1)
    ├── subtract 1 → dfs(2,  0)  → i==2, sum==0 → 1  ✓  (+1-1)
    └── add 1      → dfs(2,  2)  → i==2, sum≠0 → 0

Total = 2 ways
```

For `nums = [1,1,1,1,1], target = 3`:

```
Each leaf: sum of signed nums must equal 3
Five 1's → need +1 on 4 and -1 on 1: C(5,1)=5 ways

Tree has 2^5=32 leaves, but memo on (i,sum) avoids recomputing shared subtrees
```

> 💡 **The insight:** The code is the paper trace. Two recursive calls per index, add the counts, cache `(i, sum)`.

---

## Solution

### C++
```cpp
class Solution {
    unordered_map<long long,int> memo;
    int dfs(vector<int>& nums, int i, int target) {
        if (i == (int)nums.size()) return target == 0 ? 1 : 0;
        long long key = ((long long)i << 32) | (target + 1000);
        if (memo.count(key)) return memo[key];
        return memo[key] = dfs(nums, i + 1, target - nums[i]) + dfs(nums, i + 1, target + nums[i]);
    }
public:
    int findTargetSumWays(vector<int>& nums, int target) {
        return dfs(nums, 0, target);
    }
};
```

### Python
```python
class Solution:
    def findTargetSumWays(self, nums: List[int], target: int) -> int:
        memo = {}
        def dfs(i, t):
            if i == len(nums): return 1 if t == 0 else 0
            if (i, t) in memo: return memo[(i, t)]
            memo[(i, t)] = dfs(i + 1, t - nums[i]) + dfs(i + 1, t + nums[i])
            return memo[(i, t)]
        return dfs(0, target)
```

### Java
```java
class Solution {
    private Map<String, Integer> memo = new HashMap<>();
    public int findTargetSumWays(int[] nums, int target) {
        return dfs(nums, 0, target);
    }
    private int dfs(int[] nums, int i, int target) {
        if (i == nums.length) return target == 0 ? 1 : 0;
        String key = i + "," + target;
        if (memo.containsKey(key)) return memo.get(key);
        int ans = dfs(nums, i + 1, target - nums[i]) + dfs(nums, i + 1, target + nums[i]);
        memo.put(key, ans);
        return ans;
    }
}
```

**Complexity:** O(n · sum) time · O(sum) space
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Add + or - before each number"** → Not include/exclude. Two branches per index, always use the element.
- **"Number of ways"** → Sum counts from both subtrees; base case returns 0 or 1.
- **"Looks like combination sum"** → Same running-sum instinct, but branches are +/- not pick/skip.
- **"n up to 20"** → Pure `2^n` TLE without memo on `(i, target)`.

If you tried bitmasking all signs first, that's fine — the breakthrough is **memoizing the (index, sum) state**, not enumerating bit patterns.

> 🎯 **Pattern Unlocked:** Sign-choice backtracking — subtract branch, add branch, memo the pair.

---

*One quest down. Next: assign elements into k equal buckets. →*
