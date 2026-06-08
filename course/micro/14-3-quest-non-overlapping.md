# ⚔ Quest: Non-overlapping Intervals

> **Day 14** · [Non-overlapping Intervals #435](https://leetcode.com/problems/non-overlapping-intervals/) · Medium · 25 XP · 15 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Non-overlapping Intervals on LeetCode](https://leetcode.com/problems/non-overlapping-intervals/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen, paper, or your editor. The hints and walkthrough below are for *after* your attempt.

---

## The Problem

Given an array of intervals `intervals` where `intervals[i] = [start_i, end_i]`, return the **minimum number of intervals you need to remove** to make the rest of the intervals non-overlapping.

```
Input:  intervals = [[1,2],[2,3],[1,3],[3,4]]
Output: 1
        (remove [1,3], keep [1,2], [2,3], [3,4])

Input:  intervals = [[1,2],[1,2],[1,2]]
Output: 2
        (keep one [1,2], remove two)

Input:  intervals = [[1,2],[2,3]]
Output: 0
        (already non-overlapping)
```

---

## 💡 Hints

This looks like Merge Intervals — but the goal is different. You want to **keep** as many intervals as possible, not combine them.

**Sort by end time** (earliest finish first). Greedily keep an interval if its start is ≥ the end of the last kept interval. If it overlaps, remove it (skip it).

Minimum removals = `total intervals − maximum kept`.

Merge Intervals sorts by **start**. This problem sorts by **end**. Same family, opposite key.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Sort by End + Greedy Activity Selection

**How to identify this from the problem statement:**
- "minimum intervals to remove" → maximize non-overlapping kept → greedy
- "make the rest non-overlapping" → activity selection / scheduling
- intervals can overlap in any configuration → sort by **end**, not start

| Keyword / phrase | What it signals |
|---|---|
| "minimum to remove" / "maximum non-overlapping" | Greedy — sort by **end** |
| "schedule" / "activity selection" | Earliest-finishing-first greedy |
| "intervals" (not merge) | Different goal than #56 — keep, don't combine |
| "no two overlap" | Keep if `start ≥ last_end`; else skip (remove) |

**Why this pattern works:** Picking the interval that ends earliest leaves the most room for future intervals. This greedy choice is optimal — a classic activity selection proof.

**How a strong solver thinks before coding:**
1. *"Minimize removals = maximize kept. Greedy activity selection."*
2. *"Sort by end — earliest finish first."*
3. *"Keep if start ≥ last_end. Count kept. Answer = n − kept."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Try every subset of intervals** | O(2ⁿ) — exponential |
| **Sort by start and greedy** | Wrong key — picks `[1,100]` before `[2,3]`, blocking everything |
| **Merge intervals approach** | Merging combines overlaps — here you must **remove**, not merge |
| **Remove the longest interval** | Greedy by length isn't optimal — sort by end is |

**The insight brute force misses:** The interval that **finishes earliest** is always safe to keep (or swap into — exchange argument). Sort by end, one pass, O(n) after sort.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Non-overlapping Intervals #435](https://leetcode.com/problems/non-overlapping-intervals/) | Minimize removals | Sort by end + greedy keep |
| [Merge Intervals #56](https://leetcode.com/problems/merge-intervals/) | Combine overlaps | Sort by **start** (previous quest) |
| [Meeting Rooms #252](https://leetcode.com/problems/meeting-rooms/) | Boolean: any overlap? | Sort by start, one check |
| [Maximum Length of Pair Chain #646](https://leetcode.com/problems/maximum-length-of-pair-chain/) | Pairs instead of intervals | Sort by end, identical greedy |

If you know activity selection, Non-overlapping Intervals is the same algorithm with "remove" instead of "count kept."

---

## 📖 Walkthrough

```
intervals = [[1,2], [2,3], [1,3], [3,4]]

Sort by end:
  [[1,2], [2,3], [1,3], [3,4]]

last_end = -∞, kept = 0
  [1,2]: start 1 ≥ -∞ → keep. last_end = 2, kept = 1
  [2,3]: start 2 ≥ 2   → keep. last_end = 3, kept = 2
  [1,3]: start 1 < 3   → skip (remove). kept = 2
  [3,4]: start 3 ≥ 3   → keep. last_end = 4, kept = 3

removals = 4 - 3 = 1 ✓
```

```
intervals = [[1,2], [1,2], [1,2]]

Sort by end: [[1,2], [1,2], [1,2]]
  keep first [1,2]: last_end = 2, kept = 1
  skip second (1 < 2)
  skip third (1 < 2)

removals = 3 - 1 = 2 ✓
```

> 💡 **The insight:** `[1,3]` overlaps both `[1,2]` and `[2,3]`. Greedy keeps the short intervals that end early, forcing removal of the wide one.

---

## Solution

### C++
```cpp
class Solution {
public:
    int eraseOverlapIntervals(vector<vector<int>>& intervals) {
        sort(intervals.begin(), intervals.end(),
             [](auto& a, auto& b) { return a[1] < b[1]; });

        int kept = 0, lastEnd = INT_MIN;
        for (auto& interval : intervals) {
            if (interval[0] >= lastEnd) {
                kept++;
                lastEnd = interval[1];
            }
        }
        return (int)intervals.size() - kept;
    }
};
```

### Python
```python
class Solution:
    def eraseOverlapIntervals(self, intervals: list[list[int]]) -> int:
        intervals.sort(key=lambda x: x[1])
        kept, last_end = 0, float('-inf')

        for start, end in intervals:
            if start >= last_end:
                kept += 1
                last_end = end

        return len(intervals) - kept
```

### Java
```java
class Solution {
    public int eraseOverlapIntervals(int[][] intervals) {
        Arrays.sort(intervals, (a, b) -> a[1] - b[1]);

        int kept = 0, lastEnd = Integer.MIN_VALUE;
        for (int[] interval : intervals) {
            if (interval[0] >= lastEnd) {
                kept++;
                lastEnd = interval[1];
            }
        }
        return intervals.length - kept;
    }
}
```

**Complexity:** O(n log n) time · O(1) extra space

---

## 💭 What Should Have Clicked in Your Mind?

Before you opened your editor, these thoughts should have fired:

- **"Minimum removals for non-overlapping"** → Maximize kept → greedy activity selection.
- **"Sort by end"** — NOT start. Opposite key from Merge Intervals (#56).
- **Earliest finish first** → leaves maximum room for future intervals.
- **Answer = n − kept** — count what you keep, subtract from total.

If you sorted by start and greedily kept intervals, you likely got wrong answers on wide intervals like `[1,100]`. The signal was "remove minimum" — that's a scheduling greedy, not a merge.

> 🎯 **Critical Distinction:** Merge Intervals → sort by **start**. Non-overlapping → sort by **end**. Same data structure, different question, different key.

---

*Next: checkpoint — prove the sort-first interval instinct is yours. →*
