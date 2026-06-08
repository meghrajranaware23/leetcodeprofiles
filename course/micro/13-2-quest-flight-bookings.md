# ⚔ Quest: Corporate Flight Bookings

> **Day 13** · [Corporate Flight Bookings #1109](https://leetcode.com/problems/corporate-flight-bookings/) · Medium · 20 XP · 15 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Corporate Flight Bookings on LeetCode](https://leetcode.com/problems/corporate-flight-bookings/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen, paper, or your editor. The hints and walkthrough below are for *after* your attempt.

---

## The Problem

There are `n` flights labeled `1` through `n`. Each booking `bookings[i] = [first_i, last_i, seats_i]` reserves `seats_i` seats on **every flight** from `first_i` to `last_i` (inclusive).

Return an array `answer` of length `n` where `answer[i]` is the total seats booked on flight `i + 1`.

```
Input:  bookings = [[1,2,10],[2,3,20],[2,5,25]], n = 5
Output: [10, 55, 45, 25, 25]

Input:  bookings = [[1,2,10],[2,2,15]], n = 2
Output: [10, 25]
```

---

## 💡 Hints

Each booking adds the same number of seats to a **range** of flights. Looping `first` to `last` for every booking is O(bookings × n).

Day 5 prefix sums answer range **queries**. This is the flip: many range **updates**. Stamp `+seats` at the start and `−seats` after the end on a difference array, then take the prefix sum.

Remember: flights are **1-indexed**. Convert to 0-indexed when stamping `diff`.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Difference Array (Inverse of Prefix Sum)

**How to identify this from the problem statement:**
- "reserve seats on flights `first` through `last`" → range update on every index in `[first..last]`
- many bookings, one final array → stamp each update in O(1), reconstruct once
- "return total on each flight" → prefix sum of the difference array

| Keyword / phrase | What it signals |
|---|---|
| "every flight from X to Y" / "inclusive range" | Range update — stamp start and end |
| "several bookings" / "many reservations" | Don't loop per index — use diff array |
| "return array of totals" | Prefix sum reconstruction |
| 1-indexed flights | `diff[first-1] += seats`, `diff[last] -= seats` |

**Why this pattern works:** Each booking changes all flights in a range by the same `seats` value. Two stamps record the change; one prefix pass distributes it. O(n + bookings) total.

**How a strong solver thinks before coding:**
1. *"Range additions on many overlapping intervals → difference array."*
2. *"Stamp +seats at first−1, −seats at last (0-indexed boundary)."*
3. *"Prefix sum diff → answer array."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Loop first→last for each booking** | O(q × n) — TLE when q = 20,000 and n = 20,000 |
| **Rebuild answer array with nested loops** | Same O(q × n) — redundant per-element work |
| **Prefix sum on original (no diff)** | Prefix sums **query** ranges — they don't **apply** range updates efficiently |
| **Off-by-one on 1-indexed input** | Stamping wrong indices shifts entire answer |

**The insight brute force misses:** You don't need to touch every flight in every booking. A range update is two marks — the prefix pass does the rest.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Corporate Flight Bookings #1109](https://leetcode.com/problems/corporate-flight-bookings/) | 1-indexed flight ranges | Stamp + prefix |
| [Range Addition #370](https://leetcode.com/problems/range-addition/) | Explicit +val updates | Pure difference array (checkpoint) |
| [Car Pooling #1094](https://leetcode.com/problems/car-pooling/) | Pickup/dropoff events | Timeline stamps (next quest) |
| [My Calendar I #729](https://leetcode.com/problems/my-calendar-i/) | Overlap detection | Sweep line variant (B-Rank) |

This is the **canonical** difference array problem — if you recognize "add to every index in range," you reach for stamps + prefix.

---

## 📖 Walkthrough

```
bookings = [[1,2,10], [2,3,20], [2,5,25]],  n = 5

Stamp on diff (size 6):
  [1,2,10]:  diff[0] += 10,  diff[2] -= 10
  [2,3,20]:  diff[1] += 20,  diff[3] -= 20
  [2,5,25]:  diff[1] += 25,  diff[5] -= 25

diff:  [10, 45, -10, -20, 0, -25]
        ↑   ↑              ↑
      f1   f2            after f5

Prefix sum:
  i=0: 10        → flight 1: 10
  i=1: 10+45=55  → flight 2: 55
  i=2: 55-10=45  → flight 3: 45
  i=3: 45-20=25  → flight 4: 25
  i=4: 25+0=25   → flight 5: 25

answer = [10, 55, 45, 25, 25] ✓
```

> 💡 **The insight:** Flight 2 gets 10 + 20 + 25 = 55 from three overlapping bookings — the prefix pass accumulates all stamps automatically.

---

## Solution

### C++
```cpp
class Solution {
public:
    vector<int> corpFlightBookings(vector<vector<int>>& bookings, int n) {
        vector<int> diff(n + 1, 0);

        for (auto& b : bookings) {
            int first = b[0], last = b[1], seats = b[2];
            diff[first - 1] += seats;   // range starts (0-indexed)
            diff[last]     -= seats;   // range ends after last flight
        }

        vector<int> answer(n);
        int running = 0;
        for (int i = 0; i < n; i++) {
            running += diff[i];
            answer[i] = running;
        }
        return answer;
    }
};
```

### Python
```python
class Solution:
    def corpFlightBookings(self, bookings: list[list[int]], n: int) -> list[int]:
        diff = [0] * (n + 1)

        for first, last, seats in bookings:
            diff[first - 1] += seats          # range starts
            diff[last]     -= seats           # range ends

        answer, running = [], 0
        for i in range(n):
            running += diff[i]
            answer.append(running)

        return answer
```

### Java
```java
class Solution {
    public int[] corpFlightBookings(int[][] bookings, int n) {
        int[] diff = new int[n + 1];

        for (int[] b : bookings) {
            int first = b[0], last = b[1], seats = b[2];
            diff[first - 1] += seats;
            diff[last]     -= seats;
        }

        int[] answer = new int[n];
        int running = 0;
        for (int i = 0; i < n; i++) {
            running += diff[i];
            answer[i] = running;
        }
        return answer;
    }
}
```

**Complexity:** O(n + bookings) time · O(n) space

---

## 💭 What Should Have Clicked in Your Mind?

Before you opened your editor, these thoughts should have fired:

- **"Add seats to every flight in a range"** → Difference array. Inverse of Day 5 prefix sums.
- **"Many overlapping bookings"** → Stamp each in O(1) — never loop first→last per booking.
- **"1-indexed flights"** → Convert: `diff[first-1] += seats`, `diff[last] -= seats`.
- **"Return per-flight totals"** → One prefix pass over `diff`.

If you nested loops over every booking's range, you found O(q × n). The signal was "same value added to every index in [L..R]" — that's a two-stamp operation.

> 🎯 **Pattern Unlocked:** Difference array = prefix sum in reverse. Stamp `+val` at `L`, `−val` at `R+1`, prefix to reconstruct.

---

*Next: Car Pooling — difference array thinking on a pickup/dropoff timeline. →*
