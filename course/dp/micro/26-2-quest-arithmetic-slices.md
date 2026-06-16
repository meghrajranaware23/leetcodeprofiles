<!-- hand-authored -->
# ⚔ Quest: Arithmetic Slices

> **Day 26** · [Arithmetic Slices #413](https://leetcode.com/problems/arithmetic-slices/) · Medium · 15 min · 35 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Arithmetic Slices on LeetCode](https://leetcode.com/problems/arithmetic-slices/)**

> ⚔ **Hunter's rule:** `dp` = slices **ending at i**. Gap continues → `dp += 1`, `ans += dp`. Break → `dp = 0`.

---

## The Problem

See the full problem statement on LeetCode: **[Arithmetic Slices #413](https://leetcode.com/problems/arithmetic-slices/)**

Work through the examples on paper before reading further.

---

## 💡 Hints

Which DP pattern from today's concept applies? **Counting Sequences DP** — centered run count.

An arithmetic slice has **length ≥ 3** and constant step. At index `i`, check if `nums[i]-nums[i-1] == nums[i-1]-nums[i-2]`.

If yes: the run extends. New slices ending at `i` = all slices that ended at `i-1` (extended) **plus one** new 3-element slice. That's `dp += 1`, then `ans += dp`.

If no: reset `dp = 0`.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Counting Sequences DP

**How to identify this from the problem statement:**
- Count **contiguous subarrays** (slices), not subsequences
- Property: constant difference between consecutive elements
- Minimum length 3

| Keyword / phrase | What it signals |
|---|---|
| "arithmetic slice" | diff(i,i-1) == diff(i-1,i-2) |
| "number of slices" | Running count, ans += dp |
| "subarray" / contiguous | Only check consecutive triples+ |

**Brute force contrast:** O(n³) enumerates all subarrays. Running dp is O(n) because extension count is incremental.

**How a strong solver thinks before coding:**
1. *"dp = slices ending at current index."*
2. *"Check 3-element gap at i."*
3. *"Continue: dp++, ans+=dp. Break: dp=0."*
4. *"Return ans."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **All subarrays O(n³)** | Slow on n=5000 |
| **ans += 1 only on continue** | Misses extended longer slices |
| **Subsequence instead of subarray** | Wrong — must be contiguous |

**The insight brute force misses:** When the run extends, each slice ending at `i-1` becomes a longer slice ending at `i` — that's exactly `dp` slices, plus one new length-3 slice → `dp += 1` then `ans += dp`.

```
[1,2,3,4,5]:
i=2: dp=1, ans=1     [1,2,3]
i=3: dp=2, ans=3     +[2,3,4], +[1,2,3,4]
i=4: dp=3, ans=6     +3 more
```

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Arithmetic Slices II #446](https://leetcode.com/problems/arithmetic-slices-ii-subsequence/) | Subsequence, any diff | Harder — map per index |
| [Number of Smooth Descent Periods #2110](https://leetcode.com/problems/number-of-smooth-descent-periods-of-a-stock/) | Decreasing by 1 | Same running dp shape |
| [Domino and Tromino Tiling #790](https://leetcode.com/problems/domino-and-tromino-tiling/) | Tiling not sequences | Today's other quest |

---

## 📖 Walkthrough

**nums = [1, 2, 3, 4]**

```
i=2: 3-2==2-1 ✓ → dp=1, ans=1
i=3: 4-3==3-2 ✓ → dp=2, ans=1+2=3

Slices: [1,2,3], [2,3,4], [1,2,3,4] → 3 total ✓
```

**nums = [1, 2, 3, 8, 9, 10]**

```
i=2: dp=1, ans=1
i=3: 8-3≠3-2 → dp=0
i=4: dp=1, ans=2
i=5: dp=2, ans=4
```

> 💡 **The insight:** `ans += dp` captures all extensions in one line — centered count at each right endpoint.

---

## Solution

### C++
```cpp
class Solution {
public:
    int numberOfArithmeticSlices(vector<int>& nums) {
        int dp = 0, ans = 0;
        for (int i = 2; i < (int)nums.size(); i++) {
            if (nums[i] - nums[i - 1] == nums[i - 1] - nums[i - 2]) { dp++; ans += dp; }
            else dp = 0;
        }
        return ans;
    }
};
```

### Python
```python
class Solution:
    def numberOfArithmeticSlices(self, nums: List[int]) -> int:
        dp = ans = 0
        for i in range(2, len(nums)):
            if nums[i] - nums[i - 1] == nums[i - 1] - nums[i - 2]:
                dp += 1
                ans += dp
            else:
                dp = 0
        return ans
```

### Java
```java
class Solution {
    public int numberOfArithmeticSlices(int[] nums) {
        int dp = 0, ans = 0;
        for (int i = 2; i < nums.length; i++) {
            if (nums[i] - nums[i - 1] == nums[i - 1] - nums[i - 2]) { dp++; ans += dp; }
            else dp = 0;
        }
        return ans;
    }
}
```

**Complexity:** O(n) time · O(1) space
---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"dp = slices ending at i"** — not total from scratch.
- **"ans += dp on extend"** — captures all lengthened slices.
- **"dp = 0 on break"** — gap changed.
- **"Contiguous only"** — three consecutive indices.

If you tried brute force first, that's fine — the breakthrough is **centered run counting**, not memorizing one solution.

> 🎯 **Pattern Unlocked:** Counting Sequences DP

---

*One quest down. The next one builds on this pattern. →*
