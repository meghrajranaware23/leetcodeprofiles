# ⚔ B-Rank Test — Problem 1

> [Maximal Rectangle #85](https://leetcode.com/problems/maximal-rectangle/) · **Hard** · 200 XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it for **at least 15 minutes** before revealing hints or solutions.

**[→ Open Maximal Rectangle on LeetCode](https://leetcode.com/problems/maximal-rectangle/)**

> ⚔ **Hunter's rule:** This is a rank test — treat it like real LeetCode practice. No peeking until you've genuinely tried.

> 🔥 **This is your first Hard problem in B-Rank.** Hard here means stacking patterns: turn each matrix row into a histogram, then run a monotonic stack on every row.

---

## The Problem

Given a `rows × cols` binary matrix `matrix` filled with `0`'s and `1`'s, find the **largest rectangle** containing only `1`'s and return its area.

```
Input:  matrix = [["1","0","1","0","0"],
                  ["1","0","1","1","1"],
                  ["1","1","1","1","1"],
                  ["1","0","0","1","0"]]
Output: 6
Explanation: The maximal rectangle is shown in the highlighted area (2 rows × 3 cols).

Input:  matrix = [["0"]]
Output: 0

Input:  matrix = [["1"]]
Output: 1
```

---

## 💡 Hints

> 🎯 **What's being tested:** Monotonic stack (Day 18) applied **row-by-row** to a matrix — each row becomes a histogram, and the stack finds the largest rectangle in that histogram.

**Hint 1 — Row histograms:** Treat each row as the base of a histogram. `heights[j]` = number of consecutive `1`'s ending at the current row in column `j`. When `matrix[i][j] == '0'`, reset `heights[j] = 0`; otherwise `heights[j]++`.

**Hint 2 — Largest rectangle in histogram:** For one histogram, use a **monotonic increasing stack** of indices. When you see a bar shorter than the stack top, pop and compute area: `height = heights[popped] × width` where width extends from the new stack top + 1 to current index − 1.

**Hint 3 — Sentinel bars:** Append `0` to `heights` (or process a final flush) so every bar on the stack gets popped and its area computed. Without a flush, bars that stay increasing never get evaluated.

**Hint 4 — Track global max:** Run the histogram stack on **every row** after updating `heights`. The answer is the maximum area across all rows — you are not looking for one rectangle in one row, but the best rectangle anywhere in the matrix.

**Hint 5 — Edge cases:** All zeros → `0`. Single `1` → `1`. Wide single-row of ones → area = row length. The stack handles variable widths automatically via index boundaries.

---

## 🔍 Pattern Recognition Breakdown

**Pattern used:** Histogram Monotonic Stack × Matrix Row Reduction (Day 18 + Day 19)

| Clue in the problem | What it signals |
|---|---|
| "largest rectangle" in a grid of `0`/`1` | Histogram area problem — not brute-force every rectangle |
| binary matrix / consecutive `1`'s | Build running column heights row by row |
| Hard + 2D structure | Reduce 2D → 1D histogram, reuse a known O(n) stack pattern |
| "containing only 1's" | Heights only grow while `1`'s stack vertically; `0` breaks the bar |
| O(rows × cols) expected | One stack pass per row → O(rows × cols) total |

**How to identify from the statement:** "Maximal rectangle in binary matrix" → **don't enumerate all rectangles**. Convert each row to a histogram and run **largest rectangle in histogram** with a monotonic stack.

**How a strong solver thinks before coding:**
1. *"Rectangle of 1's → fixed height per row segment, variable width → histogram."*
2. *"Each row extends column heights → O(cols) update per row."*
3. *"Largest rectangle in histogram → increasing stack, pop on shorter bar."*
4. *"Global max across all rows → final answer."*

---

## ❌ Why Brute Force Fails

| Approach | Problem |
|---|---|
| **Check every rectangle (4 nested loops: top, bottom, left, right)** | O(rows² × cols²) — explodes on medium matrices |
| **For every cell, expand in all 4 directions** | Still O(rows² × cols²) in worst case |
| **Run histogram stack only on the last row** | Misses rectangles that don't reach the bottom row |
| **Use decreasing stack instead of increasing** | Computes wrong boundaries — increasing stack finds first shorter bar to left/right |
| **Forget to reset height on `0`** | Ghost bars carry upward and inflate areas incorrectly |

**The insight brute force misses:** A rectangle of `1`'s at a fixed height `h` is exactly a **contiguous segment in a histogram row**. Building histograms incrementally and reusing the stack each row turns an O(n⁴) search into O(rows × cols).

---

## 🎯 Transfer to Unseen Problems

Can you spot histogram-stack thinking without the word "rectangle"?

**Scenario 1:** *"Given an array of bar heights, find the largest rectangular area under the skyline."*

Which pattern? **Largest Rectangle in Histogram** (Day 18). Same monotonic stack — this problem is the core subroutine inside Maximal Rectangle.

**Scenario 2:** *"Given elevation map bars, compute how much rain water is trapped between them."*

Which pattern? **Histogram / trap stack** (Day 18). Monotonic stack, but tracks bounded volume instead of area — same pop-on-shorter-bar mechanic.

**Scenario 3:** *"Given a binary matrix, count the number of maximal square submatrices of all 1's."*

Which pattern? **DP on matrix** (not stack). Squares need equal width and height — different reduction than rectangle histograms.

> **Answer key:** Scenarios 1 and 2 → monotonic stack on heights (Day 18). Scenario 3 → 2D DP. Signal: **"largest rectangle in binary matrix"** → row histograms + stack per row.

---

<details>
<summary><strong>📖 Solution & Walkthrough</strong></summary>

### Step-by-Step Walkthrough

**Idea:** Maintain `heights[j]` = consecutive `1`'s in column `j` up to the current row. After updating heights for row `i`, run largest-rectangle-in-histogram on `heights`.

```
matrix (4×5):
1 0 1 0 0
1 0 1 1 1
1 1 1 1 1
1 0 0 1 0
```

| Row | heights after update | Best rectangle in this histogram | Area |
|-----|---------------------|----------------------------------|------|
| 0 | [1,0,1,0,0] | height 1, width 1 (col 0) | 1 |
| 1 | [2,0,2,1,1] | height 2, width 1 (col 2) | 2 |
| 2 | [3,1,3,2,2] | height 2, width 3 (cols 2–4) | **6** ← global max |
| 3 | [4,0,0,3,0] | height 3, width 1 (col 3) | 3 |

**Row 2 detail (heights = [3,1,3,2,2]):**

Stack processes bars left to right. When bar `1` at index 1 arrives (shorter than stack top `3` at index 0), pop index 0: area = `3 × 1 = 3`. Continue — eventually the segment `[1,3,2,2]` at height 2 spanning indices 2–4 yields area `2 × 3 = 6`.

**Answer: `6`** ✓

### Histogram stack subroutine

```text
For each bar i:
  while stack not empty and heights[stack.top] > heights[i]:
    h = heights[pop]
    left = stack.empty ? -1 : stack.top
    width = i - left - 1
    ans = max(ans, h * width)
  push i
Flush remaining stack with sentinel width to end
```

### C++
```cpp
class Solution {
    int largestRectangleArea(vector<int>& heights) {
        heights.push_back(0);
        vector<int> st;
        int ans = 0;
        for (int i = 0; i < (int)heights.size(); i++) {
            while (!st.empty() && heights[st.back()] > heights[i]) {
                int h = heights[st.back()]; st.pop_back();
                int left = st.empty() ? -1 : st.back();
                ans = max(ans, h * (i - left - 1));
            }
            st.push_back(i);
        }
        heights.pop_back();
        return ans;
    }

public:
    int maximalRectangle(vector<vector<char>>& matrix) {
        if (matrix.empty() || matrix[0].empty()) return 0;
        int rows = matrix.size(), cols = matrix[0].size();
        vector<int> heights(cols, 0);
        int ans = 0;
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++)
                heights[j] = (matrix[i][j] == '1') ? heights[j] + 1 : 0;
            ans = max(ans, largestRectangleArea(heights));
        }
        return ans;
    }
};
```

### Python
```python
class Solution:
    def largestRectangleArea(self, heights: list[int]) -> int:
        heights = heights + [0]
        stack, ans = [], 0
        for i, h in enumerate(heights):
            while stack and heights[stack[-1]] > h:
                height = heights[stack.pop()]
                left = stack[-1] if stack else -1
                ans = max(ans, height * (i - left - 1))
            stack.append(i)
        return ans

    def maximalRectangle(self, matrix: list[list[str]]) -> int:
        if not matrix or not matrix[0]:
            return 0
        cols = len(matrix[0])
        heights = [0] * cols
        ans = 0
        for row in matrix:
            for j, cell in enumerate(row):
                heights[j] = heights[j] + 1 if cell == "1" else 0
            ans = max(ans, self.largestRectangleArea(heights))
        return ans
```

### Java
```java
class Solution {
    private int largestRectangleArea(int[] heights) {
        int[] extended = Arrays.copyOf(heights, heights.length + 1);
        Deque<Integer> stack = new ArrayDeque<>();
        int ans = 0;
        for (int i = 0; i < extended.length; i++) {
            while (!stack.isEmpty() && extended[stack.peek()] > extended[i]) {
                int h = extended[stack.pop()];
                int left = stack.isEmpty() ? -1 : stack.peek();
                ans = Math.max(ans, h * (i - left - 1));
            }
            stack.push(i);
        }
        return ans;
    }

    public int maximalRectangle(char[][] matrix) {
        if (matrix.length == 0 || matrix[0].length == 0) return 0;
        int cols = matrix[0].length;
        int[] heights = new int[cols];
        int ans = 0;
        for (char[] row : matrix) {
            for (int j = 0; j < cols; j++)
                heights[j] = row[j] == '1' ? heights[j] + 1 : 0;
            ans = Math.max(ans, largestRectangleArea(heights));
        }
        return ans;
    }
}
```

**Complexity:** O(rows × cols) time · O(cols) extra space for heights and stack

</details>

---

## 💭 What Should Have Clicked in Your Mind?

- **"Largest rectangle of 1's in a matrix"** → Reduce to histogram per row (Day 19) — don't enumerate rectangles.
- **"Histogram largest rectangle"** → Monotonic increasing stack (Day 18) — pop when shorter bar arrives, compute width from indices.
- **"Run on every row"** → The global max lives somewhere in the accumulated histograms, not just the final row.

This is the B-Rank capstone combo: matrix traversal feeds a stack subroutine. If Day 18's histogram stack felt familiar, this problem is that same stack in a loop — the Hard label is the 2D reduction, not a new algorithm.

---

*Problem 1 complete. Proceed to Problem 2. →*
