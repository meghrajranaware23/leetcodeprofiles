# ⚔ Quest: Merge Intervals

> **Day 14** · [Merge Intervals #56](https://leetcode.com/problems/merge-intervals/) · Medium · 20 XP · 15 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Merge Intervals on LeetCode](https://leetcode.com/problems/merge-intervals/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen, paper, or your editor. The hints and walkthrough below are for *after* your attempt.

---

## The Problem

Given an array of `intervals` where `intervals[i] = [start_i, end_i]`, merge all overlapping intervals and return an array of the non-overlapping intervals that cover all the intervals in the input.

```
Input:  intervals = [[1,3],[2,6],[8,10],[15,18]]
Output: [[1,6],[8,10],[15,18]]
        ([1,3] and [2,6] overlap → merge to [1,6])

Input:  intervals = [[1,4],[4,5]]
Output: [[1,5]]
        ([1,4] and [4,5] touch at 4 → merge)

Input:  intervals = [[1,4],[0,4]]
Output: [[0,4]]
```

---

## 💡 Hints

Overlapping intervals might not be adjacent in the input. **Sort by start** first — then a left-to-right scan finds every overlap in one pass.

Keep a `current` interval. For each next interval: if `next.start ≤ current.end`, they overlap — extend `current.end = max(current.end, next.end)`. Otherwise, push `current` to the result and start a new one.

This is sort-first strategy: O(n log n) sort + O(n) merge.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Sort by Start + Linear Merge Scan

**How to identify this from the problem statement:**
- "merge overlapping intervals" → sort by start, scan and extend `end`
- intervals may arrive in any order → must sort before scanning
- output covers all input → greedy merge, not remove

| Keyword / phrase | What it signals |
|---|---|
| "merge" / "combine overlapping" | Sort by **start**, extend end on overlap |
| "intervals" / "ranges" / "[start, end]" | Interval family — sort-first |
| "return non-overlapping result" | Push completed intervals, start new on gap |
| "touching" endpoints (`[1,4],[4,5]`) | Treat `next.start ≤ current.end` as overlap |

**Why this pattern works:** After sorting by start, if interval `i` doesn't overlap the current merged block, no later interval will overlap it either (all later starts are ≥ `i`'s start). One pass suffices.

**How a strong solver thinks before coding:**
1. *"Merge intervals → sort by start."*
2. *"Track current [start, end]. Overlap if next.start ≤ current.end."*
3. *"Extend current.end = max(current.end, next.end). Else push and reset."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Compare every pair, merge repeatedly** | O(n²) or worse — multiple passes until no merges left |
| **Scan without sorting** | `[8,10]` before `[1,3]` in input — miss that later intervals overlap earlier ones |
| **Sort by end for merge** | Wrong key — merge needs chronological start order, not earliest finish |
| **Forgetting `max` when extending end** | `[1,10]` and `[2,3]` — end must stay 10, not shrink to 3 |

**The insight brute force misses:** Sorting by start **groups** all overlapping intervals into contiguous blocks. One left-to-right scan merges each block in O(1) per interval.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Merge Intervals #56](https://leetcode.com/problems/merge-intervals/) | Merge all overlaps | Sort by start + scan |
| [Insert Interval #57](https://leetcode.com/problems/insert-interval/) | Insert one interval into sorted list | Three-phase scan (Day 15) |
| [Meeting Rooms #252](https://leetcode.com/problems/meeting-rooms/) | Check if any overlap | Sort by start, check `start[i] < end[i-1]` (checkpoint) |
| [Non-overlapping Intervals #435](https://leetcode.com/problems/non-overlapping-intervals/) | Minimize removals | Sort by **end** — different key, next quest |

Merge and Non-overlapping look similar but use **opposite sort keys**. Merge = start. Greedy non-overlap = end.

---

## 📖 Walkthrough

```
intervals = [[1,3], [2,6], [8,10], [15,18]]

Sort by start (already sorted):
  [[1,3], [2,6], [8,10], [15,18]]

current = [1,3]
  [2,6]: 2 ≤ 3 → overlap → current = [1, max(3,6)] = [1,6]
  [8,10]: 8 > 6 → no overlap → push [1,6], current = [8,10]
  [15,18]: 15 > 10 → push [8,10], current = [15,18]

push [15,18]

result = [[1,6], [8,10], [15,18]] ✓
```

```
intervals = [[1,4], [4,5]]

Sort: [[1,4], [4,5]]
current = [1,4]
  [4,5]: 4 ≤ 4 → overlap → current = [1, max(4,5)] = [1,5]

result = [[1,5]] ✓
```

> 💡 **The insight:** After sorting by start, overlap detection is one comparison per interval: `next.start ≤ current.end`.

---

## Solution

### C++
```cpp
class Solution {
public:
    vector<vector<int>> merge(vector<vector<int>>& intervals) {
        sort(intervals.begin(), intervals.end());

        vector<vector<int>> result;
        for (auto& interval : intervals) {
            if (result.empty() || interval[0] > result.back()[1]) {
                result.push_back(interval);
            } else {
                result.back()[1] = max(result.back()[1], interval[1]);
            }
        }
        return result;
    }
};
```

### Python
```python
class Solution:
    def merge(self, intervals: list[list[int]]) -> list[list[int]]:
        intervals.sort()
        result = []

        for start, end in intervals:
            if not result or start > result[-1][1]:
                result.append([start, end])
            else:
                result[-1][1] = max(result[-1][1], end)

        return result
```

### Java
```java
class Solution {
    public int[][] merge(int[][] intervals) {
        Arrays.sort(intervals, (a, b) -> a[0] - b[0]);
        List<int[]> result = new ArrayList<>();

        for (int[] interval : intervals) {
            if (result.isEmpty() || interval[0] > result.get(result.size() - 1)[1]) {
                result.add(interval);
            } else {
                int[] last = result.get(result.size() - 1);
                last[1] = Math.max(last[1], interval[1]);
            }
        }
        return result.toArray(new int[result.size()][]);
    }
}
```

**Complexity:** O(n log n) time · O(n) space

---

## 💭 What Should Have Clicked in Your Mind?

Before you opened your editor, these thoughts should have fired:

- **"Merge overlapping intervals"** → Sort by **start**. Day 14 sort-first strategy.
- **"Intervals in any order"** → Must sort — scanning unsorted input misses overlaps.
- **`next.start ≤ current.end`** → Overlap (including touching at endpoints).
- **Extend with `max`** → `[1,10]` merged with `[2,3]` stays `[1,10]`.

If you compared every pair of intervals, you found O(n²). The signal was "combine all overlaps into consolidated ranges" — sort by start, one linear merge pass.

> 🎯 **Pattern Unlocked:** Sort by start + merge scan. The canonical interval merge template for Day 14 and beyond.

---

*Next: Non-overlapping Intervals — same interval family, different sort key. →*
