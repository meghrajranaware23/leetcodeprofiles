# 📝 Advanced Monotonic Stack

> **Day 18** · Histogram Stack · Area & Volume · ★★★★★ · 25 XP · 18 min read

---

Day 17's stack found **nearest greater neighbors**. Today the same pop mechanic computes **area and volume** — how wide a bar can stretch as the minimum height, and how much water sits trapped between walls.

The leap: each pop doesn't just answer "who is greater?" — it answers *"how far can this bar extend as the shortest wall?"*

---

## Part 1 — Learn the Pattern

### 1. From next greater to histogram rectangles

In a histogram, each bar's **largest rectangle** is limited by the first shorter bars on its left and right. Those boundaries are exactly **next smaller** neighbors.

```
heights = [2, 1, 5, 6, 2, 3]

Bar at index 2 (height 5):
  left boundary:  index 1 (height 1) — first shorter to the left
  right boundary: index 4 (height 2) — first shorter to the right
  width = 4 - 1 - 1 = 2  (indices 2 and 3)
  area = 5 × 2 = 10
```

An **increasing monotonic stack** (heights ascend toward top) finds next smaller on pop:

```
When heights[i] < heights[stack.top()]:
  pop h = stack.top()
  right boundary = i
  left boundary  = stack.top() after pop (or -1 if empty)
  width = right - left - 1
  area = heights[h] × width
```

### 2. Stack state evolution — largest rectangle

```
heights = [2, 1, 5, 6, 2, 3]
append sentinel 0 at end to flush remaining bars

i=0 (2): push 0                    stack=[0]
i=1 (1): 1 < 2 → pop 0
         left=-1, right=1, w=1, area=2×1=2
         push 1                     stack=[1]
i=2 (5): push 2                    stack=[1,2]
i=3 (6): push 3                    stack=[1,2,3]
i=4 (2): 2 < 6 → pop 3, w=1, area=6×1=6
         2 < 5 → pop 2, w=2, area=5×2=10  ← best so far
         2 > 1 → push 4             stack=[1,4]
i=5 (3): push 5                    stack=[1,4,5]
i=6 (0): sentinel — pop all:
         pop 5: w=1, area=3
         pop 4: w=4, area=2×4=8
         pop 1: w=6, area=1×6=6

max area = 10 ✓
```

Each bar is pushed once and popped once. The sentinel `0` at the end forces every bar to resolve its right boundary.

### 3. Cross-rank bridge — D-Rank Day 6 Container With Most Water

**D-Rank Day 6 — Container With Most Water** maximized area between two vertical lines:

```
area = min(height[left], height[right]) × (right - left)
move the shorter pointer inward — width shrinks, shorter side can't improve
```

The histogram stack solves a **different but related** area question:

