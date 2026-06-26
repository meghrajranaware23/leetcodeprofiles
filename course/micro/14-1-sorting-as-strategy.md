# 📝 Sorting as Strategy

> **Day 14** · Sorting as Strategy · 10 min read

---

You've sorted before — to find duplicates, to enable binary search, to make two pointers work. But sorting isn't just preprocessing. It's a **strategy**: reorder the input so the hard part becomes a **linear scan** or a **greedy choice**. Today you learn when to sort first — and how it unlocks the interval and greedy problems ahead.

---

## Part 1 — Learn the Pattern

### 1. What is the pattern?

**Sort-first** means: before you solve the problem, sort the input by the key that makes decisions **monotonic**.

```
Unsorted intervals:  [[3,5], [1,3], [6,8], [2,4]]

After sorting by start:
                     [[1,3], [2,4], [3,5], [6,8]]
                       ↑
                    scan left → right, merge overlaps in one pass
```

Once sorted, you process elements in order. Each step has only **one** meaningful decision — no need to compare every pair.

### 2. Bridge to Day 6 — you already sort-first

On Day 6, Two Sum II assumed sorted input. On Day 7, 3Sum **sorted first** then fixed-one + two pointers:

```
Day 6:  sorted array  →  converging pointers (given)
Day 7:  unsorted array  →  SORT  →  converging pointers (you add the sort)
Day 14: intervals, events, greedy  →  SORT  →  linear scan or greedy pick
```

| Day | Sort purpose | What comes after |
|---|---|---|
| **6** | Enable pair-sum two pointers | L++/R-- on sum compare |
| **7** | Enable 3Sum inner sweep + dedup | Fix one + converge |
| **14** | Enable merge, overlap, greedy interval | Single left-to-right scan |

Sorting costs O(n log n). What you buy: the inner loop drops from O(n) to O(1) per step — total O(n) scan after sort.

### 3. Three sort-first families

**Family A — Merge overlapping intervals (sort by start):**
```
[[1,3], [2,6], [8,10], [15,18]]

sorted by start → scan:
  current = [1,3]
  [2,6] overlaps (2 ≤ 3) → merge to [1,6]
  [8,10] no overlap → push [1,6], current = [8,10]
  [15,18] no overlap → push [8,10], current = [15,18]
  push [15,18]

result: [[1,6], [8,10], [15,18]]
```

**Family B — Maximize non-overlapping count (sort by end):**
```
[[1,2], [2,3], [1,3], [3,4]]

sorted by END → greedy:
  pick [1,2]  (ends earliest)
  skip [2,3]  (starts at 2, current ends at 2 — overlap)
  skip [1,3]  (already past)
  pick [3,4]  (starts at 3 ≥ 2)

count = 2 non-overlapping intervals
```

**Family C — Event sweep (sort by time/location):**
```
meetings: [0,30], [5,10], [15,20]
sort by start → check if any overlap (Meeting Rooms)
sort start/end events → count concurrent (Meeting Rooms II — Day 15)
```

### 4. Sort by start vs sort by end — the critical choice

| Goal | Sort by | Why |
|---|---|---|
| **Merge** overlapping intervals | **Start** | Process in time order; extend `end` when next `start ≤ current_end` |
| **Minimize removals** / max non-overlapping | **End** | Earliest-finishing interval leaves most room for the rest |
| **Check** if any overlap exists | **Start** | If `start[i] < end[i-1]`, overlap found |
| **Count** max concurrent events | **Start and end** separately | Sweep line (Day 15) |

Getting this wrong gives correct-looking but wrong answers. **Merge → sort by start. Greedy non-overlap → sort by end.**

### 5. Small visual example — merge vs greedy

```
intervals = [[1,3], [2,4], [1,2]]

MERGE (sort by start):
  [1,2], [1,3], [2,4]
  → merge all → [[1,4]]

NON-OVERLAPPING (sort by end):
  [1,2], [1,3], [2,4]
  pick [1,2] (end=2)
  skip [1,3] (start=1 < end=2)
  pick [2,4] (start=2 ≥ end=2)
  → count = 2
```

Same input, different questions, different sort keys.

### 6. What problem does this pattern solve?

- **Merge intervals** — combine overlapping ranges
- **Non-overlapping intervals** — maximize count or minimize removals
- **Meeting rooms** — detect or count overlaps
- **Activity selection** — pick maximum non-conflicting events
- Any problem where **processing in sorted order** makes each decision obvious

### 7. Why brute force is inefficient

| Brute force | Problem |
|---|---|
| Compare every pair of intervals for overlap | O(n²) — sort + scan is O(n log n) |
| Try every subset of intervals | Exponential — greedy on sorted ends is O(n log n) |
| Merge without sorting | Miss overlaps that appear out of order in the input |
| Sort by wrong key | Wrong greedy choices — looks efficient but gives wrong answer |

### 8. Pattern signals & recognition clues

| When the problem says… | Think sort-first |
|---|---|
| "merge overlapping intervals" | Sort by **start**, scan and extend `end` |
| "minimum intervals to remove" / "maximum non-overlapping" | Sort by **end**, greedy keep |
| "meeting rooms" / "can attend all meetings?" | Sort by **start**, check `start[i] < end[i-1]` |
| "minimum number of rooms" | Sort start/end events (Day 15) |
| "schedule maximum activities" | Sort by **end**, greedy select |

**Keywords:** `intervals` · `overlapping` · `merge` · `non-overlapping` · `meeting` · `schedule` · `remove minimum` · `activity selection`

### 9. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Sorting by start for non-overlapping greedy | Sort by **end** — earliest finish leaves most room |
| Sorting by end for merge | Sort by **start** — process in chronological order |
| Forgetting inclusive boundaries | `[1,2]` and `[2,3]` — check problem: does `[2,2]` overlap both? Usually `start < end_prev` means overlap for meetings |
| Not updating merged `end` to `max` | When merging, `end = max(current_end, next_end)` |
| Skipping the sort because "it's only O(n²)" | O(n log n) sort + O(n) scan beats O(n²) for n = 10⁴+ |

### 10. Recognition drill

Read this problem aloud:

> *"Given an array of intervals, merge all overlapping intervals and return the result."*

Before coding, say:

> *"Merge intervals → sort by start. Scan left to right: if overlap, extend end; else push current and start new."*

Now read this one:

> *"Given intervals, find the minimum number of intervals to remove so the rest are non-overlapping."*

Before coding, say:

> *"Maximize non-overlapping → sort by end. Greedy: keep interval if start ≥ last_end; else skip (remove)."*

---

## Part 2 — What's Next

Today you'll apply sort-first to interval classics:

1. **Merge** — Merge Intervals (#56) — sort by start, linear merge
2. **Greedy** — Non-overlapping Intervals (#435) — sort by end, maximize kept

The sort key changes. The instinct — **reorder so one pass decides everything** — stays the same.

---

*You understand sorting as strategy. First quest: merge overlapping intervals. →*
