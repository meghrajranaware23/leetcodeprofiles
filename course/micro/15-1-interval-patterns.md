# 📝 Interval Patterns

> **Day 15** · Interval Merge / Insert / Sweep Line · ★★★★☆ · 12 min read

---

Day 14 taught you to **sort first** — intervals are where that instinct pays off immediately. Today you work with ranges `[start, end]`: merge overlapping blocks, insert a new block into sorted order, and count concurrent events with a **sweep line**. Three problems, one family.

---

## Part 1 — Learn the Pattern

### 1. What is the pattern?

An **interval** is a contiguous range, usually written `[start, end]`. Many problems give a list of intervals and ask you to:

- **Merge** overlapping intervals into fewer blocks
- **Insert** a new interval and merge as needed
- **Count** how many intervals are active at once (sweep line)

```
Intervals on a timeline:

  1   2   3   4   5   6   7   8
  |---A---|
      |---B---|
              |---C---|

A and B overlap → merge to [1, 5]
C is separate   → [6, 8]

Result: [[1, 5], [6, 8]]
```

Intervals are **not** arrays of single values — they are **segments on a line**. Sorting by `start` (Day 14) turns a messy overlap puzzle into a single left-to-right scan.

### 2. Overlap test — the one rule to memorize

Two intervals `[a, b]` and `[c, d]` **overlap** (touching counts as overlap in most LeetCode problems) when:

```
a <= d  AND  c <= b
```

Equivalently: they do **not** overlap when one ends strictly before the other starts:

```
b < c   OR   d < a   →  no overlap, keep separate
```

```
  [1, 3]  and  [4, 6]  →  3 < 4  →  separate ✓
  [1, 4]  and  [2, 5]  →  overlap → merge to [1, 5]
  [1, 4]  and  [4, 6]  →  touch at 4 → merge to [1, 6]  (LeetCode convention)
```

### 3. Merge intervals — sort + linear scan

**Template:**

```
Sort intervals by start (Day 14)

result = [intervals[0]]

for each next interval [s, e]:
    if s <= result.last.end:          // OVERLAP
        result.last.end = max(result.last.end, e)   // MERGE
    else:
        result.append([s, e])         // NO OVERLAP — new block
```

```
intervals = [[1,3], [2,6], [8,10], [15,18]]
sorted (already): same order

result = [[1,3]]
[2,6]: 2 <= 3 → merge → [[1,6]]
[8,10]: 8 > 6 → append → [[1,6], [8,10]]
[15,18]: 15 > 10 → append → [[1,6], [8,10], [15,18]]  ✓
```

Each interval is processed once → **O(n log n)** from sorting, **O(n)** scan.

### 4. Insert interval — three-phase insertion

When the list is **already sorted** and you must insert `newInterval`, don't restart from scratch. Walk in three phases:

```
Phase 1 — BEFORE:  Add all intervals that end before newInterval starts
Phase 2 — MERGE:   Merge every interval that overlaps newInterval into one block
Phase 3 — AFTER:   Append all intervals that start after the merged block
```

```
intervals = [[1,2], [3,5], [6,7], [8,10], [12,16]]
newInterval = [4, 8]

Phase 1: [1,2] ends at 2 < 4 → add [1,2]
Phase 2: [3,5] overlaps → merge to [3,8]
         [6,7] overlaps → merge to [3,8]
         [8,10] overlaps → merge to [3,10]
Phase 3: [12,16] starts after 10 → add [12,16]

Result: [[1,2], [3,10], [12,16]]  ✓
```

