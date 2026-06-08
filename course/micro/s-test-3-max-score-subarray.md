# ⚔ S-Rank Test — Problem 3

> [Maximum Score of a Good Subarray #1793](https://leetcode.com/problems/maximum-score-of-a-good-subarray/) · **Hard** · 300 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Maximum Score of a Good Subarray on LeetCode](https://leetcode.com/problems/maximum-score-of-a-good-subarray/)**

> ⚔ **Hunter's rule:** This is a rank test — treat it like real LeetCode practice. No peeking until you've genuinely tried.

> 🔥 **The final gate.** Score = **minimum × length** — pure area thinking. Every subarray must contain index `k`. Expand from the anchor with two pointers, or binary search the minimum and greedily widen the window.

---

## The Problem

You are given an array of integers `nums` (0-indexed) and an integer `k`.

The **score** of a good subarray is defined as:

```
score = min(nums[l..r]) × (r − l + 1)
```

A **good subarray** is a subarray where `l ≤ k ≤ r`.

Return the **maximum score** among all good subarrays.

```
Input:  nums = [1, 4, 3, 7, 4, 5], k = 3
Output: 15
Explanation: Subarray indices 1..5 → [4,3,7,4,5], min=3, length=5 → 15.

Input:  nums = [5, 5, 4, 5, 4, 1, 1, 1], k = 0
Output: 20
Explanation: Subarray indices 0..4 → [5,5,4,5,4], min=4, length=5 → 20.

Input:  nums = [5, 5, 4, 5, 4, 1, 1, 1], k = 6
Output: 8
Explanation: Subarray indices 0..7 → entire array, min=1, length=8 → 8.
```

---

## 💡 Hints

> 🎯 **What's being tested:** Binary search on answer + two-pointer expansion from anchor `k` — area = min × width, greedy widening while all elements stay ≥ candidate min.

**Hint 1 — Area formula:** Score is `min × length` — like rectangle area where height is the subarray minimum and width is length. Maximizing area often suggests **binary search on the height (minimum)**.

**Hint 2 — Binary search on min:** If a subarray containing `k` with minimum ≥ `m` and length `L` exists, then any `m' < m` also works (widen or keep length). Binary search the largest feasible minimum `m`, compute max width for each candidate.

**Hint 3 — Expand from k:** For a candidate minimum `m`, start `l = r = k`. Expand `l` left while `nums[l−1] ≥ m`. Expand `r` right while `nums[r+1] ≥ m`. If `nums[k] ≥ m`, the window `[l..r]` is valid — score = `m × (r − l + 1)`.

**Hint 4 — Greedy widening is optimal for fixed m:** For a fixed minimum threshold `m`, the **widest** valid window containing `k` gives the best score — always expand as far as possible while all elements ≥ `m`.

**Hint 5 — Two-pointer alternative:** Expand outward from `k` greedily tracking running min — when min drops, shrink from the side that lost the constraint. Binary search is cleaner for Hard constraints; both reflect **center-anchored expansion** thinking.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Binary Search on Answer + Two-Pointer Expansion from Anchor (Day 16 greedy + Day 9 window + area thinking)

| Clue in the problem | What it signals |
|---|---|
| "score = min × length" | Area formula — binary search on min (height) |
| "must contain index k" | Anchor expansion — start l = r = k |
| "maximum score" | Maximize product — widen window for each candidate min |
| Hard + subarray with min | Not monotonic stack — binary search + expand |
| good subarray contains k | Two pointers expand from center |

**How to identify from the statement:** "min × length" with fixed anchor index → **binary search minimum**, for each candidate expand left/right from `k` while all values ≥ candidate.

**How a strong solver thinks before coding:**
1. *"Score = min × len → binary search on min."*
2. *"For candidate m, expand l and r from k while nums[·] ≥ m."*
3. *"Score = m × (r − l + 1), track max."*
4. *"O(n log V) where V = max(nums)."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Check every subarray containing k, compute min × len** | O(n²) — TLE on n = 10⁵ |
| **Monotonic stack for min × len** | Stack finds min as minimum element — different from anchored good subarray |
| **Expand without binary search (check every min value)** | O(n²) distinct mins — binary search reduces to O(n log V) |
| **Expand from k without checking nums[k] ≥ m** | Invalid when anchor value below candidate min |
| **Fixed window size** | Optimal length varies with minimum — must widen greedily |

**The insight brute force misses:** For a fixed minimum `m`, the widest valid window containing `k` is found by greedy expansion — one left sweep, one right sweep. Binary search on `m` turns O(n²) into O(n log V).

---

## 🎯 Transfer to Unseen Problems

Can you spot area = min × length thinking on unfamiliar wording?

**Scenario 1:** *"Given a histogram bar at index k, find the largest rectangle that must include bar k."*

Which pattern? **Largest Rectangle in Histogram with anchor** — monotonic stack variant, not binary search. Related area thinking, different mechanic.

**Scenario 2:** *"Maximize the product of the minimum and the sum of a subarray containing index k."*

Which pattern? **Different formula** — min × sum, not min × length. May need different decomposition.

**Scenario 3:** *"Find longest subarray containing k where all elements are ≥ threshold t."*

Which pattern? **Two-pointer expansion from k** — substep inside #1793's binary search.

> **Answer key:** Scenario 1 → histogram stack (Day 18). Scenario 2 → not #1793 — analyze formula. Scenario 3 → anchored expansion (core of #1793).

---

<details>
<summary><strong>📖 Solution & Walkthrough</strong></summary>

### Step-by-Step Walkthrough

```
nums = [5, 5, 4, 5, 4, 1, 1, 1],  k = 0
Binary search on min: lo=1, hi=5

Try m=3: nums[0]=5 ≥ 3. Expand: l=0, r=4 (all ≥3 until index 5).
  score = 3 × 5 = 15

Try m=4: l=0, r=4 (nums[0..4] all ≥ 4? nums[2]=4 ✓, nums[4]=4 ✓)
  score = 4 × 5 = 20

Try m=5: l=0, r=1 (nums[2]=4 < 5, can't expand past index 1)
  score = 5 × 2 = 10

Best across search → 20 ✓
```

```
nums = [1, 4, 3, 7, 4, 5],  k = 3
Binary search on min: lo=1, hi=7

Try m=3: nums[3]=7 ≥ 3. Expand: l=1, r=5 (all ≥ 3)
  score = 3 × 5 = 15

Try m=4: nums[2]=3 < 4 — window cannot include index 2.
  Widest valid window with min ≥ 4 containing k=3: check manually → max score is 4 × 1 = 4.

Best across search → 15 ✓
```

### C++
```cpp
class Solution {
    bool canExpand(vector<int>& nums, int k, int m, int& width) {
        if (nums[k] < m) return false;
        int l = k, r = k;
        while (l > 0 && nums[l - 1] >= m) l--;
        while (r + 1 < (int)nums.size() && nums[r + 1] >= m) r++;
        width = r - l + 1;
        return true;
    }

public:
    int maximumScore(vector<int>& nums, int k) {
        int lo = 1, hi = nums[k], ans = 0;
        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2;
            int width = 0;
            if (canExpand(nums, k, mid, width)) {
                ans = max(ans, mid * width);
                lo = mid + 1;
            } else {
                hi = mid - 1;
            }
        }
        return ans;
    }
};
```

### Python
```python
class Solution:
    def maximumScore(self, nums: list[int], k: int) -> int:
        def expand(m: int) -> int:
            if nums[k] < m:
                return 0
            l = r = k
            while l > 0 and nums[l - 1] >= m:
                l -= 1
            while r + 1 < len(nums) and nums[r + 1] >= m:
                r += 1
            return m * (r - l + 1)

        lo, hi = 1, nums[k]
        ans = 0
        while lo <= hi:
            mid = (lo + hi) // 2
            score = expand(mid)
            if score > 0:
                ans = max(ans, score)
                lo = mid + 1
            else:
                hi = mid - 1
        return ans
```

### Java
```java
class Solution {
    private int expand(int[] nums, int k, int m) {
        if (nums[k] < m) return 0;
        int l = k, r = k;
        while (l > 0 && nums[l - 1] >= m) l--;
        while (r + 1 < nums.length && nums[r + 1] >= m) r++;
        return m * (r - l + 1);
    }

    public int maximumScore(int[] nums, int k) {
        int lo = 1, hi = nums[k], ans = 0;
        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2;
            int score = expand(nums, k, mid);
            if (score > 0) {
                ans = Math.max(ans, score);
                lo = mid + 1;
            } else {
                hi = mid - 1;
            }
        }
        return ans;
    }
}
```

**Complexity:** O(n log V) time where V = max(nums) · O(1) extra space

</details>

---

## 💭 What Should Have Clicked in Your Mind?

- **"min × length"** → Area — binary search on the minimum (height).
- **"Must contain index k"** → Anchor l = r = k, expand outward.
- **"Maximum score"** → For each candidate min, widest window wins — greedy expansion.
- **Hard + anchored subarray** → Not pure stack — binary search + two pointers from center.

You just completed the S-Rank Final Test trilogy: 132 pattern synthesis, greedy stack + merge + split, and area thinking with anchored expansion. Three different combination styles — all built from patterns you trained for 30 days.

---

## 🏁 Scoring

| Result | Verdict |
|---|---|
| 3/3 solved | **Legend confirmed** |
| 2/3 solved | **Pass** — synthesis mastery proven |
| 1/3 solved | **Not yet** — review weakest combinations |
| 0/3 solved | **Return to A-Rank** |

---

*Test complete. Proceed to claim your rank-up. →*
