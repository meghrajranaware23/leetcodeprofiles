<!-- hand-authored -->
# ⚔ Quest: Partition Equal Subset Sum

> **Day 27** · [Partition Equal Subset Sum #416](https://leetcode.com/problems/partition-equal-subset-sum/) · Medium · 15 min · 40 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Partition Equal Subset Sum on LeetCode](https://leetcode.com/problems/partition-equal-subset-sum/)**

> ⚔ **Hunter's rule:** Interview simulation — name the memo type in 30 seconds. Include OR skip, not loop-all-nums.

---

## The Problem

Given a **non-empty** array `nums` containing **only positive integers**, determine if the array can be partitioned into two subsets such that the sum of elements in both subsets is equal.

```
Input:  nums = [1, 5, 11, 5]
Output: true
Explanation: [1, 5, 5] and [11]

Input:  nums = [1, 2, 3, 5]
Output: false
```

---

## 💡 Hints

> **Interview check:** This is **0/1 subset memo** — NOT ordered combo counting (#377).

**Hint 1:** Equal partition → find subset summing to `total / 2`. If `total` is odd, return false immediately.

**Hint 2:** Each element used **at most once** → `dfs(i+1, ...)` on both branches.

**Hint 3:** Two choices per index: **include** `nums[i]` (subtract from rem) OR **skip** (rem unchanged).

**Hint 4:** Memo key = `(index, remaining)` — 2D. Returns boolean (OR, not sum).

**Hint 5:** Contrast with Combination Sum IV #377: that loops all nums with reuse; this walks index with include/skip.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** 0/1 Subset Sum Memoization (2D index + remaining)

**How to identify this from the problem statement:**
- "Partition into two equal subsets" → subset sum to `total/2`
- Each element once → include/skip at each index
- Boolean answer → OR children, not sum

| Keyword / phrase | What it signals |
|---|---|
| "partition equal subset" / "split into two" | Subset sum to half |
| "can the array be partitioned" | Boolean DFS + memo |
| each element once | include OR skip, `i+1` always |
| positive integers | No negative rem edge cases |

**Interview contrast with Combination Sum IV #377:**

| Partition Equal Subset Sum #416 | Combination Sum IV #377 |
|---|---|
| Boolean — split exists? | Count — ordered sequences |
| Each element once | Unlimited reuse |
| Memo: `(i, rem)` (2D) | Memo: `target` (1D) |
| `include OR skip` | `sum dfs(target - x)` |

**How a strong solver thinks before coding:**
1. *"Equal partition → subset sum to total/2."*
2. *"Odd total → impossible immediately."*
3. *"Include nums[i] OR skip — both advance to i+1."*
4. *"2D memo on (index, remaining) — not 1D target loop."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Try all 2^n subsets without memo** | Exponential — overlap on same (i, rem) |
| **1D target memo like #377** | Can't enforce single-use per element |
| **Generate all combos with reuse** | Wrong problem — each element once |
| **Sort and two-pointer** | Doesn't generalize to the recursive template |

**The interview insight:** "Partition" sounds like Combination Sum — but **no reuse + boolean + index** = 2D subset memo.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Partition Equal Subset Sum #416](https://leetcode.com/problems/partition-equal-subset-sum/) | equal split | 2D include/skip memo |
| [Target Sum #494](https://leetcode.com/problems/target-sum/) | +/- signs | Same 2D shape, different combine |
| [Combination Sum IV #377](https://leetcode.com/problems/combination-sum-iv/) | ordered count | 1D target memo (different!) |
| [Matchsticks to Square #473](https://leetcode.com/problems/matchsticks-to-square/) | 4 buckets | Multi-way partition extension |

---

## 📖 Walkthrough

`nums = [1, 5, 11, 5]`, total = 22, target = 11:

```
dfs(0, rem=11)
├─ include 1  → dfs(1, rem=10)
│   ├─ include 5  → dfs(2, rem=5)
│   │   skip 11 → dfs(3, rem=5)
│   │       include 5 → dfs(4, rem=0) → TRUE ✓
│   └─ ...
└─ skip 1 → dfs(1, rem=11) ...

Found: subset [1, 5, 5] sums to 11. Other subset [11] sums to 11. Return true.
```

Memo saves repeated `(i, rem)` states:

```
dfs(3, rem=5) might be reached from different include/skip paths
→ compute once, cache in memo[3][5]
```

Side-by-side with Combination Sum IV (target=4, nums=[1,2,3]):

```
#416: walk index, binary choice     #377: loop all nums, reuse
  dfs(i, rem)                         dfs(target)
  include OR skip                     sum dfs(target - x)
  memo[i][rem]                        memo[target]
  order irrelevant                    order matters
```

> 💡 **The insight:** Index + remaining = "how much left to fill using elements from i onward?" Memo on that pair.

---

## Solution

### C++
```cpp
class Solution {
    vector<vector<int>> memo;
    bool dfs(vector<int>& nums, int i, int rem) {
        if (rem == 0) return true;
        if (i == (int)nums.size() || rem < 0) return false;
        if (memo[i][rem] != -1) return memo[i][rem];
        return memo[i][rem] = dfs(nums, i + 1, rem - nums[i]) || dfs(nums, i + 1, rem);
    }
public:
    bool canPartition(vector<int>& nums) {
        int sum = accumulate(nums.begin(), nums.end(), 0);
        if (sum % 2) return false;
        memo.assign(nums.size(), vector<int>(sum / 2 + 1, -1));
        return dfs(nums, 0, sum / 2);
    }
};
```

### Python
```python
class Solution:
    def canPartition(self, nums: List[int]) -> bool:
        total = sum(nums)
        if total % 2: return False
        target = total // 2
        memo = {}
        def dfs(i, rem):
            if rem == 0: return True
            if i == len(nums) or rem < 0: return False
            if (i, rem) in memo: return memo[(i, rem)]
            memo[(i, rem)] = dfs(i + 1, rem - nums[i]) or dfs(i + 1, rem)
            return memo[(i, rem)]
        return dfs(0, target)
```

### Java
```java
class Solution {
    private Boolean[][] memo;
    public boolean canPartition(int[] nums) {
        int sum = 0;
        for (int x : nums) sum += x;
        if (sum % 2 != 0) return false;
        memo = new Boolean[nums.length][sum / 2 + 1];
        return dfs(nums, 0, sum / 2);
    }
    private boolean dfs(int[] nums, int i, int rem) {
        if (rem == 0) return true;
        if (i == nums.length || rem < 0) return false;
        if (memo[i][rem] != null) return memo[i][rem];
        return memo[i][rem] = dfs(nums, i + 1, rem - nums[i]) || dfs(nums, i + 1, rem);
    }
}
```

**Complexity:** O(n · sum) time · O(sum) space
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Equal partition → subset sum to half"** → Odd total = instant false.
- **"Each element once → include OR skip"** → Not loop-all-nums.
- **"2D memo (index, rem)"** → Not 1D target memo from quest 1.
- **"Boolean → OR children"** → Not sum of counts.

If you looped all nums with reuse, you built Combination Sum IV's template on the wrong problem.

> 🎯 **Pattern Unlocked:** 0/1 Subset Sum Memoization — 2D include/skip.

---

*Both quests complete. Head to the timed checkpoint. →*
