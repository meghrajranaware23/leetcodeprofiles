<!-- hand-authored -->
# ⚔ A-Rank Test — Problem 3

> [Partition Equal Subset Sum #416](https://leetcode.com/problems/partition-equal-subset-sum/) · Medium · 250 XP

---

You've completed your A-Rank training. Now prove your foundation.

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Partition Equal Subset Sum on LeetCode](https://leetcode.com/problems/partition-equal-subset-sum/)**

> ⚔ **Hunter's rule:** This is a rank test — treat it like real interview practice. Include OR skip, not loop-all-nums. You saw this on Day 27.

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

> 🎯 **What's being tested:** 0/1 subset memo (Day 27) — NOT ordered combo counting (#377).

**Hint 1:** Equal partition ↔ find subset summing to `total / 2`. If `total % 2 != 0`, return false immediately.

**Hint 2:** Each element used **at most once** → at index `i`, two choices: include `nums[i]` or skip it. Both advance to `i+1`.

**Hint 3:** Memo key = `(index, remaining)` — 2D. Returns **boolean** (OR children, not sum).

**Hint 4:** `dfs(i, rem)`: include → `dfs(i+1, rem - nums[i])`; skip → `dfs(i+1, rem)`.

**Hint 5:** Contrast with Combination Sum IV: that loops all nums with reuse and memoizes on target. This walks index with include/skip — completely different memo shape.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** 0/1 Subset Sum Memoization

| Clue | Signal |
|---|---|
| "partition into two equal subsets" | Subset sum to half of total |
| "can the array be partitioned" | Boolean DFS + memo |
| positive integers, use each once | include OR skip at each index |
| overlapping (i, rem) subproblems | 2D memo table |

**Contrast with Combination Sum IV (#377):**

| Partition Equal Subset (#416) | Combination Sum IV (#377) |
|---|---|
| Boolean (OR) | Count (sum) |
| 2D memo `(i, rem)` | 1D memo `target` |
| Include OR skip | Loop all nums |
| No reuse | Unlimited reuse |
| Order irrelevant | Order matters |

**How a strong solver thinks before coding:**
1. *"Equal split → target = sum/2, odd sum → false."*
2. *"Each element once → include OR skip, i+1 on both."*
3. *"2D memo — not 1D target loop."*
4. *"Day 27 quest 2 — code it cold."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Try all 2^n subsets without memo** | Exponential — same (i, rem) recomputed |
| **1D target memo like #377** | Can't enforce single-use per element |
| **Generate all combos with reuse** | Wrong constraint — each element once |
| **Skip odd-sum check** | Wastes DFS on impossible inputs |

**The insight:** The `(index, remaining)` pair fully describes the subproblem. Memo there — not on target alone.

---

## 🎯 Transfer to Unseen Problems

Can you spot the pattern without the problem name telling you?

*"Can you pick a subset of nums (each once) that sums to exactly half the total?"*

→ **0/1 subset memo.** Include OR skip. Memo on `(i, rem)`.

Read the statement once. Say the pattern aloud. If you can name it in under 30 seconds, you're ready.

---

<details>
<summary><strong>📖 Solution & Walkthrough</strong></summary>

Trace the pattern on the example from the problem statement. Then implement the recursive skeleton you identified.

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

</details>

---

## 💭 What Should Have Clicked in Your Mind?

- **"Equal partition"** → Subset sum to half; odd total = false.
- **"Include OR skip"** → 2D memo on `(index, remaining)`.
- **"Not Combination Sum IV"** → No reuse, no order, boolean not count.
- **"A-Rank test"** → Day 27 interview simulation — name memo shape first.

---

*3 of 3 test problems. Continue to the next. →*

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
