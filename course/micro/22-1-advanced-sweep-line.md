# 📝 Advanced Sweep Line

> **Day 22** · Advanced Sweep Line · 15 XP · 15 min read

---

On C-Rank Day 15 you met the sweep line — convert intervals into **events**, sort by time, track a running count. Meeting Rooms II (#253) asked for the **peak** concurrent meetings. Today the sweep line grows teeth: **max-heaps**, **height changes**, and **streaming overlap checks**.

The skyline, the calendar, and the meeting room all live on the same timeline. The difference is *what you track* as you sweep.

---

## Part 1 — Learn the Pattern

### 1. What is the pattern?

An **advanced sweep line** processes geometric or scheduling events in sorted order, maintaining **active state** as you move left to right:

```
events on timeline  →  sort by position  →  sweep  →  update active set  →  record answer
```

Day 15 version — count active intervals:

```
[start, end]  →  +1 at start,  -1 at end (exclusive)
sweep: running count, track peak
```

Day 22 upgrades:

| Variant | What you sweep | What you track | Classic problem |
|---|---|---|---|
| **Count sweep** | +1 / −1 events | Running integer count | Meeting Rooms II (#253) |
| **Overlap sweep** | Interval insertions | Sorted active intervals | My Calendar I (#729) |
| **Height sweep** | Building start/end | Max-heap of active heights | Skyline (#218) |
| **Triple overlap** | +1 / −1 events | Running count ≥ 3? | My Calendar II (#731) |

### 2. Event representation — the foundation

Every interval `[start, end)` becomes **two boundary events**:

```
[1, 5]  →  (time=1, type=START)  and  (time=5, type=END)

Timeline:
  1       2       3       4       5
  |---active---|
  START           END
```

For **height problems**, attach the height to the event:

```
building [2, 9, 10]  →  (2, +10)  and  (9, -10)
                        start       end
```

For **calendar problems**, store the full interval and check overlap against active bookings.

### 3. Cross-rank bridge — C-Rank Day 15

**C-Rank Day 15 — Interval Patterns:** You learned three interval tools:

```
Merge (#56)     →  sort by start, merge overlapping blocks
Insert (#57)    →  three-phase walk on sorted list
Sweep (#253)    →  events on timeline, track concurrent count
```

Day 15's sweep line answered: *"How many intervals are active at once?"* Day 22 asks harder questions:

| Day 15 | Day 22 |
|---|---|
| Peak concurrent count | Exact height at each critical point (Skyline) |
| Process all meetings at once | Stream bookings one at a time (My Calendar) |
| +1/−1 integer count | Max-heap of active heights |
| One-pass after sort | Binary search on sorted bookings OR event sweep |

The **skeleton is identical**: sort events, sweep left to right, update state, emit answer at critical points.

**C-Rank Day 13 — Difference Array:** Flight Bookings marked `+passengers` at start and `−passengers` at end. Sweep line is the **event-list version** of the same timeline thinking — difference array for dense integer timelines, explicit events for sparse or height-weighted timelines.

**C-Rank Day 14 — Sorting as Strategy:** Every sweep line begins with sorting. Day 14 sorted intervals; Day 22 sorts **events** (which may include height, type, and tie-breaking rules).

### 4. Sweep line + max-heap — the skyline combo

The Skyline Problem (#218) asks: at each horizontal coordinate, what is the **maximum building height** currently active?

A running count isn't enough — you need the **tallest** active building:

```
buildings = [[2,9,10], [3,7,15], [5,12,12], [15,20,10]]

At x=5: three buildings active with heights 10, 15, 12  →  answer = 15
At x=7: building height 15 ends                        →  answer drops to 12
```

**Algorithm:**
1. Create events: `(start, -height)` for starts, `(end, +height)` for ends (negate starts for sort tie-breaking)
2. Sort events by coordinate; on tie, process **starts before ends** (and taller starts first)
3. Sweep with a **max-heap** of active heights
4. When the heap max changes, record `[x, new_max]`

```
events sorted:
  (2, -10)  start h=10
  (3, -15)  start h=15
  (5, -12)  start h=12
  (7, +15)  end   h=15
  (9, -10)  ... wait, (9, +10) end h=10
  (12, +12) end h=12
  (20, +10) end h=10

heap after each event → record when top changes
```

### 5. Calendar sweep — streaming overlap detection

My Calendar I (#729) receives bookings **one at a time**. For each new `[start, end)`, check if it overlaps any existing booking.

**Approach A — Sorted list + binary search:**
- Keep bookings sorted by start
- Binary search for insertion point
- Check neighbor(s) for overlap: `new.start < neighbor.end AND neighbor.start < new.end`

**Approach B — Sweep line on events:**
- Maintain sorted event list
- On each booking, add start/end events and check running overlap count

For a single overlap check (not triple), Approach A is simpler and O(log n) per booking.

```
bookings = [[10, 20], [15, 25]]

New [17, 22]:
  17 < 20 (first booking's end) AND 10 < 22  →  OVERLAP ✗

New [20, 30]:
  20 >= 20 (first ends at 20) AND 20 < 30, 15 < 30... 
  Check: 20 < 25 (second's end)? 20 < 25 yes, 15 < 30 yes → overlap with [15,25] ✗

New [25, 35]:
  25 >= 25, no overlap with [15,25]  →  OK ✓
```

### 6. Critical event ordering — tie-breaking rules

When multiple events share the same coordinate, **processing order matters**:

| Problem | Tie-break rule | Why |
|---|---|---|
| Skyline (#218) | Start before end; taller start first | A building starting at x must affect height before one ending at x |
| Meeting Rooms II (#253) | Start before end (or end exclusive) | A meeting starting at t=10 should count before one ending at t=10 |
| My Calendar II (#731) | Standard +1 before −1 | Detect triple overlap before decrementing |

Getting tie-breaking wrong produces off-by-one height drops or missed overlaps.

### 7. Small visual example — skyline sweep

```
buildings: [[2,9,10], [3,7,15]]

Events (start negated for max-heap sort):
  x=2: start h=10
  x=3: start h=15
  x=7: end   h=15
  x=9: end   h=10

x=2: heap=[10]           max=10  → record [2,10]
x=3: heap=[15,10]        max=15  → record [3,15]
x=7: remove 15, heap=[10] max=10  → record [7,10]
x=9: remove 10, heap=[]  max=0   → (no record — ground level)

Skyline: [[2,10], [3,15], [7,10]]  ✓
```

### 8. What problem does this pattern solve?

- **City skylines** — max height at each critical x-coordinate (#218)
- **Calendar booking** — can I add this interval without overlap? (#729, #731)
- **Concurrent resource counting** — meeting rooms, capacity (#253)
- **Segment coverage** — union length, interval intersections
- **Timeline queries** — "what's active at time t?"

### 9. Why brute force is inefficient

| Brute force | Problem |
|---|---|
| Check every x from min to max, scan all buildings | O(range × n) — sweep is O(n log n) |
| Compare every pair of intervals for overlap | O(n²) per booking — binary search is O(log n) |
| Track all active heights in unsorted list | O(n) max per step — heap gives O(log n) |
| Ignore event ordering at same coordinate | Wrong skyline drops and missed overlaps |

### 10. The key observation

The sweep line converts **2D geometry** or **interval scheduling** into a **1D timeline walk**:

```
2D skyline  →  events on x-axis  →  1D sweep with heap
n intervals →  2n boundary events →  1D sweep with counter
streaming bookings → sorted structure → O(log n) neighbor check
```

You don't re-scan all data at each point. You **incrementally** update active state as events arrive.

### 11. Pattern signals & recognition clues

| When the problem says… | Think advanced sweep line |
|---|---|
| "skyline" / "building height" / "critical points" | Event sweep + max-heap |
| "calendar" / "book meeting" / "can I schedule" | Sorted bookings + overlap check |
| "maximum concurrent" / "minimum rooms" | +1/−1 event sweep (Day 15) |
| "triple booking" / "overlap three times" | Event sweep, count ≥ 3 |
| intervals on timeline + **max** of active values | Sweep + heap, not just counter |

**Keywords:** `sweep line` · `skyline` · `calendar` · `event` · `timeline` · `concurrent` · `overlap` · `critical point` · `max-heap`

### 12. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Wrong event sort order at same x (skyline) | Starts before ends; negate heights for start events |
| Not lazy-deleting from heap | When a height ends, pop only if it matches heap top; else mark removed |
| Using `>` instead of `>=` for overlap | LeetCode calendars: `[10,20)` and `[20,30)` may or may not overlap — read problem (usually `[start, end)` half-open) |
| Sweep with counter when you need max height | Skyline needs max-heap, not +1/−1 count |
| Forgetting end is exclusive in calendar | `[10, 20)` occupies 10..19 — overlap test uses `start < other.end` |

### 13. Recognition drill

Read this problem aloud:

> *"A city's skyline is the silhouette formed by all buildings. Given building positions and heights, return the key points where the skyline changes."*

Before coding, say:

> *"Critical x-coordinates = all building starts and ends. Sweep with max-heap of active heights. Record [x, max] when heap top changes. Sort events with correct tie-breaking."*

---

## Part 2 — What's Next

Today you'll apply advanced sweep line thinking to two problems at different difficulty:

1. **Streaming calendar** — My Calendar I (#729)
2. **Skyline + max-heap** — The Skyline Problem (#218) — Hard

Day 15 counted. Day 22 tracks the maximum.

---

*You understand events on a timeline. First quest: book a calendar without collisions. →*
