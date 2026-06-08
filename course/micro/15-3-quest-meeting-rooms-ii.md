# ⚔ Quest: Meeting Rooms II

> **Day 15** · [Meeting Rooms II #253](https://leetcode.com/problems/meeting-rooms-ii/) · Medium · 25 XP · 18 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Meeting Rooms II on LeetCode](https://leetcode.com/problems/meeting-rooms-ii/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen, paper, or your editor. The hints and walkthrough below are for *after* your attempt.

---

## The Problem

Given an array of meeting time intervals `intervals` where `intervals[i] = [start_i, end_i]`, return the **minimum number of conference rooms** required so that all meetings can be held without overlap.

```
Input:  intervals = [[0,30], [5,10], [15,20]]
Output: 2
Explanation: Meetings [5,10] and [15,20] share a room; [0,30] needs its own.

Input:  intervals = [[7,10], [2,4]]
Output: 1

Input:  intervals = [[1,5], [2,6], [3,7]]
Output: 3
```

---

## 💡 Hints

This is a **maximum concurrent intervals** problem — how many meetings overlap at the same instant?

**Approach A — Min-heap of end times:**
1. Sort meetings by **start** time (Day 14)
2. For each meeting, pop from the min-heap any meeting that has **ended** (heap top ≤ current start)
3. Push current meeting's end time
4. Track the **maximum heap size** — that's the answer

**Approach B — Sweep line:**
Create events: `+1` at each start, `-1` at each end. Sort events by time. Sweep and track the running count. Peak count = rooms needed.

Both are valid. The min-heap approach is often cleaner to code.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Sweep Line / Min-Heap of End Times (Day 15)

**How to identify this from the problem statement:**
- "minimum conference rooms" / "maximum concurrent" → count overlapping intervals
- intervals with `[start, end]` → timeline / sweep line family
- unsorted input → sort by start first (Day 14)
- greedy assignment: reuse a room the moment a meeting ends

| Keyword / phrase | What it signals |
|---|---|
| "minimum rooms" / "maximum overlap" | Sweep line or min-heap |
| "meeting time intervals" | Interval pattern — sort by start |
| "without overlap in same room" | Greedy: assign to earliest-ending available room |
| "concurrent" / "at the same time" | Running count on a timeline |

**Why this pattern works:** When meetings are processed in start order, a room becomes free exactly when its meeting's end time ≤ the next meeting's start. The min-heap always exposes the room that frees **earliest** — reuse it if possible. If no room is free, open a new one. The peak heap size is the minimum rooms ever needed.

**How a strong solver thinks before coding:**
1. *"Min rooms = max concurrent meetings → sweep line or heap."*
2. *"Sort by start. Track when each room frees (end times)."*
3. *"Reuse room if earliest end ≤ current start; else new room."*
4. *"Answer = max rooms in use at any step."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Compare every pair for overlap, count clique size** | O(n²) or worse — sweep/heap is O(n log n) |
| **Assign meetings to rooms with nested loops** | O(n²) — greedy heap assignment is O(n log n) |
| **Sort by end time only** | Wrong order — must process by **start** to know what's active |
| **Count overlaps without reusing freed rooms** | Overcounts — a room freed at time 10 can host a meeting starting at 10 |

**The insight brute force misses:** You don't need to track **which** meeting overlaps **which**. You only need the **count** of active meetings at each moment. Sorting by start + min-heap of ends gives that count greedily.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Meeting Rooms II #253](https://leetcode.com/problems/meeting-rooms-ii/) | Min rooms for all meetings | Sort + min-heap / sweep |
| [Meeting Rooms I #252](https://leetcode.com/problems/meeting-rooms/) | Can one person attend all? | Sort + check adjacent overlap |
| [Car Pooling #1094](https://leetcode.com/problems/car-pooling/) | Capacity on a timeline | Difference array / sweep (Day 13) |
| [Minimum Number of Arrows #452](https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/) | Greedy interval covering | Sort by end, greedy shoot |

Meeting Rooms I is the warm-up (boolean overlap). Meeting Rooms II adds **counting** — the sweep line upgrade.

---

## 📖 Walkthrough — Min-Heap Approach

```
intervals = [[0,30], [5,10], [15,20]]
sorted by start: [[0,30], [5,10], [15,20]]

Process [0,30]:  heap={30}           rooms=1  max=1
Process [5,10]:   30 > 5, can't reuse → heap={10,30}  rooms=2  max=2
Process [15,20]:  pop 10 (10 ≤ 15)   → heap={20,30}  rooms=2  max=2

Answer: 2 rooms ✓
```

```
intervals = [[1,5], [2,6], [3,7]]
sorted: same order

Process [1,5]:  heap={5}             rooms=1  max=1
Process [2,6]:  5 > 2, can't reuse → heap={5,6}    rooms=2  max=2
Process [3,7]:  5 > 3, can't reuse → heap={5,6,7}  rooms=3  max=3

Answer: 3 rooms ✓
```

> 💡 **The insight:** The heap holds **end times** of meetings currently occupying rooms. The smallest end is the room that frees first. Reuse it when `heap.top() <= current.start`.

---

## 📖 Walkthrough — Sweep Line Approach

```
intervals = [[0,30], [5,10], [15,20]]

Events (time, delta):
  (0, +1), (5, +1), (10, -1), (15, +1), (20, -1), (30, -1)

Sort by time:
  time=0:  count=1  max=1
  time=5:  count=2  max=2
  time=10: count=1
  time=15: count=2  max=2
  time=20: count=1
  time=30: count=0

Answer: 2 ✓
```

Note: when start == end of another meeting, process **end before start** if you treat intervals as half-open `[start, end)` — or use `+1` at start and `-1` at end with consistent tie-breaking.

---

## Solution

### C++ — Min-Heap
```cpp
class Solution {
public:
    int minMeetingRooms(vector<vector<int>>& intervals) {
        sort(intervals.begin(), intervals.end());
        priority_queue<int, vector<int>, greater<int>> ends;
        int maxRooms = 0;

        for (auto& iv : intervals) {
            if (!ends.empty() && ends.top() <= iv[0])
                ends.pop();
            ends.push(iv[1]);
            maxRooms = max(maxRooms, (int)ends.size());
        }
        return maxRooms;
    }
};
```

### Python — Min-Heap
```python
import heapq

class Solution:
    def minMeetingRooms(self, intervals: list[list[int]]) -> int:
        intervals.sort()
        ends = []
        max_rooms = 0

        for start, end in intervals:
            if ends and ends[0] <= start:
                heapq.heappop(ends)
            heapq.heappush(ends, end)
            max_rooms = max(max_rooms, len(ends))

        return max_rooms
```

### Java — Min-Heap
```java
class Solution {
    public int minMeetingRooms(int[][] intervals) {
        Arrays.sort(intervals, (a, b) -> a[0] - b[0]);
        PriorityQueue<Integer> ends = new PriorityQueue<>();
        int maxRooms = 0;

        for (int[] iv : intervals) {
            if (!ends.isEmpty() && ends.peek() <= iv[0])
                ends.poll();
            ends.offer(iv[1]);
            maxRooms = Math.max(maxRooms, ends.size());
        }
        return maxRooms;
    }
}
```

**Complexity:** O(n log n) time · O(n) space

---

## 💭 What Should Have Clicked in Your Mind?

Before you opened your editor, these thoughts should have fired:

- **"Minimum rooms"** → Maximum concurrent meetings on a timeline.
- **"Sort by start"** → Day 14 sort-first instinct.
- **Min-heap of end times** → Reuse the room that frees earliest.
- **Sweep line alternative** → +1 at start, −1 at end, track peak.

If you tried to assign meetings to specific room IDs with backtracking, you over-engineered. The signal was "minimum number" — a count, not an assignment.

> 🎯 **Pattern Combo Unlocked:** Sort-first (Day 14) + sweep line / min-heap (Day 15). Interval problems often need both.

---

*Next: checkpoint — intersect two sorted interval lists. →*