This is Insert Interval (#57) — your first quest today. The three phases are the skeleton; overlap detection is the same rule from merge.

### 5. Sweep line — counting concurrent intervals

Some problems ask: *"What is the **maximum number of intervals active at the same time**?"* — Meeting Rooms II (#253).

Instead of checking every pair, convert intervals into **events**:

```
Interval [1, 5]  →  event: +1 at time 1,  -1 at time 6  (end is exclusive for counting)
Interval [2, 4]  →  event: +1 at time 2,  -1 at time 5
```

Sort events by time. Sweep left to right, tracking a running count. The peak count is your answer.

```
Timeline:
  time:  1   2   3   4   5   6
  [1,5]: +1              -1
  [2,4]:     +1      -1

  count: 1   2   2   2   1   0
              ↑ peak = 2 rooms needed
```

**Alternative:** Min-heap of end times. Sort by start. For each meeting, pop ended meetings from the heap. Push current end. Heap size = rooms in use. Track max heap size.

Both approaches are **sweep line thinking** — process events in time order instead of comparing all pairs.

### 6. Fixed vs variable — merge vs insert vs sweep

| Task | Input shape | Core move |
|---|---|---|
| **Merge Overlapping** (#56) | Unsorted list of intervals | Sort by start → scan and merge |
| **Insert Interval** (#57) | Sorted list + one new interval | Three-phase walk, merge on overlap |
| **Meeting Rooms II** (#253) | Unsorted meetings | Sort + min-heap or event sweep |
| **Interval Intersections** (#986) | Two sorted lists | Two pointers, emit overlap ranges |

Day 14 sorted the data. Day 15 asks what to **do** once it's sorted.

### 7. What problem does this pattern solve?

- Merge all overlapping intervals
- Insert a new interval into a sorted non-overlapping list
- Minimum meeting rooms / maximum concurrent events
- Intersection of two interval lists
- Attendance/room booking, calendar scheduling, timeline coverage

### 8. Why brute force is inefficient

| Brute force | Problem |
|---|---|
| Compare every pair for overlap | O(n²) — sort + scan is O(n log n) |
| Rebuild entire list on each insert | O(n²) over many inserts — three-phase is O(n) per insert |
| Count overlaps with nested loops | O(n²) — sweep line or heap is O(n log n) |
| Insert without preserving sorted order | Forces re-sort every time |

### 9. The key observation

Once intervals are sorted by **start**, overlap is a **local** property. You only need to compare each interval with the **last merged block** — not every previous interval. The timeline is processed left to right; nothing to the left can overlap something you've already closed.

For sweep line: once events are sorted by time, the running count at any moment depends only on events **so far** — not on future intervals in isolation.

### 10. Pattern signals & recognition clues

| When the problem says… | Think interval pattern |
|---|---|
| "merge overlapping intervals" | Sort by start + linear merge |
| "insert interval" / "sorted intervals" | Three-phase insertion |
| "minimum meeting rooms" / "max concurrent" | Sweep line or min-heap of end times |
| "interval list intersections" | Two pointers on sorted lists |
| ranges `[start, end]` on a timeline | Sort-first (Day 14) + scan |

**Keywords:** `interval` · `merge` · `overlap` · `meeting rooms` · `schedule` · `start` · `end` · `concurrent` · `timeline`

### 11. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Sorting by end instead of start (for merge) | Merge scan needs starts in order — sort by `start` |
| Using `>` instead of `>=` for overlap | LeetCode usually treats touching as overlap: `start <= last.end` |
| Forgetting `max(last.end, curr.end)` on merge | `[1,10]` + `[2,3]` must stay `[1,10]`, not `[1,3]` |
| Off-by-one on sweep line end times | For counting rooms, treat end as **exclusive** (+1 at start, −1 at end+1) |
| Re-sorting after insert | Input is already sorted — walk in one pass |

### 12. Recognition drill

Read this problem aloud:

> *"Given an array of meeting time intervals, find the minimum number of conference rooms required so no meetings overlap."*

Before coding, say:

> *"Intervals + max concurrent → sort by start, min-heap of end times (or sweep line). Track peak rooms in use."*

---

## Part 2 — What's Next

Today you'll apply interval thinking in three ways:

1. **Three-phase insert** — Insert Interval (#57)
2. **Sweep line / heap** — Meeting Rooms II (#253)
3. **Checkpoint** — Interval List Intersections (#986) with two sorted lists

Day 14 sorted. Day 15 scans. The timeline is yours.

---

*You understand intervals on a line. First quest: insert and merge in one pass. →*
