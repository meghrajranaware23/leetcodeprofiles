# ⚔ Quest: Spiral Matrix

> **Day 19** · [Spiral Matrix #54](https://leetcode.com/problems/spiral-matrix/) · Medium · 35 XP · 15 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Spiral Matrix on LeetCode](https://leetcode.com/problems/spiral-matrix/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen, paper, or your editor. The hints and walkthrough below are for *after* your attempt.

---

## The Problem

Given an `m × n` matrix, return **all elements in spiral order** (clockwise, starting from the top-left corner).

```
Input:  matrix = [[1,2,3],[4,5,6],[7,8,9]]
Output: [1,2,3,6,9,8,7,4,5]

Input:  matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
Output: [1,2,3,4,8,12,11,10,9,5,6,7]

Input:  matrix = [[1]]
Output: [1]
```

---

## 💡 Hints

Maintain four boundaries: `top`, `bottom`, `left`, `right`. Each iteration walks one full layer:

1. Top row left → right, then `top++`
2. Right column top → bottom, then `right--`
3. Bottom row right → left (if `top <= bottom`), then `bottom--`
4. Left column bottom → top (if `left <= right`), then `left++`

Stop when `top > bottom` or `left > right`.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Boundary Shrinking / Spiral Traversal

**How to identify this from the problem statement:**
- "spiral order" → walk four edges, shrink rectangle
- "matrix" / "2D array" → row and column pointers, not a single index
- "clockwise" → fixed direction order: top → right → bottom → left

| Keyword / phrase | What it signals |
|---|---|
| "spiral order" | Four-edge boundary walk |
| "clockwise" | Top row, right col, bottom row, left col |
| "m × n matrix" | Rectangular — inner loops use current boundaries |
| "return elements" | Read and collect, don't modify matrix |

**Why this pattern works:** Each layer visits the outer ring exactly once. Shrinking boundaries guarantees no cell is visited twice. Every cell belongs to exactly one layer.

**How a strong solver thinks before coding:**
1. *"Spiral → four boundaries, peel layers."*
2. *"After top row, check before bottom row — might be same row."*
3. *"Right col starts at top+1 — corner already collected."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Direction array + visited grid** | O(m × n) extra space; turn logic bugs on 1×n or n×1 matrices |
| **Recursive layer peel** | Works but stack depth O(min(m,n)); iterative boundaries are cleaner |
| **Hard-coded cases for each matrix shape** | Doesn't scale — boundary loop handles all shapes uniformly |
| **No guard before bottom/left walks** | Double-counts center row or column on odd-dimension matrices |

**The insight brute force misses:** Spiral order is just four straight line scans on a shrinking box. No direction changes mid-walk — the structure is simpler than it looks.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Spiral Matrix #54](https://leetcode.com/problems/spiral-matrix/) | Read elements in spiral order | Boundary shrinking |
| [Spiral Matrix II #59](https://leetcode.com/problems/spiral-matrix-ii/) | Write 1..n² into spiral positions | Same walk, assign values |
| [Rotate Image #48](https://leetcode.com/problems/rotate-image/) | In-place 90° rotation | Layer thinking (different operation) |
| [Spiral Matrix III #885](https://leetcode.com/problems/spiral-matrix-iii/) | Walk outward on infinite grid | Spiral direction, different setup |

Today's checkpoint previews #59 — same boundary walk, but you **write** instead of read.

---

## 📖 Walkthrough

```
matrix = [
  [ 1,  2,  3,  4 ],
  [ 5,  6,  7,  8 ],
  [ 9, 10, 11, 12 ]
]

top=0, bottom=2, left=0, right=3

Layer 1:
  top row:    1, 2, 3, 4       top → 1
  right col:  8, 12             right → 2
  bottom row: 11, 10, 9         bottom → 1
  left col:   5                 left → 1

Layer 2:
  top row:    6, 7              top → 2
  (top > bottom — stop)

Answer: [1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7] ✓
```

> 💡 **The insight:** Four walks per layer. Guard the bottom and left walks — when the rectangle collapses to a single row or column, the top and right walks already collected everything.

---

## Solution

### C++
```cpp
class Solution {
public:
    vector<int> spiralOrder(vector<vector<int>>& matrix) {
        vector<int> result;
        if (matrix.empty()) return result;

        int top = 0, bottom = matrix.size() - 1;
        int left = 0, right = matrix[0].size() - 1;

        while (top <= bottom && left <= right) {
            for (int j = left; j <= right; j++)
                result.push_back(matrix[top][j]);
            top++;

            for (int i = top; i <= bottom; i++)
                result.push_back(matrix[i][right]);
            right--;

            if (top <= bottom) {
                for (int j = right; j >= left; j--)
                    result.push_back(matrix[bottom][j]);
                bottom--;
            }

            if (left <= right) {
                for (int i = bottom; i >= top; i--)
                    result.push_back(matrix[i][left]);
                left++;
            }
        }
        return result;
    }
};
```

### Python
```python
class Solution:
    def spiralOrder(self, matrix: list[list[int]]) -> list[int]:
        if not matrix:
            return []

        result = []
        top, bottom = 0, len(matrix) - 1
        left, right = 0, len(matrix[0]) - 1

        while top <= bottom and left <= right:
            for j in range(left, right + 1):
                result.append(matrix[top][j])
            top += 1

            for i in range(top, bottom + 1):
                result.append(matrix[i][right])
            right -= 1

            if top <= bottom:
                for j in range(right, left - 1, -1):
                    result.append(matrix[bottom][j])
                bottom -= 1

            if left <= right:
                for i in range(bottom, top - 1, -1):
                    result.append(matrix[i][left])
                left += 1

        return result
```

### Java
```java
class Solution {
    public List<Integer> spiralOrder(int[][] matrix) {
        List<Integer> result = new ArrayList<>();
        if (matrix.length == 0) return result;

        int top = 0, bottom = matrix.length - 1;
        int left = 0, right = matrix[0].length - 1;

        while (top <= bottom && left <= right) {
            for (int j = left; j <= right; j++)
                result.add(matrix[top][j]);
            top++;

            for (int i = top; i <= bottom; i++)
                result.add(matrix[i][right]);
            right--;

            if (top <= bottom) {
                for (int j = right; j >= left; j--)
                    result.add(matrix[bottom][j]);
                bottom--;
            }

            if (left <= right) {
                for (int i = bottom; i >= top; i--)
                    result.add(matrix[i][left]);
                left++;
            }
        }
        return result;
    }
}
```

**Complexity:** O(m × n) time · O(1) extra space (output array excluded)

---

## 💭 What Should Have Clicked in Your Mind?

Before you opened your editor, these thoughts should have fired:

- **"Spiral order"** → Four boundaries, peel one layer at a time.
- **"Clockwise"** → Top → right → bottom → left. Fixed order every layer.
- **Guard checks** → After top row, `top` and `bottom` may meet — don't walk bottom row twice.
- **Skip corners** → Right col starts at `top+1`; left col ends at `top`.

If you used a visited grid, you used O(m × n) extra space unnecessarily. The signal was "spiral" — boundary shrinking visits each cell once with four integers.

> 🎯 **Pattern Unlocked:** Spiral = four straight walks on a shrinking rectangle. Same skeleton powers Spiral Matrix II (#59).

---

*Next: rotate a square matrix 90° in-place — transpose meets reverse. →*
