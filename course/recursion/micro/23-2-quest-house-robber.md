<!-- hand-authored -->
# ⚔ Quest: House Robber

> **Day 23** · [House Robber #198](https://leetcode.com/problems/house-robber/) · Medium · 15 min · 30 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open House Robber on LeetCode](https://leetcode.com/problems/house-robber/)**

> ⚔ **Hunter's rule:** Trace `rob(i)` on paper for `[2,7,9,3,1]`. Label `memo[i]` at each index before you write code.

---

## The Problem

You are a professional robber planning to rob houses along a street. Each house has a non-negative integer amount of money. **Adjacent houses have security systems connected** — robbing two adjacent houses triggers an alarm.

Given an integer array `nums` representing money in each house, return the **maximum** amount you can rob **without alerting the police**.

```
Input:  nums = [1,2,3,1]
Output: 4
Explanation: Rob house 0 (1) + house 2 (3) = 4.

Input:  nums = [2,7,9,3,1]
Output: 12
Explanation: Rob 0 (2) + 2 (9) + 4 (1) = 12.

Input:  nums = [2,1,1,2]
Output: 4
Explanation: Rob 0 and 3, or 1 and 3 — both give 4.
```

---

## 💡 Hints

**Hint 1:** Define `rob(i)` — *maximum loot from houses `i..n-1`*.

**Hint 2:** At house `i`, two choices: **rob it** → `nums[i] + rob(i+2)`; **skip it** → `rob(i+1)`.

**Hint 3:** Base case: `i >= len(nums)` → return `0` (no houses left).

**Hint 4:** Memoize on `i`. The same index is reached from different rob/skip histories — overlap like Fibonacci.

**Hint 5:** Answer is `rob(0)`, not a greedy pick of the largest `nums[i]`.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Linear Index Memoization (Optimization)

| Clue in the problem | What it signals |
|---|---|
| "maximum" + sequential houses | Take-or-skip at each index |
| "cannot rob two adjacent" | Robbing `i` forbids `i+1` → jump to `i+2` |
| Same suffix from different prefixes | Memo key = start index `i` |
| Not "count ways" | Use `max`, not `+` |

**Contrast with Day 21 (Word Break):**

| Word Break I | House Robber |
|---|---|
| Loop over cut lengths | Fixed two branches: rob or skip |
| Return bool | Return max int |
| Dict check on substring | No external validation |
| Same index memo idea | Same index memo idea |

**How a strong solver thinks before coding:**
1. *"State = index i. What's the best from here?"*
2. *"Two branches: rob (i+2) or skip (i+1)."*
3. *"Base: past end of array → 0."*
4. *"Memo[i] before recursing — Fibonacci overlap."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Try all 2^n rob/skip subsets** | Correct logic, exponential without memo |
| **Greedy: always rob larger of neighbors** | Fails on `[2,1,1,2]` — need non-local choice |
| **Rob every other house from index 0** | Optimal path may start by skipping house 0 |
| **DP without recognizing recurrence** | Works bottom-up, but top-down needs memo on `i` |

**The insight brute force misses:** Many rob/skip paths converge on the same suffix starting at `i`. Compute `rob(i)` once.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes |
|---|---|
| [House Robber II #213](https://leetcode.com/problems/house-robber-ii/) | Circle — run `rob` on `[0..n-2]` and `[1..n-1]` |
| [Delete and Earn #740](https://leetcode.com/problems/delete-and-earn/) | Same take/skip on value buckets |
| [Decode Ways #91](https://leetcode.com/problems/decode-ways/) | Today's next quest — count instead of max |

---

## 📖 Walkthrough

`nums = [2, 7, 9, 3, 1]`:

```
rob(0) = max(2 + rob(2), rob(1))
rob(2) = max(9 + rob(4), rob(3))
rob(4) = max(1 + rob(6), rob(5)) = max(1 + 0, 0) = 1
rob(3) = max(3 + 0, 0) = 3
rob(2) = max(9 + 1, 3) = 10
rob(1) = max(7 + rob(3), rob(2)) = max(7 + 3, 10) = 10
rob(0) = max(2 + 10, 10) = 12 ✓
```

Overlap: both `rob(0)` skip-branch and `rob(1)` eventually need `rob(3)` and `rob(4)` — memo stores them once.

Greedy trap on `[2,1,1,2]`:

```
Greedy "rob bigger neighbor" → wrong
rob(0)=2, skip 1, rob 2? can't — adjacent to robbed 0
Optimal: rob index 1 and 3 → 1+2=4, or rob 0 and 3 → 2+2=4
```

---

## Solution

### C++
```cpp
class Solution {
    vector<int> memo;
    int dfs(vector<int>& nums, int i) {
        if (i >= (int)nums.size()) return 0;
        if (memo[i] != -1) return memo[i];
        return memo[i] = max(nums[i] + dfs(nums, i + 2), dfs(nums, i + 1));
    }
public:
    int rob(vector<int>& nums) {
        memo.assign(nums.size(), -1);
        return dfs(nums, 0);
    }
};
```

### Python
```python
class Solution:
    def rob(self, nums: List[int]) -> int:
        memo = {}
        def dfs(i):
            if i >= len(nums): return 0
            if i in memo: return memo[i]
            memo[i] = max(nums[i] + dfs(i + 2), dfs(i + 1))
            return memo[i]
        return dfs(0)
```

### Java
```java
class Solution {
    private int[] memo;
    public int rob(int[] nums) {
        memo = new int[nums.length];
        Arrays.fill(memo, -1);
        return dfs(nums, 0);
    }
    private int dfs(int[] nums, int i) {
        if (i >= nums.length) return 0;
        if (memo[i] != -1) return memo[i];
        return memo[i] = Math.max(nums[i] + dfs(nums, i + 2), dfs(nums, i + 1));
    }
}
```

**Complexity:** O(n) time · O(n) space
---

## 💭 What Should Have Clicked in Your Mind?

- **"Max on sequential take/skip"** → `rob(i)` with two branches.
- **"Can't take neighbors"** → robbing `i` jumps to `i+2`, not `i+1`.
- **`memo[i]`** → best loot from suffix `i..` — computed once.
- **Not greedy** → optimal path depends on full suffix, not local max.

> 🎯 **Pattern Unlocked:** Linear Memoization

---

*One quest down. Next: count decodings — same index memo, plus the `'0'` guard. →*
