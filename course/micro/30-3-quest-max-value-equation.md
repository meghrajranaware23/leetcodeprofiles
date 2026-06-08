# ⚔ Quest: Max Value of Equation

> **Day 30** · [Max Value of Equation #1499](https://leetcode.com/problems/max-value-of-equation/) · Hard · 60 XP · 35 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Max Value of Equation on LeetCode](https://leetcode.com/problems/max-value-of-equation/)**

> ⚔ **Hunter's rule:** Spend at least 10 minutes with pen and paper on the **algebraic transform** before coding. This is the capstone quest of the entire course.

> 🔥 **Legend check:** If you can rewrite `yi + yj + |xi − xj|` into a window-max problem on paper, you are thinking at S-Rank level.

---

## The Problem

You are given an array of points `(xi, yi)` on an X-Y plane, where `xi` and `yi` are **positive integers** and all `xi` are **distinct**.

Points are given in **strictly increasing order** of `xi`.

Find the maximum value of `yi + yj + |xi − xj|` where `i < j` and `|xi − xj| ≤ k`.

Return the maximum value, or `-1` if no such pair exists.

```
Input:  points = [[1,3],[2,0],[5,1],[6,2]], k = 2
Output: 4
Explanation: Pair (0,1): 3 + 0 + |1−2| = 4. Pair (2,3): 1 + 2 + |5−6| = 4.

Input:  points = [[0,0],[3,0],[9,2]], k = 3
Output: 3
Explanation: Pair (0,1): 0 + 0 + |0−3| = 3.

Input:  points = [[1,2],[2,3],[3,4],[4,5],[5,6],[6,7]], k = 2
Output: -1
Explanation: No pair satisfies |xi − xj| ≤ 2 with i < j.
```

---

## 💡 Hints

**Hint 1 — Split the absolute value:** Points are sorted by `x`, so for any pair `i < j`, we have `xi < xj`. Therefore `|xi − xj| = xj − xi`. The objective becomes:

```
yi + yj + (xj − xi) = (yi − xi) + (yj + xj)
```

**Hint 2 — Fix the right point j:** For a fixed point `j`, maximize `(yj + xj) + (yi − xi)` subject to `xj − xi ≤ k` (equivalently `xi ≥ xj − k`). The first term is constant for fixed `j`; the second term `(yi − xi)` must be **maximized** over eligible `i`.

**Hint 3 — Sliding window on x:** As `j` advances, the set of valid `i` values forms a window: all points with `x ≥ xj − k`. Points falling behind the window leave permanently — classic Day 9 sliding window on a sorted array.

**Hint 4 — Monotonic deque for window max:** Maintain a **decreasing deque** of `(yi − xi, xi)` values. Before processing `j`, pop from the front while `xj − xi > k`. The front holds the maximum `(yi − xi)` in the valid window. Candidate answer: `(yj + xj) + deque.front().value`.

**Hint 5 — Capstone composition:** Sort is given. Transform eliminates absolute value. Window shrinks from the left. Deque gives O(1) amortized max — three patterns (algebraic insight + Day 9 window + Day 17 deque) in one O(n) pass after sort.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Algebraic Transformation + Sliding Window + Monotonic Deque (Day 30 meta + Day 9 + Day 17)

**How to identify this from the problem statement:**
- `yi + yj + |xi − xj|` → absolute value on sorted x → algebraic split
- `|xi − xj| ≤ k` → distance constraint → sliding window once x is ordered
- maximize sum of transformed terms → window maximum on `(y − x)`
- Hard + points sorted by x → O(n) after transform, not O(n²) pairs

| Keyword / phrase | What it signals |
|---|---|
| `\|xi − xj\|` with sorted x | Remove abs: `xj − xi` for i < j |
| `≤ k` distance constraint | Left boundary of window on x |
| maximize pair function | Fix one element, optimize the other |
| points sorted by x | Window only moves forward — no re-sort |
| Hard + geometry formula | Transform first — likely deque or heap |

**Why this pattern works:** Sorting fixes the order of x, so the absolute value becomes a simple difference. Fixing `j` reduces the pair problem to "best `i` in window" — exactly what a monotonic deque solves in O(n) total.

**How a strong solver thinks before coding:**
1. *"Sorted by x → |xi − xj| = xj − xi for i < j."*
2. *"Rewrite: (yi − xi) + (yj + xj)."*
3. *"Fix j, maximize (yi − xi) with xi ≥ xj − k."*
4. *"Decreasing deque on (y − x). O(n)."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Check every pair (i, j), verify \|xi − xj\| ≤ k** | O(n²) — TLE on n = 10⁵ |
| **Sort points (already sorted) then nested loops** | Still O(n²) without window |
| **Heap without expiring old points** | Stale i values violate distance constraint |
| **Skip algebraic split, use xi + yi directly** | Absolute value prevents clean decomposition |

**The insight brute force misses:** After the transform, the problem is **not** about pairs at all — it is "for each j, add (yj + xj) to the best (yi − xi) in a sliding window." That is O(n) with a deque.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Max Value of Equation #1499](https://leetcode.com/problems/max-value-of-equation/) | yi + yj + \|xi − xj\| | Algebraic split + deque max |
| [Shortest Subarray with Sum at Least K #862](https://leetcode.com/problems/shortest-subarray-with-sum-at-least-k/) | Prefix sum + sum ≥ k | Deque on prefix mins (variant) |
| [Sliding Window Maximum #239](https://leetcode.com/problems/sliding-window-maximum/) | Fixed-size window max | Pure monotonic deque |
| [Max Consecutive Ones III #1004](https://leetcode.com/problems/max-consecutive-ones-iii/) | Window with budget | Day 9 expand/shrink |

#1499 is the course capstone: transform the formula, then run the deque you learned on Day 17 inside the window you learned on Day 9.

---

## 📖 Walkthrough

```
points = [[1,3],[2,0],[5,1],[6,2]],  k = 2
Transformed value for each point: (y − x)
  (1,3) → 3−1 = 2
  (2,0) → 0−2 = −2
  (5,1) → 1−5 = −4
  (6,2) → 2−6 = −4

Deque stores (y−x, x) in decreasing y−x order.

j=0 (1,3): deque empty, push (2, 1). No pair yet (need i < j).

j=1 (2,0): x=2. Front x=1, 2−1=1 ≤ k → valid.
  candidate = (0+2) + 2 = 4  → ans=4
  Pop back? −2 ≤ 2, push (−2, 2). Deque: [(2,1), (−2,2)]

j=2 (5,1): x=5. Front x=1, 5−1=4 > k → pop (2,1).
  Front x=2, 5−2=3 > k → pop (−2,2). Deque empty.
  Push (−4, 5). No valid i.

j=3 (6,2): x=6. Front x=5, 6−5=1 ≤ k → valid.
  candidate = (2+6) + (−4) = 4  → ans=4

Answer: 4 ✓
```

> 💡 **The insight:** The equation hides a **window maximum**. Transform first; the code is a deque template you already know.

---

## Solution

### C++
```cpp
class Solution {
public:
    int findMaxValueOfEquation(vector<vector<int>>& points, int k) {
        deque<pair<int, int>> dq; // (y - x, x), decreasing y-x
        int ans = INT_MIN;

        for (auto& p : points) {
            int x = p[0], y = p[1];

            while (!dq.empty() && x - dq.front().second > k)
                dq.pop_front();

            if (!dq.empty())
                ans = max(ans, y + x + dq.front().first);

            while (!dq.empty() && dq.back().first <= y - x)
                dq.pop_back();

            dq.push_back({y - x, x});
        }
        return ans == INT_MIN ? -1 : ans;
    }
};
```

### Python
```python
class Solution:
    def findMaxValueOfEquation(self, points: list[list[int]], k: int) -> int:
        from collections import deque

        dq = deque()  # (y - x, x), decreasing y - x
        ans = float('-inf')

        for x, y in points:
            while dq and x - dq[0][1] > k:
                dq.popleft()

            if dq:
                ans = max(ans, y + x + dq[0][0])

            while dq and dq[-1][0] <= y - x:
                dq.pop()

            dq.append((y - x, x))

        return ans if ans != float('-inf') else -1
```

### Java
```java
class Solution {
    public int findMaxValueOfEquation(int[][] points, int k) {
        Deque<int[]> dq = new ArrayDeque<>(); // {y - x, x}
        int ans = Integer.MIN_VALUE;

        for (int[] p : points) {
            int x = p[0], y = p[1];

            while (!dq.isEmpty() && x - dq.peekFirst()[1] > k)
                dq.pollFirst();

            if (!dq.isEmpty())
                ans = Math.max(ans, y + x + dq.peekFirst()[0]);

            while (!dq.isEmpty() && dq.peekLast()[0] <= y - x)
                dq.pollLast();

            dq.offerLast(new int[]{y - x, x});
        }
        return ans == Integer.MIN_VALUE ? -1 : ans;
    }
}
```

**Complexity:** O(n) time · O(n) space for deque

---

## 💭 What Should Have Clicked in Your Mind?

Before you opened your editor, these thoughts should have fired:

- **"yi + yj + |xi − xj|"** → Split abs on sorted x → `(yi − xi) + (yj + xj)`.
- **"|xi − xj| ≤ k"** → Window on x — Day 9 sliding window.
- **"Maximize over i for fixed j"** → Monotonic deque on `(y − x)` — Day 17.
- **Capstone** → Three patterns, one pass. Transform before code.

If you tried all pairs, you found O(n²). The signal was absolute value + distance constraint + sorted x — algebraic insight unlocks the deque.

> 🎯 **Pattern:** Algebraic transform → sliding window → monotonic deque max. The entire course in one problem.

---

*Next: checkpoint — then the S-Rank Final Test. →*
