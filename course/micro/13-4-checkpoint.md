# ✅ Day 13 Checkpoint

> **Difference Arrays** · 2 quests completed · ⭐ 45 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

| When you see... | Think... | Why |
|---|---|---|
| "add `val` to every index in [L..R]" (many times) | Difference array stamps | O(1) per update, prefix to reconstruct |
| "flight bookings" / "seat reservations" on ranges | `diff[L] += val; diff[R+1] -= val` | Canonical difference array |
| "pickup at X, dropoff at Y" | Event list: `+val` at X, `−val` at Y, sort, scan | Timeline sweep variant |
| "return final array after all updates" | Build diff, one prefix pass | Never update nums directly in a loop |
| "check if capacity ever exceeded" | Running total on sorted events | Feasibility sweep |
| range queries on fixed array | Prefix sum (Day 5) | Opposite direction — queries vs updates |
| 1-indexed ranges | Convert to 0-indexed before stamping | `diff[first-1]`, `diff[last]` |

### 🧠 Quick Recognition Test

1. *"n seats, m bookings each adding seats to flights [first, last]"* → **Difference array, prefix sum**
2. *"Trips with pickup/dropoff, check car capacity"* → **Sort events, running total sweep**
3. *"k operations: add val to all elements in [i, j]"* → **Stamp diff[i] and diff[j+1]**
4. *"What is sum of subarray [L..R]?"* → **Prefix sum (Day 5) — not difference array**

---

## 🎯 Transfer to Unseen Problems

You've studied Corporate Flight Bookings and Car Pooling. Can you recognize difference-array thinking on problems you've never walked through?

**Scenario 1:** *"A bakery gets daily orders: 'add 5 croissants to shelves 3 through 7.' After all orders, how many croissants are on each shelf?"*

Which pattern? **Difference array.** Each order stamps `+5` at shelf 3 and `−5` after shelf 7. Prefix sum gives per-shelf totals. Identical to Flight Bookings with different nouns.

**Scenario 2:** *"An elevator starts at floor 0. People board at floors [2, 5, 5] and exit at floors [4, 7, 9]. The elevator holds 8 people. Can it complete all trips?"*

Which pattern? **Event sweep.** Events: `(2,+a), (4,−a), (5,+b), (5,+c), (7,−b), (9,−c)`. Sort by floor, track running count. Same skeleton as Car Pooling.

**Scenario 3:** *"Given an array, answer q queries: what is the sum from index L to R?"*

Which pattern? **Prefix sum (Day 5)** — not difference array. Queries on a fixed array → prefix. Updates to a range → difference array. Know which direction you're going.

> **Answer key:** Scenarios 1 and 2 → stamp + prefix/sweep. Scenario 3 → prefix sum query. The *direction* (update vs query) determines the tool.

---

## ⚠ Common Mistakes

1. **Missing the end stamp** — `diff[R+1] -= val` is what stops the range. Without it, the update bleeds to the end of the array.

2. **1-indexed off-by-one** — Flight bookings use 1-indexed flights. Stamp `diff[first-1]`, not `diff[first]`.

3. **Dropoff at wrong position** — Car Pooling drops passengers **before** reaching `to`. Stamp `−passengers` at `to`, not `to+1`.

4. **Simulating every position** — Only event points (pickup, dropoff, range boundaries) change the running total. Sort and scan those.

5. **Confusing prefix sum with difference array** — Prefix sum answers "what is sum[L..R]?" Difference array applies "add val to [L..R]." Opposite pipelines.

---

## 🏋️ Mini Challenge

### [Range Addition #370](https://leetcode.com/problems/range-addition/)

**[→ Try Range Addition on LeetCode](https://leetcode.com/problems/range-addition/)**

You are given an array `length` and a list of updates `updates[i] = [start, end, inc]`. Each update adds `inc` to every element from index `start` to `end` (inclusive). Return the final array after all updates.

```
Input:  length = 5, updates = [[1,3,2],[2,4,3],[0,2,-2]]
Output: [-2, 0, 3, 5, 3]
```

### 🔍 Pattern Recognition for This Challenge

| Clue | Signal |
|---|---|
| "add `inc` to every index from `start` to `end`" | Range update — difference array |
| "after all updates" | Stamp all, prefix once at the end |
| multiple overlapping updates | Stamps accumulate — prefix distributes |

**Before you code:** *"Pure difference array — no tricks. Stamp +inc at start, −inc at end+1. Prefix to get final array."*

> 💡 **Hint:** This is Flight Bookings without the 1-indexed conversion. `diff[start] += inc`, `diff[end+1] -= inc`, then prefix.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Range Addition #370](https://leetcode.com/problems/range-addition/) | Medium | Pure difference array |
| [Car Pooling #1094](https://leetcode.com/problems/car-pooling/) | Medium | Event sweep on timeline |
| [Corporate Flight Bookings #1109](https://leetcode.com/problems/corporate-flight-bookings/) | Medium | Range stamps + prefix |
| [Meeting Rooms II #253](https://leetcode.com/problems/meeting-rooms-ii/) | Medium | Sort start/end events (Day 15 preview) |

---

*Day 13 complete! Difference arrays are the inverse of prefix sums. Tomorrow: sorting as strategy. →*
