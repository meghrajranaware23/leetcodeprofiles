# ⚔ Quest: Car Pooling

> **Day 13** · [Car Pooling #1094](https://leetcode.com/problems/car-pooling/) · Medium · 25 XP · 15 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Car Pooling on LeetCode](https://leetcode.com/problems/car-pooling/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen, paper, or your editor. The hints and walkthrough below are for *after* your attempt.

---

## The Problem

You are driving a vehicle that can seat `capacity` passengers. Given an array `trips` where `trips[i] = [numPassengers, from, to]`, return `true` if and only if you can pick up and drop off all passengers without ever exceeding `capacity`.

Passengers are picked up at `from` and dropped off at `to` (not at `to` itself — they leave before the car reaches `to`).

```
Input:  trips = [[2,1,5],[3,3,7]], capacity = 4
Output: false
        (at mile 3: 2 + 3 = 5 passengers > capacity 4)

Input:  trips = [[2,1,5],[3,5,7]], capacity = 4
Output: true
        (first group drops off at 5 before second group picks up at 5)

Input:  trips = [[2,1,5],[3,3,7]], capacity = 5
Output: true
```

---

## 💡 Hints

Each trip is two **events**: `+numPassengers` at `from`, `−numPassengers` at `to`. You need to know the maximum passengers at any mile.

Sort events by location. Scan left to right, tracking a running total. If it ever exceeds `capacity`, return `false`.

This is difference-array thinking on a timeline — same stamp instinct as Flight Bookings, but with explicit pickup/dropoff events instead of inclusive ranges.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Difference Array / Event Sweep on a Timeline

**How to identify this from the problem statement:**
- "pick up at `from`, drop off at `to`" → two events per trip: `+passengers` and `−passengers`
- "never exceed capacity" → track running total along a sorted timeline
- many trips, check feasibility → stamp events, sort, scan once

| Keyword / phrase | What it signals |
|---|---|
| "pickup" / "dropoff" / "from" / "to" | Timeline events — +at start, −at end |
| "capacity" / "never exceed" | Running total must stay ≤ capacity |
| "can you complete all trips?" | Feasibility sweep, not optimization |
| passengers leave before reaching `to` | Stamp `−passengers` at `to`, not `to+1` |

**Why this pattern works:** At any location, the running total equals all pickups minus all dropoffs up to that point. Sorting events by location and scanning once gives the maximum load — O(trips log trips).

**How a strong solver thinks before coding:**
1. *"Pickup/dropoff on a number line → event list with +/− stamps."*
2. *"Sort by location. Running total = current passengers."*
3. *"If running > capacity at any point → false."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Simulate every mile from 0 to 1000** | O(max_mile × trips) — wasteful when miles are sparse |
| **Check capacity only at pickup points** | Dropoffs between pickups can lower load — but you must process events in order |
| **Difference array without sorting events** | Events at the same location must be processed together — sort first |
| **Stamp dropoff at `to+1`** | Problem says passengers leave **before** reaching `to` — drop at `to`, not after |

**The insight brute force misses:** You don't need to simulate every mile. Only **event points** (pickups and dropoffs) change the passenger count. Sort those and scan.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Car Pooling #1094](https://leetcode.com/problems/car-pooling/) | Feasibility check on capacity | Event sweep |
| [Corporate Flight Bookings #1109](https://leetcode.com/problems/corporate-flight-bookings/) | Inclusive range stamps | Difference array (previous quest) |
| [Meeting Rooms II #253](https://leetcode.com/problems/meeting-rooms-ii/) | Count max concurrent meetings | Sort start/end events (Day 15 preview) |
| [My Calendar II #731](https://leetcode.com/problems/my-calendar-ii/) | Triple overlap detection | Sweep line with running count (B-Rank) |

Car Pooling is the bridge between **pure difference arrays** (Flight Bookings) and **sweep-line interval problems** (Meeting Rooms II).

---

## 📖 Walkthrough

```
trips = [[2,1,5], [3,3,7]],  capacity = 4

Events (location, delta):
  (1, +2)  pickup 2 at mile 1
  (3, +3)  pickup 3 at mile 3
  (5, -2)  dropoff 2 at mile 5
  (7, -3)  dropoff 3 at mile 7

Sort by location: (1,+2), (3,+3), (5,-2), (7,-3)

Scan:
  mile 1: running = 0+2 = 2   ≤ 4 ✓
  mile 3: running = 2+3 = 5   > 4 ✗  → return false
```

```
trips = [[2,1,5], [3,5,7]],  capacity = 4

Events: (1,+2), (5,-2), (5,+3), (7,-3)
Sort:   (1,+2), (5,-2), (5,+3), (7,-3)

Scan:
  mile 1: running = 2   ≤ 4 ✓
  mile 5: running = 2-2 = 0, then 0+3 = 3   ≤ 4 ✓
  mile 7: running = 3-3 = 0   ≤ 4 ✓

return true ✓
```

> 💡 **The insight:** Dropoff at mile 5 happens before pickup at mile 5 — sort stability processes `−2` before `+3` when locations tie (use separate events, order dropoffs before pickups at same mile, or rely on the problem's "not at `to`" rule).

---

## Solution

### C++
```cpp
class Solution {
public:
    bool carPooling(vector<vector<int>>& trips, int capacity) {
        vector<pair<int, int>> events;

        for (auto& t : trips) {
            int passengers = t[0], from = t[1], to = t[2];
            events.push_back({from,  passengers});   // pickup
            events.push_back({to,    -passengers});   // dropoff
        }

        sort(events.begin(), events.end());

        int running = 0;
        for (auto& [loc, delta] : events) {
            running += delta;
            if (running > capacity) return false;
        }
        return true;
    }
};
```

### Python
```python
class Solution:
    def carPooling(self, trips: list[list[int]], capacity: int) -> bool:
        events = []
        for passengers, start, end in trips:
            events.append((start,  passengers))   # pickup
            events.append((end,   -passengers))   # dropoff

        events.sort()
        running = 0
        for _, delta in events:
            running += delta
            if running > capacity:
                return False
        return True
```

### Java
```java
class Solution {
    public boolean carPooling(int[][] trips, int capacity) {
        List<int[]> events = new ArrayList<>();

        for (int[] t : trips) {
            events.add(new int[]{t[1],  t[0]});   // pickup
            events.add(new int[]{t[2], -t[0]});   // dropoff
        }

        events.sort((a, b) -> a[0] - b[0]);

        int running = 0;
        for (int[] e : events) {
            running += e[1];
            if (running > capacity) return false;
        }
        return true;
    }
}
```

**Complexity:** O(trips log trips) time · O(trips) space

---

## 💭 What Should Have Clicked in Your Mind?

Before you opened your editor, these thoughts should have fired:

- **"Pickup and dropoff at locations"** → Timeline events. +passengers at `from`, −passengers at `to`.
- **"Never exceed capacity"** → Running total sweep — same prefix instinct as difference arrays.
- **"Passengers leave before reaching `to`"** → Dropoff stamp at `to`, not `to+1`.
- **"Can I complete all trips?"** → Feasibility scan, not finding max or min.

If you simulated every mile 0→1000, you found O(miles × trips). The signal was "only pickup/dropoff points matter" — sort events and scan once.

> 🎯 **Pattern Combo:** Difference array thinking + sorted event sweep. Flight Bookings stamps ranges; Car Pooling stamps discrete events on a timeline.

---

*Next: checkpoint — prove the difference array instinct is yours. →*
