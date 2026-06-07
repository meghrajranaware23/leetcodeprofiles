# ⚔ Quest: Container With Most Water

> **Day 6** · [Container With Most Water #11](https://leetcode.com/problems/container-with-most-water/) · Medium · 20 XP · 15 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Container With Most Water on LeetCode](https://leetcode.com/problems/container-with-most-water/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen, paper, or your editor. The hints and walkthrough below are for *after* your attempt.

---

## The Problem

Given `n` non-negative integers `height` where each represents a vertical line, find two lines that together with the x-axis form a container that holds the **maximum amount of water**. Return that maximum.

```
Input:  height = [1, 8, 6, 2, 5, 4, 8, 3, 7]
Output: 49
        (lines at index 1 and 8: min(8, 7) × 7 = 49)

Input:  height = [1, 1]
Output: 1
```

The amount of water is: `min(height[left], height[right]) × (right - left)`

---

## 💡 Hints

Brute force checks every pair — O(n²). Start with the **widest** container: `left = 0`, `right = n - 1`.

After computing the area, which pointer should move? Try moving the **shorter** line inward. Why can't keeping the shorter line and shrinking width ever beat what you already have?

Track `maxArea` across every step.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Converging Two Pointers (Optimization / Greedy Move)

**How to identify this from the problem statement:**
- "two lines" + "maximum" → search over pairs, but prune intelligently
- area depends on **width** `(R - L)` and **bounded height** `min(h[L], h[R])`
- not sorted by value — but converging pointers still work with a **greedy move rule**

| Keyword / phrase | What it signals |
|---|---|
| "maximum area" / "most water" | Track best answer while scanning |
| "two lines" / "two indices" | Pair defined by left and right boundaries |
| "together with the x-axis" | Area = min(height) × width |
| "non-negative integers" | Standard two-pointer setup, no negatives edge case |

**Why this pattern works:** Width only shrinks as pointers move inward. If you keep the shorter line fixed and move the other pointer, width decreases and height is still capped by the shorter line — area cannot improve. Moving the shorter line is the only move that might find a taller boundary.

**How a strong solver thinks before coding:**
1. *"Maximize a function over pairs → start wide, converge inward."*
2. *"Area = min × width. Width shrinks every step."*
3. *"Move the shorter side — the taller side is the bottleneck we might replace."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Nested loops over all (i, j) pairs** | O(n²) — two pointers reduce to O(n) |
| **Move the taller pointer inward** | Misses the proof: shorter side is the limiting height — keeping it while width shrinks can't help |
| **Sort the heights and use pair-sum logic** | Destroys index positions — area needs original indices for width |
| **Only track max height, ignore width** | A tall narrow container can lose to a moderate wide one |

**The insight brute force misses:** You don't need to evaluate every pair. When `h[L] < h[R]`, every container using `L` as the left boundary with `R' < R` has **less width** and **height still capped by h[L]** — so none can beat the current area. Safe to advance `L`.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Two Sum II #167](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/) | Hunt exact sum, not max area | Converge with sum-based move rule |
| [Trapping Rain Water #42](https://leetcode.com/problems/trapping-rain-water/) | Water trapped between bars | Two pointers + track max from each side (C-Rank) |
| [3Sum #15](https://leetcode.com/problems/3sum/) | Three indices, avoid duplicates | Fix one + converge on sorted remainder |
| [Valid Palindrome II #680](https://leetcode.com/problems/valid-palindrome-ii/) | Compare with one allowed skip | Converge + branch on mismatch (Day 6 checkpoint) |

Same skeleton: **two boundaries, one move rule, eliminate dead search space each step**.

---

## 📖 Walkthrough

`height = [1, 8, 6, 2, 5, 4, 8, 3, 7]`

```
Step 1:  L=0, R=8
         [1, 8, 6, 2, 5, 4, 8, 3, 7]
          L                          R
         area = min(1, 7) × 8 = 8    maxArea = 8
         h[L] < h[R] → move L

Step 2:  L=1, R=8
         [1, 8, 6, 2, 5, 4, 8, 3, 7]
             L                      R
         area = min(8, 7) × 7 = 49   maxArea = 49
         h[L] > h[R] → move R

Step 3:  L=1, R=7
         [1, 8, 6, 2, 5, 4, 8, 3, 7]
             L                   R
         area = min(8, 3) × 6 = 18  maxArea = 49
         h[L] > h[R] → move R

... continue until L >= R ...
```

> 💡 **The insight:** The first step already finds the answer (49). Later steps confirm no wider+taller combo beats it. You evaluated O(n) candidates instead of O(n²).

---

## Solution

### C++
```cpp
class Solution {
public:
    int maxArea(vector<int>& height) {
        int left = 0, right = height.size() - 1;
        int maxArea = 0;
        while (left < right) {
            int h = min(height[left], height[right]);
            int w = right - left;
            maxArea = max(maxArea, h * w);
            if (height[left] < height[right]) {
                left++;
            } else {
                right--;
            }
        }
        return maxArea;
    }
};
```

### Python
```python
class Solution:
    def maxArea(self, height: list[int]) -> int:
        left, right = 0, len(height) - 1
        max_area = 0
        while left < right:
            h = min(height[left], height[right])
            w = right - left
            max_area = max(max_area, h * w)
            if height[left] < height[right]:
                left += 1
            else:
                right -= 1
        return max_area
```

### Java
```java
class Solution {
    public int maxArea(int[] height) {
        int left = 0, right = height.length - 1;
        int maxArea = 0;
        while (left < right) {
            int h = Math.min(height[left], height[right]);
            int w = right - left;
            maxArea = Math.max(maxArea, h * w);
            if (height[left] < height[right]) {
                left++;
            } else {
                right--;
            }
        }
        return maxArea;
    }
}
```

**Complexity:** O(n) time · O(1) space

---

## 💭 What Should Have Clicked in Your Mind?

Before writing code, a strong solver's internal monologue sounds like this:

- **"Two boundaries, maximize a function"** → Start at widest window, converge inward.
- **"Area = min height × width"** → Width only decreases. I need a reason to abandon the current shorter line.
- **"Move the shorter line"** → It's the bottleneck. Maybe a taller line inward beats the current max.
- **"Same pointer skeleton as Two Sum II"** → Different move rule, same `while left < right` engine.

If you tried brute force or moved the taller pointer, that's a common trap. The breakthrough is the **greedy proof** — not memorizing the formula.

> 🎯 **Pattern Unlocked:** Converging two pointers for optimization. Pair-sum moves on sum compare; area problems move the shorter boundary.

---

*Two quests down. The checkpoint tests whether you can pick the right move rule on unseen problems. →*
