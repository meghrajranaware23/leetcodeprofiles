# ⚔ Quest: Insert Interval

> **Day 15** · [Insert Interval #57](https://leetcode.com/problems/insert-interval/) · Medium · 20 XP · 15 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Insert Interval on LeetCode](https://leetcode.com/problems/insert-interval/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen, paper, or your editor. The hints and walkthrough below are for *after* your attempt.

---

## The Problem

Given a sorted array of **non-overlapping** intervals and a `newInterval`, insert `newInterval` into the list such that the result remains sorted and non-overlapping. Merge overlapping intervals if needed.

Return the resulting interval list.

```
Input:  intervals = [[1,3], [6,9]], newInterval = [2,5]
Output: [[1,5], [6,9]]

Input:  intervals = [[1,2], [3,5], [6,7], [8,10], [12,16]], newInterval = [4,8]
Output: [[1,2], [3,10], [12,16]]

Input:  intervals = [], newInterval = [5,7]
Output: [[5,7]]
```

---

## 💡 Hints

The input is **already sorted** with **no overlaps**. You don't need to re-sort or run full merge from scratch.

Walk the list in **three phases**:

1. **Before** — add intervals that end before `newInterval` starts
2. **Merge** — combine every overlapping interval with `newInterval` into one block
3. **After** — append intervals that start after the merged block

Overlap test: interval `[s, e]` overlaps `newInterval` when `s <= newInterval.end` AND `newInterval.start <= e`.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Three-Phase Interval Insertion (Day 15)

**How to identify this from the problem statement:**
- "sorted" + "non-overlapping" → single left-to-right pass, no re-sort
- "insert interval" + "merge if necessary" → three-phase walk
- output must stay sorted and merged → same overlap rule as Merge Intervals (#56)

| Keyword / phrase | What it signals |
|---|---|
| "sorted intervals" / "non-overlapping" | Input is pre-processed — walk, don't sort |
| "insert" + "merge overlapping" | Three phases: before / merge / after |
| `[start, end]` ranges | Interval family — overlap test `a <= d && c <= b` |
| "return the resulting intervals" | Build a new list in one pass |

**Why this pattern works:** Because intervals are sorted by start and disjoint, every interval is either entirely before, entirely after, or overlapping the growing merged block. Once you pass the overlap zone, no later interval can overlap the merged block.

**How a strong solver thinks before coding:**
1. *"Sorted, non-overlapping → three-phase insertion, not full merge."*
2. *"Phase 1: while interval.end < new.start → push interval."*
3. *"Phase 2: while interval.start <= new.end → expand new.start/new.end."*
4. *"Phase 3: push the rest."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Append newInterval, then run Merge Intervals on entire list** | Works but wasteful — ignores that input is already sorted and clean |
| **Binary search insert position, then fix overlaps one at a time** | Multiple passes — three-phase is O(n) in one scan |
| **Compare newInterval to every existing interval** | O(n) per comparison with re-merging — same asymptotic but messier logic |
| **Re-sort after insert** | O(n log n) when O(n) single pass suffices |

**The insight brute force misses:** The input guarantees **no pre-existing overlaps**. Overlap only involves `newInterval` and a contiguous run of neighbors. Three phases isolate that run without touching the rest.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Insert Interval #57](https://leetcode.com/problems/insert-interval/) | Insert one new block | Three-phase walk |
| [Merge Intervals #56](https://leetcode.com/problems/merge-intervals/) | Unsorted/overlapping list | Sort + linear merge (no insert) |
| [Interval List Intersections #986](https://leetcode.com/problems/interval-list-intersections/) | Two sorted lists | Two pointers, emit overlaps |
| [My Calendar I #729](https://leetcode.com/problems/my-calendar-i/) | Stream of bookings | Binary search or sweep (B-Rank) |

Insert Interval is Merge Intervals with a **head start** — the list is clean; only the new block causes merging.

---

## 📖 Walkthrough — Three Phases

```
intervals = [[1,2], [3,5], [6,7], [8,10], [12,16]]
newInterval = [4, 8]

Phase 1 — BEFORE (interval.end < newInterval.start):
  [1,2]: 2 < 4 → add [1,2]
  result = [[1,2]]

Phase 2 — MERGE (interval.start <= newInterval.end):
  [3,5]:  3 <= 8 → merge → newInterval = [3, 8]
  [6,7]:  6 <= 8 → merge → newInterval = [3, 8]
  [8,10]: 8 <= 8 → merge → newInterval = [3, 10]
  [12,16]: 12 > 10 → stop merging
  add merged [3,10]
  result = [[1,2], [3,10]]

Phase 3 — AFTER:
  add [12,16]
  result = [[1,2], [3,10], [12,16]]  ✓
```

> 💡 **The insight:** Phase 2 is a mini merge where `newInterval` is the only block that grows. Phases 1 and 3 are copy operations.

---

## Solution

### C++
```cpp
class Solution {
public:
    vector<vector<int>> insert(vector<vector<int>>& intervals, vector<int>& newInterval) {
        vector<vector<int>> result;
        int i = 0, n = intervals.size();

        // Phase 1: before
        while (i < n && intervals[i][1] < newInterval[0])
            result.push_back(intervals[i++]);

        // Phase 2: merge
        while (i < n && intervals[i][0] <= newInterval[1]) {
            newInterval[0] = min(newInterval[0], intervals[i][0]);
            newInterval[1] = max(newInterval[1], intervals[i][1]);
            i++;
        }
        result.push_back(newInterval);

        // Phase 3: after
        while (i < n)
            result.push_back(intervals[i++]);

        return result;
    }
};
```

### Python
```python
class Solution:
    def insert(self, intervals: list[list[int]], newInterval: list[int]) -> list[list[int]]:
        result = []
        i, n = 0, len(intervals)

        # Phase 1: before
        while i < n and intervals[i][1] < newInterval[0]:
            result.append(intervals[i])
            i += 1

        # Phase 2: merge
        while i < n and intervals[i][0] <= newInterval[1]:
            newInterval[0] = min(newInterval[0], intervals[i][0])
            newInterval[1] = max(newInterval[1], intervals[i][1])
            i += 1
        result.append(newInterval)

        # Phase 3: after
        while i < n:
            result.append(intervals[i])
            i += 1

        return result
```

### Java
```java
class Solution {
    public int[][] insert(int[][] intervals, int[] newInterval) {
        List<int[]> result = new ArrayList<>();
        int i = 0, n = intervals.length;

        // Phase 1: before
        while (i < n && intervals[i][1] < newInterval[0])
            result.add(intervals[i++]);

        // Phase 2: merge
        while (i < n && intervals[i][0] <= newInterval[1]) {
            newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
            newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
            i++;
        }
        result.add(newInterval);

        // Phase 3: after
        while (i < n)
            result.add(intervals[i++]);

        return result.toArray(new int[result.size()][]);
    }
}
```

**Complexity:** O(n) time · O(n) space for output

---

## 💭 What Should Have Clicked in Your Mind?

Before you opened your editor, these thoughts should have fired:

- **"Sorted, non-overlapping"** → Don't re-sort. Walk once.
- **"Insert and merge"** → Three phases: before / merge / after.
- **Same overlap rule as Merge Intervals** → `start <= other.end` means overlap.
- **Phase 2 grows newInterval** → `min` on starts, `max` on ends.

If you appended and re-ran full merge, you got the right answer with extra work. The signal was "already sorted" — that unlocks the three-phase shortcut.

> 🎯 **Pattern Unlocked:** Three-phase interval insertion. Before the new block, merge with it, after it. One pass, O(n).

---

*Next: count concurrent meetings with a sweep line. →*
