# ✅ Day 14 Checkpoint

> **Sorting as Strategy** · 2 quests completed · ⭐ 45 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

| When you see... | Think... | Why |
|---|---|---|
| "merge overlapping intervals" | Sort by **start**, scan and extend `end` | Chronological merge in one pass |
| "minimum intervals to remove" / "max non-overlapping" | Sort by **end**, greedy keep | Earliest finish leaves most room |
| "can attend all meetings?" | Sort by **start**, check `start[i] < end[i-1]` | Single overlap check |
| "minimum meeting rooms needed" | Sort start/end events separately | Sweep line (Day 15) |
| intervals in random order | Sort first — always | Inner scan only works on sorted input |
| "schedule maximum activities" | Sort by **end**, greedy select | Classic activity selection |
| unsorted + two-pointer pair sum | Sort first (Day 7) | Enable monotonic pointer moves |

### 🧠 Quick Recognition Test

1. *"Merge all overlapping intervals into consolidated ranges"* → **Sort by start, extend end on overlap**
2. *"Remove fewest intervals so none overlap"* → **Sort by end, greedy keep if start ≥ last_end**
3. *"Given meetings, can one person attend all?"* → **Sort by start, detect any overlap**
4. *"Find three numbers summing to zero"* → **Sort + fix-one + two pointers (Day 7)**

---

## 🎯 Transfer to Unseen Problems

You've studied Merge Intervals and Non-overlapping Intervals. Can you recognize sort-first thinking on problems you've never walked through?

**Scenario 1:** *"Given pairs [a, b] where a < b, find the longest chain where each pair's `a` is greater than the previous pair's `b`."*

Which pattern? **Sort by end (b), greedy activity selection.** Identical skeleton to Non-overlapping Intervals — keep pair if `a ≥ last_b`. (Maximum Length of Pair Chain #646.)

**Scenario 2:** *"Given arrival and departure times for flights at an airport, find the minimum number of gates needed so no gate serves two overlapping flights."*

Which pattern? **Sort start/end events, sweep line (Day 15 preview).** Different from today's merge/greedy — but still sort-first. Separate arrival and departure into events, scan timeline.

**Scenario 3:** *"Given intervals, find the interval that overlaps the most other intervals."*

Which pattern? **Sort by start + sweep line or difference array on timeline.** Not a simple merge or greedy — but sorting by start is still step one. (Interval List Intersections / advanced sweep — B-Rank.)

> **Answer key:** Scenario 1 → sort by end + greedy (today's pattern). Scenarios 2 and 3 → sort-first enables harder sweep techniques (Day 15+). The *sort key* always matches the question.

---

## ⚠ Common Mistakes

1. **Wrong sort key** — Merge → **start**. Non-overlapping / activity selection → **end**. Swapping these gives plausible but wrong answers.

2. **Merge without `max` on end** — When `[1,10]` overlaps `[2,3]`, merged end must be 10, not 3.

3. **Treating touching intervals inconsistently** — Merge Intervals merges `[1,4]` and `[4,5]`. Non-overlapping keeps both (start 4 ≥ end 4). Read the problem's boundary rules.

4. **Skipping the sort** — Intervals arrive shuffled. `[8,10]` before `[1,3]` hides the overlap until you sort.

5. **Using merge logic for removal problems** — Merging combines intervals. Removal requires greedy **selection** — different algorithm even on the same input.

---

## 🏋️ Mini Challenge

### [Meeting Rooms #252](https://leetcode.com/problems/meeting-rooms/)

**[→ Try Meeting Rooms on LeetCode](https://leetcode.com/problems/meeting-rooms/)**

Given an array of meeting time intervals `intervals[i] = [start_i, end_i]`, determine if a person can attend all meetings (no two overlap).

```
Input:  intervals = [[0,30],[5,10],[15,20]]
Output: false
        ([0,30] overlaps both [5,10] and [15,20])

Input:  intervals = [[7,10],[2,4]]
Output: true
```

### 🔍 Pattern Recognition for This Challenge

| Clue | Signal |
|---|---|
| "can attend all meetings?" | Boolean overlap check |
| "no two meetings overlap" | Sort by **start**, compare neighbors |
| intervals | Sort-first family |

**Before you code:** *"Sort by start. If any `start[i] < end[i-1]`, overlap exists → return false."*

> 💡 **Hint:** This is Merge Intervals without the merge — just the overlap detection step. One pass after sorting.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Meeting Rooms #252](https://leetcode.com/problems/meeting-rooms/) | Easy | Sort by start, overlap check |
| [Meeting Rooms II #253](https://leetcode.com/problems/meeting-rooms-ii/) | Medium | Sort start/end events (Day 15) |
| [Insert Interval #57](https://leetcode.com/problems/insert-interval/) | Medium | Merge variant with insertion |
| [Maximum Length of Pair Chain #646](https://leetcode.com/problems/maximum-length-of-pair-chain/) | Medium | Sort by end, greedy chain |

---

*Days 13–14 complete! Difference arrays and sort-first strategy are yours. Day 15: advanced interval patterns. →*
