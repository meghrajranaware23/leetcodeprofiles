# ✅ Day 18 Checkpoint

> **Advanced Monotonic Stack** · 2 quests completed · ⭐ 80 XP earned

---

## 🔍 Pattern Signals — Recognition Drill

| When you see... | Think... | Why |
|---|---|---|
| "largest rectangle in histogram" | Increasing stack + sentinel 0 | Pop on shorter bar; width from stack boundaries |
| "trapping rain water" / "elevation map" | Two pointers (Day 6) OR decreasing stack | Min(maxLeft, maxRight) or layer fill on pop |
| "binary matrix" + "maximal rectangle" | Row histogram + #84 engine | Each row builds running heights, run largest rectangle |
| "area bounded by shortest bar" | Next smaller left and right | Increasing stack resolves both on pop |
| pop computes width | `width = i - stack.top() - 1` after pop | Left = new top; right = current `i` |
| decreasing stack on histogram | Wrong tool | Decreasing = next greater; histogram needs increasing |
| move taller pointer in trapping water | Move **shorter max** side | Shorter max is the water bottleneck |

### 🧠 Quick Recognition Test

1. *"Largest rectangle in a histogram"* → **Increasing stack, pop area, sentinel 0 (#84)**
2. *"How much rain water trapped between bars?"* → **Two pointers min(maxL, maxR) or stack layers (#42)**
3. *"Max rectangle of 1s in a binary matrix"* → **Per-row histogram + #84 (#85)**
4. *"Container with most water — max area between two lines"* → **Day 6 two pointers, move shorter (#11)**

---

## 🎯 Transfer to Unseen Problems

You've studied Largest Rectangle in Histogram and Trapping Rain Water. Can you recognize advanced stack thinking on unseen problems?

**Scenario 1:** *"Given a 2D binary matrix filled with 0s and 1s, find the largest rectangle containing only 1s and return its area."*

Which pattern? **Row-by-row histogram + #84.** For each row, build `heights[j]` = consecutive 1s ending at this row. Run largest rectangle on `heights`. Track global max. (Maximal Rectangle #85 — checkpoint below.)

**Scenario 2:** *"Given an array, return the sum of min(nums[j]) for every subarray [i..j]."*

Which pattern? **Previous smaller + next smaller per index (#907).** Each element's contribution = `nums[i] × leftSpan × rightSpan`. Monotonic stack finds spans — not histogram area, but same boundary mechanic.

**Scenario 3:** *"Given elevation map, trap water — but the map is a 2D grid."*

Which pattern? **Priority queue / BFS (A-Rank #407).** 1D stack and two pointers don't generalize to 3D — different tool. Recognize when to upgrade ranks.

> **Answer key:** Scenario 1 → #85 (checkpoint). Scenario 2 → sum of subarray minimums. Scenario 3 → 2D trapping (beyond B-Rank Day 18). Signal: **"histogram" or "shortest bar in range"** → increasing stack.

---

## ⚠ Common Mistakes

1. **Wrong stack for histogram** — Largest rectangle needs **increasing** stack (pop when shorter arrives). Day 17's **decreasing** stack is for next greater.

2. **Missing sentinel 0** — Without a final shorter bar, stack bars never get a right boundary. Append `0` or handle flush after the loop.

3. **Width off-by-one** — After popping `h`, left boundary is `stack.top()` (not `h`). Width = `i - left - 1`.

4. **Trapping water: move wrong pointer** — Process the side with **smaller** max (leftMax vs rightMax), not the shorter bar necessarily — though they're related.

5. **Applying 1D stack directly to 2D matrix** — Build the histogram per row first. Don't treat the matrix as a flat array.

---

## 🏋️ Mini Challenge

### [Maximal Rectangle #85](https://leetcode.com/problems/maximal-rectangle/)

**[→ Try Maximal Rectangle on LeetCode](https://leetcode.com/problems/maximal-rectangle/)**

Given a `rows × cols` binary matrix filled with `'0'` and `'1'`, find the largest rectangle containing only `'1'`s and return its area.

```
Input:  matrix = [
  ["1","0","1","0","0"],
  ["1","0","1","1","1"],
  ["1","1","1","1","1"],
  ["1","0","0","1","0"]
]
Output: 6
        (rectangle of six 1s in rows 1–2, cols 2–4)

Input:  matrix = [["0"]]
Output: 0

Input:  matrix = [["1"]]
Output: 1
```

### 🔍 Pattern Recognition for This Challenge

| Clue | Signal |
|---|---|
| "binary matrix" + "largest rectangle of 1s" | Reduce each row to histogram |
| "containing only 1s" | Height = consecutive 1s in column; 0 resets height |
| "return area" | Run #84 on each row's heights array |

**Before you code:** *"For each row, heights[j] = heights[j] + 1 if matrix[i][j]=='1', else 0. Call largestRectangleArea(heights). Track global max."*

> 💡 **Hint:** Row 0 builds the base histogram. Row 1 adds 1 to columns that are still `'1'` — bars grow taller. A `'0'` resets that column's height to 0. You're stacking histograms vertically; #84 finds the best rectangle in each slice.

---

## 📚 Practice Queue

| Problem | Difficulty | Key Pattern |
|---|---|---|
| [Maximal Rectangle #85](https://leetcode.com/problems/maximal-rectangle/) | Hard | Row histogram + #84 |
| [Sum of Subarray Minimums #907](https://leetcode.com/problems/sum-of-subarray-minimums/) | Medium | Prev + next smaller |
| [Remove K Digits #402](https://leetcode.com/problems/remove-k-digits/) | Medium | Increasing stack, greedy |
| [132 Pattern #456](https://leetcode.com/problems/132-pattern/) | Medium | Monotonic stack variant |
| [Container With Most Water #11](https://leetcode.com/problems/container-with-most-water/) | Medium | Two pointers revisit (Day 6) |

---

*Days 17–18 complete! Monotonic stacks — from next greater to histograms to trapped water — are yours. Day 19: matrix traversal awaits. →*
