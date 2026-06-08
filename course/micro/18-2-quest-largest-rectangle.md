# ⚔ Quest: Largest Rectangle in Histogram

> **Day 18** · [Largest Rectangle in Histogram #84](https://leetcode.com/problems/largest-rectangle-in-histogram/) · Hard · 35 XP · 25 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Largest Rectangle in Histogram on LeetCode](https://leetcode.com/problems/largest-rectangle-in-histogram/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen, paper, or your editor. The hints and walkthrough below are for *after* your attempt.

---

## The Problem

Given an array of integers `heights` representing the histogram's bar heights (width of each bar is 1), return the **area of the largest rectangle** in the histogram.

```
Input:  heights = [2, 1, 5, 6, 2, 3]
Output: 10
        (rectangle of height 5, width 2 — bars at indices 2 and 3)

Input:  heights = [2, 4]
Output: 4

Input:  heights = [6, 2, 5, 4, 5, 1, 6]
Output: 12
```

---

## 💡 Hints

**Hint 1 — Brute force shape:** For each bar `i`, the largest rectangle with `heights[i]` as the shortest bar extends left until a shorter bar and right until a shorter bar. That's O(n²) — can you find both boundaries in one pass?

**Hint 2 — Stack type:** Use an **increasing** monotonic stack (heights grow toward the top). When `heights[i]` is **shorter** than the bar on top, the top bar has found its right boundary at `i`.

**Hint 3 — Pop formula:** When you pop index `h`:
```
right = i
left  = stack.top() after pop (or -1 if empty)
width = right - left - 1
area  = heights[h] × width
```

**Hint 4 — Sentinel:** Append `0` to the end of `heights`. The sentinel is shorter than every bar, forcing all remaining stack entries to pop and compute their areas.

**Hint 5 — Day 6 connection:** Container With Most Water picks two walls. Here one bar **is** the wall height, and the stack tells you how far it stretches before a shorter bar stops it — same "shorter boundary closes the window" instinct.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Monotonic Increasing Stack — Histogram Rectangle

**How to identify this from the problem statement:**
- "histogram" + "largest rectangle" → each bar as minimum height, maximize width
- width 1 per bar → boundaries are index distances
- Hard classic → stack, not nested expansion

| Keyword / phrase | What it signals |
|---|---|
| "largest rectangle in histogram" | Increasing stack + pop area |
| "bar width is 1" | Width = index difference |
| "non-negative integers" | Standard histogram; sentinel 0 works |
| area depends on **minimum** height in range | Popped bar is the min — width from boundaries |

**Why this pattern works:** The stack keeps indices of bars in increasing height order. A shorter bar at `i` means every taller bar on top can't extend past `i` — pop each, compute its max rectangle at that moment.

**How a strong solver thinks before coding:**
1. *"Histogram max rectangle → increasing stack, pop on shorter newcomer."*
2. *"On pop: width = i - left - 1, area = height × width."*
3. *"Append 0 sentinel to flush the stack. Track global max."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **For each bar, expand left and right until shorter** | O(n²) — 10⁵ bars times out |
| **Decreasing stack (next greater logic)** | Finds greater neighbors — wrong boundary for width |
| **Skip sentinel 0** | Bars on stack never get a right boundary — undercount area |
| **width = i - h instead of i - left - 1** | Off-by-one — left boundary is stack top after pop, not popped index |
| **Compute area before pop** | Lose the top index — pop first (or save it), then read left from new top |

**The insight brute force misses:** When bar `i` arrives shorter than the stack top, the top's right boundary is locked at `i`. The stack top *after* popping is its left boundary. Both come free — no leftward scan.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Largest Rectangle in Histogram #84](https://leetcode.com/problems/largest-rectangle-in-histogram/) | 1D histogram | Increasing stack + pop area |
| [Maximal Rectangle #85](https://leetcode.com/problems/maximal-rectangle/) | 2D binary matrix | Each row → histogram, run #84 |
| [Trapping Rain Water #42](https://leetcode.com/problems/trapping-rain-water/) | Volume, not area | Decreasing stack, layer fill |
| [Sum of Subarray Minimums #907](https://leetcode.com/problems/sum-of-subarray-minimums/) | Sum of mins | Previous + next smaller per index |

Today's quest is the **core engine** — #85 (checkpoint) calls this function on every row.

---

## 📖 Walkthrough

```
heights = [2, 1, 5, 6, 2, 3, 0]   ← sentinel 0 appended
maxArea = 0
stack = []

i=0 (h=2): push 0                 stack=[0]
i=1 (h=1): 1 < 2 → pop 0
           left=-1, w=1-(-1)-1=1, area=2×1=2, max=2
           push 1                  stack=[1]
i=2 (h=5): push 2                 stack=[1,2]
i=3 (h=6): push 3                 stack=[1,2,3]
i=4 (h=2): 2 < 6 → pop 3
           left=2, w=4-2-1=1, area=6×1=6, max=6
           2 < 5 → pop 2
           left=1, w=4-1-1=2, area=5×2=10, max=10 ✓
           2 > 1 → push 4          stack=[1,4]
i=5 (h=3): push 5                 stack=[1,4,5]
i=6 (h=0): sentinel — pop all:
           pop 5: left=4, w=1, area=3
           pop 4: left=1, w=4, area=8
           pop 1: left=-1, w=6, area=6

maxArea = 10 ✓
```

> 💡 **The insight:** Bar at index 2 (height 5) gets popped when index 4 (height 2) arrives. Its width stretches from index 2 to 3 — two bars, area 10. The stack knew the left boundary (index 1, height 1) without scanning left.

---

## Solution

### C++
```cpp
class Solution {
public:
    int largestRectangleArea(vector<int>& heights) {
        heights.push_back(0);
        vector<int> stack;
        int maxArea = 0;

        for (int i = 0; i < (int)heights.size(); i++) {
            while (!stack.empty() && heights[i] < heights[stack.back()]) {
                int h = stack.back();
                stack.pop_back();
                int left = stack.empty() ? -1 : stack.back();
                int width = i - left - 1;
                maxArea = max(maxArea, h * width);
            }
            stack.push_back(i);
        }
        return maxArea;
    }
};
```

### Python
```python
class Solution:
    def largestRectangleArea(self, heights: list[int]) -> int:
        heights.append(0)
        stack = []
        max_area = 0

        for i in range(len(heights)):
            while stack and heights[i] < heights[stack[-1]]:
                h = stack.pop()
                left = stack[-1] if stack else -1
                width = i - left - 1
                max_area = max(max_area, h * width)
            stack.append(i)

        return max_area
```

### Java
```java
class Solution {
    public int largestRectangleArea(int[] heights) {
        int n = heights.length;
        int[] extended = new int[n + 1];
        System.arraycopy(heights, 0, extended, 0, n);
        extended[n] = 0;

        Deque<Integer> stack = new ArrayDeque<>();
        int maxArea = 0;

        for (int i = 0; i < extended.length; i++) {
            while (!stack.isEmpty() && extended[i] < extended[stack.peek()]) {
                int h = stack.pop();
                int left = stack.isEmpty() ? -1 : stack.peek();
                int width = i - left - 1;
                maxArea = Math.max(maxArea, h * width);
            }
            stack.push(i);
        }
        return maxArea;
    }
}
```

**Complexity:** O(n) time · O(n) space

---

## 💭 What Should Have Clicked in Your Mind?

Before you opened your editor, these thoughts should have fired:

- **"Largest rectangle in histogram"** → Increasing stack — Day 18 pop-area formula.
- **Each bar as minimum height** → Width = distance between next smaller on left and right.
- **Sentinel 0** → Forces final pops — without it, bars on the stack have no right boundary.
- **Decreasing stack** → That's Day 17 next greater — wrong tool for this problem.

If you expanded left and right from every bar, you found O(n²). The signal was "histogram" + "largest rectangle" — monotonic increasing stack with sentinel.

> 🎯 **Pattern:** Increasing stack. Shorter bar closes taller bars' windows. Pop computes `height × width`.

---

*Next: trapped water — stack layers vs Day 6 two pointers. →*
