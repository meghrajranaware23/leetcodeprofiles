# ✅ Day 19 Checkpoint

> **Matrix Traversal** · 2 quests completed · ⭐ 80 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

| When you see... | Think... | Why |
|---|---|---|
| "spiral order" / "clockwise traversal" | Boundary shrinking | Four edges: top → right → bottom → left, then shrink |
| "generate matrix 1 to n²" | Same spiral walk, write mode | Spiral Matrix II — assign values instead of reading |
| "rotate image 90°" / "clockwise in-place" | Transpose + reverse rows | Two 1D skills composed; O(1) extra space |
| "rotate 90° counter-clockwise" | Reverse rows + transpose | Opposite order of clockwise |
| "layer by layer" / "peel the onion" | top/bottom/left/right pointers | Each layer is one ring of the matrix |
| single row or column left after top/right walk | Guard before bottom/left walks | Prevents double-counting center line |
| "n × n square matrix" + in-place transform | Transpose works on square grids | Rectangular matrices need different techniques |

### 🧠 Quick Recognition Test

1. *"Return all elements of a matrix in spiral order"* → **Boundary shrinking, collect on each edge walk (#54)**
2. *"Build an n × n matrix filled with 1 to n² in spiral order"* → **Same four-edge walk, write `val++` at each step (#59)**
3. *"Rotate a square matrix 90° clockwise without extra space"* → **Transpose, then reverse each row (#48)**
4. *"Transpose an m × n matrix and return it"* → **New matrix where `result[j][i] = matrix[i][j]` (#867)**

---

## 🎯 Transfer to Unseen Problems

You've studied Spiral Matrix and Rotate Image. Can you recognize matrix traversal thinking on problems you've never walked through?

**Scenario 1:** *"Given an m × n matrix, if an element is 0, set its entire row and column to 0. Do it in-place."*

Which pattern? **Matrix marker sweep.** Use first row and first column as zero flags, process interior, then apply. (Set Matrix Zeroes #73.)

**Scenario 2:** *"Given a binary matrix, return the area of the largest rectangle containing only 1s."*

Which pattern? **Histogram per row + monotonic stack (Day 17).** Treat each row as a histogram base; stack finds max rectangle. (Maximal Rectangle #85.)

**Scenario 3:** *"Given an n × n matrix of sorted rows and columns, find the kth smallest element."*

Which pattern? **Binary search on value range or heap merge of row pointers.** Not spiral — but 2D structure guides search. (Kth Smallest in Sorted Matrix #378.)

> **Answer key:** Scenario 1 → in-place marker technique (2D sweep). Scenario 2 → stack + row iteration. Scenario 3 → binary search / heap on sorted matrix. Spiral and rotate are two of many 2D patterns — recognize the geometry first.

---

## ⚠ Common Mistakes

1. **Missing guard checks in spiral walk** — After the top row and right column, `top` may equal `bottom` (single row left). Walking the bottom row again double-counts it.

2. **Starting right column at `top` instead of `top+1`** — The corner `(top, right)` was already collected on the top row walk.

3. **Transposing with `j` starting at 0** — Swapping `(i,j)` and `(j,i)` when `j < i` undoes the swap. Only transpose for `j > i`.

4. **Reversing columns instead of rows for clockwise rotation** — Transpose + reverse columns = counter-clockwise. Clockwise needs row reverse.

5. **Allocating extra matrix when "in-place" is required** — Rotate Image (#48) expects O(1) extra space. Transpose + reverse satisfies this.

---

## 🏋️ Mini Challenge

### [Spiral Matrix II #59](https://leetcode.com/problems/spiral-matrix-ii/)

**[→ Try Spiral Matrix II on LeetCode](https://leetcode.com/problems/spiral-matrix-ii/)**

Given an integer `n`, return an `n × n` matrix filled with elements `1` to `n²` in **spiral order**.

```
Input:  n = 3
Output: [[1,2,3],[8,9,4],[7,6,5]]

Input:  n = 1
Output: [[1]]

Input:  n = 2
Output: [[1,2],[4,3]]
```

### 🔍 Pattern Recognition for This Challenge

| Clue | Signal |
|---|---|
| "filled with 1 to n²" | Write mode — assign values, not read |
| "spiral order" | Same boundary shrinking from #54 |
| "n × n matrix" | Square — all four edges always meaningful until center |

**Before you code:** *"Same four-edge walk as Spiral Matrix. Instead of `result.push_back(matrix[top][j])`, do `matrix[top][j] = val++`."*

> 💡 **Hint:** Initialize `val = 1`. Use identical `top/bottom/left/right` loops. Place `val` at each step and increment. The walk order is identical to #54 — only the operation changes from read to write.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Spiral Matrix II #59](https://leetcode.com/problems/spiral-matrix-ii/) | Medium | Boundary shrinking, write mode |
| [Transpose Matrix #867](https://leetcode.com/problems/transpose-matrix/) | Easy | Transpose step in isolation |
| [Set Matrix Zeroes #73](https://leetcode.com/problems/set-matrix-zeroes/) | Medium | In-place marker sweep |
| [Diagonal Traverse #498](https://leetcode.com/problems/diagonal-traverse/) | Medium | Diagonal walk (`i+j` grouping) |
| [Rotate Array #189](https://leetcode.com/problems/rotate-array/) | Medium | 1D reverse rotation trick |

---

*Day 19 complete! Tomorrow: 2D prefix sums — range queries on a grid. →*
