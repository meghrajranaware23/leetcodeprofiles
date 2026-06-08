# ⚔ Quest: Trapping Rain Water

> **Day 18** · [Trapping Rain Water #42](https://leetcode.com/problems/trapping-rain-water/) · Hard · 45 XP · 25 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Trapping Rain Water on LeetCode](https://leetcode.com/problems/trapping-rain-water/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen, paper, or your editor. The hints and walkthrough below are for *after* your attempt.

---

## The Problem

Given `n` non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.

```
Input:  height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]
Output: 6

Input:  height = [4, 2, 0, 3, 2, 5]
Output: 9
```

Water can only be trapped between walls — it fills up to the **shorter** of the tallest walls on its left and right.

---

## 💡 Hints

**Hint 1 — Two pointers (D-Rank / Day 6):** `left = 0`, `right = n - 1`. Track `leftMax` and `rightMax`. Move the pointer at the **shorter max** side inward. Water at that side = `max(0, sideMax - height[side])`. O(n) time, O(1) space.

**Hint 2 — Monotonic stack (Day 17–18):** Decreasing stack of indices. When `height[i] > height[stack.top()]`, a valley opens — pop the bottom and compute a **horizontal water layer** between the popped bar, the new stack top, and `i`.

**Hint 3 — Stack layer formula:** After popping `mid`:
```
if stack not empty:
    water += (min(height[i], height[stack.top()]) - height[mid]) × (i - stack.top() - 1)
```

**Hint 4 — Which approach?** Both are O(n). Two pointers connect to Container With Most Water (Day 6). Stack connects to Daily Temperatures (Day 17). Know both — this quest teaches the stack; the walkthrough compares both.

**Hint 5 — Not brute force:** Precomputing `leftMax[]` and `rightMax[]` arrays works in O(n) time O(n) space — valid, but two pointers do it with O(1) extra space.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Monotonic Decreasing Stack — Layer Fill (or Two Pointers — Min of Maxes)

**How to identify this from the problem statement:**
- "trap water" / "elevation map" → water bounded by walls on both sides
- each bar width 1 → volume = height × width of trapped layer
- Hard classic with two O(n) solutions — pattern recognition matters

| Keyword / phrase | What it signals |
|---|---|
| "trap rain water" / "elevation map" | Stack layers OR two-pointer min(maxLeft, maxRight) |
| "non-negative integers" | Water depth never negative |
| "width of each bar is 1" | Layer width = index gap |
| "how much water" | Sum of trapped volumes |

**Why this pattern works:**
- **Stack:** Fills water in horizontal slabs when a taller bar closes a valley.
- **Two pointers:** Water at a position is `min(leftMax, rightMax) - height[i]` — move the side with smaller max because the smaller max is the bottleneck.

**How a strong solver thinks before coding:**
1. *"Trapped water → two pointers with leftMax/rightMax (Day 6 family), or decreasing stack layers."*
2. *"Move shorter max pointer — same bottleneck logic as Container."*
3. *"Stack: pop valley bottom when taller bar arrives, add layer volume."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **For each index, scan left for max, scan right for max** | O(n²) — precompute or two pointers fix this |
| **Only track one global max** | Water at index i depends on max to **both** sides, not global peak |
| **Increasing stack (histogram style)** | Computes rectangles, not trapped volume |
| **Sum height without subtracting bar** | Must subtract `height[mid]` — bar displaces water |

**The insight brute force misses:** You don't need the exact tallest wall on both sides — only the **minimum of the two side maxes** bounds the water. Two pointers maintain that bottleneck in one pass.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Trapping Rain Water #42](https://leetcode.com/problems/trapping-rain-water/) | 1D elevation | Stack layers or two pointers |
| [Container With Most Water #11](https://leetcode.com/problems/container-with-most-water/) | Maximize area, not water | Two pointers, move shorter (Day 6) |
| [Trapping Rain Water II #407](https://leetcode.com/problems/trapping-rain-water-ii/) | 3D grid | Priority queue / BFS (A-Rank) |
| [Largest Rectangle in Histogram #84](https://leetcode.com/problems/largest-rectangle-in-histogram/) | Max rectangle | Increasing stack (Day 18 quest 1) |

#42 is the capstone where Day 6 pointers and Day 17–18 stacks meet.

---

## 📖 Walkthrough

### Approach A — Two Pointers (Day 6 family)

```
height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]

left=0, right=11, leftMax=0, rightMax=1, water=0

L=0: leftMax=0, h=0 → water+=0, left=1
L=1: leftMax=1, h=1 → water+=0, left=2
L=2: leftMax=1, h=0 → water+=1, left=3   (bottleneck leftMax=1)
...
(continue moving shorter-max side)

Final water = 6 ✓
```

**Why move shorter max?** If `leftMax < rightMax`, water at `left` is capped by `leftMax` regardless of what's further right — safe to process and advance `left`.

### Approach B — Monotonic Stack (Day 17–18)

```
height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]
water = 0, stack = []

i=0 (0): push 0                     stack=[0]
i=1 (1): 1 > 0 → pop 0, stack empty → no layer
         push 1                     stack=[1]
i=2 (0): push 2                     stack=[1,2]
i=3 (2): 2 > 0 → pop 2 (mid), top=1
         layer = (min(2,1) - 0) × (3-1-1) = 1 × 1 = 1
         water = 1
         push 3                     stack=[1,3]
i=4 (1): push 4                     stack=[1,3,4]
i=5 (0): push 5                     stack=[1,3,4,5]
i=6 (1): 1 > 0 → pop 5 (mid), top=4
         layer = (min(1,1) - 0) × (6-4-1) = 1 × 1 = 1
         water = 2
         push 6                     stack=[1,3,4,6]
i=7 (3): 3 > 1 → pop 6, layer with top=4: (min(3,1)-1)×1 = 0
         3 > 1 → pop 4, layer with top=3: (min(3,2)-1)×3 = 2×3 = 6
         water = 8
         push 7                     stack=[1,3,7]
...continues until all basins filled...

Final water = 6 ✓
```

> 💡 **The insight:** Two pointers — water at each position is `min(leftMax, rightMax) - height[i]`. Stack — each pop fills a horizontal basin slab between the new top and current bar. Same total, different decomposition.

---

## Solution

### C++ — Two Pointers
```cpp
class Solution {
public:
    int trap(vector<int>& height) {
        int left = 0, right = height.size() - 1;
        int leftMax = 0, rightMax = 0, water = 0;

        while (left < right) {
            if (height[left] < height[right]) {
                leftMax = max(leftMax, height[left]);
                water += leftMax - height[left];
                left++;
            } else {
                rightMax = max(rightMax, height[right]);
                water += rightMax - height[right];
                right--;
            }
        }
        return water;
    }
};
```

### C++ — Monotonic Stack
```cpp
class Solution {
public:
    int trap(vector<int>& height) {
        vector<int> stack;
        int water = 0;

        for (int i = 0; i < (int)height.size(); i++) {
            while (!stack.empty() && height[i] > height[stack.back()]) {
                int mid = stack.back();
                stack.pop_back();
                if (stack.empty()) break;
                int left = stack.back();
                int h = min(height[i], height[left]) - height[mid];
                int w = i - left - 1;
                water += h * w;
            }
            stack.push_back(i);
        }
        return water;
    }
};
```

### Python — Two Pointers
```python
class Solution:
    def trap(self, height: list[int]) -> int:
        left, right = 0, len(height) - 1
        left_max = right_max = water = 0

        while left < right:
            if height[left] < height[right]:
                left_max = max(left_max, height[left])
                water += left_max - height[left]
                left += 1
            else:
                right_max = max(right_max, height[right])
                water += right_max - height[right]
                right -= 1

        return water
```

### Python — Monotonic Stack
```python
class Solution:
    def trap(self, height: list[int]) -> int:
        stack = []
        water = 0

        for i in range(len(height)):
            while stack and height[i] > height[stack[-1]]:
                mid = stack.pop()
                if not stack:
                    break
                left = stack[-1]
                h = min(height[i], height[left]) - height[mid]
                w = i - left - 1
                water += h * w
            stack.append(i)

        return water
```

### Java — Two Pointers
```java
class Solution {
    public int trap(int[] height) {
        int left = 0, right = height.length - 1;
        int leftMax = 0, rightMax = 0, water = 0;

        while (left < right) {
            if (height[left] < height[right]) {
                leftMax = Math.max(leftMax, height[left]);
                water += leftMax - height[left];
                left++;
            } else {
                rightMax = Math.max(rightMax, height[right]);
                water += rightMax - height[right];
                right--;
            }
        }
        return water;
    }
}
```

### Java — Monotonic Stack
```java
class Solution {
    public int trap(int[] height) {
        Deque<Integer> stack = new ArrayDeque<>();
        int water = 0;

        for (int i = 0; i < height.length; i++) {
            while (!stack.isEmpty() && height[i] > height[stack.peek()]) {
                int mid = stack.pop();
                if (stack.isEmpty()) break;
                int left = stack.peek();
                int h = Math.min(height[i], height[left]) - height[mid];
                int w = i - left - 1;
                water += h * w;
            }
            stack.push(i);
        }
        return water;
    }
}
```

**Complexity:** O(n) time · O(1) space (two pointers) or O(n) space (stack)

---

## 💭 What Should Have Clicked in Your Mind?

Before you opened your editor, these thoughts should have fired:

- **"Trap rain water"** → Two pointers (Day 6) OR decreasing stack (Day 17–18).
- **Water bounded by shorter wall** → Move pointer at shorter max — Container bottleneck logic.
- **Stack variant** → Pop valley floor when taller bar arrives; fill horizontal layer.
- **Precompute leftMax/rightMax arrays** → Valid O(n), but two pointers save O(n) space.

If you nested left/right scans per index, you found O(n²). The signal was "elevation map" + "trap water" — converging pointers with max tracking, or monotonic stack layers.

> 🎯 **Pattern Combo:** Day 6 two pointers (move shorter max) + Day 18 stack (layer fill). Two names, one bottleneck principle.

---

*Day 18 checkpoint: stack meets 2D — maximal rectangle in a matrix. →*
