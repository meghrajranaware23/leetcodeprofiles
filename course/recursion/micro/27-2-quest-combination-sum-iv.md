<!-- hand-authored -->
# ⚔ Quest: Combination Sum IV

> **Day 27** · [Combination Sum IV #377](https://leetcode.com/problems/combination-sum-iv/) · Medium · 15 min · 40 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Combination Sum IV on LeetCode](https://leetcode.com/problems/combination-sum-iv/)**

> ⚔ **Hunter's rule:** Interview simulation — name the memo type in 30 seconds, then code. `[1,2]` and `[2,1]` both count.

---

## The Problem

Given an array of **distinct** integers `nums` and a target integer, return the **number of possible combinations** that add up to target.

Each element may be used **unlimited times**. Two combinations are unique if **at least one index** differs — **order matters**.

```
Input:  nums = [1,2,3], target = 4
Output: 7
Explanation: (1,1,2), (1,2,1), (1,3), (2,1,1), (2,2), (3,1) — seven ordered sequences

Input:  nums = [9], target = 3
Output: 0
```

---

## 💡 Hints

> **Interview check:** This is **ordered combo memo** — NOT start-index Combination Sum (#39).

**Hint 1:** Order matters → loop **all** nums at every call. No `start` index.

**Hint 2:** Reuse allowed → `dfs(target - x)` can pick `x` again on the next call.

**Hint 3:** Memo key = **target only** (1D array). `memo[t] = sum of dfs(t - x)`.

**Hint 4:** Base: `target == 0 → 1` way; `target < 0 → 0`.

**Hint 5:** Contrast with Partition #416: that problem uses `(index, rem)` 2D memo with include/skip — no reuse, no order.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Ordered Combination Counting (1D target memo)

**How to identify this from the problem statement:**
- "How many combinations" + **order matters** → not start-index combo
- Unlimited reuse → loop all nums every call
- Count return → sum children, cache on target

| Keyword / phrase | What it signals |
|---|---|
| "combination sum IV" / "ordered" | 1D memo on target |
| "each element may be used unlimited times" | Reuse — no index advance |
| "order matters" / distinct index sequences | Loop all nums, not start index |
| "how many ways" + overlap | Memo on target |

**Interview contrast with Partition Equal Subset Sum #416:**

| Combination Sum IV #377 | Partition Equal Subset Sum #416 |
|---|---|
| Count ordered sequences | Boolean — equal split exists? |
| Reuse elements | Each element once |
| Memo: `target` (1D) | Memo: `(i, rem)` (2D) |
| `sum dfs(target - x)` | `include OR skip` |

**How a strong solver thinks before coding:**
1. *"Order matters → NOT start-index combo from Day 13."*
2. *"Reuse → loop all nums at every target."*
3. *"Memo on target — 1D array size target+1."*
4. *"[1,2] and [2,1] both count — confirms ordered."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Start-index combo (#39 template)** | Misses order — counts [1,2] and [2,1] as one |
| **Generate all sequences without memo** | Exponential — same target recomputed |
| **2D (index, target) memo like subset** | Wrong shape — reuse breaks single-pass index |
| **Backtracking with path collection** | Overkill — only need count, not list |

**The interview insight:** "Combination" in the title is misleading. **Order + reuse = 1D target memo**, not Day 13 backtracking.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Combination Sum IV #377](https://leetcode.com/problems/combination-sum-iv/) | ordered + reuse | 1D target memo |
| [Combination Sum #39](https://leetcode.com/problems/combination-sum/) | unordered + reuse | Start-index backtracking |
| [Coin Change #322](https://leetcode.com/problems/coin-change/) | min coins, order irrelevant | 1D DP (different combine) |
| [Decode Ways #91](https://leetcode.com/problems/decode-ways/) | string index memo | 1D on index (linear, not combo) |

---

## 📖 Walkthrough

`nums = [1, 2, 3]`, `target = 4`:

```
ways(4) = ways(3) + ways(2) + ways(1)
        = dfs(3)  + dfs(2)  + dfs(1)

ways(3) = ways(2) + ways(1) + ways(0)
        = dfs(2)  + dfs(1)  + 1

ways(2) = ways(1) + ways(0) + ways(-1)
        = dfs(1)  + 1       + 0

ways(1) = ways(0) + ways(-1) + ways(-2)
        = 1       + 0       + 0

Back-substitute:
ways(2) = 1 + 1 + 0 = 2   → sequences: [1,1], [2]
ways(3) = 2 + 1 + 1 = 4   → [1,1,1], [1,2], [2,1], [3]
ways(4) = 4 + 2 + 1 = 7   ✓

Memo cache after full run:
  memo[0]=1, memo[1]=1, memo[2]=2, memo[3]=4, memo[4]=7
```

Notice `[1,2]` and `[2,1]` both appear in ways(3) — **order matters**.

> 💡 **The insight:** One loop over nums per target. Memo collapses the exponential tree to O(n · target).

---

## Solution

### C++
```cpp
class Solution {
    vector<int> memo;
    int dfs(vector<int>& nums, int target) {
        if (target == 0) return 1;
        if (target < 0) return 0;
        if (memo[target] != -1) return memo[target];
        int ways = 0;
        for (int x : nums) ways += dfs(nums, target - x);
        return memo[target] = ways;
    }
public:
    int combinationSum4(vector<int>& nums, int target) {
        memo.assign(target + 1, -1);
        return dfs(nums, target);
    }
};
```

### Python
```python
class Solution:
    def combinationSum4(self, nums: List[int], target: int) -> int:
        memo = {}
        def dfs(t):
            if t == 0: return 1
            if t < 0: return 0
            if t in memo: return memo[t]
            memo[t] = sum(dfs(t - x) for x in nums)
            return memo[t]
        return dfs(target)
```

### Java
```java
class Solution {
    private int[] memo;
    public int combinationSum4(int[] nums, int target) {
        memo = new int[target + 1];
        Arrays.fill(memo, -1);
        return dfs(nums, target);
    }
    private int dfs(int[] nums, int target) {
        if (target == 0) return 1;
        if (target < 0) return 0;
        if (memo[target] != -1) return memo[target];
        int ways = 0;
        for (int x : nums) ways += dfs(nums, target - x);
        return memo[target] = ways;
    }
}
```

**Complexity:** O(n · target) time · O(target) space
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Order matters → not Day 13 combo"** → Loop all nums, no start index.
- **"Reuse allowed → target shrinks, nums stays"** → `dfs(target - x)`.
- **"1D memo on target"** → Not 2D subset memo.
- **"Sum children, cache result"** → Count pattern, not OR.

If you reached for include/skip, you picked the **wrong memo** — that's Partition #416's tree.

> 🎯 **Pattern Unlocked:** Ordered Combination Counting — 1D target memo.

---

*One quest down. Next: the 0/1 subset memo that looks similar but isn't. →*
