<!-- hand-authored -->
# ⚔ Quest: House Robber II

> **Day 9** · [House Robber II #213](https://leetcode.com/problems/house-robber-ii/) · Medium · 15 min · 20 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open House Robber II on LeetCode](https://leetcode.com/problems/house-robber-ii/)**

> ⚔ **Hunter's rule:** The circle breaks single-pass robber. Plan **two linear ranges** before coding — exclude last, exclude first.

---

## The Problem

See the full problem statement on LeetCode: **[House Robber II #213](https://leetcode.com/problems/house-robber-ii/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

**Pattern:** Day 9 **Circular Constraint DP** = Day 6 twice.

- Can't rob house `0` and house `n-1` together
- **Pass A:** `robRange(0, n-2)` — last house forbidden
- **Pass B:** `robRange(1, n-1)` — first house forbidden
- Answer: `max(passA, passB)`; if `n==1`, return `nums[0]`

Inside `robRange`: identical `prev2`/`prev1` from House Robber.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Circular Constraint DP

**How to identify this from the problem statement:**
- Same as House Robber but array is a **circle**
- Adjacency wraps: `(n-1)` neighbors `0`
- Reduce to linear subarrays

| Keyword / phrase | What it signals |
|---|---|
| "adjacent houses" + "circle" | Two-pass split |
| "first and last are neighbors" | Can't take both ends |
| linear only | **Day 6** one pass |

**Why two passes work:** Any optimal set on a circle either omits index 0 or omits index n−1 (or both). Those cases cover all valid circular selections.

**How a strong solver thinks before coding:**
1. *"Edge: n==1."*
2. *"Helper rob(lo, hi) — Day 6 on slice."*
3. *"Return max(rob(0,n-2), rob(1,n-1))."*
4. *"Don't modify nums — index ranges only."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Day 6 one pass on full array** | May rob both 0 and n−1 |
| **Try all subsets with bitmask** | O(2^n) |
| **Remove one house arbitrarily** | Must try **both** exclusions |
| **Rotate array trick without two passes** | Still need explicit case split |

**The insight brute force misses:** Circular = **two linear problems**. No new recurrence — just **two calls**.

```
[1,2,3,1] circle
  Pass1 [1,2,3] → 4
  Pass2 [2,3,1] → 4
  max = 4
```

---

## 🔗 Same Pattern, Other Problems

| Problem | Variant | Pattern |
|---|---|---|
| [House Robber #198](https://leetcode.com/problems/house-robber/) | Linear | Day 6 base |
| [Maximum Sum Circular Subarray #918](https://leetcode.com/problems/maximum-sum-circular-subarray/) | Circle + **subarray** | D-Rank test — Kadane bridge |
| [Delete and Earn #740](https://leetcode.com/problems/delete-and-earn/) | Value line | Compress + Day 6 |

---

## 📖 Walkthrough

**Example:** `nums = [2, 3, 2]`

```
Pass A (0..1): houses 2,3 → max = 3? 
  i=0: prev1=2
  i=1: max(2, 0+3)=3 → 3

Pass B (1..2): houses 3,2
  → max(3, 0+2)=3 vs max(2,3+2)=5? 
  i=1: prev1=3
  i=2: max(3, 0+2)=3

Wait recalc Pass B:
  lo=1, hi=2
  num=3: curr=max(0,0+3)=3, prev2=0,prev1=3
  num=2: curr=max(3,0+2)=3
  Pass B = 3

Pass A same = 3
Answer max(3,3)=3 ✓
```

> 💡 **The insight:** You already know the inner loop — the circle only decides **which indices to include**.

---

## Solution

### C++
```cpp
class Solution {
    int robRange(vector<int>& nums, int lo, int hi) {
        int prev2 = 0, prev1 = 0;
        for (int i = lo; i <= hi; i++) {
            int curr = max(prev1, prev2 + nums[i]);
            prev2 = prev1; prev1 = curr;
        }
        return prev1;
    }
public:
    int rob(vector<int>& nums) {
        int n = nums.size();
        if (n == 1) return nums[0];
        return max(robRange(nums, 0, n - 2), robRange(nums, 1, n - 1));
    }
};
```

### Python
```python
class Solution:
    def rob(self, nums: List[int]) -> int:
        if len(nums) == 1:
            return nums[0]
        def rob_range(lo, hi):
            prev2 = prev1 = 0
            for i in range(lo, hi + 1):
                prev2, prev1 = prev1, max(prev1, prev2 + nums[i])
            return prev1
        return max(rob_range(0, len(nums) - 2), rob_range(1, len(nums) - 1))
```

### Java
```java
class Solution {
    public int rob(int[] nums) {
        int n = nums.length;
        if (n == 1) return nums[0];
        return Math.max(robRange(nums, 0, n - 2), robRange(nums, 1, n - 1));
    }
    private int robRange(int[] nums, int lo, int hi) {
        int prev2 = 0, prev1 = 0;
        for (int i = lo; i <= hi; i++) {
            int curr = Math.max(prev1, prev2 + nums[i]);
            prev2 = prev1; prev1 = curr;
        }
        return prev1;
    }
}
```

**Complexity:** O(n) time · O(1) space
---

## 💭 What Should Have Clicked in Your Mind?

- **"Circle + non-adjacent"** → two linear rob passes.
- **"Exclude first OR last"** → covers wrap adjacency.
- **"Inner loop = Day 6"** → no new transition.
- **"n==1"** → skip two-pass logic.

> 🎯 **Pattern Unlocked:** Circular Constraint DP

---

*One quest down. Next: dual state for product — not two-pass. →*
