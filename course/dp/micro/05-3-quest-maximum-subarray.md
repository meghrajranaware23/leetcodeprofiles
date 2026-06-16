<!-- hand-authored -->
# ⚔ Quest: Maximum Subarray

> **Day 5** · [Maximum Subarray #53](https://leetcode.com/problems/maximum-subarray/) · Medium · 15 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Maximum Subarray on LeetCode](https://leetcode.com/problems/maximum-subarray/)**

> ⚔ **Hunter's rule:** Trace `[-2,1,-3,4,-1,2,1,-5,4]` with two columns: **extend** vs **reset** at each i. Day 5's Kadane template.

---

## The Problem

See the full problem statement on LeetCode: **[Maximum Subarray #53](https://leetcode.com/problems/maximum-subarray/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

**Pattern:** Kadane's / Linear Decision DP — extend-or-reset at each index.

**Hint 1:** `cur` = maximum sum of a subarray **ending exactly at** index i (must include nums[i]).

**Hint 2:** At i: either **extend** previous subarray (`cur + nums[i]`) or **reset** start fresh (`nums[i]`). Take max.

**Hint 3:** `best = max(best, cur)` each step. Answer is `best`, not `cur` at last index.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Kadane's / Linear Decision DP

**How to identify this from the problem statement:**
- Contiguous subarray required
- Maximize sum (not count, not min cost)
- Classic "ending at i" state

| Keyword / phrase | What it signals |
|---|---|
| "contiguous subarray" | Can't skip middle elements |
| "maximum sum" | Kadane extend vs reset |
| Negative numbers allowed | Reset becomes essential |

**Why brute force fails:** O(n²) or O(n³) all subarrays — Kadane is O(n) with optimal substructure.

**How a strong solver thinks before coding:**
1. *"State: best sum ending at i."*
2. *"If cur+nums[i] < nums[i], reset."*
3. *"Track global best separately."*
4. *"At least one element — init cur=best=nums[0]."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **All O(n²) subarrays** | TLE on large n |
| **Greedy without ending-at-i state** | Hard to justify globally |
| **Kadane cur/best** | O(n) ✓ |

```
nums = [5, -3, 5]

i=0: cur=5, best=5
i=1: extend=2, reset=-3 → cur=-3, best=5
i=2: extend=2, reset=5 → cur=5, best=5

Best subarray: [5] or [5,-3,5] both sum 5? 
5-3+5=7 actually: extend at i=2: -3+5=2 vs reset 5 → cur=5... 
5 + (-3) + 5 = 7: cur at 2 = max(5, 2+5)=7 ✓
```

---

## 🔗 Same Pattern, Other Problems

| Problem | Variant |
|---|---|
| **Maximum Subarray #53** | max sum |
| Maximum Product Subarray | track min and max (sign flips) |
| House Robber (later) | max with no adjacent — different constraint |

---

## 📖 Walkthrough

**Kadane trace — nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]**

```
i  nums[i]  cur=max(n[i],cur+n[i])  best
0    -2              -2                -2
1     1               1                 1
2    -3              -2                 1
3     4               4                 4   ← reset beat extend
4    -1               3                 4
5     2               5                 5
6     1               6                 6   ← [4,-1,2,1] sum 6
7    -5               1                 6
8     4               5                 6

Answer: 6
```

> 💡 **The insight:** Reset at i=3 (value 4) is the fork — negative cur couldn't help. Day 5 decision DP in two variables.

---

## Solution

### C++
```cpp
class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        int cur = nums[0], best = nums[0];
        for (int i = 1; i < (int)nums.size(); i++) {
            cur = max(nums[i], cur + nums[i]);
            best = max(best, cur);
        }
        return best;
    }
};
```

### Python
```python
class Solution:
    def maxSubArray(self, nums: List[int]) -> int:
        cur = best = nums[0]
        for i in range(1, len(nums)):
            cur = max(nums[i], cur + nums[i])
            best = max(best, cur)
        return best
```

### Java
```java
class Solution {
    public int maxSubArray(int[] nums) {
        int cur = nums[0], best = nums[0];
        for (int i = 1; i < nums.length; i++) {
            cur = Math.max(nums[i], cur + nums[i]);
            best = Math.max(best, cur);
        }
        return best;
    }
}
```

**Complexity:** O(n) time · O(1) space
---

## 💭 What Should Have Clicked in Your Mind?

- **"Ending at i"** → cur is not global best — update best separately.
- **"extend vs reset"** → Day 5 decision table on paper.
- **"All negative?"** → cur=best=nums[0] still works (single element).
- **"Contiguous"** → Reset abandons left prefix — can't skip internally.

> 🎯 **Pattern Unlocked:** Kadane's / Linear Decision DP

---

*Both quests complete. Head to the checkpoint. →*
