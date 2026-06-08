# ⚔ Quest: Count Subarrays With Fixed Bounds

> **Day 30** · [Count Subarrays With Fixed Bounds #2444](https://leetcode.com/problems/count-subarrays-with-fixed-bounds/) · Hard · 40 XP · 25 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Count Subarrays With Fixed Bounds on LeetCode](https://leetcode.com/problems/count-subarrays-with-fixed-bounds/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen, paper, or your editor. The hints and walkthrough below are for *after* your attempt.

---

## The Problem

You are given an integer array `nums` and two integers `minK` and `maxK`.

An **fixed-bound subarray** is a subarray where the **minimum** value equals `minK` and the **maximum** value equals `maxK`.

Return the **number** of fixed-bound subarrays.

A subarray is a contiguous part of an array.

```
Input:  nums = [1, 3, 5, 2, 7, 5], minK = 1, maxK = 5
Output: 2
Explanation: [1,3,5] and [1,3,5,2] are fixed-bound (min=1, max=5).

Input:  nums = [1, 1, 1, 1], minK = 1, maxK = 1
Output: 10

Input:  nums = [1, 3, 5, 2, 7, 5], minK = 1, maxK = 3
Output: 0
Explanation: No subarray has max exactly 3.
```

---

## 💡 Hints

**Hint 1 — Three constraints at once:** A valid subarray must (a) contain at least one `minK`, (b) contain at least one `maxK`, and (c) contain **no element** outside `[minK, maxK]`. Any element `< minK` or `> maxK` kills every subarray that includes it.

**Hint 2 — Track lastBad:** On a single left-to-right scan, maintain `lastBad` = the most recent index where `nums[i] < minK` or `nums[i] > maxK`. Every valid subarray must start **strictly after** `lastBad`.

**Hint 3 — Track lastMin and lastMax:** When `nums[i] == minK`, set `lastMin = i`. When `nums[i] == maxK`, set `lastMax = i`. A subarray ending at `i` is fixed-bound only if both landmarks exist inside it.

**Hint 4 — Count valid starts:** For subarrays ending at `i`, the earliest start that includes both required values is `min(lastMin, lastMax) + 1` — but only if both landmarks are past `lastBad`. Valid start indices run from `lastBad + 1` to `min(lastMin, lastMax)` inclusive. Add `max(0, min(lastMin, lastMax) - lastBad)` to the answer.

**Hint 5 — No frequency map needed:** You don't need to know *how many* minK or maxK appear — only whether the subarray includes at least one of each. Last-index tracking is enough. O(n) time, O(1) space.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Multi-Constraint Subarray Counting + Multi-Index Greedy Scan (Day 25 + Day 16 + Index Tracking)

**How to identify this from the problem statement:**
- "count subarrays" → enumeration trick or landmark scan — not nested loops
- "minimum equals minK AND maximum equals maxK" → **two** presence constraints plus range validity
- elements outside `[minK, maxK]` invalidate the window → track last violation index
- Hard + linear expected → O(n) landmark scan, not O(n²) verification

| Keyword / phrase | What it signals |
|---|---|
| "count subarrays" | Accumulate counts per ending index |
| "min equals X and max equals Y" | Must contain both — track last occurrence of each |
| "fixed bounds" / range constraint | lastBad for out-of-range elements |
| Hard + array only | Multi-index greedy scan — no deque, no map |
| both min AND max | Earliest valid start = min(lastMin, lastMax) |

**Why this pattern works:** Fixing the ending index `i`, the valid starting indices form a **contiguous range** determined entirely by three landmarks. Each step updates landmarks in O(1) — the multi-constraint window idea from Day 25 without expand/shrink.

**How a strong solver thinks before coding:**
1. *"Out-of-range element → lastBad. Valid subarray can't cross it."*
2. *"Need minK and maxK inside → track lastMin, lastMax."*
3. *"Starts from lastBad+1 to min(lastMin, lastMax) → add count."*
4. *"One pass, three integers."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Check every subarray, compute min and max** | O(n²) — TLE on n = 10⁵ |
| **Sliding window with freq map** | Overkill — don't need counts, need last positions |
| **Only track lastMin, forget lastBad** | Count subarrays that include out-of-range elements |
| **Use max(lastMin, lastMax) instead of min** | Wrong start boundary — need **both** landmarks inside |

**The insight brute force misses:** For a fixed ending index, valid starts form an interval `[lastBad + 1, min(lastMin, lastMax)]`. The length of that interval is the count for this ending position.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Count Subarrays With Fixed Bounds #2444](https://leetcode.com/problems/count-subarrays-with-fixed-bounds/) | minK + maxK + no bad elements | lastBad, lastMin, lastMax |
| [Subarrays with K Different Integers #992](https://leetcode.com/problems/subarrays-with-k-different-integers/) | exactly k distinct | atMost decomposition (Day 25) |
| [Number of Substrings Containing All Three Characters #1358](https://leetcode.com/problems/number-of-substrings-containing-all-three-characters/) | contain a, b, c | last index of each char |
| [Count Number of Nice Subarrays #1248](https://leetcode.com/problems/count-number-of-nice-subarrays/) | exactly k odd numbers | atMost or landmark variant |

#2444 is the purest multi-index scan — three landmarks, no map, no deque.

---

## 📖 Walkthrough

```
nums = [1, 3, 5, 2, 7, 5],  minK = 1, maxK = 5
lastBad = -1,  lastMin = -1,  lastMax = -1,  ans = 0

i=0 (1): in range, lastMin=0.  Both landmarks not set → add 0
i=1 (3): in range, no landmark update → add 0
i=2 (5): lastMax=2.  min(0,2) − lastBad = 0 − (−1) = 1  → ans=1
         Subarray [0..2] = [1,3,5]  ✓

i=3 (2): lastMin=0, lastMax=2.  min(0,2) − (−1) = 1  → ans=2
         Subarray [0..3] = [1,3,5,2]  ✓

i=4 (7): 7 > maxK → lastBad=4, reset lastMin & lastMax → add 0
i=5 (5): lastMax=5, lastMin still −1 → both not set → add 0

Answer: 2 ✓
```

Valid starts for subarrays ending at `i` are indices `s` where `lastBad < s ≤ min(lastMin, lastMax)`. Each such start gives a subarray that contains no bad element and includes both required values.

> 💡 **The insight:** `min(lastMin, lastMax)` is the **bottleneck** landmark — the later of the two required elements. Every start from `lastBad + 1` through that index yields a valid fixed-bound subarray ending at `i`.

---

## Solution

### C++
```cpp
class Solution {
public:
    long long countSubarrays(vector<int>& nums, int minK, int maxK) {
        long long ans = 0;
        int lastBad = -1, lastMin = -1, lastMax = -1;

        for (int i = 0; i < (int)nums.size(); i++) {
            if (nums[i] < minK || nums[i] > maxK) {
                lastBad = i;
                lastMin = lastMax = -1;
            } else {
                if (nums[i] == minK) lastMin = i;
                if (nums[i] == maxK) lastMax = i;
                if (lastMin != -1 && lastMax != -1)
                    ans += min(lastMin, lastMax) - lastBad;
            }
        }
        return ans;
    }
};
```

### Python
```python
class Solution:
    def countSubarrays(self, nums: list[int], minK: int, maxK: int) -> int:
        ans = 0
        last_bad = last_min = last_max = -1

        for i, x in enumerate(nums):
            if x < minK or x > maxK:
                last_bad = i
                last_min = last_max = -1
            else:
                if x == minK:
                    last_min = i
                if x == maxK:
                    last_max = i
                if last_min != -1 and last_max != -1:
                    ans += min(last_min, last_max) - last_bad

        return ans
```

### Java
```java
class Solution {
    public long countSubarrays(int[] nums, int minK, int maxK) {
        long ans = 0;
        int lastBad = -1, lastMin = -1, lastMax = -1;

        for (int i = 0; i < nums.length; i++) {
            if (nums[i] < minK || nums[i] > maxK) {
                lastBad = i;
                lastMin = lastMax = -1;
            } else {
                if (nums[i] == minK) lastMin = i;
                if (nums[i] == maxK) lastMax = i;
                if (lastMin != -1 && lastMax != -1)
                    ans += Math.min(lastMin, lastMax) - lastBad;
            }
        }
        return ans;
    }
}
```

**Complexity:** O(n) time · O(1) space

---

## 💭 What Should Have Clicked in Your Mind?

Before you opened your editor, these thoughts should have fired:

- **"Count subarrays with min AND max fixed"** → Multi-constraint — Day 25 instinct, but landmarks not freq map.
- **"Elements outside range"** → lastBad — any subarray crossing it is invalid.
- **"Contain minK and maxK"** → lastMin, lastMax — earliest start determined by the slower landmark.
- **"One pass"** → Greedy scan from Day 16 — update indices, accumulate count.

If you tried every subarray with min/max computation, you found O(n²). The signal was "count subarrays" + "both min and max equal constants" — three landmark indices.

> 🎯 **Pattern:** Multi-index greedy scan. lastBad + lastMin + lastMax. Count += min(lastMin, lastMax) − lastBad.

---

*Next: the capstone — algebraic transform turns a pair problem into a sliding window max. →*
