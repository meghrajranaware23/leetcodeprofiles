<!-- hand-authored -->
# 🎯 Final Challenge — Maximum Subarray

> [Maximum Subarray #53](https://leetcode.com/problems/maximum-subarray/) · Easy · 50 XP

---

**Stretch proof** for Phase 3 — full 15-day workflow, honest attempt first.

**[→ Open on LeetCode](https://leetcode.com/problems/maximum-subarray/)**

> ⚔ 15-minute attempt before hints. This is hard for Day 15 — **process over AC**.

---

## The Problem

Find contiguous subarray with largest sum. Return the sum.

**Example:** `nums = [-2,1,-3,4,-1,2,1,-5,4]` → `6` (subarray `[4,-1,2,1]`)

---

## 💡 Hints

> 🎯 **Synthesizes Phase 3:** pattern tag (array-scan), practice plan (don't cram Kadane), timed workflow.

**Hint 1 (Day 11):** Tag array-scan / running aggregate — not random.

**Hint 2 (Day 13 seed):** Trace Example — extend vs restart subarray at each index.

**Hint 3 (workflow):** Brute force all subarrays works for small n — trace why it's slow.

**Hint 4 (defer):** **Kadane's algorithm** — full treatment in **Arrays & Strings** or **DP Ascension**. Today: `cur = max(nums[i], cur + nums[i])` is enough if you traced first.

---

## 📖 Trace excerpt

```
At index with 4: extending prev sum vs start fresh at 4
Best subarray ending here vs global best
```

---

## 💭 What a Mentor Would Tell You

- *"Stretch problem — wrong after honest attempt is fine if workflow was complete."*
- *"I'll learn Kadane properly in a topic pack — today proved I can attempt hard Easies."*

---

*Starter Path complete. Choose your Ascension pack. →*

## Solution

### C++
```cpp
class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        int best = nums[0], cur = nums[0];
        for (int i = 1; i < nums.size(); i++) {
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
        best = cur = nums[0]
        for n in nums[1:]:
            cur = max(n, cur + n)
            best = max(best, cur)
        return best
```

### Java
```java
class Solution {
    public int maxSubArray(int[] nums) {
        int best = nums[0], cur = nums[0];
        for (int i = 1; i < nums.length; i++) {
            cur = Math.max(nums[i], cur + nums[i]);
            best = Math.max(best, cur);
        }
        return best;
    }
}
```

**Complexity:** O(n) time · O(1) space