| Container With Most Water (#11) | Largest Rectangle in Histogram (#84) |
|---|---|
| Two pointers, widest container first | Monotonic stack, one pass left→right |
| Area bounded by **two chosen** lines | Area bounded by **one bar as height**, width extends until shorter neighbors |
| Greedy: move shorter side | Pop: shorter bar arriving closes taller bars' rectangles |
| O(n) two pointers | O(n) stack |

Both prune dead search space:
- **Day 6:** Keeping the shorter line while width shrinks can't beat current area → move it.
- **Day 18:** A shorter bar arriving means taller bars on the stack can't extend further right → pop and compute their final width.

**C-Rank Day 16 — Greedy** connects too: pop is a greedy "this bar's window is closed" decision — no backtracking to reconsider popped bars.

### 4. Trapping rain water — stack vs two pointers

Trapping Rain Water (#42) has **two classic O(n) solutions**:

**Approach A — Two pointers (D-Rank / Day 6 family):**
```
left = 0, right = n-1
leftMax = 0, rightMax = 0
move the side with smaller max inward
water += max(0, sideMax - height[side])
```
Tracks the **tallest wall seen** from each direction. Water at a position is bounded by the shorter of the two global maxes.

**Approach B — Monotonic decreasing stack:**
```
When height[i] > height[stack.top()]:
  pop bottom, compute water layer between popped bar and current bar
  water += (min(height[i], height[newTop]) - height[popped]) × width
```
Fills water **layer by layer** in horizontal slices between popped bars.

| | Two Pointers | Monotonic Stack |
|---|---|---|
| **Intuition** | Water level capped by min(leftMax, rightMax) | Water trapped in valleys between stack pops |
| **Best when** | You want one pass, O(1) extra space | You've already mastered Day 17–18 stack |
| **Space** | O(1) | O(n) |
| **Connection** | Day 6 converging pointers + max tracking | Day 17 decreasing stack + layer fill |

Both are O(n). Know both — interviewers may ask for the stack version after #739, or the pointer version after Container.

### 5. What problems does this pattern solve?

- **Largest rectangle in histogram** — max area with one bar as height (#84)
- **Trapping rain water** — volume between bars (#42)
- **Maximal rectangle in binary matrix** — reduce rows to histogram (#85, checkpoint)
- **Sum of subarray minimums** — previous + next smaller for each element (#907)
- **Remove K digits** — increasing stack, greedy digit removal (#402)

Signal: *"area/volume bounded by min height in a range"* → stack finds the range boundaries.

### 6. Why brute force is inefficient

| Brute force | Problem |
|---|---|
| For each bar, expand left and right until shorter | O(n²) — stack finds both boundaries in O(1) amortized per bar |
| For each pair of walls, compute trapped water | O(n²) or O(n²) with precomputed max |
| Re-scan left boundary after every pop | Stack top after pop **is** the left boundary |
| Skip sentinel at end of histogram | Bars never popped — miss their right boundary |

### 7. The key observation

On pop, the stack gives you **both boundaries for free**:

```
pop index h:
  right boundary = current index i
  left boundary  = stack.top() (if stack empty → -1)
  width = i - left - 1
  contribution = heights[h] × width   (rectangle)
               or layer water formula  (trapping)
```

The increasing stack maintains bars in ascending height order. A shorter newcomer `heights[i]` closes every taller bar above it — each gets its maximum width at the moment it's popped.

### 8. Pattern signals & recognition clues

| When the problem says… | Think advanced monotonic stack |
|---|---|
| "largest rectangle in histogram" | Increasing stack + pop area formula |
| "trapping rain water" / "water trapped between bars" | Stack layers OR two pointers |
| "binary matrix" + "maximal rectangle of 1s" | Row-by-row histogram (#85) |
| "sum of subarray minimums" | Previous smaller + next smaller per index |
| "area bounded by shortest bar in range" | Next smaller defines width |
| append `0` sentinel | Flush stack at end of histogram scan |

**Keywords:** `histogram` · `rectangle` · `trapped water` · `area` · `volume` · `shortest bar` · `layer` · `binary matrix`

### 9. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Wrong stack order for histogram | **Increasing** stack — pop when `heights[i] < heights[top]` (next smaller arrives) |
| Off-by-one width | `width = i - stack.top() - 1` after pop; if stack empty, `width = i` |
| Forgetting sentinel `0` | Append 0 to heights so all bars get a right boundary |
| Using decreasing stack for histogram | Decreasing finds next greater — wrong boundary for rectangles |
| Mixing up pointer vs stack for trapping | Both work — pick the one you can explain; stack = layers, pointers = min(maxLeft, maxRight) |

### 10. Recognition drill

Read this problem aloud:

> *"Given an array of non-negative integers representing histogram bar heights, return the area of the largest rectangle that can be formed in the histogram."*

Before coding, say:

> *"Each bar's max rectangle needs next smaller left and right. Increasing monotonic stack — pop when shorter bar arrives, compute width from stack top and current index. Sentinel 0 to flush. O(n)."*

---

## Part 2 — What's Next

Today you'll tackle two Hard classics:

1. **Histogram rectangle** — Largest Rectangle in Histogram (#84): pop computes area
2. **Trapped volume** — Trapping Rain Water (#42): stack layers vs two pointers

The stack from Day 17 gains a measurement — width × height.

---

*You understand the histogram stack. First quest: the largest rectangle. →*
