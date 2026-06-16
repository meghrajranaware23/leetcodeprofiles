<!-- hand-authored -->
# ⚔ Quest: Maximum Product Subarray

> **Day 9** · [Maximum Product Subarray #152](https://leetcode.com/problems/maximum-product-subarray/) · Medium · 15 min · 20 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Maximum Product Subarray on LeetCode](https://leetcode.com/problems/maximum-product-subarray/)**

> ⚔ **Hunter's rule:** Track **two** numbers at each index — best product ending here AND worst. Negative numbers swap their roles.

---

## The Problem

See the full problem statement on LeetCode: **[Maximum Product Subarray #152](https://leetcode.com/problems/maximum-product-subarray/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

**Pattern:** Day 9 **Dual-State Tracking DP**.

- `maxP` = max product of subarray **ending at i**
- `minP` = min product ending at i (most negative)
- When `nums[i] < 0`, swap `maxP` and `minP` before update (or include minP in max formula)
- `ans = max(ans, maxP)` each step
- **Restart option:** `max(nums[i], maxP * nums[i])` — subarray can start fresh at i

Not take/skip. Not two-pass. **Two parallel rolling states.**

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Dual-State Tracking DP

**How to identify this from the problem statement:**
- Contiguous subarray (not non-adjacent like robber)
- **Product** — negatives flip sign
- Need best ending-here + worst ending-here

| Keyword / phrase | What it signals |
|---|---|
| "maximum product subarray" | maxP + minP |
| negative numbers | swap or cross-multiply min into max |
| "subarray" (contiguous) | extend or reset at i — not skip/take |

**Why dual state works:** Min product × negative = candidate max product.

**How a strong solver thinks before coding:**
1. *"Initialize maxP=minP=ans=nums[0]."*
2. *"For i≥1: if nums[i]<0 swap maxP,minP."*
3. *"Update maxP, minP with extend-or-reset."*
4. *"Track global max."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Kadane max-sum only** | Misses negative × negative boost |
| **Only track maxP** | Fails on `[-2, 3, -4]` type cases |
| **Day 6 take/skip** | Subarray must be **contiguous** |
| **Product of whole array** | Subarray may exclude prefix/suffix |

**The insight brute force misses:** The worst ending product is as valuable as the best when the next element is negative.

```
[2, 3, -2, 4]
Without minP: might miss that -2 flips a strong positive chain
With minP: -12 at i=2 sets up 4 → max 4 at i=3
```

---

## 🔗 Same Pattern, Other Problems

| Problem | State | Notes |
|---|---|---|
| [Maximum Subarray #53](https://leetcode.com/problems/maximum-subarray/) | Single max | E-rank Kadane — sum not product |
| [House Robber II #213](https://leetcode.com/problems/house-robber-ii/) | Two **passes** | Different Day 9 branch |
| [Best Sightseeing Pair #1014](https://leetcode.com/problems/best-sightseeing-pair/) | Running max + index | Dual scalar, different shape |

---

## 📖 Walkthrough

**Example:** `nums = [-2, 0, -1]`

```
i=0: maxP=-2, minP=-2, ans=-2
i=1: max(0, -2*0)=0, min(0, -2*0)=0, ans=0
i=2: nums[2]<0 → swap (0,0)
     maxP=max(-1, 0*(-1))=-1, minP=min(-1,0)=-1, ans=0
Answer: 0
```

**Example:** `nums = [2, 3, -2, 4]`

```
Track maxP, minP; ans peaks at 6 (subarray [2,3]) and 4 ([4])
```

> 💡 **The insight:** Product DP needs **max and min** ending here — sign is the hidden state.

---

## Solution

### C++
```cpp
class Solution {
public:
    int maxProduct(vector<int>& nums) {
        int ans = nums[0], maxP = nums[0], minP = nums[0];
        for (int i = 1; i < (int)nums.size(); i++) {
            if (nums[i] < 0) swap(maxP, minP);
            maxP = max(nums[i], maxP * nums[i]);
            minP = min(nums[i], minP * nums[i]);
            ans = max(ans, maxP);
        }
        return ans;
    }
};
```

### Python
```python
class Solution:
    def maxProduct(self, nums: List[int]) -> int:
        ans = max_p = min_p = nums[0]
        for i in range(1, len(nums)):
            if nums[i] < 0:
                max_p, min_p = min_p, max_p
            max_p = max(nums[i], max_p * nums[i])
            min_p = min(nums[i], min_p * nums[i])
            ans = max(ans, max_p)
        return ans
```

### Java
```java
class Solution {
    public int maxProduct(int[] nums) {
        int ans = nums[0], maxP = nums[0], minP = nums[0];
        for (int i = 1; i < nums.length; i++) {
            if (nums[i] < 0) { int t = maxP; maxP = minP; minP = t; }
            maxP = Math.max(nums[i], maxP * nums[i]);
            minP = Math.min(nums[i], minP * nums[i]);
            ans = Math.max(ans, maxP);
        }
        return ans;
    }
}
```

**Complexity:** O(n) time · O(1) space
---

## 💭 What Should Have Clicked in Your Mind?

- **"Product + negatives"** → track minP and maxP together.
- **"Swap on negative"** → min becomes max candidate.
- **"Contiguous subarray"** → extend or start at nums[i].
- **"Not House Robber"** — adjacent elements **included**, not excluded.

> 🎯 **Pattern Unlocked:** Dual-State Tracking DP

---

*Both quests complete. Head to the checkpoint. →*
