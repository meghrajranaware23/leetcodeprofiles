# ⚔ Quest: Rotate Image

> **Day 19** · [Rotate Image #48](https://leetcode.com/problems/rotate-image/) · Medium · 45 XP · 15 min

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open Rotate Image on LeetCode](https://leetcode.com/problems/rotate-image/)**

> ⚔ **Hunter's rule:** Spend at least 5 minutes with pen, paper, or your editor. The hints and walkthrough below are for *after* your attempt.

---

## The Problem

You are given an `n × n` 2D matrix representing an image. Rotate the image **90 degrees clockwise in-place**.

```
Input:  matrix = [[1,2,3],[4,5,6],[7,8,9]]
Output: [[7,4,1],[8,5,2],[9,6,3]]

Input:  matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]
Output: [[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]
```

You must modify `matrix` directly. Do not allocate another matrix.

---

## 💡 Hints

90° clockwise rotation equals two operations you already know from 1D arrays:

1. **Transpose** — swap `matrix[i][j]` with `matrix[j][i]` for `i < j`
2. **Reverse each row** — same as reversing a 1D array (Day 1)

For counter-clockwise 90°: transpose, then reverse each **column** (or reverse rows first, then transpose).

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Transpose + Reverse (In-Place Matrix Transform)

**How to identify this from the problem statement:**
- "rotate image 90°" → matrix transform, not spiral walk
- "in-place" / "n × n" → no extra grid — transpose + reverse uses O(1) extra
- "clockwise" → transpose then reverse rows

| Keyword / phrase | What it signals |
|---|---|
| "rotate 90 degrees clockwise" | Transpose + reverse each row |
| "in-place" | Two-pass transform, no copy matrix |
| "square matrix" n × n | Transpose works on square grids |
| "image" / "2D matrix" | Row/column operations |

**Why this pattern works:** Transpose reflects across the main diagonal (rows become columns). Reversing each row flips horizontally. Together they produce a 90° clockwise rotation — provable by tracking where `matrix[i][j]` lands.

**How a strong solver thinks before coding:**
1. *"90° clockwise in-place → transpose + reverse rows."*
2. *"Transpose: only swap i < j to avoid double-swap."*
3. *"Reverse row: two pointers left/right — Day 1 skill."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Allocate new n × n matrix, fill with formula** | O(n²) extra space — violates in-place constraint |
| **Rotate four cells at a time in concentric rings** | Correct and O(1) space, but index math is error-prone |
| **Transpose then reverse columns instead of rows for clockwise** | Wrong direction — that's counter-clockwise |
| **Swap matrix[i][j] with matrix[j][i] for all i, j** | Double-swaps undo the transpose |

**The insight brute force misses:** Rotation decomposes into transpose (2D) + reverse (1D). You don't need a ring-rotation formula — two familiar operations compose perfectly.

---

## 🔗 Same Pattern, Other Problems

| Problem | What changes | Pattern stays the same |
|---|---|---|
| [Rotate Image #48](https://leetcode.com/problems/rotate-image/) | 90° clockwise, in-place | Transpose + reverse rows |
| [Transpose Matrix #867](https://leetcode.com/problems/transpose-matrix/) | Return transposed copy | Transpose step alone |
| [Spiral Matrix #54](https://leetcode.com/problems/spiral-matrix/) | Read in spiral order | Layer traversal (different op) |
| [Rotate Array #189](https://leetcode.com/problems/rotate-array/) | 1D rotation by k | Reverse subarrays trick (Day 1 cousin) |

Rotate Array (#189) uses reverse on a 1D array to rotate by k. Today's problem is the 2D version of "reverse transforms position."

---

## 📖 Walkthrough

```
matrix = [
  [ 1,  2,  3 ],
  [ 4,  5,  6 ],
  [ 7,  8,  9 ]
]

Step 1 — Transpose (swap across diagonal):
  swap (0,1)↔(1,0): 2↔4
  swap (0,2)↔(2,0): 3↔7
  swap (1,2)↔(2,1): 6↔8

  [ 1,  4,  7 ]
  [ 2,  5,  8 ]
  [ 3,  6,  9 ]

Step 2 — Reverse each row:
  row 0: [1,4,7] → [7,4,1]
  row 1: [2,5,8] → [8,5,2]
  row 2: [3,6,9] → [9,6,3]

  [ 7,  4,  1 ]
  [  8,  5,  2 ]
  [  9,  6,  3 ] ✓
```

> 💡 **The insight:** Track one cell: `(0,1)` value `2` → after transpose `(1,0)`, after row reverse `(1,2)`. That's exactly where `2` lands in a 90° clockwise rotation of a 3×3 matrix.

---

## Solution

### C++
```cpp
class Solution {
public:
    void rotate(vector<vector<int>>& matrix) {
        int n = matrix.size();

        for (int i = 0; i < n; i++)
            for (int j = i + 1; j < n; j++)
                swap(matrix[i][j], matrix[j][i]);

        for (int i = 0; i < n; i++)
            reverse(matrix[i].begin(), matrix[i].end());
    }
};
```

### Python
```python
class Solution:
    def rotate(self, matrix: list[list[int]]) -> None:
        n = len(matrix)

        for i in range(n):
            for j in range(i + 1, n):
                matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]

        for row in matrix:
            row.reverse()
```

### Java
```java
class Solution {
    public void rotate(int[][] matrix) {
        int n = matrix.length;

        for (int i = 0; i < n; i++)
            for (int j = i + 1; j < n; j++) {
                int temp = matrix[i][j];
                matrix[i][j] = matrix[j][i];
                matrix[j][i] = temp;
            }

        for (int i = 0; i < n; i++) {
            int left = 0, right = n - 1;
            while (left < right) {
                int temp = matrix[i][left];
                matrix[i][left] = matrix[i][right];
                matrix[i][right] = temp;
                left++;
                right--;
            }
        }
    }
}
```

**Complexity:** O(n²) time · O(1) extra space

---

## 💭 What Should Have Clicked in Your Mind?

Before you opened your editor, these thoughts should have fired:

- **"Rotate 90° clockwise in-place"** → Transpose + reverse each row. No extra matrix.
- **"Transpose"** → Swap `matrix[i][j]` with `matrix[j][i]` for `i < j` only.
- **"Reverse row"** → Two pointers from Day 1. Same as reversing a string.
- **Square matrix** → Transpose requires n × n; rectangular transpose is a different problem (#867).

If you allocated a new matrix, you ignored "in-place." The signal was "rotate image" on n × n — compose two operations you already trust.

> 🎯 **Pattern Combo:** 2D transpose + 1D reverse = 90° clockwise rotation. Counter-clockwise? Reverse rows first, then transpose.

---

*Day 19 checkpoint next: build a spiral matrix from scratch. →*
