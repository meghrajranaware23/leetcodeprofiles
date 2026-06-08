# ✅ Day 15 Checkpoint

> **Interval Patterns** · 2 quests completed · ⭐ 45 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

| When you see... | Think... | Why |
|---|---|---|
| "merge overlapping intervals" | Sort by start + linear scan | Compare each interval to last merged block |
| "insert interval" + sorted list | Three-phase insertion | Before / merge / after — no re-sort |
| "minimum meeting rooms" / "max concurrent" | Sweep line or min-heap of ends | Count active intervals on timeline |
| "interval list intersections" | Two pointers on sorted lists | Emit overlap when both pointers qualify |
| `[start, end]` ranges on a line | Interval family (Day 15) | Overlap: `a.start <= b.end && b.start <= a.end` |
| "already sorted, non-overlapping" | Single-pass walk | Don't rebuild with full merge |
| unsorted intervals | Sort first (Day 14) | Sorting unlocks linear scan |

### 🧠 Quick Recognition Test

1. *"Merge all overlapping intervals in a list"* → **Sort by start, merge with last block**
2. *"Insert [4,8] into sorted non-overlapping list"* → **Three phases: before / merge / after**
3. *"Minimum conference rooms for all meetings"* → **Sort by start + min-heap of end times**
4. *"Common intervals between two sorted lists"* → **Two pointers, emit `[max(starts), min(ends)]`**

---

## 🎯 Transfer to Unseen Problems

You've studied Insert Interval and Meeting Rooms II. Can you recognize interval thinking on problems you've never walked through?

**Scenario 1:** *"Given a list of intervals, remove one interval so the remaining set has the fewest overlaps."*

Which pattern? **Interval merge + analysis.** Sort and merge first to understand structure. This is a variant — not pure template — but sort-first (Day 14) and overlap detection (Day 15) are the starting tools.

**Scenario 2:** *"Given arrival and departure times of flights, find the busiest hour at an airport."*

Which pattern? **Sweep line.** +1 at each arrival, −1 at each departure. Sort events, track peak count. Same skeleton as Meeting Rooms II.

**Scenario 3:** *"Given two employees' busy schedules (sorted intervals), find all times both are free for a 30-minute meeting."*

Which pattern? **Interval intersection + gap scan.** Intersect the busy intervals (two pointers), then find gaps between merged busy blocks. Combines Day 15 intersection with merge thinking.

> **Answer key:** Scenarios 2 and 3 → sweep line / interval intersection. Scenario 1 → sort + merge as foundation. Signal: **"timeline" + "overlap" + "concurrent"** → interval patterns.

---

## ⚠ Common Mistakes

1. **Wrong overlap condition** — Use `start <= other.end` for merge (touching counts). Using strict `<` misses edge cases like `[1,4]` and `[4,6]`.

2. **Forgetting `max` on merge end** — `[1,10]` merged with `[2,3]` must become `[1,10]`, not `[1,3]`.

3. **Sorting by end for merge problems** — Merge and insert scan by **start**. End-sort is for different greedy problems (e.g., arrows to burst balloons).

4. **Not reusing freed rooms** — In Meeting Rooms II, pop ended meetings from the heap before pushing. Skipping the pop overcounts rooms.

5. **Re-sorting on insert** — Insert Interval input is already sorted. Three-phase walk is O(n); full re-sort is unnecessary.

---

## 🏋️ Mini Challenge

### [Interval List Intersections #986](https://leetcode.com/problems/interval-list-intersections/)

**[→ Try Interval List Intersections on LeetCode](https://leetcode.com/problems/interval-list-intersections/)**

Given two lists of **sorted, disjoint** intervals `firstList` and `secondList`, return their **intersection** — the intervals where both lists overlap.

```
Input:  firstList = [[0,2], [5,10], [13,23], [24,25]]
        secondList = [[1,5], [8,12], [15,24], [25,26]]
Output: [[1,2], [5,5], [8,10], [15,23], [24,24], [25,25]]
```

### 🔍 Pattern Recognition for This Challenge

| Clue | Signal |
|---|---|
| "two sorted interval lists" | Two pointers — no sorting needed |
| "intersection" / "overlap" | Emit `[max(start1, start2), min(end1, end2)]` when valid |
| "disjoint within each list" | Advance the pointer whose interval ends first |

**Before you code:** *"Two sorted lists → two pointers. Overlap exists when `start1 <= end2 && start2 <= end1`. Intersection is `[max(starts), min(ends)]`. Advance the interval that ends earlier."*

> 💡 **Hint:** If `end1 < start2`, no overlap possible with current pair — advance pointer 1. Same logic mirrors Insert Interval's phase boundaries, but both lists move.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Interval List Intersections #986](https://leetcode.com/problems/interval-list-intersections/) | Medium | Two pointers on sorted intervals |
| [Merge Intervals #56](https://leetcode.com/problems/merge-intervals/) | Medium | Sort + linear merge |
| [Meeting Rooms I #252](https://leetcode.com/problems/meeting-rooms/) | Easy | Sort + adjacent overlap check |
| [Non-overlapping Intervals #435](https://leetcode.com/problems/non-overlapping-intervals/) | Medium | Sort by end + greedy keep |

---

*Day 15 complete! Tomorrow: greedy proofs on arrays — make the locally optimal choice and trust the math. →*
