# ✅ Day 22 Checkpoint

> **Advanced Sweep Line** · 2 quests completed · ⭐ 80 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

| When you see... | Think... | Why |
|---|---|---|
| "skyline" / "building silhouette" | Event sweep + max-heap | Need max active height, not count |
| "book calendar" / "schedule meeting" | Sorted intervals + neighbor overlap check | Streaming insert, reject on conflict |
| "minimum meeting rooms" / "max concurrent" | +1/−1 event sweep or min-heap (Day 15) | Count active intervals, track peak |
| "triple booking" / "3 overlaps" | Event sweep, running count ≥ 3 | My Calendar II — upgrade from single overlap |
| intervals + **maximum** of active values | Sweep + heap | Counter gives count, not max |
| same x, start and end events | Tie-break: start before end | Wrong order = wrong height or overlap |
| building ends, heap still has shorter ones | Lazy deletion from max-heap | Can't blindly pop — shorter buildings still active |

### 🧠 Quick Recognition Test

1. *"Return key points where city skyline height changes"* → **Events + max-heap + lazy delete (#218)**
2. *"Book [start,end) if no double booking"* → **Sorted insert + neighbor overlap (#729)**
3. *"Book if no point is covered by 3+ events"* → **+1/−1 sweep, reject if count hits 3 (#731)**
4. *"Minimum conference rooms for all meetings"* → **Sort + min-heap or event sweep (#253, Day 15)**

---

## 🎯 Transfer to Unseen Problems

You've studied My Calendar I and The Skyline Problem. Can you recognize advanced sweep line thinking on problems you've never walked through?

**Scenario 1:** *"Implement a calendar that allows double booking but not triple booking. Return false if any time point would be covered by 3 or more events."*

Which pattern? **Event sweep with running count.** Each booking adds +1 at start, −1 at end. Sort events; if count reaches 3 before accepting, reject. (My Calendar II #731 — mini challenge below.)

**Scenario 2:** *"Given meeting intervals, return the maximum number of meetings happening at the same time."*

Which pattern? **Day 15 sweep line or min-heap** — not skyline heap. You need a count, not a max height. (My Calendar III #732 / Meeting Rooms II #253.)

**Scenario 3:** *"Squares drop one by one onto the number line. After each drop, return the current skyline heights."*

Which pattern? **Dynamic skyline variant** — sweep line + segment tree or coordinate-compressed map. Harder than #218 because the active set changes incrementally. (Falling Squares #699 — A-Rank territory.)

> **Answer key:** Scenario 1 → triple-overlap sweep (#731). Scenario 2 → concurrent count (Day 15). Scenario 3 → dynamic skyline. Signal: **"max height contour"** → heap sweep; **"max count"** → +1/−1 sweep.

---

## ⚠ Common Mistakes

1. **Skyline: wrong event sort at same x** — Start must process before end; taller starts before shorter. Otherwise you record a height drop before the new building registers.

2. **Skyline: popping heap on every end** — A shorter building may end while a taller one below is still active. Use lazy deletion with a `removed` map.

3. **Calendar: treating adjacent as overlap** — `[10,20)` and `[20,30)` share endpoint but don't overlap on half-open intervals. Test: `new.start < other.end AND other.start < new.end`.

4. **Using interval merge for calendar** — Merge combines overlaps; calendar **rejects** them. Different operations.

5. **Counter sweep for skyline** — +1/−1 counts active buildings but ignores height. Skyline needs the **tallest** active building.

---

## 🏋️ Mini Challenge

### [My Calendar II #731](https://leetcode.com/problems/my-calendar-ii/)

**[→ Try My Calendar II on LeetCode](https://leetcode.com/problems/my-calendar-ii/)**

Implement `MyCalendarTwo`:
- `book(start, end)` — return `true` if the booking does not cause **triple overlap** (three or more bookings covering the same time point).
- Double booking is allowed.

```
Input:
["MyCalendarTwo","book","book","book","book","book","book"]
[[],[10,20],[50,60],[10,40],[5,15],[5,10],[25,55]]

Output: [null,true,true,true,true,false,true]

book(10,20) → true
book(50,60) → true
book(10,40) → true   (double overlap with [10,20] — OK)
book(5,15)  → true   (double overlap — still OK)
book(5,10)  → false  (would create triple overlap at [5,10))
book(25,55) → true
```

### 🔍 Pattern Recognition for This Challenge

| Clue | Signal |
|---|---|
| "triple overlap" / "3 events" | Running count sweep — reject when count ≥ 3 |
| double booking allowed | Different from My Calendar I — count, not binary overlap |
| streaming bookings | Add events incrementally, check before committing |

**Before you code:** *"Convert each booking to +1 at start, −1 at end. Sort all events. Sweep: if count would reach 3, reject. Otherwise add events and return true."*

> 💡 **Hint:** Maintain two lists — `events` (committed) and a trial sweep. On each `book`, temporarily add the new booking's events, sweep to check if any point hits 3, and only commit if safe. Alternatively, track overlapping pairs and check if the new interval crosses an existing overlap zone.

### Sweep Skeleton

```python
def book(self, start, end):
    new_events = [(start, 1), (end, -1)]
    all_events = sorted(self.events + new_events)

    count = 0
    for i, (time, delta) in enumerate(all_events):
        count += delta
        if count >= 3:
            return False

    self.events = all_events
    return True
```

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [My Calendar II #731](https://leetcode.com/problems/my-calendar-ii/) | Medium | Triple-overlap event sweep |
| [My Calendar III #732](https://leetcode.com/problems/my-calendar-iii/) | Hard | Max concurrent bookings sweep |
| [The Skyline Problem #218](https://leetcode.com/problems/the-skyline-problem/) | Hard | Event sweep + max-heap (review) |
| [My Calendar I #729](https://leetcode.com/problems/my-calendar-i/) | Medium | Sorted insert + overlap (review) |
| [Meeting Rooms II #253](https://leetcode.com/problems/meeting-rooms-ii/) | Medium | Min-heap / sweep (Day 15) |
| [Interval List Intersections #986](https://leetcode.com/problems/interval-list-intersections/) | Medium | Two pointers on sorted lists (Day 15) |
| [Car Pooling #1094](https://leetcode.com/problems/car-pooling/) | Medium | Difference array / sweep (Day 13) |

---

*Day 22 complete! B-Rank Test awaits — prove your command of advanced structures. →*
