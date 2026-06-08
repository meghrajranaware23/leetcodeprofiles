# ⚔ Quest: The Skyline Problem

> **Day 22** · [The Skyline Problem #218](https://leetcode.com/problems/the-skyline-problem/) · Hard · 45 XP · 30 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open The Skyline Problem on LeetCode](https://leetcode.com/problems/the-skyline-problem/)**

> ⚔ **Hunter's rule:** Spend at least 15 minutes with pen, paper, or your editor. This is a Hard problem — the hints and walkthrough below are for *after* a genuine attempt.

---

## The Problem

A city's **skyline** is the outer contour formed by all buildings when viewed from a distance. Each building is a rectangle represented as `[left, right, height]`.

Return the **key points** where the skyline changes as a list of `[x, height]`. The answer must be sorted by x.

```
Input:  buildings = [[2,9,10],[3,7,15],[5,12,12],[15,20,10],[19,24,8]]
Output: [[2,10],[3,15],[7,12],[12,0],[15,10],[20,8],[24,0]]

Input:  buildings = [[0,2,3],[2,5,3]]
Output: [[0,3],[5,0]]
```

```
Visual (buildings as blocks):

height
  15 |     ████
  12 |     ████████
  10 | ████████████████
   8 |                 ████
   3 |
   0 |________________________________ x
     0  2  3  5  7  9 12 15 19 20 24

Key points: (2,10) (3,15) (7,12) (12,0) (15,10) (20,8) (24,0)
```

---

## 💡 Hints

**Step 1 — Events:** Convert each building `[L, R, H]` into two events:
- `(L, -H)` — building **starts** (negate height for sorting)
- `(R, +H)` — building **ends**

**Step 2 — Sort:** Sort events by x. On tie at same x:
- **Start before end** (negative height before positive)
- Among starts, **taller first** (more negative = taller)

**Step 3 — Sweep with max-heap:** Maintain active building heights. On each event:
- Start → push height onto max-heap
- End → mark height as removed (lazy deletion)

**Step 4 — Record:** When heap max changes, append `[x, new_max]`. Skip if max is 0 and you already recorded ground level.

**Lazy deletion:** When a building ends, you can't always pop from heap (shorter buildings may be below). Track `removed` counts; only pop when `heap.top()` is marked removed.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Advanced Sweep Line + Max-Heap (Day 22)

**How to identify this from the problem statement:**
- "skyline" / "silhouette" / "contour" → geometric critical points
- buildings as `[left, right, height]` → intervals with weight
- "key points where height changes" → sweep and emit on state change
- need **maximum** active height, not just count

| Keyword / phrase | What it signals |
|---|---|
| "skyline" / "building height" | Event sweep + max-heap |
| "key points" / "critical points" | Record only when max height changes |
| `[left, right, height]` | Start event + end event per building |
| maximum height at each x | Heap, not +1/−1 counter |

**Why this pattern works:** The skyline only changes at building starts and ends — O(n) critical x-coordinates. At each event, only the **tallest active building** matters. A max-heap tracks that in O(log n) per event.

**How a strong solver thinks before coding:**
1. *"Critical x = all building boundaries. Sweep left to right."*
2. *"Need max active height → max-heap, not counter."*
3. *"Sort events carefully — start before end, taller start first."*
4. *"Lazy-delete ended heights from heap."*
5. *"Record [x, max] only when max changes."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Scan every integer x from min to max** | O(range × n) — range can be 10⁹ |
| **For each x, check all buildings for coverage** | O(n × range) — TLE on large coordinates |
| **Sort buildings, merge like intervals** | Merge loses height information — skyline isn't interval merge |
| **Use +1/−1 count sweep** | Counts buildings, not their heights — need max, not count |
| **Pop heap on every end event** | Shorter buildings still active below — lazy deletion required |

**The insight brute force misses:** Only **2n events** matter (n starts, n ends). Between events, the max height is constant. Sweep events, not every coordinate.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [The Skyline Problem #218](https://leetcode.com/problems/the-skyline-problem/) | Max height contour | Event sweep + max-heap |
| [Meeting Rooms II #253](https://leetcode.com/problems/meeting-rooms-ii/) | Count concurrent | Event sweep + counter (Day 15) |
| [My Calendar III #732](https://leetcode.com/problems/my-calendar-iii/) | Max overlap count | Event sweep + running max |
| [Falling Squares #699](https://leetcode.com/problems/falling-squares/) | Dynamic skyline with squares | Segment tree or sweep + map |

Skyline = Meeting Rooms II's sweep skeleton, but the active value is **height** (max-heap), not **count** (+1/−1).

---

## 📖 Walkthrough

```
buildings = [[2,9,10], [3,7,15], [5,12,12]]

Step 1 — Build events (start negated):
  (2, -10)   building 10 starts
  (3, -15)   building 15 starts
  (5, -12)   building 12 starts
  (7, +15)   building 15 ends
  (9, +10)   building 10 ends
  (12, +12)  building 12 ends

Step 2 — Sort (already correct order):
  (2,-10) (3,-15) (5,-12) (7,+15) (9,+10) (12,+12)

Step 3 — Sweep:

  x=2: push 10        heap=[10]         max=10  → record [2,10]
  x=3: push 15        heap=[15,10]      max=15  → record [3,15]
  x=5: push 12        heap=[15,12,10]   max=15  (no change)
  x=7: end 15, remove heap=[12,10]      max=12  → record [7,12]
  x=9: end 10, remove heap=[12]         max=12  (no change)
  x=12: end 12, remove heap=[]          max=0   → record [12,0]

Answer: [[2,10], [3,15], [7,12], [12,0]]  ✓
```

**Tie-breaking example:**

```
buildings = [[0,2,3], [2,5,3]]

Events: (0,-3) (2,-3) (2,+3) (5,+3)

At x=2: TWO events — start of building 2 AND end of building 1.
  Process START first (neg before pos): push 3 → max still 3 (no new record)
  Then END: remove first building's 3 → max still 3 (second building active)

At x=5: end of building 2 → max drops to 0 → record [5,0]

Answer: [[0,3], [5,0]]  ✓
```

> 💡 **The insight:** Skyline changes only when the **max active height** changes. Sort events with correct tie-breaking; sweep with a max-heap and lazy deletion.

---

## Solution

### C++
```cpp
class Solution {
public:
    vector<vector<int>> getSkyline(vector<vector<int>>& buildings) {
        vector<pair<int, int>> events;
        for (auto& b : buildings) {
            events.push_back({b[0], -b[2]});  // start
            events.push_back({b[1],  b[2]});  // end
        }
        sort(events.begin(), events.end());

        vector<vector<int>> result;
        priority_queue<int> heap;
        unordered_map<int, int> removed;
        heap.push(0);

        int prev = 0;

        for (auto& [x, h] : events) {
            if (h < 0) {
                heap.push(-h);
            } else {
                removed[h]++;
            }

            while (removed.count(heap.top()) && removed[heap.top()] > 0) {
                removed[heap.top()]--;
                heap.pop();
            }

            int cur = heap.top();
            if (cur != prev) {
                result.push_back({x, cur});
                prev = cur;
            }
        }
        return result;
    }
};
```

### Python
```python
class Solution:
    def getSkyline(self, buildings: list[list[int]]) -> list[list[int]]:
        events = []
        for left, right, height in buildings:
            events.append((left, -height))   # start: negate for sort
            events.append((right, height))   # end

        events.sort()
        result = []
        heap = [0]
        removed: dict[int, int] = {}
        prev = 0

        for x, h in events:
            if h < 0:
                heapq.heappush(heap, -h)
            else:
                removed[h] = removed.get(h, 0) + 1

            while removed.get(heap[0], 0) > 0:
                removed[heap[0]] -= 1
                heapq.heappop(heap)

            cur = heap[0]
            if cur != prev:
                result.append([x, cur])
                prev = cur

        return result
```

### Java
```java
class Solution {
    public List<List<Integer>> getSkyline(int[][] buildings) {
        List<int[]> events = new ArrayList<>();
        for (int[] b : buildings) {
            events.add(new int[]{b[0], -b[2]});
            events.add(new int[]{b[1],  b[2]});
        }
        events.sort((a, b) -> a[0] != b[0] ? a[0] - b[0] : a[1] - b[1]);

        List<List<Integer>> result = new ArrayList<>();
        PriorityQueue<Integer> heap = new PriorityQueue<>(Collections.reverseOrder());
        Map<Integer, Integer> removed = new HashMap<>();
        heap.offer(0);
        int prev = 0;

        for (int[] e : events) {
            int x = e[0], h = e[1];
            if (h < 0) heap.offer(-h);
            else removed.merge(h, 1, Integer::sum);

            while (removed.getOrDefault(heap.peek(), 0) > 0) {
                removed.merge(heap.poll(), -1, Integer::sum);
            }

            int cur = heap.peek();
            if (cur != prev) {
                result.add(List.of(x, cur));
                prev = cur;
            }
        }
        return result;
    }
}
```

**Complexity:** O(n log n) time · O(n) space (n = number of buildings)

---

## 💭 What Should Have Clicked in Your Mind?

Before you opened your editor, these thoughts should have fired:

- **"Skyline"** → Critical points at building boundaries — event sweep (Day 22).
- **"Maximum height"** → Max-heap of active heights, not +1/−1 counter (Day 15).
- **Event tie-breaking** → Starts before ends at same x; taller starts first.
- **Lazy heap deletion** → Ended buildings may not be at heap top — mark removed, clean lazily.
- **Record on change only** → If max unchanged after event, no new key point.

If you scanned every x-coordinate or merged intervals like Day 15, you fought the wrong abstraction. The signal was "silhouette" + "height" — sweep events, track max with a heap.

> 🎯 **Advanced Sweep Line:** Skyline = Day 15's timeline walk + max-heap for weighted active set. The hardest sweep line in B-Rank.

---

*Checkpoint next: triple-booking calendar and practice queue. →*
