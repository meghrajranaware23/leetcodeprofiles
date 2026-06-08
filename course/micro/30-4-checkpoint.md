# ✅ Day 30 Checkpoint

> **The Final Ascension** · 2 quests completed · ⭐ 125 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

| When you see... | Think... | Why |
|---|---|---|
| `\|xi − xj\|` or `\|a[i] − a[j]\|` in optimization | Algebraic split after sorting one dimension | Removes abs, exposes window or deque |
| "count subarrays" + min AND max fixed | lastBad, lastMin, lastMax landmark scan | Three constraints, one O(n) pass |
| "elements outside [lo, hi]" invalidate subarray | lastBad index | Subarray can't cross a bad element |
| maximize `(y − x)` in a sliding x-window | Monotonic deque (Day 17) | O(n) window max |
| "simplify before you code" | Restate → transform → anchor → compose | S-Rank meta-strategy |
| freq map on count subarray problem | Maybe overkill — try last-index scan first | Landmarks beat maps when only presence matters |

### 🧠 Quick Recognition Test

1. *"Count subarrays where min = 1 and max = 5, no out-of-range values"* → **lastBad + lastMin + lastMax (#2444)**
2. *"Max yi + yj + \|xi − xj\| with \|xi − xj\| ≤ k"* → **Split → deque max on (y−x) (#1499)**
3. *"Increasing triplet subsequence i < j < k"* → **Track first and second minimum (#334)**
4. *"132 pattern: nums[i] < nums[k] < nums[j]"* → **Prefix min + stack from right (#456)**

---

## 🎯 Transfer to Unseen Problems

You've studied Fixed Bounds and Max Value of Equation. Can you recognize synthesis thinking on problems you've never walked through?

**Scenario 1:** *"Given an array, count subarrays that contain at least one occurrence of each of three target values."*

Which pattern? **Multi-index landmark scan.** Track `lastA`, `lastB`, `lastC`. For subarrays ending at `i`, valid starts run from `max(lastA, lastB, lastC) - lastBad` style boundary — generalization of Fixed Bounds to k required values.

**Scenario 2:** *"Given sorted points, maximize yi + yj − \|xi − xj\| with \|xi − xj\| ≤ k."*

Which pattern? **Same algebraic split** — but the transformed term changes sign. Still sort + window + deque, with adjusted formula.

**Scenario 3:** *"Given an array, find the longest subarray where max − min ≤ k."*

Which pattern? **Sliding window + freq map or multiset** (Day 25), not landmark scan — here min and max are *derived* from the window, not fixed constants.

> **Answer key:** Scenario 1 → multi-index landmarks. Scenario 2 → algebraic transform + deque (sign flip). Scenario 3 → variable window with dynamic min/max — different from #2444.

---

## ⚠ Common Mistakes

1. **Skipping the algebraic step on #1499** — Coding nested loops before rewriting `|xi − xj|`. Always transform on paper first.

2. **Using max(lastMin, lastMax) instead of min** — The bottleneck landmark is the **earlier** of the two required indices (the min index), not the later.

3. **Forgetting to reset landmarks on bad element** — After `lastBad = i`, set `lastMin = lastMax = -1`. Stale landmarks from before the bad element corrupt the count.

4. **Deque not expiring by distance** — Pop from front while `xj − xi > k`. Stale left points violate the constraint.

5. **Treating synthesis as "new algorithm"** — Day 30 problems combine known patterns. Name the components before writing code.

---

## 🏋️ Mini Challenge

### [Increasing Triplet Subsequence #334](https://leetcode.com/problems/increasing-triplet-subsequence/)

**[→ Try Increasing Triplet Subsequence on LeetCode](https://leetcode.com/problems/increasing-triplet-subsequence/)**

Given an integer array `nums`, return `true` if there exists a **triplet of indices** `(i, j, k)` such that `i < j < k` and `nums[i] < nums[j] < nums[k]`. If no such triplet exists, return `false`.

```
Input:  nums = [1, 2, 3, 4, 5]
Output: true
Explanation: Any triplet where i < j < k is increasing.

Input:  nums = [5, 4, 3, 2, 1]
Output: false
Explanation: No triplet exists.

Input:  nums = [2, 1, 5, 0, 4, 6]
Output: true
Explanation: (1, 4, 5) → nums[1]=1, nums[4]=4, nums[5]=6.
```

### 🔍 Pattern Recognition for This Challenge

| Clue | Signal |
|---|---|
| "triplet i < j < k" with increasing values | Greedy tracking of best first and second element |
| "subsequence" not subarray | Non-contiguous — scan once, O(1) state |
| return true/false | Don't need the actual triplet — existence only |
| Medium + O(n) expected | Two variables `first`, `second` — not O(n³) triple loop |

**Before you code:** *"Track the smallest `first` and smallest valid `second` where `second > first`. If nums[i] > second, triplet found. Update first/second greedily when nums[i] is smaller."*

> 💡 **Hint:** Maintain `first` (best smallest value seen) and `second` (best middle value with `second > first`). Scan left to right. If `nums[i] > second` → return true. If `nums[i] > first` → update `second = nums[i]`. Else update `first = nums[i]`.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Increasing Triplet Subsequence #334](https://leetcode.com/problems/increasing-triplet-subsequence/) | Medium | Greedy first/second tracking |
| [132 Pattern #456](https://leetcode.com/problems/132-pattern/) | Medium | Prefix min + monotonic stack |
| [Count Subarrays With Fixed Bounds #2444](https://leetcode.com/problems/count-subarrays-with-fixed-bounds/) | Hard | Multi-index landmark scan |
| [Max Value of Equation #1499](https://leetcode.com/problems/max-value-of-equation/) | Hard | Algebraic transform + deque |
| [Create Maximum Number #321](https://leetcode.com/problems/create-maximum-number/) | Hard | Greedy stack + merge + split |

---

*Day 30 complete! Next: the S-Rank Final Test — three synthesis problems under pressure. →*
