# 🎯 Final Challenge — Maximum Subarray

> [Maximum Subarray #53](https://leetcode.com/problems/maximum-subarray/) · Medium · 50 XP

---

You've completed **Build Momentum**. Now prove you can apply the skills independently.

**[→ Open Maximum Subarray on LeetCode](https://leetcode.com/problems/maximum-subarray/)**

> ⚔ **Phase proof rule:** Spend at least 10 minutes attempting this on your own. Use your full workflow: read → trace → plan → code. No hints until you've tried.

---

## The Problem

**[Maximum Subarray #53](https://leetcode.com/problems/maximum-subarray/)** — see full statement on LeetCode.

**What's being tested:** Stretch Challenge — Stretch problem; Kadane's taught in Arrays Ascension — plants seed without teaching it

---

## 💡 Hints

1. Apply the workflow from this phase — don't skip steps
2. Trace all examples on paper first
3. Brute force is acceptable if it passes constraints

---

## 🔍 Strategy Breakdown

**Skill tested:** Stretch Challenge

**Mentor thinking:**
1. *"I've practiced this skill for 5 days — I know the workflow."*
2. *"Read constraints first. List edge cases."*
3. *"Plan on paper. Code second."*

---

<details>
<summary>📖 Solution & Walkthrough</summary>

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

</details>

---

## 💭 What a Mentor Would Tell You

- *"Getting this wrong after an honest attempt is fine — note what broke in your workflow."*
- *"Getting this right proves your **process** works, not just your memory."*

---

*1 of 1 phase proof. Claim your phase completion. →*
