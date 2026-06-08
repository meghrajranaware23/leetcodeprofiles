# ⚔ Quest: My Calendar I

> **Day 22** · [My Calendar I #729](https://leetcode.com/problems/my-calendar-i/) · Medium · 35 XP · 18 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open My Calendar I on LeetCode](https://leetcode.com/problems/my-calendar-i/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen, paper, or your editor. The hints and walkthrough below are for *after* your attempt.

---

## The Problem

Implement a `MyCalendar` class to book time ranges without **double booking**.

- `book(start, end)` — book `[start, end)` if it does not overlap any existing booking. Return `true` if booked, `false` if it would overlap.
- Overlap: two intervals `[s1, e1)` and `[s2, e2)` overlap when `s1 < e2` AND `s2 < e1`.

```
Input:
["MyCalendar", "book", "book", "book"]
[[], [10, 20], [15, 25], [20, 30]]

Output: [null, true, false, true]

Explanation:
  book(10, 20) → true   (calendar: [[10,20]])
  book(15, 25) → false  (overlaps [10,20])
  book(20, 30) → true   (starts when [10,20] ends — no overlap)
```

---

## 💡 Hints

Bookings arrive **one at a time** — a streaming interval problem. Keep existing bookings in a **sorted structure** (list, TreeMap, or balanced BST).

For a new `[start, end)`, you only need to check **neighbors** in the sorted order — not every booking.

Overlap test: `new_start < existing_end AND existing_start < new_end`.

**Approach A:** Sorted list + binary search for insertion point, check left and right neighbor.

**Approach B:** Brute-force scan all bookings — O(n) per book, acceptable for small n.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Advanced Sweep Line — Streaming Overlap Detection (Day 22)

**How to identify this from the problem statement:**
- "calendar" / "book a meeting" → interval scheduling
- events arrive one at a time → streaming, not batch
- "without double booking" → overlap detection on insert
- half-open intervals `[start, end)` → standard LeetCode convention

| Keyword / phrase | What it signals |
|---|---|
| "book" / "schedule" / "calendar" | Interval overlap check |
| streaming insertions | Sorted structure + neighbor check |
| "return false if overlap" | Reject on conflict, don't merge |
| `[start, end)` half-open | `start < other.end` AND `other.start < end` |

**Why this pattern works:** Once bookings are sorted by start, any overlap with a new interval must involve a **neighbor** — the booking just before or just after the insertion point. O(log n) search + O(1) neighbor check per booking.

**How a strong solver thinks before coding:**
1. *"Calendar = interval overlap on insert."*
2. *"Sort by start — only check neighbors near insertion point."*
3. *"Half-open: [10,20) and [20,30) do NOT overlap."*
4. *"If no conflict, insert and return true."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Compare new booking to every existing booking** | O(n) per insert — acceptable but doesn't scale; sorted structure is O(log n) |
| **Merge intervals like Day 15** | Calendar **rejects** overlaps, doesn't merge — different operation |
| **Using `<=` for all boundary checks** | `[10,20)` and `[20,30)` may be treated as overlapping incorrectly |
| **Only check one neighbor** | Must verify both left AND right neighbor at insertion point |

**The insight brute force misses:** Sorted bookings turn global overlap search into a **local** check. The new interval can only collide with bookings immediately before or after its start position.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [My Calendar I #729](https://leetcode.com/problems/my-calendar-i/) | Single overlap forbidden | Sorted insert + neighbor check |
| [My Calendar II #731](https://leetcode.com/problems/my-calendar-ii/) | Triple overlap forbidden | Event sweep, count ≥ 3 (checkpoint) |
| [My Calendar III #732](https://leetcode.com/problems/my-calendar-iii/) | Return max concurrent bookings | +1/−1 sweep line (Day 15) |
| [Meeting Rooms II #253](https://leetcode.com/problems/meeting-rooms-ii/) | Batch input, min rooms | Sweep or min-heap (Day 15) |

My Calendar I = **can I add this one interval?** Meeting Rooms II = **how many overlap at peak?** Same interval family, different query.

---

## 📖 Walkthrough

```
book(10, 20) → calendar: [[10,20]]
  No existing bookings → true ✓

book(15, 25) → check against [10,20]
  15 < 20? yes.  10 < 25? yes.  → OVERLAP → false ✗

book(20, 30) → calendar: [[10,20]]
  20 < 20? no.  → no overlap with [10,20] → true ✓
  calendar: [[10,20], [20,30]]

book(5, 15) → check against [10,20]
  5 < 20? yes.  10 < 15? yes.  → OVERLAP → false ✗
```

**Sorted insertion walkthrough:**

```
calendar = [[10,20], [20,30]]

book(17, 22):
  Insert position: between [10,20] and [20,30]
  Check left  [10,20]: 17 < 20 ✓, 10 < 22 ✓ → OVERLAP → false

book(25, 35):
  Insert after [20,30]
  Check left  [20,30]: 25 < 30 ✓, 20 < 35 ✓ → OVERLAP → false

book(30, 40):
  Check left  [20,30]: 30 < 30 ✗ → no overlap
  → true, calendar: [[10,20], [20,30], [30,40]]
```

---

## Solution

### C++ (sorted vector + binary search)
```cpp
class MyCalendar {
    vector<pair<int, int>> bookings;

public:
    bool book(int start, int end) {
        auto it = lower_bound(bookings.begin(), bookings.end(), make_pair(start, end));

        if (it != bookings.end() && start < it->second)
            return false;  // overlaps booking to the right

        if (it != bookings.begin() && prev(it)->second > start)
            return false;  // overlaps booking to the left

        bookings.insert(it, {start, end});
        return true;
    }
};
```

### Python (sorted list + bisect)
```python
class MyCalendar:
    def __init__(self):
        self.bookings = []  # list of [start, end), sorted by start

    def book(self, start: int, end: int) -> bool:
        import bisect
        i = bisect.bisect_left(self.bookings, [start, end])

        if i < len(self.bookings) and start < self.bookings[i][1]:
            return False
        if i > 0 and self.bookings[i - 1][1] > start:
            return False

        self.bookings.insert(i, [start, end])
        return True
```

### Java (TreeMap)
```java
class MyCalendar {
    private TreeMap<Integer, Integer> bookings = new TreeMap<>();

    public boolean book(int start, int end) {
        Integer prev = bookings.floorKey(start);

        if (prev != null && bookings.get(prev) > start)
            return false;

        Integer next = bookings.ceilingKey(start);
        if (next != null && end > next)
            return false;

        bookings.put(start, end);
        return true;
    }
}
```

**Complexity:** O(n) per book with vector insert · O(log n) per book with TreeMap/balanced BST

---

## 💭 What Should Have Clicked in Your Mind?

Before you opened your editor, these thoughts should have fired:

- **"Calendar"** → Interval overlap — Day 15 family, streaming variant.
- **"Book without double booking"** → Reject on conflict, don't merge.
- **Half-open `[start, end)`** → `[10,20)` and `[20,30)` are adjacent, not overlapping.
- **Sorted by start** → Check only left and right neighbor at insertion point.

If you compared every booking with nested loops and passed, you found the right logic with suboptimal structure. The signal was "streaming calendar" — sorted insert + local overlap check.

> 🎯 **Advanced Sweep Line:** Calendar = overlap detection on a living timeline. Sort, insert, check neighbors.

---

*Next: the skyline — sweep line meets max-heap. Hard mode. →*
